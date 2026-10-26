import test from "node:test";
import assert from "node:assert/strict";
import {
  WEAPONS,
  createAttack,
  advanceAttack,
  incomingDamage,
  inAttackArc,
} from "../dist/combat.js";
test("melee weapons hit after windup exactly once, including resumed actions", () => {
  for (const id of ["sword", "dagger", "greatsword"]) {
    const a = createAttack(id, 0);
    assert.equal(advanceAttack(a, WEAPONS[id].windup * 0.5).impact, false);
    const saved = JSON.parse(JSON.stringify(a));
    assert.equal(advanceAttack(saved, WEAPONS[id].windup).impact, true);
    assert.equal(advanceAttack(saved, 1).impact, false);
    assert.equal(advanceAttack(saved, 1).finished, true);
  }
});
test("held bow does not fire; release waits 150 ms and cannot duplicate after resume", () => {
  const action = createAttack("bow", 0);
  assert.equal(advanceAttack(action, WEAPONS.bow.windup).impact, false);
  assert.equal(advanceAttack(action, 1).impact, false);
  action.released = true;
  action.releaseElapsed = 0;
  const saved = JSON.parse(JSON.stringify(action));
  assert.equal(advanceAttack(saved, 0.149).impact, false);
  assert.equal(advanceAttack(saved, 0.002).impact, true);
  assert.equal(advanceAttack(saved, 1).impact, false);
  assert.equal(advanceAttack(saved, 0).finished, true);
});
test("shield protects the aimed front, not the rear or an unknown origin", () => {
  const p = { x: 0, y: 0, angle: 0, guarding: true };
  assert.deepEqual(incomingDamage(20, p, { x: 50, y: 0 }), {
    amount: 3,
    blocked: true,
  });
  assert.deepEqual(incomingDamage(20, p, { x: -50, y: 0 }), {
    amount: 20,
    blocked: false,
  });
  assert.equal(
    incomingDamage(20, { ...p, guarding: false }, { x: 50, y: 0 }).amount,
    20,
  );
  assert.equal(incomingDamage(20, p, null).blocked, false);
});
test("dagger range and greatsword reach/arc differ meaningfully", () => {
  const p = { x: 0, y: 0 },
    e = { x: 120, y: 0 };
  assert.equal(inAttackArc(p, e, 0, "dagger"), false);
  assert.equal(inAttackArc(p, e, 0, "greatsword"), true);
  assert.equal(inAttackArc(p, { x: -40, y: 0 }, 0, "sword"), false);
});
