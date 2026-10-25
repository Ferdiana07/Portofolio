"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { chapters } from "@/data/journey";

const NATIVE_TARGETS = "input, textarea, select, [contenteditable]:not([contenteditable=false]), iframe, [role=dialog]";
const ACTION_TARGETS = "a[href], button:not(:disabled), [role=button], [role=tab], summary, label";

interface WakePoint {
  x: number;
  y: number;
  age: number;
  life: number;
  width: number;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
}

/** A short two-sided water wake left behind by fine pointers. */
export default function CursorInk() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const preference = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const journey = document.querySelector<HTMLElement>(".journey");
    const wake: WakePoint[] = [];
    const ripples: Ripple[] = [];
    let allowed = false;
    let frame = 0;
    let width = innerWidth;
    let height = innerHeight;
    let dpr = Math.min(devicePixelRatio || 1, 1.5);
    let previousX = -80;
    let previousY = -80;
    let visible = false;
    let quiet = false;
    let water = "226, 247, 249";
    let shade = "25, 55, 45";

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setPalette = () => {
      const id = journey?.dataset.active;
      const chapter = chapters.find(item => item.id === id);
      root.style.setProperty("--cursor-ink", chapter?.ink ?? "#19372d");
      if (id === "hello") { water = "250, 235, 242"; shade = "72, 44, 57"; }
      else if (id === "about" || id === "contact") { water = "225, 247, 239"; shade = "25, 55, 45"; }
      else if (id === "projects") { water = "255, 239, 224"; shade = "67, 45, 40"; }
      else { water = "226, 247, 249"; shade = "25, 55, 45"; }
    };

    const targetInfo = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      return {
        native: Boolean(element?.closest(NATIVE_TARGETS)),
        action: Boolean(element?.closest(ACTION_TARGETS)),
        quiet: Boolean(element?.closest(".site-nav, .journey-dock")),
      };
    };

    const wakeAnimation = () => { if (!frame && allowed) frame = requestAnimationFrame(render); };

    const strokeWakeSide = (
      startX: number, startY: number, controlX: number, controlY: number,
      endX: number, endY: number, remaining: number, lineWidth: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(startX + .7, startY + 1.1);
      ctx.quadraticCurveTo(controlX + .7, controlY + 1.1, endX + .7, endY + 1.1);
      ctx.strokeStyle = `rgba(${shade},${remaining * .13})`;
      ctx.lineWidth = lineWidth + 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.strokeStyle = `rgba(${water},${remaining * .46})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX - .3, startY - .45);
      ctx.quadraticCurveTo(controlX - .3, controlY - .45, endX - .3, endY - .45);
      ctx.strokeStyle = `rgba(255,255,255,${remaining * .68})`;
      ctx.lineWidth = Math.max(.55, lineWidth * .28);
      ctx.stroke();
    };

    const drawWake = () => {
      if (wake.length < 3 || quiet) return;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let index = wake.length - 2; index > 0; index -= 2) {
        const older = wake[index + 1];
        const point = wake[index];
        const newer = wake[index - 1];
        const remaining = Math.max(0, 1 - point.age / point.life);
        if (remaining <= .02) continue;
        const tangentX = newer.x - older.x;
        const tangentY = newer.y - older.y;
        const length = Math.max(1, Math.hypot(tangentX, tangentY));
        const normalX = -tangentY / length;
        const normalY = tangentX / length;
        const spread = 1.4 + (1 - remaining) * 6.2;
        const lineWidth = Math.max(.75, point.width * remaining * .42);
        const startX = (older.x + point.x) * .5;
        const startY = (older.y + point.y) * .5;
        const endX = (point.x + newer.x) * .5;
        const endY = (point.y + newer.y) * .5;
        for (const side of [-1, 1]) {
          const offsetX = normalX * spread * side;
          const offsetY = normalY * spread * side;
          strokeWakeSide(
            startX + offsetX, startY + offsetY,
            point.x + offsetX, point.y + offsetY,
            endX + offsetX, endY + offsetY,
            remaining, lineWidth,
          );
        }
      }
    };

    const drawRipples = () => {
      for (let index = ripples.length - 1; index >= 0; index--) {
        const ripple = ripples[index];
        ripple.age++;
        const progress = ripple.age / ripple.life;
        if (progress >= 1) { ripples.splice(index, 1); continue; }
        if (progress < 0) continue;
        const radius = ripple.radius * (.14 + progress * .86);
        const alpha = (1 - progress) * .56;
        ctx.beginPath();
        ctx.ellipse(ripple.x, ripple.y, radius, radius * (.8 + progress * .2), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = Math.max(.7, (1 - progress) * 2.1);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(ripple.x + .8, ripple.y + 1.1, radius + 1.2, radius * .9 + 1, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${shade},${alpha * .18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    function render() {
      frame = 0;
      if (!allowed) return;
      ctx!.clearRect(0, 0, width, height);
      for (let index = wake.length - 1; index >= 0; index--) {
        wake[index].age++;
        if (wake[index].age >= wake[index].life) wake.splice(index, 1);
      }
      drawWake();
      drawRipples();
      if (allowed && (wake.length || ripples.length)) frame = requestAnimationFrame(render);
    }

    const move = (event: PointerEvent) => {
      if (!allowed || event.pointerType !== "mouse") return;
      const info = targetInfo(event.target);
      if (info.native) {
        visible = false;
        wake.length = 0;
        root.dataset.visible = "false";
        return;
      }
      root.dataset.action = String(info.action);
      quiet = info.quiet;
      if (!visible) {
        visible = true;
        previousX = event.clientX;
        previousY = event.clientY;
        root.dataset.visible = "true";
      }
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance > 3) {
        const speed = Math.min(distance, 38);
        const steps = Math.min(3, Math.max(1, Math.floor(distance / 8)));
        for (let step = 1; step <= steps; step++) wake.unshift({
          x: previousX + deltaX * step / steps,
          y: previousY + deltaY * step / steps,
          age: 0,
          life: 25 + Math.round(speed * .24),
          width: Math.min(10, 5 + speed * .14),
        });
        if (wake.length > 30) wake.length = 30;
        previousX = event.clientX;
        previousY = event.clientY;
      }
      wakeAnimation();
    };

    const press = (event: PointerEvent) => {
      if (!allowed || event.pointerType !== "mouse" || event.button !== 0 || targetInfo(event.target).native) return;
      ripples.push(
        { x: event.clientX, y: event.clientY, age: 0, life: 30, radius: 36 },
        { x: event.clientX, y: event.clientY, age: -5, life: 36, radius: 52 },
      );
      wakeAnimation();
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) { visible = false; root.dataset.visible = "false"; wake.length = 0; }
    };
    const chapter = () => { setPalette(); wake.length = 0; wakeAnimation(); };
    const sync = () => {
      allowed = preference.matches && !document.hidden && document.documentElement.dataset.intro !== "playing"
        && journey?.dataset.motionPaused !== "true" && journey?.dataset.hidden !== "true";
      if (allowed) document.documentElement.dataset.cursor = "water-wake";
      else {
        cancelAnimationFrame(frame); frame = 0; visible = false;
        delete document.documentElement.dataset.cursor;
        root.dataset.visible = "false";
        wake.length = 0; ripples.length = 0;
        ctx.clearRect(0, 0, width, height);
      }
    };

    resize();
    setPalette();
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
    if (journey) observer.observe(journey, { attributes: true, attributeFilter: ["data-motion-paused", "data-hidden"] });
    preference.addEventListener("change", sync);
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", sync);
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", press, { passive: true });
    addEventListener("pointerout", leave, { passive: true });
    addEventListener("portfolio:chapter", chapter);
    return () => {
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursor;
      observer.disconnect();
      preference.removeEventListener("change", sync);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", press);
      removeEventListener("pointerout", leave);
      removeEventListener("portfolio:chapter", chapter);
    };
  }, [pathname]);

  return <div ref={rootRef} className="cursor-water" aria-hidden="true" inert><canvas ref={canvasRef} className="cursor-water-canvas" /></div>;
}
