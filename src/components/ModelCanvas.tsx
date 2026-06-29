import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Touch devices: no drag-to-rotate (it hijacks page scroll). The model still
// auto-spins, and the canvas lets touches pass through to the page.
const IS_TOUCH =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

function Model({ url, spin }: { url: string; spin: boolean }) {
  const { scene } = useGLTF(url, true);
  const ref = useRef<THREE.Group>(null);

  // normalise to a consistent size, centred at the origin
  const obj = useMemo(() => {
    const s = scene.clone(true);
    const size = new THREE.Box3().setFromObject(s).getSize(new THREE.Vector3());
    const scale = 2.6 / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    const c = new THREE.Box3().setFromObject(s).getCenter(new THREE.Vector3());
    s.position.set(-c.x, -c.y, -c.z);
    s.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = false;
    });
    return s;
  }, [scene]);

  // auto-spin on touch devices (where OrbitControls is disabled)
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={ref}>
      <primitive object={obj} />
    </group>
  );
}

/** Pre-fetch + pre-decode the models (used for idle warm-up). */
export function preloadModels() {
  ["/models/churro.glb", "/models/chinese.glb", "/models/fastfood.glb"].forEach(
    (u) => useGLTF.preload(u, true)
  );
}

export default function ModelCanvas({
  url,
  elevation = 1.2,
}: {
  url: string;
  elevation?: number;
}) {
  return (
    <Canvas
      dpr={[1, IS_TOUCH ? 1.5 : 1.8]}
      camera={{ position: [0, elevation, 4.7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{
        width: "100%",
        height: "100%",
        // never let the canvas capture touch on phones
        pointerEvents: IS_TOUCH ? "none" : "auto",
        touchAction: "pan-y",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} />
      <directionalLight position={[0, -3, 4]} intensity={0.45} />
      <Suspense fallback={null}>
        <Model url={url} spin={IS_TOUCH} />
      </Suspense>
      {!IS_TOUCH && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2.6}
        />
      )}
    </Canvas>
  );
}
