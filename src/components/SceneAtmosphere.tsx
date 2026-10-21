import { Bird, Box, Compass, Feather, Mail, Orbit, Send, Sparkle, Star } from "lucide-react";
import { memo } from "react";

const ornaments = {
  top: [Send, Feather],
  hello: [Bird, Bird, Sparkle],
  about: [Orbit, Sparkle],
  projects: [Box, Box, Sparkle],
  experience: [Compass, Feather],
  certifications: [Star, Star, Sparkle],
  contact: [Send, Mail],
};

/** Tiny printed marks: each chapter has its own quiet movement vocabulary. */
export default memo(function SceneAtmosphere({ chapter }: { chapter: string }) {
  const marks = ornaments[chapter as keyof typeof ornaments];
  if (!marks) return null;
  const hasRelief = ["hello", "about", "projects", "experience"].includes(chapter);
  return (
    <div className={`scene-atmosphere atmosphere-${chapter}`} aria-hidden="true">
      {hasRelief && <><div className="canvas-relief relief-one ambient-loop" /><div className="canvas-relief relief-two" /></>}
      {hasRelief && <svg className="atmosphere-linework ambient-loop" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        {chapter === "hello" && <><path d="M-160 780C100 360 370 1140 570 900S1000 850 1540 220" /><circle cx="1290" cy="240" r="150" /><circle cx="1290" cy="240" r="174" /></>}
        {chapter === "about" && <><path d="M-100 720H180Q280 720 280 620V360Q280 260 380 260H1540" /><path d="M-100 748H190Q308 748 308 630V370Q308 288 390 288H1540" /><circle cx="1220" cy="250" r="220" /></>}
        {chapter === "projects" && <><ellipse cx="720" cy="650" rx="850" ry="400" /><ellipse cx="720" cy="650" rx="900" ry="430" /><ellipse cx="720" cy="650" rx="950" ry="460" /></>}
        {chapter === "experience" && <><path className="route-path" d="M1060-100V180Q1060 270 1150 270H1230Q1320 270 1320 360V650Q1320 740 1230 740H1100Q1010 740 1010 830V1100" />{[[1060,120],[1320,470],[1010,930]].map(([cx,cy]) => <g key={cy}><circle cx={cx} cy={cy} r="22" /><circle cx={cx} cy={cy} r="7" /></g>)}</>}
      </svg>}
      <div className="scene-ornaments">{marks.map((Mark, index) => <span key={index} className={`scene-ornament ornament-${index + 1} ambient-loop`}><Mark strokeWidth={1} /></span>)}</div>
      {hasRelief && <div className="scene-dust">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>}
    </div>
  );
});
