import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const browserFile = JSON.parse(await readFile("/tmp/spacemesher-browser-transforms.json", "utf8"));
const browser = browserFile.objects;
const nativeFile = JSON.parse(await readFile("/tmp/spacemesher-native-transforms.json", "utf8"));
const native = nativeFile.objects;
const C = [[1,0,0,0],[0,0,1,0],[0,-1,0,0],[0,0,0,1]];
const Ci = [[1,0,0,0],[0,0,-1,0],[0,1,0,0],[0,0,0,1]];
function multiply(a,b){return a.map(row=>row.map((_,c)=>row.reduce((sum,value,k)=>sum+value*b[k][c],0)));}
function nativeToThree(matrix){return multiply(multiply(C,matrix),Ci);}
function browserToMeters(elements){
 const matrix=Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>elements[c*4+r]));
 return matrix.map((row,r)=>row.map(value=>r<3?value/1000:value));
}
const browserByName=new Map(browser.map(item=>[item.name,item]));
const results=[];
let maxVertexError=0;
const worldMin=[Infinity,Infinity,Infinity],worldMax=[-Infinity,-Infinity,-Infinity],browserWorldMin=[Infinity,Infinity,Infinity],browserWorldMax=[-Infinity,-Infinity,-Infinity];
for(const item of native){
 const actual=browserByName.get(item.name);
 if(!actual){results.push({name:item.name,missing:true});continue;}
 const expected=nativeToThree(item.matrix_world),received=browserToMeters(actual.matrixWorld);
 let maxError=0;
 for(let r=0;r<4;r++)for(let c=0;c<4;c++)maxError=Math.max(maxError,Math.abs(expected[r][c]-received[r][c]));
 const expectedLocalMin=[item.local_min[0],item.local_min[2],-item.local_max[1]];
 const expectedLocalMax=[item.local_max[0],item.local_max[2],-item.local_min[1]];
 const localError=Math.max(...expectedLocalMin.map((value,index)=>Math.abs(value-actual.localMin[index])),...expectedLocalMax.map((value,index)=>Math.abs(value-actual.localMax[index])));
 let objectVertexError=0;
 if(item.positions.length!==actual.positions.length) objectVertexError=Infinity;
 else for(let index=0;index<item.positions.length/3;index++){
  const expectedVertex=[item.positions[index*3],item.positions[index*3+2],-item.positions[index*3+1]];
  for(let axis=0;axis<3;axis++) objectVertexError=Math.max(objectVertexError,Math.abs(expectedVertex[axis]-actual.positions[index*3+axis]));
  const world=[0,1,2].map(row=>expected[row][0]*expectedVertex[0]+expected[row][1]*expectedVertex[1]+expected[row][2]*expectedVertex[2]+expected[row][3]);
  const browserWorld=[0,1,2].map(row=>received[row][0]*actual.positions[index*3]+received[row][1]*actual.positions[index*3+1]+received[row][2]*actual.positions[index*3+2]+received[row][3]);
  for(let axis=0;axis<3;axis++){
   worldMin[axis]=Math.min(worldMin[axis],world[axis]);worldMax[axis]=Math.max(worldMax[axis],world[axis]);
   browserWorldMin[axis]=Math.min(browserWorldMin[axis],browserWorld[axis]);browserWorldMax[axis]=Math.max(browserWorldMax[axis],browserWorld[axis]);
  }
 }
 maxVertexError=Math.max(maxVertexError,objectVertexError);
 results.push({name:item.name,maxError,localError,objectVertexError,vertices:item.vertices,polygons:item.polygons,expected,received,expectedLocalMin,expectedLocalMax,actualLocalMin:actual.localMin,actualLocalMax:actual.localMax});
}
const matched=results.filter(item=>!item.missing),missing=results.filter(item=>item.missing);
const worst=[...matched].sort((a,b)=>b.maxError-a.maxError).slice(0,12);
const maxError=Math.max(0,...matched.map(item=>item.maxError));
const maxLocalError=Math.max(0,...matched.map(item=>item.localError));
const nativeWorldSizeMm=worldMax.map((value,index)=>(value-worldMin[index])*1000);
const worldBoundsErrorMm=Math.max(...nativeWorldSizeMm.map((value,index)=>Math.abs(value-browserFile.sizeMm[index])));
const browserWorldSizeMm=browserWorldMax.map((value,index)=>(value-browserWorldMin[index])*1000);
const browserBoxErrorMm=Math.max(...browserWorldSizeMm.map((value,index)=>Math.abs(value-browserFile.sizeMm[index])));
console.log(JSON.stringify({status:"BLEND_NATIVE_TRANSFORM_COMPARISON",browserObjects:browser.length,nativeObjects:native.length,matched:matched.length,missing:missing.map(item=>item.name),maxError,maxLocalError,maxVertexError,nativeWorldSizeMm,worldBoundsErrorMm,browserWorldSizeMm,browserBoxErrorMm,browserSizeMm:browserFile.sizeMm,worst}));
assert.equal(missing.length,0,"Browser import omitted visible native Blender meshes: "+missing.map(item=>item.name).join(", "));
assert.ok(maxError<=0.005,"Browser object world transforms differ from native Blender by more than 5 mm; max error "+maxError+" m");
assert.ok(maxLocalError<=1e-5,"Browser local mesh bounds differ from native Blender by more than 0.01 mm; max error "+maxLocalError+" m");
assert.ok(maxVertexError<=1e-6,"Browser vertex coordinates differ from native Blender by more than 0.001 mm; max error "+maxVertexError+" m");
assert.ok(browserBoxErrorMm<=1,"Browser Box3 bounds differ from its mesh transforms by more than 1 mm; max error "+browserBoxErrorMm+" mm");
assert.ok(worldBoundsErrorMm<=1,"Browser STL scene bounds differ from native Blender by more than 1 mm; max error "+worldBoundsErrorMm+" mm");
