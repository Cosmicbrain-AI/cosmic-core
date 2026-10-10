import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Cpu, Server } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import "@/components/deployment-home.css";

const title = "CosmicBrain · Data center robot deployments & model evaluations";
const description =
  "Robots as a Service for data centers. CosmicBrain brings hardware, site integration and human operations together, with physical AI model evaluations at live deployments.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/" }],
  }),
  component: Home,
});

function DeploymentInquiry() {
  return (
    <ContactDialog
      title="Plan a data center deployment."
      description="Tell us about your facility and the physical workflow you want to operate."
      subject="Data center robot deployment inquiry"
      messagePlaceholder="Your data center, target workflow, operating area, site constraints and deployment goals…"
      trigger={<button type="button" className="button">Plan a deployment <ArrowUpRight size={16} /></button>}
    />
  );
}

function EvaluationInquiry() {
  return (
    <ContactDialog
      title="Evaluate your model at a deployment."
      description="Scope a physical AI evaluation around a data center workflow, robot and agreed operating conditions."
      subject="Model evaluation at a data center deployment"
      messagePlaceholder="Your model or checkpoint, robot platform, data center task, trial conditions and evaluation goals…"
      trigger={<button type="button" className="button button-secondary">Evaluate a model <ArrowUpRight size={16} /></button>}
    />
  );
}

function Home() {
  return (
    <div id="top" className="deployment-home">
      <SiteHeader />
      <main>
        <section className="deployment-hero deployment-wrap" aria-labelledby="hero-heading">
          <div id="meet">
            <p className="eyebrow">CosmicBrain / Robots as a Service</p>
            <h1 id="hero-heading">Robots for<br /><em>data centers.</em></h1>
            <p className="deployment-intro">
              Deploy and operate robots in data centers. Evaluate physical AI models
              on the same deployments.
            </p>
            <div className="deployment-actions">
              <DeploymentInquiry />
              <a className="text-link" href="#evaluations">Model evaluations <ArrowRight size={16} /></a>
            </div>
          </div>
          <DeploymentDiagram />
        </section>

        <section id="deployment" className="deployment-section deployment-wrap" aria-labelledby="deployment-heading">
          <div className="deployment-section-intro" id="stack">
            <p className="eyebrow">01 / Data center deployments</p>
            <h2 id="deployment-heading">One workflow.<br /><em>One operating partner.</em></h2>
            <p>
              Hardware selection, site integration, human supervision and teleoperation,
              brought together as a service. Start with a defined task and expand with evidence.
            </p>
            <Link to="/solutions/$slug" params={{ slug: "data-centers" }} className="text-link">
              Explore data center deployments <ArrowUpRight size={16} />
            </Link>
          </div>
          <ol className="deployment-steps">
            {[
              ["Scope the workflow", "Define the task, operating area, site constraints and success criteria."],
              ["Integrate the robot", "Match the hardware and interfaces to the site, with agreed operating limits."],
              ["Operate and review", "Support the workflow with human operations. Track outcomes and interventions before expanding."],
            ].map(([heading, body], index) => (
              <li key={heading}>
                <span className="deployment-step-number">0{index + 1}</span>
                <div><h3>{heading}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section id="evaluations" className="deployment-section deployment-wrap" aria-labelledby="evaluations-heading">
          <div className="deployment-section-intro">
            <p className="eyebrow">02 / Model evaluations at deployments</p>
            <h2 id="evaluations-heading">Your model.<br /><em>Real operating conditions.</em></h2>
            <p>
              Test physical AI on a robot at a data center deployment. Agree on the task,
              hardware, trial conditions and scoring rules, then review the evidence together.
            </p>
            <div className="deployment-actions">
              <EvaluationInquiry />
              <Link to="/evaluations" className="text-link">Full evaluation protocol <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="deployment-eval-panel">
            <span className="eyebrow">What we measure</span>
            <dl>
              {[
                ["Task success", "Completion against agreed criteria."],
                ["Human interventions", "When and why an operator steps in."],
                ["Cycle time", "Time to complete the workflow."],
                ["Recovery", "Behavior when a task breaks down."],
              ].map(([metric, definition]) => (
                <div key={metric}><dt>{metric}</dt><dd>{definition}</dd></div>
              ))}
            </dl>
            <p className="deployment-note">Measures and trial scope are agreed for each engagement.</p>
          </div>
        </section>

        <section id="faq" className="deployment-resources deployment-wrap" aria-labelledby="resources-heading">
          <div>
            <p className="eyebrow">Explore further</p>
            <h2 id="resources-heading">The work behind the deployment.</h2>
          </div>
          <div className="deployment-resource-links">
            <Link to="/catalog">Robot platforms <ArrowUpRight size={17} /></Link>
            <Link to="/datasets" id="datasets">Datasets <ArrowUpRight size={17} /></Link>
            <Link to="/docs">Research &amp; docs <ArrowUpRight size={17} /></Link>
            <Link to="/newsroom">Newsroom <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function DeploymentDiagram() {
  return (
    <figure className="deployment-diagram" aria-label="Data center deployment connects robot hardware, human operations and model evaluation.">
      <div className="deployment-diagram-label"><Server size={17} strokeWidth={1.5} /> Data center deployment</div>
      <div className="deployment-racks" aria-hidden="true">
        {[0, 1, 2].map((rack) => (
          <div className="deployment-rack" key={rack}>
            {Array.from({ length: 6 }, (_, row) => <span key={row}><i /><i /><b /></span>)}
          </div>
        ))}
      </div>
      <figcaption>
        <span>Hardware</span><ArrowRight size={14} /><span>Operations</span><ArrowRight size={14} /><span><Cpu size={14} /> Model evals</span>
      </figcaption>
    </figure>
  );
}
