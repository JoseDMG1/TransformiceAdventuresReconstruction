import { recipeEffects } from "./cooking.js";

// Shared local area rules. Effects use the actor's own position, never its owner's.
export function areaDefenseMultiplier(actor, effects, bonus, giftEffect, distance) {
  let multiplier = 1, interviewApplied = false;
  for (const effect of effects) {
    if (!(effect.life > 0) || !(distance(actor, effect) < effect.r)) continue;
    if (effect.kind === "interview" && !interviewApplied) {
      multiplier *= Math.max(0, 1 - bonus("interviewArmor"));
      interviewApplied = true;
    }
    if (effect.kind === "pool" && effect.job === "chef" && effect.cooking?.phase === "cooking") {
      multiplier *= 1 - recipeEffects(effect.cooking, bonus, giftEffect).armor;
    }
  }
  return multiplier;
}

export function areaAttackMultiplier(actor, effects, giftEffect, distance) {
  const inElixir = effects.some(effect => effect.kind === "pool" && effect.job === "botanist" &&
    effect.life > 0 && distance(actor, effect) < effect.r);
  return inElixir ? 1 + giftEffect("elixirAllyDamage") : 1;
}
