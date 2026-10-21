import Image from "next/image";

export default function HeroStage() {
  return (
    <div className="hero-stage">
      <div className="portrait-frame">
        <Image
          src="/images/caesar-portrait-v2.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 0px, 210px"
          preload
          className="portrait-image"
        />
      </div>
    </div>
  );
}
