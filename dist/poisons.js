// Weapon poison timing; base duration and bonus magnitudes remain local tuning.
import { DAMAGE_DOSE_RULES, normalizeDamageDoses, addDamageDose, tickDamageDoses } from "./damage-over-time.js";
export const WEAPON_POISON_RULES = Object.freeze({ duration: 5, interval: 1, maximumFinalBonus: 3 });

export function isEnemyPoisoned(enemy) {
  return !!(enemy.poison > 0 || enemy.plantPoisonTime > 0 || enemy.reportPoisoned > 0 ||
    enemy.arrowPoison > 0 || enemy.arrowPoisons?.some(dose => dose.ticks > 0) ||
    enemy.cardPoisons?.some(dose => dose.ticks > 0));
}

export function addCardPoison(enemy, totalDamage) {
  enemy.cardPoisons ||= [];
  addDamageDose(enemy.cardPoisons, totalDamage);
}

export function tickCardPoison(enemy, dt) {
  enemy.cardPoisons ||= [];
  return tickDamageDoses(enemy.cardPoisons, dt);
}

export function preserveNonDaggerPoison(enemy) {
  if (!(enemy.poison > 0) || enemy.poisonDagger || enemy.poisonLightning) return;
  const ticks = Math.max(0, Math.min(DAMAGE_DOSE_RULES.ticks, Math.floor(enemy.poison - (enemy.poisonTick || 0) + 1e-8) + 1));
  const residual = normalizeDamageDoses([{ damage: enemy.poisonDamage || 2, ticks, tick: enemy.poisonTick }]);
  if (residual.length) {
    enemy.cardPoisons ||= [];
    if (enemy.cardPoisons.length < DAMAGE_DOSE_RULES.maxDoses) enemy.cardPoisons.push(residual[0]);
    else addDamageDose(enemy.cardPoisons, residual[0].damage * residual[0].ticks);
  }
  enemy.poison = 0;
  enemy.poisonTicksRemaining = 0;
}

export function instantDaggerPoisonDamage(perTick, finalBonus = 0) {
  // Four normal pulses and one final pulse, not five empowered final pulses.
  const pulses = Math.round(WEAPON_POISON_RULES.duration / WEAPON_POISON_RULES.interval);
  return perTick * (pulses + Math.max(0, Math.min(WEAPON_POISON_RULES.maximumFinalBonus, finalBonus)));
}

export function tickWeaponPoison(enemy, dt, finalBonus = 0) {
  const sourceKind = enemy.poisonLightning ? "lightning" : "poison";
  if (!(enemy.poison > 0)) return { damage: 0, sourceKind };
  const elapsed = Math.min(enemy.poison, Math.max(0, dt));
  enemy.poisonTick = (enemy.poisonTick ?? WEAPON_POISON_RULES.interval) - elapsed;
  let damage = 0;
  while (enemy.poisonTick <= 1e-9 && enemy.poisonTicksRemaining > 0) {
    const final = enemy.poisonDagger && enemy.poisonTicksRemaining === 1;
    damage += (enemy.poisonDamage || 2) * (final
      ? 1 + Math.max(0, Math.min(WEAPON_POISON_RULES.maximumFinalBonus, finalBonus)) : 1);
    enemy.poisonTicksRemaining--;
    enemy.poisonTick += WEAPON_POISON_RULES.interval;
  }
  enemy.poison = Math.max(0, enemy.poison - Math.max(0, dt));
  if (!enemy.poison) {
    enemy.poisonLightning = false;
    enemy.poisonDagger = false;
    enemy.poisonTicksRemaining = 0;
  }
  return { damage, sourceKind };
}
