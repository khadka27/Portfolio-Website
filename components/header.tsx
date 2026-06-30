"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

const NAV = [
  { label: "Home",       id: "home" },
  { label: "About",      id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills",     id: "skills" },
  { label: "Projects",   id: "projects" },
  { label: "Writing",    id: "writing" },
  { label: "Contact",    id: "contact" },
];

const Header = () => {
  const [active, setActive]   = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]       = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        const mid = window.scrollY + window.innerHeight * 0.45;
        for (let i = NAV.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV[i].id);
          if (el && el.offsetTop <= mid) { 
            setActive(NAV[i].id); 
            break; 
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { 
      window.removeEventListener("scroll", onScroll); 
      cancelAnimationFrame(rafRef.current); 
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // Clear hash so reload doesn't re-scroll to this section
    history.replaceState(null, "", window.location.pathname);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out select-none",
        scrolled
          ? "top-4 inset-x-0 mx-auto w-[92%] max-w-4xl rounded-full border border-border/80 bg-background/55 backdrop-blur-xl px-5 py-1.5 shadow-lg shadow-black/5"
          : "top-0 inset-x-0 w-full border-b border-transparent bg-transparent py-4"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-between w-full transition-all duration-300",
          scrolled ? "h-11" : "h-16 md:h-[68px] page-shell"
        )}
      >
        {/* ── Logo ──────────────────────────── */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2 group cursor-pointer">
          <Image
            src="/logo.png"
            alt="Abishek Khadka Logo"
            width={32}
            height={32}
            className="object-contain transition-transform duration-200 group-hover:scale-110 rounded-full shadow-md shadow-primary/20"
          />
          <span className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        {/* ── Desktop nav ───────────────────── */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/30 border border-border/20 rounded-full p-0.5" aria-label="Main">
          {NAV.map(item => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={e => scrollTo(e, item.id)}
              className={cn(
                "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 select-none cursor-pointer",
                active === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 -z-10 shadow-[0_0_12px_rgba(251,146,60,0.08)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Actions ───────────────────────── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted/70 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 p-3 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-2xl shadow-xl z-50 flex flex-col gap-1"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={e => scrollTo(e, item.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer",
                      active === item.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    )}
                  >
                    {active === item.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
