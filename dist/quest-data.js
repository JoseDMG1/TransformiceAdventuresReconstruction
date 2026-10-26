import { objectiveTarget } from "./objectives.js";

// IDs and sequencing are local. Texts already evidenced in the reconstruction
// are retained; absent server payloads do not establish additional objectives.
export function describeQuests(context) {
  const { scene, profile, tutorialPhase, room, encounterStarted, encounterAwarded,
    step, encounterCount, papailleClueDialogue, rescueInstructions, bossName } = context;
  const muraAdvicePending = profile.expeditions > 0 && !profile.muraAdviceSeen;
  const continuePath = profile.tutorial && profile.expeditions === 0;
  let title, text, id;
  if (scene.kind === "village") {
    id = muraAdvicePending ? "village:mura" : continuePath ? "village:path" : "village:board";
    title = muraAdvicePending ? "Trabajos"
      : profile.bestStep ? "El bosque vuelve a llamar" : "Un mundo por descubrir";
    text = muraAdvicePending
      ? "Habla con Mura para cambiar de trabajo. Puedes adquirir un trabajo secundario a partir del nivel 10. ¡No dudes en probar varias combinaciones! ¡Cambiar de trabajo es gratis!"
      : continuePath
        ? "Continúa el sendero."
        : "Visita el tablón de la plaza para comenzar una expedición. Mura puede cambiar tu trabajo.";
  } else if (scene.kind === "tutorial") {
    id = `tutorial:${tutorialPhase}`;
    title = tutorialPhase === 0 ? "Un pequeño amigo" : "El camino a casa";
    text = tutorialPhase === 0 ? rescueInstructions : "Habla con Papaille.";
  } else {
    id = encounterAwarded ? `dungeon:${step}:${room}:chest`
      : !encounterStarted ? `dungeon:${step}:${room}:path` : `dungeon:${step}:${room}:combat`;
    title = room === encounterCount - 1 ? bossName : `Bosque Susurrante · Etapa ${step}`;
    text = !encounterStarted
      ? `Encuentro ${room + 1} / ${encounterCount} · Sigue el sendero hacia la siguiente zona.`
      : `Encuentro ${Math.min(room + 1, encounterCount)} / ${encounterCount} · ${encounterAwarded ? "Abre el cofre de Elisah con E. Sigue el marcador." : "Derrota a los enemigos y busca el cofre."}`;
  }
  if (scene.kind === "dungeon" && papailleClueDialogue) {
    id = `dungeon:papaille:${papailleClueDialogue}`;
    title = "Papaille";
    text = "Habla con Papaille.";
  }
  return { title, objectives: [{ id, text,
    target: objectiveTarget({ ...context, muraAdvicePending }) }] };
}
