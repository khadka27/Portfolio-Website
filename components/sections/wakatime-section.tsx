"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Clock, Flame, TrendingUp, Monitor } from "lucide-react";

interface WakaData {
  total_seconds_last_7_days: number;
  daily_average: number;
  languages: { name: string; percent: number; total_seconds: number; color: string }[];
  editors: { name: string; percent: number }[];
  streak_days: number;
  best_day_seconds: number;
  best_day: string;
  formatted: { total: string; daily: string };
  isMock: boolean;
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function WakaTimeSection() {
  const [data, setData] = useState<WakaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="wakatime" className="section-shell relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px] anim-blob" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <motion.div {...inView(0)}>
          <span className="section-eyebrow">
            <Clock className="h-3 w-3" />
            Coding Activity
          </span>
        </motion.div>
        <motion.h2 {...inView(0.08)} className="section-heading text-3xl md:text-5xl">
          WakaTime Stats
        </motion.h2>
        <motion.p {...inView(0.14)} className="section-subtext">
          Real-time coding activity — hours logged, languages used, and streaks tracked automatically.
          {data?.isMock && (
            <span className="block text-xs text-muted-foreground/60 mt-1">(Demo data — add WAKATIME_API_KEY to .env for live stats)</span>
          )}
        </motion.p>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card-base h-28 bg-muted/30" />
          ))}
        </div>
      )}

      {data && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Last 7 Days", value: data.formatted.total, sub: "total coding time", color: "text-primary" },
              { icon: TrendingUp, label: "Daily Average", value: data.formatted.daily, sub: "per day", color: "text-blue-500" },
              { icon: Flame, label: "Current Streak", value: `${data.streak_days} days`, sub: "consecutive days", color: "text-amber-500" },
              { icon: Monitor, label: "Top Editor", value: data.editors[0]?.name || "VS Code", sub: `${data.editors[0]?.percent || 97}% of time`, color: "text-green-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="card-base p-5 text-center"
              >
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl sm:text-2xl font-black orange-text leading-tight">{stat.value}</div>
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                <div className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Language breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="card-base p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="h-4 w-4 text-primary" />
              <h3 className="font-bold text-foreground">Language Breakdown</h3>
              <span className="ml-auto text-xs text-muted-foreground">Last 7 days</span>
            </div>

            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                      <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-muted-foreground">{lang.percent.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
