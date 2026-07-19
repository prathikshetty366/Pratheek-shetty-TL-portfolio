"use client";

import { ArrowDown, ArrowUpRight, Download, Link, Mail, MapPin, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { label: "Email", href: "mailto:prathikshetty366@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pratheek-shetty-10a173186", icon: Link },
  { label: "Medium", href: "https://pratheekshetty.medium.com", icon: PenLine },
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden border-b border-white/[0.06] pt-16">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/[0.055] blur-[120px]" />
      <div className="page-shell relative flex min-h-[calc(92vh-4rem)] flex-col justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.055] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for high-impact architecture
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
            <MapPin size={12} /> Bengaluru, India
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mb-6 text-sm font-medium tracking-[-0.01em] text-technical"
        >
          Technical Lead — Distributed Systems &amp; Real-Time Data Infrastructure
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[clamp(3.8rem,10vw,8.6rem)] font-medium leading-[0.84] tracking-[-0.075em] text-zinc-100"
        >
          Pratheek
          <br />
          <span className="text-zinc-500">Shetty.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
              Architecting core backend engines, real-time telemetry systems, and enterprise data lakes handling <span className="text-zinc-100">planet-scale workloads.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/pratheek-shetty-cv.pdf"
                download="Pratheek-Shetty-CV.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-technical/30 bg-technical/[0.09] px-4 py-2.5 text-xs font-medium text-zinc-100 transition hover:-translate-y-0.5 hover:border-technical/50 hover:bg-technical/[0.14]"
              >
                <Download size={14} className="text-technical" />
                Download CV
              </a>
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111114] px-4 py-2.5 text-xs text-zinc-300 transition hover:-translate-y-0.5 hover:border-technical/30 hover:text-white"
                >
                  <Icon size={14} className="text-zinc-500 transition group-hover:text-technical" />
                  {label}
                  <ArrowUpRight size={12} className="text-zinc-600" />
                </a>
              ))}
            </div>
          </div>
          <a href="#impact" className="hidden items-center gap-3 text-xs text-zinc-600 transition hover:text-zinc-300 lg:flex">
            Scroll to inspect
            <span className="grid size-9 place-items-center rounded-full border border-white/10">
              <ArrowDown size={14} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
