import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/explore/shared";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Inside the engineering · CosmicBrain Technical Report" },
      {
        name: "description",
        content:
          "Read Cosmic 0.5, CosmicBrain’s technical report on human-to-humanoid skill transfer, capture, motion, retargeting, and evaluation.",
      },
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
        kicker="Research notebook / Cosmic 0.5"
        title="Curious about"
        accent="the engineering?"
        sub="Come a little closer. Our technical report walks through the ideas, systems, and open questions behind human-to-humanoid skill transfer."
        sketch="orbit"
        note="Show your working. Keep asking questions."
      />
      <section className="explore-content">
        <div className="explore-wrap">
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
