import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { journalPosts } from '../../../data/journal';
import { useCursor } from '../../../context/CursorContext';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';
import { TypingText } from '../../../components/typography/TypingText';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const JournalPreviewSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const articles = journalPosts.slice(0, 3);

  useGSAPContext(() => {
    if (gridRef.current && sectionRef.current) {
      const items = gridRef.current.querySelectorAll('.journal-anim-card');
      gsap.fromTo(
        items,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          borderBottom: '1px solid rgba(29, 29, 25, 0.15)',
          paddingBottom: '32px',
          marginBottom: 'clamp(48px, 8vh, 80px)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <BookOpen size={14} color="var(--terracotta)" />
            <TypingText
              texts={[
                'FIELD DISPATCHES // BOTANICAL ARCHIVE',
                'DISPATCH NO. 14 ON HERBAL STEAM',
                'OBSERVATIONS ON CITRUS, BARK & SOIL',
                'WEEKLY CHRONICLES FROM CONTRADA SELVATICO'
              ]}
              speed={42}
              pauseDuration={2800}
              className="mono-micro"
              style={{ color: 'var(--terracotta)' }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 6vw, 92px)',
              lineHeight: 1,
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            NOTES<br />
            FROM THE *FIELD.*
          </h2>
        </div>

        <Link
          to="/journal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.14em',
            color: 'var(--forest)',
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid rgba(29, 29, 25, 0.2)',
            borderRadius: '2px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
        >
          <span>OPEN FULL JOURNAL</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Editorial Composition: Article 1 (60% landscape) and Articles 2/3 (narrow vertical) */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'flex-start'
        }}
        className="journal-editorial-grid"
      >
        {/* Article 1: Large Spanning Composition */}
        {articles[0] && (
          <Link
            to={`/journal/${articles[0].slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
            className="journal-lead-link journal-anim-card"
            onMouseEnter={() => setCursor('read', 'READ')}
            onMouseLeave={resetCursor}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                overflow: 'hidden',
                borderRadius: '2px',
                position: 'relative',
                marginBottom: '24px'
              }}
            >
              <ResponsiveImage
                src={articles[0].heroImage}
                alt={articles[0].title}
                style={{
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)'
                }}
                className="journal-lead-img"
                aspectRatio="unset"
                objectFit="cover"
              />
              <span
                className="mono-micro"
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(29, 29, 25, 0.85)',
                  color: 'var(--chalk)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  zIndex: 2
                }}
              >
                {articles[0].issue} // {articles[0].category}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
              <span className="mono-micro" style={{ color: 'var(--terracotta)' }}>{articles[0].date}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
              <span className="mono-micro" style={{ color: 'var(--sage)' }}>{articles[0].readTime}</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.2vw, 44px)',
                lineHeight: 1.15,
                margin: '0 0 14px 0',
                transition: 'font-style 0.3s ease, color 0.3s ease'
              }}
              className="journal-lead-title"
            >
              {articles[0].title}
            </h3>

            <p className="type-body" style={{ opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
              {articles[0].excerpt}
            </p>
          </Link>
        )}

        {/* Column for Article 2 and 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 6vh, 60px)' }}>
          {articles.slice(1, 3).map((post) => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '24px',
                alignItems: 'center',
                borderBottom: '1px solid rgba(29, 29, 25, 0.1)',
                paddingBottom: '28px'
              }}
              className="journal-secondary-link journal-anim-card"
              onMouseEnter={() => setCursor('read', 'READ')}
              onMouseLeave={resetCursor}
            >
              <div
                style={{
                  width: '120px',
                  height: '140px',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  flexShrink: 0
                }}
                className="journal-sec-img-wrap"
              >
                <ResponsiveImage
                  src={post.heroImage}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s ease'
                  }}
                  className="journal-sec-img"
                  aspectRatio="unset"
                  objectFit="cover"
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="mono-micro" style={{ color: 'var(--terracotta)', fontSize: '10px' }}>
                    {post.date}
                  </span>
                  <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px' }}>
                    // {post.category}
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                    transition: 'font-style 0.3s ease'
                  }}
                  className="journal-sec-title"
                >
                  {post.title}
                </h4>

                <p className="type-body-sm" style={{ opacity: 0.8, margin: 0, lineClamp: 2 }}>
                  {post.excerpt.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .journal-lead-link:hover .journal-lead-img {
          transform: scale(1.035);
        }
        .journal-lead-link:hover .journal-lead-title {
          font-style: italic;
          color: var(--terracotta);
        }
        .journal-secondary-link:hover .journal-sec-img {
          transform: scale(1.05);
        }
        .journal-secondary-link:hover .journal-sec-title {
          font-style: italic;
          color: var(--terracotta);
        }
        @media (max-width: 860px) {
          .journal-editorial-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .journal-secondary-link {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .journal-sec-img-wrap {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
};
