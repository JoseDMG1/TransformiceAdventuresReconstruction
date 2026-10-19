import { PLANTS } from "./plant-data.js";

export function isDamageableSummon(effect, chefDecoy = false) {
  return effect.life > 0 && effect.hp > 0 &&
    (["plant", "livingLeaf", "decoy"].includes(effect.kind) ||
      effect.kind === "pool" && effect.job === "chef" && chefDecoy);
}

export function summonsInArea(effects, center, radius, distance, chefDecoy = false) {
  return effects.filter(effect => isDamageableSummon(effect, chefDecoy) && distance(effect, center) < radius);
}

// Defensive plants attract attacks; other plants can still take incidental damage.
export function nearestEnemyDecoy(enemy, effects, distance, chefDecoy = false) {
  return effects.filter(effect => effect.life > 0 && effect.hp > 0 &&
    (effect.kind === "decoy" ||
      effect.kind === "plant" && PLANTS[effect.subtype]?.attractsEnemies ||
      effect.kind === "pool" && effect.job === "chef" && chefDecoy) &&
    distance(effect, enemy) < 180)
    .sort((a, b) => distance(a, enemy) - distance(b, enemy))[0] ?? null;
}
