import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { timelineItems, estatePeople, estateValues } from '../../data/estate';
import { SplitTextReveal } from '../../components/typography/SplitTextReveal';
import { ImageReveal } from '../../components/media/ImageReveal';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { TypingText } from '../../components/typography/TypingText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const Estate: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const heroImageRef = useRef<HTMLImageElement>(null);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'ESTATE // HERITAGE IN MOTION — VALE SELVATICO';
    setCurrentChapter('ESTATE // HERITAGE IN MOTION');
    setActiveSectionNumber('02');
  }, [setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    if (heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { filter: 'grayscale(100%) brightness(0.9)', scale: 1.05 },
        {
          filter: 'grayscale(0%) brightness(1)',
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Generational timeline cards staggered reveal
    const cards = gsap.utils.toArray<HTMLElement>('.timeline-card-item');
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-container-grid',
          start: 'top 75%'
        }
      }
    );
  });

  return (
    <main style={{ backgroundColor: 'var(--forest)', color: 'var(--bone)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. ESTATE HERO — Split composition */}
      <section
        style={{
          padding: 'clamp(120px, 16vh, 180px) clamp(20px, 5vw, 64px) clamp(64px, 10vh, 120px)',
          minHeight: '90svh',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 'clamp(36px, 6vw, 96px)',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
        className="estate-hero-grid"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
              HERITAGE // CHAPTER 01
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
            <span className="mono-micro" style={{ color: 'var(--sage)' }}>
              <TypingText
                phrases={[
                  'PLANTED 1958 BY GUISSEPPE',
                  'FARMED WITHOUT DRILLING',
                  'THE ROOTS GO DEEP',
                  'HERITAGE IN MOTION'
                ]}
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={2400}
                cursorColor="var(--harvest)"
              />
            </span>
          </div>

          <SplitTextReveal as="h1" className="type-hero" style={{ color: 'var(--chalk)', marginBottom: '24px' }}>
            THIS LAND REMEMBERS.
          </SplitTextReveal>

          <p className="type-body-lg" style={{ color: 'var(--bone)', opacity: 0.9, maxWidth: '44ch', fontSize: 'clamp(16px, 1.6vw, 24px)' }}>
            A family estate shaped since 1958 by wind, limestone terraces and the quiet refusal to accelerate what nature takes months to ripen.
          </p>
        </div>

        <div>
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '3 / 4.2',
              overflow: 'hidden',
              borderRadius: '2px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              position: 'relative'
            }}
            onMouseEnter={() => setCursor('view', 'FARMHOUSE')}
            onMouseLeave={resetCursor}
          >
            <img
              ref={heroImageRef}
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
              alt="Historic 1958 stone farmhouse at Vale Selvatico"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              <span className="mono-micro" style={{ fontSize: '10px' }}>CASALE DI PIETRA // 1958</span>
              <span className="mono-micro" style={{ fontSize: '10px', color: 'var(--harvest)' }}>ARCHIVE #01</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN STORY — Editorial Drop-Cap */}
      <section
        style={{
          backgroundColor: 'var(--bone)',
          color: 'var(--forest)',
          padding: 'clamp(64px, 12vh, 160px) clamp(20px, 5vw, 64px)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'clamp(36px, 6vw, 96px)',
            alignItems: 'center'
          }}
          className="estate-story-grid"
        >
          <div>
            <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '20px' }}>
              THE ORIGIN // ARCHIVAL RECORD
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 68px)',
                lineHeight: 1.05,
                marginBottom: '28px'
              }}
            >
              Before the estate had a name, it was bare limestone and wild rosemary.
            </h2>

            <div style={{ position: 'relative' }}>
              {/* Drop-cap I */}
              <span
                style={{
                  float: 'left',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(68px, 8vw, 110px)',
                  lineHeight: '0.8',
                  paddingTop: '6px',
                  paddingRight: '18px',
                  color: 'var(--terracotta)'
                }}
              >
                I
              </span>
              <p
                className="type-body"
                style={{
                  maxWidth: '52ch',
                  lineHeight: 1.75,
                  marginBottom: '20px',
                  color: 'var(--forest)',
                  opacity: 0.92
                }}
              >
                t began in the autumn of 1958 when Giuseppe Selvatico acquired twenty hectares of steep, neglected southern slope. The soil was so stony that neighbors cautioned him against planting vines or trees. But Giuseppe understood Mediterranean hydrology: dry-stone terraces retain dew, and fractured limestone forces taproots to journey deep into hidden water tables.
              </p>
              <p
                className="type-body"
                style={{
                  maxWidth: '52ch',
                  lineHeight: 1.75,
                  color: 'var(--forest)',
                  opacity: 0.92
                }}
              >
                Sixty-eight years later, those same forty heirloom fig trees and wild bergamot terraces still stand. The methods have never yielded to industrial pressure. We harvest by hand, simmer in copper cauldrons over pruned olive clippings, and let the sun do the heavy lifting.
              </p>
            </div>
          </div>

          <div>
            <ImageReveal
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85"
              alt="Archival estate landscape"
              pattern="clip-inset"
              aspectRatio="4 / 5"
              cursorText="ARCHIVE"
              style={{ borderRadius: '2px', boxShadow: '0 24px 48px rgba(37,49,38,0.14)' }}
            />
          </div>
        </div>
      </section>

      {/* 3. GENERATIONAL TIMELINE (1958 - 2026) */}
      <section
        style={{
          backgroundColor: 'var(--forest-deep)',
          color: 'var(--bone)',
          padding: 'clamp(80px, 14vh, 180px) clamp(20px, 5vw, 64px)'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', marginBottom: '48px' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
            CHRONOLOGY // FIVE GENERATIONS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: 0
            }}
          >
            A Lineage of Patience.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
          className="timeline-container-grid"
        >
          {timelineItems.map((item) => (
            <div
              key={item.year}
              className="timeline-card-item"
              style={{
                backgroundColor: 'rgba(37, 49, 38, 0.45)',
                border: '1px solid rgba(241, 235, 221, 0.1)',
                padding: 'clamp(20px, 3vw, 32px)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '420px',
                transition: 'transform 0.4s ease, border-color 0.4s ease'
              }}
              onMouseEnter={() => setCursor('view', item.year)}
              onMouseLeave={resetCursor}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(44px, 5vw, 68px)',
                    color: 'var(--harvest)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '14px'
                  }}
                >
                  {item.year}
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '12px', color: 'var(--chalk)' }}>
                  {item.title}
                </h4>
                <p className="type-body-sm" style={{ color: 'var(--paper)', opacity: 0.85, lineHeight: 1.6 }}>
                  {item.story}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(241, 235, 221, 0.15)',
                  paddingTop: '16px',
                  marginTop: '20px'
                }}
              >
                <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px', display: 'block', marginBottom: '4px' }}>
                  KEY ARTEFACT
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--bone)', fontWeight: 500 }}>
                  {item.artefact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR PEOPLE — Contact sheet annotations & handwritten quotes */}
      <section
        style={{
          backgroundColor: 'var(--paper)',
          color: 'var(--forest)',
          padding: 'clamp(80px, 14vh, 180px) clamp(20px, 5vw, 64px)'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', marginBottom: '48px' }}>
          <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '12px' }}>
            THE KEEPERS // NOT HEADSHOTS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: 0
            }}
          >
            Hands in the Soil.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {estatePeople.map((person) => (
            <div
              key={person.name}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="person-card"
              onMouseEnter={() => setCursor('discover', 'WORDS')}
              onMouseLeave={resetCursor}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  position: 'relative',
                  marginBottom: '18px',
                  backgroundColor: '#D9D1C3'
                }}
              >
                <ResponsiveImage
                  src={person.photo}
                  alt={person.name}
                  fallbackType="estate"
                  className="person-photo"
                  style={{
                    filter: 'sepia(12%) contrast(95%)',
                    transition: 'transform 0.8s ease'
                  }}
                  containerStyle={{ width: '100%', height: '100%' }}
                />

                {/* Contact sheet annotation badge */}
                <span
                  className="mono-micro"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(29, 29, 25, 0.82)',
                    color: 'var(--chalk)',
                    padding: '3px 8px',
                    fontSize: '9px',
                    borderRadius: '2px',
                    zIndex: 2
                  }}
                >
                  {person.contactNote}
                </span>

                {/* Handwritten-style quote overlay on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(37, 49, 38, 0.92)',
                    color: 'var(--chalk)',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 3
                  }}
                  className="quote-overlay"
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      lineHeight: 1.35,
                      margin: 0,
                      color: 'var(--harvest)'
                    }}
                  >
                    “{person.quote}”
                  </p>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 4px 0' }}>
                  {person.name}
                </h4>
                <span className="mono-micro" style={{ color: 'var(--terracotta)', fontSize: '11px' }}>
                  {person.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .person-card:hover .person-photo {
            transform: scale(1.04);
          }
          .person-card:hover .quote-overlay {
            opacity: 1 !important;
          }
        `}</style>
      </section>

      {/* 5. VALUES — Four Full-Width Expanding Text Rows */}
      <section
        style={{
          backgroundColor: 'var(--forest)',
          color: 'var(--bone)',
          padding: 'clamp(80px, 14vh, 160px) 0'
        }}
      >
        <div style={{ padding: '0 clamp(20px, 5vw, 64px)', marginBottom: '40px' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
            PRINCIPLES // CONVICTIONS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              lineHeight: 1,
              margin: 0
            }}
          >
            The Laws of the Grove.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {estateValues.map((val, idx) => {
            const isActive = activeValueIndex === idx;

            return (
              <div
                key={val.number}
                onMouseEnter={() => {
                  setActiveValueIndex(idx);
                  setCursor('hover');
                }}
                onMouseLeave={() => {
                  setActiveValueIndex(null);
                  resetCursor();
                }}
                onClick={() => setActiveValueIndex(isActive ? null : idx)}
                style={{
                  borderTop: '1px solid rgba(241, 235, 221, 0.15)',
                  borderBottom: idx === estateValues.length - 1 ? '1px solid rgba(241, 235, 221, 0.15)' : 'none',
                  padding: isActive ? 'clamp(28px, 4vh, 48px) clamp(20px, 5vw, 64px)' : 'clamp(20px, 3vh, 32px) clamp(20px, 5vw, 64px)',
                  transition: 'padding 0.35s ease, background-color 0.35s ease',
                  backgroundColor: isActive ? 'rgba(23, 32, 25, 0.9)' : 'transparent',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                    <span className="mono-micro" style={{ color: 'var(--harvest)', fontSize: '13px' }}>
                      {val.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(30px, 5vw, 64px)',
                        margin: 0,
                        color: isActive ? 'var(--harvest)' : 'var(--bone)',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {val.title}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(16px, 1.8vw, 22px)',
                      color: 'var(--sage)'
                    }}
                  >
                    {val.subtitle}
                  </span>
                </div>

                {isActive && (
                  <div
                    style={{
                      marginTop: '20px',
                      maxWidth: '64ch',
                      animation: 'fadeIn 0.3s ease',
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 0.8fr',
                      gap: '24px',
                      alignItems: 'center'
                    }}
                    className="val-expanded"
                  >
                    <p className="type-body" style={{ color: 'var(--paper)', margin: 0, opacity: 0.9 }}>
                      {val.description}
                    </p>
                    <div style={{ height: '140px', overflow: 'hidden', borderRadius: '2px' }}>
                      <ResponsiveImage src={val.image} alt={val.title} fallbackType="estate" containerStyle={{ width: '100%', height: '100%' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. ESTATE CLOSING — Immersive Drone Landscape Quote */}
      <section
        style={{
          position: 'relative',
          minHeight: '80svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(64px, 8vw, 120px) 20px',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setCursor('view', 'VALLEY')}
        onMouseLeave={resetCursor}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88"
          alt="Atmospheric Mediterranean estate hills"
          fallbackType="estate"
          containerStyle={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(23, 32, 25, 0.72)',
            zIndex: 2
          }}
        />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '820px' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(32px, 5.5vw, 76px)',
              lineHeight: 1.15,
              color: 'var(--bone)',
              marginBottom: '28px'
            }}
          >
            “The estate is not ours.<br />
            We&apos;re simply looking after it.”
          </p>

          <span className="mono-micro" style={{ color: 'var(--harvest)', letterSpacing: '0.22em' }}>
            BEATRICE & MATTEO SELVATICO // 2026
          </span>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .estate-hero-grid,
          .estate-story-grid {
            grid-template-columns: 1fr !important;
          }
          .val-expanded {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};
