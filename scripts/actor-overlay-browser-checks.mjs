import assert from "node:assert/strict";

export async function checkActorOverlays({evaluate,shot}) {
  const report=await evaluate(`(async()=>{
    const draw=CanvasRenderingContext2D.prototype.drawImage,text=CanvasRenderingContext2D.prototype.fillText;
    const bars=[],names=[];
    CanvasRenderingContext2D.prototype.drawImage=function(image,...args){
      if(image?.src?.endsWith('/actor-overlays/c.png')) {
        const m=this.getTransform();bars.push({a:m.a,d:m.d,e:m.e,f:m.f,width:image.naturalWidth,height:image.naturalHeight});
      }
      return draw.call(this,image,...args);
    };
    CanvasRenderingContext2D.prototype.fillText=function(value,...args){
      if(value==='Papaille') names.push({font:this.font,color:this.fillStyle,stroke:this.strokeStyle,lineWidth:this.lineWidth});
      return text.call(this,value,...args);
    };
    try{await new Promise(resolve=>setTimeout(resolve,200));}
    finally{CanvasRenderingContext2D.prototype.drawImage=draw;CanvasRenderingContext2D.prototype.fillText=text;}
    const s=adventure.snapshot();return {assets:s.art.actorOverlays,zoom:s.view.zoom,bars:bars.slice(0,6),names:names.slice(0,3)};
  })()`);
  assert.equal(report.assets.ready,true);assert.equal(report.assets.loaded,6);
  assert.ok(report.bars.length>0,"Player health must be drawn in the village with original frame art");
  assert.ok(report.bars.every(bar=>Math.abs(bar.a-report.zoom*.64)<1e-6 && bar.width===104 && bar.height===14));
  assert.ok(report.names.some(name=>name.font.includes("19.2px")&&name.color==="#6c99d6"&&name.stroke==="#000000"&&name.lineWidth===4),
    "Papaille must use the recovered NPC name style with the local 0.8 adaptation");
  await shot("actor-overlays-village");
  return report;
}
