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
    .replace(/export async function /g, "async function ")
    .replace(/export const /g, "const ");
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
  assert.match(importer, /DecompressionStream\(["\']gzip["\']\)/);
  assert.match(importer, /export function createObjects/);
});

test("BLEND header validation distinguishes valid, truncated, HTML and unsupported headers",()=>{
 const source=read("vendor/blend-importer.js"),start=source.indexOf("export function inspectBlendHeader("),end=source.indexOf("\nasync function readLimitedStream",start);
 assert.ok(start>=0&&end>start);
 const inspect=new Function(source.slice(start,end).replace("export function ","function ")+"\nreturn inspectBlendHeader;")();
 const valid=new TextEncoder().encode("BLENDER-v405").buffer;
 assert.deepEqual(inspect(valid),{version:"4.5",versionCode:"405",pointerSize:8,endian:"little"});
 const bigEndian=new TextEncoder().encode("BLENDER-V405").buffer;
 assert.equal(inspect(bigEndian).endian,"big");
 assert.throws(()=>inspect(new ArrayBuffer(8)),/BLEND_INVALID_HEADER/);
 assert.throws(()=>inspect(new TextEncoder().encode("<html>error!!").buffer),/BLEND_NOT_A_FILE/);
 assert.throws(()=>inspect(new TextEncoder().encode("NOTBLENDxxxx").buffer),/BLEND_INVALID_HEADER/);
});

test("BLEND decompression and parsing enforce bounded, validated input",()=>{
 const importer=read("vendor/blend-importer.js"),app=read("app.js"),parser=read("vendor/blend-parser.js");
 assert.match(importer,/MAX_BLEND_BYTES = 75 \* 1024 \* 1024/);
 assert.match(importer,/readLimitedStream\(new Blob\(\[buffer\]\)\.stream\(\)\.pipeThrough\(new DecompressionStream\("gzip"\)\), MAX_BLEND_BYTES\)/);
 assert.match(importer,/BLEND_DECOMPRESSION_FAILED/);
 assert.match(importer,/BLEND_UNSUPPORTED_ENDIAN/);
 assert.match(app,/Content-Length/);
 assert.match(app,/BLEND_TOO_LARGE/);
 assert.match(parser,/ERROR = null;/);
});

test("BLEND loader can skip invalid objects while preserving valid mesh objects",()=>{
 const importer=read("vendor/blend-importer.js"),app=read("app.js");
 assert.match(importer,/createObjects\(file, options = \{\}\)/);
 assert.match(importer,/options\.onMeshError\(diagnostic\)/);
 assert.match(app,/createObjects\(parsed\.file,\{onMeshError:diagnostic=>meshDiagnostics\.push\(diagnostic\),onAnnotationExcluded:diagnostic=>annotationDiagnostics\.push\(diagnostic\)\}\)/);
 assert.match(app,/loaded .* valid mesh\(es\); skipped .* invalid mesh object\(s\)/);
 assert.match(app,/BLEND_NO_VALID_MESH/);
 assert.match(app,/missing topology is never invented/);
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

test("NASA Pahrump Hills source records use the official NASA catalogue when no model detail page is verified", () => {
 const index=JSON.parse(read("data/nasa-model-index.json"));const byId=new Map(index.files.map(item=>[item.id,item]));
 for(const id of ["nasa-auto-054edfd18207","nasa-auto-d4c3298e3f16"])assert.equal(byId.get(id)?.sourceUrl,"https://science.nasa.gov/3d-resources/",id);
});

test("Pahrump Hills terrain cross-listings do not retain GitHub source folders", () => {
 const index=JSON.parse(read("data/nasa-model-index.json"));const byId=new Map(index.files.map(item=>[item.id,item]));
 for(const id of ["nasa-auto-054edfd18207-heightmap","nasa-auto-d4c3298e3f16-heightmap"])assert.equal(byId.get(id)?.sourceUrl,"https://science.nasa.gov/3d-resources/",id);
});


test("terrain collection uses its editorial public name and preserves its stable route key",()=>{const app=read("app.js"),html=read("index.html");assert.match(app,/"height-maps":\{title:"Terrain data & printable terrain"/);assert.match(html,/data-category="height-maps"[\s\S]*?Terrain data &amp; printable terrain/);});
test("NASA terrain cross-listings are visible on cards and detail pages",()=>{const app=read("app.js"),html=read("index.html");assert.match(app,/function findCrossListedModel\(model\)/);assert.match(app,/Also in:/);assert.match(app,/#detail-cross-listings/);assert.match(html,/id="detail-cross-listings"/);const start=app.indexOf("function findCrossListedModel("),end=app.indexOf("\nfunction describeOriginalScale",start);const find=new Function("MODELS",app.slice(start,end)+"\nreturn findCrossListedModel;")([{id:"nasa-auto-74bc0bbbc9d0",category:"planetary"},{id:"nasa-auto-74bc0bbbc9d0-heightmap",category:"height-maps"}]);assert.equal(find({id:"nasa-auto-74bc0bbbc9d0",category:"planetary"}).category,"height-maps");assert.equal(find({id:"nasa-auto-74bc0bbbc9d0-heightmap",category:"height-maps"}).category,"planetary");});
test("original scale explains whether the source file is larger or smaller than reality",()=>{const app=read("app.js"),start=app.indexOf("function describeOriginalScale("),end=app.indexOf("\nfunction normalizeConversionFormat",start);assert.ok(start>=0&&end>start);const describe=new Function(app.slice(start,end)+"\nreturn describeOriginalScale;")();assert.equal(describe(1/1.036),"Original file is 3.6% larger than the real-world reference");assert.equal(describe(1/0.964),"Original file is 3.6% smaller than the real-world reference");assert.match(describe(1),/matches the real-world reference/);});
test("beginner workflow starts at archive discovery and finishes in the users slicer",()=>{const html=read("index.html");assert.match(html,/<strong>Find a model<\/strong>/);assert.match(html,/<strong>Check the source and preview<\/strong>/);assert.match(html,/<strong>Prepare scale and size<\/strong>/);assert.match(html,/<strong>Finish in your slicer<\/strong>/);assert.doesNotMatch(html,/<strong>G-code<\/strong>/);});


test("STL conversion controls are visibly marked beta wherever conversion is offered",()=>{
 const html=read("index.html"),app=read("app.js"),css=read("styles.css");
 assert.match(html,/id="detail-convert-beta"[^>]*hidden>BETA/);
 assert.match(html,/id="scaling-convert-beta"[^>]*hidden>BETA/);
 assert.match(html,/Conversion may not work for all models or file formats/);
 assert.match(app,/convertBeta\.hidden=!canConvert/);
 assert.match(app,/convertBeta\)convertBeta\.hidden=!convertable/);
 assert.match(app,/convertBeta\)convertBeta\.hidden=true/);
 assert.match(css,/\.beta-badge\[hidden\]\{display:none\}/);
});

test("fit-to-build-plate calculation ignores astronomical scale, uses safety margins and applies proportional adjustment",()=>{
 const app=read("app.js"),start=app.indexOf("function calculateFitToBuildPlate("),end=app.indexOf("\nfunction calculateCustomScaleDenominator",start);
 assert.ok(start>=0&&end>start);
 const calculate=new Function(app.slice(start,end)+"\nreturn calculateFitToBuildPlate;")();
 const fit=calculate([100,50,20],[100,80,50],5,100);
 assert.equal(fit.valid,true);assert.equal(fit.maxFactor,0.9);assert.deepEqual(fit.printDimensions,[90,45,18]);assert.deepEqual(fit.orientationIndices,[0,1,2]);assert.equal(fit.fits,true);assert.deepEqual(fit.usableBed,[90,70,40]);
 const rotated=calculate([100,50,20],[35,70,100],5,100);assert.deepEqual(rotated.orientationIndices,[2,1,0]);assert.deepEqual(rotated.printDimensions,[18,45,90]);assert.equal(rotated.fits,true);
 const reduced=calculate([100,50,20],[100,80,50],5,50);assert.equal(reduced.factor,0.45);assert.equal(reduced.fits,true);
 const enlarged=calculate([100,50,20],[100,80,50],5,150);assert.equal(enlarged.fits,false);
 assert.equal(calculate([10,10,10],[10,10,10],5,100).valid,false);
});
test("custom original dimensions map to a selected model axis and calculate proportional original scale",()=>{
 const app=read("app.js"),start=app.indexOf("function calculateCustomScaleDenominator("),end=app.indexOf("\nfunction describeOriginalScale",start);
 assert.ok(start>=0&&end>start);
 const calculate=new Function(app.slice(start,end)+"\nreturn calculateCustomScaleDenominator;")();
 assert.equal(calculate([200,100,50],400000,"longest"),2000);
 assert.equal(calculate([200,100,50],400000,"1"),4000);
 assert.equal(calculate([200,100,50],400000,"2"),8000);
 assert.equal(calculate([200,100,50],0,"longest"),null);
});
test("scaling workspace exposes original, fit-to-build-plate and custom-dimension modes",()=>{
 const html=read("index.html"),app=read("app.js");
 for(const id of ["scaling-mode","scaling-fit-margin","scaling-fit-adjustment","scaling-custom-dimension","scaling-custom-unit","scaling-custom-axis","scaling-custom-kind"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/value="fit">Fit to build plate/);assert.match(html,/value="custom">Custom original dimensions/);
 assert.match(app,/Astronomical scale ignored/);assert.match(app,/calculateCustomScaleDenominator/);assert.match(app,/currentExportReady/);assert.match(app,/automatically rotated to the selected axis-aligned orientation/);
});

test("custom original dimensions convert mm, m and km to millimetres",()=>{
 const app=read("app.js"),start=app.indexOf("function convertCustomDimensionToMm("),end=app.indexOf("\nfunction calculateCustomScaleDenominator",start);
 assert.ok(start>=0&&end>start);
 const convert=new Function(app.slice(start,end)+"\nreturn convertCustomDimensionToMm;")();
 assert.equal(convert(25,"mm"),25);assert.equal(convert(1.5,"m"),1500);assert.equal(convert(2,"km"),2000000);
 assert.equal(convert(0,"m"),null);assert.equal(convert(1,"cm"),null);
});

test("GZIP decompression is streamed and stops before exceeding the 75 MB model limit",async()=>{
 const app=read("app.js"),start=app.indexOf("async function readStreamWithinLimit("),end=app.indexOf("\nfunction estimateBinaryStlBytes",start);
 assert.ok(start>=0&&end>start);
 const readLimited=new Function(app.slice(start,end)+"\nreturn readStreamWithinLimit;")();
 const allowed=await readLimited(new ReadableStream({start(controller){controller.enqueue(new Uint8Array([1,2,3]));controller.enqueue(new Uint8Array([4,5]));controller.close();}}),5,"too large");
 assert.deepEqual([...new Uint8Array(allowed)],[1,2,3,4,5]);
 await assert.rejects(()=>readLimited(new ReadableStream({start(controller){controller.enqueue(new Uint8Array([1,2,3]));controller.enqueue(new Uint8Array([4,5,6]));}}),5,"decompressed STEP exceeds limit"),/decompressed STEP exceeds limit/);
});
test("binary STL output size is rejected before allocating the export buffer",()=>{
 const app=read("app.js"),start=app.indexOf("function estimateBinaryStlBytes("),end=app.indexOf("\nfunction countMeshTriangles",start);
 assert.ok(start>=0&&end>start);
 const estimate=new Function(app.slice(start,end)+"\nreturn estimateBinaryStlBytes;")();
 const limit=75*1024*1024;
 assert.equal(estimate(0),84);
 assert.equal(estimate(100),5084);
 assert.ok(estimate(1572862)<=limit);
 assert.ok(estimate(1572863)>limit);
 assert.equal(estimate(-1),null);
 assert.equal(estimate(Infinity),null);
});
test("STL conversion performs triangle and estimated-byte checks before calling STLExporter",()=>{
 const app=read("app.js"),start=app.indexOf("async function convertActiveModelToStl"),end=app.indexOf("\n function syncScalingModeUI",start);
 assert.ok(start>=0&&end>start);
 const converter=app.slice(start,end);
 assert.ok(converter.indexOf("countMeshTriangles(root)")<converter.indexOf("new L.STLExporter()"));
 assert.ok(converter.indexOf("estimatedBytes>MAX_BROWSER_MODEL_BYTES")<converter.indexOf("new L.STLExporter()"));
});


test("Blender modern meshes select only canonical position and corner-vertex layers",()=>{
 const source=read("vendor/blend-importer.js"),start=source.indexOf("function findLayerData("),end=source.indexOf("\nfunction countLegacyTriangleIndices",start);
 assert.ok(start>=0&&end>start);
 const find=new Function(source.slice(start,end)+"\nreturn findLayerData;")();
 const position=[{x:1,y:2,z:3},{x:4,y:5,z:6},{x:7,y:8,z:9}];
 const layers=[{name:"orig_index",data:[{i:7},{i:8},{i:9}]},{name:"position",data:position}];
 assert.equal(find(layers,["position"],3,"vertex position"),position);
 assert.throws(()=>find([{name:"orig_index",data:position}],["position"],3,"vertex position"),/missing its vertex position attribute/);
 assert.throws(()=>find([{name:".corner_edge",data:[{i:0},{i:1},{i:2}]}],[".corner_vert"],3,"loop vertex-index"),/missing its loop vertex-index attribute/);
});
test("legacy Blender polygons allocate exactly three indices per triangle",()=>{
 const source=read("vendor/blend-importer.js"),start=source.indexOf("function countLegacyTriangleIndices("),end=source.indexOf("\nexport function createBufferGeometry",start);
 assert.ok(start>=0&&end>start);
 const count=new Function(source.slice(start,end)+"\nreturn countLegacyTriangleIndices;")();
 assert.equal(count([{totloop:3}]),3);assert.equal(count([{totloop:4}]),6);assert.equal(count([{totloop:5}]),9);
 assert.equal(count([{totloop:3},{totloop:4},{totloop:6}]),21);
});
test("BLEND loader rejects files without actual mesh triangles instead of showing a substitute",()=>{
 const app=read("app.js");
 assert.match(app,/if\(!blendMeshCount\|\|!blendTriangleCount\)\{/);
 assert.match(app,/No substitute geometry was generated/);
});
test("all button-like controls receive a short click acknowledgement animation",()=>{
 const app=read("app.js"),css=read("styles.css");
 assert.match(app,/initButtonClickFeedback/);
 assert.match(app,/button, \[role="button"\], input\[type="button"\], input\[type="submit"\], \.upload-button, \.action-link/);
 assert.match(app,/is-click-feedback/);assert.match(css,/@keyframes spacemesher-button-press/);
 assert.match(css,/\.is-click-feedback\{animation:spacemesher-button-press 240ms/);
 assert.match(css,/prefers-reduced-motion:reduce\)\{\.is-click-feedback\{animation:none!important\}\}/);
});

test("Blender annotation meshes are excluded by conservative whole-name matching",()=>{
 const source=read("vendor/blend-importer.js"),start=source.indexOf("const ANNOTATION_OBJECT_NAME"),end=source.indexOf("\nexport function createObjects",start);
 assert.ok(start>=0&&end>start,"annotation classifier must be defined before scene construction");
 const helper="const BLEND_OBJECT_TYPES={camera:11};\n"+source.slice(start,end).replace("export function isLikelyAnnotationObject","function isLikelyAnnotationObject");
 const classify=new Function(helper+"\nreturn isLikelyAnnotationObject;")();
 assert.equal(classify({aname:"Text",data:{aname:"Text"}}),true);
 assert.equal(classify({aname:"Text.001",data:{aname:"Text.001"}}),true);
 assert.equal(classify({aname:"Mission label",data:{aname:"Mission label"}}),false);
 assert.equal(classify({aname:"Solar Panel",data:{aname:"TexturedMesh"}}),false);
 assert.equal(classify({aname:"Cube",data:{aname:"Cube.001"}}),false);
 assert.equal(classify({aname:"logo_NASA_JPL",data:{aname:"Plane.007"},parent:{type:11}}),true);
 assert.equal(classify({aname:"ground_and_sky_dome",data:{aname:"Sphere"}}),true);
});
test("Blender scene builder can explicitly retain annotation meshes when requested",()=>{
 const source=read("vendor/blend-importer.js");
 assert.ok(source.includes("options.excludeAnnotations !== false && isLikelyAnnotationObject(object)"));
 assert.ok(source.includes("options.onAnnotationExcluded?.(diagnostic)"));
 const app=read("app.js");
 assert.ok(app.includes("onAnnotationExcluded:diagnostic=>annotationDiagnostics.push(diagnostic)"));
 assert.ok(app.includes("hidden or presentation-only scene object(s)"));
});


test("Blender parser advances nested DNA structures by their compiled byte size",()=>{
 const source=read("vendor/blend-parser.js");
 const start=source.indexOf("function getBlenderStructByteLength(");
 const end=source.indexOf("\n}",start);
 assert.ok(start>=0&&end>start,"compiled SDNA byte-size helper must exist");
 const helper=source.slice(start,end+2);
 const getSize=new Function(helper+"\nreturn getBlenderStructByteLength;")();
 assert.equal(getSize({MVert:{byteLength:12},CustomDataLayer:{byteLength:24}},"MVert"),12);
 assert.equal(getSize({MVert:{byteLength:12}},"MVert"),12);
 assert.throws(()=>getSize({},"MissingType"),/BLEND_INVALID_DNA_SIZE/);
 assert.throws(()=>getSize({Broken:{byteLength:0}},"Broken"),/BLEND_INVALID_DNA_SIZE/);
 assert.throws(()=>getSize({ID:{length:8}},"ID"),/BLEND_INVALID_DNA_SIZE/);
 assert.ok(source.includes("const memberByteLength = getBlenderStructByteLength(current_SDNA_template.SDNA, type)"));
 assert.ok(source.includes("byteLength: compiledByteLength"));
 assert.ok(source.includes("const compiled_struct_byte_length = lengths[struct_type_index]"));
 assert.ok(source.includes("getSDNAStructureConstructor(struct_name, obj, compiled_struct_byte_length)"));
 assert.ok(source.includes("memberEnd > data_block_end"));
 assert.ok(source.includes("memberStart + memberByteLength"));
});

test("BLEND parse failures offer independent converter fallbacks with upload disclosure",()=>{
 const app=read("app.js");
 assert.ok(app.includes("https://www.innerscene.com/tools/blend-to-stl"));
 assert.ok(app.includes("https://shapeweld.com/tools/blend-to-stl"));
 assert.ok(app.includes("Shapeweld uploads the file to its server"));
 assert.ok(app.includes("fallback.append(heading,note,local,server,privacy)"));
});

test("Blender object transforms apply the transposed parent-inverse matrix",()=>{
 const source=read("vendor/blend-importer.js");
 assert.ok(source.includes("const parentInverse = object.parentinv"));
 assert.ok(source.includes("if (object.parent && parentInverse)"));
 assert.ok(source.includes("value(column, row)"));
 assert.ok(source.includes("parentInverseThree = basis.clone().multiply(blenderMatrix).multiply(basis.clone().invert())"));
 assert.ok(source.includes("obj.matrix.premultiply(parentInverseThree)"));
 assert.ok(source.includes("obj.matrixAutoUpdate = false"));
});

test("Blender numeric-key vector structs are read as location, scale, rotation and quaternion",()=>{
 const source=read("vendor/blend-importer.js");
 const start=source.indexOf("function safeNumericVector"),end=source.indexOf("\nfunction setTransform",start);
 assert.ok(start>=0&&end>start);
 const helper=source.slice(start,end);
 const {safeVec,safeQuat}=new Function(helper+"\nreturn {safeVec,safeQuat};")();
 assert.deepEqual(safeVec({0:1,1:2,2:3},[0,0,0]),[1,2,3]);
 assert.deepEqual(safeVec(new Float32Array([4,5,6]),[0,0,0]),[4,5,6]);
 assert.deepEqual(safeQuat({0:1,1:0,2:0,3:0}),[1,0,0,0]);
 const nonUnit=safeQuat({0:0.3016583025,1:-0.6116163731,2:0.314779669,3:0.6561406255});
 assert.ok(Math.abs(Math.hypot(...nonUnit)-1)<1e-12);
 assert.equal(safeQuat({0:1,1:0,2:0}),null);
});

test("Blender active view-layer visibility excludes hidden and viewport-restricted objects",()=>{
 const source=read("vendor/blend-importer.js");
 const start=source.indexOf("function isObjectVisibleInActiveViewLayer("),end=source.indexOf("\n}",start);
 assert.ok(start>=0&&end>start);
 const helper=source.slice(start,end+2);
 const visible=new Function(helper+"\nreturn isObjectVisibleInActiveViewLayer;")();
 const shown={aname:"shown",restrictflag:0},renderHidden={aname:"render-hidden",restrictflag:0},hidden={aname:"hidden",restrictflag:0},viewportHidden={aname:"viewport-hidden",restrictflag:1},childOfHiddenCamera={aname:"camera-child",restrictflag:0,parent:{restrictflag:1}};
 const file={objects:{Base:[{object:shown,flag:214},{object:renderHidden,flag:86},{object:hidden,flag:0},{object:viewportHidden,flag:128}]}};
 assert.equal(visible(file,shown),true);
 assert.equal(visible(file,renderHidden),true);
 assert.equal(visible(file,hidden),false);
 assert.equal(visible(file,viewportHidden),false);
 file.objects.Base.push({object:childOfHiddenCamera,flag:214});assert.equal(visible(file,childOfHiddenCamera),true);
 assert.equal(visible(file,{aname:"orphan"}),false);
 assert.equal(visible(file,hidden,{includeHiddenObjects:true}),true);
});

test("Blender mesh geometry computes exact local bounds before being returned",()=>{
 const source=read("vendor/blend-importer.js");
 const start=source.indexOf("function createBufferGeometry(");
 const end=source.indexOf("\nfunction ",start+10);
 const body=source.slice(start,end>start?end:undefined);
 assert.ok(body.includes("geometry.computeBoundingBox()"));
 assert.ok(body.indexOf("geometry.computeBoundingBox()")<body.indexOf("return geometry"));
});

test("manual original dimensions convert units and select the chosen model axis",()=>{
 const source=read("app.js"),start=source.indexOf("function calculateFitToBuildPlate("),end=source.indexOf("function describeOriginalScale(",start);
 assert.ok(start>=0&&end>start);
 const helpers=new Function(source.slice(start,end)+"\nreturn {convertCustomDimensionToMm,calculateCustomScaleDenominator};")();
 assert.equal(helpers.convertCustomDimensionToMm(3.4,"m"),3400);
 assert.equal(helpers.convertCustomDimensionToMm(3400,"mm"),3400);
 assert.equal(helpers.convertCustomDimensionToMm(-1,"m"),null);
 const model=[6135.377,1584.011,3620.992];
 assert.ok(Math.abs(helpers.calculateCustomScaleDenominator(model,3400,"longest")-(3400/6135.377))<1e-12);
 assert.ok(Math.abs(helpers.calculateCustomScaleDenominator(model,1000,"1")-(1000/1584.011))<1e-12);
});
test("automatic printer-bed fit chooses a safe axis orientation and proportional scale",()=>{
 const source=read("app.js"),start=source.indexOf("function calculateFitToBuildPlate("),end=source.indexOf("function convertCustomDimensionToMm(",start);
 assert.ok(start>=0&&end>start);
 const fit=new Function(source.slice(start,end)+"\nreturn calculateFitToBuildPlate;")();
 const result=fit([6135.377,1584.011,3620.992],[256,256,256],5,100);
 assert.equal(result.valid,true);assert.equal(result.fits,true);
 assert.ok(result.factor>0&&result.factor<1);
 assert.ok(result.printDimensions.every((value,index)=>value<=result.usableBed[index]+1e-9));
 assert.equal(result.usableBed[0],246);
 assert.equal(fit([100,100,100],[256,256,256],200,100).valid,false);
 assert.equal(fit([100,100,100],[256,256,256],5,110).fits,true);
 assert.equal(fit([100,100,100],[256,256,256],5,300).fits,false);
});
