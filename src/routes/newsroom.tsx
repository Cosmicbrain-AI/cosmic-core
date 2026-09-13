import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/newsroom/ArticleCard";
import { newsArticles, publications, type Publication } from "@/components/newsroom/articles";
import "@/components/newsroom/newsroom.css";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom · CosmicBrain in the conversation" },
      {
        name: "description",
        content:
          "Read coverage of CosmicBrain, robotics, and the people building physical intelligence in TechCrunch, IBM Think, and Rest of World.",
      },
      { property: "og:title", content: "Newsroom · CosmicBrain" },
      { property: "og:url", content: "https://www.cosmicbrain.ai/newsroom" },
      {
        property: "og:description",
        content: "Stories, perspectives, and a wider conversation about useful robots.",
      },
      { name: "twitter:title", content: "Newsroom · CosmicBrain" },
      { name: "twitter:url", content: "https://www.cosmicbrain.ai/newsroom" },
      {
        name: "twitter:description",
        content: "Stories, perspectives, and a wider conversation about useful robots.",
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
              A few stories.
              <br />
              <em>A wider conversation.</em>
            </h1>
          </div>
          <div className="newsroom-hero-note">
            <Newspaper size={30} strokeWidth={1.15} aria-hidden="true" />
            <p>
              Robotics is a shared story. Here are a few perspectives on the work, the people, and
              the questions moving it forward.
            </p>
            <span>From our workshop to the wider world.</span>
          </div>
        </header>

        <section
          className="newsroom-coverage page-width"
          aria-labelledby="newsroom-coverage-heading"
        >
          <div className="newsroom-coverage-heading">
            <h2 id="newsroom-coverage-heading">In the press</h2>
            <span className="eyebrow">Independent reporting · Open perspectives</span>
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
            <span className="eyebrow">Keep the conversation going</span>
            <h2 id="newsroom-contact-heading">Working on a story?</h2>
            <p>For press questions, interviews, or a closer look at CosmicBrain, say hello.</p>
          </div>
          <a className="text-link" href="mailto:hello@cosmicbrainai.com">
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
