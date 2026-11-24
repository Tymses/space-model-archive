const JPL_API = "https://ssd-api.jpl.nasa.gov/sbdb.api";
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

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response("Origin not allowed", { status: 403 });
    }
    const headers = cors(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    const incoming = new URL(request.url);
    const query = (incoming.searchParams.get("sstr") || "").trim();
    if (!query || query.length > 120) {
      return new Response(JSON.stringify({ error: "Provide an object name, number or designation (max. 120 characters)." }), {
        status: 400, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const upstream = new URL(JPL_API);
    upstream.searchParams.set("sstr", query);
    upstream.searchParams.set("phys-par", "1");
    upstream.searchParams.set("full-prec", "1");

    try {
      const response = await fetch(upstream.toString(), {
        headers: { "Accept": "application/json", "User-Agent": "SpaceModelArchive/1.0" },
        cf: { cacheTtl: 21600, cacheEverything: true }
      });
      const body = await response.text();
      return new Response(body, {
        status: response.status,
        headers: {
          ...headers,
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "JPL request failed", detail: String(error) }), {
        status: 502, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" }
      });
    }
  }
};
