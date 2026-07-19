import { Building2, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const roles = [
  {
    company: "Simple Energy",
    role: "Technical Lead",
    period: "Mar 2022 — Present",
    subtitle: "Connected vehicle platform powering real-time telemetry, OTA updates, and analytics infrastructure for thousands of production electric vehicles.",
    details: [
      ["Platform strategy", "Own the architectural lifecycle and high-level system design for large-scale telemetry ingestion and real-time analytics."],
      ["Stream ingestion", "Designed dual-pipeline infrastructure with Kafka, EMQX MQTT, WebSockets, and Flink for sub-second vehicle analytics."],
      ["Transactional data", "Engineered normalized PostgreSQL stores, high-volume write paths, and fault-tolerant storage tiering."],
      ["Enterprise AI", "Architected a generative AI knowledge platform across Redshift, AWS DMS, S3, LangGraph, and LLM orchestration."],
      ["Integration architecture", "Built a low-latency connector layer for LMS and Salesforce, streaming CDC updates from RDS to CRM endpoints."],
      ["Platform leadership", "Established Node.js service patterns, architecture reviews, CI/CD safeguards, and frontend strategy across critical internal tools."],
    ],
  },
  {
    company: "Tech Active",
    role: "Software Engineer",
    period: "Oct 2021 — Feb 2022",
    subtitle: "Product and platform engineering across licensing, contract collaboration, and real-time logistics systems.",
    details: [
      ["Product architecture", "Designed backend APIs and scalable database schemas for an audio licensing and contract collaboration ecosystem."],
      ["Dispatch integrations", "Built Next.js and WebSocket service flows linking live driver status with automated billing workflows."],
      ["Performance tuning", "Optimized PostgreSQL indexes and server-side caching for consistent response times under heavy multi-tenant traffic."],
    ],
  },
  {
    company: "Filmyscoop",
    role: "Frontend Developer",
    period: "Apr 2020 — Sep 2021",
    subtitle: "IoT-enabled products and reusable interface systems delivered from concept to production.",
    details: [
      ["IoT platforms", "Engineered backend interfaces and web controls for a smart lighting platform, shipping the product within two months."],
      ["UI standardization", "Built modular React components with deliberate client-state management, responsive layouts, and asset performance."],
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-y border-white/[0.06] bg-[#0d0d10]">
      <div className="section-space page-shell">
        <SectionHeader
          index="04 / Experience"
          title="Building the systems beneath the product."
          copy="Six-plus years moving from interface engineering to ownership of business-critical distributed platforms and cross-functional technical strategy."
        />
        <div className="mt-16">
          {roles.map((item, index) => (
            <Reveal key={item.company}>
              <article className="grid border-t border-white/[0.08] py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-16">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-zinc-700">0{index + 1}</span>
                  <h3 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-zinc-100">{item.role}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-technical">
                    <Building2 size={14} strokeWidth={1.5} /> {item.company}
                  </p>
                  <div className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                    <p>{item.period}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={11} /> Bengaluru, India</p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <p className="max-w-3xl border-l border-technical/30 pl-5 text-sm italic leading-7 text-zinc-400">{item.subtitle}</p>
                  <div className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    {item.details.map(([title, copy]) => (
                      <div key={title}>
                        <h4 className="text-sm font-medium text-zinc-300">{title}</h4>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
