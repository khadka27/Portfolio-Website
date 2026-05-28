"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [displayTag, setDisplayTag] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnInput, setIsOnInput] = useState(false);

  useEffect(() => {
    if (hoveredTag) {
      setDisplayTag(hoveredTag);
    }
  }, [hoveredTag]);

  // Position of the mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer ring delay effect
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices (coarse pointer)
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) {
      return;
    }

    // Show cursor as soon as mouse moves
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) {
        setIsVisible(true);
        if (!isOnInput) {
          document.body.classList.add("custom-cursor-active");
        }
      }
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setIsVisible(false);
      setHoveredTag(null);
      document.body.classList.remove("custom-cursor-active");
    };

    // Show cursor when entering window
    const handleMouseEnter = () => {
      setIsVisible(true);
      if (!isOnInput) {
        document.body.classList.add("custom-cursor-active");
      }
    };

    // Track active mouse down/up states
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hover on interactive components and extract developer tag tags
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Restore native cursor inside input / forms
      const inputEl = target.closest("input, textarea, select, [contenteditable='true']");
      if (inputEl) {
        setIsOnInput(true);
        document.body.classList.remove("custom-cursor-active");
        setHoveredTag(null);
        return;
      } else {
        setIsOnInput(false);
        if (isVisible) {
          document.body.classList.add("custom-cursor-active");
        }
      }

      // Find the closest interactive element
      const interactiveEl = target.closest("a, button, input, textarea, [role='button'], .cursor-pointer");
      
      if (interactiveEl) {
        const tagName = interactiveEl.tagName.toLowerCase();
        
        if (tagName === "a") {
          // Check if it's a project card link or social link
          if (interactiveEl.classList.contains("card-base") || interactiveEl.closest(".card-base")) {
            setHoveredTag("<project />");
          } else {
            setHoveredTag("<link />");
          }
        } else if (tagName === "button") {
          // Check if it's theme toggle, command menu, etc.
          const isThemeToggle = interactiveEl.closest("button")?.querySelector(".lucide-sun") || interactiveEl.closest("button")?.querySelector(".lucide-moon");
          if (isThemeToggle) {
            setHoveredTag("<theme />");
          } else {
            setHoveredTag("<action />");
          }
        } else {
          setHoveredTag("<click />");
        }
      } else {
        // If not hovering direct interactive element, but hovering custom items
        const isCodeBlock = target.tagName === "CODE" || target.tagName === "PRE" || target.closest("pre");
        if (isCodeBlock) {
          setHoveredTag("<code />");
        } else {
          setHoveredTag(null);
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial class set if not on input
    if (isVisible && !isOnInput) {
      document.body.classList.add("custom-cursor-active");
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, isVisible, isOnInput]);

  const isHovered = !!hoveredTag;
  const showCursor = isVisible && !isOnInput;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[2147483647]" 
      style={{ 
        opacity: showCursor ? 1 : 0, 
        transition: "opacity 0.2s ease-out",
      }}
    >
      {/* Outer developer cursor ring - lagging spring effect */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border pointer-events-none -ml-[18px] -mt-[18px] will-change-transform mix-blend-difference transition-[border-color,background-color,border-width] duration-200"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          borderColor: isHovered 
            ? "var(--primary)" 
            : "color-mix(in srgb, var(--primary) 55%, transparent)",
          backgroundColor: isHovered 
            ? "color-mix(in srgb, var(--primary) 12%, transparent)" 
            : "transparent",
          borderWidth: isHovered ? "2px" : "1.5px",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.4 : 1,
          borderRadius: isHovered ? "8px" : "50%", // Boxy cursor on hover, round on default!
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />

      {/* Inner solid developer dot/cross - fast immediate tracking */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary pointer-events-none -ml-[5px] -mt-[5px] will-change-transform mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 0.3 : 1,
          borderRadius: isHovered ? "0%" : "50%", // Square inner pixel on hover, round on default!
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />

      {/* Developer Terminal Label tooltip floating beside the cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none pl-6 pt-6 will-change-transform select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8, 
          y: isHovered ? 0 : 10 
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0b0f19] border border-primary/40 shadow-lg shadow-black/40">
          <span 
            className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider"
            style={{ fontFamily: "'Outfit', 'Fira Code', monospace" }}
          >
            {displayTag || ""}
          </span>
          <span className="w-1.5 h-3 bg-primary/80 animate-[pulse_1s_infinite] rounded-sm" />
        </div>
      </motion.div>
    </div>
  );
}
