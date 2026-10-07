import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { SplitTextReveal } from '../../../components/typography/SplitTextReveal';
import { useCursor } from '../../../context/CursorContext';
import { TypingText } from '../../../components/typography/TypingText';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      if (!containerRef.current || !photoRef.current) return;

      // Photo rotates -3 deg -> +2 deg on scroll with smooth scrub
      gsap.fromTo(
        photoRef.current,
        { rotation: -3.5, y: 40 },
        {
          rotation: 2.5,
          y: -40,
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
    []
  );

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bone)',
        color: 'var(--forest)',
        padding: 'clamp(64px, 11vh, 160px) clamp(20px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.7fr',
          gap: 'clamp(36px, 6vw, 96px)',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
        className="philosophy-grid"
      >
        {/* Left: Huge Editorial Statement */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span
              className="mono-micro"
              style={{
                color: 'var(--terracotta)',
                letterSpacing: '0.2em'
              }}
            >
              01 // THE VALLEY PHILOSOPHY
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
            <span className="mono-micro" style={{ color: 'var(--forest)', opacity: 0.8 }}>
              <TypingText
                phrases={[
                  'ROOTS IN FRACTURED LIMESTONE',
                  'ZERO CHEMICAL NITROGEN',
                  'WATER TRAVELS 12M DEEP',
                  'PATIENCE IS OUR PRIMARY INGREDIENT'
                ]}
                typingSpeed={38}
                deletingSpeed={22}
                pauseDuration={2600}
                cursorColor="var(--terracotta)"
              />
            </span>
          </div>

          <SplitTextReveal as="h2" className="type-h1" style={{ color: 'var(--forest)', marginBottom: 'clamp(14px, 2vh, 28px)' }}>
            WE CULTIVATE
          </SplitTextReveal>
          <SplitTextReveal as="h2" className="type-h1" style={{ color: 'var(--forest)', marginBottom: 'clamp(14px, 2vh, 28px)' }}>
            THE THINGS
          </SplitTextReveal>
          <SplitTextReveal as="h2" className="type-h1" style={{ color: 'var(--forest)', marginBottom: 'clamp(14px, 2vh, 28px)' }}>
            THAT CAN&apos;T
          </SplitTextReveal>
          <SplitTextReveal as="h2" className="type-h1" style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>
            BE *RUSHED.*
          </SplitTextReveal>

          <p
            className="type-body-lg"
            style={{
              marginTop: 'clamp(28px, 4vh, 44px)',
              maxWidth: '52ch',
              color: 'var(--forest)',
              opacity: 0.9,
              fontSize: 'clamp(16px, 1.6vw, 24px)'
            }}
          >
            Between limestone terraces and sea air, time is our primary ingredient. We work in rhythm with the sun, the bees and thirty-day macerations.
          </p>
        </div>

        {/* Right: Floating tree bark photograph with scroll rotation */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            ref={photoRef}
            style={{
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '3 / 4.2',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(37, 49, 38, 0.15)',
              transformOrigin: 'center center',
              willChange: 'transform'
            }}
            onMouseEnter={() => setCursor('view', 'BARK')}
            onMouseLeave={resetCursor}
          >
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1000&q=85"
              alt="Ancient Olive Tree Bark"
              fallbackType="olive"
              containerStyle={{ width: '100%', height: '100%' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--bone)',
                zIndex: 2
              }}
            >
              <span className="mono-micro" style={{ fontSize: '10px', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                CENTURY BARK
              </span>
              <span className="mono-micro" style={{ fontSize: '10px', textShadow: '0 1px 4px rgba(0,0,0,0.6)', color: 'var(--harvest)' }}>
                BLOCK 04
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .philosophy-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
