import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowRight, Check, CircleDot } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { PilotScorecard } from "@/components/PilotScorecard";
import "@/components/data-center-sales.css";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Data center robot pilot protocol — CosmicBrain" },
      {
        name: "description",
        content:
          "Define a data center robot pilot: rack inspection, asset audits, parts runs, operator minutes per task, network qualification, and site acceptance criteria.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/sales" },
      { property: "og:title", content: "Data center robot pilot protocol — CosmicBrain" },
      {
        property: "og:description",
        content: "Define the workflow. Set the acceptance criteria. Measure every attempt.",
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
    title: "Rack inspection and asset audit.",
    description:
      "Register the rack list, U positions, inspection points, and expected asset identities before the round.",
    steps: [
      "Read asset tags and serials; compare a sampled set with hand-checked ground truth.",
      "Check visible indicators, cable obstructions, and the site-approved inspection checklist.",
      "Attach rack/U IDs, timestamps, and images to findings; site staff confirm or reject each anomaly.",
    ],
    criteria:
      "Racks inspected / scheduled; exact tag matches / sampled tags; confirmed, rejected, and unresolved findings; operator minutes per completed task.",
    points: "130,187 250,187 250,122 332,122",
    position: [250, 173],
  },
  {
    label: "Parts logistics",
    location: "STAGING / DATA HALL",
    title: "Request-to-rack parts runs.",
    description:
      "Specify the part, pickup point, target rack, payload envelope, and authorized recipient for each run.",
    steps: [
      "Timestamp request receipt, acceptance, staging pickup, and verified handoff at the target rack.",
      "Qualify packaging, payload retention, ESD controls, aisle clearance, and door/access limits.",
      "Record blocked routes, incorrect or rejected handoffs, operator takeovers, and recovery time.",
    ],
    criteria:
      "Request-to-rack elapsed time, including dispatch / queue / pickup / transit / handoff intervals; completed runs / attempts; operator minutes per completed run.",
    points: "105,235 156,235 156,187 308,187",
    position: [156, 225],
  },
  {
    label: "Service preparation",
    location: "SERVICE BAY / AISLE 02",
    title: "Procedure-controlled service preparation.",
    description:
      "Scope component identification, tool staging, and pre-task checks against a named OEM service procedure.",
    steps: [
      "Match the work order, rack/slot, part number, and required tools before the task begins.",
      "Define operator approval points, ESD checks, equipment state, and the stop/recovery procedure.",
      "Qualify GPU handling or insertion in a separately approved hardware trial with the required tooling and OEM procedure.",
    ],
    criteria:
      "Checklist completion, identity mismatches, approval-point compliance, interventions, and control minutes. GPU manipulation requires separate acceptance criteria.",
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
    title: "Define the pilot protocol.",
    description:
      "Share the task boundary, site constraints, and acceptance measures for a supervised data center trial.",
    subject: `Data center deployment — ${workflow.label}`,
    messagePlaceholder: `Workflow: ${workflow.label}\nScope: rack list / U positions / task frequency / current timing baseline\nSite: aisle widths / door thresholds / floor limits / docking / payload and ESD rules\nNetwork: robot-to-operator path / RTT p50-p95-p99 / jitter / loss / failover / stop behavior\nOperations: operator authority / work-order handoff / evidence retention\nAcceptance: hand-checked sample / denominators / agreed thresholds / stop conditions`,
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
              Define the workflow.
              <br />
              <em>Set the acceptance criteria.</em>
            </h1>
            <p className="dcs-lead">
              Scope a supervised humanoid trial around a rack list, a task protocol, and an agreed
              scorecard. Include failed attempts, recovery time, and operator control minutes.
            </p>
            <a href="#pilot-scope" className="dcs-scroll-link">
              Specify the pilot <ArrowDown size={16} />
            </a>
          </div>
          <SiteStudy selected={selected} />
        </section>

        <section className="dcs-workflows page-width" aria-labelledby="workflow-heading">
          <div className="dcs-section-heading">
            <p className="eyebrow">01 / CHOOSE A STARTING WORKFLOW</p>
            <h2 id="workflow-heading">Select the task protocol.</h2>
            <p>
              Proposed pilot scopes. Hardware, sensing, routes, and operator responsibilities
              require site qualification.
            </p>
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
              <ul className="dcs-protocol-steps">
                {workflow.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="dcs-measure">
              <span className="eyebrow">ACCEPTANCE MEASURES</span>
              <p>{workflow.criteria}</p>
              <Link to="/evaluations">
                Evaluation protocol <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <PilotScorecard />

        <section className="dcs-scope page-width" id="pilot-scope" aria-labelledby="scope-heading">
          <div className="dcs-scope-intro">
            <p className="eyebrow">03 / SITE QUALIFICATION BRIEF</p>
            <h2 id="scope-heading">
              Specify the operating
              <br />
              <em>envelope.</em>
            </h2>
            <p>
              Document the constraints before a site trial. Attach the route plan, task checklist,
              baseline timings, and the sample used to verify observations.
            </p>
            <ContactDialog
              {...inquiry}
              trigger={
                <button type="button" className="button">
                  Submit the pilot brief <ArrowUpRight size={17} />
                </button>
              }
            />
            <span className="dcs-scope-note">
              <Check size={14} /> Thresholds agreed before the first measured run.
            </span>
          </div>
          <ol className="dcs-brief-list">
            <li>
              <span>01</span>
              <div>
                <h3>Route and hardware.</h3>
                <p>
                  Rack/U locations, aisle widths, turning clearance, door thresholds, floor limits,
                  access permissions, and docking space. State payload dimensions, mass, retention,
                  and ESD requirements.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Network and stop behavior.</h3>
                <p>
                  Identify the robot-to-operator path. Measure RTT p50/p95/p99, defined jitter,
                  loss, roaming, and failover. Qualify local stop behavior, degraded operation, and
                  recovery when connectivity fails.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Operator and evidence.</h3>
                <p>
                  Define who can approve, take over, stop, and restart each task. Specify work-order
                  IDs, handoff acknowledgement, access to images/logs, and retention periods. Agree
                  a hand-checked sample, denominators, thresholds, and stop conditions.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="dcs-process">
          <div className="page-width">
            <p className="eyebrow">04 / TRIAL AND ACCEPTANCE</p>
            <div className="dcs-process-grid">
              {[
                [
                  "Pre-register the protocol.",
                  "Freeze the scheduled rack list, task definition, baselines, sampling method, operating limits, and acceptance thresholds. Assign site and operator responsibilities.",
                ],
                [
                  "Execute and review.",
                  "Log every attempt, including skips, failures, takeovers, recovery, stop events, and network degradation. Site staff adjudicate findings against timestamped evidence.",
                ],
                [
                  "Accept, hold, or expand.",
                  "Compare the complete run set with the agreed criteria. Hold unresolved failure modes; qualify any change to route, payload, hardware, or autonomy before expanding scope.",
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
              <span>Every attempt logged. Every expansion qualified.</span>
              <ContactDialog
                {...inquiry}
                trigger={
                  <button type="button" className="dcs-text-button">
                    Define a pilot <ArrowRight size={17} />
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
