"use client";

import { motion, useReducedMotion } from "framer-motion";

const lines = [
  { text: "Hai, saya Caesar.", accent: false },
  { text: "Senang berkenalan.", accent: true },
];

export default function KineticHeading() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="hero-heading" aria-label="Hai, saya Caesar. Senang berkenalan.">
      {lines.map((line, lineIndex) => (
        <span className="hero-line-mask" aria-hidden="true" key={line.text}>
          <motion.span
            className={line.accent ? "hero-highlight" : undefined}
            initial={reduceMotion ? false : { y: "115%", rotate: 1.5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.86,
              delay: reduceMotion ? 0 : 0.08 + lineIndex * 0.11,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
