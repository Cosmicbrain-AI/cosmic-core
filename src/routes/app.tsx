import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchDashboard, launch, stop as stopSessionCall, sendHeartbeat } from "@/lib/teleop/client";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Teleop — CosmicBrain" }] }),
  component: OperatorApp,
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
  const dash = useQuery({ queryKey: ["teleop", "dashboard"], queryFn: () => fetchDashboard() });
  const invalidate = () => qc.invalidateQueries({ queryKey: ["teleop", "dashboard"] });

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
            {/* Placeholder for the WebXR/video viewport (wired in M0 — connect the headset
                to this robot's edge over WebRTC). */}
            <div className="flex aspect-video items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              Headset video stream mounts here (M0)
            </div>
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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-semibold">Teleoperation</h1>
      <p className="mb-8 text-sm text-muted-foreground">Drive a CosmicBrain robot from anywhere.</p>
      {children}
    </div>
  );
}
