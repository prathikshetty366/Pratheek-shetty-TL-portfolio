import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const articles = [
  {
    title: "Building a Production-Grade Support AI Agent",
    category: "AI Systems",
    date: "2026",
    href: "https://pratheekshetty.medium.com/building-a-production-grade-support-ai-agent-9dfd4511622e",
  },
  {
    title: "Evolving Our Connected Vehicle Data Platform: Smart Dual-Pipeline Architecture",
    category: "Data Architecture",
    date: "2025",
    href: "https://pratheekshetty.medium.com/evolving-our-connected-vehicle-data-platform-from-real-time-everything-to-smart-dual-pipeline-0e5c45f7b191",
  },
  {
    title: "Building a Scalable Connected Vehicle Platform with HMI, EMQX, Kafka, Flink, and Pinot",
    category: "Distributed Systems",
    date: "2025",
    href: "https://pratheekshetty.medium.com/building-a-scalable-connected-vehicle-platform-with-hmi-emqx-kafka-flink-and-pinot-d3fe4991d438",
  },
  {
    title: "Apache Pinot Optimization for Real-Time IoT Telemetry Analytics",
    category: "Real-Time Analytics",
    date: "2025",
    href: "https://pratheekshetty.medium.com/our-journey-with-apache-pinot-overcoming-oom-errors-and-optimizing-real-time-analytics-for-iot-ff9a576972a8",
  },
  {
    title: "Handling Millions of Notifications at Scale",
    category: "Event-Driven Systems",
    date: "2024",
    href: "https://pratheekshetty.medium.com/handling-millions-of-notifications-at-scale-109f7926e78e",
  },
  {
    title: "The Tale of Node.js: Call Stack and Event Loop",
    category: "Runtime Mechanics",
    date: "2025",
    href: "https://pratheekshetty.medium.com/the-tale-of-node-js-call-stack-and-event-loop-f655b4f025fa",
  },
];

export function Writing() {
  return (
    <section id="writing" className="section-space page-shell">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeader
          index="05 / Technical writing"
          title="Field notes from production."
          copy="Long-form breakdowns of the trade-offs, failure modes, and architecture decisions behind real-world systems."
        />
        <a href="https://pratheekshetty.medium.com" target="_blank" rel="noreferrer" className="group flex shrink-0 items-center gap-2 text-xs text-zinc-500 hover:text-zinc-200">
          View all on Medium <ArrowUpRight size={14} className="group-hover:text-technical" />
        </a>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.title} delay={(index % 3) * 0.05}>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="hairline-card group flex min-h-[280px] flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-technical/20 hover:shadow-glow sm:p-7"
            >
              <div className="flex items-center justify-between">
                <BookOpen size={17} strokeWidth={1.5} className="text-zinc-600 transition group-hover:text-technical" />
                <ArrowUpRight size={16} className="text-zinc-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300" />
              </div>
              <h3 className="mt-10 text-lg font-medium leading-7 tracking-[-0.025em] text-zinc-200">{article.title}</h3>
              <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5 font-mono text-[9px] uppercase tracking-[0.13em] text-zinc-600">
                <span>{article.category}</span>
                <span className="flex items-center gap-1.5"><Clock3 size={11} /> {article.date}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
