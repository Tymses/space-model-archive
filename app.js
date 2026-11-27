const CATEGORIES={
 spacecraft:{title:"Spacecraft",description:"Satellites, probes, landers, crewed vehicles and space stations.",sources:[
  {name:"Space Radar Models",entryType:"catalogue",type:"3D model catalogue",description:"203 individually downloadable spacecraft GLB models, with file size, licence and credit per model.",url:"https://models.spaceradar.ai/",source:"Space Radar"},
  {name:"ESA Sci-Fleet",entryType:"catalogue",type:"Interactive 3D catalogue",description:"Explore ESA science satellites across the Solar System.",url:"https://scifleet.esa.int/",source:"ESA"},
  {name:"NASA 3D Resources",entryType:"catalogue",type:"3D model catalogue",description:"NASA mission models, including spacecraft, rockets, rovers and instruments.",url:"https://science.nasa.gov/3d-resources/",source:"NASA"},
  {name:"Satellites & Probes",entryType:"catalogue",type:"3D model catalogue",description:"Spacecraft and satellite GLB models from models.codelove.in.",url:"https://models.codelove.in/models/category/space/",source:"models.codelove.in"},
  {name:"Space Radar map assets",entryType:"viewer",type:"Interactive 3D map and asset pack",description:"Open Space Radar's live map to explore the additional spacecraft and mission assets used in the visualisation. The separate asset-pack page lists the public spacecraft downloads.",url:"https://www.spaceradar.ai/",creditsUrl:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"Cosmographia",entryType:"viewer",type:"Scientific visualisation",description:"SPICE-enhanced models and visualisations for Solar System exploration.",url:"https://naif.jpl.nasa.gov/naif/cosmographia.html",source:"NASA/JPL"}
 ]},
 planetary:{title:"Planetary features",description:"Craters, mountains, valleys, volcanoes and other surface features.",sources:[
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Explore planetary surfaces and generate 3D-printable terrain files for supported worlds and locations.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"Terrain Print",entryType:"generator",type:"Terrain generator",description:"Create 3D-printable terrain from elevation data for the Moon, Mars and Earth; set size, relief and split pieces.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"USGS Astropedia",entryType:"data",type:"Scientific data catalogue",description:"Search planetary cartographic products, topographic maps, mosaics and digital elevation models.",url:"https://astrogeology.usgs.gov/search",source:"USGS"}
 ]},
 "small-bodies":{title:"Asteroids, comets & meteorites",description:"Shape models of asteroids and comets, plus scanned extraterrestrial meteorite samples.",sources:[
  {name:"3D Asteroid Catalogue",entryType:"catalogue",type:"Small-body shape-model catalogue",description:"The source reports 1,635 asteroids, 5 comets, 2 dwarf planets, 37 moons, 3,079 shape models and 54 textures. SPACEMESHER includes a curated selection of 256 numbered asteroids; each record opens the original object page with its available OBJ/PLY model downloads and source attribution. The full source listing remains linked separately.",url:"https://3d-asteroids.space/",source:"3D Asteroid Catalogue"},
  {name:"Comet shape-model catalogue — 5 comets",entryType:"catalogue",type:"Comet shape-model catalogue",description:"Browse the five comets with shape models in the source catalogue: 67P/Churyumov-Gerasimenko, 1P/Halley, 103P/Hartley 2, 9P/Tempel 1 and 81P/Wild 2. Individual comet entries are also listed below.",url:"https://3d-asteroids.space/comets/",source:"3D Asteroid Catalogue"},
  {name:"Dwarf-planet shape-model catalogue — 2 objects",entryType:"catalogue",type:"Dwarf-planet shape-model catalogue",description:"Browse the two dwarf planets represented in this source catalogue: (1) Ceres and Pluto. Their individual catalogue entries are listed below.",url:"https://3d-asteroids.space/dwarf",source:"3D Asteroid Catalogue"},
  {name:"Asteroid shape-model index — 1,635 objects",entryType:"catalogue",type:"Asteroid shape-model index",description:"Browse all 1,635 asteroid records in the original catalogue. Individual pages provide available shape-model variants, PLY/OBJ file sizes, physical characteristics, orbital data, textures and research references.",url:"https://3d-asteroids.space/asteroids/",source:"3D Asteroid Catalogue"},
  {name:"67P — NASA PDS / Rosetta shape-model dataset",entryType:"data",type:"Scientific shape-model archive",description:"Official NASA PDS dataset RO-C-MULTI-5-67P-SHAPE-V2.0 contains multiple OSIRIS and NAVCAM shape-model products and reference frames. The dataset page links to the Small Bodies Node archive.",url:"https://pds.nasa.gov/ds-view/pds/viewDataset.jsp?dsid=RO-C-MULTI-5-67P-SHAPE-V2.0",source:"NASA PDS"},
  {name:"Halley — NASA PDS Stooke archive",entryType:"data",type:"Scientific shape-model archive",description:"The downloadable PDS4 ZIP contains Stooke shape models for Halley as well as other small bodies, including asteroids and planetary moons; it is therefore catalogued as a multi-object archive, not as a Halley-only file.",url:"https://sbn.psi.edu/pds/resource/stkshape.html",source:"NASA PDS"},
  {name:"103P — NASA PDS EPOXI shape-model dataset",entryType:"data",type:"Scientific shape-model archive",description:"NASA PDS documents the original HARTLEY2_2012_PLAN.TAB plate model and a Cartesian VRML model. The dataset archive is linked from its PDS record.",url:"https://pds.nasa.gov/ds-view/pds/viewProfile.jsp?dsid=DIF-C-HRIV%2FMRI-5-HARTLEY2-SHAPE-V1.0",source:"NASA PDS"},
  {name:"9P — NASA PDS Deep Impact / Stardust dataset",entryType:"data",type:"Scientific shape-model archive",description:"Official NASA PDS archive contains the plate model derived from Deep Impact and Stardust NExT images. A 3.0 MB downloadable ZIP is listed in the PDS Small Bodies Node.",url:"https://pdssbn.astro.umd.edu/holdings/dif-c-hriv_its_mri-5-tempel1-shape-v2.0/dataset.shtml",source:"NASA PDS"},
  {name:"81P — NASA PDS Stardust shape-model dataset",entryType:"data",type:"Scientific shape-model archive",description:"NASA PDS archive includes the basic triaxial ellipsoid and detailed plate model derived from Stardust NAVCAM images.",url:"https://pds.nasa.gov/ds-view/pds/viewDataset.jsp?dsid=SDU-C-NAVCAM-5-WILD2-SHAPE-MODEL-V2.1",source:"NASA PDS"},
  {name:"Space Radar shape models",entryType:"viewer",type:"Interactive 3D map / shape-model viewer",description:"Explore asteroid, comet and dwarf-planet shapes in Space Radar's interactive map. The models come from their original scientific archives; Space Radar's credits register documents the individual source datasets and licences.",url:"https://www.spaceradar.ai/",creditsUrl:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Bennu, Ceres, Ryugu and Vesta are among the bodies with pre-generated 3D globe print files.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"NASA/JPL Radar Astronomy",entryType:"catalogue",type:"Asteroid shape models",description:"19 individually indexed direct OBJ downloads from JPL's radar-derived asteroid shape-model collection. OBJ meshes may need conversion to STL for some slicers.",url:"https://echo.jpl.nasa.gov/asteroids/shapes/shapes.html",source:"NASA/JPL"},
  {name:"NASA Astromaterials 3D — meteorite samples",entryType:"catalogue",type:"Meteorite specimen mesh catalogue",description:"NASA's Antarctic Meteorite Collection includes scanned specimen models. Each sample detail page offers high- and low-resolution OBJ mesh ZIP downloads; NASA states the data is public domain and requests NASA credit. These are real meteorite specimens, not whole-asteroid shape models.",url:"https://ares.jsc.nasa.gov/astromaterials3d/sample-catalog.htm",source:"NASA"},
  {name:"NASA Astromaterials 3D — Explorer",entryType:"catalogue",type:"Interactive meteorite and lunar sample viewer",description:"Explore individual Antarctic meteorites and Apollo lunar samples in 3D, inspect their metadata and open sample-specific downloads.",url:"https://ares.jsc.nasa.gov/astromaterials3d/explorer/",source:"NASA"},
  {name:"NASA Astromaterials 3D — Sketchfab collection",entryType:"catalogue",type:"Meteorite and lunar sample models",description:"NASA Johnson Space Center's Astromaterials 3D account publishes 43 downloadable sample models, including Antarctic meteorites and Apollo lunar samples. Check each model's available download options.",url:"https://sketchfab.com/Astromaterials3D",source:"NASA Johnson Space Center"},
  {name:"868 meteorite and rock-fragment shape models",entryType:"catalogue",type:"Meteorite OBJ dataset",description:"Research dataset with 868 high-resolution OBJ meshes from X-ray micro-CT scans. It contains two meteorite-fragment datasets from NWA 869 and one terrestrial-rock dataset; the three ZIP archives are downloadable from Zenodo.",url:"https://doi.org/10.5281/zenodo.14850374",source:"Czech Academy of Sciences / Zenodo"}
 ]},
 moons:{title:"Moons",description:"Natural satellites of planets and dwarf planets, with downloadable shape models and NASA surface-data portals.",sources:[
  {name:"NASA Solar System Treks — Moon catalogue",entryType:"catalogue",type:"3D surface-data and print portal catalogue",description:"NASA moon portals include Phobos, Io, Europa, Ganymede, Callisto, Titan, Earth’s Moon and Icy Moons Treks. Explore mission-derived surface data, 3D views and print selected terrain areas. These are interactive data portals, not one fixed downloadable model per moon.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"Space Radar moon shape models",entryType:"viewer",type:"Interactive 3D map / moon-shape viewer",description:"Explore 11 Saturn-moon shape models in Space Radar's interactive map. The separate credits register identifies the original datasets and licence or attribution conditions.",url:"https://www.spaceradar.ai/",creditsUrl:"https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md",source:"Space Radar"},
  {name:"NASA Planetary Data System — satellite shape models",entryType:"data",type:"Scientific shape-model archive",description:"NASA PDS lists a shape-model dataset containing Phobos, Deimos, Hyperion, Janus and Epimetheus, alongside asteroid models. The archive landing page provides dataset access and format details.",url:"https://pds.nasa.gov/ds-view/pds/viewDataset.jsp?dsid=EAR-A-5-DDR-SHAPE-MODELS-V1.0",source:"NASA PDS"},
  {name:"3D Asteroid Catalogue — 37 planetary satellites",entryType:"catalogue",type:"Moon shape-model catalogue",description:"The catalogue lists 37 planetary satellites across Earth, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto. Open the original list to select a moon; individual pages expose model variants, OBJ/PLY downloads, physical parameters and research references. SPACEMESHER now includes 37 individual moon catalogue-reference records; these open the source moon list and are not direct mesh downloads.",url:"https://3d-asteroids.space/moons/",source:"3D Asteroid Catalogue"}
 ]},
 "height-maps":{title:"Terrain data & printable terrain",description:"Elevation data, printable terrain models and tools to create 3D terrain.",sources:[
  {name:"USGS Astropedia",entryType:"data",type:"Elevation data catalogue",description:"Search planetary digital elevation models, topographic maps and geospatial products.",url:"https://astrogeology.usgs.gov/search",source:"USGS"},
  {name:"NASA Solar System Treks",entryType:"generator",type:"Terrain generator",description:"Explore planetary elevation and generate 3D-printable globes or local terrain files where available.",url:"https://trek.nasa.gov/#",source:"NASA/JPL"},
  {name:"Terrain Print",entryType:"generator",type:"Terrain generator",description:"Build terrain tiles from Moon, Mars and Earth elevation data; adjust vertical exaggeration and split for a printer bed.",url:"https://triunitystudios.com/web-projects/terrain-print/",source:"Guillem Poy"},
  {name:"Space Radar — Maps",entryType:"data",type:"Relief-map data",description:"Relief and colour maps derived from public-domain spacecraft data.",url:"https://dus32w6mqcntr.cloudfront.net/assets/index.html",source:"Space Radar"}
 ]}
};
const MODELS=[
 {id:"hubble",name:"Hubble Space Telescope",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"408 kB",format:"GLB",license:"CC BY 4.0",credit:"Hubble Space Telescope: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hubble.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=hubble",changed:"2026-10-21"},
 {id:"hubble-sts31",name:"Hubble at release (STS-31, 1990)",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"439 kB",format:"GLB",license:"CC BY 4.0",credit:"Hubble at release (STS-31, 1990): Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hubble-sts31.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=hubble-sts31",changed:"2026-11-04"},
 {id:"shuttle-rms",name:"Space Shuttle robot arm",category:"spacecraft",kind:"Space Shuttle hardware",source:"Space Radar",size:"39 kB",format:"GLB",license:"CC BY 4.0",credit:"Space Shuttle robot arm: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/shuttle-rms.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=shuttle-rms",changed:"2026-11-18"},
 {id:"msl-entry",name:"Curiosity's entry capsule",category:"spacecraft",kind:"Mars mission hardware",source:"Space Radar",size:"60 kB",format:"GLB",license:"CC BY 4.0",credit:"Curiosity's entry capsule: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/msl-entry.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=msl-entry",changed:"2026-11-04"},
 {id:"msl-descent-stage",name:"Curiosity's descent stage",category:"spacecraft",kind:"Mars mission hardware",source:"Space Radar",size:"78 kB",format:"GLB",license:"CC BY 4.0",credit:"Curiosity's descent stage: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/msl-descent-stage.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=msl-descent-stage",changed:"2026-11-04"},
 {id:"cygnus",name:"Cygnus",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"141 kB",format:"GLB",license:"CC BY 4.0",credit:"Cygnus: Space Radar (spaceradar.ai), CC BY 4.0; generated with TRELLIS (MIT) from a public-domain NASA picture",file:"https://www.spaceradar.ai/models/cygnus.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=cygnus",changed:"2026-10-13"},
 {id:"nustar",name:"NuSTAR",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"43 kB",format:"GLB",license:"CC BY 4.0",credit:"NuSTAR: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/nustar.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=nustar",changed:"2026-10-13"},
 {id:"xrism",name:"XRISM",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"72 kB",format:"GLB",license:"CC BY 4.0",credit:"XRISM: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/xrism.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=xrism",changed:"2026-11-18"},
 {id:"noaa21",name:"NOAA-21",category:"spacecraft",kind:"Weather satellite",source:"Space Radar",size:"51 kB",format:"GLB",license:"CC BY 4.0",credit:"NOAA-21: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/noaa21.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=noaa21",changed:"2026-10-13"},
 {id:"seasat",name:"Seasat",category:"spacecraft",kind:"Earth observation satellite",source:"Space Radar",size:"66 kB",format:"GLB",license:"CC BY 4.0",credit:"Seasat: Space Radar (spaceradar.ai), CC BY 4.0; generated with TRELLIS (MIT) from a public-domain NASA picture",file:"https://www.spaceradar.ai/models/seasat.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=seasat",changed:"2026-10-13"},
 {id:"hitomi",name:"Hitomi",category:"spacecraft",kind:"Space telescope",source:"Space Radar",size:"98 kB",format:"GLB",license:"CC BY 4.0",credit:"Hitomi: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/hitomi.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=hitomi",changed:"2026-11-18"},
 {id:"lageos",name:"Lageos",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"50 kB",format:"GLB",license:"CC BY 4.0",credit:"Lageos: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/lageos.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=lageos",changed:"2026-10-13"},
 {id:"ajisai",name:"Ajisai",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"92 kB",format:"GLB",license:"CC BY 4.0",credit:"Ajisai: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/ajisai.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=ajisai",changed:"2026-10-13"},
 {id:"soyuz-ms",name:"Soyuz MS",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"59 kB",format:"GLB",license:"CC BY 4.0",credit:"Soyuz MS: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/soyuz-ms.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=soyuz-ms",changed:"2026-10-13"},
 {id:"progress-ms",name:"Progress MS",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"64 kB",format:"GLB",license:"CC BY 4.0",credit:"Progress MS: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/progress-ms.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=progress-ms",changed:"2026-10-13"},
 {id:"dragon-crew",name:"Crew Dragon",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"53 kB",format:"GLB",license:"CC BY 4.0",credit:"Crew Dragon: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/dragon-crew.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=dragon-crew",changed:"2026-10-13"},
 {id:"dragon-cargo",name:"Cargo Dragon",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"46 kB",format:"GLB",license:"CC BY 4.0",credit:"Cargo Dragon: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/dragon-cargo.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=dragon-cargo",changed:"2026-10-13"},
 {id:"shenzhou",name:"Shenzhou",category:"spacecraft",kind:"Crewed spacecraft",source:"Space Radar",size:"66 kB",format:"GLB",license:"CC BY 4.0",credit:"Shenzhou: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/shenzhou.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=shenzhou",changed:"2026-10-13"},
 {id:"tianzhou",name:"Tianzhou",category:"spacecraft",kind:"Cargo spacecraft",source:"Space Radar",size:"47 kB",format:"GLB",license:"CC BY 4.0",credit:"Tianzhou: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/tianzhou.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=tianzhou",changed:"2026-10-13"},
 {id:"starlette",name:"Starlette",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"47 kB",format:"GLB",license:"CC BY 4.0",credit:"Starlette: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/starlette.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=starlette",changed:"2026-10-13"},
 {id:"lares",name:"Lares",category:"spacecraft",kind:"Geodetic satellite",source:"Space Radar",size:"32 kB",format:"GLB",license:"CC BY 4.0",credit:"Lares: Space Radar (spaceradar.ai), CC BY 4.0",file:"https://www.spaceradar.ai/models/lares.glb",sourceUrl:"https://www.spaceradar.ai/model/?id=lares",changed:"2026-10-13"}
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
 const sourceUrl="https://science.nasa.gov/3d-resources/";
 MODELS.push({id,name,category,kind,source:"NASA",size:bytes>=1e6?(bytes/1e6).toFixed(1)+" MB":Math.round(bytes/1e3)+" kB",format,license:"NASA usage guidelines",credit:name+": NASA 3D Resources",file,sourceUrl,changed:"NASA archive"});
}


 // The same NASA terrain files are also discoverable from the height-map collection.
 for(const model of MODELS.filter(x=>["nasa-mars-gale","nasa-mars-tharsis","nasa-valles-marineris","nasa-moon-tycho","nasa-moon-copernicus","nasa-moon-aristarchus","nasa-vesta-numisia","nasa-vesta-rheasilvia"].includes(x.id))){
  MODELS.push({...model,id:model.id+"-heightmap",category:"height-maps",name:model.name+" (terrain model)"});
 }

// Source links must be verified, model-specific pages. Never infer a page URL
// from a filename or model title: plausible slugs are not proof that a page exists.
const NASA_VERIFIED_MODEL_PAGES = new Map([
 ["1999 rq36 asteroid","https://science.nasa.gov/3d-resources/1999-rq36-asteroid/"],
 ["70 meter dish","https://science.nasa.gov/3d-resources/70-meter-dish/"],
 ["active cavity irradiance monitor satellite acrimsat a","https://science.nasa.gov/3d-resources/active-cavity-irradiance-monitor-satellite-acrimsat-a/"],
 ["active cavity irradiance monitor satellite acrimsat b","https://science.nasa.gov/3d-resources/active-cavity-irradiance-monitor-satellite-acrimsat-b/"],
 ["advanced composition explorer","https://science.nasa.gov/3d-resources/advanced-composition-explorer/"],
 ["advanced crew escape suit","https://science.nasa.gov/3d-resources/advanced-crew-escape-suit/"],
 ["advanced technology large aperture space telescope atlast","https://science.nasa.gov/3d-resources/advanced-technology-large-aperture-space-telescope-atlast/"],
 ["aeronomy of ice in the mesosphere","https://science.nasa.gov/3d-resources/aeronomy-of-ice-in-the-mesosphere/"],
 ["agena target vehicle","https://science.nasa.gov/3d-resources/agena-target-vehicle/"],
 ["apollo 11 landing site","https://science.nasa.gov/3d-resources/apollo-11-landing-site/"],
 ["apollo 11 view of the moon","https://science.nasa.gov/3d-resources/apollo-11-view-of-the-moon/"],
 ["apollo 12 landing site","https://science.nasa.gov/3d-resources/apollo-12-landing-site/"],
 ["apollo 14 landing site","https://science.nasa.gov/3d-resources/apollo-14-landing-site/"],
 ["apollo 15 landing site","https://science.nasa.gov/3d-resources/apollo-15-landing-site/"],
 ["apollo 16 landing site","https://science.nasa.gov/3d-resources/apollo-16-landing-site/"],
 ["apollo lunar module","https://science.nasa.gov/3d-resources/apollo-lunar-module/"],
 ["voyager probe b","https://science.nasa.gov/3d-resources/voyager-probe-b/"],
 ["deep impact","https://science.nasa.gov/3d-resources/deep-impact/"],
 ["epoxi","https://science.nasa.gov/3d-resources/deep-impact/"],
 ["epoxi without impactor","https://science.nasa.gov/3d-resources/deep-impact/"],
 ["asteroid 216 kleopatra","https://science.nasa.gov/3d-resources/asteroid-216-kleopatra/"],
 ["asteroid 25143 itokawa","https://science.nasa.gov/3d-resources/asteroid-25143-itokawa/"],
 ["asteroid 4 vesta a","https://science.nasa.gov/3d-resources/asteroid-4-vesta-a/"],
 ["asteroid 4 vesta b","https://science.nasa.gov/3d-resources/asteroid-4-vesta-b/"],
 ["apollo 16 landing site","https://science.nasa.gov/3d-resources/apollo-16-landing-site/"],
 ["curiosity landing site","https://science.nasa.gov/3d-resources/curiosity-landing-site/"],
 ["asteroid 8567 1996 hw1","https://science.nasa.gov/3d-resources/asteroid-8567-1996-hw1/"],
 ["asteroid 6489 golevka","https://science.nasa.gov/3d-resources/asteroid-6489-golevka/"],
 ["asteroid 4486 mithra","https://science.nasa.gov/3d-resources/asteroid-4486-mithra/"],
 ["asteroid 4179 toutatis","https://science.nasa.gov/3d-resources/asteroid-4179-toutatis/"],
 ["asteroid 433 eros","https://science.nasa.gov/3d-resources/asteroid-433-eros/"]
]);
function normalizeSourceTitle(value){
 return String(value||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
  .toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}
function setSpecificModelSource(model){
  const file=model.file||"";
  const originalSource=model.sourcePageUrl||model.sourceUrl||"";
  try{
    const asset=file?new URL(file):null;
    const source=originalSource?new URL(originalSource):null;
    const generic=!source||source.pathname==="/"||
      ["/3d-resources/","/3d-resources","/models/","/models","/"].includes(source.pathname)||
      (source.hostname==="3d-asteroids.space"&&source.pathname==="/moons/");
    if(asset&&asset.hostname==="raw.githubusercontent.com"&&
       asset.pathname.includes("/NASA-3D-Resources/")){
      const parts=decodeURIComponent(asset.pathname).split("/").filter(Boolean);
      const marker=parts.findIndex(part=>part==="3D Models"||part==="3D Printing");
      if(marker>=0&&parts.length>marker+2){
        const directory=parts.slice(marker,parts.length-1).join("/");
        model.folderKey="nasa:"+directory.toLowerCase();
        model.folderName=parts[parts.length-2];
      }
      const folderPage="https://github.com/nasa/NASA-3D-Resources/tree/master/"+parts.slice(marker,parts.length-1).map(encodeURIComponent).join("/");
      const verifiedPage=NASA_VERIFIED_MODEL_PAGES.get(normalizeSourceTitle(model.name))||NASA_VERIFIED_MODEL_PAGES.get(normalizeSourceTitle(model.folderName));
      const suppliedNasaPage=source&&source.hostname==="science.nasa.gov"&&source.pathname.startsWith("/3d-resources/")?source.toString():null;
      model.sourcePageUrl=verifiedPage||suppliedNasaPage||"https://science.nasa.gov/3d-resources/";
    }else if(asset&&asset.hostname==="www.spaceradar.ai"&&asset.pathname.startsWith("/models/")&&model.source==="Space Radar map assets"){
      const slug=decodeURIComponent(asset.pathname.split("/").pop()).replace(/\.glb$/i,"");
      model.sourcePageUrl="https://www.spaceradar.ai/model/?id="+encodeURIComponent(slug);
    }else if(generic){
      // A catalogue homepage, model-file host or GitHub mirror is not a
      // model-specific source page. Leave the source link unavailable until
      // the exact original record has been found and added to the data.
      model.sourcePageUrl=null;
    }else{
      // Keep explicitly supplied deep links, including provider record IDs.
      model.sourcePageUrl=source.toString();
    }
  }catch{
    if(!originalSource)model.sourcePageUrl=null;
  }
  if(model.sourcePageUrl)model.sourceUrl=model.sourcePageUrl;
  else model.sourceUrl=null;
  return model;
}
for(const model of MODELS)setSpecificModelSource(model);

const $=s=>document.querySelector(s);
const home=$("#home-view"),collection=$("#collection-view"),detail=$("#detail-view"),about=$("#about-view"),scaling=$("#scaling-view"),crumb=$("#breadcrumbs");
let currentCategory=null,currentModel=null,scalingSourceModel=null;
function setView(view){home.hidden=view!=="home";collection.hidden=view!=="collection";detail.hidden=view!=="detail";about.hidden=view!=="about";scaling.hidden=view!=="scaling";}
function setCrumbs(items){crumb.innerHTML=items.map((item,i)=>i===items.length-1?'<span aria-current="page">'+item.label+'</span>':'<a href="'+item.href+'">'+item.label+'</a><span class="crumb-sep">›</span>').join("");}
crumb.addEventListener("click",event=>{
 const link=event.target.closest("a[href]");
 if(!link)return;
 const target=link.getAttribute("href");
 if(target==="#home"){event.preventDefault();routeHome();return;}
 const categoryKey=target.slice(1);
 if(CATEGORIES[categoryKey]){event.preventDefault();routeCollection(categoryKey);}
});
function routeHome(push=true){currentCategory=null;currentModel=null;setView("home");setCrumbs([{label:"Home"}]);if(push)history.pushState({view:"home"},"","#home");window.scrollTo(0,0);}
function routeCollection(key,push=true){if(!CATEGORIES[key])return;currentCategory=key;currentModel=null;setView("collection");$("#collection-title").textContent=CATEGORIES[key].title;$("#collection-description").textContent=CATEGORIES[key].description;$("#collection-overline").textContent=key==="small-bodies"?"COLLECTION / ASTEROIDS & COMETS":"COLLECTION / "+key.replace("-"," ").toUpperCase();$("#search-input").value="";populateFilters();renderCollection();setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[key].title}]);if(push)history.pushState({view:"collection",key},"","#"+key);window.scrollTo(0,0);}
function populateFilters(){const all=[...MODELS.filter(m=>m.category===currentCategory),...CATEGORIES[currentCategory].sources];const sources=[...new Set(all.map(x=>x.source))].sort();const types=[...new Set(all.map(x=>x.kind||x.type))].sort();$("#source-filter").innerHTML='<option value="all">All sources</option>'+sources.map(x=>'<option>'+x+'</option>').join("");$("#type-filter").innerHTML='<option value="all">All types</option>'+types.map(x=>'<option>'+x+'</option>').join("");}
function normalizeSearchText(value){return String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();}
function matchesSearch(query,values){
 const terms=[...new Set(normalizeSearchText(query).split(/\s+/).filter(Boolean))];
 if(!terms.length)return true;
 const haystack=normalizeSearchText(values.filter(value=>value!=null).join(" "));
 const words=new Set(haystack.split(" "));
 return terms.every(term=>/^\d+$/.test(term)?words.has(term):haystack.includes(term));
}
function findCrossListedModel(model){
 if(!model)return null;
 const counterpartId=model.category==="height-maps"?model.id.replace(/-heightmap$/ ,""):model.id+"-heightmap";
 if(counterpartId===model.id)return null;
 const counterpart=MODELS.find(item=>item.id===counterpartId);
 return counterpart&&counterpart.category!==model.category?counterpart:null;
}
function calculateFitToBuildPlate(sourceMm,bedMm,marginMm=5,adjustmentPercent=100){
 if(!Array.isArray(sourceMm)||!Array.isArray(bedMm)||sourceMm.length!==3||bedMm.length!==3||!sourceMm.every(v=>Number.isFinite(v)&&v>0)||!bedMm.every(v=>Number.isFinite(v)&&v>0)||!Number.isFinite(marginMm)||marginMm<0||!Number.isFinite(adjustmentPercent)||adjustmentPercent<=0)return {valid:false};
 const usableBed=bedMm.map(v=>v-2*marginMm);if(!usableBed.every(v=>Number.isFinite(v)&&v>0))return {valid:false,usableBed};
 const rotations=[[sourceMm[0],sourceMm[1],sourceMm[2]],[sourceMm[0],sourceMm[2],sourceMm[1]],[sourceMm[1],sourceMm[0],sourceMm[2]],[sourceMm[1],sourceMm[2],sourceMm[0]],[sourceMm[2],sourceMm[0],sourceMm[1]],[sourceMm[2],sourceMm[1],sourceMm[0]]];
 let maxFactor=0,orientation=null;for(const rotation of rotations){const factor=Math.min(...rotation.map((v,i)=>usableBed[i]/v));if(factor>maxFactor){maxFactor=factor;orientation=rotation;}}
 const factor=maxFactor*adjustmentPercent/100,printDimensions=sourceMm.map(v=>v*factor),fits=rotations.some(rotation=>rotation.every((v,i)=>v*factor<=usableBed[i]+1e-9));
 return {valid:true,maxFactor,factor,orientation,usableBed,printDimensions,fits,adjustmentPercent,marginMm};
}
function calculateCustomScaleDenominator(sourceMm,realDimensionMm,axis="longest"){
 if(!Array.isArray(sourceMm)||sourceMm.length!==3||!sourceMm.every(v=>Number.isFinite(v)&&v>0)||!Number.isFinite(realDimensionMm)||realDimensionMm<=0)return null;
 const index=axis==="longest"?sourceMm.indexOf(Math.max(...sourceMm)):Number(axis);if(!Number.isInteger(index)||index<0||index>2)return null;
 return realDimensionMm/sourceMm[index];
}
function describeOriginalScale(originalScale){
 if(!Number.isFinite(originalScale)||originalScale<=0)return "Real-world comparison unavailable";
 const difference=(1/originalScale-1)*100;
 if(Math.abs(difference)<0.05)return "Original file matches the real-world reference within rounding";
 const amount=Math.abs(difference).toFixed(1)+"%";
 return difference>0?"Original file is "+amount+" larger than the real-world reference":"Original file is "+amount+" smaller than the real-world reference";
}
function normalizeConversionFormat(value){
 const format=String(value||"").trim().toUpperCase();
 return /\bSTEP\b.*\b(?:GZIP|GZ)\b/.test(format)?"STEP":format;
}
function supportsStlConversion(value){return ["FBX","3DS","LWO","BLEND","STEP","STP"].includes(normalizeConversionFormat(value));}

function renderCollection(){
 const q=$("#search-input").value.trim(),source=$("#source-filter").value,type=$("#type-filter").value;
 const isArchiveEntry=x=>["ZIP","7Z","TAR","GZ"].includes(String(x.format||"").toUpperCase())||/\bGZIP\b/i.test(String(x.format||""));
 const isDirectMesh=x=>x.downloadDirect!==false&&!isArchiveEntry(x)&&["GLB","GLTF","STL","OBJ","PLY","STEP","STP","FBX","BLEND","3DS","LWO","VSP3"].includes(String(x.format||"").toUpperCase());
 const matchesModel=x=>x.category===currentCategory&&matchesSearch(q,[x.name,x.kind,x.source,x.credit,x.description,x.id,x.format,x.file,x.remotePageUrl,...(x.aliases||[])])&&(source==="all"||x.source===source)&&(type==="all"||x.kind===type);
 const models=MODELS.filter(x=>matchesModel(x)&&isDirectMesh(x)&&!x.remoteCandidate);
 const archives=MODELS.filter(x=>matchesModel(x)&&isArchiveEntry(x));
 const remoteCandidates=MODELS.filter(x=>matchesModel(x)&&x.remoteCandidate&&!x.remoteResolvedParent);
 const remotePageUrls=new Set(MODELS.filter(x=>x.remoteCandidate).map(x=>x.remotePageUrl));
 const entries=CATEGORIES[currentCategory].sources.filter(x=>!remotePageUrls.has(x.url)&&matchesSearch(q,[x.name,x.type,x.description,x.source,x.url])&&(source==="all"||x.source===source)&&(type==="all"||x.type===type));
 const sources=entries.filter(x=>x.entryType!=="generator"),generators=entries.filter(x=>x.entryType==="generator");
 const modelGrid=$("#model-grid"),archiveGrid=$("#archive-grid"),remoteModelGrid=$("#remote-model-grid"),sourceGrid=$("#source-grid"),generatorGrid=$("#generator-grid");
 const modelGroup=$("#models-group"),archiveGroup=$("#archives-group"),remoteModelGroup=$("#remote-models-group"),sourceGroup=$("#sources-group"),generatorGroup=$("#generators-group");
 const folderGroups=new Map(),folderNames=new Map(),individualModels=[];
 const getFolderInfo=model=>{
  if(model.folderKey)return {key:model.folderKey,name:model.folderName||model.name};
  try{
   const asset=new URL(model.file);
   if(asset.hostname.toLowerCase()!=="raw.githubusercontent.com")return null;
   const parts=asset.pathname.split("/").filter(Boolean);
   const branchIndex=parts.findIndex((part,index)=>index>=2&&(part==="main"||part==="master"));
   if(branchIndex<0)return null;
   const relative=parts.slice(branchIndex+1).map(part=>decodeURIComponent(part));
   if(relative.length<3||!["3D Models","3D Printing"].includes(relative[0]))return null;
   const directory=relative.slice(0,-1);
   return {key:model.category+"|"+directory.join("/"),name:directory[directory.length-1]};
  }catch{return null;}
 };
 modelGroup.hidden=!models.length;archiveGroup.hidden=!archives.length;remoteModelGroup.hidden=!remoteCandidates.length;sourceGroup.hidden=!sources.length;generatorGroup.hidden=!generators.length;
 const escapeCardText=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
 const archiveCardNote=data=>{
  const format=String(data.format||"").toUpperCase();
  if(format==="7Z")return "7Z package · "+data.size+" · extract a mesh file from the archive before preview or STL conversion";
  if(format==="ZIP")return "ZIP package · "+data.size+" · may contain multiple models; select a mesh file before STL conversion";
  if(format==="VSP3")return "OpenVSP project · "+data.size+" · export a mesh from OpenVSP before browser scaling";
  if(/STEP/.test(format))return "Compressed STEP model · "+data.size+" · convert to STL in the browser";
  return data.format+" · "+data.size+" · "+data.license;
 };
 const renderModelCard=data=>{const counterpart=findCrossListedModel(data);const crossLabel=counterpart?'<span class="cross-listing-label">Also in: '+escapeCardText(CATEGORIES[counterpart.category].title)+'</span>':"";return '<article class="result-card model-card"><div class="result-meta"><span class="result-type model-type">Individual model · '+escapeCardText(data.format)+'</span><span class="result-source">'+escapeCardText(data.source)+'</span></div><h2>'+escapeCardText(data.name)+'</h2>'+crossLabel+'<p>'+escapeCardText(data.format+' model · '+data.size+' · '+data.license)+'</p><div class="card-bottom"><small>Individual model file · source credited</small><button class="card-action" data-model="'+escapeCardText(data.id)+'">View details →</button></div></article>';};
 for(const model of models){
  const folderInfo=getFolderInfo(model);
  const key=folderInfo?.key||null;
  if(key){
   if(!folderGroups.has(key))folderGroups.set(key,[]);
   folderGroups.get(key).push(model);
   if(!folderNames.has(key))folderNames.set(key,model.folderName||folderInfo.name||model.name);
  }else individualModels.push(model);
 }
 const folderCount=[...folderGroups.values()].filter(items=>items.length>1).length;
 $("#model-result-count").textContent=models.length+" files · "+folderCount+" folders";
 $("#archive-result-count").textContent=archives.length+" packages";
 $("#remote-model-result-count").textContent=remoteCandidates.length+" candidates";
 $("#source-result-count").textContent=sources.length+" entries";
 $("#generator-result-count").textContent=generators.length+" tools";
 const folderMarkup=[];
 for(const [key,items] of folderGroups){
  if(items.length<2){individualModels.push(...items);continue;}
  const folderName=folderNames.get(key)||items[0].folderName||items[0].name;
  folderMarkup.push('<details class="model-folder"><summary class="model-folder-summary"><div class="result-meta"><span class="result-type model-type">Model folder</span><span class="result-source">'+escapeCardText(items[0].source)+'</span></div><h2>'+escapeCardText(folderName)+'</h2><p>'+items.length+' related model files, variants or components</p><div class="card-bottom"><small>Grouped by their original source directory or parent object</small><span class="card-action">Open folder ↓</span></div></summary><div class="model-folder-grid">'+items.map(renderModelCard).join("")+'</div></details>');
 }
 modelGrid.innerHTML=[...folderMarkup,...individualModels.map(renderModelCard)].join("");
 archiveGrid.innerHTML=archives.map(data=>{
  const counterpart=String(data.format||"").toUpperCase()==="VSP3"?MODELS.find(item=>item.id!==data.id&&item.name===data.name&&item.format==="GLB"):null;
  return '<article class="result-card model-card archive-card"><div class="result-meta"><span class="result-type model-type">Archive / compressed CAD</span><span class="result-source">'+escapeCardText(data.source)+'</span></div><h2>'+escapeCardText(data.name)+'</h2><p>'+escapeCardText(archiveCardNote(data))+'</p><div class="card-bottom"><small>'+escapeCardText(data.kind||"Scientific data package")+'</small><span><button class="card-action" data-archive-model="'+escapeCardText(data.id)+'">View details →</button>'+(counterpart?'<button class="card-action" data-open-counterpart="'+escapeCardText(counterpart.id)+'">Open GLB preview</button>':'')+'</span></div></article>';
 }).join("");
 remoteModelGrid.innerHTML=remoteCandidates.map(data=>'<article class="result-card model-card remote-model-card"><div class="result-meta"><span class="result-type model-type">Remote · on demand</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>Original model page. SPACEMESHER checks for reachable OBJ/PLY files only when you open it.</p><div class="card-bottom"><small>No local copy is stored</small><button class="card-action" data-remote-model="'+data.id+'">Find model files →</button></div></article>').join("");
 const renderEntry=data=>'<article class="result-card source-card source-card-'+(data.entryType||'catalogue')+'"><div class="result-meta"><span class="result-type source-kind">'+({catalogue:'Model catalogue page',data:'Scientific dataset archive',viewer:'Viewer',generator:'Generator'}[data.entryType]||'Source')+'</span><span class="result-source">'+data.source+'</span></div><h2>'+data.name+'</h2><p>'+data.description+'</p><div class="card-bottom"><small>'+(data.entryType==='generator'?'Creates a model from your settings':data.entryType==='data'?'Download archive package; inspect included files':data.entryType==='viewer'?'Explore source visualisation':'Browse original model page and available variants')+'</small><span><a class="card-action" href="'+data.url+'" target="_blank" rel="noopener">'+(data.entryType==='generator'?'Open generator ↗':data.entryType==='viewer'?'Open viewer ↗':data.entryType==='data'?'Download dataset archive ↗':'Open model page ↗')+'</a>'+(data.creditsUrl?' <a class="card-action source-credit-link" href="'+data.creditsUrl+'" target="_blank" rel="noopener">Credits & attribution ↗</a>':'')+'</span></div></article>';
 sourceGrid.innerHTML=sources.map(renderEntry).join("");generatorGrid.innerHTML=generators.map(renderEntry).join("");
 const total=models.length+archives.length+remoteCandidates.length+sources.length+generators.length;$("#result-count").textContent=total+" results";
 if(!total)modelGrid.innerHTML='<div class="empty-state">No results match your search and filters. Try a different term or choose “All”.</div>';
 $("#collection-footnote").textContent="Related model files are grouped in expandable folders; opening a folder shows every individual model card. Original-source links open the model webpage or source-file webpage. Mesh downloads are started from the model detail view; archive and compressed-CAD entries link to their archive file or source page directly. General source catalogues and generators remain separate."+(expandedCatalogCounts.nasa||expandedCatalogCounts.spaceRadar||expandedCatalogCounts.jpl?" Indexed files: NASA "+expandedCatalogCounts.nasa+"; Space Radar "+expandedCatalogCounts.spaceRadar+"; JPL Radar OBJ "+expandedCatalogCounts.jpl+"; Moon catalogue entries "+(expandedCatalogCounts.moonCatalogueEntries||0)+". The 29 NASA terrain files in Terrain data & printable terrain are cross-listed, not extra downloads.":"")+(expandedCatalogCounts.errors.length?" Some local indexes could not be loaded: "+expandedCatalogCounts.errors.join("; "):"");
}
function viewerAssetUrl(rawUrl){
  try{
    const source=new URL(rawUrl);
    const workerUrl=(window.SMA_CONFIG?.jplProxyUrl||"").trim();
    // Space Radar does not send CORS headers for its GLB files. Route those
    // previews through our allowlisted Cloudflare asset proxy from the start.
    if(source.hostname.toLowerCase()==="www.spaceradar.ai"&&workerUrl){
      const proxy=new URL(workerUrl);proxy.searchParams.set("action","asset");proxy.searchParams.set("url",source.toString());return proxy.toString();
    }
  }catch(_){}
  return rawUrl;
}

let activeFormatPreviewCleanup=null;
function previewMessage(text){
 const box=document.createElement("div");box.className="preview-placeholder";const p=document.createElement("p");p.textContent=text;box.append(p);return box;
}
async function renderExtended3DPreview(model){
 const stage=$("#preview-stage");stage.replaceChildren(previewMessage("Loading "+model.format+" preview…"));
 try{
  const base="https://cdn.jsdelivr.net/npm/three@0.170.0/";
  const [THREE,orbitModule,loaderModule]=await Promise.all([
   import(base+"build/three.module.js"),
   import(base+"examples/jsm/controls/OrbitControls.js"),
   model.format==="FBX"?import(base+"examples/jsm/loaders/FBXLoader.js"):model.format==="3DS"?import(base+"examples/jsm/loaders/TDSLoader.js"):import(base+"examples/jsm/loaders/LWOLoader.js")
  ]);
  if(currentModel!==model)return;
  let object;
  const resourcePath=model.file.slice(0,model.file.lastIndexOf("/")+1);
  if(model.format==="FBX")object=await new loaderModule.FBXLoader().loadAsync(model.file);
  else if(model.format==="3DS"){const loader=new loaderModule.TDSLoader();loader.setResourcePath(resourcePath);object=await loader.loadAsync(model.file);}
  else{const data=await new loaderModule.LWOLoader().loadAsync(model.file);object=new THREE.Group();(data.meshes||[]).forEach(mesh=>object.add(mesh));}
  if(currentModel!==model)return;
  if(!object||!object.children?.length&& !object.geometry)throw new Error("No renderable mesh was found in this file.");
  const scene=new THREE.Scene();scene.background=new THREE.Color(0xf0f3f6);
  const camera=new THREE.PerspectiveCamera(38,Math.max(stage.clientWidth,1)/360,.001,1e9);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(stage.clientWidth,360);
  renderer.domElement.style.cssText="display:block;width:100%;height:360px;touch-action:none";
  scene.add(new THREE.HemisphereLight(0xffffff,0x8796a5,2));
  const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(2,3,4);scene.add(light);scene.add(object);
  const bounds=new THREE.Box3().setFromObject(object);if(bounds.isEmpty())throw new Error("The file contains no visible mesh geometry.");
  const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3()),maxDim=Math.max(size.x,size.y,size.z)||1;
  object.position.sub(center);camera.position.set(maxDim*1.7,maxDim*1.3,maxDim*1.9);camera.near=Math.max(maxDim/10000,.001);camera.far=maxDim*100;camera.updateProjectionMatrix();
  const controls=new orbitModule.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  const draw=()=>renderer.render(scene,camera);controls.addEventListener("change",draw);
  stage.replaceChildren(renderer.domElement);draw();
  const resize=()=>{if(currentModel!==model)return;camera.aspect=Math.max(stage.clientWidth,1)/360;camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,360);draw();};
  const observer=new ResizeObserver(resize);observer.observe(stage);
  activeFormatPreviewCleanup=()=>{observer.disconnect();controls.dispose();renderer.dispose();object.traverse?.(node=>{node.geometry?.dispose?.();if(Array.isArray(node.material))node.material.forEach(m=>m.dispose?.());else node.material?.dispose?.();});};
 }catch(error){if(currentModel===model)stage.replaceChildren(previewMessage("Preview could not be loaded: "+(error?.message||"unsupported or inaccessible file")+". You can still download the original file."));}
}
async function inspectArchive(model,button,output){
 button.disabled=true;button.textContent="Reading archive…";output.replaceChildren(previewMessage("Loading archive listing in your browser. No files are extracted."));
 try{
  const response=await fetch(model.file);if(!response.ok)throw new Error("Archive download returned HTTP "+response.status+".");
  const declared=Number(response.headers.get("Content-Length"));if(declared>80*1024*1024)throw new Error("Archive is larger than the 80 MB in-browser preview limit.");
  const buffer=await response.arrayBuffer();if(buffer.byteLength>80*1024*1024)throw new Error("Archive is larger than the 80 MB in-browser preview limit.");
  const outputLines=[];
  const module=await import("https://cdn.jsdelivr.net/npm/7z-wasm@1.2.0/7zz.es6.js");
  const factory=module.default||module.SevenZip||module;
  const sevenZip=await factory({print:line=>outputLines.push(String(line)),printErr:line=>outputLines.push(String(line)),locateFile:(path)=>"https://cdn.jsdelivr.net/npm/7z-wasm@1.2.0/"+path});
  sevenZip.FS.writeFile("/spacemesher-preview-archive",new Uint8Array(buffer));
  try{sevenZip.callMain(["l","-slt","/spacemesher-preview-archive"]);}catch(error){if(!/ExitStatus|exit\(/i.test(String(error)))throw error;}
  const text=outputLines.join("\n");const blocks=text.split(/\n\s*\n/);const entries=[];
  for(const block of blocks){const path=(block.match(/^Path = (.+)$/m)||[])[1];if(!path||path==="/spacemesher-preview-archive")continue;const size=(block.match(/^Size = (\d+)$/m)||[])[1];const folder=/^Folder = \+$/m.test(block);if(!folder)entries.push({path,size:size?Number(size):null});}
  const wrap=document.createElement("div");wrap.className="archive-preview-list";const heading=document.createElement("strong");heading.textContent=entries.length+" file(s) in archive";wrap.append(heading);
  if(!entries.length){const p=document.createElement("p");p.textContent=text.slice(0,1800)||"The archive could be read, but no file entries were returned.";wrap.append(p);}
  else{const list=document.createElement("ul");for(const entry of entries.slice(0,120)){const li=document.createElement("li");li.textContent=entry.path+(entry.size!==null?" · "+(entry.size/1024/1024).toFixed(2)+" MB":"");list.append(li);}wrap.append(list);if(entries.length>120){const p=document.createElement("p");p.textContent="Showing first 120 entries.";wrap.append(p);}}
  output.replaceChildren(wrap);button.textContent="Refresh archive contents";button.disabled=false;
 }catch(error){output.replaceChildren(previewMessage("Archive preview unavailable: "+(error?.message||"unknown error")+". Download and extract the archive locally to inspect its contents."));button.textContent="Try archive preview again";button.disabled=false;}
}
function renderSpecialPreview(model){
 const stage=$("#preview-stage");stage.replaceChildren();
 if(["FBX","3DS","LWO"].includes(model.format)){renderExtended3DPreview(model);return;}
 if(["7Z","ZIP","TAR","GZ","GZIP"].includes(model.format)){
  const panel=document.createElement("div");panel.className="archive-preview";
  const title=document.createElement("strong");title.textContent="Archive contents";const note=document.createElement("p");note.textContent="Inspect filenames and uncompressed sizes without extracting the files. Processing happens in your browser.";
  const button=document.createElement("button");button.type="button";button.className="action-link";button.textContent="Preview archive contents";
  const output=document.createElement("div");output.className="archive-preview-output";button.addEventListener("click",()=>inspectArchive(model,button,output));panel.append(title,note,button,output);stage.append(panel);return;
 }
 if(model.format==="BLEND"){
  const panel=document.createElement("div");panel.className="archive-preview";
  const title=document.createElement("strong");title.textContent="Blender project preview";
  const note=document.createElement("p");note.textContent="A .blend file stores a complete Blender scene and cannot be rendered by the standard web 3D loader. Open the file in a browser-based BLEND viewer; download the file first, then choose it in that viewer. The file is opened by the external viewer, not uploaded by SPACEMESHER.";
  const download=document.createElement("a");download.className="action-link";download.href=model.file;download.textContent="Download BLEND file";download.setAttribute("download","");
  const viewer=document.createElement("a");viewer.className="action-link secondary";viewer.href="https://0xr.space/";viewer.target="_blank";viewer.rel="noopener";viewer.textContent="Open BLEND viewer ↗";
  panel.append(title,note,download,viewer);stage.append(panel);
 }
}
function routeModel(id,push=true){document.querySelectorAll(".remote-resolution-status,.remote-variants,.remote-resolution-loader").forEach(node=>node.remove());activeFormatPreviewCleanup?.();activeFormatPreviewCleanup=null;const model=MODELS.find(x=>x.id===id);if(!model)return;currentModel=model;setView("detail");const crossPanel=$("#detail-cross-listings"),crossModel=findCrossListedModel(model);if(crossPanel){crossPanel.hidden=!crossModel;crossPanel.innerHTML=crossModel?'<span>Also listed in</span><a href="#'+crossModel.category+'">'+CATEGORIES[crossModel.category].title+' ↗</a>':"";}$("#detail-category").textContent=CATEGORIES[model.category].title.toUpperCase();$("#detail-title").textContent=model.name;const convertButton=$("#detail-convert-stl"),convertBeta=$("#detail-convert-beta"),canConvert=supportsStlConversion(model.format);if(convertButton){convertButton.hidden=!canConvert;convertButton.disabled=false;convertButton.textContent="Convert to STL";convertButton.onclick=()=>routeScaling({...model,convertToStl:true});}if(convertBeta)convertBeta.hidden=!canConvert;$("#detail-subtitle").textContent=model.kind+" · "+model.source;$("#preview-format").textContent=model.format;if(model.format==="GLB"){$("#preview-stage").innerHTML='<model-viewer src="'+viewerAssetUrl(model.file)+'" alt="3D preview of '+model.name+'" camera-controls auto-rotate shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager"></model-viewer>';}else if(model.format==="STL"){$("#preview-stage").innerHTML='<div class="stl-preview-loading" id="stl-preview-loading">Loading STL geometry…</div>';}else if(["FBX","3DS","LWO","7Z","ZIP","TAR","GZ","GZIP","BLEND"].includes(model.format)){renderSpecialPreview(model);}else{$("#preview-stage").innerHTML='<div class="preview-placeholder"><span>⬡</span><p>'+(model.remoteCandidate?'Original model files are fetched from the source only when requested.':model.format+' file ready to download. Preview is not available for this file format.')+'</p></div>'; }$("#preview-controls").hidden=!["GLB","STL"].includes(model.format);$("#scale-panel").hidden=true;const viewer=$("#preview-stage model-viewer");$("#scale-range").value="1";$("#scale-value").textContent="1.0×";const hasVerifiedDimension=Number.isFinite(model.realLongestAxisKm)&&model.realLongestAxisKm>0;const realDimensionText=hasVerifiedDimension?((model.realLongestAxisKm>=1?model.realLongestAxisKm.toLocaleString("en-US")+" km":(model.realLongestAxisKm*1000).toLocaleString("en-US")+" m")+(Number.isFinite(model.realLongestAxisUncertaintyKm)?" ± "+(model.realLongestAxisUncertaintyKm>=1?model.realLongestAxisUncertaintyKm.toLocaleString("en-US")+" km":(model.realLongestAxisUncertaintyKm*1000).toLocaleString("en-US")+" m"):"")):"Not verified";$("#real-length").value=hasVerifiedDimension?String(model.realLongestAxisKm*1000000):"";const dimensionHint=$("#scale-panel .field-hint");if(dimensionHint)dimensionHint.textContent=hasVerifiedDimension?"Auto-filled from "+(model.realDimensionSource||"a verified physical-dimension source")+". Check the cited source before using the scale result.":"No verified longest-axis measurement is linked to this model. Enter a value only if you can verify it from a reliable source.";const rows=[["File format",model.format],["File size",model.size],["Licence",model.license],["Last updated",model.changed],["Verified real-world longest axis",realDimensionText],["Dimension source",hasVerifiedDimension?(model.realDimensionSource||"Verified source")+" · "+(model.realDimensionUrl||""):"Not available"],["Original scale","Open Scaling to calculate when a verified real-world dimension is known"]];$("#spec-list").innerHTML=rows.map(([k,v])=>'<div class="spec-row"><dt>'+k+'</dt><dd>'+v+'</dd></div>').join("");$("#detail-actions").innerHTML=(model.sourceUrl?'<a class="action-link secondary" href="'+model.sourceUrl+'" target="_blank" rel="noopener">Open original source page ↗</a>':'')+(model.downloadDirect===false?'':'<a class="action-link" href="'+model.file+'" download>Download '+model.format+' ↓</a>');
if(model.remoteCandidate){
 const status=document.createElement("p");status.className="remote-resolution-status";status.textContent="Die Originalseite wird erst beim Öffnen nach konkreten Modelldateien durchsucht.";
 const variants=document.createElement("div");variants.className="remote-variants";
 const resolveButton=document.createElement("button");resolveButton.type="button";resolveButton.className="action-link";resolveButton.textContent="Find downloadable model files";
 resolveButton.addEventListener("click",()=>resolveRemoteCatalogueModel(model,status,variants,resolveButton));
 resolveButton.title="Search the original catalogue page for actual OBJ or PLY model files. Only files that pass a file check will be offered for download.";$("#detail-actions").append(resolveButton);$("#detail-actions").insertAdjacentElement("afterend",status);status.insertAdjacentElement("afterend",variants);
}if(["GLB","STL","OBJ","PLY"].includes(model.format)&&model.downloadDirect!==false){const scalingButton=document.createElement("button");scalingButton.type="button";scalingButton.className="action-link";scalingButton.textContent="Scaling";scalingButton.addEventListener("click",()=>routeScaling(model));$("#detail-actions").prepend(scalingButton);}$("#source-credit").textContent=model.credit;const provenanceLink=$("#source-link");provenanceLink.hidden=!model.sourceUrl;if(model.sourceUrl)provenanceLink.href=model.sourceUrl;else provenanceLink.removeAttribute("href");$("#print-note").textContent=model.format==="STL"?"STL mesh file: preview and dimensions are read from its triangle mesh. STL does not store units; SPACEMESHER interprets the coordinates as millimetres for the preview and fit estimate. Verify the intended scale in your slicer.":model.format==="ZIP"?(model.downloadDirect===false?"This record opens the original source page rather than a direct file URL. Choose the available download option on that page.":"This ZIP archive contains one or more scientific shape-model files. Extract it first and inspect the included documentation before importing the meshes."):model.format==="7Z"?"This is a compressed model package. Extract it first; the archive may contain several printable parts or assembly instructions.":model.format.includes("STEP")?"STEP CAD file: extract the compressed file if needed, then import the STEP into a compatible CAD tool or slicer.":["OBJ","GLB","FBX","BLEND","3DS","LWO","VSP3"].includes(model.format)?"This is a 3D mesh or project format, not a guaranteed slicer-ready file. If your slicer cannot import it, open it in suitable 3D software and export STL or 3MF. Mesh-to-STEP conversion is not presented as a clean CAD solid.":"No verified print test, community rating, wall-thickness check or orientation assessment is available for this model yet. Dimensions and scale are not supplied in this record.";setCrumbs([{label:"Home",href:"#home"},{label:CATEGORIES[model.category].title,href:"#"+model.category},{label:model.name}]);if(push)history.pushState({view:"detail",id},"","#model/"+id);window.scrollTo(0,0);}
function routeGuide(push=true){setView("about");setCrumbs([{label:"Home",href:"#home"},{label:"About"}]);if(push)history.pushState({view:"about"},"","#guide");window.scrollTo(0,0);}
function routeScaling(model=null,push=true){scalingSourceModel=model||null;setView("scaling");const crumbs=[{label:"Home",href:"#home"}];if(model&&CATEGORIES[model.category])crumbs.push({label:CATEGORIES[model.category].title,href:"#"+model.category});crumbs.push({label:"Scaling & 3D Print"});setCrumbs(crumbs);if(push)history.pushState({view:"scaling",modelId:model?.id||null},"",model?"#scaling/"+encodeURIComponent(model.id):"#scaling");window.scrollTo(0,0);window.dispatchEvent(new CustomEvent("sma-scaling-open",{detail:{model}}));}
const legacyRouteModel=routeModel;
routeModel=(id,push=true)=>{const model=MODELS.find(item=>item.id===id);if(model&&["GLB","GLTF","STL","OBJ","PLY"].includes(model.format)&&model.downloadDirect!==false)return routeScaling(model,push);return legacyRouteModel(id,push);};
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>routeCollection(b.dataset.category)));
$("#model-grid").addEventListener("click",e=>{
 const b=e.target.closest("[data-model]");if(!b)return;const model=MODELS.find(item=>item.id===b.dataset.model);if(model&&["GLB","GLTF","STL","OBJ","PLY"].includes(model.format)&&model.downloadDirect!==false)routeScaling(model);else routeModel(b.dataset.model);
});
$("#archive-grid").addEventListener("click",e=>{
 const counterpart=e.target.closest("[data-open-counterpart]");
 if(counterpart){const model=MODELS.find(item=>item.id===counterpart.dataset.openCounterpart);if(model)routeScaling(model);return;}
 const b=e.target.closest("[data-archive-model]");if(!b)return;routeModel(b.dataset.archiveModel);
});
$("#remote-model-grid").addEventListener("click",e=>{const b=e.target.closest("[data-remote-model]");if(!b)return;routeModel(b.dataset.remoteModel);});
function restoreRouteFromHash(){
 const raw=decodeURIComponent((location.hash||"").replace(/^#/,""));
 if(!raw||raw==="home"){routeHome(false);return;}
 if(raw==="guide"||raw==="about"){routeGuide(false);return;}
 if(raw==="scaling"||raw.startsWith("scaling/")){
  const id=raw.startsWith("scaling/")?raw.slice(8):"";
  routeScaling(id?MODELS.find(model=>model.id===id)||null:null,false);return;
 }
 if(raw.startsWith("model/")){routeModel(raw.slice(6),false);return;}
 if(CATEGORIES[raw]){routeCollection(raw,false);return;}
}
window.addEventListener("hashchange",restoreRouteFromHash);
window.addEventListener("popstate",restoreRouteFromHash);
$("#search-input").addEventListener("input",renderCollection);$("#source-filter").addEventListener("change",renderCollection);$("#type-filter").addEventListener("change",renderCollection);
$("#guide-link").addEventListener("click",e=>{e.preventDefault();routeGuide();});$("#scaling-link").addEventListener("click",e=>{e.preventDefault();routeScaling();});
 document.querySelectorAll("[data-guide-tab]").forEach(tab=>tab.addEventListener("click",()=>{
  const key=tab.dataset.guideTab;
  document.querySelectorAll("[data-guide-tab]").forEach(item=>{const active=item===tab;item.classList.toggle("is-active",active);item.setAttribute("aria-selected",String(active));item.tabIndex=active?0:-1;});
  document.querySelectorAll(".guide-panel").forEach(panel=>{panel.hidden=panel.id!=="guide-panel-"+key;});
 }));$("#home-scaling-link").addEventListener("click",e=>{e.preventDefault();routeScaling();});$("#detail-back").addEventListener("click",e=>{e.preventDefault();routeCollection(currentModel.category);});
document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault();routeHome();});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)&&!collection.hidden){e.preventDefault();$("#search-input").focus();}});
// Routing is restored from the URL after all route handlers are registered.


// Remote model files are resolved per object and are never stored in a session cache.
const MOON_PAGE_SLUGS = {
 "Moon":"E1-Moon","Io":"J1-Io","Europa":"J2-Europa","Ganymede":"J3-Ganymede","Callisto":"J4-Callisto","Amalthea":"J5-Amalthea","Thebe":"J14-Thebe",
 "Phobos":"M1-Phobos","Deimos":"M2-Deimos","Triton":"N1-Triton","Larissa":"N7-Larissa","Proteus":"N8-Proteus","Charon":"P1-Charon",
 "Mimas":"S1-Mimas","Enceladus":"S2-Enceladus","Tethys":"S3-Tethys","Dione":"S4-Dione","Rhea":"S5-Rhea","Titan":"S6-Titan","Hyperion":"S7-Hyperion","Iapetus":"S8-Iapetus","Phoebe":"S9-Phoebe","Janus":"S10-Janus","Epimetheus":"S11-Epimetheus","Helene":"S12-Helene","Telesto":"S13-Telesto","Calypso":"S14-Calypso","Atlas":"S15-Atlas","Prometheus":"S16-Prometheus","Pandora":"S17-Pandora","Pan":"S18-Pan","Daphnis":"S35-Daphnis",
 "Ariel":"U1-Ariel","Umbriel":"U2-Umbriel","Titania":"U3-Titania","Oberon":"U4-Oberon","Miranda":"U5-Miranda"
};
function workerActionUrl(action, sourceUrl) {
 const worker=(window.SMA_CONFIG?.jplProxyUrl||"").trim();
 if(!worker)throw new Error("Cloudflare Worker URL fehlt in config.js.");
 const endpoint=new URL(worker);endpoint.searchParams.set("action",action);if(sourceUrl)endpoint.searchParams.set("url",sourceUrl);return endpoint.toString();
}
function workerAssetUrl(sourceUrl) { return workerActionUrl("asset",sourceUrl); }
function remoteCatalogueRecord(model) {
 if(model.source!=="3D Asteroid Catalogue"||!model.file)return;
 let page=model.file;
 if(model.category==="moons"){const moonName=String(model.name||"").replace(/^[A-Z]\\d+\\s*/i,"").trim();const moonSlug=MOON_PAGE_SLUGS[model.name]||MOON_PAGE_SLUGS[moonName];if(moonSlug)page="https://3d-asteroids.space/moons/"+moonSlug;}
 try {
  const u=new URL(page);
  const parts=u.pathname.split("/").filter(Boolean);
  if(u.protocol==="https:"&&["3d-asteroids.space","www.3d-asteroids.space"].includes(u.hostname)&&parts.length===2&&["asteroids","moons","comets","dwarf"].includes(parts[0])&&!parts[1].includes(".")) {
   model.remotePageUrl=u.toString();model.file=u.toString();model.sourceUrl=u.toString();model.sourcePageUrl=u.toString();model.remoteCandidate=true;model.downloadDirect=false;
  }
 } catch {}
}
async function resolveRemoteCatalogueModel(model, statusNode, variantsNode, button) {
 button.disabled=true;button.textContent="Searching…";statusNode.textContent="Originalseite und mögliche Objekt-Unterseiten werden durchsucht …";
  const loader=document.createElement("div");loader.className="scaling-research-panel remote-resolution-loader";loader.setAttribute("role","status");loader.setAttribute("aria-live","polite");
  loader.innerHTML='<div class="research-scan" aria-hidden="true"><svg viewBox="0 0 160 104"><defs><pattern id="remote-research-grid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width=".7"/></pattern><pattern id="remote-research-zoom-grid" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M6 0H0V6" fill="none" stroke="currentColor" stroke-opacity=".42" stroke-width=".8"/></pattern></defs><rect x="8" y="10" width="144" height="84" rx="10" fill="url(#remote-research-grid)" stroke="currentColor" stroke-opacity=".16"/><path class="research-scan-line" d="M12 28H148"/><g class="research-magnifier"><circle cx="76" cy="48" r="25" fill="#f7f8fa" fill-opacity=".78" stroke="currentColor" stroke-width="2.5"/><circle cx="76" cy="48" r="20" fill="url(#remote-research-zoom-grid)"/><path d="M94 66L113 85" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M94 66L113 85" fill="none" stroke="#f7f8fa" stroke-width="2" stroke-linecap="round"/><circle cx="76" cy="48" r="3" fill="currentColor" opacity=".55"/></g></svg></div><div class="research-copy"><strong>Searching for model files…</strong><span>Checking the object page, catalogue links and embedded download references. Each candidate is tested before it is offered.</span></div>';
  loader.hidden=false;variantsNode.before(loader);
 try {
  const resolveUrl=new URL(workerActionUrl("resolve",model.remotePageUrl));resolveUrl.searchParams.set("name",model.name);const response=await fetch(resolveUrl.toString(),{headers:{Accept:"application/json"}});
  const result=await response.json();
  if(!response.ok)throw new Error(result.detail||result.error||("HTTP "+response.status));
  loader.hidden=true;
  const returnedFiles=Array.isArray(result.files)?result.files:[];
  const expectedObjectName=normalizeSearchText(String(model.name||"").replace(/^\s*\(\s*#?\d+\s*\)\s*/,"").replace(/^\s*#?\d+\s+/,"")).trim();
  const files=returnedFiles.filter(file=>{
   const filename=normalizeSearchText([file.label,file.url].filter(Boolean).join(" "));
   // The Worker may verify an object-specific download from the link text
   // even when the upstream filename itself is generic. Older Worker
   // responses still need to pass the filename check.
   return file.identityVerified===true||(expectedObjectName&&filename.includes(expectedObjectName));
  });
  if(returnedFiles.length&&!files.length){
   throw new Error("The Worker returned "+returnedFiles.length+" file(s), but none of their filenames identify "+model.name+". Unrelated files were discarded.");
  }
  if(!files.length) {
   loader.hidden=true;
   if(result.availability==="no-shape-model") {
    statusNode.textContent="Für "+model.name+" ist im 3D Asteroid Catalogue ausdrücklich kein Shape-Modell hinterlegt. Die Quelle zeigt nur ein texturiertes Ellipsoid; es gibt dort keine OBJ-/PLY-Datei zum Auflösen.";
    button.disabled=true;
    button.textContent="No shape model in source";
    button.title="The original catalogue confirms that no downloadable shape model is available for this object.";
   } else {
    statusNode.textContent=result.message||"Keine verifizierte Modelldatei gefunden. Die Quelle stellt möglicherweise keine direkt verlinkte Mesh-Datei bereit; du kannst die Suche erneut starten.";
    button.disabled=false;
    button.textContent="Try again";
   }
   return;
  }
  // Each discovered file becomes a first-class model record in the collection.
  // This replaces the one parent resolver card with separate cards per file.
  const variants=files.map((file,index)=>{
   const size=file.sizeBytes?file.sizeBytes>=1000000?(file.sizeBytes/1000000).toFixed(1)+" MB":Math.round(file.sizeBytes/1000)+" kB":"Size not reported";
   return {...model,id:model.id+"-"+file.format.toLowerCase()+"-"+(index+1),name:model.name+" — "+(file.label||file.format+" variant"),objectSearchName:model.name,kind:(model.kind||"Remote shape model")+" · "+file.format,format:file.format,size,license:model.license||"See original model attribution",credit:model.credit||model.name+": 3D Asteroid Catalogue",file:file.url,sourceUrl:model.remotePageUrl,sourcePageUrl:model.remotePageUrl,folderKey:"remote:"+model.id,folderName:model.name,downloadDirect:true,remoteCandidate:false,remotePageUrl:null,realDimensionsKm:Array.isArray(result.axesKm)?result.axesKm:null,realLongestAxisKm:Array.isArray(result.axesKm)&&result.axesKm.length?Math.max(...result.axesKm):null,realDimensionUrl:result.dimensionSourceUrl||model.remotePageUrl,realDimensionSource:result.dimensionSourceLabel||"3D Asteroid Catalogue",realLongestAxisUncertaintyKm:Number.isFinite(result.uncertaintyKm)?result.uncertaintyKm:null,changed:"Resolved on demand "+new Date().toISOString().slice(0,10),remoteResolved:true};
  });
  for(const variant of variants){
   if(!MODELS.some(existing=>existing.id===variant.id))MODELS.push(variant);
  }
  model.remoteResolvedParent=true;
  statusNode.textContent=variants.length+" einzelne Modelldatei(en) für "+model.name+" gefunden. Die Dateien sind jetzt gemeinsam in einem Modellordner abgelegt.";
  button.hidden=true;button.textContent="Files found";variantsNode.replaceChildren();
  const variantFolder=document.createElement("details");variantFolder.className="model-folder";variantFolder.open=true;
  const folderSummary=document.createElement("summary");folderSummary.className="model-folder-summary";
  folderSummary.innerHTML='<div class="result-meta"><span class="result-type model-type">Model folder</span><span class="result-source">'+String(model.source).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))+'</span></div><h2>'+String(model.name).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))+'</h2><p>'+variants.length+' related model files and variants</p><div class="card-bottom"><small>Original source: '+String(model.source).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))+'</small><span class="card-action">Model folder</span></div>';
  const variantGrid=document.createElement("div");variantGrid.className="model-folder-grid";
  variantFolder.append(folderSummary,variantGrid);variantsNode.append(variantFolder);
  variants.forEach(variant=>{
   // Use the same card structure as the main Downloadable Models collection.
   const card=document.createElement("article");card.className="result-card model-card remote-variant-card";
   const meta=document.createElement("div");meta.className="result-meta";
   const type=document.createElement("span");type.className="result-type model-type";type.textContent="Individual model · "+variant.format;
   const source=document.createElement("span");source.className="result-source";source.textContent=variant.source;
   meta.append(type,source);
   const title=document.createElement("h2");title.textContent=variant.name;
   const description=document.createElement("p");description.textContent=variant.format+" model · "+variant.size+" · "+variant.license;
   const bottom=document.createElement("div");bottom.className="card-bottom";
   const note=document.createElement("small");note.textContent="Individual model file · original source linked";
   const actions=document.createElement("span");
   const sourceLink=document.createElement("a");sourceLink.className="card-action";sourceLink.href=variant.sourceUrl;sourceLink.target="_blank";sourceLink.rel="noopener";sourceLink.textContent="Open source page ↗";
   const preview=document.createElement("button");preview.type="button";preview.className="card-action";preview.textContent="Preview / Scaling →";preview.addEventListener("click",()=>routeScaling(variant));
   const download=document.createElement("button");download.type="button";download.className="card-action";download.textContent="Download "+variant.format+" ↓";
   download.addEventListener("click",async()=>{
    download.disabled=true;
    try {
     const response=await fetch(workerAssetUrl(variant.file));
     if(!response.ok)throw new Error("Worker download returned HTTP "+response.status);
     const blob=await response.blob();if(!blob.size)throw new Error("The model file is empty.");
     const objectUrl=URL.createObjectURL(blob),anchor=document.createElement("a");
     anchor.href=objectUrl;anchor.download=variant.name.replace(/[^a-z0-9_-]+/gi,"-")+"."+variant.format.toLowerCase();
     document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(objectUrl),30000);
    } catch(error) { statusNode.textContent="Download fehlgeschlagen: "+error.message; }
    finally { download.disabled=false; }
   });
   actions.append(sourceLink,preview,download);bottom.append(note,actions);card.append(meta,title,description,bottom);variantGrid.append(card);
  });
  if(currentCategory)renderCollection();
 } catch(error) {
  loader.hidden=true;statusNode.textContent="Dateisuche fehlgeschlagen: "+error.message+" Der Kandidat bleibt erhalten. Du kannst die Suche erneut starten.";button.disabled=false;button.textContent="Try again";
 }
}

// Load complete source indexes rather than a small hand-picked sample.
const expandedCatalogCounts = { nasa: 0, spaceRadar: 0, jpl: 0, smallBodyPackages: 0, errors: [] };
function addCatalogModel(model) {
  setSpecificModelSource(model);
  remoteCatalogueRecord(model);
  const assetKey = value => {
    try { const url = new URL(value); url.hash = ""; return url.toString(); }
    catch { return String(value || "").trim(); }
  };
  const existing = model.file ? MODELS.find(item =>
    item.file && item.category === model.category &&
    assetKey(item.file) === assetKey(model.file)
  ) : null;
  if (existing) {
    const names = new Set([...(existing.aliases || []), existing.name, model.name].filter(Boolean).map(name => String(name).trim()).filter(Boolean));
    names.delete(String(existing.name || "").trim());
    if (names.size) existing.aliases = [...names];
    const candidateSource = model.sourcePageUrl || model.sourceUrl || "";
    const existingSource = existing.sourcePageUrl || existing.sourceUrl || "";
    const sourceQuality = value => {
      try {
        const url = new URL(value);
        if (url.hostname === "models.spaceradar.ai" && url.pathname.startsWith("/model/")) return 4;
        if (url.pathname === "/" || ["/3d-resources", "/3d-resources/"].includes(url.pathname)) return 0;
        if (url.hostname === "github.com" && url.pathname.includes("/blob/")) return 1;
        return 2;
      } catch { return 0; }
    };
    if (sourceQuality(candidateSource) > sourceQuality(existingSource)) {
      existing.sourcePageUrl = candidateSource;
      existing.sourceUrl = candidateSource;
    }
    return;
  }
  if (MODELS.some(item => item.id === model.id)) return;
  MODELS.push(model);
}
async function loadExpandedCatalogs() {
  try {
    const response = await fetch("./data/nasa-model-index.json?v=20261127-model-links-4");
    if (!response.ok) throw new Error("NASA index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.nasa = index.sourceFileCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("NASA index: " + error.message);
  }

  try {
    const response = await fetch("./data/spaceradar-model-index.json?v=20261127-01");
    if (!response.ok) throw new Error("Space Radar index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.spaceRadar = index.sourceFileCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("Space Radar index: " + error.message);
  }

  try {
    const response = await fetch("./data/jpl-asteroid-index.json?v=20261126-19");
    if (!response.ok) throw new Error("JPL index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.jpl = index.verifiedDirectOBJCount || 0;
  } catch (error) {
    expandedCatalogCounts.errors.push("JPL index: " + error.message);
  }

  try {
    const response = await fetch("./data/asteroid-curated-index.json?v=20261126-19");
    if (!response.ok) throw new Error("Curated asteroid index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.curatedAsteroids = (index.files || []).length;
  } catch (error) {
    expandedCatalogCounts.errors.push("Curated asteroid index: " + error.message);
  }

  try {
    const response = await fetch("./data/small-body-package-index.json?v=20261126-19");
    if (!response.ok) throw new Error("Small-body package index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.smallBodyPackages = (index.files || []).length;
  } catch (error) {
    expandedCatalogCounts.errors.push("Small-body package index: " + error.message);
  }

  try {
    const response = await fetch("./data/moon-catalogue-index.json?v=20261127-01");
    if (!response.ok) throw new Error("Moon catalogue index HTTP " + response.status);
    const index = await response.json();
    for (const model of index.files || []) addCatalogModel(model);
    expandedCatalogCounts.moonCatalogueEntries = (index.files || []).length;
  } catch (error) {
    expandedCatalogCounts.errors.push("Moon catalogue index: " + error.message);
  }

  for (const item of [
    ["3dac-comet-67p","67P/Churyumov-Gerasimenko","comets/67P-Churyumov-Gerasimenko"],
    ["3dac-comet-halley","1P/Halley","comets/1P-Halley"],
    ["3dac-comet-hartley2","103P/Hartley 2","comets/103P-Hartley-2"],
    ["3dac-comet-tempel1","9P/Tempel 1","comets/9P-Tempel-1"],
    ["3dac-comet-wild2","81P/Wild 2","comets/81P-Wild-2"],
    ["3dac-dwarf-ceres","(1) Ceres","dwarf/1-Ceres"],
    ["3dac-dwarf-pluto","Pluto","asteroids/134340-Pluto"]
  ]) addCatalogModel({id:item[0],name:item[1],category:"small-bodies",kind:"Remote shape model · OBJ / PLY",source:"3D Asteroid Catalogue",size:"Resolved when opened",format:"OBJ / PLY",license:"See original model attribution",credit:item[1]+": 3D Asteroid Catalogue",file:"https://3d-asteroids.space/"+item[2],sourceUrl:"https://3d-asteroids.space/"+item[2],downloadDirect:false});

  try {
    const response = await fetch("./data/real-world-dimensions.json");
    if (!response.ok) throw new Error("Real-world dimensions index HTTP " + response.status);
    const index = await response.json();
    let matched = 0;
    for (const model of MODELS) {
      const dimension = index.records && index.records[model.id];
      if (dimension && Number.isFinite(dimension.longestAxisKm) && dimension.longestAxisKm > 0) {
        model.realLongestAxisKm = dimension.longestAxisKm;
        model.realLongestAxisUncertaintyKm = Number.isFinite(dimension.longestAxisUncertaintyKm) ? dimension.longestAxisUncertaintyKm : null;
        model.realDimensionsKm = dimension.dimensionsKm || null;
        model.realDimensionSource = dimension.source || "Verified source";
        model.realDimensionUrl = dimension.sourceUrl || "";
        matched++;
      }
    }
    expandedCatalogCounts.verifiedDimensions = matched;
  } catch (error) {
    expandedCatalogCounts.errors.push("Real-world dimensions index: " + error.message);
  }

  if (currentCategory) {
    populateFilters();
    renderCollection();
  }
  // Re-run deep-link restoration after dynamic model indexes have loaded.
  if (location.hash.startsWith("#scaling/") || location.hash.startsWith("#model/")) restoreRouteFromHash();
}
loadExpandedCatalogs();
// Initialize the first route only after expandedCatalogCounts and all catalog loaders exist.
restoreRouteFromHash();

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
    const profiles = {
      "p2s": [256,256,256],
      "prusa-xl-5": [360,360,360],
      "centauri-carbon": [256,256,256]
    };
    return profiles[$id("printer-profile").value] || [number("bed-x"),number("bed-y"),number("bed-z")];
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
      $id("print-dimensions").textContent="—";$id("scale-factor").textContent="Original file vs real-world reference: —";return;
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
    $id("scale-factor").textContent=originalScale?describeOriginalScale(originalScale)+" · source-file scale 1:"+originalScale.toFixed(3):"Real-world comparison unavailable — no verified reference dimension supplied";
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
    activeViewer.scale="1 1 1";
    // Keep the fast, direct model-viewer request as the first attempt.  Some
    // catalogue hosts omit CORS headers; retry those GLBs through the Worker.
    let retriedThroughProxy=false;
    activeViewer.addEventListener("error",()=>{
      const workerUrl=(window.SMA_CONFIG?.jplProxyUrl||"").trim();
      if(retriedThroughProxy||!workerUrl||!currentModel?.file)return;
      retriedThroughProxy=true;currentModel._assetProxy=true;
      const fallback=new URL(workerUrl);fallback.searchParams.set("action","asset");fallback.searchParams.set("url",currentModel.file);
      $id("measurement-state").textContent="Direct preview blocked; retrying through archive proxy…";
      activeViewer.src=fallback.toString();
    },{once:true});
    $id("measurement-state").textContent="Measuring model…";
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

/* Independent scaling workspace: archive models and local uploads use the same geometry engine. */
/* Independent scaling workspace: object dimensions -> original scale -> printer-sized scale. */
(function initScalingWorkspace(){
 const $id=id=>document.getElementById(id),unitFactors={mm:1,cm:10,m:1000,in:25.4};
 let THREE=null,L=null,renderer=null,controls=null,camera=null,scene=null,root=null,active=null,activeExpectedCategory=null,raf=null,objectUrls=[],token=0,realAxesKm=null,realLongestKm=null,realSourceUrl="",realObjectName="",realConfidenceScore=null,selectedDenominator=null,currentExportFactor=1,currentExportReady=false,lookupBusy=false,curatedDimensionsPromise=null,researchCandidates=[],conversionContext=null,occtPromise=null,occtScriptPromise=null,descriptionToken=0;
 const stage=$id("scaling-preview-stage"),fmt=v=>Number(v).toLocaleString("en-US",{maximumFractionDigits:3}),dims=d=>d.map(fmt).join(" × ")+" mm";
 function setGauge(id,value,status){
  const card=$id("scaling-gauge-"+id),ring=$id("scaling-gauge-ring-"+id),number=$id("scaling-gauge-value-"+id),caption=$id("scaling-gauge-status-"+id);
  if(!card||!ring||!number||!caption)return;
  const known=Number.isFinite(value),score=known?Math.max(0,Math.min(100,Math.round(value))):null;
  const color=!known?"#718096":score<45?"#c96b65":score<75?"#c49a58":"#70ad91";
  ring.style.setProperty("--gauge-value",known?score:0);ring.style.setProperty("--gauge-color",color);
  number.textContent=known?score+"%":"—";caption.textContent=status||(known?"Calculated":"Not assessed");
  card.classList.toggle("is-unrated",!known);
  card.setAttribute("aria-label",card.dataset.label+": "+(known?score+" percent":"not assessed")+(status?"; "+status:""));
 }
 function resetGauges(){setGauge("reliability",null,"Awaiting source");setGauge("printability",null,"Not assessed");}
 const config=window.SMA_CONFIG||{},proxyUrl=(config.jplProxyUrl||"").trim();
 function proxyAssetUrl(sourceUrl){
  if(!proxyUrl)return sourceUrl;
  const target=new URL(proxyUrl);target.searchParams.set("action","asset");target.searchParams.set("url",sourceUrl);return target.toString();
 }
 async function fetchRemoteResponse(sourceUrl,accept="model/gltf-binary,model/gltf+json,model/stl,application/octet-stream,*/*"){
  const sourceHost=(()=>{try{return new URL(sourceUrl).hostname.toLowerCase();}catch(_){return "";}})();
  // These catalogue asset hosts do not provide browser-readable CORS responses.
  // Route them through the Worker immediately to avoid a guaranteed failing direct XHR.
  if(sourceHost==="www.spaceradar.ai"||sourceHost==="models.spaceradar.ai"||sourceHost==="3d-asteroids.space"||sourceHost==="www.3d-asteroids.space"){
   if(!proxyUrl)throw new Error("Space Radar assets require the configured Cloudflare CORS proxy.");
   const response=await fetch(proxyAssetUrl(sourceUrl),{headers:{Accept:accept}});
   if(!response.ok)throw new Error("Cloudflare asset proxy returned HTTP "+response.status+".");
   return {response,viaProxy:true};
  }
  let directError;
  try{const response=await fetch(sourceUrl,{headers:{Accept:accept}});if(!response.ok)throw new Error("HTTP "+response.status);return {response,viaProxy:false};}catch(error){directError=error;}
  if(!proxyUrl)throw new Error("Direct model download failed ("+(directError?.message||"network/CORS error")+") and no Cloudflare asset proxy is configured.");
  const response=await fetch(proxyAssetUrl(sourceUrl),{headers:{Accept:accept}});
  if(!response.ok)throw new Error("Direct model download failed; proxy fallback returned HTTP "+response.status+".");
  return {response,viaProxy:true};
 }
 async function fetchRemoteAsset(sourceUrl){
  const {response}=await fetchRemoteResponse(sourceUrl);
  const blob=await response.blob();if(!blob.size)throw new Error("The source returned an empty model file.");
  const localUrl=URL.createObjectURL(blob);objectUrls.push(localUrl);return localUrl;
 }

  function clear(){
  resetGauges();realConfidenceScore=null;
  token++;if(raf)cancelAnimationFrame(raf);if(controls)controls.dispose();if(renderer){renderer.dispose();renderer.domElement.remove();}
  renderer=null;controls=null;camera=null;scene=null;root=null;active=null;conversionContext=null;currentExportReady=false;currentExportFactor=1;const convertButton=$id("scaling-convert-stl"),convertBeta=$id("scaling-convert-beta");if(convertButton){convertButton.hidden=true;convertButton.disabled=false;convertButton.textContent="Convert to STL";}if(convertBeta)convertBeta.hidden=true;
  objectUrls.forEach(url=>URL.revokeObjectURL(url));objectUrls=[];lookupBusy=false;const lookupButton=$id("scaling-jpl-lookup");if(lookupButton)lookupButton.disabled=false;researchCandidates=[];const researchResults=$id("scaling-research-results");if(researchResults){researchResults.hidden=true;researchResults.replaceChildren();}const unverifiedDetails=$id("scaling-unverified-details");if(unverifiedDetails){unverifiedDetails.hidden=true;unverifiedDetails.open=false;}const researchPanel=$id("scaling-research-panel");if(researchPanel)researchPanel.hidden=true;
 }
 async function ensure(){
  if(THREE)return;const b="https://cdn.jsdelivr.net/npm/three@0.170.0/";
  const [t,s,o,p,g,c,d,e,x,m,fbx,tds,lwo]=await Promise.all([import(b+"build/three.module.js"),import(b+"examples/jsm/loaders/STLLoader.js"),import(b+"examples/jsm/loaders/OBJLoader.js"),import(b+"examples/jsm/loaders/PLYLoader.js"),import(b+"examples/jsm/loaders/GLTFLoader.js"),import(b+"examples/jsm/controls/OrbitControls.js"),import(b+"examples/jsm/loaders/DRACOLoader.js"),import(b+"examples/jsm/exporters/STLExporter.js"),import(b+"examples/jsm/libs/meshopt_decoder.module.js"),import(b+"examples/jsm/loaders/MTLLoader.js"),import(b+"examples/jsm/loaders/FBXLoader.js"),import(b+"examples/jsm/loaders/TDSLoader.js"),import(b+"examples/jsm/loaders/LWOLoader.js")]);
  THREE=t;L={STL:s.STLLoader,OBJ:o.OBJLoader,PLY:p.PLYLoader,GLB:g.GLTFLoader,Orbit:c.OrbitControls,DRACO:d.DRACOLoader,STLExporter:e.STLExporter,MeshoptDecoder:x.MeshoptDecoder,MTL:m.MTLLoader,FBX:fbx.FBXLoader,TDS:tds.TDSLoader,LWO:lwo.LWOLoader};
 }
 async function getOcct(){
   if(!occtPromise){
    const attempt=(async()=>{
     if(!window.occtimportjs){
      if(!occtScriptPromise)occtScriptPromise=new Promise((resolve,reject)=>{
       const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/dist/occt-import-js.js";script.async=true;
       script.onload=resolve;script.onerror=()=>reject(new Error("OpenCascade STEP converter could not be loaded."));document.head.appendChild(script);
      });
      await occtScriptPromise;
     }
     const factory=window.occtimportjs;if(typeof factory!=="function")throw new Error("OpenCascade converter did not expose its browser API.");
     return factory({locateFile:path=>"https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/dist/"+path});
    })();
    occtPromise=attempt.catch(error=>{occtPromise=null;occtScriptPromise=null;throw error;});
   }
   return occtPromise;
  }
 async function stepBuffer(buffer){
  const bytes=new Uint8Array(buffer);
  if(bytes[0]===0x1f&&bytes[1]===0x8b){
   if(typeof DecompressionStream==="undefined")throw new Error("This browser cannot decompress GZIP STEP files.");
   return await new Response(new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  }
  return buffer;
 }
 function occtMeshGroup(result){
  if(!result?.success||!Array.isArray(result.meshes)||!result.meshes.length)throw new Error("STEP file could not be tessellated into printable mesh geometry.");
  const group=new THREE.Group();
  for(const item of result.meshes){
   const position=item.attributes?.position?.array;if(!position?.length)continue;
   const geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.Float32BufferAttribute(position,3));
   const normals=item.attributes?.normal?.array;if(normals?.length)geometry.setAttribute("normal",new THREE.Float32BufferAttribute(normals,3));
   const indices=item.index?.array;if(indices?.length)geometry.setIndex(Array.from(indices));
   if(!geometry.attributes.normal)geometry.computeVertexNormals();
   const rgb=Array.isArray(item.color)?item.color:[0.58,0.66,0.74];
   const material=new THREE.MeshStandardMaterial({color:new THREE.Color().setRGB(Number(rgb[0])||0.58,Number(rgb[1])||0.66,Number(rgb[2])||0.74),metalness:.08,roughness:.62,side:THREE.DoubleSide});
   group.add(new THREE.Mesh(geometry,material));
  }
  if(!group.children.length)throw new Error("STEP conversion returned no visible solids.");
  return group;
 }
 function generatedLocalDescription(model,file,format){
  const name=model?.name||file?.name||"Untitled model";
  return name+" is loaded as a local "+format+" 3D model. The preview and STL conversion run in your browser. Check the file unit and measured geometry before using any print scale.";
 }
 async function loadModelDescription(model,file=null,format=null){
  const panel=$id("scaling-model-description"),body=$id("scaling-description-text"),status=$id("scaling-description-status"),source=$id("scaling-description-source"),provenance=$id("scaling-description-provenance");
  if(!panel||!body)return;
  const my=++descriptionToken;panel.hidden=false;body.textContent=generatedLocalDescription(model,file,format||model?.format||"3D");status.textContent="Generating from archive metadata…";provenance.textContent="The description is generated automatically; it does not verify model scale.";
  const sourceUrl=model?.sourceUrl||model?.sourcePageUrl||"";
  if(!proxyUrl){status.textContent="Metadata description";return;}
  try{
   const url=new URL(proxyUrl);url.searchParams.set("action","describe");url.searchParams.set("name",model?.name||file?.name||"Untitled model");
   if(model?.kind)url.searchParams.set("kind",model.kind);if(model?.source)url.searchParams.set("source",model.source);
   if(model?.category)url.searchParams.set("category",model.category);url.searchParams.set("format",format||model?.format||"3D");
   if(sourceUrl)url.searchParams.set("sourceUrl",sourceUrl);
   const response=await fetch(url.toString(),{headers:{Accept:"application/json"}});
   if(!response.ok)throw new Error("Description service returned HTTP "+response.status);
   const result=await response.json();if(my!==descriptionToken)return;
   body.textContent=result.description||body.textContent;status.textContent=result.generated?"Automatically generated":"Source summary + archive metadata";
   provenance.textContent=result.provenance||"Generated from archive metadata";
   const resolvedSource=result.sourceUrl||sourceUrl;source.hidden=!resolvedSource;if(resolvedSource)source.href=resolvedSource;else source.removeAttribute("href");
  }catch(error){if(my!==descriptionToken)return;status.textContent="Metadata description";provenance.textContent="The source summary could not be loaded; the metadata-based description is shown instead.";}
 }
 function volume(){const profiles={"p2s":[256,256,256],"prusa-xl-5":[360,360,360],"centauri-carbon":[256,256,256]};return profiles[$id("scaling-printer-profile").value]||["x","y","z"].map(a=>Number($id("scaling-bed-"+a).value));}
 function rotations(d){return [[d[0],d[1],d[2]],[d[0],d[2],d[1]],[d[1],d[0],d[2]],[d[1],d[2],d[0]],[d[2],d[0],d[1]],[d[2],d[1],d[0]]];}
 function best(d,b){let factor=0,orientation=null;for(const p of rotations(d)){const f=Math.min(...p.map((v,i)=>b[i]/v));if(f>factor){factor=f;orientation=p;}}return {factor,orientation};}
 function standards(minimum){
  const values=[];for(let p=0;p<=15;p++){const base=10**p;for(const n of [1,2,5]){const v=n*base;if(v>=minimum&&v<=1e15)values.push(v);}}
  return [...new Set(values)].sort((a,b)=>a-b);
 }
 function updatePreview(factor){
  if(!root||!active)return;root.scale.setScalar(active.unitFactor*factor);
  if(camera&&active.maxSize){const m=active.maxSize*factor;camera.position.set(m*1.7,m*1.3,m*1.9);camera.near=Math.max(m/10000,.001);camera.far=Math.max(m*100,1000);camera.updateProjectionMatrix();}
 }
 function renderFit(title,description,fits){
  const result=$id("scaling-fit-result");result.classList.toggle("is-fit",!!fits);result.classList.toggle("is-no-fit",fits===false);
  $id("scaling-fit-title").textContent=title;$id("scaling-fit-description").textContent=description;
 }
 function update(){
  if(!active)return;
  const mode=$id("scaling-mode").value,source=active.raw.map(v=>v*active.unitFactor),longest=Math.max(...source),bed=volume(),validBed=bed.every(v=>Number.isFinite(v)&&v>0);
  $id("scaling-source-dimensions").textContent=dims(source);$id("scaling-original-dimensions").textContent=dims(source);currentExportReady=false;currentExportFactor=1;
  if(mode==="fit"){
   selectedDenominator=null;$id("scaling-original-scale").textContent="Astronomical scale ignored";
   if(!validBed){$id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>Enter valid printer dimensions before fitting the model.</p>";setGauge("printability",null,"Invalid build volume");renderFit("Invalid build volume","All three printer dimensions must be greater than zero.",false);$id("scaling-orientation").textContent="—";updatePreview(1);return;}
   const margin=Number($id("scaling-fit-margin").value),adjustment=Number($id("scaling-fit-adjustment").value),fit=calculateFitToBuildPlate(source,bed,margin,adjustment);
   if(!fit.valid){$id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>Safety margin must be non-negative and leave a positive usable volume on all axes.</p>";setGauge("printability",null,"Invalid safety margin");renderFit("Check safety margin","The selected safety margin leaves no usable space on at least one printer axis.",false);$id("scaling-orientation").textContent="—";updatePreview(1);return;}
   currentExportFactor=fit.factor;currentExportReady=true;$id("scaling-selected-scale").textContent=fmt(fit.factor)+"× of source geometry";$id("scaling-print-dimensions").textContent=dims(fit.printDimensions);
   $id("scaling-recommendations").innerHTML="<p>Maximum proportional fit: <strong>"+fmt(fit.maxFactor)+"×</strong> of the loaded geometry.</p><p>Adjustment: "+fmt(adjustment)+"% · safety margin: "+fmt(margin)+" mm on every side.</p><p>Usable volume: "+dims(fit.usableBed)+". Increase the adjustment above 100% to test a larger model; the fit indicator will warn if it crosses the safe limits.</p>";
   const actualFit=best(fit.printDimensions,fit.usableBed);$id("scaling-orientation").textContent="Best orientation: "+(actualFit.orientation?dims(actualFit.orientation):"—");
   setGauge("printability",Math.min(100,actualFit.factor*100),fit.fits?"Fits with safety margins":"Exceeds safety-adjusted build volume");
   renderFit(fit.fits?"Fits the selected build plate":"Exceeds the selected build plate",fit.fits?"The model fits in the selected printer volume with "+fmt(margin)+" mm clearance on every side.":"The adjusted model is larger than the safety-adjusted usable volume. Reduce the adjustment percentage.",fit.fits);updatePreview(fit.factor);return;
  }
  let referenceDimensionMm=null,referenceAxis="longest",referenceLabel="";
  if(mode==="custom"){
   const value=Number($id("scaling-custom-dimension").value),unit=$id("scaling-custom-unit").value,unitFactor={mm:1,m:1000,km:1000000}[unit]||1;
   referenceDimensionMm=value*unitFactor;referenceAxis=$id("scaling-custom-axis").value;referenceLabel=$id("scaling-custom-kind").selectedOptions[0]?.textContent||"Custom dimension";
   if(!$id("scaling-custom-dimension").value.trim()||!Number.isFinite(referenceDimensionMm)||referenceDimensionMm<=0){
    $id("scaling-original-scale").textContent="Custom dimension required";$id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>Enter a positive real-world dimension and select the matching model axis.</p>";renderFit("Enter a custom original dimension","This mode uses your own real-world measurement; no astronomical lookup is required.",null);setGauge("printability",null,"Awaiting custom dimension");$id("scaling-orientation").textContent=validBed?"Build volume: "+dims(bed):"Enter valid printer dimensions";updatePreview(1);return;
   }
  }else{
   if(!realLongestKm||!(realLongestKm>0)){
    $id("scaling-original-scale").textContent="Not determined";$id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>Find the object above to retrieve its measured physical axes and calculate the real scale.</p>";renderFit("Real-world dimensions missing","The model geometry is measured, but no verified physical extent is linked yet.",null);setGauge("printability",null,"Awaiting scale");$id("scaling-orientation").textContent=validBed?"Build volume: "+dims(bed):"Enter valid printer dimensions";updatePreview(1);return;
   }
   referenceDimensionMm=realLongestKm*1e6;
  }
  const originalDenominator=mode==="custom"?calculateCustomScaleDenominator(source,referenceDimensionMm,referenceAxis):referenceDimensionMm/longest;
  if(!Number.isFinite(originalDenominator)||originalDenominator<=0){$id("scaling-original-scale").textContent="Invalid dimension mapping";$id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>Select a valid model axis for the entered real-world dimension.</p>";renderFit("Check the selected model axis","The real-world measurement could not be mapped to a positive model dimension.",null);setGauge("printability",null,"Invalid dimension mapping");updatePreview(1);return;}
  $id("scaling-original-scale").textContent="1:"+fmt(originalDenominator);
  if(!validBed){setGauge("printability",null,"Invalid build volume");renderFit("Invalid build volume","All three printer dimensions must be greater than zero.",false);return;}
  const fit=best(source,bed),minimum=originalDenominator/fit.factor,choices=standards(minimum),selected=selectedDenominator&&choices.includes(selectedDenominator)?selectedDenominator:(choices[0]||null);selectedDenominator=selected;
  if(!selected){$id("scaling-selected-scale").textContent="No standard scale found";$id("scaling-print-dimensions").textContent="—";$id("scaling-recommendations").innerHTML="<p>No scale up to 1:1,000,000,000,000,000 fits. Consider splitting the model or using a larger printer.</p>";setGauge("printability",null,"No scale selected");renderFit("No standard scale fits","Try splitting the model or selecting a larger build volume.",false);updatePreview(1);return;}
  const factor=originalDenominator/selected,print=source.map(v=>v*factor),fitNow=best(print,bed),fits=fitNow.factor>=1-1e-9;currentExportFactor=factor;currentExportReady=true;
  $id("scaling-selected-scale").textContent="1:"+fmt(selected);$id("scaling-print-dimensions").textContent=dims(print);
  $id("scaling-recommendations").innerHTML=choices.slice(0,6).map((den,i)=>{const size=source.map(v=>v*originalDenominator/den),isSelected=den===selected;return '<button type="button" class="scaling-scale-option'+(isSelected?' is-selected':'')+'" data-denominator="'+den+'"><strong>1:'+fmt(den)+'</strong><span>'+dims(size)+'</span><small>'+(i===0?'Largest recommended size':isSelected?'Selected scale':'Smaller print')+'</small></button>';}).join("");
  $id("scaling-orientation").textContent=(mode==="custom"?referenceLabel+" · model axis "+(referenceAxis==="longest"?"longest":"XYZ"[Number(referenceAxis)])+" · ":"")+"Best orientation: "+(fitNow.orientation?dims(fitNow.orientation):"—");
  setGauge("printability",Math.min(100,fitNow.factor*100),fits?"Fits selected build volume":"Needs a smaller scale");renderFit(fits?"Fits the selected build volume":"Does not fit at this scale",fits?"The model fits after a 90° axis-aligned rotation.":"This scale exceeds the selected build volume. Choose a smaller print (larger denominator).",fits);updatePreview(factor);
 }
 function assessmentText(id,value){const el=$id(id);if(el)el.textContent=value;}
 function openAssessment(){
  const dialog=$id("assessment-dialog");if(!dialog)return;
  const mode=$id("scaling-mode").value,title=$id("scaling-printer-profile")?.selectedOptions?.[0]?.textContent||"Selected printer",bed=volume(),validBed=bed.every(v=>Number.isFinite(v)&&v>0);
  const source=active?active.raw.map(v=>v*active.unitFactor):null,customValue=Number($id("scaling-custom-dimension").value),customUnit=$id("scaling-custom-unit").value,customFactor={mm:1,m:1000,km:1000000}[customUnit]||1,customAxis=$id("scaling-custom-axis").value;
  const customDenominator=mode==="custom"&&source?calculateCustomScaleDenominator(source,customValue*customFactor,customAxis):null;
  const originalDenominator=mode==="original"&&source&&realLongestKm>0?realLongestKm*1e6/Math.max(...source):null;
  const denominator=mode==="custom"?customDenominator:originalDenominator,hasScale=mode!=="fit"&&Number.isFinite(denominator)&&denominator>0&&Number.isFinite(selectedDenominator)&&selectedDenominator>0;
  assessmentText("assessment-printer",title);assessmentText("assessment-bed",validBed?dims(bed):"Invalid or incomplete build volume");assessmentText("assessment-model",source?dims(source):"No model loaded");
  assessmentText("assessment-object",mode==="fit"?"No physical reference used (fit mode)":mode==="custom"?($id("scaling-custom-kind").selectedOptions[0]?.textContent||"Custom dimension")+" · "+fmt(customValue)+" "+customUnit+" · model axis "+(customAxis==="longest"?"longest":"XYZ"[Number(customAxis)]):realLongestKm>0?realObjectName+" · "+fmt(realLongestKm)+" km longest axis":"No verified real-world dimensions linked");
  assessmentText("assessment-source",mode==="fit"?"Not required":mode==="custom"?"User-entered dimension · not source-verified":realLongestKm>0?(realSourceUrl?"Verified dimension source linked":"Dimension source not recorded"):"Not available");
  assessmentText("assessment-scale",mode==="fit"?"Fit to build plate · "+fmt(currentExportFactor)+"×":hasScale?"Original scale 1:"+fmt(denominator)+" · selected 1:"+fmt(selectedDenominator):"Cannot calculate without a valid reference dimension");
  assessmentText("assessment-confidence",mode==="custom"?"User supplied · not source-rated":mode==="fit"?"Not applicable":Number.isFinite(realConfidenceScore)?Math.round(realConfidenceScore)+" / 100 · evidence indicator":"Not rated");
  let verdict="Insufficient data for a print assessment",summary="Load a model and select a scaling mode to calculate its print dimensions.";
  let orientation="—",printDims="—",clearance="—",occupancy="—",fitIndex="—",axisRows="<p>Axis-by-axis clearance is unavailable until a model and valid build volume are loaded.</p>";
  if(source&&validBed&&mode==="fit"){
   const fit=calculateFitToBuildPlate(source,bed,Number($id("scaling-fit-margin").value),Number($id("scaling-fit-adjustment").value));
   if(!fit.valid){verdict="Invalid fit settings";summary="Check the build volume and safety margin. The safety margin must leave positive usable dimensions."; }
   else{
    const actual=best(fit.printDimensions,fit.usableBed),fits=fit.fits,margins=actual.orientation?actual.orientation.map((v,i)=>bed[i]-v):[],util=actual.orientation?actual.orientation.map((v,i)=>v/fit.usableBed[i]*100):[];
    printDims=dims(fit.printDimensions);orientation=actual.orientation?dims(actual.orientation):"—";clearance=margins.length?margins.map((v,i)=>fmt(v)+" mm on printer axis "+["X","Y","Z"][i]).join(" · "):"—";
    const volumeRatio=fit.printDimensions.reduce((a,v)=>a*v,1)/(bed.reduce((a,v)=>a*v,1))*100;occupancy=Number.isFinite(volumeRatio)?volumeRatio.toFixed(3)+"% of printer bounding volume":"—";
    fitIndex=Math.round(Math.min(100,actual.factor*100))+" / 100 · safe-volume fit index";
    verdict=fits?"Fits the selected build plate":"Exceeds the safety-adjusted build volume";summary="Astronomical scale is ignored. Maximum fit factor "+fmt(fit.maxFactor)+"×; adjustment "+fmt(fit.adjustmentPercent)+"%; safety margin "+fmt(fit.marginMm)+" mm on every side.";
    axisRows=actual.orientation?actual.orientation.map((v,i)=>'<div class="assessment-axis"><span>Printer '+["X","Y","Z"][i]+'</span><strong>'+fmt(v)+' / '+fmt(fit.usableBed[i])+' mm usable</strong><small>'+fmt(margins[i])+' mm to physical bed edge · '+fmt(util[i])+'% of safe width</small></div>').join(""):"<p>Orientation unavailable.</p>";
   }
  }else if(source&&validBed&&!hasScale){
   const rawFit=best(source,bed),fits=rawFit.factor>=1-1e-9;verdict="Geometry loaded; original scale unavailable";summary="The model can be checked at its current file dimensions, but no usable physical reference dimension is available.";
   fitIndex=fits?"100 / 100 · geometric fit at file size":Math.round(Math.max(0,rawFit.factor)*100)+" / 100 · scale-down factor";orientation=rawFit.orientation?dims(rawFit.orientation):"—";
   const volumeRatio=source.reduce((a,v)=>a*v,1)/(bed.reduce((a,v)=>a*v,1))*100;occupancy=Number.isFinite(volumeRatio)?Math.max(0,volumeRatio).toFixed(3)+"% of printer bounding volume":"—";
  }else if(source&&validBed&&hasScale){
   const factor=denominator/selectedDenominator,print=source.map(v=>v*factor),fit=best(print,bed),fits=fit.factor>=1-1e-9,margins=fit.orientation?fit.orientation.map((v,i)=>bed[i]-v):[],util=fit.orientation?fit.orientation.map((v,i)=>v/bed[i]*100):[];
   const volumeRatio=print.reduce((a,v)=>a*v,1)/(bed.reduce((a,v)=>a*v,1))*100;printDims=dims(print);orientation=fit.orientation?dims(fit.orientation):"—";
   clearance=margins.length?margins.map((v,i)=>fmt(v)+" mm on axis "+["X","Y","Z"][i]).join(" · "):"—";occupancy=Number.isFinite(volumeRatio)?volumeRatio.toFixed(3)+"% of printer bounding volume":"—";
   fitIndex=Math.round(Math.min(100,fit.factor*100))+" / 100 · geometric scale-down index";verdict=fits?"Fits the selected build volume":"Does not fit at the selected scale";
   summary=fits?"The selected scale fits within the selected build volume in an axis-aligned 90° orientation. This is a geometric fit result, not a prediction of print success.":"At least one dimension exceeds the build volume. Increase the scale denominator or split the model.";
   axisRows=fit.orientation?fit.orientation.map((v,i)=>'<div class="assessment-axis"><span>Printer '+["X","Y","Z"][i]+'</span><strong>'+fmt(v)+' / '+fmt(bed[i])+' mm</strong><small>'+fmt(margins[i])+' mm clearance · '+fmt(util[i])+'% used</small></div>').join(""):"<p>Orientation unavailable.</p>";
  }else if(source&&!validBed){verdict="Printer dimensions need attention";summary="Enter positive width, depth and height values before relying on a fit result.";}
  assessmentText("assessment-verdict",verdict);assessmentText("assessment-summary",summary);assessmentText("assessment-print-dimensions",printDims);assessmentText("assessment-orientation",orientation);
  assessmentText("assessment-clearance",clearance);assessmentText("assessment-occupancy",occupancy);assessmentText("assessment-fit-index",fitIndex);
  const axes=$id("assessment-axis-breakdown");if(axes)axes.innerHTML=axisRows;dialog.showModal();
 }
 ["reliability","printability"].forEach(key=>{
  const card=$id("scaling-gauge-"+key);if(!card)return;
  card.setAttribute("role","button");card.setAttribute("tabindex","0");
  card.setAttribute("aria-haspopup","dialog");card.setAttribute("title","Open detailed print assessment");
  card.addEventListener("click",openAssessment);
  card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openAssessment();}});
 });
 const assessmentClose=$id("assessment-close");if(assessmentClose)assessmentClose.addEventListener("click",()=> $id("assessment-dialog")?.close());
 const assessmentDialog=$id("assessment-dialog");
 if(assessmentDialog)assessmentDialog.addEventListener("click",event=>{
  if(event.target!==assessmentDialog)return;
  const rect=assessmentDialog.getBoundingClientRect();
  const inside=event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
  if(!inside)assessmentDialog.close();
 });
 function resize(){if(!renderer||!camera)return;const w=stage.clientWidth||640,h=stage.clientHeight||360;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}
 function animate(){if(!renderer)return;raf=requestAnimationFrame(animate);if(controls)controls.update();renderer.render(scene,camera);}
 window.addEventListener("resize",resize);
 function setLookupStatus(message,isError=false){const el=$id("scaling-lookup-status");el.textContent=message;el.classList.toggle("is-error",isError);}
 function showDimensions({name,axesKm,longestAxisKm,sourceUrl,sourceLabel="JPL SBDB",confidenceLabel="Verified source",confidenceNote="",uncertaintyKm=null,confidenceScore=null,displayUnit="km"}){
  realAxesKm=axesKm;realLongestKm=longestAxisKm;realSourceUrl=sourceUrl;realObjectName=name;
  const fallbackScore=/high evidence/i.test(confidenceLabel)?95:/moderate evidence/i.test(confidenceLabel)?75:/limited evidence/i.test(confidenceLabel)?45:/verified|jpl|curated/i.test(confidenceLabel)?90:null;
  realConfidenceScore=Number.isFinite(confidenceScore)?Math.max(0,Math.min(100,confidenceScore)):fallbackScore;
  setGauge("reliability",realConfidenceScore,realConfidenceScore===null?"Evidence unavailable":confidenceLabel);
  $id("scaling-object-result").hidden=false;$id("scaling-object-name").textContent=name;
  const outputFactor=displayUnit==="m"?1000:1,outputUnit=displayUnit==="m"?"m":"km";
  $id("scaling-object-axes").textContent=axesKm.map(v=>fmt(v*outputFactor)+" "+outputUnit).join(" × ");
  $id("scaling-object-longest").textContent=fmt(longestAxisKm*outputFactor)+" "+outputUnit;
  const quality=$id("scaling-object-confidence");if(quality)quality.textContent=confidenceLabel+(confidenceNote?" · "+confidenceNote:"");
  const uncertainty=$id("scaling-object-uncertainty");if(uncertainty)uncertainty.textContent=Number.isFinite(uncertaintyKm)?"± "+fmt(uncertaintyKm*outputFactor)+" "+outputUnit:"Not stated by source";
  const link=$id("scaling-reference-source");link.href=sourceUrl;link.textContent="Open "+sourceLabel+" record ↗";
  selectedDenominator=null;update();
 }
 function parseExtent(parameter){
  if(!parameter||parameter.value===undefined)return null;
  const unit=String(parameter.units||"km").trim().toLowerCase(),factor=unit==="km"?1:unit==="m"||unit==="meter"||unit==="meters"?0.001:unit==="au"?149597870.7:null;
  if(!factor)return null;
  const values=String(parameter.value).match(/[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?/g)||[];
  if(values.length<2||values.length>3)return null;
  const axes=values.map(Number).map(v=>v*factor);
  if(axes.some(v=>!Number.isFinite(v)||v<=0))return null;
  return axes;
 }
 function simplifySearchTerm(value){
  let text=String(value||"").normalize("NFKC").replace(/\.[^.]+$/,"");
  text=text.replace(/\(\s*#?\d+\s*\)/g," ");
  text=text.replace(/^\s*#?\d{1,6}\s+(?=[\p{L}])/u," ");
  text=text.replace(/\b(?:3d|model|mesh|download|print|final|low[ _-]?poly|high[ _-]?poly|export|copy|duplicate|version|ver|scene|object|group|root|scan|scanned|render|textured|decimated|variant|shape|file)\b/gi," ");
  text=text.replace(/\b(?:obj|ply|glb|gltf|stl|step|stp|fbx|blend|3ds|lwo|vsp3)\b/gi," ");
  text=text.replace(/[–—−_]+/g," ").replace(/[|,:;]+/g," ");
  text=text.replace(/[^\p{L}\p{N}\s/'-]/gu," ").replace(/\s+/g," ").trim();
  text=text.replace(/^(?:(?:the|of|asteroid|minor planet|comet|dwarf planet|moon|natural satellite|satellite|planet|spacecraft|space telescope)\s+)+/i,"");
  text=text.replace(/\s+#?\d{1,6}$/,"");
  let tokens=text.split(/\s+/).filter(Boolean);
  tokens=tokens.filter(token=>!/^\d+$/.test(token));
  const seen=new Set(),unique=[];
  for(const token of tokens){const key=token.toLocaleLowerCase();if(!seen.has(key)){seen.add(key);unique.push(token);}}
  text=unique.join(" ").replace(/([\p{L}]{4,})\d{1,4}$/u,"$1").trim();
  return /^(?:model|mesh|object|scene|untitled|download|file|unknown)$/i.test(text)?"":text;
 }
 function normalizeResearchQuery(value,category=null){
  let text=String(value||"").normalize("NFKC").replace(/\.[^.]+$/,"").trim();
  if(category==="small-bodies"){
   text=text.replace(/^\s*(?:asteroid|minor planet|minor planet no\.?)\s+/i,"");
   text=text.replace(/^\s*\(\s*(\d+)\s*\)\s*/,"$1 ");
   // Parenthetical text after a numbered body is a catalogue variant, not part
   // of its physical identity (e.g. "(A) (West Globe Hollow)").
   text=text.replace(/\s+\([^)]*\).*$/,"");
   // Strip generic catalogue descriptors from the end, but retain numbered
   // designations and all words that identify the actual body.
   for(let i=0;i<3;i++){
    const previous=text;
    text=text.replace(/(?:\s+(?:near[- ]earth|main[- ]belt))?\s+(?:asteroids?|minor planets?|small bodies?|shape models?|3d models?|mesh models?|models?|meshes?|shapes?|primary|secondary)\s*$/i,"").trim();
    if(text===previous)break;
   }
   text=text.replace(/[–—−_]+/g," ").replace(/[()]/g," ").replace(/\s+/g," ").trim();
   return text;
  }
  return simplifySearchTerm(text)||text;
 }
 function normalizeObjectQuery(value,category=null){
  return normalizeResearchQuery(value,category).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
 }
 async function findCuratedDimensions(candidates,expectedCategory=null){
  try{
   if(!curatedDimensionsPromise)curatedDimensionsPromise=fetch("data/object-dimensions-index.json?v=20261127-dimension-research-2",{cache:"no-cache"}).then(response=>{if(!response.ok)throw new Error("Fallback database is unavailable");return response.json();});
   const index=await curatedDimensionsPromise,keys=new Set(candidates.map(value=>normalizeObjectQuery(value,expectedCategory)).filter(Boolean));
   const found=(index.records||[]).filter(record=>(!expectedCategory||record.category===expectedCategory||(record.categoryAliases||[]).includes(expectedCategory))&&[record.name,...(record.aliases||[])].some(alias=>keys.has(normalizeObjectQuery(alias,expectedCategory))));
   return found.length===1?found[0]:null;
  }catch(error){curatedDimensionsPromise=null;return null;}
 }
 async function applyCuratedFallback(candidates,expectedCategory=null){
  const record=await findCuratedDimensions(candidates,expectedCategory);
  if(!record)return false;
  const longest=Math.max(...record.axesKm);
  showDimensions({name:record.name,axesKm:record.axesKm,longestAxisKm:longest,sourceUrl:record.sourceUrl,sourceLabel:record.sourceLabel||"scientific reference",confidenceLabel:"High evidence",confidenceNote:record.measurement||"curated scientific record",uncertaintyKm:record.uncertaintyKm,displayUnit:record.category==="spacecraft"?"m":"km"});
  const uncertainty=Number.isFinite(record.uncertaintyKm)?" Published uncertainty: ±"+fmt(record.uncertaintyKm)+" km.":"";
  const note=record.note?" "+record.note:"";
  setResearchState("complete","A matching record was found in the curated scientific dimensions index.");
   setLookupStatus((record.category==="spacecraft"?"Spacecraft dimensions":record.category==="moons"?"Moon dimensions":"JPL has no usable extent; using published dimensions")+" from "+(record.sourceLabel||"the scientific fallback catalogue")+"."+(record.configuration?" Configuration: "+record.configuration+".":"")+uncertainty+note);
  return true;
 }
 function deriveSearchTerm(model,file,object){
  const candidates=[model?.objectSearchName,model?.name,file?.name,$id("scaling-object-query").value];
  for(const candidate of candidates){
   const simplified=normalizeResearchQuery(candidate,model?.category);
   if(simplified&&simplified.length>2)return simplified;
  }
  const labels=[];
  if(object)object.traverse(node=>{
   const name=simplifySearchTerm(node.name);
   if(name&&name.length>2&&!/^(?:mesh|object|scene|group|root|node|default|geometry)$/i.test(name)&&!labels.includes(name))labels.push(name);
  });
  return labels.slice(0,3).join(" ").slice(0,140);
 }
 function setResearchState(state,message){
  const panel=$id("scaling-research-panel");if(!panel)return;
  panel.hidden=state==="hidden";panel.classList.toggle("is-searching",state==="searching");panel.classList.toggle("is-complete",state==="complete");
  $id("scaling-research-title").textContent=state==="searching"?"Cloudflare Worker searching...":state==="complete"?"Research complete":"Research";
  $id("scaling-research-detail").textContent=message||"Comparing scientific sources and published measurements.";
 }
 function qualityLabel(value){return value==="high"?"High evidence":value==="medium"?"Moderate evidence":"Limited evidence";}
 function escapeResearch(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 function renderResearchCandidates(candidates,autoAccepted=false){
  researchCandidates=Array.isArray(candidates)?candidates:[];
  const panel=$id("scaling-research-results"),details=$id("scaling-unverified-details"),count=$id("scaling-unverified-count");
  if(!panel)return;
  panel.hidden=!researchCandidates.length;
  if(details){details.hidden=!researchCandidates.length;details.open=false;}
  if(count)count.textContent=String(researchCandidates.length);
  panel.innerHTML=researchCandidates.map((item,index)=>{
   const axes=Array.isArray(item.axesKm)&&item.axesKm.length>=2?item.axesKm.map(v=>fmt(v)+" km").join(" × ")+(Number.isFinite(item.uncertaintyKm)?" · published ± "+fmt(item.uncertaintyKm)+" km":" · uncertainty not stated"):"No extractable dimensions";
   return '<article class="research-candidate"><div class="research-candidate-top"><strong>'+escapeResearch(item.title||item.source||"Source result")+'</strong><span>'+escapeResearch(qualityLabel(item.quality))+'</span></div><p>'+escapeResearch(axes)+'</p><small>'+escapeResearch(item.source||"Web source")+' · source-quality score '+escapeResearch(item.score??"—")+'</small><div class="research-candidate-actions">'+(item.axesKm?'<button type="button" data-research-index="'+index+'">Review dimensions</button>':'<span>Dimensions not extracted</span>')+' <a href="'+escapeResearch(item.url||"#")+'" target="_blank" rel="noopener">Open source ↗</a></div><p class="research-snippet">'+escapeResearch(item.snippet||"")+'</p></article>';
  }).join("");
 }
 async function runWebResearch(query,expectedCategory,lookupToken){
  if(!proxyUrl){setResearchState("complete","Web research requires the Cloudflare Worker URL in config.js.");return false;}
  setResearchState("searching","Searching for exact object-name matches in relevant scientific contexts.");
  setLookupStatus("Cloudflare Worker searching...");
  const url=new URL(proxyUrl);url.searchParams.set("action","research");url.searchParams.set("q",query);if(expectedCategory)url.searchParams.set("category",expectedCategory);
  const response=await fetch(url.toString(),{headers:{Accept:"application/json"}});
  if(!response.ok)throw new Error("Web research returned HTTP "+response.status);
  const result=await response.json();if(lookupToken!==token)return false;
  renderResearchCandidates(result.candidates||[],!!result.autoAccept);
  if(result.autoAccept&&result.best?.axesKm){
   const best=result.best;
   showDimensions({name:best.matchedObject||query,axesKm:best.axesKm,longestAxisKm:Math.max(...best.axesKm),sourceUrl:best.url,sourceLabel:best.sourceLabel||best.source||"web source",confidenceLabel:qualityLabel(best.quality),confidenceNote:best.measurement||"heuristic source assessment",uncertaintyKm:best.uncertaintyKm,confidenceScore:best.score,displayUnit:expectedCategory==="spacecraft"?"m":"km"});
   setResearchState("complete","A strong source candidate was selected. "+(result.agreementCount?"Independent sources agree on the longest axis.":"No independent dimensional cross-check was found; review the source."));
   setLookupStatus((best.sourceLabel||best.source||"A source")+" · "+(best.measurement||"Published dimensions")+". "+(best.note||"Evidence score is a source-quality heuristic, not a statistical probability."));
   return true;
  }
  setResearchState("complete",result.candidates?.length?"No verified result met the automatic-selection threshold. Relevant unverified candidates are available below.":"No relevant exact-name results were found. No unrelated pages are shown.");
  setLookupStatus(result.candidates?.length?"Review the unverified candidates only if their title and original source clearly identify this object.":"No source-backed dimensions found. Scale remains unverified.",!result.candidates?.length);
  return false;
 }
 async function lookupObject(query,quiet=false,expectedCategory=null){
  const q=normalizeResearchQuery(query,expectedCategory);if(!q||lookupBusy)return;
  if($id("scaling-object-query").value!==q)$id("scaling-object-query").value=q;
  const lookupToken=token;
  lookupBusy=true;$id("scaling-jpl-lookup").disabled=true;
  setResearchState("searching","Checking the model name against curated scientific records and standard databases.");
  setLookupStatus("Cloudflare Worker searching...");
  try{
   const directRecord=await findCuratedDimensions([q],expectedCategory);
   if(lookupToken!==token)return;
   if(directRecord&&(directRecord.category!=="small-bodies"||["iris","7 iris"].includes(normalizeObjectQuery(q,expectedCategory)))){
    const longest=Math.max(...directRecord.axesKm);
    showDimensions({name:directRecord.name,axesKm:directRecord.axesKm,longestAxisKm:longest,sourceUrl:directRecord.sourceUrl,sourceLabel:directRecord.sourceLabel||"scientific reference",confidenceLabel:"High evidence",confidenceNote:directRecord.measurement||"curated scientific record",uncertaintyKm:directRecord.uncertaintyKm,displayUnit:directRecord.category==="spacecraft"?"m":"km"});
    const uncertainty=Number.isFinite(directRecord.uncertaintyKm)?" Published uncertainty: ±"+fmt(directRecord.uncertaintyKm)+" km.":"";
    setResearchState("complete","A matching source-backed scientific record was found.");
    setLookupStatus((directRecord.category==="spacecraft"?"Spacecraft dimensions":directRecord.category==="moons"?"Moon dimensions":"Terrain footprint")+" from "+(directRecord.sourceLabel||"scientific reference")+"."+(directRecord.configuration?" Configuration: "+directRecord.configuration+".":"")+(directRecord.note?" "+directRecord.note:"")+uncertainty);
    return;
   }
   if(expectedCategory!=="small-bodies"){
    if(await applyCuratedFallback([q],expectedCategory))return;
    if(proxyUrl){
     const researched=await runWebResearch(q,expectedCategory,lookupToken);
     if(researched)return;
     if(lookupToken!==token)return;
     setLookupStatus("No category-matched scientific dimensions were found. JPL Small-Body Database was not queried for this object.",true);
     if(!quiet)renderFit("No verified scale basis","No matching scientific dimensions were found for this category. The scale remains unverified.",null);
     return;
    }
    throw new Error("JPL Small-Body Database is restricted to asteroids, comets and other small bodies. Configure the research Worker for category-specific dimensions.");
   }
   if(!proxyUrl){
    if(await applyCuratedFallback([q],expectedCategory))return;
    throw new Error("JPL lookup needs the Cloudflare proxy, and no matching scientific dimensions record was found.");
   }
   const url=new URL(proxyUrl);url.searchParams.set("sstr",q);
   let data=null,jplFailure="";
   try{
    const response=await fetch(url.toString(),{headers:{Accept:"application/json"}});
    if(!response.ok)jplFailure="Proxy responded with HTTP "+response.status;
    else data=await response.json();
   }catch(fetchError){jplFailure=fetchError.message||"JPL request failed";}
   if(lookupToken!==token)return;
   if(!data){
    if(await applyCuratedFallback([q],expectedCategory))return;
    throw new Error(jplFailure||"JPL lookup failed and no curated dimensions were found.");
   }
   if(data.code===300||Array.isArray(data.list)){
    const matches=data.list||[];const names=matches.slice(0,5).map(x=>x.fullname||x.name||x.des).filter(Boolean);
    throw new Error("Multiple JPL matches. Please refine the search"+(names.length?": "+names.join(", "):"."));
   }
   if(data.code||data.error||!data.object){
    if(await applyCuratedFallback([q],expectedCategory))return;
    throw new Error(data.message||data.error||"JPL could not identify the object and no curated dimensions matched.");
   }
   const params=Array.isArray(data.phys_par)?data.phys_par:[];
   const extent=params.find(p=>String(p.name||"").toLowerCase()==="extent");
   const axes=parseExtent(extent);
   const objectName=data.object.fullname||data.object.shortname||q;
   const sbdbUrl="https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr="+encodeURIComponent(objectName);
   if(!axes){
    if(await applyCuratedFallback([objectName,data.object.shortname,q],expectedCategory))return;
    const diameter=params.find(p=>["diameter","diam"].includes(String(p.name||"").toLowerCase()));
    if(diameter)throw new Error("JPL has a diameter but no usable extent, and no matching published axis dimensions were found. A diameter alone is not used as three axes.");
    throw new Error("JPL has no usable extent and no matching published axis dimensions were found.");
   }
   const longest=Math.max(...axes);
   showDimensions({name:objectName,axesKm:axes,longestAxisKm:longest,sourceUrl:sbdbUrl});
   setLookupStatus("JPL physical axes found. Original scale and printer-fit suggestions have been calculated.");
  }catch(error){
   if(lookupToken!==token)return;
   // A JPL ambiguity or temporary lookup failure must not hide a verified
   // source-backed record already present in the local dimensions index.
   if(await applyCuratedFallback([q],expectedCategory))return;
   if(proxyUrl){
    try{await runWebResearch(q,expectedCategory,lookupToken);return;}
    catch(researchError){
     setResearchState("complete","The web search failed. Check that the updated Worker code has been deployed.");
     setLookupStatus("Web research failed: "+(researchError.message||researchError),true);
     if(!quiet)renderFit("No verified scale basis","The web research service could not return usable results.",null);
     return;
    }
   }
   setResearchState("complete","No Cloudflare Worker URL is configured. Add it in config.js to enable automatic research.");
   setLookupStatus(error.message||"Object lookup failed.",true);
   if(!quiet)renderFit("No verified scale basis",error.message||"Object lookup failed.",null);
  }finally{
   lookupBusy=false;
   const button=$id("scaling-jpl-lookup");if(button)button.disabled=false;
  }
 }
 async function load(file,format,model=null,url=null,companions=[],skipLookup=false) {
  clear();const displayFormat=model?.format||format;format=normalizeConversionFormat(format);activeExpectedCategory=model?.category||null;conversionContext={model,file,format,displayFormat};const my=token;realAxesKm=null;realLongestKm=null;realSourceUrl="";realObjectName="";realConfidenceScore=null;selectedDenominator=null;
  $id("scaling-object-result").hidden=true;$id("scaling-measurement-state").textContent="Loading geometry…";
  $id("scaling-file-state").textContent="Loading model…";$id("scaling-model-name").textContent=model?model.name:file.name;
  $id("scaling-format").textContent=format;$id("scaling-source-dimensions").textContent="Loading…";
  const remoteSource=!file&&typeof url==="string"&&url.startsWith("https://");
  const originalUrl=url;
  try{
   if(file&&file.size>75*1024*1024)throw new Error("Files larger than 75 MB cannot be previewed or converted in the browser.");
   if(file){url=URL.createObjectURL(file);objectUrls.push(url);}
   if(remoteSource&&format!=="GLTF")url=await fetchRemoteAsset(originalUrl);
   await ensure();if(my!==token)return;
   scene=new THREE.Scene();scene.background=new THREE.Color(0xf0f3f6);
   camera=new THREE.PerspectiveCamera(38,(stage.clientWidth||640)/(stage.clientHeight||360),.01,1e9);
   renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
   stage.replaceChildren(renderer.domElement);renderer.domElement.style.cssText="display:block;width:100%;height:100%;touch-action:none";
   scene.add(new THREE.HemisphereLight(0xffffff,0x8796a5,2));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(2,3,4);scene.add(light);
   let object;
    if(format==="GLB"||format==="GLTF"){
     const manager=new THREE.LoadingManager(),resourceMap=new Map();
     companions.forEach(part=>{const partUrl=URL.createObjectURL(part);objectUrls.push(partUrl);resourceMap.set(part.name.toLowerCase(),partUrl);});
     manager.setURLModifier(requested=>{
      if(requested.startsWith("https://")&&proxyUrl)return proxyAssetUrl(requested);
      if(/^(data:|blob:|https?:)/i.test(requested)&&!requested.startsWith("https://sma.local/"))return requested;
      const clean=decodeURIComponent(requested.split(/[?#]/)[0]),name=clean.split("/").pop().toLowerCase();
      return resourceMap.get(name)||requested;
     });
     const loader=new L.GLB(manager),draco=new L.DRACO();draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");loader.setDRACOLoader(draco);loader.setMeshoptDecoder(L.MeshoptDecoder);
     if(format==="GLTF"&&file){const gltf=await loader.parseAsync(await file.text(),"https://sma.local/");object=gltf.scene;}
     else if(format==="GLTF"&&remoteSource){
      const fetched=await fetchRemoteResponse(originalUrl,"model/gltf+json,application/json,*/*");
      // If the document needed the proxy, route its relative .bin and texture
      // dependencies through the same allowlisted endpoint as well.
      if(fetched.viaProxy)manager.setURLModifier(requested=>{
       if(/^(data:|blob:)/i.test(requested))return requested;
       return proxyAssetUrl(new URL(requested,originalUrl).toString());
      });
      const base=originalUrl.slice(0,originalUrl.lastIndexOf("/")+1);const gltf=await loader.parseAsync(await fetched.response.text(),base);object=gltf.scene;
     }else object=(await loader.loadAsync(url)).scene;
    }else if(format==="OBJ"){
     const manager=new THREE.LoadingManager(),resourceMap=new Map();
     companions.forEach(part=>{const partUrl=URL.createObjectURL(part);objectUrls.push(partUrl);resourceMap.set(part.name.toLowerCase(),partUrl);});
     manager.setURLModifier(requested=>{if(requested.startsWith("https://")&&proxyUrl)return proxyAssetUrl(requested);if(/^(data:|blob:|https?:)/i.test(requested)&&!requested.startsWith("https://sma.local/"))return requested;const name=decodeURIComponent(requested.split(/[?#]/)[0]).split("/").pop().toLowerCase();return resourceMap.get(name)||requested;});
     const objLoader=new L.OBJ(manager),mtl=companions.find(part=>part.name.toLowerCase().endsWith(".mtl"));
     if(mtl){const materials=new L.MTL(manager).parse(await mtl.text(),"https://sma.local/");materials.preload();objLoader.setMaterials(materials);}
     object=await objLoader.loadAsync(url);
    }else if(format==="FBX"){
     object=await new L.FBX().loadAsync(url);
    }else if(format==="3DS"){
     const loader=new L.TDS();loader.setResourcePath(typeof url==="string"?url.slice(0,url.lastIndexOf("/")+1):"");object=await loader.loadAsync(url);
    }else if(format==="LWO"){
     const data=await new L.LWO().loadAsync(url);object=new THREE.Group();(data.meshes||[]).forEach(mesh=>object.add(mesh));
    }else if(format==="BLEND"){
     const response=await fetch(url);if(!response.ok)throw new Error("BLEND download returned HTTP "+response.status+".");
     const bytes=await response.arrayBuffer();const blend=await import("./vendor/blend-importer.js");
     const parsed=await blend.parseBlend(bytes,model?.name||file?.name||"Blender scene");const objects=blend.createObjects(parsed);
     if(!objects.length)throw new Error("The BLEND file contains no supported mesh objects.");
     object=new THREE.Group();object.add(...objects);
    }else if(format==="STEP"||format==="STP"){
     const response=await fetch(url);if(!response.ok)throw new Error("STEP download returned HTTP "+response.status+".");
     const bytes=await stepBuffer(await response.arrayBuffer());const occt=await getOcct();
     const result=occt.ReadStepFile(new Uint8Array(bytes),{linearUnit:"millimeter",linearDeflectionType:"bounding_box_ratio",linearDeflection:.001,angularDeflection:.5});
     object=occtMeshGroup(result);
    }else{
     const geo=await new L[format]().loadAsync(url);geo.computeVertexNormals();object=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0x91a9bb,metalness:.12,roughness:.58,side:THREE.DoubleSide}));
    }
   if(my!==token){renderer.dispose();return;}
   object.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(object),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
   if(![size.x,size.y,size.z].every(v=>Number.isFinite(v)&&v>=0)||Math.max(size.x,size.y,size.z)<=0)throw Error("Model has empty or invalid geometry bounds.");
   root=new THREE.Group();root.position.copy(center).multiplyScalar(-1);root.add(object);scene.add(root);
   const unit=(format==="GLB"||format==="GLTF"||format==="BLEND")?"m":"mm";$id("scaling-units").value=unit;
   active={raw:[size.x,size.y,size.z],unitFactor:unitFactors[unit]};root.scale.setScalar(active.unitFactor);
   const max=Math.max(...active.raw)*active.unitFactor;active.maxSize=max;
   camera.position.set(max*1.7,max*1.3,max*1.9);camera.near=Math.max(max/10000,.001);camera.far=Math.max(max*100,1000);camera.updateProjectionMatrix();
   controls=new L.Orbit(camera,renderer.domElement);controls.enableDamping=true;resize();animate();
   let triangleCount=0;object.traverse(node=>{if(node.isMesh&&node.geometry){const geometry=node.geometry;triangleCount+=geometry.index?geometry.index.count/3:(geometry.attributes.position?.count||0)/3;}});
   if(triangleCount>5000000)throw new Error("This model exceeds the 5-million-triangle browser conversion safety limit.");
   const convertButton=$id("scaling-convert-stl"),convertable=["FBX","3DS","LWO","BLEND","STEP","STP"].includes(format);
   if(convertButton){convertButton.hidden=!convertable;convertButton.disabled=false;convertButton.textContent="Convert "+(conversionContext?.displayFormat||format)+" to STL";}const convertBeta=$id("scaling-convert-beta");if(convertBeta)convertBeta.hidden=!convertable;
   $id("scaling-file-state").textContent=model?.convertedFile?"Converted STL":file?"Local upload":"Archive model";$id("scaling-measurement-state").textContent="Geometry measured";update();
   if(file&&model?.convertedFile){const download=$id("scaling-download-link");download.href=url;download.textContent="Download converted STL ↧";download.setAttribute("download",file.name);}
   if(model&&Number.isFinite(model.realLongestAxisKm)&&model.realLongestAxisKm>0){
    const axes=Array.isArray(model.realDimensionsKm)&&model.realDimensionsKm.length>=2?model.realDimensionsKm:[model.realLongestAxisKm];
    showDimensions({name:model.name,axesKm:axes,longestAxisKm:model.realLongestAxisKm,sourceUrl:model.realDimensionUrl||"#",sourceLabel:"verified source",displayUnit:model.category==="spacecraft"?"m":"km"});
    setLookupStatus("Using the existing existing verified measurement.");
   }else{
    const query=deriveSearchTerm(model,file,object)||$id("scaling-object-query").value.trim();
    if(query&&!skipLookup){$id("scaling-object-query").value=query;await lookupObject(query,true,model?.category||null);}else if(skipLookup)setLookupStatus("Geometry loaded. Convert to STL or review the measured model before calculating print scale.");
    else setLookupStatus("No usable object name found in the model metadata or filename. Enter a name to search.");
   }
  }catch(err){
   if(my!==token)return;clear();stage.innerHTML='<div class="preview-placeholder"><span>⚠</span><p>Could not load this model: '+String(err.message||err).replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]))+'</p><p>Archive previews use the configured Cloudflare asset proxy when available. If the download still fails, the source may be unavailable, the URL may not point to a direct model file, or the host may block server-side access. Supported formats: STL, OBJ, PLY, GLB, GLTF, FBX, 3DS, LWO, BLEND and STEP.</p></div>';
   $id("scaling-file-state").textContent="Preview unavailable";$id("scaling-measurement-state").textContent="Geometry unavailable";
   renderFit("Could not measure model","No scale can be calculated until the geometry loads.",null);
  }
 }
 async function convertActiveModelToStl(){
  if(!root||!active||!conversionContext){setLookupStatus("Load a supported 3D model before converting it.",true);return;}
  const button=$id("scaling-convert-stl"),context=conversionContext,originalFormat=context.displayFormat||context.format;
  if(button){button.disabled=true;button.textContent="Converting…";}
  setLookupStatus("Converting "+originalFormat+" geometry to a binary STL in this browser. No model file is uploaded.");
  try{
   root.updateMatrixWorld(true);
   const exporter=new L.STLExporter(),data=exporter.parse(root,{binary:true});
   const outputBytes=data?.byteLength||data?.buffer?.byteLength||0;
   if(!outputBytes)throw new Error("The STL exporter returned an empty file.");
   if(outputBytes>75*1024*1024)throw new Error("The converted STL exceeds the 75 MB safety limit.");
   const base=context.model?{...context.model}:{
    id:"local-converted-"+Date.now(),
    name:(context.file?.name||"Converted model").replace(/\.(?:step|stp)\.gz$/i,"").replace(/\.[^.]+$/,""),
    category:null,kind:"User-uploaded 3D model",source:"Local file",license:"User-provided",sourceUrl:""
   };
   const safeName=String(base.name||"converted-model").replace(/[^a-z0-9_-]+/gi,"-").replace(/^-|-$/g,"").toLowerCase()||"converted-model";
   const file=new File([data],safeName+".stl",{type:"model/stl"});
   const convertedModel={...base,format:"STL",size:(file.size/1024).toFixed(0)+" kB",convertedFile:file,convertedFromFormat:originalFormat,convertToStl:false,downloadDirect:true};
   $id("scaling-archive-context").hidden=false;
   $id("scaling-archive-meta").textContent="STL · converted from "+originalFormat;
   const archiveSource=$id("scaling-archive-source");archiveSource.textContent=base.source||"Local file";archiveSource.hidden=!base.sourceUrl;
   if(base.sourceUrl)archiveSource.href=base.sourceUrl;else archiveSource.removeAttribute("href");
   const source=$id("scaling-source-link");source.hidden=!base.sourceUrl;if(base.sourceUrl)source.href=base.sourceUrl;else source.removeAttribute("href");
   await load(file,"STL",convertedModel,null,[],false);
   if(!root)throw new Error("The converted STL could not be reloaded into the preview.");
   $id("scaling-file-state").textContent="Converted STL";
   $id("scaling-format").textContent="STL · CONVERTED";
   $id("scaling-archive-meta").textContent="STL · converted from "+originalFormat;
   $id("scaling-download-link").textContent="Download converted STL ↧";
   setLookupStatus("Converted "+originalFormat+" to STL locally. The STL is now loaded in the normal preview and scaling workspace; check the measured size and file unit before printing.");
  }catch(error){
   if(button){button.disabled=false;button.textContent="Retry STL conversion";}
   setLookupStatus("STL conversion failed: "+(error?.message||error),true);
  }
 }
 function syncScalingModeUI(){
  const mode=$id("scaling-mode").value;
  $id("scaling-object-search").hidden=mode!=="original";
  $id("scaling-object-result").hidden=mode!=="original"||!realLongestKm;
  $id("scaling-custom-dimension-panel").hidden=mode!=="custom";
  $id("scaling-fit-options").hidden=mode!=="fit";
  $id("scaling-mode-hint").textContent=mode==="fit"?"Astronomical dimensions and original scale are ignored. The model is fitted to the selected usable build volume.":mode==="custom"?"Enter one real-world dimension and map it to the matching model axis. No online object lookup is required.":"Use verified scientific dimensions to calculate the original scale and standard printable scales.";
 }
 function resetWorkspace(){
  clear();descriptionToken++;$id("scaling-model-description").hidden=true;realAxesKm=null;realLongestKm=null;realSourceUrl="";realObjectName="";realConfidenceScore=null;selectedDenominator=null;
  $id("scaling-mode").value="original";$id("scaling-custom-dimension").value="";$id("scaling-custom-unit").value="mm";$id("scaling-custom-axis").value="longest";$id("scaling-custom-kind").value="diameter";$id("scaling-fit-margin").value="5";$id("scaling-fit-adjustment").value="100";$id("scaling-fit-adjustment-value").textContent="100%";syncScalingModeUI();$id("scaling-page-overline").textContent="PRINT WORKSPACE";$id("scaling-page-title").textContent="Model scaling";$id("scaling-page-subtitle").textContent="Load a model, identify its real-world dimensions and find a printable scale.";$id("scaling-archive-context").hidden=true;
  $id("scaling-object-result").hidden=true;$id("scaling-object-query").value="";$id("scaling-printer-profile").value="p2s";$id("scaling-custom-volume").hidden=true;
  $id("scaling-model-name").textContent="No model selected";$id("scaling-format").textContent="UPLOAD A MODEL";$id("scaling-file-state").textContent="No model loaded";
  $id("scaling-measurement-state").textContent="Waiting for model";$id("scaling-source-dimensions").textContent="—";$id("scaling-model-description").hidden=true;$id("scaling-convert-stl").hidden=true;$id("scaling-convert-beta").hidden=true;
  $id("scaling-original-scale").textContent="Waiting for dimensions";$id("scaling-original-dimensions").textContent="—";
  $id("scaling-selected-scale").textContent="—";$id("scaling-print-dimensions").textContent="—";
  $id("scaling-recommendations").innerHTML="<p>Load a model and identify its object to calculate scale suggestions.</p>";
  renderFit("Awaiting model and object dimensions","The model is checked against the selected printer once its real-world dimensions are found.",null);
  $id("scaling-orientation").textContent="—";stage.innerHTML='<div class="preview-placeholder"><span>◈</span><p>Upload STL, OBJ, PLY, GLB, GLTF, FBX, BLEND or STEP model files.</p></div>';
  setLookupStatus(proxyUrl?"Searches JPL for physical axes (extent), not just an average diameter.":"JPL lookup requires the free proxy to be configured once.",!proxyUrl);
 }
 window.addEventListener("sma-scaling-open",async e=>{
  const model=e.detail?.model;resetWorkspace();
  if(model&&model.downloadDirect!==false){
   const originalFormat=String(model.format||"").toUpperCase();
   const format=/\b(?:STEP|STP)\b/i.test(originalFormat)?"STEP":originalFormat;
   const supported=["GLB","GLTF","STL","OBJ","PLY","FBX","3DS","LWO","BLEND","STEP","STP"].includes(format);
   if(!supported){$id("scaling-model-name").textContent=model.name||"Unsupported model";setLookupStatus("This file format has no safe in-browser STL converter yet.",true);return;}
   $id("scaling-page-overline").textContent="ARCHIVE MODEL";$id("scaling-page-title").textContent=model.name;$id("scaling-page-subtitle").textContent=model.kind+" · interactive preview, dimensions and print scale";
   $id("scaling-archive-context").hidden=false;$id("scaling-archive-meta").textContent=model.format+" · "+model.size;const archiveSource=$id("scaling-archive-source");archiveSource.textContent=model.source||"Original source";archiveSource.hidden=!model.sourceUrl;if(model.sourceUrl)archiveSource.href=model.sourceUrl;else archiveSource.removeAttribute("href");
   const download=$id("scaling-download-link");download.href=model.file;download.textContent="Download "+model.format+" ↧";download.toggleAttribute("download",model.downloadDirect!==false);const source=$id("scaling-source-link");source.hidden=!model.sourceUrl;if(model.sourceUrl)source.href=model.sourceUrl;else source.removeAttribute("href");const meshNote=$id("spacecraft-mesh-note");if(meshNote)meshNote.hidden=model.category!=="spacecraft";
   $id("scaling-object-query").value=model.name||"";loadModelDescription(model,null,model.format);
   await load(null,format,model,model.file,[],!!model.convertToStl);
   if(model.convertToStl&&root)await convertActiveModelToStl();
  }else{$id("scaling-model-name").textContent="Upload your downloaded model";}
 });
 $id("scaling-file").addEventListener("change",e=>{
  const files=Array.from(e.target.files||[]);if(!files.length)return;
  const extOf=file=>/\.(?:step|stp)\.gz$/i.test(file.name)?"STEP":file.name.split(".").pop().toUpperCase();
  const supported=["STL","OBJ","PLY","GLB","GLTF","FBX","3DS","LWO","BLEND","STEP","STP"],file=files.find(f=>supported.includes(extOf(f)));
  if(!file){$id("scaling-file-state").textContent="No supported model file selected";return;}
  const ext=extOf(file),companions=files.filter(f=>f!==file);
  const model={id:"local-"+file.name,name:file.name.replace(/\.(?:step|stp)\.gz$/i,"").replace(/\.[^.]+$/,""),category:null,kind:"User-uploaded 3D model",source:"Local file",size:(file.size/1024).toFixed(0)+" kB",format:ext,license:"User-provided",sourceUrl:"",downloadDirect:true};
  $id("scaling-object-query").value="";loadModelDescription(model,file,ext);load(file,ext,model,null,companions);
 });
 $id("scaling-convert-stl").addEventListener("click",convertActiveModelToStl);
 $id("scaling-units").addEventListener("change",()=>{if(!active)return;active.unitFactor=unitFactors[$id("scaling-units").value];root.scale.setScalar(active.unitFactor);update();});
 $id("scaling-download-scaled").addEventListener("click",()=>{
  if(!root||!active||!currentExportReady){setLookupStatus("Load a model and complete the selected scaling mode before exporting.",true);return;}
  try{
   root.updateMatrixWorld(true);
   const exporter=new L.STLExporter(),data=exporter.parse(root,{binary:true}),blob=new Blob([data],{type:"model/stl"}),name=($id("scaling-model-name").textContent||"space-model").replace(/[^a-z0-9_-]+/gi,"-").replace(/^-|-$/g,"").toLowerCase()||"scaled-model",mode=$id("scaling-mode").value;
   const suffix=mode==="fit"?"-fit-to-build-plate":"-1-to-"+fmt(selectedDenominator);
   const href=URL.createObjectURL(blob),a=document.createElement("a");a.href=href;a.download=name+suffix+".stl";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),30000);
   setLookupStatus(mode==="fit"?"Fit-to-build-plate STL exported at "+fmt(currentExportFactor)+"× source geometry.":"Scaled binary STL exported at 1:"+fmt(selectedDenominator)+".");
  }catch(error){setLookupStatus("STL export failed: "+(error.message||error),true);}
 });
 $id("scaling-research-results").addEventListener("click",e=>{
  const button=e.target.closest("[data-research-index]");if(!button)return;
  const candidate=researchCandidates[Number(button.dataset.researchIndex)];if(!candidate?.axesKm)return;
  showDimensions({name:$id("scaling-object-query").value,axesKm:candidate.axesKm,longestAxisKm:Math.max(...candidate.axesKm),sourceUrl:candidate.url,sourceLabel:candidate.source||"web source",confidenceLabel:qualityLabel(candidate.quality),confidenceNote:"manually selected candidate",uncertaintyKm:candidate.uncertaintyKm,confidenceScore:candidate.score,displayUnit:activeExpectedCategory==="spacecraft"?"m":"km"});
  setResearchState("complete","You selected this source. Check its original publication and measurement context before relying on the scale.");
  setLookupStatus("Selected candidate from "+candidate.source+". The source is linked above; measurement uncertainty may not be stated.");
 });
 $id("scaling-mode").addEventListener("change",()=>{selectedDenominator=null;syncScalingModeUI();update();});
 ["scaling-custom-dimension","scaling-custom-unit","scaling-custom-axis","scaling-custom-kind","scaling-fit-margin"].forEach(id=>$id(id).addEventListener("input",()=>{selectedDenominator=null;update();}));
 $id("scaling-fit-adjustment").addEventListener("input",e=>{$id("scaling-fit-adjustment-value").textContent=e.target.value+"%";update();});
 $id("scaling-jpl-lookup").addEventListener("click",()=>lookupObject($id("scaling-object-query").value,false,activeExpectedCategory));
 $id("scaling-object-query").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();lookupObject(e.currentTarget.value,false,activeExpectedCategory);}});
 $id("scaling-recommendations").addEventListener("click",e=>{if($id("scaling-mode").value==="fit")return;
  const button=e.target.closest("[data-denominator]");if(!button)return;
  selectedDenominator=Number(button.dataset.denominator);update();
 });
 ["scaling-bed-x","scaling-bed-y","scaling-bed-z"].forEach(id=>$id(id).addEventListener("input",()=>{selectedDenominator=null;update();}));
 $id("scaling-printer-profile").addEventListener("change",()=>{$id("scaling-custom-volume").hidden=$id("scaling-printer-profile").value!=="custom";selectedDenominator=null;update();});
})();
