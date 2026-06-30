"use client";

import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  CheckCircle,
  Cloud,
  Palette,
  Zap,
  Server,
  Database,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  icon: LucideIcon;
  color: string;
  iconBg: string;
  glow: string;
  verifyUrl?: string;
  skills: string[];
}

const CERTS: Cert[] = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    icon: Cloud,
    color: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/25",
    glow: "border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    verifyUrl: "https://aws.amazon.com/certification/",
    skills: ["EC2", "S3", "Lambda", "RDS"],
  },
  {
    name: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    date: "2023",
    icon: Palette,
    color: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/25",
    glow: "border-blue-500/30 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    verifyUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "CSS", "UI/UX", "Accessibility"],
  },
  {
    name: "JavaScript Algorithms & DS",
    issuer: "freeCodeCamp",
    date: "2023",
    icon: Zap,
    color: "text-yellow-500",
    iconBg: "bg-yellow-500/10 border-yellow-500/25",
    glow: "border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]",
    verifyUrl: "https://www.freecodecamp.org/certification/",
    skills: ["Algorithms", "Data Structures", "ES6+"],
  },
  {
    name: "Node.js Application Development",
    issuer: "OpenJS Foundation",
    date: "2024",
    icon: Server,
    color: "text-green-500",
    iconBg: "bg-green-500/10 border-green-500/25",
    glow: "border-green-500/30 hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    skills: ["Node.js", "Express", "REST APIs", "Streams"],
  },
  {
    name: "MongoDB Developer Path",
    issuer: "MongoDB University",
    date: "2024",
    icon: Database,
    color: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border-emerald-500/25",
    glow: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    verifyUrl: "https://learn.mongodb.com/",
    skills: ["Aggregation", "Indexing", "Atlas", "CRUD"],
  },
  {
    name: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2024",
    icon: Box,
    color: "text-sky-500",
    iconBg: "bg-sky-500/10 border-sky-500/25",
    glow: "border-sky-500/30 hover:border-sky-500/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]",
    skills: ["Containers", "Compose", "Networking", "Volumes"],
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-shell relative overflow-hidden">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-[100px]" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <motion.div {...inView(0)}>
          <span className="section-eyebrow">
            <Award className="h-3 w-3" />
            Certifications
          </span>
        </motion.div>
        <motion.h2 {...inView(0.08)} className="section-heading text-3xl md:text-5xl">
          Badges &amp; Credentials
        </motion.h2>
        <motion.p {...inView(0.14)} className="section-subtext">
          Industry certifications and verified learning paths that complement my hands-on experience.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {CERTS.map((cert, i) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div
                className={`card-base p-5 h-full flex flex-col gap-4 border transition-all duration-300 ${cert.glow}`}
              >
                {/* Icon + title */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${cert.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${cert.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-0.5 line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span key={s} className="chip text-[10px]">{s}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle className={`h-3.5 w-3.5 ${cert.color}`} />
                    Issued {cert.date}
                  </div>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-[11px] font-bold ${cert.color} hover:opacity-80 transition-opacity`}
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
