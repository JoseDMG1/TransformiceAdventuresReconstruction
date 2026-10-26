// Local tracing of gameplay frames 0120/0180, not recovered sector geometry.
// Drawing only: no collision, random-state or save changes.
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
    { x: 1370, y: 850, rx: 205, ry: 100, phase: .4 },
    { x: 650, y: 700, rx: 95, ry: 65, phase: 1.8 },
    { x: 780, y: 1080, rx: 68, ry: 42, phase: 2.5 },
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
    [865, 680, 25, -.1], [910, 744, 20, .2], [865, 805, 16, -.2],
    [680, 560, 23, .3], [607, 616, 18, -.2], [525, 680, 26, .1],
    [1480, 638, 20, -.1], [1540, 675, 17, .2],
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
