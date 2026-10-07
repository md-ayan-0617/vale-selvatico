import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-01',
    slug: 'bergamot-no-04',
    name: 'Bergamot No. 04',
    subtitle: 'Small-Batch Botanical Syrup',
    category: 'CITRUS',
    batch: 'BATCH 04',
    size: '375 ML',
    harvestYear: '2026',
    ingredients: [
      'Estate Calabrian & Sicilian Bergamot Rind',
      'Wild Mountain Thyme',
      'Organic Unrefined Cane Sugar',
      'Madonie Mountain Spring Water'
    ],
    tastingNotes: [
      { word: 'BRIGHT CITRUS', prominence: 'dominant' },
      { word: 'BITTER PEEL', prominence: 'accent' },
      { word: 'FLORAL RESIN', prominence: 'accent' },
      { word: 'HERBAL TEA', prominence: 'subtle' }
    ],
    pairWith: [
      'Aged Sheep’s Milk Pecorino',
      'Chilled Sparkling Spring Water',
      'Bitter Aperitivo Spritz',
      'Charred Lemon Tart'
    ],
    origin: 'Contrada Selvatico, Terraced Grove Block 03',
    method: 'Macerated cold for 72 hours before gentle reduction over olive-wood embers. Unfiltered.',
    description: 'Harvested at dawn while dew preserves the essential oils in the aromatic rind. Intense, floral, and deeply grounding without excess sweetness.',
    price: '€34',
    packshotImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#D3A43B',
    inStock: true
  },
  {
    id: 'prod-02',
    slug: 'wild-fig-preserve',
    name: 'Wild Fig Preserve',
    subtitle: 'Slow-Cooked with Mountain Fennel Pollen',
    category: 'FIG',
    batch: 'BATCH 02',
    size: '280 G',
    harvestYear: '2026',
    ingredients: [
      'Late-Summer Dottato Figs',
      'Wild Fennel Pollen gathered on hillside',
      'Raw Lemon Juice',
      'Organic Cane Sugar'
    ],
    tastingNotes: [
      { word: 'DEEP CARAMEL', prominence: 'dominant' },
      { word: 'ANISE & HERB', prominence: 'accent' },
      { word: 'CRUNCHY SEED', prominence: 'accent' },
      { word: 'SUN-DRIED STONE', prominence: 'subtle' }
    ],
    pairWith: [
      'Fresh Sheep Ricotta',
      'Charred Sourdough',
      'Roasted Lamb Chops',
      'Gorgonzola Dolce'
    ],
    origin: 'Eastern Slope, Fig Orchard planted 1976',
    method: 'Simmered in copper cauldrons in two distinct stages to maintain whole fruit texture.',
    description: 'Picked only when the fruit skin splits naturally on the branch under the August heat. Velvety, unctuous and aromatic with hillside fennel pollen.',
    price: '€22',
    packshotImage: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#633F4B',
    inStock: true
  },
  {
    id: 'prod-03',
    slug: 'green-olive-conserva',
    name: 'Green Olive Conserva',
    subtitle: 'Nocellara del Belice & Wild Oregano',
    category: 'OLIVE',
    batch: 'BATCH 08',
    size: '340 G',
    harvestYear: '2026',
    ingredients: [
      'Hand-Picked Nocellara Olives',
      'First-Press Cold Extra Virgin Olive Oil',
      'Wild Mountain Oregano',
      'Trapani Sea Salt',
      'Garlic Cloves'
    ],
    tastingNotes: [
      { word: 'BUTTERY FLESH', prominence: 'dominant' },
      { word: 'GRASSY BITTER', prominence: 'accent' },
      { word: 'MINERAL SEA SALT', prominence: 'accent' },
      { word: 'PUNGENT HERB', prominence: 'subtle' }
    ],
    pairWith: [
      'Crusty Semolina Bread',
      'Dry Marsala Wine',
      'Raw Fennel Slices',
      'Roasted Sea Bass'
    ],
    origin: 'Ancient Terraces, Century-Old Olive Grove',
    method: 'Cracked by hand with river stone, cured gently in spring brine, then packed in virgin olive oil.',
    description: 'Bright green, firm and brimming with the buttery freshness of early October olive harvest. Preserved in estate oil pressed within four hours of harvest.',
    price: '€26',
    packshotImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#8E9B7B',
    inStock: true
  },
  {
    id: 'prod-04',
    slug: 'rosemary-oil',
    name: 'Rosemary Cold-Pressed Botanical Oil',
    subtitle: 'Early Harvest Biancolilla Infusion',
    category: 'HERB',
    batch: 'BATCH 03',
    size: '250 ML',
    harvestYear: '2026',
    ingredients: [
      '100% Biancolilla Extra Virgin Olive Oil',
      'Wild Flowering Hillside Rosemary'
    ],
    tastingNotes: [
      { word: 'RESINOUS PINE', prominence: 'dominant' },
      { word: 'GREEN TOMATO', prominence: 'accent' },
      { word: 'PEPPER FINISH', prominence: 'accent' },
      { word: 'WOODLAND FLORAL', prominence: 'subtle' }
    ],
    pairWith: [
      'White Bean Puree',
      'Grilled Whole Bream',
      'Charred Polenta',
      'Flaky Sea Salt on Warm Focaccia'
    ],
    origin: 'Southern Terrace & Rocky Outcrop Ridge',
    method: 'Simultaneous cold-milling: fresh rosemary sprigs crushed directly alongside freshly picked green olives.',
    description: 'Not an afterthought infusion. The rosemary is milled together with the olives in our granite stone wheel, yielding an integrated, peppery botanical nectar.',
    price: '€38',
    packshotImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#253126',
    inStock: true
  },
  {
    id: 'prod-05',
    slug: 'blood-orange-marmalade',
    name: 'Tarocco Blood Orange Marmalade',
    subtitle: 'Coarse Cut Peel & Etna Volcanic Honey',
    category: 'CITRUS',
    batch: 'BATCH 05',
    size: '310 G',
    harvestYear: '2026',
    ingredients: [
      'Tarocco Blood Oranges',
      'Raw Orange Blossom Honey',
      'Organic Unrefined Sugar',
      'Fresh Lemon Juice'
    ],
    tastingNotes: [
      { word: 'TART RASPBERRY-CITRUS', prominence: 'dominant' },
      { word: 'GENTLE BITTER', prominence: 'accent' },
      { word: 'FLORAL HONEY', prominence: 'accent' },
      { word: 'WARM CARAMEL', prominence: 'subtle' }
    ],
    pairWith: [
      'Cultured Salted Butter & Toast',
      'Duck Breast with Crisp Skin',
      'Aged Caciocavallo Ragusano',
      'Semolina Pancakes'
    ],
    origin: 'Valley Floor Citrus Orchards, Volcanic Soil Pocket',
    method: 'Three-day maceration with skin strips cooked in copper until gem-like and translucent.',
    description: 'Crimson-hued, thick with ruby peel, balance struck between deep volcanic acidity and dark floral honey warmth.',
    price: '€24',
    packshotImage: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#A95337',
    inStock: true
  },
  {
    id: 'prod-06',
    slug: 'fennel-botanical-syrup',
    name: 'Fennel Botanical Syrup',
    subtitle: 'Crushed Wild Seed & Spring Water',
    category: 'HERB',
    batch: 'BATCH 01',
    size: '375 ML',
    harvestYear: '2026',
    ingredients: [
      'Wild Mountain Fennel Seeds',
      'Fennel Fronds',
      'Cane Sugar',
      'Spring Water',
      'Lemon Peel'
    ],
    tastingNotes: [
      { word: 'COOL ANISE', prominence: 'dominant' },
      { word: 'SWEET EARTH', prominence: 'accent' },
      { word: 'HERBACEOUS DEW', prominence: 'accent' },
      { word: 'WARM SPICE', prominence: 'subtle' }
    ],
    pairWith: [
      'Grapefruit Soda Spritzer',
      'Poached White Peaches',
      'Olive Oil Cake Glaze',
      'Greek Yogurt & Walnut'
    ],
    origin: 'Wild Hillside Pastures and Dry Stone Walls',
    method: 'Lightly roasted seeds steeped for 48 hours to extract clear, cooling essential oils.',
    description: 'The taste of a late afternoon walk through dry Sicilian grasses. Refreshing, digestive, and evocative of sun-baked stone.',
    price: '€32',
    packshotImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#8E9B7B',
    inStock: true
  },
  {
    id: 'prod-07',
    slug: 'roasted-pepper-conserva',
    name: 'Sun-Ripened Pepper Conserva',
    subtitle: 'Charred over Pruned Olive Wood',
    category: 'SEASONAL',
    batch: 'BATCH 06',
    size: '300 G',
    harvestYear: '2026',
    ingredients: [
      'Sicilian Horn Peppers (Red & Yellow)',
      'Cold-Pressed Olive Oil',
      'Wild Garlic',
      'Capers in Sea Salt',
      'White Wine Vinegar'
    ],
    tastingNotes: [
      { word: 'SMOKY CHAR', prominence: 'dominant' },
      { word: 'NATURAL FRUIT SWEETNESS', prominence: 'accent' },
      { word: 'BRINY CAPER', prominence: 'accent' },
      { word: 'SHARP VINEGAR SNAP', prominence: 'subtle' }
    ],
    pairWith: [
      'Grilled Mackerel or Sardines',
      'Warm Burrata Pugliese',
      'Rustic Country Loaf',
      'Roasted Fennel Sausages'
    ],
    origin: 'Kitchen Garden Plots, South-Facing Terrace',
    method: 'Charred whole over glowing olive branches, peeled by hand, packed with Salina capers and virgin oil.',
    description: 'Silky ribbons of sweet pepper imbued with the fragrance of olive wood smoke and salt-kissed capers.',
    price: '€25',
    packshotImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#A95337',
    inStock: true
  },
  {
    id: 'prod-08',
    slug: 'lemon-laurel-preserve',
    name: 'Femminello Lemon + Bay Laurel',
    subtitle: 'Salted Whole Citrus Preserve',
    category: 'CITRUS',
    batch: 'BATCH 07',
    size: '260 G',
    harvestYear: '2026',
    ingredients: [
      'Femminello Siracusano Lemons',
      'Aromatic Bay Laurel Leaves',
      'Trapani Coarse Sea Salt',
      'Fresh Lemon Juice'
    ],
    tastingNotes: [
      { word: 'ELECTRIC ACIDITY', prominence: 'dominant' },
      { word: 'BALSAMIC BAY LEAF', prominence: 'accent' },
      { word: 'PITH BITTERNESS', prominence: 'accent' },
      { word: 'MEDITERRANEAN SEA SALT', prominence: 'subtle' }
    ],
    pairWith: [
      'Slow-Braised Chicken with Olives',
      'Couscous with Wild Greens',
      'Grilled Calamari',
      'Ricotta Gnocchi'
    ],
    origin: 'Lower Grove, Old Water Mill Orchard',
    method: 'Fermented gently in sea salt and their own juice with wild laurel branches for 90 days.',
    description: 'Transformative culinary seasoning. The entire fruit softens until the rind turns translucent, adding complex savory depth to stews, grains, and marinades.',
    price: '€21',
    packshotImage: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#D3A43B',
    inStock: true
  }
];
