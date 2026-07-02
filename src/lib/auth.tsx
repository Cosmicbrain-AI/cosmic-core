// auth.tsx — client-side session helpers. Supabase auth here is localStorage-based
// (not cookies), so the server can't see it during SSR; these guards are UX only.
// The real security boundary is server-side: every teleop server-fn calls
// requireOperator/requireAdmin and RLS enforces row access. A guard here just avoids
// rendering a broken page (or firing doomed queries) when there's no live session.
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (mounted) {
        setSession(s);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

export async function signOut() {
  await supabase.auth.signOut();
}

/** Wrap a protected page. Redirects to /login when there's no live session. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </div>
    );
  }
  if (!session) return null; // redirecting to /login
  return <>{children}</>;
}

/** Sign-out button; sends the user back to /login. */
export function SignOutButton() {
  const navigate = useNavigate();
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={async () => {
        await signOut();
        navigate({ to: "/login" });
      }}
    >
      Sign out
    </Button>
  );
}
