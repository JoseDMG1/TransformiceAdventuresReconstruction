import test from "node:test";
import assert from "node:assert/strict";
import { TALENT_TREES, talentSpent, canLearnTalent, learnTalent, talentBonus, normalizeTalentBuild } from "../dist/talents.js";

test("all trees reproduce six slots with original prices and four tiers", () => {
  assert.equal(TALENT_TREES.length, 14);
  for (const tree of TALENT_TREES) {
    assert.deepEqual(tree.nodes.map(node => node.cost), [1, 2, 2, 3, 4, 4]);
    assert.deepEqual(tree.nodes.map(node => node.tier), [0, 1, 1, 2, 3, 3]);
  }
});
test("prerequisites and shared legacy budget prevent skipping or overspending", () => {
  const profile = { level: 4, talents: { vigor: 1 }, talentBuild: {} };
  assert.equal(canLearnTalent(profile, "sword", 3).allowed, false);
  assert.equal(learnTalent(profile, "sword", 0).allowed, true);
  assert.equal(learnTalent(profile, "sword", 2).allowed, true);
  assert.equal(canLearnTalent(profile, "sword", 3).allowed, false);
  assert.equal(canLearnTalent(profile, "bow", 0).allowed, false);
  assert.deepEqual(profile.talents, { vigor: 1 });
});
test("demo-locked final tier stays unavailable while middle specialization remains free", () => {
  const profile = { level: 10, talentBuild: { sword: [0, 1, 3] } };
  assert.deepEqual(canLearnTalent(profile, "sword", 2), { allowed: true, reason: "Cambiar especialización gratis", cost: 0 });
  learnTalent(profile, "sword", 2);
  assert.deepEqual(profile.talentBuild.sword, [0, 2, 3]);
  assert.equal(talentBonus(profile, "swordRange"), 0);
  assert.equal(talentBonus(profile, "swordTargets"), 1);
  assert.deepEqual(canLearnTalent(profile, "sword", 4), { allowed: false, reason: "No disponible en esta demo", cost: 4 });
  assert.deepEqual(learnTalent(profile, "sword", 5), { allowed: false, reason: "No disponible en esta demo", cost: 4 });
  assert.deepEqual(profile.talentBuild.sword, [0, 2, 3]);
  assert.equal(talentSpent(profile.talentBuild), 6);
});
test("import normalization removes unknowns, duplicate pairs and impossible prerequisites deterministically", () => {
  const input = { sword: [5, 4, 3, 2, 1, 0, 0, 99, "0"], bow: [3], unknown: [0] };
  assert.deepEqual(normalizeTalentBuild(input, 10), { sword: [0, 1, 3, 4] });
  assert.deepEqual(normalizeTalentBuild(input, 3), { sword: [0, 1] });
  assert.deepEqual(normalizeTalentBuild({ sword: [2, 3, 5] }, 20), {});
  assert.deepEqual(normalizeTalentBuild(null, NaN), {});
  assert.deepEqual(input.bow, [3]);
});
test("invalid selections never mutate a profile, and bonuses honor level budget", () => {
  const profile = { level: 1, talentBuild: { sword: [0, 1, 3, 4] } };
  const before = structuredClone(profile);
  for (const [tree, index] of [["unknown", 0], ["sword", -1], ["sword", "1"], ["sword", 0]])
    assert.equal(learnTalent(profile, tree, index).allowed, false);
  assert.deepEqual(profile, before);
  assert.equal(talentBonus(profile, "swordCharges"), 1);
  assert.equal(talentBonus(profile, "swordRange"), 0);
});
