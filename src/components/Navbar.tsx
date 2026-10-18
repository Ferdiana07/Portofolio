"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const navLinks = [
  { label: "Projek", href: "#projects" },
  { label: "Profil & Skill", href: "#about" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Sertifikasi", href: "#certifications" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="site-nav">
      <div className="site-shell nav-inner">
        <Link href="#top" className="brand" aria-label={`${profile.name}, kembali ke atas`}>
          <span className="brand-monogram">CFS</span>
          <span className="brand-dot">.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-item">
              {link.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="nav-cv-button"
          >
            <ArrowDownToLine size={15} /> Resume CV
          </a>
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navigasi mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="button button-primary mobile-cv-link"
              onClick={() => setIsOpen(false)}
            >
              <ArrowDownToLine size={16} /> Unduh Resume CV (PDF)
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
