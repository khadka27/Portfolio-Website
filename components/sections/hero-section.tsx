"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  Download,
  Mail,
  Code2,
  Github,
  Linkedin,
  MapPin,
  ChevronDown,
  Terminal,
  Globe,
  Layers,
  Cpu,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

/* ─── helpers ─────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0, blur = true) => ({
  initial: { opacity: 0, y: 28, ...(blur ? { filter: "blur(6px)" } : {}) },
  animate: { opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) },
  transition: { duration: 0.7, delay, ease },
});

const ROLES = [
  "scalable web apps.",
  "real-time systems.",
  "cloud-ready APIs.",
  "fast digital builds.",
];

const STATS = [
  { n: "20+", l: "Projects" },
  { n: "1.5+", l: "Years Exp." },
  { n: "99%", l: "Satisfaction" },
];

const SKILLS = [
  { label: "Next.js", icon: Globe },
  { label: "TypeScript", icon: Code2 },
  { label: "Node.js", icon: Terminal },
  { label: "React", icon: Layers },
  { label: "MongoDB", icon: Cpu },
];

/* ─── component ───────────────────────────────────────── */
interface HeroProps {
  githubProfileImage?: string | null;
}

export default function HeroSection({ githubProfileImage }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  /* 3-D tilt spring */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 18 });
  const sy = useSpring(my, { stiffness: 100, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    setMounted(true);
    // Secondary guard — layout <head> script handles the primary reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      className="relative flex flex-col min-h-screen overflow-hidden"
    >
      {/* ── Background layer ────────────────────────────────── */}
      {/* Mesh gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 65% -10%, hsl(var(--primary-hue) 95% 53% / 0.15) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 50% at -10% 80%, hsl(var(--primary-hue) 60% 40% / 0.09) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 40% at 100% 100%, hsl(var(--primary-hue) 80% 60% / 0.06) 0%, transparent 70%)",
          ].join(", "),
        }}
      />
      {/* Fine dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary-hue) 95% 53% / 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          opacity: 0.4,
        }}
      />
      {/* Animated orbs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full -z-10"
        style={{ background: "hsl(var(--primary-hue) 95% 53% / 0.07)", filter: "blur(80px)" }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full -z-10"
        style={{ background: "hsl(var(--primary-hue) 60% 40% / 0.06)", filter: "blur(100px)" }}
      />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6 pt-24 md:pt-28 pb-20 flex-1">

        {/* ══ LEFT COPY ════════════════════════════════════════ */}
        <div className="w-full lg:w-[53%] flex flex-col gap-5 text-center lg:text-left">

          {/* Badge row */}
          <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
            <span className="section-eyebrow gap-2">
              <span className="ping-dot" />
              Available for Work
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold text-muted-foreground"
              style={{ borderColor: "hsl(var(--primary-hue) 95% 53% / 0.2)" }}
            >
              <MapPin className="h-3 w-3" />
              Nepal · Remote
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p {...fadeUp(0.12)} className="text-base sm:text-lg text-muted-foreground font-medium">
            Hi, I&apos;m{" "}
            <span className="text-foreground font-bold">{siteConfig.name}</span>
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold tracking-[-0.03em] leading-[1.04]"
            style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
          >
            <span className="block text-foreground">I turn ideas into</span>
            <span className="block mt-1">
              <TypeAnimation
                sequence={ROLES.flatMap((r) => [r, 2400])}
                wrapper="span"
                speed={58}
                repeat={Infinity}
                className="orange-text"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.28)}
            className="max-w-md mx-auto lg:mx-0 text-base sm:text-[1.05rem] text-muted-foreground leading-relaxed"
          >
            Full-stack developer specialising in{" "}
            <span className="text-foreground font-semibold">Next.js</span>,{" "}
            <span className="text-foreground font-semibold">Node.js</span>, modern
            APIs, real-time features &amp; cloud deployments.
          </motion.p>

          {/* Skill chips */}
          <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {SKILLS.map(({ label, icon: Icon }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07, ease }}
                whileHover={{ y: -2, scale: 1.06 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-default select-none"
              >
                <Icon className="h-2.5 w-2.5 text-primary" />
                {label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.44)} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="btn-primary text-sm"
            >
              <Mail className="h-4 w-4" />
              Hire Me
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="btn-outline text-sm"
            >
              <Code2 className="h-4 w-4" />
              View Projects
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost text-sm"
            >
              <Download className="h-4 w-4" />
              Resume
            </motion.a>
          </motion.div>

          {/* Stats + Socials row */}
          <motion.div {...fadeUp(0.52)} className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-1">
            {/* Stats */}
            {STATS.map(({ n, l }, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 + i * 0.09, ease }}
                className="flex flex-col items-center lg:items-start"
              >
                <span className="text-2xl font-black orange-text leading-none">{n}</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">{l}</span>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-border" />

            {/* Socials */}
            <div className="flex gap-2">
              {[
                { href: "https://github.com/khadka27", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/khadka27", icon: Linkedin, label: "LinkedIn" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ RIGHT PHOTO CARD ═════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="w-full lg:w-[44%] flex justify-center items-center"
        >
          <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Animated glow ring behind card */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 rounded-[28px] -z-10"
                style={{
                  background: `conic-gradient(from 0deg, hsl(var(--primary-hue) 95% 53% / 0.4), transparent 40%, hsl(var(--primary-hue) 60% 40% / 0.3) 60%, transparent 80%, hsl(var(--primary-hue) 95% 53% / 0.4))`,
                  filter: "blur(20px)",
                }}
              />

              {/* Outer dashed border ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-[34px] border border-dashed pointer-events-none"
                style={{ borderColor: "hsl(var(--primary-hue) 95% 53% / 0.2)" }}
              />

              {/* Corner bracket accents */}
              {(["tl", "tr", "bl", "br"] as const).map((pos, i) => {
                const cls = {
                  tl: "top-0 left-0 border-t-[2.5px] border-l-[2.5px] rounded-tl-2xl",
                  tr: "top-0 right-0 border-t-[2.5px] border-r-[2.5px] rounded-tr-2xl",
                  bl: "bottom-0 left-0 border-b-[2.5px] border-l-[2.5px] rounded-bl-2xl",
                  br: "bottom-0 right-0 border-b-[2.5px] border-r-[2.5px] rounded-br-2xl",
                }[pos];
                return (
                  <motion.div
                    key={pos}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + i * 0.08, ease }}
                    className={`absolute w-8 h-8 ${cls} pointer-events-none z-20`}
                    style={{ borderColor: "hsl(var(--primary-hue) 95% 53% / 0.7)" }}
                  />
                );
              })}

              {/* Photo card */}
              <div className="relative w-60 h-[320px] sm:w-72 sm:h-[380px] md:w-[290px] md:h-[390px] overflow-hidden rounded-2xl border border-border/50 bg-[#080c14] shadow-2xl z-10">
                <Image
                  src={githubProfileImage || "/placeholder.svg"}
                  alt={`${siteConfig.name} - full-stack developer`}
                  fill
                  className="object-cover object-top scale-105"
                  priority
                />
                {/* Gradient overlay bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                  }}
                />
                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-sm font-bold leading-tight">{siteConfig.name}</p>
                  <p className="text-white/55 text-[11px] mt-0.5 font-medium">Full-Stack Developer</p>
                </div>
                {/* Shimmer on card */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                  }}
                />
              </div>

              {/* Floating chip: Open to Hire — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.75, ease }}
                className="anim-float absolute -top-5 -right-4 sm:-right-8 z-30 flex items-center gap-2 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-foreground shadow-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to Hire
              </motion.div>


            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <AnimatePresence>
        {mounted && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => scrollTo("about")}
            aria-label="Scroll to about"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="p-1.5 rounded-full border border-border/50 group-hover:border-primary/40 transition-colors"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
