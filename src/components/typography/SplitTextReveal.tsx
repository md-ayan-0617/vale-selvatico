import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  triggerOnScroll?: boolean;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  style,
  delay = 0,
  triggerOnScroll = true
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current) return;

      const words = containerRef.current.querySelectorAll('.split-word-inner');

      const tl = gsap.timeline({
        scrollTrigger: triggerOnScroll
          ? {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          : undefined,
        delay
      });

      tl.fromTo(
        words,
        {
          yPercent: 115,
          rotation: 2.5,
          opacity: 0
        },
        {
          yPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.045,
          ease: 'power3.out'
        }
      );
    },
    containerRef,
    [children, delay, prefersReduced]
  );

  if (prefersReduced) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  // Split string into words preserving spaces and italic markdown
  const words = children.split(' ');

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em', ...style }}
    >
      {words.map((word, i) => {
        const isItalic = word.startsWith('*') && word.endsWith('*');
        const cleanWord = isItalic ? word.slice(1, -1) : word;

        return (
          <span
            key={i}
            className="split-word-wrap"
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <span
              className="split-word-inner"
              style={{
                display: 'inline-block',
                fontStyle: isItalic ? 'italic' : undefined,
                fontFamily: isItalic ? 'var(--font-display)' : undefined,
                willChange: 'transform'
              }}
            >
              {cleanWord}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
