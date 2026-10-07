import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { products } from '../../data/products';
import type { ProductCategory, Product } from '../../types';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import gsap from 'gsap';
import { useGSAPContext } from '../../hooks/useGSAPContext';

const filterCategories: ('ALL' | ProductCategory)[] = [
  'ALL',
  'CITRUS',
  'FIG',
  'OLIVE',
  'HERB',
  'SEASONAL'
];

export const Pantry: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | ProductCategory>('ALL');

  const jar1Ref = useRef<HTMLDivElement>(null);
  const jar2Ref = useRef<HTMLDivElement>(null);
  const jar3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'THE PANTRY // BOTANICAL OBJECTS — VALE SELVATICO';
    setCurrentChapter('PANTRY // BOTANICAL OBJECTS');
    setActiveSectionNumber('04');
  }, [setCurrentChapter, setActiveSectionNumber]);

  useGSAPContext(() => {
    gsap.fromTo(
      [jar1Ref.current, jar2Ref.current, jar3Ref.current],
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  });

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    return p.category === selectedFilter;
  });

  return (
    <main style={{ backgroundColor: 'var(--chalk)', color: 'var(--espresso)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. PANTRY HERO — Minimal with 3 rising product jars */}
      <section
        style={{
          padding: 'clamp(120px, 16vh, 200px) clamp(20px, 5vw, 64px) clamp(48px, 8vh, 96px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '20px' }}>
          APOTHECARY & PANTRY // CONTRADA SELVATICO
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 9vw, 150px)',
            lineHeight: 0.94,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0'
          }}
        >
          THE<br />
          *PANTRY.*
        </h1>

        <p
          className="type-body-lg"
          style={{
            color: 'var(--forest)',
            maxWidth: '48ch',
            opacity: 0.88,
            marginBottom: '48px',
            fontSize: 'clamp(16px, 1.6vw, 24px)'
          }}
        >
          Things grown here, preserved here, and meant to be opened. Small batches bottled with zero artificial emulsifiers, colors or pectin.
        </p>

        {/* 3 Rising floating product jars at bottom of hero */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px, 3vw, 40px)',
            maxWidth: '920px'
          }}
          className="hero-jars-grid"
        >
          <div ref={jar1Ref} style={{ overflow: 'hidden', aspectRatio: '3 / 4', borderRadius: '2px' }}>
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
              alt="Bergamot jar"
              fallbackType="citrus"
              containerStyle={{ width: '100%', height: '100%' }}
            />
          </div>
          <div ref={jar2Ref} style={{ overflow: 'hidden', aspectRatio: '3 / 4', borderRadius: '2px', transform: 'translateY(-24px)' }}>
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80"
              alt="Fig preserve jar"
              fallbackType="fig"
              containerStyle={{ width: '100%', height: '100%' }}
            />
          </div>
          <div ref={jar3Ref} style={{ overflow: 'hidden', aspectRatio: '3 / 4', borderRadius: '2px' }}>
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80"
              alt="Olive oil flacon"
              fallbackType="olive"
              containerStyle={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* 2. PRODUCT FILTER — Underlined Text Navigation */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 64px)',
          maxWidth: '1440px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(33, 26, 22, 0.12)',
          paddingBottom: '20px',
          marginBottom: '48px'
        }}
      >
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 40px)', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="mono-micro" style={{ color: 'var(--sage)', marginRight: '8px' }}>
            FILTER:
          </span>
          {filterCategories.map((cat) => {
            const isSelected = selectedFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  color: isSelected ? 'var(--terracotta)' : 'var(--forest)',
                  position: 'relative',
                  paddingBottom: '6px',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'color 0.25s ease'
                }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                {cat}
                {isSelected && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--terracotta)',
                      animation: 'underlineIn 0.3s ease'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. PRODUCT GRID — Asymmetrical Editorial Composition */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 12vh, 160px)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'start'
          }}
          className="pantry-asymmetric-grid"
        >
          {filteredProducts.map((prod: Product, idx: number) => {
            return (
              <ProductCard key={prod.id} product={prod} index={idx} />
            );
          })}
        </div>
      </section>

      <style>{`
        @keyframes underlineIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (max-width: 768px) {
          .hero-jars-grid {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
};

// Product Card with Hover Packshot to Lifestyle crossfade & ResponsiveImage
const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  // Alternate aspect ratios for editorial masonry feel
  const aspect = index % 3 === 0 ? '3 / 4' : index % 3 === 1 ? '1 / 1' : '4 / 5';

  return (
    <Link
      to={`/pantry/${product.slug}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('discover', 'DISCOVER');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: '100%',
          aspectRatio: aspect,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
          backgroundColor: '#EDE7DC',
          marginBottom: '18px'
        }}
      >
        {/* Packshot */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 0.6s ease, transform 0.8s ease'
          }}
        >
          <ResponsiveImage
            src={product.packshotImage}
            alt={product.name}
            fallbackType="citrus"
            containerStyle={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Lifestyle Crossfade Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1.02)' : 'scale(1.06)',
            transition: 'opacity 0.6s ease, transform 0.8s ease'
          }}
        >
          <ResponsiveImage
            src={product.lifestyleImage}
            alt={`${product.name} lifestyle`}
            fallbackType="citrus"
            containerStyle={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Batch badge */}
        <span
          className="mono-micro"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(250, 247, 240, 0.92)',
            color: 'var(--forest)',
            padding: '4px 8px',
            borderRadius: '2px',
            fontSize: '9px',
            zIndex: 2
          }}
        >
          {product.batch}
        </span>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.2vw, 32px)',
            lineHeight: 1.15,
            margin: 0,
            color: 'var(--forest)',
            transition: 'color 0.25s ease'
          }}
        >
          {product.name}
        </h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--terracotta)' }}>
          {product.price}
        </span>
      </div>

      <p className="type-body-sm" style={{ color: 'var(--forest)', opacity: 0.8, margin: '0 0 10px 0' }}>
        {product.subtitle}
      </p>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px' }}>
          {product.size}
        </span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
        <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px' }}>
          HARVEST {product.harvestYear}
        </span>
      </div>
    </Link>
  );
};
