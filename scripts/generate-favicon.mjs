import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";

// icon.svg is the editable master. Export a multi-size ICO for browser fallback.
// Sharp is already provided by Next.js; no added package or runtime endpoint.
const source = await readFile(new URL("../src/app/icon.svg", import.meta.url));
const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map(size => sharp(source, { density: 384 }).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (let index = 0; index < sizes.length; index++) {
  const metadata = await sharp(images[index]).metadata();
  assert.equal(metadata.width, sizes[index]);
  assert.equal(metadata.height, sizes[index]);
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
const ico = Buffer.concat([directory, ...images]);
assert.equal(ico.length, offset);
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), ico);
console.log(`CFS favicon exported: ${sizes.join(", ")}px; ${ico.length} bytes.`);
