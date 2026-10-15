import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Layers3, Pause, Play, RotateCcw } from "lucide-react";
import type { DataCenterScene } from "./robot3d/createDataCenterScene";

const stages = [
  { id: "facility", label: "Overview", action: "Data center / Architectural study" },
  { id: "compute", label: "Compute", action: "01 / Rack inspection & GPU infrastructure" },
  { id: "cooling", label: "Cooling", action: "02 / Cooling systems & connection checks" },
  { id: "power", label: "Power", action: "03 / Electrical cabinet inspection" },
  { id: "logistics", label: "Logistics", action: "04 / Equipment transport & staging" },
] as const;
const clamp = (n: number) => Math.max(0, Math.min(1, n));

/** All narrative remains in HTML. This lazy scene follows native page scrolling. */
export function DataCenterExperience() {
  const layerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<DataCenterScene | null>(null);
  const pausedRef = useRef(false);
  const blueprintRef = useRef(false);
  const reducedRef = useRef(false);
  const scheduleRef = useRef<() => void>(() => {});
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    if (!host || !layer) return;
    let disposed = false;
    let frame = 0;
    let active = true;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sections = stages.map(({ id }) => document.getElementById(id));
    const update = () => {
      frame = 0;
      const tops = sections.map(
        (section) => (section?.getBoundingClientRect().top ?? 0) + window.scrollY,
      );
      const stops = tops.map((top) => Math.max(0, top));
      const scroll = window.scrollY;
      let segment = 0;
      for (let i = 1; i < stops.length; i++) if (scroll >= stops[i]) segment = i;
      const t =
        segment === 4
          ? 0
          : clamp((scroll - stops[segment]) / Math.max(1, stops[segment + 1] - stops[segment]));
      const progress = clamp((segment + t) / 4);
      const current = Math.min(4, Math.round(progress * 4));
      const reading = clamp((progress * 4 - 0.2) / 0.55);
      layer.style.setProperty("--scene-opacity", String(1 - reading * 0.82));
      layer.dataset.layout = current === 0 ? "overview" : "detail";
      layer.dataset.reduced = String(reducedRef.current);
      sceneRef.current?.setActive(active && !document.hidden);
      if (!pausedRef.current) {
        setStage(current);
        layer.dataset.stage = String(current);
        layer.dataset.progress = progress.toFixed(3);
        sceneRef.current?.setProgress(reducedRef.current ? current / 4 : progress);
      }
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };
    scheduleRef.current = schedule;
    const updatePreference = () => {
      reducedRef.current = preference.matches;
      setReduced(preference.matches);
      sceneRef.current?.setReducedMotion(preference.matches);
      schedule();
    };
    const onFailure = () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
      if (!disposed) setStatus("fallback");
    };
    const start = async () => {
      try {
        const { createDataCenterScene } = await import("./robot3d/createDataCenterScene");
        if (disposed) return;
        const scene = await createDataCenterScene(host, onFailure);
        if (disposed) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        scene.setReducedMotion(reducedRef.current);
        scene.setPaused(pausedRef.current);
        scene.setBlueprint(blueprintRef.current);
        update();
        setStatus("ready");
      } catch {
        onFailure();
      }
    };
    const intersection = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      schedule();
    });
    intersection.observe(layer);
    const resize = new ResizeObserver(schedule);
    sections.forEach((section) => section && resize.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", updatePreference);
    updatePreference();
    void start();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", updatePreference);
      sceneRef.current?.dispose();
      sceneRef.current = null;
      scheduleRef.current = () => {};
    };
  }, [attempt]);

  function selectStage(index: number) {
    if (pausedRef.current) {
      pausedRef.current = false;
      setPaused(false);
      sceneRef.current?.setPaused(false);
    }
    const section = document.getElementById(stages[index].id);
    if (!section) return;
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      // Scene navigation jumps to its chapter; the 3D engine handles the camera transition.
      behavior: "instant",
    });
  }

  return (
    <div
      ref={layerRef}
      className="dc-scene-layer"
      data-stage="0"
      data-layout="overview"
      data-status={status}
    >
      <div className="dc-scene-frame">
        <div ref={hostRef} className="dc-canvas-host" aria-hidden="true" />
        {status !== "ready" && (
          <div className="dc-scene-fallback">
            <img
              src="/media/data-center-blueprint.svg"
              alt="Isometric data center blueprint with compute racks, cooling pipes, electrical cabinets, and a humanoid at work"
            />
            <p role="status">
              {status === "loading"
                ? "Preparing the interactive facility…"
                : "Data center / Architectural study"}
            </p>
            {status === "fallback" && (
              <button
                type="button"
                onClick={() => {
                  setStatus("loading");
                  setAttempt((n) => n + 1);
                }}
              >
                Retry interactive view <RotateCcw size={13} />
              </button>
            )}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {stages[stage].action}
      </p>
      <div className="dc-scene-footer">
        <nav className="dc-stage-nav" aria-label="Explore the data center">
          {stages.map(({ label }, index) => (
            <button
              type="button"
              key={label}
              aria-pressed={stage === index}
              onClick={() => selectStage(index)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="dc-scene-tools" role="group" aria-label="3D view controls">
          <button
            type="button"
            aria-label="Rotate facility left"
            disabled={status !== "ready"}
            onClick={() => sceneRef.current?.rotate(-0.15)}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Reset facility view"
            disabled={status !== "ready"}
            onClick={() => sceneRef.current?.resetView()}
          >
            <RotateCcw size={14} />
          </button>
          <button
            type="button"
            aria-label="Rotate facility right"
            disabled={status !== "ready"}
            onClick={() => sceneRef.current?.rotate(0.15)}
          >
            <ArrowRight size={14} />
          </button>
          <span className="dc-tool-divider" />
          <button
            type="button"
            disabled={status !== "ready"}
            aria-pressed={blueprint}
            onClick={() => {
              const next = !blueprintRef.current;
              blueprintRef.current = next;
              setBlueprint(next);
              sceneRef.current?.setBlueprint(next);
            }}
          >
            <Layers3 size={14} />
            <span>Blueprint</span>
          </button>
          <button
            type="button"
            disabled={status !== "ready" || reduced}
            aria-pressed={paused}
            onClick={() => {
              const next = !pausedRef.current;
              pausedRef.current = next;
              setPaused(next);
              sceneRef.current?.setPaused(next);
              scheduleRef.current();
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            <span>{paused ? "Resume" : "Pause"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
