"use client";

import { motion } from "framer-motion";
import { ExternalLink, Eye, Star, GitFork, Code2 } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

interface Repo {
  id: number; name: string; description: string;
  html_url: string; stargazers_count: number; forks_count: number;
  language: string; homepage: string | null; topics: string[];
}

const LANG_STYLE: Record<string, string> = {
  JavaScript: "text-yellow-600 bg-yellow-50  border-yellow-200 dark:text-yellow-400 dark:bg-yellow-400/10 dark:border-yellow-400/25",
  TypeScript: "text-blue-600  bg-blue-50    border-blue-200   dark:text-blue-400   dark:bg-blue-400/10   dark:border-blue-400/25",
  HTML:       "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-400/10 dark:border-orange-400/25",
  CSS:        "text-indigo-600 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-400/10 dark:border-indigo-400/25",
  Python:     "text-green-600  bg-green-50  border-green-200  dark:text-green-400  dark:bg-green-400/10  dark:border-green-400/25",
  Java:       "text-red-600    bg-red-50    border-red-200    dark:text-red-400    dark:bg-red-400/10    dark:border-red-400/25",
};

export default function ProjectCard({
  repo, index, languageColor: _lc,
}: {
  repo: Repo; index: number; languageColor: Record<string, string>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.1, once: true }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22,1,0.36,1] }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div className="group card-base h-full flex flex-col overflow-hidden">
        {/* Top orange reveal bar */}
        <div className="h-0 group-hover:h-[3px] bg-primary transition-all duration-300" />

        <div className="flex flex-col flex-1 p-5">

          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5 flex-shrink-0">
                <Code2 className="h-3.5 w-3.5 text-primary" />
              </div>
              <a
                href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200"
              >
                {repo.name}
              </a>
            </div>

            {/* Stars / forks */}
            {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
              <div className="flex gap-3 text-xs text-muted-foreground flex-shrink-0">
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{repo.forks_count}</span>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {repo.language && (
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${LANG_STYLE[repo.language] || "text-muted-foreground border-border bg-muted"}`}>
                {repo.language}
              </span>
            )}
            {repo.topics.slice(0, 2).map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-5">
            {repo.description || "No description provided."}
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <a
              href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="flex-1 btn-primary justify-center py-2 text-[12px] rounded-lg"
            >
              GitHub <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage} target="_blank" rel="noopener noreferrer"
                className="flex-1 btn-outline justify-center py-2 text-[12px] rounded-lg border"
              >
                Live <Eye className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);
}
