// Stable local character identifiers and presentation data.
// These records are content metadata; movement and dialogue stay in their systems.
export const CHARACTERS = Object.freeze({
  papaille: Object.freeze({
    id: "papaille",
    name: "Papaille",
    color: "#bd9b6b",
    species: "mouse",
  }),
  mura: Object.freeze({
    id: "mura",
    name: "Mura",
    color: "#7f7c75",
    species: "mouse",
  }),
  scarf: Object.freeze({
    id: "scarf",
    name: "Scarf",
    color: "#c1b8a3",
    species: "mouse",
  }),
  plazaMouseOchre: Object.freeze({
    id: "plazaMouseOchre",
    name: "",
    color: "#b79a75",
    species: "mouse",
    ambient: true,
  }),
  plazaMouseAsh: Object.freeze({
    id: "plazaMouseAsh",
    name: "",
    color: "#8c8b80",
    species: "mouse",
    ambient: true,
  }),
  plazaMouseCream: Object.freeze({
    id: "plazaMouseCream",
    name: "",
    color: "#d0bc98",
    species: "mouse",
    ambient: true,
  }),
});

export const PLAYABLE_CHARACTERS = Object.freeze({
  adventurer: Object.freeze({
    id: "adventurer",
    name: "Aventurero",
    species: "mouse",
    renderer: "mouse",
  }),
});
export const PLAYER_CHARACTER = PLAYABLE_CHARACTERS.adventurer;

export const PET_SPECIES = Object.freeze({
  hedgehog: Object.freeze({
    id: "hedgehog",
    name: "Erizo",
    defaultName: "Picpic",
    renderer: "hedgehog",
    originalCreatureCode: 5,
    baseHP: 60,
    hpPerLevel: 4,
  }),
});

