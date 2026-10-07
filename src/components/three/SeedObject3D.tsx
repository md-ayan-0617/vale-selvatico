import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SeedObject3DProps {
  progress: number; // 0 to 100
}

export const SeedObject3D: React.FC<SeedObject3DProps> = ({ progress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (!mountRef.current) return;

    const width = 320;
    const height = 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    mountRef.current.appendChild(renderer.domElement);

    // Create organic botanical seed geometry: an almond / olive-like seed shape
    // using Lathe or parametric / deformed sphere
    const geometry = new THREE.IcosahedronGeometry(1.25, 4);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Elongate along Y and taper to teardrop seed
      const taper = 1.0 - (y + 1.25) * 0.22;
      x *= taper;
      z *= taper;
      y *= 1.35;

      // Add gentle organic ribs
      const angle = Math.atan2(z, x);
      const rib = Math.sin(angle * 5) * 0.05;
      x += (x / Math.hypot(x, z || 0.001)) * rib;
      z += (z / Math.hypot(x, z || 0.001)) * rib;

      pos.setXYZ(i, x, y, z);
    }
    geometry.computeVertexNormals();

    // Matte clay-like shading (Terracotta / warm clay)
    const material = new THREE.MeshStandardMaterial({
      color: 0xBA6144, // matte terracotta clay
      roughness: 0.82,
      metalness: 0.05,
      flatShading: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Warm Mediterranean studio lighting
    const ambientLight = new THREE.AmbientLight(0xF1EBDD, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xD3A43B, 2.2); // Golden sun
    dirLight1.position.set(3, 4, 2);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x253126, 0.8); // Forest fill
    dirLight2.position.set(-3, -2, -1);
    scene.add(dirLight2);

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const prog = progressRef.current / 100;
      mesh.rotation.y += 0.008;
      mesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
      mesh.rotation.z = Math.cos(Date.now() * 0.0012) * 0.15;

      // Scale responds to loading progress (0.7 -> 1.05)
      const targetScale = 0.75 + prog * 0.35;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '320px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: 0.92
      }}
    />
  );
};
