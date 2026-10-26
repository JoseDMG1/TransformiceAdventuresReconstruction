// Authored Canvas traces of gameplay frames 0010/0060, not recovered sector art.
export function drawTutorialClearing(c, width, height) {
  c.save();
  c.scale(width / 1850, height / 1250);
  // The footage has flat, irregular soil/grass regions, not translucent discs.
  c.fillStyle = "#83a638";
  c.fillRect(0,0,1850,1250);
  const patch = (x,y,rx,ry,color,phase) => {
    const points=[];
    for(let i=0;i<72;i++) {
      const angle=i*Math.PI/36;
      const r=1+.065*Math.sin(angle*7+phase)+.035*Math.cos(angle*13-phase);
      points.push([x+Math.cos(angle)*rx*r,y+Math.sin(angle)*ry*r]);
    }
    c.beginPath();
    points.forEach(([px,py],i)=>i ? c.lineTo(px,py) : c.moveTo(px,py));
    c.closePath(); c.fillStyle=color; c.fill();
    c.strokeStyle="#819539"; c.lineWidth=1.4; c.stroke();
    c.strokeStyle="#688c32"; c.lineWidth=1.2;
    for(let i=2;i<points.length;i+=6) {
      const [px,py]=points[i];
      c.beginPath(); c.moveTo(px-5,py+2); c.lineTo(px-7,py-5);
      c.lineTo(px,py); c.lineTo(px+3,py-7); c.lineTo(px+5,py+2); c.stroke();
    }
  };
  for(const [x,y,rx,ry,phase] of [
    [560,680,260,75,.3],[225,790,100,75,1.1],[520,890,230,85,2.4],
    [690,720,210,105,1.3],[1390,770,650,245,.7],[515,835,70,45,2.1],
    [680,475,56,32,.9],[820,520,60,32,2.8],[1055,430,80,35,3.2],
    [70,620,70,35,1.8],[-50,675,60,35,2.2],[1680,450,86,35,1.2],
  ]) patch(x,y,rx,ry,"#aaa834",phase);
  for(const [x,y,rx,ry,phase] of [
    [1010,590,165,97,1.8],[1200,965,123,68,2.6],
    [1650,530,180,80,.4],[1730,1030,150,65,1.2],
  ]) patch(x,y,rx,ry,"#83a638",phase);
  // Small stones and scuffs follow the clearing rather than a regular grid.
  c.strokeStyle="#929947"; c.lineWidth=1.2;
  for(const [x,y,r] of [[385,770,6],[417,777,4],[958,718,8],[1001,695,5],
    [1190,795,7],[1530,875,7],[1475,900,4],[1730,750,6]]) {
    c.beginPath(); c.ellipse(x,y,r,r*.45,-.2,0,Math.PI*2);
    c.fillStyle="#bfbd78"; c.fill(); c.stroke();
  }
  c.restore();
}

export function drawTutorialFence(c) {
  c.lineJoin = "round";
  c.lineWidth = 3;
  c.strokeStyle = "#403822";
  // Rails sit behind the posts, leaving the surrounding grass visible.
  for (const y of [26, 47]) {
    c.beginPath();
    c.moveTo(8, y); c.lineTo(252, y - 3);
    c.lineTo(252, y + 10); c.lineTo(8, y + 12); c.closePath();
    c.fillStyle = "#69502d"; c.fill(); c.stroke();
    c.beginPath(); c.moveTo(14, y + 2); c.lineTo(247, y);
    c.strokeStyle = "#a17d41"; c.lineWidth = 2; c.stroke();
    c.strokeStyle = "#403822"; c.lineWidth = 3;
  }
  for (const x of [8, 88, 168, 246]) {
    c.beginPath(); c.moveTo(x - 6, 13); c.lineTo(x + 8, 11);
    c.lineTo(x + 8, 73); c.lineTo(x - 7, 75); c.closePath();
    c.fillStyle = "#785a35"; c.fill(); c.stroke();
    c.fillStyle = "#ae8b52"; c.fillRect(x - 4, 15, 3, 53);
    c.fillStyle = "#382d20";
    c.fillRect(x + 2, 30, 3, 3); c.fillRect(x + 2, 53, 3, 3);
  }
}

// Visible cargo in frame-0060.jpg. Coordinates below belong to this drawing,
// not to an original map sector or a recovered cart sprite.
export function drawTutorialCart(c) {
  c.save();
  c.lineJoin = "round";
  c.strokeStyle = "#503a25";
  c.lineWidth = 3;
  const polygon = (points, color) => {
    c.beginPath(); c.moveTo(...points[0]);
    for (const p of points.slice(1)) c.lineTo(...p);
    c.closePath(); c.fillStyle = color; c.fill(); c.stroke();
  };
  const oval = (x, y, rx, ry, color) => {
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    c.fillStyle = color; c.fill(); c.stroke();
  };
  c.fillStyle = "#4b452433";
  c.beginPath(); c.ellipse(112, 139, 102, 17, 0, 0, Math.PI * 2); c.fill();
  // Far wheel and shafts first; the front wheel overlaps the wooden bed.
  oval(156, 117, 21, 26, "#765033");
  polygon([[151, 99], [267, 119], [267, 125], [149, 107]], "#a68b4d");
  polygon([[151, 117], [258, 135], [258, 141], [149, 125]], "#b49a57");
  polygon([[24, 82], [161, 76], [185, 98], [43, 109]], "#9f7439");
  polygon([[43, 109], [185, 98], [182, 129], [42, 137]], "#956133");
  polygon([[24, 82], [43, 109], [42, 137], [23, 113]], "#79522f");
  for (const y of [115, 125]) {
    c.beginPath(); c.moveTo(48, y); c.lineTo(176, y - 8); c.stroke();
  }
  // Fan of straw, bundled toward the cart bed.
  polygon([[55, 87], [26, 37], [48, 45], [54, 22], [72, 42], [85, 33],
    [97, 50], [151, 33], [143, 54], [172, 49], [158, 77], [125, 96]], "#d0ad54");
  c.lineWidth = 1.5; c.strokeStyle = "#9c773a";
  for (let i = 0; i < 18; i++) {
    const x = 35 + i * 7;
    c.beginPath(); c.moveTo(x, 35 + (i % 4) * 6);
    c.quadraticCurveTo(95, 68, 98 + (i % 5) * 5, 95); c.stroke();
  }
  c.lineWidth = 3; c.strokeStyle = "#503a25";
  // Upright parcel and sack, as silhouettes rather than invented inventory.
  polygon([[36, 80], [62, 76], [64, 112], [37, 116]], "#b88c48");
  c.beginPath(); c.moveTo(48, 79); c.lineTo(49, 113); c.stroke();
  oval(172, 84, 16, 25, "#bc9957");
  oval(172, 63, 13, 5, "#dbc37a");
  c.beginPath(); c.moveTo(158, 90); c.lineTo(184, 87); c.stroke();
  oval(114, 129, 29, 32, "#5b4935");
  oval(114, 129, 23, 26, "#97653d");
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    c.beginPath(); c.moveTo(114, 129);
    c.lineTo(114 + Math.cos(angle) * 22, 129 + Math.sin(angle) * 25); c.stroke();
  }
  oval(114, 129, 8, 9, "#b0834e");
  c.restore();
}

// The blue draft creature is visible beside the cart in frame-0060.jpg.
// This static trace is not an association to any recovered creature ID.
export function drawTutorialDraftBeetle(c) {
  c.save(); c.lineJoin="round"; c.lineWidth=2.5; c.strokeStyle="#403946";
  const oval=(x,y,rx,ry,color)=>{
    c.beginPath(); c.ellipse(x,y,rx,ry,0,0,Math.PI*2); c.fillStyle=color; c.fill(); c.stroke();
  };
  const polygon=(points,color)=>{
    c.beginPath(); points.forEach(([x,y],i)=>i ? c.lineTo(x,y) : c.moveTo(x,y));
    c.closePath(); c.fillStyle=color; c.fill(); c.stroke();
  };
  c.fillStyle="#514c3233"; c.beginPath(); c.ellipse(111,138,93,9,0,0,Math.PI*2); c.fill();
  // Far legs sit behind the overlapping domed plates.
  polygon([[69,102],[81,106],[73,137],[60,135]],"#a79178");
  polygon([[151,105],[166,106],[174,134],[162,139]],"#9e8a72");
  oval(109,84,82,52,"#66648f");
  c.beginPath(); c.moveTo(25,101); c.bezierCurveTo(14,62,31,27,63,28);
  c.bezierCurveTo(93,24,113,57,113,123); c.lineTo(58,130);
  c.closePath(); c.fillStyle="#8b85b9"; c.fill(); c.stroke();
  c.beginPath(); c.moveTo(62,31); c.bezierCurveTo(105,10,149,48,148,126);
  c.lineTo(106,129); c.bezierCurveTo(105,70,90,40,62,31);
  c.closePath(); c.fillStyle="#7775a6"; c.fill(); c.stroke();
  c.beginPath(); c.moveTo(111,40); c.bezierCurveTo(161,21,191,70,188,127);
  c.lineTo(145,132); c.bezierCurveTo(150,83,133,51,111,40);
  c.closePath(); c.fillStyle="#696a9c"; c.fill(); c.stroke();
  // Light harness follows the curve of the shell rather than a saddle item.
  c.strokeStyle="#bdb8ce"; c.lineWidth=5;
  for(const [x,y] of [[65,38],[111,48]]) {
    c.beginPath(); c.moveTo(x,y); c.bezierCurveTo(x+32,y+9,x+48,86,x+43,126); c.stroke();
  }
  c.strokeStyle="#403946"; c.lineWidth=2.5;
  oval(179,110,24,25,"#515075");
  polygon([[65,114],[78,119],[74,143],[59,143],[55,137]],"#a28d76");
  polygon([[142,120],[154,122],[163,143],[145,146],[139,136]],"#9b8872");
  oval(63,140,10,4,"#615344"); oval(153,144,11,4,"#615344");
  c.fillStyle="#332e3d"; c.beginPath(); c.arc(193,108,2.3,0,Math.PI*2); c.fill();
  c.strokeStyle="#aaa6be"; c.lineWidth=2;
  c.beginPath(); c.moveTo(181,90); c.quadraticCurveTo(193,79,200,87); c.stroke();
  c.restore();
}
