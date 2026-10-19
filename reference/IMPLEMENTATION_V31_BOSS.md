# Boss species correction — v0.31

## What changed

The Bosque Susurrante final encounter now uses original creature **ID 45**, named locally “Escarabajo acorazado”. Its identity is a content field in `dist/encounter-data.js`; `dist/encounters.js` passes that metadata to the runtime and `dist/art.js` renders the selected original ClipAnim. If original art fails to load, the fallback silhouette now has a plated shell and horn instead of spider markings.

## Evidence

- Direct gameplay evidence: `reference/gameplay-frames/frame-0960.jpg` (16:00) and `frame-1020.jpg` (17:00) show the large armored, horned insect in the pond arena. This supports the visible species and arena association; it does not establish exact scale, HP, name, or attack values.
- Recovered original asset evidence: `reference/EXTRA_CREATURES.md` records creature IDs 45 and 47 as using the exact source path `monstre/scarabee1boss/`; `dist/assets/original/creatures.json` preserves both original ClipAnim trees. The local asset manifest contains the referenced scarab boss images. Static client-analysis lineage is documented under Evidence `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd` in `reference/REA_FINDINGS.md`.
- Local selection: ID 45 is used because its recovered animation set supports idle, attack, abilities, movement, charge, death, combat, and stun. ID 47 shares the scarab-boss artwork but has a different animation tree, including an additional incantation state. The gameplay frames do not disambiguate which of the two IDs was instantiated in this encounter.

## Still provisional

The displayed name is a local Spanish label, not a recovered in-game name. Boss size, health, movement, attack cadence, area damage, and phase order remain local reconstruction values. The local catalog now cycles through a stomp, a short charge using the original `course:charge` clip, and a wider stomp. This is an inference from the creature's recovered animation states, not verified server behavior; the video samples do not show a continuous boss-fight sequence. Keep the cycle and values editable until stronger runtime/server evidence is available.

