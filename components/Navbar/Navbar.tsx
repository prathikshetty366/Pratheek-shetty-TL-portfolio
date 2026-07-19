"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  ["Impact", "#impact"],
  ["Expertise", "#expertise"],
  ["Experience", "#experience"],
  ["Writing", "#writing"],
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl"
    >
      <nav className="page-shell flex h-16 items-center justify-between" aria-label="Main navigation">
        <a href="#top" className="flex items-center gap-3" aria-label="Pratheek Shetty, home">
          <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[11px] font-semibold text-white">
            PS
          </span>
          <span className="hidden text-sm font-medium tracking-[-0.01em] text-zinc-300 sm:block">Pratheek Shetty</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-xs text-zinc-500 transition-colors hover:text-zinc-100">
              {label}
            </a>
          ))}
        </div>
        <a
          href="mailto:prathikshetty366@gmail.com"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
        >
          Start a conversation
          <ArrowUpRight size={13} className="text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-technical" />
        </a>
      </nav>
    </motion.header>
  );
}
