"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Send,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight,
  Github,
  Linkedin,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { siteConfig } from "@/lib/site";

const METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    desc: "I reply within 24 hours",
    accent: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/25",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nepal",
    href: null,
    desc: "Available for remote work",
    accent: "text-amber-500",
    bg: "bg-amber-500/8",
    border: "border-amber-500/25",
  },
  {
    icon: Calendar,
    label: "Availability",
    value: "Open to projects",
    href: null,
    desc: "Accepting freelance work",
    accent: "text-green-500",
    bg: "bg-green-500/8",
    border: "border-green-500/25",
  },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/khadka27", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/abishekkhadka",
    label: "LinkedIn",
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
    if (!sid || !tid || !pk) {
      toast({
        title: "Config error",
        description: "EmailJS not configured.",
        variant: "destructive",
      });
      setSending(false);
      return;
    }
    try {
      await emailjs.send(sid, tid, form, pk);
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-primary/8 blur-[100px] anim-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-400/6 blur-[80px] anim-blob-reverse"
      />

      {/* ── Header ──────────────────────────── */}
      <div className="text-center mb-12 space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">
            <MessageCircle className="h-3 w-3" />
            Contact
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Let&apos;s Work <span className="orange-text">Together</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="section-subtext"
        >
          Have a project in mind? I reply within a day and love discussing
          ideas, scope and timelines.
        </motion.p>
      </div>

      {/* ── Grid ────────────────────────────── */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left -info */}
        <div className="space-y-4">
          {METHODS.map((m, i) => (
            <motion.div
              key={m.label}
              {...inView(i * 0.1)}
              whileHover={{ x: 4 }}
            >
              <div className="card-base flex items-start gap-4 p-4">
                <div
                  className={`rounded-xl ${m.bg} border ${m.border} p-2.5 flex-shrink-0`}
                >
                  <m.icon className={`h-4 w-4 ${m.accent}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                    {m.label}
                  </p>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">
                      {m.value}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {m.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Social row */}
          <motion.div {...inView(0.35)} className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right -form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="card-base p-7">
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground mb-6">
              <Send className="h-4 w-4 text-primary" />
              Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={onChange}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={onChange}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={onChange}
                  className="field-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
