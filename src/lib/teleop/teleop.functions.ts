// teleop.functions.ts — server functions backed by Supabase.
// Operator actions run through the SECURITY DEFINER RPCs as the signed-in user
// (auth.uid()); admin actions use the privileged service client after an admin check.
// The client passes its Supabase access token in `accessToken` (see lib/teleop/client.ts).

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireOperator, requireAdmin, serviceClient, robotStatus } from "./supabase.server";

const auth = z.object({ accessToken: z.string() });

// ---------- operator-facing ----------

export const getMyDashboard = createServerFn({ method: "POST" })
  .inputValidator(auth)
  .handler(async ({ data }) => {
    const { uc, userId } = await requireOperator(data.accessToken);
    const [me, robots, active] = await Promise.all([
      uc.from("operators").select("id,email,role,approved").eq("id", userId).single(),
      uc.from("robots").select("id,name,model,location,online,estopped,current_session_id"), // RLS -> granted only
      uc.from("sessions").select("id,robot_id,started_at").eq("operator_id", userId).eq("state", "active").maybeSingle(),
    ]);
    return {
      me: me.data,
      robots: (robots.data ?? []).map((r) => ({
        id: r.id, name: r.name, model: r.model, location: r.location, status: robotStatus(r),
      })),
      activeSession: active.data ? { id: active.data.id, robotId: active.data.robot_id, startedAt: active.data.started_at } : null,
    };
  });

export const launchSession = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ robotId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { uc } = await requireOperator(data.accessToken);
    const { data: rows, error } = await uc.rpc("claim_robot", { p_robot_id: data.robotId });
    if (error) return { ok: false as const, reason: error.message };
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row?.ok ? { ok: true as const, sessionId: row.session_id } : { ok: false as const, reason: row?.reason ?? "unavailable" };
  });

export const heartbeat = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ sessionId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { uc } = await requireOperator(data.accessToken);
    const { data: ok } = await uc.rpc("session_heartbeat", { p_session_id: data.sessionId });
    return { ok: !!ok };
  });

export const stopSession = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ sessionId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { uc } = await requireOperator(data.accessToken);
    const { data: ok } = await uc.rpc("end_session", { p_session_id: data.sessionId, p_reason: "operator-ended" });
    return { ok: !!ok };
  });

// ---------- admin-facing (Anto's curation) ----------

export const adminListOperators = createServerFn({ method: "POST" })
  .inputValidator(auth)
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const { data: ops } = await svc.from("operators").select("id,email,role,approved").order("created_at");
    return ops ?? [];
  });

export const adminApproveOperator = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ operatorId: z.string().min(1), approved: z.boolean() }))
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const { error } = await svc.from("operators").update({ approved: data.approved }).eq("id", data.operatorId);
    return { ok: !error, error: error?.message };
  });

export const adminListRobots = createServerFn({ method: "POST" })
  .inputValidator(auth)
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const { data: rows } = await svc.from("robots").select("id,name,model,location,online,estopped,current_session_id");
    return (rows ?? []).map((r) => ({ ...r, status: robotStatus(r) }));
  });

export const adminAddRobot = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({
    id: z.string().min(1), name: z.string().min(1),
    model: z.string().min(1).default("Unitree G1 (G1_29, 29-DOF)"), location: z.string().min(1),
  }))
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const { error } = await svc.from("robots").insert({ id: data.id, name: data.name, model: data.model, location: data.location });
    return { ok: !error, error: error?.message };
  });

export const adminGrantAccess = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ operatorId: z.string().min(1), robotId: z.string().min(1), grant: z.boolean() }))
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const q = data.grant
      ? svc.from("access_grants").upsert({ operator_id: data.operatorId, robot_id: data.robotId })
      : svc.from("access_grants").delete().eq("operator_id", data.operatorId).eq("robot_id", data.robotId);
    const { error } = await q;
    return { ok: !error, error: error?.message };
  });

export const adminEstop = createServerFn({ method: "POST" })
  .inputValidator(auth.extend({ robotId: z.string().min(1), estop: z.boolean() }))
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    if (data.estop) {
      // end any active session and release the lock, then latch estop
      await svc.from("sessions").update({ state: "ended", ended_at: new Date().toISOString(), ended_reason: "estop" })
        .eq("robot_id", data.robotId).eq("state", "active");
      await svc.from("robots").update({ estopped: true, current_session_id: null }).eq("id", data.robotId);
    } else {
      await svc.from("robots").update({ estopped: false }).eq("id", data.robotId);
    }
    return { ok: true };
  });

export const adminListGrants = createServerFn({ method: "POST" })
  .inputValidator(auth)
  .handler(async ({ data }) => {
    const { svc } = await requireAdmin(data.accessToken);
    const { data: rows } = await svc.from("access_grants").select("operator_id,robot_id");
    return rows ?? [];
  });

// serviceClient re-exported for a future stale-session cron (reap_stale_sessions RPC).
export { serviceClient };
