"use client";

import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  date: string;
  snippet: string;
  imageUrl?: string;
  link: string;
  tags?: string[];
}

async function fetchPosts(username: string): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok" || !data.items) return [];

    return data.items.slice(0, 6).map((item: any) => {
      let snippet = "";
      if (item.description && typeof document !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = item.description;
        snippet = (div.querySelector("p")?.textContent || div.textContent || "")
          .trim()
          .slice(0, 150);
        if (snippet.length === 150) snippet += "…";
      }
      return {
        id: item.guid,
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        snippet: snippet || "No preview available.",
        imageUrl: item.thumbnail?.includes("TGH72N1I0qf3g_5p-h2fXg")
          ? undefined
          : item.thumbnail || undefined,
        link: item.link,
        tags: item.categories || [],
      };
    });
  } catch {
    return [];
  }
}

export default function WritingSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoading(true);
    fetchPosts("khadka27")
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="writing" className="section-shell">
      {/* ── Header ──────────────────────────── */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">
            <PenLine className="h-3 w-3" />
            Writing
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-3xl md:text-5xl"
        >
          My Writing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="section-subtext"
        >
          Ideas, tutorials and thoughts on development -from my Medium blog.
        </motion.p>
      </div>

      {/* ── Skeleton ────────────────────────── */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((k) => (
            <div key={k} className="card-base overflow-hidden animate-pulse">
              <div className="h-44 bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-4/5 bg-muted rounded-lg" />
                <div className="h-4 w-1/3 bg-muted rounded-lg" />
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (error || posts.length === 0) && (
        <div className="text-center py-20">
          <PenLine className="h-12 w-12 text-muted-foreground/25 mx-auto mb-4" />
          <p className="text-muted-foreground">No articles found right now.</p>
        </div>
      )}

      {/* ── Grid ────────────────────────────── */}
      {!loading && !error && posts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1, once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <div className="group card-base h-full flex flex-col overflow-hidden">
                {/* Hover reveal bar */}
                <div className="h-0 group-hover:h-[3px] bg-primary transition-all duration-300" />

                {/* Image */}
                {post.imageUrl &&
                !post.imageUrl.includes("TGH72N1I0qf3g_5p-h2fXg") ? (
                  <div className="relative w-full h-44 overflow-hidden bg-muted">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-20 bg-muted flex items-center justify-center">
                    <PenLine className="h-8 w-8 text-muted-foreground/25" />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-5">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.date}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-3">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  </h3>

                  {/* Snippet */}
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1 mb-4">
                    {post.snippet}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="chip text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-orange-600 transition-colors mt-auto"
                  >
                    Read on Medium <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── View all ────────────────────────── */}
      {!loading && !error && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://medium.com/@khadka27"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <PenLine className="h-4 w-4" />
            View All on Medium
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      )}
    </section>
  );
}
