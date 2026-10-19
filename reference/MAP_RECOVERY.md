# Map and scenery recovery evidence

Investigation: 2026-10-16. This pass read static client artifacts and exact public module URLs derived from their imports. It did not execute original code, contact the original gameplay socket server, authenticate, or enumerate image IDs.

## Result

The available initialization package does not contain the scene placement/catalog messages needed to recover village buildings, forest trees, or ground layouts. Their paths and placements are supplied in gameplay protocol messages. No additional deterministic tree/building PNG path was found during this bounded pass. The original static scarecrow is already available locally at `dist/assets/original/picto/village/scarecrow.png`; its decoded pixel pivot is `[80,216]` (monster ID 40). The dummy botanist image at `picto/souris/dummybotaniste.png` is also already recovered.

The existing binary initialization decoder consumes its entire 1,289,829-byte inflated package, including animation names, effects, monsters, sounds, and clothing. There are no unparsed trailing bytes to interpret as a map. See `scripts/recover-assets-data.mjs` and `reference/original-data/animation-metadata.json`.

## Additional original source recovered

The archived modules reference `../_monde/MondeADV` and related modules that were absent from the historical local snapshot. The same exact public source paths remain reachable under `https://transformice-adventures.com/dist/Transformice-adventure-client/src/`. They were saved separately because the server reports Last-Modified 2021-02-14, later than the archived 2019 client:

| Local source in `reference/original-data/` | Exact suffix under source URL | SHA-256 |
|---|---|---|
| `MondeADV-2021.js` | `_monde/MondeADV.js` | `C4D04C42FCD5B90B9392BF34D2971D1619095602A5D1495F0ABDF4F9021C3CE7` |
| `AplatADV-2021.js` | `_monde/_mobile/AplatADV.js` | `CCFF9DD5CC2B5FD3325948263785F0F979E53DA4363C2E37DFCDD4E5FFB73A2C` |
| `MobileADV-2021.js` | `_monde/_mobile/MobileADV.js` | `4E12A239BDAF56DA20C4116BA4E823302F8A29383910877F2C51A9291040AAB3` |
| `InfoCommuneElement-2021.js` | `_monde/_mobile/types/InfoCommuneElement.js` | `084E7E7AD6E20D1894A4075D010BB487332EE717912FDE0CD4E63B284D6F355B` |

## Observed delivery and formats

The archived `ProtoADV.js` registers these incoming message codes:

| Code | Name | Observed processing |
|---|---|---|
| `0x8004` | `C_MONDE` | Calls `MondeADV.chargementMonde(MSG)` |
| `0x8070` | `C_DONNEE_SECTEUR` | Calls `MondeADV.donneeSecteur(MSG)` |
| `0x8078` | `C_CACHE_PICTO` | Inflates a byte table, then reads uint16 entry count; each entry is a cache name string, signed32 byte length, and a serialized ClipAnim |
| `0x8802` | `C_LISTE_PICTO_EDITEUR` | Calls editor catalog deserializer |

In the later public `MondeADV-2021.js:299`, a sector payload consists of uint16 aplat count followed by their records, then uint16 mobile count followed by their records. It carries no literal external HTTP map endpoint. `recupSecteur` at line 831 divides world coordinates by 200 with JavaScript truncation toward zero and packs the pair as `(baseX << 16) | (baseY & 0xffff)`. This is spatial organization of already supplied records, not evidence for downloadable sector files.

`AplatADV-2021.js:57` reads each flat decoration as:

1. Signed32 mobile/object identifier.
2. Uint16 sorting index.
3. Serialized ClipAnim, which supplies the image link.
4. Two float32 world coordinates.
5. Common element data.
6. Uint8 world layer.

Its sprite anchor is `[0.5,0.5]`; it lies in the ground plane (`euler.x = π/2`), uses world X and Z coordinates, and can be mirrored, tinted, rotated, and affected by wind. This class is suitable for ground, water, canopy, or ground decoration images; filename alone would not establish a category.

`InfoCommuneElement-2021.js:8` reads uint8 lighting mode, uint8 wind type, bool mirror, uint8 rotation multiplied by `0.02617993`, optional signed32 tint plus uint8 alpha/255, and optional looped sound string plus uint8 volume/100.

`MobileADV-2021.js:1249` reads the upright/mobile record. Its header includes type, identifier, static flag, collision/fade/facing flags, display name/title, shadow/name dimensions, layer, two float32 coordinates, visibility and common element data. Optional sections supply light, ClipAnim, appearance/Look, postures, equipped weapons, nested clips, combat flags and extra data. Upright trees/buildings can use this class too: the client distinguishes `estStatique` from whether an object uses the mobile class. Actual anchors belong to the supplied ClipAnim metadata.

The archived editor (`EditeurADV.js:1885`) reads each catalog entry as identifier; category, ambient sound, behavior and display-name strings; volume; title, name height and shadow width; editor/flat/light/wind/mirror/behind-character flags; optional light data; serialized ClipAnim; monster ID; and clothing IDs. Catalog item image paths come from that ClipAnim, rather than a hardcoded image list.

## Search boundary and remaining evidence needed

The local archive index, archived editor/protocol modules, initialization package, and the four public world modules above were inspected. An ordinary request to the known `https://data.atelier801.com/tfmadv/picto/village/` directory returned HTTP 403, so no directory listing was available. No guessed filenames or sequential IDs were requested.

A retained gameplay network capture with the bodies of `0x8070`, `0x8078`, or `0x8802` would provide exact scene/catalog clips and image paths; a saved original map/editor export could also supply placements. Without such evidence, faithful layouts can be traced from the supplied gameplay video, while scene artwork currently remains reconstruction work. The 2021 source explains the later shipped decoder; its exact identity with the 2019 video's map format remains unverified.
