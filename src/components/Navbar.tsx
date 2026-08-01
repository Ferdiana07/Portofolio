"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 md:px-12 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            C<span className="text-primary">F</span>S.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.06] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-3xl font-bold text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
