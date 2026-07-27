import { Link } from "@tanstack/react-router";
import type { Robot } from "@/data/catalog";

export function PageHero({
  kicker,
  title,
  accent,
  sub,
}: {
  kicker: string;
  title: string;
  accent?: string;
  sub: string;
}) {
  return (
    <section className="px-6 pt-40 pb-14 md:px-12 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="tech-label mb-6 flex items-center gap-3">
          <span className="pulse-dot" />
          <span>{kicker}</span>
        </div>
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-primary">{accent}</span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-foreground/75 md:text-xl">{sub}</p>
      </div>
    </section>
  );
}

export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground"
          : "rounded-full border border-border-strong px-3.5 py-1.5 text-sm text-foreground/70 hover:bg-card hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-sm text-foreground/90">{value}</div>
    </div>
  );
}

export function AvailabilityBadge({ value }: { value: Robot["availability"] }) {
  if (!value) return null;
  const tone =
    value === "In Stock"
      ? "text-primary border-primary/40 bg-primary/10"
      : "text-foreground/70 border-border-strong bg-card";
  return (
    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tone}`}>
      {value}
    </span>
  );
}

export function RobotCard({ robot }: { robot: Robot }) {
  const s = robot.specs;
  return (
    <Link
      to="/catalog/$slug"
      params={{ slug: robot.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-strong/60 bg-card/60 transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        {robot.image ? (
          <img
            src={robot.image}
            alt={robot.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
            NO IMAGE
          </div>
        )}
        <div className="absolute top-3 right-3">
          <AvailabilityBadge value={robot.availability} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {robot.manufacturer ?? "—"}
          </div>
          <div className="mt-0.5 text-lg font-medium tracking-tight group-hover:text-primary">
            {robot.name}
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-foreground/65">{robot.summary}</p>
        <div className="mt-auto grid grid-cols-4 gap-2 border-t border-border/60 pt-3">
          <Spec label="DoF" value={s.dof != null ? String(s.dof) : "—"} />
          <Spec label="Height" value={s.heightCm != null ? `${s.heightCm} cm` : "—"} />
          <Spec label="Weight" value={s.weightKg != null ? `${s.weightKg} kg` : "—"} />
          <Spec label="Payload" value={s.payloadKg != null ? `${s.payloadKg} kg` : "—"} />
        </div>
      </div>
    </Link>
  );
}

export function SiteFooterCTA({ context }: { context: string }) {
  return (
    <section className="border-t border-border-strong/60 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-3xl tracking-tight md:text-5xl">
          Ready to put {context} to work?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          CosmicBrain is the teleoperation, data, and deployment layer for every platform on this
          page. We don&apos;t make robots — we make robots work.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/sales"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Book a Pilot
          </Link>
          <Link
            to="/app"
            className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground hover:bg-card"
          >
            See Live Teleop
          </Link>
        </div>
      </div>
    </section>
  );
}
