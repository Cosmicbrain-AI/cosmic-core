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
  "CosmicBrain delivers Robots as a Service (RaaS) for hotels and service businesses, and AI infrastructure for robot companies: data, learning, teleoperation, and deployment.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmicBrain · A human touch to a robotic world" },
      { name: "description", content: description },
      { property: "og:title", content: "CosmicBrain · A human touch to a robotic world" },
      { property: "og:description", content: description },
      { name: "twitter:title", content: "CosmicBrain · A human touch to a robotic world" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/" }],
  }),
  component: Home,
});

const stages = [
  {
    name: "Capture",
    subtitle: "It starts with you.",
    body: "A hand reaching for a cup. A careful lift. The little adjustments we make without thinking. We capture human demonstrations and robot sensor data so those moments can become something a robot can learn from.",
    equation: "D = { (sₜ, aₜ) }",
    explanation: "A dataset of observations and actions, one moment at a time.",
    labels: ["Human demonstration", "Synchronized signals", "A shared experience"],
    icon: "01",
  },
  {
    name: "Refine",
    subtitle: "Give experience meaning.",
    body: "Real life is wonderfully messy. We organize, annotate, and evaluate the raw signals, turning movements and interactions into task-specific datasets for robotics teams.",
    equation: "θ* = arg min L(θ; D)",
    explanation: "Learning looks for the parameters that reduce error on the data.",
    labels: ["Raw observations", "Label + evaluate", "Training-ready data"],
    icon: "02",
  },
  {
    name: "Deploy",
    subtitle: "Bring learning into the world.",
    body: "Connect hardware, policies, and human operators around a real task. Evaluate what works, learn from what doesn't, and bring those experiences back into the next round of training.",
    equation: "aₜ = πθ(sₜ)",
    explanation: "A policy maps what a robot observes to the action it takes.",
    labels: ["Robot + policy", "Human supervision", "Experience feeds back"],
    icon: "03",
  },
];
const faqs = [
  [
    "So, what does CosmicBrain actually do?",
    "We have two offerings: Robots as a Service (RaaS) for end customers such as hotels, and AI infrastructure for robot companies. We connect useful robot deployments with the data, learning tools, and human operations behind them.",
  ],
  [
    "Do you build the robots, too?",
    "We work with robot makers. Our focus is the software, data, integration, and human operations that help their hardware become useful in real settings. You can explore platforms and their source specifications in our robot catalog.",
  ],
  [
    "Who do you work with?",
    "Hotels and service businesses that want robots deployed and supported as a service, plus robot manufacturers and robotics teams that need AI infrastructure. We start with your task, your environment, and your team.",
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
              A human touch
              <br />
              <em>to a robotic world</em>
            </h1>
            <a className="story-scroll" href="#motion">
              <span>
                <ArrowDown size={17} />
              </span>{" "}
              Scroll to discover
            </a>
          </div>
          <div className="story-rail rail-right hero-introduction">
            <p className="story-lead">Useful robots. Thoughtfully delivered.</p>
            <p>
              Robots as a Service for hotels and service businesses. AI infrastructure for the
              companies building robots.
            </p>
            <Link to="/sales" className="button">
              Let’s build together <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section id="motion" className="scrolly-chapter" aria-labelledby="human-heading">
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">01 / Two ways we help</span>
            <h2 id="human-heading">
              A future that feels <em>more human.</em>
            </h2>
            <p id="meet">
              For hotels and service businesses, we deploy robots as a service — bringing hardware,
              integration, and human support together around the work you need done.
            </p>
            <p>
              For robot companies, we provide the AI infrastructure behind useful machines:
              demonstration data, training workflows, teleoperation, and deployment tools.
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
              <a href="#stack">
                <span>For robot companies</span>
                <strong>AI infrastructure</strong>
                <p>The data and software behind capable robots.</p>
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
              02 / AI infrastructure for robot companies
            </span>
            <h2 id="learning-heading">
              From experience <em>to intelligence.</em>
            </h2>
            <p>
              You build the robot. We provide the AI infrastructure to help it learn and operate:
              capture demonstrations, refine training data, and connect policies with human
              supervision.
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
              A helping hand. <em>In the real world.</em>
            </h2>
            <p>
              A helping hand for your hotel or service business. We work with you to choose a
              practical workflow, integrate the robot into your space, and support its operation as
              a service.
            </p>
            <p className="rail-handwritten">
              Real spaces.
              <br />A very human purpose.
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
            <Link to="/app" className="button">
              Open Live Teleop <ArrowUpRight size={16} />
            </Link>
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

        <section
          id="newsroom"
          className="scrolly-chapter scrolly-news"
          aria-labelledby="news-heading"
        >
          <div className="story-rail rail-left">
            <span className="eyebrow chapter-kicker">06 / Out in the world</span>
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
            <span className="eyebrow chapter-kicker">07 / Glad you asked</span>
            <h2 id="faq-heading">
              Curiosity <em>looks good on you.</em>
            </h2>
            <p>A few things you might be wondering.</p>
            <a className="text-link" href="mailto:hello@cosmicbrainai.com">
              Ask us something else <ArrowUpRight size={15} />
            </a>
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
            <span className="eyebrow chapter-kicker">08 / Your next chapter</span>
            <h2 id="contact-heading">
              What could we <em>build together?</em>
            </h2>
            <p>
              Tell us about the task you’re imagining, the people around it, and what a useful next
              step would look like.
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
          <a className="text-link" href="mailto:hello@cosmicbrainai.com">
            hello@cosmicbrainai.com <ArrowUpRight size={14} />
          </a>
          <small>© {new Date().getFullYear()} CosmicBrain AI</small>
        </div>
        <div className="story-rail rail-right">
          <div className="immersive-footer-links">
            <Link to="/sales">Sales</Link>
            <Link to="/catalog">The robots</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/newsroom">Newsroom</Link>
            <Link to="/docs">Technical report</Link>
            <Link to="/app">Live Teleop</Link>
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
