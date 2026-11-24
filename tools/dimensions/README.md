# Automated dimension research

This first scanner covers the 256 numbered asteroids in `data/asteroid-curated-index.json`.

## Run locally

Requires Python 3.10+ and no third-party packages:

```bash
python -m unittest discover -s tools/dimensions -v
python tools/dimensions/scan_asteroids.py
```

To test a short batch:

```bash
python tools/dimensions/scan_asteroids.py --limit 5
```

## Automation

GitHub Actions runs the scanner weekly and can also be started manually from **Actions → Discover asteroid dimensions → Run workflow**. It queries the JPL Small-Body Database API and writes `data/real-world-dimension-candidates.json`.

## Safety rules

- The model's numbered asteroid designation must match the JPL response exactly.
- Only a parseable JPL `extent` with two or three axes can become a longest-axis candidate.
- An effective `diameter` is recorded separately and is never converted into `longestAxisKm`.
- Existing verified numbered-asteroid dimensions are skipped.
- API errors and unmatched objects are retained in the report.
- The scanner never edits `data/real-world-dimensions.json`. Candidate records require human review before promotion.

The JPL SBDB API documents physical parameters and the `extent` field as tri-/bi-axial body dimensions in kilometres:
https://ssd-api.jpl.nasa.gov/doc/sbdb.html
https://ssd-api.jpl.nasa.gov/doc/sbdb_filter.html
