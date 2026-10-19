# Forest map reconstruction — v0.30

## Result

The local dungeon no longer repeats one procedurally scattered clearing. Its content catalog now describes three authored forest compositions selected by encounter index:

1. **Moss clearing** — a broad playable patch framed by very large trunks, with a stump, fallen log, rock, and flower bed.
2. **Bramble passage** — a narrow winding trail bordered by large trees and low thorny growth.
3. **Pond arena** — a broad combat clearing with water on the right, a large stump, flowers, rocks, and forest framing.

Each composition has a distinct hand-drawn ground route, fixed decorative objects, authored spawn point, and approximate obstacle colliders. The seventh-encounter route cycles through these areas; the short route ends in the pond arena.

## Evidence and confidence

- **Direct video observations:** `reference/gameplay-frames/frame-0300.jpg` shows combat in a clearing framed by large trees. `reference/video-v12/frame-840.png` at 14:00 shows a narrow passage between trees/thorn growth. `reference/gameplay-frames/frame-0960.jpg` and `frame-1020.jpg` show a large enemy arena with a lagoon on the right. The supplied MP4 is 640×360, so it supports composition and visible landmarks, not full world coordinates.
- **Static REA evidence:** `reference/MAP_RECOVERY.md` and `reference/MAP_RECOVERY_FOLLOWUP.md` document original `C_MONDE` and `C_DONNEE_SECTEUR` decoding, and establish that the retained initialization package does not contain those runtime sector placements. Evidence IDs from the original-client, world-map, and selector traces are listed in those files; no new REA ID is claimed for the video inspection.
- **Local reconstruction choices:** exact map dimensions, object coordinates, collision radii, route curves, and the order of the three compositions are authored approximations. The video does not establish these values or that each screenshot is a separate server-defined sector.

## Remaining gap

This resolves the repeated-empty-clearing problem using the available evidence; it does **not** recover the original binary map sectors. The exact server collision segments, object placements, cached ClipAnim payloads, and seamless connectivity are still unknown. A retained gameplay payload containing `0x8004`, `0x8070`, or `0x8078`, or an editor/map export, is still required to reproduce those byte-for-byte. The local game remains playable without that data.

## Architecture

- `dist/map-data.js` owns `expedition.areas`, their stable IDs, layout IDs, spawns, placements, and protected regions.
- `dist/maps.js` resolves the area from the encounter index, creates its scene and obstacles, and asks the renderer for the selected ground layout.
- `dist/art.js` renders the three ground layouts and reusable environment props. New map compositions can be added to the catalog without moving gameplay code.
- `dist/encounters.js` uses a narrower spawn band for enemies in the passage so they remain on its visible trail.

