// The original obj_soins allows bandage or elixir to raise the fallen pet.
export function canCompleteTutorialRescue(sceneKind, phase, pet) {
  return sceneKind === "tutorial" && phase === 0 && !pet.injured && pet.hp > 0;
}

export function tutorialRescueInstructions() {
  return "Cura la mascota del suelo para que vuelva a ponerse de pie. Usa tu vendaje o tu elixir.";
}
