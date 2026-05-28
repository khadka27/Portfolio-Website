"use client";

import { motion } from "framer-motion";

interface TechMilestone {
  year: string;
  label: string;
  techs: { name: string; color: string }[];
  highlight?: boolean;
}

const TIMELINE: TechMilestone[] = [
  {
    year: "2022",
    label: "Getting Started",
    techs: [
      { name: "HTML5", color: "bg-orange-500" },
      { name: "CSS3", color: "bg-blue-500" },
      { name: "JavaScript", color: "bg-yellow-500" },
      { name: "Git", color: "bg-red-500" },
    ],
  },
  {
    year: "2023",
    label: "Frontend Foundations",
    techs: [
      { name: "React", color: "bg-sky-500" },
      { name: "TypeScript", color: "bg-blue-600" },
      { name: "Tailwind CSS", color: "bg-teal-500" },
      { name: "Node.js", color: "bg-green-600" },
      { name: "MongoDB", color: "bg-green-500" },
    ],
  },
  {
    year: "2024",
    label: "Full-Stack & Production",
    highlight: true,
    techs: [
      { name: "Next.js", color: "bg-gray-700" },
      { name: "PostgreSQL", color: "bg-blue-700" },
      { name: "Prisma", color: "bg-slate-600" },
      { name: "Socket.io", color: "bg-black" },
      { name: "Docker", color: "bg-blue-500" },
      { name: "AWS", color: "bg-amber-600" },
      { name: "Stripe", color: "bg-purple-600" },
    ],
  },
  {
    year: "2025",
    label: "Advanced Systems",
    techs: [
      { name: "Redis", color: "bg-red-600" },
      { name: "GraphQL", color: "bg-pink-600" },
      { name: "Vercel", color: "bg-gray-800" },
      { name: "Framer Motion", color: "bg-blue-500" },
      { name: "Shadcn UI", color: "bg-slate-700" },
    ],
  },
  {
    year: "2026",
    label: "AI & Edge",
    highlight: true,
    techs: [
      { name: "WebLLM", color: "bg-primary" },
      { name: "LangChain", color: "bg-emerald-600" },
      { name: "Edge Functions", color: "bg-indigo-600" },
      { name: "Three.js", color: "bg-gray-600" },
    ],
  },
];

export default function TechTimeline() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="relative">
        {/* Vertical center line */}
        <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent -translate-x-1/2" />

        <div className="space-y-8">
          {TIMELINE.map((milestone, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-4 sm:gap-0 ${isRight ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                {/* Content side */}
                <div className={`flex-1 pl-16 sm:pl-0 ${isRight ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                  <div className={`card-base p-4 inline-block w-full ${milestone.highlight ? "border-primary/40 bg-primary/5" : ""}`}>
                    <div className={`flex items-center gap-2 mb-3 ${isRight ? "sm:justify-end" : "sm:justify-start"}`}>
                      <span className="text-lg font-black orange-text">{milestone.year}</span>
                      {milestone.highlight && (
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest border border-primary/30 rounded-full px-2 py-0.5 bg-primary/8">
                          Key milestone
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">{milestone.label}</p>
                    <div className={`flex flex-wrap gap-1.5 ${isRight ? "sm:justify-end" : "sm:justify-start"}`}>
                      {milestone.techs.map((tech) => (
                        <span
                          key={tech.name}
                          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold bg-card border border-border rounded-full px-2.5 py-1 text-foreground`}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tech.color}`} />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-[28px] sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div
                    className={`w-5 h-5 rounded-full border-2 ${milestone.highlight ? "border-primary bg-primary" : "border-primary bg-background"} shadow-md`}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  />
                </div>

                {/* Empty opposite side on desktop */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
