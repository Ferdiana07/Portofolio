"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const education = [
  {
    title: "Universitas Diponegoro",
    role: "S1 Informatika",
    period: "2024 – Sekarang",
    description: "Pursuing Computer Science with focus on software engineering, AI, and web development.",
    dot: "bg-primary shadow-[0_0_12px_rgba(37,99,235,0.8)]",
  },
  {
    title: "SMA N 3 Kota Tegal",
    role: "Jurusan IPA",
    period: "2021 – 2024",
    description: "Built a strong foundation in mathematics and sciences, sparking an early interest in technology.",
    dot: "bg-accent shadow-[0_0_12px_rgba(56,189,248,0.8)]",
  },
];

const internship = [
  {
    title: "Dinas Komunikasi dan Informatika - Kota Tegal",
    role: "E-Government Intern",
    period: "Jan – Feb 2026",
    description: "Developed a district information website system. Operated a Digital Literacy Seminar and FGD on AI in Government.",
    dot: "bg-primary shadow-[0_0_12px_rgba(37,99,235,0.8)]",
  },
  {
    title: "Badan Pertanahan Nasional - Kabupaten Tegal",
    role: "Data Entry Intern",
    period: "Jul – Aug 2025",
    description: "Validated physical documents and digitized land administration archives.",
    dot: "bg-accent shadow-[0_0_12px_rgba(56,189,248,0.8)]",
  },
];

const organization = [
  {
    title: "Young on Top",
    role: "Divisi Marketing & Communication",
    period: "Des 2024 – Des 2025",
    description: "Created content and publicized events. Coordinated team branding and social activities.",
    dot: "bg-secondary shadow-[0_0_12px_rgba(124,58,237,0.8)]",
  },
  {
    title: "Senat Mahasiswa Undip",
    role: "Badan Kerja Sama Antar Parlemen",
    period: "Feb – Des 2025",
    description: "External communication and coordination. Managed publication of parliamentary collaboration information.",
    dot: "bg-primary shadow-[0_0_12px_rgba(37,99,235,0.8)]",
  },
  {
    title: "UKM Bulutangkis Undip",
    role: "Divisi Kepelatihan",
    period: "Jan – Des 2025",
    description: "Coordinated practice schedules and contributed to national and university-level tournament programs.",
    dot: "bg-accent shadow-[0_0_12px_rgba(56,189,248,0.8)]",
  },
];

function TimelineGroup({ items }: { items: typeof education }) {
  return (
    <div className="relative space-y-5 pl-6 md:pl-8">
      {/* Vertical line */}
      <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative group"
        >
          {/* Dot on timeline */}
          <div className={`absolute -left-[26px] md:-left-[30px] top-5 w-3 h-3 rounded-full ${item.dot} z-10`} />

          <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">{item.title}</h4>
              <span className="shrink-0 text-xs font-mono text-highlight bg-highlight/10 px-2 py-0.5 rounded-full self-start">
                {item.period}
              </span>
            </div>
            <p className="text-sm font-medium text-accent mb-2">{item.role}</p>
            <p className="text-sm text-muted leading-relaxed">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SectionLabel({ icon: Icon, title, color }: { icon: any; title: string; color: string }) {
  return (
    <div className={`flex items-center gap-3 mb-8`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="w-full py-20 md:py-32 relative overflow-hidden bg-[#030610]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-5 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
          >
            My journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Experience &amp; <span className="text-gradient">Education</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            className="h-0.5 w-16 bg-gradient-to-r from-accent to-primary"
          />
        </div>

        {/* Three columns on xl, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div>
            <SectionLabel icon={GraduationCap} title="Education" color="bg-primary/20 text-primary" />
            <TimelineGroup items={education} />
          </div>
          <div>
            <SectionLabel icon={Briefcase} title="Experience" color="bg-accent/20 text-accent" />
            <TimelineGroup items={internship} />
          </div>
          <div>
            <SectionLabel icon={Users} title="Organization" color="bg-secondary/20 text-secondary" />
            <TimelineGroup items={organization} />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
}
