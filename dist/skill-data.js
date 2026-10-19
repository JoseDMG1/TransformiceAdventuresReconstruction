// Spanish summaries of archived comp.desc.*; controls describe the local game.
export const SKILL_DETAILS = Object.freeze({
  "botanist.skill1": Object.freeze({ originalId: 1006,
    description: "Lanza un elixir que explota al aterrizar. Cura a los aliados con el tiempo y daña a los enemigos de la zona.",
    usage: "Apunta al suelo y confirma con clic o J." }),
  "botanist.skill2": Object.freeze({ originalId: 1013,
    description: "Planta a tus pies un cardo, una zarza o un lirio. El cardo ataca, la zarza atrae ataques y el lirio cura. Pueden crecer dos veces si permaneces cerca.",
    usage: "Se activa directamente. Acércate a tus plantas para ayudarlas a crecer." }),
  "chef.skill1": Object.freeze({ originalId: 1009,
    description: "Reúne ingredientes en un caldero para preparar efectos de ataque, curación o defensa. Al terminar puedes limpiarlo para curarte y curar a tu mascota.",
    usage: "Acércate al caldero y pulsa E para cocinar o limpiarlo." }),
  "chef.skill2": Object.freeze({ originalId: 1010,
    description: "Coloca una trampa de picnic. Al pisarla un enemigo, daña e inmoviliza a los enemigos cercanos y favorece la aparición de ingredientes.",
    usage: "Se activa directamente. Lleva a los enemigos hacia la trampa." }),
  "trickster.skill1": Object.freeze({ originalId: 1012,
    description: "Alterna cuatro ases: picas atraviesa enemigos; corazones cura en un área; diamantes inmoviliza y aturde al primer enemigo; tréboles potencia tu próximo ataque físico. Los dones pueden modificar las cartas.",
    usage: "Apunta y confirma con clic o J. El trébol normal se activa directamente." }),
  "trickster.skill2": Object.freeze({ originalId: 1007,
    description: "Te vuelves invisible en una nube de humo. El próximo ataque es más potente y rompe la invisibilidad.",
    usage: "Se activa directamente. Prepara el siguiente ataque mientras permaneces invisible." }),
  "journalist.skill1": Object.freeze({ originalId: 1011,
    description: "Recoge y guarda un testimonio cercano. Al reunir dos, escribe un informe con efectos según los testimonios almacenados.",
    usage: "Recoge directamente; con dos testimonios, apunta y confirma el área con clic o J." }),
  "journalist.skill2": Object.freeze({ originalId: 1014,
    description: "Activa un testimonio del suelo y lo convierte en un área cuyos efectos dependen de su tipo.",
    usage: "Acércate al testimonio que quieres activar y usa la habilidad." }),
});

export function skillInstructions(ability, giftEffect) {
  if (ability.id === "chef.skill2" && giftEffect("trapManual"))
    return "Coloca la trampa, espera a que se arme y acércate para dispararla con E. Con este don no se dispara al pisarla.";
  if (ability.id === "journalist.skill2" && giftEffect("interviewAllVisible"))
    return "Activa a la vez los testimonios visibles en la pantalla. La recuperación aumenta con este don.";
  return ability.usage;
}
