import React from 'react';
import { SplitTextReveal } from './SplitTextReveal';

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  textColor?: string;
  tagColor?: string;
  style?: React.CSSProperties;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  subtitle,
  alignment = 'left',
  className = '',
  textColor,
  tagColor = 'var(--terracotta)',
  style
}) => {
  return (
    <div
      className={className}
      style={{
        textAlign: alignment,
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
        ...style
      }}
    >
      {(number || tag) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          {number && (
            <span
              className="mono-micro"
              style={{
                color: tagColor,
                fontSize: '11px',
                letterSpacing: '0.18em'
              }}
            >
              {number}
            </span>
          )}
          {number && tag && (
            <span style={{ width: '18px', height: '1px', backgroundColor: 'currentColor', opacity: 0.3 }} />
          )}
          {tag && (
            <span
              className="mono-micro"
              style={{
                color: tagColor,
                fontSize: '11px',
                letterSpacing: '0.18em'
              }}
            >
              {tag}
            </span>
          )}
        </div>
      )}

      <SplitTextReveal
        as="h2"
        className="type-h2"
        style={{ color: textColor || 'inherit', maxWidth: '18ch' }}
      >
        {title}
      </SplitTextReveal>

      {subtitle && (
        <p
          className="type-body"
          style={{
            marginTop: '20px',
            maxWidth: '46ch',
            color: textColor ? textColor : 'var(--forest)',
            opacity: 0.85
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
