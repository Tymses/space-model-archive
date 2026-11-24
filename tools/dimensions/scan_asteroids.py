#!/usr/bin/env python3
"""Discover (but never auto-approve) asteroid dimensions from JPL SBDB.

Reads the curated 3D Asteroid Catalogue index and the existing verified
real-world dimensions. Writes candidate measurements to a separate JSON file.
Only a tri-/bi-axial JPL 'extent' is treated as a longest-axis candidate;
an effective 'diameter' is recorded separately and is never promoted.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "data/asteroid-curated-index.json"
VERIFIED = ROOT / "data/real-world-dimensions.json"
OUTPUT = ROOT / "data/real-world-dimension-candidates.json"
API = "https://ssd-api.jpl.nasa.gov/sbdb.api"
USER_AGENT = "SpaceModelArchive-DimensionResearch/1.0 (GitHub Actions; public research index)"
NUMBER_RE = re.compile(r"^\${ch}*\\(?(\${ch}+)\\)?(?:\${ch}|$)")
VALUE_RE = re.compile(r"[-+]?(?:\${ch}+(?:\\.\${ch}*)?|\\.\${ch}+)(?:[eE][-+]?\${ch}+)?")
UNIT_TO_KM = {"km": 1.0, "m": 0.001, "meter": 0.001, "meters": 0.001}


def read_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def asteroid_number(name: str) -> str | None:
    match = NUMBER_RE.match(name or "")
    return match.group(1) if match else None


def request_sbdb(number: str, timeout: int = 25) -> dict[str, Any]:
    query = urllib.parse.urlencode({"sstr": number, "phys-par": "1", "full-prec": "1"})
    request = urllib.request.Request(
        f"{API}?{query}",
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
    )
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if payload.get("code") or payload.get("error"):
                raise RuntimeError(payload.get("message") or payload.get("error") or "JPL API error")
            return payload
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
            last_error = exc
            if attempt < 2:
                time.sleep(2 ** attempt)
    raise RuntimeError(f"JPL SBDB request failed for asteroid {number}: {last_error}")


def parse_axes_km(value: Any, units: str | None) -> list[float] | None:
    if not isinstance(value, (str, int, float)):
        return None
    unit = (units or "km").strip().lower()
    factor = UNIT_TO_KM.get(unit)
    if factor is None:
        return None
    numbers = [float(item) for item in VALUE_RE.findall(str(value))]
    if len(numbers) not in (2, 3) or any(not (number > 0) for number in numbers):
        return None
    return [number * factor for number in numbers]


def get_physical_parameters(payload: dict[str, Any]) -> list[dict[str, Any]]:
    params = payload.get("phys_par") or []
    return params if isinstance(params, list) else []


def build_candidate(model: dict[str, Any], payload: dict[str, Any], retrieved: str) -> dict[str, Any] | None:
    expected = asteroid_number(model.get("name", ""))
    obj = payload.get("object") or {}
    returned_des = str(obj.get("des") or "").strip()
    returned_kind = obj.get("kind")
    # The numeric designation must match exactly. Never trust a fuzzy name match.
    if not expected or returned_des != expected or returned_kind not in (None, "an"):
        return None

    params = get_physical_parameters(payload)
    extent = next((p for p in params if str(p.get("name", "")).lower() == "extent"), None)
    diameter = next((p for p in params if str(p.get("name", "")).lower() in ("diameter", "diam")), None)
    record: dict[str, Any] = {
        "catalogueId": model.get("id"),
        "name": model.get("name"),
        "number": expected,
        "jplDesignation": returned_des,
        "jplName": obj.get("fullname"),
        "jplSpkId": obj.get("spkid"),
        "source": "JPL Small-Body Database (SBDB) API",
        "sourceUrl": f"https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr={urllib.parse.quote(expected)}",
        "apiUrl": f"{API}?{urllib.parse.urlencode({'sstr': expected, 'phys-par': '1'})}",
        "retrievedAt": retrieved,
        "status": "candidate",
    }
    if extent:
        axes = parse_axes_km(extent.get("value"), extent.get("units"))
        if axes:
            record.update({
                "measurementType": "tri-axial extent" if len(axes) == 3 else "bi-axial extent",
                "axesKm": axes,
                "longestAxisKm": max(axes),
                "parameterReference": extent.get("ref"),
                "parameterNotes": extent.get("notes"),
                "uncertainty": extent.get("sigma"),
                "reviewNote": "JPL extent parameter found; verify the cited measurement and its interpretation before promotion.",
            })
            return record
        record["extentNote"] = "JPL returned an extent parameter, but its value or unit could not be safely parsed."
    if diameter:
        record["diameterOnly"] = {
            "value": diameter.get("value"),
            "units": diameter.get("units"),
            "reference": diameter.get("ref"),
            "notes": diameter.get("notes"),
        }
        record["reviewNote"] = "Only an effective diameter was found. It is NOT a verified longest axis and must not be used as one."
        record["status"] = "diameter_only"
        return record
    record["reviewNote"] = "No usable tri-/bi-axial extent or diameter parameter was returned by JPL."
    record["status"] = "no_usable_dimension"
    return record


def existing_numbered_objects(dimensions: dict[str, Any]) -> set[str]:
    found: set[str] = set()
    for key, value in (dimensions.get("records") or {}).items():
        match = re.search(r"(?:3dac-asteroid-|asteroid-)(\${ch}+)$", key)
        if match and isinstance(value, dict) and value.get("longestAxisKm"):
            found.add(match.group(1))
    return found


def run(limit: int | None = None, delay: float = 0.35) -> dict[str, Any]:
    index = read_json(INDEX)
    dimensions = read_json(VERIFIED)
    models = index.get("files") or []
    already_verified = existing_numbered_objects(dimensions)
    retrieved = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
    candidates: dict[str, Any] = {}
    counts = {"scanned": 0, "alreadyVerified": 0, "extentCandidates": 0,
              "diameterOnly": 0, "noUsableDimension": 0, "notMatched": 0, "errors": 0}

    for model in models:
        number = asteroid_number(model.get("name", ""))
        if not number:
            continue
        counts["scanned"] += 1
        if number in already_verified:
            counts["alreadyVerified"] += 1
            continue
        if limit is not None and counts["scanned"] > limit:
            break
        try:
            payload = request_sbdb(number)
            candidate = build_candidate(model, payload, retrieved)
            if candidate is None:
                counts["notMatched"] += 1
            else:
                candidates[model["id"]] = candidate
                status = candidate["status"]
                if status == "candidate":
                    counts["extentCandidates"] += 1
                elif status == "diameter_only":
                    counts["diameterOnly"] += 1
                else:
                    counts["noUsableDimension"] += 1
        except Exception as exc:  # retain per-object failure; continue the batch
            counts["errors"] += 1
            candidates[model["id"]] = {
                "catalogueId": model.get("id"),
                "name": model.get("name"),
                "number": number,
                "status": "lookup_error",
                "retrievedAt": retrieved,
                "error": str(exc),
            }
        time.sleep(delay)

    output = {
        "source": "Automated discovery candidates; not approved for website scale calculations",
        "generatedAt": retrieved,
        "method": "Only exact numbered-asteroid matches are accepted. A tri-/bi-axial JPL SBDB extent becomes a candidate. Effective diameter is kept separate and never promoted to longestAxisKm. Existing verified numbered-object measurements are skipped.",
        "counts": counts,
        "candidates": candidates,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\\n", encoding="utf-8")
    print(json.dumps(counts, indent=2))
    print(f"Wrote {len(candidates)} candidate records to {OUTPUT.relative_to(ROOT)}")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=None, help="limit the number of numbered models queried (for testing)")
    parser.add_argument("--delay", type=float, default=0.35, help="seconds between API requests")
    args = parser.parse_args()
    try:
        run(limit=args.limit, delay=max(0.0, args.delay))
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
