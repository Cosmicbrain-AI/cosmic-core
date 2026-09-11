import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Hand, ScanLine } from "lucide-react";
import "./RobotPlayground.css";

type RobotPlaygroundProps = {
  className?: string;
};

/** A small, deliberately local playground: no camera, telemetry, or robot connection. */
export function RobotPlayground({ className = "" }: RobotPlaygroundProps) {
  const id = useId().replace(/:/g, "");
  const [blueprint, setBlueprint] = useState(false);
  const [armAngle, setArmAngle] = useState(24);
  const [waving, setWaving] = useState(false);
  const restingAngle = useRef(24);
  const waveTimer = useRef<number | null>(null);
  const angleId = `${id}-arm-angle`;
  const gradient = (name: string) => `url(#${id}-${name})`;

  useEffect(() => {
    if (!waving) return;
    waveTimer.current = window.setTimeout(() => {
      setWaving(false);
      setArmAngle(restingAngle.current);
      waveTimer.current = null;
    }, 3200);
    return () => {
      if (waveTimer.current !== null) window.clearTimeout(waveTimer.current);
      waveTimer.current = null;
    };
  }, [waving]);

  function sayHello() {
    if (waving) return;
    restingAngle.current = armAngle;
    setArmAngle(124);
    setWaving(true);
  }

  return (
    <div
      className={`cb-playground ${blueprint ? "is-blueprint" : ""} ${waving ? "is-waving" : ""} ${className}`}
    >
      <div className="cb-playground-heading">
        <span>
          <i aria-hidden="true" /> INTERACTIVE LAB <span className="cb-playground-dot">·</span>{" "}
          CONCEPT ROBOT
        </span>
        <span className="cb-playground-edition">FIG. 01</span>
      </div>

      <div
        className="cb-playground-stage"
        role="img"
        aria-label={`A friendly cream and terracotta robot on an engineering drawing. Its right arm is raised ${armAngle} degrees.${blueprint ? " Blueprint mode shows its joints and construction geometry." : ""}`}
      >
        <svg className="cb-robot-drawing" viewBox="0 0 560 500" fill="none" aria-hidden="true">
          <defs>
            <linearGradient
              id={`${id}-shell`}
              x1="235"
              y1="131"
              x2="361"
              y2="231"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fffef6" />
              <stop offset=".53" stopColor="#f1eadb" />
              <stop offset="1" stopColor="#c4c1b2" />
            </linearGradient>
            <linearGradient
              id={`${id}-body`}
              x1="244"
              y1="228"
              x2="357"
              y2="334"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fffdf3" />
              <stop offset=".5" stopColor="#e8e2d4" />
              <stop offset="1" stopColor="#bdbfaf" />
            </linearGradient>
            <linearGradient id={`${id}-limb`} x1="0" x2="1">
              <stop stopColor="#c3c4b4" />
              <stop offset=".3" stopColor="#fffaf0" />
              <stop offset=".66" stopColor="#e5dece" />
              <stop offset="1" stopColor="#b0b3a4" />
            </linearGradient>
            <linearGradient
              id={`${id}-clay`}
              x1="263"
              y1="246"
              x2="330"
              y2="298"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#d98763" />
              <stop offset=".42" stopColor="#bd6144" />
              <stop offset="1" stopColor="#98442f" />
            </linearGradient>
            <linearGradient
              id={`${id}-glass`}
              x1="246"
              y1="141"
              x2="345"
              y2="198"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#474e45" />
              <stop offset=".55" stopColor="#262e2a" />
              <stop offset="1" stopColor="#161f1b" />
            </linearGradient>
            <linearGradient id={`${id}-joint`} x1="0" x2="1">
              <stop stopColor="#373e35" />
              <stop offset=".5" stopColor="#727967" />
              <stop offset="1" stopColor="#30392f" />
            </linearGradient>
            <radialGradient id={`${id}-ground`}>
              <stop stopColor="#555a47" stopOpacity=".2" />
              <stop offset="1" stopColor="#555a47" stopOpacity="0" />
            </radialGradient>
            <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" stroke="#687b62" strokeOpacity=".09" strokeWidth=".6" />
            </pattern>
            <filter id={`${id}-eye-glow`} x="-100%" y="-50%" width="300%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <g className="cb-robot-coordinate-system" stroke="#78836b" strokeWidth=".7">
            <circle cx="280" cy="269" r="178" strokeOpacity=".2" />
            <circle cx="280" cy="269" r="139" strokeOpacity=".12" strokeDasharray="3 5" />
            <path d="M69 269H498M280 64V467" strokeOpacity=".24" strokeDasharray="3 6" />
            <path d="M96 269H108M452 269H464M280 85V97M280 441V453" strokeOpacity=".6" />
            <path d="M93 179l9 5M454 351l9 5M95 360l9-5M455 184l9-5" strokeOpacity=".3" />
            <path d="m492 266 6 3-6 3M277 70l3-6 3 6" strokeOpacity=".5" />
          </g>
          <rect
            className="cb-robot-blueprint-grid"
            x="25"
            y="64"
            width="510"
            height="401"
            fill={gradient("grid")}
          />

          <g className="cb-robot-notes" fill="#717868">
            <text x="39" y="118" className="cb-robot-handwriting" transform="rotate(-8 39 118)">
              a little curiosity.
            </text>
            <path d="M115 130q28 27 88 32m-9-6 9 6-10 1" stroke="#8a907e" strokeWidth=".9" />
            <text x="393" y="88" className="cb-robot-equation" transform="rotate(6 393 88)">
              τ = r × F
            </text>
            <text x="484" y="257" className="cb-robot-tiny-label">
              x
            </text>
            <text x="289" y="72" className="cb-robot-tiny-label">
              y
            </text>
            <text x="53" y="363" className="cb-robot-equation" transform="rotate(-6 53 363)">
              F = ma
            </text>
            <text x="416" y="392" className="cb-robot-small-note" transform="rotate(4 416 392)">
              made to
            </text>
            <text x="419" y="409" className="cb-robot-small-note" transform="rotate(4 419 409)">
              move you.
            </text>
            <path d="M414 417q-14 10-36 3m8-3-8 3 6 5" stroke="#8a907e" strokeWidth=".9" />
          </g>

          <ellipse cx="294" cy="459" rx="109" ry="18" fill={gradient("ground")} />

          <g className="cb-robot-shell" stroke="#555e4d" strokeWidth="1.2" strokeLinejoin="round">
            {/* Legs have separate mechanical cores, kneecaps, and soft outer shells. */}
            <g>
              <path d="M262 350l-6 46 29 3 7-46z" fill={gradient("joint")} />
              <path d="m308 352 3 47 27-2-1-47z" fill={gradient("joint")} />
              <path d="M260 355q15-8 30 1l-5 30q-14 7-29-1z" fill={gradient("limb")} />
              <path d="M308 354q14-7 29-1l3 32q-13 8-28 2z" fill={gradient("limb")} />
              <ellipse cx="269" cy="397" rx="16" ry="14" fill={gradient("joint")} />
              <ellipse cx="326" cy="398" rx="16" ry="14" fill={gradient("joint")} />
              <ellipse cx="266" cy="397" rx="10" ry="10" fill="#e7e0cd" />
              <circle cx="266" cy="397" r="4" fill="#8c9580" />
              <ellipse cx="329" cy="398" rx="10" ry="10" fill="#e7e0cd" />
              <circle cx="329" cy="398" r="4" fill="#8c9580" />
              <path d="M254 410q13-5 27 1l-4 31-24-1z" fill={gradient("limb")} />
              <path d="M314 412q12-6 26-2l6 30-24 4z" fill={gradient("limb")} />
              <path
                d="m259 417 15 1m-15 5 14 1M320 418l13-1m-12 7 13-1"
                stroke="#a4a794"
                strokeWidth=".7"
              />
              <path d="M254 436q13-5 24 2l1 14q-14 9-41 5-7-1-5-8l12-9z" fill={gradient("body")} />
              <path d="M322 438q11-7 23-3l16 10q7 6 0 10-21 9-39-2z" fill={gradient("body")} />
              <path d="M235 452q22 5 43-4M323 449q18 6 37 0" stroke="#69745f" strokeWidth="2" />
              <path
                d="m242 443 12 1m91-3-10 2"
                stroke="#fffaf0"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>

            {/* A resting left arm, with a visible elbow pivot and three little fingers. */}
            <g>
              <circle cx="238" cy="247" r="18" fill={gradient("joint")} />
              <path d="M222 247q13-4 21 7l-14 37q-11 5-22-3z" fill={gradient("limb")} />
              <circle cx="218" cy="296" r="13" fill={gradient("joint")} />
              <circle cx="214" cy="295" r="7" fill="#b7beaa" />
              <path d="M205 307q12-7 25 0l1 32q-8 7-21 2z" fill={gradient("limb")} />
              <path d="m208 313 3 20" stroke="#fffdf4" strokeWidth="2.3" />
              <path d="M211 342h18v10h-18z" fill={gradient("joint")} />
              <path
                d="M211 349q-7 3-6 12l4 8 5-1v-8l3 16q2 3 5 0l1-15 3 13q4 2 5-2l-1-12 3 7q4 1 4-3l-5-11q-4-5-10-4z"
                fill={gradient("shell")}
              />
            </g>

            {/* The right shoulder is the actual pivot controlled by the slider. */}
            <g className="cb-robot-moving-arm" transform={`rotate(${-armAngle} 356 247)`}>
              <circle cx="356" cy="247" r="18" fill={gradient("joint")} />
              <path d="M356 257q7-10 18-7l17 34q-8 11-22 8z" fill={gradient("limb")} />
              <path d="m370 261 11 21" stroke="#fffdf4" strokeWidth="2.3" />
              <circle cx="382" cy="300" r="13" fill={gradient("joint")} />
              <circle cx="386" cy="298" r="7" fill="#b7beaa" />
              <path d="M372 313q9-9 23-5l12 29q-6 11-20 10z" fill={gradient("limb")} />
              <path d="m391 315 9 21" stroke="#fffdf4" strokeWidth="2.3" />
              <g className="cb-robot-wave-hand">
                <path d="m390 345 16-7 4 10-16 7z" fill={gradient("joint")} />
                <path
                  d="M395 352q-8 5-5 11l5 6q5 1 5-4l-2-5 9 15q3 3 6 0l-6-14 10 11q5 2 6-2l-10-13 11 7q5 0 4-4l-14-11q-8-5-13 1z"
                  fill={gradient("shell")}
                />
              </g>
              <g
                className="cb-robot-blueprint-lines"
                stroke="#b94e32"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              >
                <path d="m356 247 26 53 16 45" />
                <circle cx="356" cy="247" r="22" />
                <circle cx="382" cy="300" r="17" />
              </g>
            </g>

            {/* Ribbed neck and waist make the friendly shape feel engineered. */}
            <path d="M281 203h29v34h-29z" fill={gradient("joint")} />
            <path d="M283 214h25m-25 7h25m-25 7h25" stroke="#a3aa92" />
            <path d="M272 316h50v34h-50z" fill={gradient("joint")} />
            <path d="M274 326h46m-46 7h46m-46 7h46" stroke="#9ca58c" strokeWidth="2" />
            <path d="M262 342q36-8 69 0l7 17q-38 14-78 0z" fill={gradient("body")} />
            <path d="M284 346h25v11h-25z" fill="#758369" strokeWidth=".7" />
            <circle cx="267" cy="351" r="2" fill="#758369" />
            <circle cx="331" cy="351" r="2" fill="#758369" />
            <path
              d="M258 229q36-9 77 0 15 6 15 24l-7 56q-4 16-22 18h-48q-19-3-21-19l-7-55q-2-17 13-24z"
              fill={gradient("body")}
            />
            <path
              d="M256 248q-1-10 11-12 29-7 59-1"
              stroke="#fffdf4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M267 248q31-6 60 0 9 2 8 13l-4 31q-2 8-12 9h-44q-10-2-11-10l-5-31q-1-10 8-12z"
              fill={gradient("clay")}
              stroke="#934c36"
            />
            <path d="M269 252q30-6 58 0" stroke="#eaa280" strokeWidth="1.2" />
            <text x="275" y="274" fill="#fff3dc" stroke="none" className="cb-robot-chest-label">
              CB–01
            </text>
            <path
              d="M275 284h20m-20 5h11"
              stroke="#eed9bb"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="318" cy="284" r="4.2" fill="#d5e2a9" stroke="#efe0be" strokeWidth=".8" />
            <path d="M283 311h28" stroke="#74816b" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="260" cy="247" r="2" fill="#87917a" />
            <circle cx="336" cy="247" r="2" fill="#87917a" />
            <circle cx="264" cy="312" r="2" fill="#87917a" />
            <circle cx="331" cy="312" r="2" fill="#87917a" />

            <g className="cb-robot-head" transform="rotate(-5 294 166)">
              <path d="m303 119 6-19" stroke="#666f5c" strokeWidth="3" />
              <circle cx="310" cy="95" r="6" fill="#bf6546" stroke="#91533e" />
              <path d="M231 150q-7-1-9 9v22q3 9 11 8l6-3v-31z" fill={gradient("joint")} />
              <path d="M355 150q7-1 9 9v22q-3 9-11 8l-6-3v-31z" fill={gradient("joint")} />
              <path
                d="M238 128q49-24 106-3 16 8 17 28v29q-2 25-25 31-41 12-81-2-23-6-25-30v-29q0-16 8-24z"
                fill={gradient("shell")}
              />
              <path
                d="M245 132q36-20 78-12"
                stroke="#fffdf5"
                strokeWidth="3.3"
                strokeLinecap="round"
              />
              <path
                d="M248 144q42-15 89-2 11 3 12 18v15q-1 16-17 20-35 10-72 0-16-4-17-20v-16q0-11 5-15z"
                fill={gradient("glass")}
                stroke="#444c40"
                strokeWidth="2.5"
              />
              <path
                d="M254 150q40-13 80-2"
                stroke="#677367"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <g fill="#cbebc1" filter={gradient("eye-glow")} opacity=".25">
                <rect x="264" y="157" width="13" height="20" rx="6.5" />
                <rect x="315" y="157" width="13" height="20" rx="6.5" />
              </g>
              <g className="cb-robot-eyes" fill="#d2edc7" stroke="none">
                <rect x="265" y="157" width="11" height="20" rx="5.5" />
                <rect x="315" y="157" width="11" height="20" rx="5.5" />
              </g>
              <path
                className="cb-robot-happy-eyes"
                d="M263 168q7-12 15 0m35 0q7-12 15 0"
                stroke="#d2edc7"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M288 183q7 5 15-1"
                stroke="#bdcfae"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M270 205h13m4 0h3"
                stroke="#929b85"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="339" cy="204" r="2" fill="#88937d" stroke="none" />
              <path
                d="M234 161v17m123-17v17"
                stroke="#ad7054"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>

          <g className="cb-robot-blueprint-lines" stroke="#b94e32" strokeWidth=".9">
            <path d="M294 111v250M229 166h132M236 247h123M254 397h88" strokeDasharray="4 4" />
            <ellipse cx="296" cy="270" rx="66" ry="49" strokeDasharray="4 4" />
            <circle cx="294" cy="220" r="6" />
            <circle cx="295" cy="340" r="7" />
            <path d="M235 166H160l-17-19M356 247h68l17 20M328 397h52l15 26M246 228h-59v99h56m-63-99h13m-13 99h13" />
            <g fill="#98563d" stroke="none" className="cb-robot-blueprint-label">
              <text x="92" y="141">
                01 / PERCEPTION
              </text>
              <text x="414" y="281">
                02 / SHOULDER
              </text>
              <text x="405" y="431">
                03 / ACTUATION
              </text>
              <text x="171" y="295" transform="rotate(-90 171 295)">
                TORSO ASSEMBLY
              </text>
            </g>
          </g>

          <g className="cb-robot-speech">
            <path
              d="M350 77q0-10 11-10h125q11 0 11 11v30q0 11-11 11H367l-17 12 4-15q-4-3-4-9z"
              fill="#fcfaf1"
              stroke="#a3aa94"
              strokeWidth="1"
            />
            <text x="366" y="90" fill="#454f3b" className="cb-robot-speech-title">
              Oh, hello there.
            </text>
            <text x="366" y="106" fill="#727b66" className="cb-robot-speech-small">
              Let's build something good.
            </text>
          </g>

          <path d="M188 472h186" stroke="#7b856e" strokeOpacity=".23" strokeWidth=".8" />
          <text
            x="280"
            y="489"
            textAnchor="middle"
            fill="#7b806f"
            className="cb-robot-bottom-label"
          >
            A SMALL ROBOT. A WORLD OF POSSIBILITY.
          </text>
        </svg>
      </div>

      <div className="cb-playground-controls">
        <div className="cb-playground-buttons">
          <button
            type="button"
            className="cb-playground-hello"
            onClick={sayHello}
            aria-disabled={waving}
          >
            <Hand size={15} strokeWidth={1.6} aria-hidden="true" />
            {waving ? "Hello, human!" : "Say hello"}
          </button>
          <button
            type="button"
            className="cb-playground-blueprint"
            onClick={() => setBlueprint((value) => !value)}
            aria-pressed={blueprint}
          >
            <ScanLine size={15} strokeWidth={1.6} aria-hidden="true" />
            See the blueprint
            <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
        <div className="cb-playground-angle">
          <label htmlFor={angleId}>
            YOUR TURN <span>Move an arm</span>
          </label>
          <input
            id={angleId}
            type="range"
            min="0"
            max="135"
            step="1"
            value={armAngle}
            aria-valuetext={`${armAngle} degrees`}
            onChange={(event) => {
              if (waveTimer.current !== null) window.clearTimeout(waveTimer.current);
              waveTimer.current = null;
              setWaving(false);
              setArmAngle(Number(event.target.value));
            }}
          />
          <output htmlFor={angleId}>{armAngle}°</output>
        </div>
      </div>
      <p className="cb-playground-sr-only" role="status" aria-live="polite">
        {waving ? "Our robot waves hello! Let's build something good. " : ""}
        {blueprint
          ? "Blueprint mode enabled. Robot joints and construction lines are visible."
          : "Robot illustration mode."}
      </p>
    </div>
  );
}
