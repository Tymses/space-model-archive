#!/usr/bin/env python3
import json
import math
import struct
import sys
from pathlib import Path

stl_path = Path(sys.argv[1])
result_path = Path(sys.argv[2])
data = stl_path.read_bytes()
result = json.loads(result_path.read_text(encoding="utf-8"))

if len(data) < 84:
    raise SystemExit("STL is shorter than the 84-byte binary header")
triangle_count = struct.unpack_from("<I", data, 80)[0]
expected_length = 84 + triangle_count * 50
if len(data) != expected_length:
    raise SystemExit(f"Binary STL length mismatch: {len(data)} != {expected_length}")
if triangle_count != int(result["triangles"]):
    raise SystemExit(f"Triangle count mismatch: {triangle_count} != {result['triangles']}")
if len(data) != int(result["stlBytes"]):
    raise SystemExit(f"STL byte count mismatch: {len(data)} != {result['stlBytes']}")

minimum = [math.inf, math.inf, math.inf]
maximum = [-math.inf, -math.inf, -math.inf]
degenerate = 0
for index in range(triangle_count):
    offset = 84 + index * 50
    values = struct.unpack_from("<12fH", data, offset)
    normal = values[:3]
    vertices = (values[3:6], values[6:9], values[9:12])
    if not all(math.isfinite(value) for value in values[:12]):
        raise SystemExit(f"Non-finite normal/vertex in triangle {index}")
    a, b, c = vertices
    ab = [b[i] - a[i] for i in range(3)]
    ac = [c[i] - a[i] for i in range(3)]
    cross = [ab[1] * ac[2] - ab[2] * ac[1],
             ab[2] * ac[0] - ab[0] * ac[2],
             ab[0] * ac[1] - ab[1] * ac[0]]
    if sum(component * component for component in cross) <= 1e-20:
        degenerate += 1
    for vertex in vertices:
        for axis in range(3):
            minimum[axis] = min(minimum[axis], vertex[axis])
            maximum[axis] = max(maximum[axis], vertex[axis])

size_mm = [(maximum[i] - minimum[i]) * 1000 for i in range(3)]
expected_size = result["sizeMm"]
bounds_error = max(abs(size_mm[i] - expected_size[i]) for i in range(3))
print(json.dumps({
    "status": "BINARY_STL_VALIDATED",
    "bytes": len(data),
    "triangles": triangle_count,
    "degenerate_triangles": degenerate,
    "size_mm": size_mm,
    "expected_size_mm": expected_size,
    "bounds_error_mm": bounds_error,
}))
if degenerate:
    raise SystemExit(f"Binary STL contains {degenerate} degenerate triangles")
if bounds_error > 0.01:
    raise SystemExit(f"STL vertex bounds differ from importer dimensions by {bounds_error:.6f} mm")
