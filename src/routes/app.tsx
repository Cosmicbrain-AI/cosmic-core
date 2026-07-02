import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { RequireAuth, SignOutButton } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchDashboard, launch, stop as stopSessionCall, sendHeartbeat } from "@/lib/teleop/client";

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
  });

  const stop = useMutation({
    mutationFn: (sessionId: string) => stopSessionCall(sessionId),
    onSuccess: () => {
      toast.message("Session ended. Robot released.");
      invalidate();
    },
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

  if (dash.isLoading) return <Shell><p className="text-muted-foreground">Loading…</p></Shell>;

  const me = dash.data?.me;
  if (me && !me.approved) {
    return (
      <Shell>
        <Card>
          <CardHeader>
            <CardTitle>Account pending approval</CardTitle>
            <CardDescription>
              Your account exists but hasn't been granted operator access yet. CosmicBrain
              curates who can drive robots — you'll get access once approved.
            </CardDescription>
          </CardHeader>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell>
      {active && (
        <Card className="mb-6 border-primary">
          <CardHeader>
            <CardTitle>Live session</CardTitle>
            <CardDescription>
              You hold exclusive control of <b>{active.robotId}</b>. Put on your headset to drive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Handoff to the cb-teleop/televuer flow: video + pose run headset↔robot over the
                LAN/edge, not through this browser. This gate just grants the exclusive lock and
                hands the operator the WebXR URL to open on the headset. */}
            <HeadsetHandoff url={active.teleopUrl} />
            <Button variant="destructive" onClick={() => stop.mutate(active.id)} disabled={stop.isPending}>
              Stop session
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {dash.data?.robots.map((r) => {
          const status = r.status as Status;
          const canLaunch = status === "available" && !active && !launchMut.isPending;
          return (
            <Card key={r.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{r.name}</CardTitle>
                  <Badge variant={statusVariant[status]}>{status.replace(/_/g, " ")}</Badge>
                </div>
                <CardDescription>{r.model} · {r.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  disabled={!canLaunch}
                  onClick={() => launchMut.mutate(r.id)}
                >
                  {status === "in_session" ? "In use" : "Launch teleop"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {dash.data?.robots.length === 0 && (
          <p className="text-muted-foreground">No robots assigned to you yet.</p>
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
        <Button size="sm" variant="secondary" onClick={copy}>Copy URL</Button>
        <Button size="sm" variant="outline" asChild>
          <a href={url} target="_blank" rel="noreferrer">Open in this browser</a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Video and hand/controller pose stream directly between your headset and the robot. Your
        device must be able to reach the robot's network (LAN or VPN). This page holds your exclusive
        lock — keep it open; closing it releases the robot.
      </p>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-1 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">Teleoperation</h1>
        <SignOutButton />
      </div>
      <p className="mb-8 text-sm text-muted-foreground">Drive a CosmicBrain robot from anywhere.</p>
      {children}
    </div>
  );
}
