// Local targets for objectives already shown by the reconstruction.
// The archived client supports a ground marker and a distant directional arrow.
export function objectiveTarget({ scene, pet, tutorialPhase, room, encounterStarted, encounterAwarded, muraAdvicePending = false, papailleClueDialogue = null }) {
  if (!scene) return null;
  if (scene.kind === "village") {
    const targetId = muraAdvicePending ? "mura" : "board";
    return scene.interactables.find(o => o.id === targetId) ?? null;
  }
  if (scene.kind === "tutorial") {
    if (tutorialPhase === 0) return { x: pet.x, y: pet.y, text: "Cura a Picpic" };
    if (tutorialPhase > 0) return scene.npcs.find(o => o.id === "papaille") ?? null;
    return null;
  }
  if (scene.kind === "dungeon") {
    if (papailleClueDialogue) return null;
    if (encounterAwarded) return scene.interactables.find(o => o.id === "chest") ?? null;
    if (!encounterStarted) {
      const area = scene.routeAreas?.[room];
      if (area) return { ...area.spawn, text: "Sigue el sendero" };
    }
  }
  return null;
}

export function objectiveProjection(target, camera, zoom, width, height) {
  if (!target || !(zoom > 0) || !(width > 0) || !(height > 0)) return null;
  const x = (target.x - camera.x) * zoom + width / 2;
  const y = (target.y - camera.y) * zoom + height / 2;
  const centerX = width / 2, centerY = height / 2;
  const halfWidth = Math.max(20, width / 2 - 70);
  const halfHeight = Math.max(20, height / 2 - 155);
  const dx = x - centerX, dy = y - centerY;
  const ratio = Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight);
  return ratio <= 1 ? { mode: "ground", x, y } : {
    mode: "edge", x: centerX + dx / ratio, y: centerY + dy / ratio,
    angle: Math.atan2(dy, dx),
  };
}
