"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp, Sparkles, Star } from "lucide-react";
import VisitorCounter from "./visitor-counter";
import { siteConfig } from "@/lib/site";

const SOCIALS = [
  { icon: Github,    href: "https://github.com/khadka27",             label: "GitHub"    },
  { icon: Linkedin,  href: "https://linkedin.com/in/khadka27",       label: "LinkedIn"  },
  { icon: Twitter,   href: "https://twitter.com/khadka_27",          label: "Twitter"   },
  { icon: Instagram, href: "https://instagram.com/khadka_27",        label: "Instagram" },
  { icon: Mail,      href: `mailto:${siteConfig.email}`,             label: "Email"     },
];

const NAV_LINKS = [
  { label: "Home",       id: "home" },
  { label: "About",      id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills",     id: "skills" },
  { label: "Projects",   id: "projects" },
  { label: "Writing",    id: "writing" },
  { label: "Contact",    id: "contact" },
];

export default function Footer() {
  const [arcadeHighScore, setArcadeHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("arcade-high-score");
    if (saved) {
      setArcadeHighScore(parseInt(saved, 10));
    }
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 bg-[var(--card)]/90 backdrop-blur-md overflow-hidden select-none">
      
      {/* Top Accent Orange Glow Strip */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background radial glowing blobs */}
      <div aria-hidden className="pointer-events-none absolute left-[15%] bottom-0 h-44 w-80 rounded-full bg-primary/5 blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute right-[15%] top-0 h-44 w-80 rounded-full bg-amber-500/5 blur-[90px]" />

      <div className="page-shell py-14 relative z-10">
        
        {/* Main 3-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-border/40 pb-10">
          
          {/* COLUMN 1: Logo & Brand Info (span 5) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Abishek Khadka Logo"
                width={32}
                height={32}
                className="object-contain rounded-full shadow-md shadow-primary/20"
              />
              <span className="text-base font-extrabold tracking-tight text-foreground">{siteConfig.name}</span>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Crafting premium, highly interactive full-stack web applications with cloud integrations and responsive designs.
            </p>

            {/* Retro arcade status badge */}
            {arcadeHighScore > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono font-bold text-primary select-none mt-2">
                <Star className="h-3.5 w-3.5 fill-current animate-spin" style={{ animationDuration: "10s" }} />
                <span>ARCADE HIGH SCORE: {arcadeHighScore} PTS</span>
              </div>
            )}
          </div>

          {/* COLUMN 2: Site Map Links (span 4) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-foreground/80 tracking-widest uppercase flex items-center gap-1 border-b border-border/40 pb-1.5 w-full">
              <Sparkles className="h-3 w-3 text-primary" />
              Navigation Map
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1 group font-medium"
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 3: Social & Utility Actions (span 3) */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-foreground/80 tracking-widest uppercase flex items-center gap-1 border-b border-border/40 pb-1.5 w-full">
              Connect Channels
            </span>
            
            {/* Sleek circular social hover icons */}
            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-full border border-border bg-muted/20 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer hover:scale-105 shadow-sm"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Back to top utility */}
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold group cursor-pointer mt-2"
              aria-label="Scroll to top"
            >
              Back to Top
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3.5">
            <VisitorCounter />
          </div>
        </div>

      </div>
    </footer>
  );
}
