import test from "node:test";
import assert from "node:assert/strict";
import { advanceAttack } from "../dist/combat.js";
import {
  defaultProfile,
  decodeSave,
  encodeSave,
  SAVE_VERSION,
} from "../dist/persistence.js";

const journey = () => ({
  scene: "dungeon",
  seed: 10,
  room: 1,
  step: 2,
  gifts: ["power", "vitality"],
  tutorialPhase: 2,
  player: { x: 650, y: 700, hp: 67, skill1: 2.5, heal: 4 },
  pet: { x: 600, y: 710 },
  enemies: [
    {
      type: "wasp",
      x: 900,
      y: 600,
      hp: 21,
      maxHp: 50,
      speed: 80,
      telegraph: 0.3,
    },
  ],
  effects: [{ kind: "plant", x: 680, y: 700, life: 3, damage: 10 }],
  projectiles: [
    { x: 850, y: 600, vx: -200, vy: 0, damage: 12, enemy: true, life: 0.8 },
  ],
});
test("tutorial imports always retain a usable bandage loadout", () => {
  const state = journey();
  state.scene = "tutorial";
  state.tutorialPhase = 0;
  const result = decodeSave(
    encodeSave(
      { ...defaultProfile(), weapon: "greatsword", secondary: "shield" },
      state,
    ),
  );
  assert.equal(result.weapon, "sword");
  assert.equal(result.secondary, "bandage");
});
test("rescued tutorial survives save/load without an invented combat", () => {
  const state = {
    ...journey(), scene: "tutorial", tutorialPhase: 1,
    enemies: [], effects: [], projectiles: [],
    pet: { x: 620, y: 630, hp: 40, injured: false },
  };
  const result = decodeSave(encodeSave(defaultProfile(), state));
  assert.ok(result.journey, "The rescued tutorial must not be discarded");
  assert.equal(result.journey.tutorialPhase, 1);
  assert.equal(result.journey.player.x, state.player.x);
  assert.equal(result.journey.pet.injured, false);
  assert.deepEqual(result.journey.enemies, []);
});
test("legacy tutorial combat phases retain their existing state", () => {
  for (const tutorialPhase of [1, 2]) {
    const state = { ...journey(), scene: "tutorial", tutorialPhase };
    const result = decodeSave(encodeSave(defaultProfile(), state));
    assert.equal(result.journey.tutorialPhase, tutorialPhase);
    assert.equal(result.journey.enemies[0].hp, state.enemies[0].hp);
  }
});
test("v1 migration preserves profile and introduces no invented journey", () => {
  const result = decodeSave(
    JSON.stringify({
      ...defaultProfile(),
      version: 1,
      level: 4,
      coins: 25,
      weapon: "bow",
    }),
  );
  assert.equal(result.version, SAVE_VERSION);
  assert.equal(result.level, 4);
  assert.equal(result.coins, 25);
  assert.equal(result.weapon, "bow");
  assert.equal(result.journey, null);
});
test("v3 migration keeps the old job and expedition without inventing a secondary job", () => {
  const result = decodeSave(
    JSON.stringify({
      ...defaultProfile(),
      version: 3,
      job: "chef",
      journey: journey(),
    }),
  );
  assert.equal(result.job, "chef");
  assert.equal(result.secondaryJob, null);
  assert.equal(result.journey.enemies[0].hp, 21);
});
test("new job effects, statuses and third cooldown survive save/load", () => {
  const p = {
      ...defaultProfile(),
      level: 10,
      job: "trickster",
      secondaryJob: "journalist",
      secondarySkill: 2,
    },
    j = journey();
  Object.assign(j.player, {
    invisible: 1.5,
    damageBoost: 3,
    cardIndex: 2,
    skill3: 4,
  });
  j.effects.push(
    {
      kind: "testimony",
      subtype: "fire",
      x: 700,
      y: 600,
      life: 12,
      maxLife: 15,
      color: "#edb278",
    },
    {
      kind: "interview",
      x: 650,
      y: 700,
      life: 4,
      maxLife: 5,
      damage: 5,
      healing: true,
      color: "#b8c9db",
    },
  );
  const result = decodeSave(encodeSave(p, j));
  assert.equal(result.secondaryJob, "journalist");
  assert.equal(result.secondarySkill, 2);
  assert.equal(result.journey.player.skill3, 4);
  assert.equal(result.journey.player.cardIndex, 2);
  assert.equal(result.journey.player.invisible, 1.5);
  assert.ok(
    result.journey.effects.some(
      (e) => e.kind === "testimony" && e.subtype === "fire" && e.life === 12,
    ),
  );
  assert.ok(result.journey.effects.some((e) => e.kind === "interview"));
});
test("v2 expeditions migrate without losing enemies or gifts", () => {
  const data = { ...defaultProfile(), version: 2, journey: journey() };
  delete data.secondary;
  const result = decodeSave(JSON.stringify(data));
  assert.equal(result.secondary, "bandage");
  assert.equal(result.journey.enemies[0].hp, 21);
  assert.deepEqual(result.journey.gifts, ["power", "vitality"]);
});
test("v3 preserves new equipment and attack impact state, never a stuck shield hold", () => {
  const p = { ...defaultProfile(), weapon: "dagger", secondary: "shield" },
    j = journey();
  j.player.action = { weapon: "dagger", angle: 0, elapsed: 0.12, hit: true };
  j.player.guarding = true;
  const saved = decodeSave(encodeSave(p, j));
  assert.equal(saved.weapon, "dagger");
  assert.equal(saved.secondary, "shield");
  assert.equal(saved.journey.player.action.hit, true);
  assert.equal(saved.journey.player.guarding, false);
});
test("journey round-trip preserves real combat state", () => {
  const result = decodeSave(encodeSave(defaultProfile(), journey()));
  assert.equal(result.journey.room, 1);
  assert.equal(result.journey.step, 2);
  assert.equal(result.journey.player.hp, 67);
  assert.equal(result.journey.player.skill1, 2.5);
  assert.equal(result.journey.enemies[0].hp, 21);
  assert.equal(result.journey.enemies[0].telegraph, 0.3);
  assert.equal(result.journey.effects[0].life, 3);
  assert.equal(result.journey.projectiles[0].enemy, true);
  assert.deepEqual(result.journey.gifts, ["power", "vitality"]);
});

test("released bow preserves its release clock and never restores a held input", () => {
  const p = { ...defaultProfile(), weapon: "bow", secondary: "bandage" };
  const j = journey();
  j.player.action = { weapon: "bow", angle: 0.3, elapsed: 0.14,
    hit: true, released: true, releaseElapsed: 0.4, held: true };
  const action = decodeSave(encodeSave(p, j)).journey.player.action;
  assert.equal(action.released, true);
  assert.equal(action.releaseElapsed, 0.4);
  assert.equal(action.hit, true);
  assert.equal(action.held, false);
  assert.equal(advanceAttack(action, 0.5).impact, false);
  assert.equal(advanceAttack(action, 0).finished, true);
});

test("old bow hits recover a finite release clock; unfinished held charges cancel on reload", () => {
  const p = { ...defaultProfile(), weapon: "bow", secondary: "bandage" };
  const j = journey();
  j.player.action = { weapon: "bow", angle: 0, elapsed: 0.14, hit: true };
  const restored = decodeSave(encodeSave(p, j)).journey.player.action;
  assert.equal(restored.released, true);
  assert.equal(Number.isFinite(restored.releaseElapsed), true);
  assert.ok(restored.releaseElapsed >= 0.15);
  j.player.action = { weapon: "bow", angle: 0, elapsed: 0.05, hit: false, held: true };
  assert.equal(decodeSave(encodeSave(p, j)).journey.player.action, null);
});

test("released bow saved before launch keeps the remaining delay and impacts exactly once", () => {
  const p = { ...defaultProfile(), weapon: "bow", secondary: "bandage" }, j = journey();
  j.player.action = { weapon: "bow", angle: 0, elapsed: 0.14,
    hit: false, released: true, releaseElapsed: 0.05 };
  const action = decodeSave(encodeSave(p, j)).journey.player.action;
  assert.equal(advanceAttack(action, 0.09).impact, false);
  assert.equal(advanceAttack(action, 0.02).impact, true);
  const resumedAgain = decodeSave(encodeSave(p, { ...j, player: { ...j.player, action } })).journey.player.action;
  assert.equal(advanceAttack(resumedAgain, 1).impact, false);
  assert.equal(advanceAttack(resumedAgain, 0).finished, true);
});
test("invalid files cannot replace a save", () => {
  for (const value of [
    "null",
    "[]",
    "{}",
    "broken",
    JSON.stringify({ version: 99, name: "A", level: 1 }),
    "x".repeat(200001),
  ])
    assert.throws(() => decodeSave(value));
});
test("import normalizes coordinates, known content and talent budget", () => {
  const source = {
    ...defaultProfile(),
    talents: { vitality: 3, power: 3, pet: 3 },
    journey: journey(),
  };
  source.journey.player.x = -999;
  source.journey.player.y = 99999;
  source.journey.gifts.push("unknown");
  source.journey.enemies.push({ type: "script" });
  const p = decodeSave(JSON.stringify(source));
  assert.equal(
    Object.values(p.talents).reduce((a, b) => a + b),
    1,
  );
  assert.equal(p.journey.player.x, 55);
  assert.equal(p.journey.player.y, 1195);
  assert.equal(p.journey.gifts.length, 2);
  assert.equal(p.journey.enemies.length, 1);
});
test("cleared rooms and victory can be restored without awarding again", () => {
  const j = journey();
  j.enemies[0].hp = 0;
  j.pending = "reward";
  assert.equal(
    decodeSave(encodeSave(defaultProfile(), j)).journey.pending,
    "reward",
  );
  j.room = 3;
  assert.equal(
    decodeSave(encodeSave(defaultProfile(), j)).journey.pending,
    "victory",
  );
  j.player.hp = 0;
  assert.equal(decodeSave(encodeSave(defaultProfile(), j)).journey, null);
});
