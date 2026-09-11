import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, Check, Cpu, Database, MoveUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import "@/components/workspace.css";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Let’s build something useful — CosmicBrain" },
      {
        name: "description",
        content:
          "Talk with CosmicBrain about your robotics project. Explore deployment, robot learning data, and hardware integration with people who love building.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/sales" },
      { property: "og:title", content: "Let’s build something useful — CosmicBrain" },
      {
        property: "og:description",
        content:
          "A good robotics project begins with a conversation. Tell us what you’re working on.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/sales" }],
  }),
  component: SalesPage,
});

const paths = [
  {
    id: "deployment",
    number: "01",
    label: "Put robots to work",
    icon: MoveUpRight,
    title: "Start with a task. Build from there.",
    description:
      "Show us a workflow your team knows well. Together, we’ll explore where robotics can help, what the environment requires, and how people stay in the loop.",
    details: [
      "The task and its real-world constraints",
      "Hardware, supervision, and integration needs",
      "A pilot with clear measures of progress",
    ],
    subject: "Let’s explore a robot deployment",
    placeholder:
      "What task would you like help with? Tell us about your workplace, current process, and what a useful first step would look like.",
    formula: "progress = observe → test → learn",
  },
  {
    id: "data",
    number: "02",
    label: "Teach robots something",
    icon: Database,
    title: "Better learning begins with the right experience.",
    description:
      "Working on a robot model? Let’s connect your research question to demonstrations and data that reflect the tasks you actually want a robot to learn.",
    details: [
      "The behaviors and tasks you’re training for",
      "Your robot platform and data format",
      "Collection scope and quality criteria",
    ],
    subject: "Let’s talk robot learning data",
    placeholder:
      "What are you teaching your robot? Tell us about your model, embodiment, target tasks, and the data you need.",
    formula: "learning = experience + feedback",
  },
  {
    id: "hardware",
    number: "03",
    label: "Connect your hardware",
    icon: Cpu,
    title: "You build the body. Let’s connect the pieces.",
    description:
      "Bring your robot, your technical questions, and your ambition. We’ll explore the software, teleoperation, and data workflows that fit your platform.",
    details: [
      "Your hardware and existing interfaces",
      "Teleoperation and data collection workflows",
      "An integration path we can test together",
    ],
    subject: "Let’s explore a hardware partnership",
    placeholder:
      "What are you building? Tell us about your hardware, available interfaces, and the software or teleoperation challenges you’re working through.",
    formula: "possibility = hardware × connection",
  },
] as const;

function SalesPage() {
  const [selected, setSelected] = useState(0);
  const path = paths[selected];

  return (
    <div className="cb-sales" id="top">
      <SiteHeader />
      <main>
        <section className="cb-sales-hero">
          <div>
            <p className="cb-eyebrow">
              <span className="cb-small-dot" /> A conversation, then a collaboration
            </p>
            <h1>
              Let’s build
              <br />
              something <em>useful.</em>
            </h1>
            <p className="cb-sales-intro">
              The best part of building robots? The people you build with. Tell us what’s on your
              mind. We’ll help you find a thoughtful place to start.
            </p>
            <a className="cb-text-link" href="#your-project">
              What are you working on? <ArrowDown size={17} />
            </a>
          </div>
          <div className="cb-project-note">
            <div className="cb-note-top">
              <span>FROM THE WORKBENCH</span>
              <span>fig. 01</span>
            </div>
            <svg
              className="cb-arm-study"
              viewBox="0 0 380 260"
              fill="none"
              role="img"
              aria-label="An engineering sketch of a robot arm reaching toward a small star"
            >
              <path
                d="M49 224H333M81 42V224"
                stroke="currentColor"
                strokeOpacity=".2"
                strokeDasharray="4 5"
              />
              <path
                d="M110 208L163 119L250 145L287 92"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M110 208L163 119L250 145L287 92"
                stroke="#f7f4ec"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M81 217H143L135 201H92Z"
                fill="#d8d7bd"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="110"
                cy="202"
                r="12"
                fill="#f7f4ec"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="163"
                cy="119"
                r="13"
                fill="#d8d7bd"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="250"
                cy="145"
                r="10"
                fill="#d8d7bd"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M281 90L286 72L301 70M291 97L308 89L311 76"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M311 33L314 46L327 49L314 53L311 66L307 53L294 49L307 46Z" fill="#b94e32" />
              <path
                d="M175 202A63 63 0 0 0 143 149M171 68C226 58 267 64 282 79"
                stroke="#b94e32"
                strokeDasharray="4 5"
              />
              <text
                x="163"
                y="184"
                fill="#b94e32"
                fontSize="20"
                fontFamily="serif"
                fontStyle="italic"
              >
                θ
              </text>
              <text x="180" y="44" fill="currentColor" fontSize="13" fontFamily="monospace">
                a little reach.
              </text>
            </svg>
            <div className="cb-note-message">
              Big ideas.
              <br />
              <em>Thoughtful first steps.</em>
            </div>
            <div className="cb-note-bottom">curiosity + care + a bit of engineering</div>
          </div>
        </section>

        <section className="cb-project-section" id="your-project" aria-labelledby="project-title">
          <div className="cb-section-intro">
            <p className="cb-eyebrow">01 / Your starting point</p>
            <h2 id="project-title">Every project starts somewhere.</h2>
            <p>Pick the thought that’s closest to yours. We can figure out the rest together.</p>
          </div>
          <div className="cb-path-options" aria-label="Choose your project focus">
            {paths.map((option, index) => (
              <button
                key={option.id}
                type="button"
                className="cb-path-option"
                aria-pressed={selected === index}
                aria-controls="project-brief"
                onClick={() => setSelected(index)}
              >
                <span className="cb-path-number">{option.number}</span>
                <option.icon size={24} strokeWidth={1.4} />
                <span>{option.label}</span>
                <ArrowRight className="cb-path-arrow" size={19} />
              </button>
            ))}
          </div>
          <div className="cb-project-brief" id="project-brief" aria-live="polite">
            <div>
              <p className="cb-eyebrow">A few things we can explore</p>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <ContactDialog
                title="Tell us what you’re building."
                description="A rough idea is a perfectly good place to start."
                subject={path.subject}
                messagePlaceholder={path.placeholder}
                trigger={
                  <button className="cb-warm-button" type="button">
                    Let’s talk about it <ArrowRight size={18} />
                  </button>
                }
              />
            </div>
            <div className="cb-brief-aside">
              <span className="cb-eyebrow">Bring your questions</span>
              <ul>
                {path.details.map((detail) => (
                  <li key={detail}>
                    <Check size={17} />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="cb-brief-formula">{path.formula}</div>
            </div>
          </div>
        </section>

        <section className="cb-conversation-section">
          <div>
            <p className="cb-eyebrow">02 / How we work together</p>
            <h2>
              More listening.
              <br />
              <em>Less guessing.</em>
            </h2>
            <p>
              Robotics works best when we get close to the real problem. That starts with
              understanding your world.
            </p>
          </div>
          <ol className="cb-conversation-steps">
            {[
              [
                "Share the messy version.",
                "The idea, the challenge, the thing you’re not sure is possible yet. You don’t need a finished brief.",
              ],
              [
                "Find the right first experiment.",
                "We’ll discuss the task, the constraints, and what we should learn before going further.",
              ],
              [
                "Build with a clear view of progress.",
                "Agree on the scope, the role of human supervision, and how we’ll evaluate the work together.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="cb-sales-closing">
          <span className="cb-eyebrow">Still connecting the dots?</span>
          <h2>That’s our favorite part.</h2>
          <ContactDialog
            trigger={
              <button className="cb-warm-button" type="button">
                Say hello <ArrowRight size={18} />
              </button>
            }
          />
          <Link to="/solutions" className="cb-text-link">
            Explore what we’re building <ArrowRight size={17} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
