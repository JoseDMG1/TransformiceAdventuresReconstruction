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
