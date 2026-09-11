import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { NotebookSketch, RobotCard, SiteFooterCTA } from "@/components/explore/shared";
import { getSolution, type Solution } from "@/data/solutions";
import { robotsForTags } from "@/data/catalog";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.solution.name} · CosmicBrain Solutions` },
          { name: "description", content: loaderData.solution.tagline },
        ]
      : [],
    links: loaderData
      ? [
          {
            rel: "canonical",
            href: `https://www.cosmicbrain.ai/solutions/${loaderData.solution.slug}`,
          },
        ]
      : [],
  }),
  component: SolutionPage,
});

function PilotChecklist({ solution }: { solution: Solution }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const total = solution.checklist.reduce((sum, category) => sum + category.items.length, 0);
  const toggle = (id: string) =>
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return (
    <section className="explore-section explore-checklist">
      <div className="explore-wrap">
        <div className="explore-checklist-intro">
          <div>
            <div className="explore-eyebrow">Your working notes</div>
            <h2 className="explore-section-heading">
              Good questions.
              <br />
              <em>Better first steps.</em>
            </h2>
            <p>
              Use this checklist to shape your pilot conversation. Tick off the questions you’ve
              explored while you’re here.
            </p>
            <div className="explore-check-progress" aria-live="polite">
              {checked.size} of {total} questions explored
              {checked.size === total ? " · A thoughtful starting point." : ""}
            </div>
          </div>
          {checked.size > 0 && (
            <button type="button" className="explore-reset" onClick={() => setChecked(new Set())}>
              <RotateCcw size={13} />
              Start fresh
            </button>
          )}
        </div>
        <div className="explore-check-grid">
          {solution.checklist.map((c) => (
            <div key={c.category} className="explore-check-category">
              <h3>{c.category}</h3>
              {c.items.map((item) => {
                const id = `${c.category}:${item}`;
                return (
                  <label key={id} className="explore-check-item">
                    <input type="checkbox" checked={checked.has(id)} onChange={() => toggle(id)} />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionPage() {
  const { solution } = Route.useLoaderData();
  const platforms = robotsForTags(solution.matchTags, 6);
  return (
    <main className="explore-page">
      <SiteHeader />
      <section className="explore-solution-hero">
        <div className="explore-wrap">
          <Link to="/solutions" className="explore-back">
            <ArrowLeft size={14} />
            All the possibilities
          </Link>
          <div className="explore-solution-hero-grid">
            <div>
              <div className="explore-eyebrow">
                Field guide / {solution.code} / A place to begin
              </div>
              <h1>{solution.name}</h1>
              <p className="explore-solution-tagline">{solution.tagline}</p>
              <p className="explore-solution-intro">{solution.intro}</p>
            </div>
            <aside className="explore-guide-aside">
              <span className="explore-note-label">The first principle</span>
              <NotebookSketch variant={solution.slug === "research-education" ? "orbit" : "arm"} />
              <p>
                Start with one useful task. Get to know the people doing it. Measure, learn, and
                build from there.
              </p>
              <div className="explore-actions">
                <a href="#use-cases" className="explore-text-link">
                  Explore the use cases <ArrowUpRight size={15} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section id="use-cases" className="explore-section">
        <div className="explore-wrap">
          <div className="explore-eyebrow">01 / Where we can start</div>
          <h2 className="explore-section-heading">
            Small tasks.
            <br />
            <em>Meaningful possibilities.</em>
          </h2>
          <div>
            {solution.useCases.map((u) => (
              <article key={u.code} className="explore-usecase">
                <span className="explore-usecase-code">{u.code}</span>
                <div>
                  <h3>{u.name}</h3>
                  <p>{u.desc}</p>
                </div>
                <ul>
                  {u.points.map((p) => (
                    <li key={p}>
                      <span aria-hidden="true">↗</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      {solution.deployments && (
        <section className="explore-section">
          <div className="explore-wrap">
            <div className="explore-eyebrow">02 / From the wider robotics community</div>
            <h2 className="explore-section-heading">Learning from the field.</h2>
            <div className="explore-deployment-grid">
              {solution.deployments.map((d, i) => (
                <article key={d.site} className="explore-deployment">
                  <span className="explore-note-label">Field reference / 0{i + 1}</span>
                  <h3>{d.site}</h3>
                  <span className="explore-note-label">{d.robot}</span>
                  <p>{d.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <PilotChecklist key={solution.slug} solution={solution} />
      {platforms.length > 0 && (
        <section className="explore-section">
          <div className="explore-wrap">
            <div className="explore-section-top">
              <div>
                <div className="explore-eyebrow">Your hardware starting points</div>
                <h2 className="explore-section-heading">Meet a few possibilities.</h2>
              </div>
              <Link to="/catalog" className="explore-text-link">
                Full catalog <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="explore-card-grid">
              {platforms.map((r) => (
                <RobotCard key={r.slug} robot={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooterCTA context={`robots in ${solution.name.toLowerCase()}`} />
    </main>
  );
}
