import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";
import CanvasStudy from "./CanvasStudy";

export default function Hero() {
  return (
    <section id="top" className="dream-hero" aria-label="Kenalan dengan Caesar">
      <h1 className="dream-name">Caesar<span>.</span></h1>
      <p className="dream-interests"><span>Software</span><span>AI</span><span>Cloud</span></p>
      <CanvasStudy />
      <div className="dream-introduction">
        <p className="dream-fullname">{profile.name}</p>
        <p className="dream-greeting">Haii, selamat datang<br />di ruang kecil saya.</p>
        <p className="dream-bio">Mahasiswa Informatika UNDIP.<br />Suka ngulik, bikin, dan belajar lagi.</p>
        <div className="dream-socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub Caesar"><GithubIcon size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Caesar"><LinkedinIcon size={18} /></a>
          <a href={profile.resume} target="_blank" rel="noreferrer">CV <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="dream-side-note">
        <p>Berawal dari<br />“gimana kalau…”</p>
        <span>Lalu dicoba,<br />sampai jadi sesuatu.</span>
        <a href="#hello">Kenalan lebih dekat <ArrowUpRight size={16} /></a>
      </div>
      <a href="#projects" className="dream-enter" aria-label="Lihat projek Caesar">
        <span>Lihat projek</span><span className="dream-enter-icon"><ArrowDown size={25} /></span>
      </a>
    </section>
  );
}
