import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroHeatDistortionProps {
  imageSrc: string;
}

export const HeroHeatDistortion: React.FC<HeroHeatDistortionProps> = ({ imageSrc }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current || prefersReduced) return;

    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Organic Heat Distortion Vertex & Fragment Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      varying vec2 vUv;

      void main() {
        // Maintain cover aspect ratio
        vec2 ratio = vec2(
          min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
          min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
        );
        vec2 uv = vec2(
          vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
          vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        // Subtle heat shimmer wave (2-5px maximum displacement)
        float wave1 = sin(uv.y * 35.0 + uTime * 1.2) * 0.0018;
        float wave2 = cos(uv.x * 25.0 + uTime * 0.9) * 0.0012;

        // Mouse gentle warm air draft
        vec2 mouseDist = uv - uMouse;
        float dist = length(mouseDist);
        float mouseEffect = smoothstep(0.45, 0.0, dist) * 0.0035;

        vec2 distortedUv = uv + vec2(wave1 + mouseDist.x * mouseEffect, wave2 + mouseDist.y * mouseEffect);

        vec4 color = texture2D(uTexture, distortedUv);

        // Warm Mediterranean grading tint
        color.rgb = mix(color.rgb, color.rgb * vec3(1.04, 1.01, 0.96), 0.35);

        gl_FragColor = color;
      }
    `;

    const uniforms = {
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1600, 1000) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      animationId = requestAnimationFrame(render);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc, prefersReduced]);

  if (prefersReduced) {
    return (
      <img
        src={imageSrc}
        alt="Vale Selvatico Estate"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    />
  );
};
