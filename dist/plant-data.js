// Keep the historical local save IDs: "thorn" is Cardo, "bramble" is Espinas.
// Roles follow comp.desc.1013; health and growth values are local tuning.
export const PLANTS = Object.freeze({
  thorn: Object.freeze({ id: "thorn", name: "Cardo", attractsEnemies: false }),
  bramble: Object.freeze({ id: "bramble", name: "Espinas", attractsEnemies: true }),
  lily: Object.freeze({ id: "lily", name: "Lirio de los valles", attractsEnemies: false }),
});

export function plantHealthLimit(plant, healthBonus = 0, fallow = false) {
  return Math.round((40 + healthBonus) * (plant.subtype === "bramble" && fallow ? 1.5 : 1)) +
    12 * Math.max(0, Math.min(2, plant.growth || 0));
}

export function plantGrowthSpeed(plant, bonus, nearPet) {
  const petSpeed = nearPet ? 1 + bonus("petGrowth") : 1;
  const maturity = plant.subtype === "bramble" ? Math.max(0.1, 1 - bonus("plantMaturation")) : 1;
  return petSpeed / maturity;
}

export function lilyHealingTarget(plant, { player, pet, petActive, playerMaxHP, petMaxHP, distance }) {
  const candidates = [];
  if (!player.dead && player.hp > 0 && distance(player, plant) < plant.r)
    candidates.push({ target: "player", ratio: player.hp / playerMaxHP });
  if (petActive && !pet.injured && pet.hp > 0 && distance(pet, plant) < plant.r)
    candidates.push({ target: "pet", ratio: pet.hp / petMaxHP });
  candidates.sort((a, b) => a.ratio - b.ratio);
  return candidates[0]?.target ?? null;
}
