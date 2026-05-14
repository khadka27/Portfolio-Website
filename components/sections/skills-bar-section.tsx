"use client";
import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "TailwindCSS",
  "Git",
];

const SkillsBarSection = () => {
  return (
    <section className="relative section-shell-tight overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/3 to-background"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="section-title text-2xl md:text-3xl">
            Core Technologies
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-primary to-amber-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 rounded-xl"></div>

              {/* Badge */}
              <div className="relative">
                <div className="px-5 py-2.5 md:px-6 md:py-3 bg-linear-to-r from-primary via-orange-400 to-amber-500 rounded-xl font-bold text-white text-sm md:text-base shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/50 transition-all duration-300 cursor-default">
                  <span className="relative z-10">{skill}</span>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsBarSection;
