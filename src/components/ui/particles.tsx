"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticlesProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  className?: string;
}

// Generate a soft round sprite as a data URL so we don't ship an asset file.
function makeDiscTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * ScrollX UI — Particles (@scrollxui/components/particles)
 * Adapted to size against its container instead of the window.
 */
export function Particles({
  color = "#ff3366",
  particleCount = 10000,
  particleSize = 35,
  animate = true,
  className = "",
}: ParticlesProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let material: THREE.PointsMaterial;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      return { w: Math.max(1, rect.width), h: Math.max(1, rect.height) };
    };

    const { w, h } = getSize();

    camera = new THREE.PerspectiveCamera(55, w / h, 2, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      vertices.push(
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000
      );
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const sprite = makeDiscTexture();
    material = new THREE.PointsMaterial({
      size: particleSize,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.1,
      transparent: true,
      depthWrite: false,
    });
    material.color.setStyle(color);

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      const rect = container.getBoundingClientRect();
      mouseX = event.clientX - rect.left - rect.width / 2;
      mouseY = event.clientY - rect.top - rect.height / 2;
    };

    const animateScene = () => {
      if (animate) {
        const time = Date.now() * 0.00005;
        const hue = ((360 * (1.0 + time)) % 360) / 360;
        material.color.setHSL(hue, 0.5, 0.5);
      }
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateScene);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    window.addEventListener("pointermove", handlePointerMove);
    animateScene();

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, particleCount, particleSize, animate]);

  return <div ref={mountRef} className={className} />;
}
