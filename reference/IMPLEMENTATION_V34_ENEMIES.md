# Enemy data and recovered creature IDs — v0.34

## Changes

- `dist/enemy-data.js` is the single local tuning catalog for enemy HP, speed, attack distance, telegraph time, projectile values, rewards, and stage growth. Existing prototype values were moved without changing them.
- `dist/game.js` now reads these values for spawning, enemy movement, attack resolution, charge impacts, telegraph previews, XP and coins.
- `dist/original-animation.js` now admits all 21 creature IDs actually present in `dist/assets/original/creatures.json`: 2, 3, 4, 5, 7, 10, 15, 17, 19, 30, 32, 38, 40, 41, 43, 44, 45, 46, 47, 49, 50. Before this change ID 45 was rejected by the renderer's local allowlist even though its decoded clip and downloaded pieces existed, so the selected forest boss could fall back to drawn art.

## Evidence and limits

- Static artifact evidence is documented in `reference/EXTRA_CREATURES.md`; the animation metadata and image download manifest are local and were not regenerated here. The boss images are under `dist/assets/original/monstre/scarabee1boss/`.
- REA finding `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd` says combat authority and exact monster rules are server-side. The moved values remain reconstruction parameters, not original balance.
- The visual renderer is still validated only by syntax in this change; no automated tests or browser session were run.
