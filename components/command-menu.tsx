"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  Hash,
  Copy,
  Check,
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CornerDownLeft,
  Gamepad,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Socials";
  icon: any;
  action: () => void;
  shortcut?: string;
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle command menu visibility on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle focus when menu opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [open]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      closeMenu();
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    closeMenu();
  };

  const openUrl = (url: string) => {
    closeMenu();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Define commands
  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-home",       title: "Go to Home",       category: "Navigation", icon: Hash, action: () => scrollToSection("home") },
    { id: "nav-workspace",  title: "Go to Workspace Desk", category: "Navigation", icon: Hash, action: () => scrollToSection("workspace") },
    { id: "nav-about",      title: "Go to About",      category: "Navigation", icon: Hash, action: () => scrollToSection("about") },
    { id: "nav-experience", title: "Go to Experience", category: "Navigation", icon: Hash, action: () => scrollToSection("experience") },
    { id: "nav-ide",        title: "Go to IDE Playground", category: "Navigation", icon: Hash, action: () => scrollToSection("ide-playground") },
    { id: "nav-skills",     title: "Go to Skills",     category: "Navigation", icon: Hash, action: () => scrollToSection("skills") },
    { id: "nav-projects",   title: "Go to Projects",   category: "Navigation", icon: Hash, action: () => scrollToSection("projects") },
    { id: "nav-writing",    title: "Go to Writing",    category: "Navigation", icon: Hash, action: () => scrollToSection("writing") },
    { id: "nav-contact",    title: "Go to Contact",    category: "Navigation", icon: Hash, action: () => scrollToSection("contact") },

    // Actions
    {
      id: "action-arcade",
      title: "Launch Retro Arcade Game",
      category: "Actions",
      icon: Gamepad,
      action: () => {
        closeMenu();
        window.dispatchEvent(new CustomEvent("open-retro-arcade"));
      },
      shortcut: "G",
    },
    {
      id: "action-theme",
      title: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: toggleTheme,
      shortcut: "T",
    },
    {
      id: "action-copy",
      title: copied ? "Email Copied!" : "Copy Email to Clipboard",
      category: "Actions",
      icon: copied ? Check : Copy,
      action: copyEmail,
      shortcut: "E",
    },

    // Socials
    { id: "social-github",    title: "Visit GitHub Profile",   category: "Socials", icon: Github,    action: () => openUrl("https://github.com/khadka27") },
    { id: "social-linkedin",  title: "Visit LinkedIn Profile", category: "Socials", icon: Linkedin,  action: () => openUrl("https://linkedin.com/in/khadka27") },
    { id: "social-twitter",   title: "Visit Twitter Profile",  category: "Socials", icon: Twitter,   action: () => openUrl("https://twitter.com/khadka_27") },
    { id: "social-instagram", title: "Visit Instagram Profile",category: "Socials", icon: Instagram, action: () => openUrl("https://instagram.com/khadka_27") },
  ];

  // Filter commands by search input
  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keep index bounds in check
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle arrow key traversal and trigger
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  // Scroll selected element into view inside HUD
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const selectedEl = listEl.children[selectedIndex] as HTMLElement;
    if (!selectedEl) return;

    const listHeight = listEl.clientHeight;
    const scrollOffset = listEl.scrollTop;
    const itemTop = selectedEl.offsetTop;
    const itemHeight = selectedEl.clientHeight;

    if (itemTop < scrollOffset) {
      listEl.scrollTop = itemTop;
    } else if (itemTop + itemHeight > scrollOffset + listHeight) {
      listEl.scrollTop = itemTop + itemHeight - listHeight;
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Search hint badge positioned globally on desktop (shifted left to clear Achievements button) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex fixed bottom-5 left-[68px] z-[55] items-center gap-2 rounded-xl border border-border bg-card/85 backdrop-blur-md px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-md cursor-pointer"
        aria-label="Open Command Menu"
      >
        <Search className="h-3.5 w-3.5 text-primary" />
        Search Site
        <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-border/80 bg-muted px-1.5 font-mono text-[9px] font-bold">
          <span>⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-background/55 backdrop-blur-md"
            />

            {/* HUD Modal dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl"
              onKeyDown={handleKeyDown}
            >
              {/* Input search box */}
              <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3.5">
                <Search className="h-4.5 w-4.5 text-primary shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, shortcuts, or socials..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  onClick={closeMenu}
                  className="rounded-lg border border-border bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Commands list container */}
              <div
                ref={listRef}
                className="max-h-[310px] overflow-y-auto p-2 space-y-0.5 scrollbar-thin"
              >
                {filtered.length > 0 ? (
                  filtered.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150 ${
                          isSelected
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-[13px] font-semibold">{cmd.title}</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/45 opacity-60">
                            {cmd.category}
                          </span>
                        </div>
                        
                        {isSelected && (
                          <div className="flex items-center gap-1.5 opacity-80 text-[10px] font-bold">
                            Select <CornerDownLeft className="h-3 w-3 shrink-0" />
                          </div>
                        )}
                        
                        {!isSelected && cmd.shortcut && (
                          <kbd className="rounded border border-border/80 bg-muted px-1.5 font-mono text-[9px] font-bold">
                            {cmd.shortcut}
                          </kbd>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results matching your query.
                  </div>
                )}
              </div>

              {/* HUD Footer help controls */}
              <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 select-none">
                <span>↑↓ navigate</span>
                <span>enter to select</span>
                <span>esc to exit</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
