import { ArrowUpRight, Download, Link, Mail, MapPin, PenLine } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0d0d10]">
      <div className="page-shell py-20 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111114] p-7 sm:p-12 lg:p-16">
            <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-blue-500/[0.08] blur-[90px]" />
            <div className="relative">
              <p className="eyebrow">Open channel</p>
              <h2 className="mt-8 max-w-4xl text-[clamp(2.5rem,7vw,6.4rem)] font-medium leading-[0.95] tracking-[-0.065em] text-zinc-100">
                Let&apos;s engineer what <span className="text-zinc-600">comes next.</span>
              </h2>
              <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/[0.08] pt-8 lg:flex-row lg:items-end">
                <div>
                  <a href="mailto:prathikshetty366@gmail.com" className="group inline-flex items-center gap-3 text-sm text-zinc-300 hover:text-white sm:text-base">
                    <Mail size={17} className="text-technical" /> prathikshetty366@gmail.com
                    <ArrowUpRight size={14} className="text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600"><MapPin size={12} /> Bengaluru, India</p>
                </div>
                <div className="flex gap-3">
                  <a aria-label="Download CV" title="Download CV" href="/pratheek-shetty-cv.pdf" download="Pratheek-Shetty-CV.pdf" className="grid size-10 place-items-center rounded-full border border-technical/25 bg-technical/[0.06] text-technical transition hover:border-technical/50 hover:bg-technical/[0.12]"><Download size={15} /></a>
                  <a aria-label="LinkedIn" href="https://www.linkedin.com/in/pratheek-shetty-10a173186" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-500 transition hover:border-technical/30 hover:text-technical"><Link size={15} /></a>
                  <a aria-label="Medium" href="https://pratheekshetty.medium.com" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-500 transition hover:border-technical/30 hover:text-technical"><PenLine size={15} /></a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700 sm:flex-row">
          <span>© {new Date().getFullYear()} Pratheek Shetty</span>
          <span>Distributed systems / Real-time infrastructure</span>
        </div>
      </div>
    </footer>
  );
}
