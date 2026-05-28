"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Generate deterministic contribution data for 52 weeks
function generateSkylineData() {
  const weeks: number[][] = [];
  let seed = 7919;
  const lcg = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return Math.abs(seed) / 0xffffffff; };

  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const r = lcg();
      const isWeekend = d === 0 || d === 6;
      // Weekdays more likely to have contributions
      if (isWeekend) {
        week.push(r > 0.75 ? Math.floor(r * 4) : 0);
      } else {
        week.push(r > 0.25 ? Math.ceil(r * 12) : 0);
      }
    }
    weeks.push(week);
  }
  return weeks;
}

function getColor(count: number): string {
  if (count === 0) return "hsl(220 10% 18%)";
  if (count <= 2) return "hsl(24 95% 30%)";
  if (count <= 5) return "hsl(24 95% 45%)";
  if (count <= 9) return "hsl(24 95% 53%)";
  return "hsl(38 95% 60%)";
}

interface TooltipData {
  week: number;
  day: number;
  count: number;
  x: number;
  y: number;
}

export default function GitHubSkyline() {
  const weeks = useMemo(() => generateSkylineData(), []);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const CELL = 12;
  const GAP = 2;
  const PERSPECTIVE = 800;
  const TILT = 50; // degrees

  const maxCount = useMemo(() => Math.max(...weeks.flat()), [weeks]);

  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
  const totalCommits = useMemo(() => weeks.flat().reduce((a, b) => a + b, 0), [weeks]);
  const activeDays = useMemo(() => weeks.flat().filter((c) => c > 0).length, [weeks]);

  return (
    <div className="w-full">
      {/* Stats row */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {[
          { label: "Contributions", value: totalCommits, suffix: "" },
          { label: "Active Days", value: activeDays, suffix: "" },
          { label: "Longest Streak", value: 14, suffix: " days" },
        ].map((s) => (
          <div key={s.label} className="card-base px-5 py-3 text-center min-w-[110px]">
            <div className="text-2xl font-black orange-text">{s.value}{s.suffix}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 3D Skyline */}
      <div className="w-full overflow-x-auto scrollbar-none pb-4">
        <div
          className="mx-auto select-none"
          style={{
            perspective: PERSPECTIVE,
            perspectiveOrigin: "50% 40%",
            width: "fit-content",
          }}
        >
          <div
            style={{
              transform: `rotateX(${TILT}deg) rotateZ(-2deg)`,
              transformStyle: "preserve-3d",
              display: "flex",
              gap: GAP,
              padding: "20px 10px 60px 10px",
            }}
          >
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((count, di) => {
                  const barH = count === 0 ? 2 : Math.max(4, Math.round((count / maxCount) * 60));
                  const color = getColor(count);
                  return (
                    <motion.div
                      key={di}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setTooltip({ week: wi, day: di, count, x: rect.x, y: rect.y });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      title={`Week ${wi + 1}, ${DAYS[di]}: ${count} contributions`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (wi * 7 + di) * 0.001,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        width: CELL,
                        height: barH,
                        backgroundColor: color,
                        borderRadius: 2,
                        transformOrigin: "bottom",
                        cursor: count > 0 ? "pointer" : "default",
                        boxShadow: count > 5
                          ? `0 0 ${count}px ${color}80`
                          : undefined,
                        transition: "background-color 0.2s",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-background border border-border rounded-lg px-3 py-2 text-xs font-semibold shadow-xl pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y - 48 }}
          >
            <span className="text-primary font-black">{tooltip.count}</span>{" "}
            <span className="text-foreground">contribution{tooltip.count !== 1 ? "s" : ""}</span>
            <div className="text-muted-foreground/60 text-[10px] mt-0.5">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][tooltip.day]}, Week {tooltip.week + 1}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
        <span>Less</span>
        {[0, 2, 5, 9, 12].map((c) => (
          <div
            key={c}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getColor(c) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
