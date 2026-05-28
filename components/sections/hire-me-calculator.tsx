"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle, ArrowRight, Zap, Globe, ShoppingCart, Server, Sparkles } from "lucide-react";

const PROJECT_TYPES = [
  { id: "landing", label: "Landing Page", icon: Globe, base: 300, perPage: 60, desc: "Marketing site, portfolio, or promo page" },
  { id: "saas", label: "SaaS Platform", icon: Zap, base: 1500, perPage: 120, desc: "Multi-tenant app with auth, dashboard, billing" },
  { id: "ecom", label: "E-commerce", icon: ShoppingCart, base: 1200, perPage: 100, desc: "Online store with payments and inventory" },
  { id: "api", label: "API / Backend", icon: Server, base: 800, perPage: 80, desc: "REST or GraphQL API, microservices" },
  { id: "custom", label: "Custom Build", icon: Sparkles, base: 2000, perPage: 150, desc: "Complex or unique requirements" },
];

const TIMELINES = [
  { id: "rush", label: "Rush (1-2 wks)", multiplier: 1.5 },
  { id: "normal", label: "Standard (3-4 wks)", multiplier: 1.0 },
  { id: "relaxed", label: "Relaxed (1-2 mo)", multiplier: 0.85 },
];

const FEATURES = [
  { id: "auth", label: "Auth & User Roles", cost: 200 },
  { id: "realtime", label: "Real-time / WebSocket", cost: 300 },
  { id: "payments", label: "Payment Integration", cost: 350 },
  { id: "ai", label: "AI/LLM Integration", cost: 400 },
  { id: "mobile", label: "Mobile-first UI", cost: 150 },
  { id: "deploy", label: "CI/CD + Cloud Deploy", cost: 200 },
];

function formatUSD(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HireMeCalculator() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [pages, setPages] = useState(5);
  const [timeline, setTimeline] = useState("normal");
  const [features, setFeatures] = useState<string[]>([]);

  const selectedType = PROJECT_TYPES.find((p) => p.id === projectType);
  const selectedTimeline = TIMELINES.find((t) => t.id === timeline)!;

  const featureCost = features.reduce((sum, id) => {
    const f = FEATURES.find((f) => f.id === id);
    return sum + (f?.cost || 0);
  }, 0);

  const baseCost = selectedType
    ? (selectedType.base + pages * selectedType.perPage + featureCost) * selectedTimeline.multiplier
    : 0;

  const low = Math.round(baseCost * 0.85 / 50) * 50;
  const high = Math.round(baseCost * 1.15 / 50) * 50;

  const toggleFeature = (id: string) =>
    setFeatures((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  return (
    <section id="calculator" className="section-shell relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px] anim-blob-reverse" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <motion.div {...inView(0)}>
          <span className="section-eyebrow">
            <Calculator className="h-3 w-3" />
            Hire Me
          </span>
        </motion.div>
        <motion.h2 {...inView(0.08)} className="section-heading text-3xl md:text-5xl">
          Project Budget Calculator
        </motion.h2>
        <motion.p {...inView(0.14)} className="section-subtext">
          Get an instant estimate for your project. Configure your requirements and see a live budget range.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="card-base p-6 md:p-8"
        >
          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {["Project Type", "Scope", "Features", "Estimate"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => i < step || (i === 1 && projectType) || (i === 2 && projectType) || i === 0 ? setStep(i) : null}
                  className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    step >= i ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > i ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block truncate ${step >= i ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < 3 && <div className={`h-px flex-1 hidden sm:block ${step > i ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0 — Project Type */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h3 className="font-bold text-foreground mb-4">What are you building?</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PROJECT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const selected = projectType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => { setProjectType(type.id); }}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          selected
                            ? "border-primary bg-primary/8 shadow-[0_0_12px_rgba(251,146,60,0.15)]"
                            : "border-border hover:border-primary/40 bg-card"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mb-2 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-bold ${selected ? "text-primary" : "text-foreground"}`}>{type.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(1)}
                    disabled={!projectType}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 1 — Scope */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h3 className="font-bold text-foreground mb-6">Project scope & timeline</h3>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">Number of pages / screens</label>
                      <span className="text-primary font-black">{pages}</span>
                    </div>
                    <input
                      type="range" min={1} max={30} value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1 page</span><span>30 pages</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">Preferred timeline</label>
                    <div className="grid grid-cols-3 gap-3">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTimeline(t.id)}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                            timeline === t.id
                              ? "border-primary bg-primary/8 text-primary"
                              : "border-border bg-card text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {t.label}
                          {t.id === "rush" && <span className="block text-[10px] mt-1 text-amber-500">+50% fee</span>}
                          {t.id === "relaxed" && <span className="block text-[10px] mt-1 text-green-500">15% off</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(0)} className="btn-ghost">← Back</button>
                  <button onClick={() => setStep(2)} className="btn-primary">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Features */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h3 className="font-bold text-foreground mb-2">Additional features</h3>
                <p className="text-sm text-muted-foreground mb-6">Select all that apply. You can skip this if none apply.</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {FEATURES.map((f) => {
                    const selected = features.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          selected
                            ? "border-primary bg-primary/8"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selected ? "bg-primary border-primary" : "border-border"}`}>
                            {selected && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{f.label}</span>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">+{formatUSD(f.cost)}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary">
                    See Estimate <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Result */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <div className="text-center py-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      Estimated Budget Range
                    </p>
                    <motion.p
                      className="text-4xl md:text-6xl font-black orange-text mb-1"
                      style={{ fontFamily: "var(--font-outfit), system-ui" }}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
                    >
                      {formatUSD(low)} – {formatUSD(high)}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mb-8">USD · Estimates vary based on final requirements</p>
                  </motion.div>

                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card-base p-4 text-left mb-8 space-y-2"
                  >
                    {[
                      { label: "Project Type", value: selectedType?.label },
                      { label: "Pages / Screens", value: pages },
                      { label: "Timeline", value: TIMELINES.find((t) => t.id === timeline)?.label },
                      { label: "Features", value: features.length > 0 ? features.map((id) => FEATURES.find((f) => f.id === id)?.label).join(", ") : "None" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-semibold text-foreground text-right max-w-[60%]">{String(row.value)}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                  >
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="btn-primary"
                    >
                      Let&apos;s Talk <ArrowRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => { setStep(0); setProjectType(null); setPages(5); setTimeline("normal"); setFeatures([]); }}
                      className="btn-outline"
                    >
                      Start Over
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
