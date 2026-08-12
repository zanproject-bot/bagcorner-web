import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds } from "@react-three/drei";
import type { Group } from "three";
const modelUrl = "/models/20260706_ransel_1_3d.glb";

useGLTF.preload(modelUrl);

function Model({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { scene } = useGLTF(modelUrl);
  const group = useRef<Group>(null);
  const dragging = useRef(false);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Cursor-follow target (only when user isn't dragging via OrbitControls)
    const targetY = pointer.current.x * Math.PI * 0.6;
    const targetX = -pointer.current.y * 0.35;
    // Smoothly ease group rotation toward cursor target
    const g = group.current;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 4);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 4);
    void dragging;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export function Rotating3DBag() {
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  return (
    <div
      className="relative w-full aspect-square max-w-[600px] mx-auto rounded-3xl overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, hsl(28 100% 92%) 0%, hsl(28 100% 85%) 45%, hsl(20 90% 75%) 100%)",
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 3.2], fov: 35 }}
        onCreated={() => setReady(true)}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.15}>
            <Model pointer={pointer} />
          </Bounds>
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.45}
            scale={6}
            blur={2.4}
            far={3}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          makeDefault
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-orange-900/60">
          Memuat model 3D…
        </div>
      )}
    </div>
  );
}
