// client.ts — browser-side wrappers that attach the signed-in operator's Supabase access
// token to each teleop server-function call. Routes import from here, not from the raw
// *.functions module, so token handling lives in one place.
import { supabase } from "@/lib/supabase";
import * as fns from "./teleop.functions";

async function token(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
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
export async function adminAddRobot(r: { id: string; name: string; model: string; location: string }) {
  return fns.adminAddRobot({ data: { accessToken: await token(), ...r } });
}
export async function adminGrant(operatorId: string, robotId: string, grant: boolean) {
  return fns.adminGrantAccess({ data: { accessToken: await token(), operatorId, robotId, grant } });
}
export async function adminEstop(robotId: string, estop: boolean) {
  return fns.adminEstop({ data: { accessToken: await token(), robotId, estop } });
}
