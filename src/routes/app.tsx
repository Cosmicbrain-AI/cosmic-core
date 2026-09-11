import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Bot, Headset, ShieldCheck } from "lucide-react";
import "@/components/workspace.css";
import { CosmicMark } from "@/components/SiteHeader";

import { RequireAuth, SignOutButton } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  fetchDashboard,
  launch,
  stop as stopSessionCall,
  sendHeartbeat,
} from "@/lib/teleop/client";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Teleop — CosmicBrain" }] }),
  component: () => (
    <RequireAuth>
      <OperatorApp />
    </RequireAuth>
  ),
});

type Status = "offline" | "available" | "in_session" | "estopped";
const statusVariant: Record<Status, "default" | "secondary" | "destructive" | "outline"> = {
  available: "default",
  in_session: "secondary",
  offline: "outline",
  estopped: "destructive",
};

function OperatorApp() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const dash = useQuery({ queryKey: ["teleop", "dashboard"], queryFn: () => fetchDashboard() });
  const invalidate = () => qc.invalidateQueries({ queryKey: ["teleop", "dashboard"] });

  // If the session died between the guard check and the fetch, bounce to login
  // instead of showing a cryptic error.
  useEffect(() => {
    if (dash.error && String(dash.error).includes("not-authenticated")) navigate({ to: "/login" });
  }, [dash.error, navigate]);

  const launchMut = useMutation({
    mutationFn: (robotId: string) => launch(robotId),
    onSuccess: (res) => {
      if (res.ok) toast.success("Session acquired — you have exclusive control.");
      else toast.error(`Can't launch: ${res.reason.replace(/-/g, " ")}`);
      invalidate();
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "The request failed. Please try again."),
  });

  const stop = useMutation({
    mutationFn: (sessionId: string) => stopSessionCall(sessionId),
    onSuccess: () => {
      toast.message("Session ended. Robot released.");
      invalidate();
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "The request failed. Please try again."),
  });

  const active = dash.data?.activeSession ?? null;

  // Liveness heartbeat while a session is active — the server reaps a session whose
  // heartbeat goes stale, so if this tab dies the robot is freed automatically.
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      sendHeartbeat(active.id).catch(() => {});
    }, 2000);
    return () => clearInterval(t);
  }, [active?.id]);

  if (dash.isLoading)
    return (
      <Shell>
        <p className="cb-workspace-notice" role="status">
          Getting your workspace ready…
        </p>
      </Shell>
    );

  const me = dash.data?.me;
  if (me && !me.approved) {
    return (
      <Shell>
        <Card className="cb-workspace-card">
          <CardHeader>
            <ShieldCheck className="mb-3 text-signal" size={30} strokeWidth={1.4} />
            <CardTitle className="cb-workspace-title">You’re on the list.</CardTitle>
            <CardDescription>
              Your account is pending approval. An admin will grant operator access and assign your
              robots before you can start a session.
            </CardDescription>
          </CardHeader>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell>
      {dash.isError && (
        <div className="cb-workspace-notice cb-workspace-error" role="alert">
          We couldn’t refresh your workspace.{" "}
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() => dash.refetch()}
          >
            Try again
          </button>
        </div>
      )}
      {active && (
        <Card className="cb-workspace-card cb-workspace-live mb-6">
          <CardHeader>
            <span className="cb-workspace-status">
              <Headset size={16} /> Live session
            </span>
            <CardTitle className="cb-workspace-title">You’re in the loop.</CardTitle>
            <CardDescription>
              You hold exclusive control of <b>{active.robotId}</b>. Put on your headset to drive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Handoff to the cb-teleop/televuer flow: video + pose run headset↔robot over the
                LAN/edge, not through this browser. This gate just grants the exclusive lock and
                hands the operator the WebXR URL to open on the headset. */}
            <HeadsetHandoff url={active.teleopUrl} />
            <Button
              variant="destructive"
              onClick={() => stop.mutate(active.id)}
              disabled={stop.isPending}
            >
              {stop.isPending ? "Stopping session…" : "Stop session"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {dash.data?.robots.map((r) => {
          const status = r.status as Status;
          const canLaunch = status === "available" && !active && !launchMut.isPending;
          return (
            <Card key={r.id} className="cb-workspace-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="cb-workspace-robot-id">
                    <Bot size={23} strokeWidth={1.4} />
                    <CardTitle className="cb-workspace-robot-title">{r.name}</CardTitle>
                  </div>
                  <Badge variant={statusVariant[status]}>{status.replace(/_/g, " ")}</Badge>
                </div>
                <CardDescription>
                  {r.model} · {r.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  disabled={!canLaunch}
                  onClick={() => launchMut.mutate(r.id)}
                >
                  {launchMut.isPending && launchMut.variables === r.id
                    ? "Starting session…"
                    : status === "in_session"
                      ? "In use"
                      : "Launch teleop"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {dash.data?.robots.length === 0 && (
          <p className="cb-workspace-notice sm:col-span-2">
            Your workbench is ready. An admin can assign a robot to help you get started.
          </p>
        )}
      </div>
    </Shell>
  );
}

function HeadsetHandoff({ url }: { url: string | null }) {
  if (!url) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        You hold the lock, but no headset URL is configured for this robot yet. An admin can set it
        on the <b>/admin</b> page (the televuer/WebXR endpoint, e.g.{" "}
        <code>https://192.168.123.2:8012/?ws=wss://192.168.123.2:8012</code>).
      </div>
    );
  }
  const copy = () => {
    navigator.clipboard?.writeText(url).then(
      () => toast.success("URL copied — open it in your headset browser."),
      () => toast.error("Couldn't copy — select the URL manually."),
    );
  };
  return (
    <div className="space-y-3 rounded-md border p-4">
      <div>
        <div className="font-medium">Put on your headset and open this in its browser:</div>
        <div className="mt-1 break-all font-mono text-sm text-primary">{url}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={copy}>
          Copy URL
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={url} target="_blank" rel="noreferrer">
            Open in this browser
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Video and hand/controller pose stream directly between your headset and the robot. Your
        device must be able to reach the robot's network (LAN or VPN). This page holds your
        exclusive lock — keep it open; closing it releases the robot.
      </p>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="cb-workspace">
      <div className="cb-workspace-topbar">
        <Link to="/" className="cb-workspace-brand">
          <CosmicMark className="h-6 w-6" /> cosmicbrain.
        </Link>
        <span>Operator workspace</span>
      </div>
      <div className="cb-workspace-inner">
        <p className="cb-eyebrow">People + robots, working together</p>
        <div className="cb-workspace-heading">
          <h1>Your robot workbench.</h1>
          <SignOutButton />
        </div>
        <p className="cb-workspace-description">
          Your assigned robots, their availability, and your teleoperation session — all in one
          place.
        </p>
        {children}
        <p className="cb-workspace-footer">
          CosmicBrain / Teleoperation · Built around the human in the loop.
        </p>
      </div>
    </main>
  );
}
