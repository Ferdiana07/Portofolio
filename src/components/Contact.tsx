"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import Reveal from "./Reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./Icons";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setSubmitState("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `[Portfolio] ${subject}`,
          _template: "table",
          _honey: String(formData.get("company") ?? ""),
        }),
      });

      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Pengiriman gagal");

      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="site-shell">
        <Reveal className="contact-box-grid">
          <div className="contact-left-card">
            <h2>Ada ide?<br />Ngobrol, yuk.</h2>
            <p className="contact-description">
              Mau bahas projek, peluang magang, atau sekadar kenalan? Tulis saja di sini, nanti saya balas lewat email.
            </p>

            <div className="contact-primary-actions">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="button button-secondary"
              >
                {copied ? (
                  <><Check size={17} /> Email tersalin</>
                ) : (
                  <><Copy size={17} /> Salin {profile.email}</>
                )}
              </button>
            </div>

            {copyError && <p className="copy-error" role="status">Belum bisa menyalin. Email saya: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>}

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

          <form
            className="contact-form-card"
            onSubmit={handleSubmit}
            onChange={() => {
              if (submitState === "success" || submitState === "error") setSubmitState("idle");
            }}
          >
            <div className="contact-form-heading">
              <div>
                <h3>Mulai dari pesan singkat.</h3>
                <p>Ceritakan yang ada di pikiranmu.</p>
              </div>
              <Send size={21} aria-hidden="true" />
            </div>

            <input
              className="contact-honeypot"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

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
                placeholder="Hai Caesar, aku mau ngobrol soal..."
                rows={6}
                required
              />
            </label>

            <div className="contact-form-footer">
              <p className="contact-form-target">
                Tujuan: <strong>{profile.email}</strong>
              </p>
              <button type="submit" className="button button-primary" disabled={submitState === "sending"}>
                {submitState === "sending" ? "Mengirim..." : "Kirim Pesan"} <ArrowUpRight size={17} />
              </button>
            </div>

            <p
              className={`contact-form-status${submitState !== "idle" ? " is-visible" : ""}${submitState === "error" ? " is-error" : ""}`}
              aria-live="polite"
            >
              {submitState === "sending" && "Sedang mengirim pesan..."}
              {submitState === "success" && "Pesan sudah terkirim. Terima kasih sudah menghubungi saya."}
              {submitState === "error" && <>Pesan belum berhasil dikirim. Coba lagi atau kirim langsung ke <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
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
