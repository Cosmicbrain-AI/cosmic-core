// client.ts — browser-side wrappers that attach the signed-in operator's Supabase access
// token to each teleop server-function call. Routes import from here, not from the raw
// *.functions module, so token handling lives in one place.
import { supabase } from "@/lib/supabase";
import * as fns from "./teleop.functions";

async function token(): Promise<string> {
  let { data: { session } } = await supabase.auth.getSession();
  // Access tokens live ~1h. If the stored one is expired (or within 60s of it),
  // force a refresh before calling the server, so a long-idle tab doesn't send a
  // dead token and get a cryptic "not-authenticated" on submit. If the refresh
  // token itself is gone, session becomes null and callers surface the auth error.
  if (session?.expires_at && session.expires_at * 1000 < Date.now() + 60_000) {
    ({ data: { session } } = await supabase.auth.refreshSession());
  }
  return session?.access_token ?? "";
}

// operator
export async function fetchDashboard() {
  return fns.getMyDashboard({ data: { accessToken: await token() } });
}
export async function launch(robotId: string) {
  return fns.launchSession({ data: { accessToken: await token(), robotId } });
}
export async function sendHeartbeat(sessionId: string) {
  return fns.heartbeat({ data: { accessToken: await token(), sessionId } });
}
export async function stop(sessionId: string) {
  return fns.stopSession({ data: { accessToken: await token(), sessionId } });
}

// admin
export async function adminOperators() {
  return fns.adminListOperators({ data: { accessToken: await token() } });
}
export async function adminApprove(operatorId: string, approved: boolean) {
  return fns.adminApproveOperator({ data: { accessToken: await token(), operatorId, approved } });
}
export async function adminRobots() {
  return fns.adminListRobots({ data: { accessToken: await token() } });
}
export async function adminGrants() {
  return fns.adminListGrants({ data: { accessToken: await token() } });
}
export async function adminAddRobot(r: { id: string; name: string; model: string; location: string; teleopUrl?: string }) {
  return fns.adminAddRobot({ data: { accessToken: await token(), ...r } });
}
export async function adminSetTeleopUrl(robotId: string, teleopUrl: string) {
  return fns.adminSetTeleopUrl({ data: { accessToken: await token(), robotId, teleopUrl } });
}
export async function adminGrant(operatorId: string, robotId: string, grant: boolean) {
  return fns.adminGrantAccess({ data: { accessToken: await token(), operatorId, robotId, grant } });
}
export async function adminEstop(robotId: string, estop: boolean) {
  return fns.adminEstop({ data: { accessToken: await token(), robotId, estop } });
}
