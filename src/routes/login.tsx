import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Bot, ShieldCheck } from "lucide-react";
import "@/components/workspace.css";
import { CosmicMark } from "@/components/SiteHeader";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CosmicBrain Teleop" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created. An admin must approve you before you can drive a robot.");
        navigate({ to: "/app" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/app" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  // Google OAuth. Supabase redirects to Google, then back to redirectTo with the
  // session in the URL — the supabase client (detectSessionInUrl) finishes sign-in
  // on load. New Google users hit the same handle_new_user trigger + approval gate.
  async function google() {
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/app` },
      });
      if (error) throw error;
      // A successful OAuth request navigates to Google.
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn’t connect to Google. Please try again.";
      setError(message);
      toast.error(message);
      setBusy(false);
    }
  }

  return (
    <main className="cb-login">
      <div className="cb-login-topbar">
        <Link to="/" className="cb-workspace-brand">
          <CosmicMark className="h-6 w-6" /> cosmicbrain.
        </Link>
        <Link to="/" className="cb-text-link">
          <ArrowLeft size={15} /> Back to the website
        </Link>
      </div>
      <div className="cb-login-layout">
        <section className="cb-login-welcome">
          <span className="cb-eyebrow">The human side of the robot</span>
          <h1>
            Good to have
            <br />
            <em>you here.</em>
          </h1>
          <p>
            A place for people and robots to work together. Sign in to your CosmicBrain operator
            workspace.
          </p>
          <div className="cb-login-study" aria-hidden="true">
            <span className="cb-study-caption">THE COLLABORATION EQUATION</span>
            <div>
              <span>
                human
                <br />
                <small>intuition</small>
              </span>
              <b>+</b>
              <Bot size={64} strokeWidth={1} />
              <b>=</b>
              <span>
                new
                <br />
                <small>possibilities</small>
              </span>
            </div>
            <span className="cb-study-footer">a little engineering. a lot of care.</span>
          </div>
          <p className="cb-login-access">
            <ShieldCheck size={19} /> Robot access is granted to approved operators.
          </p>
        </section>
        <Card className="cb-login-card">
          <CardHeader>
            <CardTitle className="cb-login-title">
              {mode === "signin" ? "Welcome back." : "Come on in."}
            </CardTitle>
            <CardDescription>
              {mode === "signin"
                ? "Your workspace is just a sign-in away."
                : "Create your account. An admin will review your access before you can operate a robot."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5" aria-busy={busy}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="cb-form-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={busy}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="cb-form-input"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  placeholder="At least 6 characters"
                  disabled={busy}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="cb-login-submit w-full" disabled={busy}>
                {busy
                  ? "Connecting…"
                  : mode === "signin"
                    ? "Sign in to your workspace"
                    : "Create your account"}
                {!busy && <ArrowRight size={16} />}
              </Button>
              {error && (
                <p className="cb-form-error" role="alert">
                  {error}
                </p>
              )}
            </form>

            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="cb-login-google w-full"
              disabled={busy}
              onClick={google}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
                />
              </svg>
              Continue with Google
            </Button>

            <button
              type="button"
              className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
              disabled={busy}
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
              }}
            >
              {mode === "signin" ? "No account? Sign up" : "Have an account? Sign in"}
            </button>
          </CardContent>
        </Card>
      </div>
      <div className="cb-login-bottom">CosmicBrain · Built for people who build.</div>
    </main>
  );
}
