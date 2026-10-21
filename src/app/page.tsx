import Hero from "@/components/Hero";
import ProjectPreview from "@/components/ProjectPreview";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import SceneJourney from "@/components/SceneJourney";
import HelloScene from "@/components/HelloScene";

export default function Home() {
  return (
    <SceneJourney>
      <Hero />
      <HelloScene />
      <About />
      <ProjectPreview />
      <Experience />
      <Certifications />
      <Contact />
    </SceneJourney>
  );
}
