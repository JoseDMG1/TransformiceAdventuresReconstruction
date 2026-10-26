import assert from "node:assert/strict";

export async function checkVillageReference({ evaluate, send, key, shot, wait, waitFor }) {
  assert.equal(await evaluate("adventure.snapshot().scene"),"village");
  // Local pose chosen so board ground anchor projects close to (326,117) in
  // the 03:00 video frame. These are comparison coordinates, not server data.
  const destination={x:853,y:736};
  const walkTo=async(destination,label)=>{
    const held=new Set();
    try {
    for(let attempt=0;attempt<240;attempt++) {
      const position=await evaluate("adventure.snapshot().position");
      const dx=destination.x-position.x,dy=destination.y-position.y;
      if(Math.hypot(dx,dy)<5) break;
      const next=new Set();
      if(Math.abs(dx)>3) next.add(dx>0?"KeyD":"KeyA");
      if(Math.abs(dy)>3) next.add(dy>0?"KeyS":"KeyW");
      for(const code of held) if(!next.has(code)) {await key(code,"keyUp");held.delete(code);}
      for(const code of next) if(!held.has(code)) {await key(code);held.add(code);}
      await wait(30);
    }
    } finally {for(const code of held) await key(code,"keyUp");}
    await waitFor(`Math.hypot(adventure.snapshot().position.x-${destination.x},adventure.snapshot().position.y-${destination.y})<6`,
      `${label} must remain reachable by normal movement`);
  };
  await walkTo(destination,"The board comparison pose");
  await waitFor("Math.hypot(adventure.snapshot().view.x-adventure.snapshot().position.x,adventure.snapshot().view.y-adventure.snapshot().position.y)<.2",
    "Reference capture needs a settled camera");
  await waitFor("!document.getElementById('announcements').textContent && adventure.snapshot().questNotices.length===0",
    "Reference capture needs a clear scene",10000);
  const state=await evaluate("adventure.snapshot()");
  assert.ok(Math.abs(state.position.x-destination.x)<15);
  await shot("village-board-reference");
  await key("KeyW");
  try {await waitFor("adventure.snapshot().position.y<690","The board must be approachable",3000);}
  finally {await key("KeyW","keyUp");}
  await key("KeyE");await key("KeyE","keyUp");
  await waitFor("adventure.snapshot().modal==='dungeon'","Board interaction must still open expedition selection");
  await key("Escape");await key("Escape","keyUp");
  const npcs=await evaluate("(async()=>{const {MAPS}=await import('./map-data.js');return MAPS.village.npcs.filter(n=>!n.ambient);})()");
  for(const id of ["papaille","mura","scarf"]) {
    const npc=npcs.find(n=>n.character===id);
    const approach=id==="scarf" ? {x:npc.x-80,y:npc.y-30} : {x:npc.x,y:npc.y+105};
    await walkTo(approach,id);
    await waitFor(`!document.getElementById('interaction').hidden && document.querySelector('#interaction span').textContent.toLowerCase().includes('${id}')`,
      `${id} must have a reachable named interaction`);
    await key("KeyE");await key("KeyE","keyUp");
    if(id==="mura") {
      await waitFor("adventure.snapshot().modal==='profile'","Mura must open job selection");
      await key("Escape");await key("Escape","keyUp");
    } else {
      await waitFor("!document.getElementById('dialogue').hidden",`${id} must speak`);
      for(let page=0;page<12 && !(await evaluate("document.getElementById('dialogue').hidden"));page++) {
        await key("KeyE");await key("KeyE","keyUp");
      }
      assert.equal(await evaluate("document.getElementById('dialogue').hidden"),true);
    }
  }
  return {view:state.view,position:state.position,target:state.objective,
    boardInteraction:true,npcInteractions:["papaille","mura","scarf"],
    width:await evaluate("innerWidth"),height:await evaluate("innerHeight")};
}
