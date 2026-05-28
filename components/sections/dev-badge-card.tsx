"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, RefreshCw, Star, QrCode } from "lucide-react";

interface DevBadgeCardProps {
  avatarUrl?: string | null;
  location?: string;
}

export default function DevBadgeCard({ avatarUrl, location = "Pokhara, Nepal" }: DevBadgeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [name, setName] = useState("Guest Developer");
  const [devClass, setDevClass] = useState("Frontend Wizard");
  const [badgeId, setBadgeId] = useState("");
  const [unlockedCount, setUnlockedCount] = useState(0);

  // Generate random Badge ID on mount
  useEffect(() => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    setBadgeId(`DEV-${randomHex}-PASS`);
  }, []);

  // Listen to unlocked achievements count
  useEffect(() => {
    const checkBadges = () => {
      const saved = localStorage.getItem("unlocked-achievements");
      if (saved) {
        try {
          const list = JSON.parse(saved);
          setUnlockedCount(list.length);
        } catch (e) {
          console.error(e);
        }
      }
    };
    checkBadges();
    window.addEventListener("achievement-unlock", checkBadges);
    // Listen to reset custom storage event
    const interval = setInterval(checkBadges, 2000);
    return () => {
      window.removeEventListener("achievement-unlock", checkBadges);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[320px] mx-auto">
      
      {/* 3D Flippable Container */}
      <div 
        className="w-full aspect-[2/3] max-w-[280px] sm:max-w-[300px] relative select-none"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="w-full h-full relative transition-all duration-700"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          
          {/* ==================== FRONT OF CARD ==================== */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#090d16] border-2 border-primary/45 shadow-2xl p-5 flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Tech background lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header row */}
            <div className="flex justify-between items-start border-b border-primary/20 pb-2 relative z-10">
              <div>
                <h3 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">SECURE ID PASS</h3>
                <span className="text-[8px] font-mono text-muted-foreground">{badgeId}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[7px] font-mono text-emerald-400 font-bold uppercase">ACTIVE</span>
              </div>
            </div>

            {/* Avatar & Photo center section */}
            <div className="flex flex-col items-center my-4 relative z-10">
              <div className="relative h-28 w-28 rounded-xl border-2 border-primary/30 overflow-hidden bg-muted shadow-lg">
                <Image
                  src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt="Badge Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Horizontal digital scanline animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent w-full h-8 animate-[bounce_3s_infinite_ease-in-out] pointer-events-none" />
              </div>
              
              <div className="flex items-center gap-1 mt-2 text-[9px] font-mono text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                <span>{location}</span>
              </div>
            </div>

            {/* Custom Inputs Body (Forms styled inside ID details) */}
            <div className="space-y-3 relative z-10">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest block">PASS HOLDER NAME</label>
                <input
                  type="text"
                  maxLength={18}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-primary/20 hover:border-primary/40 focus:border-primary focus:outline-none rounded-lg px-2.5 py-1 text-[11px] font-semibold text-foreground font-mono"
                  placeholder="Visitor Name"
                />
              </div>

              {/* Class Selector Dropdown */}
              <div className="space-y-1">
                <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest block">DEVELOPER CLASS</label>
                <select
                  value={devClass}
                  onChange={(e) => setDevClass(e.target.value)}
                  className="w-full bg-black/40 border border-primary/20 hover:border-primary/40 focus:border-primary focus:outline-none rounded-lg px-2 py-1 text-[11px] font-semibold text-foreground font-mono cursor-pointer"
                >
                  <option value="Frontend Wizard">Frontend Wizard</option>
                  <option value="Fullstack Architect">Fullstack Architect</option>
                  <option value="System Daemon">System Daemon</option>
                  <option value="DevOps Specialist">DevOps Specialist</option>
                  <option value="Web3 Hacker">Web3 Hacker</option>
                </select>
              </div>
            </div>

            {/* Footer Barcode */}
            <div className="border-t border-primary/20 pt-2.5 mt-2 flex justify-between items-center relative z-10">
              {/* Fake barcode bars */}
              <div className="flex items-center h-5 gap-[1.5px] opacity-75">
                <span className="w-[1.5px] h-full bg-foreground" />
                <span className="w-[3px] h-full bg-foreground" />
                <span className="w-[1.5px] h-full bg-foreground" />
                <span className="w-[1.5px] h-full bg-foreground" />
                <span className="w-[4px] h-full bg-foreground" />
                <span className="w-[1.5px] h-full bg-foreground" />
                <span className="w-[2px] h-full bg-foreground" />
                <span className="w-[3px] h-full bg-foreground" />
                <span className="w-[1.5px] h-full bg-foreground" />
                <span className="w-[4px] h-full bg-foreground" />
              </div>
              
              <div className="text-[7px] font-mono text-muted-foreground/60 tracking-wider">
                ISSUED: 2026.05.28
              </div>
            </div>
          </div>

          {/* ==================== BACK OF CARD ==================== */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#070b12] border-2 border-primary/45 shadow-2xl p-5 flex flex-col justify-between overflow-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)" 
            }}
          >
            {/* Grid blueprint background details */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Back Header */}
            <div className="border-b border-primary/20 pb-2 relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> VERIFICATION NODE
              </span>
              <span className="text-[8px] font-mono text-muted-foreground">HOST v1.0.0</span>
            </div>

            {/* Back Stats breakdown (radar metrics mock) */}
            <div className="my-4 space-y-3.5 relative z-10">
              <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest block">VISITATION METRICS</span>
              
              {/* Code mastery progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-foreground">CODE MASTERY</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-border/40">
                  <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              {/* Layout precision progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-foreground">LAYOUT PRECISION</span>
                  <span className="text-primary">96%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-border/40">
                  <div className="h-full bg-primary rounded-full" style={{ width: "96%" }} />
                </div>
              </div>

              {/* Achievement badges unlocked */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-foreground">PORTFOLIO EXPLORATION</span>
                  <span className="text-primary">{Math.round((unlockedCount / 5) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-border/40">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(unlockedCount / 5) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-muted-foreground/80 leading-normal">
                  <span>BADGES UNLOCKED</span>
                  <span className="text-foreground font-bold">{unlockedCount} OF 5</span>
                </div>
              </div>
            </div>

            {/* Back Footer with QR code links */}
            <div className="border-t border-primary/20 pt-3 flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <span className="text-[7px] font-mono text-muted-foreground uppercase block leading-none">SIGNATURE AUTHENTICATOR</span>
                <span className="text-[11px] font-serif italic text-foreground leading-none tracking-wide">Abishek Khadka</span>
              </div>
              
              <div className="rounded-lg bg-white/5 border border-primary/20 p-1 flex items-center justify-center">
                <QrCode className="h-7 w-7 text-primary" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Action flip toggle button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="btn-outline w-full py-2.5 justify-center text-[10px] font-mono uppercase tracking-wider rounded-xl border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-center gap-2"
      >
        <RefreshCw className={`h-3.5 w-3.5 text-primary ${isFlipped ? "rotate-180" : ""}`} />
        <span>Flip Access Pass</span>
      </button>

    </div>
  );
}
