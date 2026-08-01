"use client";

import { motion } from "framer-motion";

type Variant =
  | "primary-to-secondary"
  | "accent-to-primary"
  | "secondary-to-accent"
  | "dark-to-darker"
  | "darker-to-dark";

interface SectionDividerProps {
  variant?: Variant;
}

const stops: Record<Variant, [string, string, string]> = {
  "primary-to-secondary": ["#2563EB", "#38BDF8", "#7C3AED"],
  "accent-to-primary": ["#38BDF8", "#2563EB", "#00E5FF"],
  "secondary-to-accent": ["#7C3AED", "#2563EB", "#38BDF8"],
  "dark-to-darker": ["#2563EB", "#7C3AED", "#38BDF8"],
  "darker-to-dark": ["#38BDF8", "#2563EB", "#7C3AED"],
};

export default function SectionDivider({ variant = "primary-to-secondary" }: SectionDividerProps) {
  const [c1, c2, c3] = stops[variant];
  const gradId = `div-${variant}`;

  return (
    <div className="relative w-full h-16 md:h-20 overflow-hidden flex items-center justify-center pointer-events-none select-none">
      {/* Horizontal glowing line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: 0.5 }}
        className="absolute left-8 right-8 md:left-24 md:right-24 h-px"
        aria-hidden
      >
        <svg width="100%" height="1" className="overflow-visible">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor={c1} stopOpacity="0.5" />
              <stop offset="50%" stopColor={c2} stopOpacity="0.9" />
              <stop offset="80%" stopColor={c3} stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="0" stroke={`url(#${gradId})`} strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="relative flex items-center justify-center z-10"
        aria-hidden
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute w-4 h-4 rounded-full"
          style={{ background: c2, opacity: 0.4 }}
        />
        {/* Inner dot */}
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: c2,
            boxShadow: `0 0 8px 2px ${c2}80`,
          }}
        />
      </motion.div>
    </div>
  );
}
