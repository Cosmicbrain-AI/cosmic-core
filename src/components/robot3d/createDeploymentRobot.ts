import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

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
 * An articulated, photo-referenced visualization of the deployment robot.
 * The mobile platform sits on y=0, the sensor face looks toward +z, and
 * articulation stays in local joints so every view remains genuinely 3D.
 * This is an illustrative mesh, not an engineering CAD or collision model.
 */
export function createDeploymentRobot(): DeploymentRobotModel {
  const group = new THREE.Group();
  group.name = "CosmicBrain deployment robot";
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.MeshStandardMaterial>();
  const geometryCache = new Map<string, THREE.BufferGeometry>();

  function material(
    color: string,
    roughness = 0.48,
    metalness = 0.45,
    extra: Partial<THREE.MeshStandardMaterialParameters> = {},
  ) {
    const value = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    materials.add(value);
    return value;
  }

  const shell = material("#24292c", 0.36, 0.67);
  const darkShell = material("#121618", 0.43, 0.48);
  const inset = material("#0a0f13", 0.32, 0.48);
  const jointMetal = material("#404548", 0.38, 0.78);
  const jointFace = material("#676b69", 0.49, 0.7);
  const rubber = material("#0d1113", 0.85, 0.12);
  const cableMaterial = material("#1c2123", 0.37, 0.38);
  const visorMaterial = material("#09171b", 0.11, 0.8);
  const lensMaterial = material("#748480", 0.23, 0.88);
  const statusLight = material("#8ce9f0", 0.2, 0.15, {
    emissive: "#31cadb",
    emissiveIntensity: 1.2,
    toneMapped: false,
  });
  const redButton = material("#842c28", 0.37, 0.45);
  const wicker = [
    material("#8e5630", 0.89, 0.02),
    material("#aa7142", 0.86, 0.02),
    material("#b7814d", 0.91, 0.02),
    material("#71472c", 0.94, 0.02),
  ];
  const basketInterior = material("#503722", 0.99, 0);
  const linen = material("#e5e1d6", 0.98, 0, { side: THREE.DoubleSide });
  const linenShadow = material("#bfc5bd", 0.99, 0);

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
    surface = cableMaterial,
    segments = 24,
    closed = false,
  ) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((point) => new THREE.Vector3(...point)),
      closed,
    );
    return mesh(parent, new THREE.TubeGeometry(curve, segments, radius, 5, closed), surface, name);
  }

  function plate(
    parent: THREE.Object3D,
    points: [number, number][],
    depth: number,
    position: Point,
    surface: THREE.MeshStandardMaterial,
    name: string,
    bevel = 0.012,
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(...points[0]);
    points.slice(1).forEach((point) => shape.lineTo(...point));
    shape.closePath();
    const extrusion = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: bevel > 0,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 8,
    });
    extrusion.translate(0, 0, -depth / 2);
    return mesh(parent, extrusion, surface, name, position);
  }

  function link(
    parent: THREE.Object3D,
    from: Point,
    to: Point,
    width: number,
    depth: number,
    name: string,
  ) {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const length = start.distanceTo(end);
    const assembly = new THREE.Group();
    assembly.name = name;
    assembly.position.copy(start).add(end).multiplyScalar(0.5);
    assembly.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
    parent.add(assembly);
    box(assembly, [width, length * 0.91, depth], [0, 0, 0], shell, `${name} shell`, width * 0.2);
    box(
      assembly,
      [width * 0.66, length * 0.66, 0.018],
      [0, 0, depth / 2 + 0.005],
      jointMetal,
      `${name} cover`,
      0.011,
    );
    box(
      assembly,
      [width * 0.29, length * 0.45, 0.012],
      [0, 0, -depth / 2 - 0.004],
      inset,
      `${name} rear recess`,
      0.004,
    );
    for (const x of [-1, 1]) {
      for (const y of [-1, 1]) {
        cylinder(
          assembly,
          0.009,
          0.009,
          0.004,
          [x * width * 0.32, y * length * 0.32, depth / 2 + 0.017],
          inset,
          `${name} cover fastener`,
          "z",
          8,
        );
      }
    }
    return assembly;
  }

  // The wide, low wheel platform is a bevelled superellipse, rather than a
  // humanoid's feet. Its silhouette is prominent in the supplied deployment photos.
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
          Math.sign(cos) * Math.pow(Math.abs(cos), 0.72) * ring.x,
          ring.y,
          Math.sign(sin) * Math.pow(Math.abs(sin), 0.72) * ring.z,
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
    for (let i = 0; i < count; i += 1)
      indices.push(topCenter, topRing + ((i + 1) % count), topRing + i);
    const shape = new THREE.BufferGeometry();
    shape.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    shape.setIndex(indices);
    shape.computeVertexNormals();
    return shape;
  }

  mesh(
    base,
    platformShell([
      { y: 0.075, x: 0.487, z: 0.428 },
      { y: 0.092, x: 0.514, z: 0.446 },
      { y: 0.125, x: 0.514, z: 0.446 },
      { y: 0.302, x: 0.441, z: 0.37 },
      { y: 0.326, x: 0.415, z: 0.346 },
    ]),
    shell,
    "Chamfered graphite platform casing",
  );
  mesh(
    base,
    platformShell([
      { y: 0.057, x: 0.49, z: 0.427 },
      { y: 0.061, x: 0.504, z: 0.438 },
      { y: 0.079, x: 0.504, z: 0.438 },
    ]),
    rubber,
    "Continuous lower bumper",
  );
  cylinder(base, 0.28, 0.28, 0.023, [0, 0.334, -0.015], inset, "Turntable perimeter", "y", 48);
  cylinder(base, 0.248, 0.257, 0.022, [0, 0.35, -0.015], darkShell, "Turntable top", "y", 48);

  for (const side of [-1, 1]) {
    cylinder(
      base,
      0.116,
      0.116,
      0.092,
      [side * 0.443, 0.117, -0.015],
      rubber,
      "Recessed drive wheel",
      "x",
      28,
    );
    cylinder(base, 0.069, 0.069, 0.007, [side * 0.493, 0.117, -0.015], inset, "Wheel hub", "x");
    for (let i = 0; i < 12; i += 1) {
      const angle = (i * Math.PI) / 6;
      const tread = box(
        base,
        [0.08, 0.009, 0.017],
        [side * 0.443, 0.117 + Math.cos(angle) * 0.114, -0.015 + Math.sin(angle) * 0.114],
        rubber,
        "Wheel tread",
        0.003,
      );
      tread.rotation.x = angle;
    }
    cylinder(
      base,
      0.024,
      0.039,
      0.019,
      [side * 0.295, 0.338, 0.193],
      inset,
      "Platform corner sensor",
    );
    sphere(
      base,
      [0.023, 0.017, 0.023],
      [side * 0.295, 0.35, 0.193],
      visorMaterial,
      "Platform sensor glass",
    );
    const sideSeam = box(
      base,
      [0.009, 0.141, 0.006],
      [side * 0.45, 0.22, 0.22],
      inset,
      "Platform panel seam",
      0.002,
    );
    sideSeam.rotation.z = side * -0.31;
  }

  const baseLamp = new THREE.Group();
  baseLamp.name = "Front platform status light";
  baseLamp.position.set(0.22, 0.213, 0.404);
  baseLamp.rotation.x = -0.37;
  base.add(baseLamp);
  box(baseLamp, [0.071, 0.122, 0.014], [0, 0, 0], inset, "Status light recess", 0.018);
  box(baseLamp, [0.033, 0.082, 0.012], [0, 0, 0.01], statusLight, "Cyan status window", 0.01);
  const controlPanel = box(
    base,
    [0.12, 0.009, 0.079],
    [0.27, 0.329, -0.183],
    inset,
    "Platform control inset",
    0.009,
  );
  controlPanel.rotation.x = 0.06;
  cylinder(base, 0.019, 0.023, 0.014, [-0.379, 0.302, -0.16], redButton, "Emergency stop button");
  box(base, [0.088, 0.035, 0.012], [0, 0.15, -0.428], inset, "Rear charging recess", 0.006);

  // A pair of bent, mechanically supported links creates the distinctive
  // crouched upper-body stance of the real robot on its wheeled base.
  for (const side of [-1, 1]) {
    const x = side * 0.126;
    const ankle: Point = [x, 0.403, -0.115];
    const knee: Point = [x, 0.805, 0.153];
    const hip: Point = [x, 1.237, -0.076];
    link(group, ankle, knee, 0.117, 0.133, "Lower articulated support");
    link(group, knee, hip, 0.141, 0.158, "Upper articulated support");
    for (const [point, radius, name] of [
      [ankle, 0.083, "Ankle"],
      [knee, 0.093, "Knee"],
      [hip, 0.087, "Hip"],
    ] as const) {
      cylinder(
        group,
        radius,
        radius,
        0.158,
        [...point],
        darkShell,
        `${name} actuator housing`,
        "x",
      );
      cylinder(
        group,
        radius * 0.77,
        radius * 0.77,
        0.007,
        [point[0] + side * 0.084, point[1], point[2]],
        jointFace,
        `${name} actuator face`,
        "x",
      );
      cylinder(
        group,
        radius * 0.28,
        radius * 0.28,
        0.009,
        [point[0] + side * 0.089, point[1], point[2]],
        jointMetal,
        `${name} axle`,
        "x",
      );
    }
    cable(
      group,
      [
        [x + side * 0.085, 1.22, -0.13],
        [x + side * 0.115, 1.05, -0.072],
        [x + side * 0.102, 0.79, 0.072],
        [x + side * 0.103, 0.66, 0.051],
        [x + side * 0.078, 0.42, -0.12],
      ],
      "Leg actuator cable",
      0.006,
    );
  }

  cylinder(group, 0.14, 0.145, 0.102, [0, 1.228, -0.066], inset, "Waist rotation joint", "y", 32);
  box(group, [0.343, 0.153, 0.264], [0, 1.266, -0.066], darkShell, "Pelvis shell", 0.048);

  const torso = new THREE.Group();
  torso.name = "Upper torso";
  torso.position.set(0, 1.302, -0.052);
  group.add(torso);
  plate(
    torso,
    [
      [-0.14, 0],
      [-0.21, 0.13],
      [-0.28, 0.32],
      [-0.281, 0.435],
      [-0.18, 0.482],
      [0.18, 0.482],
      [0.281, 0.435],
      [0.28, 0.32],
      [0.21, 0.13],
      [0.14, 0],
    ],
    0.225,
    [0, 0, 0],
    shell,
    "Tapered torso armor",
    0.03,
  );
  plate(
    torso,
    [
      [-0.108, 0.035],
      [-0.216, 0.287],
      [-0.144, 0.37],
      [0.144, 0.37],
      [0.216, 0.287],
      [0.108, 0.035],
    ],
    0.013,
    [0, 0, 0.143],
    inset,
    "Angular chest inset",
    0.007,
  );
  plate(
    torso,
    [
      [-0.102, 0.052],
      [-0.18, 0.235],
      [-0.166, 0.364],
      [0.166, 0.364],
      [0.18, 0.235],
      [0.102, 0.052],
    ],
    0.009,
    [0, 0, -0.139],
    darkShell,
    "Rear torso cover",
    0.012,
  );
  box(torso, [0.205, 0.037, 0.02], [0, 0.408, 0.135], darkShell, "Upper chest seam", 0.009);
  for (let i = 0; i < 5; i += 1) {
    box(
      torso,
      [0.12 - i * 0.006, 0.008, 0.009],
      [0, 0.305 - i * 0.02, -0.154],
      inset,
      "Back ventilation slot",
      0.002,
    );
  }
  for (const side of [-1, 1]) {
    cylinder(
      torso,
      0.027,
      0.027,
      0.013,
      [side * 0.162, 0.4, -0.147],
      jointMetal,
      "Rear cable connector",
      "z",
      16,
    );
    cable(
      group,
      [
        [side * 0.163, 1.711, -0.211],
        [side * 0.26, 1.61, -0.28],
        [side * 0.276, 1.35, -0.31],
        [side * 0.16, 1.11, -0.214],
        [side * 0.099, 1.173, -0.147],
      ],
      "External torso cable loop",
      0.0065,
    );
  }

  cylinder(group, 0.083, 0.093, 0.063, [0, 1.825, -0.051], inset, "Neck yaw actuator");
  cylinder(group, 0.053, 0.053, 0.097, [0, 1.873, -0.044], jointMetal, "Neck tilt joint", "x");
  const head = new THREE.Group();
  head.name = "Sensor head";
  head.position.set(0, 1.954, -0.031);
  head.rotation.x = 0.08;
  group.add(head);
  box(head, [0.345, 0.227, 0.236], [0, 0.019, 0], darkShell, "Rounded sensor-head housing", 0.077);
  box(head, [0.315, 0.183, 0.034], [0, -0.006, 0.112], jointMetal, "Sensor bezel edge", 0.061);
  box(head, [0.3, 0.168, 0.032], [0, -0.006, 0.134], inset, "Black front bezel", 0.06);
  box(
    head,
    [0.254, 0.104, 0.013],
    [0, -0.013, 0.153],
    visorMaterial,
    "Smoked horizontal sensor visor",
    0.038,
  );
  box(
    head,
    [0.201, 0.043, 0.008],
    [0, -0.032, 0.162],
    lensMaterial,
    "Horizontal camera window",
    0.018,
  );
  box(
    head,
    [0.17, 0.019, 0.004],
    [0, -0.031, 0.168],
    visorMaterial,
    "Recessed optical strip",
    0.007,
  );
  for (const x of [-0.054, 0.054]) {
    cylinder(head, 0.011, 0.011, 0.005, [x, -0.031, 0.172], inset, "Optical sensor", "z", 16);
    cylinder(
      head,
      0.005,
      0.005,
      0.006,
      [x, -0.031, 0.175],
      lensMaterial,
      "Optical reflection",
      "z",
      12,
    );
  }
  box(head, [0.15, 0.004, 0.004], [0, 0.051, 0.151], jointMetal, "Upper visor highlight", 0.001);
  for (const side of [-1, 1]) {
    cylinder(
      head,
      0.042,
      0.042,
      0.012,
      [side * 0.17, -0.013, -0.012],
      inset,
      "Head side hinge",
      "x",
    );
  }

  interface RobotArm {
    shoulder: THREE.Group;
    elbow: THREE.Group;
    wrist: THREE.Group;
    fingers: THREE.Group[];
    side: number;
  }

  function makeArm(side: number): RobotArm {
    const shoulder = new THREE.Group();
    shoulder.name = `${side > 0 ? "Left" : "Right"} shoulder pivot`;
    shoulder.position.set(side * 0.353, 1.723, -0.033);
    group.add(shoulder);
    cylinder(shoulder, 0.094, 0.094, 0.116, [0, 0, 0], inset, "Shoulder actuator", "x");
    sphere(
      shoulder,
      [0.1, 0.13, 0.109],
      [side * 0.022, -0.015, 0],
      shell,
      "Rounded shoulder armor",
    );
    cylinder(
      shoulder,
      0.066,
      0.066,
      0.007,
      [side * 0.106, -0.006, 0],
      darkShell,
      "Shoulder end cap",
      "x",
    );
    cylinder(shoulder, 0.055, 0.067, 0.245, [0, -0.183, 0], shell, "Upper arm casing");
    box(
      shoulder,
      [0.079, 0.176, 0.018],
      [0, -0.184, 0.057],
      darkShell,
      "Upper arm front panel",
      0.012,
    );
    cylinder(shoulder, 0.063, 0.063, 0.018, [0, -0.292, 0], inset, "Upper arm casing seam");
    cable(
      shoulder,
      [
        [side * 0.05, -0.057, -0.081],
        [side * 0.101, -0.145, -0.086],
        [side * 0.112, -0.279, -0.05],
        [side * 0.063, -0.352, -0.015],
      ],
      "Upper arm external cable",
      0.005,
    );

    const elbow = new THREE.Group();
    elbow.name = "Elbow flexion pivot";
    elbow.position.set(0, -0.351, 0);
    shoulder.add(elbow);
    cylinder(elbow, 0.073, 0.073, 0.137, [0, 0, 0], darkShell, "Elbow actuator", "x");
    cylinder(
      elbow,
      0.057,
      0.057,
      0.009,
      [side * 0.075, 0, 0],
      jointFace,
      "Elbow actuator plate",
      "x",
    );
    cylinder(elbow, 0.018, 0.018, 0.011, [side * 0.081, 0, 0], jointMetal, "Elbow axle", "x");
    cylinder(elbow, 0.061, 0.049, 0.253, [0, -0.182, 0], shell, "Forearm casing");
    cylinder(elbow, 0.062, 0.062, 0.014, [0, -0.074, 0], inset, "Forearm upper seam");
    box(elbow, [0.071, 0.16, 0.018], [0, -0.187, -0.047], inset, "Forearm equipment panel", 0.009);
    box(elbow, [0.037, 0.051, 0.022], [0, -0.23, -0.065], darkShell, "Wrist camera mount", 0.008);
    box(elbow, [0.042, 0.026, 0.036], [0, -0.223, -0.088], inset, "Wrist camera housing", 0.008);
    cylinder(
      elbow,
      0.008,
      0.008,
      0.006,
      [0, -0.223, -0.109],
      visorMaterial,
      "Wrist camera lens",
      "z",
      12,
    );
    cable(
      elbow,
      [
        [side * 0.042, -0.021, -0.045],
        [side * 0.097, -0.114, -0.084],
        [side * 0.087, -0.242, -0.095],
        [side * 0.028, -0.333, -0.039],
      ],
      "Forearm external cable",
      0.005,
    );
    cylinder(elbow, 0.046, 0.046, 0.044, [0, -0.324, 0], jointMetal, "Wrist rotating collar");

    const wrist = new THREE.Group();
    wrist.name = "Wrist pivot";
    wrist.position.y = -0.353;
    elbow.add(wrist);
    box(wrist, [0.089, 0.087, 0.057], [0, -0.041, 0], darkShell, "Gripper palm", 0.016);
    box(wrist, [0.055, 0.051, 0.013], [0, -0.038, -0.032], shell, "Gripper back plate", 0.007);
    const fingers: THREE.Group[] = [];
    for (let i = 0; i < 3; i += 1) {
      const finger = new THREE.Group();
      finger.name = `Gripper finger ${i + 1}`;
      finger.position.set((i - 1) * 0.029, -0.079, 0.002);
      wrist.add(finger);
      cylinder(finger, 0.013, 0.013, 0.022, [0, 0, 0], jointMetal, "Finger knuckle", "x", 12);
      box(
        finger,
        [0.021, 0.048, 0.024],
        [0, -0.025, 0],
        darkShell,
        "Finger proximal segment",
        0.005,
      );
      const fingertip = new THREE.Group();
      fingertip.name = "Finger distal joint";
      fingertip.position.y = -0.048;
      fingertip.rotation.x = 0.58;
      finger.add(fingertip);
      box(fingertip, [0.019, 0.036, 0.02], [0, -0.016, 0], rubber, "Finger contact pad", 0.006);
      fingers.push(finger);
    }
    const thumb = box(
      wrist,
      [0.023, 0.062, 0.026],
      [-side * 0.052, -0.043, 0.019],
      darkShell,
      "Opposed gripper thumb",
      0.008,
    );
    thumb.rotation.z = side * 0.46;
    return { shoulder, elbow, wrist, fingers, side };
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
  for (let i = 0; i < 12; i += 1) {
    const t = i / 11;
    cable(
      basket,
      roundedRectangle(0.488 + t * 0.14, 0.286 + t * 0.105, -0.128 + t * 0.264, 0.039),
      "Horizontal wicker weave",
      0.009,
      wicker[i % wicker.length],
      56,
      true,
    );
  }
  cable(
    basket,
    roundedRectangle(0.632, 0.397, 0.151, 0.044),
    "Basket reinforced upper rim",
    0.014,
    wicker[0],
    64,
    true,
  );
  const bottomLoop = roundedRectangle(0.491, 0.29, -0.138, 0.04);
  const topLoop = roundedRectangle(0.629, 0.395, 0.142, 0.044);
  for (let i = 0; i < bottomLoop.length; i += 1) {
    const bottom = new THREE.Vector3(...bottomLoop[i]);
    const top = new THREE.Vector3(...topLoop[i]);
    const mid = bottom.clone().lerp(top, 0.5);
    cable(
      basket,
      [
        [bottom.x, bottom.y, bottom.z],
        [mid.x * 1.02, mid.y, mid.z * 1.02],
        [top.x, top.y, top.z],
      ],
      "Vertical wicker weave",
      0.006,
      wicker[(i + 1) % wicker.length],
      10,
    );
  }
  for (const side of [-1, 1]) {
    cable(
      basket,
      [
        [side * 0.306, 0.13, -0.102],
        [side * 0.32, 0.225, -0.085],
        [side * 0.32, 0.243, 0.047],
        [side * 0.31, 0.145, 0.079],
      ],
      "Basket carry handle",
      0.011,
      wicker[0],
      22,
    );
  }
  const towelRoll = box(
    basket,
    [0.33, 0.112, 0.173],
    [-0.037, 0.099, -0.007],
    linenShadow,
    "Folded linen inside basket",
    0.036,
  );
  towelRoll.rotation.y = -0.21;
  const clothGeometry = new THREE.PlaneGeometry(0.353, 0.317, 18, 16);
  const clothVertices = clothGeometry.getAttribute("position");
  for (let i = 0; i < clothVertices.count; i += 1) {
    const x = clothVertices.getX(i);
    const originalY = clothVertices.getY(i);
    const z = originalY + 0.057;
    const drape = Math.max(0, z - 0.132) * 1.85;
    const y =
      0.163 - drape + Math.sin(x * 62 + originalY * 11) * 0.01 + Math.cos(originalY * 27) * 0.007;
    clothVertices.setXYZ(i, x + 0.042, y, z);
  }
  clothGeometry.computeVertexNormals();
  mesh(basket, clothGeometry, linen, "Soft linen draped over basket rim");

  function curlFingers(arm: RobotArm, amount: number) {
    arm.fingers.forEach((finger, i) => {
      finger.rotation.x = amount + i * 0.045;
      const distal = finger.getObjectByName("Finger distal joint");
      if (distal) distal.rotation.x = amount * 0.8 + 0.05;
    });
  }

  function resetArm(arm: RobotArm) {
    arm.shoulder.rotation.set(0, 0, arm.side * 0.035);
    arm.elbow.rotation.set(0, 0, 0);
    arm.wrist.rotation.set(0, 0, 0);
  }

  function setPose(pose: DeploymentRobotPose, phase = 0) {
    basket.visible = pose === "carry";
    head.rotation.set(0.08, 0, 0);
    for (const arm of arms) {
      resetArm(arm);
      if (pose === "carry") {
        arm.shoulder.rotation.x = -0.045;
        arm.shoulder.rotation.z = -arm.side * 0.04;
        arm.elbow.rotation.x = -1.5;
        arm.wrist.rotation.x = 0.07;
        curlFingers(arm, 0.64);
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
    head.rotation.set(0.08, 0, 0);
    arms.forEach((arm) => {
      resetArm(arm);
      arm.elbow.rotation.x = -radians;
      curlFingers(arm, 0.2);
    });
  }

  function setWireframe(enabled: boolean) {
    materials.forEach((surface) => {
      surface.wireframe = enabled;
    });
  }

  function dispose() {
    geometries.forEach((shape) => shape.dispose());
    materials.forEach((surface) => surface.dispose());
    geometries.clear();
    materials.clear();
    geometryCache.clear();
    group.clear();
  }

  setPose("carry");
  return { group, setPose, setArmAngle, setWireframe, dispose };
}
