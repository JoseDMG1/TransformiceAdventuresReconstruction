// Dialogue 47/48 from the archived Spanish client; placements are local.
// These clues are optional and do not imply recovered server quest rewards.
export const FOREST_CLUES = Object.freeze({
  axe: Object.freeze({ id: "axe", name: "Hacha con una pluma amarilla", room: 0,
    x: 1450, y: 770, symbol: "axe", dialogueId: 47,
    lines: Object.freeze([
      "Mirando la pluma amarilla en el mango, parece que esta hacha pertenece a uno de los leñadores que faltan.",
      "Parece que alguien lo pasó mal aquí.",
    ]) }),
  belongings: Object.freeze({ id: "belongings", name: "Pertenencias de un leñador", room: 1,
    x: 1450, y: 760, symbol: "bag", dialogueId: 48,
    lines: Object.freeze([
      "Se trata de las pertenencias de un leñador. Parece que descansó aquí, pero ya no está aquí.",
    ]) }),
});

export function normalizeForestClues(value) {
  return Array.isArray(value)
    ? [...new Set(value.filter(id => Object.hasOwn(FOREST_CLUES, id)))] : [];
}

export function forestCluePlacements(routeAreas) {
  return Object.values(FOREST_CLUES).flatMap(clue => {
    const area = routeAreas[clue.room];
    return area ? [{ ...clue, x: area.offsetX + clue.x, id: `clue:${clue.id}`, clueId: clue.id,
      text: `Hablar con Papaille` }] : [];
  });
}

export function drawForestClue(ctx, clue, examined) {
  ctx.save();
  ctx.translate(clue.x, clue.y);
  ctx.fillStyle = "#22281b77";
  ctx.beginPath(); ctx.ellipse(0, 0, 24, 9, 0, 0, Math.PI * 2); ctx.fill();
  if (clue.symbol === "axe") {
    ctx.rotate(-0.5);
    ctx.strokeStyle = "#885b37"; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-16, 11); ctx.lineTo(15, -13); ctx.stroke();
    ctx.fillStyle = "#a6afb1";
    ctx.beginPath(); ctx.moveTo(9, -20); ctx.lineTo(27, -14); ctx.lineTo(24, 1); ctx.lineTo(12, -6); ctx.fill();
    ctx.strokeStyle = "#efcc57"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-8, 4); ctx.quadraticCurveTo(-26, -8, -18, -15); ctx.stroke();
  } else {
    ctx.fillStyle = "#9c7951";
    ctx.beginPath(); ctx.ellipse(0, -7, 20, 14, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#55432b"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-5, -20); ctx.lineTo(0, 5); ctx.stroke();
    ctx.fillStyle = "#d8c9a0"; ctx.fillRect(8, -15, 12, 7);
  }
  ctx.restore();
  if (!examined) {
    ctx.save(); ctx.fillStyle = "#f5dc8a"; ctx.font = "bold 20px Georgia"; ctx.textAlign = "center";
    ctx.fillText("?", clue.x, clue.y - 35); ctx.restore();
  }
}
