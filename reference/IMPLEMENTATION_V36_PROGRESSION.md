# Local XP curve source — v0.36

- `dist/progression-data.js` exports one function for the locally reconstructed level curve: 80 XP at level one, then 40 additional XP per level.
- The HUD/game loop and save sanitizer now use the same value. Previously, gameplay required 40 more XP per level while imported saves could contain up to 45 more, allowing invalid progress bars and delayed level-up after load.
- `MAX_PROFILE_LEVEL` and the existing cap of 100 are shared through the same module. No save version or key changed.
- REA did not recover the authoritative server XP curve. The values remain adjustable local reconstruction data.
- `npm run check` is the validation gate; browser QA remains separate.
