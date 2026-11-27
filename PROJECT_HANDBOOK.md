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
- Pull request #10 was merged into `main` as commit `01a399cbd48ba1a41bfa00c544f97693ea6ca14c`.
- Pull-request validation run `46009390809` completed successfully, including `node --test tests/model-workspace.test.mjs`, catalogue validation, catalogue tests, dimension tests and audit generation.
- Post-merge model-workspace test run `46009498873` completed successfully.
- Post-merge catalogue validation run `46009498863` completed successfully.
- Post-merge catalogue link audit run `46009499003` completed successfully.
- GitHub Pages build and deployment run `46009499817` completed successfully.
- Live interaction in a desktop browser was not performed through the GitHub connector; CI success and deployment success do not replace a manual browser check.
- The separate BOGY project diary in the personal Library was read during the initial review but was not edited or synchronized. This repository handbook and the repository README are the documentation locations updated and verified in this task.


## 6. Editorial readiness workflow

The binding editorial rules and release checklist live in [EDITORIAL_WORKFLOW.md](EDITORIAL_WORKFLOW.md). Primary categories must describe the geometry, not merely the scientific topic. Cross-listings are supplementary and should be visible. Source links must lead to a publisher page; a GitHub mirror folder must never be the primary source. If no individual NASA page is verified, use the official NASA 3D Resources catalogue and label it as a general catalogue source.

### Editorial correction — 27 November 2026
- Reclassified NASA ICESat, ICESat-2 and Jason-2 records from Planetary features to Spacecraft; moved the Deep Space Station antenna assembly into Spacecraft / mission hardware.
- Replaced NASA planetary-terrain GitHub folder links with verified NASA 3D Resources pages where available, including matching terrain cross-listings.
- Changed the unresolved NASA source resolver fallback to the official NASA 3D Resources catalogue instead of a GitHub mirror folder.
- Added regression coverage for NASA source links and satellite categories.
- The visible Terrain collection rename, visible cross-listing UI, scale wording and compact beginner workflow remain planned phases, not completed changes.


### Editorial readiness implementation — 27 November 2026
- Pull request #11 merged as commit `0015a1e9fa86e5dc4d4ea8d07fcd466baf60c79c`.
- Added `EDITORIAL_WORKFLOW.md` with category definitions, source and download-link rules, scale language, cross-listing policy, beginner workflow, per-record review process, acceptance checklist and phased definition of done.
- Reclassified six ICESat/ICESat-2/Jason-2 variants and the Deep Space Station antenna assembly into Spacecraft / mission hardware. Planetary feature NASA records no longer include those satellite models.
- Updated 20 NASA planetary feature source URLs to official NASA 3D Resources model pages where verified, and copied those source pages to their matching terrain cross-listings.
- For NASA raw-file records without a verified model-specific NASA page, the source resolver now uses the official NASA 3D Resources catalogue instead of a GitHub mirror folder. Five other NASA spacecraft entries use their official NASA catalogue or mission pages.
- PR validation runs `46024935554` (catalogue validation), `46024935075` (model workspace tests) and `46024935005` (catalogue link audit) all succeeded.
- Post-merge runs `46025013503` (catalogue validation), `46025013532` (model workspace tests), `46025013620` (catalogue link audit) and `46025013089` (GitHub Pages build/deployment) all succeeded.
- The visible Terrain collection rename, visible cross-listing labels, scale-percentage wording and compact beginner workflow are still editorial follow-up tasks documented in `EDITORIAL_WORKFLOW.md`; they were not implemented in this PR.

- Follow-up source-link check: the two Pahrump Hills terrain variants did not have a verified individual NASA 3D detail page in the current research. Their source links therefore point to the official NASA 3D Resources catalogue, not the GitHub mirror folder.

- Follow-up PR #12 merged as `2430c2d8bc18307007e216d146d7470e15f46920`: both Pahrump Hills variants now use the official NASA 3D Resources catalogue as their source because no model-specific NASA detail page was verified.
- PR #12 validation, model-workspace regression tests and full catalogue link audit all passed (runs `46025238601`, `46025238500`, `46025238489`). Post-merge validation and model-workspace tests passed (runs `46025295024`, `46025295061`); post-merge link audit passed (`46025295101`); GitHub Pages build and deployment passed (`46025295126`).

- Follow-up PR #13 merged as `ba569586cee16d089ec12e954d62ad437f6b03e9`: both Pahrump Hills terrain cross-listing records now use the official NASA 3D Resources catalogue, matching their primary records. No individual NASA model detail page was verified for these variants.
- PR #13 catalogue validation, model-workspace regression tests and catalogue link audit passed (runs `46025511805`, `46025511713`, `46025511571`). Post-merge catalogue validation, model-workspace tests and link audit passed (runs `46025590825`, `46025590882`, `46025590943`). The post-merge Pages build completed successfully; the deploy job was still running when this handbook entry was written (run `46025590626`).


## 7. Editorial finish — 27 November 2026

- Created safety branch `backup/before-editorial-finish-2026-11-27` from inspected `main` commit `6a6cc9fd644baf8e9941c976c052556920967293`.
- Implemented the public collection name **Terrain data & printable terrain** while preserving the internal `height-maps` route key and existing record IDs.
- Added explicit cross-listing cues to catalogue cards and model detail pages for paired NASA terrain records; no records or download relationships were duplicated or rewritten.
- Replaced ambiguous scale-factor wording with a source-file comparison against the verified real-world reference, expressed as a percentage larger/smaller and the calculated original scale.
- Rewrote the beginner workflow around the actual archive journey: find a model, check source/preview, prepare scale/build-volume, finish in the users slicer.
- Added regression tests for collection naming, cross-listing detection/display, percentage wording and workflow copy. Expanded pull-request validation path filters so UI-only changes run the Node regression suite.
- CI and deployment status will be recorded after GitHub Actions completes; no browser interaction or deployment is claimed before confirmation.


### Final verification and publication — 27 November 2026

- Pull request #14 merged into `main` by squash merge: `07b460d229637fe5eed112e21661b33dc0cfb18b`.
- Final PR-head checks on `aed852f9addf7a8b3be197b4e0eca8c33485d198` passed: model-workspace regression run `46026736306`; catalogue validation run `46026736322`; complete source/model link audit run `46026737627`.
- Post-merge `main` checks on `07b460d229637fe5eed112e21661b33dc0cfb18b` passed: model-workspace run `46026811175`; catalogue validation run `46026811416`; complete link audit run `46026811146`.
- GitHub Pages build and deployment run `46026810918` completed successfully, including the `Deploy to GitHub Pages` step.
- A manual interactive browser review was not performed in this session. Automated CI and deployment success do not substitute for checking the live website at desktop and mobile breakpoints.
- P3 automation now covers the new UI/editorial acceptance cases as regression tests. Human review is still required for source meaning, licensing and scientific identity; the tests do not certify every future catalogue record automatically.


## 8. STL conversion beta label — 27 November 2026

- Marked both supported conversion entry points (the model detail header and the Scaling workspace upload row) with a visible **BETA** label.
- The label appears only when the corresponding conversion action is available and is hidden again when the model is cleared or does not support conversion.
- Added the caution text: “Conversion may not work for all models or file formats.” The conversion implementation, supported formats, browser-only processing and safety limits are unchanged.
- Added a regression test covering both labels, conditional visibility, explanatory tooltip and badge styling.
- This label communicates the current reliability limitation; it does not claim that every supported file has been tested.
- Implementation branch: `ui/stl-conversion-beta-2026-11-27`; safety branch: `backup/before-stl-beta-2026-11-27`, created from inspected `main` commit `49e5772c20179f6d115e8bd2f66e4b0c9d0a4e36`.
- Pull request #15 merged into `main` as `d8b71bab5468c8f07fa666c9687063f9850ddc45`.
- Pull-request model-workspace regression run `46028214156` passed; catalogue validation run `46028214200` passed, including Node regression tests, JSON/catalogue validation, catalogue unit tests, dimension scanner tests and audit generation; complete source/model link audit run `46028214141` passed.
- The regression test for the beta labels passed in both the dedicated model-workspace job and the validation workflow.
- Safety branch for this verification-record update: `backup/before-stl-beta-verification-record-2026-11-27`, created from inspected `main` commit `d8b71bab5468c8f07fa666c9687063f9850ddc45`.
- No manual interactive browser review or post-merge Pages deployment check was performed in this task; the merge is confirmed, but live visual publication is not claimed.


## 9. Enforced project-workflow record — 27 November 2026

### Pre-flight completed
- Inspected actual GitHub `main` head: `27ec0c89a990509b25b968e294accdaf6a5d52c6` (*Record STL conversion beta verification*), recent commits, open PRs (none), all visible backup branches and active feature/work branches.
- Created safety branch `backup/before-workflow-enforcement-2026-11-27` directly from that inspected main commit, without changing existing backups.
- Created implementation branch `chore/workflow-enforcement-2026-11-27` from the same commit.
- Read the repository handbook, README, editorial workflow, existing GitHub workflows, local project instructions and the available documentation search results.
- The separate BOGY project diary is recorded as residing in a personal Library outside this repository. It is not accessible from this task environment; it was not read, edited or synchronized, and no synchronization is claimed.

### Changes in this branch
- Added `SPACEMESHER_WORKFLOW_CHECKLIST.md`, a visible binding pre-flight/post-flight checklist for every project-specific response and change.
- Added `.github/pull_request_template.md` with five mandatory process attestations and evidence fields.
- Added `.github/workflows/enforce-project-workflow.yml`. On every pull request to `main`, it fails unless all five PR attestations are checked and `PROJECT_HANDBOOK.md` is changed in the same PR.
- Updated this handbook and README to point to the new process control.

### Verification and limit
- Reviewed the generated workflow, template and checklist against the intended conditions. CI execution is pending the pull request; it must not be reported as passed before GitHub Actions finishes.
- This CI job is a real automated failure condition for incomplete pull requests. To turn it into a merge block, a repository administrator must configure the GitHub branch protection/ruleset for `main` to require the **Enforce project workflow** status check. No branch-protection configuration was visible or modifiable through the available repository tools.
- The job cannot prove that a person actually read documents, inspected a remote state, or updated an inaccessible external diary. It records and checks the required attestation and same-PR handbook update only.

### Documentation, tests and rollback
- Accessible documentation updated and verified: `PROJECT_HANDBOOK.md`, `README.md`, `SPACEMESHER_WORKFLOW_CHECKLIST.md`, and the PR template.
- Not updated because inaccessible: the separate BOGY personal-Library diary.
- Automated tests: pending CI on this pull request; no application code changed. Workflow syntax has been reviewed but no local GitHub Actions runner is available.
- Rollback reference: `backup/before-workflow-enforcement-2026-11-27` at `27ec0c89a990509b25b968e294accdaf6a5d52c6`.

- Pull-request CI verified: **Enforce project workflow** run `46047333620` passed. Both its process-attestation step and its same-PR handbook-update step succeeded on PR #16.


## 10. Scaling modes — 27 November 2026

- The existing **Original astronomical scale** mode remains the source-backed workflow: verified physical dimensions determine the original denominator and standard printable scales.
- **Fit to build plate** is independent of astronomical dimensions. It scales loaded geometry proportionally to the maximum bounding-box fit across six axis-aligned 90° orientations, after applying the configured safety margin on every side (default 5 mm). The proportional adjustment defaults to 100%; lower values shrink the maximum-fit model and higher values deliberately test a larger model, with a no-fit warning when safe limits are exceeded.
- **Custom original dimensions** accepts one user-entered real-world measurement (diameter, length, height, longest axis or other) in mm, m or km. The user maps that measurement to the longest model axis or an explicit X/Y/Z mesh axis. The derived original denominator is then used by the existing standard-scale recommender; all other model axes remain proportional.
- Custom dimensions are user-supplied and are not represented as scientifically verified. The astronomical lookup panel is hidden outside Original mode.
- STL export uses the currently calculated geometry in all three modes. Fit mode exports a -fit-to-build-plate.stl file; original/custom modes retain the selected 1-to-N filename convention. Fit mode tests six axis-aligned 90° orientations, but the exported STL retains the source orientation; the user may need to rotate it in the slicer to match the reported best orientation.
- Regression coverage is added for fit factors, safety margins, proportional adjustment, custom axis mapping and mode UI. The bounding-box result still does not certify wall thickness, supports, bed adhesion or printability.
- Implementation branch: feat/scaling-modes-2026-11-27; safety branch: backup/before-scaling-modes-2026-11-27, both based on inspected main commit ab9508c82bf77f178ca7a794be5c352d79daf13e.

- Pull request #18: https://github.com/Tymses/space-model-archive/pull/18. Implementation commit before this verification-record update: 7e65787c7f2ccce8da113388f69a53bae38a0d62.
- PR-head checks on that implementation commit passed: model-workspace regression suite (24/24 tests; run 46052035631), catalogue/application validation (run 46052035623), full source/model URL audit (run 46052035624), and Enforce project workflow (run 46052035629).
- An earlier test attempt exposed incorrectly escaped newline delimiters in the two helper-extraction tests. The tests were corrected; the final model-workspace run passed all 24 tests.
- The README paragraph break was corrected and verified before these final checks. No manual desktop/mobile browser review was performed. Automated tests verify the calculation helpers and UI hooks, not interactive rendering or slicer behavior.


## 11. Scaling modes merge and post-merge verification — 27 November 2026

- Pull request #18 was squash-merged into main as commit 9c6acd8915f71a991802979ad27862f78a771370.
- Post-merge main head was read back and matched the merge commit exactly.
- Post-merge checks passed: model-workspace regression suite (run 46052230611), catalogue/application validation (run 46052230800), full source/model URL audit (run 46052230543), GitHub Pages build (run 46052229473, build job 140686124352) and the Deploy to GitHub Pages job in that run (job 140686276470).
- The successful Pages deployment is confirmed by the completed Deploy to GitHub Pages step. No manual interactive desktop/mobile browser review was performed.
- Documentation-only follow-up branch: docs/scaling-modes-merge-record-2026-11-27. Safety branch: backup/after-scaling-modes-merge-2026-11-27, created from verified main commit 9c6acd8915f71a991802979ad27862f78a771370.


## 12. STL conversion memory guards — 27 November 2026

### Pre-flight
- Re-read this handbook and the README conversion section. Inspected actual `main` head `9edf7c70503b3cc7787f6097c54a4326c88b30f8`, recent history, open PRs, relevant backup branches, current conversion implementation in `app.js`, conversion UI in `index.html`, model-workspace tests and the Cloudflare asset proxy.
- Existing open PR #17 is unrelated documentation work and was left untouched. Its required process-attestation check is currently failing because its final checkbox wording does not match the current workflow's required wording; see the PR check rather than treating it as passed.
- Created `backup/before-conversion-memory-guards-2026-11-27` and `fix/conversion-memory-guards-2026-11-27` from the inspected `main` commit above.

### Findings and implementation
- The existing 75 MB local-file and Worker response limits applied to compressed GZIP STEP bytes, but decompression used `Response.arrayBuffer()` without bounding the expanded output. A highly compressed STEP package could therefore expand far beyond the documented browser memory limit.
- STL conversion checked the 75 MB output size only after `STLExporter.parse()` had allocated the complete binary STL. The 5-million-triangle limit alone permits an estimated binary STL of about 250 MB, so the output guard did not prevent the allocation it was intended to protect.
- Added bounded stream collection for GZIP decompression. The reader cancels as soon as uncompressed bytes exceed 75 MB; uncompressed STEP buffers are also checked against the same limit.
- Added a binary STL size estimator (`84 + 50 × triangle count`) and a mesh triangle counter. The converter now rejects scenes over the triangle limit or estimated 75 MB output limit before calling `STLExporter`; the actual output size remains checked after export as a final guard.
- Existing supported formats, loader selection, conversion action placement, browser-local processing and conversion workflow are unchanged.

### Documentation and verification
- Updated `README.md` conversion safeguards section and added regression tests for bounded stream reads, overflow cancellation, binary STL size thresholds and pre-export guard ordering.
- Automated validation is pending the pull request. No local Node runtime or browser interaction was available through the GitHub repository tools in this task; do not claim these new tests passed until CI reports success.
- Manual testing of representative FBX, 3DS, LWO, BLEND, STEP and GZIP STEP files remains separate from automated checks. No live desktop/mobile browser review is claimed.
- Safety branch: `backup/before-conversion-memory-guards-2026-11-27` at inspected `main` commit `9edf7c70503b3cc7787f6097c54a4326c88b30f8`.
- Implementation branch: `fix/conversion-memory-guards-2026-11-27`.


## 13. Blender mesh fidelity and button feedback — 27 November 2026

### Pre-flight
- Read this handbook, the workflow checklist, PR template and README conversion notes. Inspected `main` at `daed045b9267934e5574bad301f20e7ff45403bb`, recent commits, and the relevant converter backup branch `backup/before-conversion-memory-guards-2026-11-27`. The Blender importer matched the inspected pre-memory-guard version; the latest memory-guard commit changed only STEP decompression and STL output limits.
- Created safety branch `backup/before-blend-geometry-and-button-feedback-2026-11-27` and implementation branch `fix/blend-geometry-and-button-feedback-2026-11-27` from that exact main commit.
- The separate BOGY diary was located in the personal Library, but this repository task does not edit that separate file. No external-diary synchronization is claimed.

### Confirmed code-level defects and changes
- The modern Blender importer previously accepted any vertex CustomData layer whose item count matched `totvert`, and any loop layer whose count matched `totloop`. Those counts are not unique to geometry: attributes such as `orig_index`, `radius`, `corner_edge` or UV layers can have the same length. If the canonical `position` or `.corner_vert` layer was absent or not selected, the importer could build positions/indices from unrelated attributes and emit a geometrically incorrect mesh. The importer now requires the canonical position and corner-vertex layers (with known naming variants) and fails explicitly when they are missing or malformed.
- The legacy Blender triangulator allocated `floor(3n/2)` indices per polygon and stepped through corners in increments of two. This does not equal the correct `3(n-2)` indices for an n-gon: triangles received trailing degenerate indices and polygons with five or more corners could lose geometry. It now triangulates each polygon as a fan with exactly `n-2` triangles, validates loop/vertex references and coordinates, and allocates the exact index count.
- The BLEND loading path now requires at least one actual mesh and one triangle before presenting the model as loaded. It fails explicitly rather than allowing an empty/non-mesh scene to be mistaken for a valid preview.
- Added a shared delegated click-feedback animation for native buttons and button-like upload/action controls. It provides a brief scale pulse after activation and respects `prefers-reduced-motion`.

### Tests and documentation
- Added regression tests for strict modern attribute-layer selection, legacy triangle counts, rejection of BLEND scenes without mesh triangles, and global button feedback.
- Updated README conversion notes and this handbook. The separate BOGY Library diary was not edited.
- Automated tests and GitHub Actions validation are pending; no test success or live browser verification is claimed until the PR checks and a manual browser test are completed.
- Rollback reference: `backup/before-blend-geometry-and-button-feedback-2026-11-27` at `daed045b9267934e5574bad301f20e7ff45403bb`.
- Implementation branch: `fix/blend-geometry-and-button-feedback-2026-11-27`.


### Post-merge verification — 27 November 2026
- Pull request #21 was squash-merged into `main` as `e86b7e35c9a4404ff7b901bc5d2ba6b297f9b51d`.
- PR-head model-workspace regression suite passed all 31 tests (run `46064694914`); this includes the four new Blender and button-feedback tests.
- PR-head catalogue/application validation passed (run `46064695162`), the complete source/model link audit passed (run `46064694916`), and the mandatory project-workflow check passed (run `46064695011`).
- Read-back from `main` confirmed that the importer, application code, styles, tests, README and handbook match the merged PR contents.
- The NASA source record for Mars 2020 Perseverance Rover points to the original NASA/JPL Blender file. The binary `.blend` could not be downloaded through the available GitHub file connector (it returned no binary content), so no claim is made that this exact 20.92 MB file was manually converted or visually compared after the fix. The regression suite validates the importer logic, not this specific external binary.
- No post-merge GitHub Pages deployment run or interactive browser verification was available in the recorded workflow results. The live preview and actual rover appearance still require a manual browser check after the published site updates.
- Documentation follow-up branch: `docs/blend-fix-verification-record-2026-11-27`; safety branch: `backup/before-blend-verification-record-2026-11-27`, created from merge commit `e86b7e35c9a4404ff7b901bc5d2ba6b297f9b51d`.


## 14. Blender file diagnostics and partial scene recovery — 27 November 2026

### Pre-flight and rollback
- Re-read the current handbook, `SPACEMESHER_WORKFLOW_CHECKLIST.md`, README conversion notes and PR template. Read the available BOGY project diary from the personal Library; it distinguishes proposed conversion workflows from empirically verified file conversions and requires a concrete import/export test before claiming one.
- Inspected the actual `main` head `c224afb76b21e81de0e7a5742b7e443bc9fca6dc`, the latest commits, all visible backup branches, the existing Blender implementation/verification branches and open pull requests (none).
- Read the complete current `vendor/blend-importer.js`, `vendor/blend-parser.js`, `app.js`, `tests/model-workspace.test.mjs`, the relevant Cloudflare asset proxy code, `index.html`, README, validation workflow and workflow-enforcement files.
- Created safety branch `backup/before-blend-diagnostics-2026-11-27` and implementation branch `fix/blend-diagnostics-and-safe-mesh-recovery-2026-11-27` from the exact inspected main commit above.
- The separate BOGY diary was read but not edited. No external-diary synchronization is claimed.

### Findings and implementation
- The previous loader accepted any response body as a potential Blender file and delegated format detection to the parser. It did not expose the Blender header version or distinguish a returned HTML/error page from a binary model file.
- The importer now validates the 12-byte `BLENDER` header, pointer-width marker, byte-order marker and version code. It reports the detected Blender version and explicitly rejects big-endian files because the existing geometry reader assumes little-endian data.
- Input files are limited to 75 MB. GZIP decompression is streamed and cancelled if the expanded file exceeds 75 MB. Zstandard decompression is checked against the same expanded-size limit after decompression; this post-check does not prevent the Zstandard library from allocating the decompressed output first.
- Parser errors are reset between imports so one malformed file does not leave a stale error state for the next file. Invalid signatures, HTML/error responses, oversized downloads, decompression failures, unsupported byte order, parser failures and scenes without valid mesh triangles now have distinct diagnostic codes/messages.
- Mesh objects are isolated during scene construction: if one mesh object is malformed, it can be skipped while valid mesh objects from the same scene remain available. The UI reports how many meshes loaded and how many were skipped, with diagnostic examples. If no valid triangle mesh remains, loading stops with the mesh diagnostics.
- No missing faces, indices or topology are fabricated. Existing canonical geometry-layer checks and legacy polygon triangulation remain in place. Complex/unsupported scenes are directed to Blender for export to GLB or STL.

### Files changed
- `vendor/blend-importer.js`: header inspection, bounded GZIP decompression, Zstandard output-size check, parser error classification, version reporting and per-mesh skip callback.
- `vendor/blend-parser.js`: reset parser error state at the beginning of each parse.
- `app.js`: response-size checks, version/mesh diagnostics and BLEND-specific failure guidance.
- `tests/model-workspace.test.mjs`: header validation, compressed-file limits, parser reset and partial-import regression coverage.
- `README.md`: current Blender support behavior and limits.

### Verification status and limitations
- Initial PR validation runs `46066188896` (catalogue/application validation), `46066188915` (model-workspace tests) and `46066188953` (link audit) failed at the Node regression-test step. The same three test failures were repeated across the workflows: the old empty-scene assertion still expected the previous error text, the GZIP test expected single quotes after the implementation changed to double quotes, and the HTML fixture was shorter than the 12-byte header precondition. The implementation was not the reported cause of those assertions. The test assertions/fixture were corrected in later commits on the PR branch. No successful rerun for the latest PR head has been returned yet, so the current revision is unverified by CI and must not be described as passing.
- No local Node runtime or local browser was used in this task. The exact NASA Perseverance `.blend` binary was not retrieved or converted; the prior verification record explains the binary access limitation. No visual comparison of the rover model or live browser verification is claimed.
- Header validation confirms file-container identity and reports its version; it does not prove that every Blender release, datablock layout, modifier, dependency or scene feature is supported.
- GZIP expanded data is bounded while streaming. Zstandard output is checked only after the decompressor returns, so a highly compressed Zstandard input can still allocate memory before the post-check.
- Rollback reference: `backup/before-blend-diagnostics-2026-11-27` at `c224afb76b21e81de0e7a5742b7e443bc9fca6dc`.
- Implementation branch: `fix/blend-diagnostics-and-safe-mesh-recovery-2026-11-27`.

## 15. Automatic merge and publication policy — 27 November 2026

This is the user's standing instruction for SPACEMESHER implementation work:

1. For every approved implementation, complete the documented pre-flight, create a safety backup from the inspected current `main`, and work on a separate implementation branch and pull request.
2. Do not ask the user again whether to merge a completed implementation. Once the exact PR head has passed all applicable required checks (including **Enforce project workflow**, model-workspace tests, catalogue/application validation and link audit where triggered), the PR is mergeable, and the final diff has been reviewed, merge it into `main` automatically. Use the expected head SHA to prevent merging a branch that changed after review.
3. After merge, read back `main` and confirm it points to the merge commit. Then verify the GitHub Pages build and the **Deploy to GitHub Pages** job for that exact commit.
4. Say **published/live** only after the deployment job has completed successfully. A successful PR check or merge alone is not proof of publication. If deployment is pending, report that publication is pending; if it fails, investigate and repair before claiming success.
5. After each implementation, update this handbook and relevant technical documentation in the same implementation PR. Record PR/merge commit, exact CI run IDs and deployment result. If a separate documentation-only record is necessary, follow the same backup/PR/check/merge/deploy discipline.
6. Keep browser/manual verification distinct from CI and deployment. Do not claim the real-world model conversion or live interaction was tested unless it was actually exercised.

This standing policy does not authorize merging when checks fail, the diff is unsafe or unclear, the PR head changes unexpectedly, or required evidence is unavailable. In those cases stop, explain the blocker and continue only after it is resolved.

### Policy-record change

- User explicitly requested that this automatic merge-and-publication workflow be followed for future SPACEMESHER changes and that this handbook be updated.
- Safety branch: `backup/before-auto-publish-policy-2026-11-27`, created from inspected `main` commit `5d936894bcd3b357b3ee0ab553c4a57dbca2eb16`.
- Documentation branch: `docs/automatic-merge-and-publication-policy-2026-11-27`, created from the same commit.
- This change documents the workflow only; it does not change application code. CI and Pages deployment for this documentation PR must be checked before reporting it as merged or published.


## 16. CI checkbox matcher correction — 27 November 2026

- Root cause: `.github/workflows/enforce-project-workflow.yml` searched for attestation strings containing literal backslashes before Markdown backticks. The pull-request template and correctly completed PR bodies contain ordinary Markdown backticks without those backslashes. Therefore the attestation step failed even when all five required boxes were checked. This was introduced by the new workflow-enforcement CI; it was not a pre-existing application or Blender test failure.
- Fixed the five required attestation strings to match the exact Markdown text in `.github/pull_request_template.md`; the workflow still requires all five checked boxes and a same-PR `PROJECT_HANDBOOK.md` change.
- No application code, Blender importer, converter behavior, or unrelated CI jobs were changed.
- Backup branch: `backup/before-workflow-checkbox-ci-fix-2026-11-27`, created from inspected `main` commit `524263a57f3327eafb796dde2e665bd9006e943a`.
- Implementation branch: `fix/workflow-checkbox-matching-2026-11-27`.
- Changed files: `.github/workflows/enforce-project-workflow.yml`, `PROJECT_HANDBOOK.md`.
- Previous failing run: `46068626601` on PR #24; the **Require the process attestation** step failed and checkout/handbook check were skipped.
- Verification: PR-head workflow run `46070228527` passed. The **Require the process attestation** step and **Require handbook update in the same PR** step both completed successfully. The run covered the corrected matcher and same-PR handbook requirement; no application test suite was triggered because this PR changes only the workflow and handbook. GitHub Pages deployment remains pending until merge.
- Rollback reference: `backup/before-workflow-checkbox-ci-fix-2026-11-27` at `524263a57f3327eafb796dde2e665bd9006e943a`.


## 17. Blender scene geometry selection — 27 November 2026

### User-reported defect and investigation
- The user supplied a screenshot of the NASA **InSight Cruise Stage (final)** Blender model after browser conversion. The preview contained large inverted text geometry crossing the spacecraft, and the reported bounding dimensions were approximately 25,885.846 × 12,732.971 × 34,735.645 mm. This is direct evidence that the imported scene bounds include geometry unrelated to the intended printable spacecraft.
- The official NASA repository tree was inspected. It contains both `InSight Cruise Stage (final).blend` (21,801,160 bytes) and `InSight Cruise Stage.blend` (6,065,288 bytes), plus corresponding preview PNGs. The binary itself could not be read by the available GitHub text connector or web cache in this task; no claim is made that the exact NASA binary was locally parsed or visually regression-tested.
- The existing importer creates a Three.js object for every Blender mesh object and includes every one in the preview/export bounds. It had no exclusion policy for Blender text/annotation meshes.

### Implementation
- Added a conservative whole-name classifier for mesh objects named exactly like common scene annotations (Text, Label, Annotation, Caption, Title, Legend, Dimension, Scale Bar, Watermark or Copyright, including Blender numeric suffixes).
- These likely annotation meshes are excluded from printable scene geometry by default and reported separately to the user. Other mesh objects are preserved.
- Added an explicit importer option `excludeAnnotations: false` to retain all meshes when a user needs the original scene content.
- Updated the browser conversion status to report the count of excluded text/label meshes.
- This is a targeted mitigation for the demonstrated class of scene contamination, not a complete Blender runtime. Modifiers, linked libraries, geometry nodes, fonts not converted to mesh, and other unsupported Blender scene behavior are not evaluated by the current parser.

### Verification and limits
- Added regression tests for conservative object-name matching, avoiding substring false positives, explicit opt-out and UI diagnostics.
- No local Node runtime, Blender executable or binary fixture could be run in this environment. GitHub Actions must validate the code and tests; the exact NASA binary still requires an end-to-end import/visual comparison in a browser.
- Safety branch: `backup/before-blend-scene-filtering-2026-11-27`, created from inspected `main` commit `9a6681ddc239bb72878c7193fc29b1db8b5c486c`.
- Implementation branch: `fix/blend-scene-geometry-selection-2026-11-27`.
- Rollback: restore the implementation branch to the safety-branch commit; no changes were made to the NASA source files or catalogue records.
