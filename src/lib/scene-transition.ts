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
  let clip = "none";
  let transform = "none";
  if (kind === "iris") {
    clip = `circle(${(mix * 110).toFixed(4)}% at 50% 52%)`;
    transform = `scale(${(1 + remaining * .07).toFixed(5)})`;
  } else if (kind === "curtain") {
    clip = `inset(0 ${(remaining * 100).toFixed(4)}% 0 0)`;
    transform = `translate3d(${(remaining * 3).toFixed(4)}%,0,0)`;
  } else {
    clip = `inset(${(remaining * 100).toFixed(4)}% 0 0 0 round ${(remaining * 42).toFixed(4)}% ${(remaining * 42).toFixed(4)}% 0 0)`;
    transform = `translate3d(0,${(remaining * 4).toFixed(4)}%,0)`;
  }
  return { progress, from, to, mix, kind, clip, transform, baseTransform: mix ? `scale(${(1 + mix * .025).toFixed(5)})` : "none" };
}
