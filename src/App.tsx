import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import { NavigationProvider } from './context/NavigationContext';
import { useLenis } from './hooks/useLenis';

// Common Components
import { Header } from './components/common/Header';
import { MegaMenu } from './components/common/MegaMenu';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { PageTransition } from './components/common/PageTransition';
import { NoiseLayer } from './components/common/NoiseLayer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { BookingDrawer } from './components/common/BookingDrawer';

// Pages
import { Home } from './pages/Home/Home';
import { Estate } from './pages/Estate/Estate';
import { Harvest } from './pages/Harvest/Harvest';
import { Pantry } from './pages/Pantry/Pantry';
import { ProductDetail } from './pages/Pantry/ProductDetail';
import { Experience } from './pages/Experience/Experience';
import { Journal } from './pages/Journal/Journal';
import { JournalArticle } from './pages/Journal/JournalArticle';
import { Contact } from './pages/Contact/Contact';
import { NotFound } from './pages/NotFound/NotFound';

const AppContent: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  const location = useLocation();

  // Dynamic root CSS variable updates based on route light quality
  React.useEffect(() => {
    const root = document.documentElement;
    const path = location.pathname;

    if (path === '/') {
      // Home: Early morning sunlight (Bone / Forest / Terracotta)
      root.style.setProperty('--bg-current', '#F1EBDD');
      root.style.setProperty('--text-current', '#253126');
      root.style.setProperty('--accent-current', '#A95337');
    } else if (path === '/estate') {
      // Estate: Warm afternoon (Forest / Bone / Sage)
      root.style.setProperty('--bg-current', '#253126');
      root.style.setProperty('--text-current', '#F1EBDD');
      root.style.setProperty('--accent-current', '#8E9B7B');
    } else if (path === '/harvest') {
      // Harvest: Golden-hour intensity (Harvest yellow / Terracotta / Espresso)
      root.style.setProperty('--bg-current', '#D3A43B');
      root.style.setProperty('--text-current', '#211A16');
      root.style.setProperty('--accent-current', '#A95337');
    } else if (path.startsWith('/pantry')) {
      // Pantry: Soft studio daylight (Chalk / Espresso / Terracotta)
      root.style.setProperty('--bg-current', '#FAF7F0');
      root.style.setProperty('--text-current', '#211A16');
      root.style.setProperty('--accent-current', '#A95337');
    } else if (path === '/experience') {
      // Experience: Sunset (Deep Fig / Warm paper / Terracotta)
      root.style.setProperty('--bg-current', '#633F4B');
      root.style.setProperty('--text-current', '#F1EBDD');
      root.style.setProperty('--accent-current', '#A95337');
    } else if (path.startsWith('/journal')) {
      // Journal: Editorial paper atmosphere (Paper / Ink / Sage)
      root.style.setProperty('--bg-current', '#E6DFD1');
      root.style.setProperty('--text-current', '#1D1D19');
      root.style.setProperty('--accent-current', '#8E9B7B');
    } else if (path === '/contact') {
      // Contact: Nightfall (Forest Deep / Bone / Harvest)
      root.style.setProperty('--bg-current', '#172019');
      root.style.setProperty('--text-current', '#F1EBDD');
      root.style.setProperty('--accent-current', '#D3A43B');
    }
  }, [location.pathname]);

  return (
    <>
      {/* Visual Enhancers */}
      <NoiseLayer />
      <CustomCursor />
      <ScrollProgress />
      <Preloader />

      {/* Global Navigation and Drawers */}
      <Header />
      <MegaMenu />
      <BookingDrawer />

      {/* Route Views with Cinematic Page Transitions */}
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estate" element={<Estate />} />
          <Route path="/harvest" element={<Harvest />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/pantry/:slug" element={<ProductDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>

      <Footer />
    </>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <CursorProvider>
          <AppContent />
        </CursorProvider>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
