"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { chapters } from "@/data/journey";
import SceneAtmosphere from "./SceneAtmosphere";
import { sceneTransition } from "@/lib/scene-transition";

const rulerTicks = Array.from({ length: 61 }, (_, i) => `M${i * 1000 / 60} ${i % 5 === 0 ? 1 : 8}V${i % 5 === 0 ? 23 : 19}`).join(" ");

/** Scroll content first. Desktop wheel advances at an edge; touch layouts use arrows. */
export default function SceneJourney({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const rulerId = useId().replaceAll(":", "");
  const navigateRef = useRef<(index: number, focus?: boolean) => void>(() => {});
  const camera = useMotionValue(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 1024px), (pointer: coarse)");
    const panels = [...root.querySelectorAll<HTMLElement>(".journey-panel")];
    const bodies = [...root.querySelectorAll<HTMLElement>(".scene-body")];
    const frame = root.querySelector<HTMLElement>(".journey-frame")!;
    const rail = root.querySelector<SVGRectElement>(".journey-rail rect");
    const progressBar = root.querySelector<HTMLElement>(".journey-rail");
    const cue = root.querySelector<HTMLElement>(".journey-cue-text");
    const chrome = [...document.querySelectorAll<HTMLElement>(".site-nav, .journey-dock")];
    // Each scene owns its material tones. Never invalidate the entire stage's
    // inherited variables at the midpoint of a transition.
    panels.forEach((panel, index) => {
      const chapter = chapters[index];
      for (const [name, value] of Object.entries({ "--chapter-ground": chapter.background, "--chapter-ink": chapter.ink, "--chapter-accent": chapter.accent, "--chapter-glow": chapter.glow, "--neu-light": chapter.neuLight, "--neu-dark": chapter.neuDark, "--neu-surface": chapter.surface })) panel.style.setProperty(name, value);
    });
    let current = -1;
    let goal = 0;
    let busy = false;
    let animation: { stop: () => void } | undefined;
    let wheelAmount = 0;
    let lastWheel = 0;
    let consumedGesture = false;
    let contentEdgeUntil = 0;
    let cueFrame = 0;

    const scrollPanes = (target: EventTarget | null) => {
      const body = bodies[Math.max(0, current)];
      const candidates: HTMLElement[] = [];
      let node = target instanceof HTMLElement && body.contains(target) ? target : null;
      while (node && body.contains(node)) {
        if (node.scrollHeight > node.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(node).overflowY)) candidates.push(node);
        if (node === body) break;
        node = node.parentElement;
      }
      const list = body.querySelector<HTMLElement>(".certificate-cards-grid");
      for (const pane of [list, body]) {
        if (pane && !candidates.includes(pane) && pane.scrollHeight > pane.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(pane).overflowY)) candidates.push(pane);
      }
      return candidates;
    };
    const canScroll = (pane: HTMLElement, direction: number) => direction > 0
      ? pane.scrollTop + pane.clientHeight < pane.scrollHeight - 2 : pane.scrollTop > 2;
    const updateCue = () => {
      if (!cue) return;
      const panes = scrollPanes(null);
      const remaining = panes.some(pane => canScroll(pane, 1));
      const text = compact.matches ? "Pindah pakai panah" : remaining ? "Scroll isi terlebih dulu" : panes.length ? "Ujung isi · scroll untuk pindah" : "Scroll atau panah untuk pindah";
      if (cue.textContent !== text) cue.textContent = text;
      root.dataset.scrollState = remaining ? "content" : "edge";
    };
    const queueCue = () => {
      cancelAnimationFrame(cueFrame);
      cueFrame = requestAnimationFrame(() => { cueFrame = 0; updateCue(); });
    };
    const update = () => {
      const pose = sceneTransition(camera.get(), chapters.length);
      const nearest = Math.round(pose.progress);
      root.dataset.transition = pose.kind;
      panels.forEach((panel, index) => {
        const base = index === pose.from;
        const overlay = index === pose.to && pose.mix > 0;
        panel.style.visibility = base || overlay ? "visible" : "hidden";
        panel.style.opacity = base || overlay ? "1" : "0";
        if (base || overlay) {
          panel.style.zIndex = overlay ? "2" : "1";
          panel.style.transform = overlay ? pose.transform : pose.baseTransform;
          panel.style.clipPath = overlay ? pose.clip : "none";
          if (pose.mix > .001 && pose.mix < .999) panel.style.willChange = "transform, clip-path";
          else panel.style.removeProperty("will-change");
        } else panel.style.removeProperty("will-change");
        // Only outgoing/incoming panels change state; leave dormant trees alone.
        if (nearest !== current && (current < 0 || index === current || index === nearest)) {
          panel.style.pointerEvents = nearest === index ? "auto" : "none";
          panel.inert = nearest !== index;
          panel.setAttribute("aria-hidden", String(nearest !== index));
        }
      });
      const progress = pose.progress / (chapters.length - 1);
      rail?.setAttribute("width", String(progress * 1000));
      progressBar?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      if (nearest !== current) {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && panels.some((panel, index) => index !== nearest && panel.contains(focused))) focused.blur();
        current = nearest;
        setActive(nearest);
        root.dataset.active = chapters[nearest].id;
        const chapter = chapters[nearest];
        for (const element of chrome) {
          element.style.setProperty("--chapter-ground", chapter.background);
          element.style.setProperty("--chapter-ink", chapter.ink);
          element.style.setProperty("--chapter-accent", chapter.accent);
          element.style.setProperty("--chapter-glow", chapter.glow);
          element.style.setProperty("--neu-light", chapter.neuLight);
          element.style.setProperty("--neu-dark", chapter.neuDark);
          element.style.setProperty("--neu-surface", chapter.surface);
        }
        frame.style.backgroundColor = chapter.background;
        window.dispatchEvent(new CustomEvent("portfolio:chapter", { detail: chapter.id }));
      }
    };
    const go = (index: number, focus = false, instant = false, reset = false) => {
      const target = Math.max(0, Math.min(chapters.length - 1, index));
      if (target === goal && busy) return;
      animation?.stop();
      const origin = camera.get();
      if (Math.abs(target - origin) > .00001) root.dataset.direction = target > origin ? "forward" : "backward";
      root.dataset.target = chapters[target].id;
      if (reset) {
        bodies[target].scrollTop = 0;
        bodies[target].querySelector<HTMLElement>(".certificate-cards-grid")?.scrollTo({ top: 0, behavior: "instant" });
      }
      const direct = instant || reduce.matches || Math.abs(target - current) > 1;
      goal = target;
      busy = !direct && Math.abs(camera.get() - target) > .00001;
      root.dataset.transitioning = String(busy);
      const complete = () => {
        camera.set(target);
        update();
        busy = false;
        root.dataset.transitioning = "false";
        if (focus) requestAnimationFrame(() => {
          if (bodies[target].isConnected && !bodies[target].closest("[inert]")) bodies[target].focus({ preventScroll: true });
        });
        // Read scroll geometry on the following frame, never immediately after
        // all panel/theme writes (which forced an expensive synchronous reflow).
        queueCue();
      };
      if (!busy) complete();
      else animation = animate(camera, target, { duration: .68, ease: [.65, 0, .25, 1], onComplete: complete });
    };
    navigateRef.current = go;
    const followHash = () => {
      const index = chapters.findIndex(chapter => `#${chapter.id}` === location.hash);
      if (index >= 0) go(index, false, true);
    };
    const anchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const index = chapters.findIndex(chapter => `#${chapter.id}` === url.hash);
      if (index < 0) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      go(index, true, false, true);
    };
    const wheel = (event: WheelEvent) => {
      if (compact.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || root.closest("[inert]") || document.documentElement.dataset.intro === "playing") return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) { consumedGesture = false; wheelAmount = 0; }
      lastWheel = now;
      if (busy || consumedGesture) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (!delta) return;
      const pane = scrollPanes(event.target).find(candidate => canScroll(candidate, delta));
      if (pane) {
        pane.scrollTop += delta;
        contentEdgeUntil = now + 140;
        wheelAmount = 0;
        updateCue();
        return; // Never transfer a leftover delta into a transition.
      }
      if (now < contentEdgeUntil) return;
      if (Math.sign(wheelAmount) !== Math.sign(delta)) wheelAmount = 0;
      wheelAmount += delta;
      if (Math.abs(wheelAmount) < 48) return;
      const next = current + Math.sign(wheelAmount);
      wheelAmount = 0;
      if (next < 0 || next >= chapters.length) return;
      consumedGesture = true;
      go(next);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || root.closest("[inert]") || document.documentElement.dataset.intro === "playing") return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input,textarea,select,button,a,[contenteditable=true],[role=tab]")) return;
      if (!["PageDown", "PageUp", " "].includes(event.key)) return;
      event.preventDefault();
      if (busy) return;
      const direction = event.key === "PageUp" || event.shiftKey ? -1 : 1;
      const pane = scrollPanes(event.target).find(candidate => canScroll(candidate, direction));
      if (pane) { pane.scrollTop += direction * pane.clientHeight * .8; updateCue(); }
      else if (!compact.matches) go(current + direction, true);
    };
    const configure = () => {
      root.dataset.enhanced = "true";
      root.dataset.navigation = compact.matches ? "arrows" : "scroll";
      document.documentElement.dataset.journey = "on";
      updateCue();
    };
    const visibility = () => { root.dataset.hidden = String(document.hidden); };
    configure();
    update();
    const initial = requestAnimationFrame(followHash);
    const unsubscribe = camera.on("change", update);
    document.addEventListener("click", anchor, true);
    document.addEventListener("wheel", wheel, { passive: false });
    document.addEventListener("keydown", keyboard);
    document.addEventListener("visibilitychange", visibility);
    root.addEventListener("scroll", updateCue, { passive: true, capture: true });
    compact.addEventListener("change", configure);
    const reducedChange = () => { if (reduce.matches) go(goal, false, true); };
    reduce.addEventListener("change", reducedChange);
    window.addEventListener("hashchange", followHash);
    window.addEventListener("popstate", followHash);
    return () => {
      animation?.stop(); unsubscribe(); cancelAnimationFrame(initial); cancelAnimationFrame(cueFrame);
      document.removeEventListener("click", anchor, true);
      document.removeEventListener("wheel", wheel);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("visibilitychange", visibility);
      root.removeEventListener("scroll", updateCue, true);
      compact.removeEventListener("change", configure);
      reduce.removeEventListener("change", reducedChange);
      window.removeEventListener("hashchange", followHash);
      window.removeEventListener("popstate", followHash);
      delete document.documentElement.dataset.journey;
      chrome.forEach(element => { element.style.removeProperty("--chapter-ground"); element.style.removeProperty("--chapter-ink"); });
    };
  }, [camera]);

  return (
    <div ref={rootRef} className="journey" data-active="top" data-target="top" data-direction="forward" data-motion-paused={motionPaused}>
      <div className="journey-frame">
        {Children.toArray(children).map((child, index) => (
          <div key={chapters[index].id} className="journey-panel" data-scene={chapters[index].id}>
            <SceneAtmosphere chapter={chapters[index].id} />
            <div className="scene-body" tabIndex={0} role="region" aria-label={chapters[index].label}>{child}</div>
          </div>
        ))}
        <div className="journey-dock" role="group" aria-label="Kontrol perjalanan">
          <div className="journey-status">
            <span className="journey-current">{chapters[active].label}</span>
            <span className="journey-scroll-cue"><ArrowDown size={13} /><span className="journey-cue-text">Scroll isi terlebih dulu</span></span>
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
