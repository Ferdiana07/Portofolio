export type PuzzleFrame = { width: number; height: number };
export type PuzzlePose = { x: number; y: number; rotate: number };
export const PUZZLE_PIECES = 12;

export function pieceSize(frame: PuzzleFrame) {
  return { width: frame.width * .155, height: frame.height * .325 };
}

/** Deterministic arrangements: event-driven, with no idle physics loop. */
export function puzzleLayout(frame: PuzzleFrame, broken: boolean, seed: number): PuzzlePose[] {
  const size = pieceSize(frame);
  const order = Array.from({ length: PUZZLE_PIECES }, (_, index) => index);
  let random = (seed + 1) >>> 0;
  for (let index = order.length - 1; index > 0; index--) {
    random = (Math.imul(random, 1664525) + 1013904223) >>> 0;
    const swap = random % (index + 1);
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order.map((slot, index) => {
    if (broken) return {
      x: (slot % 6 + .5) * frame.width / 6 - size.width / 2,
      y: (Math.floor(slot / 6) + .5) * frame.height * .78 / 2 - size.height / 2,
      rotate: ((index * 17 + seed * 11) % 25) - 12,
    };
    const sheet = Math.floor(index / 4);
    const column = index % 2;
    const row = Math.floor(index % 4 / 2);
    const rotate = [-17, 6, 23][sheet];
    const radians = rotate * Math.PI / 180;
    const dx = (column - .5) * size.width;
    const dy = (row - .5) * size.height;
    return {
      x: [.10, .36, .60][sheet] * frame.width + size.width / 2 + dx * Math.cos(radians) - dy * Math.sin(radians),
      y: .16 * frame.height + size.height / 2 + dx * Math.sin(radians) + dy * Math.cos(radians) + [16, -20, 22][sheet] * frame.height / 560,
      rotate,
    };
  });
}

export function boundPiece(x: number, y: number, frame: PuzzleFrame) {
  const size = pieceSize(frame);
  return {
    x: Math.max(0, Math.min(frame.width - size.width, x)),
    y: Math.max(0, Math.min(frame.height * .78 - size.height, y)),
  };
}
