import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Layers3, Pause, Play, RotateCcw } from "lucide-react";
import type { AtmosphereScene } from "./robot3d/createAtmosphereScene";
import "./DeploymentHeroRobot.css";

/** The existing robot, framed inside the homepage hero. */
export function DeploymentHeroRobot() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AtmosphereScene | null>(null);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const blueprintRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let started = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedRef.current = preference.matches;
      setReduced(preference.matches);
      sceneRef.current?.setReducedMotion(preference.matches || pausedRef.current);
    };
    const onFailure = () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
      if (!disposed) setStatus("fallback");
    };
    const start = async () => {
      if (started || disposed) return;
      started = true;
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
        scene.setFraming({ zoom: 1.04, elevation: 1.05 });
        scene.setMode(blueprintRef.current ? "blueprint" : "solid");
        setStatus("ready");
      } catch {
        onFailure();
      }
    };

    host.addEventListener("atmosphereerror", onFailure);
    preference.addEventListener("change", updatePreference);
    updatePreference();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              observer?.disconnect();
              void start();
            },
            { rootMargin: "200px" },
          );
    if (observer) observer.observe(host);
    else void start();

    return () => {
      disposed = true;
      observer?.disconnect();
      host.removeEventListener("atmosphereerror", onFailure);
      preference.removeEventListener("change", updatePreference);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [attempt]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pausedRef.current || reducedRef.current || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    sceneRef.current?.setPointer(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      1 - ((event.clientY - bounds.top) / bounds.height) * 2,
    );
  };

  return (
    <figure className="deployment-hero-robot" data-status={status}>
      <div
        className="deployment-hero-robot-stage"
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          if (!pausedRef.current && !reducedRef.current) sceneRef.current?.setPointer(0, 0);
        }}
      >
        <div
          ref={hostRef}
          className="deployment-hero-robot-host"
          role="img"
          aria-label="Three-dimensional CosmicBrain robot carrying a basket"
        />
        {status !== "ready" && (
          <div className="deployment-hero-robot-fallback">
            <img
              src="/media/deployment/hallway-delivery.png"
              alt="CosmicBrain robot reference"
              loading="lazy"
              width="1470"
              height="1070"
            />
          </div>
        )}
      </div>
      <figcaption className="deployment-hero-robot-caption">
        <span aria-live="polite">
          {status === "loading" ? "Loading 3D robot…" : reduced ? "Still view" : "Physical AI"}
        </span>
        <div className="deployment-hero-robot-controls" role="group" aria-label="3D robot controls">
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
              aria-label={paused ? "Resume robot motion" : "Pause robot motion"}
              onClick={() => {
                const next = !pausedRef.current;
                pausedRef.current = next;
                setPaused(next);
                sceneRef.current?.setReducedMotion(next || reducedRef.current);
              }}
            >
              {paused ? (
                <Play size={13} aria-hidden="true" />
              ) : (
                <Pause size={13} aria-hidden="true" />
              )}
              <span>{paused ? "Resume" : "Pause"}</span>
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
      </figcaption>
    </figure>
  );
}
