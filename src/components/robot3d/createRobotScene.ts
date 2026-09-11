import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createDeploymentRobot } from "./createDeploymentRobot";

export type RobotPose = "carry" | "rest" | "wave";
export type RobotScene = {
  setPose: (pose: RobotPose) => void;
  setArmAngle: (angle: number) => void;
  setWireframe: (enabled: boolean) => void;
  setAutoRotate: (enabled: boolean) => void;
  rotate: (direction: number) => void;
  zoom: (factor: number) => void;
  resetView: () => void;
  dispose: () => void;
};

/** This scene is a visual reconstruction. It has no connection to teleoperation APIs. */
export function createRobotScene(
  host: HTMLDivElement,
  onWaveEnd: () => void,
  onContextLost: () => void,
  onAutoRotateStop?: () => void,
): RobotScene {
  const cleanup: Array<() => void> = [];
  let disposed = false;
  let frame = 0;

  // Register each allocation immediately so failed initialization follows the
  // same teardown path as unmounting or losing the WebGL context.
  function releaseOnDispose(release: () => void) {
    let active = true;
    const releaseOnce = () => {
      if (!active) return;
      active = false;
      release();
    };
    cleanup.push(releaseOnce);
    return releaseOnce;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    for (let i = cleanup.length - 1; i >= 0; i -= 1) {
      try {
        cleanup[i]();
      } catch {
        // A lost GPU context must not prevent other resources and listeners
        // from being released, or replace the original initialization error.
      }
    }
    cleanup.length = 0;
  }

  try {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    releaseOnDispose(() => renderer.dispose());
    const canvas = renderer.domElement;
    releaseOnDispose(() => canvas.remove());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.robotCanvas = "true";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    releaseOnDispose(() => {
      scene.environment = null;
      scene.clear();
    });
    const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 40);
    const startPosition = new THREE.Vector3(2.65, 2.15, 4.15);
    const target = new THREE.Vector3(0, 1.08, 0);
    camera.position.copy(startPosition);
    const controls = new OrbitControls(camera, canvas);
    releaseOnDispose(() => controls.dispose());
    controls.target.copy(target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2 - 0.035;
    controls.autoRotateSpeed = 0.7;
    controls.rotateSpeed = 0.65;
    canvas.style.touchAction = "pan-y pinch-zoom";
    controls.update();
    controls.saveState();

    const studio = new RoomEnvironment();
    const disposeStudio = releaseOnDispose(() => studio.dispose());
    const pmrem = new THREE.PMREMGenerator(renderer);
    const disposePmrem = releaseOnDispose(() => pmrem.dispose());
    const environment = pmrem.fromScene(studio, 0.04);
    releaseOnDispose(() => environment.dispose());
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.6;
    disposeStudio();
    disposePmrem();
    scene.add(new THREE.HemisphereLight(0xfaf5e6, 0xa0a6a8, 2.6));
    const key = new THREE.DirectionalLight(0xfff3df, 4.1);
    releaseOnDispose(() => key.shadow.dispose());
    key.position.set(-3, 5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -2;
    key.shadow.camera.right = 2;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -2;
    key.shadow.normalBias = 0.015;
    key.shadow.bias = -0.0001;
    key.shadow.radius = 4;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xd3e9fa, 3.2);
    rim.position.set(3, 3, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 1.2);
    fill.position.set(0, 1.8, 5);
    scene.add(fill);

    const robot = createDeploymentRobot();
    releaseOnDispose(() => robot.dispose());
    robot.setPose("carry");
    scene.add(robot.group);
    const floorGeometry = new THREE.CircleGeometry(1.38, 96);
    releaseOnDispose(() => floorGeometry.dispose());
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xece9df,
      roughness: 1,
      metalness: 0,
    });
    releaseOnDispose(() => floorMaterial.dispose());
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.014;
    floor.receiveShadow = true;
    scene.add(floor);
    const ringGeometry = new THREE.RingGeometry(1.41, 1.415, 96);
    releaseOnDispose(() => ringGeometry.dispose());
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xbec4b4,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    releaseOnDispose(() => ringMaterial.dispose());
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.02;
    scene.add(ring);

    let visible = true;
    let waveStarted: number | null = null;
    let lastTime = performance.now();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const requestFrame = () => {
      if (!disposed && !frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    function draw(time: number) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (waveStarted !== null) {
        const elapsed = (time - waveStarted) / 1000;
        if (elapsed < 2.6) {
          robot.setPose("wave", motionPreference.matches ? 0 : elapsed * 7);
        } else {
          waveStarted = null;
          robot.setPose("carry");
          onWaveEnd();
        }
      }
      const changed = controls.update(delta);
      renderer.render(scene, camera);
      if (changed || waveStarted !== null || controls.autoRotate) requestFrame();
    }
    controls.addEventListener("change", requestFrame);
    releaseOnDispose(() => controls.removeEventListener("change", requestFrame));
    const resize = new ResizeObserver(() => {
      if (disposed) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestFrame();
    });
    releaseOnDispose(() => resize.disconnect());
    resize.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      if (disposed) return;
      visible = entry.isIntersecting;
      if (visible) requestFrame();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    releaseOnDispose(() => intersection.disconnect());
    intersection.observe(host);
    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestFrame();
    };
    document.addEventListener("visibilitychange", onVisibility);
    releaseOnDispose(() => document.removeEventListener("visibilitychange", onVisibility));
    const onLost = (event: Event) => {
      if (disposed) return;
      event.preventDefault();
      dispose();
      onContextLost();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    releaseOnDispose(() => canvas.removeEventListener("webglcontextlost", onLost));
    const changeMotion = () => {
      if (disposed) return;
      if (motionPreference.matches && controls.autoRotate) {
        controls.autoRotate = false;
        onAutoRotateStop?.();
      }
      requestFrame();
    };
    motionPreference.addEventListener("change", changeMotion);
    releaseOnDispose(() => motionPreference.removeEventListener("change", changeMotion));
    requestFrame();

    return {
      setPose(pose) {
        waveStarted = pose === "wave" ? performance.now() : null;
        robot.setPose(pose, 0);
        requestFrame();
      },
      setArmAngle(angle) {
        waveStarted = null;
        robot.setArmAngle(angle);
        requestFrame();
      },
      setWireframe(enabled) {
        robot.setWireframe(enabled);
        requestFrame();
      },
      setAutoRotate(enabled) {
        controls.autoRotate = enabled;
        requestFrame();
      },
      rotate(direction) {
        const offset = camera.position.clone().sub(controls.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), (direction * Math.PI) / 8);
        camera.position.copy(controls.target).add(offset);
        controls.update();
        requestFrame();
      },
      zoom(factor) {
        const offset = camera.position.clone().sub(controls.target);
        offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, 3.3, 7));
        camera.position.copy(controls.target).add(offset);
        controls.update();
        requestFrame();
      },
      resetView() {
        controls.reset();
        camera.position.copy(startPosition);
        controls.target.copy(target);
        controls.update();
        requestFrame();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
