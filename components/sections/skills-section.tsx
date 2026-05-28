"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Layers, RotateCw, AlignLeft } from "lucide-react";
import SkillsOrbit from "./skills-orbit";


const CATS = {
  Frontend: [
    { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML5",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  ],
  "UI Libs": [
    { name: "Shadcn UI",     icon: "https://ui.shadcn.com/favicon.ico" },
    { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF" },
    { name: "Radix UI",      icon: "https://cdn.simpleicons.org/radixui/161618" },
    { name: "Material UI",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
  ],
  Backend: [
    { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Socket.io",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
    { name: "GraphQL",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "REST API",   icon: "https://cdn.simpleicons.org/fastapi/009688" },
  ],
  Database: [
    { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Prisma",     icon: "https://cdn.simpleicons.org/prisma/2D3748" },
    { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  ],
  DevOps: [
    { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Vercel",      icon: "https://cdn.simpleicons.org/vercel/000000" },
    { name: "DigitalOcean",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" },
  ],
  Tools: [
    { name: "VS Code",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Postman",  icon: "https://cdn.simpleicons.org/postman/FF6C37" },
    { name: "Figma",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Stripe",   icon: "https://cdn.simpleicons.org/stripe/008CDD" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ],
};

// colour for the left border accent per category
const BORDER_CLR: Record<string, string> = {
  Frontend:  "border-l-primary",
  "UI Libs": "border-l-amber-400",
  Backend:   "border-l-green-500",
  Database:  "border-l-blue-500",
  DevOps:    "border-l-orange-500",
  Tools:     "border-l-purple-400",
};

function MarqueeRow({
  items, direction, paused,
}: {
  items: { name: string; icon: string }[];
  direction: "left" | "right";
  paused: boolean;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div
      data-paused={paused}
      className="relative overflow-hidden py-1.5"
    >
      {/* Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 z-10"
        style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 z-10"
        style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

      <div className={`flex gap-3 w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {doubled.map((sk, i) => (
          <div
            key={i}
            className="shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 w-[80px] h-[80px] hover:border-primary/50 hover:bg-primary/5 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="relative h-8 w-8">
              <Image src={sk.icon} alt={sk.name} fill className="object-contain" unoptimized />
            </div>
            <p className="text-[9px] font-semibold text-muted-foreground text-center leading-tight line-clamp-1">{sk.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [paused, setPaused] = useState(false);
  const [viewMode, setViewMode] = useState<"marquee" | "orbit">("marquee");
  const entries = Object.entries(CATS);

  return (
    <section id="skills" className="section-shell overflow-hidden">
      {/* ── Header ──────────────────────────── */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow"><Layers className="h-3 w-3" />Skills</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-3xl md:text-5xl"
        >
          Technical Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="section-subtext"
        >
          Tools &amp; technologies I use daily. Drag interactive nodes or toggle layouts below.
        </motion.p>
      </div>

      {/* ── View Selector Tabs ──────────────── */}
      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setViewMode("marquee")}
          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            viewMode === "marquee"
              ? "bg-primary border-primary text-white"
              : "bg-card border-border hover:border-primary/45 text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignLeft className="h-3.5 w-3.5" />
          Marquee List
        </button>
        <button
          onClick={() => setViewMode("orbit")}
          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            viewMode === "orbit"
              ? "bg-primary border-primary text-white"
              : "bg-card border-border hover:border-primary/45 text-muted-foreground hover:text-foreground"
          }`}
        >
          <RotateCw className="h-3.5 w-3.5 animate-[spin_40s_linear_infinite]" />
          3D Gravity Orbit
        </button>
      </div>

      {/* ── Active View Rendering ───────────── */}
      {viewMode === "marquee" ? (
        <div
          className="space-y-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {entries.map(([cat, skills], idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`flex items-center gap-3 mb-2.5 pl-3 border-l-2 ${BORDER_CLR[cat] || "border-l-primary"}`}>
                <span className="text-sm font-bold text-foreground">{cat}</span>
                <span className="text-xs text-muted-foreground">{skills.length}</span>
              </div>
              <MarqueeRow items={skills} direction={idx % 2 === 0 ? "left" : "right"} paused={paused} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SkillsOrbit />
        </motion.div>
      )}
    </section>
  );
}
