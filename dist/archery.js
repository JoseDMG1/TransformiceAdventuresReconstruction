// Flecha envenenada defers arrow damage; exact stacking rules are not server data.
// Independent doses preserve each impact's damage instead of overwriting it.
import { DAMAGE_DOSE_RULES, normalizeDamageDoses, addDamageDose, tickDamageDoses } from "./damage-over-time.js";
export const ARROW_POISON_RULES = DAMAGE_DOSE_RULES;
const finite = (value, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
const clamp = (value, min, max, fallback = min) => Math.max(min, Math.min(max, finite(value, fallback)));

export function normalizeArrowPoisons(raw, legacy = {}) {
  if (Array.isArray(raw)) return normalizeDamageDoses(raw);
  const duration = clamp(legacy.arrowPoison, 0, 4);
  const tick = clamp(legacy.arrowTick, 0, 1, 1);
  const ticks = Math.max(0, Math.min(4, Math.floor(duration - tick + 1e-8) + 1));
  const damage = clamp(legacy.arrowDamage, 0, 1000);
  return duration > 0 && ticks > 0 && damage > 0 ? [{ damage, ticks, tick }] : [];
}

function dosesFor(enemy) {
  if (!Array.isArray(enemy.arrowPoisons)) enemy.arrowPoisons = normalizeArrowPoisons(undefined, enemy);
  enemy.arrowPoison = 0;
  enemy.arrowTick = 0;
  enemy.arrowDamage = 0;
  return enemy.arrowPoisons;
}

export function addArrowPoison(enemy, totalDamage) {
  addDamageDose(dosesFor(enemy), totalDamage);
}

export function tickArrowPoison(enemy, dt) {
  return tickDamageDoses(dosesFor(enemy), dt);
}

export function tryReturnArrow(projectile, petAvailable, chance, random = Math.random) {
  if (projectile.arrowReturnChecked) return false;
  projectile.arrowReturnChecked = true;
  return !!petAvailable && chance > 0 && random() < Math.min(1, chance);
}
