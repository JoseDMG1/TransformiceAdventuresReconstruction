import { ENCOUNTER_RULES } from "./encounter-data.js";
import { seeded } from "./art.js";

const matchesRule = (room, index, rule) =>
  (rule.minRoom === undefined || room >= rule.minRoom) &&
  index % rule.indexEvery === (rule.offset ?? 0);

function waveEnemy(room, index) {
  const rules = ENCOUNTER_RULES.enemySelection;
  if (matchesRule(room, index, rules.frog))
    return "frog";
  if (matchesRule(room, index, rules.wasp))
    return "wasp";
  if (matchesRule(room, index, rules.hedgehog)) return "hedgehog";
  if (matchesRule(room, index, rules.spider)) return "spider";
  return rules.fallback;
}

export function buildEncounterPlan(step, room, encounterCount, areaId = null, offsetX = 0) {
  const boss = room === encounterCount - 1;
  if (boss) {
    const definition = ENCOUNTER_RULES.boss;
    return {
      enemies: [
        {
          type: "boss",
          x: definition.x + offsetX,
          y: definition.y,
          creatureId: definition.creatureId,
          displayName: definition.name,
        },
        ...definition.adds.map((enemy) => ({ ...enemy, x: enemy.x + offsetX })),
      ],
      title: definition.name,
      category: "ENCUENTRO FINAL",
    };
  }
  const random = seeded(step * 600 + room * 80);
  const xStart = areaId === "bramble-passage" ? 700 : 870;
  const xSpan = areaId === "bramble-passage" ? 650 : 550;
  const yStart = areaId === "bramble-passage" ? 535 : 390;
  const ySpan = areaId === "bramble-passage" ? 200 : 460;
  const count = ENCOUNTER_RULES.wave.baseCount +
    Math.min(room * ENCOUNTER_RULES.wave.roomGrowth, ENCOUNTER_RULES.wave.maxGrowth);
  const enemies = Array.from({ length: count }, (_, index) => ({
    type: waveEnemy(room, index),
    x: offsetX + xStart + random() * xSpan,
    y: yStart + random() * ySpan,
  }));
  const announcements = ENCOUNTER_RULES.waveAnnouncements;
  return {
    enemies,
    title: room === 0 ? announcements.first : announcements.later,
    category: announcements.category
      .replace("{step}", step)
      .replace("{room}", room + 1)
      .replace("{count}", encounterCount),
  };
}
