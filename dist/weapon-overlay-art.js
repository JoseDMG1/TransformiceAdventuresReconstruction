// ArmeADV.recupClipIcone / majClipCharge, ClipNomADV.majArme.
// Rendering state stays outside actors, charge simulation and persistence.
const weaponTypes=Object.freeze({sword:1,greatsword:2,dagger:3,shield:4,bow:5,bandage:6});
const images=new Map(),actors=new WeakMap();
let loading;
export function loadWeaponOverlayArt() {
  return loading ??= Promise.all(["fond",...Object.values(weaponTypes).map(type=>`a${type}`)].map(name=>new Promise(resolve=>{
    const image=new Image();image.onload=()=>{images.set(name,image);resolve();};image.onerror=()=>resolve();
    image.src=`assets/original/interface/weapon-overlays/${name}.png`;
  }))).then(()=>({ready:images.size===7,loaded:images.size}));
}
function updateSegment(segment,visible,locked,elapsed) {
  const target=visible?1:0;
  if(segment.target!==target) {
    segment.target=target;segment.alpha=visible?0:1;segment.scale=visible?.5:1;
  }
  const blend=1-Math.pow(.8,Math.max(0,elapsed)/16);
  segment.alpha+=(target-segment.alpha)*blend;
  segment.scale+=((visible?1:1.5)-segment.scale)*blend;
  segment.color=locked?"#ff8500":"#00e069";
}
function drawSegment(context,index,max,segment) {
  if(segment.alpha<.001) return;
  const gap=Math.PI/20,length=(Math.PI*2-gap*max)/max;
  const start=(length+gap)*index-(Math.PI/2-gap/2),end=start+length;
  context.save();context.translate(18,18);context.scale(segment.scale,segment.scale);
  context.globalAlpha*=segment.alpha;context.lineWidth=1;
  context.strokeStyle="rgba(0,0,0,.7)";context.fillStyle=segment.color;
  context.beginPath();context.arc(0,0,18,start,end);context.arc(0,0,13,end,start,true);context.closePath();
  context.fill();context.stroke();context.restore();
}
export function drawWeaponOverlays(context,{actor,x=actor.x,y=actor.y,width=64,offset=100,weapons,time=performance.now()}) {
  if(!images.has("fond")||!actor||!Number.isFinite(x)||!Number.isFinite(y)) return;
  let state=actors.get(actor);
  if(!state) {state={last:time,slots:[]};actors.set(actor,state);}
  const elapsed=Math.min(100,Math.max(0,time-state.last));state.last=time;
  context.save();context.translate(x,y-offset);context.scale(width/100,width/100);
  weapons.forEach((weapon,slot)=>{
    const icon=images.get(`a${weaponTypes[weapon.type]}`),max=Math.floor(weapon.max);
    if(!icon||!(max>0)||max>=40) return;
    let entry=state.slots[slot];
    if(!entry||entry.type!==weapon.type||entry.segments.length!==max) {
      entry={type:weapon.type,segments:Array.from({length:max},()=>({target:null,alpha:0,scale:.5}))};state.slots[slot]=entry;
    }
    context.save();context.translate(-38+slot*40,15);
    context.drawImage(images.get("fond"),0,0);
    entry.segments.forEach((segment,index)=>{
      const locked=index>=max-(weapon.locked||0);
      updateSegment(segment,index<weapon.count||locked,locked,elapsed);
      drawSegment(context,index,max,segment);
    });
    context.drawImage(icon,0,0);context.restore();
  });
  state.slots.length=weapons.length;
  context.restore();
}
