"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <Hero3D />

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,8,22,0.7)_80%)] pointer-events-none z-[1]" />

      <div className="container relative z-10 mx-auto px-5 md:px-12 flex flex-col items-start max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Available for Hire
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 tracking-tight"
          >
            <span className="block text-white">Hi, I'm</span>
            <span className="block text-gradient">Caesar.</span>
            <span className="block text-white/80 font-light text-3xl sm:text-5xl md:text-6xl mt-2">
              I build digital{" "}
              <span className="italic font-semibold text-white">experiences.</span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mb-4 leading-relaxed"
          >
            "I don't just build applications.{" "}
            <span className="text-white font-medium">I build experiences that people remember.</span>"
          </motion.p>

          {/* Meta info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-10 text-sm text-muted"
          >
            <span className="flex items-center gap-1.5">
              <GraduationCap size={15} className="text-accent" />
              Computer Science · Universitas Diponegoro
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-accent" />
              Indonesia
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-primary text-white rounded-full font-semibold text-sm sm:text-base hover:bg-accent transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white/[0.06] border border-white/[0.15] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300"
            >
              Download CV
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted/60">scroll</span>
        <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-highlight to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
