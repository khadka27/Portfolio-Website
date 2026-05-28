"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, X, Eye, EyeOff, LayoutGrid, Type, ShieldCheck } from "lucide-react";

export default function ThemeConfigurator() {
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(24); // Default orange
  const [radius, setRadius] = useState(12); // Default 0.75rem (12px)
  const [showGrid, setShowGrid] = useState(false);
  const [devFont, setDevFont] = useState(false);

  // Apply customizations dynamically to :root
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", `hsl(${hue} 95% 53%)`);
    document.documentElement.style.setProperty("--ring", `hsl(${hue} 95% 53%)`);
  }, [hue]);

  useEffect(() => {
    document.documentElement.style.setProperty("--radius", `${radius}px`);
  }, [radius]);

  useEffect(() => {
    if (showGrid) {
      document.body.classList.add("show-grid-blueprint");
    } else {
      document.body.classList.remove("show-grid-blueprint");
    }
  }, [showGrid]);

  useEffect(() => {
    if (devFont) {
      document.body.classList.add("developer-font-active");
    } else {
      document.body.classList.remove("developer-font-active");
    }
  }, [devFont]);

  return (
    <>
      {/* Floating Configurator Toggle Button (Bottom-right, offset left of chatbot) */}
      <div className="fixed bottom-8 right-[92px] z-[999] flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200 shadow-md cursor-pointer overflow-hidden"
          title="Open Theme Settings"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-200" />
          <Sliders className="h-4.5 w-4.5 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      {/* Drawer Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[99999]"
            />

            {/* Config Panel Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl p-6 z-[100000] flex flex-col select-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4.5 w-4.5 text-primary" />
                  <h3 className="text-base font-bold text-foreground font-mono uppercase tracking-wider">DevPlayground Panel</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Adjustments Content */}
              <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                {/* 1. Hue Slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-muted-foreground font-bold">THEME PRIMARY HUE</span>
                    <span className="text-primary font-bold">{hue}°</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value))}
                      className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                      style={{
                        background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                      }}
                    />
                  </div>
                </div>

                {/* 2. Rounding Slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-muted-foreground font-bold">CARD CORNER ROUNDING</span>
                    <span className="text-primary font-bold">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-muted-foreground/60 uppercase">
                    <span>Boxy Retro (0px)</span>
                    <span>Modern (12px)</span>
                    <span>Pill (24px)</span>
                  </div>
                </div>

                <hr className="border-border/60" />

                {/* 3. Grid blueprint toggler */}
                <div className="flex items-center justify-between p-3.5 bg-muted/30 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="h-4.5 w-4.5 text-primary" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wide">GRID BLUEPRINT</h4>
                      <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">Toggle tech layout overlay</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`relative inline-flex h-5.5 w-10.5 items-center rounded-full transition-colors cursor-pointer ${
                      showGrid ? "bg-primary" : "bg-muted border border-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showGrid ? "translate-x-5.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 4. Font override toggler */}
                <div className="flex items-center justify-between p-3.5 bg-muted/30 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Type className="h-4.5 w-4.5 text-primary" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wide">DEVELOPER FONT</h4>
                      <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">Force monospace style rules</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDevFont(!devFont)}
                    className={`relative inline-flex h-5.5 w-10.5 items-center rounded-full transition-colors cursor-pointer ${
                      devFont ? "bg-primary" : "bg-muted border border-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        devFont ? "translate-x-5.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="pt-4 border-t border-border mt-auto space-y-3.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground leading-normal">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Real-time runtime injection active. Variables persist in active session.</span>
                </div>
                <button
                  onClick={() => {
                    setHue(24);
                    setRadius(12);
                    setShowGrid(false);
                    setDevFont(false);
                  }}
                  className="w-full btn-outline justify-center py-2 text-xs font-mono uppercase tracking-wider rounded-xl border cursor-pointer hover:bg-primary/5"
                >
                  Reset Configurator
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
