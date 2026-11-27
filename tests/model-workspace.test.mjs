import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("application, Worker and local Blender importer are valid JavaScript", () => {
  const app = read("app.js");
  const worker = read("cloudflare/jpl-proxy.js");
  const importer = read("vendor/blend-importer.js");
  const parser = read("vendor/blend-parser.js");
  assert.doesNotThrow(() => new Function(app));
  assert.doesNotThrow(() => new Function(worker.replace("export default {", "return {")));
  const importerScript = importer
    .replace(/^import .*;$/gm, "")
    .replace(/export function /g, "function ")
    .replace(/export async function /g, "async function ");
  assert.doesNotThrow(() => new Function("THREE", "parser", importerScript));
  assert.doesNotThrow(() => new Function(parser.replace("export default return_object;", "return return_object;")));
});

test("NASA Deep Impact and Wrench records point to model-specific sources", () => {
  const index = JSON.parse(read("data/nasa-model-index.json"));
  const deepImpact = index.files.filter(item => /deep impact|epoxi/i.test(item.name));
  assert.equal(deepImpact.length, 3);
  assert.ok(deepImpact.every(item => item.sourceUrl === "https://science.nasa.gov/3d-resources/deep-impact/"));

  const wrenches = index.files.filter(item => item.name.toLowerCase() === "wrench");
  const stl = wrenches.filter(item => item.format === "STL");
  const glb = wrenches.filter(item => item.format === "GLB");
  assert.equal(stl.length, 1, "duplicate Wrench STL records must not be listed twice");
  assert.equal(stl[0].sourceUrl, "https://science.nasa.gov/3d-resources/wrench-2/");
  assert.match(stl[0].file, /International%20Space%20Station%20Tools%2Fwrench\.stl$/);
  assert.equal(glb.length, 1);
  assert.match(glb[0].sourceUrl, /^https:\/\/github\.com\/nasa\/NASA-3D-Resources\/tree\/master\/3D%20Models\/Wrench$/);
});

test("archive cards and print workspace expose the new conversion and description flows", () => {
  const app = read("app.js");
  const html = read("index.html");
  assert.match(app, /data-convert-model/);
  assert.match(app, /data-convert-archive/);
  assert.match(app, /async function convertActiveModelToStl/);
  assert.match(app, /action","describe"/);
  assert.match(html, /id="scaling-convert-stl"/);
  assert.match(html, /id="scaling-model-description"/);
  assert.match(html, /\.blend/);
  assert.match(html, /\.step/);
});

test("Worker only proxies newly supported geometry extensions from approved hosts", () => {
  const worker = read("cloudflare/jpl-proxy.js");
  assert.match(worker, /\["blend", "application\/octet-stream"\]/);
  assert.match(worker, /\["step", "application\/step"\]/);
  assert.match(worker, /\["fbx", "application\/octet-stream"\]/);
  assert.match(worker, /\["gz", "application\/gzip"\]/);
  assert.match(worker, /const DESCRIPTION_HOSTS = new Set/);
  assert.match(worker, /action"\) === "describe"/);
});

test("BLEND importer supports Zstandard and gzip compressed projects", () => {
  const importer = read("vendor/blend-importer.js");
  assert.match(importer, /fzstd@0\.1\.1/);
  assert.match(importer, /DecompressionStream\('gzip'\)/);
  assert.match(importer, /export function createObjects/);
});
