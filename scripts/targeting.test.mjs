import test from "node:test";
import assert from "node:assert/strict";
import { createTargetingSystem, skillTargeting } from "../dist/targeting.js";

test("selection and cancellation do not cast; confirmation clamps from the current origin", () => {
  const casts = []; let origin = { x: 0, y: 0 };
  const targeting = createTargetingSystem({ canUse: () => true,
    resolve: () => ({ mode: "circle", range: 100, radius: 20 }), origin: () => origin,
    cast: (slot, point) => { casts.push({slot, point}); return true; } });
  targeting.request(1);
  assert.equal(casts.length, 0);
  assert.equal(targeting.cancel(), true);
  assert.equal(targeting.confirm({x: 500, y: 0}), false);
  targeting.request(2); origin = { x: 50, y: 0 };
  targeting.confirm({ x: 500, y: 0 });
  assert.deepEqual(casts, [{ slot: 2, point: { x: 150, y: 0 } }]);
  assert.equal(targeting.pending, null);
});

test("report collects immediately until full; hearts and secondary abilities select the right area", () => {
  const player = { notebook: [], cardIndex: 1 };
  assert.equal(skillTargeting({job: "journalist"}, player, 1), null);
  player.notebook = ["death", "heal"];
  assert.equal(skillTargeting({job: "journalist"}, player, 1).mode, "circle");
  assert.equal(skillTargeting({job: "trickster"}, player, 1).radius, 160);
  assert.equal(skillTargeting({job: "chef", level: 10, secondaryJob: "botanist", secondarySkill: 1}, player, 3).range, 210);
});

test("unavailable skills never create a cursor or cast", () => {
  const system = createTargetingSystem({ canUse: () => false, resolve: () => { throw Error("unavailable"); }, cast: () => { throw Error("unavailable"); } });
  assert.equal(system.request(1), false);
  assert.equal(system.pending, null);
});
