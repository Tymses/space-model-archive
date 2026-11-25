import importlib.util
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "audit_catalogue.py"
SPEC = importlib.util.spec_from_file_location("audit_catalogue", SCRIPT)
AUDIT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(AUDIT)


class CatalogueAuditTests(unittest.TestCase):
    def test_direct_mesh_is_distinguished(self):
        self.assertEqual(AUDIT.classify({"file": "https://example.org/model.glb"}), "direct-model-file")

    def test_catalogue_page_is_not_a_download(self):
        self.assertEqual(AUDIT.classify({
            "file": "https://example.org/asteroids/2",
            "downloadDirect": False,
        }), "catalogue-reference")

    def test_archive_is_not_a_single_mesh(self):
        self.assertEqual(AUDIT.classify({"file": "https://example.org/shapes.zip"}), "dataset-archive")

    def test_numbered_designation_is_a_stable_key(self):
        self.assertEqual(AUDIT.stable_object_key({"name": "(25143) Itokawa"}), "minor-planet:25143")

    def test_unmarked_names_are_not_fuzzy_matched(self):
        self.assertIsNone(AUDIT.stable_object_key({"name": "Itokawa"}))


if __name__ == "__main__":
    unittest.main()
