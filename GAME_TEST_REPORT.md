# Aether Run v2.0 — SDLC and game test report

## Player feedback summary

The original release had a strong movement foundation and clear five-world progression, but it needed a more distinctive cultural identity, longer progression, a reason to replay completed rounds, clearer reward feedback, and a more complete mobile control layout.

## High-priority findings fixed

| Finding | Player impact | Resolution |
| --- | --- | --- |
| Main character lacked a distinctive identity | Low emotional connection | Rebuilt Veer as, an original Indian-fantasy explorer with scarf, angarkha-inspired coat, sash, headband, boots, and four animated skins |
| Progress ended after five rounds | Short campaign | Added Kamal Stepwells and Thar Sky Palace; campaign now has seven rounds and 21 unique shards |
| Coins reset after each round | Weak long-term reward | Added persistent Surya Coin wallet and skin economy |
| No cosmetic progression | Limited replay value | Added Veer Classic, Royal Guard, Monsoon Rider, and Night Raahi skins |
| Mobile lost stomp after dash unlocked | Gameplay feature inaccessible | Added separate mobile stomp and dash buttons |
| Moving-platform top/motifs did not move with collision body | Visible desynchronisation | Grouped platform cap, motifs, shadow, and physics block in the same tween |
| Old five-round saves mapped final completion to the wrong new round | Incorrect progression | Added seven-round save migration that moves the former boss result to the new final index |
| Collected shards could be counted repeatedly | Inflated completion | Added per-round best-shard tracking; total is capped naturally at 21 unique shards |
| Home screen lacked creator identity | Missing portfolio connection | Added GitHub, Instagram, and LinkedIn buttons in-game and in the hosted shell |

## Test coverage

- TypeScript strict type check for game source
- Seven-round content validation
- Exactly three shards per round (21 total)
- Unique round names
- Minimum coin-trail density per round
- Final boss placement in the final round
- Four-skin catalog and stable unlock prices
- Production game build
- Hosted application build
- ESLint and deployable artifact validation

## Suggested future backlog

1. Add gamepad remapping and haptic feedback.
2. Add optional Hindi interface localisation.
3. Add a daily time-trial seed and online leaderboard backend.
4. Add sprite-sheet frame animation for enemies and Veer attacks.
5. Add a dedicated accessibility menu for contrast, text size, and motion.
6. Add cloud save only after account and privacy requirements are defined.
