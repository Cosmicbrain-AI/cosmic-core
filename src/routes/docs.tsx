import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";
import { DocCover } from "@/components/explore/DocCover";
import "@/components/explore/docs.css";

const title = "CosmicBrain Research · Papers and briefs";
const description =
  "Research papers and briefs on robot-data evaluation, physical-evidence verification, input clocks and human-to-humanoid skill transfer.";
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

const documents = [
  {
    id: "robot-knows",
    to: "/docs/the-robot-already-knows",
    label: "Physical evidence / Research brief",
    cover: "gripper",
    kicker: "Physical evidence",
    coverTitle: ["The Robot", "Already Knows"],
    caption: ["Robot logs · Critics · Policy evaluation"],
    coverFooter: "October 2026 / Read online",
    dateTime: "2026-10",
    date: "October 2026",
    title: "The Robot Already Knows",
    subtitle: "Physical evidence as a verifier for Cosmos, GR00T and real-world evaluation",
    description:
      "A study of robot-log signals for judging rollouts, ranking policies and auditing public training code, with pre-registered tests and six negative results.",
    action: "Read brief",
  },
  {
    id: "robot-data",
    to: "/docs/robot-data-evaluation",
    label: "Independent evaluation / Research brief",
    cover: "labels",
    kicker: "Independent evaluation",
    coverTitle: ["Gemini 4 Argon", "on real robot", "recordings"],
    caption: ["Labels · Verdicts · Robot state"],
    coverFooter: "October 2026 / Read online",
    dateTime: "2026-10",
    date: "October 2026",
    title: "Gemini 4 Argon on real robot recordings",
    subtitle: "Where it leads, where it leaks, and a fix from robot state",
    description:
      "A pre-registered evaluation of hindsight labeling and success judging on held-out robot recordings, with model comparisons, failure modes and gripper-signal fixes.",
    action: "Read brief",
  },
  {
    id: "verifier-brief",
    to: "/docs/verifier-audit",
    label: "Verification research / Web brief",
    cover: "audit",
    kicker: "Verification brief",
    coverTitle: ["The machine", "audits the", "AI verifier"],
    caption: ["Input clocks · Completion checks", "Review routing"],
    coverFooter: "October 2026 / Web brief",
    dateTime: "2026-10",
    date: "October 2026",
    title: "The machine audits the AI verifier",
    subtitle: "Zero-label checks from the instrument log",
    description:
      "Uses instrument logs and model-generated step labels to audit input clocks, check physical completion and route human review, without human labels in the checks.",
    action: "Read brief",
  },
  {
    id: "eval-paper",
    to: "/docs/who-checks-the-checker",
    label: "Research paper / Preprint",
    cover: "checker",
    kicker: "Evaluation research",
    coverTitle: ["Who Checks", "the Checker?"],
    caption: ["Scoring · Provenance · Verification"],
    coverFooter: "October 2026 / Preprint",
    dateTime: "2026-10-02",
    date: "October 2, 2026",
    title: "Who Checks the Checker?",
    subtitle:
      "Auditing Automated Demonstration Scoring for Teleoperated Robot Data, and a Telemetry-First Verifier Stack",
    description:
      "An audit of automated scoring across 323 teleoperated robot demonstrations, followed by a proposed telemetry-first verifier stack and a protocol for validating scores against downstream policy performance.",
    action: "Read the paper",
  },
  {
    id: "cosmic-paper",
    to: "/docs/cosmic-0-5",
    label: "Technical report / Preprint",
    cover: "transfer",
    kicker: "Technical report",
    coverTitle: ["Cosmic 0.5"],
    caption: ["Human motion · Robot execution"],
    coverFooter: "August 2026 / Technical report",
    dateTime: "2026-08",
    date: "August 2026",
    title: "Cosmic 0.5",
    subtitle: "A Universal Stack for Human-to-Humanoid Skill Transfer",
    description:
      "A technical report on turning human video, egocentric recordings and VR teleoperation into a canonical motion representation, retargeting it across robot bodies, and executing it through a supervised hardware stack.",
    action: "Read the report",
  },
] as const;

function TechnicalReportPage() {
  return (
    <main className="explore-page">
      <SiteHeader />
      <PageHero
        kicker="Research notebook / Papers and briefs"
        title="Research and briefs."
        accent="Methods and evidence."
        sub="Robot-data evaluation, physical-evidence verification and human-to-humanoid skill transfer. Read the findings, methods and limitations in our research papers and briefs."
        sketch="orbit"
        note="Methods · Provenance · Evaluation protocols"
      />
      <section className="explore-content">
        <div className="explore-wrap">
          {documents.map((document) => (
            <Link
              key={document.id}
              to={document.to}
              className="docs-paper-card docs-paper-card-link"
              aria-labelledby={`${document.id}-title`}
              aria-describedby={`${document.id}-description`}
            >
              <DocCover
                variant={document.cover}
                kicker={document.kicker}
                title={document.coverTitle}
                caption={document.caption}
                footer={document.coverFooter}
              />
              <div className="docs-paper-copy">
                <span className="explore-note-label docs-paper-label">{document.label}</span>
                <div className="docs-paper-meta">
                  <time dateTime={document.dateTime}>{document.date}</time>
                  <span>CosmicBrain AI</span>
                  <span>Read online</span>
                </div>
                <h2 id={`${document.id}-title`}>{document.title}</h2>
                <p className="docs-paper-subtitle">{document.subtitle}</p>
                <p className="docs-paper-description" id={`${document.id}-description`}>
                  {document.description}
                </p>
                <div className="docs-paper-actions">
                  <span className="button">
                    {document.action}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
