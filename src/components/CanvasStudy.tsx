"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type MotionStyle } from "framer-motion";
import { RotateCw, Shuffle } from "lucide-react";
import { boundPiece, pieceSize, puzzleLayout, type PuzzleFrame, type PuzzlePose } from "@/lib/canvas-puzzle";

function PuzzlePiece({ index, pose, frame, broken, revision, onReset }: {
  index: number; pose: PuzzlePose; frame: PuzzleFrame; broken: boolean; revision: number; onReset: () => void;
}) {
  const x = useMotionValue(pose.x);
  const y = useMotionValue(pose.y);
  const rotate = useMotionValue(pose.rotate);
  const reduce = useReducedMotion();
  const element = useRef<HTMLButtonElement>(null);
  const initialized = useRef(false);
  const drag = useRef<{ id: number; startX: number; startY: number; x: number; y: number } | null>(null);
  const moved = useRef(false);
  const sheet = Math.floor(index / 4);
  const baseLayer = [1, 20, 10][sheet] + index % 4;
  const zIndex = useMotionValue(baseLayer);
  const column = index % 2;
  const row = Math.floor(index % 4 / 2);
  const size = pieceSize(frame);

  useEffect(() => {
    const finish = () => {
      const pointer = drag.current?.id;
      drag.current = null;
      if (pointer !== undefined && element.current?.hasPointerCapture(pointer)) element.current.releasePointerCapture(pointer);
      if (element.current) element.current.dataset.dragging = "false";
      zIndex.set(baseLayer);
    };
    const visibility = () => { if (document.hidden) finish(); };
    window.addEventListener("blur", finish);
    window.addEventListener("portfolio:chapter", finish);
    document.addEventListener("visibilitychange", visibility);
    return () => { window.removeEventListener("blur", finish); window.removeEventListener("portfolio:chapter", finish); document.removeEventListener("visibilitychange", visibility); };
  }, [zIndex, baseLayer]);

  useEffect(() => {
    drag.current = null;
    if (element.current) element.current.dataset.dragging = "false";
    zIndex.set(baseLayer);
    const duration = initialized.current && !reduce ? .55 : 0;
    initialized.current = frame.width > 0;
    const options = { duration, ease: [.16, 1, .3, 1] as [number, number, number, number] };
    const controls = [animate(x, pose.x, options), animate(y, pose.y, options), animate(rotate, pose.rotate, options)];
    return () => controls.forEach(control => control.stop());
  }, [pose.x, pose.y, pose.rotate, revision, frame.width, reduce, x, y, rotate, zIndex, baseLayer]);

  const end = (event: PointerEvent<HTMLButtonElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.dataset.dragging = "false";
    zIndex.set(baseLayer);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const turn = () => { rotate.stop(); void animate(rotate, rotate.get() + 15, { duration: reduce ? 0 : .18 }); };

  return (
    <motion.button
      ref={element} type="button" className={`puzzle-piece puzzle-sheet-${sheet}`} data-piece={index} data-dragging="false"
      aria-label={`Potongan ${"CFS"[sheet]} ${index % 4 + 1}`} aria-describedby="puzzle-instructions"
      aria-hidden={!broken} tabIndex={broken ? 0 : -1}
      style={{ x, y, rotate, width: size.width, height: size.height, zIndex, "--tile-column": column, "--tile-row": row } as MotionStyle}
      onPointerDown={event => {
        if (!broken || event.button !== 0 || !event.isPrimary) return;
        event.preventDefault(); event.currentTarget.focus({ preventScroll: true });
        x.stop(); y.stop(); rotate.stop(); moved.current = false;
        drag.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: x.get(), y: y.get() };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true"; zIndex.set(50);
      }}
      onPointerMove={event => {
        const origin = drag.current;
        if (!origin || origin.id !== event.pointerId) return;
        const dx = event.clientX - origin.startX, dy = event.clientY - origin.startY;
        if (Math.hypot(dx, dy) > 4) moved.current = true;
        const next = boundPiece(origin.x + dx, origin.y + dy, frame);
        x.set(next.x); y.set(next.y);
      }}
      onPointerUp={end} onPointerCancel={end}
      onLostPointerCapture={() => { drag.current = null; if (element.current) element.current.dataset.dragging = "false"; zIndex.set(baseLayer); }}
      onClick={() => { if (moved.current) { moved.current = false; return; } if (broken) turn(); }}
      onKeyDown={event => {
        if (event.key === "Escape") { event.preventDefault(); onReset(); return; }
        if (event.key.toLowerCase() === "r") { event.preventDefault(); turn(); return; }
        const step = event.shiftKey ? 24 : 8;
        const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
        if (!delta) return;
        event.preventDefault(); x.stop(); y.stop();
        const next = boundPiece(x.get() + delta[0], y.get() + delta[1], frame);
        x.set(next.x); y.set(next.y);
      }}
    >
      <span className="puzzle-print" aria-hidden="true"><span>{"CFS"[sheet]}</span><i /></span>
    </motion.button>
  );
}

/** Twelve tactile pieces; pointer events update motion values without React renders. */
export default function CanvasStudy() {
  const stage = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<PuzzleFrame>({ width: 0, height: 0 });
  const [board, setBoard] = useState({ broken: false, revision: 0 });
  useLayoutEffect(() => {
    const node = stage.current;
    if (!node) return;
    const measure = () => setFrame({ width: node.clientWidth, height: node.clientHeight });
    measure(); const observer = new ResizeObserver(measure); observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const poses = puzzleLayout(frame, board.broken, board.revision);
  const reset = () => {
    const returnFocus = document.activeElement?.classList.contains("puzzle-piece");
    setBoard(value => ({ broken: false, revision: value.revision + 1 }));
    if (returnFocus) requestAnimationFrame(() => stage.current?.querySelector<HTMLButtonElement>(".puzzle-break")?.focus({ preventScroll: true }));
  };
  const scatter = () => {
    setBoard(value => ({ broken: true, revision: value.revision + 1 }));
    requestAnimationFrame(() => stage.current?.querySelector<HTMLButtonElement>('[data-piece="0"]')?.focus({ preventScroll: true }));
  };
  return (
    <div ref={stage} className="paper-study" data-broken={board.broken} data-ready={frame.width > 0}>
      <div className="paper-float">
        <div className="paper-composition ambient-loop">
          {!frame.width && <div className="puzzle-fallback" aria-hidden="true">{["C", "F", "S"].map((letter, index) => <span className={`paper-leaf paper-leaf-${["one", "two", "three"][index]}`} key={letter}><span>{letter}</span><i /></span>)}</div>}
          {poses.map((pose, index) => <PuzzlePiece key={index} index={index} pose={pose} frame={frame} broken={board.broken} revision={board.revision} onReset={reset} />)}
        </div>
        {!board.broken && <button type="button" className="puzzle-break" onClick={scatter} aria-label="Pecah puzzle CFS" aria-describedby="puzzle-instructions"><span className="sr-only">Mainkan puzzle CFS</span></button>}
        {board.broken && <button type="button" className="puzzle-shuffle" onClick={scatter} aria-label="Acak potongan puzzle"><Shuffle size={17} /><span>Acak</span></button>}
        <span className="puzzle-help" aria-hidden="true">{board.broken ? "Tarik potongannya · klik untuk putar" : "Klik CFS untuk main"}</span>
        <button type="button" className="paper-action" onClick={reset}><RotateCw size={15} /> Susun ulang</button>
        <p id="puzzle-instructions" className="sr-only">Klik CFS untuk memecah dua belas potongan. Tahan lalu tarik potongan, atau gunakan tombol panah untuk menggeser. Shift untuk langkah besar. Klik, Enter, atau R untuk memutar. Escape atau Susun ulang untuk merakit kembali.</p>
        <span className="sr-only" role="status">{board.broken ? "Puzzle dipecah. Dua belas potongan siap dimainkan." : "Puzzle CFS tersusun."}</span>
      </div>
    </div>
  );
}
