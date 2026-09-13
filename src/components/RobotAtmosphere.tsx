import { useEffect, useRef, useState } from "react";
import { ArrowDown, Eye, Layers3, Pause, Play, RotateCcw, Plus, X } from "lucide-react";
import type { AtmosphereScene } from "./robot3d/createAtmosphereScene";
import "./RobotAtmosphere.css";

const chapters = [
  ["top", "Welcome"],
  ["motion", "The humanoid"],
  ["stack", "Our approach"],
  ["deployment", "In the world"],
  ["primitives", "The physics"],
  ["platform", "Human connection"],
  ["newsroom", "In the news"],
  ["faq", "Questions"],
  ["contact", "Say hello"],
] as const;
// The model trades places with the reading column at each chapter.
const compositions = [
  { x: 54, zoom: 1.23, elevation: 1.25 },
  { x: 74, zoom: 1, elevation: 1.07 },
  { x: 25, zoom: 1.13, elevation: 1.13 },
  { x: 74, zoom: 1.22, elevation: 1.13 },
  { x: 25, zoom: 1.15, elevation: 1.1 },
  { x: 74, zoom: 1.08, elevation: 1.07 },
  { x: 25, zoom: 1.12, elevation: 1.12 },
  { x: 74, zoom: 1.08, elevation: 1.07 },
  { x: 25, zoom: 1.2, elevation: 1.15 },
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** A persistent gallery scene, composed around each scrolling chapter. */
export function RobotAtmosphere() {
  const layerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AtmosphereScene | null>(null);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const scheduleRef = useRef<() => void>(() => {});
  const [exploring, setExploring] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    if (!host || !layer) return;
    let disposed = false;
    let frame = 0;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = chapters.map(([id]) => document.getElementById(id));
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const progress = clamp(
        window.scrollY / Math.max(1, document.documentElement.scrollHeight - height),
      );
      let current = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= height * 0.55) current = index;
      });
      setChapter(current);
      layer.dataset.chapter = String(current);
      layer.dataset.reduced = String(reducedRef.current);
      if (!pausedRef.current) {
        const mobile = window.innerWidth <= 760;
        const destination = compositions[current];
        const previous = compositions[Math.max(0, current - 1)];
        const top = sections[current]?.getBoundingClientRect().top ?? 0;
        const t = current === 0 ? 1 : clamp((height * 0.55 - top) / (height * 0.55));
        const blend = t * t * (3 - 2 * t);
        const x = reducedRef.current
          ? mobile
            ? 82
            : 74
          : mobile
            ? current === 0
              ? 55
              : 82
            : previous.x + (destination.x - previous.x) * blend;
        layer.style.setProperty("--scene-x", `${x}%`);
        sceneRef.current?.setFraming({
          zoom: reducedRef.current
            ? 1.05
            : mobile
              ? current === 0
                ? 1.1
                : 1.05
              : previous.zoom + (destination.zoom - previous.zoom) * blend,
          elevation: reducedRef.current
            ? 1.07
            : mobile
              ? 1.15
              : previous.elevation + (destination.elevation - previous.elevation) * blend,
        });
        if (!reducedRef.current) sceneRef.current?.setProgress(progress);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onVisibility = () => {
      sceneRef.current?.setActive(!document.hidden);
      if (!document.hidden) schedule();
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
        scene.setActive(!document.hidden);
        scene.setReducedMotion(reducedRef.current || pausedRef.current);
        update();
        setStatus("ready");
      } catch {
        if (!disposed) setStatus("fallback");
      }
    };
    host.addEventListener("atmosphereerror", onFailure);
    preference.addEventListener("change", updatePreference);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
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
      document.removeEventListener("visibilitychange", onVisibility);
      sceneRef.current?.dispose();
      sceneRef.current = null;
      scheduleRef.current = () => {};
    };
  }, [attempt]);

  const togglePaused = () => {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    sceneRef.current?.setReducedMotion(next || reducedRef.current);
    scheduleRef.current();
  };

  return (
    <>
      <div ref={layerRef} className="robot-atmosphere" aria-hidden="true">
        <div className="robot-atmosphere-paper" />
        <div className="robot-atmosphere-halo" />
        <div className="robot-atmosphere-grid" />
        <div ref={hostRef} className="robot-atmosphere-host" />
        {/* Keep the loading frame on the paper background; the photograph is
            only a recovery view when 3D initialization or rendering fails. */}
        {status === "fallback" && (
          <div className="robot-atmosphere-fallback">
            <img src="/media/deployment/hallway-delivery.png" alt="" />
          </div>
        )}
      </div>
      <div className="robot-scene-caption">
        <span>
          0{chapter + 1} / {chapters[chapter][1]}
        </span>
      </div>
      <nav className="scene-chapter-nav" aria-label="Explore this page">
        {chapters.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={chapter === index ? "location" : undefined}
          >
            <span className="scene-nav-dot" />
            <span className="scene-nav-label">{label}</span>
          </a>
        ))}
      </nav>
      <div className={`scene-controls${exploring ? " is-open" : ""}`}>
        <div className="scene-controls-bar">
          <button
            type="button"
            aria-expanded={exploring}
            aria-controls="robot-exploration"
            onClick={() => setExploring(!exploring)}
          >
            {exploring ? <X size={14} /> : <Plus size={14} />} Explore the robot
          </button>
          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            onClick={togglePaused}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
        <div
          id="robot-exploration"
          className="scene-toolbar"
          role="group"
          aria-label="Humanoid display controls"
          hidden={!exploring}
        >
          <span className="scene-controls-note">Reference-inspired 3D study</span>
          {status === "fallback" ? (
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setBlueprint(false);
                setAttempt((value) => value + 1);
              }}
            >
              <RotateCcw size={14} /> Retry 3D
            </button>
          ) : (
            <button
              type="button"
              aria-label="Look this way"
              disabled={status !== "ready" || paused || reduced}
              onClick={() => sceneRef.current?.playGesture("acknowledge")}
            >
              <Eye size={14} />
              <span>Look this way</span>
            </button>
          )}
          <button
            type="button"
            disabled={status !== "ready"}
            aria-pressed={blueprint}
            onClick={() => {
              setBlueprint(!blueprint);
              sceneRef.current?.setMode(blueprint ? "solid" : "blueprint");
            }}
          >
            <Layers3 size={14} />
            <span>Blueprint</span>
          </button>
          <span className="scene-scroll-hint">
            {reduced ? (
              "Still view"
            ) : (
              <>
                <ArrowDown size={12} /> Scroll to rotate
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
