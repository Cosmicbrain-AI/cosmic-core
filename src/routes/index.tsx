import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DataCenterExperience } from "@/components/DataCenterExperience";
import { PilotScorecard } from "@/components/PilotScorecard";
import "@/components/data-center-home.css";

const title = "CosmicBrain — Humanoid automation for data centers";
const description =
  "Supervised data center robot pilots for rack inspection, asset audits and parts logistics. Measure route coverage, operator minutes, site-confirmed findings and network health.";

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
    image: "/media/data-centers/rack-aisle.jpg",
    alt: "Server racks and their cable infrastructure",
    side: "left",
  },
  {
    id: "cooling",
    number: "02",
    label: "Cooling",
    title: "Cooling checks.",
    emphasis: "At the equipment.",
    description: "Scope repeatable observations of accessible cooling infrastructure.",
    details: [
      [
        "Observe",
        "CDU indicators, visible hose connections and rack-inlet conditions, subject to the agreed sensor package.",
      ],
      [
        "Record",
        "Instrument value, unit, equipment ID and image; reconcile observations with site telemetry.",
      ],
      [
        "Qualify",
        "Use equipment-specific inlet and liquid-cooling limits. Define escalation and any connection handling with the site.",
      ],
    ],
    image: "/media/data-centers/cooling-infrastructure.jpg",
    alt: "Data center cooling pipes and infrastructure",
    side: "right",
  },
  {
    id: "power",
    number: "03",
    label: "Power",
    title: "Power checks.",
    emphasis: "External indicators.",
    description: "Define an inspection route around approved electrical equipment access points.",
    details: [
      [
        "Observe",
        "Visible UPS, PDU and switchgear indicators within the approved inspection boundary.",
      ],
      [
        "Record",
        "Panel ID, indicator state, timestamp and image for the responsible site technician.",
      ],
      [
        "Qualify",
        "Switching, resets and cabinet access require a separately authorized procedure.",
      ],
    ],
    image: null,
    alt: "",
    side: "left",
  },
  {
    id: "logistics",
    number: "04",
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
          <DataCenterExperience />
          <div className="dc-story">
            <section id="facility" className="dc-chapter dc-hero" aria-labelledby="hero-heading">
              <div className="dc-hero-inner">
                <p className="eyebrow">Data center robotics / Supervised pilots</p>
                <h1 id="hero-heading">
                  <span>Rack inspection.</span>
                  <em>Asset audits. Parts runs.</em>
                </h1>
                <p className="dc-hero-lead">
                  Wheeled humanoids. Defined routes. Logged interventions.
                  <br />
                  Evaluate coverage, operator time and site-confirmed findings.
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
