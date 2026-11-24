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

- Four collections: Spacecraft, Planetary features, Asteroids & comets, and Height maps.
- Collection search with source and type filters.
- Model detail pages with a 3D preview, source credit, licence and original download link where available.
- Printer fit checker with a Bambu Lab P2S profile (256 × 256 × 256 mm) and custom build-volume dimensions.
- Scale calculator: enter the real-world length of the model's longest axis and a scale denominator to calculate print dimensions and a recommended size factor.
- Fit checks test all six axis-aligned 90° orientations.

## Important limitations

- Missing real-world dimensions, scale, licence or geometry are never guessed.
- The fit checker uses the 3D preview's bounding box. It is not a slicer simulation and does not check wall thickness, supports, bed adhesion, brim, collision clearance or arbitrary-angle packing.
- Scaling is a recommendation only. The original source file is not modified; apply the scale in your own slicer.
- Automatic geometry measurement currently depends on the source GLB loading successfully in the browser and exposing its dimensions.
- The initial model index contains a curated set of Space Radar spacecraft entries. Other collections currently provide source catalogues; they are not yet a complete unified model database.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required. The 3D preview uses Google's `model-viewer` web component loaded from a CDN.

## Data quality

Never infer a model's scale, dimensions, source or licence. Missing information should be shown as unknown until verified from the original source.
