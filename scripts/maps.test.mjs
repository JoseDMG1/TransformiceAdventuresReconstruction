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
      const removed = baseline.objects.filter(o => retained.some(a =>
        a.kinds.includes(o.kind) && o.x > a.left && o.x < a.right && o.y > a.top && o.y < a.bottom));
      assert.ok(removed.length > 0, "Fixture must include a blocking tree");
      assert.deepEqual(current.objects, baseline.objects.filter(o => !removed.includes(o)));
      const removedCollider = collider => removed.some(o =>
        collider.x === o.x && collider.y === o.y - 7 && collider.r === 25 * o.scale);
      assert.deepEqual(current.colliders, baseline.colliders.filter(c => !removedCollider(c)));
      assert.ok(current.objects.some(o => o.kind === "tutorialCart"));
    }
  } finally {
    exclusions.splice(0, exclusions.length, ...retained);
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
  }
});
