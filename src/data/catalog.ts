import robotsJson from "./robots.json";
import brandsJson from "./brands.json";

export type Robot = {
  slug: string;
  name: string;
  manufacturer: string | null;
  manufacturerSite: string | null;
  summary: string | null;
  description: string;
  image: string | null;
  families: { name: string; slug: string }[];
  formFactor: string | null;
  availability: "In Stock" | "Preorder" | "Coming Soon" | null;
  specs: {
    dof: number | null;
    heightCm: number | null;
    weightKg: number | null;
    payloadKg: number | null;
    speedMs: number | null;
  };
  tags: string[];
  sources: string[];
};

export type Brand = {
  slug: string;
  name: string;
  logo: string | null;
  description: string | null;
  country: string | null;
  countryCode: string | null;
  founded: number | null;
  sector: string | null;
  status: string | null;
  robotCount: number | null;
  topProducts: string[];
  website: string | null;
};

export const robots = robotsJson as Robot[];
export const brands = brandsJson as Brand[];

export const families = [
  ...new Map(
    robots.flatMap((r) => r.families).map((f) => [f.slug, f]),
  ).values(),
].sort((a, b) => a.name.localeCompare(b.name));

export function getRobot(slug: string) {
  return robots.find((r) => r.slug === slug);
}

export function robotsForTags(tags: string[], limit = 8): Robot[] {
  const scored = robots
    .map((r) => {
      const hay = [
        ...r.tags,
        ...r.families.map((f) => f.slug),
        r.formFactor ?? "",
      ].join(" ");
      const score = tags.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.r.image ? -1 : 1));
  return scored.slice(0, limit).map((x) => x.r);
}
