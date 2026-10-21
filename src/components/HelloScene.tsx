"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Code2, Cloud, ScanText } from "lucide-react";

const interests = [
  { name: "Software", Icon: Code2, text: "Saya suka merangkai tampilan, API, dan database jadi produk yang bisa dipakai. Rasanya seru saat bagian-bagian kecil itu akhirnya bekerja bersama." },
  { name: "AI", Icon: ScanText, text: "Lewat UlasJujur dan DOCVIA, saya mencoba membawa AI ke kebutuhan sehari-hari: membaca ulasan dan mencari jawaban dari dokumen." },
  { name: "Cloud", Icon: Cloud, text: "Saya juga mendalami cloud. Setelah produknya jadi, masih ada hal menarik berikutnya: membuatnya berjalan dengan baik dan bisa diakses orang lain." },
];

function TypedInterests() {
  const text = "Software / AI / Cloud";
  const [length, setLength] = useState(text.length);
  useEffect(() => {
    let timer = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      clearTimeout(timer);
      if (reduce.matches || document.hidden) { setLength(text.length); return; }
      let count = 0; setLength(0);
      const type = () => { setLength(++count); if (count < text.length) timer = window.setTimeout(type, 65); };
      timer = window.setTimeout(type, 250);
    };
    const chapter = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "hello") start();
      else clearTimeout(timer);
    };
    const visibility = () => { if (document.hidden) { clearTimeout(timer); setLength(text.length); } };
    window.addEventListener("portfolio:chapter", chapter);
    document.addEventListener("visibilitychange", visibility);
    return () => { clearTimeout(timer); window.removeEventListener("portfolio:chapter", chapter); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <p className="hello-typed"><span className="sr-only">{text}</span><span aria-hidden="true">{text.slice(0, length)}<i className={length < text.length ? "is-typing" : undefined} /></span></p>;
}

export default function HelloScene() {
  const [interest, setInterest] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const letters = [...heading.querySelectorAll<HTMLElement>(".hello-letter")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let frame = 0;
    let centers: { x: number; y: number }[] = [];
    let mouseX = 0; let mouseY = 0;
    const measure = () => { centers = letters.map(letter => { const b = letter.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; }); };
    const reset = () => { cancelAnimationFrame(frame); frame = 0; letters.forEach(letter => { letter.style.removeProperty("--repel-x"); letter.style.removeProperty("--repel-y"); }); };
    const paint = () => {
      frame = 0;
      letters.forEach((letter, i) => {
        const dx = centers[i].x - mouseX; const dy = centers[i].y - mouseY;
        const distance = Math.max(1, Math.hypot(dx, dy)); const force = Math.max(0, 1 - distance / 125) * 13;
        letter.style.setProperty("--repel-x", `${(dx / distance * force).toFixed(2)}px`);
        letter.style.setProperty("--repel-y", `${(dy / distance * force).toFixed(2)}px`);
      });
    };
    const move = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || event.pointerType !== "mouse" || heading.closest<HTMLElement>(".journey")?.dataset.motionPaused === "true") return;
      if (!centers.length) measure();
      mouseX = event.clientX; mouseY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    heading.addEventListener("pointerenter", measure);
    heading.addEventListener("pointermove", move, { passive: true });
    heading.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("portfolio:chapter", reset);
    return () => { reset(); heading.removeEventListener("pointerenter", measure); heading.removeEventListener("pointermove", move); heading.removeEventListener("pointerleave", reset); window.removeEventListener("blur", reset); window.removeEventListener("portfolio:chapter", reset); };
  }, []);
  return (
    <section id="hello" className="hello-scene" aria-labelledby="hello-title">
      <h2 ref={headingRef} id="hello-title" className="hello-title" aria-label="Hi, aku Caesar.">
        <span className="hello-line" aria-hidden="true">{"Hi, aku".split("").map((letter, i) => <span className="hello-letter" key={i} style={{ "--letter": i } as CSSProperties}><span className="hello-glyph">{letter === " " ? "\u00a0" : letter}</span></span>)}</span>
        <span className="hello-line hello-line-name" aria-hidden="true">{"Caesar.".split("").map((letter, i) => <span className="hello-letter" key={i} style={{ "--letter": i + 7 } as CSSProperties}><span className="hello-glyph">{letter}</span></span>)}</span>
      </h2>
      <p className="hello-bio">Saya Caesar Ferdiana Suwandi, mahasiswa Informatika UNDIP yang sedang mendalami full-stack dan AI terapan. Saya senang belajar lewat projek, diskusi, dan mencoba hal baru.</p>
      <TypedInterests />
      <div className="hello-explore">
        <div className="interest-tabs" role="tablist" aria-label="Minat Caesar">
          {interests.map(({ name, Icon }, i) => <button key={name} type="button" role="tab" id={`interest-${i}`} aria-controls="interest-panel" aria-selected={interest === i} tabIndex={interest === i ? 0 : -1} onClick={() => setInterest(i)} onKeyDown={(event) => {
            let next = i;
            if (event.key === "ArrowRight") next = (i + 1) % interests.length;
            else if (event.key === "ArrowLeft") next = (i + interests.length - 1) % interests.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = interests.length - 1;
            else return;
            event.preventDefault(); setInterest(next); document.getElementById(`interest-${next}`)?.focus();
          }}><Icon size={17} aria-hidden="true" />{name}</button>)}
        </div>
        <div id="interest-panel" role="tabpanel" aria-labelledby={`interest-${interest}`} tabIndex={0} className="interest-panel"><p key={interest}>{interests[interest].text}</p></div>
      </div>
      <a href="#about" className="hello-next">Lihat profil & skill <ArrowUpRight size={19} /></a>
    </section>
  );
}
