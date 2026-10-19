// Local loot reconstruction. Item statistics and economy were not in the public client.
export const SLOTS = { head: "Cabeza", body: "Túnica", charm: "Amuleto" };
const BASES = [
  ["head", "Capucha del viajero", "♜", "armor"],
  ["body", "Túnica del claro", "♧", "maxHp"],
  ["charm", "Amuleto de Picpic", "✦", "petDamage"],
  ["head", "Sombrero del botánico", "❋", "healing"],
  ["body", "Chaleco del explorador", "♧", "damage"],
  ["charm", "Colgante del viento", "✧", "speed"],
];
export const STAT_NAMES = {
  armor: "armadura",
  maxHp: "vida máxima",
  petDamage: "daño de Picpic",
  healing: "curación",
  damage: "daño de arma",
  speed: "velocidad",
};
export function normalizeInventory(raw, equipped) {
  const items = [],
    ids = new Set();
  for (const v of Array.isArray(raw) ? raw.slice(0, 80) : []) {
    if (
      !v ||
      typeof v.id !== "string" ||
      !/^loot-\d+-\d+-\d+$/.test(v.id) ||
      ids.has(v.id)
    )
      continue;
    if (!Number.isInteger(v.base) || !BASES[v.base]) continue;
    ids.add(v.id);
    items.push({
      id: v.id,
      base: v.base,
      rank: Math.max(1, Math.min(20, Math.floor(Number(v.rank) || 1))),
      quality: v.quality === 2 ? 2 : 1,
    });
  }
  const worn = {};
  for (const slot of Object.keys(SLOTS)) {
    if (
      items.some((i) => i.id === equipped?.[slot] && BASES[i.base][0] === slot)
    )
      worn[slot] = equipped[slot];
  }
  return { inventory: items, equipped: worn };
}
export function itemDetails(item) {
  const [slot, name, icon, stat] = BASES[item.base];
  const amount =
    (stat === "maxHp" ? 8 : stat === "speed" ? 3 : 1) *
    item.rank *
    item.quality;
  return {
    ...item,
    slot,
    name,
    icon,
    stat,
    amount,
    value: 4 + item.rank * 3 * item.quality,
    rarity: item.quality === 2 ? "Raro" : "Común",
    appearance: [8, 27, 15, 26, 11, 15][item.base],
  };
}
export function equipmentBonus(profile, stat) {
  return (profile.inventory || [])
    .filter((i) => Object.values(profile.equipped || {}).includes(i.id))
    .reduce((sum, i) => {
      const d = itemDetails(i);
      return sum + (d.stat === stat ? d.amount : 0);
    }, 0);
}
export function expeditionLoot(profile, step, serial) {
  const id = `loot-${step}-${serial}-${profile.level}`;
  if (
    profile.inventory.length >= 80 ||
    profile.inventory.some((i) => i.id === id)
  )
    return null;
  const item = {
    id,
    base: (step * 7 + serial * 3 + profile.level) % BASES.length,
    rank: Math.min(20, Math.max(1, step)),
    quality: serial % 3 === 0 ? 2 : 1,
  };
  profile.inventory.push(item);
  return itemDetails(item);
}
