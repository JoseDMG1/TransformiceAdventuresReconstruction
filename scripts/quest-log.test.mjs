import test from "node:test";
import assert from "node:assert/strict";
import { createQuestLog, createQuestTracker } from "../dist/quest-log.js";
import { describeQuests } from "../dist/quest-data.js";

test("independent objectives prepend, validate and remain checked until removed", () => {
  const log = createQuestLog();
  log.add({ id: "first", text: "Primero" });
  log.add({ id: "second", text: "Segundo" });
  log.tick(0);
  assert.deepEqual(log.snapshot().map(r => r.id), ["first"]);
  log.tick(500); // Original uses TEMPS > prochaineBoucle, not >=.
  assert.equal(log.snapshot().length, 1);
  log.tick(501);
  assert.deepEqual(log.snapshot().map(r => r.id), ["second", "first"]);
  log.validate("first");
  log.tick(1002);
  assert.equal(log.snapshot().find(r => r.id === "first").validated, true);
  assert.equal(log.snapshot().find(r => r.id === "second").validated, false);
  log.tick(4000);
  assert.equal(log.snapshot().find(r => r.id === "first").validated, true);
  assert.equal(log.snapshot().length, 2, "Validation must not remove or replace another row");
  log.remove("second");
  log.tick(4501);
  assert.equal(log.snapshot()[0].phase, "leaving");
  log.tick(6000);
  assert.equal(log.snapshot().length, 2);
  log.tick(6001);
  assert.deepEqual(log.snapshot().map(r => r.id), ["first"]);
});

test("marker belongs to the first added positioned objective, independently of row order", () => {
  const log = createQuestLog();
  log.add({ id: "a", text: "A", target: { x: 10, y: 20 } });
  log.add({ id: "b", text: "B", target: { x: 100, y: 200 } });
  log.tick(0);
  log.tick(501);
  assert.deepEqual(log.target(), { x: 10, y: 20 });
  log.updateTarget("a", { x: 12, y: 22 });
  assert.deepEqual(log.target(), { x: 12, y: 22 });
  log.validate("a");
  log.tick(1002);
  assert.deepEqual(log.target(), { x: 12, y: 22 });
  log.remove("a");
  log.tick(1503);
  assert.equal(log.target(), null, "Original does not automatically select an existing second marker");
  log.add({ id: "c", text: "C", target: { x: 1, y: 2 } });
  log.tick(2004);
  assert.deepEqual(log.target(), { x: 1, y: 2 });
});

test("rapid removal and reuse of an ID keeps event identities and isolated snapshots", () => {
  const log = createQuestLog();
  log.add({ id: "same", text: "Old", target: { x: 1, y: 2 } });
  log.validate("same");
  log.remove("same");
  log.add({ id: "same", text: "New", target: { x: 3, y: 4 } });
  for (const now of [0, 501, 1002, 1503]) log.tick(now);
  const rows = log.snapshot();
  assert.equal(rows.length, 2);
  assert.notEqual(rows[0].key, rows[1].key);
  assert.equal(rows[0].validated, false);
  assert.equal(rows[1].validated, true);
  rows[0].text = "Mutated";
  rows[0].target.x = -1;
  assert.equal(log.snapshot()[0].text, "New");
  assert.equal(log.target().x, 3);
  log.tick(2502);
  assert.deepEqual(log.snapshot().map(r => r.text), ["New"]);
});

test("scene reset cancels queued additions, removals and old markers", () => {
  const tracker = createQuestTracker();
  tracker.reconcile([{ id: "old", text: "Old", target: { x: 1, y: 2 } }]);
  tracker.tick(0);
  tracker.reconcile([{ id: "temp", text: "Temporary" }]);
  tracker.reconcile([{ id: "new", text: "Reanudada" }], { reset: true });
  tracker.tick(100);
  tracker.tick(10000);
  assert.deepEqual(tracker.snapshot().map(r => r.id), ["new"]);
  assert.equal(tracker.snapshot()[0].validated, false);
  assert.equal(tracker.target(), null);
});

test("only explicit completion checks a removed instruction; repeated updates do not requeue", () => {
  const tracker = createQuestTracker();
  tracker.reconcile([{ id: "a", text: "A" }]);
  tracker.tick(0);
  for (let i = 0; i < 100; i++) tracker.reconcile([{ id: "a", text: "A revisado" }]);
  tracker.reconcile([{ id: "b", text: "B" }]);
  tracker.tick(501);
  assert.equal(tracker.snapshot()[0].phase, "leaving");
  assert.equal(tracker.snapshot()[0].validated, false);
  tracker.tick(1002);
  tracker.reconcile([{ id: "c", text: "C" }], { completePrevious: true });
  tracker.tick(1503);
  assert.equal(tracker.snapshot().find(r => r.id === "b").validated, true);
  tracker.tick(2004);
  assert.equal(tracker.snapshot().find(r => r.id === "b").phase, "leaving");
  tracker.tick(2505);
  assert.equal(tracker.snapshot()[0].id, "c");
});

test("content retains known instructions and targets without inventing simultaneous quests", () => {
  const context = { scene: { kind: "tutorial" }, pet: { x: 12, y: 34 },
    profile: { expeditions: 0 }, tutorialPhase: 0, rescueInstructions: "Cura a Picpic." };
  let result = describeQuests(context);
  assert.equal(result.objectives[0].text, "Cura a Picpic.");
  assert.equal(result.objectives[0].target, null, "Initial video shows an empty pet health bar, not a navigation ring");
  result = describeQuests({ ...context, tutorialPhase: 1, scene: { kind: "tutorial", npcs: [{ id: "papaille", x: 50, y: 60 }] } });
  assert.equal(result.objectives[0].text, "Habla con Papaille.");
  assert.equal(result.objectives[0].target.x, 50);
  result = describeQuests({ ...context, scene: { kind: "dungeon" }, step: 1, room: 0,
    encounterCount: 3, encounterStarted: true, encounterAwarded: false, papailleClueDialogue: "axe" });
  assert.equal(result.objectives.length, 1);
  assert.equal(result.objectives[0].id, "dungeon:papaille:axe");
  assert.equal(result.objectives[0].target, null);
});

test("addition announces once after its slide; validation emits a separate event", () => {
  const log = createQuestLog();
  log.add({ id: "a", text: "A" });
  assert.deepEqual(log.tick(0), []);
  assert.deepEqual(log.tick(1499), []);
  assert.deepEqual(log.tick(1500), [{ type: "announced", id: "a", text: "A" }]);
  assert.deepEqual(log.tick(1501), []);
  log.validate("a");
  assert.deepEqual(log.tick(2000), [{ type: "validated", id: "a", text: "A" }]);
  assert.deepEqual(log.tick(4000), []);
  log.reset();
  assert.deepEqual(log.tick(10000), []);
});
