// Canvas reconstruction from the supplied footage, not recovered map artwork.
export const FOREST_PALETTE = Object.freeze({ grass: "#91a43c", trail: "#aaa43e", edge: "#6e822f" });

export function drawClearingGrass(ctx, width, height, random) {
  ctx.save(); ctx.scale(width / 1850, height / 1250);
  for (let patch = 0; patch < 22; patch++) {
    const x = 100 + random() * 1380, y = 410 + random() * 570;
    const rx = 24 + random() * 88, ry = 13 + random() * 40;
    const points = [];
    for (let point = 0; point < 18; point++) {
      const angle = point / 18 * Math.PI * 2, variation = 0.72 + random() * 0.28;
      const px = x + Math.cos(angle) * rx * variation, py = y + Math.sin(angle) * ry * variation;
      points.push({ x: px, y: py });
    }
    ctx.beginPath();
    const last = points[points.length - 1];
    ctx.moveTo((last.x + points[0].x) / 2, (last.y + points[0].y) / 2);
    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length];
      ctx.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
    });
    ctx.closePath(); ctx.fillStyle = patch % 3 ? FOREST_PALETTE.grass : "#879d36"; ctx.fill();
    ctx.strokeStyle = "#879836"; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.strokeStyle = "#768d30"; ctx.lineWidth = 1.5;
    for (let tuft = 0; tuft < 6; tuft++) {
      const tx = x + (random() - 0.5) * rx, ty = y + (random() - 0.5) * ry;
      ctx.beginPath(); ctx.moveTo(tx - 4, ty); ctx.lineTo(tx - 6, ty - 9);
      ctx.lineTo(tx, ty - 3); ctx.lineTo(tx + 4, ty - 11); ctx.stroke();
    }
  }
  ctx.restore();
}

export function drawForestLitter(ctx, width, height, random, pond = false) {
  ctx.save();
  for (let index = 0; index < 160; index++) {
    const x = random() * width, y = random() * height;
    if (pond && x > width * 0.8 && y > height * 0.46 && y < height * 0.82) continue;
    const size = 5 + random() * 11;
    ctx.save(); ctx.translate(x, y); ctx.rotate(random() * Math.PI * 2);
    ctx.beginPath(); ctx.moveTo(0, size * 0.5);
    ctx.quadraticCurveTo(-size * 0.6, -size * 0.2, 0, -size);
    ctx.quadraticCurveTo(size * 0.7, -size * 0.3, 0, size * 0.5);
    ctx.fillStyle = ["#a28e3f", "#b4b449", "#789535", "#b8a24b"][index % 4]; ctx.fill();
    ctx.strokeStyle = "#7d8032"; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, size * 0.6); ctx.lineTo(0, -size * 0.7); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// Rounded, irregular ochre islands seen beside the water at 17:00. This is
// authored ground artwork, independent of object placement and collision RNG.
export function drawArenaClearing(context,width,height,random) {
  context.save();context.scale(width/1850,height/1250);
  context.fillStyle="#8ba33a";context.fillRect(0,0,1850,1250);
  for(let patch=0;patch<48;patch++) {
    const x=70+random()*1460,y=300+random()*780;
    const rx=36+random()*120,ry=22+random()*72,points=[];
    for(let point=0;point<20;point++) {
      const angle=point/20*Math.PI*2,variation=.72+random()*.28;
      points.push({x:x+Math.cos(angle)*rx*variation,y:y+Math.sin(angle)*ry*variation});
    }
    const last=points.at(-1);context.beginPath();context.moveTo((last.x+points[0].x)/2,(last.y+points[0].y)/2);
    points.forEach((point,index)=>{
      const next=points[(index+1)%points.length];
      context.quadraticCurveTo(point.x,point.y,(point.x+next.x)/2,(point.y+next.y)/2);
    });
    context.closePath();context.fillStyle=patch%4?"#b1ad4b":"#a9a849";context.fill();
    context.strokeStyle="#8d973a";context.lineWidth=1;context.stroke();
    context.strokeStyle="#6f8b32";context.lineWidth=1.4;
    for(let tuft=0;tuft<4;tuft++) {
      const tx=x+(random()-.5)*rx,ty=y-ry*.7+random()*8;
      context.beginPath();context.moveTo(tx-5,ty+2);context.lineTo(tx-7,ty-8);
      context.lineTo(tx,ty);context.lineTo(tx+3,ty-9);context.stroke();
    }
  }
  context.restore();
}
