import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCursor } from '../../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // e.g. -15 to 15% parallax
  aspectRatio?: string;
  cursorText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 10,
  aspectRatio = '16 / 9',
  cursorText = 'VIEW',
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current || !imageRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    },
    containerRef,
    [speed, prefersReduced]
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        ...style
      }}
      onMouseEnter={() => setCursor('view', cursorText)}
      onMouseLeave={resetCursor}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
        }}
        style={{
          width: '100%',
          height: '120%',
          top: '-10%',
          position: 'absolute',
          objectFit: 'cover',
          willChange: 'transform'
        }}
      />
    </div>
  );
};
