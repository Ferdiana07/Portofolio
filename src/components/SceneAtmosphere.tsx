import { Bird, Box, Braces, CircleDot, CodeXml, Compass, Database, Feather, Flag, Hexagon, Mail, MessageCircle, Orbit, Route, Send, Sparkle, Sparkles, Star, Triangle, Wind } from "lucide-react";
import { memo, type CSSProperties } from "react";
import TechConstellation from "./TechConstellation";

const ornaments = {
  top: [],
  hello: [Bird, Bird, Feather, Bird, Sparkle, Wind],
  about: [Orbit, Braces, CodeXml, Hexagon, Database, CircleDot],
  projects: [Box, Box, Sparkle, Triangle, Hexagon, CodeXml],
  experience: [Compass, Flag, Route, CircleDot, Feather, CircleDot],
  certifications: [Star, Star, Sparkle, Sparkles, Star, Sparkle],
  contact: [Send, Mail, MessageCircle, Send, Mail, Sparkle],
};

/** Printed motion studies: brand constellation, birds, nodes, prisms, routes, stars, post. */
export default memo(function SceneAtmosphere({ chapter }: { chapter: string }) {
  const marks = ornaments[chapter as keyof typeof ornaments];
  if (!marks) return null;
  const hasRelief = ["hello", "about", "projects", "experience"].includes(chapter);
  return (
    <div className={`scene-atmosphere atmosphere-${chapter}`} aria-hidden="true" inert>
      {hasRelief && <><div className="canvas-relief relief-one ambient-loop" /><div className="canvas-relief relief-two" /></>}
      {hasRelief && <svg className="atmosphere-linework ambient-loop" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        {chapter === "hello" && <><path d="M-160 780C100 360 370 1140 570 900S1000 850 1540 220" /><circle cx="1290" cy="240" r="150" /><circle cx="1290" cy="240" r="174" /></>}
        {chapter === "about" && <><path d="M-100 720H180Q280 720 280 620V360Q280 260 380 260H1540" /><path d="M-100 748H190Q308 748 308 630V370Q308 288 390 288H1540" /><circle cx="1220" cy="250" r="220" /></>}
        {chapter === "projects" && <><ellipse cx="720" cy="650" rx="850" ry="400" /><ellipse cx="720" cy="650" rx="900" ry="430" /><ellipse cx="720" cy="650" rx="950" ry="460" /></>}
        {chapter === "experience" && <><path className="route-path" d="M1060-100V180Q1060 270 1150 270H1230Q1320 270 1320 360V650Q1320 740 1230 740H1100Q1010 740 1010 830V1100" />{[[1060,120],[1320,470],[1010,930]].map(([cx,cy]) => <g key={cy}><circle cx={cx} cy={cy} r="22" /><circle cx={cx} cy={cy} r="7" /></g>)}</>}
      </svg>}
      {chapter === "certifications" && <svg className="atmosphere-linework constellation-trace" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none"><path d="m54 340 86-137 130 58-53 152 130 66M1180 140l115 125-72 153 126 140" /><g>{[[54,340],[140,203],[270,261],[217,413],[347,479],[1180,140],[1295,265],[1223,418],[1349,558]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />)}</g></svg>}
      {chapter === "contact" && <svg className="atmosphere-linework message-trace" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none"><path d="M-90 420c130-240 290-30 160 50S-10 240 250 170M1200 850c310-100 20-240 100-370s180 20 240-90" /></svg>}
      {chapter === "top" ? <TechConstellation /> : <>
        <div className="scene-ornaments">{marks.map((Mark, index) => <span key={index} className={`scene-ornament ornament-${index + 1} ambient-loop`}><Mark strokeWidth={1} /></span>)}</div>
        <div className={`atmosphere-particles particles-${chapter}`}>{Array.from({ length: 7 }, (_, index) => <span key={index} className="atmosphere-particle ambient-loop" style={{ "--particle-phase": `${-index * 3.1}s` } as CSSProperties} />)}</div>
      </>}
    </div>
  );
});
