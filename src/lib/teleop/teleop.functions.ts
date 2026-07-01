// teleop.functions.ts — server functions (the API for the teleop pages).
// Pattern mirrors src/lib/api/example.functions.ts (createServerFn + zod).

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getBroker, getCurrentOperatorId } from "./store.server";

// ---------- operator-facing ----------

/** Robots the signed-in operator may drive, plus their current session (if any). */
export const getMyDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const b = getBroker();
  const meId = getCurrentOperatorId();
  const me = b.operators.get(meId);
  const active = b.activeSessionForOperator(meId);
  return {
    me: me ? { id: me.id, email: me.email, role: me.role, approved: me.approved } : null,
    robots: b.robotsForOperator(meId),
    activeSession: active ? { id: active.id, robotId: active.robotId, startedAt: active.startedAt } : null,
  };
});

/** Acquire a robot (the exclusive lock). Returns the sessionId or a reason it was refused. */
export const launchSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ robotId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const b = getBroker();
    return b.requestSession(getCurrentOperatorId(), data.robotId);
  });

/** Prove the operator is still there (called on an interval by the live session UI). */
export const heartbeat = createServerFn({ method: "POST" })
  .inputValidator(z.object({ sessionId: z.string().min(1) }))
  .handler(async ({ data }) => getBroker().heartbeat(data.sessionId));

/** End the session and release the robot. */
export const stopSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ sessionId: z.string().min(1) }))
  .handler(async ({ data }) => getBroker().endSession(data.sessionId, "operator-ended"));

// ---------- admin-facing (Anto's curation) ----------

function assertAdmin() {
  const b = getBroker();
  const me = b.operators.get(getCurrentOperatorId());
  if (!me || me.role !== "admin") throw new Error("forbidden: admin only");
  return b;
}

export const adminListOperators = createServerFn({ method: "GET" }).handler(async () =>
  assertAdmin().allOperators(),
);

export const adminApproveOperator = createServerFn({ method: "POST" })
  .inputValidator(z.object({ operatorId: z.string().min(1), approved: z.boolean() }))
  .handler(async ({ data }) => {
    const b = assertAdmin();
    b.approveOperator(data.operatorId, data.approved);
    return { ok: true };
  });

export const adminListRobots = createServerFn({ method: "GET" }).handler(async () => assertAdmin().allRobots());

export const adminAddRobot = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      model: z.string().min(1).default("Unitree G1 (G1_29, 29-DOF)"),
      location: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const b = assertAdmin();
    b.addRobot(data);
    return { ok: true };
  });

export const adminGrantAccess = createServerFn({ method: "POST" })
  .inputValidator(z.object({ operatorId: z.string().min(1), robotId: z.string().min(1), grant: z.boolean() }))
  .handler(async ({ data }) => {
    const b = assertAdmin();
    if (data.grant) b.grantAccess(data.operatorId, data.robotId);
    else b.revokeAccess(data.operatorId, data.robotId);
    return { ok: true };
  });

export const adminEstop = createServerFn({ method: "POST" })
  .inputValidator(z.object({ robotId: z.string().min(1), estop: z.boolean() }))
  .handler(async ({ data }) => {
    const b = assertAdmin();
    return data.estop ? b.estopRobot(data.robotId) : (b.clearEstop(data.robotId), { ok: true });
  });
