"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  Download,
  Mail,
  Code2,
  Sparkles,
  Github,
  Linkedin,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import TiltCard from "@/components/ui/tilt-card";

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface HeroProps {
  githubProfileImage?: string | null;
}

export default function HeroSection({ githubProfileImage }: HeroProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    // Reset scroll restoration to manual and scroll to top on mount
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="home"
      className="relative section-shell min-h-[calc(80vh-4rem)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-20 md:pt-28 pb-8 md:pb-0 overflow-hidden"
    >
      {/* ── Grid texture ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(24 95% 53%) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* ── Glow blobs ───────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px] anim-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-400/8 blur-[100px] anim-blob-reverse"
      />

      {/* ══ LEFT COPY ════════════════════════ */}
      <div className="relative z-10 w-full md:w-[52%] flex flex-col gap-6 text-center md:text-left">
        {/* Available badge */}
        <motion.div
          {...FADE(0.1)}
          className="flex justify-center md:justify-start"
        >
          <span className="section-eyebrow gap-2.5">
            <span className="ping-dot" />
            Available for Work
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p {...FADE(0.18)} className="text-lg text-muted-foreground">
          Hi, I&apos;m{" "}
          <span className="font-semibold text-foreground">
            {siteConfig.name}
          </span>
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...FADE(0.26)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.03em] leading-[1.06]"
          style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
        >
          <span className="text-foreground">I turn ideas into</span>
          <br />
          <TypeAnimation
            sequence={[
              "scalable web apps.",
              2200,
              "real-time systems.",
              2200,
              "cloud-ready tools.",
              2200,
              "fast digital builds.",
              2200,
            ]}
            wrapper="span"
            speed={52}
            repeat={Infinity}
            className="orange-text"
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          {...FADE(0.34)}
          className="max-w-lg mx-auto md:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Full-stack developer specialising in{" "}
          <span className="font-semibold text-foreground">Next.js</span>,{" "}
          <span className="font-semibold text-foreground">Node.js</span>, modern
          APIs, real-time features &amp; cloud deployments.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...FADE(0.42)}
          className="flex flex-wrap gap-3 justify-center md:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("contact")}
            className="btn-primary"
          >
            <Mail className="h-4 w-4" /> Hire Me{" "}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("projects")}
            className="btn-outline"
          >
            <Code2 className="h-4 w-4" /> View Projects
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-ghost"
          >
            <Download className="h-4 w-4" /> Resume
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...FADE(0.5)}
          className="flex gap-8 justify-center md:justify-start pt-2"
        >
          {[
            { n: "20+", l: "Projects" },
            { n: "1.5+", l: "Years Exp." },
            { n: "99%", l: "Satisfaction" },
          ].map(({ n, l }, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center md:items-start"
            >
              <span className="text-3xl font-black orange-text leading-none">
                {n}
              </span>
              <span className="text-xs text-muted-foreground mt-1">{l}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          {...FADE(0.6)}
          className="flex gap-2 justify-center md:justify-start"
        >
          {[
            {
              href: "https://github.com/khadka27",
              icon: Github,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/khadka27",
              icon: Linkedin,
              label: "LinkedIn",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ══ RIGHT IMAGE ══════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full md:w-[44%] flex justify-center"
      >
        <TiltCard className="relative flex items-center justify-center p-6 sm:p-8">
          {/* Tech grid corners/borders instead of circular rings */}
          <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
          <div className="absolute inset-[-12px] border border-primary/10 border-dashed rounded-[32px] pointer-events-none" />

          {/* Orange glow behind image card */}
          <div className="absolute inset-0 rounded-3xl bg-primary/15 blur-3xl scale-95" />

          {/* Profile photo - full size rectangular card with rounded corners */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[400px] overflow-hidden rounded-2xl border border-border bg-[#080c14] shadow-2xl">
            <Image
              src={githubProfileImage || "/placeholder.svg"}
              alt={`${siteConfig.name} - full-stack developer`}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Floating chip -bottom right */}
          <motion.div className="anim-float absolute bottom-2 right-2 sm:-right-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-md z-20">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            Full-Stack Dev
          </motion.div>

          {/* Floating chip -top left */}
          <motion.div
            className="anim-float absolute top-2 left-2 sm:-left-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-md z-20"
            style={{ animationDelay: "1.8s" }}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Open to Hire
          </motion.div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
