"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { chapters } from "@/data/journey";

const POOL_SIZE = 8;
const NATIVE_TARGETS = "input, textarea, select, [contenteditable]:not([contenteditable=false]), iframe, [role=dialog]";
const ACTION_TARGETS = "a[href], button:not(:disabled), [role=button], [role=tab], summary, label";

/** Native SVG tip + tactile seam follower, eight fibres and one click impression. */
export default function CursorInk() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof Element.prototype.animate !== "function") return;
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const journey = document.querySelector<HTMLElement>(".journey");
    const head = root.querySelector<HTMLElement>(".cursor-seam")!;
    const stamp = root.querySelector<HTMLElement>(".cursor-impression")!;
    const marks = [...root.querySelectorAll<HTMLElement>(".cursor-fibre")];
    const animations: (Animation | undefined)[] = Array(POOL_SIZE);
    let impression: Animation | undefined;
    let allowed = false;
    let frame = 0;
    let slot = 0;
    let lastTime = -Infinity;
    let point: { x: number; y: number; action: boolean; quiet: boolean } | null = null;
    let previous: { x: number; y: number } | null = null;

    const clearTrail = () => {
      previous = null; lastTime = -Infinity;
      animations.forEach(animation => animation?.cancel());
    };
    const clear = () => {
      cancelAnimationFrame(frame); frame = 0; point = null;
      clearTrail(); impression?.cancel();
      if (root.dataset.visible !== "false") root.dataset.visible = "false";
      if (root.dataset.pressed !== "false") root.dataset.pressed = "false";
    };
    const sync = () => {
      allowed = preference.matches && !document.hidden
        && document.documentElement.dataset.intro !== "playing"
        && journey?.dataset.motionPaused !== "true"
        && journey?.dataset.hidden !== "true";
      if (allowed) document.documentElement.dataset.cursor = "canvas";
      else { delete document.documentElement.dataset.cursor; clear(); }
    };
    const setInk = () => {
      const chapter = chapters.find(item => item.id === journey?.dataset.active);
      root.style.color = chapter?.ink ?? "#19372d";
      root.style.setProperty("--cursor-paper", chapter?.background ?? "#e9e7de");
      clear();
    };
    const draw = (time: number) => {
      frame = 0;
      if (!point || !allowed) return;
      head.style.transform = `translate3d(${point.x}px,${point.y}px,0)`;
      if (root.dataset.visible !== "true") root.dataset.visible = "true";
      const action = String(point.action);
      if (root.dataset.action !== action) root.dataset.action = action;
      if (point.quiet) { clearTrail(); return; }
      if (!previous) { previous = point; return; }
      const dx = point.x - previous.x;
      const dy = point.y - previous.y;
      if (time - lastTime < 56 || Math.hypot(dx, dy) < 12) return;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const position = `translate3d(${point.x - 15}px,${point.y + 12}px,0) rotate(${angle}deg)`;
      animations[slot]?.cancel();
      animations[slot] = marks[slot].animate([
        { transform: `${position} scale(1)`, opacity: .6 },
        { transform: `${position} translateY(5px) scale(.5)`, opacity: 0 },
      ], { duration: 480, easing: "ease-out" });
      slot = (slot + 1) % POOL_SIZE;
      previous = point;
      lastTime = time;
    };
    const targetInfo = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      return {
        native: Boolean(element?.closest(NATIVE_TARGETS)),
        action: Boolean(element?.closest(ACTION_TARGETS)),
        quiet: Boolean(element?.closest(".site-nav, .journey-dock")),
      };
    };
    const move = (event: PointerEvent) => {
      if (!allowed) return;
      const target = targetInfo(event.target);
      if (event.pointerType !== "mouse" || event.buttons || target.native) { clear(); return; }
      point = { x: event.clientX, y: event.clientY, action: target.action, quiet: target.quiet };
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const press = (event: PointerEvent) => {
      const target = targetInfo(event.target);
      if (!allowed || event.pointerType !== "mouse" || event.button !== 0 || target.native) { clear(); return; }
      cancelAnimationFrame(frame); frame = 0; clearTrail();
      root.dataset.pressed = "true";
      root.dataset.visible = "false"; // Native SVG/grab remains precise during puzzle capture.
      const position = `translate3d(${event.clientX - 18}px,${event.clientY - 18}px,0)`;
      impression?.cancel();
      impression = stamp.animate([
        { transform: `${position} rotate(-12deg) scale(.6)`, opacity: .65 },
        { transform: `${position} rotate(8deg) scale(1.8)`, opacity: 0 },
      ], { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" });
    };
    const release = () => { root.dataset.pressed = "false"; };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) clear(); };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
    if (journey) observer.observe(journey, { attributes: true, attributeFilter: ["data-motion-paused", "data-hidden"] });
    setInk();
    sync();
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", clear, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", clear);
    window.addEventListener("keydown", clear);
    window.addEventListener("scroll", clear, { passive: true, capture: true });
    window.addEventListener("portfolio:chapter", setInk);
    return () => {
      clear(); delete document.documentElement.dataset.cursor;
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", clear);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", clear);
      window.removeEventListener("keydown", clear);
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("portfolio:chapter", setInk);
    };
  }, [pathname]);

  return <div ref={rootRef} className="cursor-ink" aria-hidden="true" inert>
    <div className="cursor-seam"><i /></div>
    <div className="cursor-impression" />
    {Array.from({ length: POOL_SIZE }, (_, index) => <span className="cursor-fibre" key={index}>
      <svg viewBox="0 0 32 12" fill="none" aria-hidden="true"><path d={index % 2 ? "M2 8q8-9 17-3l10-3M6 10l3-3m11 1 3-3" : "M1 5q7 5 15-1t15 2M5 2l3 3m14 3 3-3"} /></svg>
    </span>)}
  </div>;
}
