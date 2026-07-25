import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0d0d10]">
      <div className="page-shell flex flex-col justify-between gap-8 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-zinc-300">Pratheek Shetty</p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700">
            Distributed systems / Real-time infrastructure
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-zinc-500">
          <Link href="/#writing" className="transition hover:text-zinc-200">Portfolio</Link>
          <a href="mailto:prathikshetty366@gmail.com" className="group flex items-center gap-1.5 transition hover:text-zinc-200">
            Get in touch <ArrowUpRight size={12} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
