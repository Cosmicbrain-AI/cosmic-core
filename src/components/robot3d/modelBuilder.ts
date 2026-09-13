import type * as THREE from "three";

export type ModelPoint = [number, number, number];

/** Shared allocation helpers keep every procedural part under one disposal owner. */
export interface ModelBuilder {
  material: (
    color: string,
    roughness?: number,
    metalness?: number,
    extra?: Partial<THREE.MeshPhysicalMaterialParameters>,
  ) => THREE.MeshStandardMaterial;
  geometry: (key: string, create: () => THREE.BufferGeometry) => THREE.BufferGeometry;
  mesh: (
    parent: THREE.Object3D,
    shape: THREE.BufferGeometry,
    surface: THREE.MeshStandardMaterial,
    name: string,
    position?: ModelPoint,
  ) => THREE.Mesh;
  box: (
    parent: THREE.Object3D,
    size: ModelPoint,
    position: ModelPoint,
    surface: THREE.MeshStandardMaterial,
    name: string,
    radius?: number,
  ) => THREE.Mesh;
  cylinder: (
    parent: THREE.Object3D,
    top: number,
    bottom: number,
    height: number,
    position: ModelPoint,
    surface: THREE.MeshStandardMaterial,
    name: string,
    axis?: "x" | "y" | "z",
    sides?: number,
  ) => THREE.Mesh;
  sphere: (
    parent: THREE.Object3D,
    size: ModelPoint,
    position: ModelPoint,
    surface: THREE.MeshStandardMaterial,
    name: string,
  ) => THREE.Mesh;
  cable: (
    parent: THREE.Object3D,
    points: ModelPoint[],
    name: string,
    radius?: number,
    surface?: THREE.MeshStandardMaterial,
    segments?: number,
    closed?: boolean,
  ) => THREE.Mesh;
  housing: (
    parent: THREE.Object3D,
    profiles: ModelPoint[],
    position: ModelPoint,
    surface: THREE.MeshStandardMaterial,
    name: string,
    radialSegments?: number,
    lengthSegments?: number,
  ) => THREE.Mesh;
  oval: (
    parent: THREE.Object3D,
    width: number,
    height: number,
    depth: number,
    position: ModelPoint,
    surface: THREE.MeshStandardMaterial,
    name: string,
    bevel?: number,
  ) => THREE.Mesh;
}
