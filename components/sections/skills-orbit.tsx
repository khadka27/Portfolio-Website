"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface OrbitSkill {
  name: string;
  icon: string;
  category: string;
  level: string;
}

const SKILLS_DATA: OrbitSkill[] = [
  // Inner Orbit
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", level: "Expert" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend", level: "Expert" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend", level: "Advanced" },
  // Middle Orbit
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", level: "Advanced" },
  { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", category: "Backend", level: "Advanced" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", level: "Advanced" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database", level: "Advanced" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/2D3748", category: "Database", level: "Advanced" },
  // Outer Orbit
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend", level: "Intermediate" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", level: "Intermediate" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", level: "Advanced" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/008CDD", category: "Tools", level: "Advanced" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Tools", level: "Intermediate" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "DevOps", level: "Intermediate" },
];

export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<OrbitSkill | null>(null);

  // Group into orbits
  const innerOrbit = SKILLS_DATA.slice(0, 3);
  const middleOrbit = SKILLS_DATA.slice(3, 8);
  const outerOrbit = SKILLS_DATA.slice(8);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[580px] mx-auto flex items-center justify-center bg-radial-gradient from-primary/5 to-transparent rounded-full border border-border/20 p-6 overflow-hidden select-none"
    >
      {/* Gravity Center Nucleus */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-card border-2 border-primary/50 shadow-lg shadow-primary/20 flex flex-col items-center justify-center">
        {/* Glowing inner rings */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
        <span className="text-[11px] font-mono text-primary font-bold tracking-widest uppercase">CORE</span>
        <span className="text-[8px] font-mono text-muted-foreground">GRAVITY</span>
      </div>

      {/* Orbit Rings (visual helpers) */}
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-border/25 pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-border/20 pointer-events-none" />
      <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-border/15 pointer-events-none" />

      {/* INNER ORBIT - Radio 90px (Clockwise) */}
      <OrbitRing
        skills={innerOrbit}
        radius={90}
        speed={14}
        direction={1}
        containerRef={containerRef}
        onHover={setHoveredSkill}
      />

      {/* MIDDLE ORBIT - Radio 160px (Counter-Clockwise) */}
      <OrbitRing
        skills={middleOrbit}
        radius={160}
        speed={24}
        direction={-1}
        containerRef={containerRef}
        onHover={setHoveredSkill}
      />

      {/* OUTER ORBIT - Radio 240px (Clockwise) */}
      <OrbitRing
        skills={outerOrbit}
        radius={240}
        speed={34}
        direction={1}
        containerRef={containerRef}
        onHover={setHoveredSkill}
      />

      {/* Floating Detailed Hover Info */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-card border border-border/80 px-4 py-2.5 rounded-xl shadow-xl w-60 text-center select-none z-20">
        {hoveredSkill ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <h4 className="text-xs font-bold text-foreground flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {hoveredSkill.name}
            </h4>
            <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground uppercase font-semibold font-mono tracking-wider px-2">
              <span>{hoveredSkill.category}</span>
              <span className="text-primary font-bold">{hoveredSkill.level}</span>
            </div>
          </motion.div>
        ) : (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            Drag skills node • Orbit gravity active
          </p>
        )}
      </div>
    </div>
  );
}

interface OrbitRingProps {
  skills: OrbitSkill[];
  radius: number;
  speed: number; // Duration in seconds for full loop
  direction: 1 | -1;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onHover: (s: OrbitSkill | null) => void;
}

function OrbitRing({ skills, radius, speed, direction, containerRef, onHover }: OrbitRingProps) {
  return (
    <motion.div
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      animate={{ rotate: 360 * direction }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      }}
      className="absolute rounded-full pointer-events-none flex items-center justify-center overflow-visible"
    >
      {skills.map((skill, index) => {
        // Distribute angles evenly around 360deg
        const angle = (index / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <OrbitNode
            key={skill.name}
            skill={skill}
            initialX={x}
            initialY={y}
            parentRotationDirection={direction}
            speed={speed}
            containerRef={containerRef}
            onHover={onHover}
          />
        );
      })}
    </motion.div>
  );
}

interface OrbitNodeProps {
  skill: OrbitSkill;
  initialX: number;
  initialY: number;
  parentRotationDirection: 1 | -1;
  speed: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onHover: (s: OrbitSkill | null) => void;
}

function OrbitNode({ skill, initialX, initialY, parentRotationDirection, speed, containerRef, onHover }: OrbitNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Return spring back to orbital base location
  const springConfig = { damping: 15, stiffness: 120 };
  const springX = useSpring(dragX, springConfig);
  const springY = useSpring(dragY, springConfig);

  const handleDragEnd = () => {
    // Spring back to 0 (base orbital point)
    dragX.set(0);
    dragY.set(0);
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.4}
      onDragEnd={handleDragEnd}
      style={{
        left: `calc(50% + ${initialX}px)`,
        top: `calc(50% + ${initialY}px)`,
        x: springX,
        y: springY,
      }}
      animate={{
        // Reverse parent rotation so icons stay upright!
        rotate: -360 * parentRotationDirection,
        scale: isHovered ? 1.25 : 1,
      }}
      transition={{
        rotate: { repeat: Infinity, duration: speed, ease: "linear" },
        scale: { type: "spring", stiffness: 400, damping: 20 }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(skill);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(null);
      }}
      className="absolute w-12 h-12 rounded-xl bg-card border border-border shadow-md hover:border-primary/50 hover:shadow-primary/10 flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing -translate-x-1/2 -translate-y-1/2 select-none"
    >
      <div className="relative w-7 h-7">
        <Image src={skill.icon} alt={skill.name} fill className="object-contain" unoptimized />
      </div>
      
      {/* Light glow on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl bg-primary/5 border border-primary/20 pointer-events-none" />
      )}
    </motion.div>
  );
}
