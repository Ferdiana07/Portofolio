"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import SoundToggle from "./SoundToggle";

const navLinks = [
  { label: "About me", href: "#hello" },
  { label: "Profil & Skill", href: "#about" },
  { label: "Projek", href: "#projects" },
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const linkHref = (href: string) => isHome ? href : href === "#projects" ? "/projects" : `/${href}`;
  const isActive = (href: string) => isHome ? activeSection === href.slice(1) : href === "#projects";

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); menuButtonRef.current?.focus(); }
      if (event.key === "Tab") {
        const controls = [...(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const closeOnDesktop = () => { if (window.innerWidth > 1024) setIsOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop, { passive: true });
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const surfaces = [...document.querySelectorAll<HTMLElement>("main, .footer")].map((element) => ({ element, inert: element.inert }));
    document.body.style.overflow = "hidden";
    surfaces.forEach(({ element }) => { element.inert = true; });
    return () => {
      document.body.style.overflow = previousOverflow;
      surfaces.forEach(({ element, inert }) => { element.inert = inert; });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isHome) return;
    const onChapter = (event: Event) => setActiveSection((event as CustomEvent<string>).detail === "top" ? "" : (event as CustomEvent<string>).detail);
    window.addEventListener("portfolio:chapter", onChapter);
    const sections = ["top", ...navLinks.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        if (document.documentElement.dataset.journey === "on") return;
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        setActiveSection(visibleEntry.target.id === "top" ? "" : visibleEntry.target.id);
      },
      { rootMargin: "-32% 0px -58% 0px", threshold: [0, 0.35, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => { observer.disconnect(); window.removeEventListener("portfolio:chapter", onChapter); };
  }, [isHome]);

  return (
    <header ref={headerRef} className="site-nav" data-surface={isHome ? "home" : "catalogue"}>
      <div className="site-shell nav-inner">
        <Link href={isHome ? "#top" : "/"} className="brand" aria-label={`CFS. ${profile.name}, kembali ke atas`}>
          <span className="brand-monogram">CFS</span>
          <span className="brand-dot">.</span>
        </Link>

        <div className="header-sound"><SoundToggle /></div>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={linkHref(link.href)}
              className={`nav-item${isActive(link.href) ? " is-active" : ""}`}
              aria-current={isActive(link.href) ? isHome ? "location" : "page" : undefined}
            >
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
          ref={menuButtonRef}
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
                <Link
                  href={linkHref(link.href)}
                  className={isActive(link.href) ? "is-active" : undefined}
                  aria-current={isActive(link.href) ? isHome ? "location" : "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
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
