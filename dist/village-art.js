// Local tracing of gameplay frames 0120/0180, not recovered sector geometry.
// Drawing only: no collision, random-state or save changes.
export function drawVillageBoard(c) {
  c.save();
  const polygon = (points, fill, stroke = "#66432c", width = 2) => {
    c.beginPath();
    points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.closePath();
    c.fillStyle = fill;
    c.fill();
    c.strokeStyle = stroke;
    c.lineWidth = width;
    c.stroke();
  };
  c.fillStyle = "#53633355";
  c.beginPath(); c.ellipse(83, 102, 74, 7, 0, 0, Math.PI * 2); c.fill();
  polygon([[20, 76], [31, 76], [30, 104], [19, 104]], "#9c673b");
  polygon([[136, 76], [146, 76], [145, 103], [135, 103]], "#9c673b");
  polygon([[14, 22], [151, 22], [149, 91], [16, 93]], "#b77c47", "#674530", 3);
  polygon([[24, 31], [140, 29], [138, 81], [25, 84]], "#9d8357", "#7d5c36", 2);
  for (let x = 33; x < 138; x += 19) {
    c.strokeStyle = "#80653f"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(x, 32); c.lineTo(x - 2, 82); c.stroke();
  }
  // Low roof: teal ridge above the warm, uneven wooden slats visible at 03:00.
  polygon([[10, 12], [154, 10], [160, 29], [5, 32]], "#b77945", "#68442e", 2.5);
  for (let x = 16; x < 157; x += 12) {
    c.strokeStyle = "#775136"; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(x, 14); c.lineTo(x - 2, 29); c.stroke();
    c.strokeStyle = "#d19659";
    c.beginPath(); c.moveTo(x + 3, 15); c.lineTo(x + 2, 27); c.stroke();
  }
  polygon([[13, 8], [151, 6], [155, 13], [10, 15]], "#75a0a0", "#4a6862", 1.5);
  // Paper silhouettes/marks are illustrative; no unreadable notice is transcribed.
  const papers = [[29, 37, 24, 28, -.06], [62, 35, 35, 24, .09],
    [108, 34, 22, 32, -.04], [52, 63, 31, 18, -.1], [90, 60, 27, 24, .08]];
  papers.forEach(([x, y, w, h, angle], index) => {
    c.save(); c.translate(x, y); c.rotate(angle);
    polygon([[1, 1], [w, 0], [w - 1, h - 2], [w * .55, h], [0, h - 1]],
      index % 2 ? "#d8c9a4" : "#e5d8b6", "#8e7757", .8);
    c.strokeStyle = "#a79876"; c.lineWidth = 1;
    for (let row = 0; row < 3; row++) {
      c.beginPath(); c.moveTo(4, 6 + row * 4); c.lineTo(w - 4 - row % 2 * 5, 6 + row * 4); c.stroke();
    }
    if (h > 23) {
      c.beginPath(); c.moveTo(w * .3, h - 4); c.lineTo(w * .5, h - 11);
      c.lineTo(w * .7, h - 5); c.stroke();
    }
    c.fillStyle = "#6e5b3a";
    c.beginPath(); c.arc(w / 2, 2, 1.4, 0, Math.PI * 2); c.fill();
    c.restore();
  });
  polygon([[13, 85], [150, 83], [153, 93], [12, 96]], "#a7693c", "#71482c", 2);
  for (const [x, y] of [[19, 37], [145, 35], [20, 88], [145, 87]]) {
    c.fillStyle = "#e0aa68"; c.beginPath(); c.arc(x, y, 1.6, 0, Math.PI * 2); c.fill();
  }
  c.restore();
}

export function drawVillagePlaza(c) {
  c.save();
  c.beginPath();
  c.moveTo(340, 530);
  c.bezierCurveTo(530, 440, 640, 510, 815, 440);
  c.bezierCurveTo(1050, 400, 1100, 585, 1320, 540);
  c.bezierCurveTo(1510, 470, 1790, 520, 1880, 720);
  c.bezierCurveTo(1950, 850, 1750, 1020, 1810, 1160);
  c.bezierCurveTo(1530, 1250, 1440, 1110, 1250, 1210);
  c.bezierCurveTo(1000, 1310, 940, 1120, 690, 1200);
  c.bezierCurveTo(470, 1240, 340, 1040, 400, 900);
  c.bezierCurveTo(430, 770, 250, 660, 340, 530);
  c.closePath();
  c.fillStyle = "#a4aa3b";
  c.fill();
  c.strokeStyle = "#7c9438";
  c.lineWidth = 3;
  c.stroke();

  // Uneven grass islands and small grass teeth along their edges, visible at 03:00.
  const islands = [
    { x: 1130, y: 730, rx: 225, ry: 110, phase: .4 },
    { x: 565, y: 730, rx: 110, ry: 40, phase: 1.8 },
    { x: 887, y: 814, rx: 50, ry: 30, phase: 2.5 },
    { x: 1220, y: 580, rx: 92, ry: 38, phase: .8 },
    { x: 1610, y: 1100, rx: 92, ry: 55, phase: 3.2 },
  ];
  for (const { x, y, rx, ry, phase } of islands) {
    const edge = [];
    for (let i = 0; i < 60; i++) {
      const a = i * Math.PI / 30;
      const r = 1 + .09 * Math.sin(a * 5 + phase) + .045 * Math.cos(a * 11);
      edge.push([x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r]);
    }
    c.beginPath();
    edge.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py));
    c.closePath();
    c.fillStyle = "#7ca333";
    c.strokeStyle = "#718b34";
    c.lineWidth = 2;
    c.fill();
    c.stroke();
    c.strokeStyle = "#5f822e";
    c.lineWidth = 1.5;
    for (let i = 3; i < edge.length; i += 7) {
      const [px, py] = edge[i];
      c.beginPath();
      c.moveTo(px - 5, py + 2);
      c.lineTo(px - 6, py - 6);
      c.lineTo(px, py);
      c.lineTo(px + 3, py - 9);
      c.lineTo(px + 5, py + 2);
      c.stroke();
    }
  }

  // Irregular pale stepping stones near buildings/notice board (02:00/03:00).
  for (const [x, y, size, angle] of [
    [380, 630, 23, .3], [340, 688, 18, -.2], [300, 736, 26, .1],
    [1290, 600, 20, -.1], [1350, 614, 17, .2],
    [1190, 1160, 24, .3], [1155, 1220, 18, -.2],
  ]) {
    c.save();
    c.translate(x, y);
    c.rotate(angle);
    c.beginPath();
    c.moveTo(-size, 0);
    c.quadraticCurveTo(-size * .8, -size * .65, -size * .2, -size * .55);
    c.quadraticCurveTo(size * .7, -size * .7, size, 0);
    c.quadraticCurveTo(size * .7, size * .45, -size * .5, size * .4);
    c.closePath();
    c.fillStyle = "#d0cb93";
    c.strokeStyle = "#788044";
    c.lineWidth = 2;
    c.fill();
    c.stroke();
    c.restore();
  }
  c.restore();
}
