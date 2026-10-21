"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { chapters } from "@/data/journey";
import { CHAPTER_VIEWPORTS, scenePosition } from "@/lib/journey-timing";
import SceneAtmosphere from "./SceneAtmosphere";
import { sceneTransition } from "@/lib/scene-transition";

const rulerTicks = Array.from({ length: 61 }, (_, i) => `M${i * 1000 / 60} ${i % 5 === 0 ? 1 : 8}V${i % 5 === 0 ? 23 : 19}`).join(" ");

/** Native page scroll drives a single stage, without a wheel hijack. */
export default function SceneJourney({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const rulerId = useId().replaceAll(":", "");
  const navigateRef = useRef<(index: number, focus?: boolean) => void>(() => {});
  const { scrollY } = useScroll();
  const cameraY = useSpring(scrollY, { stiffness: 90, damping: 26, mass: 0.8, restDelta: 0.5 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const panels = [...root.querySelectorAll<HTMLElement>(".journey-panel")];
    const bodies = [...root.querySelectorAll<HTMLElement>(".scene-body")];
    const frame = root.querySelector<HTMLElement>(".journey-frame")!;
    const rail = root.querySelector<SVGRectElement>(".journey-rail rect");
    const progressBar = root.querySelector<HTMLElement>(".journey-rail");
    const chrome = [...document.querySelectorAll<HTMLElement>(".site-nav, .journey-dock")];
    const html = document.documentElement;
    let top = 0;
    let distance = 1;
    let current = -1;
    let enabled = false;
    let pendingFocus = -1;
    let lastPercent = -1;

    const update = () => {
      if (!enabled) return;
      const raw = Math.max(0, Math.min(chapters.length - 1, (cameraY.get() - top) / distance * (chapters.length - 1)));
      const pose = sceneTransition(scenePosition(raw, chapters.length), chapters.length);
      const progress = pose.progress;
      const nearest = Math.round(progress);
      root.dataset.transition = pose.kind;
      panels.forEach((panel, index) => {
        const base = index === pose.from;
        const overlay = index === pose.to && pose.mix > 0;
        if (base || overlay) {
          panel.style.opacity = "1";
          panel.style.visibility = "visible";
          panel.style.zIndex = overlay ? "2" : "1";
          panel.style.transform = overlay ? pose.transform : pose.baseTransform;
          panel.style.clipPath = overlay ? pose.clip : "none";
          if (pose.mix > .001 && pose.mix < .999) panel.style.willChange = "transform, clip-path";
          else panel.style.removeProperty("will-change");
        } else if (panel.style.visibility !== "hidden") {
          panel.style.opacity = "0"; panel.style.visibility = "hidden"; panel.style.transform = "none";
          panel.style.removeProperty("will-change");
        }
        if (nearest !== current) {
          panel.style.pointerEvents = nearest === index ? "auto" : "none";
          panel.inert = nearest !== index;
          panel.toggleAttribute("inert", nearest !== index);
          panel.setAttribute("aria-hidden", String(nearest !== index));
        }
      });
      if (rail) rail.setAttribute("width", String(raw / (chapters.length - 1) * 1000));
      const percent = Math.round(raw / (chapters.length - 1) * 100);
      if (percent !== lastPercent) { progressBar?.setAttribute("aria-valuenow", String(percent)); lastPercent = percent; }
      if (nearest !== current) {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && panels.some((panel, index) => index !== nearest && panel.contains(focused))) focused.blur();
        current = nearest;
        setActive(nearest);
        root.dataset.active = chapters[nearest].id;
        // Theme changes stay local: avoid restyling every descendant on scroll.
        frame.style.backgroundColor = chapters[nearest].background;
        frame.style.setProperty("--chapter-ground", chapters[nearest].background);
        frame.style.setProperty("--chapter-ink", chapters[nearest].ink);
        frame.style.setProperty("--chapter-accent", chapters[nearest].accent);
        frame.style.setProperty("--chapter-glow", chapters[nearest].glow);
        frame.style.setProperty("--neu-light", chapters[nearest].neuLight);
        frame.style.setProperty("--neu-dark", chapters[nearest].neuDark);
        frame.style.setProperty("--neu-surface", chapters[nearest].surface);
        chrome.forEach((element) => {
          element.style.setProperty("--chapter-ground", chapters[nearest].background);
          element.style.setProperty("--chapter-ink", chapters[nearest].ink);
          element.style.setProperty("--chapter-accent", chapters[nearest].accent);
          element.style.setProperty("--chapter-glow", chapters[nearest].glow);
          element.style.setProperty("--neu-light", chapters[nearest].neuLight);
          element.style.setProperty("--neu-dark", chapters[nearest].neuDark);
          element.style.setProperty("--neu-surface", chapters[nearest].surface);
        });
        window.dispatchEvent(new CustomEvent("portfolio:chapter", { detail: chapters[nearest].id }));
      }
      if (pendingFocus === nearest && Math.abs(progress - nearest) < .06) {
        const body = bodies[pendingFocus]; pendingFocus = -1;
        requestAnimationFrame(() => { if (body?.isConnected && !body.closest('[inert]')) body.focus({ preventScroll: true }); });
      }
    };

    const go = (index: number, focus = false, instant = false) => {
      const target = Math.max(0, Math.min(chapters.length - 1, index));
      pendingFocus = focus ? target : -1;
      if (enabled) {
        const destination = top + distance * target / (chapters.length - 1);
        window.scrollTo({ top: destination, behavior: instant ? "instant" : "smooth" });
        if (instant) { cameraY.jump(destination); update(); }
        else update();
      } else panels[target]?.scrollIntoView({ behavior: "instant", block: "start" });
      if (focus && !enabled) requestAnimationFrame(() => bodies[target]?.focus({ preventScroll: true }));
    };
    navigateRef.current = go;

    const configure = () => {
      const nextEnabled = !reduce.matches;
      if (nextEnabled !== enabled) current = -1;
      enabled = nextEnabled;
      root.dataset.enhanced = String(enabled);
      html.dataset.journey = enabled ? "on" : "off";
      if (enabled) {
        const height = frame.clientHeight || window.innerHeight;
        root.style.height = `${height * (1 + (chapters.length - 1) * CHAPTER_VIEWPORTS)}px`;
        top = root.getBoundingClientRect().top + window.scrollY;
        distance = root.offsetHeight - height;
        panels.forEach((panel, index) => {
          panel.inert = index !== 0;
          panel.toggleAttribute("inert", index !== 0);
          panel.setAttribute("aria-hidden", String(index !== 0));
        });
        cameraY.jump(window.scrollY);
        current = -1;
        update();
      } else {
        root.style.removeProperty("height");
        panels.forEach((panel) => {
          panel.removeAttribute("style");
          panel.removeAttribute("aria-hidden");
          panel.removeAttribute("inert");
          panel.inert = false;
        });
      }
    };

    const followHash = () => {
      const index = chapters.findIndex((chapter) => `#${chapter.id}` === window.location.hash);
      if (index >= 0) go(index, false, true);
    };
    const interceptAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const index = chapters.findIndex((chapter) => `#${chapter.id}` === url.hash);
      if (index < 0) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      go(index, true);
    };

    const resize = () => {
      const progress = enabled ? (window.scrollY - top) / distance : 0;
      configure();
      if (enabled && progress >= 0 && progress <= 1) {
        const destination = top + distance * progress;
        window.scrollTo({ top: destination, behavior: "instant" }); cameraY.jump(destination); update();
      }
    };
    const onVisibility = () => { root.dataset.hidden = String(document.hidden); };
    configure();
    // Direct links work on the first render and after browser back/forward.
    const hashFrame = requestAnimationFrame(followHash);
    const unsubscribeCamera = cameraY.on("change", update);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("hashchange", followHash);
    window.addEventListener("popstate", followHash);
    document.addEventListener("click", interceptAnchor, true);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(hashFrame);
      unsubscribeCamera();
      window.removeEventListener("resize", resize);
      window.removeEventListener("hashchange", followHash);
      window.removeEventListener("popstate", followHash);
      document.removeEventListener("click", interceptAnchor, true);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", configure);
      delete html.dataset.journey;
      chrome.forEach((element) => {
        element.style.removeProperty("--chapter-ground"); element.style.removeProperty("--chapter-ink");
      });
    };
  }, [cameraY]);

  return (
    <div ref={rootRef} className="journey" data-active="top" data-motion-paused={motionPaused}>
      <div className="journey-frame">
        <div className="journey-geometry" aria-hidden="true"><span /><span /></div>
        {Children.toArray(children).map((child, index) => (
          <div key={chapters[index].id} className="journey-panel" data-scene={chapters[index].id}>
            <SceneAtmosphere chapter={chapters[index].id} />
            <div className="scene-body" tabIndex={0} role="region" aria-label={chapters[index].label}>{child}</div>
          </div>
        ))}
        <div className="journey-dock" role="group" aria-label="Kontrol perjalanan">
          <div className="journey-status">
            <span className="journey-current">{chapters[active].label}</span>
            <span className="journey-scroll-cue"><ArrowDown size={13} /> Scroll untuk menjelajah</span>
          </div>
          <div className="journey-controls">
            <button type="button" className="motion-pause" aria-pressed={motionPaused} aria-label={motionPaused ? "Lanjutkan animasi latar" : "Jeda animasi latar"} onClick={() => setMotionPaused(value => !value)}>{motionPaused ? <Play size={14} /> : <Pause size={14} />}<span>Gerak {motionPaused ? "off" : "on"}</span></button>
          <div className="chapter-arrows">
            <button type="button" onClick={() => navigateRef.current(active - 1, true)} disabled={active === 0} aria-label="Bab sebelumnya"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => navigateRef.current(active + 1, true)} disabled={active === chapters.length - 1} aria-label="Bab berikutnya"><ArrowRight size={17} /></button>
          </div>
          </div>
          <span className="journey-rail" role="progressbar" aria-label="Progres portofolio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
            <svg viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
              <defs><clipPath id={rulerId}><rect width="0" height="24" /></clipPath></defs>
              <path d={rulerTicks} className="ruler-track" />
              <path d={rulerTicks} clipPath={`url(#${rulerId})`} className="ruler-fill" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
