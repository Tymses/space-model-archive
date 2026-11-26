#!/usr/bin/env python3
"""Validate SPACEMESHER JSON data files and core catalogue index invariants.

Run from any directory: python tools/catalogue/validate_data.py
Uses only the Python standard library.
"""
from __future__ import annotations

import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
INDEX_FILES = (
    "nasa-model-index.json",
    "spaceradar-model-index.json",
    "jpl-asteroid-index.json",
    "small-body-package-index.json",
    "asteroid-curated-index.json",
    "moon-catalogue-index.json",
)


def load_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"{path.relative_to(ROOT)}: {exc}") from exc


def validate_all_json() -> int:
    files = sorted(DATA_DIR.rglob("*.json"))
    if not files:
        raise ValueError("No JSON files found under data/.")
    for path in files:
        value = load_json(path)
        if not isinstance(value, (dict, list)):
            raise ValueError(f"{path.relative_to(ROOT)}: top-level JSON value must be an object or array.")
    return len(files)


def validate_indexes() -> tuple[int, int]:
    checked_indexes = checked_records = 0
    for filename in INDEX_FILES:
        path = DATA_DIR / filename
        if not path.exists():
            continue
        data = load_json(path)
        if isinstance(data, list):
            records = data
        elif isinstance(data, dict):
            records = data.get("files", [])
        else:
            raise ValueError(f"{filename}: expected an object or array.")
        if not isinstance(records, list):
            raise ValueError(f"{filename}: expected 'files' to be an array.")
        seen: set[str] = set()
        for position, record in enumerate(records):
            if not isinstance(record, dict):
                raise ValueError(f"{filename}[{position}]: record must be an object.")
            record_id = record.get("id")
            if not isinstance(record_id, str) or not record_id.strip():
                raise ValueError(f"{filename}[{position}]: missing non-empty string id.")
            if record_id in seen:
                raise ValueError(f"{filename}: duplicate record id {record_id!r}.")
            seen.add(record_id)
        checked_indexes += 1
        checked_records += len(records)
    if checked_indexes == 0:
        raise ValueError("None of the expected catalogue index files were found.")
    return checked_indexes, checked_records


def main() -> int:
    try:
        json_files = validate_all_json()
        indexes, records = validate_indexes()
    except ValueError as exc:
        print(f"DATA VALIDATION FAILED: {exc}", file=sys.stderr)
        return 1
    print(f"Validated {json_files} JSON files, {indexes} catalogue indexes and {records} index records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
