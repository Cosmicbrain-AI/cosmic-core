import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowRight, Check, CircleDot } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import "@/components/data-center-sales.css";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Plan a data center deployment — CosmicBrain" },
      {
        name: "description",
        content:
          "Scope a supervised humanoid deployment in your data center. Start with one workflow, define site requirements, and agree on the evidence for a successful pilot.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/sales" },
      { property: "og:title", content: "Plan a data center deployment — CosmicBrain" },
      {
        property: "og:description",
        content: "Your workflow. Your facility. A measurable first deployment.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/sales" }],
  }),
  component: SalesPage,
});

const workflows = [
  {
    label: "Inspection rounds",
    location: "DATA HALL / AISLE 01",
    title: "A repeatable route. A clearer view.",
    description:
      "Scope a supervised route for rack labels, indicator checks, and visual observations. Bring findings back to your team for review.",
    criteria: "Route coverage, observation quality, and human interventions.",
    points: "130,187 250,187 250,122 332,122",
    position: [250, 173],
  },
  {
    label: "Parts logistics",
    location: "STAGING / DATA HALL",
    title: "The right part. At the right aisle.",
    description:
      "Define an approved path for moving parts and consumables from staging to a work area, within agreed load and access limits.",
    criteria: "Delivery completion, handling accuracy, and intervention rate.",
    points: "105,235 156,235 156,187 308,187",
    position: [156, 225],
  },
  {
    label: "Service preparation",
    location: "SERVICE BAY / AISLE 02",
    title: "Prepare the work. Respect the procedure.",
    description:
      "Explore tool staging, component identification, and pre-task visual checks under your team's supervision and site procedures.",
    criteria: "Checklist completion, identification accuracy, and handoff quality.",
    points: "342,230 285,230 285,123 332,123",
    position: [285, 153],
  },
] as const;

function SiteStudy({ selected }: { selected: number }) {
  const workflow = workflows[selected];
  return (
    <div className="dcs-study">
      <div className="dcs-study-meta">
        <span>DEPLOYMENT STUDY</span>
        <span>CB / 001</span>
      </div>
      <svg
        viewBox="0 0 440 320"
        fill="none"
        role="img"
        aria-label={`Data center floor plan showing a proposed route for ${workflow.label.toLowerCase()}`}
      >
        <defs>
          <pattern id="sales-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" stroke="#71806b" strokeOpacity=".12" strokeWidth=".5" />
          </pattern>
          <pattern id="sales-rack" width="30" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 6H30" stroke="#5b7054" strokeOpacity=".5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="440" height="320" fill="url(#sales-grid)" />
        <g stroke="#788473" strokeWidth="1.2">
          <path d="M67 61H373V264H67V61Z" fill="#f7f4ec" fillOpacity=".55" />
          <path d="M67 61H373V264M67 264V61H373" strokeWidth="3" />
          <path d="M67 212H121V264M317 264V212H373" />
          <path d="M121 212H152M317 212H287" strokeDasharray="3 3" />
          <path d="M67 48V29M373 48V29M67 35H373M55 61H33M55 264H33M41 61V264" strokeOpacity=".4" />
          <path d="M65 39L69 31M371 39L375 31M37 63L45 59M37 266L45 262" />
          <path d="M91 87H351M91 96H351" stroke="#91a58b" />
          <path d="M91 78H351" stroke="#b94e32" strokeOpacity=".5" strokeDasharray="3 3" />
          {[107, 177, 247, 317].map((x) => (
            <g key={x}>
              <rect x={x} y="111" width="28" height="58" fill="#dfe4d4" />
              <rect x={x + 4} y="115" width="20" height="50" fill="url(#sales-rack)" />
              <path d={`M${x + 4} 125H${x + 24}M${x + 4} 149H${x + 24}`} />
            </g>
          ))}
          <rect x="83" y="230" width="22" height="17" fill="#dfe4d4" />
          <path d="M86 235H102M86 240H102" />
          <rect x="339" y="226" width="20" height="20" fill="#dfe4d4" />
          <path d="M345 230V242M341 236H355" />
        </g>
        <polyline
          className="dcs-study-route"
          points={workflow.points}
          stroke="#b94e32"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <g
          className="dcs-study-robot"
          transform={`translate(${workflow.position[0]} ${workflow.position[1]})`}
        >
          <circle r="18" fill="#b94e32" fillOpacity=".08" stroke="#b94e32" strokeOpacity=".25" />
          <circle cy="-7" r="3.5" fill="#b94e32" />
          <path
            d="M-5 -1H5L7 7H-7L-5 -1ZM-3 7L-5 13M3 7L5 13M-5 0L-10 5M5 0L10 5"
            fill="#b94e32"
            stroke="#b94e32"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g fill="#687461" fontFamily="DM Mono, monospace" fontSize="7" letterSpacing="1">
          <text x="172" y="28">
            SITE-SPECIFIC SCOPE
          </text>
          <text x="155" y="205">
            CONTROLLED ACCESS ROUTE
          </text>
          <text x="77" y="281">
            STAGING
          </text>
          <text x="316" y="281">
            SERVICE
          </text>
          <text x="103" y="105">
            R01
          </text>
          <text x="173" y="105">
            R02
          </text>
          <text x="243" y="105">
            R03
          </text>
          <text x="313" y="105">
            R04
          </text>
          <text x="335" y="305">
            N
          </text>
          <path d="M337 292V285M334 288L337 285L340 288" stroke="#687461" />
        </g>
      </svg>
      <div className="dcs-study-caption">
        <span className="dcs-status-dot" />
        <span>{workflow.location}</span>
        <span>Illustrative site plan</span>
      </div>
    </div>
  );
}

function SalesPage() {
  const [selected, setSelected] = useState(0);
  const workflow = workflows[selected];
  const inquiry = {
    title: "Let’s scope your first deployment.",
    description:
      "Tell us about your data center, the workflow, and the evidence you need to move forward.",
    subject: `Data center deployment — ${workflow.label}`,
    messagePlaceholder: `First workflow: ${workflow.label}\nFacility: data hall layout, access rules, and operating constraints\nSupervision: your team's role and required handoffs\nPilot criteria: what success should demonstrate`,
  };

  return (
    <div className="dcs-page" id="top">
      <SiteHeader />
      <main>
        <section className="dcs-hero page-width">
          <div className="dcs-hero-copy">
            <p className="eyebrow">
              <span className="dcs-status-dot" /> DATA CENTER DEPLOYMENTS
            </p>
            <h1>
              Start in one aisle.
              <br />
              <em>Build from evidence.</em>
            </h1>
            <p className="dcs-lead">
              Bring a real workflow. We’ll work through the site, the supervision, and the measures
              that make a humanoid pilot useful.
            </p>
            <a href="#pilot-scope" className="dcs-scroll-link">
              Define your first deployment <ArrowDown size={16} />
            </a>
          </div>
          <SiteStudy selected={selected} />
        </section>

        <section className="dcs-workflows page-width" aria-labelledby="workflow-heading">
          <div className="dcs-section-heading">
            <p className="eyebrow">01 / CHOOSE A STARTING WORKFLOW</p>
            <h2 id="workflow-heading">A focused place to begin.</h2>
            <p>Each workflow starts with site approval, defined limits, and human supervision.</p>
          </div>
          <div className="dcs-workflow-selector" role="group" aria-label="Deployment workflow">
            {workflows.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={selected === index}
                aria-controls="workflow-detail"
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div className="dcs-workflow-detail" id="workflow-detail" aria-live="polite">
            <div>
              <CircleDot size={23} strokeWidth={1.2} />
              <h3>{workflow.title}</h3>
              <p>{workflow.description}</p>
            </div>
            <div className="dcs-measure">
              <span className="eyebrow">WHAT WE MEASURE</span>
              <p>{workflow.criteria}</p>
              <Link to="/evaluations">
                Explore the evaluation approach <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="dcs-scope page-width" id="pilot-scope" aria-labelledby="scope-heading">
          <div className="dcs-scope-intro">
            <p className="eyebrow">02 / YOUR DEPLOYMENT BRIEF</p>
            <h2 id="scope-heading">
              A useful pilot has
              <br />
              <em>a precise brief.</em>
            </h2>
            <p>
              You don’t need a finished plan. Bring the operational context, and we’ll define a
              practical first scope together.
            </p>
            <ContactDialog
              {...inquiry}
              trigger={
                <button type="button" className="button">
                  Scope your pilot <ArrowUpRight size={17} />
                </button>
              }
            />
            <span className="dcs-scope-note">
              <Check size={14} /> Straight to the deployment team.
            </span>
          </div>
          <ol className="dcs-brief-list">
            <li>
              <span>01</span>
              <div>
                <h3>The workflow.</h3>
                <p>
                  The current process, objects involved, frequency, and where people need support.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>The facility.</h3>
                <p>
                  Aisles and access, network requirements, safety procedures, supervision, and
                  handoffs.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>The acceptance criteria.</h3>
                <p>
                  Task outcomes, allowed interventions, operating limits, and the evidence required
                  to expand.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="dcs-process">
          <div className="page-width">
            <p className="eyebrow">03 / FROM FIRST VISIT TO NEXT DECISION</p>
            <div className="dcs-process-grid">
              {[
                [
                  "Map the site.",
                  "Review the environment and agree on a bounded task, access conditions, and human responsibilities.",
                ],
                [
                  "Validate the workflow.",
                  "Run supervised trials. Document outcomes, interventions, and failure modes against an agreed protocol.",
                ],
                [
                  "Decide what scales.",
                  "Review the evidence together before extending the task, operating window, or deployment footprint.",
                ],
              ].map(([title, description], index) => (
                <div className="dcs-process-step" key={title}>
                  <span className="dcs-step-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
            <div className="dcs-process-bottom">
              <span>One facility. One workflow. A clear next step.</span>
              <ContactDialog
                {...inquiry}
                trigger={
                  <button type="button" className="dcs-text-button">
                    Plan a deployment <ArrowRight size={17} />
                  </button>
                }
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
