"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Play, Folder, FileCode, CheckCircle2, RefreshCw } from "lucide-react";

interface IDEFile {
  name: string;
  language: string;
  iconColor: string;
  code: string;
  runOutput: string[];
}

const FILES: Record<string, IDEFile> = {
  "README.md": {
    name: "README.md",
    language: "markdown",
    iconColor: "text-sky-500",
    code: `# Abishek Khadka - Full-Stack Developer

* Passionate about building robust web applications.
* Specialized in Next.js, Node.js, and cloud systems.
* Fan of clean architecture, git visualizers, and interactive design.

## Technical Goals
1. Push boundaries of interactive front-end design.
2. Develop high-performance distributed microservices.
3. Master vector-based graphics and simulation overlays.
`,
    runOutput: [
      "cat README.md",
      "--------------------------------------------------",
      "👋 Hello visitor!",
      "Thank you for exploring my developer playground.",
      "Feel free to check other files and click 'Run Script'!",
      "--------------------------------------------------",
      "Process finished with exit code 0"
    ]
  },
  "skills.json": {
    name: "skills.json",
    language: "json",
    iconColor: "text-amber-500",
    code: `{
  "core_competencies": {
    "frontend": ["Next.js", "React.js", "TypeScript", "TailwindCSS"],
    "backend": ["Node.js", "Express.js", "Socket.io", "GraphQL"],
    "database": ["PostgreSQL", "MongoDB", "Prisma ORM"],
    "devops": ["Docker", "AWS", "Git", "GitHub Actions"]
  },
  "metrics": {
    "caffeine_input_efficiency": "99.4%",
    "clean_code_factor": "100%",
    "bugs_fixed_per_week": "overflow"
  }
}`,
    runOutput: [
      "jq '.' skills.json",
      "--------------------------------------------------",
      "💡 CORE kompetence visualizer active:",
      "  Next.js    [████████████████████] 95%",
      "  Node.js    [██████████████████░░] 90%",
      "  Docker     [██████████████░░░░░░] 70%",
      "  AWS Cloud  [████████████░░░░░░░░] 60%",
      "--------------------------------------------------",
      "Process finished with exit code 0"
    ]
  },
  "experience.ts": {
    name: "experience.ts",
    language: "typescript",
    iconColor: "text-blue-500",
    code: `import { Job } from "./types";

const timeline: Job[] = [
  {
    role: "Full-Stack Engineer",
    company: "Freelance / Open Source",
    period: "2024 - Present",
    focus: "Real-time socket overlays & high fidelity UI dashboards"
  },
  {
    role: "Software Developer Intern",
    company: "Devlabs Ltd.",
    period: "2023 - 2024",
    focus: "Database optimization and cloud deployment pipelines"
  }
];

export function runExperienceReport() {
  console.table(timeline, ["role", "company", "period"]);
}
`,
    runOutput: [
      "ts-node experience.ts",
      "--------------------------------------------------",
      "┌─────────┬─────────────────────┬───────────────────┬─────────────┐",
      "│ (index) │        role         │      company      │   period    │",
      "├─────────┼─────────────────────┼───────────────────┼─────────────┤",
      "│    0    │ 'Full-Stack Eng'    │ 'Freelance / OS'  │ '2024-Pres' │",
      "│    1    │ 'Software Dev Int'  │ 'Devlabs Ltd.'    │ '2023-2024' │",
      "└─────────┴─────────────────────┴───────────────────┴─────────────┘",
      "--------------------------------------------------",
      "Process finished with exit code 0"
    ]
  },
  "compile.sh": {
    name: "compile.sh",
    language: "bash",
    iconColor: "text-emerald-500",
    code: `#!/bin/bash
echo "Initiating production build..."
npm run build --turbo

if [ $? -eq 0 ]; then
  echo "Build successful! Deploying payload to edge caches..."
  curl -X POST https://api.vercel.com/deploy
else
  echo "Build failed. Initiating error diagnostics..."
  exit 1
fi
`,
    runOutput: [
      "./compile.sh",
      "--------------------------------------------------",
      "Building production bundle ...",
      "  ✓ Compiled client files successfully.",
      "  ✓ Optimized static assets caches.",
      "  ✓ CSS Tailwind processing complete.",
      "Uploading assets to edge nodes ... [100%]",
      "🎉 DEPLOYMENT ONLINE at: https://khadka27.dev",
      "--------------------------------------------------",
      "Process finished with exit code 0"
    ]
  }
};

export default function IDEPlayground() {
  const [activeFile, setActiveFile] = useState<string>("README.md");
  const [consoleLogs, setConsoleLogs] = useState<string[]>(["Select a script and click 'Run Script' above."]);
  const [isRunning, setIsRunning] = useState(false);
  const [runHistory, setRunHistory] = useState<Set<string>>(new Set());

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // Run the current script
  const handleRunScript = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);

    const file = FILES[activeFile];
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < file.runOutput.length) {
        setConsoleLogs((prev) => [...prev, file.runOutput[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        
        // Track unique runs for achievement
        const updatedHistory = new Set(runHistory);
        updatedHistory.add(activeFile);
        setRunHistory(updatedHistory);

        // If all 4 scripts have been run, unlock achievement
        if (updatedHistory.size === Object.keys(FILES).length) {
          window.dispatchEvent(
            new CustomEvent("achievement-unlock", { detail: { id: "ide-explorer" } })
          );
        }
      }
    }, 250);
  };

  // Helper to colorize code syntax inside mock code window
  const renderHighlightedCode = (fileKey: string) => {
    const file = FILES[fileKey];
    
    if (file.language === "json") {
      return file.code.split("\n").map((line, i) => {
        // Simple regex replace for JSON colorize
        let colorLine = line
          .replace(/(".*?")(\s*:)/g, '<span class="text-sky-400">$1</span>$2')
          .replace(/(:\s*)(".*?")/g, '$1<span class="text-amber-300">$2</span>')
          .replace(/(:\s*)(\[.*?\])/g, '$1<span class="text-indigo-400">$2</span>');
        return (
          <div key={i} className="min-h-5" dangerouslySetInnerHTML={{ __html: colorLine }} />
        );
      });
    }

    if (file.language === "typescript") {
      return file.code.split("\n").map((line, i) => {
        let colorLine = line
          .replace(/\b(const|let|import|from|export|function|return|class|interface)\b/g, '<span class="text-pink-500 font-bold">$1</span>')
          .replace(/(".*?")/g, '<span class="text-amber-300">$1</span>')
          .replace(/(\/\/.*)/g, '<span class="text-muted-foreground/60 italic">$1</span>');
        return (
          <div key={i} className="min-h-5" dangerouslySetInnerHTML={{ __html: colorLine }} />
        );
      });
    }

    if (file.language === "bash") {
      return file.code.split("\n").map((line, i) => {
        let colorLine = line
          .replace(/\b(echo|if|then|else|fi|exit)\b/g, '<span class="text-sky-400 font-bold">$1</span>')
          .replace(/(".*?")/g, '<span class="text-amber-300">$1</span>')
          .replace(/^(#.*)/g, '<span class="text-muted-foreground/60 italic">$1</span>');
        return (
          <div key={i} className="min-h-5" dangerouslySetInnerHTML={{ __html: colorLine }} />
        );
      });
    }

    // Default Markdown styling
    return file.code.split("\n").map((line, i) => {
      let colorLine = line;
      if (line.startsWith("#")) {
        colorLine = `<span class="text-primary font-black">${line}</span>`;
      } else if (line.startsWith("*")) {
        colorLine = `<span class="text-amber-400">${line}</span>`;
      }
      return (
        <div key={i} className="min-h-5" dangerouslySetInnerHTML={{ __html: colorLine }} />
      );
    });
  };

  return (
    <section 
      id="ide-playground" 
      className="relative section-shell border-t border-border/30 py-20 bg-background overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <span className="section-eyebrow justify-center">
            <TerminalIcon className="h-3.5 w-3.5 text-primary" />
            Interactive Code Console
          </span>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Developer <span className="orange-text">IDE Playground</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore active files in my mock VS Code. Click tabs, review code snippets, and hit &apos;Run Script&apos; to compile and view results in the simulated console.
          </p>
        </div>

        {/* IDE Frame Layout */}
        <div className="w-full rounded-2xl border border-border/80 bg-[#070b13] overflow-hidden flex flex-col shadow-2xl shadow-black/50 select-none">
          
          {/* Top Title/Mac style dots Bar */}
          <div className="h-10 bg-[#0c121e] border-b border-border/80 px-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
              abishek-workspace - editor-shell
            </span>
            <div className="w-12" /> {/* spacer */}
          </div>

          <div className="flex flex-1 flex-col md:flex-row min-h-[360px]">
            
            {/* Sidebar File Tree */}
            <div className="w-full md:w-56 bg-[#090e18] border-r border-border/60 flex flex-col p-3 shrink-0">
              <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase mb-3 flex items-center gap-1">
                <Folder className="h-3.5 w-3.5" />
                <span>WORKSPACE FILES</span>
              </div>
              <div className="flex flex-col gap-1">
                {Object.keys(FILES).map((fileKey) => {
                  const file = FILES[fileKey];
                  const isActive = activeFile === fileKey;
                  const hasRun = runHistory.has(fileKey);

                  return (
                    <button
                      key={fileKey}
                      onClick={() => {
                        if (!isRunning) setActiveFile(fileKey);
                      }}
                      disabled={isRunning}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors text-left cursor-pointer ${
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className={`h-4 w-4 ${file.iconColor}`} />
                        <span>{file.name}</span>
                      </div>
                      
                      {/* Check badge if script run complete */}
                      {hasRun && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editor Pane (Middle) */}
            <div className="flex-1 bg-[#070b13] flex flex-col">
              
              {/* File tabs row */}
              <div className="flex bg-[#090e18] border-b border-border/40 select-none">
                <div className="flex items-center gap-2 px-4 py-2 border-r border-border/40 bg-[#070b13] text-primary text-xs font-mono">
                  <FileCode className={`h-3.5 w-3.5 ${FILES[activeFile].iconColor}`} />
                  <span>{activeFile}</span>
                </div>
                <div className="flex-1 flex justify-end items-center px-3.5">
                  <button
                    onClick={handleRunScript}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-primary text-white text-[11px] font-mono hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>RUNNING...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 fill-current" />
                        <span>RUN SCRIPT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code display grid */}
              <div className="flex-1 p-5 overflow-auto font-mono text-xs text-slate-300 leading-relaxed max-h-[300px]">
                <div className="flex gap-4">
                  {/* Line numbers helper */}
                  <div className="text-muted-foreground/30 text-right select-none pr-1">
                    {Array.from({ length: FILES[activeFile].code.split("\n").length }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Code lines */}
                  <div className="flex-1 overflow-x-auto whitespace-pre">
                    {renderHighlightedCode(activeFile)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Console (Bottom) */}
          <div className="h-44 bg-[#04070d] border-t border-border/80 flex flex-col overflow-hidden">
            <div className="h-8 bg-[#090e18] border-b border-border/40 px-4 flex items-center gap-2 select-none text-[10px] font-mono text-muted-foreground">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>TERMINAL OUTPUT CONSOLE</span>
            </div>
            
            {/* Logs console area */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-amber-500/90 space-y-1 custom-scrollbar">
              {consoleLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={
                    log.startsWith("Process finished") 
                      ? "text-emerald-500 font-bold" 
                      : log.startsWith("ts-node") || log.startsWith("jq") || log.startsWith("./") || log.startsWith("cat")
                      ? "text-sky-400"
                      : "text-amber-500/80"
                  }
                >
                  {log}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>
          </div>
        </div>

        {/* Task progress badge reminder */}
        <div className="flex justify-center text-xs text-muted-foreground select-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/30">
            <span className="font-bold">IDE Explorer Achievement:</span>
            <span>{runHistory.size} / {Object.keys(FILES).length} scripts executed.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
