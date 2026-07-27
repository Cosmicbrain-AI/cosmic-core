import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { RobotCard, SiteFooterCTA } from "@/components/explore/shared";
import { getSolution } from "@/data/solutions";
import { robotsForTags } from "@/data/catalog";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.solution.name} - CosmicBrain Solutions` },
          { name: "description", content: loaderData.solution.tagline },
        ]
      : [],
  }),
  component: SolutionPage,
});

function SolutionPage() {
  const { solution } = Route.useLoaderData();
  const platforms = robotsForTags(solution.matchTags, 6);

  return (
    <main className="relative min-h-screen">
      <SiteHeader />

      <section className="px-6 pt-40 pb-16 md:px-12 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <Link to="/solutions" className="font-mono text-xs text-muted-foreground hover:text-primary">
            ← Solutions
          </Link>
          <div className="tech-label mt-6 mb-6 flex items-center gap-3">
            <span className="pulse-dot" />
            <span>CB · Solutions / {solution.code}</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            <span className="text-primary">{solution.name}</span>
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-foreground/85 md:text-2xl">{solution.tagline}</p>
          <p className="mt-6 max-w-3xl text-foreground/70">{solution.intro}</p>
        </div>
      </section>

      <section className="border-t border-border-strong/60 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="tech-label mb-8">Use cases</div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {solution.useCases.map((u) => (
              <div
                key={u.code}
                className="rounded-2xl border border-border-strong/60 bg-card/60 p-7"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-primary/15 px-2 font-mono text-xs font-semibold text-primary">
                    {u.code}
                  </span>
                  <h3 className="text-lg font-medium tracking-tight">{u.name}</h3>
                </div>
                <p className="text-sm text-foreground/70">{u.desc}</p>
                <ul className="mt-4 space-y-2">
                  {u.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/60">
                      <span className="text-primary">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {solution.deployments && (
        <section className="border-t border-border-strong/60 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="tech-label mb-8">Deployments in the wild</div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {solution.deployments.map((d) => (
                <div key={d.site} className="rounded-2xl border border-border-strong/60 bg-card/60 p-6">
                  <div className="text-lg font-medium tracking-tight">{d.site}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                    {d.robot}
                  </div>
                  <p className="mt-3 text-sm text-foreground/65">{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {platforms.length > 0 && (
        <section className="border-t border-border-strong/60 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div className="tech-label">Platforms that fit</div>
              <Link to="/catalog" className="font-mono text-xs text-muted-foreground hover:text-primary">
                Full catalog →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {platforms.map((r) => (
                <RobotCard key={r.slug} robot={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border-strong/60 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="tech-label mb-8">Evaluation checklist</div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {solution.checklist.map((c) => (
              <div key={c.category} className="rounded-2xl border border-border-strong/60 bg-card/60 p-6">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                  {c.category}
                </h3>
                <ul className="space-y-3">
                  {c.items.map((i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-foreground/70">
                      <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm border border-border-strong" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooterCTA context={`humanoids in ${solution.name.toLowerCase()}`} />
    </main>
  );
}
