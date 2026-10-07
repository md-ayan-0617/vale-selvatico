import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const routeInfoMap: Record<string, { num: string; title: string }> = {
  '/': { num: '01', title: 'HOME' },
  '/estate': { num: '02', title: 'ESTATE' },
  '/harvest': { num: '03', title: 'HARVEST' },
  '/pantry': { num: '04', title: 'PANTRY' },
  '/experience': { num: '05', title: 'EXPERIENCE' },
  '/journal': { num: '06', title: 'JOURNAL' },
  '/contact': { num: '07', title: 'CONTACT' }
};

export const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayedInfo, setDisplayedInfo] = useState<{ num: string; title: string }>({
    num: '01',
    title: 'HOME'
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid running transition on initial page mount (let preloader handle it)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Determine current route label
    let info = routeInfoMap[location.pathname];
    if (!info) {
      if (location.pathname.startsWith('/pantry/')) {
        info = { num: '04', title: 'BOTANICAL OBJECT' };
      } else if (location.pathname.startsWith('/journal/')) {
        info = { num: '06', title: 'FIELD NOTE' };
      } else {
        info = { num: '00', title: 'THE VALLEY' };
      }
    }
    setDisplayedInfo(info);

    // Scroll to top on route change
    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // Terracotta panel slides upward
    tl.set(panelRef.current, {
      y: '100%',
      display: 'flex'
    });

    tl.to(panelRef.current, {
      y: '0%',
      duration: 0.48,
      ease: 'power3.inOut'
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.15'
    );

    // Slide away revealing next page
    tl.to(panelRef.current, {
      y: '-100%',
      duration: 0.55,
      ease: 'power3.inOut',
      delay: 0.2
    });

    tl.set(panelRef.current, { display: 'none' });
  }, [location.pathname]);

  return (
    <>
      {/* Terracotta Page Transition Panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--terracotta)',
          color: 'var(--chalk)',
          zIndex: 99995,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <div ref={textRef} style={{ textAlign: 'center' }}>
          <span
            className="mono-micro"
            style={{
              fontSize: '14px',
              letterSpacing: '0.22em',
              color: 'var(--harvest)',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            {displayedInfo.num}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              letterSpacing: '0.02em',
              color: 'var(--chalk)',
              lineHeight: 1,
              margin: 0
            }}
          >
            {displayedInfo.title}
          </h2>
        </div>
      </div>

      {children}
    </>
  );
};
