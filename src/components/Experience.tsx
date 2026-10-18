import { Briefcase, Calendar, CheckCircle2, MapPin, Users2 } from "lucide-react";
import Reveal from "./Reveal";
import { internships, organizations } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section section-experience">
      <div className="site-shell experience-layout">
        <Reveal className="experience-intro">
          <p className="section-kicker">Rekam Jejak Profesional</p>
          <h2>Pengalaman kerja, magang, dan kepemimpinan organisasi.</h2>
          <p>
            Menerapkan disiplin teknik informatika dalam pelayanan publik di instansi pemerintah, serta mengasah komunikasi strategis dan kepemimpinan melalui organisasi kampus dan kepemudaan.
          </p>
        </Reveal>

        {/* Internships Section */}
        <div className="experience-block">
          <Reveal className="block-title-row">
            <div className="block-icon-pill">
              <Briefcase size={18} />
            </div>
            <h3>Pengalaman Kerja & Magang Instansi</h3>
          </Reveal>

          <div className="timeline" aria-label="Pengalaman magang">
            {internships.map((item, index) => (
              <Reveal className="timeline-item-card" key={item.company} delay={index * 0.08}>
                <div className="timeline-meta-bar">
                  <span className="timeline-badge-period">
                    <Calendar size={14} /> {item.period}
                  </span>
                  <span className="timeline-badge-location">
                    <MapPin size={14} /> {item.location}
                  </span>
                </div>

                <div className="timeline-main-content">
                  <div className="timeline-header-group">
                    <p className="timeline-role-name">{item.role}</p>
                    <h4 className="timeline-company-name">{item.company}</h4>
                  </div>
                  <p className="timeline-summary-text">{item.summary}</p>

                  <div className="timeline-bullets">
                    {item.highlights.map((bullet, i) => (
                      <div key={i} className="timeline-bullet-item">
                        <CheckCircle2 size={15} className="bullet-check" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Organizations Section */}
        <div className="experience-block org-block">
          <Reveal className="block-title-row">
            <div className="block-icon-pill org-icon-pill">
              <Users2 size={18} />
            </div>
            <h3>Pengalaman Kepengurusan Organisasi</h3>
          </Reveal>

          <div className="organization-grid-modern">
            {organizations.map((org, index) => (
              <Reveal className="org-card-modern" key={org.name} delay={index * 0.08}>
                <div className="org-card-top">
                  <span className="org-period-tag">{org.period}</span>
                  <h4 className="org-name-text">{org.name}</h4>
                  <p className="org-division-text">{org.division}</p>
                </div>
                <div className="org-card-divider"></div>
                <div className="org-card-bottom">
                  <span className="org-role-badge">{org.role}</span>
                  <p className="org-desc-text">{org.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
