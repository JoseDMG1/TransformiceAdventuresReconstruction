// Collection/casting split observed in original comp.desc.1011/1014.
// Range, recipes, damage and durations remain provisional local reconstruction.
export const TESTIMONIES = Object.freeze({
  heal: Object.freeze({ name: "Curación", symbol: "✚", color: "#c4d991", effectId: 100, icon: "assets/original/interface/temoignage/2.png" }),
  fire: Object.freeze({ name: "Fuego", symbol: "♨", color: "#edb278", effectId: 101, icon: "assets/original/interface/temoignage/3.png" }),
  lightning: Object.freeze({ name: "Relámpago", symbol: "ϟ", color: "#b7cde8", effectId: 103, icon: "assets/original/interface/temoignage/5.png" }),
  // The skull identifies this visual; it does not establish the server's enum.
  death: Object.freeze({ name: "Muerte", symbol: "†", color: "#c9afd7", effectId: 107, icon: "assets/original/interface/temoignage/9.png" }),
});
export const TESTIMONY_TYPES = Object.freeze(Object.keys(TESTIMONIES));
// Provisional local tuning. The Spanish catalog establishes the effects, not these values.
export const REPORT_RULES = Object.freeze({ radius: 145, testimonyRange: 220, healing: 24, poisonTicks: 4, poisonInterval: 1, vulnerability: 0.25 });

export function availableTestimonies(effects, origin, distance, { allVisible = false, isVisible } = {}) {
  return effects.filter(effect => effect.kind === "testimony" && effect.life > 0 &&
    (allVisible && typeof isVisible === "function" ? isVisible(effect) : distance(origin, effect) < REPORT_RULES.testimonyRange))
    .sort((a, b) => distance(origin, a) - distance(origin, b));
}

export function isElementalTestimony(type) {
  return type === "fire" || type === "lightning";
}

export function applyReportPoison(enemy, damage, instant = false) {
  enemy.reportPoisoned = REPORT_RULES.poisonTicks * REPORT_RULES.poisonInterval;
  if (instant) {
    enemy.reportPoisonTicks = 0;
    enemy.reportPoisonDamage = 0;
    enemy.reportPoisonTick = REPORT_RULES.poisonInterval;
    return damage * REPORT_RULES.poisonTicks;
  }
  enemy.reportPoisonDamage = damage;
  enemy.reportPoisonTicks = REPORT_RULES.poisonTicks;
  enemy.reportPoisonTick = REPORT_RULES.poisonInterval;
  return 0;
}

export function tickReportPoison(enemy, dt) {
  if (!(enemy.reportPoisonTicks > 0)) return 0;
  enemy.reportPoisonTick -= Math.max(0, dt);
  let damage = 0;
  while (enemy.reportPoisonTick <= 0 && enemy.reportPoisonTicks > 0) {
    damage += enemy.reportPoisonDamage || 0;
    enemy.reportPoisonTicks--;
    enemy.reportPoisonTick += REPORT_RULES.poisonInterval;
  }
  return damage;
}
export function normalizeNotebook(raw) {
  return Array.isArray(raw)
    ? raw.filter((t) => TESTIMONY_TYPES.includes(t)).slice(0, 2)
    : [];
}
export function collectTestimony(notebook, type) {
  if (notebook.length >= 2 || !TESTIMONY_TYPES.includes(type)) return false;
  notebook.push(type);
  return true;
}
export function consumeReport(notebook) {
  if (notebook.length !== 2) return null;
  return notebook.splice(0, 2);
}
