import React, { useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';
import { useIsTouch } from '../../hooks/useIsTouch';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // max movement in px (default 8)
  cursorText?: string;
  cursorVariant?: 'default' | 'hover' | 'magnetic';
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 10,
  cursorText = '',
  cursorVariant = 'magnetic',
  ariaLabel,
  style
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    gsap.to(buttonRef.current, {
      x: deltaX * strength,
      y: deltaY * strength,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setCursor(cursorVariant, cursorText);
  };

  const handleMouseLeave = () => {
    resetCursor();
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    }
  };

  return (
    <div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
    >
      {children}
    </div>
  );
};
