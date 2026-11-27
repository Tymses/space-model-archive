import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const fixtureUrl = "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/InSight%20Cruise%20Stage/InSight%20Cruise%20Stage%20%28final%29.blend";
const response = await fetch(fixtureUrl);
assert.equal(response.status, 200, "NASA fixture download must succeed");
const fixture = Buffer.from(await response.arrayBuffer());
assert.equal(fixture.length, 21801160, "NASA fixture must be complete");

const mime = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".json":"application/json" };
const server = createServer(async (req,res) => {
  try {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    if (url.pathname === "/__fixture.blend") {
      res.writeHead(200, {"Content-Type":"application/octet-stream","Content-Length":String(fixture.length)});
      res.end(fixture); return;
    }
    const path = resolve(root, "." + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const body = await readFile(path);
    res.writeHead(200, {"Content-Type":mime[extname(path)] || "application/octet-stream"});
    res.end(body);
  } catch { res.writeHead(404); res.end("Not found"); }
});
await new Promise(resolveListen => server.listen(0,"127.0.0.1",resolveListen));
const address = server.address();
const browser = await chromium.launch({headless:true,args:["--no-sandbox"]});
try {
  const page = await browser.newPage();
  page.on("console", msg => { if (msg.type()==="error") process.stderr.write("[browser] "+msg.text()+"\n"); });
  await page.goto("http://127.0.0.1:"+address.port+"/tests/blend-fixture-browser.html", {waitUntil:"domcontentloaded"});
  const result = await page.evaluate(async () => {
    const [THREE, importer, exporterModule] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"),
      import("/vendor/blend-importer.js"),
      import("https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/exporters/STLExporter.js")
    ]);
    const buffer = await fetch("/__fixture.blend").then(r=>{if(!r.ok)throw new Error("Fixture HTTP "+r.status);return r.arrayBuffer();});
    const parsed = await importer.parseBlend(buffer,"InSight Cruise Stage (final)");
    const meshDiagnostics=[],annotationDiagnostics=[];
    const objects = importer.createObjects(parsed.file,{
      onMeshError:diagnostic=>meshDiagnostics.push(diagnostic),
      onAnnotationExcluded:diagnostic=>annotationDiagnostics.push(diagnostic)
    });
    const group = new THREE.Group(); group.add(...objects);
    // BLEND coordinates are metres in the Scaling workspace; mirror its mm conversion.
    group.scale.setScalar(1000); group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    let meshes=0,triangles=0;
    const meshBounds=[];
    group.traverse(node=>{
      if(node.isMesh&&node.geometry){
        meshes++;
        const nodeTriangles=node.geometry.index ? node.geometry.index.count/3 : (node.geometry.attributes.position?.count||0)/3;
        triangles += nodeTriangles;
        const nodeBox=new THREE.Box3().setFromObject(node),nodeSize=nodeBox.getSize(new THREE.Vector3());
        const localSize=node.geometry.boundingBox?.getSize(new THREE.Vector3())||new THREE.Vector3();
        meshBounds.push({name:node.name||"(unnamed)",sizeMm:nodeSize.toArray().map(v=>Number(v.toFixed(2))),localSizeMm:localSize.toArray().map(v=>Number((v*1000).toFixed(2))),scale:node.scale.toArray().map(v=>Number(v.toFixed(4))),triangles:Math.round(nodeTriangles)});
      }
    });
    meshBounds.sort((a,b)=>(b.sizeMm[0]*b.sizeMm[1]*b.sizeMm[2])-(a.sizeMm[0]*a.sizeMm[1]*a.sizeMm[2]));
    if(!meshes||!triangles) throw new Error("No valid triangle meshes reached Three.js scene builder.");
    if(![size.x,size.y,size.z].every(v=>Number.isFinite(v)&&v>0)) throw new Error("Invalid scene bounds: "+size.toArray().join(","));
    const stl = new exporterModule.STLExporter().parse(group,{binary:true});
    const stlBuffer = stl instanceof ArrayBuffer ? stl : stl?.buffer;
    const stlBytes = stlBuffer?.byteLength || stl?.byteLength || 0;
    const expectedBytes = 84 + Math.round(triangles)*50;
    if(stlBytes!==expectedBytes) throw new Error("Binary STL size mismatch: "+stlBytes+" vs "+expectedBytes);
    return {version:parsed.header.version,meshes,triangles:Math.round(triangles),sizeMm:size.toArray(),stlBytes,meshErrors:meshDiagnostics.length,excludedAnnotations:annotationDiagnostics.length,largestMeshes:meshBounds.slice(0,20),sourceObjects:(parsed.file.objects.Object||[]).filter(o=>["deck","panel_l_root","Cube.046","logo_NASA_JPL","ground_and_sky_dome"].includes(o.aname)).map(o=>({name:o.aname,loc:o.loc,size:o.size,rot:o.rot,quat:o.quat,parent:o.parent?.aname||null,data:o.data?.aname||null})),sceneUnits:(parsed.file.objects.Scene||[]).map(scene=>({unitSystem:scene.unit?.system,scaleLength:scene.unit?.scale_length}))};
  });
  assert.ok(result.meshes>0);
  assert.ok(result.triangles>0);
  assert.ok(result.stlBytes>84);
  assert.ok(result.sizeMm.every(value=>Number.isFinite(value)&&value>0));
  assert.ok(Math.max(...result.sizeMm)<10000,"Presentation meshes or broken parent transforms inflated the InSight printable bounds: "+result.sizeMm.join(" × ")+" mm");
  console.log(JSON.stringify({status:"BROWSER_BLEND_TO_STL_OK",...result}));
} finally {
  await browser.close();
  await new Promise(resolveClose=>server.close(resolveClose));
}
