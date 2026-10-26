// Versioned, data-only save format. No imported field is evaluated as code or HTML.
import { WEAPONS, SECONDARIES, attackStateForElapsed, restoredBowRelease } from "./combat.js";
import { JOBS, normalizedSecondary } from "./jobs.js";
import { normalizeTalentBuild, talentBonus } from "./talents.js";
import { normalizeInventory, equipmentBonus } from "./inventory.js";
import { COSMETIC_SETS } from "./cosmetics.js";
import { PLAYER_CHARACTER, PLAYABLE_CHARACTERS, PET_SPECIES } from "./characters.js";
import { MAPS } from "./map-data.js";
import { petMaxHPForLevel } from "./pets.js";
import { normalizeCharges, chargeRecovery } from "./resources.js";
import { AUTHENTIC_GIFTS } from "./gifts.js";
import { normalizeCauldronState } from "./cooking.js";
import { normalizeNotebook, TESTIMONY_TYPES } from "./journalism.js";
import { MAX_PROFILE_LEVEL, maxSavedXP } from "./progression-data.js";
import { normalizeForestClues } from "./forest-story.js";
import { isPersistentEffect } from "./effect-state.js";
import { BARRIER_RULES } from "./barriers.js";
import { PLANTS } from "./plant-data.js";
import { PLANT_POISON_RULES } from "./plant-effects.js";
import { normalizeArrowPoisons } from "./archery.js";
import { normalizeDamageDoses } from "./damage-over-time.js";
import { BANDAGE_RULES } from "./bandages.js";
import { SWORD_RULES, SWORD_STATE_LIMITS } from "./swords.js";
export const SAVE_VERSION = 13;
export const MAX_SAVE_BYTES = 200_000;
const limit = (value, min, max, fallback = min) =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;
const integer = (v, min, max, fallback = min) =>
  Math.floor(limit(v, min, max, fallback));
const oneOf = (v, list, fallback = list[0]) =>
  list.includes(v) ? v : fallback;
const object = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const gifts = [
  "power",
  "vitality",
  "haste",
  "recovery",
  "thorns",
  "companion",
  "refresh",
  "renew",
  "archer",
  "duelist",
  "guard",
  "botany",
  "banquet",
  "cards",
  "scoop",
  ...AUTHENTIC_GIFTS.map((g) => g.id),
];
const types = ["beetle", "wasp", "spider", "frog", "hedgehog", "boss"];

export function defaultProfile() {
  return {
    version: SAVE_VERSION,
    name: PLAYER_CHARACTER.name,
    level: 1,
    xp: 0,
    coins: 0,
    job: "botanist",
    secondaryJob: null,
    secondarySkill: 1,
    weapon: "sword",
    secondary: "bandage",
    fur: 0,
    tutorial: false,
    bestStep: 0,
    muraAdviceSeen: false,
    talents: { vitality: 0, power: 0, pet: 0 },
    talentBuild: {},
    inventory: [],
    equipped: {},
    expeditions: 0,
    encounters: 3,
    characterId: PLAYER_CHARACTER.id,
    cosmetics: { head: 0, body: 0, cape: 0, accessory: 0 },
    petName: PET_SPECIES.hedgehog.defaultName,
    petSpecies: PET_SPECIES.hedgehog.id,
    petActive: true,
    volume: 0.18,
  };
}

function point(value, width, height) {
  return {
    x: limit(value?.x, 55, width - 55, width / 2),
    y: limit(value?.y, 90, height - 55, height / 2),
  };
}
function timers(source, keys, max = 15) {
  return Object.fromEntries(
    keys.map((key) => [key, limit(source?.[key], 0, max, 0)]),
  );
}
export function sanitizeJourney(value, profile) {
  if (
    !object(value) ||
    !Object.hasOwn(MAPS, value.scene) ||
    !object(value.player) ||
    value.player.hp <= 0
  )
    return null;
  const sceneKind = MAPS[value.scene].gameMode ?? value.scene;
  const encounterOptions = MAPS[value.scene].expedition?.encounterCounts ?? [3, 7];
  const encounterCount = encounterOptions.includes(value.encounterCount)
    ? value.encounterCount
    : encounterOptions[0];
  const { width: baseWidth, height } = MAPS[value.scene].size;
  const width = baseWidth * (sceneKind === "dungeon" ? encounterCount : 1);
  const blessings = Array.isArray(value.gifts)
    ? value.gifts.filter((g) => gifts.includes(g)).slice(0, 300)
    : [];
  const hp =
    100 +
    (profile.level - 1) * 8 +
    profile.talents.vitality * 15 +
    talentBonus(profile, "maxHp") +
    equipmentBonus(profile, "maxHp") +
    blessings.filter((g) => g === "vitality").length * 25;
  const player = {
    ...point(value.player, width, height),
    hp: limit(value.player.hp, 0.01, hp, hp),
    angle: limit(value.player.angle, -Math.PI, Math.PI, 0),
    facing: value.player.facing === -1 ? -1 : 1,
    ...timers(value.player, [
      "attack",
      "weaponGate",
      "heal",
      "skill1",
      "skill2",
      "skill3",
      "invisible",
      "damageBoost",
      "testimonyTimer",
      "dodge",
      "invuln",
    ]),
  };
  player.cardIndex = integer(value.player.cardIndex, 0, 3, 0);
  player.lastAttackerUid = integer(value.player.lastAttackerUid, -1000000, 1000000, 0);
  player.testimonyIndex = integer(value.player.testimonyIndex, 0, 2, 0);
  const action = value.player.action;
  player.action =
    object(action) && action.weapon === profile.weapon && WEAPONS[action.weapon]
      ? {
          weapon: action.weapon,
          angle: limit(action.angle, -Math.PI, Math.PI, 0),
          elapsed: limit(action.elapsed, 0, WEAPONS[action.weapon].duration, 0),
          hit: !!action.hit,
          state: attackStateForElapsed(
            action.weapon,
            limit(action.elapsed, 0, WEAPONS[action.weapon].duration, 0),
          ),
          swordBalestraBonus: limit(action.swordBalestraBonus, 0, SWORD_RULES.maximumBalestraBonus, 0),
        }
      : null;
  if (player.action?.weapon === "bow") {
    const release = restoredBowRelease(action);
    player.action = release ? { ...player.action, ...release } : null;
  }
  player.guarding = false;
  player.charges = normalizeCharges(value.player.charges, profile, blessings);
  if (!object(value.player.charges) && player.heal > 0) {
    player.charges.bandage.count = 0;
    player.charges.bandage.timer = Math.max(
      0,
      chargeRecovery(profile, "bandage", blessings) - player.heal,
    );
  }
  player.plantIndex = integer(value.player.plantIndex, 0, 2, 0);
  player.lastCard = integer(value.player.lastCard, -1, 3, -1);
  player.notebook = normalizeNotebook(value.player.notebook);
  player.vanishOrigin = object(value.player.vanishOrigin)
    ? point(value.player.vanishOrigin, width, height)
    : null;
  player.casting =
    object(value.player.casting) &&
    ["bandage", "pet-revive"].includes(value.player.casting.kind)
      ? {
          kind: value.player.casting.kind,
          remaining: limit(value.player.casting.remaining, 0, 3, 1),
        }
      : null;
  player.healFinish = limit(value.player.healFinish, 0, 0.25, 0);
  player.states = Object.fromEntries(
    [
      "guard",
      "swordBoost",
      "bandageHot",
      "bandageGuard",
      "hotTick",
      "barrierTime",
      "barrier",
      "slow",
      "cardPet",
      "cardPower",
      "clubStun",
      "clubVulnerability",
      "heartReflect",
      "downed",
      "petReviveUsed",
      "emergencyCooldown",
      "storedHitTime",
      "storedHit",
      "chainTime",
      "chainStacks",
      "firstUse",
      "swordIdleTime",
      "swordBalestraReady",
    ].map((key) => [
      key,
      limit(
        value.player.states?.[key] === true ? 1 : value.player.states?.[key],
        0,
        SWORD_STATE_LIMITS[key] ?? (key === "bandageHot" || key === "bandageGuard" ? BANDAGE_RULES.maximumDuration :
          key === "barrier" || key === "storedHit" ? 100 : 15),
        0,
      ),
    ]),
  );
  const pet = {
    ...point(value.pet, width, height),
    facing: value.pet?.facing === -1 ? -1 : 1,
    injured: !!value.pet?.injured,
    hp: limit(
      value.pet?.hp,
      0,
      petMaxHPForLevel(
        profile.level,
        talentBonus(profile, "petMaxHp"),
        profile.petSpecies,
      ),
      value.pet?.injured
        ? 0
        : petMaxHPForLevel(
            profile.level,
            talentBonus(profile, "petMaxHp"),
            profile.petSpecies,
          ),
    ),
    invuln: limit(value.pet?.invuln, 0, 1, 0),
    invisible: limit(value.pet?.invisible, 0, 3, 0),
    barrier: limit(value.pet?.barrier, 0, BARRIER_RULES.capacity, 0),
    barrierTime: limit(value.pet?.barrierTime, 0, BARRIER_RULES.duration, 0),
    bandageGuard: limit(value.pet?.bandageGuard, 0, BANDAGE_RULES.maximumDuration, 0),
    bandageHot: limit(value.pet?.bandageHot, 0, BANDAGE_RULES.maximumDuration, 0),
    hotTick: limit(value.pet?.hotTick, 0, 1, 1),
    heartReflect: !!value.pet?.heartReflect,
    rescueTimer: limit(value.pet?.rescueTimer, 0, 2, 0),
    testimonyTimer: limit(value.pet?.testimonyTimer, 0, 8, 0),
    attack: limit(value.pet?.attack, 0, 3, 0),
  };
  const enemies = (Array.isArray(value.enemies) ? value.enemies : [])
    .slice(0, 100)
    .filter((e) => object(e) && types.includes(e.type))
    .map((e, index) => ({
      uid: integer(e.uid, -1000000, 1000000, -index - 1),
      greatswordHitCount: integer(e.greatswordHitCount, 0, 2, 0),
      type: e.type,
      variant: integer(e.variant, 0, 3, 0),
      pattern: integer(e.pattern, 0, 2, 0),
      bossKind: integer(e.bossKind, 0, 2, 0),
      deathTime: limit(e.deathTime, 0, 1.2, e.hp <= 0 ? 1.2 : 0),
      poison: limit(e.poison, 0, 8, 0),
      poisonTick: limit(e.poisonTick, 0, 1, 0),
      poisonDamage: limit(e.poisonDamage, 0, 100, 0),
      poisonStacks: integer(e.poisonStacks, 0, 3, 0),
      poisonLightning: !!e.poisonLightning,
      poisonDagger: !!e.poisonDagger,
      plantPoisonTime: limit(e.plantPoisonTime, 0, PLANT_POISON_RULES.duration, 0),
      plantPoisonDamage: limit(e.plantPoisonDamage, 0, 100, 0),
      plantPoisonTick: limit(e.plantPoisonTick, 0, PLANT_POISON_RULES.interval, PLANT_POISON_RULES.firstTick),
      poisonTicksRemaining: integer(
        e.poisonTicksRemaining,
        0,
        6,
        limit(e.poison, 0, 8, 0) > 0
          ? Math.max(
              1,
              Math.floor(
                limit(e.poison, 0, 8, 0) -
                  Math.max(0.01, limit(e.poisonTick, 0, 1, 1)),
              ) + 1,
            )
          : 0,
      ),
      reportPoisoned: limit(e.reportPoisoned, 0, 4, 0),
      reportPoisonDamage: limit(e.reportPoisonDamage, 0, 100, 0),
      reportPoisonTicks: integer(e.reportPoisonTicks, 0, 4, 0),
      reportPoisonTick: limit(e.reportPoisonTick, 0, 1, 1),
      arrowPoisons: normalizeArrowPoisons(e.arrowPoisons, e),
      cardPoisons: normalizeDamageDoses(e.cardPoisons),
      root: limit(e.root, 0, 15, 0),
      diamondsRoot: limit(e.diamondsRoot, 0, 5, 0),
      traumaTime: limit(e.traumaTime, 0, 4, 0),
      traumaDistance: limit(e.traumaDistance, 0, 30, 0),
      lastTrapId: integer(e.lastTrapId, -1, 1000000, -1),
      lastTrapAge: limit(e.lastTrapAge, 0, 3, 3),
      slow: limit(e.slow, 0, 5, 0),
      slowFactor: limit(e.slowFactor, 0, 0.8, 0),
      weaken: limit(e.weaken, 0, 5, 0),
      weakenFactor: limit(e.weakenFactor, 0, 0.8, 0),
      ...point(e, width, height),
      maxHp: limit(e.maxHp, 1, 100000, 50),
      hp: limit(e.hp, 0, limit(e.maxHp, 1, 100000, 50), 0),
      speed: limit(e.speed, 0, 500, 50),
      facing: e.facing === -1 ? -1 : 1,
      ...timers(e, ["attack", "telegraph", "hit", "stun", "charge"], 5),
      targetX: limit(e.targetX, 0, width, player.x),
      targetY: limit(e.targetY, 0, height, player.y),
      seed: limit(e.seed, 0, 1000, 0),
    }));
  const effects = (Array.isArray(value.effects) ? value.effects : [])
    .slice(0, 64)
    .filter(e => object(e) && isPersistentEffect(e))
    .map((e) => ({
      kind: e.kind,
      startX: limit(e.startX, 55, width - 55, player.x),
      startY: limit(e.startY, 90, height - 55, player.y),
      landingX: limit(e.landingX, 55, width - 55, player.x),
      landingY: limit(e.landingY, 90, height - 55, player.y),
      flightDuration: limit(e.flightDuration, 0.1, 1, 0.45),
      flightElapsed: limit(e.flightElapsed, 0, 1, 0),
      bounced: !!e.bounced,
      leafSpawned: !!e.leafSpawned,
      poolLife: limit(e.poolLife, 0.1, 15, 3),
      ingredientType: integer(e.ingredientType, 0, 2, 0),
      cooking:
        e.kind === "pool" && e.job === "chef" && object(e.cooking)
          ? normalizeCauldronState(e.cooking)
          : null,
      recipeDuration: limit(e.recipeDuration, 0, 30, 8),
      petCollect: limit(e.petCollect, 0, 2, 0),
      guardPlantUid: integer(e.guardPlantUid, 0, 1000000, 0),
      subtype: oneOf(e.subtype, [
        ...TESTIMONY_TYPES,
        ...Object.keys(PLANTS),
      ]),
      uid: integer(e.uid, 0, 1000000, 0),
      hitIDs: Array.isArray(e.hitIDs)
        ? [
            ...new Set(
              e.hitIDs.filter((i) => Number.isInteger(i) && i >= 0 && i < 100),
            ),
          ].slice(0, 100)
        : [],
      job: oneOf(
        e.job,
        ["chef", "botanist", "journalist"],
        e.color === "#e9b75d" ? "chef" : "botanist",
      ),
      hp: limit(e.hp, 0, 1000, e.kind === "livingLeaf" ? 45 : 40),
      age: limit(e.age, 0, 30, 0),
      carried: e.kind === "pool" && e.job === "chef" && !!e.carried,
      triggered: !!e.triggered,
      manualTrigger: !!e.manualTrigger,
      impacted: !!e.impacted,
      enriched: !!e.enriched,
      rearmCount: integer(e.rearmCount, 0, 1, 0),
      growth: integer(e.growth, 0, 2, 0),
      growthTime: limit(e.growthTime, 0, 3, 0),
      weedSpawned: e.kind === "plant" && !!e.weedSpawned,
      ...point(e, width, height),
      r: limit(e.r, 1, 300, 115),
      life: limit(
        e.life,
        0,
        e.cooking ? 3600 : e.kind === "ingredient" ? 60 : 15,
        0,
      ),
      maxLife: limit(
        e.maxLife,
        0.1,
        e.cooking ? 3600 : e.kind === "ingredient" ? 60 : 15,
        7,
      ),
      tick: limit(e.tick, 0, 2, 0),
      attackTime: limit(e.attackTime, 0, 0.4, 0),
      moving: !!e.moving,
      damage: limit(e.damage, 0, 1000, 8),
      healing: !!e.healing,
      color: oneOf(e.color, [
        "#dec9ef",
        "#c9d9dc",
        "#c9afd7",
        "#ac84bf",
        "#e9b75d",
        "#b5cf64",
        "#e7b668",
        "#b8c9db",
        "#c4d991",
        "#edb278",
        "#b7cde8",
      ]),
    }));
  const projectiles = (
    Array.isArray(value.projectiles) ? value.projectiles : []
  )
    .slice(0, 100)
    .filter(object)
    .map((p) => ({
      ...point(p, width, height),
      vx: limit(p.vx, -1000, 1000, 0),
      vy: limit(p.vy, -1000, 1000, 0),
      life: limit(p.life, 0, 3, 0),
      damage: limit(p.damage, 0, 1000, 0),
      kind: p.kind === "card" ? "card" : "arrow",
      cardKind: p.cardKind === "stun" ? "stun" : "damage",
      cardSuit: oneOf(
        p.cardSuit,
        ["spade", "heart", "diamond", "club"],
        p.cardKind === "stun" ? "diamond" : "spade",
      ),
      originX: limit(p.originX, 0, width, player.x),
      originY: limit(p.originY, 0, height, player.y),
      maxHits: integer(p.maxHits, 1, 8, 1),
      targetUid: integer(p.targetUid, -1, 1000000, -1),
      returnToPlayer: !!p.returnToPlayer,
      returning: !!p.returning,
      returnAfter: limit(p.returnAfter, 0.1, 2, 0.55),
      age: limit(p.age, 0, 3, 0),
      ricochetsRemaining: integer(p.ricochetsRemaining, 0, 3, 0),
      arrowReturnChecked: Object.hasOwn(p, "arrowReturnChecked") ? !!p.arrowReturnChecked :
        Array.isArray(p.hitIDs) && p.hitIDs.length > 0,
      hitIDs: Array.isArray(p.hitIDs)
        ? [
            ...new Set(
              p.hitIDs.filter((i) => Number.isInteger(i) && i >= 0 && i < 100),
            ),
          ].slice(0, 8)
        : [],
      surprise: !!p.surprise,
      enemy: !!p.enemy,
      sourceIndex: integer(p.sourceIndex, -1, 99, -1),
      color: p.enemy ? "#ebc360" : "#e3d392",
    }));
  const room = integer(value.room, 0, encounterCount, 0),
    scene = value.scene;
  if (
    sceneKind === "dungeon" &&
    (enemies.length === 0 && value.encounterStarted !== false ||
      (room === encounterCount && enemies.some((e) => e.hp > 0)))
  )
    return null;
  // Rescuing Picpic leads directly to Papaille (v0.184). A phase-1 tutorial
  // without enemies is valid; older phase-1/2 snapshots remain readable too.
  const pending =
    sceneKind === "dungeon" && room === encounterCount
      ? "victory"
      : sceneKind === "dungeon" &&
          value.pending === "reward" &&
          enemies.length &&
          enemies.every((e) => e.hp <= 0)
        ? "reward"
        : null;
  return {
    scene,
    seed: integer(value.seed, 0, 100000, 0),
    room,
    encounterCount,
    encounterXP: !!value.encounterXP,
    fieldSerial: integer(value.fieldSerial, 0, 1000000, 0),
    forestClues: sceneKind === "dungeon" ? normalizeForestClues(value.forestClues) : [],
    chest: sceneKind === "dungeon" && object(value.chest) ? point(value.chest, width, height) : null,
    rewardOffer: Array.isArray(value.rewardOffer)
      ? [
          ...new Set(value.rewardOffer.filter((id) => gifts.includes(id))),
        ].slice(0, 3)
      : [],
    selectedGift:
      typeof value.selectedGift === "string" &&
      value.rewardOffer?.includes?.(value.selectedGift) &&
      gifts.includes(value.selectedGift)
        ? value.selectedGift
        : null,
    encounterAwarded:
      !!value.encounterAwarded &&
      enemies.length > 0 &&
      enemies.every((e) => e.hp <= 0),
    ...(Object.hasOwn(value, "encounterStarted")
      ? { encounterStarted: value.encounterStarted !== false }
      : {}),
    step: integer(value.step, 1, 1000, 1),
    gifts: sceneKind === "dungeon" ? blessings : [],
    tutorialPhase: integer(value.tutorialPhase, 0, 2, 0),
    player,
    pet,
    enemies: sceneKind === "village" ? [] : enemies,
    effects,
    projectiles,
    pending,
  };
}

export function decodeSave(text) {
  if (
    typeof text !== "string" ||
    new TextEncoder().encode(text).length > MAX_SAVE_BYTES
  )
    throw Error("El archivo de partida es demasiado grande.");
  let source;
  try {
    source = JSON.parse(text);
  } catch {
    throw Error("El archivo no contiene una partida JSON válida.");
  }
  if (
    !object(source) ||
    ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, SAVE_VERSION].includes(
      source.version,
    ) ||
    typeof source.name !== "string" ||
    !Number.isFinite(source.level)
  )
    throw Error("Formato o versión de partida no compatible.");
  const p = defaultProfile();
  p.name = source.name.trim().slice(0, 18) || p.name;
  p.level = integer(source.level, 1, MAX_PROFILE_LEVEL, 1);
  p.xp = integer(source.xp, 0, maxSavedXP(p.level), 0);
  p.coins = integer(source.coins, 0, 999999, 0);
  p.fur = integer(source.fur, 0, 3, 0);
  p.bestStep = integer(source.bestStep, 0, 1000, 0);
  p.muraAdviceSeen = source.muraAdviceSeen === true;
  p.expeditions = integer(source.expeditions, 0, 999999, 0);
  p.encounters = source.encounters === 7 ? 7 : 3;
  p.petName =
    typeof source.petName === "string"
      ? source.petName.trim().slice(0, 18) || PET_SPECIES.hedgehog.defaultName
      : PET_SPECIES.hedgehog.defaultName;
  p.petActive = source.petActive !== false;
  p.petSpecies = oneOf(source.petSpecies, Object.keys(PET_SPECIES), p.petSpecies);
  p.characterId = oneOf(
    source.characterId,
    Object.keys(PLAYABLE_CHARACTERS),
    p.characterId,
  );
  for (const slot of Object.keys(p.cosmetics)) {
    const code = source.cosmetics?.[slot];
    p.cosmetics[slot] =
      code === -1 ||
      COSMETIC_SETS.some((c) => c.slot === slot && c.code === code)
        ? code
        : 0;
  }
  Object.assign(p, normalizeInventory(source.inventory, source.equipped));
  p.job = oneOf(source.job, Object.keys(JOBS));
  p.secondaryJob = source.secondaryJob;
  p.secondarySkill = source.secondarySkill === 2 ? 2 : 1;
  p.secondaryJob = normalizedSecondary(p);
  p.weapon = oneOf(source.weapon, Object.keys(WEAPONS));
  p.secondary = oneOf(source.secondary, Object.keys(SECONDARIES));
  if (WEAPONS[p.weapon].twoHanded) p.secondary = "bandage";
  p.tutorial = !!source.tutorial;
  if (
    source.journey?.scene === "tutorial" ||
    (!p.tutorial && !source.journey)
  ) {
    p.secondary = "bandage";
    if (WEAPONS[p.weapon].twoHanded) p.weapon = "sword";
  }
  p.volume = limit(source.volume, 0, 0.5, 0.18);
  let remaining = p.level;
  for (const key of Object.keys(p.talents)) {
    p.talents[key] = integer(
      source.talents?.[key],
      0,
      Math.min(3, remaining),
      0,
    );
    remaining -= p.talents[key];
  }
  p.talentBuild =
    source.version >= 10
      ? normalizeTalentBuild(source.talentBuild, remaining)
      : {};
  p.talentMigration =
    source.version < 10 &&
    object(source.talentBuild) &&
    Object.keys(source.talentBuild).length > 0;
  p.journey = source.version >= 2 ? sanitizeJourney(source.journey, p) : null;
  return p;
}

export function encodeSave(profile, journey) {
  return JSON.stringify({
    ...profile,
    version: SAVE_VERSION,
    journey,
    exportedAt: new Date().toISOString(),
  });
}
