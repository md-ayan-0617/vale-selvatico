import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useIsTouch } from '../../hooks/useIsTouch';

export const CustomCursor: React.FC = () => {
  const isTouch = useIsTouch();
  const { cursorText, cursorVariant } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    // Mark body to hide native cursor
    document.body.classList.add('has-custom-cursor');
    setIsInitialized(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      // Spring lerp
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrame = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrame = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [isTouch]);

  if (isTouch || !isInitialized || cursorVariant === 'hidden') {
    return null;
  }

  // Determine ring size and style based on variant
  let ringSize = 32;
  let showText = false;
  let bgFill = 'transparent';
  let borderColor = 'var(--forest)';
  let textColor = 'var(--chalk)';

  if (cursorVariant === 'hover' || cursorVariant === 'magnetic') {
    ringSize = 48;
    borderColor = 'var(--terracotta)';
  } else if (
    cursorVariant === 'view' ||
    cursorVariant === 'discover' ||
    cursorVariant === 'drag' ||
    cursorVariant === 'play' ||
    cursorVariant === 'read' ||
    cursorText
  ) {
    ringSize = 82;
    showText = true;
    bgFill = 'rgba(37, 49, 38, 0.88)'; // Forest tinted
    borderColor = 'var(--harvest)';
    textColor = 'var(--bone)';
  }

  return (
    <>
      {/* Precision center dot: 6px terracotta */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          backgroundColor: 'var(--terracotta)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100000,
          transition: 'opacity 0.2s ease'
        }}
      />

      {/* Lagging trailing outer ring / interactive badge */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
          border: `1px solid ${borderColor}`,
          backgroundColor: bgFill,
          backdropFilter: showText ? 'blur(4px)' : 'none',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.28s var(--ease-soft), height 0.28s var(--ease-soft), margin 0.28s var(--ease-soft), background-color 0.28s ease, border-color 0.28s ease'
        }}
      >
        {showText && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: textColor,
              textTransform: 'uppercase',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            {cursorText || cursorVariant.toUpperCase()}
          </span>
        )}
      </div>
    </>
  );
};
