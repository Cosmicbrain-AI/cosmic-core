import * as THREE from "three";

/** A small photographic studio used only to bake the reflection environment. */
export function createProductStudio() {
  const scene = new THREE.Scene();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const surroundGeometry = new THREE.SphereGeometry(18, 24, 12);
  const surroundMaterial = new THREE.MeshBasicMaterial({
    color: 0x929a96,
    side: THREE.BackSide,
    toneMapped: false,
  });
  geometries.push(surroundGeometry);
  materials.push(surroundMaterial);
  scene.add(new THREE.Mesh(surroundGeometry, surroundMaterial));

  function panel(
    width: number,
    height: number,
    position: [number, number, number],
    tint: number,
    radiance: number,
  ) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(tint).multiplyScalar(radiance),
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    geometries.push(geometry);
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.lookAt(0, 1.1, 0);
    scene.add(mesh);
  }

  // Broad highlights describe the shell curvature; the narrow strip picks out
  // glass and metal edges. A dark flag keeps the visor reflection directional.
  panel(3.8, 5.2, [-3.5, 3.7, 2.8], 0xfff7e8, 5.5);
  panel(1.15, 4.4, [3.4, 2.7, -0.5], 0xe9f3ff, 6.5);
  panel(3.5, 2.5, [-0.8, 5.8, -2.8], 0xffffff, 3.8);
  panel(2.4, 3.7, [1.2, 2.5, 5.5], 0xfffbf2, 0.55);
  panel(1.8, 4.2, [3.2, 2.0, 3.6], 0x11191d, 0.6);
  panel(4.5, 3.8, [0, -2, 0], 0x7b8178, 0.55);

  return {
    scene,
    dispose() {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      geometries.length = 0;
      materials.length = 0;
      scene.clear();
    },
  };
}
