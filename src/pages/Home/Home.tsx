import React, { useEffect } from 'react';
import { HeroSection } from './sections/HeroSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { TypingSection } from './sections/TypingSection';
import { LandscapePortalSection } from './sections/LandscapePortalSection';
import { ProductsLandSection } from './sections/ProductsLandSection';
import { HorizontalStorySection } from './sections/HorizontalStorySection';
import { FeatureProduct3DSection } from './sections/FeatureProduct3DSection';
import { ManifestoSection } from './sections/ManifestoSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { JournalPreviewSection } from './sections/JournalPreviewSection';
import { PreFooterStatement } from './sections/PreFooterStatement';
import { useNavigation } from '../../context/NavigationContext';

export const Home: React.FC = () => {
  const { setCurrentChapter, setActiveSectionNumber } = useNavigation();

  useEffect(() => {
    document.title = 'VALE SELVATICO — Mediterranean Botanical Estate & Small-Batch Apothecary';
    setCurrentChapter('SOLAR HARVEST // HOME');
    setActiveSectionNumber('01');
  }, [setCurrentChapter, setActiveSectionNumber]);

  return (
    <main style={{ backgroundColor: 'var(--bone)' }}>
      <HeroSection />
      <PhilosophySection />
      <TypingSection />
      <LandscapePortalSection />
      <ProductsLandSection />
      <HorizontalStorySection />
      <FeatureProduct3DSection />
      <ManifestoSection />
      <ExperienceSection />
      <JournalPreviewSection />
      <PreFooterStatement />
    </main>
  );
};
