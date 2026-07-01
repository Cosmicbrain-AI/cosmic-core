// store.server.ts — the process-wide broker instance (server-only; never bundled to client).
//
// DEV/PRE-SUPABASE ONLY. This seeds an in-memory broker so the whole flow runs locally with
// `bun dev`. Two things change when Supabase is wired (keys pending from Anto):
//   1. This singleton is replaced by Supabase-Postgres-backed reads/writes (module-level
//      state does not survive across Vercel serverless invocations).
//   2. `getCurrentOperator()` is replaced by the real Supabase Auth session. For now it
//      returns a fixed DEV operator so the pages are usable before login exists.

import { SessionBroker } from "./broker";

const g = globalThis as unknown as { __teleopBroker?: SessionBroker };

function seed(): SessionBroker {
  const b = new SessionBroker();

  // The robot we've been working with in the teleop repo (see G1_29 default in cb-teleop).
  b.addRobot({
    id: "g1-cell-a",
    name: "G1 — Cell A",
    model: "Unitree G1 (G1_29, 29-DOF)",
    location: "Lab cell A (fenced)",
  });
  b.setRobotOnline("g1-cell-a", true);

  // Temporary dev identity until Supabase Auth. Pre-approved + granted so the dashboard works.
  b.upsertOperator("dev-operator", "dev@cosmicbrain.ai", { role: "admin", approved: true });
  b.grantAccess("dev-operator", "g1-cell-a");

  return b;
}

/** Singleton across HMR reloads in dev. */
export function getBroker(): SessionBroker {
  if (!g.__teleopBroker) g.__teleopBroker = seed();
  return g.__teleopBroker;
}

/** TEMP: current operator id. Replace with Supabase Auth session lookup. */
export function getCurrentOperatorId(): string {
  return "dev-operator";
}
