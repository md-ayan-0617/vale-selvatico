import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from './MagneticButton';

export const Header: React.FC = () => {
  const { currentChapter, setIsMenuOpen } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect background luminosity at top
      if (location.pathname === '/contact' || location.pathname === '/harvest') {
        setIsDarkSection(false);
      } else {
        setIsDarkSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const textColor = isDarkSection ? 'var(--bone)' : 'var(--forest)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: 'clamp(20px, 3vh, 32px) clamp(24px, 4vw, 56px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'padding 0.3s ease, background-color 0.4s ease, backdrop-filter 0.4s ease',
        backgroundColor: isScrolled ? 'rgba(241, 235, 221, 0.72)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none'
      }}
    >
      {/* LEFT: Wordmark */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          textDecoration: 'none',
          color: textColor,
          userSelect: 'none'
        }}
        onMouseEnter={() => setCursor('hover')}
        onMouseLeave={resetCursor}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 2.2vw, 32px)',
            fontStyle: 'italic',
            lineHeight: 1,
            color: 'inherit'
          }}
        >
          Vale
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(11px, 0.9vw, 13px)',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'inherit'
          }}
        >
          SELVATICO
        </span>
      </Link>

      {/* CENTER: Contextual Chapter / Tagline (Hidden on mobile) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        className="header-chapter-center"
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--terracotta)'
          }}
        />
        <span
          className="mono-micro"
          style={{
            color: textColor,
            letterSpacing: '0.18em',
            opacity: 0.85
          }}
        >
          {currentChapter}
        </span>
      </div>

      {/* RIGHT: Menu Trigger with Magnetic interaction */}
      <MagneticButton strength={10} cursorVariant="hover">
        <button
          onClick={() => setIsMenuOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: textColor,
            padding: '8px 16px',
            background: 'none',
            border: `1px solid rgba(37, 49, 38, 0.18)`,
            borderRadius: '2px',
            transition: 'border-color 0.25s ease, background-color 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--terracotta)';
            e.currentTarget.style.backgroundColor = 'rgba(169, 83, 55, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(37, 49, 38, 0.18)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Open full-screen navigation menu"
        >
          <span
            className="mono-micro"
            style={{
              letterSpacing: '0.16em',
              fontSize: '11px',
              fontWeight: 500
            }}
          >
            MENU
          </span>

          {/* Animated Menu Lines Symbol */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              width: '16px',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                width: '16px',
                height: '1.5px',
                backgroundColor: textColor,
                display: 'block'
              }}
            />
            <span
              style={{
                width: '10px',
                height: '1.5px',
                backgroundColor: 'var(--terracotta)',
                display: 'block'
              }}
            />
          </div>
        </button>
      </MagneticButton>

      <style>{`
        @media (max-width: 820px) {
          .header-chapter-center {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
