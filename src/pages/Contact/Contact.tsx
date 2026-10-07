import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../../components/common/MagneticButton';
import { TypingText } from '../../components/typography/TypingText';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();
  const { setCursor, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Botanical Pantry & Orders',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'CONTACT // NIGHTFALL AT THE ESTATE — VALE SELVATICO';
    setCurrentChapter('CONTACT // NIGHT AT THE ESTATE');
    setActiveSectionNumber('07');
  }, [setCurrentChapter, setActiveSectionNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ backgroundColor: 'var(--forest-deep)', color: 'var(--bone)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. CONTACT HERO */}
      <section
        style={{
          padding: 'clamp(120px, 16vh, 200px) clamp(20px, 5vw, 64px) clamp(48px, 8vh, 96px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
            38°04&apos; N &nbsp; 14°59&apos; E // SICILIA
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
          <span className="mono-micro" style={{ color: 'var(--bone)', opacity: 0.85 }}>
            <TypingText
              phrases={[
                'NIGHT AT THE ESTATE',
                'GATE RESTS UNDER STARLIGHT',
                'INQUIRIES ANSWERED AT DAWN',
                'LETTERS FROM THE VALLEY'
              ]}
              typingSpeed={40}
              deletingSpeed={25}
              pauseDuration={2400}
              cursorColor="var(--harvest)"
            />
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8.5vw, 135px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
            color: 'var(--chalk)'
          }}
        >
          FIND US<br />
          BETWEEN<br />
          THE <em style={{ fontStyle: 'italic', color: 'var(--harvest)' }}>*hills.*</em>
        </h1>

        <p className="type-body-lg" style={{ color: 'var(--paper)', opacity: 0.9, maxWidth: '44ch', fontSize: 'clamp(16px, 1.6vw, 22px)' }}>
          We welcome travelers, cooks, botanists and neighbors by prior arrangement. Let us know how we can prepare for you.
        </p>
      </section>

      {/* 2. CONTACT DETAILS & INTERACTIVE FORM */}
      <section
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 64px) clamp(64px, 12vh, 140px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(36px, 6vw, 96px)',
          alignItems: 'start'
        }}
        className="contact-layout-grid"
      >
        {/* Left: Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vh, 48px)' }}>
          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
              ESTATE ADDRESS
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.5vw, 32px)', color: 'var(--chalk)', margin: 0, lineHeight: 1.2 }}>
              Contrada Selvatico 14<br />
              90010 Madonie Foothills, Sicily
            </p>
          </div>

          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
              VISITING DAYS
            </span>
            <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.9, margin: 0 }}>
              Thursday through Sunday<br />
              Visits exclusively by prior reservation
            </p>
          </div>

          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
              DIRECT WRITING
            </span>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--chalk)', margin: '0 0 6px 0' }}>
              hello@valeselvatico.example
            </p>
            <p className="mono-micro" style={{ color: 'var(--sage)' }}>
              +39 0921 440 928 (ESTATE BOTTEGA)
            </p>
          </div>

          <div>
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
              DOCUMENTARY CHANNELS
            </span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--chalk)', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                INSTAGRAM <ArrowUpRight size={12} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--chalk)', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                PINTEREST <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form with Underline Inputs & Animated Harvest Focus Line */}
        <div
          style={{
            backgroundColor: '#1E2820',
            border: '1px solid rgba(241, 235, 221, 0.12)',
            padding: 'clamp(24px, 4vw, 52px)',
            borderRadius: '2px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.3)'
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', animation: 'fadeIn 0.5s ease' }}>
              <CheckCircle2 size={48} color="var(--harvest)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: 'var(--chalk)', marginBottom: '12px' }}>
                RECEIVED.
              </h3>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '24px', color: 'var(--harvest)', marginBottom: '20px' }}>
                We&apos;ll write back soon.
              </p>
              <p className="type-body" style={{ color: 'var(--bone)', opacity: 0.85, maxWidth: '360px', margin: '0 auto' }}>
                Thank you for your note. Our family reads inquiries each afternoon after the field work is complete.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
                  YOUR NAME
                </span>
                <input
                  type="text"
                  required
                  placeholder="Alessandra Rossi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact-underlined-input"
                />
              </div>

              <div>
                <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
                  YOUR EMAIL
                </span>
                <input
                  type="email"
                  required
                  placeholder="alessandra@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="contact-underlined-input"
                />
              </div>

              <div>
                <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
                  I&apos;M WRITING ABOUT
                </span>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="contact-underlined-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Botanical Pantry & Orders" style={{ background: '#1E2820', color: '#FAF7F0' }}>
                    Botanical Pantry & Orders
                  </option>
                  <option value="Estate Visit & Table Reservation" style={{ background: '#1E2820', color: '#FAF7F0' }}>
                    Estate Visit & Table Reservation
                  </option>
                  <option value="Press & Editorial Inquiries" style={{ background: '#1E2820', color: '#FAF7F0' }}>
                    Press & Editorial Inquiries
                  </option>
                  <option value="Culinary Collaboration" style={{ background: '#1E2820', color: '#FAF7F0' }}>
                    Culinary Collaboration
                  </option>
                </select>
              </div>

              <div>
                <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
                  MESSAGE
                </span>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what brings you to Vale Selvatico..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-underlined-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ marginTop: '12px' }}>
                <MagneticButton strength={10} cursorVariant="hover">
                  <button
                    type="submit"
                    style={{
                      padding: '16px 32px',
                      backgroundColor: 'var(--terracotta)',
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
                      cursor: 'pointer'
                    }}
                  >
                    <span>SEND TO THE VALLEY</span>
                    <ArrowUpRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. DARK MONOCHROME CUSTOM MAP (No bright default Google styles) */}
      <section
        style={{
          borderTop: '1px solid rgba(241, 235, 221, 0.12)',
          position: 'relative',
          height: 'clamp(320px, 45vh, 440px)',
          overflow: 'hidden',
          backgroundColor: '#111713'
        }}
      >
        {/* Custom Stylized Topographic Map Vector */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.65 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(241, 235, 221, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Stylized Topographic Contour Lines */}
          <path d="M0,180 Q300,100 600,190 T1200,210 T1800,160" fill="none" stroke="rgba(211, 164, 59, 0.15)" strokeWidth="1.5" />
          <path d="M0,230 Q400,150 800,240 T1400,260 T2000,210" fill="none" stroke="rgba(142, 155, 123, 0.12)" strokeWidth="1.5" />
          <path d="M0,290 Q350,220 700,300 T1300,320 T1900,270" fill="none" stroke="rgba(211, 164, 59, 0.1)" strokeWidth="1.5" />

          {/* Valley River Stream */}
          <path d="M200,420 C450,300 750,250 1100,120 T1600,0" fill="none" stroke="rgba(142, 155, 123, 0.25)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Estate Location Pin with Glowing Terracotta Pulse */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <div style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span
              style={{
                position: 'absolute',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(169, 83, 55, 0.35)',
                animation: 'pulsePin 2s infinite'
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--terracotta)',
                boxShadow: '0 0 12px var(--terracotta)'
              }}
            />
          </div>

          <div
            style={{
              marginTop: '10px',
              backgroundColor: 'rgba(23, 32, 25, 0.92)',
              border: '1px solid var(--harvest)',
              padding: '6px 14px',
              borderRadius: '2px',
              textAlign: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
            }}
          >
            <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', fontSize: '10px' }}>
              VALE SELVATICO
            </span>
            <span className="mono-micro" style={{ color: 'var(--chalk)', fontSize: '9px' }}>
              38°04&apos; N &nbsp; 14°59&apos; E
            </span>
          </div>
        </div>
      </section>

      <style>{`
        .contact-underlined-input {
          width: 100%;
          padding: 12px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(241, 235, 221, 0.25);
          color: var(--chalk);
          font-family: var(--font-sans);
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .contact-underlined-input:focus {
          border-color: var(--harvest);
        }
        @keyframes pulsePin {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 860px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};
