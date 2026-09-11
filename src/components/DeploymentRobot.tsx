import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowDown,
  Box,
  Hand,
  Maximize2,
  Minus,
  MoveHorizontal,
  Plus,
  RotateCcw,
  RotateCw,
  ScanLine,
} from "lucide-react";
import type { RobotPose, RobotScene } from "./robot3d/createRobotScene";
import "./DeploymentRobot.css";

export function DeploymentRobot() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<RobotScene | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [pose, setPose] = useState<RobotPose | "custom">("carry");
  const [wireframe, setWireframe] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [armAngle, setArmAngle] = useState(90);
  const [revision, setRevision] = useState(0);
  const labelId = useId();

  useEffect(() => {
    let cancelled = false;
    let scene: RobotScene | null = null;
    const host = hostRef.current;
    if (!host) return;
    import("./robot3d/createRobotScene")
      .then(({ createRobotScene }) => {
        if (cancelled) return;
        try {
          scene = createRobotScene(
            host,
            () => {
              setPose("carry");
              setArmAngle(90);
            },
            () => {
              scene = null;
              sceneRef.current = null;
              setStatus("fallback");
            },
            () => setRotating(false),
          );
          sceneRef.current = scene;
          setStatus("ready");
        } catch {
          host.replaceChildren();
          setStatus("fallback");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });
    return () => {
      cancelled = true;
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [revision]);

  function choosePose(next: RobotPose) {
    setPose(next);
    setArmAngle(next === "rest" ? 0 : 90);
    sceneRef.current?.setPose(next);
  }
  function reset() {
    setPose("carry");
    setArmAngle(90);
    setWireframe(false);
    setRotating(false);
    sceneRef.current?.setAutoRotate(false);
    sceneRef.current?.setWireframe(false);
    sceneRef.current?.setPose("carry");
    sceneRef.current?.resetView();
  }
  const ready = status === "ready";

  return (
    <section className="deployment-robot" aria-label="Interactive 3D deployment robot">
      <div className="dr-heading">
        <span>
          <i /> The deployment robot
        </span>
        <span>Explore in 3D</span>
      </div>
      <div
        className="dr-stage"
        tabIndex={ready ? 0 : -1}
        role="group"
        aria-label="3D robot viewer. Drag to rotate, or use arrow keys. Plus and minus zoom. Home resets the view."
        aria-describedby={labelId}
        onKeyDown={(event) => {
          if (!ready) return;
          if (["ArrowLeft", "ArrowRight", "+", "=", "-", "Home"].includes(event.key))
            event.preventDefault();
          if (event.key === "ArrowLeft") sceneRef.current?.rotate(-1);
          if (event.key === "ArrowRight") sceneRef.current?.rotate(1);
          if (event.key === "+" || event.key === "=") sceneRef.current?.zoom(0.9);
          if (event.key === "-") sceneRef.current?.zoom(1.1);
          if (event.key === "Home") reset();
        }}
      >
        <div ref={hostRef} className="dr-canvas" data-testid="robot-canvas-host" />
        {status !== "ready" && (
          <div className="dr-fallback">
            <img
              src="/media/deployment/hallway-delivery.png"
              alt="CosmicBrain's black robot carrying a basket in a hallway"
            />
            <div className="dr-fallback-message" role="status">
              {status === "loading" ? (
                "Preparing your 3D view…"
              ) : (
                <>
                  Explore the robot in the photos below.
                  <button
                    type="button"
                    onClick={() => {
                      setPose("carry");
                      setArmAngle(90);
                      setWireframe(false);
                      setRotating(false);
                      setStatus("loading");
                      setRevision((value) => value + 1);
                    }}
                  >
                    Try 3D again
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {ready && (
          <>
            <span className="dr-note dr-note-top" aria-hidden="true">
              A real-world
              <br />
              <em>helping hand.</em>
            </span>
            <span className="dr-note dr-note-formula" aria-hidden="true">
              τ = r × F
            </span>
            <div className="dr-view-tools">
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => sceneRef.current?.zoom(0.88)}
              >
                <Plus size={15} />
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => sceneRef.current?.zoom(1.12)}
              >
                <Minus size={15} />
              </button>
              <button type="button" aria-label="Reset robot view" onClick={reset}>
                <Maximize2 size={14} />
              </button>
            </div>
            <span className="dr-drag-hint">
              <MoveHorizontal size={15} /> Drag to explore every angle
            </span>
          </>
        )}
      </div>
      <div className="dr-controls">
        <div className="dr-pose-controls" role="group" aria-label="Robot pose">
          <button
            type="button"
            disabled={!ready}
            aria-pressed={pose === "carry"}
            onClick={() => choosePose("carry")}
          >
            <Box size={14} /> Carry
          </button>
          <button
            type="button"
            disabled={!ready}
            aria-pressed={pose === "rest"}
            onClick={() => choosePose("rest")}
          >
            At rest
          </button>
          <button
            type="button"
            disabled={!ready}
            aria-pressed={pose === "wave"}
            onClick={() => choosePose("wave")}
          >
            <Hand size={14} /> Say hello
          </button>
        </div>
        <div className="dr-secondary-controls">
          <button
            type="button"
            disabled={!ready}
            aria-label="Rotate robot left"
            onClick={() => sceneRef.current?.rotate(-1)}
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            disabled={!ready}
            aria-pressed={rotating}
            onClick={() => {
              setRotating(!rotating);
              sceneRef.current?.setAutoRotate(!rotating);
            }}
          >
            <RotateCw size={14} /> {rotating ? "Pause turntable" : "Turntable"}
          </button>
          <button
            type="button"
            disabled={!ready}
            aria-pressed={wireframe}
            onClick={() => {
              setWireframe(!wireframe);
              sceneRef.current?.setWireframe(!wireframe);
            }}
          >
            <ScanLine size={14} /> Blueprint
          </button>
          <button
            type="button"
            disabled={!ready}
            aria-label="Rotate robot right"
            onClick={() => sceneRef.current?.rotate(1)}
          >
            <RotateCw size={15} />
          </button>
        </div>
        <div className="dr-arm-control">
          <label htmlFor={`${labelId}-arm`}>Move the arms</label>
          <input
            id={`${labelId}-arm`}
            type="range"
            min="0"
            max="135"
            step="1"
            value={armAngle}
            disabled={!ready}
            aria-valuetext={`${armAngle} degrees, illustrative elbow bend`}
            onChange={(event) => {
              const next = Number(event.target.value);
              setArmAngle(next);
              setPose("custom");
              sceneRef.current?.setArmAngle(next);
            }}
          />
          <output htmlFor={`${labelId}-arm`}>{armAngle}°</output>
        </div>
      </div>
      <div className="dr-caption">
        <p id={labelId}>
          3D reconstruction from deployment photos.
          <br />
          Proportions and movement are illustrative.
        </p>
        <a href="#deployment">
          See the photos <ArrowDown size={13} />
        </a>
      </div>
      <p className="sr-only" role="status">
        {status === "ready"
          ? `3D robot ready. ${pose === "wave" ? "The robot is waving." : pose === "custom" ? "Custom arm pose." : pose === "carry" ? "Carrying a basket." : "Arms at rest."} ${wireframe ? "Blueprint view enabled." : "Solid view."}`
          : status === "fallback"
            ? "3D view unavailable. Deployment photographs are available."
            : "Loading the 3D robot."}
      </p>
    </section>
  );
}
