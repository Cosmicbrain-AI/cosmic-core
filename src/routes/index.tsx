import { createFileRoute } from "@tanstack/react-router";
import humanoid from "@/assets/humanoid-blueprint.jpg";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmicBrain — The data & deployment stack for humanoids" },
      {
        name: "description",
        content:
          "CosmicBrain powers the data and deployment stack behind humanoids — telemetry, learning, and reliable field deployment.",
      },
      { property: "og:title", content: "CosmicBrain" },
      { property: "og:description", content: "Data & deployment stack for humanoids." },
    ],
  }),
  component: Home,
});

const telemetry = [
  "TLM/sf-04",
  "GRIP 0.82N",
  "JNT-θ 28DOF",
  "VEL 1.4 m/s",
  "BAL ±0.3°",
  "BAT 87%",
  "LATENCY 12ms",
  "PKT 1.2M/s",
  "POLICY v2.7.1",
  "GPS LOCK",
  "EGO-VIEW ON",
  "TASK Q:14",
];

const stack = [
  {
    code: "01 / Capture",
    t: "Real-world data, captured in motion",
    c: "Multi-modal capture from human operators and humanoid fleets — video, depth, IMU, tactile, audio — synchronized at the millisecond.",
  },
  {
    code: "02 / Refine",
    t: "From raw signal to training-ready",
    c: "Annotation, motion understanding, segmentation, and evaluation pipelines that turn hours of footage into policy-ready datasets.",
  },
  {
    code: "03 / Deploy",
    t: "Policies that ship to the field",
    c: "Evaluation harnesses, OTA rollout, and live telemetry — close the loop from a deployed humanoid back into your dataset.",
  },
];

const primitives = [
  ["PX", "Pixel Understanding"],
  ["DP", "Depth & Geometry"],
  ["OT", "Object Tracking"],
  ["SG", "Segmentation"],
  ["TF", "Tactile Force"],
  ["PR", "Proprioception"],
  ["SM", "Speed & Motion"],
  ["PC", "Point Cloud"],
  ["GP", "Grasp Planning"],
  ["LC", "Localization"],
  ["LM", "Language Map"],
  ["AF", "Affordance"],
] as const;

const faqs = [
  {
    q: "What does CosmicBrain do?",
    a: "We are the data and deployment stack behind humanoids — capturing real-world signal, refining it into training-ready datasets, and shipping policies that work in the field.",
  },
  {
    q: "Who is it built for?",
    a: "Humanoid OEMs, frontier model labs, and enterprises piloting embodied systems. Anyone who needs task-specific real-world data, evaluation harnesses, and a path from lab to deployment.",
  },
  {
    q: "Do you build the humanoids?",
    a: "No — we sit between the hardware, the models, and the operator. CosmicBrain is the integration and data layer that makes specialized humanoid deployments possible.",
  },
  {
    q: "How can teams start?",
    a: "Enterprise pilots, research access, and dataset partnerships. Reach out and we'll respond within a few days.",
  },
];

function Home() {
  return (
    <div id="top" className="relative isolate min-h-screen">
      <SiteHeader />
      <div className="relative z-10">
        <Hero />
        <Telemetry />
        <Manifest />
        <Stack />
        <Primitives />
        <Loop />
        <Platform />
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

/* ---------------------------- Hero ---------------------------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 pt-36 pb-20 md:px-12 md:pt-44 md:pb-32">
      {/* status row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border-strong bg-card/60 px-3 py-1 backdrop-blur">
          <span className="pulse-dot" />
          <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
            FLEET ONLINE · 142 UNITS · 9 SITES
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
          CB-OS · v2.7.1
        </span>
      </div>

      <div className="mt-12 grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 className="font-display text-[12vw] leading-[0.9] tracking-[-0.02em] md:text-[7.5rem]">
            The brain<br />
            <span className="italic text-muted-foreground">behind the</span><br />
            <span className="text-primary">humanoid.</span>
          </h1>
          <p className="mt-10 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            CosmicBrain powers the <span className="text-foreground">data and deployment stack</span> behind
            humanoids — from first capture to live operation in the field.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-primary transition hover:translate-y-[-1px]"
            >
              Request access
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/40 px-6 py-3 text-sm backdrop-blur hover:border-primary/60"
            >
              See the stack
            </a>
          </div>
        </div>

        {/* Humanoid panel */}
        <div className="relative">
          <div className="glass scan relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={humanoid}
              alt="CosmicBrain humanoid telemetry view"
              width={1280}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* HUD overlays */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[10px] tracking-widest text-foreground/80">UNIT CB-002 · LIVE</span>
            </div>
            <div className="absolute right-4 top-4 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] tracking-widest text-foreground/70 backdrop-blur">
              ISO 30°
            </div>

            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 font-mono text-[10px]">
              {[
                ["Δ-time", "00:14:22"],
                ["task", "PICK/PLACE"],
                ["torque", "12.4 Nm"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md bg-background/70 p-2 backdrop-blur">
                  <div className="text-muted-foreground">{k}</div>
                  <div className="mt-1 text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* floating label */}
          <div className="absolute -left-3 top-6 hidden rotate-[-90deg] origin-top-left font-mono text-[10px] tracking-[0.4em] text-muted-foreground md:block">
            FIG.01 — HUMANOID OPERATIONS
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Live ticker ---------------------------- */

function Telemetry() {
  const items = [...telemetry, ...telemetry];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40">
      <div className="ticker flex w-max items-center gap-12 py-3 font-mono text-xs text-muted-foreground">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Manifest ---------------------------- */

function Manifest() {
  return (
    <section id="meet" className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="01" title="Manifest" />
      <h2 className="mt-10 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
        Humanoids will be the largest GDP-expanding technology of our lifetimes.{" "}
        <span className="text-muted-foreground">
          But none of it ships without a real-world data and deployment layer underneath.
        </span>{" "}
        <span className="text-primary">That's what we build.</span>
      </h2>
    </section>
  );
}

/* ---------------------------- Stack ---------------------------- */

function Stack() {
  return (
    <section id="stack" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="02" title="The Stack" meta="Capture · Refine · Deploy" />
      <h2 className="mt-10 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
        Three layers. One loop.
      </h2>

      <div className="mt-16 space-y-px">
        {stack.map((s, i) => (
          <div
            key={s.code}
            className="group grid items-start gap-6 border-t border-border py-10 md:grid-cols-[140px_1fr_1fr] md:gap-10"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">{s.code}</span>
            </div>
            <h3 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">{s.t}</h3>
            <p className="max-w-md text-muted-foreground md:pt-3">{s.c}</p>
            <div className="md:col-span-3">
              <div className="h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
            </div>
            <span aria-hidden className="hidden text-7xl text-border-strong md:block md:col-start-3 md:justify-self-end">
              0{i + 1}
            </span>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}

/* ---------------------------- Primitives ---------------------------- */

function Primitives() {
  return (
    <section id="primitives" className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="03" title="Signal Primitives" meta="CB-SIG modules" />
      <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
        <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          How a humanoid <em className="text-primary not-italic">feels</em> the world.
        </h2>
        <p className="max-w-md text-muted-foreground">
          Every primitive is a way of measuring or acting on physical reality. Together they form the signal
          vocabulary behind every CosmicBrain dataset.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {primitives.map(([code, name], i) => (
          <div
            key={code}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card/40 p-4 transition hover:border-primary/60 hover:bg-card"
          >
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {code}
            </div>
            <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-display text-lg leading-tight">{name}</div>
            </div>
            {/* corner ticks */}
            <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-border-strong" />
            <span className="absolute right-2 bottom-2 h-2 w-2 border-b border-r border-border-strong" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Loop / Integrator ---------------------------- */

function Loop() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="04" title="The Integrator" meta="Hardware × Models × Operators" />
      <h2 className="mt-10 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
        We sit between the makers, the minds, and the field.
      </h2>

      <div className="relative mt-20 grid gap-6 md:grid-cols-3">
        {[
          { k: "Hardware", c: "Humanoid OEMs, actuator vendors, sensor suites." },
          { k: "Models", c: "Frontier labs, base policies, foundation models." },
          { k: "Operators", c: "Pilot sites, warehouses, factories, homes." },
        ].map((x, i) => (
          <div key={x.k} className="glass relative rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="tech-label">Plug-in 0{i + 1}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <div className="mt-6 font-display text-3xl">{x.k}</div>
            <p className="mt-3 text-sm text-muted-foreground">{x.c}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border-strong bg-border md:grid-cols-3">
        {[
          ["Last-mile data", "Human + humanoid, per-task"],
          ["System integration", "Hardware + software glue"],
          ["Evaluation", "Task-proven at scale"],
        ].map(([t, s]) => (
          <div key={t} className="bg-background p-8">
            <div className="tech-label text-primary">CosmicBrain owns</div>
            <div className="mt-4 font-display text-2xl tracking-tight">{t}</div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Platform ---------------------------- */

function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="05" title="Platform" />
      <h2 className="mt-10 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
        Foundations to physical AI.
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          {
            k: "Capture",
            t: "Collect data at scale",
            c: "Mobile + wearable capture for operators in labs and in the field. Synced multi-modal streams.",
            cta: "Get the SDK",
          },
          {
            k: "Studio",
            t: "Browse, visualize, infer",
            c: "Web studio for browsing, visualizing, and querying datasets. Run inference APIs. Collaborate.",
            cta: "Open studio",
          },
          {
            k: "Fleet",
            t: "Evaluate & deploy",
            c: "Evaluation harnesses, OTA rollout, and live telemetry from humanoids in commercial settings.",
            cta: "Talk to sales",
          },
        ].map((x) => (
          <div key={x.k} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-8 transition hover:border-primary/60">
            <div>
              <div className="tech-label text-primary">{x.k}</div>
              <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight">{x.t}</h3>
              <p className="mt-4 text-muted-foreground">{x.c}</p>
            </div>
            <a href="#contact" className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-primary">
              {x.cta} <span aria-hidden>↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- CTA ---------------------------- */

function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-card/60 p-10 md:p-20">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[color:var(--signal)]/20 blur-3xl" />
        <div className="relative">
          <div className="tech-label">CB-001 · Request Access</div>
          <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Deploy a humanoid<br />
            <span className="italic text-primary">today.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Enterprise pilots, research access, and dataset partnerships.
          </p>
          <a
            href="mailto:hello@cosmicbrainai.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground glow-primary"
          >
            Talk to us <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FAQ ---------------------------- */

function FAQ() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <SectionHead index="06" title="FAQ" meta={`${faqs.length} entries`} />
      <h2 className="mt-10 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
        Frequently asked.
      </h2>

      <div className="mt-12 border-t border-border">
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b border-border">
            <summary className="flex cursor-pointer items-start gap-6 py-7 list-none">
              <span className="pt-1 font-mono text-xs text-primary">0{i + 1}</span>
              <span className="flex-1 font-display text-2xl tracking-tight md:text-3xl">{f.q}</span>
              <span className="font-mono text-2xl text-muted-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="pb-8 pl-12 pr-10 text-muted-foreground md:pl-16">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Footer ---------------------------- */

function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-6 pb-12 pt-20 md:px-12">
      <div className="grid gap-10 border-t border-border-strong pt-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-primary" />
            <span className="font-mono text-lg font-semibold">cosmicbrain</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The data and deployment stack behind humanoids.
          </p>
        </div>
        <FootCol head="Product" links={[["Stack", "#stack"], ["Primitives", "#primitives"], ["Platform", "#platform"]]} />
        <FootCol head="Company" links={[["Manifest", "#meet"], ["FAQ", "#"], ["Careers", "#"]]} />
        <FootCol head="Contact" links={[["hello@cosmicbrainai.com", "mailto:hello@cosmicbrainai.com"], ["Request access", "#contact"]]} />
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <span>© 2026 CosmicBrain AI · All systems nominal</span>
        <span>CB-001 · Rev A · Sheet 1 of 1</span>
      </div>
    </footer>
  );
}

function FootCol({ head, links }: { head: string; links: [string, string][] }) {
  return (
    <div>
      <div className="tech-label">{head}</div>
      <ul className="mt-4 space-y-2">
        {links.map(([l, h]) => (
          <li key={l}>
            <a href={h} className="text-sm text-foreground/80 hover:text-primary">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------- Section head ---------------------------- */

function SectionHead({ index, title, meta }: { index: string; title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="font-mono text-xs text-primary">[ {index} ]</span>
      <span className="h-px w-12 bg-primary" />
      <span className="tech-label !text-foreground">{title}</span>
      {meta && <span className="tech-label">— {meta}</span>}
    </div>
  );
}
