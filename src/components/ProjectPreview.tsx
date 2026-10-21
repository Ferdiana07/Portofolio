"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import ProjectArtwork from "./ProjectArtwork";
import Reveal from "./Reveal";

const wrap = (index: number) => (index + projects.length) % projects.length;

export default function ProjectPreview() {
  const [active, setActive] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  const selected = projects[active];

  const swipeEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!gesture.current) return;
    const dx = event.clientX - gesture.current.x;
    const dy = event.clientY - gesture.current.y;
    gesture.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      didSwipe.current = true;
      setActive((value) => wrap(value + (dx < 0 ? 1 : -1)));
    }
  };

  return (
    <section id="projects" className="section section-preview">
      <div className="site-shell">
        <Reveal className="preview-heading">
          <div>
            <h2>Yang saya bangun.</h2>
          </div>
          <p>Sedikit cuplikan dari meja kerja saya.<br />{" "}Geser, pilih, lalu kenalan lebih jauh.</p>
        </Reveal>

        <Reveal>
          <div
            className="preview-stage"
            role="group"
            aria-roledescription="karusel"
            aria-label="Preview projek"
            onPointerDown={(event) => {
              if (event.button !== 0 || !event.isPrimary) return;
              didSwipe.current = false;
              gesture.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={swipeEnd}
            onPointerCancel={() => { gesture.current = null; }}
            onPointerLeave={() => { gesture.current = null; }}
            onClickCapture={(event) => {
              if (didSwipe.current) { event.preventDefault(); event.stopPropagation(); didSwipe.current = false; }
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                setActive((value) => wrap(value + (event.key === "ArrowRight" ? 1 : -1)));
              }
            }}
          >
            {projects.map((project, index) => {
              const slot = wrap(index - active + 2) - 2;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`preview-card project-card${slot === 0 ? " is-selected" : ""}`}
                  style={{ "--slot": slot, "--distance": Math.abs(slot), zIndex: 5 - Math.abs(slot) } as CSSProperties}
                  aria-label={`Pilih ${project.title}`}
                  aria-pressed={slot === 0}
                  onClick={() => setActive(index)}
                >
                  <span className="project-media"><ProjectArtwork project={project} /></span>
                  <span className="preview-card-label">{project.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="preview-toolbar">
          <div className="preview-selected" aria-live="polite" aria-atomic="true">
            <span>{selected.category}</span>
            <Link href={`/projects#${selected.id}`} target="_blank" rel="noreferrer">
              {selected.title}<ArrowUpRight size={18} /><span className="sr-only">, detail di tab baru</span>
            </Link>
          </div>
          <div className="preview-controls" aria-label="Pindah preview">
            <button type="button" onClick={() => setActive((value) => wrap(value - 1))} aria-label="Projek sebelumnya"><ArrowLeft size={19} /></button>
            <div className="preview-dots" aria-hidden="true">{projects.map((project, index) => <span key={project.id} className={active === index ? "is-active" : ""} />)}</div>
            <button type="button" onClick={() => setActive((value) => wrap(value + 1))} aria-label="Projek berikutnya"><ArrowRight size={19} /></button>
          </div>
          <Link href="/projects" target="_blank" rel="noreferrer" className="button button-primary preview-all">
            Lihat semua projek <ArrowUpRight size={17} /><span className="sr-only">, buka tab baru</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
