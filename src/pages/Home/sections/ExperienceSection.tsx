import React, { useState, useRef } from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { MagneticButton } from '../../../components/common/MagneticButton';
import { useCursor } from '../../../context/CursorContext';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';
import { TypingText } from '../../../components/typography/TypingText';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const [isHoveredCTA, setIsHoveredCTA] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useNavigation();
  const { setCursor, resetCursor } = useCursor();

  // Subtle parallax based on cursor coordinates on desktop
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setOffset({ x, y });
  };

  useGSAPContext(() => {
    if (bgRef.current && containerRef.current) {
      // Background scroll scrub parallax
      gsap.fromTo(
        bgRef.current,
        { scale: 1.02, yPercent: -4 },
        {
          scale: 1.14,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }

    if (contentRef.current && containerRef.current) {
      // Content stagger entrance on scroll
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(32px, 6vw, 80px)',
        color: 'var(--chalk)',
        backgroundColor: 'var(--forest-deep)'
      }}
      onMouseEnter={() => setCursor('default')}
      onMouseLeave={resetCursor}
    >
      {/* Sunset full-bleed image with scroll parallax & mouse shift */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-30px',
          zIndex: 1,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: 'transform 0.25s ease-out',
          willChange: 'transform'
        }}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=88"
          alt="Long communal dining table under ancient olive trees at sunset"
          className="experience-bg-img"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0
          }}
          aspectRatio="unset"
          objectFit="cover"
        />

        {/* Night / Candlelit crossfade version on CTA hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHoveredCTA ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
            pointerEvents: 'none'
          }}
        >
          <ResponsiveImage
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=88"
            alt="Candlelit dinner under Sicilian night sky"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0
            }}
            aspectRatio="unset"
            objectFit="cover"
          />
        </div>

        {/* Atmospheric twilight gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23, 32, 25, 0.92) 0%, rgba(23, 32, 25, 0.4) 55%, rgba(99, 63, 75, 0.25) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Typography & CTA */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '820px',
          width: '100%'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--harvest)',
              boxShadow: '0 0 10px var(--harvest)'
            }}
          />
          <TypingText
            texts={[
              'AT THE ESTATE // HOSPITALITY',
              'SUNSET SUPPERS // STRICTLY 12 SEATS',
              'ANCIENT OLIVE GROVE DINING',
              'BOTANICAL INFUSIONS & VINEYARD ARCHIVE'
            ]}
            speed={40}
            pauseDuration={2800}
            className="mono-micro"
            style={{ color: 'var(--harvest)', letterSpacing: '0.22em' }}
          />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(46px, 8vw, 120px)',
            lineHeight: 0.96,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
            color: 'var(--chalk)'
          }}
        >
          COME<br />
          STAY<br />
          <em style={{ color: 'var(--harvest)', fontStyle: 'italic' }}>*awhile.*</em>
        </h2>

        <p
          className="type-body-lg"
          style={{
            color: 'var(--bone)',
            marginBottom: '32px',
            maxWidth: '48ch',
            opacity: 0.92,
            fontSize: 'clamp(16px, 1.8vw, 21px)',
            lineHeight: 1.6
          }}
        >
          Walk the terraced groves with our agronomist. Pick wild herbs for evening broth. Sit down at our wooden table as the Mediterranean sun dips behind the hills.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <MagneticButton strength={12} cursorVariant="hover">
            <button
              onClick={() => openBooking('The Botanical Table')}
              onMouseEnter={() => {
                setIsHoveredCTA(true);
                setCursor('hover');
              }}
              onMouseLeave={() => {
                setIsHoveredCTA(false);
                resetCursor();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: 'clamp(14px, 2vw, 18px) clamp(26px, 3.5vw, 36px)',
                backgroundColor: 'var(--terracotta)',
                color: 'var(--chalk)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                boxShadow: '0 12px 28px rgba(0,0,0,0.3)'
              }}
            >
              <span>VISIT THE VALLEY</span>
              <ArrowUpRight size={16} />
            </button>
          </MagneticButton>

          <span
            className="mono-micro"
            style={{
              color: 'var(--paper)',
              opacity: 0.8,
              fontSize: '10px',
              letterSpacing: '0.12em'
            }}
          >
            SPRING & AUTUMN CALENDAR NOW OPEN
          </span>
        </div>
      </div>
    </section>
  );
};
