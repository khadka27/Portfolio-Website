"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Target, Lightbulb, Code2, ExternalLink, Github } from "lucide-react";

interface CaseStudy {
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: { metric: string; label: string }[];
  stack: string[];
  github?: string;
  live?: string;
  color: string;
}

// Map repo names → case study data (add/edit as needed)
export const CASE_STUDIES: Record<string, CaseStudy> = {
  default: {
    name: "Portfolio Website",
    tagline: "Interactive developer portfolio with 15+ micro-features",
    description: "A premium full-stack portfolio built with Next.js 15, featuring real-time components, interactive games, and dynamic data fetching.",
    problem: "Most developer portfolios are static and fail to demonstrate real engineering depth. Visitors leave without understanding what the developer is actually capable of building.",
    solution: "Built a living, breathing portfolio that functions as a product itself — featuring a retro arcade, achievements, real-time GitHub data, 3D orbit, and full theme customization.",
    impact: [
      { metric: "15+", label: "Interactive Features" },
      { metric: "99", label: "Lighthouse Score" },
      { metric: "< 1s", label: "First Load" },
    ],
    stack: ["Next.js 15", "TypeScript", "Framer Motion", "Tailwind CSS", "EmailJS"],
    github: "https://github.com/khadka27",
    live: "#",
    color: "from-orange-500/20 to-amber-500/10",
  },
  "real-time-chat": {
    name: "Real-Time Chat Platform",
    tagline: "WebSocket-powered messaging with rooms and notifications",
    description: "A full-stack real-time chat application supporting multiple rooms, live typing indicators, and push notifications.",
    problem: "Clients needed an internal communication tool that could handle thousands of concurrent connections without degrading performance.",
    solution: "Designed a scalable Socket.io architecture with Redis pub/sub for horizontal scaling, JWT auth for secure sessions, and optimistic UI updates for zero-latency feel.",
    impact: [
      { metric: "1000+", label: "Concurrent Users" },
      { metric: "< 50ms", label: "Message Latency" },
      { metric: "99.9%", label: "Uptime" },
    ],
    stack: ["Node.js", "Socket.io", "Redis", "MongoDB", "React", "JWT"],
    github: "https://github.com/khadka27",
    color: "from-blue-500/20 to-indigo-500/10",
  },
};

interface Props {
  repoName: string;
  open: boolean;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ repoName, open, onClose }: Props) {
  const study = CASE_STUDIES[repoName] || { ...CASE_STUDIES.default, name: repoName };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90000] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full sm:max-w-2xl bg-background border border-border/80 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {/* Header gradient */}
            <div className={`h-2 w-full bg-gradient-to-r ${study.color || "from-primary/60 to-amber-400/60"}`} />

            {/* Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border/40">
              <div>
                <h2 className="font-extrabold text-foreground text-xl leading-tight">{study.name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{study.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-4 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{study.description}</p>

              {/* Problem / Solution */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-red-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Problem</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{study.problem}</p>
                </div>
                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-400">Solution</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{study.solution}</p>
                </div>
              </div>

              {/* Impact metrics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Impact</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {study.impact.map((imp) => (
                    <div key={imp.label} className="card-base p-3 text-center">
                      <div className="text-2xl font-black orange-text leading-none">{imp.metric}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-semibold uppercase tracking-wide">{imp.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-5 sm:p-6 border-t border-border/40 flex gap-3">
              {study.github && (
                <a href={study.github} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center py-2.5 text-sm">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {study.live && study.live !== "#" && (
                <a href={study.live} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center py-2.5 text-sm">
                  Live Demo <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
