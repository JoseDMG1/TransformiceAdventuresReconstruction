// The two-second gift windows are explicit in don.11202/11203.
// Other magnitudes below are local reconstruction tuning.
export const TRAP_RULES = Object.freeze({ armDelay: 0.8, radius: 70, lifetime: 10,
  chainWindow: 2, waitingWindow: 2, rearmDelay: 2, pullRadius: 170,
  stun: 1.5, slowDuration: 3, traumaDuration: 4, traumaDistance: 30 });

export function trapArmDelay(bonus) {
  return Math.max(0, TRAP_RULES.armDelay * (1 - bonus("trapArming")));
}

export function isTrapArmed(trap, bonus) {
  return trap.life > 0 && !trap.triggered && trap.age >= trapArmDelay(bonus);
}

export function trapDamage(trap, target, bonus, giftEffect) {
  let damage = trap.damage * (1 + Math.max(0, trap.age) * bonus("trapPatience")) *
    (1 + giftEffect("trapPowerRadius"));
  if (giftEffect("trapManual") && trap.manualTrigger) damage *= 1 + giftEffect("trapManual");
  if (giftEffect("trapSingleTarget")) damage *= 2;
  if (trap.age >= TRAP_RULES.waitingWindow) damage *= 1 + giftEffect("trapArmedDamage");
  if ((target.lastTrapAge ?? 3) < TRAP_RULES.chainWindow &&
      (target.lastTrapId ?? -1) >= 0 && target.lastTrapId !== trap.uid)
    damage *= 1 + giftEffect("trapChainDamage");
  return damage;
}

export function movementTraumaDamage(enemy, distance, damage) {
  if (!(enemy.traumaTime > 0) || !(enemy.hp > 0)) return 0;
  enemy.traumaDistance = (enemy.traumaDistance || 0) + Math.max(0, distance);
  const hits = Math.floor(enemy.traumaDistance / TRAP_RULES.traumaDistance);
  enemy.traumaDistance %= TRAP_RULES.traumaDistance;
  return hits * damage;
}
