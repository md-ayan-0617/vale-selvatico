import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { experiences } from '../../data/experiences';
import type { ExperienceItem } from '../../types';
import { SplitTextReveal } from '../../components/typography/SplitTextReveal';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { TypingText } from '../../components/typography/TypingText';
import { ArrowUpRight, Check, Clock, Users, Calendar, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber, openBooking } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [isBookingHovered, setIsBookingHovered] = useState(false);
  const chaptersContainerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'EXPERIENCE // SUNSET HOSPITALITY — VALE SELVATICO';
    setCurrentChapter('EXPERIENCE // SUNSET HOSPITALITY');
    setActiveSectionNumber('05');
    window.scrollTo(0, 0);
  }, [setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    // 1. Hero background scrub parallax
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 16,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 2. ScrollTrigger to update active experience chapter as user scrolls through list
    const sections = gsap.utils.toArray<HTMLElement>('.experience-chapter-block');

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveExpIndex(i),
        onEnterBack: () => setActiveExpIndex(i)
      });

      // Subtle fade & slide in for each chapter's content
      gsap.fromTo(
        section.querySelectorAll('.chapter-anim-target'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 3. CTA background scrub
    if (ctaBgRef.current) {
      gsap.to(ctaBgRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: ctaBgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });

  const currentExp: ExperienceItem = experiences[activeExpIndex] || experiences[0];

  return (
    <main style={{ backgroundColor: 'var(--fig)', color: 'var(--bone)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. EXPERIENCE HERO — Sunset Dining Footage */}
      <section
        style={{
          minHeight: '100svh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(32px, 5vw, 64px)',
          overflow: 'hidden',
          color: 'var(--chalk)'
        }}
      >
        <div
          ref={heroBgRef}
          style={{
            position: 'absolute',
            inset: '-10%',
            width: '120%',
            height: '120%',
            zIndex: 1,
            willChange: 'transform'
          }}
        >
          <ResponsiveImage
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=88"
            alt="Sunset feast in the botanical grove"
            style={{ width: '100%', height: '100%' }}
            aspectRatio="unset"
            objectFit="cover"
          />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(99, 63, 75, 0.94) 0%, rgba(99, 63, 75, 0.4) 50%, rgba(23, 32, 25, 0.25) 100%)',
            zIndex: 2
          }}
        />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '960px', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={14} color="var(--harvest)" />
            <TypingText
              texts={[
                'SUNSET HOSPITALITY // CONTRADA SELVATICO',
                'LIMITED TO 12 GUESTS // PRIVATE CASALI',
                'AUTUMN FIELD RESIDENCY OPEN FOR BOOKING',
                'ORGANIC BOTANICAL TASTING & FORAGING'
              ]}
              speed={42}
              pauseDuration={2600}
              className="mono-micro"
              style={{ color: 'var(--harvest)' }}
            />
          </div>

          <SplitTextReveal as="h1" className="type-hero" style={{ color: 'var(--chalk)', marginBottom: '24px' }}>
            COME SPEND THE *DAY.*
          </SplitTextReveal>

          <p className="type-body-lg" style={{ color: 'var(--paper)', opacity: 0.95, maxWidth: '44ch', fontSize: 'clamp(16px, 1.8vw, 22px)' }}>
            Walk the grove. Taste the harvest. Stay for supper. We open our stone casali to guests who appreciate patience, botanical foraging and the warmth of a fire.
          </p>
        </div>
      </section>

      {/* 2. PINNED EXPERIENCE CHAPTERS (60% Pinned Image on Desktop, Inline Magazine Cards on Mobile) */}
      <section
        ref={chaptersContainerRef}
        style={{
          position: 'relative',
          backgroundColor: '#4E2F3B',
          color: 'var(--bone)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            minHeight: '100vh'
          }}
          className="experience-split-container"
        >
          {/* LEFT: Pinned 60% Width Image (Desktop Only) */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              overflow: 'hidden',
              backgroundColor: '#351F27'
            }}
            className="experience-pinned-image-col"
          >
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: activeExpIndex === idx ? 1 : 0,
                  transition: 'opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1), transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: activeExpIndex === idx ? 'scale(1)' : 'scale(1.05)',
                  pointerEvents: activeExpIndex === idx ? 'auto' : 'none'
                }}
              >
                <ResponsiveImage
                  src={exp.imageSunset}
                  alt={exp.title}
                  style={{ width: '100%', height: '100%' }}
                  aspectRatio="unset"
                  objectFit="cover"
                />
              </div>
            ))}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(78, 47, 59, 0.85) 0%, transparent 60%)',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '36px',
                left: '36px',
                right: '36px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                zIndex: 4
              }}
            >
              <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
                EXPERIENCE {currentExp.number} // 04
              </span>
              <span className="mono-micro" style={{ color: 'var(--chalk)', fontSize: '13px' }}>
                {currentExp.pricePerPerson}
              </span>
            </div>
          </div>

          {/* RIGHT: Scrolling Details */}
          <div style={{ padding: '0 clamp(24px, 4vw, 56px)' }} className="experience-scroll-col">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="experience-chapter-block"
                style={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 'clamp(48px, 8vh, 120px) 0'
                }}
              >
                {/* Mobile-only inline photography */}
                <div className="experience-mobile-photo-preview" style={{ display: 'none', marginBottom: '24px', width: '100%' }}>
                  <div style={{ width: '100%', aspectRatio: '16 / 10', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }}>
                    <ResponsiveImage
                      src={exp.imageSunset}
                      alt={exp.title}
                      style={{ width: '100%', height: '100%' }}
                      aspectRatio="unset"
                      objectFit="cover"
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span className="mono-micro" style={{ color: 'var(--harvest)', fontSize: '10px' }}>
                      EXP {exp.number} // {exp.season}
                    </span>
                    <span className="mono-micro" style={{ color: 'var(--chalk)', fontSize: '10px' }}>
                      {exp.pricePerPerson}
                    </span>
                  </div>
                </div>

                <span className="mono-micro chapter-anim-target" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
                  EXPERIENCE {exp.number}
                </span>

                <h2
                  className="chapter-anim-target"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 4.5vw, 68px)',
                    lineHeight: 1.05,
                    margin: '0 0 8px 0',
                    color: 'var(--chalk)'
                  }}
                >
                  {exp.title}
                </h2>

                <p
                  className="chapter-anim-target"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    color: 'var(--harvest)',
                    margin: '0 0 24px 0'
                  }}
                >
                  {exp.subtitle}
                </p>

                {/* Metadata badges */}
                <div className="chapter-anim-target" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--paper)' }}>
                    <Clock size={16} color="var(--harvest)" />
                    <span className="mono-micro" style={{ fontSize: '11px' }}>{exp.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--paper)' }}>
                    <Calendar size={16} color="var(--harvest)" />
                    <span className="mono-micro" style={{ fontSize: '11px' }}>{exp.season}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--paper)' }}>
                    <Users size={16} color="var(--harvest)" />
                    <span className="mono-micro" style={{ fontSize: '11px' }}>{exp.groupSize}</span>
                  </div>
                </div>

                <p className="type-body chapter-anim-target" style={{ color: 'var(--paper)', opacity: 0.9, lineHeight: 1.65, marginBottom: '28px' }}>
                  {exp.description}
                </p>

                {/* Included list */}
                <div className="chapter-anim-target" style={{ borderTop: '1px solid rgba(241, 235, 221, 0.15)', paddingTop: '20px', marginBottom: '36px' }}>
                  <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
                    WHAT IS INCLUDED
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
                    {exp.included.map((inc) => (
                      <li key={inc} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', fontSize: '14px', color: 'var(--bone)', lineHeight: 1.45 }}>
                        <Check size={14} color="var(--terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="chapter-anim-target"
                  onClick={() => openBooking(exp.title)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    backgroundColor: 'var(--terracotta)',
                    color: 'var(--chalk)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'opacity 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                >
                  <span>REQUEST RESERVATION</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BOOKING CTA — Choose A Day with Sunset to Night Crossfade */}
      <section
        style={{
          position: 'relative',
          minHeight: '85svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(64px, 8vh, 120px) 24px',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setCursor('hover')}
        onMouseLeave={resetCursor}
      >
        {/* Background images with parallax */}
        <div
          ref={ctaBgRef}
          style={{
            position: 'absolute',
            inset: '-10%',
            width: '120%',
            height: '120%',
            zIndex: 1,
            willChange: 'transform'
          }}
        >
          {/* Sunset Background */}
          <ResponsiveImage
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=88"
            alt="Sunset Valley"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            aspectRatio="unset"
            objectFit="cover"
          />

          {/* Night Dinner Background on Hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isBookingHovered ? 1 : 0,
              transition: 'opacity 0.8s ease'
            }}
          >
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=88"
              alt="Night dinner"
              style={{ width: '100%', height: '100%' }}
              aspectRatio="unset"
              objectFit="cover"
            />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(23, 32, 25, 0.74)',
            zIndex: 2
          }}
        />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '780px', width: '100%', color: 'var(--chalk)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--harvest)'
              }}
            />
            <TypingText
              texts={[
                'PRIVATE & COMMUNAL VISITS',
                'INTIMATE RESIDENCIES // LIMITED SEATING',
                'SUSTAINABLE HARVEST DINING',
                'EXPERIENCE THE MEDITERRANEAN HARVEST'
              ]}
              speed={45}
              pauseDuration={2700}
              className="mono-micro"
              style={{ color: 'var(--harvest)', letterSpacing: '0.22em' }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 9vw, 130px)',
              lineHeight: 0.96,
              letterSpacing: '-0.02em',
              margin: '0 0 24px 0'
            }}
          >
            CHOOSE<br />
            A <em style={{ fontStyle: 'italic', color: 'var(--harvest)' }}>*day.*</em>
          </h2>

          <p className="type-body-lg" style={{ color: 'var(--bone)', marginBottom: '36px', opacity: 0.95, fontSize: 'clamp(16px, 1.8vw, 21px)' }}>
            Because our estate functions organically, visits are strictly capped to ensure quietude and intimate conversation.
          </p>

          <button
            onClick={() => openBooking()}
            onMouseEnter={() => setIsBookingHovered(true)}
            onMouseLeave={() => setIsBookingHovered(false)}
            style={{
              padding: '18px 40px',
              backgroundColor: 'var(--terracotta)',
              color: 'var(--chalk)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <span>REQUEST A VISIT</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .experience-split-container {
            grid-template-columns: 1fr !important;
          }
          .experience-pinned-image-col {
            display: none !important;
          }
          .experience-mobile-photo-preview {
            display: block !important;
          }
          .experience-chapter-block {
            min-height: auto !important;
            padding: 40px 0 60px !important;
            border-bottom: 1px solid rgba(241, 235, 221, 0.12);
          }
        }
      `}</style>
    </main>
  );
};
