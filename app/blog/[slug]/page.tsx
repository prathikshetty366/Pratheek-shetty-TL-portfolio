import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { BlogFooter } from "@/components/Blog/BlogFooter";
import { BlogVisual, DatabaseScalingVisual } from "@/components/Blog/BlogVisual";
import { extractHeadings, MarkdownArticle } from "@/components/Blog/MarkdownArticle";
import { ReadingProgress } from "@/components/Blog/ReadingProgress";
import { Navbar } from "@/components/Navbar/Navbar";
import { blogPosts, getBlogPost, getBlogPostContent } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Pratheek Shetty`,
    description: post.excerpt,
    authors: [{ name: "Pratheek Shetty" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const markdown = getBlogPostContent(slug);
  const headings = extractHeadings(markdown).filter((heading) => heading.level === 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Pratheek Shetty" },
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <header className="page-shell pb-14 pt-32 sm:pb-20 sm:pt-40">
          <Link href="/blog" className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600 transition hover:text-zinc-300">
            <ArrowLeft size={13} className="transition group-hover:-translate-x-1" /> All writing
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                <span className="text-technical">{post.category}</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>{post.displayDate}</time>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Clock3 size={11} /> {post.readingTime}</span>
              </div>
              <h1 className="mt-7 max-w-4xl text-[clamp(2.75rem,6.3vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.06em] text-zinc-100">
                {post.headline} <span className="text-zinc-600">{post.headlineAccent}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
                {post.dek}
              </p>
            </div>
            <div className="self-end border-l border-white/[0.08] pl-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-700">Written by</p>
              <p className="mt-3 text-sm font-medium text-zinc-300">Pratheek Shetty</p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">Technical Lead · Distributed systems</p>
            </div>
          </div>
        </header>

        <div className="page-shell">
          {post.visual === "database-scaling" ? <DatabaseScalingVisual /> : <BlogVisual />}
        </div>

        <div className="page-shell grid items-start gap-14 py-20 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-center lg:gap-20 lg:py-28">
          <aside className="article-toc lg:sticky lg:top-28">
            <p>In this article</p>
            <nav aria-label="Table of contents">
              {headings.map((heading, index) => (
                <a href={`#${heading.id}`} key={heading.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{heading.text}
                </a>
              ))}
            </nav>
          </aside>
          <article>
            <MarkdownArticle markdown={markdown} />
            <div className="article-signoff">
              <span>PS</span>
              <div>
                <p>Thanks for reading.</p>
                <p>More notes on systems that survive the real world.</p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
