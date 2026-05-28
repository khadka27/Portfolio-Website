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
      {/* Dynamic Cursor Arrow Container (Immediate tracking) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -ml-[4.5px] -mt-[3.5px] will-change-transform z-[2147483647]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          className="overflow-visible"
        >
          {/* Radiating sparks around the pointer tip (at 4.5, 3.5) */}
          <g>
            {[
              { x1: 4.5, y1: 1.5, x2: 4.5, y2: -3.5 },     // top
              { x1: 7.5, y1: 2.0, x2: 11.5, y2: -1.0 },    // top-right
              { x1: 1.5, y1: 2.0, x2: -2.5, y2: -1.0 },    // top-left
              { x1: 0.5, y1: 4.5, x2: -4.5, y2: 4.5 },     // left
              { x1: 1.5, y1: 7.0, x2: -2.5, y2: 10.0 },    // bottom-left
            ].map((spark, idx) => (
              <motion.line
                key={idx}
                x1={spark.x1}
                y1={spark.y1}
                x2={spark.x2}
                y2={spark.y2}
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  scale: (isClicking || isHovered) ? [1, 1.4, 1] : 1,
                  opacity: (isClicking || isHovered) ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  transformOrigin: "4.5px 3.5px",
                  filter: "drop-shadow(0 0 4px var(--primary))"
                }}
              />
            ))}
          </g>

          {/* Chubby, rounded orange cursor pointer arrow */}
          <motion.path
            d="M4.5 3.5v15.2c0 .8.9 1.2 1.5.7l4.4-4.1c.3-.3.7-.4 1.1-.3l5.8 1.6c.8.2 1.4-.6 1-1.2L5.2 3.8c-.2-.2-.5-.3-.7-.3z"
            fill="var(--primary)"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
            }}
            animate={{
              scale: isClicking ? 0.88 : isHovered ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          />
        </svg>
      </motion.div>

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
