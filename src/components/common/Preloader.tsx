import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SeedObject3D } from '../three/SeedObject3D';
import gsap from 'gsap';

export const Preloader: React.FC = () => {
  const { isPreloaded, setIsPreloaded } = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreloaded) {
      setIsDone(true);
      return;
    }

    const duration = 1800; // 1.8 seconds initial load
    const startTime = performance.now();

    const updateTimer = (now: number) => {
      const elapsed = now - startTime;
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current < 100) {
        requestAnimationFrame(updateTimer);
      } else {
        // Complete animation: Split preloader panels
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              sessionStorage.setItem('vale_preloaded', 'true');
              setIsPreloaded(true);
              setIsDone(true);
            }
          });

          tl.to([topHalfRef.current, bottomHalfRef.current], {
            y: (i) => (i === 0 ? '-101%' : '101%'),
            duration: 1.1,
            ease: 'power3.inOut',
            stagger: 0.05
          });

          tl.to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out'
            },
            '-=0.3'
          );
        }, 300);
      }
    };

    requestAnimationFrame(updateTimer);
  }, [isPreloaded, setIsPreloaded]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'var(--forest)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bone)'
      }}
    >
      {/* Top Split Panel */}
      <div
        ref={topHalfRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: 'var(--forest)',
          borderBottom: '1px solid rgba(241, 235, 221, 0.08)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '2px',
          overflow: 'hidden'
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 76px)',
            letterSpacing: '0.04em',
            margin: 0,
            lineHeight: 1,
            transform: 'translateY(50%)',
            color: 'var(--bone)',
            userSelect: 'none'
          }}
        >
          VALE SELVATICO
        </h1>
      </div>

      {/* Bottom Split Panel */}
      <div
        ref={bottomHalfRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: 'var(--forest)',
          borderTop: '1px solid rgba(241, 235, 221, 0.08)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '2px',
          overflow: 'hidden'
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 76px)',
            letterSpacing: '0.04em',
            margin: 0,
            lineHeight: 1,
            transform: 'translateY(-50%)',
            color: 'var(--bone)',
            userSelect: 'none'
          }}
        >
          VALE SELVATICO
        </h1>

        <div style={{ marginTop: '38px', textAlign: 'center' }}>
          <p
            className="mono-micro"
            style={{
              color: 'var(--harvest)',
              letterSpacing: '0.22em',
              fontSize: '11px'
            }}
          >
            LOADING THE VALLEY
          </p>
        </div>
      </div>

      {/* Center 3D Botanical Seed Object */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <SeedObject3D progress={progress} />
      </div>

      {/* Bottom Left Coordinates & Bottom Right Counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '36px',
          zIndex: 3
        }}
      >
        <span
          className="mono-micro"
          style={{ color: 'rgba(241, 235, 221, 0.65)', letterSpacing: '0.15em' }}
        >
          38°04&apos; N &nbsp; 14°59&apos; E
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '36px',
          zIndex: 3
        }}
      >
        <span
          className="mono-micro"
          style={{
            color: 'var(--harvest)',
            fontSize: '14px',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {progress.toString().padStart(2, '0')} %
        </span>
      </div>
    </div>
  );
};
