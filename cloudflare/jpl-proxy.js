const JPL_API = "https://ssd-api.jpl.nasa.gov/sbdb.api";
const SEARCH_URL = "https://html.duckduckgo.com/html/";
const ALLOWED_ORIGINS = new Set([
  "https://tymses.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}
function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8", "X-Content-Type-Options": "nosniff" }
  });
}
function decode(value) {
  return String(value || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}
function plain(html) {
  return decode(String(html || "").replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
}
function norm(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
}
function sourceWeight(host) {
  if (/\.(gov|mil)$/.test(host) || /(^|\.)(nasa\.gov|jpl\.nasa\.gov|esa\.int|usgs\.gov|pds\.nasa\.gov|science\.nasa\.gov)$/.test(host)) return 38;
  if (/\.(edu|ac\.[a-z]{2,})$/.test(host) || /(arxiv\.org|doi\.org|nature\.com|science\.org|sciencedirect\.com|springer\.com|agupubs\.onlinelibrary\.wiley\.com)/.test(host)) return 29;
  if (/(jaxa\.jp|isro\.gov\.in|cnes\.fr|asc-csa\.gc\.ca|esa\.int)/.test(host)) return 36;
  if (/wikipedia\.org$/.test(host)) return 10;
  return 5;
}
function extractAxes(text) {
  const s = decode(text).replace(/,/g, ".").replace(/\u00d7/g, " x ").replace(/[–—]/g, "-");
  const unit = "(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm|ft|feet)";
  const number = "(?:\\d+(?:\\.\\d+)?|\\.\\d+)";
  const patterns = [
    new RegExp("(" + number + ")\\s*(?:x|by|,|×)\\s*(" + number + ")(?:\\s*(?:x|by|,|×)\\s*(" + number + "))?\\s*" + unit, "i"),
    new RegExp("(" + number + ")\\s*" + unit + "\\s*(?:x|by|,|×)\\s*(" + number + ")\\s*" + unit + "(?:\\s*(?:x|by|,|×)\\s*(" + number + ")\\s*" + unit + ")?", "i"),
    new RegExp("(?:dimensions|extent|measures|measuring|size|approximately|about|length)\\D{0,35}(" + number + ")\\s*" + unit + "\\D{1,15}(" + number + ")\\s*" + unit, "i")
  ];
  for (let patternIndex=0; patternIndex<patterns.length; patternIndex++) {
    const match = s.match(patterns[patternIndex]);
    if (!match) continue;
    let vals = [];
    if (patternIndex===0) {
      const u=match[4];vals=[{v:Number(match[1]),u},{v:Number(match[2]),u}];if(match[3])vals.push({v:Number(match[3]),u});
    } else if (match[5] && match[6]) {
      vals = [{v:Number(match[1]),u:match[2]},{v:Number(match[3]),u:match[4]},{v:Number(match[5]),u:match[6]}];
    } else if (match[3] && match[4]) {
      vals = [{v:Number(match[1]),u:match[2]},{v:Number(match[3]),u:match[4]}];
    }
    const factor = u => /^(km|kilometer|kilometre)/i.test(u) ? 1 : /^(cm)/i.test(u) ? 0.00001 : /^(mm)/i.test(u) ? 0.000001 : /^(ft|feet)/i.test(u) ? 0.0003048 : /^(m|meter|metre)/i.test(u) ? 0.001 : null;
    const axes = vals.map(x => factor(x.u) == null ? null : x.v * factor(x.u));
    if (axes.length >= 2 && axes.every(x => Number.isFinite(x) && x > 0) && Math.max(...axes) < 1e9) return axes;
  }
  return null;
}
function extractUncertainty(text) {
  const match = decode(text).replace(/,/g, ".").match(/(?:±|\+\/\-)\s*(\d+(?:\.\d+)?)\s*(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm)/i);
  if (!match) return null;
  const unit = match[2].toLowerCase();
  const factor = /^(km|kilometer|kilometre)/.test(unit) ? 1 : /^(cm)/.test(unit) ? 0.00001 : /^(mm)/.test(unit) ? 0.000001 : 0.001;
  return Number(match[1]) * factor;
}
function confidence(candidate, query) {
  const host = hostOf(candidate.url), q = norm(query), text = norm(candidate.title + " " + candidate.snippet);
  let score = sourceWeight(host);
  if (q && text.includes(q)) score += 24;
  else if (q && q.split(" ").filter(w => w.length > 2 && text.includes(w)).length >= Math.min(2, q.split(" ").length)) score += 12;
  if (candidate.axesKm) score += 27;
  if (candidate.pageChecked) score += 8;
  if (candidate.sourceTextHasName) score += 8;
  return Math.min(99, score);
}
async function searchWeb(query, category) {
  const categoryTerm = ({spacecraft:"spacecraft dimensions",moons:"moon dimensions",planetary:"surface feature diameter extent", "height-maps":"terrain footprint dimensions","small-bodies":"shape model dimensions"}[category] || "physical dimensions axes");
  const searches = [
    '"' + query + '" ' + categoryTerm,
    '"' + query + '" size dimensions km metres NASA ESA',
    query + " physical extent length width height scientific"
  ];
  const headers = { "User-Agent":"Mozilla/5.0 (compatible; SpaceMesherResearch/1.0; +https://tymses.github.io/space-model-archive/)", "Accept":"text/html" };
  const pages = [];
  for (const term of searches) {
    try {
      const u = new URL(SEARCH_URL); u.searchParams.set("q", term);
      const response = await fetch(u.toString(), {headers, cf:{cacheTtl:1800}});
      if (!response.ok) continue;
      const html = await response.text();
      const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      while ((m = re.exec(html)) && pages.length < 15) {
        let href = decode(m[1]);
        try { const parsed = new URL(href); if (parsed.hostname.includes("duckduckgo.com") && parsed.searchParams.has("uddg")) href = parsed.searchParams.get("uddg"); } catch {}
        if (!/^https?:\/\//i.test(href) || /duckduckgo\.com/.test(hostOf(href))) continue;
        const title = plain(m[2]);
        const start = Math.max(0, html.lastIndexOf("result__snippet", m.index));
        const snippet = plain(html.slice(start, Math.min(html.length, start + 1300))).slice(0, 450);
        if (!pages.some(x => x.url === href)) pages.push({url:href,title,snippet});
      }
    } catch {}
  }
  const candidates = await Promise.all(pages.slice(0, 7).map(async item => {
    try {
      const response = await fetch(item.url, {headers, redirect:"follow", cf:{cacheTtl:3600}});
      if (!response.ok) return {...item, axesKm:extractAxes(item.title+" "+item.snippet), pageChecked:false};
      const html = (await response.text()).slice(0, 900000);
      const text = plain(html).slice(0, 60000);
      const axesKm = extractAxes(text) || extractAxes(item.title+" "+item.snippet);
      const uncertaintyKm = extractUncertainty(text) ?? extractUncertainty(item.snippet);
      const q = norm(query), body = norm(text.slice(0, 18000));
      const sourceTextHasName = !!q && body.includes(q);
      const titleMatch = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1];
      return {...item,title:plain(titleMatch)||item.title,snippet:(text||item.snippet).slice(0,420),axesKm,uncertaintyKm,pageChecked:true,sourceTextHasName};
    } catch { return {...item,axesKm:extractAxes(item.title+" "+item.snippet),uncertaintyKm:extractUncertainty(item.snippet),pageChecked:false}; }
  }));
  for (const c of candidates) { c.score = confidence(c,query); c.quality = c.score >= 78 ? "high" : c.score >= 52 ? "medium" : "low"; c.source = hostOf(c.url); }
  candidates.sort((a,b)=>b.score-a.score);
  return candidates.slice(0,7);
}
async function research(query, category) {
  const results = await searchWeb(query,category);
  const withDimensions = results.filter(x=>x.axesKm);
  for (const candidate of withDimensions) {
    const agrees = withDimensions.filter(other => other !== candidate && Math.abs(Math.max(...other.axesKm)-Math.max(...candidate.axesKm))/Math.max(...candidate.axesKm) < 0.08).length;
    if (agrees) candidate.score = Math.min(99,candidate.score + 8);
    candidate.quality = candidate.score >= 78 ? "high" : candidate.score >= 52 ? "medium" : "low";
  }
  withDimensions.sort((a,b)=>b.score-a.score);
  const best = withDimensions[0] || null;
  const independentAgreement = best ? withDimensions.filter(x=>x.source!==best.source && Math.abs(Math.max(...x.axesKm)-Math.max(...best.axesKm))/Math.max(...best.axesKm)<0.08).length : 0;
  const conflictingStrong = best ? withDimensions.some(x=>x!==best && x.source!==best.source && x.score>=best.score-12 && sourceWeight(x.source)>=20 && Math.abs(Math.max(...x.axesKm)-Math.max(...best.axesKm))/Math.max(...best.axesKm)>=0.08) : false;
  return {
    query, category:category||"general", searched:true, engine:"DuckDuckGo public web index",
    candidates:results,
    best:best && best.score >= 78 ? best : null,
    autoAccept:!!best && best.score >= 78 && (sourceWeight(best.source)>=29 || independentAgreement>=1) && !conflictingStrong,
    conflictingStrong,
    agreementCount:independentAgreement,
    note:"Evidence score is a source-quality heuristic, not a statistical probability. Search coverage depends on publicly indexed pages and pages accessible to the Worker."
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.has(origin)) return new Response("Origin not allowed", {status:403});
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers});
    if (request.method !== "GET") return new Response("Method not allowed",{status:405,headers});
    const incoming = new URL(request.url);
    const query = (incoming.searchParams.get("sstr") || incoming.searchParams.get("q") || "").trim();
    if (!query || query.length > 160) return json({error:"Provide an object or model name (max. 160 characters)."},400,headers);
    if (incoming.searchParams.get("action") === "research") {
      try { return json(await research(query,(incoming.searchParams.get("category")||"").slice(0,40)),200,{...headers,"Cache-Control":"public, max-age=1800"}); }
      catch (error) { return json({error:"Web research failed",detail:String(error)},502,headers); }
    }
    const upstream = new URL(JPL_API);
    upstream.searchParams.set("sstr",query);
    upstream.searchParams.set("phys-par","1");
    upstream.searchParams.set("full-prec","1");
    try {
      const response = await fetch(upstream.toString(),{headers:{"Accept":"application/json","User-Agent":"SpaceModelArchive/1.0"},cf:{cacheTtl:21600,cacheEverything:true}});
      return new Response(await response.text(),{status:response.status,headers:{...headers,"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff"}});
    } catch(error) {
      return json({error:"JPL request failed",detail:String(error)},502,headers);
    }
  }
};
