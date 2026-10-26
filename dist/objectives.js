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

export { originalInterfaceScale } from "./viewport.js";

export function createObjectiveArrowMotion() {
  let position = null;
  return {
    update(marker, width, height, elapsedMs) {
      if (marker?.mode !== "edge") {
        position = null;
        return marker;
      }
      if (!position) position = { x: width / 2, y: height / 2, width, height };
      // Keep the existing screen-relative position if the local window resizes.
      if (position.width !== width || position.height !== height) {
        position.x *= width / position.width;
        position.y *= height / position.height;
      }
      // TFMAdventure.bouclePrincipale and InterfaceQueteADV.boucle.
      const delta = Math.min(Math.max(0, elapsedMs) / 16.66666, 5);
      position.x += (marker.x - position.x) * .1 * delta;
      position.y += (marker.y - position.y) * .1 * delta;
      position.width = width;
      position.height = height;
      return { ...marker, x: position.x, y: position.y };
    },
  };
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
