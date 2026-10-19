// Slot IDs and profile layout from the retained original enum/interface.
// Local inventory-to-slot assignments remain separate and incomplete.
export const ORIGINAL_EQUIPMENT_SLOT_LABELS = Object.freeze({
  1: "Cabeza",
  2: "Cuello",
  3: "Cuerpo",
  4: "Gafas",
  5: "Boca",
  6: "Orejas",
  7: "Pelaje",
  8: "Cola",
  9: "Guantes",
  10: "Peinado",
  21: "Mano derecha",
  22: "Mano izquierda",
});

// InterfaceJoueurADV.listeEquipementGauche/Droite, then left/right hands.
export const ORIGINAL_PROFILE_EQUIPMENT_LAYOUT = Object.freeze({
  left: Object.freeze([1, 2, 3, 9, 7]),
  right: Object.freeze([10, 4, 5, 6, 8]),
  hands: Object.freeze([22, 21]),
});

export function equipmentSlotIconPath(code) {
  if (!Object.hasOwn(ORIGINAL_EQUIPMENT_SLOT_LABELS, code)) return null;
  return `assets/original/interface/icones/equipement${code}.png`;
}
