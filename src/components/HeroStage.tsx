import Image from "next/image";
import { profile } from "@/data/portfolio";

export default function HeroStage() {
  return (
    <div className="hero-stage">
      <div className="portrait-card">
        <div className="portrait-frame">
          <Image
            src="/images/caesar-portrait-v2.webp"
            alt={`Potret resmi ${profile.name}`}
            fill
            sizes="(max-width: 1024px) 0px, 330px"
            className="portrait-image"
          />
        </div>
      </div>
    </div>
  );
}
