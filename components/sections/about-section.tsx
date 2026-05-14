"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  Server,
  Sparkles,
  Award,
  Target,
  Heart,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  location: string | null;
  bio: string | null;
}

const services = [
  {
    title: "SaaS Platforms",
    icon: Zap,
    description: "Building scalable SaaS solutions",
    gradient: "from-primary via-orange-400 to-amber-500",
  },
  {
    title: "Real-time Apps",
    icon: TrendingUp,
    description: "WebSocket & live features",
    gradient: "from-primary via-orange-400 to-amber-500",
  },
  {
    title: "Full-Stack Solutions",
    icon: Server,
    description: "End-to-end development",
    gradient: "from-primary via-orange-400 to-amber-500",
  },
];

const highlights = [
  { icon: Award, text: "20+ Projects Delivered", color: "text-yellow-500" },
  { icon: Target, text: "99% Client Satisfaction", color: "text-green-500" },
  { icon: Heart, text: "Clean Code Advocate", color: "text-red-500" },
  { icon: Sparkles, text: "Innovation Focused", color: "text-blue-500" },
];

const stats = [
  {
    value: "20+",
    label: "Projects Completed",
    color: "from-primary via-orange-400 to-amber-500",
  },
  {
    value: "1.5",
    label: "Years Experience",
    color: "from-primary via-orange-400 to-amber-500",
  },
  {
    value: "1 Year",
    label: "At Fishtail Infosolutions",
    color: "from-primary via-orange-400 to-amber-500",
  },
];

const AboutSection = () => {
  const [userProfile, setUserProfile] = useState<GitHubUser | null | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/github-profile");
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profile = await response.json();
        setUserProfile(profile);
      } catch (e) {
        console.error("Failed to fetch GitHub profile:", e);
        setError("Could not load GitHub profile information.");
        setUserProfile(null);
      }
    }
    fetchProfile();
  }, []);

  const location = userProfile?.location || "Pokhara, Nepal";

  return (
    <section id="about" className="relative section-shell overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-kicker mb-4"
          >
            <span className="text-sm font-medium text-primary">About Me</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            Full-Stack Developer & Problem Solver
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-lead"
          >
            Based in Nepal, available for worldwide freelance projects
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col items-center"
          >
            <div className="relative group">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary via-orange-400 to-amber-500 opacity-75 group-hover:opacity-100 transition-opacity blur-xl animate-pulse"></div>
              <div className="absolute -inset-4 rounded-full bg-linear-to-r from-primary to-amber-500 opacity-20 animate-spin-slow"></div>

              {/* Profile Image */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src={userProfile?.avatar_url || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-sm">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 p-3 glass-effect border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-xs font-medium text-foreground">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm a passionate full-stack developer based in{" "}
                <span className="text-primary font-semibold">
                  {userProfile === undefined ? (
                    <span className="inline-block h-5 w-24 animate-pulse bg-primary/20 rounded"></span>
                  ) : (
                    location
                  )}
                </span>{" "}
                with 1.5 years of experience building production-ready
                applications. I currently work at{" "}
                <span className="text-primary font-semibold">
                  Fishtail Infosolutions
                </span>{" "}
                as a Full Stack Developer / Software Developer, where I design
                and develop scalable digital products for real clients.
              </p>

              <p>
                I work across the entire development cycle -UI, backend, APIs,
                real-time features, authentication, testing, deployment, and
                performance optimization. My focus is on{" "}
                <span className="text-foreground font-semibold">
                  clean code
                </span>
                ,{" "}
                <span className="text-foreground font-semibold">
                  scalable architecture
                </span>
                , and{" "}
                <span className="text-foreground font-semibold">
                  high-quality user experiences
                </span>
                .
              </p>

              <div className="pt-4">
                <h3 className="text-foreground font-bold text-lg mb-3 flex items-center gap-2">
                  <span
                    className="h-1 w-6 bg-linear-to-r from-primary to-amber-500 rounded-full"
                    aria-hidden
                  />
                  I enjoy creating:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SaaS platforms",
                    "Dashboards",
                    "E-commerce systems",
                    "Real-time chat apps",
                    "Payment systems",
                    "Full-stack solutions",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-foreground font-bold text-lg mb-3 flex items-center gap-2">
                  <span
                    className="h-1 w-6 bg-linear-to-r from-primary to-amber-500 rounded-full"
                    aria-hidden
                  />
                  My Tech Stack:
                </h3>
                <p>
                  Next.js, React.js, Node.js, Express.js, MongoDB, PostgreSQL,
                  Socket.io, Stripe/Khalti/eSewa integrations, and modern cloud
                  technologies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative overflow-hidden glass-effect border-2 border-border/50 hover:border-primary/50 transition-all duration-300 p-6 text-center group">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                ></div>
                <div className="relative">
                  <div
                    className={`text-4xl md:text-5xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="relative overflow-hidden glass-effect border-2 border-border/50 hover:border-primary/50 transition-all duration-300 p-6 h-full group">
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${service.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
                ></div>
                <div className="relative">
                  <div
                    className={`inline-flex p-3 bg-linear-to-br ${service.gradient} rounded-xl mb-4 shadow-lg`}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
