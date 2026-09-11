import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, RotateCcw, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, FilterPill, RobotCard, SiteFooterCTA } from "@/components/explore/shared";
import { robots, families } from "@/data/catalog";

export const Route = createFileRoute("/catalog/")({
  head: () => ({
    meta: [
      { title: "Robot field guide · CosmicBrain Catalog" },
      {
        name: "description",
        content:
          "Meet the robots. Explore humanoid platforms, compare specifications, and find a starting point for your next robotics project.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/catalog" }],
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
      return (
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.manufacturer ?? "").toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, family, avail]);
  const hasFilters = !!(query || family || avail);
  const reset = () => {
    setQuery("");
    setFamily(null);
    setAvail(null);
  };

  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Field guide / 01 / The robots"
        title="Meet your next"
        accent="collaborator."
        sub={`A growing notebook of ${robots.length} robot platforms, their makers, and what makes each one different. Follow your curiosity. We’ll help with the next step.`}
        note="Every great project starts with a hello."
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <div className="explore-toolbar">
            <div className="explore-toolbar-top">
              <h2>Find your kind of robot.</h2>
              <label className="explore-search">
                <span className="sr-only">Search robots, manufacturers, or tags</span>
                <Search size={16} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="A robot, a maker, a possibility…"
                />
              </label>
            </div>
            <div className="explore-filter-row">
              <span className="explore-filter-label">By family</span>
              <div className="explore-filter-options">
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
            </div>
            <div className="explore-filter-row">
              <span className="explore-filter-label">Availability</span>
              <div className="explore-filter-options">
                <FilterPill active={avail === null} onClick={() => setAvail(null)}>
                  Any stage
                </FilterPill>
                {AVAILABILITY.map((a) => (
                  <FilterPill
                    key={a}
                    active={avail === a}
                    onClick={() => setAvail(avail === a ? null : a)}
                  >
                    {a}
                  </FilterPill>
                ))}
              </div>
            </div>
          </div>
          <div className="explore-results-bar">
            <span aria-live="polite">
              {String(filtered.length).padStart(2, "0")} of {robots.length} platforms in the
              notebook
            </span>
            {hasFilters ? (
              <button type="button" onClick={reset} className="explore-reset">
                <RotateCcw size={12} />
                Clear filters
              </button>
            ) : (
              <Link to="/brands" className="explore-reset">
                Meet the makers <ArrowUpRight size={13} />
              </Link>
            )}
          </div>
          <div className="explore-card-grid">
            {filtered.map((r) => (
              <RobotCard key={r.slug} robot={r} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="explore-empty">
              <h3>Still looking for your match?</h3>
              <p>Try a different name or give the filters a fresh start.</p>
              <button type="button" onClick={reset} className="explore-primary-link">
                Show all robots <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
      <SiteFooterCTA context="one of these robots" />
    </main>
  );
}
