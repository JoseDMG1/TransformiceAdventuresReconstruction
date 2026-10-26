import test from "node:test";
import assert from "node:assert/strict";
import { makeScene } from "../dist/maps.js";
import { MAPS } from "../dist/map-data.js";

test("cart clearing removes matching trees and colliders without shifting other geometry", () => {
  // Geometry check only. Actual rendering is covered by the Chrome capture.
  const oldDocument = globalThis.document;
  const context = new Proxy({}, { get: () => () => {} });
  globalThis.document = { createElement: () => ({ getContext: () => context }) };
  const exclusions = MAPS.tutorial.decorationExclusions;
  const retained = [...exclusions];
  try {
    for (const seed of [0, 1, 10]) {
      exclusions.splice(0);
      const baseline = makeScene("tutorial", seed);
      exclusions.push(...retained);
      const current = makeScene("tutorial", seed);
      const fixed = new Set(MAPS.tutorial.fixedObjects.map(o => `${o.kind}:${o.x}:${o.y}`));
      const removed = baseline.objects.filter(o => !fixed.has(`${o.kind}:${o.x}:${o.y}`) && retained.some(a =>
        a.kinds.includes(o.kind) && o.x > a.left && o.x < a.right && o.y > a.top && o.y < a.bottom));
      assert.ok(removed.length > 0, "Fixture must include a blocking tree");
      assert.deepEqual(current.objects, baseline.objects.filter(o => !removed.includes(o)));
      const removedCollider = collider => removed.some(o =>
        collider.x === o.x && collider.y === o.y - 7 && collider.r === (o.kind === "tree" ? 25 : 24) * o.scale);
      assert.deepEqual(current.colliders, baseline.colliders.filter(c => !removedCollider(c)));
      assert.ok(current.objects.some(o => o.kind === "tutorialCart"));
    }
  } finally {
    exclusions.splice(0, exclusions.length, ...retained);
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
  }
});

test("every expedition route builds all ground variants without runtime errors", () => {
  const oldDocument=globalThis.document;
  const context=new Proxy({}, {get:()=>()=>{}});
  globalThis.document={createElement:()=>({getContext:()=>context})};
  try {
    for(const length of MAPS.dungeon.expedition.encounterCounts) {
      const scene=makeScene("dungeon",0,length);
      assert.equal(scene.routeAreas.length,length);
      assert.equal(scene.ground.width,scene.width);
      assert.equal(scene.ground.height,scene.height);
      assert.ok(scene.routeAreas.every(area=>Number.isFinite(area.spawn.x)));
    }
  } finally {
    if(oldDocument===undefined) delete globalThis.document;
    else globalThis.document=oldDocument;
  }
});

test("village ambience actors never create blank interaction targets",()=>{
  const oldDocument=globalThis.document,context=new Proxy({}, {get:()=>()=>{}});
  globalThis.document={createElement:()=>({getContext:()=>context})};
  try {
    const scene=makeScene("village");
    assert.ok(scene.npcs.some(actor=>actor.ambient));
    assert.ok(scene.interactables.some(actor=>actor.id==="papaille"));
    assert.ok(scene.interactables.some(actor=>actor.id==="mura"));
    assert.equal(scene.interactables.some(actor=>actor.ambient),false);
    assert.equal(scene.interactables.some(actor=>actor.text==="Hablar con "),false);
  } finally {
    if(oldDocument===undefined) delete globalThis.document;
    else globalThis.document=oldDocument;
  }
});
