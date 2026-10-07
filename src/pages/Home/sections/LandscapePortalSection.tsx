import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useCursor } from '../../../context/CursorContext';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';

gsap.registerPlugin(ScrollTrigger);

export const LandscapePortalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current || !portalRef.current || !textRef.current) return;

      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=150%',
          pin: true,
          scrub: 0.6
        }
      });

      // Expand image until it fills viewport
      tl.fromTo(
        portalRef.current,
        {
          width: isMobile ? '78vw' : '38vw',
          height: isMobile ? '55vw' : '28vw',
          borderRadius: '4px'
        },
        {
          width: '100vw',
          height: '100svh',
          borderRadius: '0px',
          ease: 'power2.inOut'
        }
      );

      // Fade text out as image reaches full screen
      tl.to(
        textRef.current,
        {
          opacity: 0,
          scale: 1.15,
          ease: 'power2.inOut'
        },
        '-=0.4'
      );
    },
    containerRef,
    [prefersReduced]
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: 'var(--bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Expanding Landscape Portal */}
      <div
        ref={portalRef}
        style={{
          position: 'relative',
          width: 'clamp(280px, 38vw, 600px)',
          height: 'clamp(200px, 28vw, 440px)',
          maxWidth: '100vw',
          maxHeight: '100svh',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(23, 32, 25, 0.28)',
          willChange: 'width, height'
        }}
        onMouseEnter={() => setCursor('view', 'ENTER')}
        onMouseLeave={resetCursor}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88"
          alt="Estate Valley Terraces"
          fallbackType="estate"
          containerStyle={{ width: '100%', height: '100%' }}
        />
        {/* Soft shadow tint over image for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(23, 32, 25, 0.35)',
            zIndex: 2
          }}
        />
      </div>

      {/* Floating Center Statement */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          color: 'var(--chalk)',
          padding: '20px'
        }}
      >
        <span
          className="mono-micro"
          style={{
            color: 'var(--harvest)',
            letterSpacing: '0.24em',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          PORTAL // CONTRADA
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 8.5vw, 120px)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            margin: 0
          }}
        >
          ENTER<br />
          THE *VALLEY*
        </h2>
      </div>
    </section>
  );
};
