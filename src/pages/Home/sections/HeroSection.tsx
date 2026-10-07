import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { HeroHeatDistortion } from '../../../components/three/HeroHeatDistortion';
import { useCursor } from '../../../context/CursorContext';
import { ArrowDown } from 'lucide-react';
import { TypingText } from '../../../components/typography/TypingText';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const foregroundLeavesRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      if (!containerRef.current || !headlineRef.current) return;

      // Parallax scroll on hero background (ratio 0.8)
      gsap.to(bgRef.current, {
        scale: 1.12,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Foreground vegetation moves faster than distant estate (ratio 1.25)
      if (foregroundLeavesRef.current) {
        gsap.to(foregroundLeavesRef.current, {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Headline moves up with slight fade (ratio 1.0)
      gsap.to(headlineRef.current, {
        y: '-14vh',
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    },
    containerRef,
    []
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(20px, 4vw, 56px)',
        color: 'var(--chalk)'
      }}
      onMouseEnter={() => setCursor('default')}
      onMouseLeave={resetCursor}
    >
      {/* Background WebGL Heat Shimmer Plane */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-5%',
          zIndex: 1,
          willChange: 'transform'
        }}
      >
        <HeroHeatDistortion imageSrc="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=88" />
        {/* Warm Mediterranean sun gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23, 32, 25, 0.85) 0%, rgba(23, 32, 25, 0.3) 50%, rgba(211, 164, 59, 0.18) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Floating Foreground Olive & Bergamot Silhouette Leaves for Authentic Depth */}
      <div
        ref={foregroundLeavesRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.28,
          willChange: 'transform'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <path
            d="M-50,850 Q180,680 320,890 Q120,930 -50,850 Z"
            fill="#172019"
          />
          <path
            d="M1250,830 Q1380,720 1520,880 Q1400,940 1250,830 Z"
            fill="#172019"
          />
        </svg>
      </div>

      {/* Hero Content positioned near bottom */}
      <div
        ref={headlineRef}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'flex-end',
          gap: 'clamp(20px, 3vw, 40px)',
          marginBottom: 'clamp(20px, 3vh, 44px)'
        }}
        className="hero-grid"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span
              className="mono-micro"
              style={{
                color: 'var(--harvest)',
                letterSpacing: '0.22em'
              }}
            >
              SOLAR HARVEST // CONTRADA SELVATICO
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
            <span className="mono-micro" style={{ color: 'var(--bone)', opacity: 0.85 }}>
              <TypingText
                phrases={[
                  'MORNING DEW // 06:15 AM',
                  'BAROMETER: 1018 HPA',
                  'WINDS: SCIROCCO 8 KNOTS',
                  'STATUS: ACTIVE HARVEST'
                ]}
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={2400}
                cursorColor="var(--harvest)"
              />
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 8.2vw, 138px)',
              lineHeight: 0.94,
              letterSpacing: '-0.02em',
              margin: 0,
              color: 'var(--chalk)'
            }}
          >
            A PLACE<br />
            THAT GROWS<br />
            <em style={{ color: 'var(--harvest)', fontStyle: 'italic' }}>slowly.</em>
          </h1>
        </div>

        <div style={{ maxWidth: '440px', paddingBottom: '8px' }}>
          <p
            className="type-body-lg"
            style={{
              color: 'var(--bone)',
              lineHeight: 1.45,
              opacity: 0.92,
              marginBottom: '16px',
              fontSize: 'clamp(16px, 1.6vw, 22px)'
            }}
          >
            A botanical estate shaped by stone, wind and generations of patient cultivation.
          </p>
          <span
            className="mono-micro"
            style={{
              color: 'var(--sage)',
              fontSize: '11px',
              letterSpacing: '0.14em'
            }}
          >
            ESTABLISHED 1958 // SICILIA // 38°04&apos; N
          </span>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(241, 235, 221, 0.22)',
          paddingTop: '16px'
        }}
      >
        <span
          className="mono-micro"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--chalk)',
            letterSpacing: '0.18em'
          }}
        >
          SCROLL TO WANDER <ArrowDown size={14} color="var(--harvest)" />
        </span>

        <span
          className="mono-micro"
          style={{ color: 'rgba(241, 235, 221, 0.7)', letterSpacing: '0.15em' }}
        >
          38°04&apos; N &nbsp; 14°59&apos; E
        </span>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
