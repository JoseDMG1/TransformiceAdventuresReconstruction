import test from "node:test";
import assert from "node:assert/strict";
import { objectiveProjection, originalInterfaceScale } from "../dist/objectives.js";

test("distant objectives reach every screen edge even at 640x360", () => {
  for (const [width, height] of [[640, 360], [1280, 800], [360, 640]]) {
    for (const target of [{ x: 2000, y: 0 }, { x: -2000, y: 0 }, { x: 0, y: 2000 }, { x: 0, y: -2000 }, { x: 2000, y: 2000 }]) {
      const marker = objectiveProjection(target, { x: 0, y: 0 }, 1, width, height);
      assert.equal(marker.mode, "edge");
      assert.ok(marker.x === 0 || marker.x === width || marker.y === 0 || marker.y === height);
      assert.ok(marker.x >= 0 && marker.x <= width && marker.y >= 0 && marker.y <= height);
    }
  }
});

test("near targets use ground marker and direction follows player when camera is clamped", () => {
  const camera = { x: 500, y: 500 }, player = { x: 800, y: 500 };
  assert.deepEqual(objectiveProjection({ x: 820, y: 500 }, camera, .65, 640, 360, player),
    { mode: "ground", x: 528, y: 180 });
  const marker = objectiveProjection({ x: 800, y: -500 }, camera, .65, 640, 360, player);
  assert.equal(marker.mode, "edge");
  assert.equal(marker.angle, -Math.PI / 2);
  assert.equal(marker.y, 0);
  assert.equal(objectiveProjection(null, camera, 1, 640, 360), null);
});

test("interface scale follows recovered minimum and maximum logical sizes", () => {
  assert.equal(originalInterfaceScale(640, 360), .5);
  assert.equal(originalInterfaceScale(1280, 800), 1);
  assert.equal(originalInterfaceScale(1920, 1080), 1);
  assert.equal(originalInterfaceScale(3840, 2160), 2);
  assert.equal(originalInterfaceScale(360, 640), .5);
});
