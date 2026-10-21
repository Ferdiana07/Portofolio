import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const output = ts.transpileModule(readFileSync(new URL("../src/lib/canvas-puzzle.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const moduleRecord = { exports: {} };
vm.runInNewContext(output, { module: moduleRecord, exports: moduleRecord.exports });
const { homePose, pieceSize, boundPiece, scatterPoses, withinSnap, PUZZLE_COUNT } = moduleRecord.exports;
const frames = [
  { width: 1440, height: 980, home: { x: 400, y: 319.2, width: 640, height: 548.8 } },
  { width: 1366, height: 768, home: { x: 363, y: 272, width: 640, height: 384 } },
  { width: 390, height: 844, home: { x: 19.5, y: 412.4, width: 351, height: 337.6 } },
  { width: 320, height: 568, home: { x: 16, y: 275.2, width: 288, height: 198.8 } },
  { width: 820, height: 1180, home: { x: 114.8, y: 560.6, width: 590.4, height: 507.4 } },
  { width: 844, height: 390, home: { x: 375.58, y: 90, width: 295.4, height: 195 } },
];
let corners = 0;
for (const frame of frames) {
  const { width, height } = pieceSize(frame);
  assert.ok(width >= 44 && height >= 44, "Touch targets must stay usable at the smallest supported viewport");
  for (let index = 0; index < PUZZLE_COUNT; index++) {
    const home = homePose(index, frame);
    assert.ok(withinSnap(boundPiece(home, frame), home, frame), "Manual dragging must be able to reach every home slot");
    assert.ok(!withinSnap({ ...home, x: home.x + 100 }, home, frame));
  }
  assert.equal(JSON.stringify(scatterPoses(frame, 42)), JSON.stringify(scatterPoses(frame, 42)), "Identical seeds preserve the arrangement");
  assert.notEqual(JSON.stringify(scatterPoses(frame, 42)), JSON.stringify(scatterPoses(frame, 43)), "A new round uses a new arrangement");
  for (let seed = 0; seed < 100; seed++) {
    const poses = scatterPoses(frame, seed);
    assert.equal(poses.length, PUZZLE_COUNT);
    for (const pose of poses) {
      const angle = pose.rotate * Math.PI / 180;
      for (const dx of [-width / 2, width / 2]) for (const dy of [-height / 2, height / 2]) {
        const x = pose.x + dx * Math.cos(angle) - dy * Math.sin(angle);
        const y = pose.y + dx * Math.sin(angle) + dy * Math.cos(angle);
        assert.ok(x >= 11.99 && x <= frame.width - 11.99);
        assert.ok(y >= (frame.height < 530 ? 75.99 : 91.99) && y <= frame.height - 115.99);
        corners++;
      }
      const extreme = boundPiece({ x: -9999, y: 9999, rotate: pose.rotate }, frame);
      assert.ok(Number.isFinite(extreme.x) && Number.isFinite(extreme.y));
    }
  }
}
console.log(`Puzzle checks passed: ${corners.toLocaleString()} rotated corners, six viewports, snap reachability and repeatable scatter.`);
