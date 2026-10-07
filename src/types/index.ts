export type ProductCategory = 'CITRUS' | 'FIG' | 'OLIVE' | 'HERB' | 'SEASONAL';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  batch: string;
  size: string;
  harvestYear: string;
  ingredients: string[];
  tastingNotes: {
    word: string;
    prominence: 'dominant' | 'accent' | 'subtle';
  }[];
  pairWith: string[];
  origin: string;
  method: string;
  description: string;
  price: string;
  packshotImage: string;
  lifestyleImage: string;
  accentColor: string;
  inStock: boolean;
}

export type JournalCategory = 'LAND' | 'FOOD' | 'PEOPLE' | 'SEASONS' | 'CRAFT' | 'HARVEST';

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  issue: string;
  category: JournalCategory;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  authorRole: string;
  heroImage: string;
  secondaryImage?: string;
  pullQuote: string;
  content: string[];
}

export interface ExperienceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  season: string;
  groupSize: string;
  description: string;
  included: string[];
  imageSunset: string;
  imageNight: string;
  pricePerPerson: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  story: string;
  artefact: string;
  photo: string;
}

export interface PersonItem {
  name: string;
  role: string;
  quote: string;
  photo: string;
  contactNote: string;
}

export interface SeasonalWheelMonth {
  month: string;
  activity: string;
  details: string;
  flora: string;
  climate: string;
}
