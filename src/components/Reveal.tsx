"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// One observer for the whole page; viewport changes never re-render React.
let observer: IntersectionObserver | undefined;
const revealCallbacks = new WeakMap<Element, () => void>();

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
  }
  return observer;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || reduceMotion || element.closest(".journey") || typeof element.animate !== "function") return;

    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    let animation: Animation | undefined;
    const viewportObserver = getObserver();

    revealCallbacks.set(element, () => {
      animation = element.animate(
        touch
          ? [{ opacity: 0.55 }, { opacity: 1 }]
          : [{ opacity: 0.35, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: touch ? 240 : 480, delay: Math.min(delay * 1000, 150), easing: "cubic-bezier(.16,1,.3,1)" },
      );
    });
    viewportObserver.observe(element);

    return () => {
      viewportObserver.unobserve(element);
      revealCallbacks.delete(element);
      animation?.cancel();
    };
  }, [delay, reduceMotion]);

  return (
    <div
      ref={elementRef}
      className={`reveal${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
