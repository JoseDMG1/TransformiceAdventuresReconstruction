import assert from "node:assert/strict";
import fs from "node:fs/promises";

export async function checkArenaArt({evaluate}) {
  const result=await evaluate(`(async()=>{
    const {makeScene}=await import('./maps.js'),{MAPS}=await import('./map-data.js');
    const {decoration}=await import('./art.js');
    const before=localStorage.getItem('tfma-local-v1');
    const arena=MAPS.dungeon.expedition.areas.find(area=>area.id==='pond-arena');
    const original=[...arena.dressing],checks=[];
    let scene;
    try {
      for(const length of MAPS.dungeon.expedition.encounterCounts) {
        const current=makeScene('dungeon',0,length);
        arena.dressing.splice(0,arena.dressing.length,...original.filter(o=>!['bluebellPatch','daisyPatch'].includes(o.kind)));
        const previous=makeScene('dungeon',0,length);
        checks.push({length,collidersIdentical:JSON.stringify(current.colliders)===JSON.stringify(previous.colliders),
          added:current.objects.length-previous.objects.length});
        arena.dressing.splice(0,arena.dressing.length,...original);
        if(length===3) scene=current;
      }
    } finally {arena.dressing.splice(0,arena.dressing.length,...original);}
    const canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;
    const context=canvas.getContext('2d');
    const area=scene.routeAreas.at(-1),camera={x:area.offsetX+1050,y:650,zoom:.5};
    context.fillStyle=scene.backgroundColor;context.fillRect(0,0,640,360);
    context.save();context.translate(320,180);context.scale(.5,.5);context.translate(-camera.x,-camera.y);
    context.drawImage(scene.ground,0,0);
    scene.objects.filter(o=>o.x>camera.x-800&&o.x<camera.x+800).sort((a,b)=>a.y-b.y).forEach(object=>decoration(context,object));
    context.restore();
    const panorama=canvas.toDataURL('image/png').split(',')[1];
    const gallery=document.createElement('canvas');gallery.width=640;gallery.height=360;
    const g=gallery.getContext('2d');g.fillStyle=scene.backgroundColor;g.fillRect(0,0,640,360);
    for(let index=0;index<4;index++) {
      decoration(g,{kind:index<2?'bluebellPatch':'daisyPatch',x:80+index*155,y:305,scale:.9,variant:index+1});
    }
    return {checks,camera,width:640,height:360,profileUnchanged:before===localStorage.getItem('tfma-local-v1'),
      panorama,gallery:gallery.toDataURL('image/png').split(',')[1]};
  })()`);
  assert.ok(result.profileUnchanged);
  assert.ok(result.checks.every(check=>check.collidersIdentical&&check.added===9));
  await fs.writeFile('.local/arena-scenery.png',Buffer.from(result.panorama,'base64'));
  await fs.writeFile('.local/arena-flora.png',Buffer.from(result.gallery,'base64'));
  const {panorama,gallery,...report}=result;
  return report;
}
