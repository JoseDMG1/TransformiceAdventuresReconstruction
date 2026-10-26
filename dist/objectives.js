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

// TFMAdventure.changerTailleFenetre clamps the longest logical axis to 1280..1920.
export function originalInterfaceScale(width, height) {
  const longest = Math.max(width, height);
  return longest > 0 ? longest / Math.min(1920, Math.max(1280, longest)) : 1;
}

export function objectiveProjection(target, camera, zoom, width, height, player = camera) {
  if (!target || !(zoom > 0) || !(width > 0) || !(height > 0)) return null;
  const x = (target.x - camera.x) * zoom + width / 2;
  const y = (target.y - camera.y) * zoom + height / 2;
  const centerX = width / 2, centerY = height / 2;
  const dx = target.x - player.x, dy = target.y - player.y;
  // Adapt the original circular distance threshold to the local camera zoom.
  if (Math.hypot(dx, dy) * zoom < Math.min(width, height) / 2)
    return { mode: "ground", x, y };
  const angle = Math.atan2(dy, dx);
  const radius = Math.hypot(centerX, centerY);
  return {
    mode: "edge",
    x: Math.max(0, Math.min(width, centerX + Math.cos(angle) * radius)),
    y: Math.max(0, Math.min(height, centerY + Math.sin(angle) * radius)),
    angle,
  };
}
