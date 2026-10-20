import { ArrowDownToLine, ArrowRight, Mail } from "lucide-react";
import Reveal from "./Reveal";
import HeroStage from "./HeroStage";
import KineticHeading from "./KineticHeading";
import MagneticLink from "./MagneticLink";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./Icons";
import { highlights, profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <>
      <section id="top" className="hero-section">
        <div className="site-shell hero-grid">
          <Reveal className="hero-copy">
            <p className="hero-role">FULL-STACK DEVELOPER / APPLIED AI /</p>
            <KineticHeading />

            <p className="hero-intro">
              Saya <strong>{profile.name}</strong>, mahasiswa Informatika UNDIP yang suka mengubah ide menjadi produk full-stack dan solusi AI yang benar-benar berguna.
            </p>

            <div className="hero-actions">
              <MagneticLink href="#projects" className="button button-primary button-kinetic">
                <span>Jelajahi Projek</span>
                <span className="button-icon-island"><ArrowRight size={16} strokeWidth={1.8} /></span>
              </MagneticLink>
              <MagneticLink
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary button-kinetic"
              >
                <span>Unduh CV</span>
                <span className="button-icon-island"><ArrowDownToLine size={16} strokeWidth={1.8} /></span>
              </MagneticLink>
            </div>

            <div className="hero-socials" aria-label="Tautan media sosial Caesar">
              <a href={profile.github} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub Profil">
                <GithubIcon size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn Profil">
                <LinkedinIcon size={18} />
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram Profil">
                <InstagramIcon size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="social-icon-btn" aria-label="Kirim Email">
                <Mail size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal className="portrait-wrap" delay={0.12}>
            <HeroStage />
          </Reveal>
        </div>
      </section>

      <section className="proof-strip" aria-label="Ringkasan profil dan pencapaian">
        <div className="site-shell proof-grid">
          {highlights.map((item) => (
            <div key={item.label} className="proof-item">
              <strong className="proof-value">{item.value}</strong>
              <span className="proof-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
