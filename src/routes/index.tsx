import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DataCenterExperience } from "@/components/DataCenterExperience";
import "@/components/data-center-home.css";

const title = "CosmicBrain — Humanoid automation for data centers";
const description =
  "Humanoids for the data center floor. Rack operations, cooling inspections, power checks, and equipment logistics with CosmicBrain.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/" }],
  }),
  component: Home,
});

const chapters = [
  {
    id: "compute",
    number: "01",
    label: "Compute",
    title: "At the rack.",
    emphasis: "On the task.",
    description: "Inspect equipment. Handle GPU trays. Keep your team in control.",
    image: "/media/data-centers/rack-aisle.jpg",
    alt: "Server racks and their cable infrastructure",
    side: "left",
  },
  {
    id: "cooling",
    number: "02",
    label: "Cooling",
    title: "Every connection.",
    emphasis: "In view.",
    description: "Check connections and read instruments along a defined inspection route.",
    image: "/media/data-centers/cooling-infrastructure.jpg",
    alt: "Data center cooling pipes and infrastructure",
    side: "right",
  },
  {
    id: "power",
    number: "03",
    label: "Power",
    title: "Watch the systems.",
    emphasis: "Catch the details.",
    description: "Inspect cabinet indicators. Bring exceptions to your operations team.",
    image: null,
    alt: "",
    side: "left",
  },
  {
    id: "logistics",
    number: "04",
    label: "Logistics",
    title: "Move the hardware.",
    emphasis: "Keep work moving.",
    description: "Transport parts and equipment through your facility, with supervised handoffs.",
    image: "/media/data-centers/graphite-robot.webp",
    alt: "Graphite humanoid working at an electronics station",
    side: "left",
  },
] as const;

function Home() {
  return (
    <div id="top" className="dc-home">
      <SiteHeader />
      <main>
        <div className="dc-experience" id="data-center-experience">
          <DataCenterExperience />
          <div className="dc-story">
            <section id="facility" className="dc-chapter dc-hero" aria-labelledby="hero-heading">
              <div className="dc-hero-inner">
                <p className="eyebrow">Humanoid automation / Data centers</p>
                <h1 id="hero-heading">
                  <span>AI runs the data center.</span>
                  <em>Now it can work the floor.</em>
                </h1>
                <p className="dc-hero-lead">Humanoids for the infrastructure behind AI.</p>
                <Link to="/sales" className="button dc-primary-action">
                  Plan a deployment <ArrowUpRight size={16} />
                </Link>
              </div>
              <a href="#compute" className="dc-explore" aria-label="Explore data center workflows">
                <ArrowDown size={16} />
                <span>Explore the floor</span>
              </a>
            </section>
            {chapters.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className={`dc-chapter dc-workflow${chapter.image ? " dc-workflow--illustrated" : ""}`}
                aria-labelledby={`${chapter.id}-heading`}
              >
                <div className="dc-workflow-inner" data-image-side={chapter.side}>
                  {chapter.image && (
                    <figure className="dc-workflow-image">
                      <img
                        src={chapter.image}
                        alt={chapter.alt}
                        loading="lazy"
                        width="1200"
                        height="900"
                      />
                    </figure>
                  )}
                  <div className="dc-reading-rail">
                    <p className="eyebrow">
                      {chapter.number} / {chapter.label}
                    </p>
                    <h2 id={`${chapter.id}-heading`}>
                      {chapter.title}
                      <br />
                      <em>{chapter.emphasis}</em>
                    </h2>
                    <p className="dc-chapter-description">{chapter.description}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <section className="dc-rollout" aria-labelledby="rollout-heading">
          <div className="page-width">
            <p className="eyebrow">From your first workflow</p>
            <h2 id="rollout-heading">
              Your site. <em>One operating partner.</em>
            </h2>
            <ol className="dc-rollout-steps">
              {[
                ["Scope", "One task. Clear operating limits."],
                ["Integrate", "Hardware and workflows matched to your site."],
                ["Operate", "Human supervision. Measurable progress."],
              ].map(([heading, copy], index) => (
                <li key={heading}>
                  <span className="dc-rollout-number">0{index + 1}</span>
                  <h3>{heading}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="dc-closing" aria-labelledby="closing-heading">
          <div className="page-width">
            <h2 id="closing-heading">
              Put intelligence <em>to work.</em>
            </h2>
            <Link to="/sales" className="button dc-primary-action">
              Plan a deployment <ArrowUpRight size={16} />
            </Link>
            <nav className="dc-resource-links" aria-label="Deployment resources">
              <Link to="/evaluations">
                Evals <ArrowUpRight size={13} />
              </Link>
              <Link to="/datasets">
                Datasets <ArrowUpRight size={13} />
              </Link>
              <Link to="/docs">
                Docs <ArrowUpRight size={13} />
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
