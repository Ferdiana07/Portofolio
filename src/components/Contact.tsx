"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import Reveal from "./Reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./Icons";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const mailSubject = subject || `Pesan portfolio dari ${name}`;
    const mailBody = [
      `Nama: ${name}`,
      `Email: ${email}`,
      "",
      "Pesan:",
      message,
    ].join("\n");

    setIsPrepared(true);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="site-shell">
        <Reveal className="contact-box-grid">
          <div className="contact-left-card">
            <p className="section-kicker">Hubungi & Kolaborasi</p>
            <h2>Mari membangun sesuatu yang benar-benar berguna.</h2>
            <p className="contact-description">
              Ceritakan peluang, masalah, atau ide yang ingin dikembangkan. Saya akan membalas melalui email secepatnya.
            </p>

            <div className="contact-primary-actions">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="button button-secondary"
                aria-label="Salin alamat email"
              >
                {copied ? (
                  <><Check size={17} /> Email tersalin</>
                ) : (
                  <><Copy size={17} /> Salin {profile.email}</>
                )}
              </button>
            </div>

            <div className="contact-meta-info">
              <div className="contact-meta-row">
                <MapPin size={16} className="contact-meta-icon" />
                <span>{profile.location}</span>
              </div>
              <div className="contact-meta-row">
                <Mail size={16} className="contact-meta-icon" />
                <span>Komunikasi utama melalui email</span>
              </div>
            </div>
          </div>

          <form className="contact-form-card" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <div>
                <h3>Kirim brief singkat</h3>
                <p>Form akan membuka aplikasi email dengan pesan yang sudah tersusun.</p>
              </div>
              <Send size={21} aria-hidden="true" />
            </div>

            <div className="contact-form-row">
              <label className="contact-form-field">
                <span>Nama</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Nama lengkap"
                  required
                />
              </label>
              <label className="contact-form-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  required
                />
              </label>
            </div>

            <label className="contact-form-field">
              <span>Subjek</span>
              <input
                type="text"
                name="subject"
                placeholder="Peluang magang, proyek, atau kolaborasi"
                required
              />
            </label>

            <label className="contact-form-field">
              <span>Pesan</span>
              <textarea
                name="message"
                placeholder="Tuliskan konteks dan kebutuhan Anda..."
                rows={6}
                required
              />
            </label>

            <div className="contact-form-footer">
              <p className="contact-form-target">
                Tujuan: <strong>{profile.email}</strong>
              </p>
              <button type="submit" className="button button-primary">
                Kirim via Email <ArrowUpRight size={17} />
              </button>
            </div>

            <p className={`contact-form-status${isPrepared ? " is-visible" : ""}`} aria-live="polite">
              Pesan siap. Lanjutkan pengiriman melalui aplikasi email Anda.
            </p>
          </form>
        </Reveal>

        <Reveal className="contact-channels-row" delay={0.08}>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-channel-link">
            <LinkedinIcon size={20} />
            <span><small>Jejaring profesional</small>LinkedIn</span>
            <ArrowUpRight size={17} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="contact-channel-link">
            <GithubIcon size={20} />
            <span><small>Repositori kode</small>GitHub</span>
            <ArrowUpRight size={17} />
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="contact-channel-link">
            <InstagramIcon size={20} />
            <span><small>Media sosial</small>Instagram</span>
            <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
