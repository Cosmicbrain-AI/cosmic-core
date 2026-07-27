import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, FilterPill, SiteFooterCTA } from "@/components/explore/shared";
import { brands, type Brand } from "@/data/catalog";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands - CosmicBrain · The companies building humanoids" },
      {
        name: "description",
        content:
          "The manufacturers behind the humanoid era — headquarters, founding year, shipping status, and flagship platforms, tracked by CosmicBrain.",
      },
      { rel: "canonical", href: "https://www.cosmicbrain.ai/brands" },
    ],
  }),
  component: BrandsPage,
});

const STATUS_LABEL: Record<string, string> = {
  SHIPPING: "Shipping",
  PILOT: "Pilots",
  PREORDER: "Preorder",
  DEVELOPMENT: "In development",
  RESEARCH: "Research",
};

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-strong/60 bg-card/60 p-6 transition-colors hover:border-primary/50">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="font-mono text-xs text-muted-foreground">{brand.name[0]}</span>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-lg font-medium tracking-tight">{brand.name}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {[brand.country, brand.founded && `est. ${brand.founded}`]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
      </div>
      <p className="line-clamp-3 text-sm text-foreground/65">{brand.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
        {brand.status && (
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
            {STATUS_LABEL[brand.status] ?? brand.status}
          </span>
        )}
        {brand.sector && (
          <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/60">
            {brand.sector}
          </span>
        )}
        {brand.robotCount != null && brand.robotCount > 0 && (
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">
            {brand.robotCount} platform{brand.robotCount === 1 ? "" : "s"}
          </span>
        )}
      </div>
      {brand.topProducts.length > 0 && (
        <div className="font-mono text-[11px] text-muted-foreground">
          {brand.topProducts.join(" · ")}
        </div>
      )}
      {brand.website && (
        <a
          href={brand.website}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-foreground/70 hover:text-primary"
        >
          Visit site ↗
        </a>
      )}
    </div>
  );
}

function BrandsPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string | null>(null);

  const sectors = useMemo(
    () => [...new Set(brands.map((b) => b.sector).filter((s): s is string => !!s))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brands.filter((b) => {
      if (sector && b.sector !== sector) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) || (b.country ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, sector]);

  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      <PageHero
        kicker="CB · Brands / Manufacturers"
        title="The companies building"
        accent="the humanoid era."
        sub={`${brands.length} manufacturers tracked — from research labs to shipping fleets. CosmicBrain is the deployment layer across all of them.`}
      />
      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands or countries…"
              className="w-full max-w-md rounded-full border border-border-strong bg-card/60 px-5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <div className="flex flex-wrap gap-2">
              <FilterPill active={sector === null} onClick={() => setSector(null)}>
                All sectors
              </FilterPill>
              {sectors.map((s) => (
                <FilterPill
                  key={s}
                  active={sector === s}
                  onClick={() => setSector(sector === s ? null : s)}
                >
                  {s}
                </FilterPill>
              ))}
              <span className="ml-2 self-center font-mono text-xs text-muted-foreground">
                {filtered.length} / {brands.length} shown
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooterCTA context="these manufacturers' platforms" />
    </main>
  );
}
