import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Download } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";
import "@/components/explore/docs.css";

const title = "Inside the engineering · CosmicBrain Research";
const description =
  "Read CosmicBrain research on robot demonstration scoring, telemetry-first verification, evaluation and human-to-humanoid skill transfer.";
const evalPaper = "/docs/cosmicbrain-eval-layer-2026-10.pdf";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:url", content: "https://www.cosmicbrain.ai/docs" },
      { property: "og:description", content: description },
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
          <section className="docs-latest-paper" aria-labelledby="eval-paper-title">
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
                <a
                  href={evalPaper}
                  download="CosmicBrain-Eval-Layer-Paper-2026-10.pdf"
                  className="explore-text-link"
                >
                  Download PDF <Download size={15} />
                </a>
              </div>
            </div>
          </section>
          <h2 className="docs-earlier-heading">From the research notebook</h2>
          <div className="explore-report-bar">
            <span>
              <BookOpen size={16} aria-hidden="true" /> Cosmic 0.5 / Technical report
            </span>
            <a
              href="/docs/cosmic-0-5.html"
              target="_blank"
              rel="noreferrer"
              className="explore-text-link"
            >
              Open full document <ArrowUpRight size={15} />
            </a>
          </div>
          <iframe
            className="explore-report-frame"
            src="/docs/cosmic-0-5.html"
            title="Cosmic 0.5: A Universal Stack for Human-to-Humanoid Skill Transfer"
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
