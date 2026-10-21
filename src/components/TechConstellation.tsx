import type { CSSProperties } from "react";
import { FaAws, FaJava } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { SiCss, SiDocker, SiFigma, SiGit, SiGithub, SiGoogle, SiGooglecloud, SiGooglegemini, SiHtml5, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

// Authored positions, not runtime randomness: stable hydration and clear reading space.
// Mobile keeps the first 14, including every brand explicitly requested by Caesar.
const technologies = [
  { name: "AWS", Icon: FaAws, x: 7, y: 18, mx: 7, my: 42, size: 43 },
  { name: "Google", Icon: SiGoogle, x: 91, y: 17, mx: 91, my: 15, size: 29 },
  { name: "Gemini", Icon: SiGooglegemini, x: 79, y: 32, mx: 88, my: 43, size: 38 },
  { name: "ChatGPT", Icon: RiOpenaiFill, x: 3, y: 65, mx: 9, my: 77, size: 36 },
  { name: "Java", Icon: FaJava, x: 20, y: 36, mx: 87, my: 77, size: 38 },
  { name: "HTML", Icon: SiHtml5, x: 95, y: 43, mx: 6, my: 27, size: 30 },
  { name: "MongoDB", Icon: SiMongodb, x: 85, y: 80, mx: 93, my: 61, size: 38 },
  { name: "React", Icon: SiReact, x: 22, y: 61, mx: 14, my: 48, size: 35 },
  { name: "Python", Icon: SiPython, x: 77, y: 62, mx: 64, my: 45, size: 27 },
  { name: "TypeScript", Icon: SiTypescript, x: 35, y: 16, mx: 42, my: 40, size: 23 },
  { name: "Node.js", Icon: SiNodedotjs, x: 31, y: 84, mx: 7, my: 59, size: 28 },
  { name: "Docker", Icon: SiDocker, x: 43, y: 36, mx: 81, my: 82, size: 35 },
  { name: "GitHub", Icon: SiGithub, x: 96, y: 62, mx: 51, my: 83, size: 28 },
  { name: "CSS", Icon: SiCss, x: 80, y: 13, mx: 36, my: 45, size: 27 },
  { name: "Next.js", Icon: SiNextdotjs, x: 59, y: 12, mx: 0, my: 0, size: 24 },
  { name: "PostgreSQL", Icon: SiPostgresql, x: 70, y: 83, mx: 0, my: 0, size: 31 },
  { name: "Google Cloud", Icon: SiGooglecloud, x: 55, y: 81, mx: 0, my: 0, size: 36 },
  { name: "Git", Icon: SiGit, x: 5, y: 40, mx: 0, my: 0, size: 23 },
  { name: "Tailwind CSS", Icon: SiTailwindcss, x: 94, y: 82, mx: 0, my: 0, size: 34 },
  { name: "Figma", Icon: SiFigma, x: 25, y: 26, mx: 0, my: 0, size: 27 },
];

/** Decorative only: these marks are not an additional claim of proficiency. */
export default function TechConstellation() {
  return <div className="scene-ornaments tech-constellation">
    {technologies.map(({ name, Icon, x, y, mx, my, size }, index) => <span key={name} className={`scene-ornament tech-mote tech-drift-${index % 3} ambient-loop`} data-tech={name} style={{ "--tech-x": `${x}%`, "--tech-y": `${y}%`, "--tech-mobile-x": `${mx}%`, "--tech-mobile-y": `${my}%`, "--tech-size": `${size}px`, "--tech-tilt": `${index % 2 ? 7 : -9}deg`, "--tech-duration": `${24 + index % 6 * 4}s`, "--tech-delay": `${-index * 2.7}s` } as CSSProperties}><Icon focusable="false" /></span>)}
  </div>;
}
