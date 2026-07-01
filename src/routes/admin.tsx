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
  adminListOperators,
  adminApproveOperator,
  adminListRobots,
  adminAddRobot,
  adminEstop,
} from "@/lib/teleop/teleop.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CosmicBrain Teleop" }] }),
  component: Admin,
});

function Admin() {
  const qc = useQueryClient();
  const operators = useQuery({ queryKey: ["admin", "operators"], queryFn: () => adminListOperators() });
  const robots = useQuery({ queryKey: ["admin", "robots"], queryFn: () => adminListRobots() });

  const approve = useMutation({
    mutationFn: (v: { operatorId: string; approved: boolean }) => adminApproveOperator({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "operators"] }),
  });
  const estop = useMutation({
    mutationFn: (v: { robotId: string; estop: boolean }) => adminEstop({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "robots"] }),
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-semibold">Admin — access & robots</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Curate who can drive, and manage the robot fleet.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Operators</CardTitle>
          <CardDescription>Approve who is allowed to teleoperate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {operators.data?.map((op) => (
            <div key={op.id} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div>
                <div className="font-medium">{op.email}</div>
                <div className="text-xs text-muted-foreground">{op.role}</div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                {op.approved ? "Approved" : "Pending"}
                <Switch
                  checked={op.approved}
                  onCheckedChange={(approved) => approve.mutate({ operatorId: op.id, approved })}
                />
              </label>
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
            <div key={r.id} className="flex items-center justify-between border-b pb-2 last:border-0">
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
          ))}
        </CardContent>
      </Card>

      <AddRobot onAdded={() => qc.invalidateQueries({ queryKey: ["admin", "robots"] })} />
    </div>
  );
}

function AddRobot({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({ id: "", name: "", model: "Unitree G1 (G1_29, 29-DOF)", location: "" });
  const add = useMutation({
    mutationFn: () => adminAddRobot({ data: form }),
    onSuccess: () => {
      toast.success("Robot added.");
      setForm({ id: "", name: "", model: "Unitree G1 (G1_29, 29-DOF)", location: "" });
      onAdded();
    },
    onError: (e) => toast.error(String(e)),
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a robot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="ID (slug)"><Input value={form.id} onChange={set("id")} placeholder="g1-cell-b" /></Field>
          <Field label="Name"><Input value={form.name} onChange={set("name")} placeholder="G1 — Cell B" /></Field>
          <Field label="Model"><Input value={form.model} onChange={set("model")} /></Field>
          <Field label="Location"><Input value={form.location} onChange={set("location")} placeholder="Lab cell B (fenced)" /></Field>
        </div>
        <Button className="mt-4" disabled={!form.id || !form.name || !form.location || add.isPending} onClick={() => add.mutate()}>
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
