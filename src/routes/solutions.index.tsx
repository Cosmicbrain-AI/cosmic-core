import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, SiteFooterCTA } from "@/components/explore/shared";
import { solutions } from "@/data/solutions";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions - CosmicBrain · Humanoids by industry" },
      {
        name: "description",
        content:
          "Where humanoid robots actually earn their keep — manufacturing, logistics, healthcare, hospitality, research, and general-purpose deployment guides.",
      },
      { rel: "canonical", href: "https://www.cosmicbrain.ai/solutions" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      <PageHero
        kicker="CB · Solutions / Industries"
        title="Humanoids,"
        accent="by industry."
        sub="Honest deployment guides for the six places humanoid labor is actually being evaluated today — use cases, pilot criteria, and the platforms that fit."
      />
      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/solutions/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col gap-4 rounded-2xl border border-border-strong/60 bg-card/60 p-8 transition-colors hover:border-primary/50"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-muted-foreground group-hover:text-primary">
                  {s.code}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.useCases.length} use cases
                </span>
              </div>
              <h2 className="font-display text-3xl tracking-tight group-hover:text-primary">
                {s.name}
              </h2>
              <p className="text-sm text-foreground/70">{s.tagline}</p>
              <div className="mt-auto border-t border-border/60 pt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {s.short}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooterCTA context="humanoids in your industry" />
    </main>
  );
}
