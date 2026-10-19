// Recovered visual codes with provisional local labels and equipment slots.
// Add catalog entries here; the animation renderer resolves their original parts.
export const COSMETIC_SETS = Object.freeze([
  { code: 8, label: "Sombrero aventurero", slot: "head" },
  { code: 17, label: "Sombrero 17", slot: "head" },
  { code: 18, label: "Sombrero 18", slot: "head" },
  { code: 26, label: "Sombrero 26", slot: "head" },
  { code: 11, label: "Túnica con mangas", slot: "body" },
  { code: 27, label: "Túnica 27", slot: "body" },
  { code: 14, label: "Capa y capucha", slot: "cape" },
  { code: 15, label: "Adorno", slot: "accessory" },
]);

export const COSMETICS_BY_CODE = new Map(
  COSMETIC_SETS.map((cosmetic) => [cosmetic.code, cosmetic]),
);

export function cosmeticForSlot(code, slot) {
  const cosmetic = COSMETICS_BY_CODE.get(code);
  return cosmetic?.slot === slot ? cosmetic : null;
}
