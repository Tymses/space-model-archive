import unittest

from scan_asteroids import asteroid_number, build_candidate, parse_axes_km


class DimensionScannerTests(unittest.TestCase):
    def test_extracts_numbered_asteroid(self):
        self.assertEqual(asteroid_number("(101955) Bennu"), "101955")
        self.assertIsNone(asteroid_number("Bennu"))

    def test_parses_three_axes(self):
        axes = parse_axes_km("565 x 535 x 508", "m")
        self.assertEqual(len(axes), 3)
        for actual, expected in zip(axes, [0.565, 0.535, 0.508]):
            self.assertAlmostEqual(actual, expected, places=12)

    def test_does_not_treat_diameter_as_longest_axis(self):
        model = {"id": "3dac-asteroid-101955", "name": "(101955) Bennu"}
        payload = {
            "object": {"des": "101955", "kind": "an", "fullname": "(101955) Bennu"},
            "phys_par": [{"name": "diameter", "value": 0.49, "units": "km"}],
        }
        candidate = build_candidate(model, payload, "2026-11-24T00:00:00+00:00")
        self.assertEqual(candidate["status"], "diameter_only")
        self.assertNotIn("longestAxisKm", candidate)

    def test_requires_exact_designation(self):
        model = {"id": "3dac-asteroid-101955", "name": "(101955) Bennu"}
        payload = {
            "object": {"des": "101956", "kind": "an"},
            "phys_par": [{"name": "extent", "value": "565 x 535 x 508", "units": "m"}],
        }
        self.assertIsNone(build_candidate(model, payload, "2026-11-24T00:00:00+00:00"))


if __name__ == "__main__":
    unittest.main()
