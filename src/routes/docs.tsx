import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";
import "@/components/explore/docs.css";

const title = "CosmicBrain Research · Papers and briefs";
const description =
  "Research papers and a verification brief on demonstration scoring, telemetry-first verification, input clocks and human-to-humanoid skill transfer.";
const evalPaper = "/docs/cosmicbrain-eval-layer-2026-10.pdf?v=34a4cce2";
const shareImage = "https://www.cosmicbrain.ai/social/cosmicbrain-docs-v2.jpg";
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
        kicker="Research notebook / Papers and briefs"
        title="Research and briefs."
        accent="Methods and evidence."
        sub="Demonstration scoring, telemetry-based verification and human-to-humanoid skill transfer. Read the methods, limitations and evaluation protocols in our papers and verification brief."
        sketch="orbit"
        note="Methods · Provenance · Evaluation protocols"
      />
      <section className="explore-content">
        <div className="explore-wrap">
          <Link
            to="/docs/verifier-audit"
            className="docs-paper-card docs-paper-card-link"
            aria-labelledby="verifier-brief-title"
            aria-describedby="verifier-brief-description"
          >
            <div className="docs-paper-cover docs-brief-cover" aria-hidden="true">
              <svg viewBox="0 0 260 336" fill="none" className="docs-brief-cover-art">
                <text x="22" y="29" className="docs-brief-cover-brand">
                  CosmicBrain AI
                </text>
                <path d="M22 43H238" stroke="currentColor" opacity=".25" />
                <text x="22" y="65" className="docs-brief-cover-kicker">
                  Verification brief
                </text>
                <text x="22" y="100" className="docs-brief-cover-title">
                  <tspan x="22">The machine</tspan>
                  <tspan x="22" dy="29">
                    audits the
                  </tspan>
                  <tspan x="22" dy="29">
                    AI verifier
                  </tspan>
                </text>
                <g transform="translate(22 176)">
                  <path d="M0 15H216M0 51H216M0 87H216" stroke="currentColor" opacity=".2" />
                  <path
                    d="M18 3V96M108 3V96M198 3V96"
                    stroke="currentColor"
                    opacity=".2"
                    strokeDasharray="2 5"
                  />
                  <path
                    d="M0 15H22V1H38V15H82V1H98V15H142V1H158V15H216"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M18 51H108V87H198" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M108 51H198"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                  />
                  <circle cx="18" cy="51" r="5" fill="#d8d7bd" stroke="currentColor" />
                  <rect
                    x="101"
                    y="44"
                    width="14"
                    height="14"
                    rx="2"
                    fill="#f7f4ec"
                    stroke="currentColor"
                  />
                  <path d="M104 51L107 54L112 48" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="198" cy="51" r="5" fill="#d8d7bd" stroke="currentColor" />
                  <circle cx="198" cy="87" r="5" fill="#b94e32" />
                </g>
                <text x="22" y="289" className="docs-brief-cover-caption">
                  Input clocks · Completion checks
                </text>
                <text x="22" y="300" className="docs-brief-cover-caption">
                  Review routing
                </text>
                <text x="22" y="320" className="docs-brief-cover-footer">
                  October 2026 / Web brief
                </text>
              </svg>
            </div>
            <div className="docs-paper-copy">
              <span className="explore-note-label docs-paper-label">
                Latest publication / Web brief
              </span>
              <div className="docs-paper-meta">
                <time dateTime="2026-10">October 2026</time>
                <span>CosmicBrain AI</span>
                <span>Web brief</span>
              </div>
              <h2 id="verifier-brief-title">The machine audits the AI verifier</h2>
              <p className="docs-paper-subtitle">Zero-label checks from the instrument log</p>
              <p className="docs-paper-description" id="verifier-brief-description">
                Uses instrument logs and model-generated step labels to audit input clocks, check
                physical completion and route human review, without human labels in the checks.
              </p>
              <div className="docs-paper-actions">
                <span className="button">
                  Read brief <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
          <section className="docs-paper-card" aria-labelledby="eval-paper-title">
            <a
              className="docs-paper-cover"
              href={evalPaper}
              target="_blank"
              rel="noreferrer"
              aria-label="Read Who Checks the Checker? (PDF, 12 pages)"
            >
              <img
                src="/docs/cosmicbrain-eval-layer-2026-10-cover-v2.webp"
                alt="First page of Who Checks the Checker?, the CosmicBrain evaluation-layer preprint."
                width="1082"
                height="1400"
              />
            </a>
            <div className="docs-paper-copy">
              <span className="explore-note-label docs-paper-label">Research paper / Preprint</span>
              <div className="docs-paper-meta">
                <time dateTime="2026-10-02">October 2, 2026</time>
                <span>CosmicBrain AI</span>
                <span>PDF · 12 pages</span>
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
                A technical report on turning human video, egocentric recordings and VR
                teleoperation into a canonical motion representation, retargeting it across robot
                bodies, and executing it through a supervised hardware stack.
              </p>
              <div className="docs-paper-actions">
                <a href="/docs/cosmic-0-5.html" target="_blank" rel="noreferrer" className="button">
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
