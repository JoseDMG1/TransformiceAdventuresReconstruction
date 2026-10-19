import test from "node:test";
import assert from "node:assert/strict";
import { createSkillSystem } from "../dist/skill-system.js";

test("generic skill availability and casting do not invent an invisibility cancellation rule", () => {
  const player = { states: {}, invisible: 3, x: 0, y: 0, angle: 0, skill2: 0 };
  const effects = [];
  const system = createSkillSystem({ player, profile: {job: "botanist"}, effects,
    mode: "playing", modalKind: "", $: () => ({hidden: true}),
    countGift: () => 0, bonus: () => 0, giftEffect: () => 0, tone: () => {}, nextFieldUid: () => 1 });
  assert.equal(system.canUse(2), true);
  assert.equal(player.invisible, 3);
  assert.equal(system.use(2), true);
  assert.equal(player.invisible, 3);
  assert.equal(effects[0].kind, "plant");
  player.invisible = 3;
  assert.equal(system.use(2), false);
  assert.equal(player.invisible, 3);
});
