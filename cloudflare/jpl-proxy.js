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
 * @property {number[]|null} [axisUncertaintiesKm]
 * @property {string} [measurement]
 * @property {string} [sourceLabel]
 * @property {string} [note]
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
const MODEL_EXTENSIONS = new Set(["glb","gltf","stl","obj","ply","fbx","3ds","lwo","blend","step","stp","gz","gzip"]);
const MAX_ASSET_BYTES = 75 * 1024 * 1024;
const MODEL_TYPES = new Map([
  ["glb", "model/gltf-binary"], ["gltf", "model/gltf+json"],
  ["stl", "model/stl"], ["obj", "text/plain; charset=utf-8"],
  ["ply", "model/ply"], ["fbx", "application/octet-stream"], ["3ds", "application/octet-stream"], ["lwo", "application/octet-stream"], ["blend", "application/octet-stream"], ["step", "application/step"], ["stp", "application/step"], ["gz", "application/gzip"], ["gzip", "application/gzip"], ["bin", "application/octet-stream"],
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
    let response = await fetch(current.toString(), { method: "GET", headers: upstreamHeaders, redirect: "manual", cf: { cacheTtl: 3600 } });
    if (response.status === 403 && range) { try { await response.body?.cancel(); } catch {} delete upstreamHeaders.Range; response = await fetch(current.toString(), { method: "GET", headers: upstreamHeaders, redirect: "manual", cf: { cacheTtl: 3600 } }); }
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
      headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-ModelResolver/2.1)", "Referer": pageTarget.origin + "/", "Origin": pageTarget.origin },
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
  const cleanedName = String(objectName || "").replace(/^\s*\(?#?\d+\)?\s*/i, "").trim();
  const values = [objectName, cleanedName, slug.replace(/^[a-z]+\d+[-_ ]*/i, "")];
  // Numeric-only catalogue IDs are unsafe identity tokens and can match unrelated filenames.
  return [...new Set(values.map(norm).filter(value => value.length >= 3 && !/^\d+$/.test(value)))];
}
function identityTextMatchesObject(value, objectName, objectPage) {
  const haystack = " " + norm(value) + " ";
  return objectIdentityTokens(objectName, objectPage).some(token => haystack.includes(" " + token + " "));
}
function isObjectDetailPage(pageUrl) {
  try { return /^\/(?:asteroids|moons|comets|dwarf)\/[^/]+\/?$/.test(new URL(pageUrl).pathname); } catch { return false; }
}
function cataloguePageIdentifiesObject(html, objectName, pageUrl) {
  const pageText = norm(plain(html));
  const requestedName = norm(String(objectName || "").replace(/^\s*\(\s*#?\d+\s*\)\s*/, "").replace(/^\s*#?\d+\s+/, ""));
  let slug = "";
  try { slug = decodeURIComponent(new URL(pageUrl).pathname.split("/").filter(Boolean).pop() || "").replace(/^[a-z]+\d+[-_ ]*/i, ""); } catch {}
  const slugName = norm(slug);
  return (!!requestedName && hasWholePhrase(pageText, requestedName)) ||
    (!!slugName && hasWholePhrase(pageText, slugName) && (!requestedName || slugName.split(" ").some(token => requestedName.split(" ").includes(token))));
}
function catalogueSaysNoShapeModel(html) {
  const text = norm(plain(html));
  return /(?:this object|the object|it) does not have a shape model yet/.test(text) ||
    /no shape model (?:is )?(?:currently )?available/.test(text) ||
    /shape model is not available/.test(text);
}
function isObjectPageModelAsset(fileUrl, objectPage) {
  try {
    const file = new URL(fileUrl), page = new URL(objectPage);
    const pageCategory = page.pathname.split("/").filter(Boolean)[0];
    const match = file.pathname.match(/^\/data\/(asteroids|moons|comets|dwarf)\/models(?:\/[a-z])?\//i);
    return !!match && match[1].toLowerCase() === pageCategory && MODEL_EXTENSIONS.has(assetExtension(file.toString()));
  } catch { return false; }
}
function fileBelongsToObject(fileUrl, objectName, objectPage, linkLabel = "", pageIdentityVerified = false) {
  let filename = "";
  try { filename = decodeURIComponent(new URL(fileUrl).pathname.split("/").pop() || "").replace(/\.(?:obj|ply|glb|gltf|stl)$/i, ""); } catch { return false; }
  // Prefer explicit identity in the filename or link label. If the object page
  // itself has been verified, also accept model assets from that object's
  // category-specific catalogue model directory: filenames are not consistent
  // across all bodies and may contain only catalogue IDs or processing codes.
  return identityTextMatchesObject(filename, objectName, objectPage) ||
    identityTextMatchesObject(linkLabel, objectName, objectPage) ||
    (pageIdentityVerified && isObjectPageModelAsset(fileUrl, objectPage));
}
function extractCatalogueFileCandidates(html, basePage, objectName = "", pageIdentityVerified = false) {
  const source = decode(String(html || "")).replace(/\\\//g, "/");
  const raw = [];
  const anchors = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchors.exec(source)) && raw.length < 500) {
    const href = match[1].match(/(?:href|data-href|data-url|data-file|data-download|data-src|data-original)\s*=\s*["']([^"']+)["']/i);
    if (href) raw.push({ value: href[1], label: plain(match[2]).slice(0, 240) });
  }
  const attr = /(?:href|src|data-href|data-url|data-file|data-download|data-src|data-original)\s*=\s*["']([^"']+)["']/gi;
  while ((match = attr.exec(source)) && raw.length < 700) raw.push({ value: match[1], label: "" });
  // Also inspect escaped URLs embedded in page scripts/configuration.
  const urlPattern = /(?:https?:\/\/[^"'\s<>]*?\.(?:obj|ply|glb|gltf|stl)(?:\?[^"'\s<>]*)?|\/[^"'\s<>]*?\.(?:obj|ply|glb|gltf|stl)(?:\?[^"'\s<>]*)?)/gi;
  while ((match = urlPattern.exec(source)) && raw.length < 1000) raw.push({ value: match[0], label: "" });
  /** @type {ModelFileCandidate[]} */
  const found = [];
  for (const entry of raw) {
    let target;
    try { target = new URL(decode(entry.value).replace(/\\\//g, "/"), basePage); } catch { continue; }
    const ext = assetExtension(target.toString());
    if (!MODEL_EXTENSIONS.has(ext) || !ASSET_HOSTS.has(target.hostname.toLowerCase()) || target.protocol !== "https:" || target.username || target.password) continue;
    const identityVerified = fileBelongsToObject(target.toString(), objectName, basePage.toString(), entry.label, pageIdentityVerified);
    if (!identityVerified) continue;
    if (found.some(item => item.url === target.toString())) continue;
    found.push({ url: target.toString(), format: ext.toUpperCase(), label: target.pathname.split("/").pop() || ext.toUpperCase(), identityVerified });
  }
  return found;
}
function findObjectPageFromListing(html, listingPage, objectName, requestedPage) {
  const wanted = norm(String(objectName || "").replace(/^\s*\(?#?\d+\)?\s*/i, ""));
  const requestedSegments = new URL(requestedPage).pathname.split("/").filter(Boolean);
  const requestedCategory = requestedSegments[0] || "";
  const requestedSlug = norm(requestedSegments.pop() || "");
  const anchors = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match, best = null, bestScore = 0;
  while ((match = anchors.exec(html))) {
    const hrefMatch = match[1].match(/href\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    let target; try { target = new URL(decode(hrefMatch[1]), listingPage); } catch { continue; }
    if (target.protocol !== "https:" || !CATALOGUE_HOSTS.has(target.hostname.toLowerCase())) continue;
    const segments = target.pathname.split("/").filter(Boolean);
    if (segments.length !== 2 || segments[0] !== requestedCategory) continue;
    const label = norm(plain(match[2]) + " " + segments[1]);
    let score = 0;
    if (wanted && (" " + label + " ").includes(" " + wanted + " ")) score += 10;
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
  let currentIdentityVerified = !!(current && objectName && isObjectDetailPage(current.page) && cataloguePageIdentifiesObject(current.html, objectName, current.page));
  if (current && objectName && isObjectDetailPage(current.page) && !currentIdentityVerified) {
    throw new Error("The loaded catalogue page does not identify the requested object (" + objectName + "). No files were accepted.");
  }
  let candidates = current && currentIdentityVerified ? extractCatalogueFileCandidates(current.html, current.page, objectName, true) : [];
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
          if (cataloguePageIdentifiesObject(object.html, objectName, object.page)) {
            current = object;
            currentIdentityVerified = true;
            candidates = extractCatalogueFileCandidates(object.html, object.page, objectName, true);
          }
        }
      } catch (error) {
        if (!current && !firstError) firstError = error;
      }
    }
  }
  if (!current && !firstError) throw new Error("The catalogue page could not be loaded.");
  if (!candidates.length && firstError && searchedPages.length === 0) throw firstError;
  if (current && currentIdentityVerified && catalogueSaysNoShapeModel(current.html)) {
    return {
      page: current.page.toString(), requestedPage: requested.toString(),
      resolvedAt: new Date().toISOString(), searchedPages: [...new Set(searchedPages)],
      candidateCount: 0, files: [], axesKm: extractAxes(plain(current.html)),
      uncertaintyKm: null, dimensionSourceUrl: current.page.toString(),
      dimensionSourceLabel: "3D Asteroid Catalogue", source: "3D Asteroid Catalogue",
      availability: "no-shape-model",
      message: "The catalogue explicitly states that this object has no shape model yet; the page displays only a textured triaxial ellipsoid."
    };
  }

  /** @type {ModelFileCandidate[]} */
  const verified = [];
  for (const file of candidates.slice(0, 30)) {
    try {
      let probe, probeUrl = file.url;
      for (let hop = 0; hop <= 3; hop++) {
        const probeHeaders = { Range: "bytes=0-8191", Accept: "*/*", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-ModelResolver/2.1)", "Referer": (current?.page || requested).origin + "/", "Origin": (current?.page || requested).origin };
        probe = await fetch(probeUrl, { headers: probeHeaders, redirect: "manual", cf: { cacheTtl: 900 } });
        if (probe.status === 403 && probeHeaders.Range) { try { await probe.body?.cancel(); } catch {} delete probeHeaders.Range; probe = await fetch(probeUrl, { headers: probeHeaders, redirect: "manual", cf: { cacheTtl: 900 } }); }
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
    availability: verified.length ? "available" : "not-found",
    message: verified.length ? "Verified model files found." : "No direct model file passed the source and file-integrity checks. The catalogue page may not expose a downloadable mesh.",
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
function hasWholePhrase(text, phrase) {
  const haystack = norm(text), needle = norm(phrase);
  return !!needle && (" " + haystack + " ").includes(" " + needle + " ");
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
/**
 * Parse a numeric token without guessing when a single separator is ambiguous.
 * Examples:
 *   2,875.508 / 2.875,508 -> 2875.508
 *   2,3 / 2.3             -> 2.3
 *   0,001 / 0.001         -> 0.001
 *   2,300                 -> null (could mean 2.3 or 2300)
 */
function parseDimensionNumber(token) {
  const value = String(token || "").trim().replace(/[\s\u00a0\u202f']/g, "");
  if (!value || !/^[\d.,]+$/.test(value)) return null;
  if (/^\d+$/.test(value)) {
    const integer = Number(value);
    return Number.isFinite(integer) ? integer : null;
  }

  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");
  let normalized = value;

  if (lastComma >= 0 && lastDot >= 0) {
    const decimalSeparator = lastComma > lastDot ? "," : ".";
    const groupingSeparator = decimalSeparator === "," ? "." : ",";
    const decimalIndex = value.lastIndexOf(decimalSeparator);
    const integerPart = value.slice(0, decimalIndex);
    const fractionPart = value.slice(decimalIndex + 1);
    const groupingPattern = new RegExp("^\\d{1,3}(?:" + (groupingSeparator === "." ? "\\." : ",") + "\\d{3})+$");
    if (!fractionPart || !/^\d+$/.test(fractionPart) || !groupingPattern.test(integerPart)) return null;
    normalized = integerPart.split(groupingSeparator).join("") + "." + fractionPart;
  } else {
    const separator = lastComma >= 0 ? "," : ".";
    const pieces = value.split(separator);
    if (pieces.length === 2) {
      const [integerPart, fractionPart] = pieces;
      if (!integerPart || !fractionPart || !/^\d+$/.test(integerPart) || !/^\d+$/.test(fractionPart)) return null;
      // A single three-digit suffix is inherently ambiguous (2,300 vs 2.300).
      // A leading zero makes the decimal interpretation explicit (0,001).
      if (fractionPart.length === 3 && !/^0+$/.test(integerPart)) return null;
      normalized = integerPart + "." + fractionPart;
    } else {
      // Repeated separators are accepted only as conventional 3-digit grouping.
      if (!/^\d{1,3}(?:[,.]\d{3})+$/.test(value)) return null;
      normalized = value.replace(/[,.]/g, "");
    }
  }

  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function extractAxes(text, unitContext = "") {
  const source = decode(text).replace(/\u00d7/g, " x ").replace(/[–—]/g, "-");
  const unit = "(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm|ft|feet)";
  const number = "(?:\\d{1,3}(?:[,.]\\d{3})+(?:[,.]\\d+)?|\\d+(?:[,.]\\d+)?|[,.]\\d+)";
  const axisNumber = "(?:\\d{1,3}(?:[,.]\\d{3})+(?:[,.]\\d+)?|\\d+(?:[,.]\\d+)?|[,.]\\d+)";
  const axisUnit = "(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm|ft|feet)";
  const labelled = source.match(new RegExp(
    "(?:^|\\b)x(?:\\s*[- ]?axis)?\\s*[:=]\\s*(" + axisNumber + ")(?:\\s*(?:±|\\+\\/-)\\s*" + axisNumber + ")?\\s*(" + axisUnit + ")?[\\s,;]+"
    + "y(?:\\s*[- ]?axis)?\\s*[:=]\\s*(" + axisNumber + ")(?:\\s*(?:±|\\+\\/-)\\s*" + axisNumber + ")?\\s*(" + axisUnit + ")?[\\s,;]+"
    + "z(?:\\s*[- ]?axis)?\\s*[:=]\\s*(" + axisNumber + ")(?:\\s*(?:±|\\+\\/-)\\s*" + axisNumber + ")?\\s*(" + axisUnit + ")?", "i"
  ));
  if (labelled) {
    const sharedUnit = ((source + " " + unitContext).match(/\((km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm|ft|feet)\)/i) || [])[1];
    const units = [labelled[3], labelled[6], labelled[9]].map(unitValue => unitValue || sharedUnit);
    if (units.every(Boolean)) {
      const factors = units.map(unitValue =>
        /^(km|kilometer|kilometre)/i.test(unitValue) ? 1 :
        /^cm/i.test(unitValue) ? 0.00001 :
        /^mm/i.test(unitValue) ? 0.000001 :
        /^(ft|feet)/i.test(unitValue) ? 0.0003048 :
        /^(m|meter|metre)/i.test(unitValue) ? 0.001 : null
      );
      const values = [labelled[1], labelled[4], labelled[7]].map((value, index) => {
        const numeric = parseDimensionNumber(value);
        return numeric == null || factors[index] == null ? null : numeric * factors[index];
      });
      if (values.every(value => Number.isFinite(value) && value > 0)) return values;
    }
  }
  const patterns = [
    new RegExp("(" + number + ")\\s*(?:x|by)\\s*(" + number + ")(?:\\s*(?:x|by)\\s*(" + number + "))?\\s*" + unit, "i"),
    new RegExp("(" + number + ")\\s*" + unit + "\\s*(?:x|by)\\s*(" + number + ")\\s*" + unit + "(?:\\s*(?:x|by)\\s*(" + number + ")\\s*" + unit + ")?", "i"),
    new RegExp("(?:dimensions|extent|measures|measuring|size|approximately|about|length)\\D{0,35}(" + number + ")\\s*" + unit + "\\D{1,15}(" + number + ")\\s*" + unit, "i")
  ];

  for (let patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
    const match = source.match(patterns[patternIndex]);
    if (!match) continue;
    let values = [];
    if (patternIndex === 0) {
      const unitValue = match[4];
      values = [{ value: match[1], unit: unitValue }, { value: match[2], unit: unitValue }];
      if (match[3]) values.push({ value: match[3], unit: unitValue });
    } else if (patternIndex === 1) {
      values = [{ value: match[1], unit: match[2] }, { value: match[3], unit: match[4] }];
      if (match[5] && match[6]) values.push({ value: match[5], unit: match[6] });
    } else {
      values = [{ value: match[1], unit: match[2] }, { value: match[3], unit: match[4] }];
    }

    const factor = unitValue =>
      /^(km|kilometer|kilometre)/i.test(unitValue) ? 1 :
      /^cm/i.test(unitValue) ? 0.00001 :
      /^mm/i.test(unitValue) ? 0.000001 :
      /^(ft|feet)/i.test(unitValue) ? 0.0003048 :
      /^(m|meter|metre)/i.test(unitValue) ? 0.001 : null;

    const axes = values.map(item => {
      const numericValue = parseDimensionNumber(item.value);
      const multiplier = factor(item.unit);
      return numericValue == null || multiplier == null ? null : numericValue * multiplier;
    });
    if (axes.length >= 2 && axes.every(axis => Number.isFinite(axis) && axis > 0) && Math.max(...axes) < 1e9) return axes;
  }
  return null;
}

function extractSpacecraftAxes(text) {
  const source = plain(decode(String(text || "")));
  const blocks = source.split(/(?<=[.!?])\s+|[\r\n]+/).map(value => value.trim()).filter(Boolean);
  const factor = unit => /^(km|kilometer|kilometre)/i.test(unit) ? 1 :
    /^cm/i.test(unit) ? 0.00001 : /^mm/i.test(unit) ? 0.000001 :
    /^(ft|feet)/i.test(unit) ? 0.0003048 : /^(m|meter|metre)/i.test(unit) ? 0.001 : null;
  const number = String.raw`(\d+(?:[.,]\d+)?)`;
  const unit = String.raw`(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm|ft|feet)`;
  for (const block of blocks) {
    if (!/spacecraft|space vehicle|flyby vehicle|probe|orbiter/i.test(block)) continue;
    let match = block.match(new RegExp(
      "dimensions?\\s*(?:are|of)?\\s*:?\\s*" + number + "\\s*" + unit +
      "\\s*(?:\\([^)]*\\)\\s*)?(?:long|length)\\D{0,40}" +
      number + "\\s*" + unit + "\\s*(?:\\([^)]*\\)\\s*)?(?:wide|width)\\D{0,40}" +
      number + "\\s*" + unit + "\\s*(?:\\([^)]*\\)\\s*)?(?:high|height)", "i"
    ));
    if (match) {
      const values = [1,3,5].map((index, i) => {
        const n = parseDimensionNumber(match[index]);
        const f = factor(match[index+1]);
        return n == null || f == null ? null : n*f;
      });
      if (values.every(value => Number.isFinite(value) && value > 0)) return values;
    }
    match = block.match(new RegExp(
      "(?:spacecraft|space vehicle|flyby vehicle|probe|orbiter)[^.;]{0,100}?" +
      "(?:dimensions?|measures?|measuring|size)\\s*(?:are|of)?\\s*:?\\s*" +
      number + "\\s*(?:x|×|by)\\s*" + number + "\\s*(?:x|×|by)\\s*" + number + "\\s*" + unit, "i"
    ));
    if (match) {
      const f = factor(match[4]);
      const values = [1,2,3].map(index => {
        const n = parseDimensionNumber(match[index]);
        return n == null || f == null ? null : n*f;
      });
      if (values.every(value => Number.isFinite(value) && value > 0)) return values;
    }
  }
  return null;
}

function extractUncertainty(text, unitContext = "") {
  const source = decode(text) + " " + unitContext;
  const unit = "(km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm)";
  const number = "(?:\\d{1,3}(?:[,.]\\d{3})+(?:[,.]\\d+)?|\\d+(?:[,.]\\d+)?|[,.]\\d+)";
  let match = source.match(new RegExp("(?:±|\\+\\/-)\\s*(" + number + ")\\s*" + unit, "i"));
  let unitValue = match?.[2];
  if (!match) {
    // Tables often state the unit once in the column heading, e.g. "Extent (m)"
    // and then list "X: 849 ± 15; Y: ...". Only inherit an explicit shared unit.
    match = source.match(new RegExp("(?:±|\\+\\/-)\\s*(" + number + ")", "i"));
    unitValue = (source.match(/\((km|kilomet(?:er|re)s?|m|met(?:er|re)s?|cm|mm)\)/i) || [])[1];
  }
  if (!match || !unitValue) return null;
  const numericValue = parseDimensionNumber(match[1]);
  if (numericValue == null) return null;
  const unitName = unitValue.toLowerCase();
  const factor = /^(km|kilometer|kilometre)/.test(unitName) ? 1 : /^cm/.test(unitName) ? 0.00001 : /^mm/.test(unitName) ? 0.000001 : 0.001;
  return numericValue * factor;
}
/** @param {ResearchCandidate} candidate @param {string} query */
function confidence(candidate, query) {
  const host = hostOf(candidate.url), q = norm(query), text = norm(candidate.title + " " + candidate.snippet);
  const generic = new Set(["moon","mars","earth","sun","jupiter","saturn","planet","asteroid","comet","rover","satellite","spacecraft","model"]);
  const titleOrSnippetMatch = hasWholePhrase(candidate.title + " " + candidate.snippet, q);
  const identityStrong = !!q && !generic.has(q) && (titleOrSnippetMatch || candidate.sourceTextHasName);
  let score = sourceWeight(host);
  if (identityStrong && titleOrSnippetMatch) score += 24;
  else if (q && q.split(" ").filter(w => w.length > 2 && text.includes(w)).length >= Math.min(2, q.split(" ").length)) score += 12;
  if (candidate.axesKm) score += 27;
  if (candidate.pageChecked) score += 8;
  if (candidate.sourceTextHasName) score += 8;
  candidate.identityStrong = identityStrong;
  return Math.min(99, score);
}
function addSearchPage(pages, href, title, snippet, baseUrl) {
  let target = "";
  try {
    const parsed = new URL(decode(href), baseUrl);
    target = parsed.hostname.includes("duckduckgo.com") && parsed.searchParams.has("uddg")
      ? parsed.searchParams.get("uddg") : parsed.toString();
  } catch { return; }
  if (!isSafePublicUrl(target) || /duckduckgo\.com$/.test(hostOf(target)) || !plain(title)) return;
  if (!pages.some(page => page.url === target)) pages.push({ url: target, title: plain(title).slice(0, 240), snippet: plain(snippet).slice(0, 600) });
}
function parseDuckDuckGoResults(html, pages) {
  const anchors = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchors.exec(html)) && pages.length < 24) {
    if (!/result__a/i.test(match[1])) continue;
    const href = match[1].match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    const snippetStart = Math.max(0, html.lastIndexOf("result__snippet", match.index));
    addSearchPage(pages, href, match[2], html.slice(snippetStart, Math.min(html.length, snippetStart + 1600)), "https://html.duckduckgo.com/");
  }
}
function parseBingRssResults(xml, pages) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
  for (const item of items) {
    if (pages.length >= 24) break;
    const title = (item.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "";
    const link = (item.match(/<link>([\s\S]*?)<\/link>/i) || [])[1] || "";
    const description = (item.match(/<description>([\s\S]*?)<\/description>/i) || [])[1] || "";
    if (link) addSearchPage(pages, link, title, description, "https://www.bing.com/");
  }
}
function canonicalSmallBodyQuery(value) {
  let text = String(value || "").normalize("NFKC").replace(/\.[^.]+$/, "").trim();
  text = text.replace(/^\s*(?:asteroid|minor planet|minor planet no\.?)\s+/i, "");
  text = text.replace(/^\s*\(\s*(\d+)\s*\)\s*/, "$1 ");
  // Parenthetical text after a numbered body name is a catalogue/mesh variant.
  text = text.replace(/\s+\([^)]*\).*$/, "");
  // Remove generic suffixes such as "asteroid shape model" without dropping
  // the numbered designation or the proper name of the physical body.
  for (let i = 0; i < 4; i++) {
    const previous = text;
    text = text.replace(/(?:\s+(?:near[- ]earth|main[- ]belt))?\s+(?:asteroids?|minor planets?|small bodies?|shape models?|3d models?|mesh models?|models?|meshes?|shapes?|primary|secondary)\s*$/i, "").trim();
    if (text === previous) break;
  }
  return norm(text);
}
function normalizeResearchQuery(value, category) {
  return category === "small-bodies" ? canonicalSmallBodyQuery(value) : norm(value);
}
function buildResearchSearchTerms(query, category) {
  const q = normalizeResearchQuery(query, category);
  if (!q) return [];
  const categoryTerm = ({
    spacecraft: "spacecraft physical dimensions",
    moons: "natural moon physical dimensions axes",
    planetary: "planetary surface feature measured dimensions",
    "height-maps": "planetary terrain elevation footprint",
    "small-bodies": "asteroid minor planet triaxial axes dimensions"
  }[category] || "scientific physical dimensions axes");
  const terms = [
    '"' + q + '" ' + categoryTerm,
    '"' + q + '" measured physical dimensions',
    '"' + q + '" triaxial axes shape model extents',
    q + " " + categoryTerm + " x y z",
    q + " published dimensions shape model"
  ];
  if (category === "small-bodies") {
    terms.push('"' + q + '" asteroid dimensions km');
    terms.push('"' + q + '" physical extent minor planet');
    terms.push('site:echo.jpl.nasa.gov/asteroids "' + q + '" dimensions');
    terms.push('site:science.nasa.gov "' + q + '" physical dimensions');
  } else if (category === "moons") {
    terms.push('site:science.nasa.gov "' + q + '" moon dimensions');
    terms.push('site:pds.nasa.gov "' + q + '" shape model extent');
  } else if (category === "spacecraft") {
    terms.push('site:nasa.gov "' + q + '" spacecraft dimensions');
    terms.push('site:esa.int "' + q + '" spacecraft dimensions');
    terms.push('"' + q + '" "overall dimensions" length width height');
    terms.push('"' + q + '" "cruise stage" dimensions');
    terms.push('site:jpl.nasa.gov "' + q + '" dimensions');
  }
  return [...new Set(terms)].slice(0, category === "spacecraft" ? 10 : 8);
}
function categoryContextMatches(text, category) {
  const value = norm(text);
  if (category === "small-bodies") return /(^| )(asteroid|asteroids|minor planet|minor planets|small body|small bodies|comet|comets|dwarf planet|near earth object|near earth asteroid|nea|trans neptunian object|tno)( |$)/.test(value);
  if (category === "spacecraft") return /(^| )(spacecraft|space vehicle|space probe|satellite|probe|orbiter|lander|rover|space telescope|space station|flyby vehicle|cruise stage|cruise module)( |$)/.test(value);
  if (category === "moons") return /(^| )(moon|moons|moonlet|moonlets|natural satellite|natural satellites)( |$)/.test(value);
  if (category === "planetary" || category === "height-maps") return /(^| )(crater|mountain|volcano|valley|canyon|surface feature|terrain|elevation|topography)( |$)/.test(value);
  return true;
}
function researchTextBlocks(value) {
  const source = String(value || "");
  const htmlBlocks = source.match(/<(?:p|li|tr|blockquote|dd|dt|h[1-6])\b[^>]*>[\s\S]*?<\/(?:p|li|tr|blockquote|dd|dt|h[1-6])>/gi) || [];
  const blocks = htmlBlocks.map(plain).filter(Boolean);
  if (blocks.length) return blocks;
  const lineBlocks = source.split(/\r?\n/).map(plain).filter(Boolean);
  if (lineBlocks.length > 1) return lineBlocks;
  return plain(source).split(/(?<=[.!?])\s+/).map(value => value.trim()).filter(Boolean);
}
function researchTableHeaderContext(rawHtml, rowText) {
  const tables = String(rawHtml || "").match(/<table\b[\s\S]*?<\/table>/gi) || [];
  for (const table of tables) {
    if (!plain(table).includes(rowText)) continue;
    const headers = [...table.matchAll(/<(?:th|caption)\b[^>]*>([\s\S]*?)<\/(?:th|caption)>/gi)]
      .map(match => plain(match[1])).filter(Boolean);
    return headers.join(" ");
  }
  return "";
}
function blockMatchesResearchIdentity(block, query, category, pageContext = "") {
  const normalized = normalizeResearchQuery(query, category);
  if (!normalized || !hasWholePhrase(block, normalized)) return false;
  // Scientific tables often place the object name and its measured row in one
  // <tr>, while the word "asteroid" appears in the page title or section heading.
  // Allow category evidence from that page context, but keep the object name and
  // numeric measurement in the same row/paragraph.
  if (!categoryContextMatches(block, category) && !categoryContextMatches(pageContext, category)) return false;
  if (category === "small-bodies") {
    const designation = normalized.match(/^(\d{1,7})\s+(.+)$/);
    if (designation && (!hasWholePhrase(block, designation[1]) || !hasWholePhrase(block, designation[2]))) return false;
  }
  return true;
}
function exactResearchIdentity(candidate, query, category) {
  const blocks = [
    candidate.title || "",
    candidate.snippet || "",
    ...researchTextBlocks(candidate.sourceText || "")
  ];
  const pageContext = [candidate.title || "", candidate.snippet || "", ...blocks.filter(block => categoryContextMatches(block, category))].join(" ");
  return blocks.some(block => blockMatchesResearchIdentity(block, query, category, pageContext));
}
function extractIdentityScopedMeasurement(rawHtml, query, category, title = "", snippet = "") {
  const pageBlocks = researchTextBlocks(rawHtml);
  const blocks = [title, snippet, ...pageBlocks];
  const pageContext = [title, snippet, ...pageBlocks.filter(block => categoryContextMatches(block, category))].join(" ");
  for (const block of blocks) {
    if (!blockMatchesResearchIdentity(block, query, category, pageContext)) continue;
    const tableContext = researchTableHeaderContext(rawHtml, block);
    const axesKm = category === "spacecraft" ? extractSpacecraftAxes(block) : extractAxes(block, tableContext);
    if (axesKm) return { axesKm, uncertaintyKm: extractUncertainty(block, tableContext) };
  }
  return { axesKm: null, uncertaintyKm: null };
}
async function searchWeb(query, category) {
  query = normalizeResearchQuery(query, category);
  if (!query) return [];
  const searches = buildResearchSearchTerms(query, category);
  const headers = { "User-Agent":"Mozilla/5.0 (compatible; SpaceMesherResearch/1.2; +https://tymses.github.io/space-model-archive/)", "Accept":"text/html,application/rss+xml,application/xml;q=0.9,*/*;q=0.8" };
  const pages = [];
  for (const term of searches) {
    const encoded = encodeURIComponent(term);
    await Promise.all([
      fetch("https://html.duckduckgo.com/html/?q=" + encoded, { headers, cf:{cacheTtl:1800} }).then(async response => { if (response.ok) parseDuckDuckGoResults(await response.text(), pages); }).catch(() => {}),
      fetch("https://www.bing.com/search?format=rss&q=" + encoded, { headers, cf:{cacheTtl:1800} }).then(async response => { if (response.ok) parseBingRssResults(await response.text(), pages); }).catch(() => {})
    ]);
    if (pages.length >= 20) break;
  }
  const checked = await Promise.all(pages.slice(0, 20).map(async item => {
    try {
      const response = await fetch(item.url, { headers, redirect:"follow", cf:{cacheTtl:3600} });
      if (!response.ok) return {...item, axesKm:extractIdentityScopedMeasurement("",query,category,item.title,item.snippet).axesKm, pageChecked:false, sourceText:""};
      const contentType = (response.headers.get("content-type") || "").toLowerCase();
      if (contentType.includes("pdf") || contentType.includes("octet-stream") || contentType.startsWith("image/")) {
        return {...item, axesKm:extractIdentityScopedMeasurement("",query,category,item.title,item.snippet).axesKm, pageChecked:false, sourceText:"", nonHtml:true};
      }
      const raw = (await response.text()).slice(0, 900000);
      if (raw.startsWith("%PDF-")) return {...item, axesKm:extractIdentityScopedMeasurement("",query,category,item.title,item.snippet).axesKm, pageChecked:false, sourceText:"", nonHtml:true};
      const text = plain(raw).slice(0, 60000);
      const measurement = extractIdentityScopedMeasurement(raw, query, category, item.title, item.snippet);
      const titleMatch = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1];
      return {...item,title:plain(titleMatch)||item.title,snippet:(text||item.snippet).slice(0,520),axesKm:measurement.axesKm,uncertaintyKm:measurement.uncertaintyKm,pageChecked:true,sourceText:researchTextBlocks(raw).join("\n")};
    } catch { return {...item,axesKm:extractIdentityScopedMeasurement("",query,category,item.title,item.snippet).axesKm,uncertaintyKm:extractIdentityScopedMeasurement("",query,category,item.title,item.snippet).uncertaintyKm,pageChecked:false,sourceText:""}; }
  }));
  const relevantCandidates = checked.filter(candidate => exactResearchIdentity(candidate, query, category));
  for (const candidate of relevantCandidates) {
    candidate.source = hostOf(candidate.url);
    candidate.sourceTextHasName = true;
    candidate.score = confidence(candidate, query);
    if (candidate.nonHtml) candidate.score = Math.max(0, candidate.score - 15);
    candidate.quality = candidate.score >= 78 ? "high" : candidate.score >= 52 ? "medium" : "low";
    delete candidate.sourceText;
    delete candidate.nonHtml;
  }
  relevantCandidates.sort((a,b)=>b.score-a.score);
  return relevantCandidates.slice(0, 7);
}
const CURATED_DIMENSIONS_URL = "https://raw.githubusercontent.com/Tymses/space-model-archive/main/data/object-dimensions-index.json?v=20261127-dimension-research-2";
async function lookupCuratedDimensions(query, category) {
  const normalized = normalizeResearchQuery(query, category);
  if (!normalized || !category) return null;
  try {
    const response = await fetch(CURATED_DIMENSIONS_URL, {
      headers: { "Accept": "application/json" },
      cf: { cacheTtl: 1800 }
    });
    if (!response.ok) return null;
    const index = await response.json();
    const matches = (index.records || []).filter(record => {
      if (record.category !== category && !(record.categoryAliases || []).includes(category)) return false;
      const aliases = [record.name, ...(record.aliases || [])].filter(Boolean);
      return aliases.some(alias => normalizeResearchQuery(alias, category) === normalized);
    });
    if (matches.length !== 1) return null;
    const record = matches[0];
    const axesKm = Array.isArray(record.axesKm) ? record.axesKm.map(Number) : [];
    if (axesKm.length < 2 || axesKm.length > 3 || !axesKm.every(value => Number.isFinite(value) && value > 0) || !/^https:\/\//i.test(record.sourceUrl || "")) return null;
    const candidate = {
      url: record.sourceUrl,
      matchedObject: record.name,
      title: record.name + " — " + (record.measurement || "published physical dimensions"),
      snippet: [record.measurement, record.configuration, record.note].filter(Boolean).join(". "),
      axesKm,
      uncertaintyKm: Number.isFinite(record.uncertaintyKm) ? record.uncertaintyKm : null,
      axisUncertaintiesKm: Array.isArray(record.axisUncertaintiesKm) ? record.axisUncertaintiesKm : null,
      measurement: record.measurement || "Published physical dimensions; measurement type not further specified in this record",
      sourceLabel: record.sourceLabel || hostOf(record.sourceUrl),
      note: record.note || "",
      pageChecked: true,
      sourceTextHasName: true,
      identityStrong: true,
      source: hostOf(record.sourceUrl),
      score: 99,
      quality: "high"
    };
    return {
      query: normalized, category, searched: true,
      engine: "Curated source-backed dimensions index",
      candidates: [candidate], best: candidate, autoAccept: true,
      conflictingStrong: false, agreementCount: 0,
      note: "A matching source-backed record was found in the archive's curated dimensions index."
    };
  } catch {
    return null;
  }
}
const ASTEROID_OCCULTATION_URL = "https://www.asteroidoccultation.com/observations/Asteroid_Dimensions_from_Occultations.html";
function cleanAsteroidQuery(value) {
  return canonicalSmallBodyQuery(value);
}
async function lookupOccultationDimensions(query) {
  const wanted = cleanAsteroidQuery(query);
  if (!wanted || wanted.split(" ").length > 4) return null;
  try {
    const response = await fetch(ASTEROID_OCCULTATION_URL, {
      headers: { "Accept": "text/html", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-Research/1.0)" },
      cf: { cacheTtl: 21600 }
    });
    if (!response.ok) return null;
    const html = (await response.text()).slice(0, 2500000);
    const rows = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
    for (const row of rows) {
      const cells = [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(match => plain(match[1]));
      if (cells.length < 2) continue;
      const designation = cells[0].match(/^\s*(\d+)\s+(.+?)\s*$/);
      if (!designation) continue;
      const rowNumber = designation[1];
      const rowName = norm(designation[2]);
      const exactName = rowName === wanted;
      const exactDesignation = wanted === norm(rowNumber + " " + designation[2]) || wanted === rowNumber;
      if (!exactName && !exactDesignation) continue;
      // The source uses '*' as an axis separator, but tolerate the
      // equivalent multiplication symbols and harmless cell formatting.
      const ellipsoid = cells.find(cell => /^\s*\d+(?:\.\d+)?\s*[x*×]\s*\d+(?:\.\d+)?\s*[x*×]\s*\d+(?:\.\d+)?\s*$/i.test(cell));
      if (!ellipsoid) continue;
      const axesKm = ellipsoid.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
      if (axesKm.length !== 3 || !axesKm.every(axis => Number.isFinite(axis) && axis > 0)) continue;
      const displayName = "(" + rowNumber + ") " + designation[2].trim();
      const candidate = {
        url: ASTEROID_OCCULTATION_URL,
        title: displayName + " — occultation-derived ellipsoid dimensions",
        snippet: "John Broughton's Asteroid Dimensions from Occultations table lists an ellipsoid of " + axesKm.join(" × ") + " km. The ellipsoid is derived from occultation chord constraints; individual axis uncertainties are not stated.",
        axesKm,
        pageChecked: true,
        sourceTextHasName: true,
        identityStrong: true,
        source: "asteroidoccultation.com",
        score: 92,
        quality: "high"
      };
      return {
        query, category: "small-bodies", searched: true,
        engine: "Asteroid Dimensions from Occultations",
        candidates: [candidate], best: candidate, autoAccept: true,
        conflictingStrong: false, agreementCount: 0,
        note: "Occultation-derived ellipsoid dimensions. The source notes that ellipsoid axes are inferred from occultation constraints; no per-axis uncertainty is supplied."
      };
    }
  } catch {}
  return null;
}

/** @param {string} query @param {string} category */
async function research(query, category) {
  query = normalizeResearchQuery(query, category);
  if (!query) return { query: "", category: category || "general", searched: false, candidates: [], best: null, autoAccept: false, note: "No usable physical-object identity was supplied." };
  const curated = await lookupCuratedDimensions(query, category);
  if (curated) return curated;
  // A peer-reviewed axis measurement for (6) Hebe. The catalogue page itself
  // reports only a mean diameter, so use this published triaxial estimate
  // rather than incorrectly treating the mean diameter as the longest axis.
  const normalizedQuery = norm(query);
  if (category === "small-bodies" && ["iris", "7 iris"].includes(normalizedQuery)) {
    const candidate = {
      url: "https://doi.org/10.1051/0004-6361/201834541",
      title: "The shape of (7) Iris as evidence of an ancient large impact — A&A 624, A121 (2019)",
      snippet: "The ADAM 3D shape model reports major-axis dimensions for asteroid (7) Iris of 268 ± 5 × 234 ± 4 × 180 ± 6 km.",
      axesKm: [268, 234, 180],
      uncertaintyKm: 6,
      pageChecked: true,
      sourceTextHasName: true,
      identityStrong: true,
      source: "aanda.org",
      score: 99,
      quality: "high"
    };
    return {
      query, category, searched: true, engine: "Curated peer-reviewed small-body dimensions",
      candidates: [candidate], best: candidate, autoAccept: true,
      conflictingStrong: false, agreementCount: 0,
      note: "The published axis uncertainties are ±5, ±4 and ±6 km respectively; the displayed single uncertainty is the conservative maximum."
    };
  }
  if (category === "small-bodies" && ["juno", "3 juno"].includes(normalizedQuery)) {
    const candidate = {
      url: ASTEROID_OCCULTATION_URL,
      title: "(3) Juno — Asteroid Dimensions from Occultations (2018)",
      snippet: "The stage-2 occultation table lists the ellipsoid dimensions 311 × 274 × 236 km for (3) Juno.",
      axesKm: [311, 274, 236],
      pageChecked: true, sourceTextHasName: true, identityStrong: true,
      source: "asteroidoccultation.com", score: 99, quality: "high"
    };
    return { query, category, searched: true, engine: "Asteroid Dimensions from Occultations", candidates: [candidate], best: candidate, autoAccept: true, conflictingStrong: false, agreementCount: 0, note: "Occultation-derived ellipsoid dimensions. These describe an ellipsoid inferred from occultation chords, not the axes of one particular convex/non-convex mesh." };
  }
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
  if (category === "small-bodies") {
    const occultation = await lookupOccultationDimensions(query);
    if (occultation) return occultation;
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


const DESCRIPTION_HOSTS = new Set([
  "science.nasa.gov","www.nasa.gov","nasa.gov","github.com",
  "www.spaceradar.ai","spaceradar.ai","models.spaceradar.ai",
  "3d-asteroids.space","www.3d-asteroids.space",
  "echo.jpl.nasa.gov","ssd.jpl.nasa.gov","pds.nasa.gov",
  "sbn.psi.edu","sbnarchive.psi.edu","pdssbn.astro.umd.edu",
  "astrogeology.usgs.gov","usgs.gov","www.usgs.gov",
  "esa.int","www.esa.int","opensourcerobotics.dev",
  "models.opensourcerobotics.dev","zenodo.org","www.zenodo.org",
  "sketchfab.com","www.sketchfab.com"
]);
function readHtmlAttribute(tag, name) {
  const match = String(tag || "").match(new RegExp("\\b" + name + "\\s*=\\s*(['\"])(.*?)\\1", "i"));
  return match ? decode(match[2]) : "";
}
async function fetchModelSourceDescription(value) {
  let current;
  try { current = new URL(value); } catch { return null; }
  if (current.protocol !== "https:" || !DESCRIPTION_HOSTS.has(current.hostname.toLowerCase()) || current.username || current.password || (current.port && current.port !== "443")) return null;
  for (let hop = 0; hop <= 3; hop++) {
    let response;
    try {
      response = await fetch(current.toString(), {
        headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "Mozilla/5.0 (compatible; SPACEMESHER-ModelDescription/1.0)" },
        redirect: "manual",
        cf: { cacheTtl: 86400, cacheEverything: true }
      });
    } catch { return null; }
    if ([301,302,303,307,308].includes(response.status)) {
      const location = response.headers.get("Location");
      if (!location || hop === 3) return null;
      const next = new URL(location, current);
      if (next.protocol !== "https:" || !DESCRIPTION_HOSTS.has(next.hostname.toLowerCase())) return null;
      current = next;
      continue;
    }
    if (!response.ok) return null;
    let html = "";
    try { html = (await response.text()).slice(0, 1200000); } catch { return null; }
    const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
    const descriptions = meta.map(tag => ({
      key: (readHtmlAttribute(tag, "name") || readHtmlAttribute(tag, "property")).toLowerCase(),
      value: readHtmlAttribute(tag, "content")
    })).filter(item => item.value && ["description","og:description","twitter:description"].includes(item.key));
    const preferred = descriptions.find(item => item.key === "og:description") || descriptions.find(item => item.key === "description") || descriptions[0];
    if (preferred?.value) {
      const summary = plain(preferred.value).slice(0, 620);
      if (summary.length >= 35) return { summary, url: current.toString(), title: plain((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").slice(0, 160) };
    }
    const main = (html.match(/<(?:main|article)\b[\s\S]*?<\/(?:main|article)>/i) || [])[0] || html;
    const paragraphs = [...main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(match => plain(match[1])).filter(text => text.length >= 60);
    if (paragraphs.length) return { summary: paragraphs[0].slice(0, 620), url: current.toString(), title: plain((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").slice(0, 160) };
    return null;
  }
  return null;
}
function sourceDescriptionMatchesModel(name, sourceSummary) {
  if (!sourceSummary || !sourceSummary.summary) return false;
  const normalize = value => String(value || "").normalize("NFKD").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();
  const modelName = normalize(name);
  const title = normalize(sourceSummary.title);
  const summary = normalize(sourceSummary.summary);
  if (!modelName) return false;
  // A page title containing the complete model name is the strongest match.
  if (title && (title.includes(modelName) || modelName.includes(title))) return true;
  // Otherwise require a distinctive model-name token in the actual source text.
  // Generic words such as "spacecraft", "model" or "NASA" are deliberately ignored.
  const ignored = new Set(["model","space","spacecraft","mission","satellite","planet","asset","nasa","3d","the","and","with","without","for"]);
  const tokens = modelName.split(" ").filter(token => token.length >= 4 && !ignored.has(token));
  return tokens.length > 0 && tokens.some(token => summary.includes(token));
}

async function describeArchiveModel(input) {
  const name = String(input.name || "").trim().slice(0, 180) || "Untitled model";
  const kind = String(input.kind || "").trim().slice(0, 140);
  const source = String(input.source || "").trim().slice(0, 120) || "archive source";
  const format = String(input.format || "").trim().slice(0, 30).toUpperCase() || "3D";
  const category = String(input.category || "").trim().slice(0, 50);
  const categoryLabel = ({
    spacecraft: "spacecraft and mission hardware",
    "small-bodies": "asteroids, comets and small bodies",
    moons: "natural satellites",
    planetary: "planetary surfaces and terrain",
    "height-maps": "surface elevation data"
  })[category] || "space-related models";
  const sourceUrl = String(input.sourceUrl || "").slice(0, 2048);
  const fetchedSummary = await fetchModelSourceDescription(sourceUrl);
  const sourceSummary = sourceDescriptionMatchesModel(name, fetchedSummary) ? fetchedSummary : null;
  // Do not mix free-text "kind" labels into the description: catalogues sometimes
  // contain broad or conflicting labels (e.g. a spacecraft stored as a map asset).
  const metadata = name + " is listed in SPACEMESHER's " + categoryLabel + " collection. " +
    "The archive entry provides a " + format + " file sourced from " + source + ".";
  const scaleNote = " The file format does not establish the object's real-world scale; use a separately cited physical measurement when calculating print scale.";
  const description = (sourceSummary ? sourceSummary.summary + " " : "") + metadata + scaleNote;
  return {
    name, description, provenance: sourceSummary ? "Matching original source page summary plus archive metadata" : "Automatically generated from archive metadata; source summary omitted because it could not be matched to this model",
    sourceTitle: sourceSummary?.title || "", sourceUrl: sourceSummary?.url || sourceUrl || "",
    generated: !sourceSummary, format, source
  };
}

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.has(origin)) return new Response("Origin not allowed", {status:403});
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers});
    if (request.method !== "GET") return new Response("Method not allowed",{status:405,headers});
    if (incoming.searchParams.get("action") === "views") {
      try {
        await env.VIEW_COUNTER.prepare(
          "CREATE TABLE IF NOT EXISTS page_views (id INTEGER PRIMARY KEY CHECK (id = 1), total INTEGER NOT NULL)"
        ).run();
        const row = await env.VIEW_COUNTER.prepare(
          "INSERT INTO page_views (id, total) VALUES (1, 1) ON CONFLICT(id) DO UPDATE SET total = total + 1 RETURNING total"
        ).first();
        return json({ views: Number(row?.total) || 1 }, 200, { ...headers, "Cache-Control": "no-store" });
      } catch (error) {
        return json({ error: "View counter unavailable", detail: String(error.message || error) }, 503, { ...headers, "Cache-Control": "no-store" });
      }
    }
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
    if (incoming.searchParams.get("action") === "describe") {
      const name = (incoming.searchParams.get("name") || "").trim();
      if (!name || name.length > 180) return json({ error: "Provide a model name (max. 180 characters)." }, 400, headers);
      try {
        const result = await describeArchiveModel({
          name,
          kind: incoming.searchParams.get("kind") || "",
          source: incoming.searchParams.get("source") || "",
          category: incoming.searchParams.get("category") || "",
          format: incoming.searchParams.get("format") || "",
          sourceUrl: incoming.searchParams.get("sourceUrl") || ""
        });
        return json(result, 200, { ...headers, "Cache-Control": "public, max-age=86400" });
      } catch (error) {
        return json({ error: "Model description generation failed", detail: String(error.message || error) }, 502, headers);
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
