import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { seasonalMonths, harvestChapters, processStages, agriculturalMetrics } from '../../data/harvest';
import type { SeasonalWheelMonth } from '../../types';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { TypingText } from '../../components/typography/TypingText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const Harvest: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();

  // Active month on the seasonal calendar wheel (Default: October)
  const [selectedMonth, setSelectedMonth] = useState<SeasonalWheelMonth>(
    seasonalMonths.find((m) => m.month === 'OCT') || seasonalMonths[9]
  );

  const heroLine1Ref = useRef<HTMLDivElement>(null);
  const heroLine2Ref = useRef<HTMLDivElement>(null);
  const heroLine3Ref = useRef<HTMLDivElement>(null);
  const heroSliceRef = useRef<HTMLDivElement>(null);
  const processLineFillRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    document.title = 'HARVEST // RHYTHM OF THE YEAR — VALE SELVATICO';
    setCurrentChapter('HARVEST // SOLAR RHYTHM');
    setActiveSectionNumber('03');
  }, [setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    // 1. Harvest Hero entry sequence
    const tl = gsap.timeline();
    tl.fromTo(
      [heroLine1Ref.current, heroLine2Ref.current, heroLine3Ref.current],
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
    );
    tl.fromTo(
      heroSliceRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.1, ease: 'power3.inOut' },
      '-=0.3'
    );

    // 2. Slow subtle rotation of the seasonal wheel on scroll
    if (wheelSvgRef.current) {
      gsap.to(wheelSvgRef.current, {
        rotation: 45,
        transformOrigin: 'center center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.wheel-container-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 3. Process vertical line filling with terracotta
    if (processSectionRef.current && processLineFillRef.current) {
      gsap.fromTo(
        processLineFillRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );
    }
  });

  return (
    <main style={{ backgroundColor: '#D3A43B', color: 'var(--espresso)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HARVEST HERO — Harvest Yellow with Center Vertical Slice */}
      <section
        style={{
          minHeight: '100svh',
          backgroundColor: '#D3A43B',
          color: 'var(--espresso)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(20px, 4vw, 56px)',
          textAlign: 'center'
        }}
      >
        {/* Center Vertical Image Slice revealing harvest footage */}
        <div
          ref={heroSliceRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(200px, 32vw, 440px)',
            zIndex: 1,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(33, 26, 22, 0.35)',
            borderLeft: '1px solid rgba(33, 26, 22, 0.2)',
            borderRight: '1px solid rgba(33, 26, 22, 0.2)'
          }}
          onMouseEnter={() => setCursor('view', 'HARVEST')}
          onMouseLeave={resetCursor}
        >
          <ResponsiveImage
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
            alt="Mediterranean harvest morning"
            fallbackType="citrus"
            containerStyle={{ width: '100%', height: '100%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(211, 164, 59, 0.18)',
              zIndex: 2
            }}
          />
        </div>

        {/* Huge Typography layered over and around slice */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span
              className="mono-micro"
              style={{
                color: 'var(--espresso)',
                letterSpacing: '0.24em'
              }}
            >
              THE HARVEST ALMANAC // 38°04&apos; N
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--espresso)' }} />
            <span className="mono-micro" style={{ color: 'var(--terracotta)' }}>
              <TypingText
                phrases={[
                  'COLD MACERATION ACTIVE',
                  'AUTUMN EQUINOX COMPLETE',
                  'COPPER POTS AT 85°C',
                  'ZERO PECTIN ADDED'
                ]}
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={2400}
                cursorColor="var(--espresso)"
              />
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={heroLine1Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 8.5vw, 130px)',
                lineHeight: 0.94,
                margin: 0,
                color: 'var(--espresso)'
              }}
            >
              365 DAYS
            </h1>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={heroLine2Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 8vw, 120px)',
                lineHeight: 0.94,
                margin: '6px 0',
                color: 'var(--espresso)'
              }}
            >
              FOR A FEW
            </h1>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={heroLine3Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 8.5vw, 130px)',
                lineHeight: 0.94,
                margin: 0,
                color: 'var(--terracotta)'
              }}
            >
              PERFECT <em style={{ fontStyle: 'italic', color: 'var(--espresso)' }}>*mornings.*</em>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SEASON WHEEL — Circular SVG Calendar */}
      <section
        style={{
          backgroundColor: 'var(--espresso)',
          color: 'var(--chalk)',
          padding: 'clamp(80px, 14vh, 180px) clamp(20px, 5vw, 64px)',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto clamp(36px, 6vh, 64px)' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
            CIRCULAR ALMANAC // JANUARY TO DECEMBER
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: '0 0 16px 0'
            }}
          >
            The Biological Wheel.
          </h2>
          <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.85, fontSize: 'clamp(15px, 1.3vw, 18px)' }}>
            Select any month of the Mediterranean cycle to inspect the vegetative state of our orchards, ambient temperatures and handcraft activity.
          </p>
        </div>

        {/* Circular Wheel UI */}
        <div
          style={{
            maxWidth: '940px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(36px, 6vw, 80px)',
            alignItems: 'center'
          }}
          className="wheel-container-grid"
        >
          {/* Circular SVG Wheel */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto', aspectRatio: '1' }}>
            <svg ref={wheelSvgRef} viewBox="0 0 400 400" width="100%" height="100%" style={{ overflow: 'visible' }}>
              {/* Outer circle */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(241, 235, 221, 0.12)" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(211, 164, 59, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="200" r="75" fill="#172019" stroke="rgba(211, 164, 59, 0.4)" strokeWidth="1" />

              {/* Center Month Display */}
              <text x="200" y="195" textAnchor="middle" fill="#D3A43B" fontFamily="var(--font-display)" fontSize="32">
                {selectedMonth.month}
              </text>
              <text x="200" y="215" textAnchor="middle" fill="#FAF7F0" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">
                SOLAR CYCLE
              </text>

              {/* 12 Month Nodes */}
              {seasonalMonths.map((m, idx) => {
                const angle = (idx / 12) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 140;
                const y = 200 + Math.sin(angle) * 140;
                const isSelected = selectedMonth.month === m.month;

                return (
                  <g
                    key={m.month}
                    onClick={() => setSelectedMonth(m)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 18 : 12}
                      fill={isSelected ? '#A95337' : '#253126'}
                      stroke={isSelected ? '#D3A43B' : 'rgba(241, 235, 221, 0.3)'}
                      strokeWidth={isSelected ? 2.5 : 1}
                      style={{ transition: 'all 0.25s ease' }}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill="#FAF7F0"
                      fontFamily="var(--font-mono)"
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {m.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Month Details Display Card */}
          <div
            style={{
              backgroundColor: '#172019',
              border: '1px solid rgba(211, 164, 59, 0.25)',
              padding: 'clamp(24px, 4vw, 40px)',
              borderRadius: '2px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
                MONTH {selectedMonth.month} // BIOLOGICAL RHYTHM
              </span>
              <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '11px' }}>
                {selectedMonth.climate}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 40px)',
                lineHeight: 1.1,
                color: 'var(--chalk)',
                margin: '0 0 16px 0'
              }}
            >
              {selectedMonth.activity}
            </h3>

            <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.9, marginBottom: '24px' }}>
              {selectedMonth.details}
            </p>

            <div style={{ borderTop: '1px solid rgba(241, 235, 221, 0.12)', paddingTop: '16px' }}>
              <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '6px' }}>
                PROMINENT BOTANICALS
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--chalk)' }}>
                {selectedMonth.flora}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HARVEST CHAPTERS (6 Seasons) */}
      <section style={{ position: 'relative' }}>
        {harvestChapters.map((ch) => (
          <div
            key={ch.number}
            style={{
              backgroundColor: ch.colorBg,
              color: ch.textColor,
              minHeight: '85svh',
              display: 'flex',
              alignItems: 'center',
              padding: 'clamp(64px, 10vh, 120px) clamp(20px, 5vw, 64px)',
              borderBottom: '1px solid rgba(241, 235, 221, 0.08)'
            }}
          >
            <div
              style={{
                maxWidth: '1360px',
                margin: '0 auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: 'clamp(36px, 6vw, 96px)',
                alignItems: 'center'
              }}
              className="chapter-grid"
            >
              {/* Text Side */}
              <div>
                <span className="mono-micro" style={{ color: ch.accentColor, display: 'block', marginBottom: '14px' }}>
                  CHAPTER {ch.number} // {ch.period}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(38px, 6vw, 84px)',
                    lineHeight: 1,
                    margin: '0 0 10px 0'
                  }}
                >
                  {ch.title}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2.2vw, 28px)',
                    color: ch.accentColor,
                    display: 'block',
                    marginBottom: '20px'
                  }}
                >
                  {ch.subtitle}
                </span>

                <p className="type-body-lg" style={{ opacity: 0.9, lineHeight: 1.6, fontSize: 'clamp(16px, 1.5vw, 22px)' }}>
                  {ch.description}
                </p>
              </div>

              {/* Photo Side */}
              <div
                style={{
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 24px 50px rgba(0,0,0,0.35)'
                }}
                onMouseEnter={() => setCursor('view', ch.period)}
                onMouseLeave={resetCursor}
              >
                <ResponsiveImage
                  src={ch.image}
                  alt={ch.title}
                  fallbackType="citrus"
                  containerStyle={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. PROCESS SECTION — Vertical line filling with terracotta */}
      <section
        ref={processSectionRef}
        style={{
          backgroundColor: 'var(--forest-deep)',
          color: 'var(--chalk)',
          padding: 'clamp(80px, 14vh, 180px) clamp(20px, 5vw, 64px)',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto clamp(48px, 8vh, 80px)' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
            FROM SEED TO APOTHECARY FLACON
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: 0
            }}
          >
            The Seven Transformations.
          </h2>
        </div>

        {/* Vertical Line Timeline Container */}
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          {/* Background grey line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              backgroundColor: 'rgba(241, 235, 221, 0.12)'
            }}
          />

          {/* Filling Terracotta Line */}
          <div
            ref={processLineFillRef}
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              backgroundColor: 'var(--terracotta)',
              transformOrigin: 'top',
              willChange: 'transform'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 5vh, 56px)' }}>
            {processStages.map((st) => (
              <div
                key={st.step}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  position: 'relative'
                }}
              >
                {/* Node dot on the line */}
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--harvest)',
                    border: '3px solid var(--forest-deep)',
                    position: 'relative',
                    left: '18px',
                    top: '6px',
                    flexShrink: 0,
                    zIndex: 2
                  }}
                />

                <div style={{ paddingLeft: '20px' }}>
                  <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '4px' }}>
                    STAGE {st.step}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 28px)', margin: '0 0 8px 0', color: 'var(--chalk)' }}>
                    {st.title}
                  </h4>
                  <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.85, margin: 0, maxWidth: '52ch', fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMPACT / AGRICULTURE — Counters */}
      <section
        style={{
          backgroundColor: 'var(--terracotta)',
          color: 'var(--chalk)',
          padding: 'clamp(80px, 14vh, 160px) clamp(20px, 5vw, 64px)'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', marginBottom: '48px' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
            FACTS & SOIL REGENERATION
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: 0
            }}
          >
            The Land’s Vital Signs.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {agriculturalMetrics.map((met) => (
            <div
              key={met.label}
              style={{
                borderTop: '1px solid rgba(241, 235, 221, 0.25)',
                paddingTop: '20px'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(44px, 6vw, 86px)',
                  fontWeight: 600,
                  color: 'var(--harvest)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                {met.value}
              </span>
              <h4 className="mono-micro" style={{ color: 'var(--chalk)', letterSpacing: '0.14em', marginBottom: '8px' }}>
                {met.label}
              </h4>
              <p className="type-body-sm" style={{ color: 'var(--bone)', opacity: 0.9, margin: 0 }}>
                {met.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .wheel-container-grid,
          .chapter-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};
