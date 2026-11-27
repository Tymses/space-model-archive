import bpy
import json
import os
import sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
if not args:
    raise RuntimeError("Expected output STL path after --")
output_path = args[0]
scene = bpy.context.scene
depsgraph = bpy.context.evaluated_depsgraph_get()
mesh_objects = [obj for obj in scene.objects if obj.type == "MESH"]
if not mesh_objects:
    raise RuntimeError("Native Blender found no mesh objects")

minimum = [float("inf")] * 3
maximum = [float("-inf")] * 3
details = []
for obj in mesh_objects:
    evaluated = obj.evaluated_get(depsgraph)
    corners = [evaluated.matrix_world @ Vector(corner) for corner in evaluated.bound_box]
    lo = [min(point[i] for point in corners) for i in range(3)]
    hi = [max(point[i] for point in corners) for i in range(3)]
    size = [hi[i] - lo[i] for i in range(3)]
    for i in range(3):
        minimum[i] = min(minimum[i], lo[i])
        maximum[i] = max(maximum[i], hi[i])
    details.append({"name": obj.name, "dimensions": size, "vertices": len(evaluated.data.vertices), "polygons": len(evaluated.data.polygons)})
details.sort(key=lambda item: item["dimensions"][0] * item["dimensions"][1] * item["dimensions"][2], reverse=True)
scene_units = {
    "system": scene.unit_settings.system,
    "scale_length": scene.unit_settings.scale_length,
    "length_unit": scene.unit_settings.length_unit,
}
for obj in bpy.context.selected_objects:
    obj.select_set(False)
for obj in mesh_objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = mesh_objects[0]
if hasattr(bpy.ops.wm, "stl_export"):
    bpy.ops.wm.stl_export(filepath=output_path, export_selected_objects=True)
elif hasattr(bpy.ops.export_mesh, "stl"):
    bpy.ops.export_mesh.stl(filepath=output_path, use_selection=True)
else:
    raise RuntimeError("This Blender build has no STL export operator")
if not os.path.isfile(output_path) or os.path.getsize(output_path) <= 84:
    raise RuntimeError("Native Blender STL export is empty or invalid")
result = {
    "status": "NATIVE_BLENDER_STL_OK",
    "version": bpy.app.version_string,
    "mesh_objects": len(mesh_objects),
    "scene_units": scene_units,
    "bounds": [maximum[i] - minimum[i] for i in range(3)],
    "largest_objects": details[:20],
    "stl_bytes": os.path.getsize(output_path),
}
print("SPACEMESHER_NATIVE_BLENDER_RESULT=" + json.dumps(result, sort_keys=True))
