"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TechItem {
  name: string;
  logo: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#ffffff" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", color: "#ffffff" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", color: "#FF2D20" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", color: "#ffffff" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", color: "#4169E1" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "#4479A1" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED" },
  { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", color: "#A8B9CC" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", color: "#ED8B00" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", color: "#2D3748" },
  {
    name: "Vercel",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTYgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjQ4IDhMMTIgNDk2aDQ3MkwyNDggOHoiLz48L3N2Zz4=",
    color: "#ffffff",
  },
  {
    name: "OpenAI",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yMi4yODIgOS44MjFhNS45ODUgNS45ODUgMCAwIDAtLjUxNi00LjkwOSA2LjA0NiA2LjA0NiAwIDAgMC02LjUxNy0yLjkwNkE2LjA2NSA2LjA2NSAwIDAgMCAxMC43NjggMS4xMTQgNi4wMjIgNi4wMjIgMCAwIDAgNC44MTUgNC4wMyA1Ljk4NSA1Ljk4NSAwIDAgMCAxLjkzOCA4LjkzOWE2LjA0NiA2LjA0NiAwIDAgMCAuNDA3IDUuMTU2IDUuOTg1IDUuOTg1IDAgMCAwIC41MTYgNC45MDkgNi4wNDYgNi4wNDYgMCAwIDAgNi41MTcgMi45MDZBNi4wNjUgNi4wNjUgMCAwIDAgMTMuMjMyIDIyLjg4NiA2LjAyMiA2LjAyMiAwIDAgMCAxOS4xODUgMTkuOTdhNS45ODUgNS45ODUgMCAwIDAgMi44NzctNC45MDkgNi4wNDYgNi4wNDYgMCAwIDAtLjI4LTUuMjR6TTEzLjIzMiAyMS4zNzZhNC40NzMgNC40NzMgMCAwIDEtMi44NjUtMi44NzZsLjA3Mi0uMDQyIDQuNzY2LTIuNzUzYS43OTMuNzkzIDAgMCAwIC4zOTctLjY4NlY5LjU3bDIuMDE1IDEuMTY0YS4wNzEuMDcxIDAgMCAxIC4wMzguMDVWMTUuMTZhNC40OCA0LjQ4IDAgMCAxLTQuNDIzIDYuMjE2em0tOS4xNi0yLjA2MWE0LjQ3MyA0LjQ3MyAwIDAgMS0uNTM1LTMuMDE0bC4wNzIuMDQzIDQuNzY2IDIuNzUzYS43OTcuNzk3IDAgMCAwIC43OTQgMGw1LjgyMS0zLjM2MXYyLjMyN2EuMDcxLjA3MSAwIDAgMS0uMDI4LjA2Mkw5LjcxMSAxOS4xMTFhNC40OCA0LjQ4IDAgMCAxLTUuNjM5LTQuNzk2em0tMS4xNzItOS43MzNhNC40NyA0LjQ3IDAgMCAxIDIuMzI4LTEuOTY4djUuNjQ3YS43OTMuNzkzIDAgMCAwIC4zOTcuNjg3bDUuODEzIDMuMzU3LTIuMDE1IDEuMTY0YS4wNzEuMDcxIDAgMCAxLS4wNjcuMDA3TDQuODM0IDEzLjYyMmE0LjQ4IDQuNDggMCAwIDEtLjkzNC00LjA0ek0xOC40NjMgMTIuNTdsLTUuODIxLTMuMzU3IDIuMDE1LTEuMTY0YS4wNzEuMDcxIDAgMCAxIC4wNjctLjAwN2w0Ljg5OCAyLjgyOGE0LjQ4IDQuNDggMCAwIDEtLjY5NSA4LjA4Ny0uMDczLjA0My00Ljc5IDIuNzY0VjE1LjEzYS43OTcuNzk3IDAgMCAwLS4zOTctLjY4NmwtLjI3Ny0uMTZ6bTIuMDA3LTMuMDIzLS4wNzItLjA0My00Ljc2Ni0yLjc2M2EuNzk3Ljc5NyAwIDAgMC0uNzk0IDBMOV4gMTAuMDgyVjcuNzU1YS4wNzEuMDcxIDAgMCAxIC4wMjgtLjA2Mmw0Ljg1My0yLjgwMWE0LjQ4IDQuNDggMCAwIDEgNi41ODEgNC42NTZ2LjAwMHptLTEyLjU3IDEuNzM3TC42IDkuMTJhLjA3MS4wNzEgMCAwIDEtLjAzOC0uMDVWNC43OTZhNC40OCA0LjQ4IDAgMCAxIDcuMzQyLTMuNDQzbC0uMDcyLjA0Mi00Ljc2NiAyLjc1M2EuNzkzLjc5MyAwIDAgMC0uMzk3LjY4NlYxMC43OHptMS4wOTQtMi4zNTVMOSA3LjkzNWw1LjI2OCAzLjA0MS0yLjE3NiAxLjI1N0w3LjAyMSA5LjE3NnoiLz48L3N2Zz4=",
    color: "#10a37f",
  },
];

export default function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="mt-16">
      <h3 className="text-center text-sm font-semibold tracking-[0.3em] uppercase text-muted mb-12">
        Technologies I Work With
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11 gap-4 md:gap-6 justify-items-center"
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={item}
            whileHover={{
              y: -8,
              scale: 1.15,
              filter: `drop-shadow(0 0 12px ${tech.color}60)`,
            }}
            className="flex flex-col items-center gap-2 group cursor-default"
            title={tech.name}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-full h-full object-contain"
                style={{ filter: tech.name === "Next.js" || tech.name === "Express" || tech.name === "Flask" ? "invert(1) brightness(0.9)" : "none" }}
                onError={(e) => {
                  // Fallback to text on error
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs font-bold" style="color:${tech.color}">${tech.name.slice(0, 2).toUpperCase()}</span>`;
                  }
                }}
              />
            </div>
            <span className="text-[10px] md:text-xs text-muted/70 group-hover:text-white transition-colors text-center leading-tight">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
