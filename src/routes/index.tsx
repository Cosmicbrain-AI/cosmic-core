import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { DataCenterExperience } from "@/components/DataCenterExperience";
import "@/components/data-center-home.css";

const title = "CosmicBrain — Humanoid automation for data centers";
const description =
  "Physical intelligence for the data center floor. Explore humanoid workflows across compute, cooling, power inspection, and equipment logistics. Plan a supervised deployment with CosmicBrain.";

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
    system: "COMPUTE / RACK OPERATIONS",
    title: "Intelligence,",
    emphasis: "at the rack.",
    description:
      "Navigate the aisle. Identify the rack. Capture the details that matter, from equipment labels to GPU server indicators.",
    task: "Rack identification & visual inspection",
  },
  {
    id: "cooling",
    number: "02",
    system: "COOLING / THERMAL SYSTEMS",
    title: "A closer look",
    emphasis: "at every connection.",
    description:
      "Inspect accessible cooling connections and read sensor displays along a defined route. Surface observations for your operations team.",
    task: "Connection inspection & sensor readings",
  },
  {
    id: "power",
    number: "03",
    system: "POWER / ELECTRICAL INFRASTRUCTURE",
    title: "Keep a watch",
    emphasis: "on the critical path.",
    description:
      "Check cabinet indicators, labels, and visible conditions within approved access boundaries. Escalate findings to qualified personnel.",
    task: "Power cabinet visual inspection",
  },
  {
    id: "logistics",
    number: "04",
    system: "LOGISTICS / THE PHYSICAL FLOOR",
    title: "Move the work",
    emphasis: "forward.",
    description:
      "Bring approved parts and equipment from staging to the work area. Plan each route, load, and handoff around the people on your floor.",
    task: "Supervised equipment transport",
  },
] as const;

function DeploymentInquiry({ className = "button" }: { className?: string }) {
  return (
    <ContactDialog
      title="Plan your data center deployment."
      description="Start with one workflow. Tell us about your facility, operating constraints, and what a successful pilot should demonstrate."
      subject="Data center humanoid deployment inquiry"
      messagePlaceholder="Your data center / first workflow / site access and supervision requirements / pilot success criteria."
      trigger={
        <button type="button" className={className}>
          Plan a deployment <ArrowUpRight size={17} />
        </button>
      }
    />
  );
}

function RailPhoto({ chapter }: { chapter: string }) {
  if (chapter === "compute") {
    return (
      <figure className="dc-rail-photo">
        <img
          src="/media/data-centers/rack-aisle.jpg"
          alt="Wired server racks at the University of Washington, Seattle"
          loading="lazy"
          width="600"
          height="400"
        />
        <figcaption>
          Illustrative photo ·{" "}
          <a href="https://unsplash.com/@tvick" target="_blank" rel="noreferrer">
            Taylor Vick
          </a>{" "}
          /{" "}
          <a
            href="https://unsplash.com/photos/cable-network-M5tzZtFCOfs"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>{" "}
          ·{" "}
          <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
            Unsplash License
          </a>
          .
        </figcaption>
      </figure>
    );
  }
  if (chapter === "cooling") {
    return (
      <figure className="dc-rail-photo">
        <img
          src="/media/data-centers/cooling-infrastructure.jpg"
          alt="Cooling pipes in the Academica data center, Helsinki"
          loading="lazy"
          width="600"
          height="400"
        />
        <figcaption>
          Illustrative photo · Helen Ltd mediabank /{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Kaukojaahdytyslaitteistoja.jpg"
            target="_blank"
            rel="noreferrer"
          >
            Wikimedia Commons
          </a>{" "}
          ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-SA 3.0
          </a>
          .{" "}
          <a href="/media/data-centers/cooling-infrastructure.jpg" target="_blank" rel="noreferrer">
            Image
          </a>{" "}
          resized and cropped for layout; license applies to image only.
        </figcaption>
      </figure>
    );
  }
  if (chapter === "logistics") {
    return (
      <figure className="dc-rail-photo dc-rail-concept">
        <img
          src="/media/data-centers/graphite-robot.webp"
          alt="Graphite humanoid concept working with equipment in an industrial setting"
          loading="lazy"
          width="600"
          height="338"
        />
        <figcaption>Concept image / AI-edited from supplied photograph</figcaption>
      </figure>
    );
  }
  return null;
}

function Home() {
  return (
    <div id="top" className="dc-home">
      <SiteHeader />
      <main>
        <div className="dc-experience" id="data-center-experience">
          <DataCenterExperience />
          <div className="dc-story">
            <section
              id="facility"
              className="dc-chapter dc-hero page-width"
              aria-labelledby="hero-heading"
            >
              <div className="dc-hero-inner">
                <div className="dc-hero-title">
                  <p className="eyebrow">
                    <span className="dc-status-dot" /> HUMANOID AUTOMATION / DATA CENTERS
                  </p>
                  <h1 id="hero-heading">
                    <span>AI runs the data center.</span>
                    <em>Now it can work the floor.</em>
                  </h1>
                </div>
                <div className="dc-hero-summary">
                  <p>Physical intelligence for the infrastructure that powers everything.</p>
                  <Link to="/sales" className="dc-inline-link">
                    Plan a deployment <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
              <a href="#compute" className="dc-explore">
                <ArrowDown size={13} />
                <span>SCROLL TO EXPLORE THE FLOOR</span>
              </a>
            </section>
            {chapters.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className="dc-chapter page-width"
                aria-labelledby={`${chapter.id}-heading`}
              >
                <div className="dc-reading-rail">
                  <p className="eyebrow">
                    <span>{chapter.number}</span> / {chapter.system}
                  </p>
                  <h2 id={`${chapter.id}-heading`}>
                    {chapter.title}
                    <br />
                    <em>{chapter.emphasis}</em>
                  </h2>
                  <p className="dc-chapter-description">{chapter.description}</p>
                  <div className="dc-task-line">
                    <span className="dc-status-dot" />
                    <span>{chapter.task}</span>
                  </div>
                  <Link to="/sales" className="dc-inline-link">
                    Scope this workflow <ArrowUpRight size={15} />
                  </Link>
                  <RailPhoto chapter={chapter.id} />
                </div>
              </section>
            ))}
          </div>
        </div>

        <section className="dc-rollout" aria-labelledby="rollout-heading">
          <div className="page-width">
            <div className="dc-rollout-heading">
              <div>
                <p className="eyebrow">FROM BLUEPRINT TO YOUR FLOOR</p>
                <h2 id="rollout-heading">
                  One workflow.
                  <br />
                  <em>Then the next.</em>
                </h2>
              </div>
              <p>
                A practical deployment starts with a clear task and a shared definition of success.
                Human supervision and site procedures are part of the plan.
              </p>
            </div>
            <ol className="dc-rollout-steps">
              {[
                [
                  "Scope.",
                  "Define the task, site constraints, operating limits, and acceptance criteria for a useful first pilot.",
                ],
                [
                  "Integrate.",
                  "Bring the hardware, interfaces, access requirements, and human supervision together in your environment.",
                ],
                [
                  "Operate.",
                  "Run supervised trials. Review task outcomes, interventions, and recovery before expanding the scope.",
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

        <section className="dc-evidence page-width" aria-labelledby="evidence-heading">
          <div className="dc-evidence-heading">
            <p className="eyebrow">EVIDENCE FOR THE NEXT STEP</p>
            <h2 id="evidence-heading">
              Physical work.
              <br />
              <em>Measurable progress.</em>
            </h2>
            <p>Connect each deployment to evaluation, learning, and a clear operating record.</p>
          </div>
          <div className="dc-resource-links">
            {[
              {
                to: "/evaluations",
                number: "01",
                title: "Evals",
                copy: "Define the trial. Measure the outcome. Understand the interventions.",
              },
              {
                to: "/datasets",
                number: "02",
                title: "Datasets",
                copy: "Explore robot experience, task coverage, and data for model learning.",
              },
              {
                to: "/docs",
                number: "03",
                title: "Docs",
                copy: "Go deeper into the interfaces, methods, and operating approach.",
              },
            ].map((resource) => (
              <Link key={resource.to} to={resource.to} className="dc-resource-link">
                <span className="dc-resource-number">{resource.number}</span>
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.copy}</p>
                </div>
                <ArrowUpRight size={21} strokeWidth={1.4} />
              </Link>
            ))}
          </div>
        </section>

        <section className="dc-closing" aria-labelledby="closing-heading">
          <div className="page-width">
            <p className="eyebrow">YOUR FLOOR. OUR STARTING POINT.</p>
            <h2 id="closing-heading">
              Let’s put intelligence
              <br />
              <em>to work.</em>
            </h2>
            <p>
              Start with your data center.
              <br />
              Define one workflow worth automating.
            </p>
            <DeploymentInquiry />
            <Link to="/sales" className="dc-closing-link">
              See how we start <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
