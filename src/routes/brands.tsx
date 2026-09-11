import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, FilterPill, SiteFooterCTA } from "@/components/explore/shared";
import { brands, type Brand } from "@/data/catalog";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Meet the makers · CosmicBrain" },
      {
        name: "description",
        content:
          "Get to know the companies building robots. Explore manufacturers, their stories, and the platforms they are bringing into the world.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/brands" }],
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
  const [failed, setFailed] = useState(false);
  return (
    <article className="explore-brand">
      <div className="explore-brand-head">
        <div className="explore-brand-logo">
          {brand.logo && !failed ? (
            <img src={brand.logo} alt="" loading="lazy" onError={() => setFailed(true)} />
          ) : (
            <span aria-hidden="true">{brand.name[0]}</span>
          )}
        </div>
        <div>
          <h2>{brand.name}</h2>
          <span className="explore-note-label">
            {[brand.country, brand.founded && `Est. ${brand.founded}`]
              .filter(Boolean)
              .join(" · ") || "Robotics maker"}
          </span>
        </div>
      </div>
      <p>{brand.description}</p>
      <div className="explore-brand-bottom">
        {brand.status && (
          <span className="explore-brand-status">{STATUS_LABEL[brand.status] ?? brand.status}</span>
        )}
        {brand.sector && <span className="explore-note-label">{brand.sector}</span>}
        {brand.robotCount != null && brand.robotCount > 0 && (
          <span className="explore-note-label">
            {brand.robotCount} platform{brand.robotCount === 1 ? "" : "s"}
          </span>
        )}
        {brand.website && (
          <a
            href={brand.website}
            target="_blank"
            rel="noreferrer"
            className="explore-text-link"
            aria-label={`Visit ${brand.name} website`}
          >
            Meet the maker <ArrowUpRight size={15} />
          </a>
        )}
      </div>
      {brand.topProducts.length > 0 && (
        <span className="explore-brand-products">
          In their workshop: {brand.topProducts.join(" · ")}
        </span>
      )}
    </article>
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
    return brands.filter(
      (b) =>
        (!sector || b.sector === sector) &&
        (!q || b.name.toLowerCase().includes(q) || (b.country ?? "").toLowerCase().includes(q)),
    );
  }, [query, sector]);
  const reset = () => {
    setQuery("");
    setSector(null);
  };
  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Field guide / 03 / The makers"
        title="Behind every robot,"
        accent="a team of people."
        sub={`Meet ${brands.length} manufacturers asking big questions and building the hardware to answer them. A directory of the people moving robotics forward.`}
        sketch="orbit"
        note="Many minds. A shared sense of wonder."
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <div className="explore-toolbar">
            <div className="explore-toolbar-top">
              <h2>Good company to keep.</h2>
              <label className="explore-search">
                <span className="sr-only">Search brands or countries</span>
                <Search size={16} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a maker or a place…"
                />
              </label>
            </div>
            <div className="explore-filter-row">
              <span className="explore-filter-label">Their focus</span>
              <div className="explore-filter-options">
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
              </div>
            </div>
          </div>
          <div className="explore-results-bar">
            <span aria-live="polite">
              {filtered.length} of {brands.length} makers
            </span>
            {(query || sector) && (
              <button type="button" onClick={reset} className="explore-reset">
                <RotateCcw size={12} />
                Clear filters
              </button>
            )}
          </div>
          <div className="explore-brand-grid">
            {filtered.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="explore-empty">
              <h3>A fresh page?</h3>
              <p>We couldn’t find a maker with those filters. Try another name or country.</p>
              <button type="button" onClick={reset} className="explore-primary-link">
                Show all makers <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
      <SiteFooterCTA context="one of these platforms" />
    </main>
  );
}
