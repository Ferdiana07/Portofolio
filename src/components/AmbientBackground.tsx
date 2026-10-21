"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-400);
  const pointerY = useMotionValue(-400);
  const pointerOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (reduceMotion || !finePointer.matches) return;

    let frame = 0;
    let nextX = -400;
    let nextY = -400;

    const updatePointer = () => {
      pointerX.set(nextX - 160);
      pointerY.set(nextY - 160);
      pointerOpacity.set(1);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches) return;
      nextX = event.clientX;
      nextY = event.clientY;

      if (!frame) frame = window.requestAnimationFrame(updatePointer);
    };

    const hidePointer = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      pointerOpacity.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hidePointer);
    document.documentElement.addEventListener("mouseleave", hidePointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hidePointer);
      document.documentElement.removeEventListener("mouseleave", hidePointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pointerOpacity, pointerX, pointerY, reduceMotion]);

  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-ribbon" />
      <motion.div
        className="ambient-pointer-light"
        style={{ x: smoothX, y: smoothY, opacity: pointerOpacity }}
      />
    </div>
  );
}
