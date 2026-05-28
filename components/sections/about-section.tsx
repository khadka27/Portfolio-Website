"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Heart,
  Sparkles,
  Target,
  MapPin,
  Server,
  TrendingUp,
  Zap,
} from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";
import DevBadgeCard from "./dev-badge-card";


interface AboutProps {
  githubAvatarUrl?: string | null;
  location?: string | null;
}

const HIGHLIGHTS = [
  { icon: Award, text: "20+ Projects", color: "text-amber-500" },
  { icon: Target, text: "99% Satisfaction", color: "text-green-500" },
  { icon: Heart, text: "Clean Code", color: "text-red-400" },
  { icon: Sparkles, text: "Innovation", color: "text-primary" },
];

const STATS = [
  { n: "20+", label: "Projects Completed" },
  { n: "1.5", label: "Years Experience" },
  { n: "1yr", label: "At Fishtail Info" },
];

const SERVICES = [
  {
    icon: Zap,
    title: "SaaS Platforms",
    desc: "Scalable, multi-tenant SaaS products built for growth.",
    accent: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Real-time Apps",
    desc: "WebSocket & Server-Sent Events for live, reactive UIs.",
    accent: "text-amber-500",
  },
  {
    icon: Server,
    title: "Full-Stack Solutions",
    desc: "End-to-end: UI, API, database, auth, deployment & monitoring.",
    accent: "text-orange-500",
  },
];

const TAGS = [
  "SaaS platforms",
  "Dashboards",
  "E-commerce",
  "Real-time chat",
  "Payment systems",
  "Admin panels",
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutSection({
  githubAvatarUrl,
  location,
}: AboutProps) {
  const loc = location || "Pokhara, Nepal";

  return (
    <section id="about" className="section-shell relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/6 blur-[100px] anim-blob"
      />

      {/* ── Section header ──────────────────── */}
      <div className="text-center mb-12 space-y-4">
        <motion.div {...inView(0)}>
          <span className="section-eyebrow">
            <span className="ping-dot" />
            About Me
          </span>
        </motion.div>
        <motion.h2
          {...inView(0.08)}
          className="section-heading text-3xl md:text-5xl"
        >
          Developer &amp; Problem Solver
        </motion.h2>
        <motion.p
          {...inView(0.14)}
          className="section-subtext"
        >
          Based in Nepal -open to worldwide remote projects
        </motion.p>
      </div>

      {/* ── Main 2-col ──────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto mb-12">
        {/* Left -avatar + highlights */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 flex flex-col items-center gap-8"
        >
          {/* 3D Developer ID Badge */}
          <DevBadgeCard avatarUrl={githubAvatarUrl} location={loc} />

          {/* Highlight pills */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-[260px] mt-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-primary/35 transition-colors duration-200 cursor-default"
              >
                <h.icon className={`h-3.5 w-3.5 flex-shrink-0 ${h.color}`} />
                <span className="text-[11px] font-semibold text-foreground leading-tight">
                  {h.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right -bio */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-3 flex flex-col justify-center space-y-6 text-muted-foreground leading-relaxed"
        >
          <p className="text-lg text-foreground">
            I&apos;m a passionate full-stack developer from{" "}
            <span className="text-primary font-semibold">{loc}</span> with 1.5
            years of production experience. I work at{" "}
            <span className="text-primary font-semibold">
              Fishtail Infosolutions
            </span>{" "}
            building real products for real clients.
          </p>

          <p>
            My work spans the entire stack -UI, backend, REST &amp; WebSocket
            APIs, auth systems, payment integrations, database design, CI/CD and
            cloud infrastructure. I care about{" "}
            <span className="font-semibold text-foreground">clean code</span>,{" "}
            <span className="font-semibold text-foreground">
              scalable architecture
            </span>{" "}
            and{" "}
            <span className="font-semibold text-foreground">shipping fast</span>
            .
          </p>

          {/* I enjoy */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              <span className="o-bar" /> I enjoy building
            </h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              <span className="o-bar" /> Stack
            </h3>
            <p className="text-sm">
              Next.js, React, Node.js, Express, MongoDB, PostgreSQL, Socket.io,
              Stripe / Khalti / eSewa, Docker, AWS, Vercel
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Stats ───────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <TiltCard className="h-full">
              <div className="card-base p-6 text-center h-full">
                <div className="text-4xl md:text-5xl font-black orange-text mb-1">
                  {s.n}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ── Services ────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {SERVICES.map((sv, i) => (
          <motion.div
            key={sv.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <TiltCard className="h-full">
              <div className="card-base p-6 group h-full">
                <div className="mb-4 inline-flex rounded-xl bg-muted p-2.5 group-hover:bg-primary/10 transition-colors duration-200">
                  <sv.icon
                    className={`h-5 w-5 ${sv.accent} group-hover:scale-110 transition-transform duration-200`}
                  />
                </div>
                <h3 className="font-bold text-foreground mb-2">{sv.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sv.desc}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
