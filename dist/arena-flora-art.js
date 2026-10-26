// Authored Canvas traces from supplied footage at 16:30 / 17:00.
// These are not recovered original textures or server placements.
const unit=n=>{const value=Math.sin(n*12.9898+1.2)*43758.5453;return value-Math.floor(value);};
function leaf(context,x,y,angle,size,color) {
  context.save();context.translate(x,y);context.rotate(angle);
  context.beginPath();context.moveTo(0,0);context.quadraticCurveTo(-size*.65,-size*.5,0,-size*1.8);
  context.quadraticCurveTo(size*.8,-size*.5,0,0);context.fillStyle=color;context.strokeStyle="#607b34";
  context.lineWidth=1.2;context.fill();context.stroke();
  context.beginPath();context.moveTo(0,0);context.lineTo(0,-size*1.5);context.stroke();context.restore();
}
function bell(context,x,y,side,size,color) {
  context.save();context.translate(x,y);context.scale(side,1);context.rotate(-.18);
  context.beginPath();context.moveTo(-size*.5,-size*.8);
  context.bezierCurveTo(-size*.9,-size*1.4,size*.5,-size*1.6,size*.6,-size*.65);
  context.quadraticCurveTo(size*.65,-size*.1,size,0);
  context.quadraticCurveTo(size*.6,size*.35,size*.35,size*.06);
  context.quadraticCurveTo(0,size*.5,-size*.3,size*.05);
  context.quadraticCurveTo(-size*.65,size*.3,-size*.65,-size*.05);
  context.closePath();context.fillStyle=color;context.strokeStyle="#75548e";context.lineWidth=1.1;context.fill();context.stroke();
  context.beginPath();context.moveTo(-size*.25,-size*.9);context.quadraticCurveTo(0,-size*.6,-size*.04,-size*.2);
  context.strokeStyle="#ceb5e0";context.lineWidth=1;context.stroke();context.restore();
}
export function drawBluebellPatch(context,variant=0) {
  context.save();context.lineJoin="round";
  for(let stem=0;stem<13;stem++) {
    const seed=variant*47+stem,x=12+unit(seed+3)*195,base=250+unit(seed+9)*14;
    const height=95+unit(seed+4)*145,lean=(unit(seed+7)-.5)*38;
    context.beginPath();context.moveTo(x,base);context.quadraticCurveTo(x+lean*.7,base-height*.6,x+lean,base-height);
    context.strokeStyle="#687c34";context.lineWidth=2.2;context.stroke();
    for(let level=0;level<4;level++) {
      const y=base-12-level*21;
      leaf(context,x+lean*level*.11,y,level%2?-.85:.85,15+unit(seed+level+13)*8,["#adc56b","#99b65a","#b8cd7e"][level%3]);
    }
    for(let level=0;level<6;level++) {
      const y=base-height+13+level*17,px=x+lean*(1-level*.08),side=level%2?-1:1;
      context.beginPath();context.moveTo(px,y);context.quadraticCurveTo(px+side*8,y-4,px+side*12,y+3);
      context.strokeStyle="#73843d";context.lineWidth=1.2;context.stroke();
      bell(context,px+side*12,y+7,side,6+unit(seed+level+25)*3,["#ad89c8","#b497cf","#9e7abd"][(level+stem)%3]);
    }
  }
  context.restore();
}
export function drawDaisyPatch(context,variant=0) {
  context.save();context.lineJoin="round";
  for(let stem=0;stem<45;stem++) {
    const seed=variant*43+stem,x=10+unit(seed+5)*200,base=145+unit(seed+9)*18;
    const height=24+unit(seed+7)*105,y=base-height,lean=(unit(seed+2)-.5)*18;
    context.beginPath();context.moveTo(x,base);context.quadraticCurveTo(x-3,y+20,x+lean,y);
    context.strokeStyle="#6f853a";context.lineWidth=1.8;context.stroke();
    leaf(context,x,base-7,-.8,11,"#a7bd68");leaf(context,x+1,base-15,.8,10,"#bad087");
    for(let petal=0;petal<6;petal++) {
      const angle=petal*Math.PI/3,size=3.6+unit(seed+15)*1.4;
      context.beginPath();context.ellipse(x+lean+Math.cos(angle)*5,y+Math.sin(angle)*5,size,2.7,angle,0,Math.PI*2);
      context.fillStyle=stem%3?"#f1f0dd":"#fffbea";context.strokeStyle="#b8c49a";context.lineWidth=.6;context.fill();context.stroke();
    }
    context.beginPath();context.arc(x+lean,y,2,0,Math.PI*2);context.fillStyle="#d1c369";context.fill();
  }
  context.restore();
}
