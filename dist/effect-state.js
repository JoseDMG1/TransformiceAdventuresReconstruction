// Simulation entities that must survive a save/reload. Cosmetic bursts are excluded.
export const PERSISTENT_EFFECT_KINDS = Object.freeze([
  "pool", "plant", "trap", "testimony", "interview", "burn", "anvil",
  "ingredient", "flask", "bee", "livingLeaf", "tornado", "decoy",
]);

export function isPersistentEffect(effect) {
  return !!effect && PERSISTENT_EFFECT_KINDS.includes(effect.kind);
}
