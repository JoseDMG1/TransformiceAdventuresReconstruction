import { createCauldronState } from "../cooking.js";
import { TRAP_RULES } from "../traps.js";

export function createChefSkills(context) {
  function cauldron(slot) {
    const { player, effects, activeCauldron, bonus, giftEffect, originalSound } = context;
    const existing = activeCauldron();
    if (existing) {
      existing.carried = giftEffect("cauldronFollow") > 0 || !existing.carried;
      player["skill" + slot] = 0.5;
      return;
    }
    effects.push({
      kind: "pool",
      job: "chef",
      hp: 50,
      age: 0,
      x: player.x + 55,
      y: player.y,
      r: 130 * (1 + giftEffect("cauldronRadius")),
      life: 3600,
      maxLife: 3600,
      tick: 0,
      damage: 0,
      healing: false,
      color: "#e9b75d",
      cooking: createCauldronState(),
      recipeDuration: 8,
      carried: giftEffect("cauldronFollow") > 0,
    });
    originalSound("cuisson1");
  }

  function trap() {
    const { player, effects, bonus, giftEffect, countGift, tone, nextFieldUid } = context;
    effects.push({
      kind: "trap",
      uid: nextFieldUid(),
      subtype: "thorn",
      hp: 0,
      age: 0,
      armed: false,
      rearmCount: 0,
      manualTrigger: false,
      x: player.x + Math.cos(player.angle) * 75,
      y: player.y + Math.sin(player.angle) * 75,
      r: TRAP_RULES.radius * (giftEffect("trapPowerRadius") ? 1.2 : 1),
      life: TRAP_RULES.lifetime,
      maxLife: TRAP_RULES.lifetime,
      tick: 0,
      damage: 16 + bonus("trapDamage") + countGift("banquet") * 6,
      color: "#e7b668",
    });
    tone(320, 0.12, "triangle");
  }

  return { cauldron, trap };
}
