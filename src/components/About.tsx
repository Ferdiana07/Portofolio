import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import TechLogoList from "./TechLogoList";
import { profile, skillCategories } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="site-shell">
        <Reveal className="about-statement">
          <h2>Saya paling banyak belajar dari hal yang benar-benar dibangun.</h2>
          <p>
            Perkuliahan memberi fondasi, lalu berbagai proyek membantu saya mengubah teori komputasi, full-stack, dan AI menjadi produk yang terasa sederhana saat digunakan.
          </p>
        </Reveal>

        <div className="about-grid">
          {/* Education & Bio Column */}
          <div className="about-left-col">
            <Reveal className="education-panel">
              <div className="panel-icon-wrap">
                <GraduationCap size={24} className="panel-icon" />
              </div>
              <div className="panel-details">
                <span className="panel-label">Pendidikan Tinggi</span>
                <h3>{profile.university}</h3>
                <p className="panel-sub">{profile.faculty}</p>
                <div className="education-badges">
                  <span className="edu-tag">Agustus 2024 - Sekarang</span>
                  <span className="edu-tag edu-highlight">IPK Sementara: {profile.gpa}</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="education-panel panel-secondary" delay={0.06}>
              <div className="panel-icon-wrap">
                <BookOpen size={22} className="panel-icon" />
              </div>
              <div className="panel-details">
                <span className="panel-label">Pendidikan Menengah</span>
                <h3>SMA N 3 Kota Tegal</h3>
                <p className="panel-sub">Jurusan Ilmu Pengetahuan Alam (IPA)</p>
                <div className="education-badges">
                  <span className="edu-tag">Juli 2021 - Mei 2024</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="soft-skills-card" delay={0.12}>
              <h4>Karakter & Etos Kerja</h4>
              <ul className="soft-skills-list">
                <li><CheckCircle size={15} /> Kerja Sama Tim & Kolaborasi Antar Divisi</li>
                <li><CheckCircle size={15} /> Komunikasi Teknis Maupun Publik yang Jelas</li>
                <li><CheckCircle size={15} /> Tanggung Jawab Tinggi & Berorientasi Solusi</li>
                <li><CheckCircle size={15} /> Adaptif dan Cepat Mempelajari Stack Baru</li>
                <li><CheckCircle size={15} /> Disiplin & Sportivitas (Atlet UKM Bulutangkis)</li>
              </ul>
            </Reveal>
          </div>

          {/* Technical Skills Column */}
          <div className="skills-container">
            <Reveal>
              <h3 className="skills-main-title">Keahlian Teknis & Perangkat Lunak</h3>
            </Reveal>

            {skillCategories.map((group, index) => (
              <Reveal className="skill-card-row" key={group.category} delay={index * 0.06}>
                <div className="skill-row-header">
                  <span className="skill-category-name">{group.category}</span>
                </div>
                <TechLogoList
                  technologies={group.skills}
                  label={`Teknologi ${group.category}`}
                  large
                />
              </Reveal>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
