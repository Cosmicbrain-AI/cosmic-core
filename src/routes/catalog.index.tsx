import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, FilterPill, RobotCard, SiteFooterCTA } from "@/components/explore/shared";
import { robots, families } from "@/data/catalog";

export const Route = createFileRoute("/catalog/")({
  head: () => ({
    meta: [
      { title: "Catalog - CosmicBrain · Every humanoid platform, one place" },
      {
        name: "description",
        content:
          "Browse 100+ humanoid robot platforms with specs, availability, and manufacturer data — all deployable through CosmicBrain teleoperation.",
      },
      { rel: "canonical", href: "https://www.cosmicbrain.ai/catalog" },
    ],
  }),
  component: CatalogPage,
});

const AVAILABILITY = ["In Stock", "Preorder", "Coming Soon"] as const;

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<string | null>(null);
  const [avail, setAvail] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return robots.filter((r) => {
      if (family && !r.families.some((f) => f.slug === family)) return false;
      if (avail && r.availability !== avail) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.manufacturer ?? "").toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
      );
    });
  }, [query, family, avail]);

  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      <PageHero
        kicker="CB · Catalog / Platforms"
        title="Every humanoid,"
        accent="one catalog."
        sub={`${robots.length} humanoid platforms tracked with specs, availability, and manufacturer data — every one of them deployable through the CosmicBrain stack.`}
      />

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search robots, manufacturers, tags…"
              className="w-full max-w-md rounded-full border border-border-strong bg-card/60 px-5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <div className="flex flex-wrap gap-2">
              <FilterPill active={family === null} onClick={() => setFamily(null)}>
                All families
              </FilterPill>
              {families.map((f) => (
                <FilterPill
                  key={f.slug}
                  active={family === f.slug}
                  onClick={() => setFamily(family === f.slug ? null : f.slug)}
                >
                  {f.name.replace(/ Humanoids?$/, "").replace(/ & Support Systems$/, "")}
                </FilterPill>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY.map((a) => (
                <FilterPill key={a} active={avail === a} onClick={() => setAvail(avail === a ? null : a)}>
                  {a}
                </FilterPill>
              ))}
              <span className="ml-2 self-center font-mono text-xs text-muted-foreground">
                {filtered.length} / {robots.length} shown
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <RobotCard key={r.slug} robot={r} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-24 text-center font-mono text-sm text-muted-foreground">
              No platforms match those filters.
            </div>
          )}
        </div>
      </section>

      <SiteFooterCTA context="any of these platforms" />
    </main>
  );
}
