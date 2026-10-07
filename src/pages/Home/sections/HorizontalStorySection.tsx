import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../../hooks/useGSAPContext';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useCursor } from '../../../context/CursorContext';
import { ResponsiveImage } from '../../../components/common/ResponsiveImage';

gsap.registerPlugin(ScrollTrigger);

interface StoryPanel {
  num: string;
  title: string;
  subtitle: string;
  caption: string;
  image: string;
  time: string;
}

const panels: StoryPanel[] = [
  {
    num: '01',
    title: 'BEFORE DAWN',
    subtitle: 'The Orchard Awakening',
    caption: 'At 05:15, workers arrive with willow baskets. Dew coats the bergamot leaves. We harvest before the heat touches the volatile peel oils.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=85',
    time: '05:15 AM // VALLEY DEW'
  },
  {
    num: '02',
    title: 'BY HAND',
    subtitle: 'Gentle Selection',
    caption: 'Curved shears clip each stem. Not a single fruit drops to the ground. Imperfect figs are separated for immediate copper boiling.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=85',
    time: '07:30 AM // HAND CLIPPED'
  },
  {
    num: '03',
    title: 'THE KITCHEN',
    subtitle: 'Embers & Copper Cauldrons',
    caption: 'Unlined copper pans on olive-wood embers. Cold maceration gives way to gentle reduction. No chemical pectin, no artificial speed.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    time: '11:00 AM // COPPER SIMMER'
  },
  {
    num: '04',
    title: 'THE PANTRY',
    subtitle: 'Limestone Vault Maturation',
    caption: 'Sealed in apothecary flacons, jars rest in our 18th-century vaulted cellar. What began as fruit in morning mist is now preserved for decades.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1600&q=85',
    time: '16:00 PM // CELLARED'
  }
];

export const HorizontalStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState('01');
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReduced = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useGSAPContext(
    () => {
      // Only pin and hijack horizontal movement on desktop screens (> 860px)
      if (prefersReduced || !containerRef.current || !trackRef.current || window.innerWidth <= 860) {
        return;
      }

      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.to(track, {
            x: -totalScroll * self.progress,
            ease: 'none',
            overwrite: 'auto'
          });

          setScrollProgress(self.progress);
          const index = Math.min(Math.floor(self.progress * 4), 3);
          setActivePanel(panels[index].num);
        }
      });

      return () => pinTrigger.kill();
    },
    containerRef,
    [prefersReduced]
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        backgroundColor: 'var(--espresso)',
        color: 'var(--chalk)',
        overflow: 'hidden'
      }}
      className="horizontal-story-wrapper"
      onMouseEnter={() => setCursor('drag', 'DRAG')}
      onMouseLeave={resetCursor}
    >
      {/* Top Section Header */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3vh, 32px)',
          left: 'clamp(20px, 5vw, 64px)',
          right: 'clamp(20px, 5vw, 64px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
            CHAPTER 03 // HORIZONTAL STORY
          </span>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(241, 235, 221, 0.3)' }} className="hide-mobile" />
          <span className="mono-micro hide-mobile" style={{ color: 'var(--paper)', opacity: 0.8 }}>
            ONE HARVEST DAY
          </span>
        </div>

        <span className="mono-micro" style={{ color: 'var(--harvest)' }}>
          STAGE {activePanel} / 04
        </span>
      </div>

      {/* Horizontal Story Panels Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          height: '100%',
          minHeight: '100svh',
          alignItems: 'center',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 8vw, 12vw)',
          gap: 'clamp(24px, 4vw, 56px)',
          willChange: 'transform'
        }}
        className="horizontal-track"
      >
        {panels.map((panel) => (
          <div
            key={panel.num}
            style={{
              flex: '0 0 clamp(290px, 72vw, 1080px)',
              height: 'clamp(460px, 74vh, 760px)',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              backgroundColor: '#191411',
              border: '1px solid rgba(241, 235, 221, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}
            className="story-panel-grid"
          >
            {/* Left Photo */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <ResponsiveImage
                src={panel.image}
                alt={panel.title}
                fallbackType="citrus"
                containerStyle={{ width: '100%', height: '100%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(25, 20, 17, 0.75) 0%, transparent 60%)'
                }}
              />
              <span
                className="mono-micro"
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  color: 'var(--harvest)',
                  backgroundColor: 'rgba(25, 20, 17, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  zIndex: 2
                }}
              >
                {panel.time}
              </span>
            </div>

            {/* Right Story Copy */}
            <div
              style={{
                padding: 'clamp(20px, 3.5vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Huge translucent background number */}
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '16px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(70px, 10vw, 150px)',
                  color: 'rgba(241, 235, 221, 0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              >
                {panel.num}
              </span>

              <div>
                <span className="mono-micro" style={{ color: 'var(--harvest)', display: 'block', marginBottom: '8px' }}>
                  STAGE {panel.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 3.2vw, 50px)',
                    lineHeight: 1.05,
                    margin: '0 0 8px 0',
                    color: 'var(--chalk)'
                  }}
                >
                  {panel.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(17px, 1.6vw, 22px)',
                    fontStyle: 'italic',
                    color: 'var(--terracotta)',
                    display: 'block',
                    marginBottom: '16px'
                  }}
                >
                  {panel.subtitle}
                </span>
              </div>

              <p
                className="type-body"
                style={{
                  color: 'var(--bone)',
                  opacity: 0.88,
                  lineHeight: 1.6,
                  fontSize: 'clamp(14px, 1.1vw, 17px)'
                }}
              >
                {panel.caption}
              </p>

              <div style={{ borderTop: '1px solid rgba(241, 235, 221, 0.1)', paddingTop: '14px' }}>
                <span className="mono-micro" style={{ color: 'var(--sage)', fontSize: '10px' }}>
                  VALE SELVATICO HARVEST METHOD
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Progress Bar: 01 ————————— 04 */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 'clamp(20px, 5vw, 64px)',
          right: 'clamp(20px, 5vw, 64px)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 10
        }}
      >
        <span className="mono-micro" style={{ color: 'var(--harvest)' }}>01</span>
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'rgba(241, 235, 221, 0.18)',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              left: 0,
              width: `${Math.max(scrollProgress * 100, 6)}%`,
              height: '3px',
              backgroundColor: 'var(--harvest)',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
        <span className="mono-micro" style={{ color: 'var(--paper)', opacity: 0.6 }}>04</span>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .horizontal-story-wrapper {
            height: auto !important;
            min-height: auto !important;
            padding: 80px 0 40px !important;
          }
          .horizontal-track {
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            height: auto !important;
            min-height: auto !important;
            padding-bottom: 24px !important;
          }
          .story-panel-grid {
            scroll-snap-align: center !important;
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: 520px !important;
            flex: 0 0 84vw !important;
          }
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
