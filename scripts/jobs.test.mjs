import test from "node:test";
import assert from "node:assert/strict";
import { resolveJobSkill, normalizedSecondary } from "../dist/jobs.js";
test("all four jobs expose their two primary skills", () => {
  for (const job of ["botanist", "chef", "trickster", "journalist"])
    for (const slot of [1, 2])
      assert.deepEqual(resolveJobSkill({ job }, slot), { job, skill: slot, abilityId: `${job}.skill${slot}` });
});
test("third skill is locked below level ten, cannot repeat primary, and selects either skill", () => {
  const p = {
    job: "trickster",
    secondaryJob: "journalist",
    secondarySkill: 2,
    level: 10,
  };
  assert.deepEqual(resolveJobSkill(p, 3), { job: "journalist", skill: 2, abilityId: "journalist.skill2" });
  assert.equal(resolveJobSkill({ ...p, level: 9 }, 3), null);
  assert.equal(resolveJobSkill({ ...p, secondaryJob: "trickster" }, 3), null);
  assert.equal(normalizedSecondary({ ...p, secondaryJob: "unknown" }), null);
});
