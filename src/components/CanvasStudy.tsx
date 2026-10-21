"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RotateCw } from "lucide-react";

/** A woven paper seal: three interlocking bands, with bounded pointer response. */
export default function CanvasStudy() {
  const root = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const pending = useRef(0);
  const [arrangement, setArrangement] = useState(0);
  const resetTilt = () => {
    cancelAnimationFrame(pending.current);
    pending.current = 0;
    root.current?.style.setProperty("--seal-tilt-x", "0deg");
    root.current?.style.setProperty("--seal-tilt-y", "0deg");
  };
  useEffect(() => {
    const reset = () => {
      cancelAnimationFrame(pending.current); pending.current = 0;
      root.current?.style.setProperty("--seal-tilt-x", "0deg");
      root.current?.style.setProperty("--seal-tilt-y", "0deg");
    };
    window.addEventListener("blur", reset);
    window.addEventListener("portfolio:chapter", reset);
    return () => { reset(); window.removeEventListener("blur", reset); window.removeEventListener("portfolio:chapter", reset); };
  }, []);
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches || root.current?.closest<HTMLElement>(".journey")?.dataset.motionPaused === "true") return;
    const box = bounds.current;
    if (!box) return;
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    cancelAnimationFrame(pending.current);
    pending.current = requestAnimationFrame(() => {
      pending.current = 0;
      root.current?.style.setProperty("--seal-tilt-x", `${(-y * 7).toFixed(2)}deg`);
      root.current?.style.setProperty("--seal-tilt-y", `${(x * 9).toFixed(2)}deg`);
    });
  };
  return (
    <div ref={root} className="paper-study seal-study" data-arrangement={arrangement} onPointerEnter={() => { bounds.current = root.current?.getBoundingClientRect() ?? null; }} onPointerMove={follow} onPointerLeave={resetTilt}>
      <div className="seal-sculpture" aria-hidden="true">
        <div className="seal-mobile ambient-loop">
          <div className="seal-object" style={{ "--seal-view": `${[0, 28, -24][arrangement]}deg` } as CSSProperties}>
            <span className="seal-band seal-band-forest" /><span className="seal-band seal-band-cream" /><span className="seal-band seal-band-sage" />
            <span className="seal-imprint"><span>CFS</span><i /></span>
          </div>
        </div>
        <span className="seal-floor" />
      </div>
      <button type="button" className="paper-action" aria-label="Susun ulang komposisi CFS" onClick={() => setArrangement(value => (value + 1) % 3)}><RotateCw size={15} /> Susun ulang</button>
    </div>
  );
}
