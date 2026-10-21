import { ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { certificationCategories, profile } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="section section-certifications" aria-labelledby="certification-title">
      <div className="site-shell certifications-layout">
        <Reveal className="certification-copy">
          <h2 id="certification-title">Rasa penasaran yang terus jalan.</h2>
          <p>
            Kursus dan sertifikasi membantu saya mengisi celah yang belum sempat dipelajari di kelas atau projek.
          </p>
          <div className="cert-cta-row">
            <a
              href={profile.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              <Award size={18} /> Lihat sertifikat <ArrowUpRight size={17} strokeWidth={2} />
            </a>
          </div>
        </Reveal>

        <div className="certificate-cards-grid" tabIndex={0} role="region" aria-label="Daftar kursus dan sertifikasi">
          {certificationCategories.map((group, index) => (
            <Reveal className="cert-card-item" key={group.title} delay={index * 0.06}>
              <div className="cert-card-header">
                <div className="cert-badge-row">
                  <span className="cert-issuer-tag">{group.issuer}</span>
                  <span className="cert-count-pill">{group.badge}</span>
                </div>
                <h3 className="cert-category-title">{group.title}</h3>
              </div>

              <ul className="cert-items-list">
                {group.items.map((item) => (
                  <li key={item} className="cert-single-item">
                    <ShieldCheck size={16} className="cert-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
