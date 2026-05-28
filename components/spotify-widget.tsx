"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Music, ExternalLink, Volume2 } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  duration?: number;
  progress?: number;
}

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0.6, 1, 0.8, 0.5, 0.9].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-green-400 rounded-full"
          animate={{ scaleY: [h, 1, h * 0.7, 1, h] }}
          transition={{
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const fetch_ = () =>
      fetch("/api/spotify")
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});

    fetch_();
    const id = setInterval(fetch_, 30000);
    return () => clearInterval(id);
  }, []);

  // Only show if music is playing (or in demo with no API key, show offline state)
  if (!data) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 max-w-[280px]"
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.9 }}
          transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {minimized ? (
            /* Minimized pill */
            <button
              onClick={() => setMinimized(false)}
              className="flex items-center gap-2 bg-background/90 backdrop-blur-xl border border-border/80 rounded-full px-3 py-2 shadow-lg cursor-pointer hover:border-green-500/40 transition-colors"
            >
              <Music className="h-3.5 w-3.5 text-green-500" />
              {data.isPlaying && <EqBars />}
            </button>
          ) : (
            /* Full widget */
            <div className="bg-background/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-xl overflow-hidden">
              {/* Green top bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-green-500 to-emerald-400" />

              <div className="p-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-wider">
                    <Music className="h-3 w-3" />
                    {data.isPlaying ? "Now Playing" : "Spotify"}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setMinimized(true)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs p-0.5 cursor-pointer"
                      title="Minimize"
                    >
                      —
                    </button>
                    <button
                      onClick={() => setVisible(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs p-0.5 cursor-pointer"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {data.isPlaying && data.title ? (
                  <div className="flex items-center gap-3">
                    {/* Album art */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
                      {data.albumArt ? (
                        <Image src={data.albumArt} alt={data.album || ""} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <EqBars />
                      </div>
                      <p className="text-xs font-bold text-foreground truncate mt-0.5">{data.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{data.artist}</p>
                    </div>

                    {data.songUrl && (
                      <a
                        href={data.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-muted-foreground hover:text-green-500 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <Volume2 className="h-4 w-4" />
                    <p className="text-[11px]">Not currently listening</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
