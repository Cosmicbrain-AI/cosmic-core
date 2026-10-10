import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Glasses, Radio } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { DeploymentHeroRobot } from "@/components/DeploymentHeroRobot";
import "@/components/deployment-home.css";

const title = "CosmicBrain · The operating system for real-world robots";
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
      trigger={
        <button type="button" className="button">
          Plan a deployment <ArrowUpRight size={16} />
        </button>
      }
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
      trigger={
        <button type="button" className="button button-secondary">
          Evaluate a model <ArrowUpRight size={16} />
        </button>
      }
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
            <h1 id="hero-heading">
              Robots in the world.
              <br />
              <em>One operating system.</em>
            </h1>
            <p className="deployment-hero-lead">Physical AI. Put to work.</p>
            <p className="deployment-intro">
              Multi-brand Robots as a Service for data centers. Live model evaluations and
              benchmarks. Real deployment and teleoperation data.
            </p>
            <div className="deployment-actions">
              <DeploymentInquiry />
              <a className="text-link" href="#evaluations">
                Model evaluations <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <DeploymentHeroRobot />
        </section>

        <nav className="deployment-paths deployment-wrap" aria-label="Build with CosmicBrain">
          {[
            ["#deployment", "For data center operators", "Robots as a Service"],
            ["#evaluations", "For physical AI teams", "Evals, benchmarks & data"],
            ["#hardware-partners", "For robot manufacturers", "Deployment partnerships"],
          ].map(([href, audience, offering]) => (
            <a href={href} key={href}>
              <span className="eyebrow">{audience}</span>
              <strong>{offering}</strong>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </nav>

        <section
          id="deployment"
          className="deployment-section deployment-wrap"
          aria-labelledby="deployment-heading"
        >
          <div className="deployment-section-intro">
            <p className="eyebrow">01 / Data center deployments</p>
            <h2 id="deployment-heading">
              One workflow.
              <br />
              <em>One operating partner.</em>
            </h2>
            <p>
              Hardware selection, site integration, human supervision and teleoperation, brought
              together as a service. Start with a defined task and expand with evidence.
            </p>
            <Link to="/solutions/$slug" params={{ slug: "data-centers" }} className="text-link">
              Explore data center deployments <ArrowUpRight size={16} />
            </Link>
          </div>
          <ol className="deployment-steps">
            {[
              [
                "Scope the workflow",
                "Define the task, operating area, site constraints and success criteria.",
              ],
              [
                "Integrate the robot",
                "Match the hardware and interfaces to the site, with agreed operating limits.",
              ],
              [
                "Operate and review",
                "Support the workflow with human operations. Track outcomes and interventions before expanding.",
              ],
            ].map(([heading, body], index) => (
              <li key={heading}>
                <span className="deployment-step-number">0{index + 1}</span>
                <div>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="stack"
          className="deployment-section deployment-wrap"
          aria-labelledby="learning-heading"
        >
          <div className="deployment-section-intro">
            <p className="eyebrow">02 / The deployment operating system</p>
            <h2 id="learning-heading">
              From experience
              <br />
              <em>to intelligence.</em>
            </h2>
            <p>
              One operating layer across hardware brands, sites and models. Robot selection, site
              integration, human operations, live evaluation and data form a continuous deployment
              loop.
            </p>
          </div>
          <LearningLoop />
        </section>

        <section
          id="evaluations"
          className="deployment-section deployment-wrap"
          aria-labelledby="evaluations-heading"
        >
          <div className="deployment-section-intro">
            <p className="eyebrow">03 / Model evaluations at deployments</p>
            <h2 id="evaluations-heading">
              Your model.
              <br />
              <em>Real operating conditions.</em>
            </h2>
            <p>
              Test physical AI on a robot at a data center deployment. Agree on the task, hardware,
              trial conditions and scoring rules, then review the evidence together.
            </p>
            <div className="deployment-actions">
              <EvaluationInquiry />
              <Link to="/evaluations" className="text-link">
                Full evaluation protocol <ArrowUpRight size={16} />
              </Link>
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
                <div key={metric}>
                  <dt>{metric}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
            <p className="deployment-note">
              Measures and trial scope are agreed for each engagement.
            </p>
          </div>
        </section>

        <section
          id="platform"
          className="deployment-section deployment-wrap"
          aria-labelledby="teleop-heading"
        >
          <div className="deployment-section-intro">
            <p className="eyebrow">04 / People in the loop</p>
            <h2 id="teleop-heading">
              Your hands.
              <br />
              <em>A little more reach.</em>
            </h2>
            <p>
              Human judgment, wherever the robot is. Approved operators, assigned robots and headset
              access come together in our operator workspace. Supervision and teleoperation support
              the workflow within agreed operating limits.
            </p>
            <a href="/app" className="text-link">
              Open Live Teleop <ArrowUpRight size={16} />
            </a>
            <p className="deployment-note">Sign in with your approved operator account.</p>
          </div>
          <div className="deployment-human-panel">
            <div
              className="deployment-human-flow"
              aria-label="Operator connects through the workspace to an assigned robot"
            >
              <div>
                <Glasses size={34} strokeWidth={1.2} />
                <span>Operator</span>
              </div>
              <ArrowRight size={18} />
              <div>
                <Radio size={34} strokeWidth={1.2} />
                <span>Workspace</span>
              </div>
              <ArrowRight size={18} />
              <div>
                <Bot size={34} strokeWidth={1.2} />
                <span>Robot</span>
              </div>
            </div>
            <p>
              People at the heart.
              <br />
              <em>Robots in the loop.</em>
            </p>
            <Link to="/docs" className="text-link">
              Read the technical work <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section
          className="deployment-section deployment-wrap deployment-support"
          aria-label="Data and hardware supporting deployments"
        >
          <div id="datasets" className="deployment-section-intro">
            <p className="eyebrow">05 / Deployment & teleoperation data</p>
            <h2>
              Experience in the world.
              <br />
              <em>Data for model teams.</em>
            </h2>
            <p>
              Real deployment data and a broader inventory of hundreds of thousands of hours of
              teleoperation data. Discuss task coverage, formats, samples and licensing around the
              models you’re building.
            </p>
            <Link to="/datasets" className="text-link">
              Explore the datasets <ArrowUpRight size={16} />
            </Link>
          </div>
          <div id="hardware-partners" className="deployment-section-intro">
            <p className="eyebrow">06 / Hardware partnerships</p>
            <h2>
              You build the robot.
              <br />
              <em>We bring it into operation.</em>
            </h2>
            <p>
              We partner with more than 15 robotics brands. Hardware, interfaces, site integration
              and human operations come together around a defined data center workflow.
            </p>
            <Link to="/catalog" className="text-link">
              Explore robot platforms <ArrowUpRight size={16} />
            </Link>
            <p className="deployment-note">
              The catalog is a platform reference guide; listed platforms are not a count of
              partnerships.
            </p>
          </div>
        </section>

        <section
          id="faq"
          className="deployment-section deployment-wrap"
          aria-labelledby="faq-heading"
        >
          <div className="deployment-section-intro">
            <p className="eyebrow">A few useful details</p>
            <h2 id="faq-heading">
              Before we
              <br />
              <em>put robots to work.</em>
            </h2>
          </div>
          <div className="deployment-faq">
            {[
              [
                "How does a data center deployment begin?",
                "With a defined task, operating area, site constraints and success criteria. We scope hardware, integration and human support before expanding the workflow.",
              ],
              [
                "Can model teams run evaluations with you?",
                "Yes. Tasks, robot platforms, trial conditions and reporting criteria are agreed for each engagement. The evaluation protocol explains how outcomes and human interventions are recorded.",
              ],
              [
                "Are the robots fully autonomous?",
                "Autonomy depends on the hardware, task and environment. Human operators provide supervision and teleoperation where needed, within agreed operating limits.",
              ],
              [
                "Do you build the robots?",
                "We work with robot makers. Our focus is the software, data, integration and human operations that make their hardware useful at a deployment.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="deployment-resources deployment-wrap"
          aria-labelledby="resources-heading"
        >
          <div>
            <p className="eyebrow">Explore further</p>
            <h2 id="resources-heading">The work behind the deployment.</h2>
          </div>
          <div className="deployment-resource-links">
            <Link to="/catalog">
              Robot platforms <ArrowUpRight size={17} />
            </Link>
            <Link to="/datasets">
              Datasets <ArrowUpRight size={17} />
            </Link>
            <Link to="/docs">
              Research &amp; docs <ArrowUpRight size={17} />
            </Link>
            <Link to="/newsroom">
              Newsroom <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const stages = [
  {
    name: "Deploy",
    heading: "From a defined task to an operated robot.",
    body: "Match the hardware to a data center workflow, integrate it into the site, and support its operation with human supervision and teleoperation.",
    labels: ["Match the hardware", "Integrate the site", "Operate the workflow"],
  },
  {
    name: "Evaluate",
    heading: "Test physical AI where robots work.",
    body: "Agree on the task, robot platform and operating conditions. Run field trials, then examine model performance and human interventions against the evaluation protocol.",
    labels: ["Define the protocol", "Run field trials", "Review the evidence"],
  },
  {
    name: "Learn",
    heading: "Turn physical experience into learning data.",
    body: "Connect deployment experience with human-guided operation. Discuss available data inventory, task coverage, formats and licensing for your next model iteration.",
    labels: ["Deployment experience", "Human-guided operation", "Data for model teams"],
  },
];

function LearningLoop() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = stages[selected];
  return (
    <div className="deployment-loop">
      <div className="deployment-loop-tabs" role="tablist" aria-label="Deployment loop">
        {stages.map((item, index) => (
          <button
            type="button"
            key={item.name}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            role="tab"
            id={`loop-tab-${index}`}
            aria-controls="loop-panel"
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % stages.length;
              else if (event.key === "ArrowLeft")
                next = (index + stages.length - 1) % stages.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = stages.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          >
            <span>0{index + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${selected}`}
        tabIndex={0}
        className="deployment-loop-panel"
      >
        <h3>{stage.heading}</h3>
        <p>{stage.body}</p>
        <ol>
          {stage.labels.map((label) => (
            <li key={label}>
              <ArrowRight size={14} />
              {label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
