import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  AvailabilityBadge,
  RobotCard,
  RobotImage,
  SiteFooterCTA,
} from "@/components/explore/shared";
import { getRobot, robotsForTags } from "@/data/catalog";

export const Route = createFileRoute("/catalog/$slug")({
  loader: ({ params }) => {
    const robot = getRobot(params.slug);
    if (!robot) throw notFound();
    return { robot };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.robot.name} · CosmicBrain Field Guide` },
          { name: "description", content: loaderData.robot.summary ?? "" },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://www.cosmicbrain.ai/catalog/${loaderData.robot.slug}` }]
      : [],
  }),
  component: RobotPage,
});

function SpecRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="explore-spec-row">
      <dt>{label}</dt>
      <dd>{value || "Not listed"}</dd>
    </div>
  );
}

function RobotPage() {
  const { robot } = Route.useLoaderData();
  const s = robot.specs;
  const related = robotsForTags(robot.tags, 4)
    .filter((r) => r.slug !== robot.slug)
    .slice(0, 3);
  return (
    <main className="explore-page">
      <SiteHeader />
      <section className="explore-detail">
        <div className="explore-wrap">
          <Link to="/catalog" className="explore-back">
            <ArrowLeft size={14} />
            Back to the field guide
          </Link>
          <div className="explore-detail-grid">
            <div className="explore-detail-photo">
              <RobotImage key={robot.slug} robot={robot} eager />
              <span className="explore-note-label">
                Platform portrait / {robot.manufacturer ?? "Maker not listed"}
              </span>
            </div>
            <div className="explore-detail-copy">
              <div className="explore-detail-meta">
                <span className="explore-note-label">
                  {robot.manufacturer ?? "Meet the platform"}
                </span>
                <AvailabilityBadge value={robot.availability} />
              </div>
              <h1>{robot.name}</h1>
              <p>{robot.summary}</p>
              <div className="explore-eyebrow">A closer look / Specifications</div>
              <dl className="explore-spec-table">
                <SpecRow label="Degrees of freedom" value={s.dof != null ? String(s.dof) : null} />
                <SpecRow
                  label="Height · h"
                  value={s.heightCm != null ? `${s.heightCm} cm` : null}
                />
                <SpecRow label="Mass · m" value={s.weightKg != null ? `${s.weightKg} kg` : null} />
                <SpecRow label="Payload" value={s.payloadKg != null ? `${s.payloadKg} kg` : null} />
                <SpecRow label="Speed · v" value={s.speedMs != null ? `${s.speedMs} m/s` : null} />
                <SpecRow label="Form factor" value={robot.formFactor} />
                <SpecRow
                  label="Family"
                  value={robot.families.map((f) => f.name).join(", ") || null}
                />
              </dl>
              <div className="explore-actions">
                <Link to="/sales" className="explore-primary-link">
                  Let’s explore this platform <ArrowUpRight size={17} />
                </Link>
                {robot.manufacturerSite && (
                  <a
                    href={robot.manufacturerSite}
                    target="_blank"
                    rel="noreferrer"
                    className="explore-text-link"
                  >
                    Meet the maker <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
              <aside className="explore-field-note">
                <span className="explore-note-label">A note from the workshop</span>
                <p>
                  A specification is a starting point. The right fit depends on your task,
                  environment, and the people working alongside the robot. That’s where we can help.
                </p>
              </aside>
            </div>
          </div>
          {robot.description && (
            <div className="explore-overview">
              <div>
                <div className="explore-eyebrow">Field notes</div>
                <h2 className="explore-section-heading">
                  Get to know
                  <br />
                  <em>the platform.</em>
                </h2>
              </div>
              <p>{robot.description}</p>
            </div>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section className="explore-section">
          <div className="explore-wrap">
            <div className="explore-section-top">
              <div>
                <div className="explore-eyebrow">Keep exploring</div>
                <h2 className="explore-section-heading">A few more introductions.</h2>
              </div>
              <Link to="/catalog" className="explore-text-link">
                All robots <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="explore-card-grid">
              {related.map((r) => (
                <RobotCard key={r.slug} robot={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooterCTA context={robot.name} />
    </main>
  );
}
