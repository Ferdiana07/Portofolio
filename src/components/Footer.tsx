import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./Icons";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="site-shell footer-inner">
        <div className="footer-brand-col">
          <Link href="/#top" className="brand" aria-label="CFS. Kembali ke atas">
            <span className="brand-monogram">CFS</span>
            <span className="brand-dot">.</span>
          </Link>
          <p className="footer-tagline">
            {profile.name}, Mahasiswa S1 Informatika Universitas Diponegoro
          </p>
          <p className="footer-location">{profile.location}</p>
        </div>

        <div className="footer-socials-col">
          <a href={profile.github} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
            <InstagramIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} className="footer-social-link" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        <div className="footer-copy-col">
          <p>© {new Date().getFullYear()} {profile.name}.</p>
        </div>
      </div>
    </footer>
  );
}
