import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { journalPosts } from '../../data/journal';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { TypingText } from '../../components/typography/TypingText';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';

gsap.registerPlugin(ScrollTrigger);

export const JournalArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const [readProgress, setReadProgress] = useState(0);

  const heroImgWrapRef = useRef<HTMLDivElement>(null);
  const articleContentRef = useRef<HTMLElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  const post = journalPosts.find((p) => p.slug === slug) || journalPosts[0];
  const currentIndex = journalPosts.findIndex((p) => p.slug === slug);
  const nextPost = journalPosts[(currentIndex + 1) % journalPosts.length];

  useEffect(() => {
    document.title = `${post.title} — JOURNAL // VALE SELVATICO`;
    setCurrentChapter(`JOURNAL // ${post.issue}`);
    setActiveSectionNumber('06');
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min(window.scrollY / docHeight, 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    // 1. Hero image scrub parallax
    if (heroImgWrapRef.current) {
      gsap.fromTo(
        heroImgWrapRef.current.querySelector('img'),
        { scale: 1.08, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // 2. Animate pullquote on enter
    const pullQuotes = articleContentRef.current?.querySelectorAll('blockquote');
    if (pullQuotes && pullQuotes.length > 0) {
      pullQuotes.forEach((quote) => {
        gsap.fromTo(
          quote,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quote,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, [post]);

  return (
    <main style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Mobile Top Reading Progress Line */}
      <div
        className="reading-progress-top"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${readProgress * 100}%`,
          height: '3px',
          backgroundColor: 'var(--terracotta)',
          zIndex: 1000,
          transition: 'width 0.1s linear'
        }}
      />

      {/* Sticky Reading Progress on Desktop Left Side */}
      <div
        style={{
          position: 'fixed',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
        className="reading-progress-left"
      >
        <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '9px' }}>
          READ
        </span>
        <div style={{ width: '1px', height: '80px', backgroundColor: 'rgba(29, 29, 25, 0.15)', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${readProgress * 100}%`,
              backgroundColor: 'var(--terracotta)',
              transition: 'height 0.1s linear'
            }}
          />
        </div>
        <span className="mono-micro" style={{ color: 'var(--terracotta)', fontSize: '10px' }}>
          {Math.floor(readProgress * 100)}%
        </span>
      </div>

      {/* Top Breadcrumb */}
      <div
        style={{
          padding: 'clamp(100px, 14vh, 140px) clamp(24px, 5vw, 64px) 24px',
          maxWidth: '960px',
          margin: '0 auto'
        }}
      >
        <Link
          to="/journal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--forest)',
            textDecoration: 'none',
            padding: '6px 12px',
            border: '1px solid rgba(29, 29, 25, 0.15)',
            borderRadius: '2px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft size={14} />
          <span>RETURN TO FIELD JOURNAL</span>
        </Link>
      </div>

      {/* Article Header */}
      <header
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px) clamp(40px, 6vh, 64px)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <BookOpen size={14} color="var(--terracotta)" />
          <TypingText
            texts={[
              'CERTIFIED ESTATE ARCHIVE // CONTRADA SELVATICO',
              'ORIGINAL BOTANICAL FIELD DISPATCH',
              'RECORDED IN THE ORCHARD NOTEBOOK',
              'HARVEST NOTES & SENSORY CHRONICLES'
            ]}
            speed={40}
            pauseDuration={2800}
            className="mono-micro"
            style={{ color: 'var(--terracotta)', letterSpacing: '0.18em' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className="mono-micro" style={{ color: 'var(--terracotta)' }}>{post.issue}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
          <span className="mono-micro" style={{ color: 'var(--sage)' }}>{post.category}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
          <span className="mono-micro" style={{ color: 'var(--ink)' }}>{post.date}</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6.2vw, 84px)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            margin: '0 0 24px 0',
            color: 'var(--ink)'
          }}
        >
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(29, 29, 25, 0.15)', paddingTop: '20px', flexWrap: 'wrap' }}>
          <span className="mono-micro" style={{ color: 'var(--forest)' }}>
            RECORDED BY: {post.author.toUpperCase()} ({post.authorRole.toUpperCase()})
          </span>
          <span className="mono-micro" style={{ marginLeft: 'auto', color: 'var(--sage)' }}>
            EST. READ TIME: {post.readTime}
          </span>
        </div>
      </header>

      {/* Hero Photography with Azeret Mono Caption */}
      <div ref={heroImgWrapRef} style={{ maxWidth: '1200px', margin: '0 auto 64px', padding: '0 clamp(24px, 5vw, 64px)' }}>
        <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: '2px', marginBottom: '14px', boxShadow: '0 20px 45px rgba(29, 29, 25, 0.1)' }}>
          <ResponsiveImage
            src={post.heroImage}
            alt={post.title}
            style={{ width: '100%', height: '100%' }}
            aspectRatio="unset"
            objectFit="cover"
          />
        </div>
        <p className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px', textAlign: 'right' }}>
          FIG. 01 // CONTRADA SELVATICO ORCHARD CANOPY AT FIRST LIGHT
        </p>
      </div>

      {/* Article Body Content & Pull Quotes */}
      <article
        ref={articleContentRef}
        style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 48px) clamp(80px, 12vh, 140px)',
          fontFamily: 'var(--font-sans)',
          color: 'var(--ink)'
        }}
      >
        <p
          className="type-body-lg"
          style={{
            fontWeight: 500,
            lineHeight: 1.6,
            marginBottom: '36px',
            color: 'var(--forest)',
            fontSize: 'clamp(18px, 2vw, 22px)'
          }}
        >
          {post.excerpt}
        </p>

        {post.content.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p
              className="type-body"
              style={{
                lineHeight: 1.85,
                marginBottom: '28px',
                opacity: 0.92,
                fontSize: 'clamp(16px, 1.4vw, 18px)'
              }}
            >
              {paragraph}
            </p>

            {/* Injected Pull Quote after second paragraph */}
            {index === 1 && post.pullQuote && (
              <blockquote
                style={{
                  margin: '48px 0',
                  padding: '24px 0 24px 28px',
                  borderLeft: '2px solid var(--terracotta)',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  lineHeight: 1.25,
                  color: 'var(--forest)'
                }}
              >
                “{post.pullQuote}”
              </blockquote>
            )}
          </React.Fragment>
        ))}

        {/* Secondary Image if available */}
        {post.secondaryImage && (
          <div style={{ margin: '56px 0 36px' }}>
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: '2px', marginBottom: '12px', boxShadow: '0 16px 36px rgba(29, 29, 25, 0.08)' }}>
              <ResponsiveImage
                src={post.secondaryImage}
                alt="Secondary field note documentation"
                style={{ width: '100%', height: '100%' }}
                aspectRatio="unset"
                objectFit="cover"
              />
            </div>
            <p className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px', textAlign: 'right' }}>
              FIG. 02 // SELECTION BASKETS AND MACERATION EMBERS
            </p>
          </div>
        )}
      </article>

      {/* NEXT FIELD NOTE FOOTER */}
      <section
        ref={nextSectionRef}
        style={{
          backgroundColor: 'var(--forest-deep)',
          color: 'var(--chalk)',
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 5vw, 64px)',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => navigate(`/journal/${nextPost.slug}`)}
        onMouseEnter={() => setCursor('read', 'NEXT')}
        onMouseLeave={resetCursor}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '12px' }}>
              NEXT FIELD NOTE →
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.8vw, 64px)',
                lineHeight: 1.05,
                margin: 0,
                color: 'var(--chalk)'
              }}
            >
              {nextPost.title}
            </h3>
            <span className="mono-micro" style={{ color: 'var(--sage)', marginTop: '8px', display: 'block' }}>
              {nextPost.issue} // {nextPost.readTime}
            </span>
          </div>

          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: '1px solid var(--harvest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--harvest)',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
          >
            <ArrowRight size={20} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .reading-progress-left {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .reading-progress-top {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
};
