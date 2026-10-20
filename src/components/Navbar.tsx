"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import ScrollProgress from "./ScrollProgress";

const navLinks = [
  { label: "Projek", href: "#projects" },
  { label: "Profil & Skill", href: "#about" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Sertifikasi", href: "#certifications" },
  { label: "Kontak", href: "#contact" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.045 },
  },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const } },
};

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
          <span className={`menu-glyph${isOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <ScrollProgress />

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navigasi mobile"
            variants={mobileMenuVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={reduceMotion ? undefined : mobileItemVariants}>
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={reduceMotion ? undefined : mobileItemVariants}>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="button button-primary mobile-cv-link"
                onClick={() => setIsOpen(false)}
              >
                <ArrowDownToLine size={16} /> Unduh Resume CV (PDF)
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
