"use client";

import { useEffect, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type Ref } from "react";
import { animate, motion, useMotionValue, type MotionStyle } from "framer-motion";
import { Check, RotateCw } from "lucide-react";
import { boundPiece, CARD_ANGLES, homePose, pieceSize, PUZZLE_COUNT, scatterPoses, withinSnap, type PuzzleFrame, type PuzzlePose } from "@/lib/canvas-puzzle";

const cards = ["C", "F", "S"];
const names = ["Caesar", "Ferdiana", "Suwandi"];
type PieceHandle = { place: () => void; rotate: () => void };
type PieceProps = {
  index: number; frame: PuzzleFrame; target: PuzzlePose; revision: number;
  broken: boolean; selected: boolean; locked: boolean; instructions: string;
  pieceRef: Ref<PieceHandle>; onSelect: (index: number) => void;
  onSettle: (index: number, settled: boolean) => void;
};

function PaperPrint({ card }: { card: number }) {
  return <span className="puzzle-print" aria-hidden="true"><span className="puzzle-letter">{cards[card]}</span><span className="puzzle-signature">{names[card]}</span><i className="puzzle-fold" /></span>;
}

/** Pointer capture + MotionValues: moving a piece never renders React frames. */
function PuzzlePiece({ index, frame, target, revision, broken, selected, locked, instructions, pieceRef, onSelect, onSettle }: PieceProps) {
  const button = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(target.x);
  const y = useMotionValue(target.y);
  const rotate = useMotionValue(target.rotate);
  const zIndex = useMotionValue(index + 1);
  const tweens = useRef<{ stop: () => void }[]>([]);
  const landing = useRef<PuzzlePose | null>(null);
  const drag = useRef<{ pointer: number; clientX: number; clientY: number; x: number; y: number; moved: boolean } | null>(null);
  const mounted = useRef(false);
  const destination = useRef(target);
  const card = Math.floor(index / 4);
  const col = index % 2;
  const row = Math.floor(index / 2) % 2;
  const size = pieceSize(frame);
  const home = homePose(index, frame);

  const stop = () => { tweens.current.forEach(tween => tween.stop()); tweens.current = []; landing.current = null; };
  const moveTo = (pose: PuzzlePose, duration = .55, delay = 0) => {
    stop();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || duration === 0) {
      x.set(pose.x); y.set(pose.y); rotate.set(pose.rotate);
      return;
    }
    landing.current = pose;
    let completed = 0;
    const options = { duration, delay, ease: [.16, 1, .3, 1] as [number, number, number, number], onComplete: () => { if (++completed === 3) landing.current = null; } };
    tweens.current = [animate(x, pose.x, options), animate(y, pose.y, options), animate(rotate, pose.rotate, options)];
  };
  const cancelDrag = () => {
    const current = drag.current;
    drag.current = null;
    if (current && button.current?.hasPointerCapture(current.pointer)) button.current.releasePointerCapture(current.pointer);
    if (button.current) delete button.current.dataset.dragging;
  };
  const place = () => { cancelDrag(); moveTo(home, .32); onSettle(index, true); };
  const turn = () => {
    cancelDrag(); onSettle(index, false);
    moveTo(boundPiece({ x: x.get(), y: y.get(), rotate: rotate.get() + 15 }, frame), .18);
  };
  useImperativeHandle(pieceRef, () => ({ place, rotate: turn }));

  useLayoutEffect(() => {
    cancelDrag();
    destination.current = target;
    moveTo(target, mounted.current ? .62 : 0, broken && mounted.current ? index * .012 : 0);
    zIndex.set(index + 1);
    mounted.current = true;
    return stop;
    // Selection/progress changes must not overwrite a manually positioned piece.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.x, target.y, target.rotate, revision, frame.width, frame.height]);

  useEffect(() => {
    const interrupt = () => {
      cancelDrag();
      const goal = landing.current;
      stop();
      if (goal) { x.set(goal.x); y.set(goal.y); rotate.set(goal.rotate); }
    };
    const chapter = (event: Event) => { if ((event as CustomEvent<string>).detail !== "top") interrupt(); };
    const visibility = () => { if (document.hidden) interrupt(); };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => { if (reduce.matches) { interrupt(); x.set(destination.current.x); y.set(destination.current.y); rotate.set(destination.current.rotate); } };
    window.addEventListener("blur", interrupt);
    window.addEventListener("portfolio:chapter", chapter);
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", preference);
    return () => { interrupt(); window.removeEventListener("blur", interrupt); window.removeEventListener("portfolio:chapter", chapter); document.removeEventListener("visibilitychange", visibility); reduce.removeEventListener("change", preference); };
    // Stable listeners must not cancel a new tween during an old effect cleanup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = (event: PointerEvent<HTMLButtonElement>) => {
    if (!broken || !event.isPrimary || event.button !== 0) return;
    stop(); onSelect(index); onSettle(index, false);
    zIndex.set(Math.round(performance.now()));
    drag.current = { pointer: event.pointerId, clientX: event.clientX, clientY: event.clientY, x: x.get(), y: y.get(), moved: false };
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointer !== event.pointerId) return;
    const dx = event.clientX - current.clientX;
    const dy = event.clientY - current.clientY;
    if (Math.hypot(dx, dy) > 4) current.moved = true;
    const pose = boundPiece({ x: current.x + dx, y: current.y + dy, rotate: rotate.get() }, frame);
    x.set(pose.x); y.set(pose.y);
  };
  const end = (event: PointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointer !== event.pointerId) return;
    const moved = drag.current.moved;
    cancelDrag();
    if (moved && withinSnap({ x: x.get(), y: y.get(), rotate: rotate.get() }, home, frame)) place();
  };
  const key = (event: KeyboardEvent<HTMLButtonElement>) => {
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault(); stop(); onSelect(index); onSettle(index, false); zIndex.set(Math.round(performance.now()));
      const step = event.shiftKey ? 32 : 12;
      const pose = boundPiece({ x: x.get() + direction[0] * step, y: y.get() + direction[1] * step, rotate: rotate.get() }, frame);
      x.set(pose.x); y.set(pose.y);
    } else if (event.key.toLowerCase() === "r") { event.preventDefault(); onSelect(index); turn(); }
    else if (event.key === "Home") { event.preventDefault(); place(); }
  };
  return (
    <motion.button ref={button} type="button" className={`puzzle-piece puzzle-card-${card}`} data-piece={index} data-selected={selected} data-locked={locked} aria-label={`Potongan ${cards[card]}, ${["kiri atas", "kanan atas", "kiri bawah", "kanan bawah"][index % 4]}${locked ? ", terpasang" : ""}`} aria-describedby={instructions} aria-pressed={selected} tabIndex={broken ? 0 : -1} aria-hidden={!broken} disabled={!broken} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag} onKeyDown={key} onClick={() => onSelect(index)} style={{ x, y, rotate, zIndex, width: size.width, height: size.height, marginLeft: -size.width / 2, marginTop: -size.height / 2, "--piece-col": col, "--piece-row": row, "--paper-letter-size": `${frame.home.height * .48}px`, borderRadius: `${row === 0 && col === 0 ? 5 : 0}px ${row === 0 && col === 1 ? 5 : 0}px ${row === 1 && col === 1 ? 5 : 0}px ${row === 1 && col === 0 ? 5 : 0}px` } as MotionStyle}>
      <PaperPrint card={card} />
    </motion.button>
  );
}

/** A C/F/S paper triptych that breaks out of its frame, across the whole hero. */
export default function CanvasStudy() {
  const root = useRef<HTMLDivElement>(null);
  const home = useRef<HTMLDivElement>(null);
  const breaker = useRef<HTMLButtonElement>(null);
  const reset = useRef<HTMLButtonElement>(null);
  const handles = useRef<(PieceHandle | null)[]>([]);
  const placed = useRef(new Set<number>());
  const [frame, setFrame] = useState<PuzzleFrame | null>(null);
  const [broken, setBroken] = useState(false);
  const [revision, setRevision] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState<number[]>([]);
  const count = locked.length;
  const [notice, setNotice] = useState("");
  const instructions = useId();
  const targets = useMemo(() => frame ? broken ? scatterPoses(frame, revision * 7919 + 107) : Array.from({ length: PUZZLE_COUNT }, (_, i) => homePose(i, frame)) : [], [frame, broken, revision]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!root.current || !home.current) return;
      // offset geometry is stable even if an ancestor is currently transitioning.
      const art = home.current;
      const width = root.current.clientWidth;
      const height = root.current.clientHeight;
      const next = { width, height, home: { x: art.offsetLeft - art.offsetWidth / 2, y: art.offsetTop, width: art.offsetWidth, height: art.offsetHeight } };
      setFrame(previous => previous && JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
      placed.current.clear(); setLocked([]);
    };
    const observer = new ResizeObserver(measure);
    if (root.current) observer.observe(root.current);
    if (home.current) observer.observe(home.current);
    measure();
    return () => observer.disconnect();
  }, []);

  const scatter = () => {
    if (!frame) return;
    placed.current.clear(); setLocked([]); setSelected(null); setBroken(true); setRevision(value => value + 1);
    setNotice("CFS pecah menjadi 12 potongan. Tarik ke bayangannya, atau pilih potongan lalu tekan Pasang.");
    requestAnimationFrame(() => root.current?.querySelector<HTMLButtonElement>(".puzzle-piece")?.focus({ preventScroll: true }));
  };
  const reassemble = () => {
    placed.current.clear(); setLocked([]); setSelected(null); setBroken(false); setRevision(value => value + 1);
    setNotice("Sudah tersusun lagi. Klik CFS kalau mau bermain lagi.");
    reset.current?.focus({ preventScroll: true });
  };
  const settle = (index: number, value: boolean) => {
    if (value) placed.current.add(index); else placed.current.delete(index);
    setLocked([...placed.current]);
    if (value) setNotice(`${placed.current.size} dari 12 potongan terpasang.`);
    if (placed.current.size === PUZZLE_COUNT) {
      setBroken(false); setSelected(null);
      setNotice("Lengkap! CFS sudah tersusun. Mau coba lagi?");
      requestAnimationFrame(() => breaker.current?.focus({ preventScroll: true }));
    }
  };

  return (
    <div ref={root} className="hero-puzzle" data-broken={broken} data-ready={Boolean(frame)}>
      <div ref={home} className="paper-study puzzle-home" aria-hidden="true">
        {cards.map((letter, card) => <div key={letter} className={`puzzle-guide puzzle-card-${card}`} style={{ left: `${10 + card * 25}%`, "--card-angle": `${CARD_ANGLES[card]}deg` } as CSSProperties}><PaperPrint card={card} /></div>)}
      </div>
      <div className="puzzle-field" role="group" aria-label="Puzzle kertas CFS">
        {frame && targets.map((target, index) => <PuzzlePiece key={index} index={index} frame={frame} target={target} revision={revision} broken={broken} selected={selected === index} locked={locked.includes(index)} instructions={instructions} pieceRef={handle => { handles.current[index] = handle; }} onSelect={setSelected} onSettle={settle} />)}
      </div>
      <div className="paper-study puzzle-overlay">
        <button ref={breaker} type="button" className="puzzle-break" aria-label="Pecah puzzle CFS" onClick={scatter} hidden={broken}><span>Klik CFS untuk bermain</span></button>
        <div className="puzzle-toolbar">
          {(broken || count === PUZZLE_COUNT) && <p className="puzzle-hint">{broken ? <>Tarik ke bayangannya <span>{count}/12</span></> : "Lengkap. Rapi lagi!"}</p>}
          <div className="puzzle-action-row">
            <button ref={reset} type="button" className="paper-action" aria-label="Susun ulang puzzle CFS" onClick={reassemble}><RotateCw size={15} aria-hidden="true" /> Susun ulang</button>
            {broken && selected !== null && <>
              <button type="button" className="puzzle-turn" aria-label="Putar potongan terpilih" onClick={() => handles.current[selected]?.rotate()}><RotateCw size={16} aria-hidden="true" /></button>
              <button type="button" className="puzzle-place" onClick={() => handles.current[selected]?.place()}><Check size={15} aria-hidden="true" /> Pasang</button>
            </>}
          </div>
        </div>
      </div>
      <p id={instructions} className="sr-only">Tarik potongan ke bayangannya sampai menempel. Bisa juga pilih potongan lalu tekan Pasang. Keyboard: panah untuk menggeser, Shift untuk langkah lebih jauh, R untuk memutar, Home untuk memasang potongan.</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
    </div>
  );
}
