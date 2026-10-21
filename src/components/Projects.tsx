"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Info, LockKeyhole, X, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import TechLogoList from "./TechLogoList";
import ProjectArtwork from "./ProjectArtwork";
import { profile, projects, ProjectItem } from "@/data/portfolio";

const cardSpring = { stiffness: 155, damping: 22, mass: 0.6 };

function ProjectCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useMotionValue(-160);
  const spotlightY = useMotionValue(-160);
  const rotateXTarget = useTransform(pointerY, [-0.5, 0.5], [1.8, -1.8]);
  const rotateYTarget = useTransform(pointerX, [-0.5, 0.5], [-2.2, 2.2]);
  const rotateX = useSpring(rotateXTarget, cardSpring);
  const rotateY = useSpring(rotateYTarget, cardSpring);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    spotlightX.set(event.clientX - bounds.left - 160);
    spotlightY.set(event.clientY - bounds.top - 160);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1400 }}
    >
      <motion.div className="project-spotlight" style={{ x: spotlightX, y: spotlightY }} aria-hidden="true" />
      {children}
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack" | "web">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const background = [...document.querySelectorAll<HTMLElement>("main, .site-nav, .footer")]
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.filterTag === activeFilter;
  });

  return (
    <section id="projects" className="section section-projects">
      <div className="site-shell">
        <Reveal className="section-heading">
          <h1 className="catalogue-title">Ide yang sudah jadi.</h1>
          <p>
            Beberapa projek yang saya kerjakan sambil belajar. Ada yang sudah bisa dicoba, ada juga yang masih saya rapikan.
          </p>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal className="project-filter-bar">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            aria-pressed={activeFilter === "all"}
          >
            {activeFilter === "all" && <motion.span layoutId="active-project-filter" className="filter-active-bg" />}
            <span className="filter-label">Semua ({projects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("ai")}
            className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
            aria-pressed={activeFilter === "ai"}
          >
            {activeFilter === "ai" && <motion.span layoutId="active-project-filter" className="filter-active-bg" />}
            <span className="filter-label">AI ({projects.filter((p) => p.filterTag === "ai").length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("fullstack")}
            className={`filter-btn ${activeFilter === "fullstack" ? "active" : ""}`}
            aria-pressed={activeFilter === "fullstack"}
          >
            {activeFilter === "fullstack" && <motion.span layoutId="active-project-filter" className="filter-active-bg" />}
            <span className="filter-label">Full-stack ({projects.filter((p) => p.filterTag === "fullstack").length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("web")}
            className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
            aria-pressed={activeFilter === "web"}
          >
            {activeFilter === "web" && <motion.span layoutId="active-project-filter" className="filter-active-bg" />}
            <span className="filter-label">Web ({projects.filter((p) => p.filterTag === "web").length})</span>
          </button>
        </Reveal>

        {/* Project Grid / List */}
        <p className="sr-only" role="status">{filteredProjects.length} projek ditampilkan.</p>
        <motion.div layout className="project-list" data-count={filteredProjects.length}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                id={project.id}
                layout
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: reduceMotion ? 0 : 0.36, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
              >
              <Reveal delay={index * 0.04}>
              <div className="project-shell">
              <ProjectCardShell
                className={`project-card project-card-${index + 1}`}
              >
                <div
                  className="project-media clickable-media"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Buka detail ${project.title}`}
                >
                  <ProjectArtwork project={project} />
                </div>

                <div className="project-content">
                  <div className="project-header-meta">
                    <div className="project-category-tag">{project.category}</div>
                    <span className={`project-status ${project.isDeployed ? "is-live" : "is-private"}`}>
                      {project.isDeployed ? "Bisa dicoba" : "Belum publik"}
                    </span>
                  </div>

                  <h2 className="project-name-heading"><button
                    type="button"
                    className="project-title cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </button></h2>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-desc">{project.description}</p>

                  <div className="stack-wrap">
                    <span className="stack-label">TechStack</span>
                    <TechLogoList
                      technologies={project.stack}
                      label={`TechStack ${project.title}`}
                    />
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="button button-detail"
                    >
                      <Info size={16} /> Lihat detail
                    </button>

                    {project.isDeployed && project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-demo"
                      >
                        Live Demo <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="status-notice">
                        <LockKeyhole size={14} /> Masih lokal
                      </span>
                    )}

                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-code"
                        aria-label={`Source code ${project.title}`}
                      >
                        <Code2 size={16} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </ProjectCardShell>
              </div>
              </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Detail Projek */}
        {selectedProject && createPortal(
          <motion.div
            className="project-modal-backdrop catalogue-dialog"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <motion.div
              ref={modalRef}
              className="project-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup jendela"
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-category-meta">
                  <span className="modal-category">{selectedProject.category}</span>
                  <span className={`project-status ${selectedProject.isDeployed ? "is-live" : "is-private"}`}>
                    {selectedProject.isDeployed ? "Bisa dicoba" : "Belum publik"}
                  </span>
                </div>
                <h3 id="modal-title" className="modal-title">{selectedProject.title}</h3>
                <p className="modal-tagline">{selectedProject.tagline}</p>
              </div>

              <div className="modal-media-frame">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  width={1000}
                  height={600}
                  className="modal-image"
                />
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h4>Deskripsi Projek</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-section">
                  <h4>Yang bisa dilakukan</h4>
                  <ul className="modal-features-list">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="feature-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>TechStack</h4>
                  <TechLogoList
                    technologies={selectedProject.stack}
                    label={`TechStack ${selectedProject.title}`}
                    large
                  />
                </div>

                <div className="modal-footer-actions">
                  {selectedProject.isDeployed && selectedProject.demo ? (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-primary"
                    >
                      Buka Live Demo <ExternalLink size={16} />
                    </a>
                  ) : (
                    <div className="modal-undeployed-notice">
                      <LockKeyhole size={16} />
                      <span>Projek ini masih berjalan lokal. Untuk sekarang, kamu bisa lihat detail dan kode sumbernya.</span>
                    </div>
                  )}

                  {selectedProject.source && (
                    <a
                      href={selectedProject.source}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-secondary"
                    >
                      <Code2 size={16} /> Buka Repository GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
          , document.body)}

        <Reveal className="projects-footer">
          <div>
            <h2>Masih ada eksperimen lain di GitHub</h2>
            <p>Tugas kuliah, skrip kecil, dan ide-ide yang masih saya utak-atik.</p>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="button button-secondary">
            <Code2 size={18} /> Buka GitHub <ArrowUpRight size={17} strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
