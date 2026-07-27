import { createFileRoute } from "@tanstack/react-router";

import { robots } from "@/data/catalog";
import { solutions } from "@/data/solutions";

const BASE_URL = "https://www.cosmicbrain.ai";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/sales", changefreq: "weekly", priority: "0.9" },
          { path: "/catalog", changefreq: "weekly", priority: "0.8" },
          { path: "/brands", changefreq: "weekly", priority: "0.7" },
          { path: "/solutions", changefreq: "weekly", priority: "0.8" },
          ...solutions.map((s) => ({
            path: `/solutions/${s.slug}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
          ...robots.map((r) => ({
            path: `/catalog/${r.slug}`,
            changefreq: "monthly" as const,
            priority: "0.5",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
