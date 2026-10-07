import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    document.title = 'LOST IN THE GROVE // 404 — VALE SELVATICO';
    setCurrentChapter('THE GROVE // UNMAPPED');
    setActiveSectionNumber('00');
  }, [setCurrentChapter, setActiveSectionNumber]);

  return (
    <main
      style={{
        backgroundColor: 'var(--forest-deep)',
        color: 'var(--bone)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(120px, 24vw, 360px)',
          color: 'rgba(241, 235, 221, 0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        404
      </span>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
        <span className="mono-micro" style={{ color: 'var(--harvest)', letterSpacing: '0.24em', display: 'block', marginBottom: '16px' }}>
          UNMAPPED TERRACE // 404
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6.5vw, 92px)',
            lineHeight: 1.05,
            margin: '0 0 20px 0',
            color: 'var(--chalk)'
          }}
        >
          You have wandered<br />
          <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>*off the path.*</em>
        </h1>

        <p className="type-body" style={{ color: 'var(--paper)', opacity: 0.85, marginBottom: '36px' }}>
          This terrace does not exist on our botanical ledger. Return to the valley gate or consult the estate harvest almanac.
        </p>

        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            backgroundColor: 'var(--terracotta)',
            color: 'var(--chalk)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px'
          }}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft size={16} />
          <span>RETURN TO THE VALLEY</span>
        </Link>
      </div>
    </main>
  );
};
