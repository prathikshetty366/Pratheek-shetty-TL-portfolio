import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { BlogFooter } from "@/components/Blog/BlogFooter";
import { Navbar } from "@/components/Navbar/Navbar";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — Pratheek Shetty",
  description:
    "Long-form essays on distributed systems, backend architecture, real-time infrastructure, and lessons from production.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main className="blog-index">
        <section className="page-shell pb-16 pt-36 sm:pb-20 sm:pt-44">
          <div className="max-w-3xl">
            <p className="eyebrow">Writing / Field notes</p>
            <h1 className="mt-7 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.065em] text-zinc-100">
              Ideas, tested <span className="text-zinc-600">in production.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
              Deep dives into the trade-offs, failure modes, and architecture decisions behind resilient systems.
            </p>
          </div>
        </section>

        <section className="page-shell pb-28">
          <div className="border-t border-white/[0.08]">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-7 border-b border-white/[0.08] py-9 transition sm:grid-cols-[70px_1fr_auto] sm:items-center sm:py-11"
              >
                <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
                    <span className="text-technical">{post.category}</span>
                    <span>•</span>
                    <span>{post.displayDate}</span>
                    <span className="flex items-center gap-1.5"><Clock3 size={10} /> {post.readingTime}</span>
                  </div>
                  <h2 className="max-w-3xl text-xl font-medium leading-snug tracking-[-0.03em] text-zinc-200 transition group-hover:text-white sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{post.excerpt}</p>
                </div>
                <span className="grid size-11 place-items-center rounded-full border border-white/10 text-zinc-600 transition group-hover:border-technical/30 group-hover:bg-technical/[0.06] group-hover:text-technical">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-700">
            <BookOpen size={12} /> More field notes are being written
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}

