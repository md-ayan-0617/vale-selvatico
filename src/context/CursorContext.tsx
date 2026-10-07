import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type CursorVariant = 'default' | 'hover' | 'view' | 'discover' | 'drag' | 'play' | 'read' | 'magnetic' | 'inverted' | 'hidden';

interface CursorContextType {
  cursorText: string;
  cursorVariant: CursorVariant;
  setCursor: (variant?: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  const setCursor = (variant: CursorVariant = 'default', text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
