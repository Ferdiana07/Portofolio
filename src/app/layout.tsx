import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caesar Ferdiana Suwandi | Developer Portfolio",
  description:
    "Portfolio Caesar Ferdiana Suwandi, mahasiswa Informatika UNDIP yang membangun produk web, AI, dan sistem informasi.",
  keywords: ["Caesar Ferdiana Suwandi", "developer", "portfolio", "Informatika UNDIP", "web development", "AI"],
  authors: [{ name: "Caesar Ferdiana Suwandi" }],
  openGraph: {
    title: "Caesar Ferdiana Suwandi | Developer Portfolio",
    description: "Web, AI, and information systems built with curiosity and care.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
