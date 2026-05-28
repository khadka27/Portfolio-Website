"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Zap,
  Shield,
  Cloud,
  CheckCircle2,
  Cpu,
} from "lucide-react";

const COMPANY = {
  role: "Full Stack Developer / Software Developer",
  company: "Fishtail Infosolutions",
  url: "https://fishtailinfosolutions.com",
  duration: "2023 – Present",
  location: "Nepal",
  type: "Full-time",
  metrics: [
    { value: "1.5+", label: "Years Tenure" },
    { value: "10+", label: "Projects Shipped" },
    { value: "99%", label: "Client Rating" },
  ],
};

const CONTRIBUTIONS = [
  {
    icon: Code,
    title: "Full Stack Engineering",
    desc: "Developed next-gen web applications with Next.js, React, and Node.js. Built complex admin dashboards and responsive portals from the ground up.",
  },
  {
    icon: Zap,
    title: "Real-time Telemetry & Messaging",
    desc: "Implemented Socket.io workflows for instant chat, live push notifications, and data updates across multiple production platforms.",
  },
  {
    icon: Shield,
    title: "Secure FinTech Integrations",
    desc: "Designed and rolled out payment infrastructure covering Stripe, Khalti, and eSewa to handle secure client transactions.",
  },
  {
    icon: Database,
    title: "Database Architecture",
    desc: "Engineered performant data models and schema files inside Prisma ORM, utilizing MongoDB and PostgreSQL databases.",
  },
];

const PROJECTS = [
  {
    tag: "SaaS Platform",
    name: "Enterprise Admin Hub",
    details: "Built an internal multi-tenant dashboard system with role-based authorization controls and real-time activity metrics.",
  },
  {
    tag: "Real-Time API",
    name: "Customer Telemetry Engine",
    details: "Developed a Node.js-powered socket server managing live user connectivity, messaging, and push notifications.",
  },
  {
    tag: "FinTech",
    name: "Secure Payment Gateway Bridge",
    details: "Created a unified checkout flow integration supporting international (Stripe) and local (Khalti/eSewa) payment providers.",
  },
];

const TECH_CATEGORIES = [
  { name: "Frontend", items: ["Next.js", "React", "TypeScript", "TailwindCSS"] },
  { name: "Backend", items: ["Node.js", "Express.js", "Socket.io"] },
  { name: "Databases & DevOps", items: ["Prisma", "MongoDB", "PostgreSQL", "AWS"] },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"contributions" | "projects" | "tech">("contributions");

  return (
    <section id="experience" className="section-shell relative overflow-hidden">
      {/* Background glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-[120px] anim-blob-reverse"
      />

      {/* ── Header ──────────────────────────── */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">
            <Briefcase className="h-3 w-3" />
            Experience
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-3xl md:text-5xl"
        >
          My Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="section-subtext"
        >
          Professional journey and core impact at Fishtail Infosolutions
        </motion.p>
      </div>

      {/* ── Main Layout Grid ────────────────── */}
      <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
        
        {/* ══ LEFT: Company Card & Metrics (4 Columns) ══ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Company profile card */}
          <div className="card-base p-6 relative overflow-hidden group">
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
            
            <div className="flex items-start gap-4">
              {/* Animated Company Initial logo */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-xl font-black">
                F
                <div className="absolute -inset-1 rounded-xl border border-primary/20 animate-pulse" />
              </div>
              
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  <span className="ping-dot" /> {COMPANY.type}
                </span>
                <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {COMPANY.role}
                </h3>
                <a
                  href={COMPANY.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mt-0.5"
                >
                  {COMPANY.company}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Location & Duration metadata details */}
            <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-border/50">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary/70 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-[10px] uppercase tracking-wider">Duration</p>
                  <p className="text-sm font-medium">{COMPANY.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-[10px] uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium">{COMPANY.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-3">
            {COMPANY.metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-base p-4 text-center hover:border-primary/30"
              >
                <div className="text-2xl font-black orange-text leading-tight">{m.value}</div>
                <div className="text-[10px] font-semibold text-muted-foreground mt-1 leading-normal uppercase tracking-wider">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ RIGHT: Tabbed Dashboard (7 Columns) ══ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 card-base p-6 md:p-8 space-y-6"
        >
          {/* Tab selector buttons */}
          <div className="flex border-b border-border/50 pb-2 gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "contributions", label: "Key Impact", icon: CheckCircle2 },
              { id: "projects", label: "Featured Projects", icon: Cpu },
              { id: "tech", label: "Tech Stack", icon: Code },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shrink-0 focus:outline-none ${
                    active
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic tab contents panel */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {activeTab === "contributions" && (
                <motion.div
                  key="contributions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {CONTRIBUTIONS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex gap-4 group/item items-start">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted group-hover/item:bg-primary/10 transition-colors duration-200 border border-border group-hover/item:border-primary/20">
                          <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-foreground text-sm group-hover/item:text-primary transition-colors leading-none">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {PROJECTS.map((project, idx) => (
                    <div
                      key={idx}
                      className="border border-border/60 bg-muted/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors duration-200"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                          {project.tag}
                        </span>
                        <h4 className="font-extrabold text-foreground text-base pt-1">
                          {project.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {TECH_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                        <span className="o-bar shrink-0" /> {cat.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/45 hover:text-primary transition-colors duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
