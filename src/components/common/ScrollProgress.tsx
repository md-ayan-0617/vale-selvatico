import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';

export const ScrollProgress: React.FC = () => {
  const [scrollFraction, setScrollFraction] = useState(0);
  const { activeSectionNumber } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const fraction = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
        setScrollFraction(fraction);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        pointerEvents: 'none',
        opacity: 0.85
      }}
      className="hidden-mobile"
    >
      {/* Chapter Counter */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'var(--forest)'
        }}
      >
        {activeSectionNumber}
      </span>

      {/* Tiny vertical bar track */}
      <div
        style={{
          width: '1px',
          height: '64px',
          backgroundColor: 'rgba(37, 49, 38, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scrollFraction * 100}%`,
            backgroundColor: 'var(--terracotta)',
            transition: 'height 0.1s linear'
          }}
        />
      </div>

      {/* Subtle coordinate marker */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: 'rgba(37, 49, 38, 0.45)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
      >
        SOLAR
      </span>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
