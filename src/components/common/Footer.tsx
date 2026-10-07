import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCursor } from '../../context/CursorContext';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowUpRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const { openBooking } = useNavigation();
  const [localTime, setLocalTime] = useState<string>('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  // Live local clock (Sicily, Europe/Rome)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Rome',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        const now = new Date();
        setLocalTime(
          `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle interactive letter shift on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll<HTMLSpanElement>('.footer-char');
    const rect = titleRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;

    letters.forEach((char, i) => {
      const charOffset = (i / letters.length) - relativeX;
      const shift = Math.sin(charOffset * Math.PI) * 7;
      char.style.transform = `translateY(${shift}px)`;
    });
  };

  const handleMouseLeave = () => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll<HTMLSpanElement>('.footer-char');
    letters.forEach((char) => {
      char.style.transform = 'translateY(0px)';
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const brandLetters = "VALE SELVATICO".split("");

  return (
    <footer
      style={{
        backgroundColor: 'var(--forest-deep)',
        color: 'var(--bone)',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 64px) 40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top: Newsletter Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(241, 235, 221, 0.12)',
          paddingBottom: 'clamp(48px, 6vh, 80px)'
        }}
      >
        <div>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
            LETTERS FROM THE VALLEY
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Seasonal notes. <em>No noise.</em>
          </p>
          <p className="type-body-sm" style={{ color: 'var(--sage)', marginTop: '8px', maxWidth: '380px' }}>
            A dispatch once each equinox and solstice. Notes on flowering, harvest yields, and when new batches become available.
          </p>
        </div>

        <div style={{ maxWidth: '440px', marginLeft: 'auto', width: '100%' }}>
          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--harvest)', padding: '14px 0' }}>
              <Check size={18} />
              <span className="mono-micro" style={{ letterSpacing: '0.15em' }}>YOU ARE ON THE DISPATCH LIST</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 48px 16px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(241, 235, 221, 0.3)',
                  color: 'var(--bone)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--harvest)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(241, 235, 221, 0.3)')}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--harvest)',
                  padding: '8px'
                }}
                aria-label="Subscribe"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <ArrowUpRight size={20} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Middle: Huge Brand Statement with Subtle Char Shift */}
      <div
        ref={titleRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: 'clamp(48px, 6vw, 96px) 0 clamp(40px, 5vw, 80px)',
          textAlign: 'center',
          userSelect: 'none',
          overflow: 'hidden'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(54px, 12vw, 180px)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            margin: 0,
            color: 'var(--bone)',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            justifyContent: 'center'
          }}
        >
          {brandLetters.map((char, idx) => (
            <span
              key={idx}
              className="footer-char"
              style={{
                display: 'inline-block',
                transition: 'transform 0.18s cubic-bezier(0.2, 0, 0.2, 1)',
                minWidth: char === ' ' ? 'clamp(14px, 3vw, 40px)' : undefined
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Navigation Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
          borderBottom: '1px solid rgba(241, 235, 221, 0.1)',
          paddingBottom: '48px',
          marginBottom: '36px'
        }}
      >
        {/* Explore */}
        <div>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '16px' }}>
            EXPLORE
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/estate" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Estate & Roots
              </Link>
            </li>
            <li>
              <Link to="/harvest" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Seasonal Harvest
              </Link>
            </li>
            <li>
              <Link to="/pantry" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Botanical Pantry
              </Link>
            </li>
            <li>
              <Link to="/experience" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Sunset Experiences
              </Link>
            </li>
            <li>
              <Link to="/journal" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Field Journal
              </Link>
            </li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '16px' }}>
            VISIT
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/contact" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Directions & Gate
              </Link>
            </li>
            <li>
              <button
                onClick={() => openBooking()}
                style={{ color: 'var(--paper)', opacity: 0.85, padding: 0, textAlign: 'left' }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                Request Reservation
              </button>
            </li>
            <li>
              <Link to="/contact" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Contact & Inquiries
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '16px' }}>
            FOLLOW
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Instagram ↗
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Pinterest ↗
              </a>
            </li>
            <li>
              <a href="mailto:hello@valeselvatico.example" style={{ color: 'var(--paper)', opacity: 0.85 }} onMouseEnter={() => setCursor('hover')} onMouseLeave={resetCursor}>
                Direct Inquiries ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '16px' }}>
            LEGAL
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ color: 'rgba(241, 235, 221, 0.55)', fontSize: '14px' }}>Agrarian Lic. SIC-8491</li>
            <li style={{ color: 'rgba(241, 235, 221, 0.55)', fontSize: '14px' }}>Organic Certification Bio-EU</li>
            <li style={{ color: 'rgba(241, 235, 221, 0.55)', fontSize: '14px' }}>Privacy & Terms of Soil</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Live Local Clock & Coordinates */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          color: 'var(--sage)'
        }}
      >
        <span className="mono-micro">
          © 2026 VALE SELVATICO // BOTANICAL ESTATE
        </span>

        <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
          38°04&apos; N &nbsp; 14°59&apos; E // SICILY
        </span>

        <span className="mono-micro" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#55BA68' }} />
          LOCAL TIME: {localTime || '18:42:00'} (CET)
        </span>
      </div>
    </footer>
  );
};
