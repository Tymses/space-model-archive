const collections={
 spacecraft:{title:"Spacecraft",number:"01",description:"Explore human-made vehicles and hardware designed to travel or operate in space.",empty:"No verified spacecraft models have been published yet. This collection is ready for sourced models with dimensions, scale and original download links."},
 planetary:{title:"Planetary features",number:"02",description:"Discover recognisable landscapes across planets and moons — from impact craters to giant volcanoes and deep canyons.",empty:"The planetary-features collection is being prepared. Verified terrain models will appear here with the celestial body, feature name, data source and scale."},
 "small-bodies":{title:"Asteroids & comets",number:"03",description:"Browse the irregular worlds of the Solar System, including asteroids, comets and objects visited by spacecraft.",empty:"No verified asteroid or comet models have been published yet. Entries will include the target body, mission or survey source, and model provenance."},
 "height-maps":{title:"Height maps",number:"04",description:"Find elevation and terrain datasets that can be turned into physical 3D terrain models.",empty:"No height-map datasets have been added yet. Future entries will describe the body, dataset, resolution, vertical exaggeration and permitted use."}
};
const entries=[
{name:"Voyager 1",className:"INTERPLANETARY PROBE",mission:"VOYAGER PROGRAM",description:"A deep-space probe exploring the outer Solar System and interstellar space.",shape:"probe"},
{name:"Apollo Lunar Module",className:"CREWED LUNAR SPACECRAFT",mission:"APOLLO PROGRAM",description:"The two-stage spacecraft designed to carry astronauts between lunar orbit and the Moon.",shape:"lander"},
{name:"Space Shuttle Orbiter",className:"REUSABLE ORBITER",mission:"SPACE TRANSPORTATION SYSTEM",description:"The winged spacecraft that carried crews and payloads to low Earth orbit.",shape:"shuttle"},
{name:"Saturn V",className:"HEAVY-LIFT LAUNCH VEHICLE",mission:"APOLLO PROGRAM",description:"The multi-stage launch vehicle that sent Apollo astronauts toward the Moon.",shape:"rocket"},
{name:"James Webb Space Telescope",className:"INFRARED SPACE OBSERVATORY",mission:"JWST",description:"A space telescope with a segmented primary mirror and a large sunshield.",shape:"telescope"},
{name:"Hubble Space Telescope",className:"SPACE TELESCOPE",mission:"GREAT OBSERVATORIES",description:"An optical and ultraviolet observatory operating above Earth's atmosphere.",shape:"hubble"}
];
const art={
probe:`<g stroke="#9db5cc" stroke-width="1.5" fill="none"><path d="M145 18 145 145M132 78h26M138 28h14l8 35-15 18-15-18z" fill="#aebdca"/><path d="M130 55 68 43 68 111 130 94M160 55l62-12v68l-62-17" fill="#294d70"/><path d="M75 52v50m10-48v47m10-45v43m10-41v39m10-36v32M170 52v47m10-49v51m10-53v55m10-57v59" stroke="#8bb5d8"/><path d="M145 81 145 105 132 118 158 118 145 105" fill="#c2cbd1"/><circle cx="145" cy="66" r="7" fill="#e2c987"/></g>`,
lander:`<g stroke="#b8c8d6" stroke-width="2" fill="#b9a77d"><path d="M107 66 145 45 183 66 183 104 145 126 107 104Z"/><path d="M107 66 145 87 183 66M145 87v39" fill="none"/><path d="m112 99-30 48m101-48 30 48m-70-23-5 25m-8-75 15-23 15 23" fill="none"/><path d="M76 147h13m110 0h13m-75 2h17" fill="none"/><path d="M129 64h32v22h-32z" fill="#314e68"/></g>`,
shuttle:`<g stroke="#c4d0db" stroke-width="1.5"><path d="M145 24 158 56 174 106 159 130 145 119 131 130 116 106 132 56Z" fill="#d1d9df"/><path d="m132 75-75 57 82-18m19-39 75 57-82-18" fill="#8ba4b9"/><path d="M136 44h18v50h-18z" fill="#283d52"/><path d="m132 109-9 28m35-28 9 28" stroke="#b2c0cb" stroke-width="5"/></g>`,
rocket:`<g stroke="#c0cbd4" stroke-width="1.5"><path d="M145 15c-20 25-19 65-19 96h38c0-31 1-71-19-96Z" fill="#d5dce1"/><path d="M126 87h38v37h-38z" fill="#9baab5"/><path d="m126 109-20 35h20m38-35 20 35h-20" fill="#bc654e"/><path d="M130 52h30M127 91h36" stroke="#b45e4e" stroke-width="4"/><path d="M134 124 145 155 156 124" fill="#e2a65d"/></g>`,
telescope:`<g stroke="#c0ccd6" stroke-width="1.5"><path d="m89 72 36-20 40 0 36 20-36 20h-40Z" fill="#b5c0c9"/><path d="M125 52v40m40-40v40" fill="none"/><path d="M89 72 62 55v34Zm112 0 27-17v34Z" fill="#b59a54"/><path d="M145 92v43m-18 0h36" stroke-width="4"/><circle cx="145" cy="72" r="10" fill="#314b68"/></g>`,
hubble:`<g stroke="#c0ccd6" stroke-width="1.5"><rect x="124" y="37" width="42" height="80" rx="15" fill="#c5d0d8"/><path d="M124 53h42m-42 48h42"/><path d="M124 62 65 47v59l59-15m42-29 59-15v59l-59-15" fill="#315d83"/><path d="M73 53v46m12-43v40m12-37v34m12-31v28m58-37v42m12-45v48m12-51v54m12-57v60" stroke="#9abbd7"/><circle cx="145" cy="37" r="11" fill="#aebbc5"/></g>`
};
const grid=document.querySelector("#model-grid"),categoryGrid=document.querySelector("#category-grid"),browser=document.querySelector("#collection-browser"),search=document.querySelector("#search-input");
let activeCategory=null;
function renderCards(){
 const q=search.value.trim().toLowerCase(),filtered=activeCategory==="spacecraft"?entries.filter(x=>[x.name,x.className,x.mission,x.description].join(" ").toLowerCase().includes(q)):[];
 document.querySelector("#browser-count").textContent=filtered.length+" example entries";
 if(filtered.length)grid.innerHTML=filtered.map(x=>`<article class="model-card"><div class="model-visual"><span class="model-type">${x.className}</span><span class="demo-tag">EXAMPLE ONLY</span><svg viewBox="0 0 290 170" role="img" aria-label="Stylised illustration of ${x.name}">${art[x.shape]}</svg></div><div class="model-info"><div class="model-meta">${x.mission}</div><h3>${x.name}</h3><p>${x.description}</p><div class="model-bottom"><span>NOT A VERIFIED DOWNLOAD</span><span class="details-label">DETAILS PENDING</span></div></div></article>`).join("");
 else grid.innerHTML=`<div class="empty-collection"><span class="empty-icon">✳</span><h3>We're building this collection.</h3><p>${collections[activeCategory].empty}</p><span class="empty-status">NO VERIFIED MODEL RECORDS YET</span></div>`;
}
function openCollection(key){activeCategory=key;const c=collections[key];categoryGrid.hidden=true;browser.hidden=false;document.querySelector("#browser-kicker").textContent="COLLECTION / "+c.number;document.querySelector("#browser-title").textContent=c.title;document.querySelector("#browser-description").textContent=c.description;search.value="";renderCards();history.replaceState(null,"","#"+key);browser.scrollIntoView({behavior:"smooth",block:"start"});}
function showCollections(){activeCategory=null;browser.hidden=true;categoryGrid.hidden=false;search.value="";history.replaceState(null,"","#explore");document.querySelector("#explore").scrollIntoView({behavior:"smooth",block:"start"});}
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>openCollection(b.dataset.category)));
document.querySelector("#back-to-collections").addEventListener("click",showCollections);search.addEventListener("input",renderCards);
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&activeCategory){e.preventDefault();search.focus();}if(e.key==="Escape")search.blur();});
const menuButton=document.querySelector("#menu-toggle"),nav=document.querySelector("#main-nav");
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
function analyse(){
 const get=id=>Number(document.getElementById(id).value),p=[get("printer-x"),get("printer-y"),get("printer-z")],m=[get("model-x"),get("model-y"),get("model-z")],panel=document.querySelector("#fit-result");
 const valid=[...p,...m].every(Number.isFinite)&&p.every(v=>v>0)&&m.every(v=>v>0);
 if(!valid){panel.classList.add("fail");document.querySelector("#result-title").textContent="Check your dimensions";document.querySelector("#result-description").textContent="Enter positive numbers for all six dimensions.";document.querySelector(".result-symbol").textContent="!";return;}
 const fits=m.every((v,i)=>v<=p[i]);panel.classList.toggle("fail",!fits);document.querySelector(".result-symbol").textContent=fits?"✓":"!";document.querySelector("#result-title").textContent=fits?"Fits in the selected volume":"Does not fit in this orientation";
 const overflow=m.map((v,i)=>v>p[i]?["X","Y","Z"][i]:null).filter(Boolean);document.querySelector("#result-description").textContent=fits?"All three model dimensions are within the entered build volume.":"Model exceeds the printer volume along "+overflow.join(", ")+". Try a different orientation or consider splitting the geometry.";
}
document.querySelector("#analyse-button").addEventListener("click",analyse);["printer-x","printer-y","printer-z","model-x","model-y","model-z"].forEach(id=>document.getElementById(id).addEventListener("change",analyse));analyse();
if(location.hash.startsWith("#")&&collections[location.hash.slice(1)])openCollection(location.hash.slice(1));
