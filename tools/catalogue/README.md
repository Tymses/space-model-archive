# Catalogue audit and record rules

This folder documents how SPACEMESHER counts and distinguishes its records.

## Record types

| Type | Meaning | Count as an individual mesh? |
|---|---|---:|
| Direct model file | A verified file endpoint for a mesh/CAD model (GLB, STL, OBJ, PLY, STEP, etc.) | Yes |
| Catalogue reference | An object or catalogue page where the visitor chooses a model or variant | No |
| Dataset archive | A downloadable ZIP/7Z or scientific data package that may contain multiple files | No; count the archive separately |
| Viewer | An interactive source visualisation; no downloadable geometry is implied | No |
| Generator | A tool that creates geometry from user-selected data/parameters | No |
| Unverified link | A URL whose file type or download behaviour has not been verified | No |

The collection UI now separates direct mesh files from catalogue references and archive packages. A detail page on an external catalogue is not labelled as a direct download. ZIP/7Z archives are shown as scientific dataset archives and retain their original download link.

## Object identity and variants

- Every source record keeps its own stable record ID and source attribution.
- The same physical object can have several records: for example, radar, light-curve, spacecraft-derived, low-resolution and high-resolution shape models.
- Variants are retained; they are not collapsed into one “best” model.
- Cross-source matching should use a canonical designation (for example, numbered minor-planet designation or an authoritative body identifier). Display-name similarity alone is insufficient.
- The audit script only groups numbered minor planets when the designation is explicit in the record name. It never deletes or merges records.
- Licence, file format, resolution, source dataset and attribution remain properties of the individual source record.

## Current snapshot (2026-11-25)

See [catalogue-audit.json](../../data/catalogue-audit.json) for the detailed record and source counts.

- 1,270 collection/index records with 1,270 unique record IDs.
- 1,241 distinct source-file/listing placements after accounting for the 29 NASA planetary STL records cross-listed into Height Maps.
- 977 records point to direct mesh/CAD files; 29 of those are NASA assets cross-listed in a second collection, leaving 948 distinct direct mesh files in this snapshot.
- 259 records are catalogue-page references, 29 are dataset archives and 5 have an unverified link type.
- Category placements: 877 spacecraft, 316 small bodies, 35 planetary features, 13 moons and 29 height-map records.

These are repository counts, not counts of unique Solar System objects and not complete coverage of the external sources. In particular, the 256 asteroid entries are catalogue-page references, not 256 direct mesh downloads.

## Rebuild the audit

From the repository root, run:

```bash
python tools/catalogue/audit_catalogue.py
```

The script reads the five index files and writes `data/catalogue-audit.json`. It reports index IDs, category counts, record types, source counts and conservatively matched numbered-asteroid variants. Review the generated diff before committing it. Run the standard-library tests with `python -m unittest discover -s tools/catalogue/tests`.

## Next ingestion priorities

1. Enumerate the complete 3D Asteroid Catalogue object lists and all model variants, not only the current 256 numbered asteroids.
2. Expand comets, dwarf planets and all 37 satellite records into individual object and variant records where the source exposes them.
3. Extract NASA PDS optical, radar and Stooke shape-model bundles into individual model records while preserving dataset citations.
4. Inventory the model files and per-object licence/download details in models.codelove.in and ESA Sci-Fleet.
5. Build product-level DEM inventories from PDS Geosciences, USGS and Solar System Treks; keep map imagery and generators distinct from terrain meshes.
