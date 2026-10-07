import React, { useEffect, useState, useRef } from 'react';

const words = ['bergamot.', 'figs.', 'olives.', 'wild herbs.', 'time.'];

export const TypingSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isFinal, setIsFinal] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const hasStartedRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection observer to only type when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          startTypingCycle();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startTypingCycle = () => {
    let currentWordIdx = 0;
    let currentCharIdx = 0;
    let deleting = false;

    const tick = () => {
      const targetWord = words[currentWordIdx];
      const isLastWord = currentWordIdx === words.length - 1;

      if (!deleting) {
        currentCharIdx++;
        setDisplayText(targetWord.slice(0, currentCharIdx));

        if (currentCharIdx === targetWord.length) {
          if (isLastWord) {
            setIsFinal(true);
            setTimeout(() => setCursorVisible(false), 1200);
            return; // Finished! "time." stays
          }
          // Pause before deleting
          deleting = true;
          setTimeout(tick, 750);
          return;
        }
        setTimeout(tick, 50);
      } else {
        currentCharIdx--;
        setDisplayText(targetWord.slice(0, currentCharIdx));

        if (currentCharIdx === 0) {
          deleting = false;
          currentWordIdx++;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 30);
      }
    };

    setTimeout(tick, 400);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
        backgroundColor: 'var(--forest)',
        color: 'var(--bone)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      {/* Background macro botanical leaves with slow zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: 'url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowBotanicalZoom 25s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* Label */}
      <span
        className="mono-micro"
        style={{
          color: 'var(--sage)',
          letterSpacing: '0.24em',
          marginBottom: '28px',
          position: 'relative',
          zIndex: 2
        }}
      >
        WHAT THE LAND GIVES
      </span>

      {/* Poetic statement */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '960px'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            color: 'var(--bone)',
            lineHeight: 1.1,
            marginBottom: '16px'
          }}
        >
          The valley gives us
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '1.2em'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(54px, 8.5vw, 120px)',
              color: 'var(--harvest)',
              fontStyle: 'italic',
              lineHeight: 1
            }}
          >
            {displayText || '\u00A0'}
          </span>

          {/* Thin terracotta vertical cursor */}
          {cursorVisible && (
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: 'clamp(46px, 7vw, 100px)',
                backgroundColor: 'var(--terracotta)',
                marginLeft: '8px',
                animation: isFinal ? 'none' : 'blinkCursor 0.75s infinite',
                opacity: isFinal ? 0.3 : 1,
                transition: 'opacity 1s ease'
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slowBotanicalZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
};
