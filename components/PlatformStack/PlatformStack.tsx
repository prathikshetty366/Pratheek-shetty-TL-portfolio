import { Cloud, Code2, Database, PanelsTopLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const groups = [
  {
    title: "Data & Streaming",
    icon: Database,
    skills: ["Kafka", "Apache Flink", "Apache Spark", "EMQX / MQTT", "WebSockets", "Apache Pinot", "ClickHouse", "Redis", "PostgreSQL", "Amazon Redshift", "AWS DMS", "Delta Lake"],
  },
  {
    title: "Backend & AI",
    icon: Code2,
    skills: ["Node.js", "TypeScript", "Express.js", "GraphQL", "REST APIs", "LangGraph", "LLM Orchestration", "System Design", "SOLID Principles", "Electron.js"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS EC2 / ECS", "AWS Lambda", "Cognito", "IoT Core", "S3 / RDS", "SNS / SQS", "GCP / GKE", "Compute Engine", "CI/CD", "Infrastructure as Code"],
  },
  {
    title: "Frontend Layer",
    icon: PanelsTopLeft,
    skills: ["React.js", "Next.js", "Redux", "D3.js", "Micro-Frontends", "Responsive UI", "Material UI", "Analytics Dashboards"],
  },
];

export function PlatformStack() {
  return (
    <section className="section-space page-shell" aria-labelledby="stack-title">
      <SectionHeader
        index="03 / Platform stack"
        title="A production-tested technical matrix."
        copy="A pragmatic toolset spanning streaming infrastructure, cloud platforms, intelligent backend systems, and the interfaces that operate them."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {groups.map(({ title, skills, icon: Icon }, index) => (
          <Reveal key={title} delay={index * 0.05}>
            <article className="hairline-card group h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-black/20 text-zinc-500 group-hover:text-technical">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <h3 className="text-base font-medium tracking-[-0.02em] text-zinc-200">{title}</h3>
                <span className="ml-auto font-mono text-[9px] tracking-[0.15em] text-zinc-700">0{index + 1}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-white/[0.07] bg-white/[0.018] px-3 py-2 text-xs text-zinc-500 transition hover:border-technical/20 hover:bg-technical/[0.035] hover:text-zinc-200">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
