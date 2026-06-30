"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, X, Terminal, Code } from "lucide-react";

interface CommitLog {
  hash: string;
  msg: string;
  files: string;
  diff: string[];
}

interface DayData {
  date: Date;
  count: number;
  commits: CommitLog[];
}

// Generate deterministic mock commit descriptions
const COMMITS_MESSAGES = [
  { msg: "Refactored state management inside custom cursor hooks", files: "components/ui/custom-cursor.tsx", diff: ["-  const [isVisible, setIsVisible] = useState(false);", "+  const [isVisible, setIsVisible] = useState(false);", "+  const [isOnInput, setIsOnInput] = useState(false);", " ", "-  if (!isVisible) return null;", "+  if (!isVisible || isOnInput) return null;"] },
  { msg: "Optimized 3D gravity calculations inside skills orbit rings", files: "components/sections/skills-orbit.tsx", diff: ["-        rotate: -360 * parentRotationDirection,", "+        rotate: -360 * parentRotationDirection,", "+        scale: isHovered ? 1.25 : 1,", " ", "-        rotate: { repeat: Infinity, duration: 300, ease: 'linear' },", "+        rotate: { repeat: Infinity, duration: speed, ease: 'linear' },"] },
  { msg: "Fixed theme toggle circular view transitions clips overlap", files: "components/theme-toggle.tsx", diff: ["-    document.startViewTransition(updateTheme);", "+    const transition = document.startViewTransition(updateTheme);", "+    transition.ready.then(() => {", "+      document.documentElement.animate(", "+        { clipPath: [clipPathOld, clipPathNew] }", "+      );", "+    });"] },
  { msg: "Created CMD+K global actions dialog overlays for keyboard navigation", files: "components/command-menu.tsx", diff: ["-export default function CommandMenu() {", "+export default function CommandMenu() {", "+  const [open, setOpen] = useState(false);", "+  const [search, setSearch] = useState('');", "+  const [selectedIndex, setSelectedIndex] = useState(0);"] },
  { msg: "Integrated Stripe webhooks and payment checkout session APIs", files: "app/api/checkout/route.ts", diff: ["-    const session = await stripe.checkout.sessions.create({", "+    const session = await stripe.checkout.sessions.create({", "+      payment_method_types: ['card'],", "+      billing_address_collection: 'required',", "+      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,"] },
  { msg: "Added Achievements trophy logger and localStorage synchronization", files: "components/achievements-tracker.tsx", diff: ["-export default function AchievementsTracker() {", "+export default function AchievementsTracker() {", "+  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);", "+  const [activeNotification, setActiveNotification] = useState<Achievement | null>(null);"] },
  { msg: "Redesigned bento grid layout for client reviews grid section", files: "components/sections/testimonials-section.tsx", diff: ["-export default function TestimonialsSection() {", "+export default function TestimonialsSection() {", "+  return (", "+    <section id=\"testimonials\">", "+      <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">"] },
];

export default function CommitVisualizer() {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);

  // Generate 24 weeks (168 days) of deterministic mock activity ending today
  const gridData = useMemo(() => {
    const data: DayData[] = [];
    const today = new Date();
    
    // Start 24 weeks ago, aligned to Sunday
    const startDate = new Date();
    startDate.setDate(today.getDate() - 24 * 7);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay); // Shift to nearest Sunday

    let tempDate = new Date(startDate);
    let commitSeed = 42; // seed for deterministic random counts

    while (tempDate <= today) {
      // Deterministic commit count based on date/seed
      const dayOfWeek = tempDate.getDay();
      commitSeed = (commitSeed * 16807) % 2147483647;
      let count = 0;
      
      // Higher chance of commits on weekdays, and weekends have lower counts
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const rand = commitSeed % 100;
        if (rand > 80) count = 3;
        else if (rand > 50) count = 2;
        else if (rand > 20) count = 1;
      } else {
        if ((commitSeed % 100) > 85) count = 1;
      }

      // Generate deterministic mock commits list if count > 0
      const dayCommits: CommitLog[] = [];
      for (let c = 0; c < count; c++) {
        const commitIdx = (commitSeed + c) % COMMITS_MESSAGES.length;
        const hashSeed = ((commitSeed + c) * 31).toString(16).padEnd(7, "0").slice(0, 7);
        dayCommits.push({
          hash: hashSeed,
          msg: COMMITS_MESSAGES[commitIdx].msg,
          files: COMMITS_MESSAGES[commitIdx].files,
          diff: COMMITS_MESSAGES[commitIdx].diff,
        });
      }

      data.push({
        date: new Date(tempDate),
        count,
        commits: dayCommits,
      });

      tempDate.setDate(tempDate.getDate() + 1);
    }
    return data;
  }, []);

  // Split into 24 columns (weeks) of 7 days
  const weeks = useMemo(() => {
    const tempWeeks: DayData[][] = [];
    for (let i = 0; i < gridData.length; i += 7) {
      const week = gridData.slice(i, i + 7);
      if (week.length > 0) tempWeeks.push(week);
    }
    return tempWeeks;
  }, [gridData]);

  // Color intensities based on count
  const getColorClass = (count: number) => {
    if (count === 0) return "bg-muted/30 border border-border/10";
    if (count === 1) return "bg-primary/20 border border-primary/25";
    if (count === 2) return "bg-primary/50 border border-primary/40 shadow-[0_0_4px_rgba(251,146,60,0.1)]";
    return "bg-primary border border-primary/60 shadow-[0_0_8px_rgba(251,146,60,0.25)]";
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="card-base p-6 max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-8 select-none overflow-hidden">
      
      {/* 1. Left visual intro info */}
      <div className="w-full md:w-1/3 space-y-4">
        <span className="chip flex items-center gap-1.5 w-max">
          <GitCommit className="h-3.5 w-3.5 text-primary" /> COMMIT_CONTRIBUTIONS
        </span>
        <h3 className="text-xl font-bold text-foreground leading-snug">Interactive Activity Graph</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This board visualizes simulated development contributions over the past 24 weeks. Hover over cells to inspect commit densities, and click any colored box to view git diffs.
        </p>
        
        {/* Simple color scale helper */}
        <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-muted-foreground uppercase font-bold">
          <span>Less</span>
          <div className="w-3 h-3 rounded bg-muted/30 border border-border/10" />
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/25" />
          <div className="w-3 h-3 rounded bg-primary/50 border border-primary/40" />
          <div className="w-3 h-3 rounded bg-primary border border-primary/60" />
          <span>More</span>
        </div>
      </div>

      {/* 2. Grid Visual Canvas */}
      <div className="flex-1 w-full overflow-x-auto py-2 pr-1 custom-scrollbar flex flex-col justify-center relative min-w-0">
        
        <div className="flex gap-[3.5px] w-max mx-auto">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3.5px]">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => {
                    if (day.count > 0) setSelectedDay(day);
                  }}
                  className={`w-[11.5px] h-[11.5px] rounded-[3px] transition-all duration-150 cursor-pointer ${
                    day.count > 0 ? "hover:scale-120 hover:z-10" : ""
                  } ${getColorClass(day.count)}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Live Hover Tooltip Panel */}
        <div className="h-6 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredDay ? (
              <motion.div
                key={hoveredDay.date.toString()}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold"
              >
                {formatDate(hoveredDay.date)} :{" "}
                <span className="text-primary font-bold">
                  {hoveredDay.count} commit{hoveredDay.count !== 1 ? "s" : ""}
                </span>
              </motion.div>
            ) : (
              <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                Hover any grid cell for commit data
              </span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Git Diff Console Overlay Modal */}
      <AnimatePresence>
        {selectedDay && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="w-full max-w-2xl bg-[#070a0f] border border-primary/30 rounded-xl overflow-hidden shadow-2xl font-mono text-xs leading-relaxed text-emerald-400 select-text flex flex-col h-[70vh] max-h-[500px]"
            >
              {/* Diff Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0c1017] border-b border-border/40 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4.5 w-4.5 text-primary" />
                  <span className="font-bold text-foreground">git_diff_viewer</span>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-muted-foreground hover:text-red-400 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Logs Content Container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#040609] select-text">
                {selectedDay.commits.map((commit, cIdx) => (
                  <div key={`${commit.hash}-${cIdx}`} className="space-y-3 pb-5 border-b border-border/10 last:border-b-0">
                    
                    {/* Commit metadata block */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-primary">
                        <span>commit {commit.hash}951d8b284e36f0</span>
                        {cIdx === 0 && (
                          <span className="text-[8px] bg-primary/10 border border-primary/30 text-primary px-1 rounded uppercase tracking-wider font-extrabold select-none">HEAD</span>
                        )}
                      </div>
                      <div className="text-muted-foreground">Author: Abishek Khadka &lt;abishek@example.com&gt;</div>
                      <div className="text-muted-foreground">Date:   {formatDate(selectedDay.date)}</div>
                    </div>

                    {/* Commit message */}
                    <div className="pl-4 text-foreground font-bold text-[13px] border-l-2 border-primary/40 py-0.5">
                      {commit.msg}
                    </div>

                    {/* Files changed info line */}
                    <div className="text-muted-foreground/60 flex items-center gap-1">
                      <Code className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>diff --git a/{commit.files} b/{commit.files}</span>
                    </div>

                    {/* Code Diff lines block */}
                    <div className="bg-black/40 border border-border/10 rounded-lg p-3.5 space-y-1 text-muted-foreground overflow-x-auto select-text font-mono">
                      {commit.diff.map((line, lIdx) => {
                        const isAdd = line.startsWith("+");
                        const isDel = line.startsWith("-");
                        return (
                          <div
                            key={lIdx}
                            className={
                              isAdd 
                                ? "text-emerald-400 bg-emerald-500/5 font-semibold" 
                                : isDel 
                                ? "text-red-400 bg-red-500/5 font-semibold" 
                                : "opacity-60"
                            }
                          >
                            {line}
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ))}
              </div>

              {/* Diff Footer Help */}
              <div className="border-t border-border/30 bg-[#0c1017] px-4 py-2.5 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 select-none">
                <span>Total commits on day: {selectedDay.count}</span>
                <span>ESC to exit diff</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
