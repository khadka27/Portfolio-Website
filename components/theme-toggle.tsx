"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const handleToggle = async () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

    /* ── Fallback: no View Transition support or reduced motion ── */
    if (
      !buttonRef.current ||
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    /* ── Calculate ripple origin from button center ── */
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    /* ── Trigger view transition ── */
    await doc.startViewTransition(() => {
      // Force DOM class update synchronously so view transition captures it immediately
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
      setTheme(nextTheme);
    })?.ready;

    /* ── Animate the circle expand/collapse ── */
    const isDark = resolvedTheme === "dark";

    document.documentElement.animate(
      {
        clipPath: isDark
          ? [
              `circle(${maxRadius}px at ${x}px ${y}px)`,
              `circle(0px at ${x}px ${y}px)`,
            ]
          : [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      disabled={!mounted}
      aria-label="Toggle theme"
      className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 40, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Moon className="h-[1.1rem] w-[1.1rem]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 40, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -40, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sun className="h-[1.1rem] w-[1.1rem]" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
