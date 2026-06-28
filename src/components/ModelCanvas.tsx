import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);

  // normalise every model to a consistent size, centred at the origin
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

  return <primitive object={obj} />;
}

export default function ModelCanvas({ url }: { url: string }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} />
      <directionalLight position={[0, -3, 4]} intensity={0.45} />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2.6}
      />
    </Canvas>
  );
}
