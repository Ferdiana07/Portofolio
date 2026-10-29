export const transitionKinds = ["iris", "curtain", "arch", "fold", "aperture", "sweep"] as const;

/** A pose depends only on position, never on the last scroll direction. */
export function sceneTransition(position: number, count: number) {
  const bounded = Math.max(0, Math.min(count - 1, position));
  const rounded = Math.round(bounded);
  const progress = Math.abs(bounded - rounded) < .00001 ? rounded : bounded;
  const from = Math.floor(progress);
  const to = Math.min(from + 1, count - 1);
  const mix = progress - from;
  const kind = transitionKinds[from % transitionKinds.length];
  const remaining = 1 - mix;
  const alternate = from % 2 === 0 ? 1 : -1;
  let clip = "none";
  let transform = "none";
  let baseTransform = "none";
  let origin = "50% 50%";
  if (kind === "iris") {
    const centerX = alternate > 0 ? 43 : 57;
    const centerY = alternate > 0 ? 54 : 46;
    clip = `ellipse(${(mix * 142).toFixed(4)}% ${(mix * 156).toFixed(4)}% at ${centerX}% ${centerY}%)`;
    transform = `scale(${(.97 + mix * .03).toFixed(5)}) rotate(${(alternate * remaining * .2).toFixed(4)}deg)`;
    baseTransform = `scale(${(1 - mix * .018).toFixed(5)}) rotate(${(-alternate * mix * .1).toFixed(4)}deg)`;
    origin = `${centerX}% ${centerY}%`;
  } else if (kind === "curtain") {
    const lead = Math.min(100, mix * 110);
    const trail = Math.min(100, mix * 102);
    clip = alternate > 0
      ? `polygon(0 0,${lead.toFixed(4)}% 0,${trail.toFixed(4)}% 100%,0 100%)`
      : `polygon(${(100 - lead).toFixed(4)}% 0,100% 0,100% 100%,${(100 - trail).toFixed(4)}% 100%)`;
    transform = `translate3d(${(alternate * remaining * 2.2).toFixed(4)}%,0,0) scale(${(.986 + mix * .014).toFixed(5)})`;
    baseTransform = `translate3d(${(-alternate * mix * .7).toFixed(4)}%,0,0) scale(${(1 - mix * .009).toFixed(5)})`;
    origin = alternate > 0 ? "0% 50%" : "100% 50%";
  } else if (kind === "arch") {
    const radius = remaining * 46;
    clip = alternate > 0
      ? `inset(${(remaining * 100).toFixed(4)}% 0 0 0 round ${radius.toFixed(4)}% ${radius.toFixed(4)}% 0 0)`
      : `inset(0 0 ${(remaining * 100).toFixed(4)}% 0 round 0 0 ${radius.toFixed(4)}% ${radius.toFixed(4)}%)`;
    transform = `translate3d(0,${(alternate * remaining * 2.7).toFixed(4)}%,0) scale(${(.984 + mix * .016).toFixed(5)})`;
    baseTransform = `translate3d(0,${(-alternate * mix * .72).toFixed(4)}%,0) scale(${(1 - mix * .01).toFixed(5)})`;
    origin = alternate > 0 ? "50% 100%" : "50% 0%";
  } else if (kind === "fold") {
    const edge = mix * 100;
    const tip = Math.min(100, edge + Math.sin(Math.PI * mix) * 11);
    clip = alternate > 0
      ? `polygon(0 0,${edge.toFixed(4)}% 0,${tip.toFixed(4)}% 50%,${edge.toFixed(4)}% 100%,0 100%)`
      : `polygon(${(100 - edge).toFixed(4)}% 0,100% 0,100% 100%,${(100 - edge).toFixed(4)}% 100%,${(100 - tip).toFixed(4)}% 50%)`;
    transform = `translate3d(${(alternate * remaining * 1.7).toFixed(4)}%,0,0) scale(${(.989 + mix * .011).toFixed(5)}) rotateY(${(alternate * remaining * .7).toFixed(4)}deg)`;
    baseTransform = `translate3d(${(-alternate * mix * .55).toFixed(4)}%,0,0) scale(${(1 - mix * .008).toFixed(5)})`;
    origin = alternate > 0 ? "0% 50%" : "100% 50%";
  } else if (kind === "aperture") {
    const inset = remaining * 50;
    const radius = 12 + remaining * 24;
    clip = `inset(${inset.toFixed(4)}% ${inset.toFixed(4)}% round ${radius.toFixed(4)}px)`;
    transform = `scale(${(.95 + mix * .05).toFixed(5)}) rotate(${(alternate * remaining * .16).toFixed(4)}deg)`;
    baseTransform = `scale(${(1 - mix * .016).toFixed(5)})`;
    origin = `${alternate > 0 ? 47 : 53}% 50%`;
  } else {
    const edge = Math.min(100, mix * 108);
    const wave = Math.sin(Math.PI * mix) * 8;
    if (alternate > 0) {
      const side = 100 - edge;
      const center = Math.max(0, side - wave);
      clip = `polygon(0 ${side.toFixed(4)}%,50% ${center.toFixed(4)}%,100% ${side.toFixed(4)}%,100% 100%,0 100%)`;
    } else {
      const center = Math.min(100, edge + wave);
      clip = `polygon(0 0,100% 0,100% ${edge.toFixed(4)}%,50% ${center.toFixed(4)}%,0 ${edge.toFixed(4)}%)`;
    }
    transform = `translate3d(0,${(alternate * remaining * 2.4).toFixed(4)}%,0) scale(${(.987 + mix * .013).toFixed(5)})`;
    baseTransform = `translate3d(0,${(-alternate * mix * .65).toFixed(4)}%,0) scale(${(1 - mix * .009).toFixed(5)})`;
    origin = alternate > 0 ? "50% 100%" : "50% 0%";
  }
  return { progress, from, to, mix, kind, clip, transform, baseTransform: mix ? baseTransform : "none", origin };
}
