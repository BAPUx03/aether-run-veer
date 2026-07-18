# Aether Run: Veer Skybound

An original Indian-fantasy 2D platform adventure built for desktop and mobile browsers. Guide Veer through seven skybound rounds, collect 21 Sky Shards, earn Surya Coins, unlock four character skins, and defeat Gravox inside Meghraj Citadel.

## Features

- Seven handcrafted rounds with Indian-fantasy locations
- Four unlockable animated Veer skins
- Persistent Surya Coin wallet, shards, scores, times, unlocks, and settings
- Run, variable jump, coyote time, jump buffering, double jump, ground stomp, and dash
- Enemies, hazards, moving platforms, checkpoints, secrets, and boss combat
- Keyboard and landscape mobile touch controls
- Original runtime-drawn sprites and synthesised music/sound effects
- Creator links for GitHub, Instagram, and LinkedIn on the home screen
- Safe migration from the previous five-round save format

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck:game
npm run test:game-data
npm run lint
npm run build
```

## Controls

- Move: A/D or Left/Right Arrow
- Jump: W, Space, or Up Arrow
- Ground stomp: S or Down Arrow
- Sky dash: Shift
- Pause: Escape
- Mobile: dedicated move, jump, stomp, and dash buttons

## Architecture

- `game-client/src/main.ts`: scenes, physics, input, combat, UI, progression
- `game-client/src/game/levels.ts`: seven round definitions
- `game-client/src/game/art.ts`: original procedural characters and gameplay art
- `game-client/src/game/skins.ts`: skin catalog and unlock economy
- `game-client/src/game/audio.ts`: synthesised music and sound effects
- `game-client/src/game/save.ts`: version-tolerant local progress
- `scripts/test-game-data.ts`: release-content regression checks
- `app/`: responsive hosted game shell

No Nintendo, Mario, ripped, or licence-unknown assets are included.
