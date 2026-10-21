import type { ComponentType } from "react";
import Image from "next/image";
import {
  Braces,
  Database,
  Feather,
  ChartNoAxesCombined,
  MonitorSmartphone,
} from "lucide-react";
import {
  SiC,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithub,
  SiGo,
  SiGoogle,
  SiGooglegemini,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJsonwebtokens,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa6";

type TechnologyIcon = ComponentType<{
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
}>;

const iconRules: Array<[RegExp, TechnologyIcon]> = [
  [/^react/i, SiReact],
  [/^next/i, SiNextdotjs],
  [/^typescript/i, SiTypescript],
  [/^javascript/i, SiJavascript],
  [/^python/i, SiPython],
  [/^php/i, SiPhp],
  [/^java$/i, FaJava],
  [/^c$/i, SiC],
  [/^html/i, SiHtml5],
  [/^css/i, SiCss],
  [/^laravel/i, SiLaravel],
  [/^tailwind/i, SiTailwindcss],
  [/^node/i, SiNodedotjs],
  [/^express/i, SiExpress],
  [/^vite/i, SiVite],
  [/^prisma/i, SiPrisma],
  [/^postgres/i, SiPostgresql],
  [/^mongodb/i, SiMongodb],
  [/^mysql/i, SiMysql],
  [/^sqlite/i, SiSqlite],
  [/^pytorch/i, SiPytorch],
  [/indobert|huggingface/i, SiHuggingface],
  [/gemini/i, SiGooglegemini],
  [/^golang|^go$/i, SiGo],
  [/^fastapi/i, SiFastapi],
  [/recharts/i, ChartNoAxesCombined],
  [/docker/i, SiDocker],
  [/jwt/i, SiJsonwebtokens],
  [/git\s*&\s*github/i, SiGithub],
  [/^git$/i, SiGit],
  [/figma/i, SiFigma],
  [/visual studio code/i, VscCode],
  [/google workspace/i, SiGoogle],
  [/responsive design/i, MonitorSmartphone],
  [/feather icons/i, Feather],
  [/zustand/i, Braces],
  [/^sql$/i, Database],
];

function getTechnologyIcons(technology: string): TechnologyIcon[] {
  if (/html5.*css3/i.test(technology)) return [SiHtml5, SiCss];
  if (/git\s*&\s*github/i.test(technology)) return [SiGit, SiGithub];

  return [iconRules.find(([pattern]) => pattern.test(technology))?.[1] ?? Braces];
}

interface TechLogoListProps {
  technologies: string[];
  label: string;
  large?: boolean;
}

export default function TechLogoList({
  technologies,
  label,
  large = false,
}: TechLogoListProps) {
  return (
    <div className={`tech-logo-list${large ? " tech-logo-list-large" : ""}`} aria-label={label}>
      {technologies.map((technology) => {
        const Icons = getTechnologyIcons(technology);
        const localLogo = /^playwright/i.test(technology) ? "/icons/playwright.svg" : /^canva/i.test(technology) ? "/icons/canva.svg" : null;

        return (
          <span
            key={technology}
            className="tech-logo"
            data-tech={technology}
            title={technology}
            tabIndex={0}
          >
            <span className={Icons.length > 1 ? "tech-logo-icons is-pair" : "tech-logo-icons"} aria-hidden="true">
              {localLogo ? <Image src={localLogo} width={large ? 24 : 20} height={large ? 24 : 20} alt="" unoptimized className="local-tech-logo" /> : Icons.map((Icon, index) => (
                <Icon key={`${technology}-${index}`} size={Icons.length > 1 ? (large ? 19 : 16) : (large ? 24 : 20)} />
              ))}
            </span>
            <span className="sr-only">{technology}</span>
          </span>
        );
      })}
    </div>
  );
}
