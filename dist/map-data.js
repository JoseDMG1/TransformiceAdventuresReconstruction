// Content-only scene definitions. Forest layouts trace the supplied gameplay video;
// placements are authored local reconstruction data, not recovered server sectors.
import { TUTORIAL_START_LANDMARKS } from "./tutorial-layout.js";
import { ARENA_FLORA } from "./arena-layout.js";

export const MAPS = Object.freeze({
  village: Object.freeze({
    id: "village",
    name: "Aldea de los ratones",
    hudName: "Aldea de los ratones",
    saveName: "Aldea de los ratones",
    size: { width: 2200, height: 1500 },
    seedOffset: 50,
    groundSeed: 801,
    protectedAreas: [{ left: 400, right: 1850, top: 430, bottom: 1180 }],
    treeAvoidAreas: [],
    // Registered against the board in frame 0180: procedural foreground crowns
    // covered the foreground roof and the open walking space.
    decorationExclusions: [
      { kinds: ["tree"], left: 150, right: 1550, top: 300, bottom: 1500 },
    ],
    decoration: { backgroundCount: 220, foregroundCount: 95 },
    fixedObjects: [
      { kind: "hut", x: 1075, y: 505, scale: 1.1, variant: 0 },
      { kind: "hut", x: 1555, y: 570, scale: 1, variant: 1 },
      { kind: "chimneyHut", x: 1075, y: 1300, scale: 1.4, variant: 2 },
      { kind: "hut", x: 380, y: 590, scale: 1, variant: 0 },
      // Small foliage beds soften hut edges as in the captured village view.
      { kind: "flowerbed", x: 953, y: 513, scale: 0.52, variant: 0 },
      { kind: "flowerbed", x: 1430, y: 578, scale: 0.5, variant: 2 },
      { kind: "flowerbed", x: 953, y: 1304, scale: 0.48, variant: 1 },
      { kind: "flowerbed", x: 535, y: 595, scale: 0.48, variant: 3 },
      { kind: "board", x: 865, y: 610, scale: 1.35 },
      { kind: "lamp", x: 317, y: 1016, scale: 0.95 },
      { kind: "lamp", x: 885, y: 505, scale: 0.95 },
      { kind: "fence", x: 630, y: 600, scale: 0.9 },
    ],
    fixedColliders: [
      { x: 1075, y: 440, r: 160 },
      { x: 1555, y: 515, r: 140 },
      { x: 1075, y: 1250, r: 140 },
      { x: 380, y: 550, r: 110 },
    ],
    npcs: [
      { character: "papaille", x: 688, y: 600 },
      { character: "mura", x: 1450, y: 620 },
      { character: "scarf", x: 1590, y: 1110 },
      // The footage shows other mice in the plaza. These offline ambience
      // actors are stationary, unnamed, and do not participate in interactions.
      { character: "plazaMouseOchre", x: 500, y: 830, ambient: true },
      { character: "plazaMouseAsh", x: 1495, y: 760, ambient: true },
      { character: "plazaMouseCream", x: 1070, y: 515, ambient: true },
    ],
    interactables: [
      { x: 865, y: 610, id: "board", text: "Explorar una mazmorra" },
      { x: 1870, y: 780, id: "gate", text: "Adentrarse en el bosque" },
    ],
    spawn: { x: 1080, y: 930 },
  }),
  tutorial: Object.freeze({
    id: "tutorial",
    name: "Claro del tutorial",
    hudName: "El comienzo del sendero",
    groundLayout: "tutorial-clearing",
    saveName: "Tutorial",
    size: { width: 1850, height: 1250 },
    seedOffset: 0,
    groundSeed: 801,
    protectedAreas: [{ left: 330, right: 1500, top: 340, bottom: 960 }],
    treeAvoidAreas: [{ left: 260, right: 1600, top: 300, bottom: 1140 }],
    // Frame 0060 leaves the cart and its shafts visible to Papaille's right.
    // Exclude only generated trees here, preserving the random stream outside.
    decorationExclusions: [
      { kinds: ["tree"], left: 1500, right: 1850, top: 480, bottom: 1080 },
      { kinds: ["tree", "fern", "bush", "mushroom", "rock", "stump"], left: 0, right: 1120, top: 300, bottom: 1250 },
    ],
    decoration: { backgroundCount: 220, foregroundCount: 95 },
    // Frame 0060: two rails frame Papaille's clearing; positions are local
    // traces. Decorative only until original fence collision data is known.
    fixedObjects: [
      { kind: "tutorialFence", x: 1235, y: 535, scale: 1.15 },
      { kind: "tutorialFence", x: 1530, y: 535, scale: 1.15 },
      { kind: "tutorialFence", x: 1430, y: 995, scale: 1.15 },
      { kind: "tutorialFence", x: 1725, y: 995, scale: 1.15 },
      { kind: "stump", x: 1080, y: 515, scale: 1.7 },
      { kind: "stump", x: 1180, y: 1075, scale: 3.7 },
      { kind: "flowerbed", x: 1110, y: 535, scale: 0.8 },
      { kind: "flowerbed", x: 1310, y: 985, scale: 0.8 },
      { kind: "tutorialCart", x: 1495, y: 705, scale: 0.95 },
      { kind: "tutorialDraftBeetle", x: 1765, y: 710, scale: .85 },
      ...TUTORIAL_START_LANDMARKS,
      { kind: "wildflowers", x: 1310, y: 1010, scale: 1.05, variant: 0 },
    ],
    fixedColliders: [],
    npcs: [{ character: "papaille", x: 1360, y: 710, tutorialColor: "#ba9d6d" }],
    interactables: [],
    spawn: { x: 480, y: 650 },
    // Pixel placement in the first MP4 frame, converted with the local 0.5
    // reference scale. Saved journeys still restore their own pet coordinates.
    petSpawn: { x: 736, y: 682 },
  }),
  dungeon: Object.freeze({
    id: "dungeon",
    gameMode: "dungeon",
    name: "Bosque",
    hudName: "Bosque Susurrante",
    saveName: "Bosque Susurrante",
    expedition: Object.freeze({
      name: "Bosque Susurrante",
      description: "Avanza por el bosque, supera encuentros y recoge bendiciones de Elisah.",
      difficultyLevels: 1,
      encounterCounts: Object.freeze([3, 7]),
      // Route slot per encounter. Each area remains independently editable;
      // repetition is intentional for the longer expedition.
      routes: Object.freeze({
        3: Object.freeze(["moss-clearing", "bramble-passage", "pond-arena"]),
        7: Object.freeze([
          "moss-clearing", "bramble-passage", "moss-clearing",
          "bramble-passage", "moss-clearing", "bramble-passage", "pond-arena",
        ]),
      }),
      previewTheme: "forest",
      previewLabel: "Bosque Susurrante",
      connection: Object.freeze({ centerY: 640, halfHeight: 110, edgeReach: 450 }),
      // Video: clearing at 05:00, narrow passage at 14:00, pond arena at 16:00.
      // Exact server-supplied sector coordinates were not present in the capture.
      areas: Object.freeze([
        Object.freeze({
          id: "moss-clearing",
          groundLayout: "forest-clearing",
          dressing: [
            { kind: "fernFan", x: 200, y: 430, scale: 1.05, variant: 1 },
            { kind: "fernFan", x: 630, y: 405, scale: 1.25, variant: 2 },
            { kind: "fernFan", x: 1100, y: 440, scale: 1.15, variant: 3 },
            { kind: "fernFan", x: 1540, y: 620, scale: 1.25, variant: 4 },
            { kind: "fernFan", x: 210, y: 1010, scale: 1.2, variant: 2 },
            { kind: "fernFan", x: 710, y: 1080, scale: 1.4, variant: 1 },
            { kind: "fernFan", x: 1160, y: 1110, scale: 1.35, variant: 3 },
            { kind: "fernFan", x: 1670, y: 1050, scale: 1.3, variant: 4 },
            { kind: "flowerbed", x: 320, y: 470, scale: 1.5, variant: 1 },
            { kind: "flowerbed", x: 1050, y: 460, scale: 1.4, variant: 2 },
            { kind: "flowerbed", x: 1300, y: 1040, scale: 1.5, variant: 3 },
          ],
          spawn: { x: 300, y: 640 },
          fixedObjects: [
            { kind: "ancientTree", x: 90, y: 410, scale: 1.15, variant: 0, collisionRadius: 48 },
            { kind: "ancientTree", x: 430, y: 360, scale: 1.05, variant: 1, collisionRadius: 48 },
            { kind: "ancientTree", x: 1660, y: 410, scale: 1.2, variant: 2, collisionRadius: 52 },
            { kind: "ancientTree", x: 1810, y: 580, scale: 0.9, variant: 1, collisionRadius: 40 },
            { kind: "stump", x: 1480, y: 930, scale: 1.55, collisionRadius: 52 },
            { kind: "fallenLog", x: 360, y: 1040, scale: 1.35, variant: 1, collisionRadius: 64 },
            { kind: "rock", x: 1290, y: 490, scale: 1.1, variant: 2, collisionRadius: 34 },
            { kind: "flowerbed", x: 1370, y: 575, scale: 1.2, variant: 2 },
          ],
          protectedAreas: [{ left: 220, right: 1500, top: 365, bottom: 965 }],
        }),
        Object.freeze({
          id: "bramble-passage",
          groundLayout: "forest-corridor",
          dressing: [
            { kind: "fernFan", x: 280, y: 470, scale: 1.25, variant: 3 },
            { kind: "fernFan", x: 980, y: 465, scale: 1.35, variant: 1 },
            { kind: "fernFan", x: 1500, y: 480, scale: 1.2, variant: 2 },
            { kind: "fernFan", x: 270, y: 960, scale: 1.35, variant: 2 },
            { kind: "fernFan", x: 650, y: 965, scale: 1.3, variant: 4 },
            { kind: "fernFan", x: 1050, y: 960, scale: 1.25, variant: 1 },
            { kind: "fernFan", x: 1480, y: 980, scale: 1.3, variant: 3 },
            { kind: "fernFan", x: 1810, y: 975, scale: 1.25, variant: 2 },
            { kind: "flowerbed", x: 520, y: 825, scale: 1.2, variant: 1 },
            { kind: "flowerbed", x: 1300, y: 830, scale: 1.2, variant: 3 },
          ],
          spawn: { x: 170, y: 640 },
          fixedObjects: [
            { kind: "ancientTree", x: 120, y: 360, scale: 1.25, variant: 2, collisionRadius: 52 },
            { kind: "ancientTree", x: 420, y: 375, scale: 1.1, variant: 0, collisionRadius: 48 },
            { kind: "ancientTree", x: 810, y: 350, scale: 1.22, variant: 1, collisionRadius: 50 },
            { kind: "ancientTree", x: 1210, y: 370, scale: 1.15, variant: 2, collisionRadius: 48 },
            { kind: "ancientTree", x: 1660, y: 365, scale: 1.3, variant: 0, collisionRadius: 54 },
            // A wide cut stump frames the open playable ground in the 14:00 video capture.
            // This is a traced local placement, not a recovered server-sector coordinate.
            { kind: "stump", x: 960, y: 390, scale: 2.25 },
            // The same frame shows a smaller cut stump to the left of the wide one.
            { kind: "stump", x: 705, y: 405, scale: 1.12 },
            // A thin branch lies across the open floor in the 14:00 capture.
            // It is a decorative trace only; its sector coordinate is not available.
            { kind: "twig", x: 815, y: 680, scale: 1, variant: 0 },
            // Yellow-leaf sapling repeats near the right edge at 14:00 and 15:00.
            // The trace uses the existing prop; exact sector placement is unknown.
            { kind: "sapling", x: 1200, y: 530, scale: 0.65, variant: 0 },
            // A stacked dark-wood mass is visible at the right edge around 15:00.
            // This is a traced prop approximation; no sector or collision data was recovered.
            { kind: "woodPile", x: 1740, y: 850, scale: 1.05, variant: 0 },
            { kind: "bramble", x: 350, y: 890, scale: 1.35, variant: 2, collisionRadius: 38 },
            { kind: "bramble", x: 760, y: 885, scale: 1.4, variant: 1, collisionRadius: 38 },
            { kind: "bramble", x: 1190, y: 895, scale: 1.35, variant: 0, collisionRadius: 38 },
            { kind: "bramble", x: 1580, y: 875, scale: 1.3, variant: 2, collisionRadius: 36 },
            { kind: "fallenLog", x: 895, y: 1040, scale: 1.2, variant: 0 },
          ],
          protectedAreas: [{ left: 80, right: 1770, top: 470, bottom: 790 }],
        }),
        Object.freeze({
          id: "pond-arena",
          groundLayout: "forest-pond",
          dressing: [
            ...ARENA_FLORA,
            { kind: "fernFan", x: 220, y: 450, scale: 1.3, variant: 3 },
            { kind: "fernFan", x: 850, y: 430, scale: 1.2, variant: 4 },
            { kind: "fernFan", x: 1510, y: 560, scale: 1.15, variant: 2 },
            { kind: "fernFan", x: 560, y: 1060, scale: 1.4, variant: 1 },
            { kind: "fernFan", x: 920, y: 1080, scale: 1.3, variant: 2 },
            { kind: "fernFan", x: 1330, y: 1090, scale: 1.25, variant: 4 },
            { kind: "fernFan", x: 1830, y: 1030, scale: 1.25, variant: 3 },
            { kind: "flowerbed", x: 760, y: 470, scale: 1.5, variant: 1 },
            { kind: "flowerbed", x: 1420, y: 1010, scale: 1.35, variant: 2 },
          ],
          spawn: { x: 330, y: 640 },
          fixedObjects: [
            { kind: "ancientTree", x: 100, y: 400, scale: 1.28, variant: 0, collisionRadius: 54 },
            { kind: "ancientTree", x: 520, y: 360, scale: 1.15, variant: 1, collisionRadius: 48 },
            { kind: "ancientTree", x: 1540, y: 380, scale: 1.25, variant: 2, collisionRadius: 52 },
            { kind: "ancientTree", x: 1815, y: 560, scale: 0.95, variant: 1, collisionRadius: 42 },
            { kind: "stump", x: 600, y: 975, scale: 1.8, collisionRadius: 58 },
            { kind: "fallenLog", x: 1240, y: 1030, scale: 1.45, variant: 2, collisionRadius: 68 },
            { kind: "rock", x: 1460, y: 770, scale: 1.25, variant: 1, collisionRadius: 40 },
            { kind: "rockCluster", x: 1510, y: 720, scale: 0.68, variant: 0 },
            { kind: "rockCluster", x: 1650, y: 920, scale: 0.74, variant: 1 },
            { kind: "flowerbed", x: 1340, y: 870, scale: 1.5, variant: 1 },
            // A narrow yellow-leaf sapling crosses the foreground in the 17:00/17:20 captures.
            // Position is traced against the known chest/flower landmarks, not recovered sector data.
            { kind: "sapling", x: 1375, y: 960, scale: 1, variant: 0 },
          ],
          protectedAreas: [{ left: 200, right: 1320, top: 390, bottom: 960 }],
        }),
      ]),
    }),
    size: { width: 1850, height: 1250 },
    seedOffset: 0,
    groundSeed: 801,
    protectedAreas: [{ left: 330, right: 1500, top: 340, bottom: 960 }],
    treeAvoidAreas: [{ left: 260, right: 1600, top: 300, bottom: 1140 }],
    decoration: { backgroundCount: 48, foregroundCount: 72 },
    fixedObjects: [],
    fixedColliders: [],
    npcs: [],
    interactables: [],
    spawn: { x: 480, y: 650 },
  }),
});
