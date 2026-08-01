import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHub";
import Certifications from "@/components/Certifications";

import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="primary-to-secondary" />
      <About />
      <SectionDivider variant="accent-to-primary" />
      <Skills />
      <SectionDivider variant="secondary-to-accent" />
      <Experience />
      <SectionDivider variant="accent-to-primary" />
      <Projects />
      <SectionDivider variant="primary-to-secondary" />
      <GitHubStats />
      <SectionDivider variant="secondary-to-accent" />
      <Certifications />
      <SectionDivider variant="accent-to-primary" />
      <Contact />
    </>
  );
}
