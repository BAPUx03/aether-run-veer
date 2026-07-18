import type { LevelDef, SkinId } from './types';

export function validateGameData(levels: LevelDef[], skinIds: SkinId[]): void {
  if (levels.length < 7) throw new Error('Expected at least seven playable rounds.');
  levels.forEach((level, index) => {
    if (!level.name || level.width < 4000) throw new Error(`Round ${index + 1} has invalid metadata.`);
    if (level.shards.length !== 3) throw new Error(`${level.name} must contain exactly three Sky Shards.`);
    if (!level.checkpoints.length || !level.platforms.length || !level.gems.length) throw new Error(`${level.name} is missing core gameplay content.`);
    if (level.portal.x >= level.width || level.start.x >= level.width) throw new Error(`${level.name} has an unreachable boundary target.`);
    if (level.boss && index !== levels.length - 1) throw new Error('The boss round must be the final round.');
  });
  if (new Set(skinIds).size !== skinIds.length || skinIds.length < 4) throw new Error('Skin catalog is incomplete or duplicated.');
}
