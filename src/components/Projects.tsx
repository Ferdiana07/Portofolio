"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

const projects = [
  {
    title: "SINAUWU",
    tag: "AI · Education",
    description: "An AI-powered Learning Platform that adapts to individual student needs, offering personalized courses, quizzes, and instant feedback.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI API", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
    gradient: "from-blue-600 to-purple-700",
    accent: "rgba(37,99,235,0.3)",
  },
  {
    title: "Exercise Monitoring AI",
    tag: "AI · Computer Vision",
    description: "Computer vision app that tracks human poses during workouts, counts reps, and provides real-time form correction using ML models.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "React"],
    github: "https://github.com",
    demo: "https://example.com",
    gradient: "from-emerald-500 to-teal-700",
    accent: "rgba(16,185,129,0.3)",
  },
  {
    title: "SEAPEDIA",
    tag: "Full Stack · Marine",
    description: "Comprehensive digital encyclopedia and dashboard for marine life — featuring data visualization, search, and species information.",
    tech: ["React", "Laravel", "MySQL", "TailwindCSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com",
    gradient: "from-cyan-500 to-blue-700",
    accent: "rgba(6,182,212,0.3)",
  },
  {
    title: "IoT Dashboard",
    tag: "IoT · Real-time",
    description: "Real-time monitoring dashboard for IoT devices featuring live charts, status indicators, and remote control for smart home systems.",
    tech: ["Next.js", "Socket.io", "Express", "MongoDB", "Recharts"],
    github: "https://github.com",
    demo: "https://example.com",
    gradient: "from-orange-500 to-red-700",
    accent: "rgba(249,115,22,0.3)",
  },
  {
    title: "Task Management System",
    tag: "Full Stack · Productivity",
    description: "Kanban-style project management tool with drag-and-drop, real-time collaboration, and detailed analytics for team productivity.",
    tech: ["React", "Node.js", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com",
    demo: "https://example.com",
    gradient: "from-indigo-500 to-purple-700",
    accent: "rgba(99,102,241,0.3)",
  },
  {
    title: "Personal Portfolio",
    tag: "Frontend · Design",
    description: "A world-class, premium digital portfolio featuring complex 3D animations, glassmorphism, and buttery smooth scrolling.",
    tech: ["Next.js", "Three.js", "GSAP", "Framer Motion", "TailwindCSS"],
    github: "https://github.com/Ferdiana07/Portofolio",
    demo: "https://example.com",
    gradient: "from-pink-500 to-rose-700",
    accent: "rgba(236,72,153,0.3)",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/20"
      style={{
        transform: hovered ? "perspective(800px) rotateX(2deg) translateY(-8px)" : "perspective(800px) rotateX(0) translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${project.accent}` : "none",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Project Cover */}
      <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Code2
            size={52}
            className="text-white/25 group-hover:text-white/40 group-hover:scale-110 transition-all duration-500"
          />
        </div>

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
            {project.tag}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs font-semibold transition-colors"
          >
            <GithubIcon size={14} />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary/80 hover:bg-primary rounded-full text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-5 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.06] text-white/70 border border-white/[0.08]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-5 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
            >
              My work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ originX: 0 }}
              className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://github.com/Ferdiana07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-highlight transition-colors"
          >
            <GithubIcon size={16} />
            View all on GitHub →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
