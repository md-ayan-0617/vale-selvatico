import React, { useEffect, useState, useRef } from 'react';

export interface TypingTextProps {
  phrases?: string[];
  texts?: string[];
  typingSpeed?: number;
  speed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  phrases,
  texts,
  typingSpeed,
  speed,
  deletingSpeed = 30,
  pauseDuration = 1600,
  loop = true,
  prefix = '',
  className = '',
  style,
  cursorColor = 'var(--terracotta)'
}) => {
  const resolvedPhrases = phrases || texts || ['Vale Selvatico'];
  const resolvedSpeed = typingSpeed || speed || 45;

  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || resolvedPhrases.length === 0 || isComplete) return;

    const currentPhrase = resolvedPhrases[phraseIndex % resolvedPhrases.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));

          if (displayText.length + 1 === currentPhrase.length) {
            if (!loop && phraseIndex === resolvedPhrases.length - 1) {
              setIsComplete(true);
              return;
            }
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));

          if (displayText.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % resolvedPhrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : resolvedSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    phraseIndex,
    resolvedPhrases,
    resolvedSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    hasStarted,
    isComplete
  ]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-flex', alignItems: 'baseline', ...style }}>
      {prefix && <span style={{ marginRight: '6px' }}>{prefix}</span>}
      <span>{displayText}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.05em',
          backgroundColor: cursorColor,
          marginLeft: '4px',
          verticalAlign: 'text-bottom',
          animation: isComplete ? 'none' : 'typingCursorBlink 0.8s infinite',
          opacity: isComplete ? 0.3 : 1
        }}
      />
      <style>{`
        @keyframes typingCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};
