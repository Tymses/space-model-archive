# JPL proxy for the Scaling workspace

The browser cannot call the JPL SBDB API directly because the JPL endpoint does not provide browser CORS headers. This small Cloudflare Worker forwards only read-only SBDB lookups and adds the required CORS response headers.

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

The Scaling workspace sends the typed asteroid/comet name, number or designation to this Worker. The Worker requests:

`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=...&phys-par=1&full-prec=1`

The browser then reads the `extent` physical parameter, converts its axes to kilometres, and uses the largest axis. A single `diameter` value is never substituted for `extent`. If JPL has no usable extent, the workspace explains why it cannot calculate a verified scale.

## Privacy and limits

- No API key or account is sent to JPL.
- The Worker forwards only the object search string and physical-parameter request.
- It does not accept arbitrary target URLs; the upstream host is fixed to JPL.
- Responses are cached for a short period to avoid repeated requests.
- The Worker is a read-only relay; it does not write to the SMA repository or alter verified dimension records.

## Scaling lookup fallback catalogue

The Scaling workspace checks JPL SBDB `extent` first. If SBDB has no usable multi-axis extent (or the JPL lookup is temporarily unavailable), it checks `data/object-dimensions-index.json` for an exact object-name/number alias. This is a curated fallback of published shape-model or physical-axis measurements, not an unrestricted web search. Each match retains its source link, measurement description, and reported uncertainty where available. A mean/effective diameter is never silently converted into three axes.

Add a fallback record only when its object identity, axis values, units, source, and uncertainty (if published) can be documented. Values in the index are in kilometres.
