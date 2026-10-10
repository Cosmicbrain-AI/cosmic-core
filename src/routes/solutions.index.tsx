import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHero, NotebookSketch, SiteFooterCTA } from "@/components/explore/shared";
import { solutions } from "@/data/solutions";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Data center deployments · CosmicBrain Solutions" },
      {
        name: "description",
        content:
          "Explore CosmicBrain robot deployments in data centers and model evaluations on those deployments, alongside our existing robotics field guides.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/solutions" }],
  }),
  component: SolutionsPage,
});

const INTRO: Record<string, string> = {
  "data-centers":
    "Scope a physical workflow, hardware, site integration, and human operations. Evaluate models on the deployment against agreed trial conditions.",
  "cloud-kitchens":
    "A field guide to practical kitchen workflows, hardware, and the support needed for a pilot.",
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
  const deployment = solutions.find((solution) => solution.slug === "data-centers")!;
  const fieldGuides = solutions.filter((solution) => solution.slug !== "data-centers");

  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Deployments / Data centers"
        title="Data centers."
        accent="Robot deployments."
        sub="Our deployment focus is data centers. Bring a defined physical workflow, scope the robot and site requirements, and evaluate models on the deployment."
        sketch="arm"
        note="Good engineering begins with listening."
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <div className="explore-results-bar">
            <span>Our deployment focus</span>
            <span>Data centers ↓</span>
          </div>
          <div className="explore-chapter-list">
            <Link
              to="/solutions/$slug"
              params={{ slug: deployment.slug }}
              className="explore-chapter"
            >
              <span className="explore-chapter-number">01</span>
              <div className="explore-chapter-figure">
                <NotebookSketch variant="arm" />
              </div>
              <div>
                <h2>{deployment.name}</h2>
                <p>{INTRO[deployment.slug]}</p>
                <span className="explore-note-label">Deployments + model evaluations</span>
              </div>
              <ArrowUpRight className="explore-chapter-arrow" size={27} aria-hidden="true" />
            </Link>
          </div>
          <div className="explore-actions">
            <Link to="/evaluations" className="explore-text-link">
              Model evaluations on deployments <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="explore-section" aria-labelledby="field-guides-title">
        <div className="explore-wrap">
          <div className="explore-eyebrow">Existing field guides</div>
          <h2 id="field-guides-title" className="explore-section-heading">
            Other robotics workflows.
          </h2>
          <p>
            Reference guides to the wider robotics field. CosmicBrain’s deployment focus is data
            centers.
          </p>
          <div className="explore-results-bar">
            <span>{fieldGuides.length} field guides</span>
            <span>Browse the reference library ↓</span>
          </div>
          <div className="explore-chapter-list">
            {fieldGuides.map((s, i) => (
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
      <SiteFooterCTA context="robots in data centers" />
    </main>
  );
}
