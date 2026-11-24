# Space Model Archive (SMA)

A minimal, source-linked archive for discovering space-related 3D models and preparing them for 3D printing.

## Project principles

- Preserve and document real-world scale wherever source data supports it.
- Link to original model sources instead of mirroring files by default.
- Show provenance and licence information alongside each model.
- Help users assess whether a model fits a selected printer's build volume.
- Support scale calculations and geometry-based fit checks where the source preview exposes measurable geometry.
- Do not integrate a slicer. Users prepare and slice files in their own software.

## Current interface

- Five collections: Spacecraft, Planetary features, Asteroids & comets, Moons, and Height maps. The first four are collections of physical objects and their model files; Height Maps is visually separated as a terrain-data and generation collection.
- Collection search with source and type filters.
- NASA 3D Resources is indexed from its complete public `3D Models` and `3D Printing` Git tree: 650 individual files (257 GLB, 342 STL, 27 7Z packages, 13 BLEND, 4 3DS, 4 LWO, 2 FBX and 1 VSP3) in the 2026-11-24 snapshot, each with a direct original-file link. 29 planetary STL records are also cross-listed in Height Maps.
- Space Radar is indexed from its public repository: all 203 models in its official GLB catalogue plus 108 additional GLB map assets (including 18 asteroid/comet/dwarf-planet shape models and 11 natural-satellite shape models). File sizes and per-model attribution notes are stored in `data/spaceradar-model-index.json`.
- NASA/JPL Radar Astronomy contributes 19 individually indexed direct OBJ downloads from its radar-derived asteroid shape-model list, stored in `data/jpl-asteroid-index.json`.
- Collection pages visually separate individual downloadable model files from source catalogues, scientific data, viewers and on-demand generators. Source cards are explicitly classified by type. Terrain Print and NASA Solar System Treks are generators, not fixed model libraries.
- A verified native STEP assembly for the ESA ExoMy rover is listed separately; its source notes warn that purchased-component geometry may have different reuse rights.
- NASA GLB models have an in-browser 3D preview; NASA STL files have direct downloads and source attribution. The NASA index is stored at `data/nasa-model-index.json` and can be regenerated from the public Git tree. The Space Radar index is stored at `data/spaceradar-model-index.json` and can be rebuilt from its `site/model/models.json`, `site/models/` files and `CREDITS.md`. The JPL radar index is stored at `data/jpl-asteroid-index.json`.
- NASA terrain and asteroid print files are discoverable in the planetary, small-bodies and height-map collections. Eleven Space Radar Saturn-moon shape models and two NASA STL models of the lunar near and far sides are classified separately in Moons.
- NASA Solar System Treks is linked at https://trek.nasa.gov/#. It remains an interactive terrain generator: users choose a location and export a print file from the Trek portal.
- Model detail pages show source credit, file format, file size, licence/use guidance and original download link where available.
- Printer fit checker with a Bambu Lab P2S profile (256 × 256 × 256 mm) and custom build-volume dimensions.
- Scale calculator for GLB previews: enter the real-world length of the model's longest axis and a scale denominator.
- Fit checks test all six axis-aligned 90° orientations.

## Important limitations

- Missing real-world dimensions, scale, licence or geometry are never guessed.
- NASA models are linked to the NASA 3D Resources repository; follow NASA's usage guidelines and attribution requirements.
- The fit checker uses the 3D preview's bounding box. It is not a slicer simulation and does not check wall thickness, supports, bed adhesion, brim, collision clearance or arbitrary-angle packing.
- STL and GLB files remain in their original formats when no native STEP file is provided. A mesh-to-STEP conversion is not presented as a proper CAD solid unless its quality is verified.
- STEP support varies by slicer: Bambu Studio and PrusaSlicer support STEP import, while UltiMaker Cura's documented model formats do not list STEP. STL remains the broadly compatible fallback.
- STL files are provided as direct downloads; the current in-browser preview and automatic geometry measurement are for GLB files only.
- Scaling is a recommendation only. The original source file is not modified; apply the scale in your own slicer.
- NASA Solar System Treks generates files based on the selected world and area, so the archive links to the portal rather than pretending there is one fixed model file.
- Other source catalogues remain linked separately where they do not provide a stable direct model file. The 3D Asteroid Catalogue reports 3,079 shape models, but its direct OBJ/PLY download links have not yet been exhaustively indexed. NASA Astromaterials 3D publishes OBJ ZIPs on sample detail pages, but its individual ZIP endpoints have not yet been reliably extracted. These are explicitly incomplete rather than counted as complete. Source totals are snapshots of indexed files, not a claim that every external catalogue entry has a downloadable mesh. A catalogue count is not the same as a count of downloadable, printable meshes; for example, the asteroid catalogue's database count includes many objects without a verified downloadable shape file.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required. The 3D preview uses Google's `model-viewer` web component loaded from a CDN.

## Data quality

Never infer a model's scale, dimensions, source or licence. Missing information should be shown as unknown until verified from the original source.
