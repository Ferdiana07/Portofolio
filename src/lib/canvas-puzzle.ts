/** Geometry only: no renderer, physics engine, or per-frame React state. */
export type PuzzlePose = { x: number; y: number; rotate: number };
export type PuzzleFrame = {
  width: number; height: number;
  home: { x: number; y: number; width: number; height: number };
};
export const PUZZLE_COUNT = 12;
export const CARD_ANGLES = [-14, 4, 17] as const;

export function pieceSize(frame: PuzzleFrame) {
  return { width: frame.home.width * .155, height: frame.home.height * .32 };
}

export function homePose(index: number, frame: PuzzleFrame): PuzzlePose {
  const card = Math.floor(index / 4);
  const col = index % 2;
  const row = Math.floor(index / 2) % 2;
  const size = pieceSize(frame);
  const angle = CARD_ANGLES[card] * Math.PI / 180;
  const dx = (col - .5) * size.width;
  const dy = (row - .5) * size.height;
  return {
    x: frame.home.x + frame.home.width * (.255 + card * .25) + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: frame.home.y + frame.home.height * .42 + dx * Math.sin(angle) + dy * Math.cos(angle),
    rotate: CARD_ANGLES[card],
  };
}

/** Keep every rotated corner on screen and leave the header/dock usable. */
export function boundPiece(pose: PuzzlePose, frame: PuzzleFrame): PuzzlePose {
  const size = pieceSize(frame);
  const angle = pose.rotate * Math.PI / 180;
  const rx = (Math.abs(Math.cos(angle)) * size.width + Math.abs(Math.sin(angle)) * size.height) / 2;
  const ry = (Math.abs(Math.sin(angle)) * size.width + Math.abs(Math.cos(angle)) * size.height) / 2;
  const top = frame.height < 530 ? 76 : 92;
  const bottom = frame.height - 116;
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(Math.max(min, max), n));
  return { x: clamp(pose.x, 12 + rx, frame.width - 12 - rx), y: clamp(pose.y, top + ry, bottom - ry), rotate: pose.rotate };
}

/** Stratified scatter reaches the whole viewport, rather than a small art box. */
export function scatterPoses(frame: PuzzleFrame, seed: number): PuzzlePose[] {
  let state = seed >>> 0;
  const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const cols = frame.width / frame.height > 2 ? 6 : frame.width < 768 ? 3 : 4;
  const rows = PUZZLE_COUNT / cols;
  const slots = Array.from({ length: PUZZLE_COUNT }, (_, i) => i);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  const top = frame.height < 530 ? 76 : 92;
  const bottom = frame.height - (frame.height < 530 ? 116 : 164);
  return slots.map(slot => boundPiece({
    x: (slot % cols + .5 + (random() - .5) * .28) * frame.width / cols,
    y: top + (Math.floor(slot / cols) + .5 + (random() - .5) * .26) * (bottom - top) / rows,
    rotate: (random() - .5) * 100,
  }, frame));
}

export function withinSnap(pose: PuzzlePose, home: PuzzlePose, frame: PuzzleFrame) {
  return Math.hypot(pose.x - home.x, pose.y - home.y) <= Math.max(30, Math.min(56, pieceSize(frame).width * .55));
}
