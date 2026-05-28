"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Next.js", "React", "TypeScript", "Node.js",
  "MongoDB", "PostgreSQL", "TailwindCSS", "Git",
  "Docker", "AWS", "Socket.io", "Prisma",
];

// Double for seamless loop
const DOUBLED = [...SKILLS, ...SKILLS];

export default function SkillsBarSection() {
  return (
    <div className="section-line py-8 overflow-hidden">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5">
        Core Technologies
      </p>

      {/* Marquee strip */}
      <div className="relative overflow-hidden" aria-hidden>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

        <div className="flex gap-3 marquee-left w-max">
          {DOUBLED.map((s, i) => (
            <span
              key={i}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-200 cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
