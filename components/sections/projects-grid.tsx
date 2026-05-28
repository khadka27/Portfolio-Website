"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./project-card";
import { LayoutGrid, Cpu, Globe, CreditCard } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  homepage: string | null;
  topics: string[];
}

interface ProjectsGridProps {
  repos: Repo[];
}

type FilterType = "All" | "Frontend" | "Backend" | "FinTech";

export default function ProjectsGrid({ repos }: ProjectsGridProps) {
  const [filter, setFilter] = useState<FilterType>("All");

  // Helper matching functions for dynamic categorization
  const isFrontend = (r: Repo) =>
    ["javascript", "typescript", "html", "css"].includes(r.language?.toLowerCase() || "") ||
    r.topics?.some((t) => ["frontend", "react", "nextjs", "tailwind", "ui", "css"].includes(t.toLowerCase()));

  const isBackend = (r: Repo) =>
    ["python", "java", "go", "php"].includes(r.language?.toLowerCase() || "") ||
    r.topics?.some((t) => ["backend", "api", "express", "node", "database", "postgresql", "mongodb", "prisma", "server", "socketio"].includes(t.toLowerCase())) ||
    r.name.toLowerCase().includes("api") ||
    r.name.toLowerCase().includes("chat") ||
    (r.description?.toLowerCase().includes("api") ?? false) ||
    (r.description?.toLowerCase().includes("backend") ?? false);

  const isFinTech = (r: Repo) =>
    r.topics?.some((t) => ["payment", "stripe", "checkout", "commerce", "khalti", "esewa"].includes(t.toLowerCase())) ||
    r.name.toLowerCase().includes("pay") ||
    r.name.toLowerCase().includes("shop") ||
    (r.description?.toLowerCase().includes("stripe") ?? false) ||
    (r.description?.toLowerCase().includes("khalti") ?? false) ||
    (r.description?.toLowerCase().includes("payment") ?? false);

  // Filter logic
  const filteredRepos = repos.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Frontend") return isFrontend(r);
    if (filter === "Backend") return isBackend(r);
    if (filter === "FinTech") return isFinTech(r);
    return true;
  });

  const filterTabs = [
    { id: "All", label: "All Works", icon: LayoutGrid, count: repos.length },
    { id: "Frontend", label: "Frontend", icon: Globe, count: repos.filter(isFrontend).length },
    { id: "Backend", label: "Backend / API", icon: Cpu, count: repos.filter(isBackend).length },
    { id: "FinTech", label: "FinTech", icon: CreditCard, count: repos.filter(isFinTech).length },
  ];

  return (
    <div className="space-y-10">
      
      {/* Filter Tabs selection bar */}
      <div className="flex justify-center flex-wrap gap-2.5">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as FilterType)}
              className={`flex items-center gap-2 px-4.5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-primary border-primary text-white"
                  : "bg-card border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              <span className={`inline-block ml-0.5 rounded px-1.5 py-0.5 text-[9px] font-extrabold ${
                active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid container with Framer Motion layout animations */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredRepos.map((repo, i) => (
            <motion.div
              layout
              key={repo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProjectCard repo={repo} index={i} languageColor={{}} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty Fallback */}
      {filteredRepos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 card-base"
        >
          <p className="text-muted-foreground text-sm font-semibold">
            No projects fit this category. Try another tab!
          </p>
        </motion.div>
      )}

    </div>
  );
}
