"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, ShieldAlert, CheckCircle2, Star, Sparkles, Terminal, Keyboard, Gamepad, Coffee, Code } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  secret?: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "terminal-operator",
    title: "Terminal Operator",
    description: "Launch the guest command shell using Ctrl+`",
    icon: Terminal,
  },
  {
    id: "dark-knight",
    title: "Dark Knight",
    description: "Toggle light & dark themes 3 times",
    icon: Star,
  },
  {
    id: "hud-navigator",
    title: "HUD Navigator",
    description: "Activate the site HUD overlay using Cmd/Ctrl+K",
    icon: Keyboard,
  },
  {
    id: "deep-diver",
    title: "Deep Diver",
    description: "Scroll all the way down to explore the footer resources",
    icon: Sparkles,
  },
  {
    id: "arcade-master",
    title: "Arcade Champion",
    description: "Score 10 or more points in the dev retro arcade",
    icon: Gamepad,
  },
  {
    id: "hacker",
    title: "Elite Hacker",
    description: "Type 'matrix' or 'hack' in the command terminal",
    icon: Trophy,
    secret: true,
  },
  {
    id: "core-hacker",
    title: "Core Hacker",
    description: "Crack the BIOS boot screen security with the admin passcode",
    icon: ShieldAlert,
    secret: true,
  },
  {
    id: "caffeine-addict",
    title: "Caffeine Addict",
    description: "Refill your workspace coffee mug 3 times",
    icon: Coffee,
  },
  {
    id: "ide-explorer",
    title: "IDE Explorer",
    description: "Execute all scripts in the interactive IDE playground",
    icon: Code,
  },
];

export default function AchievementsTracker() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [activeNotification, setActiveNotification] = useState<Achievement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [themeClickCount, setThemeClickCount] = useState(0);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("unlocked-achievements");
    if (saved) {
      try {
        setUnlockedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveUnlocked = (ids: string[]) => {
    setUnlockedIds(ids);
    localStorage.setItem("unlocked-achievements", JSON.stringify(ids));
  };

  const triggerUnlock = (id: string) => {
    if (unlockedIds.includes(id)) return;

    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;

    const nextIds = [...unlockedIds, id];
    saveUnlocked(nextIds);
    setActiveNotification(ach);

    // Auto-dismiss notification after 4.5s
    setTimeout(() => {
      setActiveNotification((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  // Set up listeners for events
  useEffect(() => {
    // 1. Direct achievement unlock dispatcher
    const handleUnlockEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        triggerUnlock(customEvent.detail.id);
      }
    };
    window.addEventListener("achievement-unlock", handleUnlockEvent);

    // 2. Theme swap click listener
    const handleThemeClick = () => {
      setThemeClickCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          triggerUnlock("dark-knight");
        }
        return next;
      });
    };
    // Monitor theme toggle button clicks
    const bindThemeListeners = () => {
      const btns = document.querySelectorAll("#theme-toggle, .theme-toggle-btn");
      btns.forEach((btn) => btn.addEventListener("click", handleThemeClick));
      return btns;
    };
    const boundBtns = bindThemeListeners();

    // 3. Scroll depth listener (Deep Diver)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // If user reaches 95% of scrollable page
      if (scrollHeight - clientHeight - scrollTop < 80) {
        triggerUnlock("deep-diver");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 4. Command Menu shortcut checker (HUD Navigator)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        triggerUnlock("hud-navigator");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("achievement-unlock", handleUnlockEvent);
      boundBtns.forEach((btn) => btn.removeEventListener("click", handleThemeClick));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [unlockedIds, themeClickCount]);

  return (
    <>
      {/* 🚀 Achievement Unlock Toast Notification Overlay */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9, x: "50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-6 right-6 z-[100000] max-w-sm w-full bg-[#0b0f19] border-2 border-primary rounded-xl p-4.5 shadow-2xl shadow-primary/20 flex gap-3.5 select-none"
          >
            <div className="shrink-0 flex items-center justify-center w-11 h-11 bg-primary/15 border border-primary/30 rounded-lg text-primary animate-bounce">
              <Trophy className="h-5.5 w-5.5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block mb-0.5">
                Achievement Unlocked!
              </span>
              <h4 className="text-sm font-extrabold text-foreground leading-tight truncate">
                {activeNotification.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-snug mt-1">
                {activeNotification.description}
              </p>
            </div>

            <button
              onClick={() => setActiveNotification(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏆 Floating Trophy Badge (Desktop bottom corner) */}
      <div className="fixed bottom-5 left-5 z-[999] flex flex-col items-center gap-1.5 md:flex">
        {/* Only show when custom cursor hides or floating beside helper */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200 shadow-md cursor-pointer overflow-hidden"
          title="View Portfolio Achievements"
        >
          {/* Subtle glow circle */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-200" />
          <Trophy className="h-4.5 w-4.5 group-hover:scale-110 transition-transform duration-200" />
          
          {/* Unlocked badges count dot */}
          {unlockedIds.length > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          )}
        </button>
      </div>

      {/* 🏆 Achievements Drawer Log Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-5 select-none">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Exploration Badges</h3>
                  <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-md px-1.5 py-0.5 font-bold font-mono">
                    {unlockedIds.length} / {ACHIEVEMENTS.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Badges Grid list */}
              <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
                {ACHIEVEMENTS.map((ach) => {
                  const unlocked = unlockedIds.includes(ach.id);
                  const Icon = ach.icon;

                  if (ach.secret && !unlocked) {
                    return (
                      <div
                        key={ach.id}
                        className="flex gap-4 p-3 bg-muted/40 border border-dashed border-border/80 rounded-xl opacity-60 filter grayscale select-none"
                      >
                        <div className="shrink-0 flex items-center justify-center w-11 h-11 bg-muted/50 border border-border rounded-lg text-muted-foreground">
                          <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-muted-foreground">
                            [ Hidden Achievement ]
                          </h4>
                          <p className="text-xs text-muted-foreground/80 mt-1 leading-snug">
                            Interact with the site tools to uncover this secret badge.
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={ach.id}
                      className={`flex gap-4 p-3.5 rounded-xl border transition-all duration-200 ${
                        unlocked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/40 border-border opacity-70"
                      }`}
                    >
                      <div
                        className={`shrink-0 flex items-center justify-center w-11 h-11 rounded-lg border transition-all duration-200 ${
                          unlocked
                            ? "bg-primary/15 border-primary/30 text-primary"
                            : "bg-muted/80 border-border text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className={`text-sm font-bold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                            {ach.title}
                          </h4>
                          {unlocked && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug mt-1">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset storage utility */}
              {unlockedIds.length > 0 && (
                <div className="mt-5 pt-3.5 border-t border-border flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm("Reset badge collection statistics?")) {
                        saveUnlocked([]);
                      }
                    }}
                    className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Reset Achievements
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
