import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { PilotScorecard } from "@/components/PilotScorecard";
import "@/components/data-center-home.css";

const title = "CosmicBrain — Humanoid deployments for data centers";
const description =
  "Humanoid deployments for data center operations. Scope compute and logistics workflows with defined operating limits and measurable task performance.";

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
    title: "Rack rounds.",
    emphasis: "Asset-level evidence.",
    description: "Define the rack list and required observations before each inspection round.",
    details: [
      ["Observe", "Rack / U position, asset tag, serial number and visible status indicators."],
      ["Record", "Timestamped images, read confidence, unread tags and site-reviewed exceptions."],
      [
        "Qualify",
        "GPU tray alignment and insertion require a separate trial for the hardware, tooling and OEM procedure.",
      ],
    ],
    image: null,
    alt: "",
    side: "left",
  },
  {
    id: "logistics",
    number: "02",
    label: "Logistics",
    title: "Parts runs.",
    emphasis: "Verified handoffs.",
    description: "Measure the full request-to-rack interval on a site-approved delivery route.",
    details: [
      ["Dispatch", "Request ID, part number, pickup point, target rack and approved payload."],
      [
        "Track",
        "Request receipt, acceptance, pickup and handoff timestamps, plus operator-control intervals.",
      ],
      [
        "Accept",
        "Correct part and condition confirmed at the rack; retain failed runs and recovery time.",
      ],
    ],
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
          <div className="dc-story">
            <section id="facility" className="dc-chapter dc-hero" aria-labelledby="hero-heading">
              <BackgroundVideo
                name="data center"
                src="/media/data-centers/datacenter-background-v2.mp4"
                mobileSrc="/media/data-centers/datacenter-background-mobile-v2.mp4"
                poster="/media/data-centers/datacenter-poster-v2.webp"
              />
              <div className="dc-hero-inner">
                <p className="eyebrow">Humanoid deployments / Data centers</p>
                <h1 id="hero-heading">
                  <span>The next shift</span>
                  <em>in data center operations.</em>
                </h1>
                <p className="dc-hero-lead">
                  Supervised humanoid deployments for the data center floor.
                  <br />
                  Defined operating limits. Measured task performance.
                </p>
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
                className={`dc-chapter dc-workflow${chapter.image ? " dc-workflow--illustrated" : ""}${chapter.id === "compute" ? " dc-workflow--film" : ""}`}
                aria-labelledby={`${chapter.id}-heading`}
              >
                {chapter.id === "compute" && (
                  <BackgroundVideo
                    name="cable"
                    src="/media/data-centers/cable-background.mp4"
                    mobileSrc="/media/data-centers/cable-background-mobile.mp4"
                    poster="/media/data-centers/cable-poster.webp"
                  />
                )}
                <div className="dc-workflow-inner" data-image-side={chapter.side}>
                  {chapter.image && (
                    <figure className="dc-workflow-image">
                      <img
                        src={chapter.image}
                        alt={chapter.alt}
                        loading="lazy"
                        width="1280"
                        height="800"
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
                    <dl className="dc-workflow-spec">
                      {chapter.details.map(([label, detail]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{detail}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <PilotScorecard />

        <section className="dc-rollout" aria-labelledby="rollout-heading">
          <div className="page-width">
            <p className="eyebrow">Site qualification / Acceptance sequence</p>
            <h2 id="rollout-heading">
              Register the scope. <em>Test against it.</em>
            </h2>
            <ol className="dc-rollout-steps">
              {[
                [
                  "Pre-register",
                  "Rack list, route, payload, access rules, operator authority and pass/fail criteria.",
                ],
                [
                  "Run & log",
                  "Retain each attempt, takeover, stop, network outage and staff-adjudicated finding.",
                ],
                [
                  "Review",
                  "Compare with the manual baseline. Accept, revise or hold scope using the agreed thresholds.",
                ],
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
              Define the task. <em>Set the acceptance test.</em>
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
