export type Publication = "TechCrunch" | "IBM Think";

export interface NewsArticle {
  id: string;
  publication: Publication;
  theme: "techcrunch" | "ibm";
  title: string;
  description: string;
  author: string;
  date?: string;
  dateLabel?: string;
  url: string;
  domain: string;
  image: {
    src: string;
    alt: string;
  };
}

export const newsArticles: NewsArticle[] = [
  {
    id: "ibm-pivotal-year-robotics",
    publication: "IBM Think",
    theme: "ibm",
    title: "Why 2025 is a pivotal year for robotics",
    description:
      "Anabelle Nicoud explores robotics with Anto and CosmicBrain, including the training data and skills behind useful robots.",
    author: "Anabelle Nicoud",
    url: "https://www.ibm.com/think/news/why-2025-is-pivotal-year-for-robotics",
    domain: "ibm.com/think",
    image: {
      src: "https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/creative-assets/ibs/ul/g/42/5a/2022_05_10_SpencerLowell_WorkingWorld_MM8612_190830_03750.jpg/_jcr_content/renditions/cq5dam.thumbnail.1280.1280.png",
      alt: "People and humanoid robots working together on an assembly line.",
    },
  },
  {
    id: "techcrunch-startup-battlefield",
    publication: "TechCrunch",
    theme: "techcrunch",
    title:
      "The 16 top logistics, manufacturing, materials startups from Disrupt Startup Battlefield",
    description: "CosmicBrain in the Startup Battlefield selection.",
    author: "Julie Bort",
    date: "2026-01-02",
    dateLabel: "January 2, 2026",
    url: "https://techcrunch.com/2026/01/02/the-16-top-logistics-manufacturing-materials-startups-from-disrupt-startup-battlefield/",
    domain: "techcrunch.com",
    image: {
      src: "https://techcrunch.com/wp-content/uploads/2025/12/Startup-stars.jpg?resize=1200,675",
      alt: "Colorful stars.",
    },
  },
];

export const publications: Publication[] = ["IBM Think", "TechCrunch"];
