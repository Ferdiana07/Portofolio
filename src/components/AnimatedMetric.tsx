"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type AnimatedMetricProps = {
  value: string;
};

function parseMetric(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const rawNumber = match?.[1] ?? "0";

  return {
    target: Number(rawNumber),
    decimals: rawNumber.split(".")[1]?.length ?? 0,
    suffix: match?.[2] ?? "",
  };
}

export default function AnimatedMetric({ value }: AnimatedMetricProps) {
  const valueRef = useRef<HTMLElement>(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const metric = useMemo(() => parseMetric(value), [value]);

  useEffect(() => {
    const element = valueRef.current;
    if (!element || !isInView) return;

    if (reduceMotion) {
      element.textContent = value;
      return;
    }

    element.textContent = `${(0).toFixed(metric.decimals)}${metric.suffix}`;

    const controls = animate(0, metric.target, {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        element.textContent = `${latest.toFixed(metric.decimals)}${metric.suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, metric, reduceMotion, value]);

  return (
    <strong ref={valueRef} className="proof-value" aria-label={value}>
      {value}
    </strong>
  );
}
