import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const PreFooterStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReduced || !containerRef.current) return;

      // Color transition from Bone to Forest Deep on scroll
      gsap.to(containerRef.current, {
        backgroundColor: '#172019',
        color: '#F1EBDD',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: true
        }
      });
    },
    containerRef,
    [prefersReduced]
  );

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bone)',
        color: 'var(--forest)',
        padding: 'clamp(120px, 18vh, 240px) clamp(24px, 5vw, 64px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        position: 'relative'
      }}
    >
      <span
        className="mono-micro"
        style={{
          color: 'var(--terracotta)',
          letterSpacing: '0.24em',
          marginBottom: '24px'
        }}
      >
        AN OPEN GATE
      </span>

      <h2
        ref={textRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 10vw, 150px)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: 0,
          maxWidth: '14ch'
        }}
      >
        WE&apos;LL<br />
        SEE YOU<br />
        <em style={{ color: 'var(--harvest)', fontStyle: 'italic' }}>*in the valley.*</em>
      </h2>
    </section>
  );
};
