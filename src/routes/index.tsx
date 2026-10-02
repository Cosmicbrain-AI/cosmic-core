import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Heart,
  Radio,
  Glasses,
  Bot,
} from "lucide-react";
import { SiteHeader, CosmicMark } from "@/components/SiteHeader";
import { RobotAtmosphere } from "@/components/RobotAtmosphere";
import { DeploymentPhotoRail } from "@/components/DeploymentPhotoRail";
import { PhysicsWorkbench } from "@/components/PhysicsWorkbench";
import { ArticleCard } from "@/components/newsroom/ArticleCard";
import { newsArticles } from "@/components/newsroom/articles";
import { ContactDialog } from "@/components/ContactDialog";
import "@/components/newsroom/newsroom.css";
import "@/components/immersive-home.css";

const description =
  "CosmicBrain is the operating system for multi-brand robot deployment: Robots as a Service, live physical AI evaluations and benchmarks, deployment data, and teleoperation datasets.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmicBrain · The operating system for real-world robots" },
      { name: "description", content: description },
      { property: "og:title", content: "CosmicBrain · The operating system for real-world robots" },
      { property: "og:description", content: description },
      { name: "twitter:title", content: "CosmicBrain · The operating system for real-world robots" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/" }],
  }),
  component: Home,
});

const stages = [
  {
    name: "Deploy",
    subtitle: "From a defined task to an operated robot.",
    body: "Select hardware from our robotics brand partners, integrate it into the site, and support the workflow with human supervision and teleoperation. Robot as a Service brings those pieces into one operating relationship.",
    equation: "hardware + operations + human judgment",
    explanation: "An operating layer around the robot, the task, and the site.",
    labels: ["Match the hardware", "Integrate the site", "Operate the workflow"],
    icon: "01",
  },
  {
    name: "Evaluate",
    subtitle: "Test physical AI where robots actually work.",
    body: "Run model evaluations and benchmarks on live deployment sites. Define the task, robot platform, and operating conditions, then examine performance and human interventions against an agreed protocol.",
    equation: "model × robot × environment",
    explanation: "Field behavior depends on all three. Evaluation makes the context explicit.",
    labels: ["Define the protocol", "Run field trials", "Review the evidence"],
    icon: "02",
  },
  {
    name: "Learn",
    subtitle: "Turn physical experience into learning data.",
    body: "Access real deployment data and hundreds of thousands of hours of teleoperation data. Discuss the inventory, task coverage, available formats, and licensing around the models you’re building.",
    equation: "D = { (sₜ, aₜ) }",
    explanation: "Observations and actions connect learning to experience in the world.",
    labels: ["Deployment experience", "Human-guided operation", "Data for model teams"],
    icon: "03",
  },
];
const faqs = [
  ["Can model companies run evaluations and benchmarks with you?", "Yes. We work with physical AI model teams to run evaluations and benchmarks on live deployment sites. Hardware, tasks, conditions, and reporting criteria are scoped for each engagement."],
  ["What robotics data do you offer?", "We offer real deployment data and hundreds of thousands of hours of teleoperation data. Contact us to discuss available inventory, task coverage, formats, samples, and licensing."],
  ["Are cloud kitchen deployments established today?", "Cloud kitchens and a few other verticals are under exploration. We’re currently serving hospitality environments and deploying into data centers. New workflows begin with feasibility and pilot scoping."],
  [
    "So, what does CosmicBrain actually do?",
    "CosmicBrain is an operating system for deploying and operating robots across brands and sites. Our core business is Robots as a Service. We also work with physical AI model companies on live-site evaluations, benchmarks, and datasets.",
  ],
  [
    "Do you build the robots, too?",
    "We work with robot makers. Our focus is the software, data, integration, and human operations that help their hardware become useful in real settings. You can explore platforms and their source specifications in our robot catalog.",
  ],
  [
    "Who do you work with?",
    "Site operators including hotels and data centers; physical AI model companies needing evaluations, benchmarks, and data; and robot manufacturers looking for a deployment partner. Cloud kitchens and other verticals are under exploration.",
  ],
  [
    "Are the robots fully autonomous?",
    "Autonomy depends on the hardware, task, and environment. Human operators provide supervision and teleoperation where needed. We agree on the operating limits and evaluate a workflow before expanding it.",
  ],
  [
    "How do we get started?",
    "Tell us about the task you're working on, the setting, and what a useful result would look like. We'll talk through hardware, data, supervision, and a practical next step together.",
  ],
];

function Home() {
  return (
    <div id="top" className="home-page immersive-home">
      <SiteHeader />
      <RobotAtmosphere />
      <main className="immersive-content">
        <section className="scrolly-chapter scrolly-hero" aria-labelledby="hero-heading">
          <div className="story-rail rail-left hero-title">
            <h1 id="hero-heading">
              Robots in the world.
              <br />
              <em>One operating system.</em>
            </h1>
            <a className="story-scroll" href="#motion">
              <span>
                <ArrowDown size={17} />
              </span>{" "}
              Scroll to discover
            </a>
          </div>
          <div className="story-rail rail-right hero-introduction">
            <p className="story-lead">Physical AI. Put to work.</p>
            <p>
              Multi-brand Robots as a Service. Live model evaluations and benchmarks.
              Real deployment and teleoperation data.
            </p>
            <Link to="/sales" className="button">
              Plan a deployment <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section id="motion" className="scrolly-chapter" aria-labelledby="human-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">01 / One operating layer. Three ways to build.</span>
            <h2 id="human-heading">
              Deploy. Operate. <em>Learn from the world.</em>
            </h2>
            <p id="meet">
              We partner with more than 15 robotics brands to deploy and operate robots.
              Today, we’re serving hospitality and deploying into data centers, with cloud
              kitchens and other verticals under exploration.
            </p>
            <p>
              For physical AI model teams, the same deployment network becomes a place to run
              live evaluations and benchmarks, and a source of real deployment data and
              hundreds of thousands of hours of teleoperation data.
            </p>
            <div className="story-signature">
              <span>With curiosity,</span>The CosmicBrain team
              <small>San Francisco · Planet Earth</small>
            </div>
          </div>
          <div className="story-rail rail-right rail-offset">
            <div className="offering-paths">
              <a href="#deployment">
                <span>For end customers</span>
                <strong>Robots as a Service</strong>
                <p>Robots, integrated into your everyday operations.</p>
                <ArrowUpRight size={18} />
              </a>
              <a href="#evaluations">
                <span>For model teams</span>
                <strong>Evals, benchmarks & data</strong>
                <p>Test your models in the field. Learn from real operations.</p>
                <ArrowUpRight size={18} />
              </a>
              <a href="#hardware-partners">
                <span>For robot manufacturers</span>
                <strong>Hardware partnerships</strong>
                <p>You build the robot. We bring it into operation.</p>
                <ArrowUpRight size={18} />
              </a>
            </div>
            <HumanDiagram />
            <a href="#deployment" className="text-link">
              See it in the world <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section id="stack" className="scrolly-chapter" aria-labelledby="learning-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">
              02 / The robot deployment operating system
            </span>
            <h2 id="learning-heading">
              From experience <em>to intelligence.</em>
            </h2>
            <p>
              One operating layer across hardware brands, sites, and models. CosmicBrain connects
              robot selection, site integration, human operations, live evaluation, and data
              into a continuous deployment loop.
            </p>
            <div className="rail-formula">
              human experience
              <br />
              <span>+ physical intelligence</span>
              <hr />
              <em>a world of possibility</em>
            </div>
          </div>
          <div className="story-rail rail-right rail-offset">
            <LearningLoop />
          </div>
        </section>

        <section id="deployment" className="scrolly-chapter" aria-labelledby="deployment-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">03 / Robots as a Service · RaaS</span>
            <h2 id="deployment-heading">
              Robots as a Service. <em>Beyond one vertical.</em>
            </h2>
            <p>
              Hotels and data centers have different workflows. We start with yours: choose the
              right hardware, integrate it into your site, and support its operation as a service.
              Cloud kitchens and other verticals are the next environments we’re exploring.
            </p>
            <p className="rail-handwritten">
              Different sites.
              <br />A shared operating layer.
            </p>
            <Link className="text-link" to="/solutions">
              Explore the possibilities <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="story-rail rail-right rail-offset">
            <DeploymentPhotoRail />
          </div>
        </section>

        <section
          id="primitives"
          className="scrolly-chapter scrolly-physics"
          aria-labelledby="physics-heading"
        >
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">04 / The physics of helping</span>
            <h2 id="physics-heading">
              A little physics in every <em>helping hand.</em>
            </h2>
            <p>
              A useful robot needs ways to understand what’s around it, how it’s moving, and when to
              be gentle.
            </p>
            <div className="rail-formula">
              p = (x, y, z)<small>A place in the world.</small>
              <br />F = ma<small>Force, mass, and acceleration.</small>
            </div>
            <p className="small-rail-note">
              A little experiment for your curiosity. Choose a sense and move the slider.
            </p>
          </div>
          <div className="story-rail rail-right">
            <PhysicsWorkbench />
          </div>
        </section>

        <section id="platform" className="scrolly-chapter" aria-labelledby="teleop-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">05 / People in the loop</span>
            <h2 id="teleop-heading">
              Your hands.
              <br />
              <em>A little more reach.</em>
            </h2>
            <p>
              Human judgment, wherever the robot is. Our operator workspace brings approved people,
              assigned robots, and headset access together.
            </p>
            <a href="/app" className="button">
              Open Live Teleop <ArrowUpRight size={16} />
            </a>
            <p className="small-rail-note">Sign in with your approved operator account.</p>
          </div>
          <div className="story-rail rail-right rail-offset">
            <div
              className="connection-diagram"
              role="img"
              aria-label="An approved operator connects through a private session to an assigned robot"
            >
              <div>
                <Glasses size={25} />
                <span>You + your headset</span>
              </div>
              <span className="connection-line" />
              <div>
                <Radio size={25} />
                <span>One operator session</span>
              </div>
              <span className="connection-line" />
              <div>
                <Bot size={25} />
                <span>Your assigned robot</span>
              </div>
            </div>
            <div className="report-note">
              <span className="story-index">FROM THE NOTEBOOK</span>
              <h3>Curious about what makes it work?</h3>
              <p>
                Cosmic 0.5 · Human-to-humanoid skill transfer, capture, retargeting, and evaluation.
              </p>
              <Link to="/docs" className="text-link">
                Read the technical report <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section id="evaluations" className="scrolly-chapter" aria-labelledby="evaluations-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">06 / Physical AI models · evals &amp; benchmarks</span>
            <h2 id="evaluations-heading">From model capability <em>to field evidence.</em></h2>
            <p>Work with us to run evaluations and benchmarks on live deployment sites. See how your model behaves on a real robot, in a real environment, under the conditions that matter to the workflow.</p>
            <p>Define the task, hardware, trial conditions, and operating limits together. Review outcomes, human interventions, and failure modes before expanding the deployment.</p>
            <ContactDialog title="Let’s scope a field evaluation." description="Tell us about your model, the robot platform, and what you want to measure." subject="Physical AI model evaluation and benchmark inquiry" messagePlaceholder="Your model, target tasks, hardware, evaluation protocol, and desired deployment environment…" trigger={<button className="button" type="button">Evaluate your model <ArrowUpRight size={16} /></button>} />
          </div>
          <div className="story-rail rail-right rail-offset">
            <div className="report-note field-record">
              <span className="story-index">FIELD EVALUATION / PROTOCOL DESIGN</span>
              <h3>Measure what deployment demands.</h3>
              <dl className="field-measures">
                <div><dt>Task success</dt><dd>Completion against agreed task criteria.</dd></div>
                <div><dt>Human interventions</dt><dd>When and why an operator needs to step in.</dd></div>
                <div><dt>Cycle time</dt><dd>Time to complete the physical workflow.</dd></div>
                <div><dt>Recovery behavior</dt><dd>How the model responds when a task breaks down.</dd></div>
              </dl>
              <p className="small-rail-note">Example measures. Each benchmark protocol is scoped with the model team.</p>
              <Link to="/evaluations" className="text-link">Explore the evaluation protocol <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section id="datasets" className="scrolly-chapter" aria-labelledby="datasets-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">07 / Deployment &amp; teleoperation datasets</span>
            <h2 id="datasets-heading">Data from experience. <em>For physical intelligence.</em></h2>
            <p>We collect real robot deployment data and have hundreds of thousands of hours of teleoperation data available for model teams.</p>
            <p>Find data around the tasks, platforms, and intended use that matter to your research. Discuss coverage, sample availability, formats, and licensing with our team.</p>
            <ContactDialog title="Find the right robotics data." description="Tell us your target tasks, robot platforms, and how you plan to use the data." subject="Robotics dataset inventory and licensing inquiry" messagePlaceholder="Deployment or teleoperation data, target tasks, modalities, robot platforms, intended use, and approximate scope…" trigger={<button className="button" type="button">Request dataset inventory <ArrowUpRight size={16} /></button>} />
          </div>
          <div className="story-rail rail-right rail-offset"><DatasetExplorer /></div>
        </section>

        <section id="hardware-partners" className="scrolly-chapter" aria-labelledby="partners-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">08 / For robotics hardware companies</span>
            <h2 id="partners-heading">You build the robot. <em>We bring it to work.</em></h2>
            <p>Join a network of more than 15 robotics brand partners. We connect hardware with site operators, deployment operations, and teams developing physical AI models.</p>
            <p>Bring your platform and its interfaces. We’ll discuss hardware fit, integration, human support, and a practical path into real operating environments.</p>
            <ContactDialog title="Bring your hardware into the world." description="Tell us about your robot platform and the deployments you want to support." subject="Robotics hardware partnership inquiry" messagePlaceholder="Your brand, robot platform, interfaces, deployment readiness, and partnership goals…" trigger={<button className="button" type="button">Become a hardware partner <ArrowUpRight size={16} /></button>} />
          </div>
          <div className="story-rail rail-right rail-offset">
            <div className="report-note field-record"><span className="story-index">ONE NETWORK / MULTIPLE BRANDS</span><h3>Built to scale across brands and sites.</h3><dl className="field-measures"><div><dt>15+ robotics brand partners</dt><dd>A deployment network built around hardware diversity.</dd></div><div><dt>Real operating environments</dt><dd>Hotels and data centers; cloud kitchens under exploration.</dd></div><div><dt>Deployment + learning</dt><dd>Operations, human support, evaluation, and data.</dd></div></dl><Link to="/catalog" className="text-link">Explore robot platforms <ArrowUpRight size={15} /></Link><p className="small-rail-note">Our catalog is a reference guide. Listed platforms are not a count of partnerships or confirmed integrations.</p></div>
          </div>
        </section>

        <section
          id="newsroom"
          className="scrolly-chapter scrolly-news"
          aria-labelledby="news-heading"
        >
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">09 / Out in the world</span>
            <h2 id="news-heading">
              Part of a bigger <em>conversation.</em>
            </h2>
            <p>
              A few perspectives on the work, the people, and the questions moving robotics forward.
            </p>
            <Link to="/newsroom" className="text-link">
              Visit the newsroom <ArrowUpRight size={15} />
            </Link>
            <ArticleCard article={newsArticles[0]} compact />
          </div>
          <div className="story-rail rail-right rail-offset news-rail">
            <ArticleCard article={newsArticles[1]} compact />
            <ArticleCard article={newsArticles[2]} compact />
          </div>
        </section>

        <section id="faq" className="scrolly-chapter" aria-labelledby="faq-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">10 / Glad you asked</span>
            <h2 id="faq-heading">
              Curiosity <em>looks good on you.</em>
            </h2>
            <p>A few things you might be wondering.</p>
            <ContactDialog
              title="What would you like to know?"
              subject="A question from the CosmicBrain website"
              trigger={
                <button type="button" className="text-link">
                  Ask us something else <ArrowUpRight size={15} />
                </button>
              }
            />
          </div>
          <div className="story-rail rail-right rail-faq">
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span>0{index + 1}</span>
                  {question}
                  <Plus size={15} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="scrolly-chapter scrolly-contact"
          aria-labelledby="contact-heading"
        >
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">11 / Your next chapter</span>
            <h2 id="contact-heading">
              What could we <em>build together?</em>
            </h2>
            <p>
              A robot deployment, a model evaluation, a dataset, or a hardware partnership.
              Tell us what you’re building and what a useful next step would look like.
            </p>
            <ContactDialog
              title="Hello, fellow human."
              description="Tell us what you're imagining. We'll work out the next step together."
              trigger={
                <button className="button">
                  Say hello <ArrowUpRight size={16} />
                </button>
              }
            />
          </div>
          <div className="story-rail rail-right rail-offset">
            <div className="rail-formula">
              human curiosity
              <br />
              <span>× thoughtful engineering</span>
              <hr />
              <em>a world of possibility</em>
            </div>
            <p className="rail-handwritten">
              People at the heart.
              <br />
              Robots in the loop.
            </p>
          </div>
        </section>
      </main>
      <footer className="scrolly-chapter immersive-footer">
        <div className="story-rail rail-left">
          <Link to="/" className="wordmark">
            <CosmicMark />
            <span>cosmicbrain.</span>
          </Link>
          <p>
            A little curiosity.
            <br />A lot of possibility.
          </p>
          <ContactDialog
            trigger={
              <button type="button" className="text-link">
                Get in touch <ArrowUpRight size={14} />
              </button>
            }
          />
          <small>© {new Date().getFullYear()} CosmicBrain AI</small>
        </div>
        <div className="story-rail rail-right">
          <div className="immersive-footer-links">
            <Link to="/sales">Sales</Link>
            <Link to="/catalog">The robots</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/newsroom">Newsroom</Link>
            <a href="#evaluations">Evals &amp; benchmarks</a>
            <a href="#datasets">Datasets</a>
            <Link to="/docs">Technical report</Link>
            <a href="/app">Live Teleop</a>
          </div>
          <p className="small-rail-note">
            <Heart size={12} /> Built with care in San Francisco.
          </p>
          <a href="#top" className="text-link">
            Back to the beginning <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}

function HumanDiagram() {
  return (
    <figure className="human-learning-diagram">
      <svg
        viewBox="0 0 280 100"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <circle cx="35" cy="25" r="8" />
        <path d="M19 63V48a16 16 0 0 1 32 0v15m-9-17 17 11M85 46h25m-6-5 6 5-6 5" />
        <rect x="125" y="15" width="38" height="24" rx="8" />
        <path d="M135 27h18m-9 12v8m-16 1h32l-6 27h-20ZM186 46h25m-6-5 6 5-6 5M230 59l11-6h17a5 5 0 0 1 0 10h-15m-13 11 13-8 19 1 11-12M237 18h25v23h-25zm7 0v-6h11v6" />
      </svg>
      <figcaption>
        <span>Human experience</span>
        <span>Robot learning</span>
        <span>A helping hand</span>
      </figcaption>
      <p>observe → learn → help</p>
    </figure>
  );
}

function LearningLoop() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];
  return (
    <div className="rail-learning">
      <div className="rail-learning-tabs" role="tablist" aria-label="Explore the learning loop">
        {stages.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            id={`learning-tab-${index}`}
            aria-selected={selected === index}
            aria-controls="learning-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? (index + 1) % 3
                  : event.key === "ArrowLeft"
                    ? (index + 2) % 3
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : null;
              if (next !== null) {
                event.preventDefault();
                setSelected(next);
                document.getElementById(`learning-tab-${next}`)?.focus();
              }
            }}
          >
            <span>0{index + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div id="learning-panel" role="tabpanel" aria-labelledby={`learning-tab-${selected}`}>
        <h3>{stage.subtitle}</h3>
        <p>{stage.body}</p>
        <div className="learning-path">
          {stage.labels.map((label, index) => (
            <div key={label}>
              <span>0{index + 1}</span>
              {label}
              {index < 2 && <ArrowDown size={13} />}
            </div>
          ))}
        </div>
        <div className="rail-formula">
          {stage.equation}
          <small>{stage.explanation}</small>
        </div>
        <Link className="text-link" to="/sales">
          Find your starting point <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

const datasetTypes = [
  { name: "Deployment data", title: "Experience from real operations.", body: "Data collected from robots operating in real environments, with the context of actual tasks, sites, and human involvement.", source: "Real deployment sites", scope: "Available tasks, platforms, and signals", use: "Model training, evaluation, and research" },
  { name: "Teleoperation data", title: "Hundreds of thousands of hours.", body: "Human-guided robot experience for teams building more capable physical AI. Explore our teleoperation data inventory with your target tasks and models in view.", source: "Human teleoperation", scope: "Task coverage, available formats, and licensing", use: "Learning from human-guided operation" },
];
function DatasetExplorer() {
  const [selected, setSelected] = useState(0);
  const dataset = datasetTypes[selected];
  return <div className="rail-learning rail-datasets">
    <div className="rail-learning-tabs" role="tablist" aria-label="Explore robotics datasets">
      {datasetTypes.map((item, index) => <button key={item.name} type="button" role="tab" id={"dataset-tab-" + index} aria-selected={selected === index} aria-controls="dataset-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
        const next = event.key === "ArrowRight" || event.key === "ArrowLeft" ? 1 - index : event.key === "Home" ? 0 : event.key === "End" ? 1 : null;
        if (next !== null) { event.preventDefault(); setSelected(next); document.getElementById("dataset-tab-" + next)?.focus(); }
      }}><span>0{index + 1}</span>{item.name}</button>)}
    </div>
    <div id="dataset-panel" role="tabpanel" aria-labelledby={"dataset-tab-" + selected}>
      <h3>{dataset.title}</h3><p>{dataset.body}</p>
      <dl className="field-measures"><div><dt>Source</dt><dd>{dataset.source}</dd></div><div><dt>Discuss</dt><dd>{dataset.scope}</dd></div><div><dt>For model teams</dt><dd>{dataset.use}</dd></div></dl>
      <p className="small-rail-note">Request the inventory to discuss data fit and licensing.</p>
      <Link to="/sales" className="text-link">Discuss your data requirements <ArrowUpRight size={15} /></Link>
    </div>
  </div>;
}
