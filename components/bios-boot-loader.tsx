"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BiosBootLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isBooted, setIsBooted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sound synthesizer for authentic retro experience
  const playBeep = (freq = 800, type: OscillatorType = "sine", duration = 0.08) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext blocked or not supported
    }
  };

  const BOOT_SEQUENCE = [
    "AMIBIOS(C)2026 American Megatrends, Inc.",
    "BIOS Date: 05/28/2026 09:16:05 Ver: 08.00.16",
    "CPU: Antigravity-Core v9 @ 4.20 GHz",
    "Speed: 4200MHz  Count: 16 Cores",
    "----------------------------------------",
    "Memory Test: 65536MB OK",
    "Checking Storage Devices ...",
    "  SATA Port 0: NVMe SSD 2TB (Active)",
    "  SATA Port 1: Dev-Vault Backup (Locked)",
    "USB Devices: 1 Keyboard, 1 Mouse, 1 Gamepad detected.",
    "Initializing Network Link ...",
    "  IP Address: 192.168.1.137 (DHCP Static)",
    "  Status: LINK ONLINE (10 Gbps)",
    "----------------------------------------",
    "Loading Core OS Kernel ... DONE",
    "Starting portfolio services ... OK",
    "Injecting interactive theme engines ... OK",
    "Launching user terminal shell ...",
    "==================================================",
    "  WELCOME TO THE ABISHEK KHADKA DEV PORTFOLIO",
    "  SECURITY SYSTEM: ACTIVE GATEWAY",
    "==================================================",
    "ENTER SECURITY ACCESS CODE TO LOAD SYSTEM FILES.",
    "Type 'guest' for standard visitor access.",
    "Type 'cheat' for admin privilege check.",
    ""
  ];

  useEffect(() => {
    // Check if user already booted this session
    const hasBooted = sessionStorage.getItem("bios-booted");
    if (hasBooted === "true") {
      setIsBooted(true);
      return;
    }

    setIsVisible(true);
    playBeep(440, "square", 0.2); // Boot beep

    // Animate lines printing
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[currentLineIndex]]);
        playBeep(1200, "sine", 0.015); // Tiny tick beep
        currentLineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSkip = () => {
    playBeep(600, "sine", 0.15);
    triggerExit();
  };

  const triggerExit = () => {
    setIsFading(true);
    sessionStorage.setItem("bios-booted", "true");
    setTimeout(() => {
      setIsVisible(false);
      setIsBooted(true);
    }, 800); // match exit animations
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputVal.trim().toLowerCase();
      playBeep(900, "sine", 0.05);

      if (command === "guest") {
        setLines((prev) => [
          ...prev,
          `> ${inputVal}`,
          "ACCESS GRANTED.",
          "Loading dashboard environment...",
        ]);
        setInputVal("");
        setTimeout(() => {
          triggerExit();
        }, 1000);
      } else if (command === "cheat") {
        setLines((prev) => [
          ...prev,
          `> ${inputVal}`,
          "ACCESS GRANTED: ADMIN OVERRIDE SECURED.",
          "UNLOCKING CORE HACKER BADGE...",
        ]);
        setInputVal("");
        
        // Dispatch achievement event
        window.dispatchEvent(
          new CustomEvent("achievement-unlock", { detail: { id: "core-hacker" } })
        );
        
        // Success noise
        setTimeout(() => playBeep(1000, "triangle", 0.35), 200);
        setTimeout(() => playBeep(1500, "sine", 0.4), 300);

        setTimeout(() => {
          triggerExit();
        }, 1800);
      } else if (command === "help") {
        setLines((prev) => [
          ...prev,
          `> ${inputVal}`,
          "Available keys: 'guest' (load site), 'cheat' (unlock credentials), 'help' (this screen).",
        ]);
        setInputVal("");
      } else if (command === "") {
        setLines((prev) => [...prev, ">"]);
      } else {
        setLines((prev) => [
          ...prev,
          `> ${inputVal}`,
          "INVALID ACCESS CODE. DENIED.",
        ]);
        playBeep(250, "sawtooth", 0.25); // Error buzzer
        setInputVal("");
      }
    } else {
      // Key click audio
      playBeep(800 + Math.random() * 400, "sine", 0.012);
    }
  };

  if (isBooted || !isVisible) return null;

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scaleY: 0.01, 
            scaleX: 0.1,
            filter: "brightness(3)",
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[999999] bg-[#020502] text-[#3dfa3d] font-mono p-4 sm:p-8 select-none flex flex-col overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 100%)",
            textShadow: "0 0 4px rgba(61, 250, 61, 0.6)"
          }}
        >
          {/* Scanline CRT overlay filter */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.12]"
            style={{
              backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.8) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* Top action bar */}
          <div className="flex justify-between items-center text-xs opacity-75 border-b border-[#3dfa3d]/20 pb-2 mb-4 shrink-0">
            <span>[ SYSTEM OVERLAY v1.0.4 ]</span>
            <button 
              onClick={handleSkip}
              className="px-2 py-0.5 border border-[#3dfa3d]/40 rounded hover:bg-[#3dfa3d]/20 hover:text-white cursor-pointer transition-colors"
            >
              Skip System Check [ESC]
            </button>
          </div>

          {/* Logs printing shell */}
          <div 
            className="flex-1 overflow-y-auto space-y-1 text-xs sm:text-sm custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </div>
            ))}
            
            {/* Input terminal line */}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#3dfa3d]/10">
              <span className="text-[#3dfa3d]/80 font-bold">SECURE_GATEWAY_IN:~$</span>
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-[#3dfa3d] focus:ring-0 p-0 text-xs sm:text-sm caret-[#3dfa3d]"
                placeholder="Type 'guest' and press Enter..."
                style={{
                  textShadow: "0 0 4px rgba(61, 250, 61, 0.6)"
                }}
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
