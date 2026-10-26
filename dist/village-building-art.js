// Native Canvas traces of the roof/door and tall lantern silhouettes visible
// in frames 0180 and 1080. Not recovered textures or original map coordinates.
function polygon(c, points, fill, stroke = "#503a2b", width = 2) {
  c.beginPath(); points.forEach(([x,y],i)=>i ? c.lineTo(x,y) : c.moveTo(x,y));
  c.closePath(); c.fillStyle=fill; c.fill(); c.strokeStyle=stroke; c.lineWidth=width; c.stroke();
}
function oval(c,x,y,rx,ry,fill,stroke="#503a2b",width=2) {
  c.beginPath(); c.ellipse(x,y,rx,ry,0,0,Math.PI*2);
  if(fill) { c.fillStyle=fill; c.fill(); }
  c.strokeStyle=stroke; c.lineWidth=width; c.stroke();
}

export function drawVillageHut(c, variant = 0) {
  c.save(); c.lineJoin="round";
  c.fillStyle="#4b533233"; c.beginPath(); c.ellipse(180,280,150,19,0,0,Math.PI*2); c.fill();
  c.beginPath(); c.moveTo(49,202); c.quadraticCurveTo(180,184,311,202);
  c.lineTo(303,266); c.quadraticCurveTo(180,296,57,266); c.closePath();
  c.fillStyle="#8a734c"; c.fill(); c.strokeStyle="#51432e"; c.lineWidth=3; c.stroke();
  for(let x=66;x<305;x+=23)
    polygon(c,[[x,205],[x+10,204],[x+8,274],[x-2,271]],"#b7ad72","#666648",1.3);
  // Stone footings beside the blue double doorway.
  for(const [x,y,s] of [[67,265,21],[103,277,17],[267,273,22],[302,261,17]])
    polygon(c,[[x-s,y],[x-s*.6,y-s*.8],[x+s*.5,y-s],[x+s,y],[x+s*.5,y+s*.3],[x-s*.8,y+s*.25]],
      "#aeb08a","#6f7856",1.8);
  c.beginPath(); c.moveTo(139,279); c.lineTo(139,244);
  c.bezierCurveTo(141,222,219,222,221,244); c.lineTo(221,279); c.closePath();
  c.fillStyle="#5e9189"; c.fill(); c.strokeStyle="#435e55"; c.lineWidth=3; c.stroke();
  c.beginPath(); c.moveTo(180,230); c.lineTo(180,279); c.stroke();
  c.beginPath(); c.moveTo(153,241); c.lineTo(153,274); c.moveTo(207,241); c.lineTo(207,274);
  c.strokeStyle="#456e67"; c.lineWidth=2; c.stroke();
  const roof=()=>{
    c.beginPath(); c.moveTo(180,8); c.quadraticCurveTo(151,13,137,70);
    c.bezierCurveTo(109,133,73,174,23,216); c.quadraticCurveTo(180,246,337,216);
    c.bezierCurveTo(288,173,247,119,220,65); c.quadraticCurveTo(208,13,180,8); c.closePath();
  };
  roof(); c.fillStyle=["#a36542","#985c3c","#ad6c43"][variant%3]; c.fill();
  c.save(); roof(); c.clip();
  for(let i=0;i<17;i++) {
    const x=10+i*20, top=180+(x-180)*.23;
    polygon(c,[[x,237],[x+20,237],[top+5,16],[top,16]],
      ["#a96743","#965735","#b1764c","#9f603e"][(i+variant)%4],"#70462e",1.3);
    c.beginPath(); c.moveTo(x+5,213); c.quadraticCurveTo(x+12,168,180+(x-180)*.6,125);
    c.strokeStyle="#c08c60"; c.lineWidth=1; c.stroke();
  }
  c.restore(); roof(); c.strokeStyle="#61442e"; c.lineWidth=3; c.stroke();
  c.beginPath(); c.moveTo(49,191); c.quadraticCurveTo(180,213,314,191);
  c.strokeStyle="#653f2c"; c.lineWidth=5; c.stroke();
  c.beginPath(); c.moveTo(34,216); c.quadraticCurveTo(180,241,326,216);
  c.strokeStyle="#c18b5b"; c.lineWidth=3; c.stroke();
  // Loft opening visible in the conical roof at 03:00.
  polygon(c,[[168,92],[194,91],[197,120],[166,122]],"#2e2b24","#704b31",2);
  polygon(c,[[164,121],[199,118],[202,126],[161,129]],"#835537","#573f2d",1.6);
  c.restore();
}

export function drawVillageChimneyHut(c) {
  c.save(); c.translate(0,100); drawVillageHut(c,2);
  // Teal cap and two pale flues seen above the foreground roof at 03:00.
  polygon(c,[[105,-9],[234,-12],[240,14],[108,18]],"#719d98","#3b625a",3);
  polygon(c,[[109,18],[240,14],[237,33],[110,36]],"#658981","#456355",2);
  for(const [x,top,r] of [[143,-60,13],[195,-92,18]]) {
    c.beginPath(); c.moveTo(x-r,top); c.lineTo(x-r-4,-11);
    c.quadraticCurveTo(x,-1,x+r+2,-12); c.lineTo(x+r,top); c.closePath();
    c.fillStyle="#c5cc95"; c.fill(); c.strokeStyle="#64784c"; c.lineWidth=2; c.stroke();
    oval(c,x,top,r,r*.43,"#b3c08a","#63764d",2);
    oval(c,x,top-1,r*.65,r*.23,"#485d3e","#71875b",1);
  }
  c.restore();
}

export function drawVillageLamp(c) {
  c.save(); c.lineJoin="round";
  c.fillStyle="#4b533244"; c.beginPath(); c.ellipse(35,402,24,7,0,0,Math.PI*2); c.fill();
  polygon(c,[[20,401],[24,385],[45,384],[51,400],[43,408],[26,407]],"#456b61","#314e44",2);
  polygon(c,[[28,390],[29,97],[41,97],[40,390]],"#8e6b39","#55492d",2);
  c.beginPath(); c.moveTo(32,106); c.lineTo(32,380); c.strokeStyle="#b6a05b"; c.lineWidth=3; c.stroke();
  oval(c,35,382,12,7,"#42695d","#314f43",1.8);
  polygon(c,[[18,35],[53,35],[51,93],[41,110],[28,108],[19,91]],"#547d76","#344f48",2.5);
  polygon(c,[[23,43],[47,43],[46,82],[26,83]],"#8da9a2","#365e58",2);
  polygon(c,[[28,48],[40,47],[39,75],[28,76]],"#c2cbad","#73948a",1);
  polygon(c,[[16,34],[35,9],[56,34]],"#a37249","#564731",2.5);
  polygon(c,[[14,34],[56,34],[53,41],[18,41]],"#6f8c7b","#3f5d50",2);
  c.beginPath(); c.moveTo(25,87); c.lineTo(45,87); c.strokeStyle="#35584e"; c.lineWidth=3; c.stroke();
  c.restore();
}
