import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MoveUpRight,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import { SiteHeader, CosmicMark } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RobotPlayground } from "@/components/RobotPlayground";
import { ContactDialog } from "@/components/ContactDialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import "@/components/home.css";

const description =
  "Robots learn from people. CosmicBrain brings human demonstrations, training data, teleoperation, and real-world robot deployment into one thoughtful loop.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmicBrain · A human touch for a robotic world" },
      { name: "description", content: description },
      { property: "og:title", content: "CosmicBrain · A human touch for a robotic world" },
      { property: "og:description", content: description },
      { name: "twitter:title", content: "CosmicBrain · A human touch for a robotic world" },
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
    "We build the data and deployment layer for humanoid robotics: capture real-world demonstrations and signals, refine them into useful training data, and connect hardware, policies, and human operators in the field.",
  ],
  [
    "Do you build the robots, too?",
    "We work with robot makers. Our focus is the software, data, integration, and human operations that help their hardware become useful in real settings. You can explore platforms and their source specifications in our robot catalog.",
  ],
  [
    "Who do you work with?",
    "Robotics teams collecting task-specific data, model builders learning from the physical world, and organizations exploring a supervised robot pilot. We start with the task and the people around it.",
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
  const [reelOpen, setReelOpen] = useState(false);
  const reelTriggerRef = useRef<HTMLButtonElement>(null);
  return (
    <div id="top" className="home-page">
      <SiteHeader />
      <main>
        <section className="home-hero page-width">
          <div className="hero-copy">
            <div className="eyebrow hero-kicker">
              <span className="little-star">✳</span> A human touch for a robotic world
            </div>
            <h1>
              Big possibilities.
              <br />
              <em>Human beginnings.</em>
            </h1>
            <p>
              We’re teaching robots to find their place in our world.
              <br className="wide-break" /> With real human experience, thoughtful engineering,
              <br className="wide-break" /> and a little cosmic curiosity.
            </p>
            <div className="hero-buttons">
              <Link to="/sales" className="button">
                Let’s build together <ArrowUpRight size={17} />
              </Link>
              <button
                ref={reelTriggerRef}
                className="reel-trigger"
                onClick={() => setReelOpen(true)}
              >
                <span>
                  <Play size={12} fill="currentColor" />
                </span>{" "}
                Meet CosmicBrain
              </button>
            </div>
            <div className="hero-note">
              <span className="note-rule" />
              <span>
                Data. Teleoperation. Deployment.
                <br />
                The brain behind a helping hand.
              </span>
            </div>
          </div>
          <div className="hero-robot">
            <RobotPlayground />
          </div>
          <div className="hero-bottom">
            <span className="eyebrow">Built by curious people, for the real world.</span>
            <a href="#meet" className="eyebrow">
              A little exploration <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="principle-strip">
          <div className="page-width">
            <span>Human experience</span>
            <Plus size={13} />
            <span>Physical intelligence</span>
            <span className="strip-equals">=</span>
            <span className="strip-result">
              More possibility for everyone <Sparkles size={17} />
            </span>
            <span className="strip-formula">∑ small steps → big things</span>
          </div>
        </div>

        <section id="meet" className="manifest-section page-width section-space">
          <div className="section-index">
            <span className="eyebrow">01 / A note from us</span>
            <div className="orbit-sketch" aria-hidden="true">
              <svg viewBox="0 0 150 120">
                <ellipse cx="75" cy="60" rx="64" ry="23" transform="rotate(-30 75 60)" />
                <ellipse cx="75" cy="60" rx="64" ry="23" transform="rotate(30 75 60)" />
                <ellipse cx="75" cy="60" rx="64" ry="23" transform="rotate(90 75 60)" />
                <circle cx="75" cy="60" r="5" />
                <circle cx="127" cy="29" r="4" />
              </svg>
              <span>It all starts with curiosity.</span>
            </div>
          </div>
          <div className="manifest-copy">
            <h2>
              The future should feel
              <br />
              <em>a little more human.</em>
            </h2>
            <p>
              Robotics begins with something beautifully ordinary: a person showing another way to
              do a thing.
            </p>
            <p>
              We’re here for the space between a clever machine and a useful one. The careful
              engineering. The shared learning. The people who make it all work. CosmicBrain brings
              those pieces together, so robots can lend a hand in the places that need one.
            </p>
            <div className="signature">
              <span className="signature-line">With curiosity,</span>
              <span>The CosmicBrain team</span>
              <span className="eyebrow">San Francisco · Planet Earth</span>
            </div>
          </div>
        </section>

        <LearningLoop />

        <section id="primitives" className="senses-section page-width section-space">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / A feeling for the physical world</span>
              <h2>
                There’s a little physics
                <br />
                in every <em>helping hand.</em>
              </h2>
            </div>
            <p>
              A useful robot needs more than instructions. It needs ways to understand what’s around
              it, how it’s moving, and when to be gentle.
            </p>
          </div>
          <div className="physics-notes">
            <article className="physics-note">
              <div className="note-top">
                <span className="eyebrow">01 / Perception</span>
                <span>↗</span>
              </div>
              <div className="physics-drawing depth-drawing" aria-hidden="true">
                <svg viewBox="0 0 240 110">
                  <path d="M35 80 100 45l100 35-68 27ZM100 45V8l100 33v39M132 107V65L35 30v50M35 30l65-22M132 65l68-24" />
                  <path d="m15 90 7-4m187-8 16-9M110 20l8 3m4 2 8 3" strokeDasharray="4 4" />
                  <circle cx="132" cy="65" r="4" />
                </svg>
                <span>x, y, z</span>
              </div>
              <h3>See the possibilities.</h3>
              <p>
                Pixels, depth, and geometry turn a scene into something a robot can reason about.
              </p>
              <div className="note-equation">
                p = (x, y, z)<span>A place in three-dimensional space.</span>
              </div>
            </article>
            <article className="physics-note">
              <div className="note-top">
                <span className="eyebrow">02 / Motion</span>
                <span>↗</span>
              </div>
              <div className="physics-drawing" aria-hidden="true">
                <svg viewBox="0 0 240 110">
                  <path d="M24 85h191M35 98V10" />
                  <path
                    d="M35 83c30 0 25-57 56-57s28 60 58 60 25-59 65-59"
                    className="motion-curve"
                  />
                  <path d="m208 18 9 7-7 9" />
                  <circle cx="92" cy="26" r="4" />
                </svg>
                <span>One small movement.</span>
              </div>
              <h3>Make every move count.</h3>
              <p>
                Joint positions and motion signals connect intent to a coordinated physical action.
              </p>
              <div className="note-equation">
                v = dx / dt<span>How position changes over time.</span>
              </div>
            </article>
            <article className="physics-note">
              <div className="note-top">
                <span className="eyebrow">03 / Touch</span>
                <span>↗</span>
              </div>
              <div className="physics-drawing" aria-hidden="true">
                <svg viewBox="0 0 240 110">
                  <circle cx="120" cy="58" r="27" />
                  <path d="M81 58H36m45 0-9-7m9 7-9 7m87-7h45m-45 0 9-7m-9 7 9 7M120 20V3m0 90v16" />
                  <path d="M98 18c8-5 35-5 44 0M98 98c9 5 35 5 44 0" strokeDasharray="3 4" />
                </svg>
                <span>Just enough. Never too much.</span>
              </div>
              <h3>A gentler kind of strength.</h3>
              <p>
                Force and tactile signals help a robot understand the difference between holding and
                squeezing.
              </p>
              <div className="note-equation">
                F = ma<span>Force, mass, and acceleration.</span>
              </div>
            </article>
          </div>
        </section>

        <section id="platform" className="field-section">
          <div className="page-width field-inner">
            <div className="field-visual">
              <div className="eyebrow">Field notes / The human connection</div>
              <img
                src="/media/HERO-hand-poster.jpg"
                alt="Close-up of an articulated humanoid robot hand"
                loading="lazy"
                width="800"
                height="450"
              />
              <span className="field-caption">
                A hand is hardware.
                <br />
                <em>A helping hand is a whole system.</em>
              </span>
              <span className="field-image-label eyebrow">
                CosmicBrain · Robotics concept study
              </span>
            </div>
            <div className="field-copy">
              <span className="eyebrow">04 / From the lab to everyday life</span>
              <h2>
                Good technology.
                <br />
                <em>Better together.</em>
              </h2>
              <p>
                Robot makers build remarkable hardware. Researchers give it new abilities. Operators
                bring human judgment. We connect them around a job worth doing.
              </p>
              <div className="audience-links">
                <Link to="/solutions">
                  <span>
                    <b>For the people putting robots to work</b>
                    <small>Explore workflows and supervised pilots</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
                <Link to="/sales">
                  <span>
                    <b>For the minds teaching them</b>
                    <small>Build with task-specific real-world data</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
                <Link to="/catalog">
                  <span>
                    <b>For the makers moving us forward</b>
                    <small>Find the hardware for your next idea</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section page-width section-space">
          <div className="faq-heading">
            <span className="eyebrow">05 / Glad you asked</span>
            <h2>
              Curiosity
              <br />
              <em>looks good on you.</em>
            </h2>
            <p>A few things you might be wondering.</p>
            <a className="text-link" href="mailto:hello@cosmicbrainai.com">
              Ask us something else <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details key={q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {q}
                  <Plus className="faq-plus" size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="home-contact">
          <div className="page-width">
            <div className="contact-equation" aria-hidden="true">
              human curiosity
              <br />
              <span>×</span> thoughtful engineering
              <br />
              <i>= a world of possibility</i>
            </div>
            <div className="home-contact-copy">
              <span className="eyebrow">Every good thing starts with a conversation</span>
              <h2>
                What could we
                <br />
                <em>build together?</em>
              </h2>
              <ContactDialog
                title="Hello, fellow human."
                description="Tell us what you're imagining. We'll work out the next step together."
                trigger={
                  <button className="button">
                    Say hello <ArrowUpRight size={17} />
                  </button>
                }
              />
            </div>
            <CosmicMark className="contact-star" />
          </div>
        </section>
      </main>
      <SiteFooter />
      <Dialog open={reelOpen} onOpenChange={setReelOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            reelTriggerRef.current?.focus();
          }}
          className="reel-dialog sm:max-w-4xl"
        >
          <DialogTitle className="font-display text-3xl">Meet CosmicBrain</DialogTitle>
          <DialogDescription>A closer look at our data and deployment approach.</DialogDescription>
          {reelOpen && (
            <iframe
              src="https://www.youtube-nocookie.com/embed/TipCCtr0OIg?rel=0"
              title="CosmicBrain showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <a
            className="text-link"
            href="https://www.youtube.com/watch?v=TipCCtr0OIg"
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube <ArrowUpRight size={15} />
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LearningLoop() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];
  return (
    <section id="stack" className="learning-section section-space">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / The CosmicBrain approach</span>
            <h2>
              Experience becomes learning.
              <br />
              Learning becomes <em>doing.</em>
            </h2>
          </div>
          <p>
            From a first demonstration to a useful robot in the field. Three connected layers, with
            people in the loop.
          </p>
        </div>
        <div className="loop-workbench">
          <div className="loop-tabs" role="tablist" aria-label="Explore the learning loop">
            {stages.map((item, i) => (
              <button
                type="button"
                key={item.name}
                role="tab"
                aria-selected={selected === i}
                aria-controls="learning-panel"
                id={`learning-tab-${i}`}
                tabIndex={selected === i ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (i + 1) % 3
                      : event.key === "ArrowLeft"
                        ? (i + 2) % 3
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
                <span className="eyebrow">{item.icon}</span>
                <span>{item.name}</span>
                <MoveUpRight size={17} />
              </button>
            ))}
          </div>
          <div
            className="loop-panel"
            role="tabpanel"
            id="learning-panel"
            aria-labelledby={`learning-tab-${selected}`}
            tabIndex={0}
          >
            <div className="loop-copy">
              <h3>{stage.subtitle}</h3>
              <p>{stage.body}</p>
              <Link to="/sales" className="text-link">
                Find your starting point <ArrowRight size={16} />
              </Link>
            </div>
            <div className={`loop-diagram loop-diagram-${selected}`}>
              <span className="eyebrow">A small field guide to {stage.name.toLowerCase()}</span>
              <div className="diagram-flow">
                {stage.labels.map((label, i) => (
                  <div key={label} className="diagram-item">
                    <div className="diagram-symbol">
                      {i === 0 ? (
                        <svg viewBox="0 0 54 54" aria-hidden="true">
                          <circle cx="27" cy="13" r="8" />
                          <path d="M27 21v19M12 29l15-4 15 4M27 40l-12 12m12-12 12 12" />
                        </svg>
                      ) : i === 1 ? (
                        <CosmicMark />
                      ) : (
                        <svg viewBox="0 0 54 54" aria-hidden="true">
                          <rect x="8" y="10" width="38" height="34" rx="9" />
                          <path d="M18 23v7m18-7v7M20 36h14M27 3v7" />
                        </svg>
                      )}
                    </div>
                    <span>{label}</span>
                    {i < 2 && <ArrowRight className="diagram-arrow" size={18} />}
                  </div>
                ))}
              </div>
              <div className="loop-equation">
                {stage.equation}
                <span>{stage.explanation}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="loop-footnote">
          <span>↳</span> The most important part of the loop? What we learn together.
        </p>
      </div>
    </section>
  );
}
