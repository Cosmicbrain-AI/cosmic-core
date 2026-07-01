-- Supabase schema for curated remote teleop. Run in the Supabase SQL editor once the
-- project exists. Auth users live in Supabase's `auth.users`; `operators` extends them.
-- Until this is applied, the app uses the in-memory broker in store.server.ts (dev only).

create table if not exists operators (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  role       text not null default 'operator' check (role in ('admin','operator')),
  approved   boolean not null default false,        -- Anto flips this to curate access
  created_at timestamptz not null default now()
);

create table if not exists robots (
  id          text primary key,                     -- slug, e.g. 'g1-cell-a'
  name        text not null,
  model       text not null default 'Unitree G1 (G1_29, 29-DOF)',
  location    text not null,
  online      boolean not null default false,       -- set by the robot edge agent heartbeat
  estopped    boolean not null default false,
  current_session_id uuid                            -- the exclusive lock (null = free)
);

create table if not exists access_grants (
  operator_id uuid references operators (id) on delete cascade,
  robot_id    text references robots (id) on delete cascade,
  primary key (operator_id, robot_id)
);

create table if not exists sessions (
  id            uuid primary key default gen_random_uuid(),
  operator_id   uuid not null references operators (id),
  robot_id      text not null references robots (id),
  state         text not null default 'active' check (state in ('active','ended')),
  started_at    timestamptz not null default now(),
  last_heartbeat timestamptz not null default now(),
  ended_at      timestamptz,
  ended_reason  text
);
create index if not exists sessions_active_idx on sessions (robot_id) where state = 'active';

-- THE EXCLUSIVE LOCK, atomically, in one statement. "0 rows updated" => robot busy/unavailable.
-- This replaces the single-threaded check-then-set in broker.ts for the multi-process
-- (serverless) deployment:
--
--   with claim as (
--     update robots set current_session_id = :sid
--     where id = :rid and current_session_id is null and online and not estopped
--     returning id
--   )
--   insert into sessions (id, operator_id, robot_id)
--   select :sid, :op, :rid from claim;   -- inserts only if the robot was successfully claimed
--
-- Enforce access + approval in the same transaction (or a prior guard):
--   exists(select 1 from operators where id=:op and approved)
--   and exists(select 1 from access_grants where operator_id=:op and robot_id=:rid)
