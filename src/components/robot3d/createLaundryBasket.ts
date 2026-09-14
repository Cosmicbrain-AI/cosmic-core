import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { ModelBuilder } from "./modelBuilder";

/** A tapered, open basket with flat woven bands and a finished interior. */
export function createLaundryBasket(basket: THREE.Group, b: ModelBuilder) {
  const reeds = [
    b.material("#9c7852", 0.73, 0, { clearcoat: 0.08 }),
    b.material("#a5825c", 0.76, 0),
    b.material("#ad8c66", 0.74, 0),
    b.material("#96744f", 0.78, 0),
  ];
  const lining = b.material("#b19775", 0.92, 0, { side: THREE.DoubleSide });
  const binding = b.material("#8c6845", 0.64, 0, { clearcoat: 0.12 });
  const leather = b.material("#75533a", 0.64, 0);
  const rivet = b.material("#9e8769", 0.35, 0.65);

  function outline(w: number, d: number, r: number) {
    const p = new THREE.Shape();
    p.moveTo(w / 2 - r, d / 2);
    p.lineTo(-w / 2 + r, d / 2);
    p.absarc(-w / 2 + r, d / 2 - r, r, Math.PI / 2, Math.PI, false);
    p.lineTo(-w / 2, -d / 2 + r);
    p.absarc(-w / 2 + r, -d / 2 + r, r, Math.PI, Math.PI * 1.5, false);
    p.lineTo(w / 2 - r, -d / 2);
    p.absarc(w / 2 - r, -d / 2 + r, r, Math.PI * 1.5, Math.PI * 2, false);
    p.lineTo(w / 2, d / 2 - r);
    p.absarc(w / 2 - r, d / 2 - r, r, 0, Math.PI / 2, false);
    p.closePath();
    return p;
  }
  const lower = outline(0.49, 0.29, 0.065);
  const upper = outline(0.62, 0.4, 0.085);
  function surface(u: number, t: number) {
    const v = ((u % 1) + 1) % 1;
    const p = lower.getPointAt(v).lerp(upper.getPointAt(v), t);
    return new THREE.Vector3(p.x, -0.137 + t * 0.277, p.y);
  }
  function normal(u: number, t: number) {
    const tangent = surface(u + 0.0001, t)
      .sub(surface(u - 0.0001, t))
      .normalize();
    const n = new THREE.Vector3(tangent.z, 0, -tangent.x);
    if (n.dot(surface(u, t)) < 0) n.negate();
    return n;
  }
  // The wall has separate inside/outside surfaces and a closed bottom.
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= 256; i++)
    for (const [t, inset] of [
      [0, 0],
      [1, 0],
      [1, 0.008],
      [0, 0.008],
    ]) {
      const p = surface(i / 256, t).addScaledVector(normal(i / 256, t), -inset);
      vertices.push(p.x, p.y, p.z);
    }
  for (let i = 0; i < 256; i++)
    for (let side = 0; side < 4; side++) {
      const a = i * 4 + side,
        c = i * 4 + ((side + 1) % 4);
      indices.push(a, c, a + 4, c, c + 4, a + 4);
    }
  const wall = new THREE.BufferGeometry();
  wall.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  wall.setIndex(indices);
  wall.computeVertexNormals();
  b.mesh(basket, wall, lining, "Continuous basket inner wall");
  b.box(basket, [0.48, 0.014, 0.28], [0, -0.133, 0], lining, "Closed rounded basket bottom", 0.045);

  // Flattened oval cross-sections read as rattan ribbons, not stacked rope.
  const parts: THREE.BufferGeometry[][] = reeds.map(() => []);
  const rows = 28,
    stakes = 72;
  function ribbon(horizontal: boolean, index: number) {
    const steps = horizontal ? 432 : 112;
    const v: number[] = [];
    const ix: number[] = [];
    for (let i = 0; i <= steps; i++) {
      const u = horizontal ? i / steps : index / stakes;
      const t = horizontal ? (index + 0.5) / rows : i / steps;
      const n = normal(u, t);
      const tangent = new THREE.Vector3(-n.z, 0, n.x);
      const lift = horizontal
        ? Math.cos(u * stakes * Math.PI * 2 + index * Math.PI) * 0.0021
        : -Math.cos(t * rows * Math.PI + index * Math.PI) * 0.0021;
      const center = surface(u, t).addScaledVector(n, 0.003 + lift);
      for (let j = 0; j < 8; j++) {
        const a = (j * Math.PI) / 4;
        const p = center.clone().addScaledVector(n, Math.cos(a) * 0.00115);
        if (horizontal) p.y += Math.sin(a) * 0.0045;
        else p.addScaledVector(tangent, Math.sin(a) * 0.0036);
        v.push(p.x, p.y, p.z);
      }
    }
    for (let i = 0; i < steps; i++)
      for (let j = 0; j < 8; j++) {
        const a = i * 8 + j,
          c = i * 8 + ((j + 1) % 8);
        // Vertical stakes use the opposite-handed cross-section frame.
        if (horizontal) ix.push(a, c, a + 8, c, c + 8, a + 8);
        else ix.push(a, a + 8, c, c, a + 8, c + 8);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    g.setIndex(ix);
    g.computeVertexNormals();
    parts[(index * 7 + (horizontal ? 0 : 1)) % 4].push(g);
  }
  for (let i = 0; i < rows; i++) ribbon(true, i);
  for (let i = 0; i < stakes; i++) ribbon(false, i);
  parts.forEach((pieces, i) => {
    const g = mergeGeometries(pieces);
    pieces.forEach((p) => p.dispose());
    if (g) b.mesh(basket, g, reeds[i], "Flat interlaced rattan ribbons");
  });
  for (const [t, radius, name] of [
    [1, 0.008, "Bound basket upper rim"],
    [0.012, 0.005, "Basket lower binding"],
  ] as const) {
    const path = new THREE.CatmullRomCurve3(
      Array.from({ length: 256 }, (_, i) => surface(i / 256, t)),
      true,
    );
    b.mesh(basket, new THREE.TubeGeometry(path, 256, radius, 12, true), binding, name);
  }
  // Handles keep the existing solved hand contact positions. Side mounting
  // straps extend below the rim so the handles visibly connect to the body.
  for (const side of [-1, 1]) {
    for (const z of [-0.095, 0.075]) {
      b.box(
        basket,
        [0.01, 0.069, 0.032],
        [side * 0.309, 0.108, z],
        leather,
        "Basket handle mounting strap",
        0.006,
      );
      b.cylinder(
        basket,
        0.004,
        0.004,
        0.012,
        [side * 0.312, 0.103, z],
        rivet,
        "Basket handle rivet",
        "x",
        16,
      );
    }
    b.cable(
      basket,
      [
        [side * 0.309, 0.136, -0.095],
        [side * 0.32, 0.21, -0.092],
        [side * 0.32, 0.246, -0.077],
      ],
      "Attached rear basket handle",
      0.009,
      leather,
      24,
    );
    b.cable(
      basket,
      [
        [side * 0.32, 0.246, 0.051],
        [side * 0.32, 0.21, 0.071],
        [side * 0.309, 0.136, 0.075],
      ],
      "Attached front basket handle",
      0.009,
      leather,
      24,
    );
    const bar = b.cylinder(
      basket,
      0.011,
      0.011,
      0.128,
      [side * 0.32, 0.246, -0.013],
      leather,
      `${side > 0 ? "Left" : "Right"} basket grip bar`,
      "z",
      32,
    );
    bar.userData.handleSide = side;
    bar.userData.gripRadius = 0.011;
  }
}
