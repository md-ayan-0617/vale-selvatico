import type { SeasonalWheelMonth } from '../types';

export const seasonalMonths: SeasonalWheelMonth[] = [
  {
    month: 'JAN',
    activity: 'Rest & Winter Soil Cover',
    details: 'Wild vetch and clover cover the terraces. Winter rains replenish subterranean limestone aquifers.',
    flora: 'Wild Borage & Mustard Greens',
    climate: '11°C / Crisp Mountain Air'
  },
  {
    month: 'FEB',
    activity: 'Pruning of Heritage Olives',
    details: 'Selective pruning opens the canopy to sunlight. Olive wood clippings are cured for smoking preserves.',
    flora: 'Flowering Almond Blossoms',
    climate: '13°C / Sun & Mist'
  },
  {
    month: 'MAR',
    activity: 'Wild Herb Awakening',
    details: 'First tender shoots of wild fennel, savory, and mountain thyme appear on stone terrace walls.',
    flora: 'Mountain Thyme & Rock Samphire',
    climate: '16°C / Early Spring Sun'
  },
  {
    month: 'APR',
    activity: 'Citrus & Orange Blossom Bloom',
    details: 'The entire valley fills with the heady aroma of zagara (citrus blossom). Native bees pollinate the orchards.',
    flora: 'Bergamot & Tarocco Blossoms',
    climate: '19°C / Floral Breeze'
  },
  {
    month: 'MAY',
    activity: 'Caper Bud Gathering',
    details: 'Hand-picking tight green caper buds from stone joints before sunrise. Salt curing in Trapani crystals.',
    flora: 'Wild Caper Vines & Poppies',
    climate: '23°C / Warm Sunlight'
  },
  {
    month: 'JUN',
    activity: 'Early Summer Orchard Canopy',
    details: 'Fig leaves broaden to shield maturing fruit from intense solar radiation. Morning dew collection.',
    flora: 'Fig Foliage & Lavender',
    climate: '28°C / High Sun'
  },
  {
    month: 'JUL',
    activity: 'Wild Herb Dehydration',
    details: 'Harvesting flowering oregano and bay laurel at maximum essential oil concentration. Sun curing in attic.',
    flora: 'Bay Laurel & Wild Oregano',
    climate: '32°C / Dry Scirocco'
  },
  {
    month: 'AUG',
    activity: 'Fig Harvest & Cauldron Simmering',
    details: 'Dottato figs split naturally under dry heat. Daily picking and evening reduction in copper pots.',
    flora: 'Honey-Dripping Figs & Horn Peppers',
    climate: '34°C / Golden Heat'
  },
  {
    month: 'SEP',
    activity: 'Early Bergamot & Pepper Harvest',
    details: 'Green peel bergamots gathered at dawn. Roasting peppers over seasoned olive-wood fires.',
    flora: 'Calabrian Bergamot & Sweet Peppers',
    climate: '29°C / Golden Hour Intensity'
  },
  {
    month: 'OCT',
    activity: 'Emerald Olive Pressing',
    details: 'Early green harvest of Nocellara olives. First cold-crush produces peppery emerald nectar within hours.',
    flora: 'Nocellara & Biancolilla Olives',
    climate: '24°C / Autumn Equinox Sun'
  },
  {
    month: 'NOV',
    activity: 'Late Citrus & Jar Cellaring',
    details: 'Tarocco blood oranges ripen with chill nights. Final preservation batches sealed and labeled for cellaring.',
    flora: 'Blood Oranges & Pomegranates',
    climate: '18°C / Cool Rains'
  },
  {
    month: 'DEC',
    activity: 'Solstice Rest & Cellar Aging',
    details: 'Preserves and botanical syrups mature in the stone cantina. The land sleeps beneath winter sky.',
    flora: 'Lichen & Dormant Olive Bark',
    climate: '12°C / Valley Mist'
  }
];

export const harvestChapters = [
  {
    number: '01',
    period: 'WINTER',
    title: 'THE PRUNING',
    subtitle: 'Clearing the canopy for sunlight',
    description: 'Before the sap rises, we shape each tree by hand. The cut branches are not discarded; they cure for nine months to fuel the autumn preserve cauldrons.',
    colorBg: '#211A16',
    textColor: '#F1EBDD',
    accentColor: '#D3A43B',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85'
  },
  {
    number: '02',
    period: 'SPRING',
    title: 'THE BLOOM',
    subtitle: 'Zagara scent in the morning air',
    description: 'In April, hundreds of citrus trees blossom simultaneously. The scent travels across three valleys. Wild mountain bees populate forty hand-built hives.',
    colorBg: '#253126',
    textColor: '#FAF7F0',
    accentColor: '#8E9B7B',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1400&q=85'
  },
  {
    number: '03',
    period: 'EARLY SUMMER',
    title: 'THE RESIN & HERB',
    subtitle: 'Essential oils concentrated by sun',
    description: 'As rainfall drops to zero, the wild plants synthesize defensive aromatic oils. Thyme, savory, and fennel become almost medicinal in strength.',
    colorBg: '#633F4B',
    textColor: '#FAF7F0',
    accentColor: '#D3A43B',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1400&q=85'
  },
  {
    number: '04',
    period: 'LATE SUMMER',
    title: 'THE SPLIT FIG',
    subtitle: 'Sugars caramelized on the branch',
    description: 'The August heat turns fig skin into sheer silk. Every afternoon, baskets of fruit enter the stone cantina to begin their sixty-hour slow reduction.',
    colorBg: '#A95337',
    textColor: '#FAF7F0',
    accentColor: '#D3A43B',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1400&q=85'
  },
  {
    number: '05',
    period: 'AUTUMN',
    title: 'THE HARVEST DAWN',
    subtitle: 'Bergamot and early green olives',
    description: 'Our most intense four weeks. Crews harvest at 5:00 AM. Bergamot peel and cold olive milling take place while the morning dew is still cool.',
    colorBg: '#D3A43B',
    textColor: '#211A16',
    accentColor: '#A95337',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85'
  },
  {
    number: '06',
    period: 'LATE AUTUMN',
    title: 'THE CELLARING',
    subtitle: 'Small batches rest in cool limestone',
    description: 'Jars are labeled, dated, and stored in vaulted cellars where the temperature never fluctuates. The harvest of 365 days is now sealed and complete.',
    colorBg: '#172019',
    textColor: '#F1EBDD',
    accentColor: '#D3A43B',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1400&q=85'
  }
];

export const processStages = [
  { step: '01', title: 'TREE & VINE', description: 'Grown on dry terraces without synthetic irrigation or sprays.' },
  { step: '02', title: 'DAWN SELECTION', description: 'Picked by hand into willow baskets while dew preserves aromatics.' },
  { step: '03', title: 'SPRING WASH', description: 'Cleaned only in cold mountain spring water drawn from on-site wells.' },
  { step: '04', title: 'PREPARATION', description: 'Hand-peeled rinds, stone-cracked olives, and whole-fruit sorting.' },
  { step: '05', title: 'COPPER PRESERVE', description: 'Simmered gently in unlined copper cauldrons over olive-wood coals.' },
  { step: '06', title: 'REST & CELLAR', description: 'Left to mellow for sixty to ninety days in cool stone vaults.' },
  { step: '07', title: 'THE TABLE', description: 'Opened in kitchens where patience and Mediterranean sun are honored.' }
];

export const agriculturalMetrics = [
  { value: '67%', label: 'ESTATE PLANTED WITH PERMANENT CROPS', detail: 'Deep perennial root systems locking hillside soil and preventing erosion.' },
  { value: '0', label: 'SYNTHETIC HERBICIDES & PESTICIDES', detail: 'Managed exclusively through manual weeding, cover crops and native predation.' },
  { value: '14', label: 'NATIVE WILD HERB SPECIES RESTORED', detail: 'Wild mountain biodiversity encouraged between olive tree rows.' },
  { value: '3', label: 'GENERATIONS CURRENTLY WORKING', detail: 'Living knowledge passed directly from hand to hand on this soil.' }
];
