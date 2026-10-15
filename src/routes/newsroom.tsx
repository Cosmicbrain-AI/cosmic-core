import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { ContactDialog } from "@/components/ContactDialog";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/newsroom/ArticleCard";
import { newsArticles, publications, type Publication } from "@/components/newsroom/articles";
import "@/components/newsroom/newsroom.css";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom · CosmicBrain press coverage" },
      {
        name: "description",
        content:
          "Read source reporting on CosmicBrain, robot training data and teleoperation from TechCrunch, IBM Think and Rest of World.",
      },
      { property: "og:title", content: "Newsroom · CosmicBrain" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/newsroom" },
      {
        property: "og:description",
        content: "Source reporting on CosmicBrain, robot training data and teleoperation.",
      },
      { name: "twitter:title", content: "Newsroom · CosmicBrain" },
      { name: "twitter:url", content: "https://www.cosmicbrain.ai/newsroom" },
      {
        name: "twitter:description",
        content: "Source reporting on CosmicBrain, robot training data and teleoperation.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cosmicbrain.ai/newsroom" }],
  }),
  component: NewsroomPage,
});

function NewsroomPage() {
  const [publication, setPublication] = useState<Publication | "All publications">(
    "All publications",
  );
  const articles = newsArticles.filter(
    (article) => publication === "All publications" || article.publication === publication,
  );

  return (
    <div className="newsroom-page" id="top">
      <SiteHeader />
      <main>
        <header className="newsroom-hero page-width">
          <div>
            <span className="eyebrow">The CosmicBrain newsroom</span>
            <h1>
              Press coverage.
              <br />
              <em>Source reporting.</em>
            </h1>
          </div>
          <div className="newsroom-hero-note">
            <Newspaper size={30} strokeWidth={1.15} aria-hidden="true" />
            <p>
              Reporting on robot training data, teleoperation and CosmicBrain. Filter by publication
              and open the original article for its full context.
            </p>
            <span>Publisher, date and original source.</span>
          </div>
        </header>

        <section
          className="newsroom-coverage page-width"
          aria-labelledby="newsroom-coverage-heading"
        >
          <div className="newsroom-coverage-heading">
            <h2 id="newsroom-coverage-heading">In the press</h2>
            <span className="eyebrow">Original articles · Publication dates</span>
          </div>
          <div className="newsroom-filter-row">
            <div
              className="newsroom-filters"
              role="group"
              aria-label="Filter stories by publication"
            >
              {(["All publications", ...publications] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={publication === item}
                  aria-controls="newsroom-stories"
                  onClick={() => setPublication(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="newsroom-result-count" role="status" aria-live="polite">
              {articles.length} {articles.length === 1 ? "story" : "stories"}
            </span>
          </div>
          <div className="newsroom-articles" id="newsroom-stories">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} featured={index === 0} />
            ))}
          </div>
        </section>

        <section className="newsroom-contact page-width" aria-labelledby="newsroom-contact-heading">
          <div>
            <span className="eyebrow">Press contact</span>
            <h2 id="newsroom-contact-heading">Request source material.</h2>
            <p>Specify the publication, topic, interview requirements and deadline.</p>
          </div>
          <ContactDialog
            title="Submit a press inquiry."
            description="Specify your publication, reporting topic, requested source material and deadline."
            subject="A press inquiry from the CosmicBrain newsroom"
            messagePlaceholder="Publication / topic / interview or source material requested / deadline."
            trigger={
              <button type="button" className="text-link">
                Press inquiry <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            }
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
