# JPL proxy for the Scaling workspace

The browser cannot call JPL SBDB or third-party search engines directly because of CORS restrictions. This Cloudflare Worker provides read-only JPL SBDB lookups and a broader public-web research fallback, with the required CORS response headers.

## Deploy once (free Cloudflare Workers plan)

1. Sign in to the Cloudflare dashboard and open **Workers & Pages**.
2. Choose **Create application → Create Worker**.
3. Name it `sma-jpl-proxy`.
4. Choose **Edit code** and replace the starter code with the complete contents of `cloudflare/jpl-proxy.js`.
5. Select **Deploy**. Cloudflare gives you a URL similar to `https://sma-jpl-proxy.<your-subdomain>.workers.dev`.
6. Open `config.js` in this repository and set `jplProxyUrl` to that exact URL (without adding a path):
   ```js
   window.SMA_CONFIG = {
     jplProxyUrl: "https://sma-jpl-proxy.<your-subdomain>.workers.dev"
   };
   ```
7. Commit the change. Reload the SMA Scaling page.

The Worker allows the published SMA origin (`https://tymses.github.io`) and common local development origins on ports 8000 and 5500. If you use another local port or a custom domain, add that exact origin to `ALLOWED_ORIGINS` in the Worker and redeploy it.

## What the lookup does

The Scaling workspace derives a search phrase from the uploaded model name or filename and sends it to this Worker automatically. It first checks curated scientific dimensions and, for small bodies, JPL SBDB. If those do not provide usable axes, the Worker searches the DuckDuckGo public web index, opens a limited number of promising result pages, extracts candidate axis values and ranks sources by domain authority, name match and explicit dimensions. This is a broad public-web search, not a literal crawl of the entire Internet. The Worker requests:

`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=...&phys-par=1&full-prec=1`

The browser then reads the `extent` physical parameter, converts its axes to kilometres, and uses the largest axis. A single `diameter` value is never substituted for `extent`. If JPL has no usable extent, the workspace runs broader research. High-evidence candidates may be selected automatically; otherwise the most promising candidates are shown for manual review. The evidence score is a source-quality heuristic, not a probability. Published uncertainty is shown only when the source states it.

## Privacy and limits

- No API key or account is sent to JPL.
- The Worker forwards only the object search string and physical-parameter request.
- Search-result URLs are fetched only after they are returned by the public search index; users cannot submit arbitrary target URLs.
- The public-web fallback checks a bounded number of search results and pages per request. It cannot guarantee coverage of every Internet page, paywalled papers or blocked hosts.
- Automatically extracted values are candidates, not newly peer-reviewed measurements. Review the linked source and configuration before relying on them.
- Responses are cached for a short period to avoid repeated requests.
- The Worker is a read-only relay; it does not write to the SMA repository or alter verified dimension records.

## Scaling lookup fallback catalogue

The Scaling workspace checks JPL SBDB `extent` first. If SBDB has no usable multi-axis extent (or the JPL lookup is temporarily unavailable), it checks `data/object-dimensions-index.json` for an exact object-name/number alias. This is a curated fallback of published shape-model or physical-axis measurements, not an unrestricted web search. Each match retains its source link, measurement description, and reported uncertainty where available. A mean/effective diameter is never silently converted into three axes.

Add a fallback record only when its object identity, axis values, units, source, and uncertainty (if published) can be documented. Values in the index are in kilometres.

## Object categories supported by Scaling

Scaling uses the JPL SBDB proxy first for small bodies (asteroids and comets). For exact catalogue matches in the curated dimension index, moons and spacecraft use their category-specific published physical dimensions directly; this avoids accidentally resolving a moon or spacecraft name as an asteroid in SBDB.

The curated index currently contains source-backed records for selected moons and spacecraft. Spacecraft records identify the configuration (for example, deployed or stowed, and whether booms/robotic arms are included). A missing record is reported as unavailable rather than guessed. Coverage is extended as new source-verified dimensions are added.

### Current curated category coverage

- **Small bodies:** asteroids and comets use JPL SBDB `extent` first, then exact-match literature fallback.
- **Moons:** exact-match NASA/PDS published shape dimensions; JPL SBDB is bypassed to avoid name collisions with asteroids.
- **Spacecraft:** exact-match published envelope dimensions, with configuration notes (deployed/stowed, booms/arms included or excluded).
- **Planetary terrain / height maps:** use the published horizontal footprint of the exact NASA terrain model where available (for example Gale Crater and selected Valles Marineris / lunar models). Vertical exaggeration is kept as a note and is not mistaken for horizontal scale. Other regions remain unavailable until their exact footprint is sourced; the parent planet diameter is never substituted.

## Terrain / height-map coverage

The terrain fallback index uses the published footprint of the exact source model where NASA provides one. Current examples include Gale Crater, Valles Marineris C, Tharsis, and the Apollo 11 landing-site relief. Vertical exaggeration is stored as a note and never multiplied into the horizontal footprint. For other terrain models, the exact region footprint must be documented before automatic scale calculation is enabled.
