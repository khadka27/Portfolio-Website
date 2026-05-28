"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, GitPullRequest, Star, GitBranch, GitFork, Activity } from "lucide-react";

interface GithubEvent {
  type: string;
  repo: string;
  message: string;
  time: string;
  branch: string;
}

function EventIcon({ type }: { type: string }) {
  const cls = "h-3.5 w-3.5 flex-shrink-0";
  if (type === "PushEvent") return <GitCommit className={`${cls} text-green-500`} />;
  if (type === "PullRequestEvent") return <GitPullRequest className={`${cls} text-purple-500`} />;
  if (type === "WatchEvent") return <Star className={`${cls} text-amber-500`} />;
  if (type === "CreateEvent") return <GitBranch className={`${cls} text-blue-500`} />;
  if (type === "ForkEvent") return <GitFork className={`${cls} text-pink-500`} />;
  return <Activity className={`${cls} text-muted-foreground`} />;
}

function EventLabel({ type }: { type: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    PushEvent: { label: "push", cls: "bg-green-500/10 text-green-500 border-green-500/25" },
    PullRequestEvent: { label: "PR", cls: "bg-purple-500/10 text-purple-500 border-purple-500/25" },
    WatchEvent: { label: "star", cls: "bg-amber-500/10 text-amber-500 border-amber-500/25" },
    CreateEvent: { label: "create", cls: "bg-blue-500/10 text-blue-500 border-blue-500/25" },
    ForkEvent: { label: "fork", cls: "bg-pink-500/10 text-pink-500 border-pink-500/25" },
  };
  const { label, cls } = map[type] || { label: "event", cls: "bg-muted text-muted-foreground border-border" };
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

export default function GitHubActivityFeed() {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => r.json())
      .then((d) => { setEvents(d.events || []); setIsMock(d.isMock); })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card-base p-6 max-w-5xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="font-bold text-foreground text-sm">Live GitHub Activity</h3>
        <span className="flex items-center gap-1 ml-auto text-[10px] text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {isMock ? "Demo feed" : "Live"}
        </span>
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-muted" />
              <div className="flex-1 h-3 bg-muted rounded" />
              <div className="w-12 h-3 bg-muted rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="space-y-2 overflow-hidden max-h-[320px] overflow-y-auto scrollbar-none pr-1">
          <AnimatePresence>
            {events.map((ev, i) => (
              <motion.div
                key={`${ev.repo}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 py-2.5 border-b border-border/30 last:border-b-0 group hover:bg-muted/20 px-2 rounded-lg transition-colors"
              >
                <div className="mt-0.5">
                  <EventIcon type={ev.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <EventLabel type={ev.type} />
                    <span className="text-[11px] font-mono text-primary truncate max-w-[160px]">
                      {ev.repo.split("/")[1] || ev.repo}
                    </span>
                    {ev.branch && (
                      <span className="text-[10px] font-mono text-muted-foreground/60">
                        :{ev.branch}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{ev.message}</p>
                </div>
                <span className="text-[10px] text-muted-foreground/50 flex-shrink-0 mt-0.5 font-mono">
                  {ev.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
