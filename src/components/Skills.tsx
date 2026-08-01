"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Database, Layout, Server, Cpu, Layers } from "lucide-react";
import TechStack from "./TechStack";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout size={24} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/15 border-primary/30",
    barClass: "from-primary to-accent",
    glowClass: "hover:shadow-[0_8px_30px_rgba(37,99,235,0.25)]",
    progress: 90,
  },
  {
    title: "Backend Development",
    icon: <Server size={24} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/15 border-accent/30",
    barClass: "from-accent to-highlight",
    glowClass: "hover:shadow-[0_8px_30px_rgba(56,189,248,0.25)]",
    progress: 85,
  },
  {
    title: "Database Design",
    icon: <Database size={24} />,
    colorClass: "text-secondary",
    bgClass: "bg-secondary/15 border-secondary/30",
    barClass: "from-secondary to-primary",
    glowClass: "hover:shadow-[0_8px_30px_rgba(124,58,237,0.25)]",
    progress: 80,
  },
  {
    title: "AI Integration",
    icon: <Cpu size={24} />,
    colorClass: "text-highlight",
    bgClass: "bg-highlight/10 border-highlight/20",
    barClass: "from-highlight to-accent",
    glowClass: "hover:shadow-[0_8px_30px_rgba(0,229,255,0.25)]",
    progress: 75,
  },
  {
    title: "UI/UX Design",
    icon: <Layers size={24} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/15 border-primary/30",
    barClass: "from-primary to-secondary",
    glowClass: "hover:shadow-[0_8px_30px_rgba(37,99,235,0.25)]",
    progress: 85,
  },
  {
    title: "Core Programming",
    icon: <Code2 size={24} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/15 border-accent/30",
    barClass: "from-accent to-primary",
    glowClass: "hover:shadow-[0_8px_30px_rgba(56,189,248,0.25)]",
    progress: 95,
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-6 rounded-2xl border bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ${category.bgClass} ${category.glowClass}`}
      style={{
        transform: isHovered
          ? "perspective(800px) rotateX(3deg) rotateY(-3deg) translateY(-6px)"
          : "perspective(800px) rotateX(0) rotateY(0) translateY(0)",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${category.bgClass} ${category.colorClass}`}>
        {category.icon}
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>

      <div className="flex items-center justify-between mb-2 mt-4">
        <span className="text-xs text-muted">Proficiency</span>
        <span className={`text-xs font-bold font-mono ${category.colorClass}`}>{category.progress}%</span>
      </div>

      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${category.progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.08 + 0.2 }}
          className={`h-full bg-gradient-to-r ${category.barClass} rounded-full relative overflow-hidden`}
        >
          {isHovered && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full py-20 relative overflow-hidden bg-[#030610]">
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-5 md:px-12 relative z-10">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
          >
            What I do best
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            My <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, idx) => (
            <SkillCard key={cat.title} category={cat} index={idx} />
          ))}
        </div>

        <TechStack />
      </div>

      <div className="absolute -left-48 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/3 w-96 h-96 bg-accent/10 rounded-full blur-[130px] pointer-events-none" />
    </section>
  );
}
