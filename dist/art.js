// Original Canvas illustrations for the playable reconstruction.
// The recovered original interface images have separate provenance in assets/original/manifest.json.
import {
  loadOriginalAnimations,
  drawOriginalCreature,
  originalAnimationFrameCount,
} from "./original-animation.js";
import { WEAPONS } from "./combat.js";
import { PET_SPECIES, PLAYABLE_CHARACTERS, PLAYER_CHARACTER } from "./characters.js";
import { ENEMY_RULES, enemyCreatureId } from "./enemy-data.js";
import { FOREST_PALETTE, drawClearingGrass, drawForestLitter } from "./forest-art.js";
let originalReady = false,
  originalArtInfo = null;
export function artStatus() {
  return { ready: originalReady, ...originalArtInfo };
}
export async function initializeArt() {
  const info = await loadOriginalAnimations();
  originalArtInfo = info;
  originalReady = true;
  return info;
}
export const TAU = Math.PI * 2;
export function seeded(seed = 1) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(1664525, s) + 1013904223) >>> 0) / 4294967296;
}
function ellipse(
  c,
  x,
  y,
  rx,
  ry,
  fill,
  stroke = "#3e4924",
  lw = 1.5,
  rotation = 0,
) {
  c.beginPath();
  c.ellipse(x, y, rx, ry, rotation, 0, TAU);
  if (fill) {
    c.fillStyle = fill;
    c.fill();
  }
  if (stroke) {
    c.strokeStyle = stroke;
    c.lineWidth = lw;
    c.stroke();
  }
}
function path(c, points, fill, stroke = "#4b4127", lw = 2) {
  c.beginPath();
  points.forEach((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p)));
  c.closePath();
  if (fill) {
    c.fillStyle = fill;
    c.fill();
  }
  if (stroke) {
    c.strokeStyle = stroke;
    c.lineWidth = lw;
    c.stroke();
  }
}
function line(c, points, color = "#4b4127", width = 2) {
  c.beginPath();
  points.forEach((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p)));
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = "round";
  c.stroke();
}
export function label(c, text, x, y, color = "#fff4c8", size = 13) {
  c.font = `bold ${size}px Georgia`;
  c.textAlign = "center";
  c.lineWidth = 3;
  c.strokeStyle = "#344422";
  c.strokeText(text, x, y);
  c.fillStyle = color;
  c.fillText(text, x, y);
}
const sprites = new Map();
function cached(key, w, h, draw) {
  if (!sprites.has(key)) {
    const el = document.createElement("canvas");
    el.width = w;
    el.height = h;
    draw(el.getContext("2d"));
    sprites.set(key, el);
  }
  return sprites.get(key);
}
export function shadow(c, x, y, rx = 20, ry = 8) {
  ellipse(c, x, y, rx, ry, "#25341e40", null);
}
function leaf(c, x, y, len, angle, color = "#8ebc43") {
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, 0);
  c.quadraticCurveTo(-len * 0.38, -len * 0.7, 0, -len);
  c.quadraticCurveTo(len * 0.45, -len * 0.45, 0, 0);
  c.fillStyle = color;
  c.fill();
  c.strokeStyle = "#567332";
  c.lineWidth = 1;
  c.stroke();
  line(
    c,
    [
      [0, 0],
      [0, -len * 0.8],
    ],
    "#6e8c35",
    0.7,
  );
  c.restore();
}
function fern(c, x, y, scale = 1, seed = 1) {
  const r = seeded(seed);
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  for (let j = -2; j <= 2; j++) {
    c.save();
    c.rotate(j * 0.42);
    const len = 30 + r() * 18;
    line(
      c,
      [
        [0, 0],
        [-2, -len * 0.6],
        [j * 2, -len],
      ],
      "#566b29",
      1.4,
    );
    for (let i = 0; i < 7; i++) {
      const yy = (-i * len) / 8;
      let sz = (1 - i / 8) * 13;
      leaf(c, 0, yy, sz, -0.9, "#a9c849");
      leaf(c, 0, yy, sz, 0.9, "#91b83e");
    }
    c.restore();
  }
  c.restore();
}
function fernFan(c, variant = 0) {
  const random = seeded(1977 + variant * 37);
  shadow(c, 150, 218, 87, 13);
  for (let frond = -2; frond <= 2; frond++) {
    c.save(); c.translate(150, 220); c.rotate(frond * 0.36);
    const length = 134 + random() * 37;
    c.strokeStyle = "#70852d"; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(frond * 3, -length * 0.6, 0, -length); c.stroke();
    for (let index = 1; index <= 11; index++) {
      const t = index / 12, size = 5 + Math.sin(Math.PI * t) * 31;
      leaf(c, 0, -length * t, size, -1.12, "#c2d84f");
      leaf(c, 0, -length * t, size, 1.12, "#aeca40");
    }
    leaf(c, 0, -length + 6, 16, 0, "#c6da57");
    c.restore();
  }
}
function grass(c, x, y, s = 1) {
  line(
    c,
    [
      [x - 8 * s, y],
      [x - 12 * s, y - 12 * s],
      [x - 3 * s, y - 4 * s],
      [x - 2 * s, y - 19 * s],
      [x + 2 * s, y - 5 * s],
      [x + 9 * s, y - 15 * s],
      [x + 5 * s, y],
      [x + 13 * s, y - 8 * s],
    ],
    "#628539",
    1.1 * s,
  );
}
function flower(c, x, y, color = "#eeeac9", scale = 1) {
  line(
    c,
    [
      [x, y],
      [x - 2, y - 15 * scale],
    ],
    "#5c7d32",
    1.5,
  );
  for (let i = 0; i < 5; i++) {
    const a = (i * TAU) / 5;
    ellipse(
      c,
      x + Math.cos(a) * 4 * scale,
      y - 17 * scale + Math.sin(a) * 4 * scale,
      3.5 * scale,
      2.9 * scale,
      color,
      "#829044",
      0.5,
    );
  }
  ellipse(c, x, y - 17 * scale, 2 * scale, 2 * scale, "#ddc85b", null);
}
function tree(c, variant = 0) {
  const r = seeded(variant + 8);
  shadow(c, 125, 295, 78, 23);
  path(
    c,
    [
      [68, 294],
      [89, 235],
      [84, 170],
      [70, 108],
      [78, 14],
      [163, 0],
      [172, 113],
      [151, 201],
      [165, 265],
      [192, 298],
      [149, 290],
      [123, 302],
      [101, 290],
    ],
    "#8d6a2e",
    "#514b25",
    3,
  );
  path(
    c,
    [
      [80, 289],
      [106, 211],
      [97, 132],
      [101, 9],
      [124, 5],
      [117, 128],
      [135, 213],
      [124, 293],
    ],
    "#a68135",
    null,
  );
  path(
    c,
    [
      [148, 288],
      [144, 184],
      [157, 104],
      [153, 0],
      [170, 0],
      [172, 113],
      [151, 201],
      [165, 265],
      [190, 294],
    ],
    "#6c5929",
    null,
  );
  line(
    c,
    [
      [101, 275],
      [114, 199],
      [104, 155],
    ],
    "#5b5427",
    3,
  );
  line(
    c,
    [
      [143, 253],
      [132, 168],
      [146, 103],
      [139, 34],
    ],
    "#675927",
    3,
  );
  for (let i = 0; i < 8; i++) {
    const y = 30 + r() * 240;
    line(
      c,
      [
        [80 + r() * 45, y],
        [90 + r() * 45, y + 30],
      ],
      "#bd913e",
      1.4,
    );
  }
  ellipse(c, 128, 154, 12, 22, "#66522a", "#b68a36", 3, 0.1);
  ellipse(c, 129, 152, 5, 12, "#554827", null);
  for (let i = 0; i < 10; i++)
    leaf(
      c,
      64 + r() * 130,
      285 + r() * 14,
      20 + r() * 15,
      -1 + r() * 2,
      "#9db945",
    );
  fern(c, 78, 302, 0.9, variant + 6);
  fern(c, 174, 300, 0.65, variant + 7);
  for (let i = 0; i < 5; i++)
    flower(c, 40 + r() * 40, 291 + r() * 24, "#ebecc5", 0.7);
  // Broad crowns frame the clearings without leaving cut-off trunk tops.
  for (const [x, y, rx, ry] of [
    [45, 59, 40, 36],
    [86, 31, 49, 29],
    [132, 30, 52, 27],
    [187, 47, 48, 37],
    [140, 64, 54, 33],
    [77, 72, 49, 28],
  ])
    ellipse(c, x, y, rx, ry, "#658c37", "#496a2d", 2);
  for (let i = 0; i < 24; i++) {
    const x = 25 + r() * 190,
      y = 20 + r() * 60;
    leaf(
      c,
      x,
      y,
      18 + r() * 18,
      (r() - 0.5) * 2.4,
      ["#83a63d", "#95b745", "#729733"][i % 3],
    );
  }
}
function sapling(c, variant = 0) {
  const green = variant % 2 ? "#b5d94b" : "#c1dc4e";
  shadow(c, 70, 319, 27, 8);
  path(c, [[62, 320], [64, 245], [59, 193], [63, 142], [55, 95], [58, 61], [68, 59], [74, 106], [72, 160], [79, 210], [77, 320]], "#875f2d", "#4e4827", 2);
  path(c, [[65, 310], [68, 234], [66, 184], [70, 138], [65, 96], [67, 69], [71, 101], [75, 158], [72, 212], [73, 310]], "#b18037", null);
  line(c, [[66, 232], [43, 196], [29, 157]], "#70502a", 7);
  line(c, [[71, 183], [97, 151], [110, 114]], "#78552d", 7);
  line(c, [[65, 137], [47, 109], [43, 77]], "#805a2e", 6);
  line(c, [[68, 99], [84, 70], [91, 42]], "#805a2e", 5);
  for (const [x, y, length, angle] of [
    [43, 196, 48, -1.05], [29, 157, 54, -1.22], [49, 124, 43, -1.02],
    [43, 77, 49, -0.98], [96, 151, 48, 1.12], [109, 114, 56, 1.24],
    [83, 72, 46, 1.04], [91, 42, 52, 0.72], [68, 64, 43, -0.12],
  ]) {
    leaf(c, x, y, length, angle, green);
  }
  line(c, [[65, 286], [68, 252], [63, 222]], "#d2a048", 1.4);
}
function stump(c) {
  shadow(c, 73, 96, 61, 15);
  path(
    c,
    [
      [23, 89],
      [29, 33],
      [109, 29],
      [120, 89],
      [94, 103],
      [49, 103],
    ],
    "#a87c2e",
    "#5f5828",
    2,
  );
  path(
    c,
    [
      [39, 99],
      [48, 42],
      [67, 44],
      [63, 103],
    ],
    "#c49437",
    null,
  );
  ellipse(c, 73, 32, 51, 26, "#e4c553", "#77682e", 2.3);
  ellipse(c, 73, 32, 35, 17, null, "#b49739", 1.5);
  ellipse(c, 75, 32, 19, 9, null, "#b49739", 1.3);
  line(
    c,
    [
      [74, 32],
      [83, 31],
      [83, 37],
      [70, 39],
    ],
    "#ab8b33",
    1,
  );
  line(
    c,
    [
      [29, 58],
      [26, 84],
    ],
    "#715b27",
    2,
  );
  line(
    c,
    [
      [100, 54],
      [109, 89],
    ],
    "#715b27",
    2,
  );
  fern(c, 23, 101, 0.5, 3);
}
function mushroom(c, variant) {
  shadow(c, 30, 54, 22, 7);
  path(
    c,
    [
      [24, 51],
      [23, 28],
      [35, 28],
      [38, 54],
    ],
    "#e5d7a7",
    "#8a774a",
    1.5,
  );
  c.beginPath();
  c.moveTo(6, 30);
  c.bezierCurveTo(7, 0, 48, -5, 55, 30);
  c.quadraticCurveTo(32, 43, 6, 30);
  c.fillStyle = variant ? "#c78c44" : "#b66a43";
  c.fill();
  c.strokeStyle = "#755739";
  c.lineWidth = 1.6;
  c.stroke();
  ellipse(c, 20, 17, 5, 3, "#efd3a0", null);
  ellipse(c, 41, 23, 5, 3, "#efd3a0", null);
  ellipse(c, 34, 10, 3, 2, "#efd3a0", null);
}
function bush(c, seed) {
  let r = seeded(seed);
  shadow(c, 45, 58, 40, 11);
  for (let i = 0; i < 12; i++) {
    leaf(
      c,
      15 + r() * 65,
      47 + r() * 19,
      22 + r() * 22,
      (r() - 0.5) * 2.6,
      ["#6f9838", "#83a642", "#9fbc4c"][i % 3],
    );
  }
}
function rock(c) {
  shadow(c, 44, 58, 37, 10);
  path(
    c,
    [
      [5, 51],
      [16, 15],
      [45, 4],
      [73, 24],
      [82, 55],
      [48, 66],
    ],
    "#8e9979",
    "#5e6f4f",
    2,
  );
  path(
    c,
    [
      [16, 15],
      [45, 4],
      [44, 32],
      [5, 51],
    ],
    "#b2b69a",
    null,
  );
  path(
    c,
    [
      [44, 32],
      [73, 24],
      [82, 55],
      [48, 66],
    ],
    "#7c896b",
    null,
  );
  line(
    c,
    [
      [19, 23],
      [29, 17],
      [38, 17],
    ],
    "#d0cfb3",
    2,
  );
  leaf(c, 62, 61, 24, 0.7, "#8ab349");
}
function rockCluster(c, variant = 0) {
  const arrangements = [
    [[4, 18, 0.65], [55, 0, 0.8], [112, 26, 0.48]],
    [[0, 8, 0.78], [62, 24, 0.62], [108, 0, 0.56]],
  ];
  for (const [x, y, scale] of arrangements[variant % arrangements.length]) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    rock(c);
    c.restore();
  }
}
function building(c, kind = 0) {
  shadow(c, 180, 285, 158, 28);
  path(
    c,
    [
      [43, 154],
      [316, 154],
      [316, 273],
      [45, 279],
    ],
    kind === 1 ? "#ae9c6e" : "#9c7b50",
    "#4e462f",
    3,
  );
  for (let y = 169; y < 275; y += 19)
    line(
      c,
      [
        [49, y],
        [313, y],
      ],
      "#705b3c",
      1.5,
    );
  for (let x = 59; x < 315; x += 64) {
    path(
      c,
      [
        [x, 158],
        [x + 10, 158],
        [x + 10, 279],
        [x, 278],
      ],
      "#654831",
      "#463e2b",
      1,
    );
  }
  path(
    c,
    [
      [27, 156],
      [99, 78],
      [184, 42],
      [271, 82],
      [337, 154],
      [304, 174],
      [63, 172],
    ],
    "#9d5a36",
    "#533f28",
    3,
  );
  for (let i = 0; i < 6; i++) {
    const y = 92 + i * 13;
    const lx = 96 - i * 10,
      rx = 271 + i * 10;
    line(
      c,
      [
        [lx, y],
        [180, y + 10],
        [rx, y],
      ],
      "#70472e",
      2,
    );
  }
  path(
    c,
    [
      [157, 176],
      [210, 176],
      [210, 279],
      [157, 279],
    ],
    "#483e29",
    "#c5a15b",
    3,
  );
  ellipse(c, 204, 231, 2, 2, "#ddbe67", null);
  for (const x of [82, 244]) {
    path(
      c,
      [
        [x, 186],
        [x + 43, 186],
        [x + 43, 228],
        [x, 228],
      ],
      "#597974",
      "#483d2b",
      3,
    );
    line(
      c,
      [
        [x + 21, 187],
        [x + 21, 227],
      ],
      "#c7ac6c",
      3,
    );
    line(
      c,
      [
        [x, 206],
        [x + 43, 206],
      ],
      "#c7ac6c",
      3,
    );
    path(
      c,
      [
        [x - 5, 231],
        [x + 48, 231],
        [x + 48, 241],
        [x - 5, 241],
      ],
      "#684d32",
      "#4e412c",
      1,
    );
    for (let i = 0; i < 5; i++)
      leaf(c, x + i * 9, 233, 13, (i - 2) * 0.3, "#a1b74d");
  }
  path(
    c,
    [
      [145, 147],
      [215, 147],
      [215, 168],
      [145, 168],
    ],
    "#dccb87",
    "#66522b",
    2,
  );
  c.fillStyle = "#5c4d2c";
  c.font = "bold 12px Georgia";
  c.textAlign = "center";
  c.fillText(["ALDEA", "LA FORJA", "ESTABLO"][kind], 180, 162);
  path(
    c,
    [
      [270, 93],
      [270, 21],
      [297, 21],
      [297, 112],
    ],
    "#b99864",
    "#665537",
    2,
  );
  ellipse(c, 284, 21, 17, 6, "#55583a", "#665537", 2);
}
function villageHut(c, variant = 0) {
  const roofs = ["#9a5937", "#89523a", "#a1663d"];
  const roof = roofs[variant % roofs.length];
  const wall = variant === 1 ? "#795538" : "#8a613d";
  shadow(c, 180, 286, 157, 26);

  // Rounded timber body, with curved log courses like the village huts in the footage.
  c.beginPath();
  c.moveTo(54, 145);
  c.quadraticCurveTo(180, 118, 306, 145);
  c.lineTo(300, 255);
  c.quadraticCurveTo(180, 292, 60, 255);
  c.closePath();
  c.fillStyle = wall;
  c.strokeStyle = "#4e3927";
  c.lineWidth = 3;
  c.fill();
  c.stroke();
  for (let y = 165; y <= 246; y += 18) {
    c.beginPath();
    c.moveTo(62, y);
    c.quadraticCurveTo(180, y + (y % 2 ? 3 : -2), 298, y - 1);
    c.strokeStyle = y % 3 ? "#583f2d" : "#bd8b53";
    c.lineWidth = y % 3 ? 2 : 1.2;
    c.stroke();
  }
  for (const x of [83, 276]) {
    line(c, [[x, 153], [x + (x < 100 ? 4 : -4), 257]], "#573c29", 4);
    line(c, [[x + 4, 174], [x + 3, 232]], "#bd8b53", 1.2);
  }

  // Wide, rounded thatch roof. The curved courses suggest bundled shingles
  // without implying an unrecovered texture or exact original geometry.
  c.beginPath();
  c.moveTo(23, 157);
  c.quadraticCurveTo(42, 97, 92, 63);
  c.quadraticCurveTo(137, 31, 180, 34);
  c.quadraticCurveTo(235, 28, 280, 67);
  c.quadraticCurveTo(322, 103, 339, 157);
  c.quadraticCurveTo(276, 176, 180, 165);
  c.quadraticCurveTo(83, 176, 23, 157);
  c.closePath();
  c.fillStyle = roof;
  c.strokeStyle = "#4f3927";
  c.lineWidth = 3;
  c.fill();
  c.stroke();
  for (let i = 0; i < 5; i++) {
    const y = 79 + i * 14;
    c.beginPath();
    c.moveTo(56 - i * 5, y + 33);
    c.quadraticCurveTo(180, y - 5, 304 + i * 5, y + 33);
    c.strokeStyle = i % 2 ? "#75472f" : "#c1844d";
    c.lineWidth = i % 2 ? 2 : 1.4;
    c.stroke();
  }
  for (const [x, y] of [[58, 116], [97, 79], [145, 58], [218, 60], [270, 91], [307, 126]]) {
    line(c, [[x, y], [x + (x < 180 ? 9 : -9), y + 23]], "#d09a5e", 2);
  }

  // A dark arched entrance and one round window keep each hut readable at game scale.
  c.beginPath();
  c.moveTo(144, 263);
  c.lineTo(144, 216);
  c.quadraticCurveTo(144, 183, 180, 183);
  c.quadraticCurveTo(216, 183, 216, 216);
  c.lineTo(216, 263);
  c.closePath();
  c.fillStyle = "#3d3928";
  c.strokeStyle = "#d2ad68";
  c.lineWidth = 3;
  c.fill();
  c.stroke();
  line(c, [[180, 188], [180, 260]], "#8b6b44", 2);
  ellipse(c, 206, 229, 2.5, 2.5, "#e3c36e", null);
  ellipse(c, variant === 2 ? 112 : 247, 190, 16, 16, "#5c8172", "#4c3928", 3);
  line(c, [[variant === 2 ? 112 : 247, 176], [variant === 2 ? 112 : 247, 204]], "#d5b66d", 2);
  line(c, [[variant === 2 ? 98 : 233, 190], [variant === 2 ? 126 : 261, 190]], "#d5b66d", 2);
}
function board(c) {
  shadow(c, 62, 112, 57, 10);
  path(
    c,
    [
      [10, 19],
      [117, 19],
      [115, 92],
      [12, 92],
    ],
    "#9a7747",
    "#5c4e2d",
    3,
  );
  path(
    c,
    [
      [18, 30],
      [109, 30],
      [109, 83],
      [18, 83],
    ],
    "#bda170",
    "#695737",
    1.5,
  );
  path(
    c,
    [
      [7, 17],
      [18, 3],
      [113, 3],
      [124, 17],
    ],
    "#739270",
    "#3c5c45",
    2,
  );
  line(
    c,
    [
      [22, 92],
      [22, 113],
    ],
    "#735636",
    8,
  );
  line(
    c,
    [
      [104, 92],
      [104, 111],
    ],
    "#735636",
    8,
  );
  for (const [x, y, a] of [
    [27, 38, 0.05],
    [55, 48, -0.07],
    [83, 34, 0.1],
  ]) {
    c.save();
    c.translate(x, y);
    c.rotate(a);
    path(
      c,
      [
        [0, 0],
        [23, 0],
        [23, 28],
        [0, 28],
      ],
      "#e8dfb1",
      "#88784e",
      1,
    );
    for (let j = 0; j < 3; j++)
      line(
        c,
        [
          [4, 8 + j * 5],
          [18, 8 + j * 5],
        ],
        "#b0a078",
        1,
      );
    c.restore();
  }
  ellipse(c, 67, 25, 2, 2, "#ecd377", null);
}
function lamp(c) {
  shadow(c, 25, 124, 18, 7);
  line(
    c,
    [
      [25, 124],
      [25, 36],
    ],
    "#48523b",
    6,
  );
  path(
    c,
    [
      [14, 24],
      [36, 24],
      [34, 43],
      [16, 43],
    ],
    "#f3d686",
    "#475542",
    3,
  );
  path(
    c,
    [
      [9, 24],
      [25, 12],
      [40, 24],
    ],
    "#5b7959",
    "#354a35",
    2,
  );
  line(
    c,
    [
      [25, 24],
      [25, 42],
    ],
    "#6a7750",
    2,
  );
  ellipse(c, 25, 118, 12, 4, "#687755", "#48533a", 2);
}
function fountain(c) {
  shadow(c, 73, 86, 67, 18);
  ellipse(c, 73, 73, 61, 28, "#919d7a", "#536844", 2);
  ellipse(c, 73, 65, 58, 25, "#82bca3", "#556e4b", 3);
  ellipse(c, 73, 66, 49, 18, "#a3cfb7", null);
  path(
    c,
    [
      [62, 69],
      [64, 20],
      [82, 20],
      [86, 69],
    ],
    "#a4b28f",
    "#697c55",
    2,
  );
  ellipse(c, 73, 19, 25, 10, "#b2be99", "#5b724b", 2);
  ellipse(c, 73, 15, 23, 9, "#91bbae", "#5b724b", 1);
  line(
    c,
    [
      [73, 10],
      [73, -7],
    ],
    "#c5ded1",
    3,
  );
  ellipse(c, 73, -8, 5, 6, "#c5ded1", null);
}
function bench(c, variant = 0) {
  const slats = variant === 1 ? ["#b38b55", "#c39a5d", "#a77d49"] : ["#9c7445", "#b38b55", "#8d683f"];
  shadow(c, 80, 78, 58, 10);
  // Backrest: three warm wooden boards held by dark, angled supports.
  for (let i = 0; i < 3; i++) {
    const y = 13 + i * 13;
    path(c, [[25, y], [132, y - 3], [137, y + 7], [28, y + 11]], slats[(i + variant) % slats.length], "#59432a", 2);
    line(c, [[36, y + 3], [123, y + 1]], "#d1a76c", 1);
  }
  line(c, [[42, 17], [47, 62]], "#55452f", 6);
  line(c, [[118, 13], [115, 61]], "#55452f", 6);
  // Seat boards and four short legs.
  path(c, [[19, 58], [139, 56], [145, 69], [23, 72]], "#b38b55", "#59432a", 2.5);
  line(c, [[27, 63], [136, 61]], "#d3ac70", 1.5);
  line(c, [[34, 69], [29, 87]], "#59432a", 7);
  line(c, [[130, 67], [136, 84]], "#59432a", 7);
  line(c, [[48, 70], [47, 81]], "#765636", 5);
  line(c, [[116, 68], [120, 80]], "#765636", 5);
}
function ancientTree(c, variant = 0) {
  const r = seeded(440 + variant * 31);
  shadow(c, 172, 492, 142, 31);
  // The reference forest is framed by oversized trunks and a dense canopy.
  path(c, [[78, 492], [42, 406], [58, 326], [43, 224], [62, 119], [57, 0], [278, 0], [270, 120], [302, 232], [280, 342], [311, 428], [270, 492], [220, 466], [178, 499], [133, 470]], "#70502c", "#443a22", 5);
  path(c, [[92, 478], [74, 398], [95, 318], [79, 222], [104, 123], [100, 5], [148, 5], [145, 154], [167, 263], [151, 389], [180, 483]], "#956b35", null);
  path(c, [[230, 478], [207, 390], [235, 302], [217, 205], [249, 116], [238, 0], [276, 0], [270, 121], [302, 232], [280, 342], [311, 428], [270, 492]], "#59452a", null);
  for (let i = 0; i < 18; i++) {
    const x = 84 + r() * 185;
    const y = r() * 455;
    line(c, [[x, y], [x + (r() - 0.5) * 16, y + 55 + r() * 28]], i % 2 ? "#b18a4a" : "#514529", 2 + r() * 2);
  }
  // Broad roots and moss make the trunks sit inside the playable forest floor.
  path(c, [[48, 470], [14, 498], [108, 480], [166, 501], [214, 477], [319, 500], [286, 459], [241, 452], [184, 481], [127, 452]], "#6d4e2b", "#443a22", 3);
  for (let i = 0; i < 28; i++) {
    const x = 30 + r() * 290;
    const y = 455 + r() * 38;
    leaf(c, x, y, 13 + r() * 17, (r() - 0.5) * 2.4, ["#789536", "#91aa43", "#607f31"][i % 3]);
  }
  // Canopy is deliberately cropped at the top edge, as in the captured camera view.
  for (let i = 0; i < 22; i++) {
    const x = 15 + r() * 320;
    const y = 5 + r() * 90;
    ellipse(c, x, y, 24 + r() * 30, 18 + r() * 24, ["#345d28", "#47732e", "#628839"][i % 3], "#35542a", 1.3);
    for (let n = 0; n < 4; n++) leaf(c, x + (r() - 0.5) * 45, y + r() * 24, 18 + r() * 13, (r() - 0.5) * 2, ["#9db749", "#789b3c", "#b3c35a"][n % 3]);
  }
  fern(c, 44, 488, 1.2, variant + 61);
  fern(c, 304, 488, 1, variant + 62);
}
function fallenLog(c, variant = 0) {
  const r = seeded(620 + variant * 17);
  shadow(c, 204, 105, 188, 21);
  path(c, [[13, 75], [42, 43], [109, 35], [151, 48], [329, 45], [380, 67], [368, 105], [51, 112], [16, 98]], "#694625", "#49351f", 4);
  path(c, [[41, 57], [103, 47], [150, 61], [325, 57], [371, 76], [353, 96], [61, 99], [32, 84]], "#a4783c", "#624526", 3);
  for (let i = 0; i < 11; i++) {
    const x = 52 + r() * 285;
    line(c, [[x, 54 + r() * 9], [x - 6 + r() * 12, 92 + r() * 5]], i % 2 ? "#79522d" : "#c0924c", 2);
  }
  ellipse(c, 373, 77, 25, 22, "#d2ab5c", "#644a2b", 3);
  ellipse(c, 373, 77, 17, 15, null, "#a47e42", 2);
  ellipse(c, 375, 77, 8, 7, null, "#a47e42", 1.4);
  fern(c, 45, 111, 0.95, variant + 4);
  fern(c, 339, 105, 0.85, variant + 8);
}
function twig(c, variant = 0) {
  const flip = variant % 2 ? -1 : 1;
  shadow(c, 46, 35, 39, 4);
  path(
    c,
    [
      [7, 31], [20, 25], [31, 18], [43, 15], [56, 17], [75, 12],
      [83, 14], [77, 20], [59, 23], [45, 21], [34, 25], [22, 31], [10, 36],
    ],
    "#79522e",
    "#49371f",
    2,
  );
  line(c, [[31, 20], [27 + flip * 3, 11], [21 + flip * 5, 7]], "#8b6132", 3);
  line(c, [[56, 20], [62 + flip * 2, 29], [69 + flip * 4, 32]], "#604526", 3);
  line(c, [[15, 29], [23, 27], [31, 22]], "#b08449", 1.2);
}
function woodPile(c, variant = 0) {
  shadow(c, 112, 139, 101, 17);
  path(c, [[13, 130], [22, 111], [201, 110], [215, 132], [189, 145], [36, 146]], "#51351f", "#3d2c1d", 3);
  const boards = variant
    ? [
        [24, 103, 137, 21, -0.07], [75, 81, 129, 22, 0.06],
        [5, 58, 153, 21, 0.1], [103, 37, 108, 20, -0.09],
        [34, 20, 127, 19, 0.04], [119, 101, 78, 18, 0.08],
        [8, 83, 88, 19, -0.12],
      ]
    : [
        [18, 105, 158, 21, 0.05], [67, 83, 135, 22, -0.08],
        [9, 61, 149, 21, -0.06], [92, 42, 112, 20, 0.1],
        [33, 23, 144, 19, -0.04], [120, 94, 83, 18, -0.1],
        [3, 84, 92, 19, 0.12],
      ];
  const colors = ["#684626", "#80532c", "#55391f", "#956538", "#71502c", "#4f3924", "#a27642"];
  boards.forEach(([x, y, width, height, angle], index) => {
    c.save();
    c.translate(x + width / 2, y + height / 2);
    c.rotate(angle);
    path(c, [[-width / 2 + 4, -height / 2], [width / 2 - 8, -height / 2 + 1], [width / 2, -height / 2 + 5], [width / 2 - 3, height / 2 - 2], [-width / 2 + 7, height / 2], [-width / 2, height / 2 - 5]], colors[index], "#3d2c1d", 2);
    line(c, [[-width / 2 + 9, -height / 2 + 4], [width / 2 - 15, -height / 2 + 5]], "#b4864d", 1.5);
    line(c, [[width / 2 - 12, -height / 2 + 5], [width / 2 - 9, height / 2 - 5]], "#4b3521", 1.2);
    c.restore();
  });
  for (const [x, y, rotation] of [[31, 57, -0.13], [177, 76, 0.16], [122, 25, -0.08]]) {
    c.save();
    c.translate(x, y);
    c.rotate(rotation);
    path(c, [[-6, 20], [-5, -16], [-1, -21], [5, -18], [6, 20]], "#8b5e32", "#47331f", 1.8);
    line(c, [[0, -13], [1, 14]], "#bc8d50", 1.2);
    c.restore();
  }
}
function flowerbed(c, variant = 0) {
  const r = seeded(780 + variant * 29);
  for (let i = 0; i < 12; i++) {
    const x = 18 + r() * 190;
    const y = 90 + r() * 25;
    fern(c, x, y, 0.55 + r() * 0.65, variant * 12 + i);
    if (i % 2 === 0) flower(c, x + (r() - 0.5) * 18, y - 8, i % 4 ? "#eee9cd" : "#a06ab2", 0.75 + r() * 0.7);
  }
}
function bramble(c, variant = 0) {
  const r = seeded(900 + variant * 13);
  for (let i = 0; i < 16; i++) {
    const x = 10 + r() * 210;
    const y = 80 + r() * 28;
    ellipse(c, x, y - 18 - r() * 18, 15 + r() * 19, 13 + r() * 17, ["#47752f", "#668b38", "#375f2a"][i % 3], "#354f29", 1.2);
    for (let n = 0; n < 3; n++) leaf(c, x + (r() - 0.5) * 20, y, 13 + r() * 8, (r() - 0.5) * 2.5, "#a8b94c");
  }
}
const sizes = {
  tree: [250, 320, 125, 294],
  sapling: [140, 330, 70, 320],
  ancientTree: [340, 520, 170, 492],
  fallenLog: [410, 130, 205, 108],
  twig: [90, 45, 45, 35],
  woodPile: [230, 165, 115, 150],
  flowerbed: [220, 130, 110, 110],
  bramble: [230, 125, 115, 112],
  stump: [150, 120, 73, 96],
  mushroom: [65, 65, 30, 54],
  bush: [95, 80, 45, 58],
  rock: [90, 80, 44, 58],
  rockCluster: [180, 105, 90, 86],
  building: [360, 320, 180, 280],
  hut: [360, 320, 180, 280],
  board: [130, 125, 62, 110],
  lamp: [50, 135, 25, 124],
  fountain: [150, 110, 73, 85],
  bench: [165, 100, 82, 87],
  fern: [110, 100, 55, 85],
  fernFan: [300, 230, 150, 220],
};
export function decoration(c, o) {
  const [w, h, ax, ay] = sizes[o.kind];
  const spr = cached(`${o.kind}-${o.variant || 0}`, w, h, (cc) => {
    if (o.kind === "tree") tree(cc, o.variant || 0);
    if (o.kind === "sapling") sapling(cc, o.variant || 0);
    if (o.kind === "ancientTree") ancientTree(cc, o.variant || 0);
    if (o.kind === "fallenLog") fallenLog(cc, o.variant || 0);
    if (o.kind === "twig") twig(cc, o.variant || 0);
    if (o.kind === "woodPile") woodPile(cc, o.variant || 0);
    if (o.kind === "flowerbed") flowerbed(cc, o.variant || 0);
    if (o.kind === "bramble") bramble(cc, o.variant || 0);
    if (o.kind === "stump") stump(cc);
    if (o.kind === "mushroom") mushroom(cc, o.variant);
    if (o.kind === "bush") bush(cc, o.variant || 0);
    if (o.kind === "rock") rock(cc);
    if (o.kind === "rockCluster") rockCluster(cc, o.variant || 0);
    if (o.kind === "building") building(cc, o.variant || 0);
    if (o.kind === "hut") villageHut(cc, o.variant || 0);
    if (o.kind === "board") board(cc);
    if (o.kind === "lamp") lamp(cc);
    if (o.kind === "fountain") fountain(cc);
    if (o.kind === "bench") bench(cc, o.variant || 0);
    if (o.kind === "fern") fern(cc, 55, 85, 1.7, o.variant || 0);
    if (o.kind === "fernFan") fernFan(cc, o.variant || 0);
  });
  const authoredScale = o.scale || 1;
  // The first forest pass made fan ferns compete with trunks and characters.
  // Keep map-authored scale intact while tuning this decorative species here.
  const s = authoredScale * (o.kind === "fernFan" ? 0.78 : 1);
  c.drawImage(spr, o.x - ax * s, o.y - ay * s, w * s, h * s);
}
export function makeGround(width, height, seed, village = false, layout = "meadow") {
  const el = document.createElement("canvas");
  el.width = width;
  el.height = height;
  const c = el.getContext("2d");
  const r = seeded(seed);
  const isOpenVillagePlaza = (x, y) =>
    ((x - width * 0.5) / 560) ** 2 + ((y - height * 0.5) / 310) ** 2 < 1;
  c.fillStyle = village ? "#8fae43" : layout.startsWith("forest-") ? FOREST_PALETTE.grass : "#86a93c";
  c.fillRect(0, 0, width, height);
  for (let i = 0; i < 450; i++) {
    const x = r() * width,
      y = r() * height;
    if (village && isOpenVillagePlaza(x, y)) continue;
    ellipse(
      c,
      x,
      y,
      15 + r() * 65,
      8 + r() * 35,
      layout.startsWith("forest-") ? (i % 3 ? "#98ab43" : "#879f37") : (i % 3 ? "#99b548" : "#7f9f38"),
      null,
    );
  }
  // Forest ground follows the visible route: broad moss clearings, a narrow
  // winding corridor, and a pond-side boss arena. All shapes are hand-authored.
  c.lineCap = "round";
  c.lineJoin = "round";
  const strokePath = (color, lineWidth, draw) => {
    c.strokeStyle = color;
    c.lineWidth = lineWidth;
    c.beginPath();
    draw();
    c.stroke();
  };
  if (layout === "forest-corridor") {
    // Dark edges are visible in the footage where grass meets the worn trail.
    const route = () => {
      c.moveTo(-40, 675);
      c.bezierCurveTo(280, 585, 460, 730, 710, 640);
      c.bezierCurveTo(950, 555, 1100, 720, 1330, 620);
      c.bezierCurveTo(1540, 540, 1710, 695, 1890, 615);
    };
    strokePath(FOREST_PALETTE.edge, 168, route);
    strokePath(FOREST_PALETTE.trail, 158, route);
  } else if (layout === "forest-clearing") {
    c.beginPath();
    c.moveTo(90, 685);
    c.bezierCurveTo(145, 455, 380, 390, 590, 452);
    c.bezierCurveTo(800, 350, 1110, 390, 1240, 540);
    c.bezierCurveTo(1440, 565, 1545, 750, 1410, 865);
    c.bezierCurveTo(1190, 1000, 950, 900, 770, 976);
    c.bezierCurveTo(540, 1040, 250, 930, 90, 825);
    c.closePath();
    c.fillStyle = FOREST_PALETTE.trail;
    c.fill();
    c.strokeStyle = FOREST_PALETTE.edge;
    c.lineWidth = 3;
    c.stroke();
    c.save(); c.clip();
    drawClearingGrass(c, width, height, seeded(seed ^ 0x51ab39));
    c.restore();
    strokePath("#b1aa46", 18, () => {
      c.moveTo(220, 790);
      c.bezierCurveTo(500, 750, 520, 555, 820, 585);
      c.bezierCurveTo(1030, 605, 1210, 705, 1430, 655);
    });
  } else if (layout === "forest-pond") {
    strokePath("#586f32", 176, () => {
      c.moveTo(-60, 705);
      c.bezierCurveTo(320, 620, 480, 780, 830, 680);
      c.bezierCurveTo(1110, 585, 1260, 720, 1470, 600);
    });
    strokePath(FOREST_PALETTE.trail, 145, () => {
      c.moveTo(-60, 705);
      c.bezierCurveTo(320, 620, 480, 780, 830, 680);
      c.bezierCurveTo(1110, 585, 1260, 720, 1470, 600);
    });
    const shoreline = () => {
      c.beginPath();
      c.moveTo(1510, 760);
      c.bezierCurveTo(1487, 704, 1546, 652, 1612, 640);
      c.bezierCurveTo(1670, 590, 1763, 618, 1796, 666);
      c.bezierCurveTo(1860, 694, 1880, 753, 1848, 806);
      c.bezierCurveTo(1830, 864, 1773, 889, 1722, 875);
      c.bezierCurveTo(1655, 911, 1571, 871, 1543, 835);
      c.bezierCurveTo(1516, 816, 1501, 786, 1510, 760);
      c.closePath();
    };
    const water = () => {
      c.beginPath();
      c.moveTo(1540, 758);
      c.bezierCurveTo(1522, 713, 1573, 674, 1628, 662);
      c.bezierCurveTo(1682, 624, 1748, 641, 1775, 682);
      c.bezierCurveTo(1825, 705, 1845, 754, 1818, 798);
      c.bezierCurveTo(1804, 842, 1755, 858, 1713, 850);
      c.bezierCurveTo(1657, 877, 1594, 843, 1568, 817);
      c.bezierCurveTo(1547, 802, 1533, 779, 1540, 758);
      c.closePath();
    };
    shoreline();
    c.fillStyle = "#b3aa55";
    c.fill();
    water();
    c.fillStyle = "#637f40";
    c.fill();
    c.save();
    c.clip();
    c.fillStyle = "#68a8a3";
    c.fillRect(1520, 620, 340, 300);
    c.globalAlpha = 0.26;
    c.strokeStyle = "#c3dbb4";
    c.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      const x = 1585 + r() * 230;
      const y = 680 + r() * 150;
      c.beginPath();
      c.ellipse(x, y, 10 + r() * 18, 2 + r() * 4, r() * 0.2 - 0.1, 0, TAU);
      c.stroke();
    }
    c.restore();
  } else if (village) {
    // The captured plaza is a broad grassy clearing ringed by a winding path,
    // not the generic crossing used by the early local draft.
    const plazaLoop = () => {
      c.moveTo(100, 700);
      c.bezierCurveTo(155, 500, 385, 360, 700, 430);
      c.bezierCurveTo(1010, 485, 1190, 660, 1470, 620);
      c.bezierCurveTo(1750, 580, 1900, 430, 2080, 560);
      c.bezierCurveTo(2260, 690, 2220, 960, 2000, 1080);
      c.bezierCurveTo(1750, 1200, 1515, 1000, 1330, 900);
      c.bezierCurveTo(1080, 765, 930, 990, 670, 1080);
      c.bezierCurveTo(420, 1165, 205, 1010, 100, 700);
      c.closePath();
    };
    strokePath("#8c9743", 182, plazaLoop);
    strokePath("#b7b461", 158, plazaLoop);
    // A short spur leads from the loop to the announcement board and fountain.
    strokePath("#8c9743", 130, () => {
      c.moveTo(720, 435);
      c.bezierCurveTo(780, 500, 820, 550, 865, 630);
    });
    strokePath("#b7b461", 108, () => {
      c.moveTo(720, 435);
      c.bezierCurveTo(780, 500, 820, 550, 865, 630);
    });
  } else {
    strokePath("#b8b657", village ? 160 : 110, () => {
      c.moveTo(0, height * 0.6);
      c.bezierCurveTo(width * 0.3, height * 0.7, width * 0.4, height * 0.35, width * 0.6, height * 0.48);
      c.bezierCurveTo(width * 0.85, height * 0.6, width * 0.85, height * 0.3, width, height * 0.4);
    });
  }
  for (let i = 0; i < 950; i++) {
    const x = r() * width,
      y = r() * height;
    if (village && isOpenVillagePlaza(x, y) && i % 5 !== 0) continue;
    if (i % 3 === 0) {
      ellipse(c, x, y, 4 + r() * 5, 2 + r() * 3, "#b0b96a", "#8e9f4c", 0.7);
    } else grass(c, x, y, 0.4 + r() * 0.4);
  }
  for (let i = 0; i < 130; i++) {
    const x = r() * width,
      y = r() * height;
    if (village && isOpenVillagePlaza(x, y)) continue;
    flower(c, x, y, i % 4 ? "#ebecc3" : "#ab80bc", 0.6 + r() * 0.3);
  }
  if (layout.startsWith("forest-"))
    drawForestLitter(c, width, height, seeded(seed ^ 0x13579), layout === "forest-pond");
  if (!village && !layout.startsWith("forest-")) {
    c.beginPath();
    c.ellipse(width - 100, height - 100, 230, 135, -0.2, 0, TAU);
    c.fillStyle = "#7a9e43";
    c.fill();
    c.beginPath();
    c.ellipse(width - 80, height - 95, 210, 120, -0.2, 0, TAU);
    c.fillStyle = "#72b6b4";
    c.fill();
    c.strokeStyle = "#c8c580";
    c.lineWidth = 7;
    c.stroke();
    for (let i = 0; i < 16; i++)
      ellipse(
        c,
        width - 200 + r() * 260,
        height - 140 + r() * 90,
        8 + r() * 12,
        3,
        "#9fc7ad",
        null,
      );
  }
  return el;
}
function creatureVerticalScale(e, time) {
  let startedAt = -Infinity;
  let scale = 1;
  for (const [eventTime, initialScale] of [
    [e.reanimationStartedAt, 0.6],
    [e.hitSquashStartedAt, 0.5],
    [e.turnSquashStartedAt, 0.9],
  ]) {
    if (Number.isFinite(eventTime) && eventTime >= startedAt) {
      startedAt = eventTime;
      scale = initialScale;
    }
  }
  if (!Number.isFinite(startedAt)) return 1;
  const frames = Math.max(0, (time - startedAt) * 60);
  return 1 - (1 - scale) * Math.pow(0.8, frames);
}
export function mouse(
  c,
  e,
  time,
  {
    color = "#9f8162",
    npc = false,
    showName = npc,
    weapon = "sword",
    secondary = "bandage",
    hat = false,
    clothing = [],
  } = {},
) {
  const definition = WEAPONS[weapon];
  const guardStartedAt = Number.isFinite(e.guardStartedAt)
    ? e.guardStartedAt
    : time - 1;
  const guardElapsed = Math.max(0, time - guardStartedAt);
  const guardPrepAnimation = secondary === "shield"
    ? "paradeG-prep"
    : "parade-prep";
  const guardPrepFrames = originalAnimationFrameCount(2, guardPrepAnimation);
  // Playback speed 10 is supplied by the client, but its unit is not present
  // in the recovered renderer. Use the renderer's 60 fps clock for this clip.
  const guardPrepDuration = (guardPrepFrames ?? 16) / 60;
  const originalAnim = e.socialEmote
    ? e.socialEmote.animation
    : npc
    ? "statique"
    : e.casting
      ? "incantation1"
      : e.healFinish > 0
        ? "ambi_comp1"
        : e.guarding
          ? guardElapsed < guardPrepDuration
            ? guardPrepAnimation
            : secondary === "shield"
              ? "paradeG"
              : "parade"
          : e.action
            ? definition.ranged
          ? e.action.hit
            ? "arc_tir"
            : "arc_charge"
              : e.action.animation ?? definition.animation
            : e.attackVisual
              ? e.attackVisual.animation
            : e.guardReleasePose && !e.moving
              ? "statique"
            : e.moving
              ? "course"
              : weapon === "bow"
                ? "statique:arc"
                : weapon === "greatsword"
                  ? "statique:epee2m"
                  : "statique:ambi";
  const idlePose = originalAnim === "statique" ||
    (originalAnim.startsWith("statique:") &&
      originalAnim !== "statique:combat" &&
      originalAnim !== "statique:stun");
  let animationTime = e.socialEmote
    ? e.socialEmote.elapsed * 1000
    : e.casting
    ? (e.casting.kind === "bandage" ? 1 : 3) * 1000 - e.casting.remaining * 1000
    : e.healFinish > 0
      ? (0.25 - e.healFinish) * 1000
      : e.guarding
        ? guardElapsed * 1000
      : e.action
        ? definition.ranged && e.action.weapon === "bow"
          ? e.action.hit
            ? Math.max(0, e.action.releaseElapsed - definition.releaseDelay) * 1000
            : e.action.elapsed * (e.action.animationSpeed || 1) * 1000
          : e.action.animationLoopFrames > 0
          ? ((e.action.elapsed * (e.action.animationSpeed || 1) * 60) % e.action.animationLoopFrames) * (1000 / 60)
          : Math.max(
              0,
              e.action.elapsed -
                (definition.ranged && e.action.elapsed >= definition.windup
                  ? definition.windup
                  : 0),
            ) * 1000
        : e.attackVisual
          ? e.attackVisual.elapsed * 1000
        : idlePose
          ? 0
        : e.moving
          ? (e.movementAnimationTime || 0) * 1000
          : time * 1000;
  if (originalReady) {
    shadow(c, e.x, e.y, 19, 7);
    c.save();
    if (color === "#d3c6a7") c.filter = "saturate(.25) brightness(1.5)";
    if (color === "#716f70") c.filter = "saturate(.15) brightness(.8)";
    const verticalScale = creatureVerticalScale(e, time);
    if (verticalScale < 1) {
      c.translate(e.x, e.y);
      c.scale(1, verticalScale);
      c.translate(-e.x, -e.y);
    }
    const drawn = drawOriginalCreature(
      c,
      2,
      originalAnim,
      e.x,
      e.y,
      animationTime,
      e.socialEmote?.facing ?? e.attackVisual?.facing ?? e.facing ?? 1,
      0.55,
      {
        clothing: [
          ...clothing,
          ...(hat ? [8] : []),
          ...(weapon
            ? [
                weapon === "bow"
                  ? 20
                  : weapon === "greatsword"
                    ? 16
                    : weapon === "dagger"
                      ? 22
                      : 5,
              ]
            : []),
          ...(secondary === "shield" && !definition?.twoHanded ? [6] : []),
        ],
      },
    );
    c.restore();
    if (drawn) {
      if (npc && showName && e.name) label(c, e.name, e.x, e.y - 68, "#d7e2ba", 12);

      return;
    }
  }
  const moving = e.moving,
    phase = time * 13 + (e.seed || 0),
    bob = moving ? Math.abs(Math.sin(phase)) * 2 : Math.sin(time * 2) * 0.5;
  shadow(c, e.x, e.y, 19, 7);
  c.save();
  c.translate(e.x, e.y - bob);
  c.scale(e.facing || 1, creatureVerticalScale(e, time));
  c.lineCap = "round";
  c.lineJoin = "round";
  line(
    c,
    [
      [-12, -6],
      [-27, -3],
      [-37, -11],
      [-34, -17],
    ],
    "#bc967f",
    3,
  );
  const step = moving ? Math.sin(phase) * 4 : 0;
  ellipse(c, -8 + step, -1, 8, 3, "#d0b394", "#64503c", 1.5);
  ellipse(c, 9 - step, 0, 8, 3, "#d0b394", "#64503c", 1.5);
  ellipse(c, -3, -14, 14, 18, color, "#574b37", 2, 0.1);
  ellipse(c, 4, -11, 8, 11, "#d2bea0", null);
  ellipse(c, -5, -39, 12, 14, color, "#574b37", 2, -0.2);
  ellipse(c, -5, -40, 7, 9, "#c99b91", "#7a6050", 1);
  ellipse(c, 4, -28, 16, 13, color, "#574b37", 2);
  path(
    c,
    [
      [7, -30],
      [26, -22],
      [22, -16],
      [9, -15],
    ],
    color,
    "#574b37",
    1.7,
  );
  ellipse(c, 12, -29, 4.5, 6, "#fff8e1", "#514733", 1);
  ellipse(c, 14, -28, 2.5, 4, "#2c2924", null);
  ellipse(c, 25, -21, 3, 2.3, "#c89081", "#695140", 0.8);
  line(
    c,
    [
      [17, -20],
      [31, -18],
    ],
    "#685843",
    0.7,
  );
  line(
    c,
    [
      [17, -18],
      [29, -14],
    ],
    "#685843",
    0.7,
  );
  ellipse(c, 18, -17, 3, 2, "#c79d83", null);
  if (hat) {
    path(
      c,
      [
        [-7, -43],
        [15, -46],
        [20, -38],
        [-10, -36],
      ],
      "#6e9446",
      "#455b2a",
      1.5,
    );
    leaf(c, 6, -43, 19, 0.4, "#adc771");
  }
  if (weapon && weapon !== "bow") {
    line(
      c,
      [
        [11, -8],
        [21, -17],
      ],
      "#92764a",
      4,
    );
    path(
      c,
      [
        [19, -19],
        [23, -16],
        [39, -40],
        [35, -43],
      ],
      "#c9d0b8",
      "#596257",
      1.5,
    );
    line(
      c,
      [
        [17, -21],
        [25, -15],
      ],
      "#dcc477",
      3,
    );
    ellipse(c, 12, -8, 4, 4, "#cbb193", "#6c5941", 1);
  } else if (weapon === "bow") {
    c.beginPath();
    c.moveTo(20, -40);
    c.quadraticCurveTo(40, -17, 19, -1);
    c.strokeStyle = "#bb9456";
    c.lineWidth = 3;
    c.stroke();
    line(
      c,
      [
        [20, -40],
        [19, -1],
      ],
      "#e5d7a6",
      1,
    );
    ellipse(c, 18, -17, 4, 4, "#cbb193", "#6c5941", 1);
  }
  c.restore();
  if (npc) label(c, e.name, e.x, e.y - 62, "#d7e2ba", 12);
}
const characterRenderers = Object.freeze({ mouse });
export function drawPlayerCharacter(c, characterId, e, time, options = {}) {
  const definition = PLAYABLE_CHARACTERS[characterId] ?? PLAYER_CHARACTER;
  const render = characterRenderers[definition.renderer] ?? mouse;
  return render(c, e, time, options);
}

export function hedgehog(c, e, time) {
  if (originalReady) {
    shadow(c, e.x, e.y, 14, 5);
    c.save();
    const verticalScale = creatureVerticalScale(e, time);
    if (verticalScale < 1) {
      c.translate(e.x, e.y);
      c.scale(1, verticalScale);
      c.translate(-e.x, -e.y);
    }
    const drawn = drawOriginalCreature(
        c,
        PET_SPECIES.hedgehog.originalCreatureCode,
        e.injured ? "mort" : e.moving ? "course" : "statique",
        e.x,
        e.y,
        e.injured
          ? time * 1000
          : e.moving
            ? (e.movementAnimationTime || 0) * 1000
            : 0,
        e.facing || 1,
        0.4,
      );
    c.restore();
    if (drawn) {
      if (e.injured && !e.hideOverlay)
        label(
          c,
          `${e.name || "Picpic"} necesita ayuda`,
          e.x,
          e.y - 38,
          "#f0d594",
          11,
        );
      else if (!e.hideOverlay && Number.isFinite(e.hp) && e.maxHp && e.hp < e.maxHp) {
        c.fillStyle = "#293025";
        c.fillRect(e.x - 20, e.y - 38, 40, 4);
        c.fillStyle = "#b5cf75";
        c.fillRect(e.x - 20, e.y - 38, 40 * Math.max(0, e.hp / e.maxHp), 3);
      }
      return;
    }
  }
  shadow(c, e.x, e.y, 13, 5);
  c.save();
  c.translate(e.x, e.y + (e.injured ? 2 : Math.sin(time * 9) * 0.7));
  c.scale(e.facing || 1, creatureVerticalScale(e, time));
  path(
    c,
    [
      [-15, -4],
      [-16, -11],
      [-10, -11],
      [-12, -18],
      [-5, -16],
      [-2, -23],
      [3, -17],
      [9, -22],
      [11, -15],
      [17, -16],
      [14, -9],
      [18, -5],
    ],
    "#6d5545",
    "#443c2d",
    1.6,
  );
  ellipse(c, 1, -6, 14, 8, "#a9916d", "#615540", 1.4);
  path(
    c,
    [
      [5, -11],
      [22, -6],
      [19, -2],
      [7, -1],
    ],
    "#cfb894",
    "#615540",
    1,
  );
  ellipse(c, 14, -8, 1.8, 2, "#292920", null);
  ellipse(c, 22, -6, 2, 1.5, "#514238", null);
  line(
    c,
    [
      [-8, 0],
      [-10, 2],
    ],
    "#7e644a",
    3,
  );
  line(
    c,
    [
      [6, 0],
      [10, 2],
    ],
    "#7e644a",
    3,
  );
  c.restore();
  if (e.injured && !e.hideOverlay)
    label(c, "Picpic necesita ayuda", e.x, e.y - 34, "#f0d594", 11);
}
const petRenderers = Object.freeze({ hedgehog });
export function drawPet(c, speciesId, e, time) {
  const species = PET_SPECIES[speciesId] ?? PET_SPECIES.hedgehog;
  return (petRenderers[species.renderer] ?? hedgehog)(c, e, time);
}
export function enemy(c, e, time) {
  const hitFlash = e.hitFlashUntil > time;
  const squash = creatureVerticalScale(e, time);
  if (originalReady) {
    const rules = ENEMY_RULES[e.type] ?? ENEMY_RULES.beetle;
    const boss = e.type === "boss",
      scale = boss ? 0.55 : e.type === "beetle" ? 0.35 : 0.45;
    const animation = e.hp <= 0
      ? "mort"
      : e.stun > 0
        ? "statique:stun"
        : e.type === "frog" && e.charge > 0
          ? "saut"
          : e.type === "frog" && e.telegraph > 0
            ? "saut-prep"
            : boss && e.charge > 0
              ? "course:charge"
              : e.telegraph > 0
                ? "attaque1"
              : e.attackRecoveryUntil > time
                ? "attaque1"
              : e.hit > 0
                ? "statique:combat"
                : e.moving
                  ? "course"
                  : boss
                    ? "statique:combat"
                  : "statique";
    const animationTime = e.hp <= 0
      ? (Number.isFinite(e.deathStartedAt)
          ? Math.max(0, time - e.deathStartedAt)
          : e.deathTime || 0) * 1000
      : e.telegraph > 0
        ? e.type === "frog"
          ? Math.max(0, rules.telegraph - e.telegraph) * 1000
          : ((Math.max(0, rules.telegraph - e.telegraph) * 180) % 12) * (1000 / 60)
        : e.attackRecoveryUntil > time
          ? ((e.attackRecoveryStartFrame || 0) +
              Math.max(0, time - e.attackRecoveryStartedAt) * 60) * (1000 / 60)
        : e.type === "frog" && e.charge > 0
          ? Math.max(0, rules.chargeDuration - e.charge) * 1000
          : e.moving && e.hit <= 0 && e.stun <= 0
            ? (e.movementAnimationTime || 0) * 1000
            : e.hit > 0 || e.stun > 0
              ? time * 1000
              : boss && !e.moving
                ? time * 1000
              : 0;
    shadow(c, e.x, e.y, boss ? 45 : 22, boss ? 15 : 8);
    c.save();
    if (hitFlash) c.filter = "brightness(4) grayscale(1)";
    if (squash < 1) {
      c.translate(e.x, e.y);
      c.scale(1, squash);
      c.translate(-e.x, -e.y);
    }
    const originalDrawn = drawOriginalCreature(
        c,
        enemyCreatureId(e.type, e.variant, e.creatureId),
        animation,
        e.x,
        e.y,
        animationTime,
        e.facing || 1,
        scale,
      );
    c.restore();
    if (originalDrawn) {
      if (e.hp < e.maxHp || boss) {
        const width = boss ? 95 : 42;
        c.fillStyle = "#292d1f";
        c.fillRect(e.x - width / 2, e.y - (boss ? 130 : 65), width, 5);
        c.fillStyle = boss ? "#c8a24e" : "#d3c36c";
        c.fillRect(
          e.x - width / 2,
          e.y - (boss ? 130 : 65),
          width * Math.max(0, e.hp / e.maxHp),
          4,
        );
      }
      if (boss)
        label(c, e.displayName || "Jefe del bosque",
          e.x,
          e.y - 144,
          "#f0d18b",
          15,
        );
      return;
    }
  }
  const boss = e.type === "boss",
    s = boss ? 2.25 : 1;
  shadow(c, e.x, e.y, 22 * s, 8 * s);
  c.save();
  c.translate(e.x, e.y);
  c.scale((e.facing || 1) * s, s * squash);
  const phase = time * (e.type === "wasp" ? 32 : 11);
  if (e.telegraph > 0) {
    c.globalAlpha = 0.8;
  }
  const fill =
    e.hitFlashUntil > time
      ? "#fff"
      : e.hit > 0
      ? "#f4ddb1"
      : e.type === "wasp"
        ? "#d6b04c"
        : e.type === "spider" || boss
          ? "#8e6c45"
          : "#637e98";
  for (let i = 0; i < 3; i++) {
    const y = -8 - i * 7,
      step = Math.sin(phase + i) * 3;
    line(
      c,
      [
        [-10, y],
        [-23, y - 8 + step],
        [-30, y + 5],
      ],
      "#4c4430",
      2,
    );
    line(
      c,
      [
        [10, y],
        [24, y - 5 - step],
        [31, y + 6],
      ],
      "#4c4430",
      2,
    );
  }
  if (e.type === "wasp") {
    ellipse(
      c,
      -5,
      -31,
      17,
      7,
      "#d3e1c1a0",
      "#8eac92",
      1,
      Math.sin(phase) * 0.3,
    );
    ellipse(
      c,
      14,
      -33,
      17,
      7,
      "#d3e1c1a0",
      "#8eac92",
      1,
      -Math.sin(phase) * 0.3,
    );
  }
  ellipse(c, 0, -17, 19, 22, fill, "#384839", 2);
  if (boss) {
    // A beetle boss has a plated shell and curved horn, not spider markings.
    ellipse(c, 0, -25, 29, 24, "#a2753d", "#4d3924", 3);
    ellipse(c, -4, -29, 20, 16, "#c2944b", "#674729", 2);
    c.beginPath();
    c.ellipse(-4, -29, 14, 10, -0.08, Math.PI * 1.08, Math.PI * 1.92);
    c.strokeStyle = "#e1bc70";
    c.lineWidth = 2;
    c.stroke();
    line(c, [[8, -39], [19, -54], [28, -45]], "#4d3924", 4);
    line(c, [[7, -38], [18, -51]], "#c79a4e", 2);
  } else if (e.type === "spider") {
    for (let i = 0; i < 4; i++)
      path(
        c,
        [
          [-17 + i * 9, -28],
          [-12 + i * 9, -40],
          [-7 + i * 9, -27],
        ],
        "#c6ad65",
        "#6a6137",
        1,
      );
  } else {
    line(
      c,
      [
        [0, -37],
        [0, 0],
      ],
      "#364c49",
      2,
    );
    ellipse(c, -7, -22, 3, 5, "#9eafb3", null);
    ellipse(c, 7, -12, 3, 5, "#9eafb3", null);
  }
  ellipse(c, 0, -2, 13, 10, fill, "#384839", 1.5);
  for (const x of [-5, 5]) {
    ellipse(c, x, -4, 4, 4, "#f5ebc6", "#49472c", 1);
    ellipse(c, x, -3, 2, 2, "#252a24", null);
  }
  c.restore();
  if (e.hp < e.maxHp || boss) {
    const w = boss ? 95 : 42;
    c.fillStyle = "#292d1f";
    c.fillRect(e.x - w / 2, e.y - 55 * s, w, 5);
    c.fillStyle = boss ? "#c8a24e" : "#d3c36c";
    c.fillRect(e.x - w / 2, e.y - 55 * s, w * Math.max(0, e.hp / e.maxHp), 4);
  }
  if (boss) label(c, e.displayName || "Jefe del bosque", e.x, e.y - 139, "#f0d18b", 15);
}
export function chest(c, x, y, open = false) {
  // Red lacquer, gold fittings and blue studs observed at 17:20 in the video.
  // This is a local Canvas reconstruction; no original chest sprite was recovered.
  c.save();
  c.translate(x, y);
  c.scale(1.3, 1.3);
  x = 0;
  y = 0;
  shadow(c, x, y, 25, 8);
  path(
    c,
    [
      [x - 24, y - 27],
      [x + 24, y - 27],
      [x + 24, y],
      [x - 24, y],
    ],
    "#9f2f25",
    "#f2c64e",
    3,
  );
  path(
    c,
    [
      [x - 24, y - 27],
      [x - 20, y - (open ? 51 : 39)],
      [x + 19, y - (open ? 51 : 39)],
      [x + 24, y - 27],
    ],
    open ? "#643328" : "#bd4830",
    "#f2c64e",
    3,
  );
  for (const xx of [x - 16, x + 16])
    line(
      c,
      [
        [xx, y - 36],
        [xx, y - 2],
      ],
      "#f5d05a",
      5,
    );
  path(
    c,
    [
      [x - 4, y - 22],
      [x + 5, y - 22],
      [x + 5, y - 11],
      [x - 4, y - 11],
    ],
    "#e7ca6d",
    "#786039",
    1,
  );
  for (const side of [-1, 1]) {
    for (const height of [-32, -20, -8]) {
      ellipse(c, side * 17, height, 3, 3, "#83c9d9", "#fff0a1", 1);
    }
    ellipse(c, side * 22, -1, 6, 4, "#e8b534", "#fce67e", 1);
  }
  ellipse(c, 0, -18, 2, 2, "#55361e", null);
  line(c, [[0, -17], [0, -13]], "#55361e", 2);
  c.restore();
}
