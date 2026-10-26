import { AUTHENTIC_GIFTS, eligibleGifts, giftBonus } from "./gifts.js";
import {
  INGREDIENT_TYPES,
  addIngredient,
  removeIngredient,
  startRecipe,
  tickCauldron,
  washCauldron,
  recipeStats,
  recipeEffects,
  chooseIngredientType,
} from "./cooking.js";
import { COSMETIC_SETS } from "./cosmetics.js";
import {
  ORIGINAL_EQUIPMENT_SLOT_LABELS,
  ORIGINAL_PROFILE_EQUIPMENT_LAYOUT,
  equipmentSlotIconPath,
} from "./equipment-slots.js";
import {
  drawOriginalCreature,
  drawOriginalEffect,
  drawOriginalSummon,
  originalAnimationFrameCount,
} from "./original-animation.js";
import {
  normalizeCharges,
  updateCharges,
  consumeCharge,
  chargeCapacity,
  chargeRecovery,
} from "./resources.js";
import {
  initializeOriginalAudio,
  playOriginalSound,
  stopOriginalSound,
  isOriginalSoundPlaying,
  playOriginalMusic,
  stopOriginalMusic,
  isOriginalMusicPlaying,
  setOriginalVolume,
  soundStatus,
  setOriginalEffectVolume,
  setOriginalMusicVolume,
} from "./audio.js";
import { createAmbientAudio } from "./ambient-audio.js";
import {
  initializeArt,
  artStatus,
  seeded,
  TAU,
  decoration,
  mouse,
  drawPlayerCharacter,
  drawPet,
  enemy,
  chest,
  label,
  shadow,
} from "./art.js";
import { makeScene, sceneSpawn, selectableExpeditions } from "./maps.js";
import { createSkillSystem } from "./skill-system.js";
import { createTargetingSystem, skillTargeting } from "./targeting.js";
import { TESTIMONIES, REPORT_RULES, tickReportPoison } from "./journalism.js";
import { FOREST_CLUES, normalizeForestClues, drawForestClue } from "./forest-story.js";
import { objectiveTarget, objectiveProjection } from "./objectives.js";
import { createDialogueText } from "./dialogue-text.js";
import { measureDialoguePage, renderDialoguePage } from "./dialogue-layout.js";
import { vanishHealing } from "./damage-effects.js";
import { CARD_PROJECTILE_EFFECTS, OBJECTIVE_GROUND_EFFECT } from "./effect-data.js";
import { isPersistentEffect } from "./effect-state.js";
import { drawActorOverlay, playerIndicators } from "./actor-overlays.js";
import { addBarrier, absorbBarrier, tickBarrier } from "./barriers.js";
import { areaDefenseMultiplier, areaAttackMultiplier } from "./area-effects.js";
import { plantHealthLimit, plantGrowthSpeed, lilyHealingTarget } from "./plant-data.js";
import { nearestEnemyDecoy, summonsInArea } from "./enemy-targets.js";
import { applyPlantPoison, tickPlantPoison } from "./plant-effects.js";
import { TRAP_RULES, isTrapArmed, trapDamage, movementTraumaDamage } from "./traps.js";
import { skillInstructions } from "./skill-data.js";
import { addArrowPoison, tickArrowPoison, tryReturnArrow } from "./archery.js";
import { WEAPON_POISON_RULES, isEnemyPoisoned, instantDaggerPoisonDamage, tickWeaponPoison, addCardPoison, tickCardPoison, preserveNonDaggerPoison } from "./poisons.js";
import { bandageAmounts, startBandageTreatment, tickBandageTreatment } from "./bandages.js";
import { canCompleteTutorialRescue, tutorialRescueInstructions } from "./tutorial-data.js";
import { SHIELD_RULES, hasUsableShield, resolveShieldHit } from "./shields.js";
import { SWORD_RULES, swordChainMultiplier, recordSwordTargets, expireSwordChain } from "./swords.js";
import { createPetSystem } from "./pets.js";
import { buildEncounterPlan } from "./encounters.js";
import { ENCOUNTER_RULES } from "./encounter-data.js";
import { ENEMY_RULES, ENEMY_PROGRESSION, enemyCreatureId, weakenedEnemyDamage, projectileAttackOrigin } from "./enemy-data.js";
import { xpNeededForLevel } from "./progression-data.js";
import { MAPS } from "./map-data.js";
import { CHARACTERS, PET_SPECIES, PLAYER_CHARACTER } from "./characters.js";

import {
  defaultProfile,
  decodeSave,
  encodeSave,
  MAX_SAVE_BYTES,
} from "./persistence.js";
import {
  WEAPONS,
  SECONDARIES,
  WEAPON_ACTIVATION_GATE_MS,
  createAttack,
  advanceAttack,
  weaponDamage,
  inAttackArc,
} from "./combat.js";
import {
  JOBS as jobs,
  ABILITIES,
  CARDS,
  SECONDARY_JOB_LEVEL,
  resolveJobSkill,
} from "./jobs.js";
import {
  TALENT_TREES,
  DEMO_LOCKED_TALENT_TIER,
  talentSpent,
  canLearnTalent,
  learnTalent,
  talentBonus,
} from "./talents.js";
import {
  SLOTS,
  STAT_NAMES,
  itemDetails,
  equipmentBonus,
  expeditionLoot,
} from "./inventory.js";

const $ = (id) => document.getElementById(id);
const RECOVERED_ABILITY_ICON_IDS = new Set([1006, 1007, 1009]);
const ingredientImages = INGREDIENT_TYPES.map((t) => {
  const img = new Image();
  img.src = t.icon;
  return img;
});
const objectiveArrow = new Image();
objectiveArrow.src = "assets/original/interface/fleche.png";
const bowAimImage = new Image();
bowAimImage.src = "assets/original/interface/zone/zl.png";
const canvas = $("world"),
  ctx = canvas.getContext("2d");
const SAVE_KEY = "tfma-local-v1";
const AUDIO_SETTINGS_KEY = "tfma-audio-v1";
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function resetCameraEffects() {
  camera.effectX = 0;
  camera.effectY = 0;
  camera.shakeStartedAt = -1;
  camera.shakeUntil = -1;
  camera.shakeAngle = 0;
}
function cameraPush(x, y) {
  camera.effectX = x;
  camera.effectY = y;
}
function meleeCameraKick(angle) {
  cameraPush(Math.cos(angle) * 25, Math.sin(angle) * 25);
}
function cameraDamageShake(source) {
  const angle = source
    ? Math.atan2(player.y - source.y, player.x - source.x)
    : player.facing < 0 ? 0 : Math.PI;
  camera.shakeStartedAt = time;
  camera.shakeUntil = time + 0.1;
  camera.shakeAngle = angle;
}
function faceFromVector(actor, dx, dy) {
  const length = Math.hypot(dx, dy);
  if (length > 0 && Math.abs(dx / length) > 0.1) {
    const facing = dx < 0 ? -1 : 1;
    if (facing !== actor.facing) {
      actor.facing = facing;
      actor.turnSquashStartedAt = time;
    }
  }
}
function tickMovementAnimation(actor, dt, speedFactor = 1, moving = actor.moving) {
  if (!moving) {
    actor.movementAnimationTime = 0;
    actor.movementAnimationActive = false;
    return;
  }
  if (!actor.movementAnimationActive) {
    actor.movementAnimationTime = 0;
    actor.movementAnimationActive = true;
  }
  actor.movementAnimationTime += dt * Math.max(speedFactor, 0.5);
}
const escapeHTML = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const defaults = defaultProfile;
function readSave() {
  try {
    const text = localStorage.getItem(SAVE_KEY);
    return text ? decodeSave(text) : null;
  } catch {
    return null;
  }
}
let saved = readSave(),
  profile = saved || defaults();
function readAudioSettings() {
  const fallback = {
    master: clamp(profile.volume ?? 0.55, 0, 1),
    music: 1,
    effects: 1,
  };
  try {
    const stored = JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY) || "null");
    return {
      master: clamp(Number(stored?.master ?? fallback.master), 0, 1),
      music: clamp(Number(stored?.music ?? 1), 0, 1),
      effects: clamp(Number(stored?.effects ?? 1), 0, 1),
    };
  } catch {
    return fallback;
  }
}
let audioSettings = readAudioSettings();
const ambientAudio = createAmbientAudio({
  play: playOriginalSound,
  isPlaying: isOriginalSoundPlaying,
  stop: stopOriginalSound,
});
let sceneMusicMode = "";
let sceneMusicNextAt = 0;
let mode = "title",
  scene,
  player,
  pet,
  enemies = [],
  particles = [],
  effects = [],
  projectiles = [],
  time = 0,
  lastTime = 0,
  room = 0,
  step = 1,
  gifts = [],
  tutorialPhase = 0;
let localEmote = null;
let localMouseEmote = null;
const localEmoteImages = Array.from({ length: 10 }, (_, index) => {
  const image = new Image();
  image.src = `assets/original/interface/emote/T${index + 1}.png`;
  return image;
});
let encounterCount = 3;
let selectedDifficulty = 1;
let encounterAwarded = false;
let encounterStarted = true;
let chestOpeningStartedAt = null;
let talentOpenTree = "sword";
let talentOpenNode = 0;
let talentCategory = "weapons";
let loadoutPreview = null;
let fieldSerial = 0;
let forestClues = [];
let papailleClueDialogue = null;
let currentQuestKey = null;
let pendingQuestDescription = "";
let questTransitionId = 0;
const dialogueText = createDialogueText();
let targetingSystem = null;
let rewardOffer = [],
  selectedGift = null,
  encounterXP = true;
let xpNoticeTimer = 0;
let xpLevelCue = null;
const bonus = (effect) =>
  talentBonus(profile, effect) + equipmentBonus(profile, effect);
let w = innerWidth,
  h = innerHeight,
  zoom = 1,
  camera = {
    x: 1100,
    y: 700,
    effectX: 0,
    effectY: 0,
    shakeStartedAt: -1,
    shakeUntil: -1,
    shakeAngle: 0,
  },
  keys = new Set(),
  pointer = { x: 0, y: 0, down: false, aimed: false },
  modalKind = "",
  selectedExpeditionId = null,
  dialogueQueue = [],
  dialogueAction = null,
  nearby = null;
let announcementTimer = 0,
  toastTimer = 0,
  autosaveTimer = 0,
  roomClearTimer = 0,
  skillTick = 0,
  walkTime = 0,
  audio = null,
  muted = true;
let soundReady = false,
  renderReady = false;
const furColors = ["#9f8162", "#d3c6a7", "#716f70", "#bd916b"];
const giftsCatalog = [
  {
    id: "power",
    icon: "⚔",
    name: "Filo de la naturaleza",
    description: "+20 % de daño con todas tus armas.",
    apply: () => {},
  },
  {
    id: "vitality",
    icon: "♥",
    name: "Corazón del bosque",
    description: "+25 de vida máxima y recupera 25 de vida.",
    apply: () => {
      player.hp = Math.min(maxHP(), player.hp + 25);
    },
  },
  {
    id: "haste",
    icon: "➶",
    name: "Paso ligero",
    description: "+12 % de velocidad al moverte.",
    apply: () => {},
  },
  {
    id: "recovery",
    icon: "✚",
    name: "Manos sanadoras",
    description: "Las vendas recuperan 15 puntos de vida adicionales.",
    apply: () => {},
  },
  {
    id: "thorns",
    icon: "❋",
    name: "Espinas protectoras",
    description: "Devuelve 8 de daño a quienes te golpeen.",
    apply: () => {},
  },
  {
    id: "companion",
    icon: "✦",
    name: "Amistad inquebrantable",
    description: "Picpic hace 6 puntos de daño adicionales.",
    apply: () => {},
  },
  {
    id: "refresh",
    icon: "⚗",
    name: "Esencia fresca",
    description: "Tus habilidades se recargan un 20 % más rápido.",
    apply: () => {},
  },
  {
    id: "renew",
    icon: "☀",
    name: "Aliento de Elisah",
    description: "Recupera toda la vida al recibir este regalo.",
    apply: () => {
      player.hp = maxHP();
    },
  },
  {
    id: "archer",
    icon: "➶",
    name: "Tensión del arco",
    description: "+12 de daño por flecha.",
    weapon: "bow",
    apply: () => {},
  },
  {
    id: "duelist",
    icon: "⚔",
    name: "Filo del duelista",
    description: "+9 de daño cuerpo a cuerpo.",
    melee: true,
    apply: () => {},
  },
  {
    id: "guard",
    icon: "◈",
    name: "Guardia de Elisah",
    description: "Reduce en 3 el daño de cada golpe recibido.",
    secondary: "shield",
    apply: () => {},
  },
  {
    id: "botany",
    icon: "❋",
    name: "Elixir del claro",
    description: "+6 de daño por pulso de elixires y plantas.",
    job: "botanist",
    apply: () => {},
  },
  {
    id: "banquet",
    icon: "♨",
    name: "Receta secreta",
    description: "+6 de daño por pulso de calderos y trampas.",
    job: "chef",
    apply: () => {},
  },
  {
    id: "cards",
    icon: "♠",
    name: "As de Elisah",
    description: "+16 de daño con las cartas ofensivas.",
    job: "trickster",
    apply: () => {},
  },
  {
    id: "scoop",
    icon: "✎",
    name: "Primicia",
    description: "+10 de daño con testimonios y entrevista.",
    job: "journalist",
    apply: () => {},
  },
];
giftsCatalog.push(
  ...AUTHENTIC_GIFTS.map((g) => ({
    ...g,
    apply: () => {
      if (g.effect.endsWith("Charges")) {
        const weapon = g.effect.slice(0, -7),
          state = player.charges[weapon];
        if (state)
          state.count = Math.min(
            chargeCapacity(profile, weapon, gifts),
            state.count + g.amount,
          );
      }
    },
  })),
);
const countGift = (id) => gifts.filter((g) => g === id).length;
const giftEffect = (effect) => giftBonus(gifts, effect);
function playerClothing() {
  const outfit = [];
  for (const slot of ["head", "body", "cape", "accessory"]) {
    let code = profile.cosmetics[slot];
    if (code === 0) {
      const gearSlot = slot === "accessory" ? "charm" : slot;
      const item = profile.inventory.find(
        (i) => i.id === profile.equipped[gearSlot],
      );
      code = item ? itemDetails(item).appearance : 0;
    }
    if (code > 0) outfit.push(code);
  }
  return outfit;
}
function originalSound(name, freq = 400, duration = 0.1, type = "sine", localVolume = 1) {
  if (muted) return;
  if (!playOriginalSound(name, { volume: localVolume }))
    tone(freq, duration, type, 0.13 * localVolume);
}
function playHitSound() {
  if (!muted) playOriginalSound("bibli/2/touche", { volume: 0.55 });
}
function maxHP() {
  return (
    100 +
    (profile.level - 1) * 8 +
    profile.talents.vitality * 15 +
    bonus("maxHp") +
    countGift("vitality") * 25
  );
}
function petMaxHP() {
  return petSystem.maxHP();
}
function grantBarrier(amount, recipient = player) {
  return addBarrier(recipient === player ? player.states : recipient, amount);
}
function healPlayer(amount) {
  const effective = Math.max(0, amount) * (1 + bonus("healingReceived"));
  const actual = Math.min(maxHP() - player.hp, effective);
  player.hp = Math.min(maxHP(), player.hp + effective);
  return { actual, excess: Math.max(0, effective - actual), amount: effective };
}
function activeCauldron() {
  return effects.find(
    (e) => e.kind === "pool" && e.job === "chef" && e.life > 0 && e.cooking,
  );
}
function hasChefSkill() {
  return profile.job === "chef" || resolveJobSkill(profile, 3)?.job === "chef";
}
function spawnIngredient(type, x, y) {
  if (type === null || type === undefined) {
    const weights = [
      Math.max(0.05, 0.5 ** giftEffect("ingredientAttackRarity")),
      Math.max(0.05, 0.5 ** giftEffect("ingredientDefenseRarity")),
      Math.max(0.05, 0.5 ** giftEffect("ingredientHealingRarity")),
    ];
    type = chooseIngredientType(weights);
  }
  effects.push({
    kind: "ingredient",
    ingredientType: type,
    x,
    y,
    age: 0,
    life: 60,
    maxLife: 60,
    r: 20,
    color: ["#edb278", "#b7cde8", "#c4d991"][type],
  });
}
function useCauldron(pool) {
  if (!pool || distance(pool, player) > 200) return false;
  if (pool.cooking.phase === "dirty") {
    const result = washCauldron(pool.cooking);
    if (result.allowed) {
      healPlayer(result.healing);
      healPet(result.healing, false, 200);
      originalSound("soin");
      spawnFX(48, player.x, player.y, 1, 0.55);
      save();
    }
    return result.allowed;
  }
  if (pool.cooking.phase !== "collecting") return false;
  const item = effects
    .filter(
      (e) =>
        e.kind === "ingredient" &&
        e.life > 0 &&
        distance(e, player) <= 200 &&
        distance(e, pool) <= 200,
    )
    .sort((a, b) => distance(a, player) - distance(b, player))[0];
  if (!item) return false;
  const added = collectCauldronIngredient(pool, item);
  if (added) save();
  return added;
}
function collectCauldronIngredient(pool, item) {
  if (!pool?.cooking || !item || !(item.life > 0)) return false;
  const result = addIngredient(pool.cooking, item.ingredientType);
  if (!result.added) return false;
  item.life = 0;
  const fireDamage = giftEffect("cauldronIngredientFire");
  if (fireDamage > 0) {
    for (const target of enemies)
      if (target.hp > 0 && distance(target, pool) < pool.r)
        hurtEnemy(target, fireDamage, "chef-cauldron");
    effects.push({
      kind: "ring",
      x: pool.x,
      y: pool.y,
      r: pool.r,
      life: 0.35,
      maxLife: 0.35,
      color: "#ed8d43",
    });
  }
  originalSound("plop1");
  if (result.ready) {
    startRecipe(pool.cooking, 8 + bonus("chefDuration"));
    pool.recipeDuration = 8 + bonus("chefDuration");
    pool.tick = 0;
    originalSound("cuisson1");
  }
  return true;
}
function inArea(kind, entity, job) {
  return effects.some(
    (e) =>
      e.kind === kind &&
      e.life > 0 &&
      (!job || e.job === job) &&
      distance(e, entity) < e.r,
  );
}
function spawnTestimony(x, y, subtype = "heal") {
  if (effects.filter((e) => e.kind === "testimony" && e.life > 0).length >= 6)
    return;
  effects.push({
    kind: "testimony",
    subtype,
    x,
    y,
    life: 15,
    maxLife: 15,
    r: 18,
    color: (TESTIMONIES[subtype] || TESTIMONIES.heal).color,
  });
}
function plantMatureAt(e) {
  return 1.5 * (1 - (e.subtype === "bramble" ? bonus("plantMaturation") : 0));
}
function healPet(amount, revive = false, range = 160) {
  const wasInjured = pet.injured;
  const result = petSystem.heal(amount, revive, range);
  if (result && wasInjured && !pet.injured) {
    pet.reanimationStartedAt = time;
    originalSound("soins2", 500, 0.1, "sine", 0.6);
    spawnFX(48, pet.x, pet.y, 1, 1);
  }
  if (result) completeTutorialRescue();
  return result;
}
function completeTutorialRescue() {
  if (!canCompleteTutorialRescue(scene.kind, tutorialPhase, pet)) return false;
  tutorialPhase = 1;
  pet.hp = petMaxHP();
  announce("¡Un nuevo amigo!", "PICPIC TE ACOMPAÑARÁ EN TU AVENTURA");
  updateQuest();
  save();
  return true;
}
function shieldBlockEffects(source, blocked) {
  if (giftEffect("shieldChargeReturn") > 0 &&
      player.charges.shield.count < chargeCapacity(profile, "shield", gifts) &&
      Math.random() < Math.min(0.75, giftEffect("shieldChargeReturn"))) {
    player.charges.shield.count++;
    floating("Carga recuperada", player.x, player.y - 90, "#dce7ac");
  }
  if (source?.hp > 0 && giftEffect("shieldReflect"))
    hurtEnemy(source, blocked * giftEffect("shieldReflect"), "reflect");
  healPlayer(blocked * giftEffect("shieldHeal"));
  grantBarrier(blocked * giftEffect("shieldBarrier"));
  if (giftEffect("shieldStoredHit")) {
    player.states.storedHit = Math.min(100, (player.states.storedHit || 0) + blocked * giftEffect("shieldStoredHit"));
    player.states.storedHitTime = 6;
  }
  if (source?.hp > 0 && bonus("shieldReflect")) hurtEnemy(source, bonus("shieldReflect"), "reflect");
  player.states.guard = bonus("shieldAfterguard") ? 4 : 0;
  if (player.charges.shield.count <= 0) stopGuard();
  floating("Bloqueo", player.x, player.y - 70, "#dce7ac");
  effects.push({ kind: "ring", x: player.x, y: player.y, r: 60, life: 0.25, maxLife: 0.25, color: "#dce7ac" });
  originalSound("ting", 700, 0.06, "triangle", 0.4);
}
function stopGuard() {
  if (!player?.guarding) return;
  player.guarding = false;
  player.guardReleasePose = true;
}
function protectedAllyDamage(amount, ally, source, origin = source) {
  if (
    !hasUsableShield(profile) ||
    !player.guarding ||
    distance(player, ally) > SHIELD_RULES.allyRadius + giftEffect("shieldAllyRadius")
  )
    return amount;
  const block = resolveShieldHit(amount, player, profile, origin, { blockReduction: bonus("blockReduction") });
  if (!block.blocked) return amount;
  shieldBlockEffects(source, Math.max(0, amount - block.amount));
  return block.amount;
}
function hurtPet(amount, source = null, origin = source) {
  if (!profile.petActive || pet.injured || pet.invuln > 0 || scene.kind !== "dungeon") return;
  const before = pet.hp;
  const result = petSystem.hurt(
    protectedAllyDamage(weakenedEnemyDamage(amount, source), pet, source, origin),
    source,
  );
  if (pet.hp < before) playHitSound();
  return result;
}
function hurtSummon(e, amount, source, origin = source) {
  if (!(e.life > 0) || !(e.hp > 0)) return;
  amount = protectedAllyDamage(weakenedEnemyDamage(amount, source), e, source, origin);
  e.hp = Math.max(0, e.hp - amount);
  if (
    e.kind === "plant" &&
    e.hp > 0 &&
    source?.hp > 0 &&
    giftEffect("plantBeeTeam")
  ) {
    let bee = effects.find(
      (other) => other.kind === "bee" && other.guardPlantUid === e.uid,
    );
    if (!bee && effects.filter((other) => other.kind === "bee").length < 6) {
      bee = {
        kind: "bee",
        guardPlantUid: e.uid,
        x: e.x,
        y: e.y - 20,
        life: 5,
        maxLife: 5,
        tick: 0,
        damage: 5,
        age: 0,
        r: 10,
        color: "#e9b75d",
      };
      effects.push(bee);
    }
    if (bee) {
      bee.life = 5;
      bee.maxLife = 5;
      bee.tick = Math.min(bee.tick || 0, 0.2);
    }
  }
  if (
    e.kind === "plant" &&
    e.subtype === "bramble" &&
    e.growth > 0 &&
    source?.hp > 0
  )
    hurtEnemy(source, amount * 0.25 * (giftEffect("plantFallow") ? 1.5 : 1), "reflect");
  if (e.hp <= 0 && e.life > 0) {
    e.life = 0;
    if (
      e.kind === "plant" &&
      !e.weedSpawned &&
      giftEffect("plantWeeds") &&
      effects.filter((other) => other.kind === "plant" && other.life > 0)
        .length < 8
    )
      effects.push({
        kind: "plant",
        uid: ++fieldSerial,
        subtype: "bramble",
        hp: plantHealthLimit({ subtype: "bramble" }, bonus("plantHealth"), !!giftEffect("plantFallow")),
        age: 0,
        growth: 0,
        growthTime: 0,
        weedSpawned: true,
        x: e.x,
        y: e.y,
        r: 115,
        life: 12,
        maxLife: 12,
        tick: 0,
        damage: 10,
        color: "#b5cf64",
      });
  }
}
function damageSummons(x, y, r, amount, source) {
  const victims = summonsInArea(effects, { x, y }, r, distance, !!bonus("chefDecoy"));
  const petTouched = profile.petActive && distance(pet, { x, y }) < r;
  if (petTouched) hurtPet(amount, source);
  for (const victim of victims) {
    hurtSummon(victim, amount, source);
  }
  return petTouched || victims.length > 0;
}
function enemyAreaHit(source, center, radius, amount, playerPadding = 0) {
  const playerHit = distance(player, center) < radius + playerPadding;
  if (playerHit) hurtPlayer(amount, source);
  const allyHit = damageSummons(center.x, center.y, radius, amount, source);
  return playerHit || allyHit;
}
function pauseEnemyAttackRecovery(e) {
  if (!e || e.attackRecoveryHit || !(e.attackRecoveryUntil > time)) return;
  e.attackRecoveryHit = true;
  const frame = (e.attackRecoveryStartFrame || 0) +
    Math.max(0, time - e.attackRecoveryStartedAt) * 60;
  e.attackRecoveryStartFrame = frame;
  e.attackRecoveryStartedAt = time + 0.1;
  e.attackRecoveryUntil += 0.1;
}
function xpNeeded() {
  return xpNeededForLevel(profile.level);
}
function makeXPNoticeAnimation(level, xp, amount) {
  if (!(amount > 0)) return null;
  const duration = 2;
  const segments = [];
  let consumed = 0;
  while (consumed < amount) {
    const threshold = xpNeededForLevel(level);
    const needed = Math.max(0, threshold - xp);
    if (needed <= 0) {
      level++;
      xp = 0;
      continue;
    }
    const gained = Math.min(needed, amount - consumed);
    const startTime = duration * consumed / amount;
    consumed += gained;
    segments.push({
      startTime,
      endTime: duration * consumed / amount,
      from: xp / threshold,
      to: (xp + gained) / threshold,
      levelUp: gained >= needed,
      sounded: false,
    });
    xp += gained;
    if (gained >= needed) {
      level++;
      xp = 0;
    }
  }
  if (segments.at(-1)?.levelUp)
    segments.push({
      startTime: duration,
      endTime: duration,
      from: 0,
      to: 0,
      levelUp: false,
      sounded: false,
    });
  return { duration, elapsed: 0, segments };
}
function updateXPNoticeAnimation(dt) {
  if (!xpLevelCue) return;
  const previous = xpLevelCue.elapsed;
  xpLevelCue.elapsed = Math.min(
    xpLevelCue.duration,
    xpLevelCue.elapsed + dt,
  );
  for (const segment of xpLevelCue.segments) {
    if (
      segment.levelUp &&
      !segment.sounded &&
      previous < segment.endTime &&
      xpLevelCue.elapsed >= segment.endTime
    ) {
      segment.sounded = true;
      originalSound("niveausup", 800, 0.3);
    }
  }
  const segments = xpLevelCue.segments;
  let index = segments.findIndex(
    (segment, i) =>
      xpLevelCue.elapsed < segment.endTime || i === segments.length - 1,
  );
  index = Math.max(0, index);
  const segment = segments[index];
  const fraction = segment.endTime > segment.startTime
    ? clamp(
        (xpLevelCue.elapsed - segment.startTime) /
          (segment.endTime - segment.startTime),
        0,
        1,
      )
    : 1;
  const fill = $("xp-notice").querySelector("i");
  if (fill)
    fill.style.width = `${100 * (segment.from + (segment.to - segment.from) * fraction)}%`;
  if (xpLevelCue.elapsed >= xpLevelCue.duration) xpLevelCue = null;
}
function talentPoints() {
  return Math.max(
    0,
    profile.level -
      Object.values(profile.talents).reduce((a, b) => a + b, 0) -
      talentSpent(profile.talentBuild),
  );
}
function save() {
  try {
    localStorage.setItem(SAVE_KEY, encodeSave(profile, captureJourney()));
    saved = { ...profile };
    return true;
  } catch {
    toast("El navegador no permite guardar la partida.");
    return false;
  }
}
function captureJourney() {
  if (!scene || !player || player.dead || mode !== "playing") return null;
  return {
    scene: scene.mapId,
    seed: scene.seed,
    room,
    encounterCount,
    encounterAwarded,
    encounterStarted,
    encounterXP,
    fieldSerial,
    forestClues: [...forestClues],
    chest: scene.interactables.find(o => o.id === "chest") ?? null,
    rewardOffer: [...rewardOffer],
    selectedGift,
    step,
    gifts: [...gifts],
    tutorialPhase,
    player: { ...player },
    pet: { ...pet },
    enemies: enemies.map((e) => ({ ...e })),
    effects: effects
      .filter(isPersistentEffect)
      .map((e) => ({ ...e })),
    projectiles: projectiles.map((p) => ({ ...p })),
    pending:
      modalKind === "reward"
        ? "reward"
        : scene.kind === "dungeon" && room >= encounterCount
          ? "victory"
          : null,
  };
}
function resumeRecord(record) {
  const journey = record.journey;
  profile = { ...record };
  delete profile.journey;
  finishModal();
  $("dialogue").hidden = true;
  dialogueQueue = [];
  dialogueAction = null;
  gifts = journey?.gifts ? [...journey.gifts] : [];
  step = journey?.step || 1;
  room = journey?.room || 0;
  encounterCount = journey?.encounterCount || profile.encounters || 3;
  if (!journey) {
    enterScene(profile.tutorial ? "village" : "tutorial");
    return;
  }
  const legacyRouteOffset =
    journey.scene === "dungeon" && journey.encounterStarted === undefined
      ? Math.min(room, encounterCount - 1) * MAPS.dungeon.size.width
      : 0;
  enterScene(journey.scene, journey.seed, true);
  encounterAwarded = !!journey.encounterAwarded;
  encounterStarted = journey.encounterStarted !== false;
  encounterXP = !!journey.encounterXP;
  fieldSerial = journey.fieldSerial || 0;
  forestClues = normalizeForestClues(journey.forestClues);
  if (journey.chest && scene.kind === "dungeon" && encounterAwarded && room < encounterCount)
    scene.interactables.push({ ...journey.chest, id: "chest", text: "Abrir el cofre de Elisah" });
  rewardOffer = [...(journey.rewardOffer || [])];
  selectedGift = journey.selectedGift || null;
  Object.assign(player, journey.player, {
    x: journey.player.x + legacyRouteOffset,
    dead: false,
    moving: false,
    dodging: 0,
  });
  Object.assign(pet, journey.pet, { x: journey.pet.x + legacyRouteOffset, moving: false });
  enemies = journey.enemies.map((enemy) => ({
    ...enemy,
    x: enemy.x + legacyRouteOffset,
    targetX: enemy.targetX + legacyRouteOffset,
  }));
  effects = journey.effects.map((effect) => ({
    ...effect,
    ...(Number.isFinite(effect.x) ? { x: effect.x + legacyRouteOffset } : {}),
    ...(Number.isFinite(effect.startX) ? { startX: effect.startX + legacyRouteOffset } : {}),
    ...(Number.isFinite(effect.landingX) ? { landingX: effect.landingX + legacyRouteOffset } : {}),
  }));
  projectiles = journey.projectiles.map((projectile) => ({
    ...projectile,
    x: projectile.x + legacyRouteOffset,
    originX: projectile.originX + legacyRouteOffset,
  }));
  tutorialPhase = journey.tutorialPhase;
  completeTutorialRescue();
  camera.x = player.x;
  camera.y = player.y;
  resetCameraEffects();
  updateQuest();
  updateHUD();
  if (journey.pending === "reward") openGifts();
  if (journey.pending === "victory") victory(false);
  if (profile.talentMigration) {
    toast(
      "Se recuperaron los talentos originales. Tus puntos del árbol anterior están disponibles para redistribuir en T.",
    );
    delete profile.talentMigration;
  }
}
function tone(freq = 400, duration = 0.08, type = "sine", volume = 0.13) {
  if (muted || !audio || audioSettings.effects === 0) return;
  const osc = audio.createOscillator(),
    gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(
    Math.max(30, freq * 0.6),
    audio.currentTime + duration,
  );
  gain.gain.setValueAtTime(
    volume * audioSettings.master * audioSettings.effects,
    audio.currentTime,
  );
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
}
function initAudio() {
  if (soundReady) return;
  soundReady = true;
  initializeOriginalAudio();
  try {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    muted = audioSettings.master === 0;
    updateSound();
  } catch {
    muted = true;
  }
}
function updateSound() {
  setOriginalVolume(muted ? 0 : audioSettings.master);
  setOriginalEffectVolume(audioSettings.effects);
  setOriginalMusicVolume(audioSettings.music);
  $("sound-button").textContent = muted ? "♪̸" : "♪";
  $("sound-button").setAttribute(
    "aria-label",
    muted ? "Activar sonido" : "Silenciar sonido",
  );
}
function saveAudioSettings() {
  try {
    localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
  } catch {
    // Audio preferences are optional and never affect the adventure save.
  }
}
function updateSceneAudio() {
  if (mode !== "playing" || !scene) return;
  const now = time;
  const nextMode =
    scene.kind === "dungeon" && encounterStarted && !encounterAwarded
      ? "combat"
      : "base";
  if (nextMode !== sceneMusicMode) {
    stopOriginalMusic(900);
    const initialSceneMusic = !sceneMusicMode;
    sceneMusicMode = nextMode;
    // MondeADV starts the first world track after 5 s; the combat flag packet
    // restarts either pool after 1 s when its value changes.
    sceneMusicNextAt = now + (initialSceneMusic ? 5 : 1);
  }
  let musicPlaying = isOriginalMusicPlaying();
  if (musicPlaying && sceneMusicNextAt !== Infinity && now >= sceneMusicNextAt)
    sceneMusicNextAt = Infinity;
  if (!musicPlaying && sceneMusicNextAt === Infinity) {
    sceneMusicNextAt = now + (nextMode === "combat" ? 1 : 10);
  }
  if (!musicPlaying && now >= sceneMusicNextAt) {
    const tracks = nextMode === "combat"
      ? [
          ["musique/tfmadv_combat1", 0.5],
          ["musique/tfmadv_combat2", 0.5],
          ["musique/tfmadv_combat3", 0.5],
          ["musique/tfmadv_combat4", 0.5],
        ]
      : [
          ["musique/tfmadv_musique2", 0.4],
          ["musique/tfmadv_musique3", 0.4],
        ];
    const [name, volume] = tracks[Math.floor(Math.random() * tracks.length)];
    if (playOriginalMusic(name, { volume, fadeInMs: 900 }))
      sceneMusicNextAt = now + 5;
    else sceneMusicNextAt = now + 1;
    musicPlaying = isOriginalMusicPlaying();
  }
  ambientAudio.update(now);
}
function resetSceneAudio() {
  stopOriginalMusic(900);
  ambientAudio.reset(time);
  sceneMusicMode = "";
  sceneMusicNextAt = time;
}
function toast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("visible");
  toastTimer = 3.4;
}
function announce(text, sub = "") {
  const el = $("announcements");
  el.replaceChildren();
  el.append(document.createTextNode(text));
  if (sub) {
    const sm = document.createElement("small");
    sm.textContent = sub;
    el.append(sm);
  }
  announcementTimer = 3.5;
}
function floating(text, x, y, color = "#fff0bb") {
  particles.push({
    kind: "text",
    text,
    x,
    y,
    vy: -30,
    life: 1.2,
    maxLife: 1.2,
    color,
  });
}
function burst(x, y, color, n = 12) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU,
      s = 25 + Math.random() * 85;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.4 + Math.random() * 0.4,
      maxLife: 0.8,
      color,
      size: 2 + Math.random() * 3,
    });
  }
}
function spawnFX(id, x, y, life = 0.7, scale = 0.5) {
  effects.push({
    kind: "native",
    fxId: id,
    x,
    y,
    age: 0,
    life,
    maxLife: life,
    scale,
  });
}
function spawnLeafAlly(x, y, duration = 4) {
  if (effects.filter((e) => e.kind === "livingLeaf" && e.life > 0).length >= 3)
    return false;
  effects.push({
    kind: "livingLeaf",
    x,
    y,
    hp: 45,
    age: 0,
    life: duration,
    maxLife: duration,
    tick: 0,
    attackTime: 0,
    damage: 10,
    r: 280,
    facing: 1,
    moving: false,
    color: "#b5cf64",
  });
  spawnFX(86, x, y, 0.8, 0.55);
  return true;
}
function spawnLivingLeaf(source) {
  if (
    source.job !== "botanist" ||
    !giftEffect("elixirLeaf") ||
    source.leafSpawned ||
    effects.filter((e) => e.kind === "livingLeaf" && e.life > 0).length >= 3
  )
    return;
  source.leafSpawned = true;
  spawnLeafAlly(source.x, source.y, Math.max(4, source.poolLife || 0));
}
function drawSummon(e) {
  if (e.kind === "pool" && e.job === "chef") {
    const drawn = drawOriginalSummon(
      ctx,
      8,
      e.cooking?.phase === "cooking" ? "statique:cuisson" : "statique",
      e.x,
      e.y,
      e.age * 1000,
      1,
      0.45,
    );
    if (e.cooking) {
      const state = e.cooking;
      label(
        ctx,
        state.phase === "cooking"
          ? `${recipeStats(state).name} · ${Math.ceil(state.remaining)}s`
          : state.phase === "dirty"
            ? "Limpiar · clic / E"
            : `Ingredientes ${state.ingredients.length}/3`,
        e.x,
        e.y - 65,
        "#e9dfb4",
        11,
      );
      for (let i = 0; i < 3; i++)
        label(
          ctx,
          state.ingredients[i] === 0
            ? "⚔"
            : state.ingredients[i] === 1
              ? "◈"
              : state.ingredients[i] === 2
                ? "✚"
                : "○",
          e.x - 22 + i * 22,
          e.y - 45,
          ["#edb278", "#b7cde8", "#c4d991"][state.ingredients[i]] || "#c1b995",
          15,
        );
    }
    return drawn;
  }
  if (e.kind === "trap")
    return e.triggered
      ? true
      : drawOriginalSummon(ctx, 9, "statique", e.x, e.y, e.age * 1000, 1, 0.45);
  if (e.kind === "plant") {
    if (e.age < plantMatureAt(e)) {
      drawOriginalEffect(ctx, 61, e.x, e.y, e.age * 1000, 0.5);
      return true;
    }
    return drawOriginalSummon(
      ctx,
      e.subtype === "lily" ? 27 : e.subtype === "bramble" ? 26 : 25,
      e.subtype === "thorn" && e.attackTime > 0 ? "attaque1" : "statique",
      e.x,
      e.y,
      e.subtype === "thorn" && e.attackTime > 0
        ? (0.3 - e.attackTime) * 1000
        : e.age * 1000,
      1,
      0.45 * (1 + 0.2 * (e.growth || 0)),
    );
  }
  if (e.kind === "bee") {
    ctx.save();
    ctx.translate(e.x, e.y + Math.sin(e.age * 12) * 3);
    ctx.rotate(Math.sin(e.age * 9) * 0.12);
    ctx.fillStyle = "#f7edcb";
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.ellipse(-4, -8, 5, 3, -0.5, 0, TAU);
    ctx.ellipse(4, -8, 5, 3, 0.5, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#efc24f";
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 6, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#4b3b27";
    ctx.lineWidth = 2;
    for (const x of [-3, 2]) {
      ctx.beginPath();
      ctx.moveTo(x, -5);
      ctx.lineTo(x, 5);
      ctx.stroke();
    }
    ctx.fillStyle = "#392d22";
    ctx.beginPath();
    ctx.arc(6, -1, 1, 0, TAU);
    ctx.fill();
    ctx.restore();
    return true;
  }
  if (e.kind === "livingLeaf")
    return drawOriginalCreature(
      ctx,
      17,
      e.hp <= 0
        ? "mort"
        : e.attackTime > 0
          ? "attaque1"
          : e.moving
            ? "course"
            : "statique",
      e.x,
      e.y,
      e.attackTime > 0 ? (0.4 - e.attackTime) * 1000 : e.age * 1000,
      e.facing || 1,
      0.3,
    );
  return false;
}

function createPlayer(x, y) {
  return {
    lastCard: -1,
    notebook: [],
    vanishOrigin: null,
    plantIndex: 0,
    charges: normalizeCharges(null, profile, gifts),
    states: {},
    lastAttackerUid: 0,
    casting: null,
    x,
    y,
    hp: maxHP(),
    facing: 1,
    moving: false,
    attack: 0,
    movementPause: 0,
    weaponGate: 0,
    action: null,
    attackVisual: null,
    lastAttackAnimationCodes: {},
    guarding: false,
    guardStartedAt: null,
    guardReleasePose: false,
    heal: 0,
    skill1: 0,
    skill2: 0,
    skill3: 0,
    invisible: 0,
    damageBoost: 0,
    cardIndex: 0,
    testimonyIndex: 0,
    testimonyTimer: 0,
    dodge: 0,
    dodging: 0,
    invuln: 0,
    angle: 0,
    dead: false,
  };
}
function enterScene(kind, index = 0, restoring = false, routeLength = 0) {
  forestClues = [];
  papailleClueDialogue = null;
  targetingSystem?.cancel();
  const continuousRouteLength = kind === "dungeon" ? (routeLength || encounterCount) : 0;
  scene = makeScene(kind, index, continuousRouteLength);
  enemies = [];
  effects = [];
  particles = [];
  projectiles = [];
  nearby = null;
  roomClearTimer = 0;
  encounterAwarded = false;
  encounterStarted = true;
  encounterXP = true;
  rewardOffer = [];
  selectedGift = null;
  pointer.down = false;
  keys.clear();
  const oldHP = player?.hp;
  const oldPlayer = player;
  const oldPet = pet;
  const spawn = sceneSpawn(kind, index, continuousRouteLength);
  player = createPlayer(spawn.x, spawn.y);
  if (scene.kind === "dungeon" && oldHP) player.hp = Math.min(maxHP(), oldHP);
  if (scene.kind === "dungeon" && oldPlayer && !restoring) {
    player.charges = normalizeCharges(oldPlayer.charges, profile, gifts);
    player.plantIndex = oldPlayer.plantIndex || 0;
    player.notebook = [...(oldPlayer.notebook || [])];
    player.states = { ...oldPlayer.states };
    for (const timer of ["heal", "skill1", "skill2", "skill3", "dodge"])
      player[timer] = oldPlayer[timer];
    player.cardIndex = oldPlayer.cardIndex;
  }
  pet = petSystem.createState({ player, kind: scene.kind, oldPet });
  if (scene.kind === "tutorial") {
    profile.petActive = true;
    pet.x = 620;
    pet.y = 630;
    tutorialPhase = 0;
  }
  camera.x = player.x;
  camera.y = player.y;
  resetCameraEffects();
  mode = "playing";
  resetSceneAudio();
  $("area-name").textContent = MAPS[scene.mapId]?.hudName ?? MAPS.dungeon.hudName;
  if (scene.kind === "dungeon" && !restoring) spawnRoom();
  updateQuest();
  updateHUD();
  if (!restoring) save();
}
function spawnEnemy(type, x, y, scale = 1, creatureId = null, displayName = null) {
  const rules = ENEMY_RULES[type] ?? ENEMY_RULES.beetle;
  const hp = rules.hp * (1 + (step - 1) * ENEMY_PROGRESSION.hpPerStep) * scale;
  enemies.push({
    uid: ++fieldSerial,
    type,
    creatureId,
    displayName,
    variant: Math.min(3, Math.floor((step - 1) / 2)),
    pattern: 0,
    x,
    y,
    hp,
    maxHp: hp,
    speed: rules.speed * (1 + step * ENEMY_PROGRESSION.speedPerStep),
    attack: ENEMY_PROGRESSION.initialAttackDelayMin + Math.random() * ENEMY_PROGRESSION.initialAttackDelayRange,
    telegraph: 0,
    hit: 0,
    facing: 1,
    stun: 0,
    charge: 0,
    targetX: 0,
    targetY: 0,
    seed: Math.random() * 10,
  });
}
function enemyDeathDuration(e) {
  const code = enemyCreatureId(e.type, e.variant, e.creatureId);
  const frames = originalAnimationFrameCount(code, "mort");
  return frames ? frames / 60 : 1.2;
}
function enemyDeathElapsed(e) {
  return Number.isFinite(e.deathStartedAt)
    ? Math.max(0, time - e.deathStartedAt)
    : Math.max(0, e.deathTime || 0);
}
function spawnRoom() {
  const area = scene.routeAreas?.[room];
  const plan = buildEncounterPlan(step, room, encounterCount, area?.id ?? scene.areaId, area?.offsetX ?? 0);
  for (const enemy of plan.enemies)
    spawnEnemy(
      enemy.type,
      enemy.x,
      enemy.y,
      enemy.scale ?? 1,
      enemy.creatureId,
      enemy.displayName,
    );
  announce(plan.title, plan.category);
}function releaseEnemyAttack(e) {
  const rules = ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle;
  if (e.type !== "frog") {
    const frame = ((Math.max(0, rules.telegraph) * 180) % 12);
    const frames = originalAnimationFrameCount(
      enemyCreatureId(e.type, e.variant, e.creatureId),
      "attaque1",
    );
    e.attackRecoveryUntil = 0;
    if (frames > frame) {
      e.attackRecoveryStartedAt = time;
      e.attackRecoveryStartFrame = frame;
      e.attackRecoveryUntil = time + (frames - frame) / 60;
    }
    e.attackRecoveryHit = false;
  }
  const boss = e.type === "boss";
  const bossPattern = boss
    ? ENCOUNTER_RULES.boss.attackPatterns[
        e.pattern % ENCOUNTER_RULES.boss.attackPatterns.length
      ]
    : null;
  const ranged = e.type === "wasp";
  if (ranged) {
    const angle = Math.atan2(e.targetY - e.y, e.targetX - e.x);
    const spread = boss
      ? e.hp < e.maxHp / 2
        ? [-0.5, -0.25, 0, 0.25, 0.5]
        : [-0.25, 0, 0.25]
      : e.variant
        ? [-rules.projectileSpread, rules.projectileSpread]
        : [0];
    for (const delta of spread)
      projectiles.push({
        x: e.x,
        y: e.y - 10,
        vx: Math.cos(angle + delta) * rules.projectileSpeed,
        vy: Math.sin(angle + delta) * rules.projectileSpeed,
        life: rules.projectileLife,
        enemy: true,
        sourceIndex: enemies.indexOf(e),
        damage: rules.projectileDamage + step * rules.projectileStepDamage,
        color: "#ebc360",
      });
  } else if (e.type === "frog" || (boss && bossPattern === "charge")) {
    if (boss) {
      const dx = e.targetX - e.x;
      const dy = e.targetY - e.y;
      const distanceToTarget = Math.hypot(dx, dy) || 1;
      const dashLength = Math.min(
        ENCOUNTER_RULES.boss.chargeDistance,
        distanceToTarget + ENCOUNTER_RULES.boss.chargeOvershoot,
      );
      e.targetX = clamp(e.x + (dx / distanceToTarget) * dashLength, 55, scene.width - 55);
      e.targetY = clamp(e.y + (dy / distanceToTarget) * dashLength, 90, scene.height - 55);
    }
    e.charge = boss ? ENCOUNTER_RULES.boss.chargeDuration : rules.chargeDuration;
  } else {
    const radius = boss
      ? bossPattern === "heavy-stomp"
        ? ENCOUNTER_RULES.boss.heavyStompRadius
        : ENCOUNTER_RULES.boss.stompRadius
      : rules.attackRadius;
    effects.push({
      kind: "ring",
      x: e.targetX,
      y: e.targetY,
      r: radius,
      life: 0.35,
      maxLife: 0.35,
      color: "#eab15c",
    });
    const damage = boss
      ? rules.attackDamage + step * rules.attackStepDamage
      : rules.attackDamage + step;
    if (enemyAreaHit(e, { x: e.targetX, y: e.targetY }, radius, damage, 10))
      pauseEnemyAttackRecovery(e);
  }
  e.attack = boss
    ? e.hp < e.maxHp / 2
      ? rules.halfHpCooldown
      : rules.fullHpCooldown
    : rules.attackCooldown;
  e.pattern = (e.pattern + 1) % 3;
}
function updateQuest() {
  let title, description, questKey;
  if (scene.kind === "village") {
    const muraAdvicePending = profile.expeditions > 0 && !profile.muraAdviceSeen;
    questKey = muraAdvicePending ? "village:mura" : "village:board";
    title = muraAdvicePending
      ? "Trabajos"
      : profile.bestStep
        ? "El bosque vuelve a llamar"
        : "Un mundo por descubrir";
    description = muraAdvicePending
      ? "Habla con Mura para cambiar de trabajo. Puedes adquirir un trabajo secundario a partir del nivel 10. ¡No dudes en probar varias combinaciones! ¡Cambiar de trabajo es gratis!"
      : profile.tutorial && profile.expeditions === 0
        ? "Continúa el sendero."
        : "Visita el tablón de la plaza para comenzar una expedición. Mura puede cambiar tu trabajo.";
  } else if (scene.kind === "tutorial") {
    questKey = `tutorial:${tutorialPhase}`;
    title =
      tutorialPhase === 0
        ? "Un pequeño amigo"
        : "El camino a casa";
    description =
      tutorialPhase === 0
        ? tutorialRescueInstructions()
        : "Habla con Papaille.";
  } else {
    questKey = encounterAwarded
      ? `dungeon:${step}:${room}:chest`
      : !encounterStarted
        ? `dungeon:${step}:${room}:path`
        : `dungeon:${step}:${room}:combat`;
    title =
      room === encounterCount - 1 ? ENCOUNTER_RULES.boss.name
        : `Bosque Susurrante · Etapa ${step}`;
    description = !encounterStarted
      ? `Encuentro ${room + 1} / ${encounterCount} · Sigue el sendero hacia la siguiente zona.`
      : `Encuentro ${Math.min(room + 1, encounterCount)} / ${encounterCount} · ${encounterAwarded ? "Abre el cofre de Elisah con E. Sigue el marcador." : "Derrota a los enemigos y busca el cofre."}`;
  }
  if (scene.kind === "dungeon" && papailleClueDialogue) {
    questKey = `dungeon:papaille:${papailleClueDialogue}`;
    title = "Papaille";
    description = "Habla con Papaille.";
  }
  $("quest-title").textContent = title;
  const questDescription = $("quest-description");
  const questCheck = $("quest-check");
  pendingQuestDescription = description;
  if (questKey !== currentQuestKey) {
    const previousKey = currentQuestKey;
    const transitionId = ++questTransitionId;
    currentQuestKey = questKey;
    if (previousKey && questDescription.textContent) {
      questCheck.classList.remove("is-completing");
      void questCheck.offsetWidth;
      questCheck.classList.add("is-completing");
      window.setTimeout(() => {
        if (transitionId !== questTransitionId) return;
        questDescription.textContent = pendingQuestDescription;
        questCheck.classList.remove("is-completing");
      }, 500);
    } else {
      questDescription.textContent = description;
      questCheck.classList.remove("is-completing");
    }
  } else if (!questCheck.classList.contains("is-completing")) {
    questDescription.textContent = description;
  }
  $("room-progress").innerHTML =
    scene.kind === "dungeon"
      ? Array.from(
          { length: encounterCount },
          (_, i) => `<i class="${i < room ? "done" : ""}"></i>`,
        ).join("")
      : "";
}
function startAdventure(isContinue = false) {
  initAudio();
  $("title-screen").hidden = true;
  $("hud").hidden = false;
  if (isContinue && saved) {
    resumeRecord(readSave() || profile);
    announce("Bienvenido de nuevo", profile.name);
    return false;
  }
  playOriginalMusic("musique/tfmadv_intro", {
    volume: 0.7,
    loop: true,
    fadeInMs: 600,
  });
  openModal(
    "new",
    "Tu aventura comienza",
    "UN RATÓN, MUCHAS POSIBILIDADES",
    `<p class="intro">Todo gran viaje empieza con un pequeño paso.</p><label class="muted" for="name-input">¿Cómo se llama tu ratón?</label><input id="name-input" maxlength="18" value="${PLAYER_CHARACTER.name}" autocomplete="off" style="width:100%;padding:12px;margin:8px 0;background:#25261e;border:1px solid #a4945f;color:#f2e3bd;border-radius:4px;font:17px Georgia"><p class="muted">Encontrarás un pequeño erizo en el bosque. Cúralo, protégelo y conoce a Papaille para viajar juntos a la aldea.</p><div class="button-row"><button class="primary" id="begin-tutorial">Entrar al bosque ➜</button></div><p class="save-note">${saved ? "Comenzar reemplazará tu progreso guardado." : "Guardado automático en este navegador."}</p>`,
  );
  $("begin-tutorial").onclick = () => {
    const name = $("name-input").value.trim() || PLAYER_CHARACTER.name;
    profile = defaults();
    profile.name = name;
    gifts = [];
    step = 1;
    closeModal();
    enterScene("tutorial");
    save();
    announce("El comienzo del sendero", "ENCUENTRA A TU NUEVO COMPAÑERO");
  };
  $("name-input").focus();
  $("name-input").select();
}

function updateHUD() {
  if (!player) return;
  updateNotebookHUD();
  $("attack-charges").textContent =
    `${player.charges[profile.weapon].count}/${chargeCapacity(profile, profile.weapon, gifts)}`;
  const hp = maxHP(),
    job = jobs[profile.job];
  $("health-fill").style.width = `${clamp((player.hp / hp) * 100, 0, 100)}%`;
  $("health-text").textContent = `${Math.ceil(player.hp)} / ${hp}`;
  $("xp-fill").style.width = `${(profile.xp / xpNeeded()) * 100}%`;
  $("level-badge").textContent = profile.level;
  $("player-name").textContent = profile.name;
  $("xp-label").textContent = `Nivel ${profile.level} · ${job.name}`;
  $("coins").textContent = `${profile.coins} ◈`;
  $("skill1-name").textContent = job.skill1;
  $("skill2-name").textContent = job.skill2;
  for (const slot of [1, 2]) {
    const ability = ABILITIES[`${profile.job}.skill${slot}`];
    setHUDIcon($("skill" + slot + "-icon"), ability.icon, recoveredAbilityIconPath(ability));
    $("skill" + slot + "-button").title = `${ability.name} · ${slot === 1 ? "Q / 1" : "R / 2"}\n${ability.description}\n${skillInstructions(ability, giftEffect)}`;
  }
  $("status-effects").textContent = [
    player.notebook.length
      ? "Notas " +
        player.notebook
          .map((t) => TESTIMONIES[t]?.symbol || "?")
          .join(" + ") +
        " · " +
        player.notebook.length +
        "/2"
      : "",
    player.invisible > 0 ? "Oculto " + Math.ceil(player.invisible) + "s" : "",
    player.damageBoost > 0
      ? "Potencia " + Math.ceil(player.damageBoost) + "s"
      : "",
    player.casting
      ? (player.casting.kind === "bandage" ? "Vendando " : "Ayudando ") +
        player.casting.remaining.toFixed(1) +
        " s"
      : "",
    player.states.barrier > 0
      ? "Escudo " + Math.ceil(player.states.barrier)
      : "",
    player.states.bandageHot > 0 ? `Vendaje ${Math.ceil(player.states.bandageHot)}s` : "",
    player.states.downed > 0 ? "Caído · tu compañero te está ayudando" : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const extra = resolveJobSkill(profile, 3);
  $("skill3-button").hidden = profile.level < SECONDARY_JOB_LEVEL;
  $("skill3-button").disabled = !extra;
  const extraAbility = extra ? ABILITIES[extra.abilityId] : null;
  setHUDIcon($("skill3-icon"), extraAbility?.icon ?? "?", recoveredAbilityIconPath(extraAbility));
  $("skill3-name").textContent = extra
    ? jobs[extra.job]["skill" + extra.skill]
    : "Elegir";
  $("skill3-button").title = extra
    ? `${ABILITIES[extra.abilityId].name} · 3\n${ABILITIES[extra.abilityId].description}\n${skillInstructions(ABILITIES[extra.abilityId], giftEffect)}`
    : "Elige un trabajo secundario con Mura";
  if (profile.job === "trickster")
    setHUDIcon($("skill1-icon"), CARDS[player.cardIndex % 4].icon);
  const twoHanded = WEAPONS[profile.weapon].twoHanded,
    secondary = SECONDARIES[profile.secondary];
  setHUDIcon($("attack-button").querySelector("span"), WEAPONS[profile.weapon].icon,
    `assets/original/interface/icones/${{ sword: 21001, greatsword: 22001, dagger: 23001, bow: 25001 }[profile.weapon]}.png`);
  $("attack-button").classList.toggle(
    "preparing",
    !!player.action && !player.action.hit,
  );
  $("attack-button").title =
    WEAPONS[profile.weapon].name + " · clic izquierdo / J";
  $("heal-button").setAttribute("aria-pressed", String(!!player.guarding));
  setHUDIcon($("heal-button").querySelector("span"), twoHanded ? "—" : secondary.icon,
    twoHanded ? null : `assets/original/interface/icones/${profile.secondary === "shield" ? 24001 : 26001}.png`);
  $("heal-button").querySelector("small").textContent = twoHanded
    ? "Dos manos"
    : profile.secondary === "shield"
      ? "Bloquear"
      : "Venda";
  $("heal-button").title = twoHanded
    ? "Arma de dos manos"
    : secondary.description;
  $("heal-button").disabled = !!twoHanded;
  $("heal-button").classList.toggle("guarding", player.guarding);
  for (const [key, id] of [
    ["heal", "heal-cd"],
    ["skill1", "skill1-cd"],
    ["skill2", "skill2-cd"],
    ["skill3", "skill3-cd"],
    ["dodge", "dodge-cd"],
  ])
    $(id).textContent = player[key] > 0 ? Math.ceil(player[key]) : "";
  if (twoHanded || profile.secondary === "shield")
    $("heal-cd").textContent = "";
  updateHUDPortrait();
}
function updateHUDPortrait() {
  const portrait = $("player-avatar");
  if (!portrait || !player || !artStatus().ready) return;
  const clothing = playerClothing();
  const appearanceKey = JSON.stringify([
    profile.characterId,
    profile.fur,
    profile.weapon,
    profile.secondary,
    clothing,
  ]);
  if (portrait.dataset.appearanceKey === appearanceKey) return;
  const context = portrait.getContext("2d");
  context.clearRect(0, 0, portrait.width, portrait.height);
  context.save();
  context.translate(portrait.width / 2, portrait.height - 3);
  context.scale(0.62, 0.62);
  drawPlayerCharacter(
    context,
    profile.characterId,
    { x: 0, y: 0, facing: 1, moving: false },
    time,
    {
      color: furColors[profile.fur],
      weapon: profile.weapon,
      secondary: profile.secondary,
      clothing,
    },
  );
  context.restore();
  portrait.dataset.appearanceKey = appearanceKey;
}
function addXP(amount) {
  const before = profile.level;
  const xpBefore = profile.xp;
  profile.xp += amount;
  if (amount > 0) originalSound("xp", 600, 0.15, "sine", 0.5);
  while (profile.xp >= xpNeeded()) {
    profile.xp -= xpNeeded();
    profile.level++;
    player.hp = maxHP();
    floating(
      "¡Nivel " + profile.level + "!",
      player.x,
      player.y - 70,
      "#fff4a2",
    );
    toast(`¡Nivel ${profile.level}! Tienes un punto de talento disponible.`);
  }
  if (amount > 0) xpLevelCue = makeXPNoticeAnimation(before, xpBefore, amount);
  $("xp-notice").hidden = false;
  $("xp-notice").innerHTML =
    `<strong>+${amount} XP</strong><span>${before === profile.level ? `Nivel ${profile.level}` : `Nivel ${before} → ${profile.level}`} · ${profile.xp} / ${xpNeeded()}</span><div><i style="width:${Math.min(100, (profile.xp / xpNeeded()) * 100)}%"></i></div>`;
  if (xpLevelCue?.segments.length) {
    const first = xpLevelCue.segments[0];
    const fill = $("xp-notice").querySelector("i");
    if (fill) fill.style.width = `${first.from * 100}%`;
  }
  xpNoticeTimer = 5;
  save();
}
function hurtEnemy(e, amount, sourceKind = "player", showHitEffect = true) {
  if (e.hp <= 0) return;
  const iceDamage =
    giftEffect("reportIceDamage") &&
    (sourceKind === "player" || sourceKind === "pet")
      ? giftEffect("reportIceDamage")
      : 0;
  amount += iceDamage;
  if (e.reportPoisoned > 0 && giftEffect("reportPoison")) amount *= 1 + REPORT_RULES.vulnerability;
  if (e.diamondsRoot > 0) amount *= 1 + giftEffect("cardsDiamondVulnerability");
  const actualDamage = Math.min(e.hp, Math.max(0, amount));
  e.hp -= amount;
  if (showHitEffect && actualDamage > 0) playHitSound();
  const vampireHealing = vanishHealing(actualDamage, player.invisible, sourceKind, giftEffect("vanishLifesteal"));
  if (vampireHealing > 0) healPlayer(vampireHealing);
  e.hit = 0.13;
  if (showHitEffect && !(e.hitFlashUntil > time)) {
    e.hitFlashUntil = time + 0.05;
    e.hitSquashStartedAt = time;
  }
  spawnFX(
    sourceKind === "lightning" ? 37 : sourceKind === "poison" || e.poison > 0 ? 39 : 5,
    e.x,
    e.y - 15,
    0.35,
    0.4,
  );
  if (iceDamage) spawnFX(29, e.x, e.y - 15, 0.35, 0.4);
  floating(Math.round(amount), e.x, e.y - 42, "#f4d98b");
  burst(e.x, e.y - 15, "#e6d998", 5);
  if (e.hp <= 0) {
    e.deathTime = 0;
    e.deathStartedAt = time;
    profile.coins += (ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle).coins;
    if (hasChefSkill() && scene.kind !== "village") {
      spawnIngredient(null, e.x, e.y);
      if ((e.lastTrapAge ?? 3) < 3 && Math.random() < 0.65)
        spawnIngredient(null, e.x + 25, e.y + 10);
    }
    if (scene.kind !== "dungeon" || !encounterXP)
      addXP((ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle).xp);
    if (giftEffect("deathTestimony"))
      spawnTestimony(e.x, e.y - 12, "death");
    burst(e.x, e.y - 15, "#b5ca73", 16);
    tone(e.type === "boss" ? 250 : 530, 0.09, "triangle");
  }
}
function hurtPlayer(amount, source, origin = source, periodic = false) {
  if (player.invuln > 0 || player.dead || player.states.downed > 0) return;
  if (source?.uid && source?.type && ENEMY_RULES[source.type])
    player.lastAttackerUid = source.uid;
  const recipeExtension = giftEffect("cauldronHitDuration");
  if (recipeExtension > 0 && source?.type && ENEMY_RULES[source.type]) {
    const carriedCauldron = effects.find(
      (effect) =>
        effect.kind === "pool" &&
        effect.job === "chef" &&
        effect.life > 0 &&
        effect.carried &&
        effect.cooking?.phase === "cooking",
    );
    if (carriedCauldron) {
      carriedCauldron.cooking.remaining = Math.min(
        3600,
        carriedCauldron.cooking.remaining + recipeExtension,
      );
      carriedCauldron.recipeDuration = Math.min(
        30,
        carriedCauldron.recipeDuration + recipeExtension,
      );
      floating(
        `Receta +${recipeExtension}s`,
        carriedCauldron.x,
        carriedCauldron.y - 35,
        "#ffd28a",
      );
    }
  }
  player.invisible = 0;
  amount = weakenedEnemyDamage(amount, source);
  const damageBeforeMitigation = amount;
  if (player.states.bandageGuard > 0)
    amount *= 1 - giftEffect("bandageDamageReduction");
  if (player.states.clubVulnerability > 0) amount *= 1.5;
  const incomingAmount = amount;
  if (player.states.heartReflect) {
    player.states.heartReflect = 0;
    if (source?.hp > 0) hurtEnemy(source, incomingAmount, "player-heart-reflect");
    floating("Reflejo", player.x, player.y - 55, "#f5b6c8");
  }
  const swordParryChance =
    profile.weapon === "sword" && source?.type && ENEMY_RULES[source.type]
      ? Math.min(0.6, giftEffect("swordParry"))
      : 0;
  if (swordParryChance > 0 && Math.random() < swordParryChance) {
    player.invuln = 0.18;
    floating("Parada", player.x, player.y - 70, "#dce7ac");
    effects.push({
      kind: "ring",
      x: player.x,
      y: player.y,
      r: 60,
      life: 0.25,
      maxLife: 0.25,
      color: "#dce7ac",
    });
    originalSound("parade", 900, 0.06, "triangle");
    return;
  }
  const hit = resolveShieldHit(amount, player, profile, origin, {
    freeChance: giftEffect("shieldFreeBlock"), blockReduction: bonus("blockReduction"),
  });
  amount = Math.max(
    1,
    Math.round(
      hit.amount -
        bonus("armor") -
        countGift("guard") * 3,
    ),
  );
  if (hit.blocked) shieldBlockEffects(source, Math.max(0, incomingAmount - hit.amount));
  else {
    if (!(player.hitFlashUntil > time)) player.hitFlashUntil = time + 0.05;
    if (amount > 0) playHitSound();
  }
  amount *= areaDefenseMultiplier(player, effects, bonus, giftEffect, distance);
  if (
    effects.some(
      (e) => e.kind === "pool" && e.job === "chef" && e.carried && e.life > 0,
    )
  )
    amount *= 1 - bonus("chefCarryArmor");
  if (!source && inArea("pool", player, "botanist"))
    amount *= 1 - bonus("elixirElementGuard");
  if (
    source?.type === "frog" &&
    !(inArea("pool", player, "botanist") && bonus("elixirSlowImmunity"))
  )
    player.states.slow = 2;
  if (player.states.guard > 0) amount *= 1 - bonus("shieldAfterguard");
  amount = absorbBarrier(player.states, amount);
  if (giftEffect("greatswordArmorBreak") > 0) {
    const stored = Math.max(0, damageBeforeMitigation - amount) * giftEffect("greatswordArmorBreak");
    if (stored > 0) {
      player.states.storedHit = Math.min(
        100,
        (player.states.storedHit || 0) + stored,
      );
      player.states.storedHitTime = 6;
      floating("Trituradora +" + Math.round(stored), player.x, player.y - 82, "#e8c78b");
    }
  }
  player.hp = Math.max(0, player.hp - amount);
  if (!periodic && amount > 0) cameraDamageShake(source);
  player.invuln = hit.blocked ? 0.18 : 0.7;
  floating("-" + Math.ceil(amount), player.x, player.y - 55, "#ffc4a2");
  burst(player.x, player.y - 15, "#ce9567", 6);
  tone(110, 0.14, "triangle");
  if (source && countGift("thorns"))
    hurtEnemy(source, 8 * countGift("thorns"), "reflect");
  if (
    bonus("vanishEmergency") &&
    amount > maxHP() * 0.2 &&
    !(player.states.emergencyCooldown > 0) &&
    player.hp > 0
  ) {
    player.states.emergencyCooldown = 15;
    player.invisible = 3;
    player.vanishOrigin = { x: player.x, y: player.y };
    player.states.slow = 0;
    healPlayer(bonus("vanishHealing"));
    burst(player.x, player.y - 20, "#cab1d7", 25);
  }
  if (player.hp <= 0) {
    if (
      bonus("petRevive") &&
      profile.petActive &&
      !pet.injured &&
      !player.states.petReviveUsed
    ) {
      player.hp = 1;
      player.states.downed = 4;
      player.states.petReviveUsed = 1;
      player.invuln = 4;
      player.action = null;
      player.casting = null;
      keys.clear();
      pointer.down = false;
      toast(profile.petName + " está intentando ayudarte a levantarte.");
      save();
    } else showDefeat();
  }
}
function showDefeat() {
  player.dead = true;
  pointer.down = false;
  openModal(
    "defeat",
    "Todavía queda camino",
    "EL BOSQUE ES IMPREDECIBLE",
    `<p class="intro">Picpic se queda a tu lado.</p><p>Esta vez el bosque ha sido más fuerte. Recuperarás tus fuerzas en la aldea. Conservas la experiencia, las monedas y tus talentos.</p><p class="muted">Los regalos de esta expedición se pierden al regresar.</p><div class="button-row"><button class="primary" id="respawn">${scene.kind === "tutorial" ? "Volver a intentarlo" : "Regresar a la aldea"}</button></div>`,
  );
  $("respawn").onclick = () => {
    const tutorial = scene.kind === "tutorial";
    gifts = [];
    step = 1;
    finishModal();
    enterScene(tutorial ? "tutorial" : "village");
  };
}

function attack() {
  if (targetingSystem?.pending) return;
  if (player.states.downed > 0 || player.states.clubStun > 0) return;
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    player.action ||
    player.attack > 0 ||
    player.weaponGate > 0 ||
    player.dead
  )
    return;
  const cauldron = activeCauldron();
  if (
    cauldron &&
    (cauldron.cooking.phase === "dirty" ||
      cauldron.cooking.phase === "collecting") &&
    useCauldron(cauldron)
  ) {
    player.attack = 0.3;
    return;
  }
  stopGuard();
  player.casting = null;
  const angle = aimAngle();
  player.states.firstUse =
    player.charges[profile.weapon].count ===
    chargeCapacity(profile, profile.weapon, gifts);
  if (!consumeCharge(player.charges, profile.weapon)) {
    player.attack = 0.1;
    return;
  }
  if (profile.weapon === "bow")
    originalSound("arc1", 400, 0.1, "sine", 0.5);
  player.weaponGate = WEAPON_ACTIVATION_GATE_MS / 1000;
  player.attack =
    WEAPONS[profile.weapon].duration *
    (profile.weapon === "bow"
      ? Math.max(
          0.25,
          ((1 - bonus("bowRecovery")) *
            (bonus("bowFocusedDamage") ? 1.2 : 1) *
            (1 + giftEffect("bowHeavy"))) /
            (1 + giftEffect("bowFireRate")),
        )
      : 1);
  const action = createAttack(profile.weapon, angle);
  if (profile.weapon !== "bow") {
    const prefix = profile.weapon === "greatsword"
      ? "epee2m_attaque"
      : "ambi_attaque";
    const previousCode = player.lastAttackAnimationCodes[profile.weapon] || 0;
    let code = 0;
    for (let attempt = 0; attempt < 3; attempt++) {
      code = 1 + Math.floor(Math.random() * 3);
      if (code !== previousCode) break;
    }
    player.lastAttackAnimationCodes[profile.weapon] = code;
    action.animation = `${prefix}${code}`;
    if (profile.weapon === "sword" || profile.weapon === "dagger") {
      action.animationSpeed = 3;
      action.animationLoopFrames = 11;
    }
  } else {
    action.animationSpeed = 2 / WEAPONS.bow.windup;
  }
  if (profile.weapon === "bow") action.held = pointer.down || keys.has("KeyJ");
  player.attackVisual = null;
  if (profile.weapon === "sword" && player.states.swordBalestraReady > 0)
    action.swordBalestraBonus = Math.min(SWORD_RULES.maximumBalestraBonus, giftEffect("swordBalestra"));
  player.states.swordBalestraReady = 0;
  player.states.swordIdleTime = 0;
  player.action = action;
}
function releaseBow() {
  const action = player?.action;
  if (action?.weapon !== "bow" || action.released) return;
  action.held = false;
  if (action.elapsed < WEAPONS.bow.windup) {
    interruptBow();
    return;
  }
  action.released = true;
  action.releaseElapsed = 0;
}
function interruptBow() {
  stopOriginalSound("arc1");
  player.action = null;
  player.attack = 0;
  player.attackVisual = null;
}
function aimAngle() {
  let angle = player.angle;
  if (pointer.aimed) {
    const m = screenToWorld(pointer.x, pointer.y);
    angle = Math.atan2(m.y - player.y, m.x - player.x);
    player.angle = angle;
    faceFromVector(player, Math.cos(angle), Math.sin(angle));
  }
  return angle;
}
function impactAttack(action) {
  const { weapon, angle } = action,
    w = WEAPONS[weapon];
  let surprise = false;
  let power = weaponDamage(
    weapon,
    profile.level,
    profile.talents.power,
    countGift("power"),
  );
  power += bonus(w.ranged ? "rangedDamage" : "meleeDamage") + bonus("damage");
  power += countGift(w.ranged ? "archer" : "duelist") * (w.ranged ? 12 : 9);
  if (action.swordBalestraBonus > 0)
    power *= 1 + action.swordBalestraBonus;
  power *= areaAttackMultiplier(player, effects, giftEffect, distance);
  if (weapon === "dagger") power += bonus("daggerDamage");
  if (weapon === "sword" && player.states.swordBoost > 0)
    power *= 1 + bonus("swordCleavePower");
  if (player.states.storedHit > 0) {
    power += player.states.storedHit;
    player.states.storedHit = 0;
  }
  if (weapon === "sword") {
    if (giftEffect("swordDuelistDamage"))
      power *= 1 + giftEffect("swordDuelistDamage");
    power *= swordChainMultiplier(player.states, giftEffect("swordChain"));
  }
  if (weapon === "bow") power *= 1 + giftEffect("bowHeavy");
  if (player.damageBoost > 0) power *= 1.35;
  if (player.states.cardPower) {
    power *= bonus("cardShield") ? 1.2 : 1.35;
    player.states.cardPower = 0;
  }
  if (player.invisible > 0) {
    power *= giftEffect("vanishHealingTrade")
      ? 1
      : 1.5 + bonus("vanishPower") + giftEffect("vanishDamage");
    player.invisible = 0;
    floating("¡Sorpresa!", player.x, player.y - 65, "#dec9ef");
    surprise = true;
  }
  if (w.ranged) {
    projectiles.push({
      x: player.x,
      y: player.y - 15,
      vx: Math.cos(angle) * 660,
      vy: Math.sin(angle) * 660,
      life: 1.1,
      damage: power,
      originX: player.x,
      maxHits: Math.min(
        8,
        Math.max(1, giftEffect("bowPierce")) +
          Math.min(3, giftEffect("bowExtraPierce")) +
          Math.min(3, giftEffect("bowRicochet")) +
          Math.min(3, giftEffect("bowFlamingTargets")),
      ),
      ricochetsRemaining: Math.min(3, giftEffect("bowRicochet")),
      arrowReturnChecked: false,
      hitIDs: [],
      surprise,
      originY: player.y,
      enemy: false,
      color: "#e3d392",
    });
    cameraPush(Math.cos(angle + Math.PI) * 70, Math.sin(angle + Math.PI) * 70);
    originalSound("arc0");
  } else {
    effects.push({
      kind: "slash",
      x: player.x,
      y: player.y - 15,
      angle,
      life: 0.22,
      maxLife: 0.22,
      r: w.range + (weapon === "sword" ? bonus("swordRange") : 0),
      color: "#fff0bd",
    });
    const hits = enemies
      .filter(
        (e) =>
          e.hp > 0 &&
          inAttackArc(
            player,
            e,
            angle,
            weapon,
            weapon === "sword" ? bonus("swordRange") : 0,
          ),
      )
      .sort((a, b) => distance(a, player) - distance(b, player))
      .slice(
        0,
        weapon === "dagger"
          ? 1
          : weapon === "sword"
            ? giftEffect("swordDuelistDamage")
              ? 1
              : 3 + bonus("swordTargets") + giftEffect("swordTargets")
            : 5,
      );
    if (hits.length > 0) {
      faceFromVector(player, hits[0].x - player.x, hits[0].y - player.y);
      action.visualFacing = player.facing;
    }
    if (
      weapon === "sword" &&
      hits.length === 1 &&
      Math.random() < bonus("swordChargeSave")
    )
      player.charges.sword.count = Math.min(
        chargeCapacity(profile, "sword", gifts),
        player.charges.sword.count + 1,
      );
    if (weapon === "sword") recordSwordTargets(player.states, hits.length, giftEffect("swordChain") > 0);
    for (const [hitIndex, e] of hits.entries()) {
      let damage = power;
      let instantPoisonBurst = 0;
      let instantPoisonIsLightning = false;
      if (weapon === "sword") {
        if (e.uid === player.lastAttackerUid)
          damage *= 1 + Math.min(1, giftEffect("swordReprisal"));
        if (hitIndex > 0) damage *= 1 + giftEffect("swordSecondaryDamage");
        else if (giftEffect("swordPrimarySlow")) {
          e.slow = 2;
          e.slowFactor = Math.min(0.8, giftEffect("swordPrimarySlow"));
        }
      }
      if (weapon === "dagger") {
        preserveNonDaggerPoison(e);
        const hadWeaponPoison = e.poison > 0;
        if ((player.x - e.x) * (e.facing || 1) < -8)
          damage *= 1 + Math.min(1, giftEffect("daggerBackDamage"));
        if (!isEnemyPoisoned(e)) damage *= 1 + bonus("daggerFirstHit");
        if (e.hp < e.maxHp * 0.5) damage *= 1 + bonus("daggerExecute");
        if (player.states.firstUse) damage *= 1 + giftEffect("daggerFirstUse");
        damage *= Math.max(0.2, 1 - giftEffect("daggerPoisonTrade") * 0.4);
        const stacks = giftEffect("daggerPoisonStacks")
          ? Math.min(3, (e.poison > 0 ? e.poisonStacks || 1 : 0) + 1)
          : 1;
        const poisonDamage =
          (2 + bonus("daggerPoison")) *
          (1 + giftEffect("daggerPoisonTrade")) *
          stacks *
          (1 + Math.min(1, giftEffect("daggerLightningPoison")));
        instantPoisonIsLightning = giftEffect("daggerLightningPoison") > 0;
        if (giftEffect("daggerInstantPoison")) {
          instantPoisonBurst = instantDaggerPoisonDamage(poisonDamage, giftEffect("daggerFinalPoison"));
          damage += instantPoisonBurst;
          e.poison = 0;
          e.poisonLightning = false;
          e.poisonDagger = false;
          e.poisonTicksRemaining = 0;
        } else {
          e.poison = WEAPON_POISON_RULES.duration;
          e.poisonDamage = poisonDamage;
          e.poisonStacks = stacks;
          e.poisonTick = hadWeaponPoison && e.poisonTick > 0 ? e.poisonTick : WEAPON_POISON_RULES.interval;
          e.poisonLightning = instantPoisonIsLightning;
          e.poisonDagger = true;
          e.poisonTicksRemaining = Math.max(
            1,
            Math.floor((WEAPON_POISON_RULES.duration - e.poisonTick) / WEAPON_POISON_RULES.interval) + 1,
          );
        }
      }
      if (instantPoisonBurst > 0) {
        hurtEnemy(e, damage - instantPoisonBurst);
        hurtEnemy(
          e,
          instantPoisonBurst,
          instantPoisonIsLightning ? "lightning" : "poison",
          false,
        );
      } else hurtEnemy(e, damage);
      if (weapon === "greatsword" && e.hp > 0 && giftEffect("greatswordThirdHitStun")) {
        e.greatswordHitCount = (e.greatswordHitCount || 0) + 1;
        if (e.greatswordHitCount >= 3) {
          e.greatswordHitCount = 0;
          e.stun = Math.max(e.stun, 1.5);
          floating("Aturdido", e.x, e.y - 48, "#dce7ac");
        }
      }
      if (surprise) {
        e.stun = Math.max(e.stun, bonus("vanishStun"));
        if (bonus("vanishPet") && profile.petActive && !pet.injured) {
          pet.x = e.x - 45;
          pet.y = e.y + 15;
          hurtEnemy(e, 6 + bonus("petDamage"), "pet");
        }
        surprise = false;
      }
    }
    if (hits.length > 0) action.hitPauseRemaining = 0.1;
    originalSound("arme", 270, 0.06, "triangle");
    const cameraAngle = hits.length
      ? Math.atan2(hits[0].y - player.y, hits[0].x - player.x)
      : player.moving
        ? player.angle
        : player.facing < 0
          ? Math.PI
          : 0;
    meleeCameraKick(cameraAngle);
    player.movementPause = 0.2;
  }
}
function secondaryAction() {
  if (player.states.downed > 0 || player.states.clubStun > 0) return;
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    player.dead ||
    player.dodging > 0
  )
    return;
  if (WEAPONS[profile.weapon].twoHanded) {
    toast(
      "Esta espada ocupa las dos manos. Usa tus habilidades para recuperarte.",
    );
    return;
  }
  if (profile.secondary === "shield") {
    if (player.charges.shield.count < 1) return;
    stopOriginalSound("arc1");
    player.casting = null;
    player.action = null;
    player.attack = 0;
    pointer.down = false;
    keys.delete("KeyJ");
    player.guarding = true;
    player.guardStartedAt = time;
    player.guardReleasePose = false;
    originalSound("parade1", 400, 0.08, "triangle", 0.5);
    aimAngle();
  } else heal();
}
function heal() {
  if (
    player.states.clubStun > 0 ||
    player.moving ||
    player.charges.bandage.count <= 0
  ) return;
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    player.heal > 0 ||
    player.dead ||
    player.casting
  )
    return;
  if (
    scene.kind === "tutorial" &&
    tutorialPhase === 0 &&
    distance(player, pet) > 160
  )
    return toast("Acércate a Picpic para curarlo.");
  stopOriginalSound("arc1");
  player.action = null;
  player.attack = 0;
  stopGuard();
  pointer.down = false;
  keys.delete("KeyJ");
  player.casting = { kind: "bandage", remaining: 1 };
}
function completeHeal() {
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    player.heal > 0 ||
    player.dead
  )
    return;
  stopOriginalSound("arc1");
  player.action = null;
  stopGuard();
  if (scene.kind === "tutorial" && tutorialPhase === 0) {
    if (distance(player, pet) > 160) {
      toast("Acércate a Picpic para curarlo con la venda.");
      return;
    }
  }
  if (!consumeCharge(player.charges, "bandage")) return;
  const lastBandageUse = player.charges.bandage.count === 0;
  player.heal =
    player.charges.bandage.count > 0
      ? 0
      : chargeRecovery(profile, "bandage", gifts);
  const amounts = bandageAmounts(bonus, giftEffect, countGift("recovery"), lastBandageUse);
  const amount = amounts.selfInitial;
  const result = healPlayer(amount);
  const excess = result.excess;
  grantBarrier(excess * giftEffect("bandageOverhealBarrier"));
  let petBandaged = false;
  if (
    pet.injured ||
    bonus("bandageTargets") ||
    giftEffect("bandageTargets") ||
    scene.kind === "tutorial"
  ) {
    const petHealing = healPet(amounts.initial, true);
    petBandaged = !!petHealing;
    if (petHealing) grantBarrier(petHealing.excess * giftEffect("bandageOverhealBarrier"), pet);
  }
  player.healFinish = 0.25;
  startBandageTreatment(player.states, giftEffect);
  if (petBandaged) startBandageTreatment(pet, giftEffect);
  if (result.actual > 0) floating("+" + Math.round(result.actual), player.x, player.y - 55, "#d0ed9e");
  effects.push({
    kind: "ring",
    x: player.x,
    y: player.y,
    life: 0.7,
    maxLife: 0.7,
    r: 75,
    color: "#cde6a3",
  });
  burst(player.x, player.y - 30, "#d1ecae");
  spawnFX(48, player.x, player.y - 15, 1, 0.55);
  originalSound("soin", 660, 0.2);
  save();
}
function skill(slot, origin = player) {
  if (player.states.clubStun > 0) return false;
  return origin === player ? targetingSystem.request(slot) : skillSystem.use(slot, origin);
}
function dodge() {
  if (player.states.downed > 0 || player.states.clubStun > 0) return;
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    player.dodge > 0 ||
    player.dead
  )
    return;
  stopOriginalSound("arc1");
  player.action = null;
  player.casting = null;
  stopGuard();
  player.dodge = 2;
  player.dodging = 0.19;
  player.invuln = 0.35;
  tone(210, 0.08, "sine");
}
function interact() {
  if (modalKind) return;
  if (!$("dialogue").hidden) {
    advanceDialogue();
    return;
  }
  if (!nearby) return;
  const id = nearby.id;
  if (id.startsWith("clue:")) {
    const clue = FOREST_CLUES[nearby.clueId];
    if (clue) {
      papailleClueDialogue = clue.id;
      updateQuest();
      speak("Papaille", clue.lines, () => {
        forestClues = normalizeForestClues([...forestClues, clue.id]);
        papailleClueDialogue = null;
        updateQuest();
        save();
      });
    }
  } else if (id === "cauldron") {
    const pool = effects.find(
      (e) =>
        e.kind === "pool" &&
        e.job === "chef" &&
        e.life > 0 &&
        distance(e, player) < 115,
    );
    if (pool && !useCauldron(pool))
      pool.carried = giftEffect("cauldronFollow") > 0 || !pool.carried;
  } else if (id === "manual-trap") {
    const trap = effects.find(
      (e) => e.kind === "trap" && e.uid === nearby.uid && e.life > 0 && !e.triggered,
    );
    if (trap && isTrapArmed(trap, bonus) && giftEffect("trapManual") > 0) trap.manualTrigger = true;
  } else if (id === "pet-revive") {
    if (pet.injured && profile.petActive && !player.casting)
      player.casting = { kind: "pet-revive", remaining: 3 };
  } else if (id === "chest") {
    if (encounterAwarded && enemies.every((e) => e.hp <= 0)) {
      if (!rewardOffer.length) {
        chestOpeningStartedAt = time;
        modalKind = "chest-opening";
        $("hud").inert = true;
      } else openGifts();
    }
  } else if (id === "board" || id === "gate") {
    openDungeon();
  } else if (id === "mura") {
    if (profile.expeditions > 0 && !profile.muraAdviceSeen) {
      profile.muraAdviceSeen = true;
      save();
      updateQuest();
    }
    openProfile("jobs");
  } else if (id === "scarf") {
    speak("Scarf", [
      "¡Picpic parece muy feliz a tu lado! En el bosque, se acercará a tus enemigos para ayudarte.",
      "Puedes mejorar el daño de tu compañero en el árbol de talentos. No olvides cuidar también de ti.",
    ]);
  } else if (id === "papaille") {
    if (scene.kind === "tutorial") {
      if (tutorialPhase < 1) {
        toast("Picpic necesita ayuda primero.");
      } else {
        speak(
          "Papaille",
          [
            "¡Hey amigo! ¿A dónde vas? ¡Puedo llevarte de vuelta a Mice Village si quieres!",
          ],
          () => {
            profile.tutorial = true;
            profile.coins += 10;
            addXP(30);
            save();
            enterScene("village");
            announce("Aldea de los ratones", "BIENVENIDO A CASA");
          },
        );
      }
    } else {
      speak("Papaille", [
        "¡Qué alegría verte! El Bosque Susurrante está lleno de insectos inquietos.",
        "Forma tu equipo con Mura y consulta el tablón de la plaza. Elisah te ofrecerá un regalo después de cada encuentro.",
      ]);
    }
  }
}
function speak(name, lines, action = null) {
  targetingSystem?.cancel();
  stopGuard();
  keys.clear();
  pointer.down = false;
  const portrait = $("dialogue-avatar");
  const portraitContext = portrait.getContext("2d");
  const speakerId = Object.keys(CHARACTERS).find(
    (id) => CHARACTERS[id].name.toLocaleLowerCase() === name.toLocaleLowerCase(),
  );
  const speaker = speakerId ? CHARACTERS[speakerId] : null;
  portraitContext.clearRect(0, 0, portrait.width, portrait.height);
  mouse(
    portraitContext,
    { x: 48, y: 78, facing: 1 },
    0,
    {
      color: speaker?.color ?? "#9f8162",
      npc: true,
      showName: false,
      weapon: null,
      secondary: null,
      hat: speakerId === "mura",
    },
  );
  $("hud").inert = true;
  dialogueQueue = [...lines];
  dialogueText.start("", performance.now(), true);
  dialogueAction = action;
  closeEmotePicker();
  $("dialogue-name").textContent = name;
  $("dialogue").hidden = false;
  advanceDialogue();
}
function advanceDialogue() {
  if (!dialogueText.complete(performance.now())) {
    $("dialogue-text").textContent = dialogueText.reveal();
    return;
  }
  if (dialogueQueue.length) {
    const { page: text, rest } = measureDialoguePage($("dialogue-text"), dialogueQueue.shift());
    if (rest) dialogueQueue.unshift(rest);
    dialogueText.start(text, performance.now(), matchMedia("(prefers-reduced-motion: reduce)").matches);
    $("dialogue-text").setAttribute("aria-label", text);
    renderDialoguePage($("dialogue-text"), dialogueText.visible(performance.now()), text);
    tone(420, 0.025);
  } else {
    $("dialogue").hidden = true;
    $("hud").inert = false;
    const action = dialogueAction;
    dialogueAction = null;
    action?.();
  }
}
function openModal(kind, title, kicker, body) {
  closeEmotePicker();
  stopOriginalSound("arc1");
  targetingSystem?.cancel();
  if (player) stopGuard();
  modalKind = kind;
  $("modal").classList.toggle("world-map-modal", kind === "world-map");
  $("modal").classList.toggle("talent-profile-modal", kind === "talents");
  $("modal").classList.toggle("profile-overview-modal", kind === "profile");
  $("hud").inert = true;
  pointer.down = false;
  keys.clear();
  $("modal-title").textContent = title;
  $("modal-kicker").textContent = kicker;
  $("modal-body").innerHTML = body;
  $("modal-backdrop").hidden = false;
  $("close-modal").hidden = ["reward", "defeat", "victory"].includes(kind);
  $("modal")
    .querySelector("button:not([hidden]):not(:disabled), input")
    ?.focus();
}
function closeModal() {
  if (modalKind === "loadout-preview") loadoutPreview = null;
  if (["reward", "defeat", "victory"].includes(modalKind)) return;
  modalKind = "";
  $("modal").classList.remove("world-map-modal");
  $("modal").classList.remove("talent-profile-modal");
  $("modal").classList.remove("profile-overview-modal");
  $("hud").inert = false;
  $("modal-backdrop").hidden = true;
  keys.clear();
  pointer.down = false;
}
function closeEmotePicker() {
  const picker = $("emote-picker");
  if (picker) {
    picker.classList.remove("open");
    picker.hidden = true;
  }
  const commandMenu = $("emote-command-menu");
  if (commandMenu) commandMenu.hidden = true;
}
function chooseLocalEmote(code) {
  closeEmotePicker();
  if (mode !== "playing" || $("hud").hidden) return;
  localEmote = { code, startedAt: time };
}
function playLocalMouseEmote(animation) {
  closeEmotePicker();
  if (
    mode !== "playing" ||
    $("hud").hidden ||
    modalKind ||
    !$("dialogue").hidden ||
    !player
  ) return;
  const frames = originalAnimationFrameCount(2, animation);
  localMouseEmote = {
    animation,
    startedAt: time,
    duration:
      (animation === "emote_salut" ? frames ?? 113 : Math.max(120, frames ?? 0)) / 60,
    facing: player.facing || 1,
  };
}
function openLocalEmoteMenu(anchor) {
  if (
    mode !== "playing" ||
    $("hud").hidden ||
    modalKind ||
    !$("dialogue").hidden
  ) return;
  const menu = $("emote-command-menu");
  if (!menu) return;
  const picker = $("emote-picker");
  if (picker && !picker.hidden) closeEmotePicker();
  if (!menu.childElementCount) {
    const commands = [
      ["/hi", "Saludar", "emote_salut"],
      ["/sit", "Sentarse", "emote_assis"],
      ["/dance", "Bailar", "emote_danse"],
    ];
    for (const [command, label, animation] of commands) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = command;
      button.setAttribute("aria-label", `${label} (${command})`);
      button.addEventListener("click", () => playLocalMouseEmote(animation));
      menu.append(button);
    }
  }
  if (!menu.hidden) {
    closeEmotePicker();
    return;
  }
  const bounds = anchor.getBoundingClientRect();
  menu.hidden = false;
  menu.style.left = `${clamp(bounds.left - 10, 8, innerWidth - menu.offsetWidth - 8)}px`;
  menu.style.top = `${clamp(bounds.top - menu.offsetHeight - 20, 8, innerHeight - menu.offsetHeight - 8)}px`;
}
function openEmotePicker(anchor = pointer) {
  if (
    mode !== "playing" ||
    $("hud").hidden ||
    modalKind ||
    !$("dialogue").hidden
  ) return;
  const picker = $("emote-picker");
  if (!picker) return;
  const commandMenu = $("emote-command-menu");
  if (commandMenu) commandMenu.hidden = true;
  if (!picker.hidden) {
    closeEmotePicker();
    return;
  }
  if (!picker.childElementCount) {
    for (let code = 1; code <= 10; code++) {
      const angle = -Math.PI / 2 + ((code - 1) * Math.PI * 2) / 10;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "emote-choice";
      button.setAttribute("aria-label", `Emote ${code}`);
      button.style.setProperty("--dx", `${Math.cos(angle) * 50}px`);
      button.style.setProperty("--dy", `${Math.sin(angle) * 50}px`);
      button.style.transitionDelay = `${(code - 1) * 10}ms`;
      const image = document.createElement("img");
      image.src = `assets/original/interface/emote/T${code}.png`;
      image.alt = "";
      button.append(image);
      button.addEventListener("click", () => chooseLocalEmote(code));
      picker.append(button);
    }
  }
  const bounds = anchor?.getBoundingClientRect?.();
  const x = bounds ? bounds.left + bounds.width / 2 : anchor.x;
  const y = bounds ? bounds.top + bounds.height / 2 : anchor.y;
  picker.style.left = `${clamp(x || w / 2, 72, w - 72)}px`;
  picker.style.top = `${clamp(y || h / 2, 72, h - 72)}px`;
  picker.hidden = false;
  requestAnimationFrame(() => picker.classList.add("open"));
}
document.addEventListener("pointerdown", (event) => {
  const picker = $("emote-picker");
  const commandMenu = $("emote-command-menu");
  if (
    ((picker && !picker.hidden) || (commandMenu && !commandMenu.hidden)) &&
    !picker?.contains(event.target) &&
    !commandMenu?.contains(event.target) &&
    event.target !== $("emote-button")
  ) {
    closeEmotePicker();
    if (canvas.contains(event.target)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}, true);
function finishModal() {
  modalKind = "";
  $("modal").classList.remove("world-map-modal");
  $("modal").classList.remove("talent-profile-modal");
  $("hud").inert = false;
  $("modal-backdrop").hidden = true;
  keys.clear();
  pointer.down = false;
}
function openDungeon() {
  if (mode !== "playing") return;
  if (scene.kind !== "village") {
    toast("Visita el tablón de la aldea al terminar tu recorrido.");
    return;
  }
  const expeditions = selectableExpeditions();
  if (!expeditions.length) {
    toast("Todavía no hay expediciones locales disponibles.");
    return;
  }
  if (!expeditions.some((map) => map.id === selectedExpeditionId))
    selectedExpeditionId = expeditions[0].id;
  const selected = MAPS[selectedExpeditionId];
  const levels = Math.max(1, selected.expedition.difficultyLevels || 1);
  selectedDifficulty = 1;
  openModal(
    "dungeon",
    "Elegir expedición",
    "PREPARA TU VIAJE",
    `<div class="expedition-select"><div class="expedition-list" id="expedition-list" aria-label="Expediciones disponibles">${expeditions.map((map) => `<button class="expedition-option ${map.id === selected.id ? "selected" : ""}" type="button" data-expedition="${escapeHTML(map.id)}" aria-pressed="${map.id === selected.id}"><span class="expedition-option-icon"><img src="assets/original/interface/jeu/pastille_donjon.png" alt=""></span><strong>${escapeHTML(map.expedition.name)}</strong></button>`).join("")}</div><section class="expedition-detail" aria-live="polite"><div class="expedition-preview expedition-preview--${escapeHTML(selected.expedition.previewTheme || "forest")}" id="expedition-preview" role="img" aria-label="Reconstrucción local aproximada de ${escapeHTML(selected.expedition.previewLabel || selected.expedition.name)}"><canvas id="expedition-preview-canvas" width="640" height="420"></canvas><img src="assets/original/interface/donjon/miniature/cadre-miniature.png" alt="" class="preview-frame"><small>RECONSTRUCCIÓN LOCAL</small></div><h3 id="expedition-name">${escapeHTML(selected.expedition.name)}</h3><p id="expedition-description" class="muted">${escapeHTML(selected.expedition.description || "")}</p><label class="expedition-length">Dificultad<select id="expedition-difficulty" ${levels === 1 ? "disabled" : ""}>${Array.from({ length: levels }, (_, index) => `<option value="${index + 1}">Dificultad ${index + 1}</option>`).join("")}</select></label><div class="expedition-facts"><span>Mejor etapa<strong>${Math.max(1, profile.bestStep)}</strong></span><span>Grupo local<strong>1 ratón + Picpic</strong></span></div></section></div><label class="expedition-length">Longitud del recorrido <select id="expedition-length"><option value="3">Recorrido corto · 3 encuentros</option><option value="7">Recorrido completo · 6 encuentros + jefe</option></select></label><p class="save-note">La selección de grupo y el lanzamiento online del original dependen del servidor; aquí comienza una partida local en solitario.</p><div class="button-row"><button class="secondary" id="prepare">Preparar mi equipo</button><button class="primary" id="begin-dungeon">Comenzar expedición ➜</button></div>`,
  );
  const syncEncounterOptions = (map) => {
    const select = $("expedition-length");
    const counts = map.expedition.encounterCounts || [3, 7];
    select.innerHTML = counts.map((count) =>
      `<option value="${count}">${count === 3 ? "Recorrido corto" : count === 7 ? "Recorrido completo" : `Recorrido · ${count} encuentros`} · ${count} encuentros</option>`,
    ).join("");
    select.value = String(counts.includes(profile.encounters) ? profile.encounters : counts[0]);
  };
  const drawExpeditionPreview = (map) => {
    const preview = $("expedition-preview-canvas");
    if (!preview) return;
    const mapScene = makeScene(map.id);
    const previewContext = preview.getContext("2d");
    previewContext.clearRect(0, 0, preview.width, preview.height);
    previewContext.fillStyle = "#1d241a";
    previewContext.fillRect(0, 0, preview.width, preview.height);
    const scale = Math.min(
      preview.width / mapScene.width,
      preview.height / mapScene.height,
    );
    const offsetX = (preview.width - mapScene.width * scale) / 2;
    const offsetY = (preview.height - mapScene.height * scale) / 2;
    previewContext.save();
    previewContext.translate(offsetX, offsetY);
    previewContext.scale(scale, scale);
    previewContext.drawImage(mapScene.ground, 0, 0);
    for (const object of [...mapScene.objects].sort((a, b) => a.y - b.y))
      decoration(previewContext, object);
    previewContext.restore();
  };
  drawExpeditionPreview(selected);
  syncEncounterOptions(selected);
  $("expedition-difficulty").onchange = (event) => {
    selectedDifficulty = Number(event.target.value) || 1;
  };
  $("expedition-list").onclick = (event) => {
    const button = event.target.closest("[data-expedition]");
    const map = button && expeditions.find((entry) => entry.id === button.dataset.expedition);
    if (!map) return;
    selectedExpeditionId = map.id;
    document.querySelectorAll("[data-expedition]").forEach((option) => {
      const active = option.dataset.expedition === map.id;
      option.classList.toggle("selected", active);
      option.setAttribute("aria-pressed", String(active));
    });
    $("expedition-name").textContent = map.expedition.name;
    $("expedition-description").textContent = map.expedition.description || "";
    const preview = $("expedition-preview");
    preview.className = `expedition-preview expedition-preview--${map.expedition.previewTheme || "forest"}`;
    preview.setAttribute("aria-label", `Reconstrucción local aproximada de ${map.expedition.previewLabel || map.expedition.name}`);
    drawExpeditionPreview(map);
    const count = Math.max(1, map.expedition.difficultyLevels || 1);
    $("expedition-difficulty").innerHTML = Array.from({ length: count }, (_, index) => `<option value="${index + 1}">Dificultad ${index + 1}</option>`).join("");
    $("expedition-difficulty").disabled = count === 1;
    selectedDifficulty = 1;
    $("expedition-difficulty").value = "1";
    syncEncounterOptions(map);
  };
  $("prepare").onclick = () => openProfile("equipment");
  $("begin-dungeon").onclick = () => {
    const expedition = MAPS[selectedExpeditionId];
    if (!expedition?.expedition) return toast("Selecciona una expedición disponible.");
    encounterCount = Number($("expedition-length").value);
    profile.encounters = encounterCount;
    closeModal();
    gifts = [];
    room = 0;
    step = selectedDifficulty;
    player.hp = maxHP();
    enterScene(expedition.id, 0);
  };
}
function openGifts() {
  originalSound("coffre2", 750, 0.2);
  const rand = seeded(step * 913 + room * 39 + profile.level);
  if (!rewardOffer.length) {
    let available = eligibleGifts(profile, gifts);
    if (available.length < 3)
      available = eligibleGifts(profile, gifts, { allowOwned: true });
    if (!available.length)
      available = giftsCatalog.filter((g) =>
        ["renew", "vitality", "power"].includes(g.id),
      );
    available = available.sort((a, b) => a.id.localeCompare(b.id));
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }
    rewardOffer = available.slice(0, 3).map((g) => g.id);
  }
  const chosen = rewardOffer
    .map((id) => giftsCatalog.find((g) => g.id === id))
    .filter(Boolean);
  openModal(
    "reward",
    "Los regalos de Elisah",
    "ELIGE Y CONFIRMA TU BENDICIÓN",
    `<p class="muted" style="text-align:center">Selecciona un regalo. Puedes cambiar de elección antes de confirmar.</p><div class="reward-grid">${chosen.map((g) => `<button class="reward ${selectedGift === g.id ? "selected" : ""}" data-gift="${g.id}" aria-pressed="${selectedGift === g.id}"><span class="icon">${g.iconAsset ? `<img src="${g.iconAsset}" alt="" loading="lazy">` : g.icon}</span><strong>${g.name}</strong><small>${g.description}</small></button>`).join("")}</div><div class="button-row"><button id="confirm-gift" class="primary" ${!chosen.some((g) => g.id === selectedGift) ? "disabled" : ""}>Confirmar regalo →</button><button id="close-gifts" class="secondary" type="button">Cerrar</button></div><p class="save-note">${gifts.length} bendiciones recibidas durante esta expedición.</p>`,
  );
  document.querySelectorAll("[data-gift]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedGift = selectedGift === b.dataset.gift ? null : b.dataset.gift;
        document.querySelectorAll("[data-gift]").forEach((el) => {
          el.classList.toggle("selected", el.dataset.gift === selectedGift);
          el.setAttribute(
            "aria-pressed",
            String(el.dataset.gift === selectedGift),
          );
        });
        $("confirm-gift").disabled = !selectedGift;
        save();
      }),
  );
  $("close-gifts").onclick = () => {
    selectedGift = null;
    finishModal();
    save();
  };
  $("confirm-gift").onclick = () => {
    const g = chosen.find((g) => g.id === selectedGift);
    if (!g) return;
    $("confirm-gift").disabled = true;
    gifts.push(g.id);
    g.apply();
    rewardOffer = [];
    selectedGift = null;
    finishModal();
    room++;
    tone(750, 0.25);
    if (room >= encounterCount) victory();
    else {
      encounterAwarded = false;
      encounterXP = true;
      encounterStarted = false;
      enemies = [];
      projectiles = [];
      effects = effects.filter((effect) => effect.kind !== "trap" && effect.kind !== "plant");
      scene.interactables = scene.interactables.filter((entry) => entry.id !== "chest");
      roomClearTimer = 0;
      updateQuest();
      announce("El sendero continúa", `ZONA ${room + 1} DE ${encounterCount} · AVANZA HACIA EL ESTE`);
      save();
    }
  };
  save();
}

function victory(award = true) {
  if (award) {
    profile.bestStep = Math.max(profile.bestStep, step);
    profile.coins += 30;
    profile.expeditions++;
    const loot = expeditionLoot(profile, step, profile.expeditions);
    if (loot)
      toast(`Objeto obtenido: ${loot.name}. Ábrelo en Perfil → Mochila.`);
    addXP(40);
    save();
  }
  const latest = profile.inventory.find(
    (i) => Number(i.id.split("-")[2]) === profile.expeditions,
  );
  const lootSummary = latest ? itemDetails(latest) : null;
  openModal(
    "victory",
    "El bosque vuelve a respirar",
    "EXPEDICIÓN COMPLETADA",
    `<p class="intro">¡Has superado la etapa ${step}!</p><div class="stat-grid"><div class="stat reward-entry" data-reward-entry><strong>+30 ◈</strong><span>RECOMPENSA</span></div><div class="stat"><strong>${gifts.length}</strong><span>REGALOS DE ELISAH</span></div><div class="stat"><strong>${profile.level}</strong><span>NIVEL ACTUAL</span></div></div>${lootSummary ? `<div class="loot-summary reward-entry" data-reward-entry><span>${lootSummary.icon}</span><p><strong>${lootSummary.name}</strong><small>${lootSummary.rarity} · +${lootSummary.amount} ${STAT_NAMES[lootSummary.stat]} · Guardado en tu mochila</small></p></div>` : `<p class="muted">${profile.inventory.length >= 80 ? "Mochila llena: vende objetos en la aldea para recibir más equipo." : "Recibirás un objeto al completar la siguiente etapa."}</p>`}<p>Puedes conservar tus regalos y avanzar a una etapa más difícil, o regresar a la aldea para descansar y preparar tu equipo.</p><div class="button-row"><button class="secondary" id="go-village" data-victory-action disabled>Volver a la aldea</button><button class="primary" id="go-deeper" data-victory-action disabled>Continuar · Etapa ${step + 1} ➜</button></div>`,
  );
  const rewardEntries = [...document.querySelectorAll("[data-reward-entry]")];
  rewardEntries.forEach((entry, index) => {
    entry.style.animationDelay = `${index * 250}ms`;
  });
  const enableVictoryActions = () => {
    if (modalKind !== "victory") return;
    const actions = [...document.querySelectorAll("[data-victory-action]")];
    actions.forEach((button) => (button.disabled = false));
    actions[0]?.focus();
  };
  if (rewardEntries.length)
    rewardEntries[rewardEntries.length - 1].addEventListener(
      "animationend",
      enableVictoryActions,
      { once: true },
    );
  else enableVictoryActions();
  $("go-village").onclick = () => {
    finishModal();
    gifts = [];
    step = 1;
    enterScene("village");
    announce("Bienvenido a casa", "PROGRESO GUARDADO");
  };
  $("go-deeper").onclick = () => {
    finishModal();
    step++;
    room = 0;
    player.hp = maxHP();
    enterScene("dungeon", 0);
  };
}

function localProfileAppearance(slotCode) {
  const localKey = slotCode === 1 ? "head" : slotCode === 3 ? "body" : null;
  if (!localKey) return 0;
  if (!profile.cosmetics) profile.cosmetics = {};
  const chosen = profile.cosmetics[localKey];
  if (chosen > 0) return chosen;
  if (chosen < 0) return 0;
  const item = profile.inventory.find((entry) => entry.id === profile.equipped[localKey]);
  return item ? itemDetails(item).appearance : 0;
}

function profileEquipmentSlot(slotCode, inVillage) {
  const label = ORIGINAL_EQUIPMENT_SLOT_LABELS[slotCode];
  const iconPath = equipmentSlotIconPath(slotCode);
  let content = `<img src="${iconPath}" alt="" loading="lazy">`;
  let active = false;
  let state = "Ranura vacía";
  if (slotCode === 1 || slotCode === 3) {
    const appearance = localProfileAppearance(slotCode);
    if (appearance) {
      content = `<canvas class="inventory-preview profile-slot-preview" data-appearance="${appearance}" width="56" height="56" role="img" aria-label="Apariencia ${appearance}"></canvas>`;
      state = `Apariencia local ${appearance}`;
    }
    active = inVillage;
  } else if (slotCode === 21) {
    const weaponIcons = { sword: 21001, greatsword: 22001, dagger: 23001, bow: 25001 };
    const icon = weaponIcons[profile.weapon];
    const name = WEAPONS[profile.weapon].name;
    content = `<img src="assets/original/interface/icones/${icon}.png" alt="" loading="lazy">`;
    state = name;
    active = true;
  } else if (slotCode === 22) {
    const icon = profile.secondary === "shield" ? 24001 : 26001;
    const name = SECONDARIES[profile.secondary].name;
    content = `<img src="assets/original/interface/icones/${icon}.png" alt="" loading="lazy">`;
    state = name;
    active = true;
  }
  const accessibleName = `${label}: ${state}`;
  const classes = `profile-slot${state === "Ranura vacía" ? " profile-slot--empty" : " profile-slot--filled"}`;
  if (active) {
    return `<button type="button" class="${classes}" data-profile-slot="${slotCode}" aria-label="${escapeHTML(accessibleName)}" title="${escapeHTML(accessibleName)}">${content}<span class="sr-only">${escapeHTML(label)}</span></button>`;
  }
  return `<div class="${classes}" role="img" aria-label="${escapeHTML(accessibleName)}" title="${escapeHTML(accessibleName)}">${content}<span class="sr-only">${escapeHTML(label)}</span></div>`;
}

function openProfile(tab = "profile") {
  if (mode !== "playing") return;
  const inVillage = scene.kind === "village";
  const tabs = [
    ["profile", "Perfil"],
    ["equipment", "Equipo"],
    ["inventory", "Mochila"],
    ["jobs", "Trabajos"],
    ["talents", "Talentos"],
    ["appearance", "Apariencia"],
    ["pet", "Mascota"],
    ["gifts", "Dones"],
  ];
  let body = tab === "talents"
    ? ""
    : `<div class="tabs">${tabs.map(([id, name]) => `<button data-tab="${id}" class="${tab === id ? "active" : ""}">${name}</button>`).join("")}</div>`;
  if (tab === "profile") {
    const petCount = profile.petSpecies ? 1 : 0;
    const leftSlots = ORIGINAL_PROFILE_EQUIPMENT_LAYOUT.left.map((code) => profileEquipmentSlot(code, inVillage)).join("");
    const rightSlots = ORIGINAL_PROFILE_EQUIPMENT_LAYOUT.right.map((code) => profileEquipmentSlot(code, inVillage)).join("");
    const handSlots = ORIGINAL_PROFILE_EQUIPMENT_LAYOUT.hands.map((code) => profileEquipmentSlot(code, inVillage)).join("");
    body += `<section class="profile-overview" aria-label="Perfil y equipo"><div class="profile-character-loadout"><div class="profile-loadout-stage"><div class="profile-slot-column" aria-label="Equipo, lado izquierdo">${leftSlots}</div><canvas id="appearance-preview" width="280" height="220" aria-label="Apariencia actual de ${escapeHTML(profile.name)}"></canvas><div class="profile-slot-column" aria-label="Equipo, lado derecho">${rightSlots}</div></div><div class="profile-hand-row">${handSlots}<button type="button" class="profile-talents-button" id="profile-open-talents"><img src="assets/original/interface/talents.png" alt="" loading="lazy">Talentos</button></div></div><div class="profile-overview-details"><h3>${escapeHTML(profile.name)}</h3><p><span>Nivel:</span><strong>${profile.level}</strong></p><p><span>Mascotas:</span><strong>${petCount}</strong></p><p><span>Título actual:</span><strong>Sin título</strong></p></div></section>`;
  }
  if (tab === "gifts") {
    const counts = new Map();
    for (const id of gifts) counts.set(id, (counts.get(id) || 0) + 1);
    body += `<p class="intro">${gifts.length} dones recibidos en esta expedición</p><p class="muted">Conservas estas bendiciones al avanzar de etapa. Se pierden al regresar a la aldea.</p><div class="gift-collection">${[...counts].map(([id, count]) => {
      const gift = giftsCatalog.find(entry => entry.id === id);
      if (!gift) return "";
      return `<article class="owned-gift">${gift.iconAsset ? `<img src="${gift.iconAsset}" alt="" loading="lazy">` : `<span>${gift.icon}</span>`}<div><strong>${escapeHTML(gift.name)}${count > 1 ? ` ×${count}` : ""}</strong><p>${escapeHTML(gift.description)}</p><small>${escapeHTML(gift.category || "Bendición")}</small></div></article>`;
    }).join("") || '<p class="muted">Todavía no has recibido dones. Abre el cofre al completar un encuentro.</p>'}</div>`;
  }
  if (tab === "equipment") {
    body += `<div class="stat-grid"><div class="stat"><strong>${maxHP()}</strong><span>VIDA MÁXIMA</span></div><div class="stat"><strong>${Math.round(weaponDamage(profile.weapon, profile.level, profile.talents.power) + bonus(WEAPONS[profile.weapon].ranged ? "rangedDamage" : "meleeDamage") + bonus("damage"))}</strong><span>DAÑO POR GOLPE</span></div><div class="stat"><strong>${profile.coins} ◈</strong><span>MONEDAS</span></div></div><p class="muted">Arma principal</p><div class="item-grid">${Object.entries(
      WEAPONS,
    )
      .map(
        ([id, w]) =>
          `<button class="item ${profile.weapon === id ? "selected" : ""}" data-weapon="${id}" ${!inVillage ? "disabled" : ""}><span class="item-icon"><img src="assets/original/interface/icones/${{ sword: 21001, greatsword: 22001, dagger: 23001, bow: 25001 }[id]}.png" alt=""></span><strong>${w.name}</strong><span>${w.description}<br>Preparación: ${w.windup}s · Ataque: ${w.duration}s<br>${profile.weapon === id ? "Equipado" : "Equipar"}</span></button>`,
      )
      .join(
        "",
      )}</div><p class="muted">Mano secundaria</p><div class="item-grid">${Object.entries(
      SECONDARIES,
    )
      .map(
        ([id, s]) =>
          `<button class="item ${profile.secondary === id && !WEAPONS[profile.weapon].twoHanded ? "selected" : ""}" data-secondary="${id}" ${!inVillage || WEAPONS[profile.weapon].twoHanded ? "disabled" : ""}><span class="item-icon"><img src="assets/original/interface/icones/${id === "shield" ? 24001 : 26001}.png" alt=""></span><strong>${s.name}</strong><span>${s.description}</span></button>`,
      )
      .join(
        "",
      )}</div><p class="save-note">${WEAPONS[profile.weapon].twoHanded ? "La espada de dos manos impide usar vendas o escudo. " : ""}${inVillage ? "Puedes cambiar de equipo libremente en la aldea." : "El equipo se cambia en la aldea."} Los valores de balance son provisionales.</p>`;
  }
  if (tab === "jobs") {
    body += `<p class="muted">Mura: «Un ratón se defiende con lo que mejor sabe hacer.»</p><div class="item-grid">${Object.entries(
      jobs,
    )
      .map(
        ([id, j]) =>
          `<button class="item ${profile.job === id ? "selected" : ""}" data-job="${id}" ${!inVillage ? "disabled" : ""}><span class="item-icon"><img src="assets/original/interface/metiers/icone-metier-${{ botanist: 1, chef: 2, journalist: 3, trickster: 4 }[id]}.png" alt=""></span><strong>${j.name}</strong><span>${j.description}<br><br>${profile.job === id ? "Trabajo actual" : "Elegir trabajo"}</span></button>`,
      )
      .join(
        "",
      )}</div><p class="save-note">${inVillage ? "Cambiar de trabajo es gratis." : "Vuelve a la aldea para cambiar de trabajo."} Puedes elegir entre cuatro trabajos en esta versión local.</p>`;
    body += `<h3>Habilidades de ${jobs[profile.job].name}</h3>${[1, 2].map(slot => {
      const ability = ABILITIES[`${profile.job}.skill${slot}`];
      return `<details class="skill-description"><summary>${abilityIconMarkup(ability)}<span>${escapeHTML(ability.name)} · ${slot === 1 ? "Q" : "R"}</span></summary><p>${escapeHTML(ability.description)}</p><p class="muted">${escapeHTML(skillInstructions(ability, giftEffect))}</p></details>`;
    }).join("")}`;
    body +=
      profile.level < SECONDARY_JOB_LEVEL
        ? `<p class="intro">Trabajo secundario · Nivel ${SECONDARY_JOB_LEVEL}</p><p class="muted">Al alcanzar ese nivel podrás elegir una habilidad de otro trabajo para la tercera ranura.</p>`
        : `<hr class="divider"><p class="intro">Trabajo secundario · Ranura 3</p><p class="muted">Elige una habilidad de un trabajo diferente. Conservas las dos habilidades de tu trabajo principal.</p><div class="item-grid">${Object.entries(
            jobs,
          )
            .filter(([id]) => id !== profile.job)
            .map(
              ([id, j]) =>
                `<div class="item"><span class="item-icon"><img src="assets/original/interface/metiers/icone-metier-${{ botanist: 1, chef: 2, journalist: 3, trickster: 4 }[id]}.png" alt=""></span><strong>${j.name}</strong>${[1, 2].map((n) => { const ability = ABILITIES[`${id}.skill${n}`]; return `<button class="secondary job-skill-choice ${profile.secondaryJob === id && profile.secondarySkill === n ? "selected-secondary" : ""}" data-secondary-job="${id}" data-skill="${n}" ${!inVillage ? "disabled" : ""}>${abilityIconMarkup(ability)}<span>${profile.secondaryJob === id && profile.secondarySkill === n ? "✓ " : ""}${j["skill" + n]}</span></button>`; }).join("")}</div>`,
            )
            .join(
              "",
            )}</div><div class="button-row"><button id="clear-secondary-job" class="secondary" ${!inVillage ? "disabled" : ""}>Sin trabajo secundario</button></div>`;
  }
  if (tab === "talents") {
    const talentTabs = [
      ["weapons", "Armas"],
      ["skills", "Habilidades"],
      ["mouse", "Ratón"],
    ];
    const visibleTalentTrees = (category) => {
      const categoryTrees = TALENT_TREES.filter((tree) => tree.category === category);
      if (category === "weapons") {
        const equippedTrees = [profile.weapon, profile.secondary]
          .map((id) => categoryTrees.find((tree) => tree.id === id))
          .filter(Boolean);
        return equippedTrees.length ? [...new Set(equippedTrees)] : categoryTrees;
      }
      if (category === "skills") {
        const activeJobs = [profile.job, profile.secondaryJob].filter(Boolean);
        const jobTrees = categoryTrees.filter((tree) =>
          activeJobs.some((job) => tree.id === job || tree.id.startsWith(`${job}-`)),
        );
        return jobTrees.length ? jobTrees : categoryTrees;
      }
      return categoryTrees;
    };
    const trees = visibleTalentTrees(talentCategory);
    if (!trees.some((tree) => tree.id === talentOpenTree)) {
      talentOpenTree = trees[0]?.id ?? "";
      talentOpenNode = 0;
    }
    const selectedTree = trees.find((tree) => tree.id === talentOpenTree);
    const selectedNode = selectedTree?.nodes[talentOpenNode] ?? selectedTree?.nodes[0];
    if (selectedTree && !selectedTree.nodes[talentOpenNode]) talentOpenNode = 0;
    const selectedOwned = selectedTree && (profile.talentBuild[selectedTree.id] || []).includes(talentOpenNode);
    const selectedResult = selectedTree && selectedNode
      ? canLearnTalent(profile, selectedTree.id, talentOpenNode)
      : { allowed: false, reason: "No hay talentos en esta categoría.", cost: 0 };
    const xpPercent = Math.max(0, Math.min(100, profile.xp / xpNeeded() * 100));
    const branchMarkup = trees.map((tree) => {
      const nodeMarkup = tree.nodes.map((node, index) => {
        const owned = (profile.talentBuild[tree.id] || []).includes(index);
        const demoLocked = !owned && node.tier === DEMO_LOCKED_TALENT_TIER;
        const selected = tree.id === talentOpenTree && index === talentOpenNode;
        const result = canLearnTalent(profile, tree.id, index);
        return `<button type="button" class="talent-node ${owned ? "owned" : ""} ${!owned && result.allowed ? "available" : ""} ${demoLocked ? "demo-locked" : ""} ${selected ? "selected" : ""}" data-talent-tree="${tree.id}" data-talent-node="${index}" aria-pressed="${selected}" aria-label="${escapeHTML(node.name)}, nivel ${node.tier + 1}, ${demoLocked ? "no disponible en esta demo" : owned ? "aprendido" : `${result.cost} puntos`}" title="${escapeHTML(node.name)} · ${demoLocked ? "No disponible en esta demo" : `Nivel ${node.tier + 1}`} "><img class="talent-art" src="assets/original/interface/talent/${node.originalTalentId}.png" alt="" loading="lazy"><small>${owned ? "✓" : node.tier + 1}</small>${demoLocked ? '<img class="talent-lock" src="assets/original/interface/petit-cadenas.png" alt="No disponible en esta demo">' : ""}</button>`;
      }).join("");
      return `<section class="talent-branch"><h3>${escapeHTML(tree.name)}</h3><div class="talent-nodes">${nodeMarkup}</div></section>`;
    }).join("");
    const detailMarkup = selectedNode
      ? `<img class="talent-detail-icon" src="assets/original/interface/talent/${selectedNode.originalTalentId}.png" alt=""><small>${selectedOwned ? "APRENDIDO" : selectedNode.tier === DEMO_LOCKED_TALENT_TIER ? "NO DISPONIBLE EN ESTA DEMO" : `NIVEL ${selectedNode.tier + 1} · ${selectedResult.cost} PT`}</small><h3>${escapeHTML(selectedNode.name)}</h3><p>${escapeHTML(selectedNode.description)}</p><button type="button" id="learn-selected-talent" class="talent-learn" ${!selectedResult.allowed ? "disabled" : ""}>${selectedOwned ? "Aprendido" : selectedResult.allowed ? selectedResult.cost ? `Aprender · ${selectedResult.cost} PT` : "Cambiar especialización gratis" : escapeHTML(selectedResult.reason)}</button>`
      : `<p class="muted">No hay talentos disponibles en esta categoría.</p>`;
    body += `<nav class="talent-category-tabs" aria-label="Categorías de talentos">${talentTabs.map(([id, name]) => `<button type="button" data-talent-category="${id}" class="${talentCategory === id ? "active" : ""}" aria-pressed="${talentCategory === id}">${name}</button>`).join("")}</nav><div class="talent-screen"><div class="talent-branches">${branchMarkup}</div><aside class="talent-detail" aria-live="polite"><div class="talent-progress"><strong>Nivel ${profile.level}</strong><div class="talent-xp-track"><i style="width:${xpPercent}%"></i></div><small>${profile.xp} / ${xpNeeded()} XP · ${talentPoints()} puntos</small></div>${detailMarkup}</aside></div>`;
  }
  if (tab === "talents" && inVillage)
    body += `<div class="talent-reset-row"><button type="button" id="reset-talents">Redistribuir talentos</button></div>`;
  if (tab === "inventory") {
    body += `<p class="intro">${profile.inventory.length} / 80 objetos · ${profile.coins} ◈</p><p class="muted">Al terminar cada etapa recibes un objeto permanente. Puedes equiparlo o venderlo en la aldea. Los accesorios aportan estadísticas y una prenda visual. Puedes personalizar la apariencia en su pestaña.</p><div class="item-grid">${
      profile.inventory
        .map((item) => {
          const d = itemDetails(item),
            worn = profile.equipped[d.slot] === d.id;
          return `<button class="item ${worn ? "selected" : ""}" data-item="${d.id}"><span class="item-icon inventory-item-icon"><canvas class="inventory-preview" data-appearance="${d.appearance}" data-fallback="${d.icon}" width="56" height="64" role="img" aria-label="Vista de ${escapeHTML(d.name)}"></canvas></span><strong>${d.name}</strong><span>${d.rarity} · ${SLOTS[d.slot]} · Rango ${d.rank}<br>+${d.amount} ${STAT_NAMES[d.stat]}<br>${worn ? "Equipado" : "Ver objeto"}</span></button>`;
        })
        .join("") ||
      '<p class="muted">Tu mochila está vacía. Completa una expedición para conseguir equipo.</p>'
    }</div><p class="save-note">La economía y los atributos de los objetos son provisionales.</p>`;
  }
  if (tab === "appearance") {
    body += `<canvas id="appearance-preview" width="280" height="220" aria-label="Vista previa de tu ratón"></canvas><p class="muted">Pelaje</p><div>${furColors.map((c, i) => `<button class="color-swatch ${profile.fur === i ? "selected" : ""}" style="background:${c}" data-fur="${i}" aria-label="Pelaje ${i + 1}"></button>`).join("")}</div><div class="cosmetic-grid">${[
      ["head", "Cabeza"],
      ["body", "Túnica"],
      ["cape", "Capa"],
      ["accessory", "Adorno"],
    ]
      .map(
        ([slot, name]) =>
          `<label>${name}<select data-cosmetic="${slot}" ${!inVillage ? "disabled" : ""}><option value="0">Usar equipo</option><option value="-1">Sin prenda</option>${COSMETIC_SETS.filter(
            (c) => c.slot === slot,
          )
            .map((c) => `<option value="${c.code}">${c.label}</option>`)
            .join("")}</select></label>`,
      )
      .join(
        "",
      )}</div><p class="save-note">Puedes cambiar la apariencia en la aldea. La opción «Usar equipo» muestra las prendas de los accesorios equipados.</p>`;
  }
  if (tab === "pet") {
    body += `<p class="intro">${escapeHTML(profile.petName)} · ${PET_SPECIES[profile.petSpecies]?.name ?? PET_SPECIES.hedgehog.name}</p><canvas id="pet-profile-preview" class="pet-profile-preview" width="180" height="130" role="img" aria-label="Vista de ${escapeHTML(profile.petName)}"></canvas><p class="muted">Tu compañero te sigue y ayuda en combate. Puedes invocarlo o retirarlo desde la aldea.</p><label class="pet-name-label">Nombre <input id="pet-name" maxlength="18" value="${escapeHTML(profile.petName)}" ${!inVillage ? "disabled" : ""}></label><div class="button-row"><button id="rename-pet" class="secondary" ${!inVillage ? "disabled" : ""}>Guardar nombre</button><button id="toggle-pet" class="primary" ${!inVillage ? "disabled" : ""}>${profile.petActive ? "Retirar compañero" : "Invocar compañero"}</button></div>`;
  }

  openModal(
    tab === "talents" ? "talents" : "profile",
    tab === "talents" ? "Talentos" : profile.name,
    tab === "talents"
      ? `NIVEL ${profile.level} · ${talentPoints()} PUNTOS DISPONIBLES`
      : `NIVEL ${profile.level} · ${jobs[profile.job].name.toUpperCase()}`,
    body,
  );
  if (tab !== "talents") $("modal").classList.add("profile-overview-modal");
  if (tab === "inventory") {
    const renderInventoryPreviews = () => {
      const previews = document.querySelectorAll(".inventory-preview");
      if (!previews.length) return;
      if (!artStatus().ready) {
        setTimeout(renderInventoryPreviews, 120);
        return;
      }
      for (const canvas of previews) {
        const previewContext = canvas.getContext("2d");
        previewContext.clearRect(0, 0, canvas.width, canvas.height);
        previewContext.save();
        previewContext.translate(canvas.width / 2, canvas.height - 3);
        previewContext.scale(1.15, 1.15);
        drawPlayerCharacter(
          previewContext,
          profile.characterId,
          { x: 0, y: 0, facing: 1, moving: false },
          time,
          {
            color: furColors[profile.fur],
            weapon: null,
            secondary: null,
            clothing: [Number(canvas.dataset.appearance)],
          },
        );
        previewContext.restore();
      }
    };
    renderInventoryPreviews();
  }
  document
    .querySelectorAll("[data-tab]")
    .forEach((b) => (b.onclick = () => openProfile(b.dataset.tab)));
  document.querySelectorAll("[data-profile-slot]").forEach((slot) => {
    slot.onclick = () => {
      const code = Number(slot.dataset.profileSlot);
      if (code === 21 || code === 22) {
        openProfile("equipment");
      } else if (code === 1 || code === 3) {
        openProfile("appearance");
        const localSlot = code === 1 ? "head" : "body";
        const selector = document.querySelector(`[data-cosmetic="${localSlot}"]`);
        if (selector) selector.value = String(profile.cosmetics[localSlot] ?? 0);
        selector?.focus();
      }
    };
  });
  $("profile-open-talents")?.addEventListener("click", () => openProfile("talents"));
  document.querySelectorAll("[data-talent-category]").forEach(
    (b) => (b.onclick = () => {
      talentCategory = b.dataset.talentCategory;
      const nextTree = TALENT_TREES.find((tree) => tree.category === talentCategory);
      if (nextTree) {
        talentOpenTree = nextTree.id;
        talentOpenNode = 0;
      }
      openProfile("talents");
    }),
  );
  document.querySelectorAll("[data-weapon]").forEach(
    (b) =>
      (b.onclick = () => {
        if (inVillage) openLoadoutPreview(b.dataset.weapon, profile.secondary);
      }),
  );
  document.querySelectorAll("[data-secondary]").forEach(
    (b) =>
      (b.onclick = () => {
        if (inVillage && !WEAPONS[profile.weapon].twoHanded)
          openLoadoutPreview(profile.weapon, b.dataset.secondary);
      }),
  );
  document.querySelectorAll("[data-job]").forEach(
    (b) =>
      (b.onclick = () => {
        if (!inVillage) return;
        profile.job = b.dataset.job;
        if (profile.secondaryJob === profile.job) profile.secondaryJob = null;
        player.skill1 = 0;
        player.skill2 = 0;
        player.skill3 = 0;
        player.invisible = 0;
        player.damageBoost = 0;
        player.testimonyTimer = 0;
        save();
        updateHUD();
        openProfile(tab);
      }),
  );
  document.querySelectorAll("[data-secondary-job]").forEach(
    (b) =>
      (b.onclick = () => {
        if (
          !inVillage ||
          profile.level < SECONDARY_JOB_LEVEL ||
          b.dataset.secondaryJob === profile.job
        )
          return;
        profile.secondaryJob = b.dataset.secondaryJob;
        profile.secondarySkill = Number(b.dataset.skill);
        player.skill3 = 0;
        save();
        updateHUD();
        openProfile(tab);
      }),
  );
  if ($("clear-secondary-job"))
    $("clear-secondary-job").onclick = () => {
      if (!inVillage) return;
      profile.secondaryJob = null;
      player.skill3 = 0;
      save();
      updateHUD();
      openProfile(tab);
    };
  if ($("reset-talents"))
    $("reset-talents").onclick = () => {
      if (!inVillage) return;
      openModal(
        "talent-reset",
        "Redistribuir talentos",
        "PREPARA OTRA ESPECIALIZACIÓN",
        '<p>Se devolverán todos tus puntos, incluidos los tres talentos de las versiones antiguas. Tu nivel y experiencia se conservan. Tendrás que volver a aprender los talentos que quieras usar.</p><div class="button-row"><button id="cancel-reset" class="secondary">Cancelar</button><button id="confirm-reset" class="primary">Devolver puntos</button></div>',
      );
      $("cancel-reset").onclick = () => openProfile("talents");
      $("confirm-reset").onclick = () => {
        profile.talents = { vitality: 0, power: 0, pet: 0 };
        profile.talentBuild = {};
        player.hp = Math.min(player.hp, maxHP());
        pet.hp = Math.min(pet.hp, petMaxHP());
        save();
        updateHUD();
        openProfile("talents");
      };
    };
  document.querySelectorAll("[data-talent-tree]").forEach(
    (b) =>
      (b.onclick = () => {
        talentOpenTree = b.dataset.talentTree;
        talentOpenNode = Number(b.dataset.talentNode);
        openProfile("talents");
      }),
  );
  if ($("learn-selected-talent"))
    $("learn-selected-talent").onclick = () => {
      const oldHP = maxHP(),
        oldPetHP = petMaxHP(),
        result = learnTalent(profile, talentOpenTree, talentOpenNode);
      if (!result.allowed) return toast(result.reason);
      player.hp = Math.min(maxHP(), player.hp + Math.max(0, maxHP() - oldHP));
      pet.hp = Math.min(petMaxHP(), pet.hp + Math.max(0, petMaxHP() - oldPetHP));
      save();
      updateHUD();
      openProfile("talents");
    };
  document.querySelectorAll("[data-item]").forEach(
    (b) =>
      (b.onclick = () => {
        const item = profile.inventory.find((i) => i.id === b.dataset.item);
        if (!item) return;
        const d = itemDetails(item),
          worn = profile.equipped[d.slot] === d.id;
        openModal(
          "item",
          d.name,
          SLOTS[d.slot].toUpperCase(),
          `<p class="intro">${d.icon} +${d.amount} ${STAT_NAMES[d.stat]}</p><p>${d.rarity} · Rango ${d.rank}. Valor: ${d.value} monedas.</p><div class="button-row"><button class="secondary" id="cancel-item">Volver</button><button class="secondary" id="sell-item" ${!inVillage || worn ? "disabled" : ""}>Vender · ${d.value} ◈</button><button class="primary" id="confirm-item" ${!inVillage ? "disabled" : ""}>${worn ? "Desequipar" : "Confirmar equipo"}</button></div><p class="save-note">${inVillage ? "Revisa el objeto antes de confirmar." : "Vuelve a la aldea para cambiar el equipo."}</p>`,
        );
        $("cancel-item").onclick = () => openProfile("inventory");
        $("confirm-item").onclick = () => {
          if (!inVillage) return;
          if (worn) delete profile.equipped[d.slot];
          else profile.equipped[d.slot] = d.id;
          player.hp = Math.min(player.hp, maxHP());
          save();
          updateHUD();
          openProfile("inventory");
        };
        $("sell-item").onclick = () => {
          if (!inVillage || worn) return;
          profile.inventory = profile.inventory.filter((i) => i.id !== d.id);
          profile.coins += d.value;
          save();
          openProfile("inventory");
        };
      }),
  );
  document.querySelectorAll("[data-cosmetic]").forEach((el) => {
    el.value = String(profile.cosmetics[el.dataset.cosmetic]);
    el.onchange = () => {
      if (!inVillage) return;
      profile.cosmetics[el.dataset.cosmetic] = Number(el.value);
      save();
    };
  });
  if ($("rename-pet"))
    $("rename-pet").onclick = () => {
      if (!inVillage) return;
      profile.petName = $("pet-name").value.trim().slice(0, 18) || "Picpic";
      save();
      openProfile("pet");
    };
  if ($("toggle-pet"))
    $("toggle-pet").onclick = () => {
      if (!inVillage) return;
      profile.petActive = !profile.petActive;
      pet.x = player.x - 55;
      pet.y = player.y + 18;
      save();
      openProfile("pet");
    };
  document.querySelectorAll("[data-fur]").forEach(
    (b) =>
      (b.onclick = () => {
        if (!inVillage) return;
        profile.fur = Number(b.dataset.fur);
        save();
        openProfile(tab);
      }),
  );
}
function openLoadoutPreview(weapon, secondary) {
  if (scene.kind !== "village" || !WEAPONS[weapon] || !SECONDARIES[secondary])
    return;
  if (WEAPONS[weapon].twoHanded) secondary = "bandage";
  loadoutPreview = { weapon, secondary };
  openModal(
    "loadout-preview",
    WEAPONS[weapon].name,
    "REVISA TU EQUIPO",
    `<canvas id="appearance-preview" width="280" height="220" aria-label="Vista previa del equipo seleccionado"></canvas><p class="intro">${WEAPONS[weapon].name}</p><p>${WEAPONS[weapon].description}</p><p>${WEAPONS[weapon].twoHanded ? "Ocupa ambas manos." : "Mano secundaria: " + SECONDARIES[secondary].name}</p><div class="button-row"><button id="cancel-loadout" class="secondary">Cancelar</button><button id="confirm-loadout" class="primary">Confirmar equipo</button></div>`,
  );
  $("cancel-loadout").onclick = () => {
    loadoutPreview = null;
    openProfile("equipment");
  };
  $("confirm-loadout").onclick = () => {
    if (!loadoutPreview) return;
    profile.weapon = loadoutPreview.weapon;
    profile.secondary = loadoutPreview.secondary;
    player.action = null;
    stopGuard();
    player.casting = null;
    player.attack = 0;
    loadoutPreview = null;
    save();
    updateHUD();
    openProfile("equipment");
  };
}
function openHelp() {
  openModal(
    "help",
    "Un pequeño manual de aventuras",
    "CONTROLES",
    `<div class="controls"><div><kbd>WASD</kbd> / flechas · Moverte</div><div><kbd>CLIC</kbd> / J · Atacar</div><div><kbd>H</kbd> / clic derecho · Mano secundaria</div><div><kbd>E</kbd> Hablar / interactuar</div><div><kbd>Q</kbd> / 1 · Primera habilidad</div><div><kbd>R</kbd> / 2 · Segunda habilidad</div><div><kbd>F</kbd> / 3 · Habilidad secundaria</div><div><kbd>ESPACIO</kbd> Esquivar</div><div><kbd>I</kbd> Perfil y equipo</div><div><kbd>T</kbd> Talentos</div><div><kbd>M</kbd> Mazmorras</div><div><kbd>ESC</kbd> Menú / cerrar</div><div><kbd>P</kbd> Ocultar interfaz</div></div><hr class="divider"><p class="muted">Apunta con el ratón. Picpic te sigue y ayuda en combate. Las habilidades con objetivo muestran un cursor: confirma con clic o J; cancela con Escape o clic derecho. Las vendas y las habilidades se recargan con el tiempo. Mantén H o clic derecho con el escudo para bloquear de frente. La espada de dos manos ocupa ambas manos. Puedes aprender talentos durante la expedición; vuelve a la aldea para cambiar de arma o trabajo y redistribuir puntos.</p><p class="save-note">Se recomienda teclado y ratón. El juego se pausa al abrir los menús o cambiar de pestaña.</p>`,
  );
}
function openWorldMap() {
  if (mode !== "playing") return;
  openModal(
    "world-map",
    "Mapa del mundo",
    "TRANSFORMICE ADVENTURES",
    `<button type="button" class="world-map-image" id="world-map-image" aria-label="Cerrar mapa"><img src="assets/original/interface/MAP_pinned.jpg" alt="Mapa del mundo de Transformice Adventures"></button><p class="save-note">Haz clic en el mapa para cerrarlo.</p>`,
  );
  $("world-map-image").onclick = closeModal;
}
function openMenu() {
  openModal(
    "menu",
    "Un momento de descanso",
    "AVENTURA LOCAL",
    `<p class="intro">Tu aventura te espera.</p><div class="button-row"><button class="primary" id="resume">Seguir jugando</button><button class="secondary" id="controls">Controles</button></div><div class="button-row"><button class="secondary" id="return-village">${scene.kind === "tutorial" ? "Reiniciar tutorial" : "Regresar a la aldea"}</button><button class="secondary" id="title-return">Pantalla de inicio</button></div><hr class="divider"><fieldset class="audio-options"><legend>Sonido</legend><label>Volumen general <input id="volume-general" type="range" min="0" max="100" value="${audioSettings.master * 100}"></label><label>Música <input id="volume-music" type="range" min="0" max="100" value="${audioSettings.music * 100}"></label><label>Efectos y ambiente <input id="volume-effects" type="range" min="0" max="100" value="${audioSettings.effects * 100}"></label></fieldset><p class="save-note">Preferencias de sonido guardadas por separado · Progreso · Nivel ${profile.level}<br>Los regalos se pierden al abandonar una expedición.</p>`,
  );
  $("resume").onclick = closeModal;
  $("controls").onclick = openHelp;
  $("volume-general").oninput = (e) => {
    audioSettings.master = Number(e.target.value) / 100;
    muted = audioSettings.master === 0;
    saveAudioSettings();
    updateSound();
  };
  $("volume-music").oninput = (e) => {
    audioSettings.music = Number(e.target.value) / 100;
    saveAudioSettings();
    updateSound();
  };
  $("volume-effects").oninput = (e) => {
    audioSettings.effects = Number(e.target.value) / 100;
    saveAudioSettings();
    updateSound();
  };
  $("return-village").onclick = () => {
    closeModal();
    gifts = [];
    step = 1;
    enterScene(scene.kind === "tutorial" ? "tutorial" : "village");
  };
  $("title-return").onclick = () => {
    save();
    closeModal();
    mode = "title";
    resetSceneAudio();
    $("hud").hidden = true;
    $("title-screen").hidden = false;
    $("continue-button").hidden = false;
    setTimeout(() => {
      if (mode === "title")
        playOriginalMusic("musique/tfmadv_intro", {
          volume: 0.7,
          loop: true,
          fadeInMs: 900,
        });
    }, 950);
  };
  const storageRow = document.createElement("div");
  storageRow.className = "button-row";
  storageRow.innerHTML =
    '<button id="export-save" class="secondary">Guardar y exportar</button><button id="import-save" class="secondary">Importar partida</button>';
  $("modal-body").append(storageRow);
  $("export-save").onclick = exportSave;
  $("import-save").onclick = openImport;
}

function exportSave() {
  save();
  const blob = new Blob([encodeSave(profile, captureJourney())], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url;
  link.download = `transformice-aventura-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Copia de la partida exportada.");
}

function openImport() {
  openModal(
    "import",
    "Recuperar una aventura",
    "PARTIDAS LOCALES",
    `<p>Elige una copia de tu partida. Podrás revisarla antes de cargarla.</p><input id="save-file" type="file" accept=".json,application/json" aria-label="Archivo de partida JSON"><div id="import-status" role="status" class="muted" style="margin-top:20px">La partida actual se conserva hasta que pulses Cargar partida.</div>`,
  );
  $("save-file").onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const status = $("import-status");
    try {
      if (file.size > MAX_SAVE_BYTES)
        throw Error("El archivo es demasiado grande para ser una partida.");
      const record = decodeSave(await file.text());
      const place = record.journey
        ? MAPS[record.journey.scene]?.saveName ?? record.journey.scene
        : record.tutorial
          ? MAPS.village.saveName
          : MAPS.tutorial.saveName;
      status.innerHTML = `<p><strong>${escapeHTML(record.name)}</strong> · Nivel ${record.level}<br>${place}${record.journey?.scene === "dungeon" ? ` · Etapa ${record.journey.step}` : ""}<br>${record.coins} monedas</p><p>Al cargarla reemplazarás la partida de este navegador.</p><button id="confirm-import" class="primary">Cargar partida</button>`;
      $("confirm-import").onclick = () => {
        initAudio();
        $("title-screen").hidden = true;
        $("hud").hidden = false;
        resumeRecord(record);
        save();
        announce("Aventura recuperada", profile.name);
      };
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

function moveEntity(e, dx, dy, rad = 17) {
  let nx = clamp(e.x + dx, 55, scene.width - 55),
    ny = clamp(e.y + dy, 90, scene.height - 55);
  for (const o of scene.colliders) {
    const diff = Math.hypot(nx - o.x, ny - o.y),
      min = rad + o.r;
    if (diff < min && diff > 0) {
      nx = o.x + ((nx - o.x) / diff) * min;
      ny = o.y + ((ny - o.y) / diff) * min;
    }
  }
  const traumaDamage = movementTraumaDamage(e, Math.hypot(nx - e.x, ny - e.y), giftEffect("trapMovementDamage"));
  if (traumaDamage > 0) hurtEnemy(e, traumaDamage, "chef-trap");
  e.x = nx;
  e.y = ny;
}
function updateFields(dt) {
  for (const e of effects) {
    if (e.kind === "flask") {
      e.flightElapsed = Math.min(e.flightDuration, e.flightElapsed + dt);
      const fraction = e.flightElapsed / e.flightDuration;
      e.x = e.startX + (e.landingX - e.startX) * fraction;
      e.y = e.startY + (e.landingY - e.startY) * fraction;
      if (fraction < 1) continue;
      burst(e.x, e.y, "#c8a1d7", 23);
      spawnFX(7, e.x, e.y, 0.8, 0.5);
      originalSound("elixir");
      if (e.job === "botanist" && giftEffect("elixirBounce") && !e.bounced) {
        spawnLivingLeaf(e);
        effects.push({
          ...e,
          kind: "pool",
          x: e.x,
          y: e.y,
          age: 0,
          life: e.poolLife,
          maxLife: e.poolLife,
          tick: 0,
          hitIDs: [],
        });
        const dx = e.landingX - e.startX,
          dy = e.landingY - e.startY,
          length = Math.hypot(dx, dy) || 1,
          direction = length === 1 ? player.angle : Math.atan2(dy, dx);
        e.startX = e.x;
        e.startY = e.y;
        e.landingX = clamp(e.x + Math.cos(direction) * 95, 55, scene.width - 55);
        e.landingY = clamp(e.y + Math.sin(direction) * 95, 90, scene.height - 55);
        e.flightDuration = 0.28;
        e.flightElapsed = 0;
        e.bounced = true;
        e.life = e.poolLife + e.flightDuration;
        e.maxLife = e.life;
        e.age = 0;
        continue;
      }
      spawnLivingLeaf(e);
      e.kind = "pool";
      e.life = e.poolLife;
      e.maxLife = e.poolLife;
      e.age = 0;
      e.tick = 0;
    }
    e.life -= dt;
    if (e.life <= 0) continue;
    e.age = (e.age || 0) + dt;
    e.attackTime = Math.max(0, (e.attackTime || 0) - dt);
    if (e.kind === "testimony") {
      continue;
    }
    if (e.kind === "decoy") continue;
    if (e.kind === "ingredient") continue;
    if (e.kind === "bee") {
      e.tick = Math.max(0, (e.tick || 0) - dt);
      const plant = effects.find(
        (other) =>
          other.kind === "plant" &&
          other.uid === e.guardPlantUid &&
          other.life > 0 &&
          other.hp > 0,
      );
      if (!plant) {
        e.life = 0;
        continue;
      }
      const target = enemies
        .filter((enemy) => enemy.hp > 0 && distance(enemy, plant) < 260)
        .sort((a, b) => distance(a, plant) - distance(b, plant))[0];
      if (target) {
        const d = distance(e, target) || 1;
        if (d > 22)
          moveEntity(
            e,
            ((target.x - e.x) / d) * 190 * dt,
            ((target.y - e.y) / d) * 190 * dt,
            8,
          );
        else if (e.tick <= 0) {
          hurtEnemy(target, e.damage, "bee");
          e.tick = 1.1;
        }
      } else {
        const angle = e.age * 3;
        e.x = plant.x + Math.cos(angle) * 24;
        e.y = plant.y - 20 + Math.sin(angle) * 12;
      }
      continue;
    }
    if (e.kind === "livingLeaf") {
      if (e.life <= 0 || e.hp <= 0) {
        e.life = 0;
        continue;
      }
      e.tick = Math.max(0, (e.tick || 0) - dt);
      const target = enemies
        .filter((enemy) => enemy.hp > 0 && distance(enemy, e) < e.r)
        .sort((a, b) => distance(a, e) - distance(b, e))[0];
      e.moving = !!target && distance(target, e) > 26;
      if (target) {
        const d = distance(e, target) || 1;
        faceFromVector(e, target.x - e.x, target.y - e.y);
        if (e.moving)
          moveEntity(
            e,
            ((target.x - e.x) / d) * 130 * dt,
            ((target.y - e.y) / d) * 130 * dt,
            12,
          );
        else if (e.tick <= 0) {
          e.attackTime = 0.4;
          hurtEnemy(target, e.damage, "living-leaf");
          e.tick = 1.1;
        }
      }
      continue;
    }
    if (e.kind === "pool" && e.job === "chef" && e.cooking) {
      if (giftEffect("cauldronFollow")) e.carried = true;
      if (e.carried) {
        const follow = Math.min(1, dt * 7);
        e.x += (player.x - e.x) * follow;
        e.y += (player.y - e.y) * follow;
      }
      const phase = e.cooking.phase;
      e.petCollect = Math.max(0, (e.petCollect || 0) - dt);
      if (
        phase === "collecting" &&
        bonus("petIngredients") &&
        profile.petActive &&
        !pet.injured &&
        distance(pet, e) < 160 &&
        e.petCollect <= 0
      ) {
        const ingredient = effects
          .filter(
            (i) =>
              i.kind === "ingredient" && i.life > 0 && distance(i, pet) < 120,
          )
          .sort((a, b) => distance(a, pet) - distance(b, pet))[0];
        if (ingredient) {
          if (collectCauldronIngredient(e, ingredient)) {
            e.petCollect = 2;
            floating("Ingrediente", pet.x, pet.y - 35, "#e9dfb4");
            save();
          }
        }
      }
      tickCauldron(e.cooking, dt);
      if (phase === "cooking" && e.cooking.phase === "dirty") {
        originalSound("ting");
        toast(
          "La receta terminó. Acércate y haz clic o pulsa E para limpiar el caldero.",
        );
      }
      if (e.cooking.phase !== "cooking") {
        e.healing = false;
        e.damage = 0;
        continue;
      }
      const stats = recipeEffects(e.cooking, bonus, giftEffect);
      e.damage = stats.damage;
      e.healing = stats.healing > 0;
      e.recipeHealing = stats.healing;
      e.recipeArmor = stats.armor;
    }
    if (
      !["pool", "plant", "trap", "interview", "burn", "livingLeaf", "anvil"].includes(
        e.kind,
      )
    )
      continue;
    if (e.carried) {
      e.x = player.x;
      e.y = player.y;
    }
    if (
      e.kind === "pool" &&
      e.job === "chef" &&
      !e.cooking &&
      bonus("petIngredients") &&
      !e.enriched &&
      profile.petActive &&
      !pet.injured &&
      distance(pet, e) < 130
    ) {
      e.enriched = true;
      e.life += 2;
      e.maxLife += 2;
      e.damage += 2;
    }
    if (e.kind === "anvil") {
      const fallDuration = 0.55;
      const progress = Math.min(1, e.age / fallDuration);
      e.y = e.startY + (e.landingY - e.startY) * progress * progress;
      if (progress >= 1 && !e.impacted) {
        e.impacted = true;
        for (const target of enemies)
          if (target.hp > 0 && distance(target, e) < e.r)
            hurtEnemy(target, e.damage, "anvil");
        e.life = Math.min(e.life, 0.18);
      }
      continue;
    }
    if (e.kind === "plant") {
      if (e.hp <= 0) {
        e.life = 0;
        continue;
      }
      if (profile.petActive && !pet.injured && distance(pet, e) < 140)
        e.age += dt * bonus("petGrowth");
      if (e.age < plantMatureAt(e)) continue;
      const nearAnotherPlant =
        giftEffect("plantPermaculture") > 0 &&
        effects.some(
          (other) =>
            other !== e &&
            other.kind === "plant" &&
            other.life > 0 &&
            other.hp > 0 &&
            distance(other, e) < 180,
        );
      if (
        (distance(player, e) < 180 || nearAnotherPlant) &&
        (e.growth || 0) < 2
      ) {
        const nearPet = profile.petActive && !pet.injured && distance(pet, e) < 140;
        e.growthTime = (e.growthTime || 0) + dt * plantGrowthSpeed(e, bonus, nearPet);
        if (e.growthTime >= 3) {
          e.growthTime = 0;
          e.growth = (e.growth || 0) + 1;
          e.hp += 12;
          spawnFX(86, e.x, e.y, 0.8, 0.5);
          if (
            e.subtype === "lily" &&
            giftEffect("plantCuttings") &&
            Math.random() < 0.2 &&
            effects.filter((plant) => plant.kind === "plant" && plant.life > 0)
              .length < 8
          ) {
            effects.push({
              kind: "plant",
              uid: ++fieldSerial,
              subtype: "lily",
              hp: 40 + bonus("plantHealth"),
              age: plantMatureAt(e),
              growth: 0,
              growthTime: 0,
              x: clamp(e.x + (Math.random() * 80 - 40), 70, scene.width - 70),
              y: clamp(e.y + (Math.random() * 70 - 35), 100, scene.height - 70),
              r: e.r,
              life: 12,
              maxLife: 12,
              tick: 0,
              damage: e.damage,
              color: e.color,
            });
            spawnFX(86, e.x, e.y, 0.8, 0.5);
          }
        }
      }
    }
    if (e.kind === "interview" && giftEffect("interviewPull"))
      for (const t of enemies)
        if (t.hp > 0 && distance(t, e) < e.r * 1.4) {
          const d = distance(t, e) || 1;
          if (d > 18)
            moveEntity(
              t,
              ((e.x - t.x) / d) * giftEffect("interviewPull") * dt,
              ((e.y - t.y) / d) * giftEffect("interviewPull") * dt,
              18,
            );
        }
    if (e.kind === "trap") {
      if (e.triggered) {
        if (
          bonus("petRearm") &&
          !e.rearmCount &&
          profile.petActive &&
          !pet.injured &&
          distance(pet, e) < 120 &&
          e.age >= TRAP_RULES.rearmDelay
        ) {
          e.triggered = false;
          e.rearmCount = 1;
          e.age = 0;
          floating("Trampa rearmada", e.x, e.y - 35, "#e2d699");
        }
        continue;
      }
      if (!isTrapArmed(e, bonus)) continue;
      if (giftEffect("trapPull"))
        for (const t of enemies)
          if (t.hp > 0 && distance(t, e) < TRAP_RULES.pullRadius) {
            const d = distance(t, e) || 1;
            if (d > 15)
              moveEntity(
                t,
                ((e.x - t.x) / d) * giftEffect("trapPull") * dt,
                ((e.y - t.y) / d) * giftEffect("trapPull") * dt,
                18,
              );
          }
      const manualTrigger = giftEffect("trapManual") > 0 && e.manualTrigger;
      if (giftEffect("trapManual") > 0 && !manualTrigger) continue;
      let targets = enemies
        .filter((t) => t.hp > 0 && distance(t, e) < e.r)
        .sort((a, b) => distance(a, e) - distance(b, e));
      if (!targets.length && !manualTrigger) continue;
      if (giftEffect("trapSingleTarget")) targets = targets.slice(0, 1);
      for (const t of targets) {
        const damage = trapDamage(e, t, bonus, giftEffect);
        t.lastTrapId = e.uid;
        t.lastTrapAge = 0;
        hurtEnemy(t, damage, "chef-trap");
        t.stun = Math.max(t.stun, TRAP_RULES.stun + bonus("trapStun"));
        if (bonus("trapSlow")) {
          t.slow = TRAP_RULES.slowDuration;
          t.slowFactor = bonus("trapSlow");
        }
        if (giftEffect("trapMovementDamage")) {
          t.traumaTime = TRAP_RULES.traumaDuration;
          t.traumaDistance = 0;
        }
      }
      if (giftEffect("trapAnvil"))
        for (const target of targets)
          if (target.hp > 0)
            effects.push({
              kind: "anvil",
              fxId: 35,
              x: target.x,
              y: target.y - 180,
              startY: target.y - 180,
              landingY: target.y,
              r: 46,
              life: 0.85,
              maxLife: 0.85,
              age: 0,
              tick: 0,
              damage: e.damage,
              color: "#aab0b3",
              impacted: false,
            });
      if (giftEffect("trapBurn"))
        effects.push({
          kind: "burn",
          x: e.x,
          y: e.y,
          r: 110,
          life: 4,
          maxLife: 4,
          tick: 0,
          damage: giftEffect("trapBurn"),
          color: "#edb278",
          age: 0,
        });
      e.triggered = true;
      e.manualTrigger = false;
      e.age = 0;
      spawnFX(20, e.x, e.y, 0.5, 0.6);
      originalSound("piege1", 300, 0.15);
      continue;
    }
    e.tick = (e.tick || 0) - dt;
    if (e.tick > 0) continue;
    e.tick = 0.65;
    if (e.kind === "plant" && e.subtype === "lily") {
      const amount =
        (4 + bonus("plantHealing")) *
        (1 + 0.35 * (e.growth || 0)) *
        (giftEffect("plantPinkLily") ? 1.5 : 1);
      const healingTarget = lilyHealingTarget(e, {
        player, pet, petActive: profile.petActive, playerMaxHP: maxHP(), petMaxHP: petMaxHP(), distance,
      });
      if (healingTarget === "pet") {
        const healed = healPet(amount, false, Infinity);
        if (giftEffect("plantPinkLily")) grantBarrier(healed?.excess || 0, pet);
        if (bonus("plantSharedHeal")) {
          const shared = healPlayer(amount * bonus("plantSharedHeal"));
          if (giftEffect("plantPinkLily")) grantBarrier(shared.excess);
        }
      } else if (healingTarget === "player") {
        const healed = healPlayer(amount);
        if (giftEffect("plantPinkLily")) grantBarrier(healed.excess);
      }
      if (giftEffect("plantPollinating"))
        for (const other of effects) {
          if (
            other === e ||
            other.kind !== "plant" ||
            other.life <= 0 ||
            other.hp <= 0 ||
            distance(other, e) >= e.r ||
            other.hp >= plantHealthLimit(other, bonus("plantHealth"), !!giftEffect("plantFallow"))
          )
            continue;
          other.hp = Math.min(
            plantHealthLimit(other, bonus("plantHealth"), !!giftEffect("plantFallow")),
            other.hp + 3,
          );
          spawnFX(48, other.x, other.y - 20, 0.4, 0.32);
        }
      continue;
    }
    let targets = enemies.filter(
      (t) =>
        t.hp > 0 &&
        distance(t, e) < e.r,
    );
    if (
      e.kind === "plant" &&
      e.subtype === "thorn" &&
      !giftEffect("plantMulti")
    )
      targets = targets
        .sort((a, b) => distance(a, e) - distance(b, e))
        .slice(0, 1);
    else if (e.kind === "plant" && e.subtype === "thorn" && giftEffect("plantMulti"))
      targets = targets
        .sort((a, b) => distance(a, e) - distance(b, e))
        .slice(0, giftEffect("plantMulti"));
    for (const t of targets) {
      let damage =
        e.damage *
        (1 + 0.1 * countGift("power")) *
        (e.kind === "plant" ? 1 + 0.35 * (e.growth || 0) : 1);
      if (e.kind === "plant") {
        e.attackTime = 0.3;
        if (e.subtype === "thorn" && giftEffect("plantFerox"))
          damage *= 1.5;
        if (e.subtype === "bramble") {
          damage = 0;
        }
      }
      if (e.kind === "plant" && e.subtype === "thorn") {
        if (giftEffect("plantVineVenom")) {
          applyPlantPoison(t);
          t.slow = Math.max(t.slow || 0, 2);
          t.slowFactor = Math.max(t.slowFactor || 0, 0.25);
        }
      }
      if (e.kind === "plant" && e.subtype === "bramble") {
        if (giftEffect("plantSwamp")) {
          applyPlantPoison(t);
        }
      }
      if (e.kind === "pool" && e.job === "botanist") {
        if (giftEffect("elixirHealingOnly")) damage = 0;
        else damage *= 1 + giftEffect("elixirDamageOnly");
        if (damage > 0) {
          const duration = 1 + giftEffect("elixirDuration");
          if (bonus("elixirSlow")) {
            t.slow = 2 * duration;
            t.slowFactor = bonus("elixirSlow");
          }
          if (bonus("elixirWeaken")) {
            t.weaken = 2 * duration;
            t.weakenFactor = bonus("elixirWeaken");
          }
          const index = enemies.indexOf(t);
          if (giftEffect("elixirRoot") && !(e.hitIDs || []).includes(index)) {
            (e.hitIDs ||= []).push(index);
            t.root = giftEffect("elixirRoot") * duration;
            damage += 12;
          }
        }
      }
      if (damage > 0)
        hurtEnemy(
          t,
          damage,
          e.kind === "pool" && e.job === "chef"
            ? "chef-cauldron"
            : e.kind === "interview"
              ? "journalist-report"
              : "field",
          false,
        );
    }
    if (
      e.kind === "plant" &&
      e.subtype === "thorn" &&
      giftEffect("plantFerox") &&
      distance(player, e) < e.r &&
      Math.random() < 0.2
    )
      hurtPlayer(4, e, e, true);
    if (e.healing) {
      const multiplier =
        e.job === "chef"
          ? 1 + giftEffect("cauldronHealing")
          : e.job === "botanist"
            ? 1 + giftEffect("elixirHealingOnly")
            : 1;
      const healing = e.cooking ? e.recipeHealing :
        (2 +
          (e.job === "chef" ? bonus("chefHealing") : bonus("healing") * 0.25)) *
        multiplier;
      if (distance(player, e) < e.r) healPlayer(healing);
      if (profile.petActive && distance(pet, e) < e.r)
        healPet(
          healing +
            (pet.injured && e.kind === "interview"
              ? bonus("interviewRevive")
              : 0),
          e.kind === "pool" && e.job === "botanist" ||
            e.kind === "interview" && bonus("interviewRevive") > 0,
          Infinity,
        );
    }
  }
}

function updateBandageTreatments(dt) {
  const amounts = bandageAmounts(bonus, giftEffect);
  const targets = [
    { actor: player, ticks: tickBandageTreatment(player.states, dt), amount: amounts.selfPeriodic, pet: false },
    { actor: pet, ticks: tickBandageTreatment(pet, dt), amount: amounts.periodic, pet: true },
  ];
  for (const target of targets) {
    if (target.pet && (!profile.petActive || pet.injured)) continue;
    for (let tick = 0; tick < target.ticks; tick++) {
      const result = target.pet ? healPet(target.amount, false, Infinity) : healPlayer(target.amount);
      if (result) grantBarrier(result.excess * giftEffect("bandageOverhealBarrier"), target.actor);
      if (giftEffect("bandageHotDamage")) {
        const enemy = enemies.filter(enemy => enemy.hp > 0 && distance(enemy, target.actor) < 320)
          .sort((a, b) => distance(a, target.actor) - distance(b, target.actor))[0];
        if (enemy) hurtEnemy(enemy, giftEffect("bandageHotDamage"), "bandage-hot", false);
      }
    }
  }
}
function update(dt) {
  xpNoticeTimer = Math.max(0, xpNoticeTimer - dt);
  if (xpNoticeTimer === 0) $("xp-notice").hidden = true;
  time += dt;
  updateSceneAudio();
  updateXPNoticeAnimation(dt);
  toastTimer -= dt;
  if (toastTimer <= 0) $("toast").classList.remove("visible");
  announcementTimer -= dt;
  if (announcementTimer <= 0) $("announcements").textContent = "";
  if (chestOpeningStartedAt !== null) {
    if (time - chestOpeningStartedAt >= 70 / 60) {
      chestOpeningStartedAt = null;
      modalKind = "";
      $("hud").inert = false;
      openGifts();
    }
    return;
  }
  if (
    mode !== "playing" ||
    modalKind ||
    !$("dialogue").hidden ||
    document.hidden
  )
    return;
  const balestraWait = SWORD_RULES.balestraWait;
  if (
    giftEffect("swordBalestra") > 0 &&
    !player.action &&
    player.attack <= 0
  ) {
    player.states.swordIdleTime = Math.min(
      balestraWait,
      (player.states.swordIdleTime || 0) + dt,
    );
    if (
      player.states.swordIdleTime >= balestraWait &&
      !player.states.swordBalestraReady
    ) {
      player.states.swordBalestraReady = 1;
      floating("Balestra preparada", player.x, player.y - 65, "#e5d39a");
    }
  } else if (player.action || player.attack > 0) {
    player.states.swordIdleTime = 0;
  }
  let dx =
      (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
      (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0),
    dy =
      (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) -
      (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0);
  if (player.states.downed > 0) {
    dx = 0;
    dy = 0;
    player.states.downed = Math.max(0, player.states.downed - dt);
    if (pet.injured || !profile.petActive) {
      player.states.downed = 0;
      showDefeat();
      return;
    }
    if (player.states.downed === 0) {
      player.hp = Math.max(1, Math.round(maxHP() * 0.3));
      player.invuln = 2;
      floating("¡De nuevo en pie!", player.x, player.y - 65, "#dfedaa");
      save();
    }
  }
  if (player.states.clubStun > 0) {
    dx = 0;
    dy = 0;
    stopOriginalSound("arc1");
    player.action = null;
    player.attack = 0;
    player.casting = null;
    stopGuard();
    pointer.down = false;
    keys.delete("KeyJ");
  }
  player.moving = !!(dx || dy);
  if (player.casting) {
    if (player.moving) {
      player.casting = null;
      toast("Acción interrumpida al moverte.");
    } else {
      player.casting.remaining -= dt;
      if (player.casting.remaining <= 0) {
        const kind = player.casting.kind;
        player.casting = null;
        if (kind === "bandage") completeHeal();
        else {
          healPet(Math.round(petMaxHP() * 0.45), true);
          save();
        }
      }
    }
  }
  player.healFinish = Math.max(0, (player.healFinish || 0) - dt);
  pet.invuln = Math.max(0, (pet.invuln || 0) - dt);
  pet.invisible = Math.max(0, (pet.invisible || 0) - dt);
  pet.bandageGuard = Math.max(0, (pet.bandageGuard || 0) - dt);
  updateCharges(
    player.charges,
    profile,
    dt * (player.invisible > 0 ? 1 + giftEffect("vanishChargeRecovery") : 1),
    gifts,
  );
  for (const key of [
    "guard",
    "swordBoost",
    "bandageGuard",
    "slow",
    "emergencyCooldown",
    "storedHitTime",
    "chainTime",
    "clubStun",
    "clubVulnerability",
  ])
    player.states[key] = Math.max(0, (player.states[key] || 0) - dt);
  tickBarrier(player.states, dt);
  expireSwordChain(player.states);
  if (player.states.storedHitTime === 0) player.states.storedHit = 0;
  player.heal =
    player.charges.bandage.count > 0
      ? 0
      : Math.max(
          0,
          chargeRecovery(profile, "bandage", gifts) -
            player.charges.bandage.timer,
        );
  updateBandageTreatments(dt);
  if (player.moving) {
    const n = Math.hypot(dx, dy);
    dx /= n;
    dy /= n;
    player.angle = Math.atan2(dy, dx);
    faceFromVector(player, dx, dy);
  }
  for (const k of [
    "attack",
    "movementPause",
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
    "dodging",
  ])
    player[k] = Math.max(0, player[k] - dt);
  let speed =
    (185 + bonus("speed")) *
    (1 + 0.12 * countGift("haste")) *
    (player.states.slow > 0 ? 0.65 : 1) *
    (player.invisible > 0 ? 1 + giftEffect("vanishMoveSpeed") : 1);
  if (player.action) {
    const action = player.action;
    if (action.weapon === "bow" && player.moving && !action.hit) interruptBow();
  }
  if (player.action) {
    const action = player.action;
    const previousState = action.state;
    if (action.weapon === "bow" && !action.hit) action.angle = aimAngle();
    faceFromVector(player, Math.cos(action.angle), Math.sin(action.angle));
    let progress;
    if (action.weapon === "bow") {
      action.elapsed = Math.min(WEAPONS.bow.windup, action.elapsed + dt);
      action.state = action.elapsed < WEAPONS.bow.windup ? "incantation" : "active";
      if (previousState === "incantation" && action.state === "active") {
        stopOriginalSound("arc1");
        originalSound("arc2", 400, 0.1, "sine", 0.3);
      }
      if (action.released) action.releaseElapsed += dt;
      const fired = !!action.released && action.releaseElapsed >= WEAPONS.bow.releaseDelay;
      progress = {
        impact: fired && !action.hit,
        finished: fired && action.releaseElapsed >= WEAPONS.bow.releaseDelay + 41 / 60,
        state: action.state,
      };
      if (progress.impact) action.hit = true;
    } else progress = advanceAttack(action, dt);
    if (progress.impact) impactAttack(action);
    const ranged = WEAPONS[action.weapon].ranged;
    const animation = ranged
      ? action.weapon === "bow" && !action.hit ? "arc_charge" : "arc_tir"
      : action.animation ?? WEAPONS[action.weapon].animation;
    const elapsed = ranged && action.weapon === "bow" && action.hit
      ? action.releaseElapsed - WEAPONS.bow.releaseDelay
      : ranged && action.state !== "incantation"
      ? Math.max(0, action.elapsed - WEAPONS[action.weapon].windup)
      : action.elapsed;
    const hitPauseStarted = progress.impact && action.hitPauseRemaining > 0;
    if (!Number.isFinite(action.visualElapsed)) {
      action.visualElapsed = elapsed;
    } else if (action.hitPauseRemaining > 0) {
      if (!hitPauseStarted)
        action.hitPauseRemaining = Math.max(0, action.hitPauseRemaining - dt);
    } else {
      action.visualElapsed += dt;
    }
    player.attackVisual = {
      animation,
      elapsed: action.visualElapsed,
      pauseRemaining: action.hitPauseRemaining || 0,
      facing: action.visualFacing ?? (Math.cos(action.angle) < 0 ? -1 : 1),
    };
    if (progress.finished) player.action = null;
  } else if (player.attackVisual) {
    if (player.casting || player.guarding || player.states.clubStun > 0 || player.states.downed > 0) {
      player.attackVisual = null;
    } else {
      if (player.attackVisual.pauseRemaining > 0)
        player.attackVisual.pauseRemaining = Math.max(0, player.attackVisual.pauseRemaining - dt);
      else player.attackVisual.elapsed += dt;
      const frames = originalAnimationFrameCount(2, player.attackVisual.animation);
      if (!frames || player.attackVisual.elapsed >= frames / 60)
        player.attackVisual = null;
    }
  }
  if (player.guarding) {
    aimAngle();
    speed = 0;
    player.moving = false;
  }
  if (player.action && WEAPONS[player.action.weapon].movementLock) {
    speed = 0;
    player.moving = false;
  }
  if (player.movementPause > 0) {
    speed = 0;
    player.moving = false;
  }
  if (player.dodging > 0) {
    speed = 650;
    if (!player.moving) {
      dx = Math.cos(player.angle);
      dy = Math.sin(player.angle);
    }
  }
  moveEntity(player, dx * speed * dt, dy * speed * dt);
  tickMovementAnimation(
    player,
    dt,
    player.states.slow > 0 ? 0.65 : 1,
    player.moving && !player.action && !player.attackVisual &&
      !player.guarding && !player.casting,
  );
  if (pointer.down || keys.has("KeyJ")) attack();
  if (player.moving) {
    walkTime += dt;
    if (walkTime > 0.1) {
      walkTime = 0;
      particles.push({
        x: player.x,
        y: player.y,
        vx: -dx * 12,
        vy: -dy * 12,
        life: 0.35,
        maxLife: 0.35,
        color: "#cbd28770",
        size: 3,
      });
    }
  }
  petSystem.update(dt);
  tickMovementAnimation(
    pet,
    dt,
    1,
    profile.petActive && !pet.injured && pet.moving,
  );
  if (scene.kind === "dungeon" && !encounterStarted) {
    const nextArea = scene.routeAreas?.[room];
    if (
      nextArea &&
      player.x >= nextArea.spawn.x - 55 &&
      player.y >= nextArea.spawn.y - 250 &&
      player.y <= nextArea.spawn.y + 250
    ) {
      encounterStarted = true;
      spawnRoom();
      updateQuest();
      save();
    }
  }
  const reporter =
    profile.job === "journalist" ||
    resolveJobSkill(profile, 3)?.job === "journalist";
  if (
    reporter &&
    scene.kind !== "village" &&
    enemies.some((e) => e.hp > 0) &&
    player.testimonyTimer <= 0
  ) {
    player.testimonyTimer =
      5 / Math.max(1, 1 + giftEffect("testimonyFrequency"));
    if (
      effects.filter((e) => e.kind === "testimony" && e.life > 0).length < 3
    ) {
      const index = player.testimonyIndex % 3;
      player.testimonyIndex = (index + 1) % 3;
      effects.push({
        kind: "testimony",
        subtype: ["heal", "fire", "lightning"][index],
        x: clamp(player.x + Math.cos(index * 2.1) * 100, 70, scene.width - 70),
        y: clamp(player.y + Math.sin(index * 2.1) * 80, 100, scene.height - 70),
        life: 15,
        maxLife: 15,
        r: 18,
        color: ["#c4d991", "#edb278", "#b7cde8"][index],
      });
    }
  }
  for (const e of enemies) {
    e.moving = false;
    if (e.hp <= 0) {
      if (!Number.isFinite(e.deathStartedAt))
        e.deathStartedAt = time - Math.max(0, e.deathTime || 0);
      e.deathTime = Math.min(enemyDeathDuration(e), enemyDeathElapsed(e));
      continue;
    }
    e.slow = Math.max(0, (e.slow || 0) - dt);
    e.root = Math.max(0, (e.root || 0) - dt);
    e.diamondsRoot = Math.max(0, (e.diamondsRoot || 0) - dt);
    e.traumaTime = Math.max(0, (e.traumaTime || 0) - dt);
    e.lastTrapAge = Math.min(3, (e.lastTrapAge ?? 3) + dt);
    e.weaken = Math.max(0, (e.weaken || 0) - dt);
    const reportDamage = tickReportPoison(e, dt);
    if (reportDamage) hurtEnemy(e, reportDamage, "poison", false);
    const plantDamage = tickPlantPoison(e, dt);
    if (plantDamage) hurtEnemy(e, plantDamage, "poison", false);
    e.reportPoisoned = Math.max(0, (e.reportPoisoned || 0) - dt);
    const weaponPoison = tickWeaponPoison(e, dt, giftEffect("daggerFinalPoison"));
    if (weaponPoison.damage > 0) hurtEnemy(e, weaponPoison.damage, weaponPoison.sourceKind, false);
    const cardPoison = tickCardPoison(e, dt);
    if (cardPoison > 0) hurtEnemy(e, cardPoison, "poison", false);
    const arrowDamage = tickArrowPoison(e, dt);
    if (arrowDamage > 0) hurtEnemy(e, arrowDamage, "poison", false);
    if (e.hp <= 0) continue;
    e.hit = Math.max(0, e.hit - dt);
    e.stun = Math.max(0, e.stun - dt);
    const decoy = nearestEnemyDecoy(e, effects, distance, !!bonus("chefDecoy"));
    if (
      player.invisible > 0 &&
      (!profile.petActive || pet.injured || bonus("vanishPet") || pet.invisible > 0) &&
      !decoy
    ) {
      e.telegraph = 0;
      continue;
    }
    if (e.stun > 0) continue;
    const aim = decoy || (player.invisible > 0 ? pet : player);
    let ex = aim.x - e.x,
      ey = aim.y - e.y,
      d = Math.hypot(ex, ey) || 1;
    faceFromVector(e, ex, ey);
    e.attack -= dt;
    if (e.charge > 0) {
      e.moving = true;
      const duration = Math.min(dt, e.charge),
        factor = duration / e.charge;
      moveEntity(
        e,
        (e.targetX - e.x) * factor,
        (e.targetY - e.y) * factor,
        (ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle).collisionRadius,
      );
      e.charge = Math.max(0, e.charge - duration);
      if (e.charge <= 0) {
        const rules = ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle;
        const radius = e.type === "boss" ? ENCOUNTER_RULES.boss.chargeImpactRadius : rules.chargeImpactRadius;
        effects.push({
          kind: "ring",
          x: e.x,
          y: e.y,
          r: radius,
          life: 0.4,
          maxLife: 0.4,
          color: "#eab15c",
        });
        const attackHit = enemyAreaHit(
          e, e, radius,
          e.type === "boss"
            ? rules.chargeDamage + step * rules.chargeStepDamage
            : rules.attackDamage + step,
        );
        if (attackHit) pauseEnemyAttackRecovery(e);
      }
      continue;
    }
    if (e.telegraph > 0) {
      e.telegraph -= dt;
      if (e.telegraph <= 0) {
        releaseEnemyAttack(e);
      }
      continue;
    }
    const rules = ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle;
    const desired = rules.desiredDistance;
    if (d > desired && !(e.root > 0)) {
      e.moving = true;
      moveEntity(
        e,
        (ex / d) * e.speed * dt * (e.slow > 0 ? 1 - e.slowFactor : 1),
        (ey / d) * e.speed * dt * (e.slow > 0 ? 1 - e.slowFactor : 1),
        rules.collisionRadius,
      );
    }
    if (
      d < rules.attackRange &&
      e.attack <= 0
    ) {
      e.telegraph = rules.telegraph;
      e.attackRecoveryUntil = 0;
      e.targetX = aim.x;
      e.targetY = aim.y;
    }
  }
  for (const e of enemies)
    tickMovementAnimation(
      e,
      dt,
      e.slow > 0 ? 1 - (e.slowFactor || 0) : 1,
      e.moving && e.hp > 0 && e.hit <= 0 && e.stun <= 0 && e.telegraph <= 0,
    );
  updateFields(dt);
  effects = effects.filter((e) => e.life > 0);
  for (const p of projectiles) {
    if (p.returnToPlayer) {
      p.age = (p.age || 0) + dt;
      if (p.age >= (p.returnAfter || 0.55)) p.returning = true;
      if (p.returning) {
        const dx = player.x - p.x;
        const dy = player.y - 15 - p.y;
        const remaining = Math.hypot(dx, dy) || 1;
        if (remaining < 22) {
          p.life = 0;
          continue;
        }
        p.vx = (dx / remaining) * 480;
        p.vy = (dy / remaining) * 480;
      }
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.enemy) {
      const decoy = effects.find(
        (effect) =>
          effect.kind === "decoy" &&
          effect.hp > 0 &&
          effect.life > 0 &&
          distance(p, effect) < 21,
      );
      if (decoy) {
        hurtSummon(decoy, p.damage, enemies[p.sourceIndex], projectileAttackOrigin(p, player));
        pauseEnemyAttackRecovery(enemies[p.sourceIndex]);
        p.life = 0;
      }
      if (p.life > 0 && distance(p, { x: player.x, y: player.y - 12 }) < 23) {
        hurtPlayer(
          p.damage,
          Number.isInteger(p.sourceIndex) ? enemies[p.sourceIndex] : null,
          projectileAttackOrigin(p, player),
        );
        pauseEnemyAttackRecovery(enemies[p.sourceIndex]);
        p.life = 0;
      }
      if (
        p.life > 0 &&
        profile.petActive &&
        !pet.injured &&
        distance(p, pet) < 18
      ) {
        hurtPet(
          p.damage,
          Number.isInteger(p.sourceIndex) ? enemies[p.sourceIndex] : null,
          projectileAttackOrigin(p, player),
        );
        pauseEnemyAttackRecovery(enemies[p.sourceIndex]);
        p.life = 0;
      }
      if (p.life > 0) {
        const deployable = effects.find(
          (e) =>
            e.life > 0 &&
            (e.kind === "plant" ||
              e.kind === "livingLeaf" ||
              (e.kind === "pool" && e.job === "chef" && bonus("chefDecoy"))) &&
            distance(e, p) < 25,
        );
        if (deployable) {
          hurtSummon(deployable, p.damage, enemies[p.sourceIndex], projectileAttackOrigin(p, player));
          p.life = 0;
        }
      }
    } else {
      for (const [enemyIndex, e] of enemies.entries()) {
        if (
          e.hp > 0 &&
          (!p.returnToPlayer || p.hitIDs.length < (p.maxHits || 1)) &&
          (p.targetUid == null || p.targetUid < 0 || e.uid === p.targetUid) &&
          !(p.hitIDs || []).includes(enemyIndex) &&
          distance(p, { x: e.x, y: e.y - 10 }) < (e.type === "boss" ? 50 : 25)
        ) {
          if (p.kind === "card") {
            const spadeTargetIndex = (p.hitIDs || []).length;
            if (p.cardSuit === "spade" && giftEffect("cardsPrestige")) {
              if (spadeTargetIndex === 0) {
                e.slow = Math.max(e.slow || 0, 2);
                e.slowFactor = Math.max(e.slowFactor || 0, 0.35);
              } else if (spadeTargetIndex === 1) {
                e.stun = Math.max(e.stun || 0, 1.2);
              }
            }
            if (p.cardKind === "stun") {
              const first = !(p.hitIDs || []).length;
              if (giftEffect("cardsDiamondStun"))
                e.stun = Math.max(
                  e.stun,
                  2 + giftEffect("cardsDiamondStun") + bonus("cardFreeze"),
                );
              else {
                e.root = Math.max(e.root || 0, 2);
                if (first || bonus("cardFreeze"))
                  e.stun = Math.max(
                    e.stun,
                    first ? 1 + bonus("cardFreeze") : bonus("cardFreeze"),
                  );
              }
              e.diamondsRoot = 3;
            }
            let cardHitDamage = p.damage;
            if (
              p.cardSuit === "club" &&
              giftEffect("cardsClubConditionalDamage")
            ) {
              if (e.stun > 0)
                cardHitDamage *= 1 + Math.min(1, giftEffect("cardsClubConditionalDamage") * 2);
              else if (e.slow > 0)
                cardHitDamage *= 1 + Math.min(0.5, giftEffect("cardsClubConditionalDamage"));
            }
            if (
              p.cardSuit === "club" &&
              giftEffect("cardsClubPoison") > 0
            ) {
              addCardPoison(e, cardHitDamage * (1 + giftEffect("cardsClubPoison")));
            } else hurtEnemy(e, cardHitDamage);
            (p.hitIDs ||= []).push(enemyIndex);
            if (
              p.cardSuit === "spade" &&
              giftEffect("cardsPrestige") &&
              spadeTargetIndex === 2
            ) {
              burst(e.x, e.y - 12, "#dce7ac", 18);
              effects.push({
                kind: "ring",
                x: e.x,
                y: e.y,
                r: 90,
                life: 0.35,
                maxLife: 0.35,
                color: "#dce7ac",
              });
              for (const nearby of enemies)
                if (
                  nearby !== e &&
                  nearby.hp > 0 &&
                  distance(e, nearby) < 90
                )
                  hurtEnemy(nearby, 24, "trickster-explosion");
            }
            if (p.hitIDs.length >= p.maxHits) {
              if (p.returnToPlayer && !p.returning) {
                p.returning = true;
                p.life = Math.max(p.life, 0.6);
              } else p.life = 0;
              break;
            }
            continue;
          }
          const travel = Math.hypot(
            p.x - (p.originX ?? player.x),
            p.y - (p.originY ?? player.y),
          );
          let damage =
            p.damage *
            (1 +
              bonus("bowDistanceDamage") * Math.min(1, travel / 500) +
              bonus("bowFocusedDamage"));
          if (
            !enemies.some(
              (other) =>
                other !== e && other.hp > 0 && distance(other, e) < 160,
            )
          )
            damage *= 1 + bonus("bowIsolatedDamage");
          if (giftEffect("bowFlamingTargets") && p.hitIDs?.length)
            damage *= Math.pow(0.75, p.hitIDs.length);
          if (travel < 160 && bonus("bowKnockback")) {
            const len = Math.hypot(p.vx, p.vy) || 1;
            moveEntity(
              e,
              (p.vx / len) * bonus("bowKnockback"),
              (p.vy / len) * bonus("bowKnockback"),
              18,
            );
          }
          if (tryReturnArrow(p, profile.petActive && !pet.injured, bonus("petArrowReturn"))) {
            player.charges.bow.count = Math.min(
              chargeCapacity(profile, "bow", gifts),
              player.charges.bow.count + 1,
            );
            floating("Flecha recuperada", pet.x, pet.y - 38, "#dce6ad");
          }
          if (giftEffect("bowStun"))
            e.stun = Math.max(e.stun, giftEffect("bowStun"));
          if (p.surprise) {
            e.stun = Math.max(e.stun, bonus("vanishStun"));
            if (bonus("vanishPet") && profile.petActive && !pet.injured) {
              pet.x = e.x - 45;
              pet.y = e.y + 15;
              hurtEnemy(e, 6 + bonus("petDamage"), "pet");
            }
            p.surprise = false;
          }
          if (giftEffect("bowDamageOverTime")) {
            addArrowPoison(e, damage * (1 + giftEffect("bowDamageOverTime")));
          } else hurtEnemy(e, damage);
          (p.hitIDs ||= []).push(enemyIndex);
          if (
            p.ricochetsRemaining > 0 &&
            p.hitIDs.length < (p.maxHits || 1)
          ) {
            const nextTarget = enemies
              .map((target, index) => ({ target, index }))
              .filter(
                ({ target, index }) =>
                  target.hp > 0 &&
                  index !== enemyIndex &&
                  !p.hitIDs.includes(index) &&
                  distance(e, target) <= 220,
              )
              .sort((a, b) => distance(e, a.target) - distance(e, b.target))[0]
              ?.target;
            if (nextTarget) {
              const dx = nextTarget.x - p.x;
              const dy = nextTarget.y - 10 - p.y;
              const len = Math.hypot(dx, dy) || 1;
              p.vx = (dx / len) * 660;
              p.vy = (dy / len) * 660;
              p.ricochetsRemaining -= 1;
              p.life = Math.max(p.life, 0.45);
              break;
            }
          }
          if (p.hitIDs.length >= (p.maxHits || 1)) {
            p.life = 0;
            break;
          }
        }
      }
    }
  }
  projectiles = projectiles.filter((p) => p.life > 0);
  for (const p of particles) {
    p.life -= dt;
    p.x += (p.vx || 0) * dt;
    p.y += (p.vy || 0) * dt;
  }
  particles = particles.filter((p) => p.life > 0);
  if (
    scene.kind === "dungeon" &&
    enemies.length &&
    enemies.every((e) => e.hp <= 0)
  ) {
    roomClearTimer += dt;
    if (roomClearTimer > 1.1) {
      roomClearTimer = -999;
      if (!encounterAwarded) {
        encounterAwarded = true;
        addXP(
          15 +
            (encounterXP
              ? enemies.reduce(
                  (sum, e) => sum + (ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle).xp,
                  0,
                )
              : 0),
        );
        projectiles = projectiles.filter((p) => !p.enemy);
        announce("¡Encuentro superado!", "ABRE EL COFRE CON E PARA CONTINUAR");
      }
      if (!scene.interactables.some((o) => o.id === "chest"))
        scene.interactables.push({
          id: "chest",
          x: clamp(player.x + 72, 90, scene.width - 90),
          y: clamp(player.y, 120, scene.height - 100),
          text: "Abrir el cofre de Elisah",
        });
      updateQuest();
      save();
    }
  }
  nearby =
    scene.interactables
      .filter((o) => distance(player, o) < 115)
      .sort((a, b) => distance(player, a) - distance(player, b))[0] || null;
  if (
    profile.petActive &&
    pet.injured &&
    scene.kind === "dungeon" &&
    distance(player, pet) < 100 &&
    (!nearby || distance(player, pet) < distance(player, nearby))
  )
    nearby = {
      id: "pet-revive",
      x: pet.x,
      y: pet.y,
      text: `Ayudar a ${profile.petName} · 3 s sin moverte`,
    };
  if (giftEffect("trapManual") > 0) {
    const trap = effects
      .filter(
        (e) =>
          e.kind === "trap" &&
          e.life > 0 &&
          !e.triggered &&
          isTrapArmed(e, bonus) &&
          distance(player, e) < 115,
      )
      .sort((a, b) => distance(player, a) - distance(player, b))[0];
    if (trap && (!nearby || distance(player, trap) < distance(player, nearby)))
      nearby = {
        id: "manual-trap",
        uid: trap.uid,
        x: trap.x,
        y: trap.y,
        text: "Activar trampa manualmente",
      };
  }
  if (!nearby) {
    const pool = effects.find(
      (e) =>
        e.kind === "pool" &&
        e.job === "chef" &&
        e.life > 0 &&
        distance(e, player) < 100,
    );
    if (pool)
      nearby = {
        id: "cauldron",
        x: pool.x,
        y: pool.y,
        text:
          pool.cooking?.phase === "dirty"
            ? "Limpiar el caldero"
            : pool.cooking?.phase === "collecting"
              ? "Añadir ingrediente · clic / E"
              : pool.carried
                ? "Dejar el caldero"
                : "Cargar el caldero",
      };
  }
  if (
    scene.kind === "tutorial" &&
    tutorialPhase === 0 &&
    distance(player, pet) < 130
  ) {
    $("interaction").hidden = false;
    $("interaction").querySelector("kbd").textContent = "H";
    $("interaction").querySelector("span").textContent = "Curar a Picpic";
  } else {
    $("interaction").hidden = !nearby;
    if (nearby) {
      $("interaction").querySelector("kbd").textContent = "E";
      $("interaction").querySelector("span").textContent = nearby.text;
    }
  }
  if (player.vanishOrigin && player.invisible <= 0) {
    const origin = player.vanishOrigin;
    player.vanishOrigin = null;
    if (giftEffect("vanishLeaf")) spawnLeafAlly(origin.x, origin.y, 4);
    if (giftEffect("vanishEndExplosion")) {
      for (const t of enemies)
        if (t.hp > 0 && distance(t, origin) < 150)
          hurtEnemy(t, giftEffect("vanishEndExplosion"));
      spawnFX(93, origin.x, origin.y, 1, 0.65);
    }
    save();
  }
  const cameraDecay = Math.min(1, dt * 12);
  camera.effectX -= camera.effectX * cameraDecay;
  camera.effectY -= camera.effectY * cameraDecay;
  camera.x += (player.x + camera.effectX - camera.x) * Math.min(1, dt * 6);
  camera.y += (player.y + camera.effectY - camera.y) * Math.min(1, dt * 6);
  autosaveTimer += dt;
  if (autosaveTimer > 5) {
    autosaveTimer = 0;
    save();
  }
  skillTick += dt;
  if (skillTick > 0.08) {
    skillTick = 0;
    updateHUD();
  }
}
function resize() {
  w = innerWidth;
  h = innerHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  zoom = clamp(Math.min(w / 1200, h / 720), 0.65, 1.5);
}
function constrainCamera() {
  const halfW = w / (zoom * 2),
    halfH = h / (zoom * 2);
  camera.x =
    scene.width <= halfW * 2
      ? scene.width / 2
      : clamp(camera.x, halfW, scene.width - halfW);
  camera.y =
    scene.height <= halfH * 2
      ? scene.height / 2
      : clamp(camera.y, halfH, scene.height - halfH);
}
function screenToWorld(x, y) {
  return { x: (x - w / 2) / zoom + camera.x, y: (y - h / 2) / zoom + camera.y };
}
function isVisibleInWorld(entity) {
  return Math.abs(entity.x - camera.x) * zoom <= w / 2 &&
    Math.abs(entity.y - camera.y) * zoom <= h / 2;
}
function currentSkillAim() {
  return pointer.aimed ? screenToWorld(pointer.x, pointer.y) : {
    x: player.x + Math.cos(player.angle) * 110,
    y: player.y + Math.sin(player.angle) * 110,
  };
}
function drawSkillTarget() {
  const selection = targetingSystem?.pending;
  if (!selection || mode !== "playing" || modalKind) return;
  if (player.dead || player.states.downed > 0 || player.states.clubStun > 0) { targetingSystem.cancel(); return; }
  const point = targetingSystem.point(currentSkillAim());
  ctx.save();
  ctx.strokeStyle = "#e7edb6";
  ctx.fillStyle = "#a8ce7535";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 5]);
  ctx.beginPath();
  if (selection.mode === "circle") {
    ctx.ellipse(point.x, point.y, selection.radius, selection.radius * 0.72, 0, 0, TAU);
    ctx.fill();
  } else {
    ctx.moveTo(player.x, player.y - 10);
    ctx.lineTo(point.x, point.y - 10);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, TAU);
  ctx.stroke();
  ctx.restore();
}
function drawBowAim() {
  const action = player.action;
  if (
    !action ||
    action.weapon !== "bow" ||
    action.hit ||
    !bowAimImage.complete ||
    !bowAimImage.naturalWidth
  ) return;
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(action.angle);
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = clamp(action.elapsed / WEAPONS.bow.windup, 0, 1);
  ctx.drawImage(
    bowAimImage,
    -bowAimImage.naturalWidth * 0.1,
    -bowAimImage.naturalHeight * 0.5,
  );
  ctx.restore();
}
function setHUDIcon(element, fallback, asset) {
  const key = asset || fallback;
  if (element.dataset.icon === key) return;
  element.dataset.icon = key;
  element.replaceChildren();
  if (asset) {
    const img = new Image();
    img.src = asset;
    img.alt = "";
    img.onerror = () => { element.textContent = fallback; };
    element.append(img);
  } else element.textContent = fallback;
}
function recoveredAbilityIconPath(ability) {
  return ability && RECOVERED_ABILITY_ICON_IDS.has(ability.originalId)
    ? `assets/original/interface/icones/${ability.originalId}.png`
    : null;
}
function abilityIconMarkup(ability) {
  const src = recoveredAbilityIconPath(ability);
  return src
    ? `<img class="ability-icon" src="${src}" alt="" aria-hidden="true">`
    : `<span class="ability-icon ability-icon-glyph" aria-hidden="true">${escapeHTML(ability?.icon ?? "?")}</span>`;
}
function updateNotebookHUD() {
  const notebook = $("notebook");
  notebook.hidden = !(profile.job === "journalist" || resolveJobSkill(profile, 3)?.job === "journalist" || player.notebook.length);
  const signature = player.notebook.join(",");
  if (notebook.dataset.notes !== signature) {
    notebook.dataset.notes = signature;
    $("notebook-slots").innerHTML = [0, 1].map(index => {
      const note = TESTIMONIES[player.notebook[index]];
      return `<span class="notebook-slot" title="${note?.name || "Espacio vacío"}">${note ? `<img src="${note.icon}" alt="${note.name}">` : "·"}</span>`;
    }).join("");
  }
  $("notebook-label").textContent = player.notebook.length === 2 ? "Informe preparado" : `Testimonios ${player.notebook.length}/2`;
  const secondaryReporter = resolveJobSkill(profile, 3);
  $("notebook-control").textContent = profile.job === "journalist" ? "Informe: Q / 1" : secondaryReporter?.skill === 1 ? "Informe: 3" : "Entrevista: 3";
  const pending = targetingSystem?.pending;
  $("targeting-hint").hidden = !pending || !!modalKind;
  if (pending) $("targeting-hint").textContent = "Selecciona el objetivo · clic o J para lanzar · Esc para cancelar";
  for (let slot = 1; slot <= 3; slot++) $("skill" + slot + "-button").classList.toggle("aiming", pending?.slot === slot);
}
function skillTarget(range) {
  const target = pointer.aimed
    ? screenToWorld(pointer.x, pointer.y)
    : {
        x: player.x + Math.cos(player.angle) * range,
        y: player.y + Math.sin(player.angle) * range,
      };
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const targetDistance = Math.hypot(dx, dy);
  const scale = targetDistance > range ? range / targetDistance : 1;
  return { x: player.x + dx * scale, y: player.y + dy * scale };
}
function drawEffects(under) {
  for (const e of effects) {
    const pool = ["pool", "plant", "trap", "interview", "burn"].includes(
      e.kind,
    );
    if (pool !== under) continue;
    ctx.save();
    ctx.globalAlpha = Math.min(1, e.life / 0.4);
    if (e.kind === "flask") {
      drawOriginalEffect(
        ctx,
        57,
        e.x,
        e.y -
          20 -
          Math.sin((Math.PI * e.flightElapsed) / e.flightDuration) * 70,
        0,
        0.55,
        { rotation: e.flightElapsed * 8 },
      );
    } else if (e.kind === "ingredient") {
      const img = ingredientImages[e.ingredientType];
      ctx.fillStyle = ["#edb27855", "#b7cde855", "#c4d99155"][e.ingredientType];
      ctx.beginPath();
      ctx.ellipse(e.x, e.y, 15, 8, 0, 0, TAU);
      ctx.fill();
      if (img?.complete && img.naturalWidth)
        ctx.drawImage(img, e.x - 10, e.y - 28, 20, 20);
    } else if (e.kind === "native") {
      drawOriginalEffect(
        ctx,
        e.fxId,
        e.x,
        e.y,
        (e.age || 0) * 1000,
        e.scale || 0.5,
        { once: true },
      );
    } else if (e.kind === "decoy") {
      ctx.translate(e.x, e.y);
      ctx.globalAlpha *= 0.72;
      ctx.fillStyle = "#d9c9df";
      ctx.strokeStyle = "#6f5a7d";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -7, 13, 15, 0, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -24, 8, 0, TAU);
      ctx.fill();
      ctx.stroke();
      label(ctx, "Señuelo", 0, -39, "#f1def8", 11);
    } else if (e.kind === "tornado") {
      ctx.translate(e.x, e.y);
      ctx.rotate((e.age || 0) * 7);
      ctx.strokeStyle = e.color || "#c9d9dc";
      ctx.lineWidth = 4;
      for (let i = 0; i < 3; i++) {
        const radius = e.r * (0.38 + i * 0.2);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.48, radius, (i * Math.PI) / 3, 0.2, Math.PI * 1.75);
        ctx.stroke();
      }
    } else if (e.kind === "anvil") {
      if (!drawOriginalEffect(ctx, 35, e.x, e.y, (e.age || 0) * 1000, 0.7, { once: true })) {
        ctx.translate(e.x, e.y);
        ctx.fillStyle = "#9ca5a8";
        ctx.strokeStyle = "#28333a";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-23, -12);
        ctx.lineTo(23, -12);
        ctx.lineTo(16, 8);
        ctx.lineTo(8, 13);
        ctx.lineTo(-8, 13);
        ctx.lineTo(-16, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillRect(-31, -18, 62, 9);
        ctx.strokeRect(-31, -18, 62, 9);
      }
    } else if (e.kind === "testimony") {
      const visual = TESTIMONIES[e.subtype] || TESTIMONIES.heal;
      const bob = Math.sin(time * 3) * 3;
      if (visual.effectId && drawOriginalEffect(ctx, visual.effectId, e.x, e.y + bob, 0, 1)) {
        ctx.restore();
        continue;
      }
      ctx.translate(e.x, e.y + bob);
      ctx.fillStyle = "#eee0b4";
      ctx.strokeStyle = visual.color;
      ctx.lineWidth = 2;
      ctx.fillRect(-13, -25, 26, 30);
      ctx.strokeRect(-13, -25, 26, 30);
      label(ctx, visual.symbol, 0, -4, visual.color, 20);
    } else if (pool) {
      if (e.kind === "pool" && e.job === "botanist")
        drawOriginalEffect(
          ctx,
          e.healing ? 13 : 15,
          e.x,
          e.y,
          (e.age || 0) * 1000,
          0.6,
        );
      ctx.fillStyle = e.color + "33";
      ctx.strokeStyle = e.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(e.x, e.y, e.r, e.r * 0.72, 0, 0, TAU);
      ctx.fill();
      ctx.setLineDash([5, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
      if (e.kind === "plant" && !artStatus().summons?.includes(25)) {
        for (let i = 0; i < 6; i++) {
          const a = (i * TAU) / 6;
          ctx.fillStyle = "#96b942";
          ctx.beginPath();
          ctx.ellipse(
            e.x + Math.cos(a) * 16,
            e.y - 15 + Math.sin(a) * 10,
            9,
            20,
            a,
            0,
            TAU,
          );
          ctx.fill();
        }
        ctx.fillStyle = "#b792c0";
        ctx.beginPath();
        ctx.arc(e.x, e.y - 29, 10, 0, TAU);
        ctx.fill();
      }
      if (e.kind === "trap" && !artStatus().summons?.includes(9)) {
        ctx.strokeStyle = "#eee0a2";
        ctx.strokeRect(e.x - 17, e.y - 12, 34, 24);
      }
    } else if (e.kind === "slash") {
      const a = 1 - e.life / e.maxLife;
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.strokeStyle = e.color;
      ctx.lineWidth = 5 * (1 - a) + 1;
      ctx.beginPath();
      ctx.arc(0, 0, e.r * a + 0.3, -1.2, 1.2);
      ctx.stroke();
      ctx.strokeStyle = "#fffbe7aa";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, e.r * a + 8, -1, 1);
      ctx.stroke();
    } else {
      ctx.strokeStyle = e.color;
      ctx.lineWidth = (3 * e.life) / e.maxLife;
      ctx.beginPath();
      ctx.ellipse(
        e.x,
        e.y,
        e.r * (1 - e.life / e.maxLife),
        e.r * 0.6 * (1 - e.life / e.maxLife),
        0,
        0,
        TAU,
      );
      ctx.stroke();
    }
    ctx.restore();
  }
}
function drawLocalEmote(targetContext) {
  if (!localEmote) return;
  const elapsed = time - localEmote.startedAt;
  if (elapsed >= 2) {
    localEmote = null;
    return;
  }
  const image = localEmoteImages[localEmote.code - 1];
  if (!image?.complete || !image.naturalWidth) return;
  const progress = clamp(elapsed / 2, 0, 1);
  const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
  const side = player.facing > 0 ? -40 : 40;
  targetContext.drawImage(
    image,
    player.x + side - image.naturalWidth / 2,
    player.y - 30 - 30 * easeOut - image.naturalHeight / 2,
  );
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  if (!scene) return;
  constrainCamera();
  let shakeX = 0;
  let shakeY = 0;
  if (camera.shakeUntil > time) {
    const progress = clamp((time - camera.shakeStartedAt) / 0.1, 0, 1);
    const remaining = Math.pow(2, -10 * progress);
    shakeX = Math.cos(camera.shakeAngle) * 10 * remaining + Math.random() - 0.5;
    shakeY = Math.sin(camera.shakeAngle) * 10 * remaining + Math.random() - 0.5;
  }
  const navigationTarget = mode === "playing" && !modalKind && $("dialogue").hidden && !$("hud").hidden
    ? objectiveTarget({ scene, pet, tutorialPhase, room, encounterStarted, encounterAwarded, muraAdvicePending: profile.expeditions > 0 && !profile.muraAdviceSeen, papailleClueDialogue }) : null;
  const navigationMarker = objectiveProjection(navigationTarget, camera, zoom, w, h);
  ctx.save();
  ctx.translate(w / 2 + shakeX, h / 2 + shakeY);
  ctx.scale(zoom, zoom);
  ctx.translate(-camera.x, -camera.y);
  ctx.drawImage(scene.ground, 0, 0);
  drawBowAim();
  if (navigationMarker?.mode === "ground") {
    if (!drawOriginalEffect(ctx, OBJECTIVE_GROUND_EFFECT, navigationTarget.x, navigationTarget.y, time * 1000, 0.65)) {
      ctx.strokeStyle = "#f4cf68";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(navigationTarget.x, navigationTarget.y, 26, 12, 0, 0, TAU); ctx.stroke();
    }
  }
  drawSkillTarget();
  if (scene.kind === "village") {
    ctx.strokeStyle = "#e8dd9e88";
    ctx.lineWidth = 3;
    ctx.setLineDash([9, 14]);
    ctx.beginPath();
    ctx.moveTo(1720, 760);
    ctx.lineTo(1950, 760);
    ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, "HACIA EL BOSQUE →", 1850, 720, "#f1e6b3", 14);
  }
  drawEffects(true);
  for (const e of enemies) {
    if (
      e.hp > 0 &&
      e.telegraph > 0 &&
      (e.type === "wasp" ||
        (e.type === "boss" && e.pattern === 1))
    ) {
      const a = Math.atan2(e.targetY - e.y, e.targetX - e.x);
      ctx.strokeStyle = "#f2b75d99";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      for (const delta of e.type === "boss" ? [-0.25, 0, 0.25] : [0]) {
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - 10);
        ctx.lineTo(
          e.x + Math.cos(a + delta) * 480,
          e.y - 10 + Math.sin(a + delta) * 480,
        );
        ctx.stroke();
      }
      ctx.setLineDash([]);
      continue;
    }
    if (e.hp > 0 && e.telegraph > 0 && e.type !== "wasp") {
      ctx.fillStyle = "#cc7f3c40";
      ctx.strokeStyle = "#e2b064";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(
        e.targetX,
        e.targetY,
        e.type === "boss"
          ? e.pattern === 2
            ? ENCOUNTER_RULES.boss.heavyStompRadius
            : ENCOUNTER_RULES.boss.stompRadius
          : (ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle).attackRadius,
        e.type === "boss"
          ? e.pattern === 2
            ? ENCOUNTER_RULES.boss.heavyStompRadius * 0.76
            : ENCOUNTER_RULES.boss.stompRadius * 0.72
          : 50,
        0,
        0,
        TAU,
      );
      ctx.fill();
      ctx.stroke();
    }
  }
  const visible = scene.objects.filter(
    (o) =>
      Math.abs(o.x - camera.x) < w / zoom / 2 + 360 &&
      Math.abs(o.y - camera.y) < h / zoom / 2 + 340,
  );
  const entities = [
    ...scene.interactables.filter(o => o.id === "chest").map(o => ({
      y: o.y,
      draw: () => {
        const isOpening = chestOpeningStartedAt !== null;
        const remainsOpen = rewardOffer.length > 0 || room >= encounterCount;
        const state = isOpening ? "ouverture" : modalKind === "reward" || remainsOpen ? "ouvert" : "statique";
        const elapsed = isOpening ? (time - chestOpeningStartedAt) * 1000 : time * 1000;
        if (!drawOriginalCreature(ctx, 14, state, o.x, o.y, elapsed))
          chest(ctx, o.x, o.y, state === "ouvert" || isOpening);
      },
    })),
    ...scene.interactables.filter(o => o.clueId).map(clue => ({
      y: clue.y,
      draw: () => drawForestClue(ctx, clue, forestClues.includes(clue.clueId)),
    })),
    ...visible.map((o) => ({
      y: o.y,
      draw: () => {
        // Foreground trees stay opaque and can cover actors; actor overlays
        // are drawn after the scene entities, matching the observed HUD.
        ctx.save();
        decoration(ctx, o);
        ctx.restore();
      },
    })),
    ...scene.npcs.map((n) => ({
      y: n.y,
      draw: () =>
        mouse(ctx, { ...n, facing: 1 }, time, {
          npc: true,
          showName: !n.ambient,
          color: n.color,
          weapon: null,
          hat: n.id === "mura",
        }),
    })),
    ...effects
      .filter(
        (e) =>
          e.life > 0 &&
          (e.kind === "plant" ||
            e.kind === "bee" ||
            e.kind === "livingLeaf" ||
            e.kind === "trap" ||
            (e.kind === "pool" && e.job === "chef")),
      )
      .map((e) => ({ y: e.y, draw: () => drawSummon(e) })),
    ...enemies
      .filter((e) => e.hp > 0 || enemyDeathElapsed(e) < enemyDeathDuration(e))
      .map((e) => ({ y: e.y, draw: () => enemy(ctx, e, time) })),
    ...(profile.petActive || scene.kind === "tutorial"
      ? [
          {
            y: pet.y,
            draw: () => {
              ctx.save();
              if (pet.hitFlashUntil > time) ctx.filter = "brightness(4) grayscale(1)";
              if (
                (player.invisible > 0 && bonus("vanishPet")) ||
                pet.invisible > 0
              )
                ctx.globalAlpha = 0.3;
              drawPet(
                ctx,
                profile.petSpecies,
                { ...pet, name: profile.petName, maxHp: petMaxHP(), hideOverlay: true },
                time,
              );
              ctx.restore();
            },
          },
        ]
      : []),
    {
      y: player.y,
      draw: () => {
        ctx.save();
        if (player.hitFlashUntil > time) ctx.filter = "brightness(4) grayscale(1)";
        if (player.invuln > 0 && Math.floor(time * 20) % 2)
          ctx.globalAlpha = 0.55;
        if (player.invisible > 0) ctx.globalAlpha *= 0.3;
        const emoteElapsed = localMouseEmote ? time - localMouseEmote.startedAt : 0;
        if (localMouseEmote && emoteElapsed >= localMouseEmote.duration)
          localMouseEmote = null;
        const visualPlayer = localMouseEmote
          ? {
              ...player,
              socialEmote: {
                animation: localMouseEmote.animation,
                elapsed: emoteElapsed,
                facing: localMouseEmote.facing,
              },
            }
          : player;
        drawPlayerCharacter(ctx, profile.characterId, visualPlayer, time, {
          color: furColors[profile.fur],
          weapon: profile.weapon,
          secondary: profile.secondary,
          clothing: playerClothing(),
        });
        ctx.restore();
      },
    },
    {
      y: player.y,
      draw: () => drawLocalEmote(ctx),
    },
  ];
  entities.sort((a, b) => a.y - b.y);
  for (const e of entities) e.draw();
  if (mode === "playing" && !$("hud").hidden && scene.kind !== "village") {
    drawActorOverlay(ctx, { ...player, maxHp: maxHP() }, { indicators: playerIndicators(player) });
    if (profile.petActive || scene.kind === "tutorial")
      drawActorOverlay(ctx, { ...pet, maxHp: petMaxHP() }, {
        offset: 40,
        indicators: [
          pet.barrier > 0 && { symbol: "◇", color: "#b9daed" },
          pet.bandageHot > 0 && { symbol: "✚", color: "#c4d991" },
        ].filter(Boolean),
        injuredLabel: pet.injured ? `${profile.petName} necesita ayuda` : "",
      });
  }
  if (scene.kind === "tutorial" && tutorialPhase > 0) {
    const n = scene.npcs[0];
    label(ctx, "!", n.x, n.y - 88 + Math.sin(time * 4) * 4, "#fce393", 26);
  }
  drawEffects(false);
  for (const p of projectiles) {
    if (
      p.kind === "card" &&
      drawOriginalEffect(
        ctx,
        CARD_PROJECTILE_EFFECTS[p.cardSuit] ?? CARD_PROJECTILE_EFFECTS.spade,
        p.x,
        p.y,
        0,
        0.8,
        { rotation: Math.atan2(p.vy, p.vx) },
      )
    )
      continue;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.enemy ? 5 : 3;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.vx * 0.025, p.y - p.vy * 0.025);
    ctx.stroke();
  }
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
    if (p.kind === "text") {
      label(ctx, p.text, p.x, p.y, p.color, 17);
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
  // Sunlit dust motes drift through the clearing independently of combat particles.
  for (let i = 0; i < 20; i++) {
    const x =
        (Math.sin(i * 98.3) * 0.5 + 0.5) * scene.width +
        Math.sin(time * 0.35 + i) * 18,
      y =
        (Math.cos(i * 77.2) * 0.5 + 0.5) * scene.height +
        Math.cos(time * 0.4 + i) * 20;
    ctx.fillStyle = `rgba(249,242,173,${0.25 + Math.sin(time + i) * 0.15})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.45,
    h * 0.2,
    w * 0.5,
    h * 0.45,
    Math.max(w, h) * 0.7,
  );
  vignette.addColorStop(0, "#182b1700");
  vignette.addColorStop(1, "#18351745");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
  if (navigationMarker?.mode === "edge") {
    ctx.save();
    ctx.translate(navigationMarker.x, navigationMarker.y);
    ctx.rotate(navigationMarker.angle);
    if (objectiveArrow.complete && objectiveArrow.naturalWidth)
      ctx.drawImage(objectiveArrow, -46, -20, 46, 40);
    else {
      ctx.fillStyle = "#edcf67";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-24, -12); ctx.lineTo(-18, 0); ctx.lineTo(-24, 12); ctx.fill();
    }
    ctx.restore();
  }
  renderReady = true;
}
function frame(now) {
  if (!$("dialogue").hidden) {
    const visibleText = dialogueText.visible(now);
    const textElement = $("dialogue-text");
    if (textElement.firstChild?.textContent !== visibleText)
      renderDialoguePage(textElement, visibleText, textElement.getAttribute("aria-label") || "");
    $("dialogue-next-label").textContent = dialogueText.complete(now)
      ? (dialogueQueue.length ? "Continuar" : "Terminar") : "Mostrar texto";
  }
  const dt = Math.min((now - lastTime) / 1000 || 0, 0.05);
  lastTime = now;
  update(dt);
  draw();
  updateHUDPortrait();
  const preview = $("appearance-preview");
  if (preview) {
    const c = preview.getContext("2d");
    c.clearRect(0, 0, 280, 220);
    c.save();
    c.translate(140, 190);
    c.scale(2, 2);
    const selected =
      modalKind === "loadout-preview" && loadoutPreview
        ? loadoutPreview
        : profile;
    if (preview.closest(".profile-overview") && profile.petSpecies && profile.petActive) {
      const petHP = petMaxHP();
      drawPet(
        c,
        profile.petSpecies,
        {
          ...pet,
          x: -50,
          y: 10,
          facing: 1,
          moving: false,
          movementAnimationTime: 0,
          injured: false,
          invisible: 0,
          hp: petHP,
          maxHp: petHP,
          name: profile.petName,
          hideOverlay: true,
        },
        time,
      );
    }
    mouse(c, { x: 0, y: 0, facing: 1, moving: false }, time, {
      color: furColors[profile.fur],
      weapon: selected.weapon,
      secondary: selected.secondary,
      clothing: playerClothing(),
    });
    c.restore();
  }
  const petPreview = $("pet-profile-preview");
  if (petPreview && artStatus().ready) {
    const c = petPreview.getContext("2d");
    c.clearRect(0, 0, petPreview.width, petPreview.height);
    c.save();
    c.translate(petPreview.width / 2, petPreview.height - 12);
    drawPet(
      c,
      profile.petSpecies,
      {
        ...pet,
        x: 0,
        y: 0,
        facing: 1,
        moving: false,
        name: profile.petName,
        maxHp: petMaxHP(),
      },
      time,
    );
    c.restore();
  }
  if (artStatus().ready)
    for (const canvas of document.querySelectorAll(
      ".inventory-preview:not([data-rendered])",
    )) {
      const previewContext = canvas.getContext("2d");
      previewContext.clearRect(0, 0, canvas.width, canvas.height);
      previewContext.save();
      previewContext.translate(canvas.width / 2, canvas.height - 3);
      previewContext.scale(1.15, 1.15);
      drawPlayerCharacter(
        previewContext,
        profile.characterId,
        { x: 0, y: 0, facing: 1, moving: false },
        time,
        {
          color: furColors[profile.fur],
          weapon: null,
          secondary: null,
          clothing: [Number(canvas.dataset.appearance)],
        },
      );
      previewContext.restore();
      canvas.dataset.rendered = "true";
    }
  requestAnimationFrame(frame);
}

window.addEventListener("resize", resize);
window.addEventListener("adventure-failure", () => {
  mode = "error";
  resetSceneAudio();
  keys.clear();
  pointer.down = false;
  targetingSystem?.cancel();
});
function releaseInputsOnFocusLoss() {
  closeEmotePicker();
  targetingSystem?.cancel();
  stopOriginalSound("arc1");
  keys.clear();
  pointer.down = false;
  // The original client calls finClique() on both hands when keyboard focus is lost.
  // Releasing the bow here also handles cases where keyup/pointerup never arrives.
  releaseBow();
  if (player) stopGuard();
}
window.addEventListener("blur", () => {
  releaseInputsOnFocusLoss();
});
document.addEventListener("visibilitychange", () => {
  releaseInputsOnFocusLoss();
  lastTime = performance.now();
  if (mode === "playing") save();
});
window.addEventListener("beforeunload", () => {
  if (mode === "playing") save();
});
window.addEventListener("keydown", (e) => {
  if (e.target.matches("input,textarea,select")) return;
  if (
    [
      "Space",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ].includes(e.code) &&
    e.code !== "Tab"
  )
    e.preventDefault();
  if (e.repeat) return;
  if (e.code === "Escape" && mode === "title" && modalKind) {
    closeModal();
    return;
  }
  if (mode !== "playing") return;
  if (e.code === "Escape") {
    if (!$("emote-picker").hidden || !$("emote-command-menu").hidden) {
      closeEmotePicker();
      return;
    }
    if (targetingSystem?.cancel()) return;
    if (modalKind) {
      if (modalKind === "new") {
        closeModal();
        mode = "title";
        $("hud").hidden = true;
        $("title-screen").hidden = false;
      } else closeModal();
    } else if (!$("dialogue").hidden) {
      advanceDialogue();
    } else openMenu();
    return;
  }
  if (modalKind) return;
  if (!$("dialogue").hidden) {
    if (e.code === "KeyE" || e.code === "Enter") advanceDialogue();
    return;
  }
  if (e.code === "KeyF") {
    openEmotePicker();
    return;
  }
  if (e.code === "KeyJ" && targetingSystem?.pending) {
    targetingSystem.confirm(currentSkillAim());
    return;
  }
  if (e.code === "KeyH" && targetingSystem?.cancel()) return;
  keys.add(e.code);
  if (e.code === "KeyE") interact();
  if (e.code === "KeyH") secondaryAction();
  if (e.code === "KeyQ" || e.code === "Digit1") skill(1);
  if (e.code === "KeyR" || e.code === "Digit2") skill(2);
  if (e.code === "Digit3") skill(3);
  if (e.code === "Space") dodge();
  if (e.code === "KeyI") openProfile();
  if (e.code === "KeyT") openProfile("talents");
  if (e.code === "KeyX") {
    const pool = activeCauldron();
    if (pool && distance(pool, player) < 200) {
      const result = removeIngredient(pool.cooking);
      if (result.removed) {
        spawnIngredient(result.type, pool.x + 40, pool.y + 15);
        save();
      }
    }
  }
  if (e.code === "KeyM") openDungeon();
  if (e.code === "KeyP") {
    closeEmotePicker();
    $("hud").hidden = !$("hud").hidden;
  }
});
window.addEventListener("keyup", (e) => {
  keys.delete(e.code);
  if (e.code === "KeyJ") releaseBow();
  if (e.code === "KeyH" && player) stopGuard();
});
canvas.addEventListener("pointermove", (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.aimed = true;
});
canvas.addEventListener("pointerdown", (e) => {
  if (mode !== "playing" || modalKind) return;
  initAudio();
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.aimed = true;
  if (targetingSystem.pending) {
    if (e.button === 0) targetingSystem.confirm(screenToWorld(pointer.x, pointer.y));
    else if (e.button === 2) targetingSystem.cancel();
    return;
  }
  if (e.button === 0) {
    pointer.down = true;
    attack();
  }
  if (e.button === 2) secondaryAction();
});
window.addEventListener("pointerup", (e) => {
  if (e.button === 0) {
    pointer.down = false;
    releaseBow();
  }
  if (player && (e.button === 2 || e.target.closest?.("#heal-button")))
    stopGuard();
});
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
$("play-button").onclick = () => startAdventure();
$("continue-button").onclick = () => startAdventure(true);
$("title-import").onclick = openImport;
$("close-modal").onclick = () => {
  if (modalKind === "new") {
    closeModal();
    mode = "title";
    $("hud").hidden = true;
    $("title-screen").hidden = false;
  } else closeModal();
};
const petSystem = createPetSystem({
  get player() { return player; },
  get profile() { return profile; },
  get pet() { return pet; },
  get scene() { return scene; },
  get enemies() { return enemies; },
  get effects() { return effects; },
  get time() { return time; },
  distance, bonus, giftEffect, floating, toast, save, hurtEnemy,
  hasActiveWeaponGift: () =>
    AUTHENTIC_GIFTS.some(
      (gift) =>
        gifts.includes(gift.id) &&
        gift.requirements?.weapon === profile.weapon,
    ),
  moveEntity, healPlayer, countGift, inArea, maxHP, spawnTestimony,
  resolvePetSkill: (slot) => resolveJobSkill(profile, slot),
  useSkill: (slot, origin) => skillSystem.use(slot, origin),
});

const skillSystem = createSkillSystem({
  get player() { return player; },
  get profile() { return profile; },
  get effects() { return effects; },
  get enemies() { return enemies; },
  get pet() { return pet; },
  get projectiles() { return projectiles; },
  get pointer() { return pointer; },
  get mode() { return mode; },
  get modalKind() { return modalKind; },
  $, distance, toast, countGift, bonus, giftEffect, isVisibleInWorld,
  healPlayer, healPet, grantBarrier, spawnFX, floating, burst, tone,
  originalSound, skillTarget, screenToWorld, activeCauldron, save, hurtEnemy,
  nextFieldUid: () => ++fieldSerial,
});
targetingSystem = createTargetingSystem({
  canUse: (slot) => skillSystem.canUse(slot),
  resolve: (slot) => {
    const target = skillTargeting(profile, player, slot, giftEffect);
    if (target && resolveJobSkill(profile, slot)?.job === "botanist") target.radius += bonus("elixirRadius");
    return target;
  },
  origin: () => player,
  cast: (slot, target) => skillSystem.use(slot, player, target),
  onSelect: () => { pointer.down = false; },
});

$("menu-button").onclick = openMenu;
$("help-button").onclick = openHelp;
$("map-button").onclick = openWorldMap;
$("profile-button").onclick = () => openProfile();
$("talents-button").onclick = () => openProfile("talents");
$("dungeon-button").onclick = openDungeon;
$("emote-button").onclick = (event) => openLocalEmoteMenu(event.currentTarget);
$("sound-button").onclick = () => {
  initAudio();
  if (muted && audioSettings.master === 0) {
    audioSettings.master = 0.55;
    saveAudioSettings();
  }
  muted = !muted;
  updateSound();
  tone(540, 0.1);
};
$("attack-button").onclick = () => targetingSystem.pending
  ? targetingSystem.confirm(currentSkillAim()) : attack();
$("heal-button").onpointerdown = secondaryAction;
$("heal-button").onclick = (e) => {
  if (e.detail === 0) {
    if (profile.secondary === "shield" && player.guarding)
      stopGuard();
    else secondaryAction();
  }
};
$("skill1-button").onclick = () => skill(1);
$("skill2-button").onclick = () => skill(2);
$("skill3-button").onclick = () => skill(3);
$("dodge-button").onclick = dodge;
$("dialogue-next").onclick = advanceDialogue;
$("dialogue").onclick = event => {
  if (!event.target.closest("button")) advanceDialogue();
};
// Read-only inspection surface for local diagnostics; mutations stay inside normal input handlers.
Object.defineProperty(window, "adventure", {
  value: Object.freeze({
    snapshot: () => ({
      emotes: {
        icon: localEmote ? { ...localEmote } : null,
        mouse: localMouseEmote ? { ...localMouseEmote } : null,
      },
      forestClues: [...forestClues],
      clues: scene.interactables.filter(o => o.clueId).map(o => ({ id: o.clueId, x: o.x, y: o.y })),
      chest: scene.interactables.find(o => o.id === "chest") ?? null,
      objective: objectiveTarget({ scene, pet, tutorialPhase, room, encounterStarted, encounterAwarded, muraAdvicePending: profile.expeditions > 0 && !profile.muraAdviceSeen, papailleClueDialogue }),
      targeting: targetingSystem.pending,
      fields: effects.filter(effect => effect.life > 0).map(effect => ({
        kind: effect.kind, x: effect.x, y: effect.y, subtype: effect.subtype,
        hp: effect.hp, growth: effect.growth, uid: effect.uid,
        landingX: effect.landingX, landingY: effect.landingY,
      })),
      projectiles: projectiles.filter(projectile => projectile.life > 0).map(projectile => ({
        kind: projectile.kind, cardSuit: projectile.cardSuit, maxHits: projectile.maxHits,
        targetUid: projectile.targetUid,
      })),
      mode,
      scene: scene.kind,
      position: { x: player.x, y: player.y },
      view: { x: camera.x, y: camera.y, zoom },
      health: player.hp,
      level: profile.level,
      job: profile.job,
      weapon: profile.weapon,
      secondary: profile.secondary,
      secondaryJob: profile.secondaryJob,
      secondarySkill: profile.secondarySkill,
      invisible: player.invisible,
      damageBoost: player.damageBoost,
      sword: { chainStacks: player.states.chainStacks || 0, chainTime: player.states.chainTime || 0,
        balestraReady: !!player.states.swordBalestraReady, cleaveRemaining: player.states.swordBoost || 0 },
      cardIndex: player.cardIndex,
      cooldowns: {
        skill1: player.skill1,
        skill2: player.skill2,
        skill3: player.skill3,
      },
      testimonies: effects
        .filter((e) => e.kind === "testimony" && e.life > 0)
        .map((e) => ({ x: e.x, y: e.y, subtype: e.subtype })),
      guarding: player.guarding,
      action: player.action ? { ...player.action } : null,
      tutorialPhase,
      room,
      encounterCount,
      encounterStarted,
      encounterAwarded,
      inventory: profile.inventory.map(itemDetails),
      equipped: { ...profile.equipped },
      talentBuild: JSON.parse(JSON.stringify(profile.talentBuild)),
      step,
      gifts: [...gifts],
      enemies: enemies.filter((e) => e.hp > 0).length,
      targets: enemies
        .filter((e) => e.hp > 0)
        .map((e) => ({ x: e.x, y: e.y, hp: e.hp, type: e.type,
          daggerPoison: e.poisonDagger ? e.poison : 0,
          plantPoison: e.plantPoisonTime || 0, reportPoison: e.reportPoisoned || 0,
          arrowDoses: e.arrowPoisons?.length || 0,
          cardDoses: e.cardPoisons?.length || 0,
          arrowDamagePending: (e.arrowPoisons || []).reduce((sum, dose) => sum + dose.damage * dose.ticks, 0),
        })),
      modal: modalKind,
      audio: soundStatus(),
      cosmetics: { ...profile.cosmetics },
      notebook: [...player.notebook],
      pet: { ...pet, name: profile.petName, active: profile.petActive },
      rewardOffer: [...rewardOffer],
      selectedGift,
      renderReady,
      art: artStatus(),
    }),
    version: "0.201.0",
  }),
});
resize();
scene = makeScene("village");
player = createPlayer(1080, 930);
pet = { x: 1030, y: 950, facing: 1, injured: false, attack: 0 };
camera.x = 1100;
camera.y = 730;
resetCameraEffects();
$("continue-button").hidden = !saved;
initializeArt().catch((error) =>
  console.warn("Se utiliza el dibujo local como respaldo.", error),
);
requestAnimationFrame(frame);




