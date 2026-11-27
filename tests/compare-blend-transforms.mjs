import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const browser = JSON.parse(await readFile("/tmp/spacemesher-browser-transforms.json", "utf8"));
const native = JSON.parse(await readFile("/tmp/spacemesher-native-transforms.json", "utf8"));
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
for(const item of native){
 const actual=browserByName.get(item.name);
 if(!actual){results.push({name:item.name,missing:true});continue;}
 const expected=nativeToThree(item.matrix_world),received=browserToMeters(actual.matrixWorld);
 let maxError=0;
 for(let r=0;r<4;r++)for(let c=0;c<4;c++)maxError=Math.max(maxError,Math.abs(expected[r][c]-received[r][c]));
 const expectedLocalMin=[item.local_min[0],item.local_min[2],-item.local_max[1]];
 const expectedLocalMax=[item.local_max[0],item.local_max[2],-item.local_min[1]];
 const localError=Math.max(...expectedLocalMin.map((value,index)=>Math.abs(value-actual.localMin[index])),...expectedLocalMax.map((value,index)=>Math.abs(value-actual.localMax[index])));
 results.push({name:item.name,maxError,localError,vertices:item.vertices,polygons:item.polygons,expected,received,expectedLocalMin,expectedLocalMax,actualLocalMin:actual.localMin,actualLocalMax:actual.localMax});
}
const matched=results.filter(item=>!item.missing),missing=results.filter(item=>item.missing);
const worst=[...matched].sort((a,b)=>b.maxError-a.maxError).slice(0,12);
const maxError=Math.max(0,...matched.map(item=>item.maxError));
const maxLocalError=Math.max(0,...matched.map(item=>item.localError));
console.log(JSON.stringify({status:"BLEND_NATIVE_TRANSFORM_COMPARISON",browserObjects:browser.length,nativeObjects:native.length,matched:matched.length,missing:missing.map(item=>item.name),maxError,maxLocalError,worst}));
assert.equal(missing.length,0,"Browser import omitted visible native Blender meshes: "+missing.map(item=>item.name).join(", "));
assert.ok(maxError<=0.005,"Browser object world transforms differ from native Blender by more than 5 mm; max error "+maxError+" m");
assert.ok(maxLocalError<=1e-5,"Browser local mesh coordinates differ from native Blender by more than 0.01 mm; max error "+maxLocalError+" m");
