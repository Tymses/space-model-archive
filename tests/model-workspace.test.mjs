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
  assert.doesNotMatch(parser, /\bdebugger\b/);
});

test("NASA Deep Impact and Wrench records point to model-specific sources", () => {
  const index = JSON.parse(read("data/nasa-model-index.json"));
  const deepImpact = index.files.filter(item => /deep impact|epoxi/i.test(item.name));
  assert.equal(deepImpact.length, 3);
  assert.ok(deepImpact.every(item => item.sourceUrl === "https://science.nasa.gov/3d-resources/deep-impact/"));

  const wrenches = index.files.filter(item => /wrench/i.test(item.name));
  const stl = wrenches.filter(item => item.format === "STL");
  const glb = wrenches.filter(item => item.format === "GLB");
  assert.equal(stl.length, 1, "duplicate Wrench STL records must not be listed twice");
  assert.equal(stl[0].name, "ISS 3D-printed Wrench");
  assert.equal(stl[0].sourceUrl, "https://science.nasa.gov/3d-resources/wrench-2/");
  assert.match(stl[0].file, /International%20Space%20Station%20Tools\/wrench\.stl$/);
  assert.equal(glb.length, 1);
  assert.equal(glb[0].name, "Wrench (GLB model)");
  assert.equal(glb[0].kind, "Tool / mission hardware");
  assert.equal(glb[0].sourceUrl, "https://science.nasa.gov/3d-resources/wrench-2/");
});

test("NASA source links use official NASA pages rather than GitHub repository folders", () => {
  const index = JSON.parse(read("data/nasa-model-index.json"));
  const byId = new Map(index.files.map(item => [item.id, item]));
  const expected = {
    "nasa-auto-6779e0fd7d41": "https://science.nasa.gov/3d-resources/curiosity-scarescrow-test-rover/",
    "nasa-auto-fae6c14137ae": "https://science.nasa.gov/3d-resources/g292-01-8-supernova-remnant/",
    "nasa-auto-7f1f2a785853": "https://science.nasa.gov/3d-resources/gateway-lunar-space-station/",
    "nasa-auto-62d260861742": "https://science.nasa.gov/3d-resources/pioneer/",
    "nasa-auto-164dd4594a7b": "https://science.nasa.gov/3d-resources/",
    "nasa-auto-3159443bc1e2": "https://science.nasa.gov/mission/sdo/",
    "nasa-auto-e3bd379865ff": "https://science.nasa.gov/earth/earth-observatory/solar-radiation-and-climate-experiment-sorce-fact-sheet/",
    "nasa-auto-f4f7e17d18c2": "https://science.nasa.gov/3d-resources/",
    "nasa-auto-e581425c8d36": "https://science.nasa.gov/mission/stereo/",
    "nasa-auto-ae543fdbdccb": "https://science.nasa.gov/3d-resources/solar-and-heliospheric-observatory-soho/",
    "nasa-auto-5f06eab80de7": "https://science.nasa.gov/3d-resources/x-57-maxwell/",
    "nasa-auto-1b9a809402d2": "https://science.nasa.gov/3d-resources/x-57-maxwell/",
    "nasa-auto-74bc0bbbc9d0": "https://science.nasa.gov/3d-resources/curiosity-landing-site/",
    "nasa-auto-64780f1e28d6": "https://science.nasa.gov/3d-resources/curiosity-rover-path/",
    "nasa-auto-598a68f4b58d": "https://science.nasa.gov/3d-resources/gale-crater/",
    "nasa-auto-ccb45d9c34c3": "https://science.nasa.gov/3d-resources/linne-crater/",
    "nasa-auto-439c1921ce5a": "https://science.nasa.gov/3d-resources/mars-trek-inside-gale-crater/",
    "nasa-auto-96407e3e20a6": "https://science.nasa.gov/3d-resources/mars-spirit-landing-site/",
    "nasa-auto-68dc14b2f6b0": "https://science.nasa.gov/3d-resources/mars-spirit-rover-path/",
    "nasa-auto-ce50399914d8": "https://science.nasa.gov/3d-resources/mars-tharsis/",
    "nasa-auto-94435a690d2b": "https://science.nasa.gov/3d-resources/mars-trek-valles-marineris/",
    "nasa-auto-c580ba647024": "https://science.nasa.gov/3d-resources/mars-valles-marineris-c/",
    "nasa-auto-385bd61c5494": "https://science.nasa.gov/3d-resources/mars-valles-marineris/",
    "nasa-auto-1e0e36115cea": "https://science.nasa.gov/3d-resources/mars-valles-marineris/",
    "nasa-auto-f75c3135019f": "https://science.nasa.gov/3d-resources/mars-valles-marineris/",
    "nasa-auto-ed59ef8f86ff": "https://science.nasa.gov/3d-resources/mars-trek-victoria-crater/",
    "nasa-auto-ee89f1e3db79": "https://science.nasa.gov/3d-resources/moon-aristarchus-region/",
    "nasa-auto-1290df0fc033": "https://science.nasa.gov/3d-resources/moon-copernicus-crater/",
    "nasa-auto-cd819130e643": "https://science.nasa.gov/3d-resources/moon-gassendi-crater/",
    "nasa-auto-6ba7dbf39798": "https://science.nasa.gov/3d-resources/moon-mount-hadley/",
    "nasa-auto-1c395de28d7a": "https://science.nasa.gov/3d-resources/moon-tycho/",
    "nasa-auto-df9141da74d9": "https://science.nasa.gov/3d-resources/opportunity-landing-site/"
  };
  for (const [id, url] of Object.entries(expected)) assert.equal(byId.get(id)?.sourceUrl, url, id);
});

test("STL conversion is launched from the View Details header, not collection cards", () => {
  const app = read("app.js");
  const html = read("index.html");
  assert.doesNotMatch(app, /data-convert-model|data-convert-archive/);
  assert.match(app, /detail-convert-stl/);
  assert.match(app, /supportsStlConversion\(model\.format\)/);
  assert.match(html, /class="detail-title-line"/);
  assert.match(html, /id="detail-convert-stl"/);
  assert.match(app, /archiveCardNote/);
  assert.match(app, /data-open-counterpart/);
  assert.match(app, /async function convertActiveModelToStl/);
  assert.match(app, /action","describe"/);
  assert.match(html, /id="scaling-convert-stl"/);
  assert.match(html, /id="scaling-model-description"/);
  assert.match(html, /\.blend/);
  assert.match(html, /\.step/);
});

test("compressed STEP format labels are normalized before loader dispatch", () => {
  const app = read("app.js");
  const start = app.indexOf("function normalizeConversionFormat(");
  const end = app.indexOf("\nfunction supportsStlConversion", start);
  assert.ok(start >= 0 && end > start, "format normalizer must be defined");
  const normalize = new Function(app.slice(start, end) + "\nreturn normalizeConversionFormat;")();
  assert.equal(normalize("STEP (GZIP)"), "STEP");
  assert.equal(normalize("STEP GZ"), "STEP");
  assert.equal(normalize("STEP"), "STEP");
  assert.equal(normalize("BLEND"), "BLEND");
});

test("failed OpenCascade initialization can be retried", () => {
  const app = read("app.js");
  assert.match(app, /occtPromise=attempt\.catch\(error=>\{occtPromise=null;occtScriptPromise=null;throw error;\}\)/);
});

test("Worker only proxies newly supported geometry extensions from approved hosts", () => {
  const worker = read("cloudflare/jpl-proxy.js");
  assert.match(worker, /\["blend", "application\/octet-stream"\]/);
  assert.match(worker, /\["step", "application\/step"\]/);
  assert.match(worker, /\["fbx", "application\/octet-stream"\]/);
  assert.match(worker, /\["gz", "application\/gzip"\]/);
  assert.match(worker, /const DESCRIPTION_HOSTS = new Set/);
  assert.match(worker, /action"\) === "describe"/);
  assert.match(worker, /file format does not establish the object\x27s real-world scale/);
});

test("BLEND importer supports Zstandard and gzip compressed projects", () => {
  const importer = read("vendor/blend-importer.js");
  assert.match(importer, /fzstd@0\.1\.1/);
  assert.match(importer, /DecompressionStream\('gzip'\)/);
  assert.match(importer, /export function createObjects/);
});

test("source descriptions are included only when they identify the selected model", () => {
  const worker = read("cloudflare/jpl-proxy.js");
  const start = worker.indexOf("function sourceDescriptionMatchesModel(");
  const end = worker.indexOf("\nasync function describeArchiveModel", start);
  assert.ok(start >= 0 && end > start, "model identity matcher must exist");
  const matcher = new Function(worker.slice(start, end) + "\nreturn sourceDescriptionMatchesModel;")();

  const genericSpaceRadar = {
    title: "Space Radar",
    summary: "One of Space Radar's own 3D models of a spacecraft, to turn and zoom. Made to be embedded: see models.spaceradar.ai for the catalog."
  };
  assert.equal(matcher("Deep Impact", genericSpaceRadar), false);
  assert.equal(matcher("Apollo Csm", genericSpaceRadar), false);

  const deepImpactPage = {
    title: "Deep Impact / EPOXI",
    summary: "The Deep Impact spacecraft mission and its EPOXI extended mission."
  };
  assert.equal(matcher("Deep Impact", deepImpactPage), true);
  assert.equal(matcher("EPOXI", deepImpactPage), true);
  assert.equal(matcher("Didymos", deepImpactPage), false);
});

test("generated descriptions never append conflicting free-text model kinds", () => {
  const worker = read("cloudflare/jpl-proxy.js");
  assert.match(worker, /Do not mix free-text "kind" labels/);
  assert.match(worker, /Matching original source page summary/);
});

test("NASA satellite models are classified as spacecraft, not planetary surface features", () => {
 const index=JSON.parse(read("data/nasa-model-index.json"));const byId=new Map(index.files.map(item=>[item.id,item]));
 for(const id of ["nasa-auto-8bb9044d2bf0","nasa-auto-9939a1032569","nasa-auto-68ce25824a7a","nasa-auto-d0ea1fde4097","nasa-auto-311a2780b948","nasa-auto-420d5ed71dcd","nasa-auto-75cc8e54cb2c"])assert.equal(byId.get(id)?.category,"spacecraft",id);
});
test("NASA terrain cross-listings reuse the verified original source page", () => {
 const index=JSON.parse(read("data/nasa-model-index.json"));const byId=new Map(index.files.map(item=>[item.id,item]));
 for(const [id,url] of Object.entries({"nasa-auto-74bc0bbbc9d0":"https://science.nasa.gov/3d-resources/curiosity-landing-site/","nasa-auto-64780f1e28d6":"https://science.nasa.gov/3d-resources/curiosity-rover-path/","nasa-auto-598a68f4b58d":"https://science.nasa.gov/3d-resources/gale-crater/","nasa-auto-ccb45d9c34c3":"https://science.nasa.gov/3d-resources/linne-crater/","nasa-auto-439c1921ce5a":"https://science.nasa.gov/3d-resources/mars-trek-inside-gale-crater/","nasa-auto-96407e3e20a6":"https://science.nasa.gov/3d-resources/mars-spirit-landing-site/","nasa-auto-68dc14b2f6b0":"https://science.nasa.gov/3d-resources/mars-spirit-rover-path/","nasa-auto-ce50399914d8":"https://science.nasa.gov/3d-resources/mars-tharsis/","nasa-auto-94435a690d2b":"https://science.nasa.gov/3d-resources/mars-trek-valles-marineris/","nasa-auto-c580ba647024":"https://science.nasa.gov/3d-resources/mars-valles-marineris-c/","nasa-auto-385bd61c5494":"https://science.nasa.gov/3d-resources/mars-valles-marineris/","nasa-auto-1e0e36115cea":"https://science.nasa.gov/3d-resources/mars-valles-marineris/","nasa-auto-f75c3135019f":"https://science.nasa.gov/3d-resources/mars-valles-marineris/","nasa-auto-ed59ef8f86ff":"https://science.nasa.gov/3d-resources/mars-trek-victoria-crater/","nasa-auto-ee89f1e3db79":"https://science.nasa.gov/3d-resources/moon-aristarchus-region/","nasa-auto-1290df0fc033":"https://science.nasa.gov/3d-resources/moon-copernicus-crater/","nasa-auto-cd819130e643":"https://science.nasa.gov/3d-resources/moon-gassendi-crater/","nasa-auto-6ba7dbf39798":"https://science.nasa.gov/3d-resources/moon-mount-hadley/","nasa-auto-1c395de28d7a":"https://science.nasa.gov/3d-resources/moon-tycho/","nasa-auto-df9141da74d9":"https://science.nasa.gov/3d-resources/opportunity-landing-site/"})){assert.equal(byId.get(id)?.sourceUrl,url,id);const cross=byId.get(id+"-heightmap");if(cross)assert.equal(cross.sourceUrl,url,id+"-heightmap");}
});
test("NASA source resolver never substitutes a GitHub mirror folder for a source page", () => {
 const app=read("app.js");assert.match(app,/model\.sourcePageUrl=verifiedPage\|\|suppliedNasaPage\|\|"https:\/\/science\.nasa\.gov\/3d-resources\//);
});
