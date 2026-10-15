import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createDeploymentRobot } from "./createDeploymentRobot";
import { createProductStudio } from "./createProductStudio";

export interface DataCenterScene {
  setProgress: (progress: number) => void;
  setPaused: (paused: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setActive: (active: boolean) => void;
  setBlueprint: (blueprint: boolean) => void;
  /** Rotate the engineering model by an angle in radians. */
  rotate: (delta: number) => void;
  resetView: () => void;
  dispose: () => void;
}

type XYZ = [number, number, number];
type Surface = THREE.MeshStandardMaterial;

/**
 * An illustrative facility, built from geometry rather than a backdrop image.
 * Progress controls five physical workstations. The short task animations only
 * run after an interaction; an idle or offscreen scene does not consume frames.
 */
export async function createDataCenterScene(
  host: HTMLDivElement,
  onError?: () => void,
): Promise<DataCenterScene> {
  const releases: Array<() => void> = [];
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const originalColors = new Map<Surface, THREE.Color>();
  let disposed = false;
  let frame = 0;

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    for (let index = releases.length - 1; index >= 0; index -= 1) {
      try {
        releases[index]();
      } catch {
        // Release the remaining allocations even after a lost WebGL context.
      }
    }
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    geometries.clear();
    materials.clear();
    textures.clear();
    originalColors.clear();
  }

  try {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    releases.push(() => renderer.dispose());
    const canvas = renderer.domElement;
    releases.push(() => canvas.remove());
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.dataCenterCanvas = "true";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.touchAction = "pan-y pinch-zoom";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.03;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    releases.push(() => scene.clear());
    const camera = new THREE.OrthographicCamera(-14, 14, 8, -8, 0.1, 100);
    const facility = new THREE.Group();
    facility.name = "Illustrative hyperscale data center";
    scene.add(facility);
    const architecture = new THREE.Group();
    const compute = new THREE.Group();
    const cooling = new THREE.Group();
    const electrical = new THREE.Group();
    facility.add(architecture, compute, cooling, electrical);

    function surface(color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.64,
        metalness: 0.2,
        ...extra,
      });
      materials.add(material);
      originalColors.set(material, material.color.clone());
      return material;
    }
    const ivory = surface("#e8e8de", { roughness: 0.87, metalness: 0 });
    const floorSurface = surface("#e6e8de", { roughness: 0.95, metalness: 0 });
    const plinthSurface = surface("#c4cbbd", { roughness: 0.82, metalness: 0 });
    const sage = surface("#7c9481", { roughness: 0.61, metalness: 0.34 });
    const darkSage = surface("#526e61", { roughness: 0.52, metalness: 0.35 });
    const graphite = surface("#2a3737", { roughness: 0.56, metalness: 0.45 });
    const frameSurface = surface("#63746e", { roughness: 0.44, metalness: 0.56 });
    const serverSurface = surface("#82918b", { roughness: 0.44, metalness: 0.57 });
    const silver = surface("#c3ccc4", { roughness: 0.35, metalness: 0.7 });
    const inset = surface("#182727", { roughness: 0.81, metalness: 0.15 });
    const rust = surface("#ae5b42", { roughness: 0.5, metalness: 0.28 });
    const teal = surface("#76aaa6", { roughness: 0.46, metalness: 0.33 });
    const coldTeal = surface("#a9c6bf", { roughness: 0.5, metalness: 0.32 });
    const copper = surface("#ad7d5c", { roughness: 0.38, metalness: 0.65 });
    const boardSurface = surface("#436358", { roughness: 0.68, metalness: 0.18 });
    const amber = surface("#d8a15b", {
      emissive: "#d8a15b",
      emissiveIntensity: 0.38,
      roughness: 0.4,
    });
    const status = surface("#b5d9bc", {
      emissive: "#a6d3b0",
      emissiveIntensity: 0.65,
      toneMapped: false,
    });

    const shapeCache = new Map<string, THREE.BufferGeometry>();
    function shape(key: string, make: () => THREE.BufferGeometry) {
      let geometry = shapeCache.get(key);
      if (!geometry) {
        geometry = make();
        geometries.add(geometry);
        shapeCache.set(key, geometry);
      }
      return geometry;
    }
    const cube = shape("box", () => new THREE.BoxGeometry(1, 1, 1));
    const softCube = shape("rounded-box", () => new RoundedBoxGeometry(1, 1, 1, 2, 0.045));
    const tube = shape("cylinder", () => new THREE.CylinderGeometry(1, 1, 1, 14));
    const disc = shape("disc", () => new THREE.CylinderGeometry(1, 1, 1, 24));
    const ringShape = shape("ring", () => new THREE.TorusGeometry(1, 0.09, 6, 24));
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const tempPosition = new THREE.Vector3();
    const tempScale = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const batches = new Map<
      THREE.Group,
      Map<string, { geometry: THREE.BufferGeometry; surface: Surface; matrices: THREE.Matrix4[] }>
    >();

    // Static repeated pieces share draw calls: hundreds of rack slots, fans and
    // cable clips remain inexpensive even on an integrated GPU.
    function stamp(
      parent: THREE.Group,
      geometry: THREE.BufferGeometry,
      material: Surface,
      position: XYZ,
      scale: XYZ,
      rotation?: XYZ,
    ) {
      let entries = batches.get(parent);
      if (!entries) {
        entries = new Map();
        batches.set(parent, entries);
      }
      const key = `${geometry.uuid}/${material.uuid}`;
      let entry = entries.get(key);
      if (!entry) {
        entry = { geometry, surface: material, matrices: [] };
        entries.set(key, entry);
      }
      tempPosition.set(...position);
      tempScale.set(...scale);
      quaternion.setFromEuler(new THREE.Euler(...(rotation ?? [0, 0, 0])));
      matrix.compose(tempPosition, quaternion, tempScale);
      entry.matrices.push(matrix.clone());
    }
    function box(
      parent: THREE.Group,
      size: XYZ,
      position: XYZ,
      material: Surface,
      rounded = false,
    ) {
      stamp(parent, rounded ? softCube : cube, material, position, size);
    }
    function cylinder(
      parent: THREE.Group,
      radius: number,
      height: number,
      position: XYZ,
      material: Surface,
      axis: "x" | "y" | "z" = "y",
    ) {
      stamp(
        parent,
        tube,
        material,
        position,
        [radius, height, radius],
        axis === "x" ? [0, 0, Math.PI / 2] : axis === "z" ? [Math.PI / 2, 0, 0] : undefined,
      );
    }
    function object(
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      material: Surface,
      position: XYZ = [0, 0, 0],
      scale: XYZ = [1, 1, 1],
    ) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    }
    function pipe(parent: THREE.Group, points: XYZ[], radius: number, material: Surface) {
      // Rounded elbows read as actual MEP routing rather than decorative lines.
      const curve = new THREE.CatmullRomCurve3(
        points.map((point) => new THREE.Vector3(...point)),
        false,
        "centripetal",
        0.35,
      );
      const geometry = new THREE.TubeGeometry(
        curve,
        Math.max(16, points.length * 7),
        radius,
        8,
        false,
      );
      geometries.add(geometry);
      object(parent, geometry, material);
    }
    function lines(parent: THREE.Object3D, points: XYZ[], color = "#8b9e8f", opacity = 0.48) {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((point) => new THREE.Vector3(...point)),
      );
      geometries.add(geometry);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      materials.add(material);
      const line = new THREE.LineSegments(geometry, material);
      parent.add(line);
      return line;
    }
    function outline(
      parent: THREE.Object3D,
      size: XYZ,
      position: XYZ,
      color = "#778c7c",
      opacity = 0.52,
    ) {
      const source = new THREE.BoxGeometry(...size);
      const geometry = new THREE.EdgesGeometry(source);
      source.dispose();
      geometries.add(geometry);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      materials.add(material);
      const result = new THREE.LineSegments(geometry, material);
      result.position.set(...position);
      parent.add(result);
      return result;
    }
    function label(
      parent: THREE.Object3D,
      text: string,
      position: XYZ,
      width: number,
      color = "#4b6255",
      floor = false,
    ) {
      const labelCanvas = document.createElement("canvas");
      labelCanvas.width = 512;
      labelCanvas.height = 96;
      const context = labelCanvas.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, 512, 96);
      context.fillStyle = color;
      context.font = "500 36px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, 256, 48);
      const texture = new THREE.CanvasTexture(labelCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.add(texture);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      materials.add(material);
      const geometry = shape("label-plane", () => new THREE.PlaneGeometry(1, 1));
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.scale.set(width, (width * 96) / 512, 1);
      if (floor) mesh.rotation.x = -Math.PI / 2;
      parent.add(mesh);
    }

    // A warm architectural model floats just above the page, with a fine CAD
    // grid and perimeter dimensions extending beyond its cutaway floorplate.
    box(architecture, [20.7, 0.28, 14.6], [0, -0.26, 0], plinthSurface, true);
    box(architecture, [20.5, 0.09, 14.4], [0, -0.075, 0], ivory, true);
    box(architecture, [20.25, 0.055, 14.15], [0, -0.012, 0], floorSurface);
    box(architecture, [20.4, 0.035, 0.055], [0, 0.027, -7.06], sage);
    box(architecture, [0.055, 0.035, 14.1], [-10.08, 0.027, 0], sage);
    const gridPoints: XYZ[] = [];
    for (let x = -10; x <= 10; x += 0.8) gridPoints.push([x, 0.021, -7], [x, 0.021, 7]);
    for (let z = -7; z <= 7; z += 0.8) gridPoints.push([-10, 0.021, z], [10, 0.021, z]);
    lines(architecture, gridPoints, "#a5b3a2", 0.34);
    const dimensionPoints: XYZ[] = [
      [-10.2, 0, 7.75],
      [10.2, 0, 7.75],
      [-10.85, 0, -7.1],
      [-10.85, 0, 7.1],
    ];
    for (let x = -10; x <= 10; x += 2) dimensionPoints.push([x, 0, 7.58], [x, 0, 7.92]);
    for (let z = -7; z <= 7; z += 2) dimensionPoints.push([-11.02, 0, z], [-10.68, 0, z]);
    dimensionPoints.push([-10.2, 0, 7.1], [-10.2, 0, 7.95], [10.2, 0, 7.1], [10.2, 0, 7.95]);
    lines(architecture, dimensionPoints, "#829480", 0.58);
    label(architecture, "ILLUSTRATIVE FACILITY / 01", [4.2, 0.04, 6.55], 4.8, "#5c7261", true);
    label(architecture, "COMPUTE HALL", [-1, 0.04, -0.4], 3.5, "#798e7b", true);
    label(architecture, "SERVICE AISLE", [-0.2, 0.04, 4.45], 3.4, "#8a9b86", true);
    label(architecture, "COOLING", [-7.6, 0.04, -0.8], 2.1, "#668c85", true);
    label(architecture, "POWER", [7.5, 0.04, -0.6], 2, "#986c55", true);

    // Two rows of high-density racks retain clearly open service aisles.
    const rackPositions: XYZ[] = [];
    for (const z of [-2.8, 1.5]) {
      for (let column = 0; column < 7; column += 1)
        rackPositions.push([-4.55 + column * 1.42, 0, z]);
    }
    function rack(parent: THREE.Group, x: number, z: number, index: number, open = false) {
      const width = 1.14;
      box(parent, [width, 0.13, 1.24], [x, 0.13, z], graphite, true);
      box(parent, [width, 0.1, 1.24], [x, 3.02, z], frameSurface);
      box(parent, [width - 0.08, 2.8, 0.08], [x, 1.58, z - 0.57], graphite);
      for (const side of [-1, 1]) {
        box(parent, [0.065, 2.83, 1.2], [x + side * 0.54, 1.58, z], frameSurface);
        box(parent, [0.038, 2.72, 0.09], [x + side * 0.48, 1.58, z + 0.56], silver);
        for (let screw = 0; screw < 9; screw += 1)
          cylinder(
            parent,
            0.015,
            0.02,
            [x + side * 0.48, 0.38 + screw * 0.29, z + 0.62],
            inset,
            "z",
          );
      }
      for (let slot = 0; slot < 8; slot += 1) {
        const y = 0.42 + slot * 0.32;
        box(
          parent,
          [0.94, 0.265, 0.99],
          [x, y, z + 0.005],
          slot % 3 === 0 ? serverSurface : graphite,
          true,
        );
        box(parent, [0.91, 0.23, 0.035], [x, y, z + 0.52], inset);
        for (let vent = 0; vent < 7; vent += 1)
          box(parent, [0.018, 0.135, 0.012], [x - 0.32 + vent * 0.075, y, z + 0.544], frameSurface);
        box(parent, [0.025, 0.115, 0.03], [x + 0.397, y, z + 0.545], silver);
        box(parent, [0.018, 0.023, 0.023], [x + 0.34, y + 0.055, z + 0.554], status);
        box(
          parent,
          [0.018, 0.023, 0.023],
          [x + 0.34, y + 0.005, z + 0.554],
          slot % 3 === 0 ? amber : status,
        );
      }
      // Side channels and the perforated door distinguish the racks from boxes.
      for (let vent = 0; vent < 12; vent += 1)
        box(parent, [0.012, 0.042, 0.74], [x - 0.576, 0.45 + vent * 0.19, z], inset);
      if (!open) {
        box(parent, [0.038, 2.68, 0.04], [x + 0.39, 1.6, z + 0.605], frameSurface);
        box(parent, [0.045, 0.3, 0.045], [x + 0.37, 1.7, z + 0.64], silver, true);
      }
      label(
        parent,
        `GPU ${String(index + 1).padStart(2, "0")}`,
        [x, 2.9, z + 0.635],
        0.77,
        "#c4d0bf",
      );
    }
    rackPositions.forEach(([x, , z], index) => rack(compute, x, z, index, index === 7));

    // A pulled service cartridge exposes green PCBs, copper heat spreaders and
    // three modeled fan assemblies in the foremost rack.
    const serviceTray = new THREE.Group();
    serviceTray.position.set(-4.55, 1.48, 2.1);
    serviceTray.name = "Removable GPU service cartridge";
    compute.add(serviceTray);
    object(serviceTray, softCube, silver, [0, 0, 0.25], [0.91, 0.105, 1.13]);
    object(serviceTray, cube, boardSurface, [0, 0.065, 0.2], [0.84, 0.025, 0.94]);
    for (const x of [-0.2, 0.2]) {
      object(serviceTray, softCube, copper, [x, 0.12, 0.1], [0.29, 0.08, 0.36]);
      for (let fin = 0; fin < 7; fin += 1)
        object(serviceTray, cube, silver, [x - 0.11 + fin * 0.036, 0.18, 0.1], [0.012, 0.08, 0.34]);
      for (const end of [-1, 1])
        object(serviceTray, cube, inset, [x, 0.09, 0.1 + end * 0.28], [0.24, 0.055, 0.1]);
    }
    const cartridgeFans: THREE.Object3D[] = [];
    for (let fan = 0; fan < 3; fan += 1) {
      const assembly = new THREE.Group();
      assembly.position.set(-0.27 + fan * 0.27, 0.08, 0.72);
      serviceTray.add(assembly);
      object(assembly, ringShape, graphite, [0, 0, 0], [0.105, 0.105, 0.105]);
      const blades = new THREE.Group();
      assembly.add(blades);
      for (let blade = 0; blade < 5; blade += 1) {
        const vane = object(blades, softCube, frameSurface, [0, 0, 0], [0.032, 0.14, 0.018]);
        vane.rotation.z = (blade * Math.PI) / 5;
      }
      const hub = object(assembly, disc, silver, [0, 0, 0.014], [0.027, 0.035, 0.027]);
      hub.rotation.x = Math.PI / 2;
      cartridgeFans.push(blades);
    }
    object(serviceTray, cube, graphite, [0, 0.02, 0.82], [0.91, 0.16, 0.045]);
    for (const x of [-0.4, 0.4])
      object(serviceTray, softCube, silver, [x, 0.035, 0.865], [0.035, 0.075, 0.07]);

    // Clear overhead paths: supply and return have distinct, restrained colors.
    for (const [offset, material] of [
      [-0.17, teal],
      [0.17, rust],
    ] as const) {
      pipe(
        cooling,
        [
          [-8.2, 1.7, -4.5 + offset],
          [-8.2, 3.7, -4.5 + offset],
          [-7.8, 4.05, -4.5 + offset],
          [4.9, 4.05, -4.5 + offset],
          [5.4, 3.75, -4.5 + offset],
        ],
        0.085,
        material,
      );
      for (const x of [-4.55, -0.29, 3.97]) {
        pipe(
          cooling,
          [
            [x, 4.05, -4.5 + offset],
            [x, 4.05, -4 + offset],
            [x, 3.9, -3.7 + offset],
            [x, 3.9, 1.5 + offset],
            [x, 3.55, 2 + offset],
          ],
          0.052,
          material,
        );
        cylinder(cooling, 0.077, 0.05, [x, 3.9, -1 + offset], silver, "z");
        cylinder(cooling, 0.077, 0.05, [x, 3.9, 0.6 + offset], silver, "z");
      }
    }
    for (const x of [-5.3, -1.05, 3.2]) {
      box(cooling, [0.035, 3.9, 0.035], [x, 1.95, -4.5], silver);
      box(cooling, [0.035, 0.55, 0.035], [x, 3.76, 1.45], silver);
      box(cooling, [0.9, 0.035, 0.035], [x + 0.37, 3.5, 1.45], silver);
    }

    // Cooling distribution units and heat exchanger plant in the left bay.
    for (let unit = 0; unit < 3; unit += 1) {
      const z = -4.9 + unit * 1.65;
      box(cooling, [1.8, 0.13, 1.38], [-8.0, 0.11, z], frameSurface, true);
      box(cooling, [1.65, 2.4, 1.3], [-8.0, 1.38, z], ivory, true);
      box(cooling, [1.38, 2.12, 0.04], [-8, 1.38, z + 0.67], coldTeal);
      for (let fin = 0; fin < 12; fin += 1)
        box(cooling, [1.2, 0.027, 0.034], [-8, 0.55 + fin * 0.105, z + 0.7], frameSurface);
      box(cooling, [0.57, 0.36, 0.04], [-8.1, 2.05, z + 0.72], graphite, true);
      box(cooling, [0.4, 0.17, 0.012], [-8.13, 2.08, z + 0.75], teal);
      box(cooling, [0.035, 0.045, 0.012], [-7.83, 2.08, z + 0.755], status);
      for (const x of [-8.47, -7.58]) {
        stamp(cooling, disc, graphite, [x, 2.64, z], [0.34, 0.055, 0.34]);
        stamp(cooling, disc, silver, [x, 2.68, z], [0.1, 0.035, 0.1]);
        for (let blade = 0; blade < 4; blade += 1)
          stamp(
            cooling,
            softCube,
            frameSurface,
            [x, 2.68, z],
            [0.52, 0.02, 0.06],
            [0, (blade * Math.PI) / 4, 0],
          );
      }
      label(cooling, `CDU ${String(unit + 1).padStart(2, "0")}`, [-8, 2.48, z + 0.71], 0.9);
      outline(cooling, [1.7, 2.45, 1.35], [-8, 1.4, z], "#76978e", 0.3);
    }
    for (const [x, material] of [
      [-9.25, teal],
      [-8.95, rust],
    ] as const) {
      pipe(
        cooling,
        [
          [x, 0.28, -5.7],
          [x, 2.9, -5.7],
          [x, 3.2, -5.4],
          [x, 3.2, -0.8],
          [x, 2.85, -0.5],
          [x, 0.35, -0.5],
        ],
        0.09,
        material,
      );
      for (const z of [-4.8, -3.2, -1.6]) {
        const wheel = object(cooling, ringShape, rust, [x + 0.16, 2.65, z], [0.12, 0.12, 0.12]);
        wheel.rotation.y = Math.PI / 2;
        cylinder(cooling, 0.025, 0.24, [x + 0.07, 2.65, z], silver, "x");
      }
    }

    // The right-hand bay combines switchgear, distribution cabinets and a
    // suspended busway. The robot only inspects closed, guarded equipment.
    for (let cabinet = 0; cabinet < 4; cabinet += 1) {
      const x = 5.0 + cabinet * 1.15;
      box(electrical, [1.04, 0.13, 1.15], [x, 0.12, -5.35], graphite, true);
      box(electrical, [1.04, 2.9, 1.1], [x, 1.6, -5.35], sage, true);
      box(electrical, [0.87, 2.65, 0.035], [x, 1.6, -4.775], ivory, true);
      box(electrical, [0.39, 0.3, 0.04], [x - 0.1, 2.48, -4.74], graphite);
      box(electrical, [0.25, 0.1, 0.012], [x - 0.1, 2.5, -4.71], teal);
      for (let circuit = 0; circuit < 3; circuit += 1) {
        box(electrical, [0.52, 0.24, 0.05], [x - 0.06, 1.3 + circuit * 0.33, -4.73], frameSurface);
        box(electrical, [0.085, 0.12, 0.045], [x - 0.06, 1.3 + circuit * 0.33, -4.68], inset);
        box(
          electrical,
          [0.027, 0.045, 0.016],
          [x + 0.3, 1.32 + circuit * 0.33, -4.7],
          circuit === 1 ? amber : status,
        );
      }
      box(electrical, [0.045, 0.37, 0.065], [x + 0.32, 2.07, -4.7], graphite, true);
      for (let vent = 0; vent < 5; vent += 1)
        box(electrical, [0.68, 0.023, 0.018], [x, 0.43 + vent * 0.08, -4.72], sage);
      label(electrical, `PDU ${String(cabinet + 1).padStart(2, "0")}`, [x, 2.91, -4.74], 0.83);
    }
    box(electrical, [0.43, 0.24, 8.0], [6.05, 3.7, -0.9], darkSage, true);
    box(electrical, [0.49, 0.055, 8.06], [6.05, 3.85, -0.9], silver);
    box(electrical, [0.45, 0.06, 8.1], [6.05, 3.57, -0.9], sage);
    box(electrical, [3.0, 0.24, 0.43], [7.33, 3.7, -4.72], darkSage, true);
    for (const z of [-2.8, 1.5]) {
      box(electrical, [10.0, 0.19, 0.3], [0.93, 3.5, z - 0.83], darkSage, true);
      for (const x of [-4.55, -1.71, 1.13, 3.97]) {
        box(electrical, [0.22, 0.43, 0.34], [x, 3.27, z - 0.83], ivory);
        box(electrical, [0.035, 0.21, 0.06], [x, 3.28, z - 0.62], rust);
        pipe(
          electrical,
          [
            [x, 3.2, z - 0.64],
            [x, 3.08, z - 0.52],
            [x, 3.06, z - 0.2],
          ],
          0.035,
          graphite,
        );
      }
    }
    for (const z of [-4.5, -0.5, 2.8]) {
      box(electrical, [0.045, 3.7, 0.045], [6.3, 1.85, z], silver);
      box(electrical, [0.7, 0.045, 0.045], [6.03, 3.45, z], silver);
    }

    // Low cutaway walls frame the infrastructure without concealing activity.
    box(architecture, [20.1, 0.65, 0.1], [0, 0.33, -7], ivory);
    box(architecture, [0.1, 0.65, 14.05], [-10, 0.33, 0], ivory);
    outline(architecture, [20.12, 0.68, 0.12], [0, 0.35, -7], "#849780", 0.4);
    outline(architecture, [0.12, 0.68, 14.05], [-10, 0.35, 0], "#849780", 0.4);
    for (const [x, z] of [
      [-9.8, -6.8],
      [-9.8, 6.8],
      [9.8, -6.8],
      [9.8, 6.8],
    ]) {
      box(architecture, [0.17, 0.5, 0.17], [x, 0.27, z], sage);
      box(architecture, [0.24, 0.035, 0.24], [x, 0.54, z], silver);
    }

    // A separate logistics cart and cartridge give the final scene a concrete
    // material-handling task, rather than an unrelated service prop.
    const cart = new THREE.Group();
    cart.position.set(2.3, 0, 4.9);
    facility.add(cart);
    box(cart, [1.5, 0.1, 0.95], [0, 0.35, 0], frameSurface, true);
    box(cart, [1.45, 0.09, 0.9], [0, 1.1, 0], silver, true);
    for (const x of [-0.65, 0.65]) {
      for (const z of [-0.36, 0.36]) {
        box(cart, [0.045, 0.88, 0.045], [x, 0.72, z], frameSurface);
        cylinder(cart, 0.095, 0.07, [x, 0.13, z], inset, "x");
      }
    }
    for (let server = 0; server < 3; server += 1) {
      box(cart, [1.18, 0.16, 0.75], [0, 1.22 + server * 0.2, 0], graphite, true);
      box(cart, [1.14, 0.12, 0.025], [0, 1.22 + server * 0.2, 0.39], silver);
      for (let port = 0; port < 4; port += 1)
        box(cart, [0.13, 0.05, 0.02], [-0.34 + port * 0.23, 1.22 + server * 0.2, 0.41], inset);
    }

    batches.forEach((entries, parent) => {
      entries.forEach(({ geometry, surface: material, matrices }) => {
        const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
        matrices.forEach((transform, index) => mesh.setMatrixAt(index, transform));
        mesh.instanceMatrix.needsUpdate = true;
        mesh.castShadow = material !== status && material !== amber;
        mesh.receiveShadow = true;
        mesh.computeBoundingSphere();
        parent.add(mesh);
        releases.push(() => mesh.dispose());
      });
    });
    batches.clear();

    const routePoints: XYZ[] = [
      [-4.5, 0.035, 4.7],
      [-6.3, 0.035, 4.7],
      [-6.3, 0.035, -3.8],
      [6.1, 0.035, -3.8],
      [6.9, 0.035, -2.9],
      [6.9, 0.035, 4.5],
      [3.9, 0.035, 4.5],
    ];
    const routeGeometry = new THREE.BufferGeometry().setFromPoints(
      routePoints.map((point) => new THREE.Vector3(...point)),
    );
    geometries.add(routeGeometry);
    const routeMaterial = new THREE.LineDashedMaterial({
      color: "#ac7055",
      dashSize: 0.13,
      gapSize: 0.14,
      transparent: true,
      opacity: 0.5,
    });
    materials.add(routeMaterial);
    const route = new THREE.Line(routeGeometry, routeMaterial);
    route.computeLineDistances();
    facility.add(route);

    const robot = createDeploymentRobot();
    releases.push(() => robot.dispose());
    robot.setPose("rest");
    robot.group.name = "Data center deployment humanoid";
    robot.group.scale.setScalar(1.23);
    robot.group.traverse((part) => {
      if (/laundry|linen|towel|service prop/i.test(part.name)) part.visible = false;
    });
    facility.add(robot.group);
    const head = robot.group.getObjectByName("Sensor head");
    const leftShoulder = robot.group.getObjectByName("Left shoulder pivot");
    const rightShoulder = robot.group.getObjectByName("Right shoulder pivot");

    const carriedServer = new THREE.Group();
    carriedServer.name = "Robot-carried server cartridge";
    carriedServer.position.set(0, 1.24, 0.43);
    robot.group.add(carriedServer);
    object(carriedServer, softCube, silver, [0, 0, 0], [0.68, 0.14, 0.43]);
    object(carriedServer, cube, graphite, [0, 0, 0.225], [0.65, 0.105, 0.026]);
    for (let port = 0; port < 4; port += 1)
      object(carriedServer, cube, inset, [-0.23 + port * 0.15, 0, 0.245], [0.085, 0.044, 0.015]);
    carriedServer.visible = false;

    const haloGeometry = new THREE.RingGeometry(0.74, 0.765, 72);
    geometries.add(haloGeometry);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: "#ad694d",
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    materials.add(haloMaterial);
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.035;
    facility.add(halo);
    const locatorGeometry = new THREE.RingGeometry(0.93, 0.94, 72, 1, 0, Math.PI * 1.3);
    geometries.add(locatorGeometry);
    const locator = new THREE.Mesh(locatorGeometry, haloMaterial);
    locator.rotation.x = -Math.PI / 2;
    locator.position.y = 0.038;
    facility.add(locator);

    // A baked photographic environment preserves the robot's ceramic shell and
    // dark visor; the facility itself stays matte and diagrammatic.
    const studio = createProductStudio();
    releases.push(() => studio.dispose());
    const pmrem = new THREE.PMREMGenerator(renderer);
    releases.push(() => pmrem.dispose());
    const environment = pmrem.fromScene(studio.scene, 0.06);
    releases.push(() => environment.dispose());
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.52;
    studio.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xfff8e9, 0xa7b7aa, 2.1));
    const keyLight = new THREE.DirectionalLight(0xfff5e4, 3.0);
    keyLight.position.set(-9, 19, 13);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 14;
    keyLight.shadow.camera.bottom = -13;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.normalBias = 0.035;
    keyLight.shadow.bias = -0.0002;
    keyLight.shadow.radius = 3;
    scene.add(keyLight);
    releases.push(() => keyLight.shadow.dispose());
    const rim = new THREE.DirectionalLight(0xe5f2ef, 1.65);
    rim.position.set(9, 11, -10);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(2, 4, 12);
    scene.add(fill);

    // A soft analytic contact shadow keeps the raised model grounded without a
    // second shadow map or a postprocessing pass.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d");
    if (shadowContext) {
      const gradient = shadowContext.createRadialGradient(64, 64, 10, 64, 64, 64);
      gradient.addColorStop(0, "rgba(47,66,48,0.23)");
      gradient.addColorStop(0.65, "rgba(47,66,48,0.1)");
      gradient.addColorStop(1, "rgba(47,66,48,0)");
      shadowContext.fillStyle = gradient;
      shadowContext.fillRect(0, 0, 128, 128);
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      textures.add(shadowTexture);
      const shadowMaterial = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      materials.add(shadowMaterial);
      const shadow = new THREE.Mesh(
        shape("shadow-plane", () => new THREE.PlaneGeometry(1, 1)),
        shadowMaterial,
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0.3, -0.46, 0.4);
      shadow.scale.set(29, 22, 1);
      facility.add(shadow);
    }

    const stages = [
      {
        camera: [21, 18, 23] as XYZ,
        target: [0, 1.0, 0] as XYZ,
        span: 8.25,
        robot: [-4.5, 0.035, 4.55] as XYZ,
        yaw: -0.38,
        arm: 25,
      },
      {
        camera: [2.5, 5.6, 8.8] as XYZ,
        target: [-4.25, 1.35, 2.3] as XYZ,
        span: 3.7,
        robot: [-4.55, 0.035, 2.73] as XYZ,
        yaw: Math.PI,
        arm: 84,
      },
      {
        camera: [-13, 7.2, 7] as XYZ,
        target: [-7.6, 1.35, -1.5] as XYZ,
        span: 4.0,
        robot: [-8, 0.035, -0.15] as XYZ,
        yaw: Math.PI,
        arm: 80,
      },
      {
        camera: [13.8, 6.4, 3.2] as XYZ,
        target: [6.35, 1.5, -3.75] as XYZ,
        span: 4.35,
        robot: [6.1, 0.035, -3.4] as XYZ,
        yaw: Math.PI,
        arm: 72,
      },
      {
        camera: [15.5, 13.8, 20.5] as XYZ,
        target: [1.6, 1.1, 2.6] as XYZ,
        span: 6.7,
        robot: [3.95, 0.035, 4.85] as XYZ,
        yaw: -Math.PI / 2 - 0.2,
        arm: 84,
      },
    ];
    const currentCamera = new THREE.Vector3();
    const currentTarget = new THREE.Vector3();
    const fromCamera = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const fromTarget = new THREE.Vector3();
    const toTarget = new THREE.Vector3();
    const robotPosition = new THREE.Vector3();
    function aisleRoute(points: XYZ[]) {
      const route = new THREE.CurvePath<THREE.Vector3>();
      const vertices = points.map((point) => new THREE.Vector3(...point));
      let start = vertices[0];
      for (let index = 1; index < vertices.length - 1; index += 1) {
        const corner = vertices[index];
        const before = vertices[index - 1];
        const after = vertices[index + 1];
        const radius = Math.min(0.45, before.distanceTo(corner) / 3, after.distanceTo(corner) / 3);
        const entrance = corner
          .clone()
          .add(before.clone().sub(corner).normalize().multiplyScalar(radius));
        const exit = corner
          .clone()
          .add(after.clone().sub(corner).normalize().multiplyScalar(radius));
        route.add(new THREE.LineCurve3(start, entrance));
        route.add(new THREE.QuadraticBezierCurve3(entrance, corner, exit));
        start = exit;
      }
      route.add(new THREE.LineCurve3(start, vertices[vertices.length - 1]));
      return route;
    }
    const travelRoutes = [
      aisleRoute([stages[0].robot, stages[1].robot]),
      aisleRoute([stages[1].robot, [-4.55, 0.035, 3.65], [-8, 0.035, 3.65], stages[2].robot]),
      aisleRoute([
        stages[2].robot,
        [-6.5, 0.035, -0.15],
        [-6.5, 0.035, -4.15],
        [6.1, 0.035, -4.15],
        stages[3].robot,
      ]),
      aisleRoute([stages[3].robot, [6.95, 0.035, -3.4], [6.95, 0.035, 4.85], stages[4].robot]),
    ];
    let progress = 0;
    let requestedProgress = 0;
    let paused = false;
    let reducedMotion = false;
    let active = true;
    let aspect = 1.7;
    let orbit = 0;
    let previousTime = performance.now();
    let actionStarted = previousTime - 4000;
    let lastPhase = 0;
    let blueprint = false;

    const smooth = (value: number) => value * value * (3 - 2 * value);
    const interpolate = (a: number, b: number, t: number) => THREE.MathUtils.lerp(a, b, t);
    function updateModel(time: number) {
      const stageFloat = THREE.MathUtils.clamp(progress * 4, 0, 4);
      const index = Math.min(3, Math.floor(stageFloat));
      const rawBlend = stageFloat - index;
      const blend = smooth(rawBlend);
      const from = stages[index];
      const to = stages[index + 1];
      fromCamera.set(...from.camera);
      toCamera.set(...to.camera);
      fromTarget.set(...from.target);
      toTarget.set(...to.target);
      currentCamera.lerpVectors(fromCamera, toCamera, blend);
      currentTarget.lerpVectors(fromTarget, toTarget, blend);
      currentCamera.sub(currentTarget).applyAxisAngle(up, orbit).add(currentTarget);
      camera.position.copy(currentCamera);
      camera.lookAt(currentTarget);
      const span = interpolate(from.span, to.span, blend);
      // Overview must fit the whole floorplate at any responsive aspect. Close
      // views preserve a readable robot, rather than shrinking to campus scale.
      const halfWidths = [13.6, 4.35, 4.8, 5.1, 8];
      const minimumHalfWidth = interpolate(halfWidths[index], halfWidths[index + 1], blend);
      const halfHeight = Math.max(span, minimumHalfWidth / aspect);
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();

      // Rounded, physical aisle routes keep the full chassis clear of the rack
      // footprints. A straight interpolation would cut through their corners.
      // Dwell at a station while its task completes. The chassis and modeled
      // five-finger hands follow the GPU cartridge into the rack on scroll.
      const travelBlend = smooth(THREE.MathUtils.clamp((rawBlend - 0.18) / 0.64, 0, 1));
      travelRoutes[index].getPointAt(travelBlend, robotPosition);
      const insertion = THREE.MathUtils.clamp((stageFloat - 0.82) / 0.36, 0, 1);
      const computeApproach = smooth(THREE.MathUtils.clamp((stageFloat - 0.55) / 0.27, 0, 1));
      robotPosition.z += (1 - insertion) * 0.92 * computeApproach;
      robot.group.position.copy(robotPosition);
      const yawDelta =
        THREE.MathUtils.euclideanModulo(to.yaw - from.yaw + Math.PI, Math.PI * 2) - Math.PI;
      const taskYaw = from.yaw + yawDelta * blend;
      const direction = travelRoutes[index].getTangentAt(travelBlend);
      const travelYaw = Math.atan2(direction.x, direction.z);
      const travelWeight = smooth(Math.min(1, travelBlend / 0.18, (1 - travelBlend) / 0.18));
      const travelYawDelta =
        THREE.MathUtils.euclideanModulo(travelYaw - taskYaw + Math.PI, Math.PI * 2) - Math.PI;
      robot.group.rotation.y = taskYaw + travelYawDelta * travelWeight;
      const stage = Math.round(stageFloat);
      const elapsed = THREE.MathUtils.clamp((time - actionStarted) / 2300, 0, 1);
      if (!paused && !reducedMotion) lastPhase = elapsed;
      const taskMovement = reducedMotion
        ? 0
        : Math.sin(lastPhase * Math.PI * 2) * Math.sin(lastPhase * Math.PI);
      robot.setArmAngle(
        interpolate(from.arm, to.arm, blend) + taskMovement * (stage === 0 ? 0 : 5),
      );
      if (leftShoulder) leftShoulder.rotation.x = stage === 1 ? -0.18 : stage === 2 ? -0.3 : -0.055;
      if (rightShoulder)
        rightShoulder.rotation.x =
          stage === 2 ? -0.62 + taskMovement * 0.055 : stage === 3 ? -0.22 : -0.06;
      if (head) {
        head.rotation.x = stage === 1 || stage === 4 ? 0.19 + taskMovement * 0.025 : 0.035;
        head.rotation.y = stage === 2 ? -0.24 : stage === 3 ? 0.13 : 0;
      }
      carriedServer.visible = stageFloat > 3.65;
      // Explicitly hide props after each pose setter; the shared model has
      // legacy service props that must never appear in this facility scene.
      const basket = robot.group.getObjectByName("Carried laundry basket");
      if (basket) basket.visible = false;
      serviceTray.position.z = 2.1 - insertion * 0.9;
      cartridgeFans.forEach((fan, fanIndex) => {
        fan.rotation.z = reducedMotion ? fanIndex * 0.6 : lastPhase * Math.PI * 7 + fanIndex * 0.6;
      });
      halo.position.x = locator.position.x = robotPosition.x;
      halo.position.z = locator.position.z = robotPosition.z;
      locator.rotation.z = -lastPhase * 0.35;
      haloMaterial.opacity = blueprint ? 0.7 : 0.48;
      renderer.shadowMap.needsUpdate = true;
    }

    function requestFrame() {
      if (!disposed && !frame && active && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function draw(time: number) {
      frame = 0;
      if (disposed || !active || document.hidden) return;
      const delta = Math.min(80, Math.max(1, time - previousTime));
      previousTime = time;
      const changing = Math.abs(progress - requestedProgress) > 0.0002;
      if (reducedMotion) progress = requestedProgress;
      else if (!paused) progress += (requestedProgress - progress) * (1 - Math.exp(-delta / 145));
      if (!paused && Math.abs(progress - requestedProgress) <= 0.0002) progress = requestedProgress;
      updateModel(time);
      renderer.render(scene, camera);
      const taskRunning =
        !paused && !reducedMotion && time - actionStarted < 2300 && requestedProgress > 0.05;
      if ((!paused && !reducedMotion && changing) || taskRunning) requestFrame();
    }

    const resize = new ResizeObserver(() => {
      if (disposed) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      aspect = width / height;
      renderer.setSize(width, height, false);
      requestFrame();
    });
    resize.observe(host);
    releases.push(() => resize.disconnect());
    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestFrame();
    };
    document.addEventListener("visibilitychange", onVisibility);
    releases.push(() => document.removeEventListener("visibilitychange", onVisibility));
    const onContextLost = (event: Event) => {
      event.preventDefault();
      if (disposed) return;
      dispose();
      onError?.();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    releases.push(() => canvas.removeEventListener("webglcontextlost", onContextLost));
    const initialBounds = host.getBoundingClientRect();
    if (initialBounds.width && initialBounds.height) {
      aspect = initialBounds.width / initialBounds.height;
      renderer.setSize(initialBounds.width, initialBounds.height, false);
    }
    requestFrame();

    return {
      setProgress(value) {
        if (disposed || !Number.isFinite(value)) return;
        const next = THREE.MathUtils.clamp(value, 0, 1);
        if (Math.abs(next - requestedProgress) < 0.0001) return;
        requestedProgress = next;
        actionStarted = performance.now();
        previousTime = actionStarted;
        requestFrame();
      },
      setPaused(value) {
        paused = value;
        previousTime = performance.now();
        if (!paused) actionStarted = previousTime - lastPhase * 2300;
        requestFrame();
      },
      setReducedMotion(value) {
        reducedMotion = value;
        if (value) progress = requestedProgress;
        requestFrame();
      },
      setActive(value) {
        active = value;
        if (!active && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else {
          previousTime = performance.now();
          requestFrame();
        }
      },
      setBlueprint(value) {
        if (disposed || blueprint === value) return;
        blueprint = value;
        for (const material of [graphite, frameSurface, serverSurface, ivory, plinthSurface]) {
          material.wireframe = value;
          material.transparent = value;
          material.opacity = value ? 0.38 : 1;
          const original = originalColors.get(material);
          if (value) material.color.set("#658772");
          else if (original) material.color.copy(original);
          material.needsUpdate = true;
        }
        robot.setWireframe(value);
        requestFrame();
      },
      rotate(delta) {
        if (!Number.isFinite(delta)) return;
        orbit = THREE.MathUtils.clamp(orbit + delta, -Math.PI / 3, Math.PI / 3);
        requestFrame();
      },
      resetView() {
        orbit = 0;
        requestFrame();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
