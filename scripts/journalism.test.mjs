import test from "node:test";
import assert from "node:assert/strict";
import { applyReportPoison, tickReportPoison, collectTestimony, consumeReport } from "../dist/journalism.js";
import { defaultProfile, encodeSave, decodeSave } from "../dist/persistence.js";

test("report poison preserves dagger poison and delivers its final pulse", () => {
  const enemy = { poison: 5, poisonDagger: true, poisonDamage: 8, poisonTicksRemaining: 5 };
  applyReportPoison(enemy, 6);
  let damage = 0;
  for (let i = 0; i < 81; i++) damage += tickReportPoison(enemy, 0.05);
  assert.equal(damage, 24);
  assert.equal(enemy.poisonDamage, 8);
  assert.equal(enemy.poisonDagger, true);
  assert.equal(enemy.poisonTicksRemaining, 5);
  assert.equal(tickReportPoison(enemy, 10), 0);
});

test("instant report poison leaves no delayed duplicate damage", () => {
  const enemy = {};
  applyReportPoison(enemy, 6);
  assert.equal(applyReportPoison(enemy, 6, true), 24);
  assert.equal(tickReportPoison(enemy, 20), 0);
});

test("death testimony occupies one note and reports require exactly two", () => {
  const notes = [];
  assert.equal(collectTestimony(notes, "death"), true);
  assert.equal(consumeReport(notes), null);
  assert.equal(collectTestimony(notes, "unknown"), false);
  assert.equal(collectTestimony(notes, "heal"), true);
  assert.equal(collectTestimony(notes, "fire"), false);
  assert.deepEqual(consumeReport(notes), ["death", "heal"]);
  assert.deepEqual(notes, []);
});

test("save roundtrip retains death effects, notes and independent poison clocks", () => {
  const profile = defaultProfile();
  const journey = { scene: "dungeon", player: { x: 650, y: 700, hp: 80, notebook: ["death", "heal"] },
    pet: { x: 600, y: 700 }, enemies: [{ type: "beetle", x: 800, y: 700, hp: 50, maxHp: 50,
      poison: 3, poisonDamage: 8, poisonDagger: true, reportPoisoned: 3.5,
      reportPoisonTicks: 4, reportPoisonTick: 0.5, reportPoisonDamage: 6 }],
    effects: [{ kind: "testimony", subtype: "death", x: 720, y: 700, life: 10, maxLife: 15 }], projectiles: [] };
  const saved = decodeSave(encodeSave(profile, journey)).journey;
  assert.deepEqual(saved.player.notebook, ["death", "heal"]);
  assert.equal(saved.effects[0].subtype, "death");
  assert.equal(saved.enemies[0].poisonDagger, true);
  assert.equal(saved.enemies[0].reportPoisonTick, 0.5);
  assert.equal(saved.enemies[0].reportPoisonTicks, 4);
  assert.equal(tickReportPoison(saved.enemies[0], 0.5), 6);
});
