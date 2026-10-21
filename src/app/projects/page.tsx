import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projek | Caesar Ferdiana Suwandi",
  description: "Jelajahi projek Caesar: SEAPEDIA, SINAUWU, DOCVIA, UlasJujur, dan HIMAOSE. Lihat detail, TechStack, dan kode sumbernya.",
};

export default function ProjectsPage() {
  return (
    <div className="catalogue-page">
      <div className="site-shell"><Link href="/#projects" className="catalogue-back"><ArrowLeft size={17} /> Kembali ke beranda</Link></div>
      <Projects />
    </div>
  );
}
