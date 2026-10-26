import assert from "node:assert/strict";

export async function beginHealthTrace({evaluate}) {
  await evaluate(`(()=>{
    const prototype=CanvasRenderingContext2D.prototype,draw=prototype.drawImage,fill=prototype.fillRect;
    const records={fills:[],halos:[]};
    function petBar(context) {
      if(context.canvas.id!=='world') return false;
      const s=adventure.snapshot(),m=context.getTransform();
      const y=(s.pet.y-s.view.y-40)*s.view.zoom+innerHeight/2;
      return Math.abs(m.f-y)<.001&&Math.abs(m.a-s.view.zoom*.64)<.000001;
    }
    prototype.fillRect=function(x,y,width,height){
      if(x===0&&y===0&&height===10&&this.fillStyle instanceof CanvasPattern&&petBar(this)&&records.fills.length<500)
        records.fills.push({time:performance.now(),width});
      return fill.call(this,x,y,width,height);
    };
    prototype.drawImage=function(image,...args){
      if(image?.src?.endsWith('/actor-overlays/tv.png')&&petBar(this)&&records.halos.length<500)
        records.halos.push({time:performance.now(),alpha:this.globalAlpha});
      return draw.call(this,image,...args);
    };
    window.__finishHealthTrace=()=>{prototype.fillRect=fill;prototype.drawImage=draw;return records;};
  })()`);
}
export async function finishHealthTrace({evaluate,wait,shot}) {
  await wait(1500);
  const report=await evaluate("window.__finishHealthTrace()");
  assert.ok(report.fills.some(record=>record.width>0&&record.width<99),"Pet health must interpolate through partial Canvas widths");
  assert.ok(report.halos.some(record=>record.alpha>0),"Healing must actually draw the recovered halo texture");
  await shot("health-overlay-healed");
  return report;
}
export async function traceEnemyHealth({evaluate}) {
  return evaluate(`(async()=>{
    const prototype=CanvasRenderingContext2D.prototype,draw=prototype.drawImage,bars=[];
    prototype.drawImage=function(image,...args){
      if(this.canvas.id==='world'&&image?.src?.endsWith('/actor-overlays/c.png')) {
        const m=this.getTransform(),zoom=adventure.snapshot().view.zoom;
        if(Math.abs(m.a-zoom*.42)<.000001||Math.abs(m.a-zoom*.95)<.000001) bars.push({scale:m.a,zoom});
      }
      return draw.call(this,image,...args);
    };
    try{await new Promise(requestAnimationFrame);}finally{prototype.drawImage=draw;}
    return bars;
  })()`);
}
