// Local balance values, not recovered server statistics. Keep adjustable here.
export const WEAPONS = Object.freeze({
  sword: {
    name: "Espada de entrenamiento",
    icon: "⚔",
    damage: 20,
    // ArmeEpee auto-desactivates after its 10-frame imageAttaque window.
    duration: 10 / 60,
    windup: 10 / 60,
    range: 105,
    arc: 1.7,
    animation: "ambi_attaque1",
    description: "Un golpe equilibrado que alcanza a varios enemigos cercanos.",
  },
  bow: {
    name: "Arco de entrenamiento",
    icon: "➶",
    damage: 16,
    duration: 0.36,
    windup: 0.14,
    // Archived ArmeArc waits 150 ms between finishing charge and releasing.
    releaseDelay: 0.15,
    range: 660,
    arc: 0,
    animation: "arc_tir",
    ranged: true,
    description: "Una breve preparación seguida de una flecha hacia el cursor.",
  },
  dagger: {
    name: "Daga de entrenamiento",
    icon: "†",
    damage: 14,
    // ArmeDague inherits the same 10-frame release window.
    duration: 10 / 60,
    windup: 10 / 60,
    range: 78,
    arc: 1.05,
    animation: "ambi_attaque1",
    description: "Golpes rápidos, precisos y de corto alcance.",
  },
  greatsword: {
    name: "Espada de dos manos",
    icon: "⚔",
    damage: 38,
    duration: 0.88,
    windup: 0.3,
    range: 145,
    arc: 1.8,
    animation: "epee2m_attaque1",
    movementLock: true,
    twoHanded: true,
    description:
      "Un golpe amplio y potente. Debes detenerte para usarla; ocupa ambas manos.",
  },
});
export const SECONDARIES = Object.freeze({
  bandage: {
    name: "Vendas",
    icon: "✚",
    description: "Recupera vida con clic derecho o H. Tiene tiempo de recarga.",
  },
  shield: {
    name: "Escudo de entrenamiento",
    icon: "◈",
    description:
      "Mantén clic derecho o H: reduce el daño frontal y protege a los aliados cercanos. Cada bloqueo normal consume una carga. No puedes moverte mientras bloqueas.",
  },
});
// ArmeADV.activationInterne rejects reactivation for 350 ms in the archived client.
export const WEAPON_ACTIVATION_GATE_MS = 350;
export const ATTACK_STATES = Object.freeze({
  READY: "ready",
  INCANTATION: "incantation",
  ACTIVE: "active",
});
export function createAttack(weapon, angle) {
  const definition = WEAPONS[weapon];
  return {
    weapon,
    angle,
    elapsed: 0,
    hit: false,
    state: attackStateForElapsed(weapon, 0),
    ...(weapon === "bow" ? { released: false, releaseElapsed: 0, held: false } : {}),
  };
}
export function attackStateForElapsed(weapon, elapsed) {
  const definition = WEAPONS[weapon];
  if (!definition || elapsed >= definition.duration) return ATTACK_STATES.READY;
  return elapsed < definition.windup
    ? ATTACK_STATES.INCANTATION
    : ATTACK_STATES.ACTIVE;
}
export function advanceAttack(action, dt) {
  if (action.weapon === "bow") return advanceBowAttack(action, dt);
  const definition = WEAPONS[action.weapon];
  if (!definition) return { impact: false, finished: true, state: ATTACK_STATES.READY };
  action.elapsed = Math.min(
    definition.duration,
    action.elapsed + Math.max(0, dt),
  );
  const impact =
    !action.hit &&
    action.elapsed >= definition.windup + (definition.releaseDelay || 0);
  if (impact) action.hit = true;
  const finished = action.elapsed >= definition.duration;
  action.state = attackStateForElapsed(action.weapon, action.elapsed);
  return { impact, finished, state: action.state };
}

// Runtime and saved actions share the same release clock. A held charge does
// not fire by itself; releasing starts the existing 150 ms launch delay.
export function advanceBowAttack(action, dt) {
  const delta = Math.max(0, dt);
  action.elapsed = Math.min(WEAPONS.bow.windup, action.elapsed + delta);
  action.state = action.elapsed < WEAPONS.bow.windup ? ATTACK_STATES.INCANTATION : ATTACK_STATES.ACTIVE;
  if (action.released) action.releaseElapsed += delta;
  const fired = !!action.released && action.releaseElapsed >= WEAPONS.bow.releaseDelay;
  const impact = fired && !action.hit;
  if (impact) action.hit = true;
  return { impact, finished: fired && action.releaseElapsed >= WEAPONS.bow.releaseDelay + 41 / 60,
    state: action.state };
}

export function restoredBowRelease(action) {
  // Physical key/button holds are not restored. An unreleased charge is
  // cancelled; already released arrows finish without a new input or impact.
  if (action.released !== true && !action.hit) return null;
  const minimum = action.hit ? WEAPONS.bow.releaseDelay : 0;
  const maximum = WEAPONS.bow.releaseDelay + 41 / 60;
  const clock = Number.isFinite(action.releaseElapsed) ? action.releaseElapsed : minimum;
  return { held: false, released: true, releaseElapsed: Math.max(minimum, Math.min(maximum, clock)),
    elapsed: WEAPONS.bow.windup, state: ATTACK_STATES.ACTIVE,
    animationSpeed: 2 / WEAPONS.bow.windup };
}
export function weaponDamage(weapon, level, powerTalent, gifts = 0) {
  return (
    (WEAPONS[weapon].damage + powerTalent * 4 + (level - 1) * 1.5) *
    (1 + 0.2 * gifts)
  );
}
export function inAttackArc(player, target, angle, weapon, extraRange = 0) {
  const w = WEAPONS[weapon],
    dx = target.x - player.x,
    dy = target.y - player.y;
  const delta = Math.atan2(
    Math.sin(Math.atan2(dy, dx) - angle),
    Math.cos(Math.atan2(dy, dx) - angle),
  );
  return (
    Math.hypot(dx, dy) < w.range + extraRange + (target.type === "boss" ? 20 : 0) &&
    Math.abs(delta) < w.arc
  );
}
export const BLOCK_RULES = Object.freeze({ damageFraction: 0.15, halfArc: Math.PI * 0.39 });
export function incomingDamage(amount, player, origin) {
  if (!player.guarding || !origin) return { amount, blocked: false };
  const angle = Math.atan2(origin.y - player.y, origin.x - player.x);
  const difference = Math.atan2(
    Math.sin(angle - player.angle),
    Math.cos(angle - player.angle),
  );
  const blocked = Math.abs(difference) <= BLOCK_RULES.halfArc;
  return {
    amount: blocked ? Math.max(1, Math.round(amount * BLOCK_RULES.damageFraction)) : amount,
    blocked,
  };
}
