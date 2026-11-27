import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const workerPath = new URL("../jpl-proxy.js", import.meta.url);
let workerSource = readFileSync(workerPath, "utf8");
workerSource = workerSource.replace(/\nexport default \{[\s\S]*\n\};\s*$/, "");
assert.notEqual(workerSource, "", "Worker source must be readable");
workerSource += "\nglobalThis.__smaTest = { canonicalSmallBodyQuery, buildResearchSearchTerms, exactResearchIdentity, extractIdentityScopedMeasurement, extractSpacecraftAxes, lookupCuratedDimensions, searchWeb };";
const dimensionsPath = new URL("../../data/object-dimensions-index.json", import.meta.url);
const dimensionsIndex = JSON.parse(readFileSync(dimensionsPath, "utf8"));
let fetchImpl = async () => ({ ok: true, json: async () => dimensionsIndex });
const context = {
  URL,
  URLSearchParams,
  fetch: (...args) => fetchImpl(...args)
};
vm.runInNewContext(workerSource, context);
const api = context.__smaTest;

test("catalogue labels resolve to the physical Didymos identity", () => {
  assert.equal(api.canonicalSmallBodyQuery("Didymos asteroid"), "didymos");
  assert.equal(api.canonicalSmallBodyQuery("Didymos asteroid shape model"), "didymos");
  assert.equal(api.canonicalSmallBodyQuery("65803 Didymos"), "65803 didymos");
  assert.equal(api.canonicalSmallBodyQuery("Asteroid 4 Vesta (A) (West Globe Hollow)"), "4 vesta");
  assert.equal(api.canonicalSmallBodyQuery("Dimorphos moonlet"), "dimorphos moonlet");
});

test("research expands into more than one scientific query form", () => {
  const terms = api.buildResearchSearchTerms("Didymos asteroid shape model", "small-bodies");
  assert.ok(terms.length >= 5);
  assert.ok(terms.some(term => term.includes('"didymos"')));
  assert.ok(terms.some(term => /triaxial|shape model|physical extent/i.test(term)));
});

test("Didymos labelled X/Y/Z extents are extracted with metre conversion and uncertainty", () => {
  const html = "<h1>Physical dimensions of the asteroid</h1><table><tr><th>Object</th><th>Extents (m)</th></tr><tr><td>Didymos</td><td>X: 849 ± 15; Y: 851 ± 15; Z: 620 ± 15</td></tr></table>";
  const result = api.extractIdentityScopedMeasurement(html, "Didymos", "small-bodies");
  assert.deepEqual(Array.from(result.axesKm), [0.849, 0.851, 0.62]);
  assert.equal(result.uncertaintyKm, 0.015);
});

test("Vesta identity cannot borrow Ceres dimensions from another table row", () => {
  const html = "<h1>Asteroid physical properties</h1><table><tr><td>4 Vesta</td><td>Physical shape model record</td></tr><tr><td>1 Ceres</td><td>964 × 964 × 892 km</td></tr></table>";
  const result = api.extractIdentityScopedMeasurement(html, "4 Vesta", "small-bodies");
  assert.equal(result.axesKm, null);
});

test("a spacecraft result is not accepted for an asteroid query", () => {
  const candidate = {
    title: "EPOXI flyby spacecraft dimensions",
    snippet: "The spacecraft is 3.3 m long, 1.7 m wide and 2.3 m high.",
    sourceText: ""
  };
  assert.equal(api.exactResearchIdentity(candidate, "Didymos", "small-bodies"), false);
});

test("the EPOXI spacecraft parser still returns its spacecraft envelope", () => {
  const axes = api.extractSpacecraftAxes("Flyby spacecraft dimensions: 3.3 meters long, 1.7 meters wide, and 2.3 meters high.");
  assert.deepEqual(Array.from(axes), [0.0033, 0.0017, 0.0023]);
});

test("curated Worker lookup resolves Didymos model descriptors to the published record", async () => {
  const result = await api.lookupCuratedDimensions("Didymos asteroid shape model", "small-bodies");
  assert.equal(result.autoAccept, true);
  assert.deepEqual(Array.from(result.best.axesKm), [0.849, 0.851, 0.62]);
  assert.equal(result.best.uncertaintyKm, 0.015);
  assert.equal(result.best.sourceLabel, "Daly et al. (2023), Nature 616, 443");
});

test("Dimorphos remains distinct from the Didymos primary", async () => {
  const result = await api.lookupCuratedDimensions("Dimorphos moonlet", "small-bodies");
  assert.equal(result.best.title.startsWith("Dimorphos"), true);
  assert.deepEqual(Array.from(result.best.axesKm), [0.177, 0.174, 0.116]);
});

test("web search checks scientific result variants and extracts a labelled table row", async () => {
  fetchImpl = async input => {
    const url = String(input);
    if (url.includes("html.duckduckgo.com")) {
      return {
        ok: true,
        text: async () => '<div class="result__snippet">Asteroid physical properties include dimensions for Didymos.</div><a class="result__a" href="https://www.nature.com/articles/s41586-023-05810-5">Successful kinetic impact into an asteroid for planetary defence</a>'
      };
    }
    if (url.includes("bing.com")) return { ok: true, text: async () => "<rss></rss>" };
    if (url.includes("nature.com")) {
      return {
        ok: true,
        headers: { get: () => "text/html; charset=utf-8" },
        text: async () => '<html><head><title>Successful kinetic impact into an asteroid for planetary defence</title></head><body><h1>Physical dimensions of the asteroid</h1><table><tr><th>Object</th><th>Extents (m)</th></tr><tr><td>Didymos</td><td>X: 849 ± 15; Y: 851 ± 15; Z: 620 ± 15</td></tr></table></body></html>'
      };
    }
    return { ok: false, text: async () => "" };
  };
  const results = await api.searchWeb("Didymos asteroid shape model", "small-bodies");
  assert.equal(results.length, 1);
  assert.deepEqual(Array.from(results[0].axesKm), [0.849, 0.851, 0.62]);
  assert.equal(results[0].uncertaintyKm, 0.015);
  fetchImpl = async () => ({ ok: true, json: async () => dimensionsIndex });
});

test("InSight Cruise Stage terminology is recognized as spacecraft context",()=>{
  const terms=api.buildResearchSearchTerms("InSight Cruise Stage final", "spacecraft");
  assert.ok(terms.some(term=>/overall dimensions/i.test(term)));
  assert.ok(terms.some(term=>/cruise stage/i.test(term)));
  assert.ok(terms.some(term=>/jpl\.nasa\.gov/i.test(term)));
  const axes=api.extractSpacecraftAxes("InSight Cruise Stage spacecraft dimensions: 2.4 meters long, 1.8 meters wide and 1.2 meters high.");
  assert.deepEqual(Array.from(axes),[0.0024,0.0018,0.0012]);
  assert.equal(api.exactResearchIdentity({title:"InSight Cruise Stage spacecraft",snippet:"InSight Cruise Stage spacecraft dimensions"}, "InSight Cruise Stage", "spacecraft"),true);
});
