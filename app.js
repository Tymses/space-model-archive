const CATEGORIES={
 spacecraft:{title:"Spacecraft",description:"Satellites, probes, landers, crewed vehicles and space stations.",sources:[
  {name:"Space Radar Models",entryType:"catalogue",type:"3D model catalogue",description:"203 individually downloadable spacecraft GLB models, with file size, licence and credit per model.",url:"https://models.spaceradar.ai/",source:"Space Radar"},
  {name:"ESA Sci-Fleet",entryType:"catalogue",type:"Interactive 3D catalogue",description:"Explore ESA science satellites across the Solar System.",url:"https://scifleet.esa.int/",source:"ESA"},
  {name:"NASA 3D Resources",entryType:"catalogue",type:"3D model catalogue",description:"NASA mission models, including spacecraft, rockets, rovers and instruments.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"Satellites & Probes",entryType:"catalogue",type:"3D model catalogue",description:"Spacecraft and satellite GLB models from models.codelove.in.",url:"https://models.codelove.in/models/category/space/",source:"models.codelove.in"},
  {name:"Space Radar map assets",entryType:"catalogue",type:"Additional GLB model files",description:"Additional spacecraft and mission GLB assets used by Space Radar's map, beyond its 203-model public catalogue.",url:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"Cosmographia",entryType:"viewer",type:"Scientific visualisation",description:"SPICE-enhanced models and visualisations for Solar System exploration.",url:"https://naif.jpl.nasa.gov/naif/cosmographia.html",source:"NASA/JPL"}
 ]},
 planetary:{title:"Planetary features",description:"Craters, mountains, valleys, volcanoes and other surface features.",sources:[
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Explore planetary surfaces and generate 3D-printable terrain files for supported worlds and locations.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"Terrain Print",entryType:"generator",type:"Terrain generator",description:"Create 3D-printable terrain from elevation data for the Moon, Mars and Earth; set size, relief and split pieces.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"NASA 3D Resources",entryType:"catalogue",type:"3D model catalogue",description:"Includes planetary bodies, lunar and Mars surface models and mission assets.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"USGS Astropedia",entryType:"data",type:"Scientific data catalogue",description:"Search planetary cartographic products, topographic maps, mosaics and digital elevation models.",url:"https://astrogeology.usgs.gov/search",source:"USGS"}
 ]},
 "small-bodies":{title:"Asteroids & comets",description:"Shape models and surface data for asteroids, comets and dwarf planets.",sources:[
  {name:"3D Asteroid Catalogue",entryType:"catalogue",type:"Shape-model catalogue",description:"The source reports 3,079 shape models across asteroids, comets, dwarf planets and moons. Individual OBJ/PLY downloads are not yet fully indexed in SMA; moon models are also discoverable in Moons. Its individual OBJ/PLY download files are not yet fully indexed in SMA; verified JPL and Space Radar shape files are listed separately.",url:"https://3d-asteroids.space/",source:"3D Asteroid Catalogue"},
  {name:"Space Radar shape models",entryType:"catalogue",type:"Small-body shape models",description:"18 additional downloadable GLB shape models for asteroids, comets and Ceres, each with source-specific attribution. Saturn moon shape models are listed separately in Moons.",url:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Bennu, Ceres, Ryugu and Vesta are among the bodies with pre-generated 3D globe print files.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"NASA/JPL Radar Astronomy",entryType:"catalogue",type:"Asteroid shape models",description:"19 individually indexed direct OBJ downloads from JPL's radar-derived asteroid shape-model collection. OBJ meshes may need conversion to STL for some slicers.",url:"https://echo.jpl.nasa.gov/asteroids/shapes/shapes.html",source:"NASA/JPL"},
  {name:"NASA Astromaterials 3D",entryType:"catalogue",type:"Sample model catalogue",description:"3D models of lunar samples and Antarctic meteorites; individual sample pages provide downloadable OBJ ZIP files. Direct ZIP links are not yet fully indexed in SMA.",url:"https://ares.jsc.nasa.gov/astromaterials3d/",source:"NASA"}
 ]},
 moons:{title:"Moons",description:"Natural satellites of planets and dwarf planets, including irregular moons and their shape models.",sources:[
  {name:"Space Radar moon shape models",entryType:"catalogue",type:"Natural satellite shape models",description:"11 individually downloadable GLB shape models of Saturn moons, with source-specific attribution.",url:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"NASA 3D Resources",entryType:"catalogue",type:"3D model catalogue",description:"Includes two downloadable STL globe models of the Moon (near and far side), alongside other lunar and planetary-body assets.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"3D Asteroid Catalogue",entryType:"catalogue",type:"Moon shape-model catalogue",description:"The source reports shape models of moons as part of its 3,079-model catalogue. SMA has not yet indexed those individual moon OBJ/PLY downloads.",url:"https://3d-asteroids.space/",source:"3D Asteroid Catalogue"}
 ]},
 "height-maps":{title:"Height maps",description:"Elevation data, digital terrain models and tools for turning real topography into printable geometry. This is a data and generation collection, not a catalogue of individual object models.",sources:[
  {name:"USGS Astropedia",entryType:"data",type:"Elevation data catalogue",description:"Search planetary digital elevation models, topographic maps and geospatial products.",url:"https://astrogeology.usgs.gov/search",source:"USGS"},
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Explore planetary elevation and generate 3D-printable globes or local terrain files where available.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"Terrain Print",entryType:"generator",type:"Height-map generator",description:"Build terrain tiles from Moon, Mars and Earth elevation data; adjust vertical exaggeration and split for a printer bed.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"Space Radar — Maps",entryType:"data",type:"Relief-map data",description:"Relief and colour maps derived from public-domain spacecraft data.",url:"https://dus32w6mqcntr.cloudfront.net/assets/index.html",source:"Space Radar"}
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

/* Native STEP assembly: ExoMy rover. The package includes purchased-component geometry; review per-part rights before reuse. */
MODELS.push({id:"exomy-step",name:"ExoMy — six-wheel Mars rover assembly",category:"spacecraft",kind:"Printable rover assembly",source:"ESA / Open Source Robotics",size:"Size not listed",format:"STEP (GZIP)",license:"GPL-3.0 repository; third-party component rights may differ",credit:"ExoMy: ESA Planetary Robotics Laboratory and contributors; STEP file served by Open Source Robotics",file:"https://models.opensourcerobotics.dev/source/715bf957671f7a897d611b8cf16c1cd621556f0782a2ff409dc436f36f74e8e7/exomy-v1-0-2-default-source.step.gz",sourceUrl:"https://opensourcerobotics.dev/robots/exomy/",changed:"Source revision b14c782"});

/* Individually indexed NASA 3D Resources files. Files remain hosted by NASA. */
const NASA_FILES=[
 ["nasa-1999-rq36","1999 RQ36 (Bennu)","small-bodies","Asteroid shape model","3D Models/1999 RQ36 asteroid/1999 RQ36 asteroid.glb",329596,"GLB"],
 ["nasa-apollo-lm","Apollo Lunar Module","spacecraft","Lunar lander","3D Models/Apollo Lunar Module/Apollo Lunar Module.glb",716840,"GLB"],
 ["nasa-cassini","Cassini spacecraft","spacecraft","Planetary orbiter","3D Models/Cassini Assembly/Cassini Assembly.glb",2388308,"GLB"],
 ["nasa-galileo","Galileo spacecraft","spacecraft","Jupiter orbiter","3D Models/Galileo/Galileo.glb",248532,"GLB"],
 ["nasa-hubble","Hubble Space Telescope (NASA model)","spacecraft","Space telescope","3D Models/Hubble Space Telescope (A)/Hubble Space Telescope (A).glb",1694988,"GLB"],
 ["nasa-iss","International Space Station","spacecraft","Space station","3D Models/International Space Station (ISS) (B)/International Space Station (ISS) (B).glb",476992,"GLB"],
 ["nasa-ingenuity","Ingenuity Mars Helicopter","spacecraft","Mars helicopter","3D Models/Ingenuity Mars Helicopter/Ingenuity Mars Helicopter.glb",2019408,"GLB"],
 ["nasa-perseverance","Perseverance Rover","spacecraft","Mars rover","3D Models/Mars 2020 Perseverance Rover/Mars 2020 Perseverance Rover.glb",4987176,"GLB"],
 ["nasa-lro","Lunar Reconnaissance Orbiter","spacecraft","Lunar orbiter","3D Models/Lunar Reconnaissance Orbiter (A)/Lunar Reconnaissance Orbiter (A).glb",654500,"GLB"],
 ["nasa-maven","MAVEN","spacecraft","Mars orbiter","3D Models/Mars Atmosphere and Volatile EvolutioN (MAVEN) (A)/Mars Atmosphere and Volatile EvolutioN (MAVEN) (A).glb",10465800,"GLB"],
 ["nasa-mro","Mars Reconnaissance Orbiter","spacecraft","Mars orbiter","3D Models/Mars Reconnaissance Orbiter (MRO) (A)/Mars Reconnaissance Orbiter (MRO) (A).glb",2652460,"GLB"],
 ["nasa-voyager","Voyager spacecraft","spacecraft","Deep-space probe","3D Models/Voyager Probe (B)/Voyager Probe (B).glb",1720864,"GLB"],
 ["nasa-juno","Juno","spacecraft","Jupiter orbiter","3D Models/Juno (B)/Juno (B).glb",262360,"GLB"],
 ["nasa-pioneer10","Pioneer 10","spacecraft","Deep-space probe","3D Models/Pioneer 10/Pioneer 10.glb",2049840,"GLB"],
 ["nasa-bennu-print","Asteroid Bennu — print model","small-bodies","Asteroid STL","3D Printing/Asteroid 101955 Bennu/Asteroid 101955 Bennu.stl",2457684,"STL"],
 ["nasa-itokawa","Asteroid Itokawa — print model","small-bodies","Asteroid STL","3D Printing/Asteroid 25143 Itokawa/Asteroid 25143 Itokawa.stl",10018284,"STL"],
 ["nasa-eros","Asteroid Eros — print model","small-bodies","Asteroid STL","3D Printing/Asteroid 433 Eros/Asteroid 433 Eros.stl",10042884,"STL"],
 ["nasa-vesta","Asteroid Vesta — print model","small-bodies","Asteroid STL","3D Printing/Asteroid 4 Vesta (A)/Asteroid 4 Vesta (A).stl",40000084,"STL"],
 ["nasa-mars-gale","Gale Crater — Mars terrain","planetary","Mars terrain STL","3D Printing/Mars - Gale Crater/Mars - Gale Crater.stl",19999984,"STL"],
 ["nasa-mars-tharsis","Tharsis region — Mars terrain","planetary","Mars terrain STL","3D Printing/Mars - Tharsis/Mars - Tharsis.stl",16619134,"STL"],
 ["nasa-valles-marineris","Valles Marineris — Mars terrain","planetary","Mars terrain STL","3D Printing/Mars - Valles Marineris/Mars - Valles Marineris (part 1).stl",24107634,"STL"],
 ["nasa-moon-tycho","Tycho Crater — lunar terrain","planetary","Moon terrain STL","3D Printing/Moon - Tycho/Moon - Tycho.stl",47500084,"STL"],
 ["nasa-moon-copernicus","Copernicus Crater — lunar terrain","planetary","Moon terrain STL","3D Printing/Moon - Copernicus Crater/Moon - Copernicus Crater.stl",27775884,"STL"],
 ["nasa-moon-aristarchus","Aristarchus region — lunar terrain","planetary","Moon terrain STL","3D Printing/Moon - Aristarchus Region/Moon - Aristarchus Region.stl",6492084,"STL"],
 ["nasa-vesta-numisia","Numisia — Vesta terrain","planetary","Vesta terrain STL","3D Printing/Vesta - Numisia/Vesta - Numisia.stl",24514584,"STL"],
 ["nasa-vesta-rheasilvia","Rheasilvia — Vesta terrain","planetary","Vesta terrain STL","3D Printing/Vesta - Rheasilvia/Vesta - Rheasilvia.stl",19999984,"STL"]
];
for(const [id,name,category,kind,path,bytes,format] of NASA_FILES){
 const folder=path.slice(0,path.lastIndexOf("/"));
 const file="https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/"+encodeURI(path);
 const sourceUrl="https://github.com/nasa/NASA-3D-Resources/tree/master/"+encodeURI(folder);
 MODELS.push({id,name,category,kind,source:"NASA",size:bytes>=1e6?(bytes/1e6).toFixed(1)+" MB":Math.round(bytes/1e3)+" kB",format,license:"NASA usage guidelines",credit:name+": NASA 3D Resources",file,sourceUrl,changed:"NASA archive"});
}


 // The same NASA terrain files are also discoverable from the height-map collection.
 for(const model of MODELS.filter(x=>["nasa-mars-gale","nasa-mars-tharsis","nasa-valles-marineris","nasa-moon-tycho","nasa-moon-copernicus","nasa-moon-aristarchus","nasa-vesta-numisia","nasa-vesta-rheasilvia"].includes(x.id))){
  MODELS.push({...model,id:model.id+"-heightmap",category:"height-maps",name:model.name+" (height map)"});
 }

const $=s=>document.querySelector(s);
const home=$("#home-view"),collection=$("#collection-view"),detail=$("#detail-view"),about=$("#about-view"),crumb=$("#breadcrumbs");
let currentCategory=null,currentModel=null;
function setView(view){home.hidden=view!=="home";collection.hidden=view!=="collection";detail.hidden=view!=="detail";about.hidden=view!=="about";}
function setCrumbs(items){crumb.innerHTML=items.map((item,i)=>i===items.length-1?'<span aria-current="page">'+item.label+'</span>':'<a href="'+item.href+'">'+item.label+'</a><span class="crumb-sep">›</span>').join("");}
function routeHome(push=true){currentCategory=null;currentModel=null;setView("home");setCrumbs([{label:"Home"}]);if(push)history.pushState({view:"home"},"","#home");window.scrollTo(0,0);}
function routeCollection(key,push=true){if(!CATEGORIES[key])return;currentCategory=key;currentModel=null;setView("collection");$("#collection-title").textContent=CATEGORIES[key].title;$("#collection-description").textContent=CATEGORIES[key].description;$("#collection-overline").textContent="COLLECTION / "+key.replace("-"," ").toUpperCase();$("#search-input").value="";populateFilters();renderCollection();setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[key].title}]);if(push)history.pushState({view:"collection",key},"","#"+key);window.scrollTo(0,0);}
function populateFilters(){const all=[...MODELS.filter(m=>m.category===currentCategory),...CATEGORIES[currentCategory].sources];const sources=[...new Set(all.map(x=>x.source))].sort();const types=[...new Set(all.map(x=>x.kind||x.type))].sort();$("#source-filter").innerHTML='<option value="all">All sources</option>'+sources.map(x=>'<option>'+x+'</option>').join("");$("#type-filter").innerHTML='<option value="all">All types</option>'+types.map(x=>'<option>'+x+'</option>').join("");}
function renderCollection(){
 const q=$("#search-input").value.trim().toLowerCase(),source=$("#source-filter").value,type=$("#type-filter").value;
 const models=MODELS.filter(x=>x.category===currentCategory&&[x.name,x.kind,x.source,x.credit].join(" ").toLowerCase().includes(q)&&(source==="all"||x.source===source)&&(type==="all"||x.kind===type));
 const sources=CATEGORIES[currentCategory].sources.filter(x=>[x.name,x.type,x.description,x.source].join(" ").toLowerCase().includes(q)&&(source==="all"||x.source===source)&&(type==="all"||x.type===type));
 const modelGrid=$("#model-grid"),sourceGrid=$("#source-grid"),modelGroup=$("#models-group"),sourceGroup=$("#sources-group");
 $("#model-result-count").textContent=models.length+" files";$("#source-result-count").textContent=sources.length+" entries";
 modelGroup.hidden=!models.length&&sources.length>0;sourceGroup.hidden=!sources.length;
 modelGrid.innerHTML=models.map(data=>'<article class="result-card model-card"><div class="result-meta"><span class="result-type model-type">Downloadable model</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>'+data.format+' model · '+data.size+' · '+data.license+'</p><div class="card-bottom"><small>Original file · source credited</small><button class="card-action" data-model="'+data.id+'">View details →</button></div></article>').join("");
 sourceGrid.innerHTML=sources.map(data=>'<article class="result-card source-card source-card-'+(data.entryType||'catalogue')+'"><div class="result-meta"><span class="result-type source-kind">'+({generator:'Generator',catalogue:'Model catalogue',data:'Data catalogue',viewer:'Viewer'}[data.entryType]||'Source')+'</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>'+data.description+'</p><div class="card-bottom"><small>'+(data.entryType==='generator'?'Creates a model from your settings':data.entryType==='data'?'Provides elevation or map data':'Browse source models and information')+'</small><a class="card-action" href="'+data.url+'" target="_blank" rel="noopener">'+(data.entryType==='generator'?'Open generator ↗':'Open source ↗')+'</a></div></article>').join("");
 const total=models.length+sources.length;$("#result-count").textContent=total+" results";
 if(!total)modelGrid.innerHTML='<div class="empty-state">No results match your search and filters. Try a different term or choose “All”.</div>';
 $("#collection-footnote").textContent="Downloadable files and packages are kept separate from catalogues, data sources and generators. Generator tools create new geometry from your settings; they are not individual model downloads."+(expandedCatalogCounts.nasa||expandedCatalogCounts.spaceRadar||expandedCatalogCounts.jpl?" Indexed files: NASA "+expandedCatalogCounts.nasa+"; Space Radar "+expandedCatalogCounts.spaceRadar+"; JPL Radar OBJ "+expandedCatalogCounts.jpl+". The 29 NASA terrain files in Height Maps are cross-listed, not extra downloads.":"")+(expandedCatalogCounts.errors.length?" Some local indexes could not be loaded: "+expandedCatalogCounts.errors.join("; "):"");
}
function routeModel(id,push=true){const model=MODELS.find(x=>x.id===id);if(!model)return;currentModel=model;setView("detail");$("#detail-category").textContent=CATEGORIES[model.category].title.toUpperCase();$("#detail-title").textContent=model.name;$("#detail-subtitle").textContent=model.kind+" · "+model.source;$("#preview-format").textContent=model.format;if(model.format==="GLB"){$("#preview-stage").innerHTML='<model-viewer src="'+model.file+'" alt="3D preview of '+model.name+'" camera-controls auto-rotate shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager"></model-viewer>';}else if(model.format==="STL"){$("#preview-stage").innerHTML='<div class="stl-preview-loading" id="stl-preview-loading">Loading STL geometry…</div>';}else{$("#preview-stage").innerHTML='<div class="preview-placeholder"><span>⬡</span><p>'+model.format+' file ready to download.<br>Preview is not available for this file format.</p></div>'; }$("#preview-controls").hidden=!["GLB","STL"].includes(model.format);$("#scale-panel").hidden=!["GLB","STL"].includes(model.format);const viewer=$("#preview-stage model-viewer");$("#scale-range").value="1";$("#scale-value").textContent="1.0×";const rows=[["File format",model.format],["File size",model.size],["Licence",model.license],["Last updated",model.changed],["Real-world dimensions","Not provided by source"],["Original scale","Calculated below when real dimensions are known"]];$("#spec-list").innerHTML=rows.map(([k,v])=>'<div class="spec-row"><dt>'+k+'</dt><dd>'+v+'</dd></div>').join("");$("#detail-actions").innerHTML='<a class="action-link" href="'+model.file+'" download>Download '+model.format+' ↧</a><a class="action-link secondary" href="'+model.sourceUrl+'" target="_blank" rel="noopener">Source catalogue ↗</a>';$("#source-credit").textContent=model.credit;$("#source-link").href=model.sourceUrl;$("#print-note").textContent=model.format==="STL"?"STL mesh file: preview and dimensions are read from its triangle mesh. STL does not store units; SMA interprets the coordinates as millimetres for the preview and fit estimate. Verify the intended scale in your slicer.":model.format==="7Z"?"This is a compressed model package. Extract it first; the archive may contain several printable parts or assembly instructions.":model.format.includes("STEP")?"STEP CAD file: extract the compressed file if needed, then import the STEP into a compatible CAD tool or slicer.":["OBJ","GLB","FBX","BLEND","3DS","LWO","VSP3"].includes(model.format)?"This is a 3D mesh or project format, not a guaranteed slicer-ready file. If your slicer cannot import it, open it in suitable 3D software and export STL or 3MF. Mesh-to-STEP conversion is not presented as a clean CAD solid.":"No verified print test, community rating, wall-thickness check or orientation assessment is available for this model yet. Dimensions and scale are not supplied in this record.";setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[model.category].title,href:"#"+model.category},{label:model.name}]);if(push)history.pushState({view:"detail",id},"","#model/"+id);window.scrollTo(0,0);}
function routeAbout(push=true){setView("about");setCrumbs([{label:"Home",href:"#home"},{label:"About"}]);if(push)history.pushState({view:"about"},"","#about");window.scrollTo(0,0);}
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>routeCollection(b.dataset.category)));
$("#model-grid").addEventListener("click",e=>{const b=e.target.closest("[data-model]");if(b)routeModel(b.dataset.model);});
$("#search-input").addEventListener("input",renderCollection);$("#source-filter").addEventListener("change",renderCollection);$("#type-filter").addEventListener("change",renderCollection);
$("#about-link").addEventListener("click",e=>{e.preventDefault();routeAbout();});$("#detail-back").addEventListener("click",e=>{e.preventDefault();routeCollection(currentModel.category);});
document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault();routeHome();});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)&&!collection.hidden){e.preventDefault();$("#search-input").focus();}});
window.addEventListener("popstate",e=>{const s=e.state;if(!s||s.view==="home")routeHome(false);else if(s.view==="collection")routeCollection(s.key,false);else if(s.view==="detail")routeModel(s.id,false);else if(s.view==="about")routeAbout(false);});
routeHome(false);

// Load complete source indexes rather than a small hand-picked sample.
const expandedCatalogCounts = { nasa: 0, spaceRadar: 0, jpl: 0, errors: [] };
function addCatalogModel(model) {
  const normalizedFile = model.file ? decodeURI(model.file) : "";
  const exists = MODELS.some(existing =>
    existing.id === model.id ||
    (normalizedFile && existing.file && decodeURI(existing.file) === normalizedFile)
  );
  if (!exists) MODELS.push(model);
}
async function loadExpandedCatalogs() {
  try {
    const response = await fetch("./data/nasa-model-index.json");
    if (!response.ok) throw new Error("NASA index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.nasa = index.sourceFileCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("NASA index: " + error.message);
  }

  try {
    const response = await fetch("./data/spaceradar-model-index.json");
    if (!response.ok) throw new Error("Space Radar index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.spaceRadar = index.sourceFileCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("Space Radar index: " + error.message);
  }

  try {
    const response = await fetch("./data/jpl-asteroid-index.json");
    if (!response.ok) throw new Error("JPL index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.jpl = index.verifiedDirectOBJCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("JPL index: " + error.message);
  }

  if (currentCategory) {
    populateFilters();
    renderCollection();
  }
}
loadExpandedCatalogs();

// --- SMA print preparation: live model dimensions, scale and printer fit ---
(function initPrintAssessment(){
  const $id = id => document.getElementById(id);
  let activeViewer = null;
  let activeSTLMesh = null;
  let baseDimensions = null;
  let threeRenderer = null;
  let threeControls = null;

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
    if(!baseDimensions)return;
    const real=number("real-length"),denominator=number("scale-denominator");
    const hasReal=$id("real-length").value.trim()!=="",hasDenom=$id("scale-denominator").value.trim()!=="";
    const bed=volume(),validBed=bed.every(v=>Number.isFinite(v)&&v>0);
    const longest=Math.max(...baseDimensions);
    let factor=1,originalScale=null,recommendations="";
    if(hasReal&&!(real>0)){
      $id("fit-title").textContent="Check the real-world dimension";$id("fit-description").textContent="Enter a value greater than zero.";
      $id("print-dimensions").textContent="—";$id("scale-factor").textContent="Recommended size factor: —";return;
    }
    if(hasDenom&&(!hasReal||!(denominator>0))){
      $id("fit-title").textContent="Scale denominator needs a real dimension";$id("fit-description").textContent="Enter the verified real-world longest-axis dimension, or clear the desired scale.";
      $id("print-dimensions").textContent="—";$id("scale-factor").textContent="Recommended size factor: —";return;
    }
    if(hasReal){
      originalScale=real/longest;
      const maxFitFactor=validBed?maximumFitFactor(baseDimensions,bed):0;
      const minDenominator=maxFitFactor>0?originalScale/maxFitFactor:Infinity;
      const standard=[1,2,5,10,20,25,50,100,200,250,500,1000,2000,5000,10000];
      const choices=standard.filter(n=>n>=minDenominator);
      const recommended=choices[0]||null;
      const chosen=hasDenom?denominator:recommended;
      if(chosen===null){
        recommendations="<strong>Scale recommendations</strong><p>No standard scale from 1:1 to 1:10,000 fits this build volume. Consider splitting the model or using a larger printer.</p>";
        factor=1;
      }else{
        factor=originalScale/chosen;
        const list=choices.slice(0,5).map(n=>"<li>1:"+n.toLocaleString("en-US")+" · "+fmt(originalScale/n*longest)+" mm long</li>").join("");
        recommendations="<strong>Scale recommendations</strong><p>Largest standard scale that fits: <b>1:"+recommended.toLocaleString("en-US")+"</b>"+(hasDenom?" · showing your selected scale 1:"+denominator.toLocaleString("en-US"):"")+".</p><ul>"+list+"</ul>";
      }
      $id("spec-list").querySelectorAll(".spec-row").forEach(row=>{if(row.querySelector("dt")?.textContent==="Original scale")row.querySelector("dd").textContent="1:"+originalScale.toFixed(2);});
    }else{
      factor=1;
      recommendations="<strong>Scale recommendations</strong><p>Enter the model’s verified real-world longest-axis dimension to calculate its original scale and recommended model scales. Without it, only source-file dimensions can be checked.</p>";
      $id("spec-list").querySelectorAll(".spec-row").forEach(row=>{if(row.querySelector("dt")?.textContent==="Original scale")row.querySelector("dd").textContent="Unknown — real-world dimension not supplied";});
    }
    const size=baseDimensions.map(v=>v*factor);
    $id("model-dimensions").textContent=baseDimensions.map(fmt).join(" × ")+" mm";
    $id("print-dimensions").textContent=size.map(fmt).join(" × ")+" mm";
    $id("scale-factor").textContent="Model size: "+(factor*100).toFixed(2)+"% of source geometry"+(originalScale?" · original file scale 1:"+originalScale.toFixed(2):"");
    $id("scale-recommendations").innerHTML=recommendations;
    const fit=validBed&&fitsSomeRotation(size,bed),result=$id("fit-result");
    result.classList.toggle("is-fit",!!fit);result.classList.toggle("is-no-fit",validBed&&!fit);
    if(!validBed){$id("fit-title").textContent="Enter a valid build volume";$id("fit-description").textContent="All three printer dimensions must be greater than zero.";}
    else if(fit){$id("fit-title").textContent="Fits within the selected build volume";$id("fit-description").textContent="At least one 90° axis-aligned orientation fits inside "+bed.map(fmt).join(" × ")+" mm.";}
    else{$id("fit-title").textContent="Does not fit at this scale";$id("fit-description").textContent="The model exceeds the selected build volume ("+bed.map(fmt).join(" × ")+" mm). Try a smaller scale or split the model.";}
    applyPreviewScale(factor);
  }
  function maximumFitFactor(size,bed){
    const rotations=[[size[0],size[1],size[2]],[size[0],size[2],size[1]],[size[1],size[0],size[2]],[size[1],size[2],size[0]],[size[2],size[0],size[1]],[size[2],size[1],size[0]]];
    return Math.max(...rotations.map(r=>Math.min(...r.map((v,i)=>bed[i]/v))));
  }
  function applyPreviewScale(factor){
    if(activeViewer) activeViewer.scale=factor+" "+factor+" "+factor;
    if(activeSTLMesh) activeSTLMesh.scale.setScalar(factor);
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
  async function attachViewer(){
    activeViewer=document.querySelector("#preview-stage model-viewer");
    activeSTLMesh=null; baseDimensions=null;
    if(!activeViewer){
      const model=currentModel;
      if(!model||model.format!=="STL")return;
      $id("measurement-state").textContent="Loading STL…";
      try{
        const [THREE,loaderModule,controlsModule]=await Promise.all([
          import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"),
          import("https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/STLLoader.js"),
          import("https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js")
        ]);
        if(currentModel!==model)return;
        const stage=$id("preview-stage"),scene=new THREE.Scene();
        scene.background=new THREE.Color(0xf0f3f6);
        const camera=new THREE.PerspectiveCamera(38,stage.clientWidth/360,0.1,100000);
        const renderer=new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(stage.clientWidth,360);stage.replaceChildren(renderer.domElement);
        renderer.domElement.style.cssText="display:block;width:100%;height:360px;touch-action:none";
        scene.add(new THREE.HemisphereLight(0xffffff,0x8796a5,2));
        const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(2,3,4);scene.add(light);
        const geometry=await new loaderModule.STLLoader().loadAsync(model.file);
        if(currentModel!==model){renderer.dispose();return;}
        geometry.computeBoundingBox();
        const size=new THREE.Vector3();geometry.boundingBox.getSize(size);
        const center=new THREE.Vector3();geometry.boundingBox.getCenter(center);geometry.translate(-center.x,-center.y,-center.z);
        activeSTLMesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:0x91a9bb,metalness:.15,roughness:.55}));scene.add(activeSTLMesh);
        const maxDim=Math.max(size.x,size.y,size.z)||1;
        camera.position.set(maxDim*1.7,maxDim*1.3,maxDim*1.9);camera.near=Math.max(maxDim/1000,.001);camera.far=maxDim*100;camera.updateProjectionMatrix();
        const controls=new controlsModule.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
        threeRenderer=renderer;threeControls=controls;baseDimensions=[size.x,size.y,size.z].map(Math.abs);
        $id("measurement-state").textContent="STL measured · units assumed mm";
        $id("model-dimensions").textContent=baseDimensions.map(fmt).join(" × ")+" mm";updateAssessment();
        const animate=()=>{if(currentModel!==model)return;requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);};animate();
        $id("scale-range").oninput=e=>{const v=Number(e.target.value);$id("scale-value").textContent=v.toFixed(2)+"×";applyPreviewScale(v);};
      }catch(error){
        $id("measurement-state").textContent="STL preview unavailable";$id("model-dimensions").textContent="Could not load STL geometry";
        $id("fit-title").textContent="Preview or measurement unavailable";$id("fit-description").textContent="The STL may block cross-origin access or use an unsupported encoding. Download it to inspect it in your slicer.";
        const msg=$id("stl-preview-loading");if(msg)msg.textContent="STL preview could not be loaded. Check the download in your slicer.";
      }
      return;
    }
    activeViewer.scale="1 1 1";$id("measurement-state").textContent="Measuring model…";
    $id("model-dimensions").textContent="Waiting for 3D preview…";$id("print-dimensions").textContent="—";
    activeViewer.addEventListener("load",measureViewer,{once:true});if(activeViewer.loaded)measureViewer();
    $id("scale-range").oninput=e=>{const v=Number(e.target.value);$id("scale-value").textContent=v.toFixed(2)+"×";applyPreviewScale(v);};
  }
  $id("printer-profile").addEventListener("change",()=>{
    $id("custom-volume").hidden = $id("printer-profile").value !== "custom";
    updateAssessment();
  });
  ["bed-x","bed-y","bed-z","real-length","scale-denominator"].forEach(id=>$id(id).addEventListener("input",updateAssessment));
  $id("model-grid").addEventListener("click",e=>{
    if (e.target.closest("[data-model]")) setTimeout(attachViewer,0);
  });
  window.addEventListener("popstate",()=>setTimeout(()=>{
    if (!document.querySelector("#detail-view[hidden]")) attachViewer();
  },0));
})();
