#!/usr/bin/env python3
"""Audit SPACEMESHER indexes without merging or deleting source records.

Run: python tools/catalogue/audit_catalogue.py
"""
from __future__ import annotations
import argparse
import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INDEXES = [
    "data/nasa-model-index.json",
    "data/spaceradar-model-index.json",
    "data/jpl-asteroid-index.json",
    "data/small-body-package-index.json",
    "data/asteroid-curated-index.json",
]
NUMBERED = re.compile(r"^\s*\((\d+)\)\s*")


def classify(item):
    url = (item.get("file") or "").lower()
    if item.get("downloadDirect") is False:
        return "catalogue-reference"
    if url.endswith((".zip", ".7z", ".tar", ".gz")) or "download/" in url:
        return "dataset-archive"
    if url.endswith((".glb", ".gltf", ".stl", ".obj", ".ply", ".step", ".stp", ".fbx", ".blend", ".3ds")):
        return "direct-model-file"
    if item.get("downloadDirect") is True:
        return "direct-download-untyped"
    return "unverified-link"


def stable_object_key(item):
    # Deliberately conservative: no fuzzy matching or merging by display name.
    match = NUMBERED.match(item.get("name", ""))
    return f"minor-planet:{int(match.group(1))}" if match else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="data/catalogue-audit.json")
    args = parser.parse_args()
    records, indexes = [], []
    for relative in INDEXES:
        path = ROOT / relative
        if not path.exists():
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        entries = data if isinstance(data, list) else data.get("files", [])
        cats = Counter(x.get("category", "uncategorized") for x in entries)
        indexes.append({
            "index": relative,
            "source": data.get("source", path.stem) if isinstance(data, dict) else path.stem,
            "recordCount": len(entries),
            "categoryCounts": dict(sorted(cats.items())),
        })
        records.extend({**x, "_index": relative} for x in entries)

    ids, objects = defaultdict(list), defaultdict(list)
    categories, types, sources = Counter(), Counter(), Counter()
    for item in records:
        if item.get("id"):
            ids[item["id"]].append(item["_index"])
        kind = classify(item)
        types[kind] += 1
        categories[item.get("category", "uncategorized")] += 1
        sources[item.get("source", "Unknown source")] += 1
        key = stable_object_key(item)
        if key:
            objects[key].append({
                "id": item.get("id"), "name": item.get("name"),
                "source": item.get("source"), "index": item["_index"],
                "recordType": kind, "format": item.get("format"),
                "url": item.get("sourceUrl") or item.get("file"),
            })

    duplicate_ids = [
        {"id": key, "indexes": sorted(set(value))}
        for key, value in sorted(ids.items()) if len(value) > 1
    ]
    variants = [
        {"objectKey": key, "recordCount": len(value), "records": value}
        for key, value in sorted(objects.items()) if len(value) > 1
    ]
    result = {
        "schemaVersion": 1,
        "generatedAt": date.today().isoformat(),
        "method": "Deterministic index audit. Only stable numbered minor-planet designations are grouped. No records are merged or deleted.",
        "coverageNote": "Counts are repository index records, not unique physical objects or the complete contents of external catalogues. Catalogue references and archive packages are not individual mesh files.",
        "totals": {
            "indexRecordCount": len(records),
            "uniqueRecordIdCount": len(ids),
            "duplicateRecordIdCount": len(duplicate_ids),
            "stableNumberedObjectCount": len(objects),
            "objectsWithMultipleSourceRecords": len(variants),
        },
        "byCategory": dict(sorted(categories.items())),
        "byRecordType": dict(sorted(types.items())),
        "bySource": dict(sorted(sources.items())),
        "indexes": indexes,
        "duplicateIds": duplicate_ids,
        "crossSourceObjectVariants": variants,
    }
    output = ROOT / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(result["totals"], indent=2))


if __name__ == "__main__":
    main()
