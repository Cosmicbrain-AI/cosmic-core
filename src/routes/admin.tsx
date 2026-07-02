import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adminOperators,
  adminApprove,
  adminRobots,
  adminGrants,
  adminGrant,
  adminAddRobot,
  adminEstop,
  adminSetTeleopUrl,
} from "@/lib/teleop/client";
import { RequireAuth, SignOutButton } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CosmicBrain Teleop" }] }),
  component: () => (
    <RequireAuth>
      <Admin />
    </RequireAuth>
  ),
});

// Validate a headset (televuer/WebXR) URL. Empty is allowed (optional field). Catches
// the exact mistake that shipped a dead link: an un-substituted <placeholder>.
function teleopUrlError(u: string): string | null {
  const s = u.trim();
  if (!s) return null;
  if (/[<>]/.test(s)) return "Looks like a placeholder — replace <…> with the real host IP.";
  let parsed: URL;
  try {
    parsed = new URL(s);
  } catch {
    return "Not a valid URL.";
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "Must be an http(s):// URL.";
  return null;
}

function Admin() {
  const qc = useQueryClient();
  const operators = useQuery({ queryKey: ["admin", "operators"], queryFn: () => adminOperators() });
  const robots = useQuery({ queryKey: ["admin", "robots"], queryFn: () => adminRobots() });
  const grants = useQuery({ queryKey: ["admin", "grants"], queryFn: () => adminGrants() });

  const refetchOps = () => qc.invalidateQueries({ queryKey: ["admin", "operators"] });
  const refetchRobots = () => qc.invalidateQueries({ queryKey: ["admin", "robots"] });
  const refetchGrants = () => qc.invalidateQueries({ queryKey: ["admin", "grants"] });

  const approve = useMutation({
    mutationFn: (v: { operatorId: string; approved: boolean }) => adminApprove(v.operatorId, v.approved),
    onSuccess: refetchOps,
    onError: (e) => toast.error(String(e)),
  });
  const grant = useMutation({
    mutationFn: (v: { operatorId: string; robotId: string; grant: boolean }) => adminGrant(v.operatorId, v.robotId, v.grant),
    onSuccess: refetchGrants,
    onError: (e) => toast.error(String(e)),
  });
  const estop = useMutation({
    mutationFn: (v: { robotId: string; estop: boolean }) => adminEstop(v.robotId, v.estop),
    onSuccess: refetchRobots,
    onError: (e) => toast.error(String(e)),
  });

  const hasGrant = (operatorId: string, robotId: string) =>
    (grants.data ?? []).some((g) => g.operator_id === operatorId && g.robot_id === robotId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-1 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">Admin — access & robots</h1>
        <SignOutButton />
      </div>
      <p className="mb-8 text-sm text-muted-foreground">Curate who can drive, and manage the robot fleet.</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Operators</CardTitle>
          <CardDescription>Approve who can teleoperate, and assign which robots they may drive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {operators.data?.map((op) => (
            <div key={op.id} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{op.email}</div>
                  <div className="text-xs text-muted-foreground">{op.role}</div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  {op.approved ? "Approved" : "Pending"}
                  <Switch checked={op.approved} onCheckedChange={(approved) => approve.mutate({ operatorId: op.id, approved })} />
                </label>
              </div>
              {op.approved && (
                <div className="mt-3 flex flex-wrap gap-3 pl-1">
                  {robots.data?.map((r) => (
                    <label key={r.id} className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                      {r.name}
                      <Switch
                        checked={hasGrant(op.id, r.id)}
                        onCheckedChange={(g) => grant.mutate({ operatorId: op.id, robotId: r.id, grant: g })}
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          {operators.data?.length === 0 && <p className="text-muted-foreground">No operators yet.</p>}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Robots</CardTitle>
          <CardDescription>Fleet status and emergency stop.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {robots.data?.map((r) => (
            <div key={r.id} className="border-b pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.model} · {r.location}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={r.status === "estopped" ? "destructive" : r.status === "available" ? "default" : "secondary"}>
                    {r.status.replace(/_/g, " ")}
                  </Badge>
                  <label className="flex items-center gap-2 text-sm text-destructive">
                    E-stop
                    <Switch checked={r.estopped} onCheckedChange={(v) => estop.mutate({ robotId: r.id, estop: v })} />
                  </label>
                </div>
              </div>
              <TeleopUrlEditor robotId={r.id} initial={r.teleop_url ?? ""} onSaved={refetchRobots} />
            </div>
          ))}
          {robots.data?.length === 0 && <p className="text-muted-foreground">No robots yet — add one below.</p>}
        </CardContent>
      </Card>

      <AddRobot onAdded={refetchRobots} />
    </div>
  );
}

function TeleopUrlEditor({ robotId, initial, onSaved }: { robotId: string; initial: string; onSaved: () => void }) {
  const [url, setUrl] = useState(initial);
  const err = teleopUrlError(url);
  const save = useMutation({
    mutationFn: () => adminSetTeleopUrl(robotId, url),
    onSuccess: (res) => {
      if (res && "ok" in res && !res.ok) return toast.error(res.error ?? "Failed to save URL");
      toast.success("Headset URL saved.");
      onSaved();
    },
    onError: (e) => toast.error(String(e)),
  });
  return (
    <div className="mt-2 flex flex-wrap items-end gap-2">
      <div className="flex-1 space-y-1" style={{ minWidth: 260 }}>
        <Label className="text-xs text-muted-foreground">Headset URL (televuer/WebXR endpoint)</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://<host-ip>:8012/?ws=wss://<host-ip>:8012"
          className="font-mono text-xs"
          aria-invalid={!!err}
        />
        {err && <p className="text-xs text-destructive">{err}</p>}
      </div>
      <Button size="sm" variant="secondary" disabled={url === initial || !!err || save.isPending} onClick={() => save.mutate()}>
        Save
      </Button>
    </div>
  );
}

function AddRobot({ onAdded }: { onAdded: () => void }) {
  const empty = { id: "", name: "", model: "Unitree G1 (G1_29, 29-DOF)", location: "", teleopUrl: "" };
  const [form, setForm] = useState(empty);
  const add = useMutation({
    mutationFn: () => adminAddRobot(form),
    onSuccess: (res) => {
      if (res && "ok" in res && !res.ok) return toast.error(res.error ?? "Failed to add robot");
      toast.success("Robot added.");
      setForm(empty);
      onAdded();
    },
    onError: (e) => toast.error(String(e)),
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  const urlErr = teleopUrlError(form.teleopUrl);

  return (
    <Card>
      <CardHeader><CardTitle>Add a robot</CardTitle></CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="ID (slug)"><Input value={form.id} onChange={set("id")} placeholder="g1-cell-b" /></Field>
          <Field label="Name"><Input value={form.name} onChange={set("name")} placeholder="G1 — Cell B" /></Field>
          <Field label="Model"><Input value={form.model} onChange={set("model")} /></Field>
          <Field label="Location"><Input value={form.location} onChange={set("location")} placeholder="Lab cell B (fenced)" /></Field>
          <Field label="Headset URL (optional)">
            <Input value={form.teleopUrl} onChange={set("teleopUrl")} placeholder="https://<host-ip>:8012/?ws=wss://<host-ip>:8012" aria-invalid={!!urlErr} />
            {urlErr && <p className="text-xs text-destructive">{urlErr}</p>}
          </Field>
        </div>
        <Button className="mt-4" disabled={!form.id || !form.name || !form.location || !!urlErr || add.isPending} onClick={() => add.mutate()}>
          Add robot
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
