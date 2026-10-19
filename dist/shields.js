import { WEAPONS, BLOCK_RULES, incomingDamage } from "./combat.js";
import { consumeCharge } from "./resources.js";

export const SHIELD_RULES = Object.freeze({ allyRadius: 80, maximumFreeChance: 0.3 });

export function hasUsableShield(profile) {
  return profile.secondary === "shield" && !WEAPONS[profile.weapon]?.twoHanded;
}

export function resolveShieldHit(amount, player, profile, origin, { freeChance = 0, blockReduction = 0, random = Math.random } = {}) {
  if (!hasUsableShield(profile)) return { amount, blocked: false, free: false };
  const free = !!origin && freeChance > 0 && random() < Math.min(SHIELD_RULES.maximumFreeChance, freeChance);
  const hit = free ? { amount: Math.max(1, Math.round(amount * BLOCK_RULES.damageFraction)), blocked: true }
    : incomingDamage(amount, player, origin);
  if (hit.blocked && !free && !consumeCharge(player.charges, "shield")) {
    player.guarding = false;
    return { amount, blocked: false, free: false };
  }
  return { amount: hit.blocked ? Math.max(1, Math.round(hit.amount * Math.max(0.1, 1 - blockReduction))) : amount,
    blocked: hit.blocked, free };
}
