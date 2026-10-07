import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCursor } from '../../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export type RevealPattern = 'clip-inset' | 'mask-translate' | 'scale-down' | 'curtain-horizontal';

interface ImageRevealProps {
  src: string;
  alt: string;
  pattern?: RevealPattern;
  aspectRatio?: string;
  cursorText?: string;
  cursorVariant?: 'default' | 'view' | 'discover';
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  pattern = 'clip-inset',
  aspectRatio = '4 / 3',
  cursorText = 'VIEW',
  cursorVariant = 'view',
  className = '',
  style,
  imgStyle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const prefersReduced = useReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current || !imageRef.current) return;

      const trigger = {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      };

      if (pattern === 'clip-inset') {
        gsap.fromTo(
          containerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: trigger
          }
        );
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: trigger
          }
        );
      } else if (pattern === 'mask-translate') {
        gsap.fromTo(
          imageRef.current,
          { yPercent: 18, scale: 1.08 },
          {
            yPercent: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: trigger
          }
        );
      } else if (pattern === 'scale-down') {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.25,
            ease: 'power2.out',
            scrollTrigger: trigger
          }
        );
      } else if (pattern === 'curtain-horizontal') {
        if (curtainRef.current) {
          gsap.fromTo(
            curtainRef.current,
            { scaleX: 1, transformOrigin: 'right' },
            {
              scaleX: 0,
              duration: 0.95,
              ease: 'power3.inOut',
              scrollTrigger: trigger
            }
          );
        }
      }
    },
    containerRef,
    [pattern, prefersReduced]
  );

  return (
    <div
      ref={containerRef}
      className={`image-reveal-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        backgroundColor: 'rgba(37, 49, 38, 0.08)',
        ...style
      }}
      onMouseEnter={() => setCursor(cursorVariant, cursorText)}
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
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          willChange: 'transform',
          transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
          ...imgStyle
        }}
        className="reveal-img-element"
      />

      {pattern === 'curtain-horizontal' && (
        <div
          ref={curtainRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--terracotta)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      )}

      <style>{`
        .image-reveal-wrapper:hover .reveal-img-element {
          transform: scale(1.035);
        }
      `}</style>
    </div>
  );
};
