import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AvailabilityBadge, RobotCard, SiteFooterCTA } from "@/components/explore/shared";
import { getRobot, robotsForTags } from "@/data/catalog";

export const Route = createFileRoute("/catalog/$slug")({
  loader: ({ params }) => {
    const robot = getRobot(params.slug);
    if (!robot) throw notFound();
    return { robot };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.robot.name} - CosmicBrain Catalog` },
          { name: "description", content: loaderData.robot.summary ?? "" },
        ]
      : [],
  }),
  component: RobotPage,
});

function SpecRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-right text-sm text-foreground/90">{value}</div>
    </div>
  );
}

function RobotPage() {
  const { robot } = Route.useLoaderData();
  const s = robot.specs;
  const related = robotsForTags(robot.tags, 4).filter((r) => r.slug !== robot.slug).slice(0, 3);

  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      <section className="px-6 pt-40 pb-16 md:px-12 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/catalog"
            className="font-mono text-xs text-muted-foreground hover:text-primary"
          >
            ← Catalog
          </Link>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border-strong/60 bg-card/60">
              <div className="relative aspect-[4/3] bg-background">
                {robot.image ? (
                  <img
                    src={robot.image}
                    alt={robot.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
                    NO IMAGE
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="tech-label mb-4 flex items-center gap-3">
                <span>{robot.manufacturer ?? "Unknown manufacturer"}</span>
                <AvailabilityBadge value={robot.availability} />
              </div>
              <h1 className="font-display text-4xl tracking-tight md:text-6xl">{robot.name}</h1>
              <p className="mt-5 text-foreground/75">{robot.summary}</p>
              <div className="mt-8">
                <SpecRow label="Degrees of freedom" value={s.dof != null ? String(s.dof) : null} />
                <SpecRow label="Height" value={s.heightCm != null ? `${s.heightCm} cm` : null} />
                <SpecRow label="Weight" value={s.weightKg != null ? `${s.weightKg} kg` : null} />
                <SpecRow label="Payload" value={s.payloadKg != null ? `${s.payloadKg} kg` : null} />
                <SpecRow label="Speed" value={s.speedMs != null ? `${s.speedMs} m/s` : null} />
                <SpecRow label="Form factor" value={robot.formFactor} />
                <SpecRow
                  label="Family"
                  value={robot.families.map((f) => f.name).join(", ") || null}
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/sales"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Deploy with CosmicBrain
                </Link>
                {robot.manufacturerSite && (
                  <a
                    href={robot.manufacturerSite}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border-strong px-6 py-3 text-sm text-foreground hover:bg-card"
                  >
                    Manufacturer site ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {robot.description && (
            <div className="mt-16 max-w-3xl">
              <div className="tech-label mb-4">Overview</div>
              <p className="leading-relaxed text-foreground/80">{robot.description}</p>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-16">
              <div className="tech-label mb-6">Related platforms</div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <RobotCard key={r.slug} robot={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <SiteFooterCTA context={robot.name} />
    </main>
  );
}
