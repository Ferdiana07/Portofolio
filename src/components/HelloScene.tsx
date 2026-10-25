"use client";

import { getImageProps } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Code2, Cloud, ScanText } from "lucide-react";

const interests = [
  { name: "Software", Icon: Code2, text: "Aku suka merangkai tampilan, API, dan database sampai jadi satu produk yang utuh. Bagian favoritku: saat sesuatu yang tadinya cuma ide akhirnya bisa diklik dan dipakai." },
  { name: "AI", Icon: ScanText, text: "Di UlasJujur dan DOCVIA, aku bereksperimen dengan AI untuk membaca ulasan dan mencari jawaban dari dokumen. Aku penasaran sejauh mana AI bisa benar-benar membantu, bukan sekadar jadi fitur tambahan." },
  { name: "Cloud", Icon: Cloud, text: "Cloud lagi aku dalami juga. Setelah aplikasinya jadi, aku ingin paham cara membuatnya tetap berjalan dengan baik dan bisa diakses orang lain. Masih banyak yang perlu dipelajari, dan itu justru menarik." },
];

const desktopPortraitImage = "/caesar-layers/tanpa pupi.png";
const compactPortraitImage = "/caesar-layers/Ilustrasi Pria Muda Berpose Berpikir.png";
const portraitSizes = "(max-width: 767px) 32vw, (max-width: 1024px) 34vw, 455px";
const desktopPortraitProps = getImageProps({
  src: desktopPortraitImage,
  alt: "",
  width: 1129,
  height: 1393,
  sizes: portraitSizes,
  loading: "eager",
}).props;
const compactPortraitProps = getImageProps({
  src: compactPortraitImage,
  alt: "",
  width: 1122,
  height: 1402,
  sizes: portraitSizes,
  loading: "eager",
}).props;

function PortraitAsset({ className, alt }: { className: string; alt: string }) {
  const { src, ...fallbackProps } = desktopPortraitProps;
  return (
    <picture className="hello-portrait-picture">
      <source
        media="(max-width: 1024px), (hover: none), (pointer: coarse)"
        srcSet={compactPortraitProps.srcSet}
        sizes={compactPortraitProps.sizes}
        width={1122}
        height={1402}
      />
      {/* getImageProps keeps both responsive sources optimized while picture prevents a double download. */}
      <img src={src} {...fallbackProps} className={className} alt={alt} draggable={false} />
    </picture>
  );
}

function TypedInterests() {
  const text = "Software / AI / Cloud";
  const [length, setLength] = useState(text.length);
  useEffect(() => {
    let timer = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.querySelector<HTMLElement>(".journey");
    const start = () => {
      clearTimeout(timer);
      if (reduce.matches || document.hidden || root?.dataset.motionPaused === "true") { setLength(text.length); return; }
      let count = 0; setLength(0);
      let deleting = false;
      const type = () => {
        count += deleting ? -1 : 1;
        setLength(count);
        let delay = deleting ? 38 : 70;
        if (count === text.length) { deleting = true; delay = 1450; }
        else if (count === 0) { deleting = false; delay = 500; }
        timer = window.setTimeout(type, delay);
      };
      timer = window.setTimeout(type, 250);
    };
    const chapter = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "hello") start();
      else clearTimeout(timer);
    };
    const sync = () => {
      clearTimeout(timer);
      if (root?.dataset.active === "hello" && root.dataset.motionPaused !== "true" && !document.hidden && !reduce.matches) start();
      else setLength(text.length);
    };
    const observer = new MutationObserver(sync);
    if (root) observer.observe(root, { attributes: true, attributeFilter: ["data-motion-paused"] });
    const visibility = sync;
    window.addEventListener("portfolio:chapter", chapter);
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", sync);
    sync();
    return () => { clearTimeout(timer); observer.disconnect(); reduce.removeEventListener("change", sync); window.removeEventListener("portfolio:chapter", chapter); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <p className="hello-typed"><span className="sr-only">{text}</span><span aria-hidden="true">{text.slice(0, length)}<i className={length < text.length ? "is-typing" : undefined} /></span></p>;
}

export default function HelloScene() {
  const [interest, setInterest] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
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
  useLayoutEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    const root = portrait.closest<HTMLElement>(".journey");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const interactiveGaze = matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");
    const compactPortrait = matchMedia("(max-width: 1024px), (hover: none), (pointer: coarse)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let bounds: Pick<DOMRect, "left" | "top" | "width" | "height"> = portrait.getBoundingClientRect();
    let measureFrame = 0;
    let centered = true;
    let measuredFrame: Pick<DOMRect, "width" | "height"> | null = null;

    const measure = () => {
      const frameBounds = portrait.getBoundingClientRect();
      const cssWidth = portrait.clientWidth;
      const cssHeight = portrait.clientHeight;
      const sizeChanged = !measuredFrame || Math.abs(cssWidth - measuredFrame.width) >= .5 || Math.abs(cssHeight - measuredFrame.height) >= .5;
      measuredFrame = { width: cssWidth, height: cssHeight };
      const imageRatio = compactPortrait.matches ? 1122 / 1402 : 1129 / 1393;
      const fitWidth = Math.min(cssWidth, cssHeight * imageRatio);
      const fitHeight = fitWidth / imageRatio;
      if (sizeChanged) {
        portrait.style.setProperty("--portrait-fit-width", `${fitWidth.toFixed(2)}px`);
        portrait.style.setProperty("--portrait-fit-height", `${fitHeight.toFixed(2)}px`);
      }
      bounds = {
        left: frameBounds.left + (frameBounds.width - fitWidth) / 2,
        top: frameBounds.bottom - fitHeight,
        width: fitWidth,
        height: fitHeight,
      };
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (centered) return;
      portrait.style.setProperty("--gaze-x", "0px");
      portrait.style.setProperty("--gaze-y", "0px");
      centered = true;
    };
    const paint = () => {
      frame = 0;
      const eyeX = bounds.left + bounds.width * .51;
      const eyeY = bounds.top + bounds.height * .30;
      const dx = pointerX - eyeX;
      const dy = pointerY - eyeY;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const intent = Math.min(1, distance / 210);
      const travelX = Math.min(4.2, bounds.width * .0095);
      const travelY = Math.min(3.1, bounds.width * .007);
      portrait.style.setProperty("--gaze-x", `${(dx / distance * travelX * intent).toFixed(2)}px`);
      portrait.style.setProperty("--gaze-y", `${(dy / distance * travelY * intent).toFixed(2)}px`);
      centered = false;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!interactiveGaze.matches || reduce.matches || document.hidden || root?.dataset.active !== "hello" || root.dataset.motionPaused === "true") {
        reset();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = (event: PointerEvent | MouseEvent) => { if (!event.relatedTarget) reset(); };
    const chapter = () => {
      reset();
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(() => { measureFrame = 0; measure(); });
    };
    const visibility = () => { if (document.hidden) reset(); };
    const resize = new ResizeObserver(measure);
    measure();
    resize.observe(portrait);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", reset);
    window.addEventListener("portfolio:chapter", chapter);
    reduce.addEventListener("change", reset);
    interactiveGaze.addEventListener("change", reset);
    compactPortrait.addEventListener("change", chapter);
    return () => {
      reset();
      cancelAnimationFrame(measureFrame);
      resize.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", reset);
      window.removeEventListener("portfolio:chapter", chapter);
      reduce.removeEventListener("change", reset);
      interactiveGaze.removeEventListener("change", reset);
      compactPortrait.removeEventListener("change", chapter);
      portrait.style.removeProperty("--portrait-fit-width");
      portrait.style.removeProperty("--portrait-fit-height");
    };
  }, []);
  return (
    <section id="hello" className="hello-scene" aria-labelledby="hello-title">
      <figure ref={portraitRef} className="hello-portrait">
        <span className="hello-portrait-relief" aria-hidden="true" />
        <span className="hello-portrait-fold" aria-hidden="true" />
        <div className="hello-portrait-reveal">
          <div className="hello-portrait-float">
            <div className="hello-portrait-position">
            <div className="hello-portrait-art">
              <PortraitAsset className="hello-portrait-image" alt="Ilustrasi Caesar setengah badan sedang berpikir" />
              <span className="hello-hair-layer" aria-hidden="true">
                <PortraitAsset className="hello-hair-image" alt="" />
              </span>
              <span className="hello-eye-layer" aria-hidden="true">
                <span className="hello-eye hello-eye-left"><i /></span>
                <span className="hello-eye hello-eye-right"><i /></span>
              </span>
            </div>
            </div>
          </div>
        </div>
        <span className="hello-portrait-ground" aria-hidden="true" />
      </figure>
      <div className="hello-copy">
        <h2 ref={headingRef} id="hello-title" className="hello-title" aria-label="Hi, aku Caesar.">
          <span className="hello-line" aria-hidden="true">{"Hi, aku".split("").map((letter, i) => <span className="hello-letter" key={i} style={{ "--letter": i } as CSSProperties}><span className="hello-glyph">{letter === " " ? "\u00a0" : letter}</span></span>)}</span>
          <span className="hello-line hello-line-name" aria-hidden="true">{"Caesar.".split("").map((letter, i) => <span className="hello-letter" key={i} style={{ "--letter": i + 7 } as CSSProperties}><span className="hello-glyph">{letter}</span></span>)}</span>
        </h2>
        <p className="hello-bio">Aku Caesar, mahasiswa Informatika UNDIP. Aku suka ngulik: dari merangkai aplikasi full-stack sampai mencoba AI untuk hal yang dekat dengan keseharian. Buatku, cara belajar paling seru itu bikin sesuatu, mentok sebentar, lalu nemu jalan keluarnya.</p>
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
      </div>
    </section>
  );
}
