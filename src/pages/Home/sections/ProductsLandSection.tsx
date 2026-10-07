import React from 'react';
import { Link } from 'react-router-dom';
import { ImageReveal } from '../../../components/media/ImageReveal';
import { useCursor } from '../../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

interface IngredientChapter {
  id: string;
  name: string;
  botanical: string;
  description: string;
  primaryImage: string;
  accentColor: string;
  productSlug: string;
  harvestWindow: string;
  tastingKeywords: string;
}

const chapters: IngredientChapter[] = [
  {
    id: '01',
    name: 'BERGAMOT',
    botanical: 'Citrus bergamia Risso',
    description: 'Pebbled, highly aromatic rind rich in volatile terpenes. Harvested by hand before sunrise to preserve delicate top notes in cold-pressed elixirs.',
    primaryImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#D3A43B', // Muted yellow
    productSlug: 'bergamot-no-04',
    harvestWindow: 'OCTOBER — DECEMBER',
    tastingKeywords: 'Bright peel • Resinous • Floral'
  },
  {
    id: '02',
    name: 'FIG',
    botanical: 'Ficus carica Dottato',
    description: 'Ancient heirloom fig trees rooted twelve meters into fractured limestone bedrock. Picked only when the skin split naturally beneath August sun.',
    primaryImage: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#633F4B', // Deep fig purple
    productSlug: 'wild-fig-preserve',
    harvestWindow: 'AUGUST — SEPTEMBER',
    tastingKeywords: 'Unctuous • Caramel • Wild fennel'
  },
  {
    id: '03',
    name: 'OLIVE',
    botanical: 'Olea europaea Nocellara',
    description: 'Early-picked emerald green olives cold-crushed within four hours in our gravity-fed stone wheel. Peppery, grassy, and overflowing with polyphenols.',
    primaryImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#8E9B7B', // Sage
    productSlug: 'green-olive-conserva',
    harvestWindow: 'SEPTEMBER — OCTOBER',
    tastingKeywords: 'Artichoke • Green grass • Bitter snap'
  },
  {
    id: '04',
    name: 'WILD HERBS',
    botanical: 'Thymus capitatus & Rosmarinus',
    description: 'Wild mountain thyme, bay laurel, and resinous rosemary growing naturally on dry-stone walls. Hand-foraged at the height of afternoon heat.',
    primaryImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#253126', // Forest
    productSlug: 'rosemary-oil',
    harvestWindow: 'YEAR ROUND // SUN DRIED',
    tastingKeywords: 'Camphorous • Pine • Stone mineral'
  }
];

export const ProductsLandSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      style={{
        backgroundColor: 'var(--bone)',
        color: 'var(--forest)',
        padding: 'clamp(64px, 10vh, 140px) 0',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div
        style={{
          padding: '0 clamp(24px, 5vw, 64px)',
          marginBottom: 'clamp(48px, 8vh, 96px)'
        }}
      >
        <span
          className="mono-micro"
          style={{
            color: 'var(--terracotta)',
            letterSpacing: '0.22em',
            display: 'block',
            marginBottom: '16px'
          }}
        >
          CHAPTER 02 // BOTANICAL ALCHEMY
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6.8vw, 105px)',
            lineHeight: 0.98,
            letterSpacing: '-0.015em',
            margin: 0
          }}
        >
          FROM EARTH<br />
          TO *TABLE.*
        </h2>
      </div>

      {/* 4 Oversized Ingredient Chapters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 12vh, 160px)' }}>
        {chapters.map((ch, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={ch.id}
              style={{
                display: 'grid',
                gridTemplateColumns: isEven ? '0.9fr 1.1fr' : '1.1fr 0.9fr',
                alignItems: 'center',
                gap: 'clamp(32px, 5vw, 80px)',
                padding: '0 clamp(24px, 5vw, 64px)',
                minHeight: '85vh'
              }}
              className={`ingredient-row ${isEven ? 'row-reversed' : ''}`}
            >
              {/* Image side */}
              <div style={{ order: isEven ? 2 : 1 }}>
                <ImageReveal
                  src={ch.primaryImage}
                  alt={ch.name}
                  pattern={index % 2 === 0 ? 'clip-inset' : 'mask-translate'}
                  aspectRatio="4 / 3.4"
                  cursorText={ch.name}
                  cursorVariant="discover"
                  style={{
                    borderRadius: '2px',
                    boxShadow: '0 24px 48px rgba(37,49,38,0.12)'
                  }}
                />
              </div>

              {/* Text side */}
              <div style={{ order: isEven ? 1 : 2, maxWidth: '540px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span
                    className="mono-micro"
                    style={{
                      color: ch.accentColor,
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    0{index + 1} // {ch.harvestWindow}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(44px, 5.5vw, 84px)',
                    lineHeight: 1.02,
                    letterSpacing: '-0.01em',
                    margin: '0 0 12px 0',
                    color: 'var(--forest)'
                  }}
                  onMouseEnter={() => setCursor('discover', ch.name)}
                  onMouseLeave={resetCursor}
                >
                  {ch.name}
                </h3>

                <p
                  className="mono-micro"
                  style={{
                    color: 'var(--terracotta)',
                    fontSize: '12px',
                    fontStyle: 'italic',
                    textTransform: 'none',
                    letterSpacing: '0.06em',
                    marginBottom: '24px'
                  }}
                >
                  {ch.botanical}
                </p>

                <p
                  className="type-body"
                  style={{
                    marginBottom: '28px',
                    color: 'var(--forest)',
                    opacity: 0.88
                  }}
                >
                  {ch.description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid rgba(37,49,38,0.15)',
                    paddingTop: '16px',
                    marginBottom: '32px'
                  }}
                >
                  <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '6px' }}>
                    TASTING IMPRINT
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--forest)', fontWeight: 500 }}>
                    {ch.tastingKeywords}
                  </span>
                </div>

                <Link
                  to={`/pantry/${ch.productSlug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--forest)',
                    textDecoration: 'none',
                    borderBottom: `2px solid ${ch.accentColor}`,
                    paddingBottom: '4px',
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '0.12em',
                    fontFamily: 'var(--font-mono)'
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                >
                  <span>VIEW BOTANICAL HARVEST</span>
                  <ArrowUpRight size={14} color={ch.accentColor} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ingredient-row {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .row-reversed div:first-child {
            order: 1 !important;
          }
          .row-reversed div:last-child {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
};
