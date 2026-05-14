"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Mail, Code2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

interface HeroSectionProps {
  githubProfileImage?: string | null;
}

const HeroSection = ({ githubProfileImage }: HeroSectionProps) => {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative container mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left px-4 sm:px-6 pt-24 md:pt-0"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-amber-500 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-2 h-2 bg-orange-400 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="md:w-1/2 space-y-6 sm:space-y-8 mb-12 md:mb-0 z-10"
      >
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground sm:text-xl"
          >
            Hi, I&apos;m{" "}
            <span className="font-semibold text-foreground">{siteConfig.name}</span>
          </motion.p>

          {/* Main Heading */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="block text-foreground mb-3">
                I turn ideas into
              </span>
              <TypeAnimation
                sequence={[
                  "reliable software",
                  2000,
                  "scalable web apps",
                  2000,
                  "modern digital products",
                  2000,
                  "performant solutions",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="relative inline-block bg-gradient-to-r from-primary via-orange-400 to-amber-500 bg-clip-text text-transparent"
              />
            </motion.h1>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          I&apos;m {siteConfig.name}, a full-stack developer specializing in{" "}
          <span className="text-primary font-semibold">Next.js</span>,{" "}
          <span className="text-primary font-semibold">Node.js</span>, modern APIs, real-time
          systems, and cloud deployment. I help businesses turn ideas into fast, secure, and
          reliable software.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center md:justify-start pt-4"
        >
          <Button
            onClick={() => handleScrollTo("contact")}
            size="lg"
            className="group relative bg-gradient-to-r from-primary via-orange-400 to-amber-500 hover:shadow-2xl hover:shadow-primary/50 text-white font-semibold px-8 py-6 border-0 overflow-hidden"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <Mail className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">Hire Me</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
          </Button>

          <Button
            onClick={() => handleScrollTo("projects")}
            variant="outline"
            size="lg"
            className="group border-2 border-primary/30 hover:border-primary text-foreground hover:bg-primary/5 font-semibold px-8 py-6"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Code2 className="mr-2 h-5 w-5" />
              View Projects
            </motion.button>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="group text-muted-foreground hover:text-primary font-medium px-6 py-6"
            asChild
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Resume
            </motion.a>
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center md:justify-start pt-4"
        >
          {[
            { value: "20+", label: "Projects" },
            { value: "1.5", label: "Years Exp" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex w-full justify-center md:w-1/2 md:justify-center"
      >
        {/* Padding reserves space for ring decorations (-inset-12), blur, and floating icon */}
        <div className="relative flex items-center justify-center p-10 sm:p-12 md:p-14 lg:p-16">
        <div className="relative isolate group">
          {/* Animated Rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-orange-400 to-amber-500 opacity-75 blur-2xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-8 rounded-full border-2 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-12 rounded-full border border-primary/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Profile Image */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <Image
              src={githubProfileImage || "/placeholder.svg"}
              alt={`${siteConfig.name} — full-stack developer, professional portrait`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Code Icon Decoration */}
          <motion.div
            className="absolute -bottom-4 -right-4 p-4 bg-gradient-to-r from-primary to-amber-500 rounded-2xl shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Code2 className="h-8 w-8 text-white" />
          </motion.div>
        </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
