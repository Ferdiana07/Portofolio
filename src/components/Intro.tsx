"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<() => void>(() => {});
  const pathname = usePathname();
  const finish = useCallback(() => {
    const focusedIntro = introRef.current?.contains(document.activeElement);
    releaseRef.current();
    if (introRef.current) introRef.current.hidden = true;
    document.documentElement.dataset.intro = "done";
    if (focusedIntro) document.querySelector<HTMLElement>(".brand")?.focus({ preventScroll: true });
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
    introRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(finish, 3900);
    return () => { window.clearTimeout(timer); release(); releaseRef.current = () => {}; };
  }, [pathname, finish]);

  return (
    <div ref={introRef} className="intro-screen" tabIndex={-1} aria-label="Membuka portofolio Caesar" hidden={pathname !== "/"}>
      <div className="intro-wordmark" role="img" aria-label="CFS">
        {"CFS".split("").map((letter, index) => <span key={letter} style={{ animationDelay: `${index * 180}ms` }}>{letter}</span>)}<span className="intro-period">.</span>
      </div>
      <div className="intro-rule" aria-hidden="true"><span /></div>
    </div>
  );
}
