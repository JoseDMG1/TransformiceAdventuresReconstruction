// Independent plant poison: it must not erase dagger or report poison metadata.
export const PLANT_POISON_RULES = Object.freeze({ duration: 4, interval: 1, firstTick: 0.5, damage: 2 });

export function applyPlantPoison(enemy) {
  enemy.plantPoisonTime = PLANT_POISON_RULES.duration;
  enemy.plantPoisonDamage = PLANT_POISON_RULES.damage;
  enemy.plantPoisonTick = Math.min(enemy.plantPoisonTick > 0 ? enemy.plantPoisonTick : PLANT_POISON_RULES.firstTick,
    PLANT_POISON_RULES.firstTick);
}

export function tickPlantPoison(enemy, dt) {
  if (!(enemy.plantPoisonTime > 0)) return 0;
  const elapsed = Math.min(enemy.plantPoisonTime, Math.max(0, dt));
  enemy.plantPoisonTick = (enemy.plantPoisonTick ?? PLANT_POISON_RULES.firstTick) - elapsed;
  let damage = 0;
  while (enemy.plantPoisonTick <= 0) {
    damage += enemy.plantPoisonDamage || PLANT_POISON_RULES.damage;
    enemy.plantPoisonTick += PLANT_POISON_RULES.interval;
  }
  enemy.plantPoisonTime = Math.max(0, enemy.plantPoisonTime - Math.max(0, dt));
  return damage;
}
