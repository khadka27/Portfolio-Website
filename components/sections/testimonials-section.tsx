"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const TESTIMONIALS = [
  {
    name: "Sanjay Thapa",
    role: "CTO",
    company: "Fishtail Infosolutions",
    avatar: "ST",
    avatarColor: "bg-blue-500",
    stars: 5,
    text: "Abishek is one of the most dependable developers I've worked with. He delivered our real-time dashboard with Socket.io weeks ahead of schedule and the code quality was exceptional. He thinks in systems, not just features.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "NepTech Solutions",
    avatar: "PS",
    avatarColor: "bg-purple-500",
    stars: 5,
    text: "We hired Abishek to build our payment integration — Stripe, Khalti, and eSewa all in one go. He handled the complexity with impressive maturity. The checkout flow has been rock-solid with zero downtime since launch.",
  },
  {
    name: "Ramesh Adhikari",
    role: "Founder",
    company: "StartupHub Nepal",
    avatar: "RA",
    avatarColor: "bg-green-500",
    stars: 5,
    text: "From UI design to cloud deployment, Abishek owns the whole stack. He built our SaaS admin panel from scratch and mentored our junior devs in the process. Highly recommend him for any full-stack project.",
  },
  {
    name: "Anita Maharjan",
    role: "Lead Designer",
    company: "Designcraft Studio",
    avatar: "AM",
    avatarColor: "bg-pink-500",
    stars: 5,
    text: "Abishek bridges the gap between design and engineering better than anyone I've met. Every pixel-perfect component I handed him was implemented flawlessly. He also proposed several UX improvements we hadn't even thought of.",
  },
  {
    name: "Kiran Basnet",
    role: "Senior Engineer",
    company: "TechBridge Nepal",
    avatar: "KB",
    avatarColor: "bg-amber-500",
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
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section id="testimonials" className="section-shell relative overflow-hidden">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary/6 blur-[100px]" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4">
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

      {/* Carousel */}
      <div
        className="max-w-3xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <TiltCard className="h-full">
                <div className="card-base p-7 sm:p-10 h-full relative overflow-hidden">
                  {/* Top accent */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-amber-400/60" />

                  {/* Quote icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  {/* Text */}
                  <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role} · {t.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-200 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-200 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
