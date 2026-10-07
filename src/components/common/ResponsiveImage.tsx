import React, { useState } from 'react';

// Reliable verified fallback Mediterranean botanical images by theme
const FALLBACK_IMAGES = {
  general: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85',
  citrus: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1400&q=85',
  olive: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=85',
  fig: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1400&q=85',
  herb: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1400&q=85',
  estate: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85',
  night: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85'
};

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: keyof typeof FALLBACK_IMAGES;
  aspectRatio?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt = 'Vale Selvatico botanical photograph',
  fallbackType = 'general',
  aspectRatio,
  containerClassName = '',
  containerStyle,
  style,
  className = '',
  loading = 'lazy',
  objectFit,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If src prop changes externally, update state
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(FALLBACK_IMAGES[fallbackType] || FALLBACK_IMAGES.general);
    }
  };

  return (
    <div
      className={`responsive-img-wrapper ${containerClassName}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: aspectRatio === 'unset' ? '100%' : undefined,
        aspectRatio: aspectRatio === 'unset' ? undefined : aspectRatio,
        backgroundColor: '#E2DBD0', // Warm bone placeholder
        ...containerStyle
      }}
    >
      {/* Subtle skeleton shimmer while loading */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #E2DBD0 0%, #ECE6DC 50%, #E2DBD0 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s infinite',
            zIndex: 1
          }}
        />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: (objectFit || style?.objectFit || 'cover') as any,
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.2, 0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
          ...style
        }}
        {...props}
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};
