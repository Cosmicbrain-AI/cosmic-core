// Browser Supabase client. Uses the PUBLIC anon key (safe to ship — access is governed
// by Row Level Security on the database). Server-only privileged access uses the service
// role key via a separate .server.ts client (never import this one for privileged writes).
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Fail loud in dev rather than a confusing runtime null later.
  console.warn("[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — set them in .env.local");
}

export const supabase = createClient(url ?? "", anonKey ?? "", {
  auth: { persistSession: true, autoRefreshToken: true },
});
