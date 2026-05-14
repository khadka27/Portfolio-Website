"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const skillCategories = {
  Frontend: [
    {
      name: "React",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "JavaScript",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "HTML",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Tailwind CSS",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
  ],
  "UI Libraries": [
    { name: "Shadcn UI", iconPath: "https://ui.shadcn.com/favicon.ico" },
    {
      name: "Framer Motion",
      iconPath: "https://cdn.simpleicons.org/framer/0055FF",
    },
    {
      name: "Radix UI",
      iconPath: "https://cdn.simpleicons.org/radixui/161618",
    },
    {
      name: "Headless UI",
      iconPath: "https://cdn.simpleicons.org/headlessui/66E3FF",
    },
    {
      name: "Material UI",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
    { name: "Aceternity UI", iconPath: "https://ui.aceternity.com/logo.png" },
  ],
  Backend: [
    {
      name: "Node.js",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "Socket.io",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    },
    {
      name: "REST API",
      iconPath: "https://cdn.simpleicons.org/fastapi/009688",
    },
    {
      name: "GraphQL",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
  ],
  Database: [
    {
      name: "MongoDB",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    { name: "Prisma", iconPath: "https://cdn.simpleicons.org/prisma/2D3748" },
    {
      name: "Redis",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
  ],
  DevOps: [
    {
      name: "Git",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Docker",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "AWS",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    },
    { name: "Vercel", iconPath: "https://cdn.simpleicons.org/vercel/000000" },
    {
      name: "DigitalOcean",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
    },
  ],
  Tools: [
    {
      name: "VS Code",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    { name: "Postman", iconPath: "https://cdn.simpleicons.org/postman/FF6C37" },
    {
      name: "npm",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    },
    {
      name: "Figma",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    { name: "Stripe", iconPath: "https://cdn.simpleicons.org/stripe/008CDD" },
    {
      name: "Firebase",
      iconPath:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
  ],
};

const InfiniteScroll = ({
  skills,
  direction = "left",
}: {
  skills: typeof skillCategories.Frontend;
  direction?: "left" | "right";
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {/* Triple the skills for seamless infinite loop */}
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 w-24 h-24 p-4 glass-effect border border-border/50 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-10 h-10">
              <Image
                src={skill.iconPath}
                alt={skill.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[10px] font-medium text-center text-muted-foreground line-clamp-1">
              {skill.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4"
        >
          Technical Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
        >
          Technologies and tools I use to build modern applications. Hover to
          pause scrolling.
        </motion.p>
      </div>

      {/* Skills Sections - Display one after another */}
      <div className="space-y-8">
        {Object.entries(skillCategories).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-3 px-2">
              <span className="h-1 w-8 bg-gradient-to-r from-primary to-amber-500 rounded-full"></span>
              {category}
              <span className="text-sm text-muted-foreground font-normal">
                ({skills.length})
              </span>
            </h3>
            <InfiniteScroll
              skills={skills}
              direction={index % 2 === 0 ? "left" : "right"}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
