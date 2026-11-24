const CATEGORIES={
 spacecraft:{title:"Spacecraft",description:"Satellites, probes, landers, crewed vehicles and space stations.",sources:[
  {name:"Space Radar Models",type:"3D model catalogue",description:"203 spacecraft models. GLB downloads, licence and source credit are provided per model.",url:"https://models.spaceradar.ai/",source:"Space Radar"},
  {name:"ESA Sci-Fleet",type:"Interactive 3D catalogue",description:"Explore ESA science satellites across the Solar System.",url:"https://scifleet.esa.int/",source:"ESA"},
  {name:"NASA 3D Resources",type:"3D model catalogue",description:"NASA mission models, including spacecraft, rockets, rovers and instruments.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"Satellites & Probes",type:"3D model catalogue",description:"Spacecraft and satellite GLB models from models.codelove.in.",url:"https://models.codelove.in/models/category/space/",source:"models.codelove.in"},
  {name:"Cosmographia",type:"Scientific visualisation",description:"SPICE-enhanced models and visualisations for Solar System exploration.",url:"https://naif.jpl.nasa.gov/naif/cosmographia.html",source:"NASA/JPL"}
 ]},
 planetary:{title:"Planetary features",description:"Craters, mountains, valleys, volcanoes and other surface features.",sources:[
  {name:"NASA Solar System Treks",type:"Terrain and 3D printing",description:"Explore planetary surfaces and generate 3D-printable terrain files for supported worlds and locations.",url:"https://treks.jpl.nasa.gov/",source:"NASA/JPL"},
  {name:"Terrain Print",type:"Terrain generator",description:"Create 3D-printable terrain from elevation data for the Moon, Mars and Earth; set size, relief and split pieces.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"NASA 3D Resources",type:"3D model catalogue",description:"Includes planetary bodies, lunar and Mars surface models and mission assets.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"USGS Astropedia",type:"Scientific data catalogue",description:"Search planetary cartographic products, topographic maps, mosaics and digital elevation models.",url:"https://astrogeology.usgs.gov/search",source:"USGS"}
 ]},
 "small-bodies":{title:"Asteroids & comets",description:"Shape models and surface data for asteroids, comets, dwarf planets and small moons.",sources:[
  {name:"3D Asteroid Catalogue",type:"Shape-model catalogue",description:"Interactive catalogue of asteroid, comet, dwarf-planet and moon shape models with physical and orbital data.",url:"https://3d-asteroids.space/",source:"3D Asteroid Catalogue"},
  {name:"NASA Solar System Treks",type:"3D printing and terrain",description:"Bennu, Ceres, Ryugu and Vesta are among the bodies with pre-generated 3D globe print files.",url:"https://treks.jpl.nasa.gov/",source:"NASA/JPL"},
  {name:"NASA Astromaterials 3D",type:"Sample models",description:"3D models of lunar samples and Antarctic meteorites; useful for printable space-rock specimens.",url:"https://ares.jsc.nasa.gov/astromaterials3d/",source:"NASA"}
 ]},
 "height-maps":{title:"Height maps",description:"Elevation data, digital terrain models and tools for turning real topography into printable geometry.",sources:[
  {name:"USGS Astropedia",type:"Elevation and cartographic data",description:"Search planetary digital elevation models, topographic maps and geospatial products.",url:"https://astrogeology.usgs.gov/search",source:"USGS"},
  {name:"NASA Solar System Treks",type:"Elevation data and terrain",description:"Explore planetary elevation and generate 3D-printable globes or local terrain files where available.",url:"https://treks.jpl.nasa.gov/",source:"NASA/JPL"},
  {name:"Terrain Print",type:"Height-map to 3D tool",description:"Build terrain tiles from Moon, Mars and Earth elevation data; adjust vertical exaggeration and split for a printer bed.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"Space Radar — Maps",type:"Relief and colour maps",description:"Relief and colour maps derived from public-domain spacecraft data.",url:"https://dus32w6mqcntr.cloudfront.net/assets/index.html",source:"Space Radar"}
 ]}
};
const MODELS=[
 {id:"hubble",name:"Hubble Space Telescope",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"408 kB",format:"GLB",license:"CC BY 4.0",credit:"Hubble Space Telescope: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hubble.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-21"},
 {id:"hubble-sts31",name:"Hubble at release (STS-31, 1990)",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"439 kB",format:"GLB",license:"CC BY 4.0",credit:"Hubble at release (STS-31, 1990): Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hubble-sts31.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-04"},
 {id:"shuttle-rms",name:"Space Shuttle robot arm",category:"spacecraft",kind:"Space Shuttle hardware",source:"Space Radar",size:"39 kB",format:"GLB",license:"CC BY 4.0",credit:"Space Shuttle robot arm: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/shuttle-rms.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-18"},
 {id:"msl-entry",name:"Curiosity's entry capsule",category:"spacecraft",kind:"Mars mission hardware",source:"Space Radar",size:"60 kB",format:"GLB",license:"CC BY 4.0",credit:"Curiosity's entry capsule: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/msl-entry.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-04"},
 {id:"msl-descent-stage",name:"Curiosity's descent stage",category:"spacecraft",kind:"Mars mission hardware",source:"Space Radar",size:"78 kB",format:"GLB",license:"CC BY 4.0",credit:"Curiosity's descent stage: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/msl-descent-stage.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-04"},
 {id:"cygnus",name:"Cygnus",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"141 kB",format:"GLB",license:"CC BY 4.0",credit:"Cygnus: Space Radar (spaceradar.ai), CC BY 4.0; generated with TRELLIS (MIT) from a public-domain NASA picture",file:"https://www.spaceradar.ai/models/cygnus.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"nustar",name:"NuSTAR",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"43 kB",format:"GLB",license:"CC BY 4.0",credit:"NuSTAR: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/nustar.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"xrism",name:"XRISM",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"72 kB",format:"GLB",license:"CC BY 4.0",credit:"XRISM: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/xrism.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-18"},
 {id:"noaa21",name:"NOAA-21",category:"spacecraft",kind:"Weather satellite",source:"Space Radar",size:"51 kB",format:"GLB",license:"CC BY 4.0",credit:"NOAA-21: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/noaa21.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"seasat",name:"Seasat",category:"spacecraft",kind:"Earth observation satellite",source:"Space Radar",size:"66 kB",format:"GLB",license:"CC BY 4.0",credit:"Seasat: Space Radar (spaceradar.ai), CC BY 4.0; generated with TRELLIS (MIT) from a public-domain NASA picture",file:"https://www.spaceradar.ai/models/seasat.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"hitomi",name:"Hitomi",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"98 kB",format:"GLB",license:"CC BY 4.0",credit:"Hitomi: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hitomi.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-11-18"},
 {id:"lageos",name:"Lageos",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"50 kB",format:"GLB",license:"CC BY 4.0",credit:"Lageos: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/lageos.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"ajisai",name:"Ajisai",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"92 kB",format:"GLB",license:"CC BY 4.0",credit:"Ajisai: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/ajisai.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"soyuz-ms",name:"Soyuz MS",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"59 kB",format:"GLB",license:"CC BY 4.0",credit:"Soyuz MS: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/soyuz-ms.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"progress-ms",name:"Progress MS",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"64 kB",format:"GLB",license:"CC BY 4.0",credit:"Progress MS: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/progress-ms.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"dragon-crew",name:"Crew Dragon",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"53 kB",format:"GLB",license:"CC BY 4.0",credit:"Crew Dragon: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/dragon-crew.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"dragon-cargo",name:"Cargo Dragon",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"46 kB",format:"GLB",license:"CC BY 4.0",credit:"Cargo Dragon: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/dragon-cargo.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"shenzhou",name:"Shenzhou",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"66 kB",format:"GLB",license:"CC BY 4.0",credit:"Shenzhou: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/shenzhou.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"tianzhou",name:"Tianzhou",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"47 kB",format:"GLB",license:"CC BY 4.0",credit:"Tianzhou: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/tianzhou.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"starlette",name:"Starlette",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"47 kB",format:"GLB",license:"CC BY 4.0",credit:"Starlette: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/starlette.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"},
 {id:"lares",name:"Lares",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"32 kB",format:"GLB",license:"CC BY 4.0",credit:"Lares: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/lares.glb",sourceUrl:"https://models.spaceradar.ai/",changed:"2026-10-13"}
];
const $=s=>document.querySelector(s);
const home=$("#home-view"),collection=$("#collection-view"),detail=$("#detail-view"),about=$("#about-view"),crumb=$("#breadcrumbs");
let currentCategory=null,currentModel=null;
function setView(view){home.hidden=view!=="home";collection.hidden=view!=="collection";detail.hidden=view!=="detail";about.hidden=view!=="about";}
function setCrumbs(items){crumb.innerHTML=items.map((item,i)=>i===items.length-1?'<span aria-current="page">'+item.label+'</span>':'<a href="'+item.href+'">'+item.label+'</a><span class="crumb-sep">›</span>').join("");}
function routeHome(push=true){currentCategory=null;currentModel=null;setView("home");setCrumbs([{label:"Home"}]);if(push)history.pushState({view:"home"},"","#home");window.scrollTo(0,0);}
function routeCollection(key,push=true){if(!CATEGORIES[key])return;currentCategory=key;currentModel=null;setView("collection");$("#collection-title").textContent=CATEGORIES[key].title;$("#collection-description").textContent=CATEGORIES[key].description;$("#collection-overline").textContent="COLLECTION / "+key.replace("-"," ").toUpperCase();$("#search-input").value="";populateFilters();renderCollection();setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[key].title}]);if(push)history.pushState({view:"collection",key},"","#"+key);window.scrollTo(0,0);}
function populateFilters(){const all=[...MODELS.filter(m=>m.category===currentCategory),...CATEGORIES[currentCategory].sources];const sources=[...new Set(all.map(x=>x.source))].sort();const types=[...new Set(all.map(x=>x.kind||x.type))].sort();$("#source-filter").innerHTML='<option value="all">All sources</option>'+sources.map(x=>'<option>'+x+'</option>').join("");$("#type-filter").innerHTML='<option value="all">All types</option>'+types.map(x=>'<option>'+x+'</option>').join("");}
function renderCollection(){const q=$("#search-input").value.trim().toLowerCase(),source=$("#source-filter").value,type=$("#type-filter").value;const models=MODELS.filter(x=>x.category===currentCategory&&[x.name,x.kind,x.source,x.credit].join(" ").toLowerCase().includes(q)&&(source==="all"||x.source===source)&&(type==="all"||x.kind===type));const sources=CATEGORIES[currentCategory].sources.filter(x=>[x.name,x.type,x.description,x.source].join(" ").toLowerCase().includes(q)&&(source==="all"||x.source===source)&&(type==="all"||x.type===type));const cards=[...models.map(x=>({kind:"model",data:x})),...sources.map(x=>({kind:"source",data:x}))];$("#result-count").textContent=cards.length+" results";$("#result-grid").innerHTML=cards.length?cards.map(({kind,data})=>kind==="model"?'<article class="result-card"><div class="result-meta"><span class="result-type">'+data.kind+'</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>GLB model · '+data.size+' · '+data.license+'</p><div class="card-bottom"><small>Original file · source credited</small><button class="card-action" data-model="'+data.id+'">View details →</button></div></article>':'<article class="result-card"><div class="result-meta"><span class="result-type">'+data.type+'</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>'+data.description+'</p><div class="card-bottom"><small>Original catalogue</small><a class="card-action" href="'+data.url+'" target="_blank" rel="noopener">Open source ↗</a></div></article>').join(""):'<div class="empty-state">No results match your search and filters. Try a different term or choose “All”.</div>';$("#collection-footnote").textContent=currentCategory==="spacecraft"?"Model records shown here are indexed from Space Radar's published asset list. Dimensions and printability are not provided unless verified.":"This collection currently links to verified source catalogues. Individual model records will be added when their files and metadata can be checked.";}
function routeModel(id,push=true){const model=MODELS.find(x=>x.id===id);if(!model)return;currentModel=model;setView("detail");$("#detail-category").textContent=CATEGORIES[model.category].title.toUpperCase();$("#detail-title").textContent=model.name;$("#detail-subtitle").textContent=model.kind+" · "+model.source;$("#preview-format").textContent=model.format;$("#preview-stage").innerHTML='<model-viewer src="'+model.file+'" alt="3D preview of '+model.name+'" camera-controls auto-rotate shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager"></model-viewer>';$("#preview-controls").hidden=false;const viewer=$("#preview-stage model-viewer");$("#scale-range").value="1";$("#scale-value").textContent="1.0×";$("#scale-range").oninput=e=>{const v=Number(e.target.value);$("#scale-value").textContent=v.toFixed(2)+"×";viewer.scale=v+" "+v+" "+v;};const rows=[["File format",model.format],["File size",model.size],["Licence",model.license],["Last updated",model.changed],["Real-world dimensions","Not provided by source"],["Real-world scale","Not provided by source"]];$("#spec-list").innerHTML=rows.map(([k,v])=>'<div class="spec-row"><dt>'+k+'</dt><dd>'+v+'</dd></div>').join("");$("#detail-actions").innerHTML='<a class="action-link" href="'+model.file+'" download>Download GLB ↧</a><a class="action-link secondary" href="'+model.sourceUrl+'" target="_blank" rel="noopener">Source catalogue ↗</a>';$("#source-credit").textContent=model.credit;$("#source-link").href=model.sourceUrl;$("#print-note").textContent="No verified print test, community rating, wall-thickness check or orientation assessment is available for this model yet. Dimensions and scale are not supplied in this record.";setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[model.category].title,href:"#"+model.category},{label:model.name}]);if(push)history.pushState({view:"detail",id},"","#model/"+id);window.scrollTo(0,0);}
function routeAbout(push=true){setView("about");setCrumbs([{label:"Home",href:"#home"},{label:"About"}]);if(push)history.pushState({view:"about"},"","#about");window.scrollTo(0,0);}
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>routeCollection(b.dataset.category)));
$("#result-grid").addEventListener("click",e=>{const b=e.target.closest("[data-model]");if(b)routeModel(b.dataset.model);});
$("#search-input").addEventListener("input",renderCollection);$("#source-filter").addEventListener("change",renderCollection);$("#type-filter").addEventListener("change",renderCollection);
$("#about-link").addEventListener("click",e=>{e.preventDefault();routeAbout();});$("#detail-back").addEventListener("click",e=>{e.preventDefault();routeCollection(currentModel.category);});
document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault();routeHome();});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)&&!collection.hidden){e.preventDefault();$("#search-input").focus();}});
window.addEventListener("popstate",e=>{const s=e.state;if(!s||s.view==="home")routeHome(false);else if(s.view==="collection")routeCollection(s.key,false);else if(s.view==="detail")routeModel(s.id,false);else if(s.view==="about")routeAbout(false);});
routeHome(false);

// --- SMA print preparation: live model dimensions, scale and printer fit ---
(function initPrintAssessment(){
  const $id = id => document.getElementById(id);
  let activeViewer = null;
  let baseDimensions = null;

  function number(id){ return Number($id(id).value); }
  function volume(){
    if ($id("printer-profile").value === "p2s") return [256,256,256];
    return [number("bed-x"),number("bed-y"),number("bed-z")];
  }
  function fmt(v){ return v.toFixed(v >= 100 ? 1 : 2).replace(/\.0$/,""); }
  function fitsSomeRotation(size, bed){
    const rotations = [
      [size[0],size[1],size[2]],[size[0],size[2],size[1]],
      [size[1],size[0],size[2]],[size[1],size[2],size[0]],
      [size[2],size[0],size[1]],[size[2],size[1],size[0]]
    ];
    return rotations.some(r => r.every((v,i) => v <= bed[i]));
  }
  function updateAssessment(){
    if (!baseDimensions) return;
    const real = number("real-length");
    const denominator = number("scale-denominator");
    let factor = 1;
    const hasReal = $id("real-length").value.trim() !== "";
    const hasDenom = $id("scale-denominator").value.trim() !== "";
    if (hasReal !== hasDenom) {
      $id("fit-title").textContent = "Scale information incomplete";
      $id("fit-description").textContent = "Enter both the real-world length and the scale denominator, or clear both fields.";
      $id("print-dimensions").textContent = "—";
      $id("scale-factor").textContent = "Recommended size factor: —";
      return;
    }
    if (hasReal && hasDenom) {
      if (!(real > 0) || !(denominator > 0)) {
        $id("fit-title").textContent = "Check the scale values";
        $id("fit-description").textContent = "Both values must be greater than zero.";
        return;
      }
      const targetLongest = real / denominator;
      factor = targetLongest / Math.max(...baseDimensions);
    }
    const size = baseDimensions.map(v => v * factor);
    const bed = volume();
    $id("model-dimensions").textContent = baseDimensions.map(fmt).join(" × ") + " mm";
    $id("print-dimensions").textContent = size.map(fmt).join(" × ") + " mm";
    $id("scale-factor").textContent = "Recommended size factor: " + (factor*100).toFixed(2) + "% of source geometry";
    const validBed = bed.every(v => Number.isFinite(v) && v > 0);
    const fit = validBed && fitsSomeRotation(size,bed);
    const result = $id("fit-result");
    result.classList.toggle("is-fit",!!fit);
    result.classList.toggle("is-no-fit",validBed && !fit);
    if (!validBed) {
      $id("fit-title").textContent = "Enter a valid build volume";
      $id("fit-description").textContent = "All three printer dimensions must be greater than zero.";
    } else if (fit) {
      $id("fit-title").textContent = "Fits within the selected build volume";
      $id("fit-description").textContent = "At least one 90° axis-aligned orientation fits inside " + bed.map(fmt).join(" × ") + " mm.";
    } else {
      $id("fit-title").textContent = "Does not fit at this scale";
      $id("fit-description").textContent = "At least one dimension exceeds the selected build volume (" + bed.map(fmt).join(" × ") + " mm). Consider scaling down or splitting the model.";
    }
    if (activeViewer) activeViewer.scale = factor + " " + factor + " " + factor;
  }
  function measureViewer(){
    if (!activeViewer || typeof activeViewer.getDimensions !== "function") return;
    try {
      const d = activeViewer.getDimensions();
      if (!d || ![d.x,d.y,d.z].every(Number.isFinite)) throw new Error("No dimensions");
      // glTF and model-viewer use metres; the archive displays millimetres.
      baseDimensions = [d.x,d.y,d.z].map(v => Math.abs(v)*1000);
      $id("measurement-state").textContent = "Geometry measured";
      updateAssessment();
    } catch (_) {
      $id("measurement-state").textContent = "Dimensions unavailable";
      $id("model-dimensions").textContent = "Could not read model dimensions";
      $id("fit-title").textContent = "Automatic measurement unavailable";
      $id("fit-description").textContent = "The source preview could not expose its geometry bounds. No fit result is shown.";
    }
  }
  function attachViewer(){
    activeViewer = document.querySelector("#preview-stage model-viewer");
    baseDimensions = null;
    if (!activeViewer) return;
    activeViewer.scale = "1 1 1";
    $id("measurement-state").textContent = "Measuring model…";
    $id("model-dimensions").textContent = "Waiting for 3D preview…";
    $id("print-dimensions").textContent = "—";
    activeViewer.addEventListener("load",measureViewer,{once:true});
    if (activeViewer.loaded) measureViewer();
  }
  $id("printer-profile").addEventListener("change",()=>{
    $id("custom-volume").hidden = $id("printer-profile").value !== "custom";
    updateAssessment();
  });
  ["bed-x","bed-y","bed-z","real-length","scale-denominator"].forEach(id=>$id(id).addEventListener("input",updateAssessment));
  $id("result-grid").addEventListener("click",e=>{
    if (e.target.closest("[data-model]")) setTimeout(attachViewer,0);
  });
  window.addEventListener("popstate",()=>setTimeout(()=>{
    if (!document.querySelector("#detail-view[hidden]")) attachViewer();
  },0));
})();
