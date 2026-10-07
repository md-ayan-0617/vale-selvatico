import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { Product3DViewer } from '../../components/three/Product3DViewer';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.slug === slug) || products[0];
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const nextProduct = products[(currentIndex + 1) % products.length];

  useEffect(() => {
    document.title = `${product.name} — THE PANTRY // VALE SELVATICO`;
    setCurrentChapter(`PANTRY // ${product.name.toUpperCase()}`);
    setActiveSectionNumber('04');
    window.scrollTo(0, 0);
  }, [product, setCurrentChapter, setActiveSectionNumber]);

  return (
    <main style={{ backgroundColor: 'var(--chalk)', color: 'var(--espresso)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Back to Pantry Link */}
      <div
        style={{
          padding: 'clamp(90px, 12vh, 130px) clamp(20px, 5vw, 64px) 20px',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <Link
          to="/pantry"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: 'var(--forest)',
            textDecoration: 'none'
          }}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft size={14} />
          <span>RETURN TO THE PANTRY</span>
        </Link>
      </div>

      {/* Main PDP Grid: Sticky Left 3D Viewer & Scrollable Right Info */}
      <section
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 64px) clamp(64px, 10vh, 140px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(36px, 6vw, 96px)',
          alignItems: 'start'
        }}
        className="pdp-main-grid"
      >
        {/* LEFT: Sticky Product 3D Viewer */}
        <div
          style={{
            position: 'sticky',
            top: '110px',
            height: 'clamp(420px, 65vh, 680px)',
            backgroundColor: '#EDE7DC',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(33, 26, 22, 0.08)'
          }}
          className="pdp-viewer-box"
        >
          {/* Huge background category/ingredient name */}
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(60px, 14vw, 180px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(33, 26, 22, 0.14)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            {product.category}
          </span>

          <div
            style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}
            onMouseEnter={() => setCursor('discover', 'ROTATE')}
            onMouseLeave={resetCursor}
          >
            <Product3DViewer labelColor={product.accentColor} />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 3
            }}
          >
            <span className="mono-micro" style={{ color: 'var(--forest)', fontSize: '10px' }}>
              {product.batch}
            </span>
            <span className="mono-micro" style={{ color: 'var(--terracotta)', fontSize: '10px' }}>
              DRAG TO ROTATE
            </span>
          </div>
        </div>

        {/* RIGHT: Scrollable Product Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vh, 48px)' }}>
          {/* Header & Price */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="mono-micro" style={{ color: product.accentColor, fontWeight: 600 }}>
                {product.category} // {product.harvestYear}
              </span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
              <span className="mono-micro" style={{ color: 'var(--forest)' }}>
                {product.size}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5.2vw, 76px)',
                lineHeight: 1.05,
                margin: '0 0 8px 0',
                color: 'var(--espresso)'
              }}
            >
              {product.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--terracotta)', margin: '0 0 18px 0' }}>
              {product.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--forest)' }}>
                {product.price}
              </span>
              <span className="mono-micro" style={{ color: 'var(--sage)' }}>
                INCL. TAX // BOTTLED ON ESTATE
              </span>
            </div>

            <p className="type-body-lg" style={{ color: 'var(--forest)', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px', fontSize: 'clamp(15px, 1.4vw, 20px)' }}>
              {product.description}
            </p>

            {/* Direct Order Button */}
            <button
              onClick={() => {
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2400);
              }}
              style={{
                padding: '16px 32px',
                backgroundColor: addedToCart ? '#253126' : 'var(--terracotta)',
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
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width: 'fit-content'
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              {addedToCart ? (
                <>
                  <Check size={16} />
                  <span>PRE-ALLOCATED IN BASKET</span>
                </>
              ) : (
                <span>ACQUIRE HARVEST BATCH</span>
              )}
            </button>
          </div>

          {/* Expressive Tasting Notes Typography */}
          <div style={{ borderTop: '1px solid rgba(33, 26, 22, 0.15)', paddingTop: '28px' }}>
            <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '16px' }}>
              TASTING ARCHITECTURE
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 24px', alignItems: 'baseline' }}>
              {product.tastingNotes.map((note) => {
                const fontSize =
                  note.prominence === 'dominant'
                    ? 'clamp(30px, 4vw, 56px)'
                    : note.prominence === 'accent'
                    ? 'clamp(22px, 2.8vw, 38px)'
                    : 'clamp(16px, 1.8vw, 24px)';

                return (
                  <span
                    key={note.word}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize,
                      color: note.prominence === 'dominant' ? 'var(--terracotta)' : 'var(--forest)',
                      fontStyle: note.prominence === 'accent' ? 'italic' : 'normal',
                      lineHeight: 1
                    }}
                  >
                    {note.word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Ingredients list */}
          <div style={{ borderTop: '1px solid rgba(33, 26, 22, 0.15)', paddingTop: '28px' }}>
            <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '14px' }}>
              ESTATE INGREDIENTS
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {product.ingredients.map((ing) => (
                <li
                  key={ing}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', backgroundColor: 'var(--terracotta)', borderRadius: '50%' }} />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Pairings */}
          <div style={{ borderTop: '1px solid rgba(33, 26, 22, 0.15)', paddingTop: '28px' }}>
            <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '14px' }}>
              SUGGESTED PAIRINGS
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {product.pairWith.map((pair) => (
                <span
                  key={pair}
                  style={{
                    backgroundColor: 'rgba(37, 49, 38, 0.08)',
                    padding: '8px 14px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'var(--forest)'
                  }}
                >
                  {pair}
                </span>
              ))}
            </div>
          </div>

          {/* Origin & Method */}
          <div
            style={{
              borderTop: '1px solid rgba(33, 26, 22, 0.15)',
              paddingTop: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}
          >
            <div>
              <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '6px' }}>
                GROVE ORIGIN
              </span>
              <p className="type-body-sm" style={{ color: 'var(--forest)', margin: 0 }}>
                {product.origin}
              </p>
            </div>
            <div>
              <span className="mono-micro" style={{ color: 'var(--sage)', display: 'block', marginBottom: '6px' }}>
                CRAFT METHOD
              </span>
              <p className="type-body-sm" style={{ color: 'var(--forest)', margin: 0 }}>
                {product.method}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INGREDIENT STORY — Full-bleed macro photo */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: 'clamp(48px, 8vh, 120px) 20px'
        }}
      >
        <ResponsiveImage
          src={product.lifestyleImage}
          alt={product.name}
          fallbackType="citrus"
          containerStyle={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(23, 32, 25, 0.6)',
            zIndex: 2
          }}
        />

        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '720px', color: 'var(--chalk)' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '16px' }}>
            THE LIVING INGREDIENT
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4.2vw, 56px)',
              lineHeight: 1.2,
              margin: '0 0 18px 0'
            }}
          >
            “Picked before noon. Preserved before nightfall.”
          </p>
          <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.9 }}>
            No preservatives. The only conservation agents are natural acidity, raw mountain spring water and olive wood heat.
          </p>
        </div>
      </section>

      {/* 3. NEXT PRODUCT — Hover Full Viewport Takeover */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--forest-deep)',
          color: 'var(--chalk)',
          padding: 'clamp(64px, 10vh, 140px) clamp(20px, 5vw, 64px)',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/pantry/${nextProduct.slug}`)}
        onMouseEnter={() => {
          setIsNextHovered(true);
          setCursor('discover', 'NEXT');
        }}
        onMouseLeave={() => {
          setIsNextHovered(false);
          resetCursor();
        }}
      >
        {/* Next Product Background Image Takeover on Hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isNextHovered ? 0.35 : 0,
            transition: 'opacity 0.6s ease',
            zIndex: 1
          }}
        >
          <ResponsiveImage
            src={nextProduct.packshotImage}
            alt={nextProduct.name}
            fallbackType="citrus"
            containerStyle={{ width: '100%', height: '100%' }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '10px' }}>
              NEXT FROM THE PANTRY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 92px)',
                lineHeight: 1,
                margin: 0,
                color: 'var(--chalk)'
              }}
            >
              {nextProduct.name}
            </h2>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--sage)', marginTop: '6px' }}>
              {nextProduct.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--harvest)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '0.14em'
            }}
          >
            <span>DISCOVER NEXT BATCH</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pdp-main-grid {
            grid-template-columns: 1fr !important;
          }
          .pdp-viewer-box {
            position: relative !important;
            top: 0 !important;
            height: 380px !important;
          }
        }
      `}</style>
    </main>
  );
};
