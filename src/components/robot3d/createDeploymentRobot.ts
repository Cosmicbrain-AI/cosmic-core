import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { createFriendlyHead } from "./createFriendlyHead";

export type DeploymentRobotPose = "rest" | "carry" | "wave";

export interface DeploymentRobotModel {
  group: THREE.Group;
  setPose: (pose: DeploymentRobotPose, phase?: number) => void;
  /** Elbow flexion: 0 degrees hangs down; 90 degrees reaches forward. */
  setArmAngle: (degrees: number) => void;
  setWireframe: (enabled: boolean) => void;
  dispose: () => void;
}

type Point = [number, number, number];

/**
 * An articulated, reference-inspired visualization of a service humanoid.
 * The mobile platform sits on y=0, the sensor face looks toward +z, and
 * articulation stays in local joints so every view remains genuinely 3D.
 * This is an illustrative mesh, not an engineering CAD or collision model.
 */
export function createDeploymentRobot(): DeploymentRobotModel {
  const group = new THREE.Group();
  group.name = "Reference deployment humanoid";
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.MeshStandardMaterial>();
  const originalColors = new Map<THREE.MeshStandardMaterial, THREE.Color>();
  const geometryCache = new Map<string, THREE.BufferGeometry>();

  function material(
    color: string,
    roughness = 0.48,
    metalness = 0.45,
    extra: Partial<THREE.MeshPhysicalMaterialParameters> = {},
  ) {
    const value = new THREE.MeshPhysicalMaterial({ color, roughness, metalness, ...extra });
    materials.add(value);
    originalColors.set(value, value.color.clone());
    return value;
  }

  const shell = material("#e6e5df", 0.33, 0, { clearcoat: 0.36, clearcoatRoughness: 0.26 });
  const pearl = material("#f0efe9", 0.28, 0, { clearcoat: 0.42, clearcoatRoughness: 0.2 });
  const darkShell = material("#161b1e", 0.32, 0.2, { clearcoat: 0.3, clearcoatRoughness: 0.23 });
  const inset = material("#0a0f13", 0.32, 0.48);
  const jointMetal = material("#41484b", 0.3, 0.78);
  const jointFace = material("#b7bfbd", 0.34, 0.72);
  const rubber = material("#0d1113", 0.85, 0);
  const cableMaterial = material("#1c2123", 0.57, 0);
  const visorMaterial = material("#060b0e", 0.18, 0.28, { envMapIntensity: 0.16 });
  const lensMaterial = material("#243c42", 0.12, 0.65);
  const statusLight = material("#ba8748", 0.35, 0.22, {
    emissive: "#ad6d27",
    emissiveIntensity: 0.3,
  });
  const wicker = [
    material("#684024", 0.95, 0),
    material("#805331", 0.96, 0),
    material("#93613a", 0.94, 0),
    material("#56351f", 0.98, 0),
  ];
  const basketInterior = material("#3f2a1b", 0.99, 0, { side: THREE.DoubleSide });
  const linen = material("#eeeae1", 1, 0, { side: THREE.DoubleSide });
  const linenShadow = material("#c5ceca", 1, 0);
  const linenCream = material("#dfdbc9", 1, 0);
  const linenSeam = material("#c8c5b8", 1, 0);

  function geometry(key: string, create: () => THREE.BufferGeometry) {
    let result = geometryCache.get(key);
    if (!result) {
      result = create();
      geometryCache.set(key, result);
      geometries.add(result);
    }
    return result;
  }

  function mesh(
    parent: THREE.Object3D,
    shape: THREE.BufferGeometry,
    surface: THREE.MeshStandardMaterial,
    name: string,
    position: Point = [0, 0, 0],
  ) {
    geometries.add(shape);
    const part = new THREE.Mesh(shape, surface);
    part.name = name;
    part.position.set(...position);
    part.castShadow = true;
    part.receiveShadow = true;
    parent.add(part);
    return part;
  }

  function box(
    parent: THREE.Object3D,
    size: Point,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
    radius = 0.015,
  ) {
    return mesh(
      parent,
      geometry(`box:${size.join(",")}:${radius}`, () => new RoundedBoxGeometry(...size, 2, radius)),
      surface,
      name,
      position,
    );
  }

  function cylinder(
    parent: THREE.Object3D,
    top: number,
    bottom: number,
    height: number,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
    axis: "x" | "y" | "z" = "y",
    sides = 24,
  ) {
    const part = mesh(
      parent,
      geometry(
        `cylinder:${top}:${bottom}:${height}:${sides}`,
        () => new THREE.CylinderGeometry(top, bottom, height, sides),
      ),
      surface,
      name,
      position,
    );
    if (axis === "x") part.rotation.z = Math.PI / 2;
    if (axis === "z") part.rotation.x = Math.PI / 2;
    return part;
  }

  function sphere(
    parent: THREE.Object3D,
    size: Point,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
  ) {
    const part = mesh(
      parent,
      geometry("sphere", () => new THREE.SphereGeometry(1, 20, 12)),
      surface,
      name,
      position,
    );
    part.scale.set(...size);
    return part;
  }

  function cable(
    parent: THREE.Object3D,
    points: Point[],
    name: string,
    radius = 0.007,
    surface: THREE.MeshStandardMaterial = cableMaterial,
    segments = 24,
    closed = false,
  ) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((point) => new THREE.Vector3(...point)),
      closed,
    );
    return mesh(parent, new THREE.TubeGeometry(curve, segments, radius, 8, closed), surface, name);
  }

  /** Smooth, closed elliptical lofts give the housings continuous compound curves. */
  function housing(
    parent: THREE.Object3D,
    profiles: [number, number, number][],
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
    radialSegments = 40,
    lengthSegments = 30,
  ) {
    const curve = new THREE.CatmullRomCurve3(
      profiles.map(([y, x, z]) => new THREE.Vector3(x, y, z)),
      false,
      "centripetal",
    );
    const vertices: number[] = [];
    const indices: number[] = [];
    for (let row = 0; row <= lengthSegments; row += 1) {
      const profile = curve.getPoint(row / lengthSegments);
      for (let column = 0; column <= radialSegments; column += 1) {
        const theta = (column / radialSegments) * Math.PI * 2;
        vertices.push(Math.cos(theta) * profile.x, profile.y, Math.sin(theta) * profile.z);
        if (row < lengthSegments && column < radialSegments) {
          const a = row * (radialSegments + 1) + column;
          const b = a + radialSegments + 1;
          indices.push(a, b, a + 1, a + 1, b, b + 1);
        }
      }
    }
    const shape = new THREE.BufferGeometry();
    shape.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    shape.setIndex(indices);
    shape.computeVertexNormals();
    // Join the coincident longitudinal seam to avoid an artificial lighting line.
    const normals = shape.getAttribute("normal");
    for (let row = 0; row <= lengthSegments; row += 1) {
      const first = row * (radialSegments + 1);
      const last = first + radialSegments;
      const normal = new THREE.Vector3()
        .fromBufferAttribute(normals, first)
        .add(new THREE.Vector3().fromBufferAttribute(normals, last))
        .normalize();
      normals.setXYZ(first, normal.x, normal.y, normal.z);
      normals.setXYZ(last, normal.x, normal.y, normal.z);
    }
    return mesh(parent, shape, surface, name, position);
  }

  function oval(
    parent: THREE.Object3D,
    width: number,
    height: number,
    depth: number,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
    bevel = 0.009,
  ) {
    const shape = new THREE.Shape();
    shape.absellipse(0, 0, width / 2, height / 2, 0, Math.PI * 2, false, 0);
    const extrusion = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: bevel > 0,
      bevelSegments: 4,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 20,
    });
    extrusion.translate(0, 0, -depth / 2);
    return mesh(parent, extrusion, surface, name, position);
  }

  function between(parent: THREE.Object3D, from: Point, to: Point, name: string) {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const assembly = new THREE.Group();
    assembly.name = name;
    assembly.position.copy(start).add(end).multiplyScalar(0.5);
    assembly.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
    parent.add(assembly);
    return assembly;
  }

  // The reference has a rectangular omnidirectional chassis and one folding
  // lifting column. Its form is deliberately different from a biped's legs.
  const base = new THREE.Group();
  base.name = "Mobile platform";
  group.add(base);

  function platformShell(rings: { y: number; x: number; z: number }[]) {
    const positions: number[] = [];
    const indices: number[] = [];
    const count = 64;
    rings.forEach((ring) => {
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        positions.push(
          Math.sign(cos) * Math.pow(Math.abs(cos), 0.43) * ring.x,
          ring.y,
          Math.sign(sin) * Math.pow(Math.abs(sin), 0.43) * ring.z,
        );
      }
    });
    for (let ring = 0; ring < rings.length - 1; ring += 1) {
      for (let i = 0; i < count; i += 1) {
        const a = ring * count + i;
        const b = ring * count + ((i + 1) % count);
        const c = a + count;
        const d = b + count;
        indices.push(a, c, b, b, c, d);
      }
    }
    const topCenter = positions.length / 3;
    positions.push(0, rings[rings.length - 1].y, 0);
    const topRing = (rings.length - 1) * count;
    const bottomCenter = positions.length / 3;
    positions.push(0, rings[0].y, 0);
    for (let i = 0; i < count; i += 1) {
      indices.push(topCenter, topRing + ((i + 1) % count), topRing + i);
      indices.push(bottomCenter, i, (i + 1) % count);
    }
    const shape = new THREE.BufferGeometry();
    shape.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    shape.setIndex(indices);
    shape.computeVertexNormals();
    return shape;
  }

  mesh(
    base,
    platformShell([
      { y: 0.067, x: 0.442, z: 0.338 },
      { y: 0.079, x: 0.471, z: 0.358 },
      { y: 0.14, x: 0.475, z: 0.36 },
      { y: 0.169, x: 0.458, z: 0.346 },
    ]),
    rubber,
    "Continuous dark chassis bumper",
  );
  mesh(
    base,
    platformShell([
      { y: 0.154, x: 0.458, z: 0.344 },
      { y: 0.166, x: 0.468, z: 0.349 },
      { y: 0.205, x: 0.461, z: 0.344 },
      { y: 0.249, x: 0.431, z: 0.315 },
      { y: 0.268, x: 0.395, z: 0.287 },
    ]),
    shell,
    "Rounded white chassis deck",
  );
  box(
    base,
    [0.425, 0.023, 0.38],
    [0, 0.271, -0.047],
    darkShell,
    "Recessed lifting-column well",
    0.065,
  );
  box(
    base,
    [0.357, 0.015, 0.319],
    [0, 0.285, -0.047],
    inset,
    "Lifting-column turntable inset",
    0.06,
  );
  cylinder(base, 0.132, 0.145, 0.03, [0, 0.3, -0.07], darkShell, "Column yaw bearing", "y", 40);

  for (const side of [-1, 1]) {
    for (const end of [-1, 1]) {
      const wheel = new THREE.Group();
      wheel.name = "Omnidirectional corner wheel";
      wheel.position.set(side * 0.441, 0.105, end * 0.237);
      base.add(wheel);
      cylinder(wheel, 0.087, 0.087, 0.073, [0, 0, 0], inset, "Omni wheel core", "x", 24);
      for (let i = 0; i < 10; i += 1) {
        const angle = (i / 10) * Math.PI * 2;
        const roller = cylinder(
          wheel,
          0.014,
          0.015,
          0.076,
          [0, Math.cos(angle) * 0.084, Math.sin(angle) * 0.084],
          rubber,
          "Angled omni wheel roller",
          "y",
          10,
        );
        roller.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0.82, -Math.sin(angle) * 0.57, Math.cos(angle) * 0.57).normalize(),
        );
      }
      cylinder(
        wheel,
        0.071,
        0.071,
        0.012,
        [side * 0.04, 0, 0],
        jointFace,
        "Wheel inset side cover",
        "x",
        24,
      );
      cylinder(
        wheel,
        0.057,
        0.057,
        0.014,
        [side * 0.047, 0, 0],
        darkShell,
        "Dark wheel hub",
        "x",
        24,
      );
      box(
        wheel,
        [0.016, 0.009, 0.03],
        [side * 0.056, 0, 0],
        statusLight,
        "Amber wheel hub detail",
        0.003,
      );
    }
    box(base, [0.008, 0.045, 0.242], [side * 0.469, 0.178, 0], pearl, "Chassis side skirt", 0.007);
    for (const end of [-1, 1]) {
      cylinder(
        base,
        0.022,
        0.025,
        0.012,
        [side * 0.304, 0.263, end * 0.206],
        darkShell,
        "Deck proximity sensor mount",
      );
      sphere(
        base,
        [0.018, 0.01, 0.018],
        [side * 0.304, 0.272, end * 0.206],
        visorMaterial,
        "Deck proximity sensor glass",
      );
      cylinder(
        base,
        0.013,
        0.013,
        0.008,
        [side * 0.285, 0.129, end * 0.356],
        jointMetal,
        "Bumper ultrasonic bezel",
        "z",
        16,
      );
      cylinder(
        base,
        0.009,
        0.009,
        0.011,
        [side * 0.285, 0.129, end * 0.358],
        inset,
        "Bumper ultrasonic window",
        "z",
        16,
      );
    }
  }
  for (const end of [-1, 1]) {
    box(
      base,
      [0.223, 0.024, 0.008],
      [0, 0.133, end * 0.36],
      inset,
      "Platform status lamp recess",
      0.01,
    );
    box(
      base,
      [0.163, 0.005, 0.009],
      [0, 0.132, end * 0.365],
      statusLight,
      "Restrained amber platform status lamp",
      0.002,
    );
  }
  box(
    base,
    [0.105, 0.035, 0.012],
    [-0.12, 0.175, -0.349],
    inset,
    "Rear charging connector recess",
    0.01,
  );
  for (const x of [-0.134, -0.107]) {
    box(
      base,
      [0.015, 0.013, 0.004],
      [x, 0.175, -0.357],
      jointMetal,
      "Charging connector contact",
      0.002,
    );
  }

  const columnFoot: Point = [0, 0.344, -0.094];
  const columnKnee: Point = [0, 0.786, 0.164];
  const columnHip: Point = [0, 1.217, -0.078];
  const lower = between(group, columnFoot, columnKnee, "Lower central folding support");
  housing(
    lower,
    [
      [-0.262, 0, 0],
      [-0.244, 0.078, 0.068],
      [-0.2, 0.098, 0.077],
      [0.19, 0.112, 0.083],
      [0.242, 0.08, 0.062],
      [0.262, 0, 0],
    ],
    [0, 0, 0],
    darkShell,
    "Sculpted lower lift link",
    32,
    20,
  );
  for (const side of [-1, 1]) {
    box(
      lower,
      [0.024, 0.31, 0.018],
      [side * 0.053, 0.005, 0.079],
      jointMetal,
      "Longitudinal lower-column rail",
      0.009,
    );
  }
  box(
    lower,
    [0.113, 0.285, 0.013],
    [0, 0.007, -0.082],
    inset,
    "Lower-column rear service panel",
    0.016,
  );

  const upper = between(group, columnKnee, columnHip, "Upper central folding support");
  housing(
    upper,
    [
      [-0.253, 0, 0],
      [-0.231, 0.096, 0.065],
      [-0.19, 0.136, 0.085],
      [0.16, 0.146, 0.093],
      [0.225, 0.112, 0.075],
      [0.253, 0, 0],
    ],
    [0, 0, 0],
    shell,
    "White upper lift link shell",
    36,
    24,
  );
  box(
    upper,
    [0.147, 0.327, 0.027],
    [0, 0.01, 0.078],
    darkShell,
    "Upper-link front structural inset",
    0.024,
  );
  box(
    upper,
    [0.13, 0.31, 0.022],
    [0, 0.012, -0.088],
    inset,
    "Upper-link rear structural inset",
    0.022,
  );
  for (const side of [-1, 1]) {
    const actuator = between(
      group,
      [side * 0.106, 0.394, -0.13],
      [side * 0.106, 0.716, 0.111],
      "Enclosed lift actuator",
    );
    cylinder(
      actuator,
      0.018,
      0.018,
      0.244,
      [0, -0.058, 0],
      inset,
      "Lift actuator cylinder",
      "y",
      12,
    );
    cylinder(actuator, 0.011, 0.011, 0.22, [0, 0.085, 0], jointMetal, "Lift actuator rod", "y", 12);
  }
  for (const [point, radius, width, name] of [
    [columnFoot, 0.077, 0.266, "Lower support pivot"],
    [columnKnee, 0.1, 0.312, "Central folding knee"],
    [columnHip, 0.086, 0.29, "Upper lift pivot"],
  ] as const) {
    cylinder(group, radius, radius, width, [...point], darkShell, `${name} actuator`, "x", 32);
    for (const side of [-1, 1]) {
      cylinder(
        group,
        radius * 0.8,
        radius * 0.8,
        0.01,
        [side * (width / 2 + 0.002), point[1], point[2]],
        shell,
        `${name} white end cap`,
        "x",
        32,
      );
      cylinder(
        group,
        radius * 0.39,
        radius * 0.39,
        0.012,
        [side * (width / 2 + 0.008), point[1], point[2]],
        inset,
        `${name} recessed axle`,
        "x",
        20,
      );
    }
  }

  cylinder(
    group,
    0.109,
    0.121,
    0.056,
    [0, 1.219, -0.073],
    darkShell,
    "Waist rotation bearing",
    "y",
    32,
  );
  const torso = new THREE.Group();
  torso.name = "Upper torso";
  torso.position.z = -0.052;
  group.add(torso);
  housing(
    torso,
    [
      [1.208, 0, 0],
      [1.214, 0.104, 0.075],
      [1.249, 0.163, 0.117],
      [1.296, 0.174, 0.128],
      [1.376, 0.14, 0.108],
      [1.435, 0.145, 0.115],
      [1.521, 0.184, 0.135],
      [1.608, 0.233, 0.151],
      [1.669, 0.25, 0.15],
      [1.711, 0.225, 0.132],
      [1.751, 0.134, 0.089],
      [1.766, 0.065, 0.058],
      [1.768, 0, 0],
    ],
    [0, 0, 0],
    shell,
    "Continuous white hourglass torso",
    48,
    48,
  );
  const chestPort = oval(
    torso,
    0.042,
    0.077,
    0.009,
    [0, 1.617, 0.149],
    inset,
    "Chest service port",
    0.007,
  );
  chestPort.rotation.x = 0.045;
  cylinder(
    torso,
    0.01,
    0.01,
    0.006,
    [0, 1.633, 0.164],
    visorMaterial,
    "Chest proximity sensor",
    "z",
    16,
  );
  const rearPanel = oval(
    torso,
    0.162,
    0.239,
    0.012,
    [0, 1.568, -0.141],
    darkShell,
    "Recessed rear torso access panel",
    0.012,
  );
  rearPanel.rotation.x = -0.12;
  for (let i = 0; i < 5; i += 1) {
    box(
      torso,
      [0.099 - i * 0.009, 0.004, 0.006],
      [0, 1.594 - i * 0.018, -0.158],
      inset,
      "Rear cooling vent",
      0.002,
    );
  }
  for (const side of [-1, 1]) {
    const sidePanel = oval(
      torso,
      0.095,
      0.176,
      0.016,
      [side * 0.213, 1.591, -0.011],
      darkShell,
      "Recessed shoulder-side panel",
      0.011,
    );
    sidePanel.rotation.y = (side * Math.PI) / 2;
    const accent = box(
      torso,
      [0.005, 0.058, 0.012],
      [side * 0.237, 1.639, 0.042],
      statusLight,
      "Amber shoulder seam detail",
      0.004,
    );
    accent.rotation.z = -side * 0.19;
  }

  // The yaw/tilt/roll actuators sit inside the head’s fitted neck shroud.
  cylinder(group, 0.052, 0.061, 0.027, [0, 1.779, -0.049], inset, "Neck yaw actuator", "y", 28);
  const neck = between(group, [0, 1.782, -0.049], [0, 1.85, -0.074], "Slender neck riser");
  cylinder(neck, 0.03, 0.038, 0.078, [0, 0, 0], darkShell, "Neck lift link", "y", 24);
  cylinder(group, 0.031, 0.031, 0.093, [0, 1.842, -0.07], inset, "Neck tilt actuator", "x", 24);
  cylinder(group, 0.034, 0.034, 0.03, [0, 1.861, -0.045], jointMetal, "Neck roll bearing", "z", 24);
  cable(
    group,
    [
      [0, 1.785, -0.083],
      [0, 1.82, -0.108],
      [0, 1.858, -0.089],
    ],
    "Protected neck cable",
    0.006,
    rubber,
    12,
  );

  const head = createFriendlyHead(group, {
    material,
    geometry,
    mesh,
    box,
    cylinder,
    sphere,
    cable,
    housing,
    oval,
  });

  const handleRadius = 0.011;
  const padOffset = 0.011;
  const padHalfThickness = 0.0015;
  const graspRadius = handleRadius + padOffset + padHalfThickness;
  const firstFingerAngle = 0.17;
  const proximalTangency = 0.0345;
  const fingerBaseOffset = 0.066;
  const handleInPalm = new THREE.Vector3(
    0,
    -(
      fingerBaseOffset +
      Math.cos(firstFingerAngle) * proximalTangency -
      Math.sin(firstFingerAngle) * graspRadius
    ),
    -(Math.sin(firstFingerAngle) * proximalTangency + Math.cos(firstFingerAngle) * graspRadius),
  );

  interface RobotDigit {
    joints: [THREE.Group, THREE.Group, THREE.Group];
    lengths: [number, number, number];
    carryAngles: [number, number, number];
  }

  interface RobotArm {
    shoulder: THREE.Group;
    elbow: THREE.Group;
    wrist: THREE.Group;
    fingers: RobotDigit[];
    thumb: RobotDigit;
    side: number;
  }

  function makeArm(side: number): RobotArm {
    const shoulder = new THREE.Group();
    shoulder.name = `${side > 0 ? "Left" : "Right"} shoulder pivot`;
    shoulder.position.set(side * 0.319, 1.663, -0.026);
    group.add(shoulder);
    cylinder(
      shoulder,
      0.058,
      0.058,
      0.162,
      [-side * 0.04, 0, 0],
      darkShell,
      "Shoulder connecting spindle",
      "x",
      24,
    );
    sphere(shoulder, [0.085, 0.086, 0.084], [0, 0, 0], darkShell, "Spherical shoulder joint");
    const cap = mesh(
      shoulder,
      geometry(
        "shoulder-cap",
        () => new THREE.SphereGeometry(0.089, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.58),
      ),
      pearl,
      "White shoulder cap",
      [side * 0.014, 0.019, 0],
    );
    cap.rotation.z = (-side * Math.PI) / 2;
    housing(
      shoulder,
      [
        [-0.292, 0, 0],
        [-0.28, 0.043, 0.045],
        [-0.24, 0.055, 0.054],
        [-0.117, 0.067, 0.068],
        [-0.078, 0.057, 0.061],
        [-0.052, 0, 0],
      ],
      [0, 0, 0],
      shell,
      "Smooth tapered white upper-arm shell",
      28,
      20,
    );
    cylinder(shoulder, 0.049, 0.049, 0.022, [0, -0.284, 0], inset, "Upper-arm joint seal", "y", 20);

    const elbow = new THREE.Group();
    elbow.name = "Elbow flexion pivot";
    elbow.position.set(0, -0.321, 0);
    shoulder.add(elbow);
    sphere(elbow, [0.068, 0.071, 0.069], [0, 0, 0], darkShell, "Spherical elbow actuator");
    cylinder(
      elbow,
      0.055,
      0.058,
      0.014,
      [side * 0.065, 0, 0],
      shell,
      "White elbow end cap",
      "x",
      28,
    );
    cylinder(elbow, 0.027, 0.027, 0.006, [side * 0.075, 0, 0], inset, "Elbow axis recess", "x", 20);
    housing(
      elbow,
      [
        [-0.274, 0, 0],
        [-0.262, 0.035, 0.039],
        [-0.224, 0.045, 0.049],
        [-0.11, 0.061, 0.061],
        [-0.069, 0.055, 0.056],
        [-0.041, 0, 0],
      ],
      [0, 0, 0],
      pearl,
      "Smooth white forearm shell",
      28,
      20,
    );
    box(
      elbow,
      [0.033, 0.095, 0.013],
      [0, -0.172, -0.055],
      darkShell,
      "Forearm underside equipment inset",
      0.011,
    );
    box(elbow, [0.038, 0.039, 0.021], [0, -0.241, -0.043], inset, "Wrist vision housing", 0.009);
    cylinder(
      elbow,
      0.009,
      0.009,
      0.008,
      [0, -0.242, -0.057],
      lensMaterial,
      "Wrist vision lens",
      "z",
      16,
    );
    cylinder(
      elbow,
      0.034,
      0.036,
      0.034,
      [0, -0.275, 0],
      darkShell,
      "Dark wrist rotation collar",
      "y",
      24,
    );

    const wrist = new THREE.Group();
    wrist.name = "Wrist pivot";
    wrist.position.y = -0.294;
    elbow.add(wrist);
    sphere(wrist, [0.027, 0.027, 0.027], [0, 0, 0], darkShell, "Wrist universal bearing");
    box(wrist, [0.086, 0.073, 0.044], [0, -0.034, 0], shell, "White dexterous hand palm", 0.017);
    box(
      wrist,
      [0.071, 0.051, 0.011],
      [0, -0.032, 0.021],
      pearl,
      "White dorsal actuator cover",
      0.011,
    );
    box(
      wrist,
      [0.061, 0.043, 0.006],
      [0, -0.035, -0.024],
      rubber,
      "Compliant palmar surface",
      0.009,
    );
    for (const x of [-0.027, 0.027]) {
      for (const y of [-0.017, -0.049]) {
        cylinder(
          wrist,
          0.0023,
          0.0023,
          0.002,
          [x, y, 0.028],
          jointMetal,
          "Recessed dorsal fastener",
          "z",
          10,
        );
      }
    }

    function phalanx(
      parent: THREE.Group,
      length: number,
      width: number,
      name: string,
      contactAt: number,
      verifiesContact: boolean,
    ) {
      cylinder(
        parent,
        0.0073,
        0.0073,
        width + 0.003,
        [0, 0, 0],
        jointMetal,
        `${name} hinge pin`,
        "x",
        16,
      );
      for (const pinSide of [-1, 1]) {
        cylinder(
          parent,
          0.0051,
          0.0051,
          0.002,
          [pinSide * (width / 2 + 0.002), 0, 0],
          jointFace,
          `${name} metal pin cap`,
          "x",
          12,
        );
      }
      box(
        parent,
        [width, length - 0.006, 0.017],
        [0, -length / 2, 0.001],
        shell,
        `${name} white phalanx`,
        0.006,
      );
      box(
        parent,
        [width * 0.75, length * 0.58, 0.004],
        [0, -length * 0.49, 0.009],
        pearl,
        `${name} dorsal shell`,
        0.003,
      );
      box(
        parent,
        [width * 0.76, 0.01, padHalfThickness * 2],
        [0, -contactAt, -padOffset],
        rubber,
        `${name} tactile pad`,
        0.0013,
      );
      if (verifiesContact) {
        const contact = new THREE.Object3D();
        contact.name = `${side > 0 ? "Left" : "Right"} ${name} grip contact`;
        contact.position.set(0, -contactAt, -padOffset - padHalfThickness);
        contact.userData.gripContact = true;
        contact.userData.handleSide = side;
        parent.add(contact);
      }
    }

    const fingers: RobotDigit[] = [];
    for (let i = 0; i < 4; i += 1) {
      const [proximalLength, middleLength] = [
        [0.044, 0.033],
        [0.047, 0.035],
        [0.046, 0.034],
        [0.041, 0.031],
      ][i];
      const centerU = -handleInPalm.y - fingerBaseOffset;
      const centerV = -handleInPalm.z;
      const firstU = Math.cos(firstFingerAngle) * proximalLength;
      const firstV = Math.sin(firstFingerAngle) * proximalLength;
      const middleAngle =
        2 * Math.atan2(centerV - firstV, centerU - firstU) - firstFingerAngle - Math.PI;
      const secondU = firstU + Math.cos(middleAngle) * middleLength;
      const secondV = firstV + Math.sin(middleAngle) * middleLength;
      let centerDirection = Math.atan2(centerV - secondV, centerU - secondU);
      if (centerDirection < 0) centerDirection += Math.PI * 2;
      const tipAngle = 2 * centerDirection - middleAngle - Math.PI;
      const middleTangency =
        (centerU - firstU) * Math.cos(middleAngle) + (centerV - firstV) * Math.sin(middleAngle);
      const tipTangency =
        (centerU - secondU) * Math.cos(tipAngle) + (centerV - secondV) * Math.sin(tipAngle);
      const tipLength = tipTangency + 0.006;
      const finger = new THREE.Group();
      finger.name = `Articulated finger ${i + 1}`;
      finger.position.set((i - 1.5) * 0.022, -fingerBaseOffset, 0);
      wrist.add(finger);
      const middle = new THREE.Group();
      middle.name = "Finger middle joint";
      middle.position.y = -proximalLength;
      finger.add(middle);
      const tip = new THREE.Group();
      tip.name = "Fingertip joint";
      tip.position.y = -middleLength;
      middle.add(tip);
      const width = i === 3 ? 0.017 : 0.019;
      phalanx(finger, proximalLength, width, `Finger ${i + 1} proximal`, proximalTangency, true);
      phalanx(middle, middleLength, width * 0.94, `Finger ${i + 1} middle`, middleTangency, true);
      phalanx(tip, tipLength, width * 0.9, `Finger ${i + 1} fingertip`, tipTangency, true);
      fingers.push({
        joints: [finger, middle, tip],
        lengths: [proximalLength, middleLength, tipLength],
        carryAngles: [firstFingerAngle, middleAngle - firstFingerAngle, tipAngle - middleAngle],
      });
    }

    const thumbRoot = new THREE.Group();
    thumbRoot.name = "Opposed thumb saddle";
    thumbRoot.position.set(-side * 0.048, -0.026, -0.007);
    wrist.add(thumbRoot);
    sphere(thumbRoot, [0.015, 0.017, 0.014], [0, 0, 0], jointMetal, "Thumb opposition bearing");
    const thumbMiddle = new THREE.Group();
    thumbMiddle.name = "Thumb proximal hinge";
    thumbMiddle.position.y = -0.032;
    thumbRoot.add(thumbMiddle);
    const thumbTip = new THREE.Group();
    thumbTip.name = "Thumb distal hinge";
    thumbTip.position.y = -0.036;
    thumbMiddle.add(thumbTip);
    phalanx(thumbRoot, 0.032, 0.024, "Thumb metacarpal", 0.018, false);
    phalanx(thumbMiddle, 0.036, 0.023, "Thumb proximal", 0.022, false);
    phalanx(thumbTip, 0.031, 0.021, "Thumb fingertip", 0.022, true);
    const thumb: RobotDigit = {
      joints: [thumbRoot, thumbMiddle, thumbTip],
      lengths: [0.032, 0.036, 0.031],
      carryAngles: [0, 0, 0],
    };
    return { shoulder, elbow, wrist, fingers, thumb, side };
  }

  const arms = [makeArm(-1), makeArm(1)];

  // Open-topped basket with individually modelled woven bands and uprights.
  // The carried load gives visitors the same deployment context as the photos.
  const basket = new THREE.Group();
  basket.name = "Carried laundry basket";
  basket.position.set(0, 1.089, 0.457);
  group.add(basket);

  function roundedRectangle(width: number, depth: number, y: number, radius: number): Point[] {
    const points: Point[] = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5],
    ];
    for (const [x, z, start] of corners) {
      for (let step = 0; step <= 4; step += 1) {
        const angle = start + (step * Math.PI) / 8;
        points.push([x + Math.cos(angle) * radius, y, z + Math.sin(angle) * radius]);
      }
    }
    return points;
  }

  box(basket, [0.48, 0.015, 0.285], [0, -0.137, 0], basketInterior, "Basket floor", 0.035);
  const bottomCurve = new THREE.CatmullRomCurve3(
    roundedRectangle(0.491, 0.29, -0.138, 0.04).map((point) => new THREE.Vector3(...point)),
    true,
  );
  const topCurve = new THREE.CatmullRomCurve3(
    roundedRectangle(0.629, 0.395, 0.142, 0.044).map((point) => new THREE.Vector3(...point)),
    true,
  );
  // A recessed open lining keeps the tightly woven body opaque, while the
  // raised reeds supply its texture. There is deliberately no lid or top cap.
  const wallVertices: number[] = [];
  const wallIndices: number[] = [];
  for (let i = 0; i <= 80; i += 1) {
    for (const curve of [bottomCurve, topCurve]) {
      const point = curve.getPointAt(i / 80);
      wallVertices.push(point.x * 0.99, point.y, point.z * 0.99);
    }
    if (i < 80) {
      const first = i * 2;
      wallIndices.push(first, first + 1, first + 2, first + 1, first + 3, first + 2);
    }
  }
  const wallGeometry = new THREE.BufferGeometry();
  wallGeometry.setAttribute("position", new THREE.Float32BufferAttribute(wallVertices, 3));
  wallGeometry.setIndex(wallIndices);
  wallGeometry.computeVertexNormals();
  mesh(basket, wallGeometry, basketInterior, "Recessed woven basket lining");

  // Merge the fine weave into four surfaces, rather than adding a draw call
  // for each reed. The tiny alternating offsets create an over-under pattern.
  const weaveGeometry: THREE.BufferGeometry[][] = wicker.map(() => []);
  const stakeCount = 64;
  for (let row = 0; row < 30; row += 1) {
    const t = row / 29;
    const points = Array.from({ length: 128 }, (_, index) => {
      const u = index / 128;
      const point = bottomCurve.getPointAt(u).lerp(topCurve.getPointAt(u), t);
      const offset = Math.cos(u * stakeCount * Math.PI * 2 + row * Math.PI) * 0.0022;
      const outward = new THREE.Vector3(point.x, 0, point.z).normalize();
      return point.addScaledVector(outward, offset);
    });
    weaveGeometry[row % wicker.length].push(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 128, 0.0052, 4, true),
    );
  }
  for (let stake = 0; stake < stakeCount; stake += 1) {
    const lower = bottomCurve.getPointAt(stake / stakeCount);
    const upper = topCurve.getPointAt(stake / stakeCount);
    const points = Array.from({ length: 17 }, (_, index) => {
      const t = index / 16;
      const point = lower.clone().lerp(upper, t);
      const outward = new THREE.Vector3(point.x, 0, point.z).normalize();
      return point.addScaledVector(outward, Math.sin(t * Math.PI * 29 + stake * Math.PI) * 0.002);
    });
    weaveGeometry[(stake + 1) % wicker.length].push(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 16, 0.0034, 4),
    );
  }
  weaveGeometry.forEach((parts, index) => {
    const combined = mergeGeometries(parts, false);
    parts.forEach((part) => part.dispose());
    if (combined) mesh(basket, combined, wicker[index], "Dense interlaced wicker reeds");
  });
  cable(
    basket,
    roundedRectangle(0.632, 0.397, 0.151, 0.044),
    "Basket reinforced upper rim",
    0.014,
    wicker[0],
    64,
    true,
  );
  for (const side of [-1, 1]) {
    cable(
      basket,
      [
        [side * 0.306, 0.13, -0.102],
        [side * 0.32, 0.208, -0.099],
        [side * 0.32, 0.246, -0.077],
      ],
      "Basket rear handle arch",
      handleRadius,
      wicker[0],
      16,
    );
    const gripBar = cylinder(
      basket,
      handleRadius,
      handleRadius,
      0.128,
      [side * 0.32, 0.246, -0.013],
      wicker[0],
      `${side > 0 ? "Left" : "Right"} basket grip bar`,
      "z",
      24,
    );
    gripBar.userData.handleSide = side;
    gripBar.userData.gripRadius = handleRadius;
    cable(
      basket,
      [
        [side * 0.32, 0.246, 0.051],
        [side * 0.321, 0.209, 0.08],
        [side * 0.31, 0.145, 0.092],
      ],
      "Basket front handle arch",
      handleRadius,
      wicker[0],
      16,
    );
  }
  function foldedTowel(
    size: Point,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    turn: number,
  ) {
    const shape = new RoundedBoxGeometry(...size, 4, size[1] * 0.44);
    const vertices = shape.getAttribute("position");
    for (let i = 0; i < vertices.count; i += 1) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const z = vertices.getZ(i);
      vertices.setXYZ(i, x, y + Math.sin(x * 23 + z * 16) * 0.0035 + Math.cos(x * 39) * 0.0018, z);
    }
    shape.computeVertexNormals();
    const towel = mesh(basket, shape, surface, "Soft folded laundry towel", position);
    towel.rotation.y = turn;
    // The visible doubled edge reads as a fold rather than a solid white tile.
    const foldPoints: Point[] = Array.from({ length: 11 }, (_, index) => {
      const x = (index / 10 - 0.5) * size[0] * 0.83;
      return [x, -0.003 + Math.sin(x * 23) * 0.003, size[2] / 2 + 0.0005];
    });
    cable(towel, foldPoints, "Towel folded edge", 0.0012, linenSeam, 12);
    return towel;
  }
  foldedTowel([0.345, 0.082, 0.223], [-0.033, 0.137, -0.017], linenShadow, -0.13);
  foldedTowel([0.269, 0.057, 0.182], [-0.068, 0.197, -0.015], linen, -0.19);
  foldedTowel([0.229, 0.048, 0.158], [-0.079, 0.247, -0.026], linenCream, -0.1);
  foldedTowel([0.141, 0.072, 0.225], [0.166, 0.164, -0.006], linen, 0.21);

  const clothGeometry = new THREE.PlaneGeometry(0.214, 1, 22, 24);
  const drapeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.211, -0.062),
    new THREE.Vector3(0, 0.229, 0.025),
    new THREE.Vector3(0, 0.21, 0.108),
    new THREE.Vector3(0, 0.163, 0.192),
    new THREE.Vector3(0, 0.066, 0.215),
    new THREE.Vector3(0, 0.011, 0.211),
  ]);
  const drapedPoint = (x: number, t: number): Point => {
    const point = drapeCurve.getPoint(t);
    const ripple = Math.sin(x * 97 + t * 3.5) * 0.008 + Math.cos(x * 43 - t * 7) * 0.003;
    return [x + 0.132 + Math.sin(t * 4) * 0.008, point.y + ripple, point.z + ripple * t];
  };
  const clothVertices = clothGeometry.getAttribute("position");
  for (let i = 0; i < clothVertices.count; i += 1) {
    const x = clothVertices.getX(i);
    const t = 0.5 - clothVertices.getY(i);
    clothVertices.setXYZ(i, ...drapedPoint(x, t));
  }
  clothGeometry.computeVertexNormals();
  mesh(basket, clothGeometry, linen, "Soft linen draped over basket rim");
  cable(
    basket,
    Array.from({ length: 19 }, (_, index) => drapedPoint((index / 18 - 0.5) * 0.214, 0.978)),
    "Draped linen hem",
    0.0015,
    linenSeam,
    20,
  );

  function curlFingers(arm: RobotArm, amount: number) {
    arm.fingers.forEach((finger, i) => {
      finger.joints[0].rotation.set(amount + i * 0.025, 0, 0);
      finger.joints[1].rotation.set(amount * 0.8 + 0.04, 0, 0);
      finger.joints[2].rotation.set(amount * 0.6 + 0.03, 0, 0);
    });
    arm.thumb.joints[0].rotation.set(0.2, -arm.side * 0.12, -arm.side * 0.65);
    arm.thumb.joints[1].rotation.set(amount * 0.7 + 0.25, 0, 0);
    arm.thumb.joints[2].rotation.set(amount * 0.8 + 0.2, 0, 0);
  }

  function opposeThumb(arm: RobotArm) {
    const [base, middle, tip] = arm.thumb.joints;
    const [firstLength, secondLength, tipLength] = arm.thumb.lengths;
    // The thumb meets the inner side of the bar, opposing the four fingers
    // around its outer side. Its terminal link runs along the bar's axis.
    const padAxis = new THREE.Vector3(
      -arm.side * 0.008,
      handleInPalm.y + graspRadius,
      handleInPalm.z,
    );
    const terminalDirection = new THREE.Vector3(arm.side, 0, 0);
    const secondJoint = padAxis.clone().addScaledVector(terminalDirection, -0.022);
    const end = secondJoint.clone().addScaledVector(terminalDirection, tipLength);
    const start = base.position.clone();
    const difference = secondJoint.clone().sub(start);
    const distance = difference.length();
    const direction = difference.normalize();
    const outward = new THREE.Vector3(-arm.side, 0, 0);
    outward.addScaledVector(direction, -outward.dot(direction)).normalize();
    const along =
      (distance * distance + firstLength * firstLength - secondLength * secondLength) /
      (2 * distance);
    const height = Math.sqrt(Math.max(0, firstLength * firstLength - along * along));
    const firstJoint = start
      .clone()
      .addScaledVector(direction, along)
      .addScaledVector(outward, height);
    const points = [start, firstJoint, secondJoint, end];
    let previous = new THREE.Quaternion();
    [base, middle, tip].forEach((joint, index) => {
      const forward = points[index + 1].clone().sub(points[index]).normalize();
      const localY = forward.clone().negate();
      const midpoint = points[index]
        .clone()
        .add(points[index + 1])
        .multiplyScalar(0.5);
      const dorsal = new THREE.Vector3(0, midpoint.y - handleInPalm.y, midpoint.z - handleInPalm.z);
      dorsal.addScaledVector(localY, -dorsal.dot(localY)).normalize();
      const localX = localY.clone().cross(dorsal).normalize();
      const desired = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().makeBasis(localX, localY, dorsal),
      );
      joint.quaternion.copy(previous.clone().invert().multiply(desired));
      previous = desired;
    });
  }

  function carryArm(arm: RobotArm) {
    const handOrientation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(-Math.PI / 2, 0, (arm.side * Math.PI) / 2),
    );
    const handleCenter = new THREE.Vector3(
      arm.side * 0.32,
      basket.position.y + 0.246,
      basket.position.z - 0.013,
    );
    const target = handleCenter.sub(handleInPalm.clone().applyQuaternion(handOrientation));
    const start = arm.shoulder.position.clone();
    const difference = target.clone().sub(start);
    const distance = difference.length();
    const direction = difference.normalize();
    const upperLength = 0.321;
    const forearmLength = 0.294;
    const down = new THREE.Vector3(0, -1, 0);
    down.addScaledVector(direction, -down.dot(direction)).normalize();
    const along =
      (distance * distance + upperLength * upperLength - forearmLength * forearmLength) /
      (2 * distance);
    const height = Math.sqrt(Math.max(0, upperLength * upperLength - along * along));
    const elbowPoint = start
      .clone()
      .addScaledVector(direction, along)
      .addScaledVector(down, height);
    const upperDirection = elbowPoint.clone().sub(start).normalize();
    const forearmDirection = target.clone().sub(elbowPoint).normalize();
    const hinge = forearmDirection.clone().cross(upperDirection).normalize();
    const localY = upperDirection.clone().negate();
    const localZ = hinge.clone().cross(localY).normalize();
    arm.shoulder.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(hinge, localY, localZ),
    );
    arm.elbow.rotation.set(
      -Math.acos(THREE.MathUtils.clamp(upperDirection.dot(forearmDirection), -1, 1)),
      0,
      0,
    );
    const forearmOrientation = arm.shoulder.quaternion.clone().multiply(arm.elbow.quaternion);
    arm.wrist.quaternion.copy(forearmOrientation.invert().multiply(handOrientation));
    arm.fingers.forEach((finger) => {
      finger.joints.forEach((joint, index) => joint.rotation.set(finger.carryAngles[index], 0, 0));
    });
    opposeThumb(arm);
  }

  function resetArm(arm: RobotArm) {
    arm.shoulder.rotation.set(0, 0, arm.side * 0.035);
    arm.elbow.rotation.set(0, 0, 0);
    arm.wrist.rotation.set(0, 0, 0);
  }

  function setPose(pose: DeploymentRobotPose, phase = 0) {
    basket.visible = pose === "carry";
    head.rotation.set(0.035, 0, 0);
    for (const arm of arms) {
      resetArm(arm);
      if (pose === "carry") {
        carryArm(arm);
      } else {
        arm.shoulder.rotation.x = -0.04;
        arm.elbow.rotation.x = -0.12;
        curlFingers(arm, 0.23);
      }
    }
    if (pose === "wave") {
      const waving = arms[1];
      waving.shoulder.rotation.set(-0.08, -0.12, 1.05);
      waving.elbow.rotation.set(-0.17, 0, 1.5);
      waving.wrist.rotation.set(0, 0.05, Math.sin(phase * 2.7) * 0.27);
      curlFingers(waving, 0.035);
      head.rotation.y = -0.09;
      head.rotation.z = -0.035;
    }
  }

  function setArmAngle(degrees: number) {
    const radians = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(degrees, 0, 135));
    basket.visible = false;
    head.rotation.set(0.035, 0, 0);
    arms.forEach((arm) => {
      resetArm(arm);
      arm.elbow.rotation.x = -radians;
      curlFingers(arm, 0.2);
    });
  }

  function setWireframe(enabled: boolean) {
    materials.forEach((surface) => {
      surface.wireframe = enabled;
      const original = originalColors.get(surface);
      if (original) surface.color.copy(original);
      if (enabled && (surface === shell || surface === pearl || surface === jointFace)) {
        surface.color.set("#4d6359");
      }
    });
  }

  function dispose() {
    geometries.forEach((shape) => shape.dispose());
    materials.forEach((surface) => surface.dispose());
    geometries.clear();
    materials.clear();
    originalColors.clear();
    geometryCache.clear();
    group.clear();
  }

  setPose("carry");
  return { group, setPose, setArmAngle, setWireframe, dispose };
}
