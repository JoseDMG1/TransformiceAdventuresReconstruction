// Attribution for damage produced by the player's attacks and abilities.
// Pet damage is independent. Unknown future sources do not silently inherit effects.
const playerDamage = new Set([
  "player", "field", "poison", "lightning", "chef-cauldron", "chef-trap",
  "journalist-report", "bandage-hot", "trickster-explosion", "anvil",
  "bee", "living-leaf", "reflect", "player-heart-reflect",
]);

export function vanishHealing(actualDamage, invisible, sourceKind, fraction) {
  if (!(invisible > 0) || !playerDamage.has(sourceKind)) return 0;
  if (!Number.isFinite(actualDamage) || !Number.isFinite(fraction)) return 0;
  return Math.max(0, actualDamage) * Math.max(0, fraction);
}
