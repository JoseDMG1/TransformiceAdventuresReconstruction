// Original ClipNomADV textures and role colours. Local widths/offsets are
// adapted to the video; server-supplied label heights remain unavailable.
const names=["fv","c","v6","tv","vv","allie-mort"];
const images=new Map(),tints=new Map(),patterns=new Map();
export const HEALTH_COLOURS=Object.freeze({player:"#62ca57",enemy:"#ffea00",ally:"#669bca"});
let loading;
export function loadActorOverlayArt() {
  return loading ??= Promise.all(names.map(name=>new Promise(resolve=>{
    const image=new Image();image.onload=()=>{images.set(name,image);resolve();};image.onerror=()=>resolve();
    image.src=`assets/original/interface/actor-overlays/${name}.png`;
  }))).then(()=>({ready:["fv","c","v6"].every(name=>images.has(name)),loaded:images.size}));
}
function tint(color) {
  if(tints.has(color)) return tints.get(color);
  const image=images.get("v6"),canvas=document.createElement("canvas");
  canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
  const context=canvas.getContext("2d");context.drawImage(image,0,0);
  context.globalCompositeOperation="multiply";context.fillStyle=color;context.fillRect(0,0,canvas.width,canvas.height);
  context.globalCompositeOperation="destination-in";context.drawImage(image,0,0);
  tints.set(color,canvas);return canvas;
}
export function drawOriginalHealthBar(context,{x,y,width,hp,maxHp,color=HEALTH_COLOURS.player}) {
  if(!["fv","c","v6"].every(name=>images.has(name))) return false;
  if(!(width>0)||!(maxHp>0)||!Number.isFinite(hp)) return false;
  const ratio=Math.max(0,Math.min(1,hp/maxHp)),scale=width/100;
  context.save();context.translate(x-width/2,y);context.scale(scale,scale);
  context.save();context.globalAlpha*=.8;context.drawImage(images.get("fv"),0,0);context.restore();
  if(ratio>0) {
    const key=color+":"+maxHp;
    let pattern=patterns.get(key);
    if(!pattern) {
      pattern=context.createPattern(tint(color),"repeat");
      pattern.setTransform(new DOMMatrix([100/maxHp,0,0,1,0,0]));
      if(patterns.size>=64) patterns.clear();
      patterns.set(key,pattern);
    }
    context.fillStyle=pattern;context.fillRect(0,0,100*ratio,10);
  }
  context.drawImage(images.get("c"),-2,-2);
  context.restore();return true;
}

export function drawNpcName(context,actor) {
  if(!actor.name) return;
  context.save();context.font="19.2px Verdana, sans-serif";context.textAlign="center";
  context.lineWidth=4;context.strokeStyle="#000000";
  context.strokeText(actor.name,actor.x,actor.y-68);
  context.fillStyle=actor.nameColor ?? "#6c99d6";
  context.fillText(actor.name,actor.x,actor.y-68);context.restore();
}
