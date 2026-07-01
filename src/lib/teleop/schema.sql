-- ============================================================================
-- CosmicBrain teleop — Supabase schema. Paste this whole file into the
-- Supabase SQL editor and run it once. Safe to re-run (idempotent-ish).
-- Auth users live in Supabase `auth.users`; `operators` extends them.
-- ============================================================================

-- ---- tables ----------------------------------------------------------------
create table if not exists operators (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  role       text not null default 'operator' check (role in ('admin','operator')),
  approved   boolean not null default false,          -- Anto flips this to curate access
  created_at timestamptz not null default now()
);

create table if not exists robots (
  id          text primary key,                       -- slug, e.g. 'g1-cell-a'
  name        text not null,
  model       text not null default 'Unitree G1 (G1_29, 29-DOF)',
  location    text not null,
  online      boolean not null default false,         -- set by the robot edge agent
  estopped    boolean not null default false,
  current_session_id uuid                              -- the exclusive lock (null = free)
);

create table if not exists access_grants (
  operator_id uuid references operators (id) on delete cascade,
  robot_id    text references robots (id) on delete cascade,
  primary key (operator_id, robot_id)
);

create table if not exists sessions (
  id             uuid primary key default gen_random_uuid(),
  operator_id    uuid not null references operators (id),
  robot_id       text not null references robots (id),
  state          text not null default 'active' check (state in ('active','ended')),
  started_at     timestamptz not null default now(),
  last_heartbeat timestamptz not null default now(),
  ended_at       timestamptz,
  ended_reason   text
);
create index if not exists sessions_active_robot_idx on sessions (robot_id) where state = 'active';

-- ---- auto-create an operator row when someone signs up ---------------------
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into operators (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- ---- THE EXCLUSIVE LOCK: claim a robot, atomically -------------------------
-- Called by the signed-in operator (auth.uid() = them). Enforces approval + grant +
-- availability and takes the lock in one UPDATE. "not found" => robot busy.
create or replace function claim_robot(p_robot_id text)
returns table (ok boolean, session_id uuid, reason text)
language plpgsql security definer set search_path = public as $$
declare v_op uuid := auth.uid(); v_sid uuid := gen_random_uuid();
begin
  if v_op is null then return query select false, null::uuid, 'not-authenticated'; return; end if;
  if not exists (select 1 from operators where id = v_op and approved) then
    return query select false, null::uuid, 'operator-not-approved'; return; end if;
  if not exists (select 1 from access_grants where operator_id = v_op and robot_id = p_robot_id) then
    return query select false, null::uuid, 'no-access-grant'; return; end if;

  update robots set current_session_id = v_sid
    where id = p_robot_id and current_session_id is null and online and not estopped;
  if not found then
    return query select false, null::uuid, coalesce((
      select case when estopped then 'robot-estopped'
                  when not online then 'robot-offline'
                  when current_session_id is not null then 'robot-in_session'
                  else 'unavailable' end
      from robots where id = p_robot_id), 'unknown-robot');
    return;
  end if;

  insert into sessions (id, operator_id, robot_id) values (v_sid, v_op, p_robot_id);
  return query select true, v_sid, null::text;
end $$;

-- ---- heartbeat + end (release the lock) ------------------------------------
create or replace function session_heartbeat(p_session_id uuid) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update sessions set last_heartbeat = now()
    where id = p_session_id and state = 'active' and operator_id = auth.uid();
  return found;
end $$;

create or replace function end_session(p_session_id uuid, p_reason text default 'operator-ended') returns boolean
language plpgsql security definer set search_path = public as $$
declare v_robot text;
begin
  update sessions set state = 'ended', ended_at = now(), ended_reason = p_reason
    where id = p_session_id and state = 'active'
      and (operator_id = auth.uid() or exists (select 1 from operators where id = auth.uid() and role = 'admin'))
    returning robot_id into v_robot;
  if v_robot is null then return false; end if;
  update robots set current_session_id = null where id = v_robot and current_session_id = p_session_id;
  return true;
end $$;

-- Server-side watchdog: reclaim robots whose operator went silent (call from a cron).
create or replace function reap_stale_sessions(p_timeout_s int default 5) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  with stale as (
    update sessions set state='ended', ended_at=now(), ended_reason='heartbeat-timeout'
    where state='active' and last_heartbeat < now() - make_interval(secs => p_timeout_s)
    returning id, robot_id
  )
  update robots r set current_session_id = null
  from stale s where r.id = s.robot_id and r.current_session_id = s.id;
  get diagnostics n = row_count;
  return n;
end $$;

-- ---- Row Level Security ----------------------------------------------------
-- Deny-by-default. Reads happen through the (SECURITY DEFINER) functions above and
-- through the policies below; privileged admin writes use the service_role key server-side.
alter table operators     enable row level security;
alter table robots        enable row level security;
alter table access_grants enable row level security;
alter table sessions      enable row level security;

drop policy if exists op_self_read on operators;
create policy op_self_read on operators for select using (id = auth.uid());

drop policy if exists robots_granted_read on robots;
create policy robots_granted_read on robots for select
  using (exists (select 1 from access_grants g where g.robot_id = robots.id and g.operator_id = auth.uid()));

drop policy if exists sessions_self_read on sessions;
create policy sessions_self_read on sessions for select using (operator_id = auth.uid());

-- ---- seed: the robot we've been working with in the teleop repo -------------
insert into robots (id, name, model, location, online) values
  ('g1-cell-a', 'G1 — Cell A', 'Unitree G1 (G1_29, 29-DOF)', 'Lab cell A (fenced)', true)
on conflict (id) do nothing;

-- NOTE: to make yourself admin after signing up, run once:
--   update operators set role='admin', approved=true where email='anto@cosmicbrain.ai';
-- Then in the /admin page: approve yourself, and toggle the G1 grant so it appears in /app.
