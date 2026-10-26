import assert from "node:assert/strict";
import { defaultProfile, encodeSave } from "../dist/persistence.js";

export async function checkBowResume({ evaluate, send, reloadAndContinue, key, wait, waitFor, shot }) {
  const profile = { ...defaultProfile(), tutorial: true, weapon: "bow", secondary: "bandage" };
  const seed = async (action, legacy = false) => {
    const text = encodeSave(profile, { scene: "dungeon", seed: 1, room: 0, step: 1, gifts: [],
      tutorialPhase: 0, player: { x: 300, y: 640, hp: 100, action },
      pet: { x: 260, y: 680 }, enemies: [{ type: "beetle", x: 1800, y: 640, hp: 50, maxHp: 50 }],
      effects: [], projectiles: [] });
    const data = JSON.parse(text);
    if (legacy) {
      delete data.journey.player.action.released;
      delete data.journey.player.action.releaseElapsed;
    }
    const script = await send("Page.addScriptToEvaluateOnNewDocument", {
      source: `localStorage.setItem('tfma-local-v1', ${JSON.stringify(JSON.stringify(data))})`,
    });
    try { await reloadAndContinue(); }
    finally { await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: script.identifier }); }
  };
  const base = { weapon: "bow", angle: 0, elapsed: 0.14, hit: true, released: true, releaseElapsed: 0.4 };
  await seed(base);
  await waitFor("adventure.snapshot().action === null", "Restored hit must finish without a key press");
  assert.equal(await evaluate("adventure.snapshot().projectiles.length"), 0, "Restored hit cannot shoot twice");
  await key("KeyJ");
  await wait(350);
  await key("KeyJ", "keyUp");
  await waitFor("adventure.snapshot().projectiles.some(p => !p.enemy)", "A fresh bow attack must still fire");
  await shot("bow-restored");
  await waitFor("adventure.snapshot().action === null", "Fresh shot must also finish");
  await seed(base, true);
  await waitFor("adventure.snapshot().action === null", "Legacy bow hit must recover and finish");
  assert.equal(await evaluate("adventure.snapshot().projectiles.length"), 0);
  await seed({ ...base, hit: false, releaseElapsed: 0.05 });
  await waitFor("adventure.snapshot().projectiles.some(p => !p.enemy)", "Restored pending release must fire once");
  assert.equal(await evaluate("adventure.snapshot().projectiles.filter(p => !p.enemy).length"), 1);
  await waitFor("adventure.snapshot().action === null", "Restored pending release must finish");
  await waitFor("adventure.snapshot().projectiles.every(p => p.enemy)", "The one restored arrow must expire");
  await wait(250);
  assert.equal(await evaluate("adventure.snapshot().projectiles.filter(p => !p.enemy).length"), 0);
  return { restoredHitFinishes: true, legacyHitFinishes: true, pendingReleaseFiresOnce: true, freshAttackWorks: true };
}
