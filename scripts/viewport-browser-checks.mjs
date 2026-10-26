import assert from "node:assert/strict";

export async function checkViewport({ evaluate, send, shot, waitFor }) {
  const original = await evaluate("({width:innerWidth,height:innerHeight})");
  await waitFor("Math.hypot(adventure.snapshot().view.x-adventure.snapshot().position.x,adventure.snapshot().view.y-adventure.snapshot().position.y)<.1",
    "Stationary camera must follow the player without map-edge displacement");
  const records = [];
  try {
    for (const [width,height,scale] of [[640,360,.5],[1280,720,1]]) {
      await send("Emulation.setDeviceMetricsOverride", {width,height,deviceScaleFactor:1,mobile:false});
      await waitFor(`innerWidth===${width} && adventure.snapshot().view.zoom===${scale}`, "Resize must use the original logical field of view");
      const record = await evaluate(`(async () => {
        const originalDraw = CanvasRenderingContext2D.prototype.drawImage;
        let transform = null;
        CanvasRenderingContext2D.prototype.drawImage = function(image,...args) {
          if (image.width===2200 && image.height===1500) {
            const m = this.getTransform(); transform={a:m.a,d:m.d,e:m.e,f:m.f};
          }
          return originalDraw.call(this,image,...args);
        };
        try { await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))); }
        finally { CanvasRenderingContext2D.prototype.drawImage=originalDraw; }
        const s=adventure.snapshot();
        return {width:innerWidth,height:innerHeight,view:s.view,position:s.position,transform};
      })()`);
      assert.ok(record.transform, "Village ground must be drawn on the real Canvas");
      assert.equal(record.transform.a,scale);
      assert.equal(record.transform.d,scale);
      assert.ok(Math.abs(record.transform.e-(width/2-record.view.x*scale))<.1);
      records.push(record);
      await shot(`viewport-${width}`);
    }
    assert.deepEqual(records[0].position,records[1].position,"Resizing cannot move the saved actor");
    assert.equal(records[0].width/records[0].view.zoom,records[1].width/records[1].view.zoom);
    assert.equal(records[0].height/records[0].view.zoom,records[1].height/records[1].view.zoom);
  } finally {
    await send("Emulation.setDeviceMetricsOverride", {...original,deviceScaleFactor:1,mobile:false});
    await waitFor(`innerWidth===${original.width} && innerHeight===${original.height}`, "Original test window must be restored");
  }
  return records;
}
