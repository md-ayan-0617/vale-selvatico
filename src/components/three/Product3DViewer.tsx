import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Product3DViewerProps {
  labelColor?: string;
  bottleType?: 'syrup' | 'preserve' | 'oil';
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  labelColor = '#A95337'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current || prefersReduced) return;

    const container = mountRef.current;
    let width = container.clientWidth || 380;
    let height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm Mediterranean Softbox Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xF1EBDD, 1.4);
    scene.add(ambientLight);

    // Key softbox light
    const keyLight = new THREE.DirectionalLight(0xFDF5E6, 2.5);
    keyLight.position.set(2.5, 4, 3);
    scene.add(keyLight);

    // Rim / backlight for glass reflections
    const rimLight = new THREE.DirectionalLight(0xD3A43B, 2.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Soft fill from below
    const fillLight = new THREE.DirectionalLight(0x8E9B7B, 0.6);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Group holding the complete bottle assembly
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Amber/Olive Glass Bottle Body (Lathe Geometry for elegant apothecary silhouette)
    const points: THREE.Vector2[] = [];
    // Base
    points.push(new THREE.Vector2(0, -1.5));
    points.push(new THREE.Vector2(0.68, -1.5));
    // Main body
    points.push(new THREE.Vector2(0.72, -1.4));
    points.push(new THREE.Vector2(0.74, 0.4));
    // Shoulder curve
    points.push(new THREE.Vector2(0.70, 0.7));
    points.push(new THREE.Vector2(0.45, 1.05));
    points.push(new THREE.Vector2(0.30, 1.2));
    // Neck
    points.push(new THREE.Vector2(0.28, 1.7));
    // Lip
    points.push(new THREE.Vector2(0.34, 1.75));
    points.push(new THREE.Vector2(0.32, 1.82));
    points.push(new THREE.Vector2(0.22, 1.82));
    points.push(new THREE.Vector2(0, 1.82));

    const bottleGeo = new THREE.LatheGeometry(points, 48);

    // High quality translucent amber glass material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x946522, // Rich dark amber botanical glass
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.65, // translucent glass
      thickness: 1.2,
      ior: 1.52,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.95
    });

    const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
    bottleGroup.add(bottleMesh);

    // 2. Liquid inside
    const liquidGeo = new THREE.CylinderGeometry(0.68, 0.66, 1.7, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xC48220, // golden botanical syrup nectar
      roughness: 0.25,
      metalness: 0.1
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.55;
    bottleGroup.add(liquidMesh);

    // 3. Tactile Paper Label on Front
    const labelGeo = new THREE.CylinderGeometry(0.745, 0.745, 1.1, 32, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
    
    // Create canvas texture for the label typography
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d')!;

    // Paper textured background
    ctx.fillStyle = '#E6DFD1';
    ctx.fillRect(0, 0, 1024, 1024);

    // Border line
    ctx.strokeStyle = '#253126';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 904, 904);

    // Terracotta inner accent
    ctx.strokeStyle = labelColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(76, 76, 872, 872);

    // Label Header
    ctx.fillStyle = '#253126';
    ctx.font = 'bold 36px "Azeret Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('VALE SELVATICO', 512, 180);

    ctx.fillStyle = labelColor;
    ctx.font = '28px "Azeret Mono", monospace';
    ctx.fillText('CONTRADA SELVATICO // SICILIA', 512, 230);

    // Title
    ctx.fillStyle = '#1D1D19';
    ctx.font = 'italic 76px "Instrument Serif", Georgia, serif';
    ctx.fillText('Bergamot No. 04', 512, 430);

    // Subtitle
    ctx.fillStyle = '#253126';
    ctx.font = '32px "Manrope", sans-serif';
    ctx.fillText('BOTANICAL HARVEST SYRUP', 512, 520);

    // Metadata rules
    ctx.strokeStyle = '#8E9B7B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 600);
    ctx.lineTo(844, 600);
    ctx.stroke();

    ctx.fillStyle = '#253126';
    ctx.font = '30px "Azeret Mono", monospace';
    ctx.fillText('BATCH 04  •  375 ML  •  2026', 512, 670);
    ctx.fillText('SLOW MACERATION  •  UNFILTERED', 512, 730);

    // Wax seal mark
    ctx.fillStyle = '#A95337';
    ctx.beginPath();
    ctx.arc(512, 840, 42, 0, Math.PI * 2);
    ctx.fill();

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.35;
    bottleGroup.add(labelMesh);

    // 4. Natural Cork Stopper
    const corkGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.45, 24);
    const corkMat = new THREE.MeshStandardMaterial({
      color: 0x9E7E59, // rough cork
      roughness: 0.95
    });
    const corkMesh = new THREE.Mesh(corkGeo, corkMat);
    corkMesh.position.y = 1.95;
    bottleGroup.add(corkMesh);

    // Initial positioning
    bottleGroup.position.y = -0.15;
    bottleGroup.rotation.y = 0.2;

    let targetRotY = 0.2;
    let targetTiltX = 0;
    let targetTiltZ = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Maximum +-5 deg tilt
      targetTiltX = ny * 0.08;
      targetTiltZ = -nx * 0.08;
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      // Slow 20-30 deg rotation on scroll
      targetRotY = 0.2 + progress * 0.55;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);

      bottleGroup.rotation.y += (targetRotY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetTiltX - bottleGroup.rotation.x) * 0.08;
      bottleGroup.rotation.z += (targetTiltZ - bottleGroup.rotation.z) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      bottleGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      labelTexture.dispose();
      corkGeo.dispose();
      corkMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [labelColor, prefersReduced]);

  if (prefersReduced) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=85"
          alt="Bergamot No. 04 Botanical Bottle"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80';
          }}
          style={{ maxHeight: '460px', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    />
  );
};
