export const transitionKinds = ["iris", "curtain", "arch", "curtain", "iris", "arch"] as const;

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
    clip = `ellipse(${(mix * 118).toFixed(4)}% ${(mix * 132).toFixed(4)}% at ${centerX}% ${centerY}%)`;
    transform = `scale(${(.945 + mix * .055).toFixed(5)}) rotate(${(alternate * remaining * .32).toFixed(4)}deg)`;
    baseTransform = `scale(${(1 - mix * .024).toFixed(5)}) rotate(${(-alternate * mix * .16).toFixed(4)}deg)`;
    origin = `${centerX}% ${centerY}%`;
  } else if (kind === "curtain") {
    const lead = Math.min(100, mix * 112);
    const trail = Math.min(100, mix * 101);
    clip = alternate > 0
      ? `polygon(0 0,${lead.toFixed(4)}% 0,${trail.toFixed(4)}% 100%,0 100%)`
      : `polygon(${(100 - lead).toFixed(4)}% 0,100% 0,100% 100%,${(100 - trail).toFixed(4)}% 100%)`;
    transform = `translate3d(${(alternate * remaining * 2.8).toFixed(4)}%,0,0) scale(${(.982 + mix * .018).toFixed(5)})`;
    baseTransform = `translate3d(${(-alternate * mix * 1.25).toFixed(4)}%,0,0) scale(${(1 - mix * .012).toFixed(5)})`;
    origin = alternate > 0 ? "0% 50%" : "100% 50%";
  } else {
    const radius = remaining * 46;
    clip = alternate > 0
      ? `inset(${(remaining * 100).toFixed(4)}% 0 0 0 round ${radius.toFixed(4)}% ${radius.toFixed(4)}% 0 0)`
      : `inset(0 0 ${(remaining * 100).toFixed(4)}% 0 round 0 0 ${radius.toFixed(4)}% ${radius.toFixed(4)}%)`;
    transform = `translate3d(0,${(alternate * remaining * 3.6).toFixed(4)}%,0) scale(${(.978 + mix * .022).toFixed(5)})`;
    baseTransform = `translate3d(0,${(-alternate * mix * 1.1).toFixed(4)}%,0) scale(${(1 - mix * .014).toFixed(5)})`;
    origin = alternate > 0 ? "50% 100%" : "50% 0%";
  }
  return { progress, from, to, mix, kind, clip, transform, baseTransform: mix ? baseTransform : "none", origin };
}
