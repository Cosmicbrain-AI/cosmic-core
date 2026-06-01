import { useEffect, useRef, useState } from "react";
import humanoid from "@/assets/humanoid-blueprint.jpg";

export function HumanoidPanel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const [torque, setTorque] = useState(12.4);
  const [t, setT] = useState("00:14:22");

  // Mouse parallax / tilt
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, rx = 0, ry = 0;
    let mx = 0.5, my = 0.5;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => { mx = 0.5; my = 0.5; };

    const tick = () => {
      // ease
      tx += ((mx - 0.5) * 16 - tx) * 0.08;
      ty += ((my - 0.5) * 16 - ty) * 0.08;
      rx += ((my - 0.5) * -8 - rx) * 0.08;
      ry += ((mx - 0.5) * 10 - ry) * 0.08;

      if (imgRef.current) {
        imgRef.current.style.transform =
          `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0) scale(1.08)`;
      }
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(circle at ${mx * 100}% ${my * 100}%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 55%)`;
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform =
          `translate3d(${mx * 100}%, ${my * 100}%, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll-driven scan line + subtle Y parallax on image
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (r.top + r.height / 2) / (vh + r.height / 2) * 0 + (vh - r.top) / (vh + r.height)));
      if (scanRef.current) {
        scanRef.current.style.transform = `translateY(${p * 100}%)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live telemetry tick
  useEffect(() => {
    const id = setInterval(() => {
      setTorque(+(10 + Math.random() * 6).toFixed(1));
      const now = new Date();
      setT(
        [now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="glass relative aspect-[4/5] overflow-hidden rounded-2xl [transform-style:preserve-3d]"
      >
        <img
          ref={imgRef}
          src={humanoid}
          alt="CosmicBrain humanoid telemetry view"
          width={1280}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover will-change-transform transition-[transform] duration-100"
          style={{ transform: "scale(1.08)" }}
        />

        {/* mouse-tracking glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-70"
        />

        {/* scroll-driven scan line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            ref={scanRef}
            className="absolute left-0 right-0 -top-2 h-16"
            style={{
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, var(--signal) 55%, transparent), transparent)",
              filter: "blur(2px)",
            }}
          />
        </div>

        {/* grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-strong) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 80%)",
          }}
        />

        {/* mouse reticle */}
        <div
          ref={reticleRef}
          className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-full border border-primary/60"
          style={{ boxShadow: "0 0 24px color-mix(in oklab, var(--primary) 45%, transparent)" }}
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/40" />
          <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/40" />
        </div>

        {/* HUD overlays */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 backdrop-blur">
          <span className="pulse-dot" />
          <span className="font-mono text-[10px] tracking-widest text-foreground/80">UNIT CB-002 · LIVE</span>
        </div>
        <div className="absolute right-4 top-4 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] tracking-widest text-foreground/70 backdrop-blur">
          ISO 30°
        </div>

        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 font-mono text-[10px]">
          <div className="rounded-md bg-background/70 p-2 backdrop-blur">
            <div className="text-muted-foreground">Δ-time</div>
            <div className="mt-1 text-foreground tabular-nums">{t}</div>
          </div>
          <div className="rounded-md bg-background/70 p-2 backdrop-blur">
            <div className="text-muted-foreground">task</div>
            <div className="mt-1 text-foreground">PICK/PLACE</div>
          </div>
          <div className="rounded-md bg-background/70 p-2 backdrop-blur">
            <div className="text-muted-foreground">torque</div>
            <div className="mt-1 text-foreground tabular-nums">{torque} Nm</div>
          </div>
        </div>
      </div>

      <div className="absolute -left-3 top-6 hidden rotate-[-90deg] origin-top-left font-mono text-[10px] tracking-[0.4em] text-muted-foreground md:block">
        FIG.01 — HUMANOID OPERATIONS
      </div>
    </div>
  );
}
