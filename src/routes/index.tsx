import { createFileRoute } from "@tanstack/react-router";
import humanoid from "@/assets/humanoid-blueprint.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { AxisMark } from "@/components/AxisMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmicBrain — The data and deployment stack for humanoids" },
      {
        name: "description",
        content:
          "CosmicBrain powers the data and deployment stack behind humanoids — telemetry, learning, and reliable real-world deployment.",
      },
      { property: "og:title", content: "CosmicBrain — Data & deployment for humanoids" },
      {
        property: "og:description",
        content: "The data and deployment stack behind humanoids.",
      },
    ],
  }),
  component: Home,
});

const bom = [
  ["01", "Telemetry", "real-world sensor fusion"],
  ["02", "Locomotion", "bipedal gait · J0"],
  ["03", "Kinematics", "link pose & trajectory"],
  ["04", "Degrees of Freedom", "28-axis articulation"],
  ["05", "Motion Capture", "joint-angle telemetry"],
  ["06", "Contact Data", "grasp · force · tactile"],
] as const;

const primitives = [
  ["01", "Pixel Understanding", "PX-01 · CB-SIG"],
  ["02", "Depth & Geometry", "DP-02 · CB-SIG"],
  ["03", "Object Tracking", "OT-03 · CB-SIG"],
  ["04", "Segmentation", "SG-04 · CB-SIG"],
  ["05", "Tactile Force", "TF-05 · CB-SIG"],
  ["06", "Proprioception", "PR-06 · CB-SIG"],
  ["07", "Speed & Motion", "SM-07 · CB-SIG"],
  ["08", "Point Cloud", "PC-08 · CB-SIG"],
  ["09", "Grasp Planning", "GP-09 · CB-ACT"],
  ["10", "Localization", "LC-10 · CB-SIG"],
] as const;

const faqs = [
  {
    q: "What does CosmicBrain do?",
    a: "CosmicBrain is the data and deployment stack behind humanoids. We collect, refine, and deploy the real-world data that makes embodied policies reliable in the field.",
  },
  {
    q: "Who is CosmicBrain built for?",
    a: "Humanoid OEMs, frontier model teams, and enterprises piloting embodied systems — anyone who needs task-specific real-world data, evaluation harnesses, and a path from lab to deployment.",
  },
  {
    q: "Do you build humanoids?",
    a: "No. We're the integration layer. CosmicBrain plugs into the hardware, model, and commercial ecosystems and owns the data and deployment glue between them.",
  },
  {
    q: "How can teams work with us?",
    a: "Enterprise pilots, research access, and dataset partnerships. Request access below and our team will get back within a few days.",
  },
] as const;

function SectionLabel({ index, title, meta }: { index: string; title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="font-mono text-primary">( {index} )</span>
      <span className="tech-label !text-foreground">{title}</span>
      {meta && <span className="tech-label">— {meta}</span>}
    </div>
  );
}

function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden">
      <SiteHeader />

      {/* Corner crosshairs on viewport */}
      <CornerTicks />

      {/* HERO */}
      <section className="relative mx-auto max-w-[1400px] px-6 pt-32 pb-24 md:px-12 md:pt-36 md:pb-32">
        <div className="absolute right-6 top-28 text-foreground md:right-12">
          <AxisMark className="h-16 w-16" />
        </div>

        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="tech-label">Fig.01 · Humanoid Operations Unit</span>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="font-display text-[18vw] leading-[0.85] tracking-[-0.04em] md:text-[10rem]">
              cosmic<span className="text-primary">brain</span>
              <sup className="text-2xl align-super text-muted-foreground">®</sup>
            </h1>
            <p className="mt-10 max-w-md text-xl leading-snug md:text-2xl">
              The <span className="text-primary">data and deployment stack</span> behind humanoids.
            </p>
          </div>

          <div className="relative">
            <img
              src={humanoid}
              alt="Engineering blueprint of a CosmicBrain humanoid robot"
              width={1280}
              height={1280}
              className="mx-auto w-full max-w-[520px] mix-blend-multiply"
            />
          </div>
        </div>

        {/* Bottom hero rails */}
        <div className="mt-16 grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="blueprint-card corner-frame">
            <div className="flex items-center justify-between border-b border-border-strong px-4 py-2.5">
              <span className="tech-label">Bill of Materials</span>
              <span className="font-mono text-xs">0 / 6</span>
            </div>
            <ul>
              {bom.map(([n, name, sub]) => (
                <li
                  key={n}
                  className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 first:border-t-0 hover:bg-secondary/60"
                >
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <span className="text-muted-foreground">{n}</span>
                    <span>{name}</span>
                    <span className="hidden text-muted-foreground sm:inline">— {sub}</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">STBY</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="blueprint-card w-full md:w-[320px]">
            <div className="border-b border-border-strong px-4 py-2.5">
              <span className="tech-label">Drawing · CB-001.PNG</span>
            </div>
            <div className="blueprint-row"><span>Unit</span><span>COSMICBRAIN</span></div>
            <div className="blueprint-row"><span>Title</span><span>Data + Deploy Stack</span></div>
            <div className="blueprint-row"><span>Dwg No.</span><span>CB-001 · Rev A</span></div>
            <div className="blueprint-row"><span>Scale</span><span>1:4 · ISO 30°</span></div>
            <div className="blueprint-row"><span>Sheet</span><span>1 of 1</span></div>
          </div>
        </div>
      </section>

      {/* MEET */}
      <Divider />
      <section id="meet" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="01" title="Meet CosmicBrain" meta="Fig 02 — Bimanual Cell / CB-002" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          Teaching humanoids about the physical world.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <div className="tech-label mb-3">( 01 )</div>
            <p className="text-lg leading-relaxed">
              Humanoids will be the largest GDP-expanding technology of our lifetimes — collapsing labor
              constraints across factories, logistics, and the home.
            </p>
          </div>
          <div>
            <div className="tech-label mb-3">( 02 )</div>
            <p className="text-lg leading-relaxed">
              CosmicBrain builds the infrastructure humanoids use to learn from the real world and deploy
              reliably into commercial settings.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary">
              Read the thesis <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* STACK / CHALLENGE */}
      <Divider />
      <section id="stack" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="02" title="The Stack" meta="3 layers — observed" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          Physical AI is blocked by real-world data.
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden border border-border-strong bg-border-strong md:grid-cols-3">
          {[
            {
              t: "Real-world tasks are noisy.",
              c: "Models need millions of edge cases and task-specific demonstrations before they generalize beyond the lab.",
              tag: "Task set / 1 of N",
            },
            {
              t: "Raw video is not enough.",
              c: "Teams need annotation, motion understanding, QA, and evaluation pipelines before activity becomes useful training data.",
              tag: "Raw → Labeled",
            },
            {
              t: "The lab is not the finish line.",
              c: "Humanoids must be evaluated against real workflows, real environments, and real constraints before they can work in the field.",
              tag: "Lab → Field",
            },
          ].map((x, i) => (
            <div key={x.t} className="bg-background p-8 md:p-10">
              <div className="tech-label">( Layer 0{i + 1} )</div>
              <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-3xl">{x.t}</h3>
              <p className="mt-4 text-muted-foreground">{x.c}</p>
              <div className="mt-10 inline-block border border-border-strong px-2 py-1 font-mono text-[10px] tracking-widest text-muted-foreground">
                {x.tag}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOOP / INTEGRATOR */}
      <Divider />
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="03" title="The CosmicBrain Loop" meta="Systems integrator / Phase 2" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          The integrator of the humanoid ecosystem.
        </h2>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          CosmicBrain plugs into three ecosystems — hardware, models, and commercial partners — and owns the
          data and integration layer between them. That glue is what turns scattered capability into
          specialized humanoid deployments.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="blueprint-card p-8">
            <div className="tech-label text-primary">· Plug In ·</div>
            <ul className="mt-6 space-y-6">
              <PlugRow t="Hardware ecosystem" s="Humanoid OEMs + actuators" />
              <PlugRow t="Model ecosystem" s="Frontier lab base models" />
              <PlugRow t="Commercial partners" s="Operators & enterprise sites" />
            </ul>
          </div>
          <div className="blueprint-card p-8">
            <div className="tech-label text-primary">· CosmicBrain Owns ·</div>
            <ul className="mt-6 space-y-6">
              <PlugRow t="Last-mile data" s="Human + humanoid, per-task" />
              <PlugRow t="System integration" s="Hardware + software glue" />
              <PlugRow t="Evaluation" s="Task-proven at scale" />
            </ul>
            <div className="mt-8 border-t border-border-strong pt-4 font-mono text-xs">
              <span className="text-primary">→</span> Specialized humanoid deployments live in commercial
              settings — telemetry compounds back.
            </div>
          </div>
        </div>
      </section>

      {/* PRIMITIVES */}
      <Divider />
      <section id="primitives" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="04" title="Signal & Action Primitives" meta="CB-SIG / Perception modules" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          How CosmicBrain measures and acts on the world.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Every module is a way of capturing or interacting with physical reality. Together they form the
          signal vocabulary behind the dataset.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border-strong bg-border-strong sm:grid-cols-3 lg:grid-cols-5">
          {primitives.map(([n, name, code]) => (
            <div key={n} className="group relative aspect-square bg-background p-4 hover:bg-secondary/60">
              <div className="font-mono text-xs text-muted-foreground">{n}</div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-base leading-tight tracking-tight">{name}</div>
                <div className="mt-2 font-mono text-[10px] tracking-widest text-muted-foreground">{code}</div>
              </div>
              <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM */}
      <Divider />
      <section id="platform" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="05" title="Platform" meta="Foundations to physical AI" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          Foundations to Physical AI.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Explore real-world data from operators around the world, built for humanoid learning — powered by
          CosmicBrain.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden border border-border-strong bg-border-strong md:grid-cols-3">
          {[
            {
              k: "Capture App",
              t: "Collect data at scale",
              c: "Capture environment and task-specific data for your use case — in labs and in the field.",
              cta: "Get the app",
            },
            {
              k: "Data Tools",
              t: "Browse, visualize, infer",
              c: "Web interface for browsing, visualizing, and querying datasets. Run inference APIs and collaborate.",
              cta: "Explore tools",
            },
            {
              k: "Enterprise",
              t: "Evaluate & deploy",
              c: "Learn how CosmicBrain helps your enterprise evaluate physical workflows and support real-world deployment.",
              cta: "Talk to sales",
            },
          ].map((x) => (
            <div key={x.k} className="flex flex-col justify-between bg-background p-8 md:p-10">
              <div>
                <div className="tech-label text-primary">{x.k}</div>
                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-3xl">{x.t}</h3>
                <p className="mt-4 text-muted-foreground">{x.c}</p>
              </div>
              <a href="#contact" className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-primary">
                {x.cta} <span aria-hidden>↗</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <Divider />
      <section id="contact" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="06" title="Contact" meta="CB-001 / Request access" />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          Deploy a humanoid, today.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          For enterprise programs, research access, and dataset partnerships.
        </p>
        <a
          href="mailto:hello@cosmicbrainai.com"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground hover:opacity-90"
        >
          Talk to us <span aria-hidden>→</span>
        </a>
      </section>

      {/* FAQ */}
      <Divider />
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="07" title="FAQ" meta={`Reference / ${faqs.length} entries`} />
        <h2 className="mt-8 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
          Frequently asked.
        </h2>

        <div className="mt-12 border-t border-border-strong">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-border-strong">
              <summary className="flex cursor-pointer items-start gap-6 py-6 list-none">
                <span className="font-mono text-xs text-primary pt-1">( 0{i + 1} )</span>
                <span className="flex-1 font-display text-xl tracking-tight md:text-2xl">{f.q}</span>
                <span className="font-mono text-xl text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-8 pl-[3.75rem] pr-12 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-[1400px] px-6 pb-12 pt-20 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-border-strong pt-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-primary" />
              <span className="font-mono text-lg font-semibold">cosmicbrain</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The data and deployment stack behind humanoids.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 font-mono text-xs">
            <a href="#meet" className="hover:text-primary">Meet</a>
            <a href="#stack" className="hover:text-primary">Stack</a>
            <a href="#primitives" className="hover:text-primary">Primitives</a>
            <a href="#platform" className="hover:text-primary">Platform</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
            <a href="mailto:hello@cosmicbrainai.com" className="hover:text-primary">Email</a>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 CosmicBrain · CB-001 Rev A
          </div>
        </div>
      </footer>
    </div>
  );
}

function PlugRow({ t, s }: { t: string; s: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-2 h-px w-6 bg-primary" />
      <div>
        <div className="font-display text-lg tracking-tight">{t}</div>
        <div className="font-mono text-xs text-muted-foreground">{s}</div>
      </div>
    </li>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-12">
      <div className="h-px w-full bg-border-strong" />
    </div>
  );
}

function CornerTicks() {
  const tick = "absolute h-4 w-4 border-primary";
  return (
    <>
      <span className={`${tick} left-3 top-3 border-l-2 border-t-2`} />
      <span className={`${tick} right-3 top-3 border-r-2 border-t-2`} />
      <span className={`${tick} left-3 bottom-3 border-l-2 border-b-2`} />
      <span className={`${tick} right-3 bottom-3 border-r-2 border-b-2`} />
    </>
  );
}
