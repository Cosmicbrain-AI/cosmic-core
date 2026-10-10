import { useEffect, useRef, useState } from "react";
import { Layers3, Pause, Play, RotateCcw } from "lucide-react";
import { NotebookSketch } from "./explore/shared";
import type { AtmosphereScene } from "./robot3d/createAtmosphereScene";
import "./RobotAtmosphere.css";

const chapters = [
  ["top", "Welcome"],
  ["deployment", "Data centers"],
  ["evaluations", "Model evaluations"],
  ["platform", "Human operations"],
  ["datasets", "Deployment data"],
  ["hardware-partners", "Robot partners"],
] as const;

const compositions = [
  { x: 50, zoom: 1, elevation: 1.05 },
  { x: 74, zoom: 1, elevation: 1.07 },
  { x: 25, zoom: 1.13, elevation: 1.13 },
  { x: 74, zoom: 1.04, elevation: 1.07 },
  { x: 25, zoom: 1.12, elevation: 1.12 },
  { x: 74, zoom: 1.04, elevation: 1.07 },
] as const;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** The original robot follows the homepage's short scrolling chapters. */
export function RobotAtmosphere() {
  const layerRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AtmosphereScene | null>(null);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const blueprintRef = useRef(false);
  const scheduleRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    const sceneInterface = interfaceRef.current;
    if (!host || !layer || !sceneInterface) return;
    let disposed = false;
    let frame = 0;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = chapters.map(([id]) => document.getElementById(id));
    const footer = document.getElementById("home-footer");

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const footerTop = footer?.getBoundingClientRect().top;
      const end =
        footerTop === undefined
          ? document.documentElement.scrollHeight - height
          : window.scrollY + footerTop - height;
      const progress = clamp(window.scrollY / Math.max(1, end));
      // Finish fading before the footer enters, so the fixed scene never covers it.
      const opacity = footerTop === undefined ? 1 : clamp((footerTop - height) / 240);
      const hidden = opacity === 0;
      layer.style.setProperty("--scene-opacity", String(opacity));
      sceneInterface.style.setProperty("--scene-opacity", String(opacity));
      layer.dataset.hidden = String(hidden);
      sceneInterface.dataset.hidden = String(hidden);
      sceneInterface.inert = hidden;
      sceneRef.current?.setActive(!hidden && !document.hidden);

      let current = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top < height - 1) current = index;
      });
      layer.dataset.chapter = String(current);
      sceneInterface.dataset.chapter = String(current);
      layer.dataset.reduced = String(reducedRef.current);
      if (pausedRef.current) return;

      const mobile = window.innerWidth <= 760;
      if (reducedRef.current) {
        layer.style.setProperty("--scene-x", (mobile ? 50 : compositions[current].x) + "%");
        sceneRef.current?.setFraming({ zoom: mobile ? 1 : 1.05, elevation: 1.07 });
        return;
      }

      const destination = compositions[current];
      const previous = compositions[Math.max(0, current - 1)];
      const top = sections[current]?.getBoundingClientRect().top ?? 0;
      // Move before the incoming chapter's centered text reaches the reading area.
      const t = current === 0 ? 1 : clamp((height - top) / (height * 0.4));
      const blend = t * t * (3 - 2 * t);
      const x = mobile ? 50 : previous.x + (destination.x - previous.x) * blend;
      layer.style.setProperty("--scene-x", String(x) + "%");
      sceneRef.current?.setFraming({
        zoom: mobile ? 1 : previous.zoom + (destination.zoom - previous.zoom) * blend,
        elevation: mobile
          ? 1.05
          : previous.elevation + (destination.elevation - previous.elevation) * blend,
      });
      sceneRef.current?.setProgress(progress);
      layer.dataset.progress = progress.toFixed(3);
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };
    scheduleRef.current = schedule;
    const updatePreference = () => {
      reducedRef.current = preference.matches;
      setReduced(preference.matches);
      sceneRef.current?.setReducedMotion(preference.matches || pausedRef.current);
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (pausedRef.current || reducedRef.current || event.pointerType === "touch") return;
      sceneRef.current?.setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };
    const onFailure = () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
      if (!disposed) setStatus("fallback");
    };
    const start = async () => {
      try {
        const { createAtmosphereScene } = await import("./robot3d/createAtmosphereScene");
        if (disposed) return;
        const scene = await createAtmosphereScene(host);
        if (disposed) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        scene.setReducedMotion(reducedRef.current || pausedRef.current);
        scene.setMode(blueprintRef.current ? "blueprint" : "solid");
        update();
        setStatus("ready");
      } catch {
        onFailure();
      }
    };
    host.addEventListener("atmosphereerror", onFailure);
    preference.addEventListener("change", updatePreference);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    updatePreference();
    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host.removeEventListener("atmosphereerror", onFailure);
      preference.removeEventListener("change", updatePreference);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", schedule);
      sceneRef.current?.dispose();
      sceneRef.current = null;
      scheduleRef.current = () => {};
    };
  }, [attempt]);

  return (
    <>
      <div
        ref={layerRef}
        className="robot-atmosphere"
        data-status={status}
        data-progress="0.000"
        aria-hidden="true"
      >
        <div ref={hostRef} className="robot-atmosphere-host" />
        {status === "fallback" && (
          <div className="robot-atmosphere-fallback">
            <NotebookSketch variant="robot" />
          </div>
        )}
      </div>
      <div ref={interfaceRef} className="robot-atmosphere-interface">
        <div className="scene-controls" role="group" aria-label="Robot display controls">
          {status === "fallback" ? (
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setAttempt((value) => value + 1);
              }}
            >
              <RotateCcw size={13} aria-hidden="true" /> Retry 3D
            </button>
          ) : (
            <button
              type="button"
              disabled={status !== "ready" || reduced}
              aria-pressed={paused}
              onClick={() => {
                const next = !pausedRef.current;
                pausedRef.current = next;
                setPaused(next);
                sceneRef.current?.setReducedMotion(next || reducedRef.current);
                scheduleRef.current();
              }}
            >
              {paused ? (
                <Play size={13} aria-hidden="true" />
              ) : (
                <Pause size={13} aria-hidden="true" />
              )}
              {paused ? "Resume" : "Pause"}
            </button>
          )}
          <button
            type="button"
            disabled={status !== "ready"}
            aria-pressed={blueprint}
            onClick={() => {
              const next = !blueprintRef.current;
              blueprintRef.current = next;
              setBlueprint(next);
              sceneRef.current?.setMode(next ? "blueprint" : "solid");
            }}
          >
            <Layers3 size={13} aria-hidden="true" /> Blueprint
          </button>
        </div>
      </div>
    </>
  );
}
