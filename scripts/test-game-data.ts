import assert from 'node:assert/strict';
import { levels } from '../game-client/src/game/levels.ts';
import { skinCatalog } from '../game-client/src/game/skins.ts';
import { validateGameData } from '../game-client/src/game/validate.ts';

validateGameData(levels, skinCatalog.map(s => s.id));
assert.equal(levels.length, 7, 'release must contain seven rounds');
assert.equal(levels.at(-1)?.boss, true, 'final round must contain the boss');
assert.equal(levels.reduce((sum, level) => sum + level.shards.length, 0), 21, 'game must contain 21 unique shards');
assert.ok(levels.every(level => level.gems.length >= 35), 'every round needs a rewarding coin trail');
assert.equal(new Set(levels.map(level => level.name)).size, levels.length, 'round names must be unique');
assert.deepEqual(skinCatalog.map(s => s.price), [0, 80, 160, 280], 'skin economy changed unexpectedly');

console.log(`Game data verified: ${levels.length} rounds, 21 shards, ${skinCatalog.length} skins, final boss present.`);
