# Recovered enemy variants and animation states — v0.35

## Changes

- Added original model stages to `dist/enemy-data.js`: beetle 10/41, spider 4/30, wasp 3/32, frog 7/38. The stage selector preserves the existing base-versus-level-2 appearance rule and keeps these IDs editable.
- `dist/art.js` now asks the catalog for the creature ID and selects idle, run, attack, stun, or death clips from the simulated enemy state.
- Frogs use their recovered `saut-prep` clip while telegraphing and `saut` during the existing charge movement. The forest boss continues to use its explicit original ID 45 and `course:charge` clip.
- Enemy movement animation is derived from the current AI tick and is not added to persisted save data.

## Evidence and limits

- `dist/assets/original/creatures.json` contains the clip-state names for IDs 7, 38, 46 and the base/level-2 families. `reference/EXTRA_CREATURES.md` records recovered images and IDs.
- Mapping local difficulty stages to base/level-2 visuals is a presentation choice. The server-authoritative encounter sequence, monster spawn rules, stats and IA remain unrecovered; no such claims are made here.
- This change does not alter save format. `npm run check` passed; browser QA remains pending.
