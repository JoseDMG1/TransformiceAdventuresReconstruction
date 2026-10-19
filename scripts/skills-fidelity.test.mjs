import test from "node:test";
import assert from "node:assert/strict";
import { createBotanistSkills } from "../dist/skills/botanist.js";
import { createTricksterSkills } from "../dist/skills/trickster.js";

function fixture(gifts = {}) {
  const bursts = [];
  const noop = () => {};
  return { bursts,
    player: { x: 40, y: 75, angle: Math.PI, cardIndex: 0, lastCard: -1, skill1: 6, states: {} },
    profile: { petActive: false }, pet: { x: 40, y: 75 }, effects: [], projectiles: [], enemies: [],
    pointer: { aimed: true, x: 540, y: 75 }, screenToWorld: (x,y) => ({x,y}),
    giftEffect: key => gifts[key] || 0, bonus: () => 0, countGift: () => 0,
    distance: (a,b) => Math.hypot(a.x-b.x,a.y-b.y), nextFieldUid: () => 1,
    tone: noop, burst: (...args) => bursts.push(args), skillTarget: () => ({x: 250,y: 75}),
    healPlayer: noop, healPet: noop, grantBarrier: noop, spawnFX: noop, floating: noop, originalSound: noop,
  };
}

test("Pulgar Verde grows at the player's feet regardless of facing", () => {
  const context = fixture();
  createBotanistSkills(context).grow();
  assert.equal(context.effects[0].x, context.player.x);
  assert.equal(context.effects[0].y, context.player.y);
  assert.equal(context.effects[0].kind, "plant");
});

test("elixir launches a traveling flask, clamps range and does not explode before landing", () => {
  const context = fixture();
  createBotanistSkills(context).elixir({x: 1000, y: 75});
  const flask = context.effects[0];
  assert.equal(flask.kind, "flask");
  assert.equal(flask.x, 40);
  assert.equal(flask.landingX, 250);
  assert.equal(flask.flightElapsed, 0);
  assert.equal(context.bursts.length, 0);
});

test("diamonds stop at the first target unless Ajetreo expands the limit", () => {
  for (const [extra, expected] of [[0,1],[2,3]]) {
    const context = fixture({cardsDiamondTargets: extra});
    context.player.cardIndex = 2;
    createTricksterSkills(context).cards(1);
    assert.equal(context.projectiles[0].maxHits, expected);
    assert.equal(context.projectiles[0].cardKind, "stun");
  }
});

test("spade volley targets nearby living enemies without an undefined context dependency", () => {
  const context = fixture({cardsSpadeVolley: 1});
  context.enemies = [{uid: 1,x: 70,y: 75,hp: 20},{uid: 2,x: 1000,y: 75,hp: 20},
    {uid: 3,x: 80,y: 75,hp: 0},{uid: 4,x: 100,y: 75,hp: 20}];
  createTricksterSkills(context).cards(1);
  assert.equal(context.projectiles.length, 3);
  assert.deepEqual(context.projectiles.slice(1).map(p=>p.targetUid), [1,4]);
});

test("base clubs empower the next attack; Fanfarron switches to its damaging projectile", () => {
  const base = fixture(); base.player.cardIndex = 3;
  createTricksterSkills(base).cards(1);
  assert.equal(base.projectiles.length, 0);
  assert.equal(base.player.states.cardPower, 1);
  const modified = fixture({cardsClubRiskDamage: 1}); modified.player.cardIndex = 3;
  createTricksterSkills(modified).cards(1);
  assert.equal(modified.projectiles[0].cardSuit, "club");
  assert.ok(modified.player.states.clubStun > 0);
});
