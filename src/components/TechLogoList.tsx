import type { ComponentType } from "react";
import {
  Braces,
  Database,
  Feather,
  LayoutTemplate,
  MonitorSmartphone,
} from "lucide-react";
import {
  SiC,
  SiChartdotjs,
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
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

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
  [/^java$/i, SiOpenjdk],
  [/^c$/i, SiC],
  [/^html/i, SiHtml5],
  [/css/i, SiCss],
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
  [/recharts/i, SiChartdotjs],
  [/docker/i, SiDocker],
  [/jwt/i, SiJsonwebtokens],
  [/playwright/i, SiTestinglibrary],
  [/git\s*&\s*github/i, SiGithub],
  [/^git$/i, SiGit],
  [/figma/i, SiFigma],
  [/visual studio code/i, VscCode],
  [/google workspace/i, SiGoogle],
  [/responsive design/i, MonitorSmartphone],
  [/feather icons/i, Feather],
  [/canva/i, LayoutTemplate],
  [/zustand/i, Braces],
  [/^sql$/i, Database],
];

function getTechnologyIcon(technology: string) {
  return iconRules.find(([pattern]) => pattern.test(technology))?.[1] ?? Braces;
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
        const Icon = getTechnologyIcon(technology);

        return (
          <span
            key={technology}
            className="tech-logo"
            data-tech={technology}
            title={technology}
            tabIndex={0}
          >
            <Icon size={large ? 24 : 20} aria-hidden={true} />
            <span className="sr-only">{technology}</span>
          </span>
        );
      })}
    </div>
  );
}
