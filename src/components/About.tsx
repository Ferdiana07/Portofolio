import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import TechLogoList from "./TechLogoList";
import { profile, skillCategories } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="site-shell">
        <Reveal className="about-statement">
          <h2>Belajar, bikin, ulangi.</h2>
          <p>
            Teori di kelas jadi lebih masuk akal setelah dicoba langsung. Dari situ saya terus belajar software, AI, dan cloud.
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
              <h4>Di luar kode</h4>
              <ul className="soft-skills-list">
                <li><CheckCircle size={15} /> Terbiasa kerja bareng tim lintas divisi</li>
                <li><CheckCircle size={15} /> Suka diskusi dan berbagi yang saya pelajari</li>
                <li><CheckCircle size={15} /> Cari solusi, lalu tuntaskan pekerjaannya</li>
                <li><CheckCircle size={15} /> Selalu tertarik mencoba stack baru</li>
                <li><CheckCircle size={15} /> Juga aktif di UKM Bulutangkis</li>
              </ul>
            </Reveal>
          </div>

          {/* Technical Skills Column */}
          <div className="skills-container">
            <Reveal>
              <h3 className="skills-main-title">Yang biasa saya pakai</h3>
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
