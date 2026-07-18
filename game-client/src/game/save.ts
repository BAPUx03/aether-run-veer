import type { SaveData } from './types';

const KEY = 'aether-run-save-v1';

const defaults = (): SaveData => ({
  unlocked: 0,
  completed: Array(7).fill(false),
  bestScores: Array(7).fill(0),
  bestTimes: Array(7).fill(0),
  bestShards: Array(7).fill(0),
  muted: false,
  reducedMotion: false,
  wallet: 0,
  selectedSkin: 'veer',
  unlockedSkins: ['veer'],
  totalShards: 0,
});

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    const base = defaults();
    const merged = { ...base, ...parsed } as SaveData;
    const migrateSeven = <T>(input: T[] | undefined, fallback: T): T[] => {
      const values = [...(input ?? [])];
      if (values.length === 5) return [...values.slice(0, 4), fallback, fallback, values[4]];
      return values;
    };
    merged.completed = migrateSeven(parsed.completed, false);
    merged.bestScores = migrateSeven(parsed.bestScores, 0);
    merged.bestTimes = migrateSeven(parsed.bestTimes, 0);
    merged.bestShards = migrateSeven(parsed.bestShards, 0);
    while (merged.completed.length < 7) merged.completed.push(false);
    while (merged.bestScores.length < 7) merged.bestScores.push(0);
    while (merged.bestTimes.length < 7) merged.bestTimes.push(0);
    while (merged.bestShards.length < 7) merged.bestShards.push(0);
    if (!merged.unlockedSkins?.includes('veer')) merged.unlockedSkins = ['veer', ...(merged.unlockedSkins ?? [])];
    return merged;
  } catch {
    return defaults();
  }
}

export function writeSave(data: SaveData): void {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* private mode */ }
}

export function clearSave(): SaveData {
  const fresh = defaults();
  writeSave(fresh);
  return fresh;
}
