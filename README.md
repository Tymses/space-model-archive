# Space Model Archive (SMA)

A scientific archive for scale-accurate, 3D-printable spacecraft and spaceflight models.

## Project principles

- Preserve and document real-world scale wherever source data supports it.
- Link to original model sources instead of mirroring files by default.
- Help users assess whether a model fits a selected printer's build volume.
- Prepare geometry for printing where practical, including splitting oversized models into sensible parts.
- Do not integrate a slicer. Users download model geometry and slice it in their own software.

## Current status

Early prototype. The first milestone establishes the public-facing interface and a configurable build-volume fit checker. Example entries are clearly marked as demonstrations and are not verified model downloads.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required.

## Planned areas

- Model catalogue and filters
- Model detail pages with scale, dimensions, provenance, and source links
- Printer build-volume profiles and fit analysis
- Geometry preparation guidance, including part splitting
- Source and license metadata

## Data quality

Never infer a model's scale, dimensions, source, or license. Missing information should be shown as unknown until verified from the original source.
