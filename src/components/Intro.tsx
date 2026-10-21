"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const releaseRef = useRef<() => void>(() => {});
  const pathname = usePathname();
  const finish = useCallback(() => {
    releaseRef.current();
    if (introRef.current) introRef.current.hidden = true;
    document.documentElement.dataset.intro = "done";
    try { sessionStorage.setItem("cfs-intro", "seen"); } catch { /* Storage is optional. */ }
  }, []);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("cfs-intro") === "seen"; } catch { /* Private browsing fallback. */ }
    if (pathname !== "/" || seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.location.hash) {
      if (introRef.current) introRef.current.hidden = true;
      document.documentElement.dataset.intro = "done";
      return;
    }
    document.documentElement.dataset.intro = "playing";
    const surfaces = [...document.querySelectorAll<HTMLElement>("main, .site-nav, .footer")]
      .map((element) => ({ element, wasInert: element.inert }));
    surfaces.forEach(({ element }) => { element.inert = true; });
    const release = () => surfaces.forEach(({ element, wasInert }) => { element.inert = wasInert; });
    releaseRef.current = release;
    skipRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(finish, 4100);
    return () => { window.clearTimeout(timer); release(); releaseRef.current = () => {}; };
  }, [pathname, finish]);

  return (
    <div ref={introRef} className="intro-screen" hidden={pathname !== "/"}>
      <div className="intro-wordmark" role="img" aria-label="CFS">
        {"CFS".split("").map((letter, index) => <span key={letter} style={{ animationDelay: `${index * 180}ms` }}>{letter}</span>)}<span className="intro-period">.</span>
      </div>
      <div className="intro-rule" aria-hidden="true"><span /></div>
      <button ref={skipRef} type="button" className="intro-skip" onClick={finish}>Lewati intro ↗</button>
    </div>
  );
}
