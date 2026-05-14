"use client";

import { motion } from "framer-motion";
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
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  location: string;
  type: string;
  responsibilities: Array<{ icon: any; text: string }>;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer / Software Developer",
    company: "Fishtail Infosolutions",
    companyUrl: "https://fishtailinfosolutions.com",
    duration: "2023 - Present",
    location: "Nepal",
    type: "Full-time",
    responsibilities: [
      {
        icon: Code,
        text: "Developed and maintained full-stack applications using Next.js, React, and Node.js for real client projects",
      },
      {
        icon: Zap,
        text: "Built robust REST APIs, authentication systems, dashboards, and admin panels from scratch",
      },
      {
        icon: Users,
        text: "Implemented Socket.io for real-time chat, notifications, and live features across multiple applications",
      },
      {
        icon: Shield,
        text: "Integrated payment gateways including Stripe, Khalti, and eSewa for seamless transaction processing",
      },
      {
        icon: Database,
        text: "Worked extensively with MongoDB, PostgreSQL, and Prisma for database design and management",
      },
      {
        icon: Cloud,
        text: "Handled complete deployment pipeline, CI/CD setup, cloud infrastructure, and server optimization",
      },
      {
        icon: Users,
        text: "Collaborated with cross-functional teams to deliver high-quality software products on time",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Socket.io",
      "Stripe",
      "Prisma",
      "AWS",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      {/* Background Gradient Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4"
          >
            My Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
          >
            Professional journey building scalable applications and digital
            products
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
            >
              <Card className="relative glass-effect border-2 border-border/50 hover:border-primary/50 transition-all duration-500 p-0 overflow-hidden group">
                {/* Decorative gradient bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-400 to-amber-500"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 sm:p-8">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 mt-1">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                            {exp.role}
                          </h3>
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xl md:text-2xl text-primary hover:underline group/link"
                          >
                            <span className="font-semibold">{exp.company}</span>
                            <ExternalLink className="h-5 w-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/30 rounded-full text-primary font-bold text-sm whitespace-nowrap shadow-lg shadow-primary/10">
                      <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                      {exp.type}
                    </div>
                  </div>

                  {/* Meta Info with Icons */}
                  <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CalendarDays className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/70">
                          Duration
                        </p>
                        <p className="font-semibold text-foreground">
                          {exp.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/70">
                          Location
                        </p>
                        <p className="font-semibold text-foreground">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities with Icons */}
                  <div className="space-y-6 mb-8">
                    <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                      <span className="h-1 w-8 bg-gradient-to-r from-primary to-amber-500 rounded-full"></span>
                      Key Responsibilities
                    </h4>
                    <div className="grid gap-4">
                      {exp.responsibilities.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-4 group/item"
                        >
                          <motion.div
                            custom={i}
                            variants={iconVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="p-2.5 bg-primary/10 rounded-lg border border-primary/20 group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300"
                          >
                            <item.icon className="h-4 w-4 text-primary" />
                          </motion.div>
                          <p className="text-muted-foreground leading-relaxed flex-1 pt-1">
                            {item.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                      <span className="h-1 w-8 bg-gradient-to-r from-primary to-amber-500 rounded-full"></span>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-4 py-2 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Timeline Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 glass-effect border-2 border-primary/30 rounded-full shadow-lg shadow-primary/10">
              <div className="p-2 bg-primary/20 rounded-full">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">
                  Total Experience
                </p>
                <p className="text-foreground font-bold text-lg">
                  1.5 Years of Professional Development
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
