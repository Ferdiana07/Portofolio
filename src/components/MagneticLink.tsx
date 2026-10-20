"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type MagneticLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
  target?: "_blank";
  rel?: string;
};

const spring = { stiffness: 230, damping: 18, mass: 0.35 };

export default function MagneticLink({
  children,
  className,
  href,
  target,
  rel,
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * 0.2);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={reduceMotion ? undefined : { x, y }}
    >
      {children}
    </motion.a>
  );
}
