"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroStage from "./HeroStage";

const phrases = ["Senang ngulik software.", "Penasaran sama AI.", "Belajar sampai ke cloud."];

export default function KineticHeading() {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(phrases[0]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let timer: number;
    let index = 0;
    let count = phrases[0].length;
    let deleting = true;
    let visible = true;
    const tick = () => {
      if (!visible || document.hidden) { timer = window.setTimeout(tick, 700); return; }
      const phrase = phrases[index];
      count += deleting ? -1 : 1;
      setText(phrase.slice(0, count));
      let delay = deleting ? 28 : 48;
      if (count === 0) { index = (index + 1) % phrases.length; deleting = false; delay = 180; }
      else if (!deleting && count === phrase.length) { deleting = true; delay = 3200; }
      timer = window.setTimeout(tick, delay);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (headingRef.current) observer.observe(headingRef.current);
    timer = window.setTimeout(tick, 4500);
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, [reduceMotion]);

  return (
    <div ref={headingRef}>
      <div className="hero-greeting-row" aria-hidden="true">
        <span className="hero-greeting">Hai,</span>
        <div className="portrait-wrap"><HeroStage /></div>
        <span className="hero-greeting">saya</span>
      </div>
      <h1 className="hero-heading" aria-label="Hai, saya Caesar.">
        <span className="hero-line-mask" aria-hidden="true"><span className="hero-name">{"Caesar.".split("").map((letter, index) => <span key={index} className="name-letter">{letter}</span>)}</span></span>
      </h1>
      <p className="hero-typed"><span className="sr-only">{phrases.join(" ")}</span><span aria-hidden="true">{reduceMotion ? phrases[0] : text}<span className="type-caret" /></span></p>
    </div>
  );
}
