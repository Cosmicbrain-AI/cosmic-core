import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, NotebookSketch, SiteFooterCTA } from "@/components/explore/shared";
import { solutions } from "@/data/solutions";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Robots in the real world · CosmicBrain Solutions" },
      {
        name: "description",
        content:
          "Explore thoughtful robotics deployment guides for manufacturing, logistics, healthcare, hospitality, research, and general-purpose work.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/solutions" }],
  }),
  component: SolutionsPage,
});

const INTRO: Record<string, string> = {
  manufacturing:
    "A helping hand on the line. Explore assembly, inspection, and the everyday work that keeps a factory moving.",
  "warehousing-logistics":
    "From the first pick to the last pallet. Let’s find the right place for robots in your flow.",
  healthcare:
    "More time for the people who need it. Explore carefully scoped support for care teams.",
  "hospitality-retail":
    "A warm welcome, a well-stocked shelf. Useful robotics starts with a better experience for people.",
  "research-education":
    "For the questions that haven’t been answered yet. Find platforms to learn, experiment, and build on.",
  "general-purpose":
    "Have something else in mind? Start with a question, choose one task, and learn from the real world.",
};

function SolutionsPage() {
  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Field guide / 02 / In the real world"
        title="Real places."
        accent="Human possibilities."
        sub="The best robotics starts with the people it helps. Explore practical guides to finding a useful first task, asking good questions, and building from there."
        sketch="arm"
        note="Good engineering begins with listening."
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <div className="explore-results-bar">
            <span>Six starting points. Plenty of possibility.</span>
            <span>Choose your chapter ↓</span>
          </div>
          <div className="explore-chapter-list">
            {solutions.map((s, i) => (
              <Link
                key={s.slug}
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="explore-chapter"
              >
                <span className="explore-chapter-number">0{i + 1}</span>
                <div className="explore-chapter-figure">
                  <NotebookSketch variant={i % 3 === 0 ? "arm" : i % 3 === 1 ? "robot" : "orbit"} />
                </div>
                <div>
                  <h2>{s.name}</h2>
                  <p>{INTRO[s.slug] ?? s.tagline}</p>
                  <span className="explore-note-label">
                    {s.useCases.length} use cases · {s.short}
                  </span>
                </div>
                <ArrowUpRight className="explore-chapter-arrow" size={27} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooterCTA context="robots in your world" />
    </main>
  );
}
