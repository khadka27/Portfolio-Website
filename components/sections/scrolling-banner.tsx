"use client";

import { motion } from "framer-motion";

export default function ScrollingBanner() {
  const slogans = [
    "EAT. SLEEP. CODE. REPEAT. — KHADKA 27",
    "TALK IS CHEAP. SHOW ME THE CODE. — KHADKA 27",
    "COFFEE IN, CLEAN CODE OUT. — KHADKA 27",
    "IT'S NOT A BUG, IT'S A FEATURE. — KHADKA 27",
    "KEEP CALM AND MERGE TO MAIN. — KHADKA 27",
    "FIRST SOLVE THE PROBLEM, THEN WRITE CODE. — KHADKA 27"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-6 md:py-8 border-y-2 border-border/40 select-none z-10">
      
      {/* CSS Keyframe Style Injection for high-performance hardware accelerated translate3d */}
      <style>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-horizontal 60s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        .text-3d {
          color: transparent;
          -webkit-text-stroke: 2px var(--primary);
        }
      `}</style>

      {/* Infinite loop track */}
      <div className="marquee-container flex items-center gap-16 md:gap-24">
        {/* Track Segment 1 */}
        <div className="flex items-center gap-16 md:gap-24 shrink-0">
          {slogans.map((slogan, idx) => (
            <span 
              key={`s1-${idx}`}
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-3d tracking-tighter"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              {slogan}
            </span>
          ))}
        </div>
        
        {/* Track Segment 2 (Duplicate for seamless loop reset) */}
        <div className="flex items-center gap-16 md:gap-24 shrink-0">
          {slogans.map((slogan, idx) => (
            <span 
              key={`s2-${idx}`}
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-3d tracking-tighter"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              {slogan}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
