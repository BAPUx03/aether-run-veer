import type { SkinId } from './types';

export const skinCatalog: Array<{ id: SkinId; name: string; price: number; tagline: string }> = [
  { id: 'veer', name: 'VEER CLASSIC', price: 0, tagline: 'Indigo explorer • Saffron scarf' },
  { id: 'rajput', name: 'ROYAL GUARD', price: 80, tagline: 'Maroon armour • Gold trim' },
  { id: 'monsoon', name: 'MONSOON RIDER', price: 160, tagline: 'Rain teal • Storm silver' },
  { id: 'shadow', name: 'NIGHT RAAHI', price: 280, tagline: 'Midnight cloak • Amethyst light' },
];

export const skinTexture = (skin: SkinId, frame: 'idle' | 'run1' | 'run2' | 'jump' = 'idle') => `hero-${skin}-${frame}`;
