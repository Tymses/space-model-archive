import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
import parser from "./blend-parser.js";
/**
 * Client-side .blend importer.
 *
 * Binary parsing by js.blend (MIT, (c) 2020 Anthony C. Weathersby),
 * object construction adapted from @threepipe/plugin-blend-importer (MIT),
 * ported to vanilla three.js.
 */

const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd]
const GZIP_MAGIC = [0x1f, 0x8b]
export const MAX_BLEND_BYTES = 75 * 1024 * 1024

export function inspectBlendHeader(buffer) {
    if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 12) {
        throw new Error("BLEND_INVALID_HEADER: The download is empty or too short to contain a Blender file header.")
    }
    const bytes = new Uint8Array(buffer, 0, 12)
    const magic = String.fromCharCode(...bytes.subarray(0, 7))
    if (magic !== "BLENDER") {
        const prefix = String.fromCharCode(...bytes.subarray(0, Math.min(4, bytes.length)))
        if (prefix.startsWith("<!DO") || prefix.startsWith("<htm") || prefix.startsWith("<?xm")) {
            throw new Error("BLEND_NOT_A_FILE: The source returned a web page or error document instead of a .blend file.")
        }
        throw new Error("BLEND_INVALID_HEADER: The file does not contain the BLENDER signature. The download may be incomplete or the URL may not point to a direct .blend file.")
    }
    const pointerMarker = String.fromCharCode(bytes[7])
    const endianMarker = String.fromCharCode(bytes[8])
    const version = String.fromCharCode(...bytes.subarray(9, 12))
    if (!["_", "-"].includes(pointerMarker) || !["v", "V"].includes(endianMarker) || !/^\d{3}$/.test(version)) {
        throw new Error("BLEND_INVALID_HEADER: The Blender header contains an unsupported pointer, byte-order or version marker.")
    }
    return { version: version[0] + "." + String(Number(version.slice(1))), versionCode: version, pointerSize: pointerMarker === "_" ? 4 : 8, endian: endianMarker === "V" ? "big" : "little" }
}

async function readLimitedStream(stream, limit) {
    const reader = stream.getReader()
    const chunks = []
    let total = 0
    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            total += value.byteLength
            if (total > limit) {
                await reader.cancel("BLEND decompressed-size limit exceeded")
                throw new Error("BLEND_TOO_LARGE: The decompressed Blender file exceeds the 75 MB browser limit.")
            }
            chunks.push(value)
        }
    } finally {
        reader.releaseLock()
    }
    const output = new Uint8Array(total)
    let offset = 0
    for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.byteLength }
    return output.buffer
}

export async function parseBlend(buffer, name = '') {
    if (!(buffer instanceof ArrayBuffer) || !buffer.byteLength) throw new Error("BLEND_EMPTY: The source returned an empty file.")
    if (buffer.byteLength > MAX_BLEND_BYTES) throw new Error("BLEND_TOO_LARGE: The Blender file exceeds the 75 MB browser limit.")
    let data = buffer
    const magic = new Uint8Array(buffer, 0, Math.min(4, buffer.byteLength))
    const isZstd = ZSTD_MAGIC.every((b, i) => magic[i] === b)
    const isGzip = GZIP_MAGIC.every((b, i) => magic[i] === b)
    if (isZstd) {
        try {
            const { decompress } = await import("https://esm.sh/fzstd@0.1.1")
            const decompressed = decompress(new Uint8Array(buffer))
            if (decompressed.byteLength > MAX_BLEND_BYTES) throw new Error("BLEND_TOO_LARGE: The decompressed Blender file exceeds the 75 MB browser limit.")
            data = decompressed.buffer.slice(decompressed.byteOffset, decompressed.byteOffset + decompressed.byteLength)
        } catch (error) {
            if (String(error?.message || error).includes("BLEND_TOO_LARGE")) throw error
            throw new Error("BLEND_DECOMPRESSION_FAILED: The Zstandard-compressed Blender file could not be decompressed. " + (error?.message || String(error)))
        }
    } else if (isGzip) {
        try {
            if (typeof DecompressionStream !== "function") throw new Error("This browser does not support GZIP decompression.")
            data = await readLimitedStream(new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip")), MAX_BLEND_BYTES)
        } catch (error) {
            if (String(error?.message || error).includes("BLEND_TOO_LARGE")) throw error
            throw new Error("BLEND_DECOMPRESSION_FAILED: The GZIP-compressed Blender file could not be decompressed. " + (error?.message || String(error)))
        }
    }
    const header = inspectBlendHeader(data)
    if (header.endian !== "little") throw new Error("BLEND_UNSUPPORTED_ENDIAN: This importer currently supports little-endian Blender files only.")
    return new Promise((resolve, reject) => {
        parser.onParseReady = (file, error) => {
            if (!file || error) reject(new Error("BLEND_PARSE_FAILED: " + (error ?? "The Blender parser returned no scene data.")))
            else resolve({ file, header })
        }
        try {
            parser.loadBlendFromArrayBuffer(data, name)
        } catch (error) {
            reject(new Error("BLEND_PARSE_FAILED: " + (error?.message || String(error))))
        }
    })
}

const BLEND_OBJECT_TYPES = { empty: 0, mesh: 1, lamp: 10, camera: 11 }
const BLEND_LIGHT_TYPES = { point: 0, sun: 1, spot: 2, hemi: 3, area: 4 }

// DNA rotmode orderings -> three.js euler orders.
// https://github.com/blender/blender/blob/458e224587e8c45da20841a283cc1b41adc98950/source/blender/makesdna/DNA_action_types.h#L526
const EULER_MODES = {
    1: 'XYZ', 2: 'XZY', 3: 'YXZ', 4: 'YZX', 5: 'ZXY', 6: 'ZYX',
}

function getLayer(layers, i) {
    return Array.isArray(layers) ? layers[i] : layers
}

/** Read int32s that may be unaligned in the buffer (common in Blender >= 4.x). */
function readInt32s(file, address, count) {
    const out = new Int32Array(count)
    const ab = file.AB
    // NOTE: .blend files from supported Blender versions are little-endian;
    // the parser's template.endianess flag is unreliable here.
    const littleEndian = true
    if (address % 4 === 0 && littleEndian) {
        return new Int32Array(ab, address, count)
    }
    const dv = new DataView(ab)
    for (let i = 0; i < count; i++) out[i] = dv.getInt32(address + i * 4, littleEndian)
    return out
}

function findLayerData(layers, acceptedNames, expectedCount, label) {
    const candidates = Array.isArray(layers) ? layers : (layers ? [layers] : [])
    const layer = candidates.find(item => acceptedNames.includes(String(item?.name || '').trim()))
    if (!layer) {
        const found = candidates.map(item => item?.name).filter(Boolean).join(', ') || 'none'
        throw new Error(`Blender mesh is missing its ${label} attribute (${acceptedNames.join(' or ')}). Found: ${found}.`)
    }
    if (!Array.isArray(layer.data) || layer.data.length !== expectedCount) {
        throw new Error(`Blender ${label} attribute has an unexpected data length.`)
    }
    return layer.data
}
function countLegacyTriangleIndices(faces) {
    return faces.reduce((sum, face) => sum + Math.max(0, Number(face?.totloop || 0) - 2) * 3, 0)
}

export function createBufferGeometry(meshData) {
    if (meshData.mpoly) return createBufferGeometryLegacy(meshData)
    const geometry = new THREE.BufferGeometry()
    geometry.name = meshData.aname || ''
    const vertexCount = Number(meshData.totvert || 0), loopCount = Number(meshData.totloop || 0), polygonCount = Number(meshData.totpoly || 0)
    if (vertexCount < 3 || loopCount < 3 || polygonCount < 1) throw new Error('Blender mesh has no complete polygon geometry.')
    // Only canonical geometry attributes are valid; arbitrary layers can have the same element count.
    const verticesData = findLayerData(meshData.vdata?.layers, ['position', '.position'], vertexCount, 'vertex position')
    const indicesData = findLayerData(meshData.ldata?.layers, ['.corner_vert', 'corner_vert'], loopCount, 'loop vertex-index')
    const positions = new Float32Array(vertexCount * 3)
    for (let i = 0; i < vertexCount; i++) {
        const vertex = verticesData[i] || {}, co = vertex.co
        const x = vertex.x !== undefined ? Number(vertex.x) : Number(co?.[0])
        const y = vertex.y !== undefined ? Number(vertex.y) : Number(co?.[1])
        const z = vertex.z !== undefined ? Number(vertex.z) : Number(co?.[2])
        if (![x, y, z].every(Number.isFinite)) throw new Error('Blender position layer contains invalid vertex coordinates.')
        positions[i * 3] = x; positions[i * 3 + 1] = z; positions[i * 3 + 2] = -y
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const readCornerIndex = loop => {
        const entry = indicesData[loop]
        const value = Number.isInteger(entry) ? entry : Number.isInteger(entry?.i) ? entry.i : Number.isInteger(entry?.value) ? entry.value : NaN
        if (!Number.isInteger(value) || value < 0 || value >= vertexCount) throw new Error('Blender polygon references an invalid vertex index.')
        return value
    }
    let faceOffsets
    if (meshData.poly_offset_indices) {
        faceOffsets = Array.from(readInt32s(meshData.poly_offset_indices.__blender_file__, meshData.poly_offset_indices.__data_address__, polygonCount + 1))
        if (faceOffsets.length !== polygonCount + 1 || faceOffsets[0] !== 0 || faceOffsets[faceOffsets.length - 1] !== loopCount ||
            faceOffsets.some((value, index) => !Number.isInteger(value) || value < 0 || value > loopCount || (index > 0 && value < faceOffsets[index - 1]))) {
            throw new Error('Blender polygon offsets are invalid or incomplete.')
        }
    } else {
        const faceSize = loopCount / polygonCount
        if (!Number.isInteger(faceSize) || (faceSize !== 3 && faceSize !== 4)) throw new Error('Blender mesh needs polygon offsets to triangulate its faces safely.')
        faceOffsets = Array.from({ length: polygonCount + 1 }, (_, index) => index * faceSize)
    }
    const triangleIndices = []
    for (let face = 0; face < polygonCount; face++) {
        const start = faceOffsets[face], count = faceOffsets[face + 1] - start
        if (count < 3) throw new Error('Blender mesh contains a polygon with fewer than three vertices.')
        const first = readCornerIndex(start)
        for (let corner = 1; corner < count - 1; corner++) triangleIndices.push(first, readCornerIndex(start + corner), readCornerIndex(start + corner + 1))
    }
    if (!triangleIndices.length || triangleIndices.length % 3 !== 0) throw new Error('Blender mesh did not produce any valid triangles.')
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(triangleIndices), 1))
    geometry.computeVertexNormals(); geometry.computeBoundingBox()
    return geometry
}
function createBufferGeometryLegacy(mesh) {
    // Pre-4.0 layout: fan-triangulate each n-gon into exactly n - 2 triangles.
    const faces = Array.isArray(mesh.mpoly) ? mesh.mpoly : [mesh.mpoly]
    const loops = mesh.mloop, uvs = mesh.mloopuv, verts = mesh.mvert
    if (!Array.isArray(faces) || !Array.isArray(loops) || !Array.isArray(verts)) throw new Error('Legacy Blender mesh is missing its polygon, loop or vertex data.')
    const indexCount = countLegacyTriangleIndices(faces)
    if (!indexCount) throw new Error('Legacy Blender mesh contains no triangulatable polygons.')
    const indices = new Uint32Array(indexCount), uvArr = new Float32Array(indexCount * 2)
    const normals = new Float32Array(indexCount * 3), positions = new Float32Array(indexCount * 3)
    let cursor = 0, computeNormals = false
    for (const face of faces) {
        const count = Number(face?.totloop || 0), start = Number(face?.loopstart || 0)
        if (!Number.isInteger(count) || count < 3 || !Number.isInteger(start) || start < 0 || start + count > loops.length) throw new Error('Legacy Blender mesh contains an invalid polygon loop range.')
        for (let corner = 1; corner < count - 1; corner++) {
            for (const localIndex of [0, corner, corner + 1]) {
                const loopIndex = start + localIndex, loop = loops[loopIndex], vertex = verts[loop?.v], co = vertex?.co
                if (!co || co.length < 3 || ![co[0], co[1], co[2]].every(Number.isFinite)) throw new Error('Legacy Blender mesh contains an invalid vertex coordinate.')
                indices[cursor] = cursor
                positions[cursor * 3] = co[0]; positions[cursor * 3 + 1] = co[2]; positions[cursor * 3 + 2] = -co[1]
                const normal = vertex.no
                if (normal && normal.length >= 3) { normals[cursor * 3] = normal[0]; normals[cursor * 3 + 1] = normal[2]; normals[cursor * 3 + 2] = -normal[1]; }
                else computeNormals = true
                if (uvs?.[loopIndex]?.uv) { uvArr[cursor * 2] = uvs[loopIndex].uv[0]; uvArr[cursor * 2 + 1] = uvs[loopIndex].uv[1]; }
                cursor++
            }
        }
    }
    if (cursor !== indexCount) throw new Error('Legacy Blender mesh triangulation produced an inconsistent index count.')
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2))
    if (computeNormals) geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    return geometry
}
function createMaterial(mat) {
    const material = new THREE.MeshPhysicalMaterial()
    material.color.setRGB(mat.r ?? 0.8, mat.g ?? 0.8, mat.b ?? 0.8)
    material.roughness = mat.roughness !== undefined ? mat.roughness : 0.4
    material.metalness = mat.metallic !== undefined ? mat.metallic : 0.0
    material.opacity = 1
    material.transparent = false
    material.name = mat.aname || ''
    return material
}

function createLight(lamp) {
    const d = lamp.data
    if (!d) return undefined
    const color = new THREE.Color(d.r, d.g, d.b)
    const intensity = d.energy
    switch (d.type) {
        case BLEND_LIGHT_TYPES.sun: {
            const light = new THREE.DirectionalLight(color, intensity / 10)
            light.position.set(lamp.loc[0], lamp.loc[2], -lamp.loc[1])
            light.castShadow = true
            return light
        }
        case BLEND_LIGHT_TYPES.spot: {
            const angle = (d.spot_size ?? Math.PI) / 2
            const light = new THREE.SpotLight(color, intensity, 0, angle, d.spot_blend ?? 0.2)
            light.position.set(lamp.loc[0], lamp.loc[2], -lamp.loc[1])
            light.castShadow = true
            return light
        }
        case BLEND_LIGHT_TYPES.point:
        default: {
            const light = new THREE.PointLight(color, intensity, 0)
            light.position.set(lamp.loc[0], lamp.loc[2], -lamp.loc[1])
            light.castShadow = true
            return light
        }
    }
}

function createCamera(object) {
    const d = object.data
    if (!d) return undefined
    if (d.type === 1) {
        const scale = d.ortho_scale || 1
        const aspect = (d.sensor_x || 36) / (d.sensor_y || 24)
        return new THREE.OrthographicCamera(
            (-scale * aspect) / 2, (scale * aspect) / 2, scale / 2, -scale / 2,
            d.clipsta || 0.1, d.clipend || 1000,
        )
    }
    const sensorHeight = d.sensor_y || 24
    const lens = d.lens || 50
    const fov = (2 * Math.atan(sensorHeight / (2 * lens)) * 180) / Math.PI
    return new THREE.PerspectiveCamera(fov, (d.sensor_x || 36) / sensorHeight, d.clipsta || 0.1, d.clipend || 1000)
}

function safeVec(v, fallback) {
    return Array.isArray(v) && v.length >= 3 ? v : fallback
}

function setTransform(object, obj) {
    obj.name = object.aname
    const size = safeVec(object.size, [1, 1, 1])
    const loc = safeVec(object.loc, [0, 0, 0])
    const rot = safeVec(object.rot, [0, 0, 0])
    obj.scale.set(size[0], size[2], size[1])
    obj.position.set(loc[0], loc[2], -loc[1])

    const quat = object.quat
    if ((!object.rotmode || object.rotmode === 0) && Array.isArray(quat) && quat.length >= 4) {
        obj.quaternion.set(quat[1], quat[3], -quat[2], quat[0]) // wxyz
    } else {
        const order = EULER_MODES[object.rotmode] ?? 'XYZ'
        const q = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(rot[0], rot[1], rot[2],
                order.split('').reverse().join('')))
        obj.quaternion.set(q.x, q.z, -q.y, q.w)
    }

    // Blender cameras look down -Z with +Y up; rotate to match three.js.
    if (object.type === BLEND_OBJECT_TYPES.camera)
        obj.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2))

    obj.updateMatrix()
}

const ANNOTATION_OBJECT_NAME = /^(?:text|3d[._ -]?text|label|annotation|caption|title|legend|dimension(?:s)?|scale(?:[._ -]?bar)?|watermark|copyright)(?:[._ -]?\d+)?$/i

/**
 * Blender scenes often contain extruded text meshes for titles and labels.
 * These are not part of the physical object and can dominate the print bounds.
 * Only conservative, whole-name matches are excluded; all other geometry stays.
 */
export function isLikelyAnnotationObject(object) {
    const names = [object?.aname, object?.data?.aname]
        .map(value => String(value || '').trim())
        .filter(Boolean)
    return names.some(name => ANNOTATION_OBJECT_NAME.test(name))
}

export function createObjects(file, options = {}) {
    const objects = []
    const childMap = new Map()
    const objMap = new Map()
    const blendObjects = file.objects.Object ?? []
    const loadedGeo = new Map()
    const loadedMat = new Map()

    for (const object of blendObjects) {
        let obj
        if (object.type === BLEND_OBJECT_TYPES.mesh && options.excludeAnnotations !== false && isLikelyAnnotationObject(object)) {
            const diagnostic = { object: object.aname || "unnamed mesh", data: object.data?.aname || "", code: "BLEND_ANNOTATION_EXCLUDED", message: "Likely text/label geometry was excluded from printable bounds." }
            options.onAnnotationExcluded?.(diagnostic)
            continue
        }
        switch (object.type) {
            case BLEND_OBJECT_TYPES.mesh: {
                if (!object.data) break
                let geo = loadedGeo.get(object.data)
                if (!geo) {
                    try {
                        geo = createBufferGeometry(object.data)
                        const position = geo.attributes.position
                        const elementCount = geo.index ? geo.index.count : (position?.count || 0)
                        if (!position || position.count < 3 || elementCount < 3) throw new Error('Mesh has no valid triangle geometry.')
                        loadedGeo.set(object.data, geo)
                    } catch (error) {
                        const diagnostic = { object: object.aname || "unnamed mesh", code: "BLEND_MESH_INVALID", message: error?.message || String(error) }
                        if (typeof options.onMeshError !== "function") throw new Error('Blender object "' + diagnostic.object + '" could not be imported: ' + diagnostic.message)
                        options.onMeshError(diagnostic)
                        continue
                    }
                }
                const mat = object.data.mat?.[0]
                let material
                if (mat) {
                    material = loadedMat.get(mat) ?? createMaterial(mat)
                    loadedMat.set(mat, material)
                } else {
                    material = createMaterial({})
                }
                const mesh = new THREE.Mesh(geo, material)
                mesh.castShadow = true
                mesh.receiveShadow = true
                obj = mesh
                break
            }
            case BLEND_OBJECT_TYPES.lamp:
                obj = createLight(object)
                break
            case BLEND_OBJECT_TYPES.camera:
                obj = createCamera(object)
                break
            default:
                obj = new THREE.Object3D()
        }
        if (!obj) continue
        setTransform(object, obj)

        const pending = childMap.get(object)
        if (pending) {
            for (const child of pending) obj.add(child)
            childMap.delete(object)
        }
        objMap.set(object, obj)

        if (object.parent === object || !object.parent) {
            objects.push(obj)
        } else {
            const parent = objMap.get(object.parent)
            if (parent) parent.add(obj)
            else {
                const list = childMap.get(object.parent) ?? []
                list.push(obj)
                childMap.set(object.parent, list)
            }
        }
    }
    if (childMap.size) objects.push(...[...childMap.values()].flat())
    return objects.filter(o => !!o)
}
