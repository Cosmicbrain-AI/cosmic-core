import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";
import "@/components/explore/docs.css";

const title = "CosmicBrain Research · Technical papers";
const description =
  "Who Checks the Checker? and Cosmic 0.5: research on demonstration scoring, telemetry-first verification and human-to-humanoid skill transfer.";
const evalPaper = "/docs/cosmicbrain-eval-layer-2026-10.pdf";
const shareImage = "https://www.cosmicbrain.ai/social/cosmicbrain-docs-v1.jpg";
const shareImageAlt =
  "CosmicBrain Research: Inside the engineering. Covers of Who Checks the Checker? and Cosmic 0.5, with demonstration scoring, verification and skill transfer research.";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:url", content: "https://www.cosmicbrain.ai/docs" },
      { property: "og:description", content: description },
      { property: "og:image", content: shareImage },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: shareImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImage },
      { name: "twitter:image:alt", content: shareImageAlt },
      { name: "twitter:title", content: title },
      { name: "twitter:url", content: "https://www.cosmicbrain.ai/docs" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/docs" }],
  }),
  component: TechnicalReportPage,
});

function TechnicalReportPage() {
  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Research notebook / Technical papers"
        title="Curious about"
        accent="the engineering?"
        sub="Come a little closer. Our research explores the systems behind robot learning, the evidence behind evaluation, and the open questions worth asking next."
        sketch="orbit"
        note="Show your working. Keep asking questions."
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <section className="docs-paper-card" aria-labelledby="eval-paper-title">
            <a
              className="docs-paper-cover"
              href={evalPaper}
              target="_blank"
              rel="noreferrer"
              aria-label="Read Who Checks the Checker? (PDF, 14 pages)"
            >
              <img
                src="/docs/cosmicbrain-eval-layer-2026-10-cover.webp"
                alt="First page of Who Checks the Checker?, the CosmicBrain evaluation-layer preprint."
                width="1082"
                height="1400"
              />
            </a>
            <div className="docs-paper-copy">
              <span className="explore-note-label docs-paper-label">
                Latest publication / Preprint
              </span>
              <div className="docs-paper-meta">
                <time dateTime="2026-10-02">October 2, 2026</time>
                <span>Anto Patrex</span>
                <span>PDF · 14 pages</span>
              </div>
              <h2 id="eval-paper-title">Who Checks the Checker?</h2>
              <p className="docs-paper-subtitle">
                Auditing Automated Demonstration Scoring for Teleoperated Robot Data, and a
                Telemetry-First Verifier Stack
              </p>
              <p className="docs-paper-description">
                An audit of automated scoring across 323 teleoperated robot demonstrations, followed
                by a proposed telemetry-first verifier stack and a protocol for validating scores
                against downstream policy performance.
              </p>
              <div className="docs-paper-actions">
                <a href={evalPaper} target="_blank" rel="noreferrer" className="button">
                  Read the paper <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>
          <section className="docs-paper-card" aria-labelledby="cosmic-paper-title">
            <a
              className="docs-paper-cover"
              href="/docs/cosmic-0-5.html"
              target="_blank"
              rel="noreferrer"
              aria-label="Read Cosmic 0.5 (web report)"
            >
              <img
                src="/docs/cosmic-0-5-cover.webp"
                alt="Title and opening abstract of the Cosmic 0.5 technical report."
                width="550"
                height="712"
                loading="lazy"
              />
            </a>
            <div className="docs-paper-copy">
              <span className="explore-note-label docs-paper-label">
                Technical report / Preprint
              </span>
              <div className="docs-paper-meta">
                <time dateTime="2026-08">August 2026</time>
                <span>CosmicBrain AI</span>
                <span>Web report</span>
              </div>
              <h2 id="cosmic-paper-title">Cosmic 0.5</h2>
              <p className="docs-paper-subtitle">
                A Universal Stack for Human-to-Humanoid Skill Transfer
              </p>
              <p className="docs-paper-description">
                A technical report on turning human video, egocentric recordings and VR teleoperation
                into a canonical motion representation, retargeting it across robot bodies, and
                executing it through a supervised hardware stack.
              </p>
              <div className="docs-paper-actions">
                <a
                  href="/docs/cosmic-0-5.html"
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  Read the report <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
