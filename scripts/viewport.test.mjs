import test from "node:test";
import assert from "node:assert/strict";
import { logicalViewport } from "../dist/viewport.js";

test("reference and desktop resolutions share the same logical field of view", () => {
  for (const [width, height, scale] of [[640,360,.5],[1280,720,1],[3840,2160,2]]) {
    const viewport = logicalViewport(width, height);
    const expected = width === 3840 ? [1920,1080] : [1280,720];
    assert.deepEqual([viewport.width,viewport.height],expected);
    assert.equal(viewport.scale,scale);
    assert.equal(viewport.scaleX,scale);
    assert.equal(viewport.scaleY,scale);
  }
});

test("landscape, portrait and square follow original min/max axis and rounding", () => {
  assert.deepEqual(logicalViewport(360,640),{width:720,height:1280,scaleX:.5,scaleY:.5,scale:.5});
  assert.equal(logicalViewport(801,601).height,Math.floor(601/(801/1280)));
  assert.equal(logicalViewport(2048,1025).height,Math.ceil(1025/(2048/1920)));
  assert.equal(logicalViewport(1280,800).scale,1);
  assert.equal(logicalViewport(1920,1080).scale,1);
  assert.equal(logicalViewport(800,800).width,1280);
  assert.equal(logicalViewport(800,800).height,1280);
});
