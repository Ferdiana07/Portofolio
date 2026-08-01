"use client";

import { motion } from "framer-motion";
import { User, Target, Zap, Lightbulb } from "lucide-react";

const cards = [
  {
    icon: User,
    title: "Who I Am",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    glow: "group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)]",
    body: "Informatics student at Universitas Diponegoro (Semester 4) with a strong foundation in Computer Science. My journey revolves around exploring cutting-edge technologies, full stack web development, and artificial intelligence.",
  },
  {
    icon: Zap,
    title: "My Passion",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    glow: "group-hover:shadow-[0_8px_30px_rgba(56,189,248,0.2)]",
    body: "I'm passionate about bridging the gap between elegant design and robust engineering. Building seamless UIs, architecting scalable backends, and shipping products that are both beautiful and highly functional.",
  },
  {
    icon: Target,
    title: "Vision",
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    glow: "group-hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]",
    body: "To become a world-class Full Stack Software Engineer specializing in AI-powered applications. I believe integrating AI into web experiences is the future, and I aim to be at the forefront of that revolution.",
  },
  {
    icon: Lightbulb,
    title: "Values",
    color: "text-highlight",
    bg: "bg-highlight/10 border-highlight/20",
    glow: "group-hover:shadow-[0_8px_30px_rgba(0,229,255,0.2)]",
    body: "Craftsmanship, continuous learning, and impact. Every line of code I write is intentional. I believe in shipping quality work, helping others grow, and building things that make a real difference.",
  },
];

export default function About() {
  return (
    <section id="about" className="w-full py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Subtle dot background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-5 md:px-12 relative z-10">
        {/* Section label + heading */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
          >
            Get to know me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className={`group p-6 md:p-8 rounded-2xl border bg-white/[0.03] backdrop-blur-sm transition-all duration-400 ${card.bg} ${card.glow} hover:-translate-y-1.5`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.bg} ${card.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Personal quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-light italic text-white/70 leading-relaxed">
            "Building Digital Experiences with{" "}
            <span className="text-gradient font-semibold not-italic">Code, Design,</span> and{" "}
            <span className="text-gradient font-semibold not-italic">Artificial Intelligence.</span>"
          </p>
        </motion.blockquote>
      </div>

      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
