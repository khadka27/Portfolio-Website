"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

function playChiptune() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523, 659, 784, 1047, 784, 659, 523];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.1);
    });
  } catch {}
}

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#fb923c","#f59e0b","#22c55e","#3b82f6","#ec4899","#a855f7"][Math.floor(Math.random() * 6)],
    size: Math.random() * 10 + 5,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 1.5,
    rotation: Math.random() * 720 - 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: p.rotation,
            x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (active) return;
      setProgress((prev) => {
        const next = prev + 1;
        if (e.key === KONAMI[prev]) {
          if (next === KONAMI.length) {
            // Trigger!
            setTimeout(() => {
              setActive(true);
              playChiptune();
              // Unlock secret achievement
              window.dispatchEvent(new CustomEvent("achievement-unlock", {
                detail: { id: "konami", title: "Konami Master", desc: "Found the secret code!" }
              }));
              setTimeout(() => setActive(false), 5000);
            }, 0);
            return 0;
          }
          return next;
        }
        // Reset if wrong key
        return e.key === KONAMI[0] ? 1 : 0;
      });
    },
    [active]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {active && (
        <>
          <Confetti />
          <motion.div
            key="konami-overlay"
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Main card */}
            <motion.div
              className="relative z-10 text-center px-8 py-10 rounded-3xl border-2 border-primary/60 bg-background/90 backdrop-blur-xl shadow-2xl max-w-sm mx-4"
              initial={{ scale: 0.5, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                🎮
              </motion.div>
              <motion.h2
                className="text-2xl font-black tracking-tight mb-2"
                style={{ fontFamily: "var(--font-outfit), system-ui" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <span className="orange-text">CHEAT CODE</span>
              </motion.h2>
              <p className="text-lg font-extrabold text-foreground mb-1">ACTIVATED!</p>
              <p className="text-xs text-muted-foreground font-mono tracking-widest uppercase mt-3">
                ↑↑↓↓←→←→BA — You found it!
              </p>
              <motion.div
                className="mt-4 text-xs text-primary font-semibold"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                🏆 Achievement Unlocked: Konami Master
              </motion.div>

              {/* Countdown bar */}
              <div className="mt-6 h-1 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
