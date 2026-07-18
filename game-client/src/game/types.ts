export type Theme = 'emerald' | 'crystal' | 'sunset' | 'frost' | 'storm' | 'lotus' | 'desert';
export type SkinId = 'veer' | 'rajput' | 'monsoon' | 'shadow';

export interface PlatformDef { x: number; y: number; w: number; h?: number; moving?: { axis: 'x' | 'y'; distance: number; duration: number } }
export interface EnemyDef { x: number; y: number; type: 'hopper' | 'beetle' | 'wisp' | 'roller'; range?: number }
export interface PointDef { x: number; y: number }

export interface LevelDef {
  name: string;
  subtitle: string;
  theme: Theme;
  width: number;
  start: PointDef;
  portal: PointDef;
  platforms: PlatformDef[];
  gems: PointDef[];
  shards: PointDef[];
  enemies: EnemyDef[];
  hazards: PointDef[];
  checkpoints: PointDef[];
  boss?: boolean;
}

export interface SaveData {
  unlocked: number;
  completed: boolean[];
  bestScores: number[];
  bestTimes: number[];
  bestShards: number[];
  muted: boolean;
  reducedMotion: boolean;
  wallet: number;
  selectedSkin: SkinId;
  unlockedSkins: SkinId[];
  totalShards: number;
}
