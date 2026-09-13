import * as THREE from "three";
import { createDeploymentRobot } from "./createDeploymentRobot";
import { createProductStudio } from "./createProductStudio";

export type AtmosphereMode = "solid" | "blueprint";
export type AtmosphereGesture = "acknowledge";
export interface AtmosphereFraming {
  /** 1 is the full robot; 1.45 is a close view, subject to horizontal space. */
  zoom: number;
  /** Camera target height in model world units. The full-body default is 1.05. */
  elevation: number;
}

export interface AtmosphereScene {
  setProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
  setFraming: (framing: AtmosphereFraming) => void;
  setActive: (active: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setMode: (mode: AtmosphereMode) => void;
  playGesture: (gesture: AtmosphereGesture) => void;
  dispose: () => void;
}

/**
 * A large, reference-inspired mobile humanoid with its laundry basket.
 * The carry pose stays fixed while scrolling changes the viewing angle and
 * pointer movement gently turns the sensor head. This is an illustrative
 * reconstruction, not an engineering CAD model or teleoperation connection.
 * Initialization failures reject. Later rendering/context failures release the
 * scene and dispatch a bubbling `atmosphereerror` event from the host.
 */
export async function createAtmosphereScene(host: HTMLElement): Promise<AtmosphereScene> {
  const cleanup: Array<() => void> = [];
  let disposed = false;
  let frame = 0;
  let active = true;
  let intersecting = true;
  let hasSize = false;
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastTime = 0;

  function releaseOnDispose(release: () => void) {
    let pending = true;
    const releaseOnce = () => {
      if (!pending) return;
      pending = false;
      release();
    };
    cleanup.push(releaseOnce);
    return releaseOnce;
  }

  function stopFrame() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    stopFrame();
    for (let index = cleanup.length - 1; index >= 0; index -= 1) {
      try {
        cleanup[index]();
      } catch {
        // Finish independent cleanup even if a lost GPU context rejects a
        // particular release; preserve the original initialization error.
      }
    }
    cleanup.length = 0;
  }

  function fail() {
    if (disposed) return;
    dispose();
    host.dispatchEvent(new CustomEvent("atmosphereerror", { bubbles: true }));
  }

  try {
    const robot = createDeploymentRobot();
    releaseOnDispose(() => robot.dispose());
    robot.setPose("carry");
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    releaseOnDispose(() => {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    });
    if (!host.isConnected) throw new Error("The deployment robot host was removed before loading.");

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    releaseOnDispose(() => renderer.dispose());
    const canvas = renderer.domElement;
    releaseOnDispose(() => canvas.remove());
    canvas.dataset.atmosphereCanvas = "true";
    canvas.setAttribute("aria-hidden", "true");
    canvas.tabIndex = -1;
    canvas.style.cssText = "display:block;width:100%;height:100%;pointer-events:none;";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    releaseOnDispose(() => {
      scene.environment = null;
      scene.clear();
    });
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 35);
    const cameraTarget = new THREE.Vector3(0, 1.05, 0.025);
    let cameraDistance = 4.25;

    const studio = createProductStudio();
    const disposeStudio = releaseOnDispose(() => studio.dispose());
    const pmrem = new THREE.PMREMGenerator(renderer);
    const disposePmrem = releaseOnDispose(() => pmrem.dispose());
    const environment = pmrem.fromScene(studio.scene, 0.055);
    releaseOnDispose(() => environment.dispose());
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.82;
    // Explicit maps let dark display/glass materials retain their own reflection
    // intensity; Three.js otherwise applies the global environment intensity.
    robot.group.traverse((part) => {
      if (!(part instanceof THREE.Mesh)) return;
      const surfaces = Array.isArray(part.material) ? part.material : [part.material];
      for (const surface of surfaces) {
        if (surface instanceof THREE.MeshStandardMaterial && surface.envMapIntensity !== 1) {
          surface.envMap = environment.texture;
          surface.needsUpdate = true;
        }
      }
    });
    disposeStudio();
    disposePmrem();

    // Soft studio illumination preserves the white shell curvature against
    // warm paper while keeping the dark joints and sensor visor distinct.
    scene.add(new THREE.HemisphereLight(0xf5f4f0, 0x7a8070, 0.5));
    const key = new THREE.DirectionalLight(0xfffcf4, 2.0);
    key.position.set(-3.5, 4.5, 5);
    key.target.position.set(0, 1.05, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -1.6;
    key.shadow.camera.right = 1.6;
    key.shadow.camera.top = 1.6;
    key.shadow.camera.bottom = -1.6;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 14;
    key.shadow.radius = 4;
    key.shadow.normalBias = 0.004;
    key.shadow.bias = -0.0001;
    key.shadow.autoUpdate = false;
    releaseOnDispose(() => key.shadow.dispose());
    scene.add(key, key.target);
    const rim = new THREE.DirectionalLight(0xf6f8ff, 1.5);
    rim.position.set(3.5, 3.3, -2.5);
    rim.target.position.set(0, 1.15, 0);
    scene.add(rim, rim.target);
    const edge = new THREE.DirectionalLight(0xffffff, 0.65);
    edge.position.set(-4, 2.8, -3);
    edge.target.position.set(0, 1.15, 0);
    scene.add(edge, edge.target);
    const basketFill = new THREE.DirectionalLight(0xffeddc, 0.35);
    basketFill.position.set(0, 1.9, 5);
    basketFill.target.position.set(0, 1.08, 0.4);
    scene.add(basketFill, basketFill.target);

    // The unbranded reference model stays fully three-dimensional; the basket
    // remains in its hands throughout the page orbit.
    const turntable = new THREE.Group();
    turntable.name = "Deployment robot viewing angle";
    turntable.add(robot.group);
    scene.add(turntable);
    const head = robot.group.getObjectByName("Sensor head");
    const headRestRotation = head?.rotation.clone();

    const floorGeometry = new THREE.PlaneGeometry(5, 5);
    geometries.add(floorGeometry);
    const floorMaterial = new THREE.ShadowMaterial({ color: 0x626954, opacity: 0.16 });
    materials.add(floorMaterial);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.015;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(3.8, 12, 0x74766e, 0x62655e);
    grid.position.y = -0.012;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((surface) => {
      surface.transparent = true;
      surface.opacity = 0.035;
      surface.depthWrite = false;
      materials.add(surface);
    });
    geometries.add(grid.geometry);
    scene.add(grid);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x8a8d82,
      transparent: true,
      opacity: 0.12,
    });
    materials.add(ringMaterial);
    for (const radius of [0.78, 0.9]) {
      const points = Array.from({ length: 97 }, (_, index) => {
        const angle = (index / 96) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, -0.009, Math.sin(angle) * radius);
      });
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
      geometries.add(ringGeometry);
      scene.add(new THREE.Line(ringGeometry, ringMaterial));
    }

    let progress = 0;
    let targetProgress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let zoom = 1;
    let targetZoom = 1;
    let framingElevation = 1.05;
    let targetFramingElevation = 1.05;
    let receivedFraming = false;
    let gesture: {
      elapsed: number;
      duration: number;
      still: boolean;
    } | null = null;

    function requestFrame() {
      if (!disposed && active && intersecting && hasSize && !document.hidden && !frame) {
        frame = requestAnimationFrame(draw);
      }
    }

    function updatePose() {
      // The model remains in its carry pose throughout: no animation changes
      // either arm or detaches the basket. The acknowledgment moves only its head.
      const phase = gesture ? gesture.elapsed / gesture.duration : 0;
      const envelope = gesture ? Math.sin(Math.PI * phase) ** 2 : 0;
      const acknowledgment = gesture ? Math.sin(phase * Math.PI * 2) * envelope : 0;
      if (head && headRestRotation) {
        head.rotation.set(
          headRestRotation.x + pointerY * 0.04 + acknowledgment * 0.11,
          headRestRotation.y + pointerX * 0.12 - envelope * 0.08,
          headRestRotation.z,
        );
      }
      // One continuous viewing orbit follows the whole homepage. The load
      // remains held while visitors see the front, sides, back, and front again.
      turntable.rotation.y = -0.4 + progress * 5.9;
      const viewingAngle = 0.065 + Math.sin(progress * Math.PI * 2) * 0.012;
      const horizontalSpace =
        2 * cameraDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      // Close-ups can crop the base vertically while retaining the basket and
      // hands when a responsive host provides less horizontal space.
      const effectiveZoom = Math.min(zoom, Math.max(1, horizontalSpace / 1.6));
      const framedDistance = cameraDistance / effectiveZoom;
      cameraTarget.y = framingElevation;
      camera.position.set(
        0.08 + pointerX * 0.045,
        framingElevation + framedDistance * viewingAngle - pointerY * 0.035,
        framedDistance,
      );
      camera.lookAt(cameraTarget);
      key.shadow.needsUpdate = true;
    }

    function draw(time: number) {
      frame = 0;
      if (disposed || !active || !intersecting || !hasSize || document.hidden) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = time;
      const damping = 1 - Math.exp(-delta * 9);
      if (!reduced) {
        progress = THREE.MathUtils.lerp(progress, targetProgress, damping);
        pointerX = THREE.MathUtils.lerp(pointerX, targetPointerX, damping);
        pointerY = THREE.MathUtils.lerp(pointerY, targetPointerY, damping);
        zoom = THREE.MathUtils.lerp(zoom, targetZoom, damping);
        framingElevation = THREE.MathUtils.lerp(framingElevation, targetFramingElevation, damping);
        if (Math.abs(progress - targetProgress) < 0.00005) progress = targetProgress;
        if (Math.abs(pointerX - targetPointerX) < 0.001) pointerX = targetPointerX;
        if (Math.abs(pointerY - targetPointerY) < 0.001) pointerY = targetPointerY;
        if (Math.abs(zoom - targetZoom) < 0.0001) zoom = targetZoom;
        if (Math.abs(framingElevation - targetFramingElevation) < 0.0001)
          framingElevation = targetFramingElevation;
      }
      if (gesture && !gesture.still && !reduced) {
        gesture.elapsed += delta;
        if (gesture.elapsed >= gesture.duration) gesture = null;
      }
      try {
        updatePose();
        renderer.render(scene, camera);
      } catch {
        fail();
        return;
      }
      const settling =
        !reduced &&
        (progress !== targetProgress ||
          pointerX !== targetPointerX ||
          pointerY !== targetPointerY ||
          zoom !== targetZoom ||
          framingElevation !== targetFramingElevation);
      if (settling || (gesture && !gesture.still && !reduced)) requestFrame();
    }

    function resize() {
      if (disposed) return;
      const { width, height } = host.getBoundingClientRect();
      hasSize = width > 0 && height > 0;
      if (!hasSize) {
        stopFrame();
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Fill about four-fifths of the host height. A narrow content lane
      // preserves the entire rotating base, hands, and basket with a side margin.
      const visibleHeight = Math.max(2.6, 1.6 / camera.aspect);
      cameraDistance = visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.far = Math.max(35, cameraDistance + 12);
      camera.updateProjectionMatrix();
      requestFrame();
    }

    const resizeObserver = new ResizeObserver(resize);
    releaseOnDispose(() => resizeObserver.disconnect());
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (disposed) return;
      intersecting = entry.isIntersecting;
      if (intersecting) requestFrame();
      else stopFrame();
    });
    releaseOnDispose(() => intersectionObserver.disconnect());
    intersectionObserver.observe(host);
    const onVisibility = () => {
      if (document.hidden) stopFrame();
      else requestFrame();
    };
    document.addEventListener("visibilitychange", onVisibility);
    releaseOnDispose(() => document.removeEventListener("visibilitychange", onVisibility));
    const onContextLost = (event: Event) => {
      event.preventDefault();
      fail();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    releaseOnDispose(() => canvas.removeEventListener("webglcontextlost", onContextLost));
    resize();

    // Render the first pose synchronously so setup/render failures reject this
    // promise before the wrapper marks the scene ready.
    if (hasSize && !document.hidden) {
      updatePose();
      renderer.render(scene, camera);
    }

    return {
      setProgress(next) {
        if (disposed || !Number.isFinite(next)) return;
        targetProgress = THREE.MathUtils.clamp(next, 0, 1);
        if (!reduced) requestFrame();
      },
      setPointer(x, y) {
        if (disposed || !Number.isFinite(x) || !Number.isFinite(y)) return;
        targetPointerX = THREE.MathUtils.clamp(x, -1, 1);
        targetPointerY = THREE.MathUtils.clamp(y, -1, 1);
        if (!reduced) requestFrame();
      },
      setFraming(next) {
        if (disposed || !Number.isFinite(next.zoom) || !Number.isFinite(next.elevation)) return;
        const nextZoom = THREE.MathUtils.clamp(next.zoom, 1, 1.45);
        const nextElevation = THREE.MathUtils.clamp(next.elevation, 0.85, 1.45);
        if (receivedFraming && targetZoom === nextZoom && targetFramingElevation === nextElevation)
          return;
        targetZoom = nextZoom;
        targetFramingElevation = nextElevation;
        // Establish the initial composition before paint, including for a
        // visitor whose OS already requests reduced motion. Later changes damp.
        if (!receivedFraming) {
          zoom = targetZoom;
          framingElevation = targetFramingElevation;
          receivedFraming = true;
          requestFrame();
        } else if (!reduced) requestFrame();
      },
      setActive(next) {
        if (disposed || active === next) return;
        active = next;
        if (active) requestFrame();
        else stopFrame();
      },
      setReducedMotion(next) {
        if (disposed || reduced === next) return;
        reduced = next;
        // Pause exactly where the visitor stopped, including a gesture's
        // current blend. Mode changes can still redraw this frozen pose.
        if (gesture) gesture.still = reduced;
        stopFrame();
        requestFrame();
      },
      setMode(mode) {
        if (disposed) return;
        const blueprint = mode === "blueprint";
        robot.setWireframe(blueprint);
        gridMaterials.forEach((material) => {
          material.opacity = blueprint ? 0.2 : 0.035;
        });
        ringMaterial.opacity = blueprint ? 0.38 : 0.12;
        floorMaterial.opacity = blueprint ? 0.08 : 0.16;
        requestFrame();
      },
      playGesture() {
        if (disposed) return;
        const duration = 2.2;
        gesture = { elapsed: reduced ? duration * 0.45 : 0, duration, still: reduced };
        requestFrame();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
