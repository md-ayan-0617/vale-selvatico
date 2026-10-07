import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCursor } from '../../context/CursorContext';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const BookingDrawer: React.FC = () => {
  const { isBookingOpen, closeBooking, bookingExperience } = useNavigation();
  const { setCursor, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: bookingExperience,
    date: '',
    guests: '2',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // keep open for message then can close
    }, 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99992,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(23, 32, 25, 0.65)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease'
      }}
      onClick={closeBooking}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: 'var(--chalk)',
          color: 'var(--forest)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(28px, 4vw, 48px)',
          overflowY: 'auto',
          boxShadow: '-20px 0 50px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <span className="mono-micro" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '6px' }}>
              VISIT THE ESTATE
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', margin: 0 }}>
              Request an Experience
            </h3>
          </div>

          <button
            onClick={closeBooking}
            style={{
              padding: '8px',
              border: '1px solid rgba(37,49,38,0.2)',
              borderRadius: '2px',
              color: 'var(--forest)'
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div
            style={{
              margin: 'auto 0',
              textAlign: 'center',
              padding: '40px 20px',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            <CheckCircle2 size={48} color="var(--terracotta)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '12px' }}>
              We have received your note.
            </h4>
            <p className="type-body" style={{ color: 'var(--forest)', opacity: 0.85, maxWidth: '380px', margin: '0 auto 28px' }}>
              Silvia or Matteo will review availability for <em>{formData.experience || bookingExperience}</em> and write back with confirmation details within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                closeBooking();
              }}
              className="mono-micro"
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--forest)',
                color: 'var(--bone)',
                borderRadius: '2px'
              }}
            >
              RETURN TO ESTATE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                SELECTED EXPERIENCE
              </label>
              <select
                value={formData.experience || bookingExperience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid rgba(37,49,38,0.25)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--forest)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="The Morning Walk">The Morning Walk (06:30 — 09:30)</option>
                <option value="Preserve With Us">Preserve With Us (10:00 — 14:30)</option>
                <option value="The Botanical Table">The Botanical Table (17:30 — 22:30)</option>
                <option value="The Harvest Weekend">The Harvest Weekend (3 Days)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                  GUESTS
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid rgba(37,49,38,0.25)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    color: 'var(--forest)',
                    outline: 'none'
                  }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">3–4 Guests</option>
                  <option value="6">5–6 Guests</option>
                  <option value="private">Private Group (7+)</option>
                </select>
              </div>

              <div>
                <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                  PREFERRED DATE
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid rgba(37,49,38,0.25)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: 'var(--forest)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                FULL NAME
              </label>
              <input
                type="text"
                required
                placeholder="Elena Greco"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid rgba(37,49,38,0.25)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--forest)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="elena@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid rgba(37,49,38,0.25)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--forest)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label className="mono-micro" style={{ display: 'block', marginBottom: '8px', color: 'var(--forest)' }}>
                SPECIAL NOTES & DIETARY PREFERENCES
              </label>
              <textarea
                rows={3}
                placeholder="Any seasonal curiosities or dietary considerations..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid rgba(37,49,38,0.25)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--forest)',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px 28px',
                  backgroundColor: 'var(--terracotta)',
                  color: 'var(--chalk)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease'
                }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <span>REQUEST RESERVATION</span>
                <ArrowUpRight size={16} />
              </button>
              <p
                className="mono-micro"
                style={{
                  textAlign: 'center',
                  marginTop: '12px',
                  color: 'var(--forest)',
                  opacity: 0.6,
                  fontSize: '10px'
                }}
              >
                NO IMMEDIATE PAYMENT REQUIRED // WE CONFIRM PERSONALLY
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
