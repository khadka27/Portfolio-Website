"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, GitCommit, GitMerge, Terminal, CheckCircle2, ChevronRight } from "lucide-react";

interface CommitNode {
  id: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  branch: "main" | "feature/arcade" | "hotfix/theme";
  x: number; // SVG coordinate
  y: number; // SVG coordinate
}

const COMMITS: CommitNode[] = [
  // main branch (green)
  { id: "c1", hash: "8a1b2c3", message: "feat: initialize profile metadata structure", author: "Abishek Khadka", date: "2026-05-27 10:14", branch: "main", x: 60, y: 70 },
  { id: "c2", hash: "5e4d3c2", message: "docs: add readmes and dependency specs", author: "Abishek Khadka", date: "2026-05-27 12:45", branch: "main", x: 140, y: 70 },
  { id: "c3", hash: "9f8e7d6", message: "feat: add draggable skills orbit gravity field", author: "Abishek Khadka", date: "2026-05-27 15:30", branch: "main", x: 220, y: 70 },
  { id: "c4", hash: "e805103", message: "feat: launch custom developer cursor system", author: "Abishek Khadka", date: "2026-05-28 02:00", branch: "main", x: 300, y: 70 },
  { id: "c5", hash: "bc4d8e9", message: "merge: feature/arcade into main [Fast-Forward]", author: "Abishek Khadka", date: "2026-05-28 03:22", branch: "main", x: 380, y: 70 },
  { id: "c6", hash: "fe982a1", message: "merge: hotfix/theme into main", author: "Abishek Khadka", date: "2026-05-28 09:20", branch: "main", x: 460, y: 70 },

  // feature/arcade branch (orange)
  { id: "f1", hash: "a3b4c5d", message: "feat: draft retro grid board render controls", author: "Abishek Khadka", date: "2026-05-27 16:15", branch: "feature/arcade", x: 200, y: 150 },
  { id: "f2", hash: "d4e5f6a", message: "feat: complete snake movement and collision loop", author: "Abishek Khadka", date: "2026-05-27 19:40", branch: "feature/arcade", x: 280, y: 150 },

  // hotfix/theme branch (red)
  { id: "h1", hash: "7c8b9a0", message: "fix: prevent cursor coordinate freeze in layout", author: "Abishek Khadka", date: "2026-05-28 09:12", branch: "hotfix/theme", x: 360, y: 230 },
  { id: "h2", hash: "3f2e1d0", message: "fix: correct skills orbit containerRef type signatures", author: "Abishek Khadka", date: "2026-05-28 09:15", branch: "hotfix/theme", x: 420, y: 230 },
];

export default function GitBranchSimulator() {
  const [selectedCommit, setSelectedCommit] = useState<CommitNode>(COMMITS[0]);
  const [activeBranch, setActiveBranch] = useState<"main" | "feature/arcade" | "hotfix/theme">("main");
  const [consoleLogs, setConsoleLogs] = useState<string[]>(["Click on any node to inspect git logs."]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeCompleted, setMergeCompleted] = useState<Record<string, boolean>>({
    arcade: true,
    theme: true
  });

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // Handle click node
  const handleNodeClick = (node: CommitNode) => {
    setSelectedCommit(node);
    setActiveBranch(node.branch);
    setConsoleLogs([
      `$ git checkout ${node.branch}`,
      `Switched to branch '${node.branch}'`,
      `$ git log -1 ${node.hash}`,
      `commit ${node.hash}`,
      `Author: ${node.author} <khadka27@users.noreply.github.com>`,
      `Date:   ${node.date}`,
      `    `,
      `    ${node.message}`
    ]);
    playClickSound(900, "sine", 0.05);
  };

  // Sound feedback synthesizer
  const playClickSound = (freq: number, type: OscillatorType, duration: number) => {
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
    } catch (e) {}
  };

  // Handle simulated git merge animation
  const handleMergeAction = (branchName: "feature/arcade" | "hotfix/theme") => {
    if (isMerging) return;
    setIsMerging(true);
    setConsoleLogs([
      `$ git checkout main`,
      `Switched to branch 'main'`,
      `$ git merge ${branchName} --no-ff`
    ]);

    let step = 0;
    const isArcade = branchName === "feature/arcade";
    const mergeLogs = isArcade
      ? [
          "Auto-merging components/retro-arcade.tsx",
          "CONFLICT (content): Merge conflict in components/retro-arcade.tsx. Resolving automatically...",
          "  ✓ Resolution: Auto-applied upstream edits.",
          "Updating 9f8e7d6..bc4d8e9",
          "Fast-forward",
          "  components/retro-arcade.tsx | 360 ++++++++++++++",
          "  1 file changed, 360 insertions(+)",
          "🎉 Merge branch 'feature/arcade' successful!"
        ]
      : [
          "Auto-merging components/ui/custom-cursor.tsx",
          "Auto-merging components/sections/skills-orbit.tsx",
          "Updating bc4d8e9..fe982a1",
          "Fast-forward",
          "  components/ui/custom-cursor.tsx | 20 +++-",
          "  components/sections/skills-orbit.tsx | 4 +-",
          "  2 files changed, 18 insertions(+), 6 deletions(-)",
          "🎉 Merge branch 'hotfix/theme' successful!"
        ];

    const timer = setInterval(() => {
      if (step < mergeLogs.length) {
        setConsoleLogs((prev) => [...prev, mergeLogs[step]]);
        playClickSound(800 + step * 100, "triangle", 0.05);
        step++;
      } else {
        clearInterval(timer);
        setIsMerging(false);
        setActiveBranch("main");
        
        // Highlight correct target commit node on success
        const targetNode = isArcade 
          ? COMMITS.find(c => c.id === "c5") 
          : COMMITS.find(c => c.id === "c6");
        if (targetNode) {
          setSelectedCommit(targetNode);
        }
      }
    }, 350);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none mt-12">
      
      {/* Title */}
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
          <GitBranch className="h-4.5 w-4.5 text-primary" />
          Git Network Graph Simulator
        </h3>
        <p className="text-xs text-muted-foreground">
          Interactive commit mapping. Click nodes to switch checkouts, or run merge pipelines dynamically.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SVG Commit Graph Visual Box (Left) */}
        <div className="flex-1 bg-[#070b13] border border-border/80 rounded-2xl p-5 flex items-center justify-center relative overflow-hidden h-72">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <svg 
            viewBox="0 0 520 300" 
            className="w-full h-full max-w-[480px] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. Branch connector pipelines */}
            {/* main branch line */}
            <path d="M 40 70 L 480 70" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.6" />
            {/* feature/arcade line */}
            <path d="M 140 70 L 200 150 L 280 150 L 380 70" fill="none" stroke="#f97316" strokeWidth="2.5" opacity="0.6" strokeDasharray="3 3" />
            {/* hotfix/theme line */}
            <path d="M 300 70 L 360 230 L 420 230 L 460 70" fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.6" strokeDasharray="3 3" />

            {/* 2. Branch Legend Decals */}
            <text x="15" y="74" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">main</text>
            <text x="15" y="154" fill="#f97316" fontSize="9" fontWeight="bold" fontFamily="monospace">feature/*</text>
            <text x="15" y="234" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">hotfix/*</text>

            {/* 3. Commit nodes plotting */}
            {COMMITS.map((node) => {
              const isSelected = selectedCommit.id === node.id;
              const color = node.branch === "main" ? "#22c55e" : node.branch === "feature/arcade" ? "#f97316" : "#ef4444";
              
              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer group"
                  onClick={() => handleNodeClick(node)}
                >
                  {/* Glowing selection circle */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r="12" fill={color} fillOpacity="0.2" className="animate-ping" style={{ animationDuration: "1.8s" }} />
                  )}
                  {/* Base node */}
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r={isSelected ? "7" : "5"} 
                    fill={color} 
                    stroke="#070b13" 
                    strokeWidth="1.5"
                    className="transition-all duration-200 group-hover:r-[7px]" 
                  />
                  {/* Inner center dot for selected */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r="2.5" fill="#ffffff" />
                  )}
                  {/* Tooltip hint label */}
                  <text 
                    x={node.x} 
                    y={node.y - 12} 
                    fill="#ffffff" 
                    fontSize="7" 
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-black pointer-events-none"
                  >
                    {node.hash}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Merge CTA floating panel */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={() => handleMergeAction("feature/arcade")}
              disabled={isMerging}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-md text-[10px] font-bold text-amber-500 hover:bg-amber-500/20 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <GitMerge className="h-3 w-3" />
              Merge arcade
            </button>
            <button
              onClick={() => handleMergeAction("hotfix/theme")}
              disabled={isMerging}
              className="flex items-center gap-1 px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-md text-[10px] font-bold text-red-500 hover:bg-red-500/20 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <GitMerge className="h-3 w-3" />
              Merge hotfix
            </button>
          </div>
        </div>

        {/* Console & Commit Metadata Details (Right) */}
        <div className="w-full lg:w-80 flex flex-col gap-3">
          
          {/* Commit Inspector */}
          <div className="p-4 rounded-2xl border border-border/60 bg-card flex flex-col gap-2.5">
            <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase flex items-center gap-1 border-b border-border/40 pb-1.5 select-none">
              <GitCommit className="h-3.5 w-3.5" />
              <span>COMMIT INSPECTOR</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-foreground">SHA: {selectedCommit.hash}</span>
                <span 
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: selectedCommit.branch === "main" ? "rgba(34,197,94,0.15)" : selectedCommit.branch === "feature/arcade" ? "rgba(249,115,22,0.15)" : "rgba(239,68,68,0.15)",
                    color: selectedCommit.branch === "main" ? "#22c55e" : selectedCommit.branch === "feature/arcade" ? "#f97316" : "#ef4444"
                  }}
                >
                  {selectedCommit.branch}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{selectedCommit.date} • {selectedCommit.author}</span>
              <p className="text-xs text-foreground italic bg-muted/40 p-2.5 rounded-lg border border-border/30 mt-1 select-text">
                &ldquo;{selectedCommit.message}&rdquo;
              </p>
            </div>
          </div>

          {/* Console logger output */}
          <div className="flex-1 rounded-2xl border border-border/60 bg-[#04070d] flex flex-col overflow-hidden h-36">
            <div className="h-7 bg-[#090e18] border-b border-border/40 px-3 flex items-center gap-1.5 select-none text-[9px] font-mono text-muted-foreground">
              <Terminal className="h-3 w-3" />
              <span>GIT CONSOLE LOGS</span>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto font-mono text-[10px] text-amber-500/80 space-y-0.5 custom-scrollbar">
              {consoleLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={
                    log.startsWith("$") 
                      ? "text-sky-400 font-bold" 
                      : log.startsWith("🎉")
                      ? "text-emerald-500 font-extrabold"
                      : "text-amber-500/60"
                  }
                >
                  {log}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
