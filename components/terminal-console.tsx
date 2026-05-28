"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

interface HistoryItem {
  type: "input" | "output" | "error";
  text: string;
}

const ASCII_LOGO = `
    ███████╗██████╗  ██████╗ 
    ██╔════╝██╔══██╗██╔════╝ 
    █████╗  ██████╔╝██║      
    ██╔══╝  ██╔══██╗██║      
    ██║     ██║  ██║╚██████╗ 
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
  GUEST TERMINAL v1.0.0 (Type 'help')
`;

export default function TerminalConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: ASCII_LOGO },
    { type: "output", text: "Welcome to Abishek's developer shell. Type 'help' to get started." }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Keyboard listener for Ctrl + ` (backtick)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll to bottom whenever history updates
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Autofocus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      // Trigger achievement Terminal Operator
      window.dispatchEvent(new CustomEvent("achievement-unlock", { detail: { id: "terminal-operator" } }));
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: "input" as const, text: `guest@abishek.dev:~$ ${trimmed}` }];
    const lowerCmd = trimmed.toLowerCase();
    const parts = lowerCmd.split(" ");
    const baseCmd = parts[0];

    // Command parser
    switch (baseCmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Available Commands:
  about    - Developer background summary
  skills   - Technical core competencies
  projects - High-level repo listings
  theme    - Toggle light/dark layout modes
  email    - Get contact email details
  neofetch - System information dashboard
  matrix   - Enter code rain screen matrix mode
  play     - Launch retro developer arcade game console
  clear    - Clear screen log outputs
  help     - Display this reference table`
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "about":
        newHistory.push({
          type: "output",
          text: `Developer Profile:
Name: Abishek
Role: Fullstack Software Engineer
Philosophy: Writing clean code, building responsive interfaces, and crafting state-of-the-art visual experiences.
Interests: WebApps, UI/UX Animations, Payments Integration, API design.`
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `Core Tech Stack:
- Languages: TypeScript, JavaScript, HTML, CSS, Python
- Frameworks: React, Next.js, Express, Node.js
- Databases: PostgreSQL, MongoDB, Redis, Prisma
- Integrations: Stripe, Socket.io, REST APIs`
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `Highlighted Works (Filtered dynamically):
- Portfolio-Website (This modern space)
- FinTech Stripe integration systems
- High performance dynamic dashboard cards
Type 'projects' inside search grid for repository direct links.`
        });
        break;

      case "theme":
        // Dispatch toggle event
        const toggleButton = document.getElementById("theme-toggle") || document.querySelector(".theme-toggle-btn");
        if (toggleButton instanceof HTMLButtonElement) {
          toggleButton.click();
          newHistory.push({ type: "output", text: "Theme toggled successfully." });
        } else {
          // Alternative fallback triggers class toggling manually
          const isDark = document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
          newHistory.push({ type: "output", text: `Theme switched to: ${isDark ? "Dark" : "Light"}` });
        }
        break;

      case "email":
        navigator.clipboard.writeText("abishek@example.com"); // Replaced with user profile if needed
        newHistory.push({ type: "output", text: "Email 'abishek@example.com' copied to clipboard." });
        break;

      case "neofetch":
        const userAgent = navigator.userAgent;
        const os = userAgent.includes("Windows") ? "Windows OS" : userAgent.includes("Mac") ? "macOS" : "Linux";
        const width = window.innerWidth;
        const height = window.innerHeight;
        newHistory.push({
          type: "output",
          text: `abishek@portfolio-desktop
-------------------------
OS: ${os}
Shell: abishek-bash v1.0.0
Resolution: ${width}x${height}
Theme: Developer Orange (HSL 24)
Uptime: ${Math.round(performance.now() / 1000)}s
Engine: Next.js + Turbopack`
        });
        break;

      case "matrix":
        setIsMatrixMode(true);
        newHistory.push({ type: "output", text: "Entering Matrix rain. Click inside terminal anywhere or press ESC to exit matrix mode." });
        // Unlock hacker achievement
        window.dispatchEvent(new CustomEvent("achievement-unlock", { detail: { id: "hacker" } }));
        break;

      case "play":
      case "snake":
        window.dispatchEvent(new Event("open-retro-arcade"));
        newHistory.push({ type: "output", text: "Launching Retro Arcade cabinet..." });
        setIsOpen(false); // Close terminal so they can play!
        break;

      case "sudo":
        newHistory.push({
          type: "error",
          text: "guest is not in the sudoers file. This incident will be reported."
        });
        break;

      case "hack":
        newHistory.push({
          type: "error",
          text: "Bypassing mainframes... Just kidding! Unlock achieved: Hacker status unlocked."
        });
        window.dispatchEvent(new CustomEvent("achievement-unlock", { detail: { id: "hacker" } }));
        break;

      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${baseCmd}'. Type 'help' to see all available commands.`
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col bg-[#080b11] border border-primary/30 rounded-xl overflow-hidden shadow-2xl shadow-black/80 font-mono text-sm leading-relaxed text-emerald-400 select-text ${
            isFullscreen ? "w-full h-full" : "w-full max-w-4xl h-[70vh]"
          }`}
          onClick={() => {
            if (isMatrixMode) {
              setIsMatrixMode(false);
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          {/* Header controls bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d111a] border-b border-border/80 select-none">
            <div className="flex items-center gap-2.5">
              {/* Retro Mac-like color dots */}
              <div 
                onClick={() => setIsOpen(false)} 
                className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center text-[8px] text-red-950 font-extrabold"
              >
                ×
              </div>
              <div 
                onClick={() => setIsFullscreen(false)} 
                className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer"
              />
              <div 
                onClick={() => setIsFullscreen(true)} 
                className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer"
              />
              <div className="flex items-center gap-1.5 ml-2.5 text-xs text-muted-foreground font-semibold">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span>guest@abishek.dev:~</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Terminal Console Logs Body */}
          <div className="flex-1 overflow-y-auto p-5 relative min-h-0 bg-[#06080d]">
            {isMatrixMode ? (
              <MatrixRain exit={() => setIsMatrixMode(false)} />
            ) : (
              <div className="space-y-3.5">
                {history.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={
                      item.type === "input" 
                        ? "text-primary font-bold" 
                        : item.type === "error" 
                        ? "text-red-400" 
                        : "text-emerald-400/90 whitespace-pre-wrap"
                    }
                  >
                    {item.text}
                  </div>
                ))}
                <div ref={historyEndRef} />
              </div>
            )}
          </div>

          {/* Terminal input prompt bar */}
          {!isMatrixMode && (
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0b0e16] border-t border-border/50">
              <span className="text-primary font-bold shrink-0">guest@abishek.dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent text-emerald-300 focus:outline-none border-none caret-primary font-mono select-text"
                placeholder="Type 'help'..."
                autoFocus
              />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Full-screen retro matrix rain animation inside canvas
function MatrixRain({ exit }: { exit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(6, 8, 13, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Escape listener to close matrix rain
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [exit]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/90 cursor-pointer flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 border border-emerald-500/30 text-[10px] rounded text-emerald-500/80 animate-pulse select-none">
        MATRIX RAIN RUNNING • CLICK ANYWHERE OR PRESS ESC TO QUIT
      </div>
    </div>
  );
}
