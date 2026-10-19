// Bounded, independent doses. Tick counts and magnitudes are local tuning.
export const DAMAGE_DOSE_RULES = Object.freeze({ ticks: 4, interval: 1, maxDoses: 32 });
const finite = (value, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
const clamp = (value, min, max, fallback = min) => Math.max(min, Math.min(max, finite(value, fallback)));

export function normalizeDamageDoses(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, DAMAGE_DOSE_RULES.maxDoses).filter(dose => dose && typeof dose === "object" &&
    finite(dose.damage) > 0 && finite(dose.ticks) > 0).map(dose => ({
    damage: clamp(dose.damage, 0, 1000), ticks: Math.floor(clamp(dose.ticks, 1, DAMAGE_DOSE_RULES.ticks)),
    tick: clamp(dose.tick, 0, DAMAGE_DOSE_RULES.interval, DAMAGE_DOSE_RULES.interval),
  }));
}

export function addDamageDose(doses, totalDamage) {
  if (!Number.isFinite(totalDamage) || totalDamage <= 0) return;
  if (doses.length >= DAMAGE_DOSE_RULES.maxDoses) {
    const last = doses[doses.length - 1];
    last.damage += totalDamage / last.ticks;
  } else doses.push({ damage: totalDamage / DAMAGE_DOSE_RULES.ticks,
    ticks: DAMAGE_DOSE_RULES.ticks, tick: DAMAGE_DOSE_RULES.interval });
}

export function tickDamageDoses(doses, dt) {
  let damage = 0;
  for (let index = doses.length - 1; index >= 0; index--) {
    const dose = doses[index];
    dose.tick -= Math.max(0, finite(dt));
    while (dose.tick <= 1e-9 && dose.ticks > 0) {
      damage += dose.damage;
      dose.ticks--;
      dose.tick += DAMAGE_DOSE_RULES.interval;
    }
    if (!dose.ticks) doses.splice(index, 1);
  }
  return damage;
}
