import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { journalPosts } from '../../data/journal';
import type { JournalCategory, JournalPost } from '../../types';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { TypingText } from '../../components/typography/TypingText';
import { ArrowUpRight, Feather } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

const categories: ('ALL' | JournalCategory)[] = [
  'ALL',
  'LAND',
  'FOOD',
  'PEOPLE',
  'SEASONS',
  'CRAFT'
];

export const Journal: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | JournalCategory>('ALL');
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'JOURNAL // FIELD NOTES — VALE SELVATICO';
    setCurrentChapter('JOURNAL // FIELD NOTEBOOK');
    setActiveSectionNumber('06');
    window.scrollTo(0, 0);
  }, [setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    // 1. Featured card scroll reveal
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 2. Editorial grid cards staggered entrance
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.journal-card-item');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, [selectedCategory]);

  const featured = journalPosts[0];
  const otherPosts = journalPosts.filter((post) => {
    if (selectedCategory === 'ALL') return true;
    return post.category === selectedCategory;
  });

  return (
    <main style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. JOURNAL HERO */}
      <section
        ref={heroRef}
        style={{
          padding: 'clamp(120px, 16vh, 180px) clamp(24px, 5vw, 64px) clamp(40px, 5vh, 60px)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Feather size={14} color="var(--terracotta)" />
          <TypingText
            texts={[
              'ARCHIVAL NOTEBOOK // CONTRADA SELVATICO',
              'CHRONICLES OF SLOW BOTANICAL LIVING',
              'DISPATCHES DIRECT FROM SOIL & PRESS HOUSE',
              'OBSERVATIONS ON CITRUS, BARK & APOTHECARY'
            ]}
            speed={40}
            pauseDuration={2800}
            className="mono-micro"
            style={{ color: 'var(--terracotta)', letterSpacing: '0.2em' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 9vw, 140px)',
            lineHeight: 0.94,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0'
          }}
        >
          FIELD<br />
          <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>*notes.*</em>
        </h1>

        <p className="type-body-lg" style={{ color: 'var(--ink)', maxWidth: '48ch', opacity: 0.88, fontSize: 'clamp(16px, 1.8vw, 21px)' }}>
          Observations, recipes and seasonal dispatches recorded directly from the orchard terraces and stone cantina.
        </p>
      </section>

      {/* 2. FEATURED ARTICLE — Issue 014 Banner */}
      <section
        ref={featuredRef}
        style={{
          padding: '0 clamp(24px, 5vw, 64px) clamp(64px, 8vh, 100px)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <Link
          to={`/journal/${featured.slug}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          onMouseEnter={() => setCursor('read', 'READ')}
          onMouseLeave={resetCursor}
          className="featured-journal-card"
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              maxHeight: '620px',
              overflow: 'hidden',
              borderRadius: '2px',
              position: 'relative',
              marginBottom: '28px',
              boxShadow: '0 24px 48px rgba(29, 29, 25, 0.12)'
            }}
          >
            <ResponsiveImage
              src={featured.heroImage}
              alt={featured.title}
              style={{
                width: '100%',
                height: '100%',
                transition: 'transform 0.8s ease'
              }}
              className="featured-journal-img"
              aspectRatio="unset"
              objectFit="cover"
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                gap: '12px',
                zIndex: 2
              }}
            >
              <span className="mono-micro" style={{ backgroundColor: 'rgba(29,29,25,0.85)', color: 'var(--chalk)', padding: '4px 10px', borderRadius: '2px' }}>
                FEATURED // {featured.issue}
              </span>
              <span className="mono-micro" style={{ backgroundColor: 'var(--terracotta)', color: 'var(--chalk)', padding: '4px 10px', borderRadius: '2px' }}>
                {featured.category}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '32px',
              alignItems: 'baseline'
            }}
            className="featured-meta-grid"
          >
            <div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
                <span className="mono-micro" style={{ color: 'var(--terracotta)' }}>{featured.date}</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
                <span className="mono-micro" style={{ color: 'var(--sage)' }}>{featured.readTime}</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 64px)',
                  lineHeight: 1.05,
                  margin: 0,
                  transition: 'color 0.25s ease'
                }}
                className="featured-title-text"
              >
                {featured.title}
              </h2>
            </div>

            <div>
              <p className="type-body" style={{ opacity: 0.88, marginBottom: '16px', lineHeight: 1.6 }}>
                {featured.excerpt}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--forest)',
                  letterSpacing: '0.14em'
                }}
              >
                READ FIELD NOTE <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. CATEGORY FILTER */}
      <section
        style={{
          padding: '0 clamp(24px, 5vw, 64px)',
          maxWidth: '1440px',
          margin: '0 auto',
          borderTop: '1px solid rgba(29, 29, 25, 0.15)',
          borderBottom: '1px solid rgba(29, 29, 25, 0.15)',
          paddingTop: '20px',
          paddingBottom: '20px',
          marginBottom: '64px'
        }}
      >
        <div style={{ display: 'flex', gap: 'clamp(16px, 2.5vw, 32px)', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="mono-micro" style={{ color: 'var(--sage)', marginRight: '8px' }}>
            CATEGORIES:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  color: isSelected ? 'var(--terracotta)' : 'var(--ink)',
                  fontWeight: isSelected ? 600 : 400,
                  border: 'none',
                  background: 'none',
                  borderBottom: isSelected ? '2px solid var(--terracotta)' : '2px solid transparent',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. JOURNAL EDITORIAL MAGAZINE GRID */}
      <section
        style={{
          padding: '0 clamp(24px, 5vw, 64px) clamp(96px, 12vh, 160px)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'clamp(32px, 4.5vw, 64px)'
          }}
          className="journal-magazine-grid"
        >
          {otherPosts.map((post: JournalPost, index: number) => {
            const isPortrait = index % 2 === 1;

            return (
              <Link
                key={post.id}
                to={`/journal/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="journal-card-item"
                onMouseEnter={() => setCursor('read', 'READ')}
                onMouseLeave={resetCursor}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: isPortrait ? '3 / 4' : '16 / 11',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    position: 'relative',
                    marginBottom: '20px',
                    backgroundColor: '#D9D1C3'
                  }}
                >
                  <ResponsiveImage
                    src={post.heroImage}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.7s ease'
                    }}
                    className="journal-card-img"
                    aspectRatio="unset"
                    objectFit="cover"
                  />
                  <span
                    className="mono-micro"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(29, 29, 25, 0.85)',
                      color: 'var(--chalk)',
                      padding: '3px 8px',
                      fontSize: '9px',
                      borderRadius: '2px',
                      zIndex: 2
                    }}
                  >
                    {post.issue} // {post.category}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="mono-micro" style={{ color: 'var(--terracotta)', fontSize: '10px' }}>
                    {post.date}
                  </span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
                  <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px' }}>
                    {post.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.2vw, 32px)',
                    lineHeight: 1.15,
                    margin: '0 0 10px 0',
                    transition: 'font-style 0.25s ease'
                  }}
                  className="journal-card-title"
                >
                  {post.title}
                </h3>

                <p className="type-body-sm" style={{ opacity: 0.85, margin: '0 0 16px 0', lineClamp: 3 }}>
                  {post.excerpt}
                </p>

                <div style={{ borderTop: '1px solid rgba(29, 29, 25, 0.1)', paddingTop: '12px', marginTop: 'auto' }}>
                  <span className="mono-micro" style={{ color: 'var(--forest)', fontSize: '10px' }}>
                    BY {post.author.toUpperCase()} // {post.authorRole.toUpperCase()}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <style>{`
        .featured-journal-card:hover .featured-journal-img {
          transform: scale(1.025);
        }
        .featured-journal-card:hover .featured-title-text {
          font-style: italic;
          color: var(--terracotta);
        }
        .journal-card-item:hover .journal-card-img {
          transform: scale(1.04);
        }
        .journal-card-item:hover .journal-card-title {
          font-style: italic;
          color: var(--terracotta);
        }
        @media (max-width: 860px) {
          .featured-meta-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .journal-magazine-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};
