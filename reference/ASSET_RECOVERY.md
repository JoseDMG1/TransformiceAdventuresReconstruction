# Original public image recovery

Recovered on 2026-10-16. The archived `ConfigADV.js` supplies the public base `http://data.atelier801.com/tfmadv/`; HTTPS is currently reachable. `scripts/recover-assets.mjs` extracts only complete literal `interface/*.png` and `.jpg` paths present in the archived source modules, requests those exact resources, and saves their original bytes. No recovered JavaScript was executed and no CDN directory or numeric ID enumeration was performed.

All 44 literal evidenced paths returned HTTP 200 image responses. Local files are under `dist/assets/original/interface/`; `dist/assets/original/manifest.json` records exact public URLs, source modules, byte sizes, and SHA-256 hashes. The original client also constructs a bounded set of ten emote paths (`T1.png`–`T10.png`) in `InterfaceEmoteADV.js`; these were recovered individually and added to the root manifest in v0.188. The literal-path recovery script remains repeatable using Node.js 24 (`node scripts/recover-assets.mjs`).

## Immediately usable artwork

| Local relative path below `dist/assets/original/` | Dimensions | Observed use in archived source |
|---|---|---|
| `interface/intro/logo.png` | 1127 × 422 | Game logo |
| `interface/intro/fond.jpg` | 2120 × 1280 | Login background |
| `interface/intro/herbe.png` | 2120 × 1280 | Login grass overlay |
| `interface/intro/guerrier.png` | 738 × 688 | Intro warrior illustration |
| `interface/intro/botaniste.png` | 539 × 479 | Intro botanist illustration |
| `interface/intro/journaliste.png` | 510 × 644 | Intro journalist illustration |
| `interface/intro/cuistot.png` | 463 × 393 | Intro cook illustration |
| `interface/intro/herisson.png` | 267 × 249 | Intro hedgehog illustration |
| `interface/intro/libellule.png` | 368 × 222 | Intro dragonfly illustration |
| `interface/jeu/bloc_comp.png` | See file | Combat HUD background |
| `interface/jeu/comp_vide.png` | See file | Empty skill slot |
| `interface/jeu/pastille_profil.png`, `pastille_donjon.png`, `pastille_menu.png`, `pastille_emote.png` | See files | HUD shortcuts |
| `interface/cadre_xp.png`, `interface/xp_niveau.png`, `interface/xp_halo.png` | See files | Experience HUD |
| `interface/dialogue/par9dialoguePNJ.png`, `noms_left.png`, `noms_mid.png`, `noms_right.png` | See files | Dialogue panel and name strip |

## Binary animation recovery (additional pass)

The deterministic path in `InterfaceChargementADV.js:286`, `https://transformice-adventures.com/ressources/data.bin`, still returns a 371,985-byte public binary (Last-Modified 2020-12-10). It is preserved at `dist/assets/original/data.bin`. Its message code is 0x8000; the next four bytes specify the compressed length (371,979). Zlib inflation starts at byte 6 and produces 1,289,829 bytes.

`scripts/recover-assets-data.mjs` implements a data-only decoder based on the archived `ProtoADV.C_INITIALISATION`, `ClipAnim` and `Look.ElementLook` reading methods. It does not load or execute the archived client. It parses animation names, 113 effects, 48 monsters, sounds, and clothing pieces, consuming all 1,289,829 bytes with zero remainder. Full decoded metadata and inflated input are retained under `reference/original-data/`. The current binary dates from 2020 while the archived code dates from 2019; exact byte consumption corroborates structural compatibility, without proving gameplay behavior identical.

191 PNG images were recovered from exact paths constructed from parsed source directories and image names; all returned HTTP 200. Records are at `dist/assets/original/animation-image-downloads.json`. These cover mouse base pieces, wasp, spider, hedgehog, frog, beetle, dummy and scarecrow. `picto/village/scarecrow.png` has original pixel pivot `[80,216]`. Terrain trees, ground, and buildings are not in this initialization package; those appear to require additional sector data.

The local browser module `dist/original-animation.js` loads the compact `dist/assets/original/creatures.json` and recovered image manifest. `drawOriginalCreature(ctx, code, animation, x, y, timeMilliseconds, facingSign, scale)` draws at the original ground origin using the original part pivots, clip hierarchy, keyframes, interpolation, and base mouse clothing. IDs are 2 mouse, 3 wasp, 4 spider, 5 hedgehog, 7 frog, 10 beetle, 19 dummy, and 40 scarecrow. Common clip names are `statique`, `course`, `attaque1`, `mort`; mouse weapon attacks use `epee2m_attaque1` or `ambi_attaque1`. It returns false for unsupported creature IDs. The renderer omits tint multiplication and optional equipment beyond the base mouse pieces; art fidelity remains subject to visual comparison with gameplay.

## Initial pass limitations (superseded for characters above)

Static source establishes `ClipAnim.BIBLIOTHEQUE_MORCEAUX = DATA_TFMADV + "equipement/"` and `BIBLIOTHEQUE_DIVERS = DATA_TFMADV + "anim/"`. Bundle snippets construct equipment images from runtime `code` and `nom` values: `equipement/<code>/<nom>.png`. The inspected modules do not provide complete character or terrain image paths or their animation metadata. The intro illustrations are useful for the entry screen; they do not establish gameplay sprite frame layouts. Character and terrain reconstruction therefore still needs the gameplay reference and recovered protocol/animation evidence. No broad completeness claim is made about the CDN or game resources.

## Cofre de Elisah (v0.158)

The retained `data.bin` metadata identifies original monster ID 14 (`MST14`) under `monstre/coffre1/`, with `statique`, `ouvert`, and 70-frame `ouverture` clips. `scripts/recover-original-chest.mjs` follows only PNG names explicitly referenced by that clip and recovered all six: five `coffre*.png` pieces and `ombre.png`. Their exact URLs, response types, byte counts, and SHA-256 hashes are recorded in `dist/assets/original/animation-image-downloads.json`; the pieces are in `dist/assets/original/monstre/coffre1/`.

`dist/assets/original/creatures.json` now includes ID 14, and the existing `drawOriginalCreature` renderer composes its layers and pivots. The scene plays the 70-frame `ouverture` state when the player interacts with Elisah's chest, then shows the gifts and renders the `ouvert` state. This activation timing is a local interpretation of the original clip/state names; the server message that selected the state was not retained. The browser scale still requires comparison against `reference/video-v12/frame-1040.png`.
