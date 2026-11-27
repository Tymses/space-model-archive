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
const validMeshes = meshes.filter(mesh =>
  Number(mesh?.totvert) > 0 && Number(mesh?.totloop) > 0 && Number(mesh?.totpoly) > 0
);
assert.ok(validMeshes.length > 0, "NASA InSight fixture must contain mesh datablocks with non-empty vertex, loop and polygon topology");
const totals = validMeshes.reduce((sum, mesh) => ({
  vertices: sum.vertices + Number(mesh.totvert),
  loops: sum.loops + Number(mesh.totloop),
  polygons: sum.polygons + Number(mesh.totpoly)
}), { vertices: 0, loops: 0, polygons: 0 });
assert.ok(totals.vertices >= 3 && totals.loops >= 3 && totals.polygons >= 1, "Parsed mesh topology totals must be non-empty");
const targetNames = new Set(["deck","panel_l_root","Cube.046","logo_NASA_JPL","ground_and_sky_dome"]);
const sourceObjects = (parsed.objects?.Object || []).filter(object=>targetNames.has(object.aname)).map(object=>({
  name:object.aname, loc:object.loc, size:object.size, rot:object.rot,
  parentName:object.parent?.aname||null, dataName:object.data?.aname||null
}));
const sceneUnits = (parsed.objects?.Scene || []).map(scene=>({
  unitSystem:scene.unit?.system, scaleLength:scene.unit?.scale_length
}));
console.log(JSON.stringify({ bytes: buffer.byteLength, datablocks: parsed.object_array.length, meshDatablocks: meshes.length, validMeshes: validMeshes.length, totals, sceneUnits, sourceObjects, status: "BLEND_GEOMETRY_DATA_OK" }));
