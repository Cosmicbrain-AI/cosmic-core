// broker.ts — curated remote-teleop control plane (TS port of the tested sessionCore).
//
// Enforces the two safety rules:
//   1. ACCESS  — only an APPROVED operator with an explicit grant may drive a robot.
//   2. EXCLUSIVE LOCK — at most ONE active session per robot, ever.
//
// The logic here is verified by broker/sessionCore.test.mjs (9/9). This is an in-memory
// implementation used for local dev and until Supabase is wired. IMPORTANT: on Vercel
// serverless, a module-level singleton does NOT persist across invocations — so before
// production this store must be replaced by Supabase Postgres, and the exclusive-lock
// acquire must become a conditional UPDATE (see schema.ts / the note in requestSession).

export type Role = "admin" | "operator";
export type RobotStatus = "offline" | "available" | "in_session" | "estopped";
export type SessionState = "active" | "ended";

export interface Operator { id: string; email: string; role: Role; approved: boolean; }
export interface Robot {
  id: string; name: string; model: string; location: string;
  online: boolean; estopped: boolean; currentSessionId: string | null;
}
export interface Session {
  id: string; operatorId: string; robotId: string; state: SessionState;
  startedAt: number; lastHeartbeat: number; endedAt: number | null; endedReason: string | null;
}
export type RequestResult = { ok: true; sessionId: string } | { ok: false; reason: string };

let _seq = 0;
const newId = (p: string) => `${p}_${(++_seq).toString(36)}${Date.now().toString(36)}`;

export class SessionBroker {
  operators = new Map<string, Operator>();
  robots = new Map<string, Robot>();
  grants = new Set<string>(); // `${operatorId}:${robotId}`
  sessions = new Map<string, Session>();

  // ---- registry / admin ----
  upsertOperator(id: string, email: string, opts: Partial<Pick<Operator, "role" | "approved">> = {}): Operator {
    const existing = this.operators.get(id);
    const op: Operator = { id, email, role: opts.role ?? existing?.role ?? "operator", approved: opts.approved ?? existing?.approved ?? false };
    this.operators.set(id, op);
    return op;
  }
  approveOperator(id: string, approved = true): Operator | undefined { const o = this.operators.get(id); if (o) o.approved = approved; return o; }
  addRobot(r: Omit<Robot, "online" | "estopped" | "currentSessionId"> & Partial<Robot>): Robot {
    const robot: Robot = { online: false, estopped: false, currentSessionId: null, ...r };
    this.robots.set(robot.id, robot);
    return robot;
  }
  setRobotOnline(id: string, online: boolean) { const r = this.robots.get(id); if (r) r.online = online; return r; }
  grantAccess(operatorId: string, robotId: string) { this.grants.add(`${operatorId}:${robotId}`); }
  revokeAccess(operatorId: string, robotId: string) { this.grants.delete(`${operatorId}:${robotId}`); }
  hasAccess(operatorId: string, robotId: string) { return this.grants.has(`${operatorId}:${robotId}`); }

  robotStatus(robotId: string): RobotStatus {
    const r = this.robots.get(robotId);
    if (!r) return "offline";
    if (r.estopped) return "estopped";
    if (!r.online) return "offline";
    return r.currentSessionId ? "in_session" : "available";
  }

  // ---- the exclusive lock ----
  requestSession(operatorId: string, robotId: string, now = Date.now()): RequestResult {
    const op = this.operators.get(operatorId);
    if (!op) return { ok: false, reason: "unknown-operator" };
    if (!op.approved) return { ok: false, reason: "operator-not-approved" };
    if (!this.hasAccess(operatorId, robotId)) return { ok: false, reason: "no-access-grant" };

    const r = this.robots.get(robotId);
    if (!r) return { ok: false, reason: "unknown-robot" };
    const status = this.robotStatus(robotId);
    if (status !== "available") return { ok: false, reason: `robot-${status}` };

    // --- atomic acquire (single-threaded, no await between check and set). In Postgres:
    //   UPDATE robots SET current_session_id=:sid WHERE id=:rid AND current_session_id IS NULL
    //   AND online AND NOT estopped;  -- 0 rows => busy
    const sid = newId("sess");
    this.sessions.set(sid, { id: sid, operatorId, robotId, state: "active", startedAt: now, lastHeartbeat: now, endedAt: null, endedReason: null });
    r.currentSessionId = sid;
    return { ok: true, sessionId: sid };
  }

  heartbeat(sessionId: string, now = Date.now()): { ok: boolean; reason?: string } {
    const s = this.sessions.get(sessionId);
    if (!s) return { ok: false, reason: "unknown-session" };
    if (s.state !== "active") return { ok: false, reason: "session-ended" };
    s.lastHeartbeat = now;
    return { ok: true };
  }

  endSession(sessionId: string, reason = "operator-ended", now = Date.now()): { ok: boolean; reason: string } {
    const s = this.sessions.get(sessionId);
    if (!s || s.state === "ended") return { ok: false, reason: "not-active" };
    s.state = "ended"; s.endedReason = reason; s.endedAt = now;
    const r = this.robots.get(s.robotId);
    if (r && r.currentSessionId === sessionId) r.currentSessionId = null; // release
    return { ok: true, reason };
  }

  // Server-side watchdog: reclaim robots whose operator went silent.
  reapStaleSessions(now = Date.now(), timeoutMs = 5000): string[] {
    const reaped: string[] = [];
    for (const s of this.sessions.values()) {
      if (s.state === "active" && now - s.lastHeartbeat > timeoutMs) { this.endSession(s.id, "heartbeat-timeout", now); reaped.push(s.id); }
    }
    return reaped;
  }

  estopRobot(robotId: string, now = Date.now()): { ok: boolean; reason?: string } {
    const r = this.robots.get(robotId);
    if (!r) return { ok: false, reason: "unknown-robot" };
    if (r.currentSessionId) this.endSession(r.currentSessionId, "estop", now);
    r.estopped = true;
    return { ok: true };
  }
  clearEstop(robotId: string) { const r = this.robots.get(robotId); if (r) r.estopped = false; return r; }

  // ---- read models ----
  robotsForOperator(operatorId: string) {
    return [...this.robots.values()]
      .filter((r) => this.hasAccess(operatorId, r.id))
      .map((r) => ({ id: r.id, name: r.name, model: r.model, location: r.location, status: this.robotStatus(r.id) }));
  }
  allRobots() { return [...this.robots.values()].map((r) => ({ ...r, status: this.robotStatus(r.id) })); }
  allOperators() { return [...this.operators.values()]; }
  activeSessionForOperator(operatorId: string) {
    return [...this.sessions.values()].find((s) => s.state === "active" && s.operatorId === operatorId) ?? null;
  }
}
