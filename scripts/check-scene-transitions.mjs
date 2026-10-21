import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

// Exercise the shipped functions without a second, test-only implementation.
function loadSource(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const moduleRecord = { exports: {} };
  vm.runInNewContext(output, { module: moduleRecord, exports: moduleRecord.exports, require: createRequire(import.meta.url) });
  return moduleRecord.exports;
}

const { sceneTransition, transitionKinds } = loadSource("../src/lib/scene-transition.ts");
const count = 7;
const pose = raw => sceneTransition(raw, count);
const samples = Array.from({ length: 1201 }, (_, index) => index / 200);
const down = samples.map(raw => JSON.stringify(pose(raw)));
const up = [...samples].reverse().map(raw => JSON.stringify(pose(raw))).reverse();
assert.deepEqual(down, up, "Reversing scroll must preserve the exact pose at every position");

for (const raw of samples) {
  const state = pose(raw);
  assert.ok(state.from >= 0 && state.to < count && state.to >= state.from);
  assert.ok(state.mix >= 0 && state.mix < 1);
  assert.ok(!/NaN|Infinity|-[\d.]+%/.test(state.clip), `Invalid clip at ${raw}`);
  assert.ok(transitionKinds.includes(state.kind));
}
for (let index = 0; index < count; index++) {
  for (const offset of [-1e-10, 0, 1e-10]) {
    const state = sceneTransition(index + offset, count);
    assert.equal(state.from, index);
    assert.equal(state.mix, 0, "Floating-point residue must not expose a neighbouring scene");
  }
}
assert.equal(sceneTransition(-10, count).from, 0);
assert.equal(sceneTransition(100, count).from, count - 1);
assert.equal(new Set(transitionKinds).size, 3);
console.log("Motion checks passed: 1,201 positions, forward/reverse parity, boundaries and three variants.");
