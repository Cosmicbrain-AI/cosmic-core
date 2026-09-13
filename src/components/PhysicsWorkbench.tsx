import { useId, useRef, useState } from "react";
import { Hand, MoveUpRight, ScanEye } from "lucide-react";
import "./PhysicsWorkbench.css";

const studies = [
  {
    id: "perception",
    label: "Perception",
    icon: ScanEye,
    heading: "See the possibilities.",
    description:
      "Pixels, depth, and geometry turn a scene into something a robot can reason about.",
    instruction:
      "Sweep the view across the scene. Notice how a different angle brings different points into focus.",
    formula: "p = (x, y, z)",
    meaning: "A place in three-dimensional space.",
    control: "Scan direction",
    min: -30,
    max: 30,
    unit: "°",
    start: "Look up",
    end: "Look down",
  },
  {
    id: "motion",
    label: "Motion",
    icon: MoveUpRight,
    heading: "Make every move count.",
    description:
      "Joint positions and motion signals connect intent to a coordinated physical action.",
    instruction: "Bend the elbow. One change at the joint draws a whole new position for the hand.",
    formula: "p = f(θ)",
    meaning: "Joint angles become a position in space.",
    control: "Elbow bend",
    min: 0,
    max: 120,
    unit: "°",
    start: "Extend",
    end: "Bend",
  },
  {
    id: "touch",
    label: "Touch",
    icon: Hand,
    heading: "A gentler kind of strength.",
    description:
      "Force and tactile signals help a robot understand the difference between holding and squeezing.",
    instruction:
      "Bring the fingers together. The soft object changes shape as the opening gets smaller.",
    formula: "F = kx",
    meaning: "A simple spring model: more compression, more force.",
    control: "Gripper opening",
    min: 30,
    max: 90,
    unit: " mm",
    start: "Close",
    end: "Open",
  },
] as const;

type StudyId = (typeof studies)[number]["id"];
type Point = { x: number; y: number };
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const polar = (origin: Point, radius: number, degrees: number): Point => ({
  x: origin.x + Math.cos(radians(degrees)) * radius,
  y: origin.y + Math.sin(radians(degrees)) * radius,
});
const pointText = (point: Point) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
const pathThrough = (points: Point[]) =>
  points.map((point, index) => `${index ? "L" : "M"}${pointText(point)}`).join(" ");

function MotionDrawing({ angle }: { angle: number }) {
  const shoulder = { x: 128, y: 242 };
  const elbow = { x: 229, y: 147 };
  const upperAngle = (Math.atan2(elbow.y - shoulder.y, elbow.x - shoulder.x) * 180) / Math.PI;
  const hand = polar(elbow, 116, upperAngle + angle);
  const arcPoints = Array.from({ length: 31 }, (_, index) =>
    polar(elbow, 116, upperAngle + index * 4),
  );
  const anglePoints = Array.from({ length: 21 }, (_, index) =>
    polar(elbow, 40, upperAngle + (angle * index) / 20),
  );

  return (
    <svg
      viewBox="0 0 460 340"
      role="img"
      aria-label={`Articulated robot arm with an elbow bend of ${angle} degrees. The hand follows an arc as the elbow bends.`}
    >
      <g className="pw-construction">
        <path d="M62 278H408M82 299V46" />
        <path d="m403 274 5 4-5 4M78 51l4-5 4 5" />
        <path d={pathThrough(arcPoints)} strokeDasharray="3 6" />
        <path d={`M${hand.x} ${hand.y}V278M82 ${hand.y}H${hand.x}`} strokeDasharray="3 6" />
        <circle cx={elbow.x} cy={elbow.y} r="49" strokeDasharray="2 5" />
      </g>
      <g className="pw-machine">
        <path d="M97 275v-17q0-17 18-17h25q18 0 18 17v17Z" className="pw-shell" />
        <path d="M89 279h78M114 266h25" />
        <path d={`M${pointText(shoulder)}L${pointText(elbow)}`} className="pw-arm-core" />
        <path d={`M${pointText(shoulder)}L${pointText(elbow)}`} className="pw-arm-shell" />
        <path d={`M${pointText(elbow)}L${pointText(hand)}`} className="pw-arm-core" />
        <path
          d={`M${pointText(elbow)}L${pointText(hand)}`}
          className="pw-arm-shell pw-moving-shell"
        />
        <circle cx={shoulder.x} cy={shoulder.y} r="17" className="pw-joint" />
        <circle cx={shoulder.x} cy={shoulder.y} r="6" />
        <circle cx={elbow.x} cy={elbow.y} r="20" className="pw-joint" />
        <circle cx={elbow.x} cy={elbow.y} r="9" className="pw-pivot" />
        <circle cx={elbow.x} cy={elbow.y} r="3" className="pw-ink-fill" />
        <g transform={`translate(${hand.x} ${hand.y}) rotate(${upperAngle + angle})`}>
          <rect x="-8" y="-11" width="19" height="22" rx="4" className="pw-joint" />
          <path d="M10-9h17v5M10 9h17v-5" strokeWidth="4" />
          <circle cx="0" cy="0" r="3" className="pw-pivot" />
        </g>
      </g>
      <g className="pw-highlight">
        <path d={pathThrough(anglePoints)} />
        <circle cx={hand.x} cy={hand.y} r="3" className="pw-clay-fill" />
      </g>
      <g className="pw-diagram-type">
        <text x="92" y="53">
          y
        </text>
        <text x="406" y="296">
          x
        </text>
        <text x="146" y="174" className="pw-handwritten">
          a small turn.
        </text>
        <text x="274" y="145" className="pw-angle-label">
          θ = {angle}°
        </text>
        <text x="164" y="314">
          ONE JOINT. A WORLD OF REACH.
        </text>
      </g>
    </svg>
  );
}

function PerceptionDrawing({ angle }: { angle: number }) {
  const lens = { x: 145, y: 168 };
  const upper = polar(lens, 264, angle - 8);
  const lower = polar(lens, 264, angle + 8);
  const middle = polar(lens, 264, angle);
  const points = Array.from({ length: 99 }, (_, index) => {
    const column = index % 11;
    const row = Math.floor(index / 11);
    const x = 220 + column * 18 + Math.sin(row * 1.8) * 4;
    const y = 77 + row * 22 + Math.cos(column * 1.5) * 4;
    const pointAngle = (Math.atan2(y - lens.y, x - lens.x) * 180) / Math.PI;
    return { x, y, active: Math.abs(pointAngle - angle) < 8 };
  });

  return (
    <svg
      viewBox="0 0 460 340"
      role="img"
      aria-label={`A camera sweeps an illustrative field of points at ${angle} degrees. Points within the view are highlighted.`}
    >
      <g className="pw-construction">
        <path d="M58 277H415M145 59v217M173 168h252" strokeDasharray="3 6" />
        <circle cx={lens.x} cy={lens.y} r="42" strokeDasharray="2 5" />
        <path d="m269 212 60-31 56 28-59 33ZM269 212v-65l60-31 56 28v65M269 147l57 30 59-33M326 177v65M329 116v65" />
      </g>
      <path
        d={`M${pointText(lens)}L${pointText(upper)}L${pointText(lower)}Z`}
        className="pw-scan-field"
      />
      <g className="pw-point-cloud">
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={point.active ? 2.4 : 1.3}
            className={point.active ? "is-seen" : ""}
          />
        ))}
      </g>
      <g className="pw-highlight">
        <path d={`M${pointText(lens)}L${pointText(middle)}`} />
        <circle cx={middle.x} cy={middle.y} r="4" className="pw-clay-fill" />
      </g>
      <g className="pw-machine">
        <path d="M94 218v34h41v-34M84 256h62" />
        <path d="M80 220q33-15 66 0l-8 19H88Z" className="pw-shell" />
        <path d="M108 197v18h17v-18" />
        <rect x="72" y="141" width="72" height="57" rx="16" className="pw-shell" />
        <path d="M133 151h10q10 0 10 12v10q0 12-10 12h-10Z" className="pw-joint" />
        <path d="M84 153h32M84 159h20" />
        <circle cx="144" cy="168" r="5" className="pw-pivot" />
      </g>
      <g className="pw-diagram-type">
        <text x="63" y="106" className="pw-handwritten">
          a different perspective.
        </text>
        <text x="271" y="53">
          A SCENE BECOMES GEOMETRY
        </text>
        <text x="102" y="291" className="pw-angle-label">
          θ = {angle}°
        </text>
        <text x="298" y="290">
          x, y, z
        </text>
      </g>
    </svg>
  );
}

function TouchDrawing({ opening }: { opening: number }) {
  const center = 230;
  const gap = opening * 1.8;
  const left = center - gap / 2;
  const right = center + gap / 2;
  const restingRadius = 48.6;
  const radiusX = Math.min(restingRadius, gap / 2);
  const radiusY = restingRadius * Math.sqrt(restingRadius / radiusX);
  const contact = opening <= 54;

  return (
    <svg
      viewBox="0 0 460 340"
      role="img"
      aria-label={`A gripper with an illustrative opening of ${opening} millimeters. ${opening < 54 ? "The soft object is compressed between the fingers." : contact ? "The fingers meet the soft object." : "The fingers are clear of the soft object."}`}
    >
      <g className="pw-construction">
        <path d="M230 35v264M84 218h293" strokeDasharray="3 6" />
        <ellipse cx={center} cy="213" rx={restingRadius} ry={restingRadius} strokeDasharray="3 5" />
        <path d={`M${left} 262v28M${right} 262v28M${left} 281H${right}`} />
        <path d={`M${left + 5} 277l-5 4 5 4M${right - 5} 277l5 4-5 4`} />
      </g>
      <ellipse
        cx={center}
        cy="213"
        rx={radiusX}
        ry={radiusY}
        className={`pw-soft-object ${contact ? "is-touching" : ""}`}
      />
      <path
        d={`M${center - radiusX * 0.53} ${213 - radiusY * 0.45}q${radiusX * 0.6} ${-radiusY * 0.32} ${radiusX * 1.05} 0`}
        className="pw-object-detail"
      />
      <g className="pw-machine">
        <rect x="207" y="44" width="46" height="26" rx="3" className="pw-joint" />
        <rect x="170" y="68" width="120" height="50" rx="9" className="pw-shell" />
        <path d="M184 82h92M190 96h80" />
        <path
          d={`M190 116v23H${left - 18}v104h18M270 116v23H${right + 18}v104h-18`}
          className="pw-finger-core"
        />
        <path
          d={`M190 116v23H${left - 18}v104h18M270 116v23H${right + 18}v104h-18`}
          className="pw-finger-shell"
        />
        <circle cx="190" cy="139" r="8" className="pw-joint" />
        <circle cx="270" cy="139" r="8" className="pw-joint" />
        <rect
          x={left - 5}
          y="190"
          width="5"
          height="54"
          rx="2"
          className={contact ? "pw-contact-pad" : "pw-joint"}
        />
        <rect
          x={right}
          y="190"
          width="5"
          height="54"
          rx="2"
          className={contact ? "pw-contact-pad" : "pw-joint"}
        />
      </g>
      {contact && (
        <g className="pw-highlight">
          <path d={`M${left - 57} 212h23m-6-5 6 5-6 5M${right + 57} 212h-23m6-5-6 5 6 5`} />
          {[0, 1, 2].map((index) => (
            <g key={index}>
              <circle cx={left} cy={198 + index * 15} r="2" className="pw-clay-fill" />
              <circle cx={right} cy={198 + index * 15} r="2" className="pw-clay-fill" />
            </g>
          ))}
        </g>
      )}
      <g className="pw-diagram-type">
        <text x="71" y="64" className="pw-handwritten">
          a softer touch.
        </text>
        <text x={center} y="303" textAnchor="middle" className="pw-angle-label">
          {opening} mm
        </text>
        <text x="329" y="87">
          SOFT OBJECT
        </text>
        <path d="m339 96-17 23" className="pw-construction" />
      </g>
    </svg>
  );
}

export function PhysicsWorkbench() {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(1);
  const [values, setValues] = useState<Record<StudyId, number>>({
    perception: -12,
    motion: 62,
    touch: 54,
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const study = studies[activeIndex];
  const value = values[study.id];
  const panelId = `${id}-panel`;
  const sliderId = `${id}-control`;

  return (
    <div className="physics-workbench">
      <div className="pw-tabs" role="tablist" aria-label="Explore perception, motion, and touch">
        {studies.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              id={`${id}-${item.id}`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={panelId}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                let next: number | undefined;
                if (event.key === "ArrowRight") next = (index + 1) % studies.length;
                if (event.key === "ArrowLeft") next = (index + studies.length - 1) % studies.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = studies.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                setActiveIndex(next);
                tabRefs.current[next]?.focus();
              }}
            >
              <span className="pw-tab-number">0{index + 1}</span>
              <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className="pw-panel"
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${id}-${study.id}`}
        tabIndex={0}
      >
        <div className="pw-visual">
          <div className="pw-study-label">
            <span>
              <i aria-hidden="true" /> {study.label} study / illustrative
            </span>
            <span>FIG. 0{activeIndex + 1}</span>
          </div>
          <div className="pw-drawing">
            {study.id === "perception" ? (
              <PerceptionDrawing angle={value} />
            ) : study.id === "motion" ? (
              <MotionDrawing angle={value} />
            ) : (
              <TouchDrawing opening={value} />
            )}
          </div>
          <div className="pw-control">
            <div className="pw-control-label">
              <label htmlFor={sliderId}>{study.control}</label>
              <output htmlFor={sliderId}>
                {value}
                {study.unit}
              </output>
            </div>
            <input
              id={sliderId}
              type="range"
              min={study.min}
              max={study.max}
              step="1"
              value={value}
              aria-valuetext={`${value} ${study.id === "touch" ? "millimeters, illustrative gripper opening" : "degrees"}`}
              onChange={(event) =>
                setValues((current) => ({ ...current, [study.id]: Number(event.target.value) }))
              }
            />
            <div className="pw-range-labels" aria-hidden="true">
              <span>{study.start}</span>
              <span>{study.end}</span>
            </div>
          </div>
        </div>
        <div className="pw-reading">
          <span className="eyebrow">A little experiment in {study.label.toLowerCase()}</span>
          <h3>{study.heading}</h3>
          <p className="pw-description">{study.description}</p>
          <div className="pw-formula">
            <span>{study.formula}</span>
            <p>{study.meaning}</p>
          </div>
          <div className="pw-instruction">
            <span>YOUR TURN</span>
            <p>{study.instruction}</p>
          </div>
          <p className="pw-model-note">A simplified study of the idea. Move at your own pace.</p>
        </div>
      </div>
    </div>
  );
}
