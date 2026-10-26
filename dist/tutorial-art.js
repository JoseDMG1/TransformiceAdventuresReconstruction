// Authored Canvas traces of gameplay frames 0010/0060, not recovered sector art.
export function drawTutorialClearing(c, width, height) {
  c.save();
  c.scale(width / 1850, height / 1250);
  c.beginPath();
  c.moveTo(180, 650);
  c.bezierCurveTo(260, 540, 350, 530, 490, 555);
  c.bezierCurveTo(650, 470, 770, 590, 920, 540);
  c.bezierCurveTo(1080, 460, 1190, 510, 1350, 530);
  c.bezierCurveTo(1540, 490, 1740, 610, 1780, 730);
  c.bezierCurveTo(1650, 840, 1540, 930, 1370, 910);
  c.bezierCurveTo(1160, 990, 1020, 840, 870, 890);
  c.bezierCurveTo(710, 950, 640, 810, 490, 850);
  c.bezierCurveTo(330, 910, 230, 830, 180, 650);
  c.closePath();
  c.fillStyle = "#aaa632";
  c.fill();
  c.strokeStyle = "#738831";
  c.lineWidth = 2;
  c.stroke();
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
