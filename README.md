<div align="center">

# AETHER RUN: VEER SKYBOUND

### An original Indian-fantasy platform adventure built for the browser

<a href="https://aether-run-veer.vercel.app">
  <img src="https://img.shields.io/badge/▶%20PLAY%20NOW-LAUNCH%20THE%20GAME-f3a24a?style=for-the-badge&labelColor=07111f" alt="Play Aether Run: Veer Skybound" />
</a>

<br />
<br />

<img src="https://readme-typing-svg.demolab.com?font=Nunito&weight=800&size=22&pause=900&color=73F3E6&center=true&vCenter=true&width=760&lines=Run+through+seven+skybound+worlds;Collect+21+Sky+Shards;Unlock+Veer%27s+animated+skins;Defeat+Gravox+in+Meghraj+Citadel" alt="Aether Run animated feature line" />

<p>
  <strong>Run. Jump. Dash. Rise.</strong><br />
  Guide Veer across a living sky map inspired by the landscapes, colours and legends of India.
</p>

[![Play Online](https://img.shields.io/badge/Play%20Online-Open%20Game-73f3e6?style=flat-square&logo=googlechrome&logoColor=07111f)](https://aether-run-veer.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Phaser](https://img.shields.io/badge/Phaser-3.90-8b5cf6?style=flat-square)](https://phaser.io/)
[![License](https://img.shields.io/badge/License-Open%20Source-f3a24a?style=flat-square)](LICENSE)

</div>

> **SEO description:** Aether Run: Veer Skybound is a free original Indian-fantasy 2D platform game for desktop and mobile browsers. Run, jump, double-jump, stomp and sky-dash through seven worlds, collect Sky Shards, unlock animated Veer skins and defeat Gravox.

> **Play link note:** The buttons above use `https://aether-run-veer.vercel.app` as the expected Vercel URL. Replace it with your final Vercel URL after deployment.

## The adventure

Veer is a young skybound explorer carrying a saffron scarf, a fearless heart and the last light of the Surya Shards. Across seven handcrafted rounds, he must cross emerald hills, crystal caverns, desert forts, moonlit peaks, lotus ghats, floating dunes and the storm-wrapped Meghraj Citadel.

Every round is built for movement: momentum matters, jumps can be saved with coyote time, landings have squash-and-stretch feedback, and Veer changes animated poses while running, jumping, dashing and recovering.

## What makes it fun

- **Seven distinct worlds** with original Indian-fantasy atmosphere
- **Responsive platforming** with acceleration, variable-height jumps, jump buffering and coyote time
- **Double jump, stomp and sky dash** unlocked as the journey progresses
- **21 collectible Sky Shards** — three hidden in every round
- **Surya Coin wallet** that persists between runs
- **Four animated Veer skins**: Classic, Royal Guard, Monsoon Rider and Night Raahi
- **Enemies, hazards, moving platforms, checkpoints and secrets**
- **A final boss battle** against Gravox, Keeper of the Storm
- **Keyboard and mobile touch controls** designed for landscape play
- **Synthesised music and sound effects** with a reduced-motion setting
- **Local save progress** for scores, times, shards, coins, unlocks and settings

## World map

| Round | World | Challenge |
|---:|---|---|
| 1 | Aravalli Udaan | Learn to run, jump and find the first three shards |
| 2 | Neelam Caverns | Master the double jump beneath the ancient hills |
| 3 | Surya Fort Ruins | Use the ground stomp through a forgotten sky-fort |
| 4 | Himadri Peaks | Combine movement abilities across moonlit snow |
| 5 | Kamal Stepwells | Race the monsoon through enchanted lotus ghats |
| 6 | Thar Sky Palace | Ride the golden wind beyond floating dunes |
| 7 | Meghraj Citadel | Sky-dash, survive the storm and defeat Gravox |

## Controls

| Action | Keyboard | Mobile |
|---|---|---|
| Move | `A` / `D` or `←` / `→` | `LEFT` / `RIGHT` |
| Jump | `W`, `Space` or `↑` | `JUMP` |
| Ground stomp | `S` or `↓` | `STOMP` after unlock |
| Sky dash | `Shift` | `DASH` after unlock |
| Pause | `Esc` | `PAUSE` |

### Movement tips

- Release the jump button early for a shorter jump; hold it for more height.
- Press jump just before leaving a ledge — coyote time helps Veer catch the edge.
- Watch the landing squash and spark burst: it confirms a clean touchdown.
- Look above and below the main path for hidden shards and coin trails.
- Checkpoints save your restart position, not your current health.

## Run it locally

Requirements: **Node.js 22.13+** and npm.

```bash
git clone https://github.com/BAPUx03/aether-run-veer.git
cd aether-run-veer
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Quality checks

```bash
npm run typecheck:game
npm run test:game-data
npm run lint
npm run build
```

## Deploy on Vercel

Use the repository root as the Vercel project root.

- Framework preset: `Other`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave empty
- Node.js: `22.x`

For a game-only static deployment, use `npm run build:game` and set output directory to `public/game`.

## Project structure

```text
app/                 Hosted shell and landing page
build/               Sites/Vite integration
game-client/         Phaser game source and gameplay systems
public/game/         Bundled playable game assets
scripts/             Build, validation and test helpers
worker/              Cloudflare/Vinext worker entrypoint
.openai/hosting.json Sites hosting metadata
```

## Built with

- [Phaser](https://phaser.io/) — 2D game engine and Arcade Physics
- [TypeScript](https://www.typescriptlang.org/) — strict game source
- [Vite](https://vite.dev/) — fast game bundling
- [Vinext](https://github.com/cloudflare/vinext) — hosted application shell
- Runtime-drawn artwork and synthesised audio — no licence-unknown assets

## Creator

**Pruthvirajsinh Makwana** — creator and developer of Aether Run: Veer Skybound.

- [GitHub](https://github.com/PruthvirajsinhMakwana)
- [Instagram](https://www.instagram.com/pruthvirajsinh__makwana/)
- [LinkedIn](https://www.linkedin.com/in/pruthvirajsinh-makwana-635974393/)

## Credits and licence

All game characters, gameplay art and audio are original runtime-generated work for this project. See [ASSET_CREDITS.md](ASSET_CREDITS.md) for details.

Released under the licence included in [LICENSE](LICENSE).

<div align="center">

**Made with code, colour and skybound imagination by Pruthvirajsinh Makwana.**

[⬆ Back to top](#aether-run-veer-skybound)

</div>
