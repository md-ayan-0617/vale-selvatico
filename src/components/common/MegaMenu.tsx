import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface MenuItem {
  num: string;
  label: string;
  path: string;
  previewImage: string;
  tagline: string;
}

const menuItems: MenuItem[] = [
  {
    num: '01',
    label: 'Home',
    path: '/',
    previewImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Early morning sunlight in the valley'
  },
  {
    num: '02',
    label: 'Estate',
    path: '/estate',
    previewImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Heritage, limestone terraces & our growers'
  },
  {
    num: '03',
    label: 'Harvest',
    path: '/harvest',
    previewImage: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Golden hour intensity and seasonal rhythm'
  },
  {
    num: '04',
    label: 'Pantry',
    path: '/pantry',
    previewImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Preserves, cold-pressed oils & botanical syrups'
  },
  {
    num: '05',
    label: 'Experience',
    path: '/experience',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Sunset hospitality & communal feasts under trees'
  },
  {
    num: '06',
    label: 'Journal',
    path: '/journal',
    previewImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Field notebook, recipes & seasonal observations'
  },
  {
    num: '07',
    label: 'Contact',
    path: '/contact',
    previewImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Nightfall, directions and letters to the estate'
  }
];

export const MegaMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useNavigation();
  const { setCursor, resetCursor } = useCursor();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);

  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard escape & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  // Set initial preview based on current route
  useEffect(() => {
    const current = menuItems.find((item) => item.path === location.pathname);
    if (current) setActiveItem(current);
  }, [location.pathname]);

  // Open / Close Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      tl.set([leftCurtainRef.current, rightCurtainRef.current], {
        scaleY: 0,
        transformOrigin: 'top'
      });
      tl.to([leftCurtainRef.current, rightCurtainRef.current], {
        scaleY: 1,
        duration: 0.65,
        ease: 'power3.inOut',
        stagger: 0.05
      });
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      if (leftCurtainRef.current && rightCurtainRef.current) {
        gsap.to([leftCurtainRef.current, rightCurtainRef.current], {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.55,
          ease: 'power3.inOut',
          stagger: 0.04
        });
      }
    }
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        display: 'flex',
        color: 'var(--bone)',
        overflow: 'hidden'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          height: '100%',
          backgroundColor: 'var(--forest)',
          borderRight: '1px solid rgba(241, 235, 221, 0.08)',
          zIndex: 1
        }}
        className="menu-curtain-left"
      />

      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          backgroundColor: 'var(--forest-deep)',
          zIndex: 1
        }}
        className="menu-curtain-right"
      />

      {/* Main Content inside Curtains */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          padding: 'clamp(24px, 4vw, 48px)'
        }}
        className="menu-grid"
      >
        {/* Top Header Bar inside menu */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: 'clamp(24px, 4vw, 48px)',
            right: 'clamp(24px, 4vw, 48px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontStyle: 'italic',
              color: 'var(--bone)'
            }}
          >
            Vale <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '13px', letterSpacing: '0.2em' }}>SELVATICO</span>
          </span>

          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--bone)',
              padding: '8px 14px',
              border: '1px solid rgba(241, 235, 221, 0.25)',
              borderRadius: '2px',
              transition: 'border-color 0.2s ease'
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            aria-label="Close menu"
          >
            <span className="mono-micro" style={{ letterSpacing: '0.14em' }}>CLOSE</span>
            <X size={16} />
          </button>
        </div>

        {/* LEFT COLUMN: 60% — Huge Links */}
        <div
          ref={linksContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '60px',
            paddingRight: '40px'
          }}
        >
          <nav aria-label="Main Navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.4vh, 18px)' }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.num}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => {
                        setActiveItem(item);
                        setCursor('hover');
                      }}
                      onMouseLeave={resetCursor}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '20px',
                        textDecoration: 'none',
                        color: isActive ? 'var(--harvest)' : 'var(--bone)',
                        transition: 'transform 0.3s ease, color 0.3s ease'
                      }}
                      className="menu-link-item"
                    >
                      <span
                        className="mono-micro"
                        style={{
                          fontSize: 'clamp(11px, 0.9vw, 14px)',
                          color: isActive ? 'var(--harvest)' : 'var(--sage)',
                          letterSpacing: '0.15em'
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(36px, 5.5vw, 76px)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.01em',
                          fontStyle: isActive ? 'italic' : 'normal'
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Left: Socials & Email */}
          <div
            style={{
              marginTop: 'clamp(24px, 4vh, 48px)',
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mono-micro"
              style={{ color: 'var(--sage)', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              INSTAGRAM <ArrowUpRight size={12} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="mono-micro"
              style={{ color: 'var(--sage)', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              PINTEREST <ArrowUpRight size={12} />
            </a>
            <a
              href="mailto:hello@valeselvatico.example"
              className="mono-micro"
              style={{ color: 'var(--bone)', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              EMAIL <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 40% — Dynamic Photographic Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '60px',
            position: 'relative'
          }}
          className="menu-preview-col"
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '4 / 5',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)'
            }}
          >
            <img
              key={activeItem.previewImage}
              src={activeItem.previewImage}
              alt={activeItem.label}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                animation: 'fadeMaskIn 0.55s ease forwards'
              }}
            />
            {/* Dark vignette gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(23,32,25,0.85) 0%, rgba(23,32,25,0.1) 60%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}
            >
              <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '4px' }}>
                {activeItem.num} // PREVIEW
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', color: 'var(--bone)', margin: 0 }}>
                {activeItem.tagline}
              </p>
            </div>
          </div>

          {/* Bottom Right: Coordinates */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              textAlign: 'right'
            }}
          >
            <span className="mono-micro" style={{ color: 'var(--sage)', letterSpacing: '0.15em', display: 'block' }}>
              SICILY // CONTRADA SELVATICO
            </span>
            <span className="mono-micro" style={{ color: 'var(--harvest)', letterSpacing: '0.18em', fontSize: '11px' }}>
              38°04&apos; N &nbsp; 14°59&apos; E
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeMaskIn {
          0% {
            opacity: 0;
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .menu-link-item:hover {
          transform: translateX(12px);
        }
        @media (max-width: 900px) {
          .menu-curtain-left {
            width: 100% !important;
          }
          .menu-curtain-right {
            display: none !important;
          }
          .menu-grid {
            grid-template-columns: 100% !important;
            padding: 80px 24px 32px !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
          }
          .menu-preview-col {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
