import { ArrowRight } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { newsArticles } from "./articles";
import "./newsroom.css";

export function NewsroomPreview() {
  return (
    <section className="newsroom-preview page-width" aria-labelledby="newsroom-preview-heading">
      <div className="newsroom-preview-heading">
        <div>
          <span className="eyebrow">Out in the world</span>
          <h2 id="newsroom-preview-heading">
            Part of a bigger <em>conversation.</em>
          </h2>
        </div>
        <a className="text-link" href="/newsroom">
          Visit the newsroom <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="newsroom-preview-grid">
        {newsArticles.map((article) => (
          <ArticleCard key={article.id} article={article} compact />
        ))}
      </div>
    </section>
  );
}
