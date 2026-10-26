import assert from "node:assert/strict";

export async function checkWeaponOverlays({evaluate,key,wait,shot,waitFor}) {
  async function trace() {
    return evaluate(`(async()=>{
      const proto=CanvasRenderingContext2D.prototype,draw=proto.drawImage,fill=proto.fill;
      const icons=[],segments=[];
      proto.drawImage=function(image,...args){
        if(image?.src?.includes('/weapon-overlays/')) {const m=this.getTransform();icons.push({file:image.src.split('/').pop(),width:image.naturalWidth,a:m.a,e:m.e,f:m.f});}
        return draw.call(this,image,...args);
      };
      proto.fill=function(...args){if(this.fillStyle==='#00e069') segments.push(this.globalAlpha);return fill.apply(this,args);};
      try{await new Promise(requestAnimationFrame);}
      finally{proto.drawImage=draw;proto.fill=fill;}
      return {icons,segments,snapshot:adventure.snapshot()};
    })()`);
  }
  await wait(350);
  const before=await trace();
  assert.deepEqual(before.snapshot.art.weaponOverlays,{ready:true,loaded:7});
  assert.deepEqual(before.icons.map(icon=>icon.file),["fond.png","a1.png","fond.png","a6.png"]);
  assert.ok(before.icons.every(icon=>icon.width===36&&Math.abs(icon.a-before.snapshot.view.zoom*.64)<1e-6));
  assert.equal(before.segments.filter(alpha=>alpha>.95).length,4);
  await shot("weapon-overlays-full");
  await key("KeyJ");
  await wait(100);
  await key("KeyJ","keyUp");
  await waitFor("adventure.snapshot().charges.sword.count===2","An actual attack must consume the displayed charge");
  await wait(600);
  const consumed=await trace();
  assert.equal(consumed.snapshot.charges.sword.count,2);
  assert.equal(consumed.segments.filter(alpha=>alpha>.95).length,3);
  await shot("weapon-overlays-consumed");
  await waitFor("adventure.snapshot().charges.sword.count===3","Charge must regenerate using existing simulation",4000);
  await wait(450);
  const restored=await trace();
  assert.equal(restored.segments.filter(alpha=>alpha>.95).length,4);
  return {before,consumed,restored};
}
