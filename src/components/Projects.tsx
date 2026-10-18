"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Info, LockKeyhole, Sparkles, X, Layers, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import TechLogoList from "./TechLogoList";
import { profile, projects, ProjectItem } from "@/data/portfolio";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack" | "web">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
          <p className="section-kicker">Karya & Rekayasa</p>
          <h2>Aplikasi nyata yang dirancang untuk memecahkan masalah.</h2>
          <p>
            Mulai dari marketplace multi-role bahari, asisten belajar AI berbasis PDF, platform telemedicine klinik MERN, hingga sistem deteksi anomali ulasan IndoBERT.
          </p>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal className="project-filter-bar">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          >
            Semua Projek ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("ai")}
            className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
          >
            <Sparkles size={14} className="filter-icon" /> AI & Machine Learning ({projects.filter((p) => p.filterTag === "ai").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("fullstack")}
            className={`filter-btn ${activeFilter === "fullstack" ? "active" : ""}`}
          >
            <Layers size={14} className="filter-icon" /> Full-Stack Platform ({projects.filter((p) => p.filterTag === "fullstack").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("web")}
            className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
          >
            Web & Organisasi ({projects.filter((p) => p.filterTag === "web").length})
          </button>
        </Reveal>

        {/* Project Grid / List */}
        <motion.div layout className="project-list">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: reduceMotion ? 0 : 0.36, delay: index * 0.035 }}
              >
              <Reveal delay={index * 0.04}>
              <article className={`project-card project-card-${index + 1}`}>
                <div
                  className="project-media clickable-media"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  aria-label={`Buka detail ${project.title}`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 56vw, 720px"
                    className="project-image"
                  />
                </div>

                <div className="project-content">
                  <div className="project-header-meta">
                    <div className="project-category-tag">{project.category}</div>
                    <span className={`project-status ${project.isDeployed ? "is-live" : "is-private"}`}>
                      {project.isDeployed ? "Live" : "Private build"}
                    </span>
                  </div>

                  <h3
                    className="project-title cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-desc">{project.description}</p>

                  <div className="stack-wrap">
                    <span className="stack-label">Teknologi</span>
                    <TechLogoList
                      technologies={project.stack}
                      label={`Teknologi ${project.title}`}
                    />
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="button button-detail"
                    >
                      <Info size={16} /> Detail & Fitur
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
                        <LockKeyhole size={14} /> Belum bisa diakses link
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
              </article>
              </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Detail Projek */}
        <AnimatePresence>
          {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
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
              className="project-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
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
                    {selectedProject.isDeployed ? "Live" : "Private build"}
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
                  <h4>Fitur Unggulan & Arsitektur</h4>
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
                  <h4>Teknologi & Stack Digunakan</h4>
                  <TechLogoList
                    technologies={selectedProject.stack}
                    label={`Teknologi ${selectedProject.title}`}
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
                      <span>Projek ini saat ini beroperasi di lingkungan lokal/staging dan belum dideploy ke publik.</span>
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
          )}
        </AnimatePresence>

        <Reveal className="projects-footer">
          <div>
            <h4>Eksplorasi Kode & Repositori Lain</h4>
            <p>Eksperimen perkuliahan, skrip otomatisasi, dan proyek open-source lainnya dapat dilihat di profil GitHub.</p>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="button button-secondary">
            <Code2 size={18} /> Profil GitHub ({profile.shortName}) <ArrowUpRight size={17} strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
