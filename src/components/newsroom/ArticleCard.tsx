import { useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { NewsArticle } from "./articles";

function ArticlePreview({ article, featured }: { article: NewsArticle; featured: boolean }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="newsroom-publication-art">
      {unavailable ? (
        <div className="newsroom-preview-unavailable">
          <ImageOff size={24} strokeWidth={1.25} aria-hidden="true" />
          <span>Preview unavailable</span>
          <small>Read the story on {article.publication}</small>
        </div>
      ) : (
        <img
          className="newsroom-source-image"
          src={article.image.src}
          alt={article.image.alt}
          loading={featured ? "eager" : "lazy"}
          fetchPriority={featured ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}

export function ArticleCard({
  article,
  featured = false,
  compact = false,
}: {
  article: NewsArticle;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={`newsroom-card${featured ? " newsroom-card-featured" : ""}${compact ? " newsroom-card-compact" : ""}`}
    >
      <a
        className="newsroom-card-link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={`${compact ? "preview-" : ""}${article.id}-title`}
        aria-describedby={`${compact ? "preview-" : ""}${article.id}-external`}
      >
        <ArticlePreview article={article} featured={featured} />
        <div className="newsroom-card-copy">
          <div className="newsroom-card-meta">
            <span className={`newsroom-publisher newsroom-publisher-${article.theme}`}>
              {article.publication}
            </span>
            {article.date && <time dateTime={article.date}>{article.dateLabel}</time>}
          </div>
          <h3 id={`${compact ? "preview-" : ""}${article.id}-title`}>{article.title}</h3>
          <p>{article.description}</p>
          <div className="newsroom-card-bottom">
            <span>By {article.author}</span>
            <span className="newsroom-read-link">
              Read the story <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </div>
          <span className="sr-only" id={`${compact ? "preview-" : ""}${article.id}-external`}>
            Opens on {article.publication} in a new tab.
          </span>
        </div>
      </a>
    </article>
  );
}
