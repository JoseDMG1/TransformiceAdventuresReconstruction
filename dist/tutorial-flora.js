// Code-native traces of the rounded clover leaves and clustered flowers seen
// at the tutorial borders. Authored geometry, not recovered original textures.
const variation = n => (Math.sin(n * 12.9898 + 7.23) * 43758.5453) % 1;
const unit = n => Math.abs(variation(n));

export function drawTutorialFlora(c, variant = 0, flowers = false) {
  c.save();
  c.lineJoin = "round";
  const leaf = (x, y, angle, size, color) => {
    c.save(); c.translate(x,y); c.rotate(angle);
    c.beginPath(); c.moveTo(0,0);
    c.bezierCurveTo(-size*.9,-size*.3,-size,-size*1.6,-size*.3,-size*1.7);
    c.quadraticCurveTo(0,-size*1.8,size*.2,-size*1.4);
    c.bezierCurveTo(size*.9,-size*2,size*1.2,-size*.9,0,0);
    c.fillStyle=color; c.strokeStyle="#527733"; c.lineWidth=1.2; c.fill(); c.stroke();
    c.beginPath(); c.moveTo(0,-1); c.lineTo(0,-size*1.2);
    c.strokeStyle="#7ea44a"; c.lineWidth=.7; c.stroke(); c.restore();
  };
  for (let i=0;i<26;i++) {
    const seed=i+variant*41, x=12+unit(seed+2)*186;
    const base=143+unit(seed+3)*10, height=30+unit(seed+5)*85;
    const tipX=x+(unit(seed+7)-.5)*25, tipY=base-height;
    c.strokeStyle="#648837"; c.lineWidth=2.2;
    c.beginPath(); c.moveTo(x,base); c.quadraticCurveTo(x-8,tipY+30,tipX,tipY); c.stroke();
    const color=["#a7c46a","#b8d787","#91b95b","#c4da96"][(i+variant)%4];
    for (const level of [.5,1]) {
      const y=base-height*level, size=7+unit(seed+level*19)*8;
      leaf(tipX-2,y,-.95,size,color);
      leaf(tipX+2,y,.95,size,color);
      if (level===1) leaf(tipX,y,-.08,size*.95,color);
    }
    if (flowers && i%3===0) {
      const y=tipY-4;
      c.fillStyle=variant%2 ? "#b392cf" : "#f3f0d2";
      c.strokeStyle=variant%2 ? "#87669d" : "#a5b98a";
      c.lineWidth=.8;
      for(let petal=0;petal<5;petal++) {
        const angle=petal*Math.PI*2/5;
        c.beginPath(); c.ellipse(tipX+Math.cos(angle)*5,y+Math.sin(angle)*5,4.5,3.5,angle,0,Math.PI*2);
        c.fill(); c.stroke();
      }
      c.fillStyle="#d9c763"; c.beginPath(); c.arc(tipX,y,2,0,Math.PI*2); c.fill();
    }
  }
  c.restore();
}
