import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import type { Robot } from "@/data/catalog";
import "./explore.css";

/** A drawing from the notebook, never a representation of a catalog product. */
export function NotebookSketch({ variant = "robot" }: { variant?: "robot" | "arm" | "orbit" }) {
  return (
    <svg viewBox="0 0 280 220" fill="none" aria-hidden="true" className="explore-sketch">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 189H255M42 23V198" opacity=".25" />
        <path d="M38 28l4-5 4 5M250 185l5 4-5 4" opacity=".4" />
        {variant === "robot" ? (
          <>
            <path d="M109 83V66a30 30 0 0 1 60 0v17M139 35V21m-5 0h10" />
            <rect x="104" y="65" width="72" height="45" rx="17" />
            <path d="M115 110l-9 60h68l-9-60M111 119l-26 35 14 12m70-47 26 35-14 12M120 170v18h-14m54-18v18h14" />
            <circle cx="125" cy="85" r="4" fill="currentColor" />
            <circle cx="155" cy="85" r="4" fill="currentColor" />
            <path d="M133 97q7 7 14 0M126 138h28M139 125v26" />
            <circle cx="139" cy="138" r="18" strokeDasharray="2 5" />
            <path d="M181 74h42m-31 89h31M78 119H59" opacity=".5" strokeDasharray="3 4" />
            <path d="M203 38q22 3 18 22m-2-6 2 6 6-2" />
          </>
        ) : variant === "arm" ? (
          <>
            <path d="M92 183h72l-12-15h-48l-12 15ZM119 164l-11-68 12-5 25 70M119 88l60-38 10 11-63 42M189 56l25 30m-9-1 15-4 10 13m-16-8 2 17 15 3" />
            <circle cx="119" cy="96" r="13" />
            <circle cx="185" cy="55" r="10" />
            <circle cx="133" cy="164" r="9" />
            <path
              d="M120 96h62v-41M145 93q1-15-9-22M66 151a88 88 0 0 1 161-88"
              strokeDasharray="3 5"
              opacity=".5"
            />
            <path d="M219 63h8v-8" opacity=".5" />
          </>
        ) : (
          <>
            <ellipse cx="145" cy="106" rx="87" ry="32" transform="rotate(-28 145 106)" />
            <ellipse cx="145" cy="106" rx="87" ry="32" transform="rotate(35 145 106)" />
            <ellipse cx="145" cy="106" rx="87" ry="32" transform="rotate(95 145 106)" />
            <circle cx="145" cy="106" r="13" />
            <circle cx="213" cy="63" r="6" fill="currentColor" />
            <circle cx="92" cy="59" r="5" fill="currentColor" />
            <circle cx="137" cy="180" r="5" fill="currentColor" />
            <path d="M145 106l52 30m-10-2 10 2-6-8" strokeDasharray="3 4" />
          </>
        )}
      </g>
    </svg>
  );
}

export function PageHero({
  kicker,
  title,
  accent,
  sub,
  sketch = "robot",
  note = "A little curiosity goes a long way.",
}: {
  kicker: string;
  title: string;
  accent?: string;
  sub: string;
  sketch?: "robot" | "arm" | "orbit";
  note?: string;
}) {
  return (
    <section className="explore-hero">
      <div className="explore-wrap explore-hero-grid">
        <div>
          <div className="explore-eyebrow">
            <span className="explore-small-star">✳</span>
            {kicker}
          </div>
          <h1>
            {title}
            {accent && (
              <>
                {" "}
                <em>{accent}</em>
              </>
            )}
          </h1>
          <p className="explore-intro">{sub}</p>
        </div>
        <aside className="explore-hero-note">
          <span className="explore-note-label">From our engineering notebook</span>
          <NotebookSketch variant={sketch} />
          <p>{note}</p>
          <span className="explore-note-formula">curiosity + engineering → possibility</span>
        </aside>
      </div>
    </section>
  );
}

export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`explore-filter-pill${active ? " is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function AvailabilityBadge({ value }: { value: Robot["availability"] }) {
  if (!value) return null;
  return (
    <span className={`explore-availability${value === "In Stock" ? " is-stock" : ""}`}>
      <span />
      {value}
    </span>
  );
}

export function RobotImage({ robot, eager = false }: { robot: Robot; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="explore-robot-image">
      {robot.image && !failed ? (
        <img
          src={robot.image}
          alt={robot.name}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="explore-image-placeholder">
          <NotebookSketch />
          <span>Product photograph coming soon</span>
        </div>
      )}
      <span className="explore-image-cross cross-top" aria-hidden="true">
        +
      </span>
      <span className="explore-image-cross cross-bottom" aria-hidden="true">
        +
      </span>
    </div>
  );
}

export function RobotCard({ robot }: { robot: Robot }) {
  const s = robot.specs;
  return (
    <Link to="/catalog/$slug" params={{ slug: robot.slug }} className="explore-robot-card">
      <div className="explore-card-photo">
        <RobotImage robot={robot} />
        <div className="explore-card-badge">
          <AvailabilityBadge value={robot.availability} />
        </div>
      </div>
      <div className="explore-card-body">
        <span className="explore-note-label">
          {robot.manufacturer ?? "Manufacturer not listed"}
        </span>
        <div className="explore-card-title">
          <h3>{robot.name}</h3>
          <ArrowUpRight size={21} aria-hidden="true" />
        </div>
        <p>{robot.summary}</p>
        <dl className="explore-spec-strip">
          <Spec label="DoF" value={s.dof != null ? String(s.dof) : "N/A"} />
          <Spec label="Height" value={s.heightCm != null ? `${s.heightCm} cm` : "N/A"} />
          <Spec label="Weight" value={s.weightKg != null ? `${s.weightKg} kg` : "N/A"} />
          <Spec label="Payload" value={s.payloadKg != null ? `${s.payloadKg} kg` : "N/A"} />
        </dl>
      </div>
    </Link>
  );
}

export function SiteFooterCTA({ context }: { context: string }) {
  return (
    <>
      <section className="explore-cta">
        <div className="explore-wrap explore-cta-grid">
          <div>
            <div className="explore-eyebrow">The next page is yours</div>
            <h2>
              Big ideas start with
              <br />
              <em>a conversation.</em>
            </h2>
          </div>
          <div>
            <p>
              Thinking about putting {context} to work? Tell us what you have in mind. We can help
              connect the hardware, data, and people to take the next step.
            </p>
            <div className="explore-actions">
              <Link to="/sales" className="explore-primary-link">
                Let’s talk <ArrowUpRight size={17} />
              </Link>
              <Link to="/app" className="explore-text-link">
                Explore live teleop <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
