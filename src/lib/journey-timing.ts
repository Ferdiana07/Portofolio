/** One chapter has a reading pause, then a gradual, staged camera transition. */
export const CHAPTER_VIEWPORTS = 3.2;
export const CHAPTER_HOLD = 0.42;

export function scenePosition(raw: number, count: number) {
  const bounded = Math.max(0, Math.min(count - 1, raw));
  const chapter = Math.floor(bounded);
  const phase = Math.max(0, Math.min(1, (bounded - chapter - CHAPTER_HOLD) / (1 - CHAPTER_HOLD)));
  // Quintic ease in-out for silky smooth camera transitions
  const smooth = phase * phase * phase * (phase * (phase * 6 - 15) + 10);
  return chapter + smooth;
}

