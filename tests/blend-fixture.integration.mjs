import assert from "node:assert/strict";
import parser from "../vendor/blend-parser.js";

const source = "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/InSight%20Cruise%20Stage/InSight%20Cruise%20Stage%20%28final%29.blend";
const expectedBytes = 21801160;
const response = await fetch(source, { headers: { "User-Agent": "SPACEMESHER-BLEND-Integration-Test/1.0" } });
assert.equal(response.status, 200, "NASA fixture download must return HTTP 200");
const declared = Number(response.headers.get("content-length"));
if (Number.isFinite(declared) && declared > 0) assert.equal(declared, expectedBytes, "NASA fixture Content-Length changed");
const buffer = await response.arrayBuffer();
assert.equal(buffer.byteLength, expectedBytes, "NASA fixture must be downloaded completely");
assert.equal(new TextDecoder().decode(new Uint8Array(buffer, 0, 7)), "BLENDER", "NASA fixture must have a Blender header");

const parsed = await new Promise((resolve, reject) => {
  parser.onParseReady = (file, error) => error || !file ? reject(new Error(String(error || "Parser returned no file"))) : resolve(file);
  try { parser.loadBlendFromArrayBuffer(buffer); } catch (error) { reject(error); }
});
assert.ok(parsed && Array.isArray(parsed.object_array), "Parser must return Blender datablocks");
assert.ok(parsed.object_array.length > 0, "Parser must return non-empty Blender datablocks");
const meshes = parsed.objects?.Mesh || [];
assert.ok(meshes.length > 0, "NASA InSight fixture must contain parsed Mesh datablocks");
console.log(JSON.stringify({ bytes: buffer.byteLength, datablocks: parsed.object_array.length, meshDatablocks: meshes.length, status: "BLEND_PARSE_OK" }));
