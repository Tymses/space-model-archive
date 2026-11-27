#!/usr/bin/env python3
"""Audit model-file and original-source URLs from the archive data indexes.

NASA raw GitHub assets are checked against the upstream repository tree in one
request, which verifies the exact tracked path without downloading every mesh.
Other URLs are checked with HEAD and a small ranged GET fallback. HTTP 403,
429, timeouts and 5xx are reported as inconclusive rather than mislabeled dead.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
NASA_RAW_PREFIX = "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/"
NASA_TREE_API = "https://api.github.com/repos/nasa/NASA-3D-Resources/git/trees/master?recursive=1"
URL_FIELD = re.compile(r"(?:url|file|source|page|download|uri|link)", re.I)
USER_AGENT = "SPACEMESHER-LinkAudit/1.0 (+https://github.com/Tymses/space-model-archive)"
TIMEOUT = 12


def collect_urls(value: object, field: str = "", found: dict[str, set[str]] | None = None) -> dict[str, set[str]]:
    if found is None:
        found = {}
    if isinstance(value, dict):
        for key, child in value.items():
            collect_urls(child, str(key), found)
    elif isinstance(value, list):
        for child in value:
            collect_urls(child, field, found)
    elif isinstance(value, str) and URL_FIELD.search(field) and value.startswith(("https://", "http://")):
        found.setdefault(value.strip(), set()).add(field)
    return found


def request_json(url: str) -> object:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        return json.loads(response.read().decode("utf-8"))


def nasa_tree_paths() -> set[str]:
    payload = request_json(NASA_TREE_API)
    if not isinstance(payload, dict) or not isinstance(payload.get("tree"), list):
        raise RuntimeError("NASA repository tree response was incomplete")
    return {str(item.get("path", "")) for item in payload["tree"] if item.get("type") == "blob"}


def check_nasa_raw(url: str, paths: set[str]) -> dict:
    parsed = urllib.parse.urlsplit(url)
    prefix = "/nasa/NASA-3D-Resources/master/"
    if not parsed.path.startswith(prefix):
        return {"url": url, "status": "not-a-catalogue-path", "method": "tree"}
    path = urllib.parse.unquote(parsed.path[len(prefix):])
    exists = path in paths
    return {
        "url": url,
        "status": "verified" if exists else "broken",
        "method": "NASA Git tree",
        "detail": "Exact upstream file path exists" if exists else "File path is absent from the NASA 3D Resources master tree",
        "path": path,
    }


def check_http(url: str) -> dict:
    request = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            return {"url": url, "status": "verified", "http": response.status, "final_url": response.geturl(), "method": "HEAD"}
    except urllib.error.HTTPError as error:
        if error.code in (405, 501):
            try:
                ranged = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*", "Range": "bytes=0-0"})
                with urllib.request.urlopen(ranged, timeout=TIMEOUT) as response:
                    return {"url": url, "status": "verified", "http": response.status, "final_url": response.geturl(), "method": "GET-range"}
            except urllib.error.HTTPError as retry:
                return classify_http_error(url, retry.code, "GET-range")
            except Exception as retry:
                return {"url": url, "status": "inconclusive", "detail": str(retry)[:240], "method": "GET-range"}
        return classify_http_error(url, error.code, "HEAD")
    except Exception as error:
        return {"url": url, "status": "inconclusive", "detail": str(error)[:240], "method": "HEAD"}


def classify_http_error(url: str, code: int, method: str) -> dict:
    if code in (404, 410):
        status = "broken"
    elif code in (401, 403, 407, 408, 425, 429) or code >= 500:
        status = "inconclusive"
    else:
        status = "inconclusive"
    return {"url": url, "status": status, "http": code, "method": method}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="link-audit.json")
    parser.add_argument("--workers", type=int, default=24)
    parser.add_argument("--fail-on-broken", action="store_true")
    args = parser.parse_args()

    urls: dict[str, set[str]] = {}
    files = sorted(DATA_DIR.glob("*.json"))
    for path in files:
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except Exception as error:
            print(f"Skipping invalid JSON {path}: {error}", file=sys.stderr)
            continue
        collect_urls(payload, found=urls)

    app_path = ROOT / "app.js"
    if app_path.exists():
        app_source = app_path.read_text(encoding="utf-8")
        for url in re.findall(r'https?://science\.nasa\.gov/3d-resources/[^\s"\']+', app_source):
            urls.setdefault(url.rstrip("),;"), set()).add("NASA_VERIFIED_MODEL_PAGES")

    unique_urls = sorted(urls)
    nasa_urls = [url for url in unique_urls if url.startswith(NASA_RAW_PREFIX)]
    other_urls = [url for url in unique_urls if url not in set(nasa_urls)]
    results: list[dict] = []

    if nasa_urls:
        try:
            tree_paths = nasa_tree_paths()
            results.extend(check_nasa_raw(url, tree_paths) for url in nasa_urls)
        except Exception as error:
            results.extend({"url": url, "status": "inconclusive", "method": "NASA Git tree", "detail": str(error)[:240]} for url in nasa_urls)

    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = {pool.submit(check_http, url): url for url in other_urls}
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    results.sort(key=lambda item: (item["status"], item["url"]))
    counts = {status: sum(1 for item in results if item["status"] == status) for status in ("verified", "broken", "inconclusive")}
    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "scope": "All URL-valued source/file/page/download/link fields in data/*.json plus hard-coded NASA 3D page overrides in app.js",
        "index_files": [str(path.relative_to(ROOT)) for path in files] + (["app.js (NASA page overrides)"] if app_path.exists() else []),
        "unique_urls": len(unique_urls),
        "counts": counts,
        "results": results,
    }
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"unique_urls": len(unique_urls), "counts": counts, "report": str(output)}, indent=2))
    for item in results:
        if item["status"] != "verified":
            print(f'{item["status"].upper()}: {item["url"]} {item.get("http", item.get("detail", ""))}')
    return 1 if args.fail_on_broken and counts["broken"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
