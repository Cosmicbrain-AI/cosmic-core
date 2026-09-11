import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, Headset, LockKeyhole, MoveRight } from "lucide-react";
import "./TeleopFeature.css";

export function TeleopFeature() {
  return (
    <section id="platform" className="teleop-feature">
      <div className="page-width teleop-feature-inner">
        <div className="teleop-feature-copy">
          <span className="eyebrow">Live teleoperation / People in the loop</span>
          <h2>
            Your hands.
            <br />
            <em>A little more reach.</em>
          </h2>
          <p>
            Human judgment, wherever the robot is. Our operator workspace brings approved people,
            assigned robots, and headset access together in one place.
          </p>
          <Link to="/app" className="button">
            Open Live Teleop <ArrowUpRight size={17} />
          </Link>
          <span className="teleop-access">
            <LockKeyhole size={12} /> Sign in with your approved operator account.
          </span>
        </div>
        <div className="teleop-notebook">
          <div className="teleop-notebook-top">
            <Headset size={19} />
            <span className="eyebrow">A human connection</span>
            <span className="teleop-note-id">CB / TELEOP</span>
          </div>
          <div
            className="teleop-diagram"
            aria-label="An approved operator connects through a private session to an assigned robot"
          >
            <div>
              <Headset size={33} strokeWidth={1.1} />
              <span>You + your headset</span>
            </div>
            <MoveRight size={19} />
            <div>
              <LockKeyhole size={30} strokeWidth={1.1} />
              <span>One operator session</span>
            </div>
            <MoveRight size={19} />
            <div>
              <svg
                viewBox="0 0 44 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
              >
                <rect x="9" y="3" width="26" height="15" rx="5" />
                <path d="M15 11h14M19 18v5m6-5v5M9 25q13-7 26 0l-4 13H13ZM4 25v12m36-12v12M10 41h24" />
              </svg>
              <span>Your assigned robot</span>
            </div>
          </div>
          <ol className="teleop-steps">
            <li>
              <span>01</span>
              <div>
                Sign in to your workspace
                <small>Access follows your operator approval and robot assignments.</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                Choose an available robot
                <small>The workspace manages your exclusive session.</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                Open the headset handoff
                <small>Keep the session open while you work, then stop when you’re done.</small>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className="page-width technical-feature">
        <div>
          <BookOpen size={22} strokeWidth={1.2} />
          <span>
            <strong>Curious about what makes it work?</strong>
            <small>
              Cosmic 0.5 · Human-to-humanoid skill transfer, capture, retargeting, and evaluation.
            </small>
          </span>
        </div>
        <Link to="/docs">
          Read the technical report <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
