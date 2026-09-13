import * as THREE from "three";
import type { ModelBuilder } from "./modelBuilder";

/** A reference-inspired helmet and expressive display; no product markings. */
export function createFriendlyHead(parent: THREE.Object3D, b: ModelBuilder): THREE.Group {
  const head = new THREE.Group();
  head.name = "Sensor head";
  head.position.set(0, 1.871, -0.043);
  head.rotation.x = 0.035;
  parent.add(head);

  const helmet = b.material("#292e30", 0.37, 0.08, {
    clearcoat: 0.24,
    clearcoatRoughness: 0.32,
    envMapIntensity: 0.32,
  });
  const softBlack = b.material("#101719", 0.58, 0, { envMapIntensity: 0.09 });
  const display = b.material("#070e12", 0.28, 0, {
    specularIntensity: 0.14,
    clearcoat: 0.08,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.065,
  });
  const lens = b.material("#162a31", 0.19, 0.25, { envMapIntensity: 0.22 });
  const eye = b.material("#fffdf4", 0.6, 0, {
    emissive: "#fffdf4",
    emissiveIntensity: 1.1,
    toneMapped: false,
    envMapIntensity: 0,
  });
  const cyan = b.material("#83d9d1", 0.6, 0, {
    emissive: "#83d9d1",
    emissiveIntensity: 0.55,
    toneMapped: false,
    envMapIntensity: 0,
  });
  const fabric = b.material("#242a2c", 0.98, 0, {
    envMapIntensity: 0.08,
    vertexColors: true,
  });

  // A softer jaw and continuous shell replace the stacked mask panels.
  const profiles = [
    [0, 0, 0, 0.002],
    [0.016, 0.072, 0.061, 0.004],
    [0.06, 0.1, 0.092, 0.008],
    [0.121, 0.123, 0.115, 0.002],
    [0.196, 0.136, 0.124, -0.007],
    [0.253, 0.132, 0.115, -0.011],
    [0.286, 0.115, 0.092, -0.019],
    [0.308, 0.07, 0.047, -0.03],
    [0.318, 0, 0, -0.04],
  ];
  const shapeCurve = new THREE.CatmullRomCurve3(
    profiles.map(([y, x, z]) => new THREE.Vector3(x, y, z)),
  );
  const centerCurve = new THREE.CatmullRomCurve3(
    profiles.map(([y, , , center]) => new THREE.Vector3(center, y, 0)),
  );
  const sampledProfile = Array.from({ length: 513 }, (_, index) => {
    const point = shapeCurve.getPoint(index / 512);
    return { y: point.y, x: point.x, z: point.z, center: centerCurve.getPoint(index / 512).x };
  });
  // Use the shell's own loft for the glass and eyes, keeping every layer fitted
  // to the same surface instead of projecting a separate mask in front of it.
  function shellFront(x: number, y: number) {
    let lo = 0;
    let hi = sampledProfile.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (sampledProfile[mid].y < y) lo = mid;
      else hi = mid;
    }
    const a = sampledProfile[lo];
    const b = sampledProfile[hi];
    const t = THREE.MathUtils.clamp((y - a.y) / (b.y - a.y), 0, 1);
    const rx = THREE.MathUtils.lerp(a.x, b.x, t);
    const rz = THREE.MathUtils.lerp(a.z, b.z, t);
    const center = THREE.MathUtils.lerp(a.center, b.center, t);
    return center + Math.pow(Math.max(0, 1 - Math.pow(Math.abs(x) / rx, 2 / 0.83)), 0.83 / 2) * rz;
  }

  function helmetGeometry() {
    const rows = 44;
    const columns = 64;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let row = 0; row <= rows; row += 1) {
      const profile = shapeCurve.getPoint(row / rows);
      const center = centerCurve.getPoint(row / rows).x;
      for (let column = 0; column <= columns; column += 1) {
        const angle = (column / columns) * Math.PI * 2;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        positions.push(
          Math.sign(sin) * Math.pow(Math.abs(sin), 0.83) * profile.x,
          profile.y,
          center + Math.sign(cos) * Math.pow(Math.abs(cos), 0.83) * profile.z,
        );
        if (row < rows && column < columns) {
          const a = row * (columns + 1) + column;
          const c = a + columns + 1;
          indices.push(a, a + 1, c, a + 1, c + 1, c);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const normals = geometry.getAttribute("normal");
    for (let row = 0; row <= rows; row += 1) {
      const first = row * (columns + 1);
      const last = first + columns;
      const normal = new THREE.Vector3()
        .fromBufferAttribute(normals, first)
        .add(new THREE.Vector3().fromBufferAttribute(normals, last))
        .normalize();
      normals.setXYZ(first, normal.x, normal.y, normal.z);
      normals.setXYZ(last, normal.x, normal.y, normal.z);
    }
    return geometry;
  }

  b.mesh(head, helmetGeometry(), helmet, "Contoured helmet shell");

  /** Subdivided caps curve across the face instead of triangulating a flat badge. */
  function curvedPanel(
    width: number,
    height: number,
    radius: number,
    depth: number,
    center: [number, number],
    surfaceZ: (x: number, y: number) => number,
    surface: THREE.MeshStandardMaterial,
    name: string,
    columns = 24,
    rows = 20,
  ) {
    const positions: number[] = [];
    const indices: number[] = [];
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const count = (rows + 1) * (columns + 1);
    for (let side = 0; side < 2; side += 1) {
      for (let row = 0; row <= rows; row += 1) {
        const y = -halfHeight + (row / rows) * height;
        const corner = Math.max(0, Math.abs(y) - (halfHeight - radius));
        const extent =
          halfWidth - radius + Math.sqrt(Math.max(0, radius * radius - corner * corner));
        for (let column = 0; column <= columns; column += 1) {
          const x = -extent + (column / columns) * extent * 2 + center[0];
          const py = y + center[1];
          positions.push(x, py, surfaceZ(x, py) - side * depth);
          if (row < rows && column < columns) {
            const a = side * count + row * (columns + 1) + column;
            const c = a + columns + 1;
            if (side === 0) indices.push(a, a + 1, c, a + 1, c + 1, c);
            else indices.push(a, c, a + 1, a + 1, c, c + 1);
          }
        }
      }
    }
    const perimeter: number[] = [];
    for (let column = 0; column <= columns; column += 1) perimeter.push(column);
    for (let row = 1; row <= rows; row += 1) perimeter.push(row * (columns + 1) + columns);
    for (let column = columns - 1; column >= 0; column -= 1)
      perimeter.push(rows * (columns + 1) + column);
    for (let row = rows - 1; row > 0; row -= 1) perimeter.push(row * (columns + 1));
    perimeter.forEach((a, index) => {
      const c = perimeter[(index + 1) % perimeter.length];
      indices.push(a, a + count, c, c, a + count, c + count);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return b.mesh(head, geometry, surface, name);
  }

  const faceZ = (x: number, y: number) => shellFront(x, y) + 0.0018;
  curvedPanel(
    0.224,
    0.222,
    0.063,
    0.0014,
    [0, 0.153],
    faceZ,
    display,
    "Continuous fitted face visor",
    52,
    56,
  );

  // The camera bar is a quiet detail within the visor, with no raised brow.
  curvedPanel(
    0.148,
    0.014,
    0.007,
    0.0005,
    [0, 0.242],
    (x, y) => faceZ(x, y) + 0.0006,
    softBlack,
    "Flush camera strip",
    28,
    16,
  );
  for (const x of [-0.053, 0, 0.053]) {
    const radius = x === 0 ? 0.003 : 0.0042;
    const optic = b.cylinder(
      head,
      radius,
      radius,
      0.0012,
      [x, 0.242, faceZ(x, 0.242) + 0.0014],
      lens,
      "Recessed brow camera lens",
      "z",
      24,
    );
    optic.rotation.y = x * 3.8;
  }

  for (const side of [-1, 1]) {
    const label = side > 0 ? "Left" : "Right";
    curvedPanel(
      0.029,
      0.051,
      0.0145,
      0.0005,
      [side * 0.041, 0.157],
      (x, y) => faceZ(x, y) + 0.0009,
      eye,
      `${label} warm-white capsule eye`,
      12,
      48,
    );
    curvedPanel(
      0.004,
      0.011,
      0.002,
      0.0004,
      [side * 0.074, 0.15],
      (x, y) => faceZ(x, y) + 0.0008,
      cyan,
      `${label} cyan side indicator`,
      6,
      24,
    );
    b.sphere(
      head,
      [0.008, 0.017, 0.018],
      [side * 0.12, 0.107, 0.006],
      softBlack,
      `${label} recessed temple joint`,
    );
    b.cable(
      head,
      [
        [side * 0.12, 0.151, -0.051],
        [side * 0.123, 0.195, -0.072],
        [side * 0.107, 0.258, -0.077],
        [side * 0.068, 0.291, -0.087],
      ],
      `${label} helmet rear panel seam`,
      0.0012,
      softBlack,
      24,
    );
  }

  // Fine geometric twill supplies a tactile neck without an external texture.
  const shroud = b.housing(
    head,
    [
      [-0.113, 0, 0],
      [-0.108, 0.082, 0.07],
      [-0.079, 0.071, 0.06],
      [-0.055, 0.059, 0.053],
      [-0.024, 0.053, 0.048],
      [0.009, 0.058, 0.048],
      [0.017, 0, 0],
    ],
    [0, 0, -0.021],
    fabric,
    "Fabric neck shroud",
    64,
    40,
  );
  const neckPositions = shroud.geometry.getAttribute("position");
  const colors: number[] = [];
  for (let i = 0; i < neckPositions.count; i += 1) {
    const x = neckPositions.getX(i);
    const y = neckPositions.getY(i);
    const z = neckPositions.getZ(i);
    const angle = Math.atan2(z, x);
    const twill = Math.sin(angle * 38 + y * 950) * Math.sin(angle * 36 - y * 950);
    const radius = Math.hypot(x, z);
    const relief = radius > 0.01 ? 1 + twill * 0.0048 : 1;
    neckPositions.setXYZ(i, x * relief, y, z * relief);
    const shade = 0.82 + (twill + 1) * 0.085;
    colors.push(shade, shade, shade);
  }
  shroud.geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  shroud.geometry.computeVertexNormals();

  return head;
}
