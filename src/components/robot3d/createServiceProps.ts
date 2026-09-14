import * as THREE from "three";
import type { ModelBuilder, ModelPoint } from "./modelBuilder";

export type RobotService = "laundry" | "cooking" | "cleaning";

/** All surfaces are allocated by the robot's builder and share its disposal owner. */
export function createServiceProps(parent: THREE.Group, b: ModelBuilder) {
  const steel = b.material("#cbd2d0", 0.23, 0.94, { clearcoat: 0.22 });
  const cookingSurface = b.material("#282e2b", 0.48, 0.5);
  const grip = b.material("#26312d", 0.65, 0.12);
  const sage = b.material("#728775", 0.3, 0.35, { clearcoat: 0.4 });
  const pearl = b.material("#eef1ed", 0.25, 0.08, { clearcoat: 0.5 });
  const dark = b.material("#18201e", 0.4, 0.25);
  const pan = new THREE.Group();
  pan.name = "Cooking pan service prop";
  parent.add(pan);
  // A lathed cross-section makes a real open pan: rounded lip, thin wall and recessed floor.
  const profile = [
    [0, 0],
    [0.175, 0],
    [0.202, 0.007],
    [0.224, 0.028],
    [0.24, 0.069],
    [0.24, 0.078],
    [0.234, 0.081],
    [0.227, 0.072],
    [0.213, 0.032],
    [0.197, 0.017],
    [0, 0.017],
  ];
  b.mesh(
    pan,
    new THREE.LatheGeometry(
      profile.map(([x, y]) => new THREE.Vector2(x, y)),
      80,
    ),
    steel,
    "Brushed steel sauté pan",
    [0, 1.185, 0.46],
  );
  b.cylinder(
    pan,
    0.192,
    0.192,
    0.004,
    [0, 1.205, 0.46],
    cookingSurface,
    "Satin cooking surface",
    "y",
    80,
  );
  for (const side of [-1, 1]) {
    b.cable(
      pan,
      [
        [side * 0.215, 1.247, 0.38],
        [side * 0.29, 1.28, 0.38],
        [side * 0.3, 1.29, 0.4],
      ],
      "Pan handle rear mount",
      0.009,
      steel,
    );
    b.cable(
      pan,
      [
        [side * 0.215, 1.247, 0.54],
        [side * 0.29, 1.28, 0.54],
        [side * 0.3, 1.29, 0.52],
      ],
      "Pan handle front mount",
      0.009,
      steel,
    );
    const bar = b.cylinder(
      pan,
      0.011,
      0.011,
      0.12,
      [side * 0.3, 1.29, 0.46],
      grip,
      "Pan insulated grip",
      "z",
      24,
    );
    bar.userData.handleSide = side;
    bar.userData.gripRadius = 0.011;
  }
  const vacuum = new THREE.Group();
  vacuum.name = "Vacuum cleaner service prop";
  parent.add(vacuum);
  const tubeStart = new THREE.Vector3(0.28, 0.16, 0.86);
  const tubeEnd = new THREE.Vector3(0.28, 1.22, 0.4);
  const tube = b.cylinder(
    vacuum,
    0.016,
    0.016,
    tubeStart.distanceTo(tubeEnd),
    tubeStart.clone().lerp(tubeEnd, 0.5).toArray() as ModelPoint,
    steel,
    "Vacuum polished wand",
    "y",
    32,
  );
  tube.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    tubeEnd.clone().sub(tubeStart).normalize(),
  );
  b.box(vacuum, [0.35, 0.075, 0.19], [0.28, 0.063, 0.87], sage, "Vacuum floor head", 0.027);
  b.box(vacuum, [0.29, 0.022, 0.035], [0.28, 0.047, 0.963], dark, "Vacuum brush opening", 0.009);
  b.cylinder(vacuum, 0.033, 0.033, 0.026, [0.11, 0.045, 0.83], dark, "Vacuum left wheel", "x", 24);
  b.cylinder(vacuum, 0.033, 0.033, 0.026, [0.45, 0.045, 0.83], dark, "Vacuum right wheel", "x", 24);
  b.sphere(vacuum, [0.047, 0.047, 0.047], [0.28, 0.12, 0.86], dark, "Vacuum swivel joint");
  b.cylinder(vacuum, 0.056, 0.049, 0.18, [0.28, 1.13, 0.41], pearl, "Vacuum dust chamber", "y", 40);
  b.cylinder(
    vacuum,
    0.061,
    0.061,
    0.037,
    [0.28, 1.235, 0.41],
    sage,
    "Vacuum motor housing",
    "y",
    40,
  );
  for (let i = 0; i < 5; i++)
    b.cylinder(
      vacuum,
      0.057,
      0.057,
      0.004,
      [0.28, 1.178 + i * 0.009, 0.41],
      dark,
      "Vacuum filter vent",
      "y",
      32,
    );
  b.cable(
    vacuum,
    [
      [0.28, 1.25, 0.36],
      [0.28, 1.33, 0.34],
      [0.28, 1.34, 0.36],
    ],
    "Vacuum handle rear",
    0.014,
    sage,
  );
  b.cable(
    vacuum,
    [
      [0.28, 1.25, 0.48],
      [0.28, 1.33, 0.48],
      [0.28, 1.34, 0.46],
    ],
    "Vacuum handle front",
    0.014,
    sage,
  );
  const vacuumGrip = b.cylinder(
    vacuum,
    0.011,
    0.011,
    0.12,
    [0.28, 1.34, 0.4],
    grip,
    "Vacuum control grip",
    "z",
    24,
  );
  vacuumGrip.userData.handleSide = 1;
  vacuumGrip.userData.gripRadius = 0.011;
  b.box(vacuum, [0.025, 0.008, 0.02], [0.28, 1.355, 0.435], sage, "Vacuum thumb switch", 0.004);
  pan.visible = false;
  vacuum.visible = false;
  return { pan, vacuum };
}
