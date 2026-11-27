import bpy
import json
import os
import re
import sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
if not args:
    raise RuntimeError("Expected output STL path after --")
output_path = args[0]
scene = bpy.context.scene
bpy.context.view_layer.update()
depsgraph = bpy.context.evaluated_depsgraph_get()
mesh_objects = [obj for obj in scene.objects if obj.type == "MESH"]
visible_mesh_objects = [obj for obj in mesh_objects if obj.visible_get()]
visible_details = [{"name":obj.name,"hide_viewport":obj.hide_viewport,"hide_render":obj.hide_render,"hide_get":obj.hide_get(),"visible":obj.visible_get(),"collections":[c.name for c in obj.users_collection]} for obj in mesh_objects]
hidden_details = [item for item in visible_details if not item["visible"]]
annotation_name = re.compile(r"^(?:text|3d[._ -]?text|label|annotation|caption|title|legend|dimension(?:s)?|scale(?:[._ -]?bar)?|logo|brand|watermark|copyright|credit)(?:[._ -]?\d+)?$", re.I)
environment_name = re.compile(r"^(?:ground[._ -]?and[._ -]?sky[._ -]?dome|sky[._ -]?dome|world[._ -]?background)$", re.I)
printable_objects = [obj for obj in mesh_objects if not (
    (obj.parent and obj.parent.type == "CAMERA") or
    annotation_name.match(obj.name) or environment_name.match(obj.name) or
    (obj.data and (annotation_name.match(obj.data.name) or environment_name.match(obj.data.name)))
)]
if not mesh_objects:
    raise RuntimeError("Native Blender found no mesh objects")

minimum = [float("inf")] * 3
maximum = [float("-inf")] * 3
raw_minimum = [float("inf")] * 3
raw_maximum = [float("-inf")] * 3
details = []
for obj in printable_objects:
    evaluated = obj.evaluated_get(depsgraph)
    corners = [evaluated.matrix_world @ Vector(corner) for corner in evaluated.bound_box]
    lo = [min(point[i] for point in corners) for i in range(3)]
    hi = [max(point[i] for point in corners) for i in range(3)]
    size = [hi[i] - lo[i] for i in range(3)]
    for i in range(3):
        minimum[i] = min(minimum[i], lo[i])
        maximum[i] = max(maximum[i], hi[i])
    for vertex in obj.data.vertices:
        point = obj.matrix_world @ vertex.co
        for i in range(3):
            raw_minimum[i] = min(raw_minimum[i], point[i])
            raw_maximum[i] = max(raw_maximum[i], point[i])
    details.append({"name": obj.name, "dimensions": size, "vertices": len(evaluated.data.vertices), "polygons": len(evaluated.data.polygons)})
details.sort(key=lambda item: item["dimensions"][0] * item["dimensions"][1] * item["dimensions"][2], reverse=True)
for obj in printable_objects:
    obj.data.calc_loop_triangles()
native_totals = {
    "vertices": sum(len(obj.data.vertices) for obj in printable_objects),
    "polygons": sum(len(obj.data.polygons) for obj in printable_objects),
    "loop_triangles": sum(len(obj.data.loop_triangles) for obj in printable_objects),
}
target_names = {"deck","panel_l_root","Cube.046","arm_03.001","cable_02","arm_01_b","logo_NASA_JPL","ground_and_sky_dome","roll_pressure_inlet","roll_grapple","roll_RISE Antenna","roll_solar_panels"}
selected_details = []
for obj in mesh_objects:
    if obj.name in target_names:
        selected_details.append({
            "name": obj.name,
            "dimensions": list(obj.dimensions),
            "scale": list(obj.scale),
            "location": list(obj.location),
            "matrix_world": [list(row) for row in obj.evaluated_get(depsgraph).matrix_world],
            "matrix_parent_inverse": [list(row) for row in obj.matrix_parent_inverse],
            "parent": obj.parent.name if obj.parent else None,
            "data": obj.data.name if obj.data else None,
            "vertices": len(obj.data.vertices),
            "polygons": len(obj.data.polygons)
        })
scene_units = {
    "system": scene.unit_settings.system,
    "scale_length": scene.unit_settings.scale_length,
    "length_unit": scene.unit_settings.length_unit,
}
for obj in bpy.context.selected_objects:
    obj.select_set(False)
for obj in printable_objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = printable_objects[0]
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
    "visible_mesh_objects": len(visible_mesh_objects),
    "visibility_samples": visible_details[:50],
    "hidden_objects": hidden_details,
    "native_totals": native_totals,
    "printable_objects": len(printable_objects),
    "excluded_presentation_objects": len(mesh_objects) - len(printable_objects),
    "scene_units": scene_units,
    "bounds": [maximum[i] - minimum[i] for i in range(3)],
    "raw_bounds": [raw_maximum[i] - raw_minimum[i] for i in range(3)],
    "largest_objects": details[:20],
    "selected_objects": selected_details,
    "stl_bytes": os.path.getsize(output_path),
}
print("SPACEMESHER_NATIVE_BLENDER_RESULT=" + json.dumps(result, sort_keys=True))
