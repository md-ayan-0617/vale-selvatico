import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useCursor } from '../../../context/CursorContext';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';

gsap.registerPlugin(ScrollTrigger);

export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLHeadingElement>(null);
  const textLine2Ref = useRef<HTMLHeadingElement>(null);
  const floatImg1Ref = useRef<HTMLDivElement>(null);
  const floatImg2Ref = useRef<HTMLDivElement>(null);
  const floatImg3Ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current) return;

      // Scroll kinetic typography movement
      if (textLine1Ref.current) {
        gsap.to(textLine1Ref.current, {
          xPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              // Subtle scroll velocity skew (-4 to +4 deg)
              const velocity = Math.max(-5, Math.min(5, self.getVelocity() / 350));
              if (textLine1Ref.current) {
                gsap.to(textLine1Ref.current, { skewX: velocity, duration: 0.3, overwrite: 'auto' });
              }
            }
          }
        });
      }

      if (textLine2Ref.current) {
        gsap.to(textLine2Ref.current, {
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const velocity = Math.max(-4, Math.min(4, self.getVelocity() / 400));
              if (textLine2Ref.current) {
                gsap.to(textLine2Ref.current, { skewX: -velocity, duration: 0.3, overwrite: 'auto' });
              }
            }
          }
        });
      }

      // Floating documentary images at differentiated speeds
      if (floatImg1Ref.current) {
        gsap.to(floatImg1Ref.current, {
          yPercent: -45,
          rotation: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (floatImg2Ref.current) {
        gsap.to(floatImg2Ref.current, {
          yPercent: -70,
          rotation: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (floatImg3Ref.current) {
        gsap.to(floatImg3Ref.current, {
          yPercent: -35,
          rotation: -2,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    },
    containerRef,
    [prefersReduced]
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--terracotta)',
        color: 'var(--chalk)',
        padding: 'clamp(80px, 16vh, 220px) 0',
        overflow: 'hidden'
      }}
    >
      {/* Floating Documentary Images */}
      {/* 1. Muddy hands / soil */}
      <div
        ref={floatImg1Ref}
        style={{
          position: 'absolute',
          top: '20%',
          left: '8%',
          width: 'clamp(120px, 16vw, 240px)',
          aspectRatio: '4 / 5',
          zIndex: 1,
          opacity: 0.85,
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setCursor('view', 'SOIL')}
        onMouseLeave={resetCursor}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80"
          alt="Hands touching soil"
          fallbackType="olive"
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* 2. Cracked Stone Wall */}
      <div
        ref={floatImg2Ref}
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: 'clamp(130px, 18vw, 260px)',
          aspectRatio: '1',
          zIndex: 1,
          opacity: 0.85,
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setCursor('view', 'STONE')}
        onMouseLeave={resetCursor}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80"
          alt="Ancient Dry Stone Wall"
          fallbackType="estate"
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* 3. Imperfect Heirloom Fruit */}
      <div
        ref={floatImg3Ref}
        style={{
          position: 'absolute',
          top: '35%',
          right: '25%',
          width: 'clamp(110px, 14vw, 200px)',
          aspectRatio: '3 / 4',
          zIndex: 1,
          opacity: 0.8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setCursor('view', 'FRUIT')}
        onMouseLeave={resetCursor}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80"
          alt="Split Summer Fig"
          fallbackType="fig"
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Central Massive Typography */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 clamp(20px, 5vw, 64px)' }}>
        <span
          className="mono-micro"
          style={{
            color: 'var(--harvest)',
            letterSpacing: '0.22em',
            display: 'block',
            marginBottom: '16px'
          }}
        >
          THE MANIFESTO // RAW HONESTY
        </span>

        <h2
          ref={textLine1Ref}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 13vw, 200px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
            willChange: 'transform'
          }}
        >
          NOT PERFECT.
        </h2>

        <h2
          ref={textLine2Ref}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 16vw, 250px)',
            fontStyle: 'italic',
            color: 'var(--harvest)',
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            margin: '8px 0 0 0',
            whiteSpace: 'nowrap',
            willChange: 'transform'
          }}
        >
          *Alive.*
        </h2>

        <p
          className="type-body-lg"
          style={{
            marginTop: 'clamp(32px, 6vh, 80px)',
            maxWidth: '44ch',
            color: 'var(--bone)',
            opacity: 0.95,
            fontSize: 'clamp(16px, 1.6vw, 24px)'
          }}
        >
          We do not wax our fruit to shine on supermarket shelves. We leave the sunspots, the sap droplets and the rough skin. Nature is not symmetrical.
        </p>
      </div>
    </section>
  );
};
