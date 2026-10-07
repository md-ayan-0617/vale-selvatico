import type { TimelineItem, PersonItem } from '../types';

export const timelineItems: TimelineItem[] = [
  {
    year: '1958',
    title: 'The First Stone Terraces',
    story: 'Giuseppe Selvatico clears wild bramble from the south ridge with a team of two mules, uncovering limestone dry walls built two centuries prior.',
    artefact: 'Hand-Forged Pruning Shears',
    photo: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85'
  },
  {
    year: '1976',
    title: 'The Orchard of Forty Figs',
    story: 'After a severe dry summer, Beatrice plants forty heirloom Dottato fig cuttings along the limestone fractures where underground moisture naturally collects.',
    artefact: 'Linen Bound Field Ledger',
    photo: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=85'
  },
  {
    year: '1994',
    title: 'The Old Stone Mill',
    story: 'Restoration of the gravity-fed stone olive mill inside the 18th-century vaulted cantina, preserving cold-pressing methods untouched by industrial speed.',
    artefact: 'Chestnut Olive Crate 1994',
    photo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85'
  },
  {
    year: '2012',
    title: 'Botanical Resurgence',
    story: 'Matteo and Giacomo return to Sicily from botanical studies, mapping forty-six native wild herb species across the estate and pioneering single-orchard botanical macerations.',
    artefact: 'The Original Hand-Sealed Jar No. 01',
    photo: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85'
  },
  {
    year: '2026',
    title: 'The Solar Harvest',
    story: 'Today, the estate operates fully off-grid on passive solar and dry-farming wisdom, sharing small-batch preserves and culinary elixirs with kitchens across Europe.',
    artefact: 'Bergamot No. 04 Amber Flacon',
    photo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85'
  }
];

export const estatePeople: PersonItem[] = [
  {
    name: 'Matteo Selvatico',
    role: 'Grower & Orchard Keeper',
    quote: 'The soil tells you what it wants to grow. You are just the pair of hands holding the pruning shears.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
    contactNote: 'ESTATE ARCHIVE // NEGATIVE #042'
  },
  {
    name: 'Rosa Bartoli',
    role: 'Master Preserver & Alchemist',
    quote: 'Preserving is not about holding on to time. It is about understanding the exact temperature where sugar turns to amber.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    contactNote: 'CANTINA ARCHIVE // NEGATIVE #088'
  },
  {
    name: 'Giacomo Selvatico',
    role: 'Botanist & Soil Scientist',
    quote: 'We have forty-six wild herbs here. None were sown by human hands. We simply stopped destroying the weeds.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
    contactNote: 'FIELD DIARY // NEGATIVE #103'
  },
  {
    name: 'Silvia Moretti',
    role: 'Estate Cook & Hospitality Host',
    quote: 'When someone sits at our table after a long journey, the first thing they need is not fine speech. It is warm bread and fresh oil.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85',
    contactNote: 'TERRACE LOG // NEGATIVE #127'
  }
];

export const estateValues = [
  {
    number: '01',
    title: 'PATIENCE',
    subtitle: 'Nothing worthwhile ripens in a hurry',
    description: 'We do not heat greenhouses, force flowering or accelerate macerations. If a fig harvest requires ninety days of dry sun, we wait ninety days.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85'
  },
  {
    number: '02',
    title: 'RESPECT',
    subtitle: 'The ecosystem existed before our arrival',
    description: 'Zero chemical sprays, zero synthetic fertilizers. We share our orchards with nocturnal porcupines, honeybees, kestrels and wild pollinators.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=85'
  },
  {
    number: '03',
    title: 'SEASONALITY',
    subtitle: 'What the earth yields this week alone',
    description: 'Once a batch of Bergamot No. 04 or Wild Fig is sealed, there is no second bottling until the following autumn. When it is gone, the land rests.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85'
  },
  {
    number: '04',
    title: 'HOSPITALITY',
    subtitle: 'An open gate and a shared wooden table',
    description: 'Food was meant to be broken together. Our estate is not a guarded laboratory, but a living home where guests walk the groves and break bread.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'
  }
];
