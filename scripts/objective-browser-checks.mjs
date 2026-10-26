import assert from "node:assert/strict";

export async function checkObjectiveMotion({ evaluate, tap, wait, waitFor }) {
  await tap("KeyI");
  await wait(100); // Hidden indicator resets its transient interpolation state.
  await evaluate(`(() => {
    const original = CanvasRenderingContext2D.prototype.drawImage;
    window.__objectiveTrace = { samples: [], original };
    CanvasRenderingContext2D.prototype.drawImage = function(image, ...args) {
      if (image?.src?.endsWith('/interface/fleche.png')) {
        const m = this.getTransform();
        window.__objectiveTrace.samples.push({ x: m.e, y: m.f, at: performance.now() });
      }
      return original.call(this, image, ...args);
    };
  })()`);
  let result;
  try {
    await tap("Escape");
    await waitFor("window.__objectiveTrace.samples.length >= 12", "Objective arrow must render its movement");
    result = await evaluate(`(async () => {
      const { objectiveProjection } = await import('./objectives.js');
      const s = adventure.snapshot();
      return { samples: window.__objectiveTrace.samples.slice(0, 12), width: innerWidth, height: innerHeight,
        target: objectiveProjection(s.objective, s.view, s.view.zoom, innerWidth, innerHeight, s.position) };
    })()`);
  } finally {
    await evaluate(`(() => {
      CanvasRenderingContext2D.prototype.drawImage = window.__objectiveTrace.original;
      delete window.__objectiveTrace;
    })()`);
  }
  assert.equal(result.target.mode, "edge");
  const distance = p => Math.hypot(p.x - result.target.x, p.y - result.target.y);
  assert.ok(distance(result.samples[0]) > 10, "Arrow must not jump straight to edge");
  for (let i = 1; i < result.samples.length; i++) {
    assert.ok(distance(result.samples[i]) < distance(result.samples[i - 1]), "Rendered arrow must approach the edge");
    assert.ok(result.samples[i].x >= 0 && result.samples[i].x <= result.width);
    assert.ok(result.samples[i].y >= 0 && result.samples[i].y <= result.height);
  }
  return result;
}
