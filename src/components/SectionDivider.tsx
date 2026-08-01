"use client";

import { motion } from "framer-motion";

type Variant = "primary-to-secondary" | "accent-to-primary" | "secondary-to-accent" | "dark-to-darker" | "darker-to-dark";

interface SectionDividerProps {
  variant?: Variant;
  flip?: boolean;
}

const gradients: Record<Variant, string> = {
  "primary-to-secondary": "from-primary/20 via-secondary/20 to-accent/20",
  "accent-to-primary": "from-accent/20 via-primary/30 to-secondary/20",
  "secondary-to-accent": "from-secondary/20 via-transparent to-accent/20",
  "dark-to-darker": "from-background to-[#030610]",
  "darker-to-dark": "from-[#030610] to-background",
};

export default function SectionDivider({ variant = "primary-to-secondary", flip = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-32 overflow-hidden ${flip ? "scale-y-[-1]" : ""}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} blur-2xl opacity-60`}
      />
      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30"
          stroke="url(#divGrad)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dot in the center */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-highlight shadow-[0_0_10px_rgba(0,229,255,0.8)]"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-highlight/30 to-transparent"
      />
    </div>
  );
}
