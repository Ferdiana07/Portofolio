"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type PointerEvent } from "react";
import { profile } from "@/data/portfolio";

const spring = { stiffness: 125, damping: 20, mass: 0.72 };

export default function HeroStage() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.6, 2.6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.2, -2.2]);
  const cardX = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [-2, 2]);
  const vectorX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const vectorY = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-36, 36]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-42, 42]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="hero-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="hero-stage-glow"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: glowX, y: glowY }}
      />
      <motion.svg
        className="hero-vector-field"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: vectorX, y: vectorY }}
      >
        <motion.path
          d="M96 328C146 159 305 75 459 150C560 199 584 337 511 437C431 547 249 554 139 463C70 406 48 323 96 328Z"
          className="hero-vector-line hero-vector-line-primary"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M114 230C207 104 414 96 505 240C574 350 494 489 362 505C221 523 84 415 114 230Z"
          className="hero-vector-line hero-vector-line-secondary"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M76 387C172 440 288 407 347 304C402 207 472 163 548 176"
          className="hero-vector-line hero-vector-line-accent"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
      <motion.div
        className="portrait-card"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        style={
          reduceMotion
            ? undefined
            : { x: cardX, y: cardY, rotateX, rotateY, transformPerspective: 1000 }
        }
      >
        <div className="portrait-frame">
          <Image
            src="/images/caesar-portrait-v2.webp"
            alt={`Potret resmi ${profile.name}`}
            fill
            sizes="(max-width: 767px) 88vw, (max-width: 1100px) 420px, 34vw"
            className="portrait-image"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
