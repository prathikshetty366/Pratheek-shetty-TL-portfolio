"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowDownRight, BellRing, Database, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: 44, prefix: "▼ ", suffix: "%", label: "Cloud infrastructure cost reduction", note: "Storage tiering & consolidation", icon: ArrowDownRight },
  { value: 500, prefix: "", suffix: "B+", label: "Analytical records maintained", note: "Apache Pinot, sub-second analytics", icon: Database },
  { value: null, display: "Millions/Day", label: "Notification throughput", note: "WebSockets & Pub/Sub", icon: BellRing },
  { value: 23, prefix: "", suffix: " Engineers", label: "Cross-functional matrix team", note: "6 engineering disciplines", icon: Users },
];

function Counter({ value, prefix = "", suffix = "", display }: { value: number | null; prefix?: string; suffix?: string; display?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{display ?? `${prefix}${count}${suffix}`}</span>;
}

export function Metrics() {
  return (
    <section id="impact" className="section-space page-shell">
      <SectionHeader
        index="01 / Impact matrix"
        title="Architecture measured in outcomes."
        copy="Production infrastructure engineered for meaningful efficiency, dependable throughput, and durable scale."
      />
      <div className="mt-14 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Reveal key={metric.label} delay={index * 0.06} className="h-full">
              <article className="group relative flex h-full min-h-64 flex-col p-6 transition-colors hover:bg-white/[0.025] sm:p-7 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/[0.07] sm:[&:not(:last-child)]:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-white/[0.07] lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-white/[0.07]">
                <div className="mb-auto flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-600">0{index + 1}</span>
                  <Icon size={17} strokeWidth={1.5} className="text-zinc-600 transition-colors group-hover:text-technical" />
                </div>
                <p className="mt-12 whitespace-nowrap text-[clamp(2rem,3.2vw,3.3rem)] font-medium tracking-[-0.055em] text-zinc-100">
                  <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} display={metric.display} />
                </p>
                <h3 className="mt-4 text-sm font-medium text-zinc-300">{metric.label}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-600">{metric.note}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
