// supabase.server.ts — SERVER-ONLY Supabase clients. The .server.ts suffix keeps this out
// of the browser bundle (the service-role key must NEVER reach the client).
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import process from "node:process";

// Public config is fine to read from Vite's import.meta.env (available server-side too).
const URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const noPersist = { auth: { persistSession: false, autoRefreshToken: false } } as const;

/** Client scoped to a signed-in operator's JWT: RPCs see auth.uid() and RLS applies. */
export function userClient(accessToken: string): SupabaseClient {
  return createClient(URL, ANON, {
    ...noPersist,
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

/** Privileged client (bypasses RLS). Server-only; requires the service-role secret. */
export function serviceClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set — add it to .env.local (and Vercel env).");
  return createClient(URL, key, noPersist);
}

/** Verify the caller's token; return their id + a user-scoped client. Throws if invalid. */
export async function requireOperator(accessToken: string) {
  if (!accessToken) throw new Error("not-authenticated");
  const uc = userClient(accessToken);
  const { data, error } = await uc.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("not-authenticated");
  return { uc, userId: data.user.id, email: data.user.email ?? "" };
}

/** Verify the caller is an approved admin; return a privileged client. Throws otherwise. */
export async function requireAdmin(accessToken: string) {
  const { userId } = await requireOperator(accessToken);
  const svc = serviceClient();
  const { data, error } = await svc.from("operators").select("role").eq("id", userId).single();
  if (error || data?.role !== "admin") throw new Error("forbidden: admin only");
  return { svc, userId };
}

/** Derive a robot's status the same way the broker did. */
export function robotStatus(r: { online: boolean; estopped: boolean; current_session_id: string | null }) {
  if (r.estopped) return "estopped" as const;
  if (!r.online) return "offline" as const;
  return r.current_session_id ? ("in_session" as const) : ("available" as const);
}
