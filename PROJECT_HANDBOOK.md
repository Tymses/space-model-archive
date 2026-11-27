# SPACEMESHER Project Handbook

_Last updated: 27 November 2026_

This file is the repository's operational handbook. Read it before every project-specific response that proposes or performs repository work. After each approved implementation, update this file and the relevant technical documentation. If another handbook or BOGY diary exists in a separate storage location, do not claim it was synchronized unless that storage location was actually updated and verified.

## 1. Mandatory workflow before project work

1. Search for and read this handbook and the current project documentation before discussing or changing implementation details.
2. Inspect the actual current GitHub `main` head, recent commits, relevant backup branches and any in-progress feature branches.
3. Read the complete affected files and their directly related code, data, tests and runtime configuration. Do not rely only on previous chat summaries.
4. Create a named backup branch from the exact inspected `main` commit before making changes.
5. Make the smallest scoped change that satisfies the approved request. Do not alter unrelated UI positions, data, copy or behavior.
6. Add regression tests for the identified defect. Run available automated checks and distinguish automated test results from browser/manual verification.
7. Update this handbook and any affected README or technical guide in the same implementation branch. Record changed files, root causes, tests and any checks that could not be run.
8. Do not claim that a separate Library/Word diary or another external storage location was updated unless it was actually edited and verified.

## 2. Product boundaries

SPACEMESHER is a catalogue and geometry-preparation tool for space-related 3D models. It is not a slicer: it does not generate supports, calculate print time or produce G-code. The user remains responsible for final slicer inspection and print settings. Real-world dimensions must be source-backed; missing measurements must not be guessed.

## 3. STL conversion

The browser conversion pipeline loads supported source geometry into Three.js and exports binary STL with `STLExporter`. STEP/STP files are tessellated using OpenCascade. Blender scenes are parsed by the bundled importer. The converter is local to the browser; the conversion action does not upload the source model.

Supported conversion source formats:
- FBX, 3DS, LWO
- Blender `.blend`
- STEP and STP, including GZIP-compressed STEP packages

Important implementation constraints:
- A compressed STEP label such as `STEP (GZIP)` must be normalized to `STEP` before selecting the loader. The actual file bytes are then checked for the GZIP signature and decompressed.
- OpenCascade initialization failures must not leave a rejected promise cached permanently; a retry must be able to initialize the library again.
- The existing browser safeguards include a 75 MB file/output limit and a 5-million-triangle conversion limit.
- Successful export does not certify manifoldness, wall thickness or printability. The exported STL still requires inspection in a slicer.

## 4. Convert-button placement

The **Convert to STL** button belongs in the model **View details** card, in the title row at the upper right beside the model title (Position A). It must not appear on collection model-preview cards or archive cards. Do not change other card positions or functions as part of this UI move.

## 5. Implementation record — 27 November 2026

### Inspected repository state
- Repository: `Tymses/space-model-archive`
- Inspected `main` head: `26c123b9b3ab27708955400e678d5498a8925d62`
- Relevant pre-conversion backup inspected: `backup/before-model-links-descriptions-conversion-2026-11-27` at `3cb66a1a59d77b6414d039b872d6114df036c14f`
- The current main branch is two commits ahead of that backup; the conversion implementation was added in commit `5da6d5c`.
- No standalone handbook file existed in the repository tree before this file was added. The BOGY project diary exists separately in the personal Library.

### Confirmed conversion defects addressed in this change
- The catalogue labels the ExoMy source as `STEP (GZIP)`, but the loader dispatch originally compared only exact `STEP`/`STP` values. It therefore fell through to an undefined generic loader rather than reaching GZIP decompression and OpenCascade.
- A rejected OpenCascade initialization promise was cached, so a transient CDN/WASM initialization failure could make subsequent retries fail immediately without attempting initialization again.
- The Convert action was rendered on collection model/archive cards and sent users directly to the Scaling workspace, bypassing the model detail page.

### Changes implemented in this branch
- Normalize compressed STEP format labels to `STEP` for loader dispatch while retaining the original label for status text. The shared normalizer is at top-level scope so both the detail route and Scaling loader can use it.
- Clear failed OpenCascade initialization promises so the user can retry.
- Move the Convert action to the upper-right title row of View details (Position A), removing it from collection cards.
- Add regression coverage for STEP format normalization, retry behavior and button placement.
- Extend the existing repository validation workflow so it executes the Node model-workspace regression tests on relevant changes.

### Verification status
- Static repository inspection completed.
- Regression tests have been added to `tests/model-workspace.test.mjs`.
- Automated test execution is pending the GitHub Actions run for this branch. Live browser verification is not available through the GitHub repository connector and must not be inferred from a successful commit.
