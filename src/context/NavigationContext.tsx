import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface NavigationContextType {
  currentChapter: string;
  setCurrentChapter: (ch: string) => void;
  activeSectionNumber: string;
  setActiveSectionNumber: (num: string) => void;
  isPreloaded: boolean;
  setIsPreloaded: (loaded: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  bookingExperience: string;
  openBooking: (exp?: string) => void;
  closeBooking: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState<string>('ESTATE / SICILY');
  const [activeSectionNumber, setActiveSectionNumber] = useState<string>('01');
  const [isPreloaded, setIsPreloaded] = useState<boolean>(() => {
    return sessionStorage.getItem('vale_preloaded') === 'true';
  });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingExperience, setBookingExperience] = useState<string>('The Botanical Table');

  const openBooking = (exp?: string) => {
    if (exp) setBookingExperience(exp);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentChapter,
        setCurrentChapter,
        activeSectionNumber,
        setActiveSectionNumber,
        isPreloaded,
        setIsPreloaded,
        isMenuOpen,
        setIsMenuOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingExperience,
        openBooking,
        closeBooking
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
