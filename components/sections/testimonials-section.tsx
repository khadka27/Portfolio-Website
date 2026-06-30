"use client";

import { motion } from "framer-motion";
import { Quote, Star, Terminal, Layers, TrendingUp, Palette, Code2 } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const TESTIMONIALS = [
  {
    id: "cto",
    name: "Sanjay Thapa",
    role: "CTO",
    company: "Fishtail Infosolutions",
    avatar: "ST",
    avatarColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    glowColor: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:border-blue-500/40",
    stars: 5,
    text: "Abishek is one of the most dependable developers I've worked with. He delivered our real-time dashboard with Socket.io weeks ahead of schedule and the code quality was exceptional. He thinks in systems, not just features.",
  },
  {
    id: "pm",
    name: "Priya Sharma",
    role: "Product Manager",
    company: "NepTech Solutions",
    avatar: "PS",
    avatarColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    glowColor: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/40",
    stars: 5,
    text: "We hired Abishek to build our payment integration — Stripe, Khalti, and eSewa all in one go. He handled the complexity with impressive maturity. The checkout flow has been rock-solid with zero downtime since launch.",
  },
  {
    id: "founder",
    name: "Ramesh Adhikari",
    role: "Founder",
    company: "StartupHub Nepal",
    avatar: "RA",
    avatarColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    glowColor: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:border-emerald-500/40",
    stars: 5,
    text: "From UI design to cloud deployment, Abishek owns the whole stack. He built our SaaS admin panel from scratch and mentored our junior devs in the process. Highly recommend him for any full-stack project.",
  },
  {
    id: "designer",
    name: "Anita Maharjan",
    role: "Lead Designer",
    company: "Designcraft Studio",
    avatar: "AM",
    avatarColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    glowColor: "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)] hover:border-pink-500/40",
    stars: 5,
    text: "Abishek bridges the gap between design and engineering better than anyone I've met. Every pixel-perfect component I handed him was implemented flawlessly. He also proposed several UX improvements we hadn't even thought of.",
  },
  {
    id: "engineer",
    name: "Kiran Basnet",
    role: "Senior Engineer",
    company: "TechBridge Nepal",
    avatar: "KB",
    avatarColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    glowColor: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.35)] hover:border-amber-500/40",
    stars: 5,
    text: "Reviewed Abishek's codebase for a client audit — extremely clean architecture, solid TypeScript types, proper error handling, and great documentation. This is the kind of developer you want building your critical systems.",
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-shell relative overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[10%] h-80 w-80 rounded-full bg-primary/5 blur-[120px] anim-blob" />
      <div aria-hidden className="pointer-events-none absolute left-[-10%] bottom-[10%] h-80 w-80 rounded-full bg-amber-500/5 blur-[120px] anim-blob-reverse" />

      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <motion.div {...inView(0)}>
          <span className="section-eyebrow">
            <Quote className="h-3 w-3" />
            Testimonials
          </span>
        </motion.div>
        <motion.h2 {...inView(0.08)} className="section-heading text-3xl md:text-5xl">
          What People Say
        </motion.h2>
        <motion.p {...inView(0.14)} className="section-subtext">
          Feedback from colleagues, clients, and collaborators I've had the pleasure of working with.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* CTO - Sanjay Thapa (Systems & Architecture) */}
        <motion.div {...inView(0.1)} className="lg:col-span-2">
          <TiltCard className="h-full">
            <div className={`card-base p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between group ${TESTIMONIALS[0].glowColor}`}>
              {/* Top Accent line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600" />
              
              {/* Background Network Graphic decoration */}
              <svg className="absolute inset-0 -z-10 h-full w-full stroke-blue-500/5 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
                <defs>
                  <pattern id="network-grid" width="30" height="30" patternUnits="userSpaceOnUse" x="-1" y="-1">
                    <path d="M.5 30V.5H30" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#network-grid)" />
                <svg x="70%" y="10" className="overflow-visible">
                  <circle cx="0" cy="10" r="2.5" className="fill-blue-500/20 animate-pulse" />
                  <circle cx="40" cy="30" r="3" className="fill-blue-500/30 animate-pulse [animation-delay:0.8s]" />
                  <circle cx="-50" cy="50" r="2" className="fill-blue-500/15 animate-pulse [animation-delay:0.4s]" />
                </svg>
              </svg>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-blue-500/10" />
                  <div className="flex items-center gap-1 bg-blue-500/5 border border-blue-500/10 rounded-full px-2.5 py-1 text-[10px] font-mono text-blue-400">
                    <Terminal className="h-3 w-3" />
                    <span>Real-time Dashboard Specialist</span>
                  </div>
                </div>

                <p className="text-[15px] sm:text-base text-foreground leading-relaxed font-medium mb-8 italic">
                  &ldquo;{TESTIMONIALS[0].text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-black flex-shrink-0 ${TESTIMONIALS[0].avatarColor}`}>
                    {TESTIMONIALS[0].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{TESTIMONIALS[0].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {TESTIMONIALS[0].role} · {TESTIMONIALS[0].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[0].stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* PM - Priya Sharma (Agile & Milestones) */}
        <motion.div {...inView(0.2)} className="lg:col-span-1">
          <TiltCard className="h-full">
            <div className={`card-base p-6 h-full relative overflow-hidden flex flex-col justify-between group ${TESTIMONIALS[1].glowColor}`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-purple-500/10" />
                  <div className="flex items-center gap-1 bg-purple-500/5 border border-purple-500/10 rounded-full px-2.5 py-1 text-[10px] font-mono text-purple-400">
                    <Layers className="h-3 w-3" />
                    <span>Multichannel Gateway</span>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed font-medium mb-6 italic">
                  &ldquo;{TESTIMONIALS[1].text}&rdquo;
                </p>

                {/* Progress / Gateways Tracker Widget */}
                <div className="mb-8 border border-purple-500/10 rounded-xl bg-purple-500/5 p-3 space-y-2 text-[10px] font-mono">
                  <div className="flex justify-between text-purple-400">
                    <span>Integration Sprints</span>
                    <span className="text-emerald-400 font-bold">100% Shipped</span>
                  </div>
                  <div className="w-full bg-border/40 h-1 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[9px] text-muted-foreground/80 font-bold text-center">
                    <div className="text-left text-purple-400">✓ Stripe</div>
                    <div className="text-purple-400">✓ Khalti</div>
                    <div className="text-right text-purple-400">✓ eSewa</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-black flex-shrink-0 ${TESTIMONIALS[1].avatarColor}`}>
                    {TESTIMONIALS[1].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{TESTIMONIALS[1].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {TESTIMONIALS[1].role} · {TESTIMONIALS[1].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[1].stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Founder - Ramesh Adhikari (Business & Growth) */}
        <motion.div {...inView(0.15)} className="lg:col-span-1">
          <TiltCard className="h-full">
            <div className={`card-base p-6 h-full relative overflow-hidden flex flex-col justify-between group ${TESTIMONIALS[2].glowColor}`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-green-600" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-emerald-500/10" />
                  <div className="flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full px-2.5 py-1 text-[10px] font-mono text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    <span>SaaS Admin Panel</span>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed font-medium mb-6 italic">
                  &ldquo;{TESTIMONIALS[2].text}&rdquo;
                </p>

                {/* SaaS Analytics Growth Widget */}
                <div className="mb-8 border border-emerald-500/10 rounded-xl bg-emerald-500/5 p-3 space-y-1.5 text-[10px] font-mono">
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Performance Audit</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1 rounded">+140% Dev speed</span>
                  </div>
                  <div className="flex items-end gap-1 h-8 pt-1">
                    <div className="bg-emerald-500/20 w-full h-1/3 rounded-sm" />
                    <div className="bg-emerald-500/30 w-full h-1/2 rounded-sm" />
                    <div className="bg-emerald-500/50 w-full h-3/4 rounded-sm" />
                    <div className="bg-emerald-500 w-full h-full rounded-sm animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-black flex-shrink-0 ${TESTIMONIALS[2].avatarColor}`}>
                    {TESTIMONIALS[2].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{TESTIMONIALS[2].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {TESTIMONIALS[2].role} · {TESTIMONIALS[2].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[2].stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Lead Designer - Anita Maharjan (Creative & UI/UX) */}
        <motion.div {...inView(0.25)} className="lg:col-span-2">
          <TiltCard className="h-full">
            <div className={`card-base p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between group ${TESTIMONIALS[3].glowColor}`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-500" />

              {/* Design Canvas background vectors */}
              <svg className="absolute right-0 bottom-0 -z-10 w-48 h-48 text-pink-500/5 select-none pointer-events-none" viewBox="0 0 100 100">
                <path d="M10 80 Q 52.5 15, 95 80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="80" r="2" className="fill-pink-500" />
                <circle cx="95" cy="80" r="2" className="fill-pink-500" />
                <circle cx="52.5" cy="47.5" r="2.5" className="fill-pink-500/50 animate-ping" />
              </svg>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-pink-500/10" />
                  <div className="flex items-center gap-1.5 bg-pink-500/5 border border-pink-500/10 rounded-full px-2.5 py-1 text-[10px] font-mono text-pink-400">
                    <Palette className="h-3 w-3" />
                    <span>Figma to Code Accuracy</span>
                  </div>
                </div>

                <p className="text-[15px] sm:text-base text-foreground leading-relaxed font-medium mb-8 italic">
                  &ldquo;{TESTIMONIALS[3].text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-black flex-shrink-0 ${TESTIMONIALS[3].avatarColor}`}>
                    {TESTIMONIALS[3].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{TESTIMONIALS[3].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {TESTIMONIALS[3].role} · {TESTIMONIALS[3].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[3].stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Senior Engineer - Kiran Basnet (Code Quality & Security) */}
        <motion.div {...inView(0.3)} className="lg:col-span-3">
          <TiltCard className="h-full">
            <div className={`card-base p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between group ${TESTIMONIALS[4].glowColor}`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-600" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-amber-500/10" />
                  <div className="flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/10 rounded-full px-2.5 py-1 text-[10px] font-mono text-amber-400">
                    <Code2 className="h-3 w-3" />
                    <span>Clean Code & Audits</span>
                  </div>
                </div>

                {/* Simulated Pull Request Comment box */}
                <div className="mb-6 border border-border/80 rounded-xl bg-muted/20 overflow-hidden text-xs font-mono">
                  <div className="bg-muted/50 px-4 py-2.5 border-b border-border/80 flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/15 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[9px]">Approved</span>
                      <span>audit_report.md</span>
                    </div>
                    <span>PR #12 · abishek/portfolio-core</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-muted-foreground text-[10px]">
                      <span className="text-primary font-bold">@kiran_basnet</span> left a review comment:
                    </div>
                    <p className="text-foreground leading-relaxed text-xs italic pl-3 border-l-2 border-amber-500/50">
                      &ldquo;{TESTIMONIALS[4].text}&rdquo;
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 mt-2">
                      <span>// Verification: LGTM (100% clean build)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-black flex-shrink-0 ${TESTIMONIALS[4].avatarColor}`}>
                    {TESTIMONIALS[4].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{TESTIMONIALS[4].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {TESTIMONIALS[4].role} · {TESTIMONIALS[4].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[4].stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
