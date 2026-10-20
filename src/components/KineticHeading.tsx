"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "Mari bikin produk.",
  "Ide jadi nyata.",
  "Kode yang terasa.",
];

export default function KineticHeading() {
  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(phrases[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const isSettled = phraseIndex === phrases.length - 1
    && characterCount === phrases[phraseIndex].length
    && !isDeleting;

  useEffect(() => {
    if (reduceMotion || isSettled) return;

    const phrase = phrases[phraseIndex];
    const pause = !isDeleting && characterCount === phrase.length;
    const finishedDeleting = isDeleting && characterCount === 0;
    const delay = pause ? 1700 : finishedDeleting ? 90 : isDeleting ? 34 : 58;

    const timer = window.setTimeout(() => {
      if (pause) {
        setIsDeleting(true);
        return;
      }

      if (finishedDeleting) {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setIsDeleting(false);
        return;
      }

      setCharacterCount((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [characterCount, isDeleting, isSettled, phraseIndex, reduceMotion]);

  const activePhrase = reduceMotion ? phrases[0] : phrases[phraseIndex].slice(0, characterCount);

  return (
    <h1 className="hero-heading" aria-label="Hai, saya Caesar. Mari bikin produk.">
      <span className="hero-line-mask" aria-hidden="true">
        <motion.span
          initial={reduceMotion ? false : { y: "115%", rotate: 1.5 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.86, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Hai, saya Caesar.
        </motion.span>
      </span>
      <span className="hero-line-mask hero-type-line" aria-hidden="true">
        <motion.span
          className="hero-highlight"
          initial={reduceMotion ? false : { y: "115%", rotate: 1.5 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.86, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
        >
          {activePhrase}
          {!reduceMotion && !isSettled && <span className="type-caret" />}
        </motion.span>
      </span>
    </h1>
  );
}
