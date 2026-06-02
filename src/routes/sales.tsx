import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Sales — CosmicBrain · Deploy humanoids into your operations" },
      {
        name: "description",
        content:
          "CosmicBrain is the middleware infrastructure powering humanoid data, teleoperation, and enterprise deployment. Book a free pilot.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/sales" },
      { property: "og:title", content: "Sales — CosmicBrain · Deploy humanoids into your operations" },
      {
        property: "og:description",
        content: "The operating system for the humanoid era. Free pilot. No commitment.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://www.cosmicbrain.ai/sales" },
      { name: "twitter:title", content: "Sales — CosmicBrain · Deploy humanoids into your operations" },
      {
        name: "twitter:description",
        content: "The operating system for the humanoid era. Free pilot. No commitment.",
      },
      { name: "keywords", content: "humanoid robotics, robot sales, enterprise deployment, free pilot, warehouse automation" },
      { rel: "canonical", href: "https://www.cosmicbrain.ai/sales" },
    ],
  }),
  component: SalesPage,
});

function Section({
  code,
  kicker,
  title,
  children,
}: {
  code: string;
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border-strong/60 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            {kicker && <div className="tech-label mb-3">{kicker}</div>}
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              {title}
            </h2>
          </div>
          <div className="tech-label hidden md:block">{code}</div>
        </div>
        <div className="text-foreground/85">{children}</div>
      </div>
    </section>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="https://formspree.io/f/xkoawoon"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Book a Pilot
      </a>
      <a
        href="https://formspree.io/f/xkoawoon"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground hover:bg-card"
      >
        Talk to Sales
      </a>
    </div>
  );
}

function SalesPage() {
  return (
    <main className="relative min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 md:px-12 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="tech-label mb-6 flex items-center gap-3">
            <span className="pulse-dot" />
            <span>CB · Sales / Deployment</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-8xl">
            The Operating System
            <br />
            for the <span className="text-primary">Humanoid Era.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-foreground/75 md:text-xl">
            CosmicBrain is the middleware infrastructure that connects humanoid hardware to the
            real world — powering data collection, model training, teleoperation, and enterprise
            deployment at scale.
          </p>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            We don&apos;t make robots. We make robots work.
          </p>
          <div className="mt-10">
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <Section code="01 / Audience" kicker="Who we work with" title="Two ends of the humanoid stack.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              t: "Hardware Partners",
              c: "We embed directly with humanoid manufacturers to provide the full software and data infrastructure their robots need to function, improve, and scale.",
            },
            {
              t: "Enterprise Deployers",
              c: "We work with warehouses, manufacturers, and logistics operators to deploy humanoids into live operations — one laborer replaced at a time, starting with a free pilot.",
            },
          ].map((x) => (
            <div key={x.t} className="glass rounded-xl p-8">
              <div className="font-display text-2xl">{x.t}</div>
              <p className="mt-3 text-foreground/75">{x.c}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Manufacturers */}
      <Section
        code="02 / Manufacturers"
        kicker="For humanoid manufacturers"
        title="The full middleware stack. Out of the box."
      >
        <p className="mb-10 max-w-3xl text-foreground/75">
          Building a humanoid is hard enough. CosmicBrain handles everything from the sensor to
          the model.
        </p>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border-strong bg-border-strong md:grid-cols-2">
          {[
            ["Video-to-Robot Pipeline", "We ingest raw video and sensor data directly from your hardware and structure it into clean, labeled training data — ready for model companies and robotics AI teams."],
            ["Teleoperation with Full VR", "Our teleoperation stack lets human operators control your robots remotely in real time, through a fully immersive VR interface. Hardware agnostic — no proprietary lockout."],
            ["Data Collection at the Source", "We collect directly from specific hardware configurations, producing high-fidelity datasets that model companies and robot makers actually need. Your hardware generates the data. We turn it into revenue."],
            ["Built for Model Companies", "The data we collect is sold directly to teams training the next generation of foundation models and locomotion systems. Your hardware becomes part of the training loop."],
          ].map(([t, c]) => (
            <div key={t} className="bg-background p-8">
              <div className="font-display text-xl">{t}</div>
              <p className="mt-3 text-foreground/75">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Enterprises */}
      <Section
        code="03 / Enterprise"
        kicker="For enterprises"
        title="Deploy humanoids into your operations. Start tomorrow."
      >
        <p className="max-w-3xl text-foreground/75">
          No custom builds. No long integration cycles. No software training required.
        </p>

        <div className="mt-10 glass rounded-2xl p-8 md:p-12">
          <div className="tech-label mb-3 text-primary">Free Pilot Program</div>
          <div className="font-display text-3xl md:text-4xl">See it before you commit.</div>
          <p className="mt-4 max-w-3xl text-foreground/80">
            We deploy humanoids directly onto your floor — working side by side with your human
            workforce. You compare output, reliability, and cost in real conditions, 24/7. No
            obligation. No upfront investment.
          </p>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            If the numbers don&apos;t work for you, you walk away. They always work.
          </p>
        </div>
      </Section>

      {/* ROI Table */}
      <Section code="04 / ROI" kicker="The ROI case" title="The math is simple.">
        <div className="overflow-x-auto rounded-xl border border-border-strong">
          <table className="w-full text-left text-sm">
            <thead className="bg-card font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4">Dimension</th>
                <th className="p-4">Traditional Automation</th>
                <th className="p-4 text-primary">CosmicBrain Humanoids</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-strong">
              {[
                ["Deployment time", "Months to years", "Days"],
                ["Custom build required", "Yes", "No"],
                ["Software training", "Extensive", "None"],
                ["Overhead costs", "High", "Zero"],
                ["Scalability", "Fixed capacity", "On-demand"],
                ["Flexibility", "Single task", "Multi-task"],
                ["Labor comparison", "Replaces process", "Replaces headcount"],
              ].map((row) => (
                <tr key={row[0]} className="bg-background/40">
                  <td className="p-4 font-medium">{row[0]}</td>
                  <td className="p-4 text-foreground/70">{row[1]}</td>
                  <td className="p-4 text-foreground">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-foreground/75">
          Humanoids have no benefits, no sick days, no turnover, no overtime liability. The
          overhead gap versus human labor compounds every quarter.
        </p>
      </Section>

      {/* How it works */}
      <Section code="05 / Process" kicker="How it works" title="Four steps to a working floor.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["01", "We assess your operation", "Our team maps your workflow and identifies the highest-value positions for humanoid replacement — typically repetitive, physically demanding, or high-turnover roles."],
            ["02", "Free pilot deployment", "We bring the hardware. We run the deployment. Your team watches the robots work alongside your people in real conditions, on real tasks."],
            ["03", "You compare the numbers", "Productivity, error rate, throughput, cost per unit — you see everything. We don't ask you to trust projections."],
            ["04", "Scale on your terms", "Once the pilot proves out, we scale. One unit or one hundred — CosmicBrain handles the full deployment and ongoing operations stack."],
          ].map(([n, t, c]) => (
            <div key={n} className="rounded-xl border border-border-strong p-8">
              <div className="font-mono text-xs text-primary">STEP {n}</div>
              <div className="mt-2 font-display text-2xl">{t}</div>
              <p className="mt-3 text-foreground/75">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why */}
      <Section code="06 / Why" kicker="Why CosmicBrain" title="The operational edge.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border-strong bg-border-strong md:grid-cols-3">
          {[
            ["Hardware Agnostic", "We don't sell robots. We work with the best available hardware for your use case — and as the market evolves, you're never locked into yesterday's model."],
            ["Teleop by Overseas Operators", "When full autonomy isn't ready, skilled human operators run robots remotely at a fraction of local employee cost. Human judgment at machine economics."],
            ["No Software Training. Ever.", "Your team doesn't touch the software. CosmicBrain manages the entire stack. Robots arrive ready to work."],
            ["24/7 Operation", "Humanoids don't have shifts. They don't call in. Production continuity is the default, not a premium."],
            ["Better Volume & Consistency", "Humanoids maintain output quality across a full 24-hour cycle. No fatigue, no variance at hour 10."],
            ["Simple Installation", "No facility retrofit. No specialized infrastructure. Designed to integrate into existing environments."],
          ].map(([t, c]) => (
            <div key={t} className="bg-background p-8">
              <div className="font-display text-xl">{t}</div>
              <p className="mt-3 text-foreground/75">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section code="07 / Industries" kicker="Industries we deploy in" title="Where humanoids work today.">
        <div className="flex flex-wrap gap-3">
          {[
            "Warehousing & Fulfillment",
            "Manufacturing & Assembly",
            "Logistics & Sorting",
            "Food Processing",
            "Retail Backroom Operations",
          ].map((x) => (
            <span
              key={x}
              className="rounded-full border border-border-strong bg-card/60 px-5 py-2 font-mono text-sm"
            >
              {x}
            </span>
          ))}
        </div>
      </Section>

      {/* Bigger picture */}
      <Section code="08 / Vision" kicker="The bigger picture" title="The infrastructure layer for an industry being born.">
        <p className="max-w-3xl text-foreground/80">
          We are at the beginning of the humanoid deployment curve. The companies that establish
          the operational playbook now — the workflows, the data pipelines, the teleoperation
          infrastructure — will define how this industry scales.
        </p>
        <p className="mt-4 max-w-3xl text-foreground/80">
          CosmicBrain is building that infrastructure. For manufacturers who need the software
          layer. For enterprises who need the deployment layer. For the model companies who need
          the data layer.
        </p>
        <p className="mt-6 font-display text-3xl text-primary">The entire stack. One partner.</p>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-border-strong/60 px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="tech-label mb-6">CB · Free pilot</div>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Ready to run a free pilot?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/75">
            No commitment. No custom builds. Just your floor, our robots, and real numbers.
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButtons />
          </div>
          <div className="mt-12 font-mono text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              ← back to cosmicbrain.home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
