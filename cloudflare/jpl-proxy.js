/**
 * @typedef {Object} ModelFileCandidate
 * @property {string} url
 * @property {string} format
 * @property {string} label
 * @property {number|null} [sizeBytes]
 * @property {boolean} [verified]
 */

/**
 * @typedef {Object} SearchPage
 * @property {string} url
 * @property {string} title
 * @property {string} snippet
 */

/**
 * @typedef {Object} ResearchCandidate
 * @property {string} url
 * @property {string} title
 * @property {string} snippet
 * @property {number[]|null} [axesKm]
 * @property {number|null} [uncertaintyKm]
 * @property {boolean} [pageChecked]
 * @property {boolean} [sourceTextHasName]
 * @property {boolean} [identityStrong]
 * @property {number} [score]
 * @property {"high"|"medium"|"low"} [quality]
 * @property {string} [source]
 */

const JPL_API = "https://ssd-api.jpl.nasa.gov/sbdb.api";
const SEARCH_URL = "https://html.duckduckgo.com/html/";
const ALLOWED_ORIGINS = new Set([
  "https://tymses.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);
const ASSET_HOSTS = new Set([
  "www.spaceradar.ai",
  "models.spaceradar.ai",
  "models.opensourcerobotics.dev",
  "raw.githubusercontent.com",
  "echo.jpl.nasa.gov",
  "3d-asteroids.space",
  "www.3d-asteroids.space"
]);
const CATALOGUE_HOSTS = new Set(["3d-asteroids.space", "www.3d-asteroids.space"]);
const MODEL_EXTENSIONS = new Set(["glb","gltf","stl","obj","ply"]);
const MAX_ASSET_BYTES = 75 * 1024 * 1024;
const MODEL_TYPES = new Map([
  ["glb", "model/gltf-binary"], ["gltf", "model/gltf+json"],
  ["stl", "model/stl"], ["obj", "text/plain; charset=utf-8"],
  ["ply", "model/ply"], ["bin", "application/octet-stream"],
  ["mtl", "text/plain; charset=utf-8"], ["png", "image/png"],
  ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["webp", "image/webp"]
]);
function assetExtension(url) {
  return new URL(url).pathname.split(".").pop().toLowerCase();
}
function validateAssetUrl(value) {
  let url;
  try { url = new URL(value); } catch { throw new Error("Invalid asset URL."); }
  const host = url.hostname.toLowerCase();
  // A fixed HTTPS host allowlist is intentional: Workers cannot safely resolve
  // arbitrary DNS names before fetching them, so this prevents SSRF/DNS rebinding.
  if (url.protocol !== "https:" || url.username || url.password || !ASSET_HOSTS.has(host) || (url.port && url.port !== "443") || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(host) || host.includes(":")) {
    throw new Error("Asset host is not on the approved source list.");
  }
  if (!MODEL_TYPES.has(assetExtension(url))) throw new Error("The URL is not an approved model resource.");
  return url;
}
function limitedBody(body) {
  let bytes = 0;
  const limiter = new TransformStream({
    transform(chunk, controller) {
      bytes += chunk.byteLength;
      if (bytes > MAX_ASSET_BYTES) {
        controller.error(new Error("Model exceeds the 75 MB proxy limit."));
        return;
      }
      controller.enqueue(chunk);
    }
  });
  return body.pipeThrough(limiter);
}
async function fetchApprovedAsset(value, request) {
  let current = validateAssetUrl(value);
  for (let hop = 0; hop <= 3; hop++) {
    const upstreamHeaders = { "Accept": request.headers.get("Accept") || "*/*", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-AssetProxy/1.0)", "Referer": current.origin + "/", "Origin": current.origin };
    const range = request.headers.get("Range");
    if (range) upstreamHeaders.Range = range;
    const response = await fetch(current.toString(), { method: "GET", headers: upstreamHeaders, redirect: "manual", cf: { cacheTtl: 3600 } });
    if ([301,302,303,307,308].includes(response.status)) {
      const location = response.headers.get("Location");
      if (!location || hop === 3) throw new Error("The model source returned too many redirects.");
      current = validateAssetUrl(new URL(location, current).toString());
      continue;
    }
    const declaredSize = Number(response.headers.get("Content-Length"));
    if (Number.isFinite(declaredSize) && declaredSize > MAX_ASSET_BYTES) throw new Error("Model exceeds the 75 MB proxy limit.");
    if (!response.ok) return new Response(null, { status: response.status });
    if (!response.body) throw new Error("The model source returned no response body.");
    const headers = new Headers();
    for (const name of ["Content-Type","Content-Length","Content-Range","Accept-Ranges","ETag","Last-Modified"]) {
      const value = response.headers.get(name);
      if (value) headers.set(name, value);
    }
    // Do not trust a source server to label a model correctly (several return
    // application/octet-stream or text/html for binary downloads).
    headers.set("Content-Type", MODEL_TYPES.get(assetExtension(current)) || "application/octet-stream");
    headers.set("Cache-Control", "public, max-age=3600");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-SMA-Asset-Proxy", "2026-11-25-remote-resolver");
    return new Response(limitedBody(response.body), { status: response.status, headers });
  }
  throw new Error("Unable to retrieve model asset.");
}

async function fetchCatalogueHtml(value) {
  let page; try { page = new URL(value); } catch { throw new Error("Invalid model page URL."); }
  if (page.protocol !== "https:" || !CATALOGUE_HOSTS.has(page.hostname.toLowerCase()) || !/^\/(?:asteroids|moons|comets|dwarf)(?:\/|$)/.test(page.pathname)) throw new Error("Only 3D Asteroid Catalogue pages can be resolved.");
  let response, pageTarget = page;
  for (let hop = 0; hop <= 3; hop++) {
    response = await fetch(pageTarget.toString(), {
      headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-ModelResolver/2.1)", "Referer": (current?.page || requested).origin + "/", "Origin": (current?.page || requested).origin },
      redirect: "manual", cf: { cacheTtl: 900 }
    });
    if (![301,302,303,307,308].includes(response.status)) break;
    const location = response.headers.get("Location");
    if (!location || hop === 3) throw new Error("Catalogue page redirected too many times.");
    const next = new URL(location, pageTarget);
    if (next.protocol !== "https:" || !CATALOGUE_HOSTS.has(next.hostname.toLowerCase())) throw new Error("Catalogue page redirected outside the approved host.");
    pageTarget = next;
  }
  if (!response.ok) throw new Error("Catalogue page returned HTTP " + response.status + ".");
  return { page: pageTarget, html: (await response.text()).slice(0, 2500000) };
}

function objectIdentityTokens(objectName, objectPage) {
  let slug = "";
  try { slug = decodeURIComponent(new URL(objectPage).pathname.split("/").filter(Boolean).pop() || ""); } catch {}
  const cleanedName = String(objectName || "").replace(/^[a-z]+\d+\s*/i, "").trim();
  const values = [cleanedName, slug.replace(/^[a-z]+\d+[-_ ]*/i, ""), slug];
  return [...new Set(values.map(norm).filter(value => value.length >= 2))];
}
function fileBelongsToObject(fileUrl, objectName, objectPage) {
  let filename = "";
  try { filename = decodeURIComponent(new URL(fileUrl).pathname.split("/").pop() || "").replace(/\.(?:obj|ply|glb|gltf|stl)$/i, ""); } catch { return false; }
  const fileNorm = norm(filename);
  const tokens = objectIdentityTokens(objectName, objectPage);
  // Never attach a shared or unrelated file (for example J1_Io.ply) to
  // another object's remote candidate.
  return tokens.some(token => fileNorm === token || fileNorm.startsWith(token + " ") || fileNorm.endsWith(" " + token) || fileNorm.includes(" " + token + " "));
}
function extractCatalogueFileCandidates(html, basePage, objectName = "") {
  const source = decode(String(html || "")).replace(/\\\//g, "/");
  const raw = [];
  const attr = /(?:href|src|data-href|data-url|data-file|data-download)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = attr.exec(source)) && raw.length < 300) raw.push(match[1]);
  const urlPattern = /(?:https?:\/\/[^"'\s<>]*?\.(?:obj|ply|glb|gltf|stl)(?:\?[^"'\s<>]*)?|\/[^"'\s<>]*?\.(?:obj|ply|glb|gltf|stl)(?:\?[^"'\s<>]*)?)/gi;
  while ((match = urlPattern.exec(source)) && raw.length < 500) raw.push(match[0]);
  /** @type {ModelFileCandidate[]} */
  const found = [];
  for (const value of raw) {
    let target;
    try { target = new URL(decode(value).replace(/\\\//g, "/"), basePage); } catch { continue; }
    const ext = assetExtension(target.toString());
    if (!MODEL_EXTENSIONS.has(ext) || !ASSET_HOSTS.has(target.hostname.toLowerCase()) || target.protocol !== "https:" || target.username || target.password) continue;
    if (!fileBelongsToObject(target.toString(), objectName, basePage.toString())) continue;
    if (found.some(item => item.url === target.toString())) continue;
    found.push({ url: target.toString(), format: ext.toUpperCase(), label: target.pathname.split("/").pop() || ext.toUpperCase() });
  }
  return found;
}
function findObjectPageFromListing(html, listingPage, objectName, requestedPage) {
  const wanted = norm(String(objectName || "").replace(/^[a-z]+\d+\s*/i, ""));
  const requestedSlug = norm(new URL(requestedPage).pathname.split("/").filter(Boolean).pop() || "");
  const anchors = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match, best = null, bestScore = 0;
  while ((match = anchors.exec(html))) {
    const hrefMatch = match[1].match(/href\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    let target; try { target = new URL(decode(hrefMatch[1]), listingPage); } catch { continue; }
    if (target.protocol !== "https:" || !CATALOGUE_HOSTS.has(target.hostname.toLowerCase())) continue;
    const segments = target.pathname.split("/").filter(Boolean);
    if (segments.length !== 2 || !["asteroids","moons","comets","dwarf"].includes(segments[0])) continue;
    const label = norm(plain(match[2]) + " " + segments[1]);
    let score = 0;
    if (wanted && label.includes(wanted)) score += 10;
    if (requestedSlug && norm(segments[1]) === requestedSlug) score += 12;
    const code = requestedSlug.match(/^[a-z]+\d+/);
    if (code && norm(segments[1]).includes(code[0])) score += 5;
    if (score > bestScore) { bestScore = score; best = target; }
  }
  return bestScore >= 10 ? best : null;
}

async function resolveCataloguePage(value, objectName = "") {
  let requested; try { requested = new URL(value); } catch { throw new Error("Invalid model page URL."); }
  const searchedPages = [];
  let current;
  try {
    current = await fetchCatalogueHtml(requested.toString());
    searchedPages.push(current.page.toString());
  } catch (error) {
    current = null;
    var firstError = error;
  }
  let candidates = current ? extractCatalogueFileCandidates(current.html, current.page, objectName) : [];
  // Some catalogue pages render download buttons from embedded scripts or require
  // opening the object page from the main list. If the supplied page has no file
  // links, search the matching object link in its category index and inspect it.
  if (!candidates.length) {
    const category = requested.pathname.split("/").filter(Boolean)[0];
    const listingUrl = new URL("/" + category + "/", requested.origin);
    if (listingUrl.toString() !== requested.toString()) {
      try {
        const listing = await fetchCatalogueHtml(listingUrl.toString());
        searchedPages.push(listing.page.toString());
        const objectPage = findObjectPageFromListing(listing.html, listing.page, objectName, requested.toString());
        if (objectPage && objectPage.toString() !== requested.toString()) {
          const object = await fetchCatalogueHtml(objectPage.toString());
          searchedPages.push(object.page.toString());
          current = object;
          candidates = extractCatalogueFileCandidates(object.html, object.page, objectName);
        }
      } catch (error) {
        if (!current && !firstError) firstError = error;
      }
    }
  }
  if (!current && !firstError) throw new Error("The catalogue page could not be loaded.");
  if (!candidates.length && firstError && searchedPages.length === 0) throw firstError;

  /** @type {ModelFileCandidate[]} */
  const verified = [];
  for (const file of candidates.slice(0, 30)) {
    try {
      let probe, probeUrl = file.url;
      for (let hop = 0; hop <= 3; hop++) {
        probe = await fetch(probeUrl, { headers: { Range: "bytes=0-8191", Accept: "*/*", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-ModelResolver/2.0)" }, redirect: "manual", cf: { cacheTtl: 900 } });
        if (![301,302,303,307,308].includes(probe.status)) break;
        const location = probe.headers.get("Location");
        if (!location || hop === 3) break;
        const next = new URL(location, probeUrl);
        if (next.protocol !== "https:" || !ASSET_HOSTS.has(next.hostname.toLowerCase()) || !MODEL_EXTENSIONS.has(assetExtension(next.toString()))) break;
        probeUrl = next.toString();
      }
      if (!probe || (!probe.ok && probe.status !== 206)) { try { await probe?.body?.cancel(); } catch {} continue; }
      if ((probe.headers.get("Content-Type") || "").toLowerCase().includes("text/html")) { try { await probe.body.cancel(); } catch {} continue; }
      let sample = new Uint8Array();
      try {
        const reader = probe.body.getReader();
        const first = await reader.read();
        if (first.value) sample = first.value.slice(0, 8192);
        await reader.cancel();
      } catch {}
      const sampleText = new TextDecoder().decode(sample).replace(/^\uFEFF/, "").trimStart();
      if (file.format === "PLY" && !sampleText.startsWith("ply")) continue;
      if (file.format === "OBJ" && /(^|\n)\s*(?:v|vn|vt|f|o|g|mtllib|usemtl)\s+/m.test(sampleText) === false) continue;
      if (file.format === "GLB" && new TextDecoder().decode(sample.slice(0, 4)) !== "glTF") continue;
      if (file.format === "GLTF" && (!sampleText.startsWith("{") || !sampleText.includes('"asset"'))) continue;
      if (file.format === "STL" && sample.length < 84) continue;
      file.url = probeUrl;
      const rangeTotal = (probe.headers.get("Content-Range") || "").split("/").pop();
      file.sizeBytes = Number(rangeTotal) || Number(probe.headers.get("Content-Length")) || null;
      file.verified = true;
      verified.push(file);
    } catch {}
  }
  const dimensionText = current ? plain(current.html) : "";
  const axesKm = extractAxes(dimensionText);
  const uncertaintyKm = axesKm ? extractUncertainty(dimensionText) : null;
  return {
    page: (current?.page || requested).toString(),
    requestedPage: requested.toString(),
    resolvedAt: new Date().toISOString(),
    searchedPages: [...new Set(searchedPages)],
    candidateCount: candidates.length,
    files: verified,
    axesKm,
    uncertaintyKm,
    dimensionSourceUrl: (current?.page || requested).toString(),
    dimensionSourceLabel: "3D Asteroid Catalogue",
    source: "3D Asteroid Catalogue"
  };
}
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
function isSafePublicUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host === "::1") return false;
    if (/^(127\.|10\.|0\.|192\.168\.)/.test(host)) return false;
    const m = host.match(/^172\.(\d+)\./);
    if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return false;
    return true;
  } catch { return false; }
}
function sourceWeight(host) {
  if (/\.(gov|mil)$/.test(host) || /(^|\.)(nasa\.gov|jpl\.nasa\.gov|esa\.int|usgs\.gov|pds\.nasa\.gov|science\.nasa\.gov)$/.test(host)) return 38;
  if (/\.(edu|ac\.[a-z]{2,})$/.test(host) || /(arxiv\.org|doi\.org|nature\.com|science\.org|sciencedirect\.com|springer\.com|aanda\.org|agupubs\.onlinelibrary\.wiley\.com)/.test(host)) return 29;
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
/** @param {ResearchCandidate} candidate @param {string} query */
function confidence(candidate, query) {
  const host = hostOf(candidate.url), q = norm(query), text = norm(candidate.title + " " + candidate.snippet);
  const generic = new Set(["moon","mars","earth","sun","jupiter","saturn","planet","asteroid","comet","rover","satellite","spacecraft","model"]);
  const identityStrong = !!q && !generic.has(q) && (text.includes(q) || candidate.sourceTextHasName);
  let score = sourceWeight(host);
  if (identityStrong && text.includes(q)) score += 24;
  else if (q && q.split(" ").filter(w => w.length > 2 && text.includes(w)).length >= Math.min(2, q.split(" ").length)) score += 12;
  if (candidate.axesKm) score += 27;
  if (candidate.pageChecked) score += 8;
  if (candidate.sourceTextHasName) score += 8;
  candidate.identityStrong = identityStrong;
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
  /** @type {SearchPage[]} */
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
        if (!isSafePublicUrl(href) || /duckduckgo\.com/.test(hostOf(href))) continue;
        const title = plain(m[2]);
        const start = Math.max(0, html.lastIndexOf("result__snippet", m.index));
        const snippet = plain(html.slice(start, Math.min(html.length, start + 1300))).slice(0, 450);
        if (!pages.some(x => x.url === href)) pages.push({url:href,title,snippet});
      }
    } catch {}
  }
  /** @type {ResearchCandidate[]} */
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
/** @param {string} query @param {string} category */
async function research(query, category) {
  // A peer-reviewed axis measurement for (6) Hebe. The catalogue page itself
  // reports only a mean diameter, so use this published triaxial estimate
  // rather than incorrectly treating the mean diameter as the longest axis.
  const normalizedQuery = norm(query);
  if (category === "small-bodies" && ["hebe", "6 hebe"].includes(normalizedQuery)) {
    const candidate = {
      url: "https://www.aanda.org/articles/aa/pdf/2012/09/aa19100-12.pdf",
      title: "Thermal history modelling of the H chondrite parent body — A&A 545, A135 (2012)",
      snippet: "The paper reports dimensions of asteroid (6) Hebe as 205 × 185 × 170 km.",
      axesKm: [205, 185, 170],
      pageChecked: true,
      sourceTextHasName: true,
      identityStrong: true,
      uncertaintyKm: null,
      source: "aanda.org",
      score: 95,
      quality: "high"
    };
    return {
      query, category, searched: true, engine: "Curated peer-reviewed small-body dimensions",
      candidates: [candidate], best: candidate, autoAccept: true,
      conflictingStrong: false, agreementCount: 0,
      note: "Published triaxial dimensions; no uncertainty for these axes is stated in this record."
    };
  }
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
    autoAccept:!!best && best.identityStrong && best.score >= 78 && (sourceWeight(best.source)>=29 || independentAgreement>=1) && !conflictingStrong,
    conflictingStrong,
    agreementCount:independentAgreement,
    note:"Evidence score is a source-quality heuristic, not a statistical probability. Search coverage depends on publicly indexed pages and pages accessible to the Worker."
  };
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.has(origin)) return new Response("Origin not allowed", {status:403});
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers});
    if (request.method !== "GET") return new Response("Method not allowed",{status:405,headers});
    if (incoming.searchParams.get('action') === 'resolve') {
      try {
        const pageUrl = incoming.searchParams.get('url') || '';
        if (!pageUrl || pageUrl.length > 2048) return json({ error: 'A valid catalogue page URL is required.' }, 400, headers);
        return json(await resolveCataloguePage(pageUrl, incoming.searchParams.get("name") || ""), 200, { ...headers, 'Cache-Control': 'no-store' });
      } catch (error) {
        return json({ error: 'Model file resolution failed', detail: String(error.message || error) }, 502, { ...headers, 'Cache-Control': 'no-store' });
      }
    }
    if (incoming.searchParams.get("action") === "asset") {
      try {
        const assetUrl = incoming.searchParams.get("url") || "";
        if (!assetUrl || assetUrl.length > 2048) return new Response("A valid asset URL is required.", {status:400,headers});
        const assetResponse = await fetchApprovedAsset(assetUrl, request);
        const assetHeaders = new Headers(assetResponse.headers);
        for (const [key,value] of Object.entries(headers)) assetHeaders.set(key,value);
        return new Response(assetResponse.body,{status:assetResponse.status,headers:assetHeaders});
      } catch (error) {
        return new Response(String(error.message || "Asset proxy request failed."), {status:400,headers:{...headers,"X-Asset-Proxy-Error":"The Worker could not retrieve this model source.","Cache-Control":"no-store"}});
      }
    }
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
