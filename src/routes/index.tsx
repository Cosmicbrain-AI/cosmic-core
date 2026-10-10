import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { RobotAtmosphere } from "@/components/RobotAtmosphere";
import "@/components/scroll-home.css";

const title = "CosmicBrain · The operating system for real-world robots";
const description =
  "Robots as a Service for data centers. Model evaluations on live deployments, supported by human operations and real robot data.";

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
      description="Tell us about your facility and target workflow."
      subject="Data center robot deployment inquiry"
      messagePlaceholder="Facility, task, operating area, site constraints and goals…"
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
      description="Define the robot, task, test conditions and success criteria."
      subject="Model evaluation at a data center deployment"
      messagePlaceholder="Model, robot platform, data center task and evaluation goals…"
      trigger={
        <button type="button" className="button">
          Evaluate a model <ArrowUpRight size={16} />
        </button>
      }
    />
  );
}

function Home() {
  return (
    <div id="top" className="scroll-home">
      <SiteHeader />
      <RobotAtmosphere />
      <main className="scroll-home-content">
        <section className="scrolly-chapter scrolly-hero" aria-labelledby="hero-heading">
          <div className="story-rail hero-title">
            <h1 id="hero-heading">
              Robots in the world.
              <br />
              <em>One operating system.</em>
            </h1>
            <a className="home-scroll-link" href="#deployment">
              <ArrowDown size={15} /> Scroll to explore
            </a>
          </div>
          <div className="story-rail hero-summary">
            <p>
              Robots as a Service for data centers.
              <br />
              Model evals on live deployments.
            </p>
            <DeploymentInquiry />
          </div>
        </section>

        <section
          id="deployment"
          className="scrolly-chapter"
          data-side="left"
          aria-labelledby="deployment-heading"
        >
          <div className="story-rail">
            <p className="eyebrow">01 / Data center deployments</p>
            <h2 id="deployment-heading">
              Robots for
              <br />
              <em>data center operations.</em>
            </h2>
            <p>
              We select hardware, integrate the site and operate a defined workflow with human
              supervision and teleoperation.
            </p>
            <ol className="home-workflow">
              <li>Scope the task</li>
              <li>Integrate the robot</li>
              <li>Operate and review</li>
            </ol>
            <Link to="/solutions/$slug" params={{ slug: "data-centers" }} className="text-link">
              Data center deployments <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section
          id="evaluations"
          className="scrolly-chapter"
          data-side="right"
          aria-labelledby="eval-heading"
        >
          <div className="story-rail">
            <p className="eyebrow">02 / Model evaluations</p>
            <h2 id="eval-heading">
              Your model.
              <br />
              <em>On a live deployment.</em>
            </h2>
            <p>
              Agree on the task, robot and test conditions. Measure success, cycle time,
              interventions and recovery.
            </p>
            <div className="home-actions">
              <EvaluationInquiry />
              <Link to="/evaluations" className="text-link">
                Evaluation protocol <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="platform"
          className="scrolly-chapter"
          data-side="left"
          aria-labelledby="operations-heading"
        >
          <div className="story-rail">
            <p className="eyebrow">03 / Human operations</p>
            <h2 id="operations-heading">
              Supervision.
              <br />
              <em>Teleoperation.</em>
            </h2>
            <p>
              Approved operators supervise assigned robots and take over when needed. Our workspace
              connects robot assignments and headset access within agreed operating limits.
            </p>
            <a href="/app" className="text-link">
              Open Live Teleop <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section
          id="datasets"
          className="scrolly-chapter"
          data-side="right"
          aria-labelledby="data-heading"
        >
          <div className="story-rail">
            <p className="eyebrow">04 / Deployment data</p>
            <h2 id="data-heading">
              Data from
              <br />
              <em>robot operation.</em>
            </h2>
            <p>
              Access deployment data and our broader teleoperation inventory. Discuss task coverage,
              formats, samples and licensing for your model.
            </p>
            <Link to="/datasets" className="text-link">
              Explore datasets <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section
          id="hardware-partners"
          className="scrolly-chapter"
          data-side="left"
          aria-labelledby="hardware-heading"
        >
          <div className="story-rail">
            <p className="eyebrow">05 / Robot partnerships</p>
            <h2 id="hardware-heading">
              Your hardware.
              <br />
              <em>Our operating layer.</em>
            </h2>
            <p>
              We connect robot platforms, site integration and human operations around data center
              workflows.
            </p>
            <div className="home-actions">
              <Link to="/sales" className="text-link">
                Work with us <ArrowUpRight size={16} />
              </Link>
              <Link to="/catalog" className="text-link">
                Robot catalog <ArrowUpRight size={16} />
              </Link>
            </div>
            <p className="home-note">The catalog is a platform reference guide.</p>
          </div>
        </section>
      </main>
      <div id="home-footer">
        <SiteFooter />
      </div>
    </div>
  );
}
