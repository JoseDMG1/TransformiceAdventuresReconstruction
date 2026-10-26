// Editable scene content for the local reconstruction.
// Geometry and balance remain approximate until original sector data is recovered.
import { CHARACTERS } from "./characters.js";
import { MAPS } from "./map-data.js";
import { forestCluePlacements } from "./forest-story.js";
import { FOREST_PALETTE } from "./forest-art.js";
import { makeGround, seeded } from "./art.js";

const pointInRect = (x, y, rect) =>
  x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;


function characterAt(entry) {
  const character = CHARACTERS[entry.character];
  if (!character) throw new Error(`Unknown map character: ${entry.character}`);
  return {
    ...character,
    x: entry.x,
    y: entry.y,
    ...(entry.ambient ? { ambient: true } : {}),
    ...(entry.tutorialColor ? { color: entry.tutorialColor } : {}),
  };
}

export function sceneSpawn(kind, index = 0, routeLength = 0) {
  const definition = MAPS[kind] ?? MAPS.dungeon;
  const areas = definition.expedition?.areas;
  if (areas && routeLength > 0) return { ...areas[0].spawn };
  const area = areas?.[index % areas.length];
  return { ...(area?.spawn ?? definition.spawn) };
}

export function selectableExpeditions() {
  return Object.values(MAPS).filter((definition) => definition.expedition);
}

export function makeScene(kind, index = 0, routeLength = 0) {
  const definition = MAPS[kind] ?? MAPS.dungeon;
  const areas = definition.expedition?.areas;
  if (areas && routeLength > 0) {
    const slots = definition.expedition.routes[routeLength] ??
      Array.from({ length: routeLength }, (_, i) => areas[i === routeLength - 1 ? 2 : i % 2].id);
    const templates = new Map(areas.map((entry) => [entry.id, entry]));
    const tileWidth = definition.size.width;
    const width = tileWidth * slots.length;
    const height = definition.size.height;
    const objects = [];
    const colliders = [];
    const routeAreas = [];
    const ground = document.createElement("canvas");
    ground.width = width;
    ground.height = height;
    const groundContext = ground.getContext("2d");
    slots.forEach((id, routeIndex) => {
      const area = templates.get(id) ?? areas[0];
      const offsetX = routeIndex * tileWidth;
      const random = seeded(801 + index * 500 + definition.seedOffset + routeIndex * 971);
      const protectedAreas = (area.protectedAreas ?? []).map((rect) => ({ ...rect, left: rect.left + offsetX, right: rect.right + offsetX }));
      const connection = definition.expedition.connection;
      const isAuthoredProtected = (x, y) => protectedAreas.some((rect) => pointInRect(x, y, rect));
      const isConnector = (x, y) => {
        const localX = x - offsetX;
        return connection &&
          (localX < connection.edgeReach || localX > tileWidth - connection.edgeReach) &&
          Math.abs(y - connection.centerY) < connection.halfHeight;
      };
      const add = (object, solid = 0) => {
        const normalized = { scale: 1, variant: 0, ...object, x: object.x + offsetX };
        objects.push(normalized);
        const radius = solid || normalized.collisionRadius;
        if (radius) colliders.push({ x: normalized.x, y: normalized.y - 7, r: radius * normalized.scale });
      };
      for (let i = 0; i < definition.decoration.backgroundCount; i++) {
        const x = offsetX + 70 + random() * (tileWidth - 140);
        const y = 100 + random() * (height - 150);
        if (isAuthoredProtected(x, y)) continue;
        const objectKind = ["tree", "fern", "bush", "mushroom", "rock", "stump"][i % 6];
        const scale = objectKind === "tree" ? 0.85 + random() * 0.4 : 0.6 + random() * 0.7;
        // Consume the same random values as older saves before omitting blockers.
        if (isConnector(x, y)) continue;
        add({ kind: objectKind, x: x - offsetX, y, scale, variant: i % 5 }, objectKind === "tree" ? 25 : objectKind === "rock" ? 24 : 0);
      }
      for (let i = 0; i < definition.decoration.foregroundCount; i++) {
        const x = offsetX + random() * tileWidth;
        const y = random() * height;
        if (isAuthoredProtected(x, y) && i % 5 !== 0) continue;
        const scale = 0.45 + random() * 0.6;
        if (isConnector(x, y) && i % 5 !== 0) continue;
        add({ kind: i % 3 ? "fern" : "bush", x: x - offsetX, y, scale, variant: i % 5 });
      }
      for (const object of area.fixedObjects) add(object);
      for (const object of area.dressing ?? []) add(object);
      const tile = makeGround(tileWidth, height, definition.groundSeed + index + routeIndex * 37, false, area.groundLayout);
      groundContext.drawImage(tile, offsetX, 0);
      routeAreas.push({ ...area, routeIndex, offsetX, spawn: { ...area.spawn, x: area.spawn.x + offsetX } });
    });
    // Join authored zone trails across segment seams so walking never crosses bare canvas.
    for (let i = 0; i < slots.length - 1; i++) {
      const seamX = (i + 1) * tileWidth;
      groundContext.lineCap = "round";
      groundContext.strokeStyle = FOREST_PALETTE.edge;
      groundContext.lineWidth = 168;
      groundContext.beginPath();
      groundContext.moveTo(seamX - 450, 650);
      groundContext.bezierCurveTo(seamX - 120, 580, seamX + 120, 720, seamX + 350, 650);
      groundContext.stroke();
      groundContext.strokeStyle = FOREST_PALETTE.trail;
      groundContext.lineWidth = 158;
      groundContext.stroke();
    }
    return {
      kind: definition.gameMode ?? definition.id,
      mapId: definition.id,
      width,
      height,
      ground,
      backgroundColor: FOREST_PALETTE.grass,
      areaId: routeAreas[0]?.id ?? null,
      routeAreas,
      objects,
      colliders,
      npcs: [],
      interactables: forestCluePlacements(routeAreas),
      seed: index,
    };
  }
  const area = areas?.[index % areas.length];
  const content = area ? { ...definition, ...area } : definition;
  const { width, height } = content.size ?? definition.size;
  const random = seeded(801 + index * 500 + definition.seedOffset);
  const objects = [];
  const colliders = [];
  const add = (object, solid = 0, generated = false) => {
    const normalized = { scale: 1, variant: 0, ...object };
    // Filter after generation so exclusions cannot change the random sequence
    // (and positions/collisions) of decorations elsewhere in existing saves.
    if (generated && (content.decorationExclusions ?? []).some((area) =>
      area.kinds.includes(normalized.kind) && pointInRect(normalized.x, normalized.y, area)
    )) return;
    objects.push(normalized);
    if (solid || normalized.collisionRadius)
      colliders.push({
        x: normalized.x,
        y: normalized.y - 7,
        r: (solid || normalized.collisionRadius) * normalized.scale,
      });
  };
  const isProtected = (x, y) =>
    (content.protectedAreas ?? []).some((area) => pointInRect(x, y, area));

  for (let i = 0; i < (content.decoration ?? definition.decoration).backgroundCount; i++) {
    const x = 70 + random() * (width - 140);
    const y = 100 + random() * (height - 150);
    if (isProtected(x, y)) continue;
    const kind = ["tree", "fern", "bush", "mushroom", "rock", "stump"][i % 6];
    if (
      kind === "tree" &&
      (content.treeAvoidAreas ?? []).some((area) => pointInRect(x, y, area))
    ) continue;
    const scale = kind === "tree" ? 0.85 + random() * 0.4 : 0.6 + random() * 0.7;
    add(
      { kind, x, y, scale, variant: i % 5 },
      kind === "tree" ? 25 : kind === "rock" ? 24 : 0,
      true,
    );
  }
  for (let i = 0; i < (content.decoration ?? definition.decoration).foregroundCount; i++) {
    const x = random() * width;
    const y = random() * height;
    if (isProtected(x, y) && i % 5 !== 0) continue;
    add({
      kind: i % 3 ? "fern" : "bush",
      x,
      y,
      scale: 0.45 + random() * 0.6,
      variant: i % 5,
    }, 0, true);
  }

  colliders.push(...definition.fixedColliders.map((collider) => ({ ...collider })));
  for (const object of content.fixedObjects) add(object);
  for (const object of content.dressing ?? []) add(object);
  const npcs = definition.npcs.map(characterAt);
  const interactables = [
    ...definition.interactables.map((entry) => ({ ...entry })),
    ...npcs.map((character) => ({
      ...character,
      text: `Hablar con ${character.name}`,
    })),
  ];
  if (definition.id === "tutorial") {
    interactables.splice(0, interactables.length, {
      ...npcs[0],
      text: "Volver a la aldea con Papaille",
    });
  }

  return {
    kind: definition.gameMode ?? definition.id,
    mapId: definition.id,
    width,
    height,
    ground: makeGround(width, height, definition.groundSeed + index, definition.id === "village", content.groundLayout),
    backgroundColor: definition.id === "village" ? "#8fae43"
      : content.groundLayout === "tutorial-clearing" ? "#83a638"
      : content.groundLayout?.startsWith("forest-") ? FOREST_PALETTE.grass : "#86a93c",
    areaId: area?.id ?? null,
    objects,
    colliders,
    npcs,
    interactables,
    seed: index,
    ...(definition.petSpawn ? { petSpawn: { ...definition.petSpawn } } : {}),
  };
}
