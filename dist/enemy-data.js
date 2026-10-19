// Local enemy tuning. REA confirms the original client delegates combat authority
// to the server; these values preserve the current reconstruction, not recovered balance.
const enemy = (values) => Object.freeze(values);

export const ENEMY_RULES = Object.freeze({
  beetle: enemy({
    creatureStages: Object.freeze([10, 41]),
    hp: 50, speed: 48, collisionRadius: 18, desiredDistance: 45,
    attackRange: 85, telegraph: 0.5, attackCooldown: 1.6,
    attackDamage: 10, attackRadius: 65, chargeDuration: 0,
    chargeImpactRadius: 0, coins: 3, xp: 12,
  }),
  spider: enemy({
    creatureStages: Object.freeze([4, 30]),
    hp: 65, speed: 62, collisionRadius: 18, desiredDistance: 45,
    attackRange: 85, telegraph: 0.5, attackCooldown: 1.6,
    attackDamage: 10, attackRadius: 65, chargeDuration: 0,
    chargeImpactRadius: 0, coins: 3, xp: 12,
  }),
  // ID 5 is the recovered herisson1 creature. The video shows a small gray,
  // spiny creature beside the beetle boss; its local combat numbers are guesses.
  hedgehog: enemy({
    creatureStages: Object.freeze([5]),
    hp: 55, speed: 56, collisionRadius: 19, desiredDistance: 48,
    attackRange: 88, telegraph: 0.55, attackCooldown: 1.75,
    attackDamage: 11, attackRadius: 68, chargeDuration: 0,
    chargeImpactRadius: 0, coins: 3, xp: 12,
  }),
  wasp: enemy({
    creatureStages: Object.freeze([3, 32]),
    hp: 42, speed: 85, collisionRadius: 18, desiredDistance: 210,
    attackRange: 370, telegraph: 0.5, attackCooldown: 1.6,
    projectileSpeed: 230, projectileLife: 2.8,
    projectileDamage: 10, projectileStepDamage: 2,
    projectileSpread: 0.14, projectileVariantSpread: 2,
    attackDamage: 10, attackRadius: 65, chargeDuration: 0,
    chargeImpactRadius: 0, coins: 3, xp: 12,
  }),
  frog: enemy({
    creatureStages: Object.freeze([7, 38]),
    hp: 50, speed: 48, collisionRadius: 18, desiredDistance: 45,
    attackRange: 300, telegraph: 0.8, attackCooldown: 1.6,
    attackDamage: 12, attackRadius: 85, chargeDuration: 0.4,
    chargeImpactRadius: 85, coins: 3, xp: 12,
  }),
  boss: enemy({
    creatureStages: Object.freeze([45, 47]),
    hp: 350, speed: 45, collisionRadius: 42, desiredDistance: 95,
    attackRange: 300, telegraph: 1,
    attackDamage: 22, attackStepDamage: 3,
    halfHpCooldown: 1.5, fullHpCooldown: 2.2,
    chargeDamage: 24, chargeStepDamage: 3,
    coins: 25, xp: 65,
  }),
});

export function enemyCreatureId(type, variant = 0, preferredId = null) {
  if (type === "boss" && Number.isInteger(preferredId)) return preferredId;
  const stages = ENEMY_RULES[type]?.creatureStages ?? ENEMY_RULES.beetle.creatureStages;
  return stages[Math.min(variant > 0 ? 1 : 0, stages.length - 1)];
}

export const ENEMY_PROGRESSION = Object.freeze({
  hpPerStep: 0.3,
  speedPerStep: 0.03,
  initialAttackDelayMin: 0.8,
  initialAttackDelayRange: 1,
});

export function weakenedEnemyDamage(amount, source) {
  if (!(source?.weaken > 0)) return amount;
  return amount * (1 - Math.max(0, Math.min(0.8, source.weakenFactor || 0)));
}

export function projectileAttackOrigin(projectile, defender) {
  return { x: defender.x - projectile.vx, y: defender.y - projectile.vy };
}
