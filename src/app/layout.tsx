import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Intro from "@/components/Intro";
import "./globals.css";
import "./immersive.css";
import "./mascot-story.css";
import "./chapter-craft.css";
import "./canvas-study.css";
import "./scene-details.css";

const geist = Manrope({
  variable: "--font-geist",
  subsets: ["latin"],
});
const display = Bodoni_Moda({ variable: "--font-display", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caesar Ferdiana Suwandi | Software / AI / Cloud",
  description:
    "Kenalan dengan Caesar Ferdiana Suwandi, mahasiswa Informatika UNDIP yang suka membangun software, bereksperimen dengan AI, dan mendalami cloud.",
  keywords: ["Caesar Ferdiana Suwandi", "developer", "portfolio", "Informatika UNDIP", "web development", "AI"],
  authors: [{ name: "Caesar Ferdiana Suwandi" }],
  openGraph: {
    title: "Caesar Ferdiana Suwandi | Software / AI / Cloud",
    description: "Software, AI, dan cloud. Lihat projek dan perjalanan belajar Caesar.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable} ${geistMono.variable} ${display.variable}`}>
      <body>
        <Intro />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
