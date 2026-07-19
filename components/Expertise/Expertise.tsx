import { Braces, DatabaseZap, GitBranch, Network, RadioTower, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const expertise = [
  { title: "System Design", copy: "High-availability platform architecture and durable service boundaries.", icon: Braces, code: "SYS.01" },
  { title: "Distributed Infrastructure", copy: "Fault-aware microservices engineered for high-volume production workloads.", icon: Network, code: "DST.02" },
  { title: "Real-Time Ingestion", copy: "WebSocket, MQTT, and Kafka pipelines operating at sub-second latency.", icon: RadioTower, code: "RTI.03" },
  { title: "Relational Databases", copy: "PostgreSQL modeling, indexing, normalization, and write-path optimization.", icon: DatabaseZap, code: "RDB.04" },
  { title: "Event-Driven Processing", copy: "Stream processing, CDC, Pub/Sub, and resilient asynchronous workflows.", icon: GitBranch, code: "EVT.05" },
  { title: "AI Orchestration", copy: "Enterprise knowledge systems and deterministic LangGraph agent workflows.", icon: Sparkles, code: "AIO.06" },
];

export function Expertise() {
  return (
    <section id="expertise" className="border-y border-white/[0.06] bg-[#0d0d10]">
      <div className="section-space page-shell">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="02 / Core expertise"
              title="Deep systems thinking, end to end."
              copy="From protocol edge to analytics layer, every decision is designed around latency, reliability, operability, and cost."
            />
            <Reveal delay={0.08} className="mt-10">
              <div className="hairline-card max-w-sm rounded-xl p-5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                  <span>Operating model</span>
                  <span className="text-emerald-400/80">● Production</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Design", "Build", "Scale", "Lead"].map((item) => (
                    <span key={item} className="rounded-md border border-white/[0.07] bg-black/20 px-3 py-2 font-mono text-[10px] text-zinc-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2">
            {expertise.map(({ title, copy, icon: Icon, code }, index) => (
              <Reveal key={title} delay={(index % 2) * 0.07}>
                <article className="group min-h-56 border-b border-white/[0.07] p-7 transition-colors hover:bg-white/[0.018] sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-white/[0.07]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-zinc-500 transition group-hover:border-technical/20 group-hover:text-technical">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.18em] text-zinc-700">{code}</span>
                  </div>
                  <h3 className="mt-9 text-lg font-medium tracking-[-0.025em] text-zinc-200">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
