"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Coffee, Keyboard, Lightbulb, Gamepad, BookOpen, Sparkles, Terminal } from "lucide-react";

export default function IsometricDesk() {
  const { setTheme, resolvedTheme } = useTheme();
  const [caffeineLevel, setCaffeineLevel] = useState(0);
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [steamParticles, setSteamParticles] = useState<number[]>([]);
  const [isLampOn, setIsLampOn] = useState(true);

  // Sync lamp state with theme
  useEffect(() => {
    setIsLampOn(resolvedTheme === "dark");
  }, [resolvedTheme]);

  // Click handler for theme toggle lamp
  const handleLampClick = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setIsLampOn(!isLampOn);
    
    // Play synthesis tap sound
    playDeskSound(440, "sine", 0.05);
  };

  // Click handler for coffee mug
  const handleCoffeeClick = () => {
    playDeskSound(650, "triangle", 0.08);
    setSteamParticles((prev) => [...prev, Date.now()]);
    
    setCaffeineLevel((prev) => {
      const next = prev + 34;
      return next >= 100 ? 100 : next;
    });

    setCoffeeClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        window.dispatchEvent(
          new CustomEvent("achievement-unlock", { detail: { id: "caffeine-addict" } })
        );
        // Reset caffeine level and click counter
        setTimeout(() => setCaffeineLevel(0), 1200);
        return 0;
      }
      return next;
    });
  };

  // Sound generator
  const playDeskSound = (freq: number, type: OscillatorType, dur: number) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  };

  // Click handler for keyboard/monitor -> Command Menu
  const handleKeyboardClick = () => {
    playDeskSound(900, "sine", 0.04);
    // Dispatch Cmd+K event
    window.dispatchEvent(
      new KeyboardEvent("keydown", { ctrlKey: true, key: "k" })
    );
  };

  // Click handler for gamepad -> Arcade Game
  const handleGamepadClick = () => {
    playDeskSound(1100, "sine", 0.1);
    window.dispatchEvent(new CustomEvent("open-retro-arcade"));
  };

  // Click handler for Books -> Writing Scroll
  const handleBooksClick = () => {
    playDeskSound(500, "triangle", 0.08);
    document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" });
  };

  // Clean steam particles
  useEffect(() => {
    if (steamParticles.length > 0) {
      const timer = setTimeout(() => {
        setSteamParticles((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [steamParticles]);

  return (
    <section 
      id="workspace" 
      className="relative section-shell border-t border-border/30 py-20 bg-muted/20 overflow-hidden"
    >
      {/* Background grids */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Workspace copy and stats */}
        <div className="w-full lg:w-[42%] flex flex-col gap-6 text-center lg:text-left">
          <span className="section-eyebrow justify-center lg:justify-start">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Interactive Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Explore My <span className="orange-text">Virtual Desk</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Click on items around my desk workspace to interact with the environment. Toggle light settings, refuel coffee levels, check out git history, or play a quick arcade game.
          </p>

          {/* Interactive controls overview */}
          <div className="grid grid-cols-2 gap-3.5 pt-2 text-left">
            <div 
              onClick={handleCoffeeClick}
              className="p-3 bg-card border border-border/60 rounded-xl hover:border-primary/40 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1.5">
                <Coffee className="h-3.5 w-3.5" />
                <span>Coffee Mug</span>
              </div>
              <span className="text-[10px] text-muted-foreground block">
                Refuel caffeine levels. Drink 3 mugs for badge!
              </span>
            </div>

            <div 
              onClick={handleLampClick}
              className="p-3 bg-card border border-border/60 rounded-xl hover:border-primary/40 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1.5">
                <Lightbulb className="h-3.5 w-3.5" />
                <span>Desk Lamp</span>
              </div>
              <span className="text-[10px] text-muted-foreground block">
                Click switch to toggle portfolio theme.
              </span>
            </div>

            <div 
              onClick={handleKeyboardClick}
              className="p-3 bg-card border border-border/60 rounded-xl hover:border-primary/40 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1.5">
                <Keyboard className="h-3.5 w-3.5" />
                <span>PC & Keyboard</span>
              </div>
              <span className="text-[10px] text-muted-foreground block">
                Click keyboard to open search overlay command HUD.
              </span>
            </div>

            <div 
              onClick={handleGamepadClick}
              className="p-3 bg-card border border-border/60 rounded-xl hover:border-primary/40 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1.5">
                <Gamepad className="h-3.5 w-3.5" />
                <span>Retro Console</span>
              </div>
              <span className="text-[10px] text-muted-foreground block">
                Toggles retro Snake game emulator directly.
              </span>
            </div>
          </div>

          {/* Coffee Caffeine level HUD bar */}
          <div className="p-4 rounded-xl border border-border/40 bg-card/60 flex flex-col gap-2 mt-2 text-left">
            <div className="flex justify-between items-center text-xs font-bold text-foreground">
              <span className="flex items-center gap-1.5">
                <Coffee className="h-4 w-4 text-primary" />
                CAFFEINE SATURATION
              </span>
              <span className="font-mono text-primary">{caffeineLevel}%</span>
            </div>
            <div className="h-2.5 w-full bg-muted border border-border/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 to-primary"
                animate={{ width: `${caffeineLevel}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground leading-normal block">
              {coffeeClicks === 0 
                ? "Click mug to drink some code-fueling coffee." 
                : `${coffeeClicks} mug${coffeeClicks > 1 ? "s" : ""} consumed. Consuming 3 refills unlocks achievement.`
              }
            </span>
          </div>
        </div>

        {/* Workspace Visual Drawing (Isometric SVG mockup) */}
        <div className="w-full lg:w-[58%] flex items-center justify-center relative select-none">
          <div className="relative w-full aspect-[4/3] max-w-[500px]">
            {/* Ambient lamp glow backdrop */}
            <div 
              className="absolute pointer-events-none rounded-full bg-primary/20 blur-[60px] transition-opacity duration-300"
              style={{
                top: "15%",
                left: "25%",
                width: "160px",
                height: "160px",
                opacity: isLampOn ? 0.7 : 0
              }}
            />

            {/* Visual Workspace SVG drawing */}
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-full drop-shadow-xl overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* DESK BASE */}
              <polygon points="50,220 200,140 350,220 200,300" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
              <polygon points="50,220 200,300 200,310 50,230" fill="color-mix(in srgb, var(--card) 85%, black)" stroke="var(--border)" strokeWidth="1" />
              <polygon points="350,220 200,300 200,310 350,230" fill="color-mix(in srgb, var(--card) 75%, black)" stroke="var(--border)" strokeWidth="1" />

              {/* LAPTOP / MONITOR */}
              <g className="cursor-pointer group" onClick={handleKeyboardClick}>
                {/* Stand */}
                <polygon points="180,185 220,185 210,195 190,195" fill="#475569" />
                {/* Frame back */}
                <polygon points="150,120 250,120 250,180 150,180" fill="#334155" stroke="var(--border)" strokeWidth="1" />
                {/* Screen */}
                <polygon points="154,124 246,124 246,176 154,176" fill="#0b0f19" />
                {/* Glowing Code line mockups */}
                <line x1="160" y1="132" x2="210" y2="132" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" className="animate-[pulse_1s_infinite]" />
                <line x1="160" y1="140" x2="190" y2="140" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="170" y1="148" x2="230" y2="148" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <line x1="160" y1="156" x2="220" y2="156" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                <line x1="160" y1="164" x2="185" y2="164" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Screen Hover indicator */}
                <polygon points="150,120 250,120 250,180 150,180" fill="var(--primary)" fillOpacity="0" className="group-hover:fill-opacity-5 transition-opacity" />
              </g>

              {/* KEYBOARD */}
              <g className="cursor-pointer group" onClick={handleKeyboardClick}>
                <polygon points="170,225 230,225 220,240 160,240" fill="#1e293b" stroke="var(--border)" strokeWidth="1" />
                {/* Space bar decal */}
                <polygon points="185,235 205,235 203,238 183,238" fill="var(--primary)" />
                {/* Group hover glow */}
                <polygon points="170,225 230,225 220,240 160,240" fill="var(--primary)" fillOpacity="0" className="group-hover:fill-opacity-10 transition-opacity" />
              </g>

              {/* DESK LAMP */}
              <g className="cursor-pointer group" onClick={handleLampClick}>
                {/* Base */}
                <ellipse cx="110" cy="180" rx="12" ry="6" fill="#475569" stroke="var(--border)" />
                {/* Stem */}
                <path d="M 110 178 Q 100 140 115 120" fill="none" stroke="#64748b" strokeWidth="3.5" />
                {/* Shade */}
                <polygon points="105,120 125,115 135,130 115,135" fill={isLampOn ? "var(--primary)" : "#334155"} stroke="var(--border)" strokeWidth="1" />
                {/* Light Beam glow cone */}
                {isLampOn && (
                  <polygon points="120,132 180,240 110,240" fill="url(#lamp-glow)" className="pointer-events-none mix-blend-screen" />
                )}
                {/* Bulb node glow */}
                <circle cx="120" cy="128" r="4.5" fill={isLampOn ? "#fbbf24" : "#475569"} className={isLampOn ? "animate-pulse" : ""} />
              </g>

              {/* COFFEE MUG */}
              <g className="cursor-pointer group" onClick={handleCoffeeClick}>
                {/* Handle */}
                <ellipse cx="264" cy="225" rx="5" ry="7" fill="none" stroke="#64748b" strokeWidth="2.5" />
                {/* Body */}
                <ellipse cx="275" cy="225" rx="7" ry="4" fill="var(--border)" />
                <path d="M 268 225 L 268 240 Q 275 245 282 240 L 282 225 Z" fill="#92400e" stroke="var(--border)" strokeWidth="1" />
                <ellipse cx="275" cy="225" rx="6.5" ry="3.5" fill="#451a03" /> {/* liquid */}
                
                {/* Coffee steam rings */}
                {steamParticles.map((_, i) => (
                  <path
                    key={i}
                    d="M 275 220 Q 272 212 277 205 Q 274 198 276 190"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="animate-[pulse_1.5s_infinite]"
                    style={{
                      opacity: 0.8,
                      transform: `translateY(-${i * 4}px) scale(${1 - i * 0.1})`,
                    }}
                  />
                ))}
              </g>

              {/* RETRO ARCADE CONSOLE GAMEPAD */}
              <g className="cursor-pointer group" onClick={handleGamepadClick}>
                {/* Controller body */}
                <polygon points="275,250 305,235 320,250 290,265" fill="#334155" stroke="var(--border)" strokeWidth="1.5" />
                {/* Joypad buttons */}
                <circle cx="288" cy="250" r="2.5" fill="var(--primary)" />
                <circle cx="295" cy="246" r="2.5" fill="#ef4444" />
                <circle cx="304" cy="251" r="3.5" fill="#1e293b" /> {/* D-Pad */}
                {/* Wire leading to screen */}
                <path d="M 290 238 Q 260 210 240 220" fill="none" stroke="#475569" strokeWidth="1.5" />
                
                {/* Controller Hover glow */}
                <polygon points="275,250 305,235 320,250 290,265" fill="var(--primary)" fillOpacity="0" className="group-hover:fill-opacity-10 transition-opacity" />
              </g>

              {/* STACK OF BOOKS */}
              <g className="cursor-pointer group" onClick={handleBooksClick}>
                {/* Bottom book */}
                <polygon points="240,195 285,175 315,190 270,210" fill="#1e3a8a" stroke="var(--border)" strokeWidth="1" />
                <polygon points="240,195 270,210 270,214 240,199" fill="#0f172a" />
                <polygon points="315,190 270,210 270,214 315,194" fill="#64748b" /> {/* white pages */}

                {/* Middle book */}
                <polygon points="244,188 289,168 319,183 274,203" fill="#065f46" stroke="var(--border)" strokeWidth="1" />
                <polygon points="244,188 274,203 274,207 244,192" fill="#022c22" />
                <polygon points="319,183 274,203 274,207 319,187" fill="#64748b" /> {/* white pages */}

                {/* Top book */}
                <polygon points="248,181 293,161 323,176 278,196" fill="var(--primary)" stroke="var(--border)" strokeWidth="1" />
                <polygon points="248,181 278,196 278,200 248,185" fill="#7c2d12" />
                <polygon points="323,176 278,196 278,200 323,180" fill="#64748b" /> {/* white pages */}

                {/* Hover overlay */}
                <polygon points="248,181 293,161 323,176 278,196" fill="white" fillOpacity="0" className="group-hover:fill-opacity-10 transition-opacity" />
              </g>

              {/* DEFINITIONS FOR GRADIENTS */}
              <defs>
                <linearGradient id="lamp-glow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
