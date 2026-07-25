import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  displayDate: string;
  readingTime: string;
  headline: string;
  headlineAccent: string;
  dek: string;
  visual: "transactions" | "database-scaling";
  sourceUrl?: string;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "distributed-transactions-2pc-saga-pattern",
    title: "Distributed Transactions in Microservices: From 2PC to the Saga Pattern",
    excerpt:
      "A practical guide to consistency across services—how two-phase commit works, where it breaks down, and why modern systems often reach for sagas.",
    category: "Distributed Systems",
    publishedAt: "2026-07-25",
    displayDate: "Jul 25, 2026",
    readingTime: "12 min read",
    headline: "Distributed transactions",
    headlineAccent: "in microservices.",
    dek: "From the rigid guarantees of two-phase commit to the flexible, failure-aware workflows of the Saga pattern.",
    visual: "transactions",
    featured: true,
  },
  {
    slug: "how-databases-scale",
    title: "How Databases Scale: A Practical Roadmap from One Server to Sharding",
    excerpt:
      "A practical scaling ladder—from query tuning and vertical scaling to replicas, partitioning, federation, and sharding.",
    category: "Database Architecture",
    publishedAt: "2026-07-19",
    displayDate: "Jul 19, 2026",
    readingTime: "20 min read",
    headline: "How databases scale",
    headlineAccent: "from one server to sharding.",
    dek: "An ordered roadmap for increasing capacity without taking on distributed-system complexity before you actually need it.",
    visual: "database-scaling",
    sourceUrl:
      "https://medium.com/@pratheekshetty/how-databases-scale-a-practical-roadmap-from-one-server-to-sharding-8fb2eb3672dd",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  return fs.readFileSync(filePath, "utf8");
}
