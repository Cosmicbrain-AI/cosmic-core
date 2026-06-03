import { useEffect, useMemo, useRef, useState } from "react";
import humanoid from "@/assets/humanoid-blueprint.png";

const COLS = 8;
const ROWS = 10;

export function HumanoidPanel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
  const reticleRef = useRef<HTMLDivElement>(null);
  const [torque, setTorque] = useState(12.4);
  const [t, setT] = useState("00:14:22");

  const tiles = useMemo(() => {
    const arr: { r: number; c: number }[] = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) arr.push({ r, c });
    return arr;
  }, []);

  // Mouse "come apart" effect
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let mx = -1, my = -1; // -1 = no hover
    let active = 0; // 0..1 ease in/out

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };
    const onEnter = () => {};
    const onLeave = () => { mx = -1; my = -1; };

    const tick = () => {
      const target = mx < 0 ? 0 : 1;
      active += (target - active) * 0.08;

      for (let i = 0; i < tiles.length; i++) {
        const node = tilesRef.current[i];
        if (!node) continue;
        const { r, c } = tiles[i];
        const tx = (c + 0.5) / COLS;
        const ty = (r + 0.5) / ROWS;
        const dx = tx - (mx < 0 ? 0.5 : mx);
        const dy = ty - (my < 0 ? 0.5 : my);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const falloff = Math.max(0, 1 - dist * 1.8);
        const strength = active * falloff;
        const push = 90 * strength; // px
        const ang = Math.atan2(dy, dx);
        const ox = Math.cos(ang) * push + (Math.sin((r + c) * 1.3) * 6 * strength);
        const oy = Math.sin(ang) * push + (Math.cos((r - c) * 1.1) * 6 * strength);
        const rot = (dx * 40 + dy * -20) * strength;
        const op = 1 - strength * 0.35;
        node.style.transform = `translate3d(${ox}px, ${oy}px, 0) rotate(${rot}deg)`;
        node.style.opacity = String(op);
      }

      if (reticleRef.current) {
        const rx = mx < 0 ? 50 : mx * 100;
        const ry = my < 0 ? 50 : my * 100;
        reticleRef.current.style.opacity = String(active);
        reticleRef.current.style.left = `${rx}%`;
        reticleRef.current.style.top = `${ry}%`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [tiles]);

  // Live telemetry
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
        className="relative aspect-[4/5] overflow-hidden"
      >
        {/* Shattered tile grid */}
        <div className="absolute inset-0">
          {tiles.map((tile, i) => (
            <div
              key={i}
              ref={(el) => { tilesRef.current[i] = el; }}
              className="absolute will-change-transform"
              style={{
                left: `${(tile.c / COLS) * 100}%`,
                top: `${(tile.r / ROWS) * 100}%`,
                width: `${100 / COLS}%`,
                height: `${100 / ROWS}%`,
                backgroundImage: `url(${humanoid})`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(tile.c / (COLS - 1)) * 100}% ${(tile.r / (ROWS - 1)) * 100}%`,
                backgroundRepeat: "no-repeat",
                transition: "transform 60ms linear, opacity 200ms ease",
                filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--signal) 25%, transparent))",
              }}
            />
          ))}
        </div>

        {/* faint grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-strong) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 85%)",
          }}
        />

        {/* mouse reticle */}
        <div
          ref={reticleRef}
          className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 opacity-0 transition-opacity"
          style={{ boxShadow: "0 0 32px color-mix(in oklab, var(--primary) 45%, transparent)" }}
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/40" />
          <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/40" />
        </div>

        {/* HUD overlays */}
        <div className="absolute left-2 top-2 flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 backdrop-blur">
          <span className="pulse-dot" />
          <span className="font-mono text-[10px] tracking-widest text-foreground/80">UNIT CB-002 · LIVE</span>
        </div>
        <div className="absolute right-2 top-2 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] tracking-widest text-foreground/70 backdrop-blur">
          ISO 30°
        </div>

        <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-2 font-mono text-[10px]">
          <div className="rounded-md bg-background/70 p-2 backdrop-blur border border-border-strong">
            <div className="text-muted-foreground">Δ-time</div>
            <div className="mt-1 text-foreground tabular-nums">{t}</div>
          </div>
          <div className="rounded-md bg-background/70 p-2 backdrop-blur border border-border-strong">
            <div className="text-muted-foreground">task</div>
            <div className="mt-1 text-foreground">PICK/PLACE</div>
          </div>
          <div className="rounded-md bg-background/70 p-2 backdrop-blur border border-border-strong">
            <div className="text-muted-foreground">torque</div>
            <div className="mt-1 text-foreground tabular-nums">{torque} Nm</div>
          </div>
        </div>
      </div>

      <div className="absolute -left-3 top-6 hidden rotate-[-90deg] origin-top-left font-mono text-[10px] tracking-[0.4em] text-muted-foreground md:block">
        FIG.01 - HUMANOID OPERATIONS · HOVER TO DISASSEMBLE
      </div>
    </div>
  );
}
