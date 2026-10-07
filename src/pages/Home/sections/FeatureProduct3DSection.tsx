import React from 'react';
import { Link } from 'react-router-dom';
import { Product3DViewer } from '../../../components/three/Product3DViewer';
import { MagneticButton } from '../../../components/common/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../../context/CursorContext';

export const FeatureProduct3DSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: 'var(--chalk)',
        color: 'var(--forest)',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 5vw, 64px)',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Oversized Outline Typography behind bottle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 18vw, 260px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(37, 49, 38, 0.12)',
            letterSpacing: '0.04em',
            lineHeight: 0.9,
            display: 'block'
          }}
        >
          BERGAMOT
        </span>
      </div>

      {/* Main Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr 1fr',
          alignItems: 'center',
          gap: 'clamp(24px, 3vw, 48px)'
        }}
        className="product-feature-grid"
      >
        {/* Left Metadata Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '8px' }}>
              FLAGSHIP RELEASE
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 4.5vw, 64px)',
                lineHeight: 1,
                margin: 0
              }}
            >
              BERGAMOT<br />
              <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>No. 04</em>
            </h2>
            <p className="type-body-sm" style={{ marginTop: '12px', color: 'var(--forest)', opacity: 0.85 }}>
              Single-orchard botanical syrup simmered slowly over pruned olive-wood embers.
            </p>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(37, 49, 38, 0.15)',
              paddingTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <span className="mono-micro" style={{ color: 'var(--forest)' }}>
              BATCH 04
            </span>
            <span className="mono-micro" style={{ color: 'var(--forest)' }}>
              VOLUME: 375 ML
            </span>
            <span className="mono-micro" style={{ color: 'var(--forest)' }}>
              HARVEST YEAR: 2026
            </span>
          </div>
        </div>

        {/* Center 3D Interactive Product Bottle */}
        <div
          style={{
            height: 'clamp(460px, 60vh, 620px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          onMouseEnter={() => setCursor('discover', 'ROTATE')}
          onMouseLeave={resetCursor}
        >
          <Product3DViewer labelColor="#A95337" bottleType="syrup" />
        </div>

        {/* Right Tasting Notes & CTA Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '12px' }}>
              TASTING ARCHITECTURE
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--forest)' }}>
                Bright citrus zest.
              </li>
              <li style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontStyle: 'italic', color: 'var(--terracotta)' }}>
                Wild mountain thyme.
              </li>
              <li style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--forest)', opacity: 0.85 }}>
                Raw cane sugar caramel.
              </li>
            </ul>
          </div>

          <div style={{ borderTop: '1px solid rgba(37, 49, 38, 0.15)', paddingTop: '24px' }}>
            <MagneticButton strength={12} cursorVariant="hover">
              <Link
                to="/pantry/bergamot-no-04"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  color: 'var(--forest)',
                  textDecoration: 'none'
                }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase'
                  }}
                >
                  EXPLORE BATCH 04
                </span>

                {/* Circular Arrow Button (NOT A PILL) */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  className="explore-circle-arrow"
                >
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>

      <style>{`
        .explore-circle-arrow:hover {
          background-color: var(--terracotta);
          color: var(--chalk);
          border-color: var(--terracotta);
          transform: rotate(45deg);
        }
        @media (max-width: 960px) {
          .product-feature-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
