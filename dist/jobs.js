// Names/roles follow the demo references. Balance and simplified local rules are provisional.
import { SKILL_DETAILS } from "./skill-data.js";
export const SECONDARY_JOB_LEVEL = 10;
export const JOBS = Object.freeze({
  botanist: {
    name: "Botánico",
    icon: "❋",
    skill1: "Elixir",
    skill2: "Pulgar Verde",
    icon1: "⚗",
    icon2: "❋",
    cooldowns: [7, 10],
    description:
      "Elixires que curan y envenenan. Cardo, zarza y lirio de los valles crecen a tu lado.",
  },
  chef: {
    name: "Chef",
    icon: "♨",
    skill1: "Caldero",
    skill2: "Trampa",
    icon1: "♨",
    icon2: "✳",
    cooldowns: [7, 10],
    description:
      "Reúne tres ingredientes en tu caldero, cocina y límpialo al terminar para curarte junto a tu mascota. La trampa inmoviliza y favorece ingredientes adicionales.",
  },
  trickster: {
    name: "Estafador",
    icon: "♠",
    skill1: "Truco de cartas",
    skill2: "Desaparición",
    icon1: "♠",
    icon2: "✧",
    cooldowns: [6, 11],
    description:
      "Alterna cartas de daño, curación, control y potencia. Desaparece y potencia tu próximo golpe.",
  },
  journalist: {
    name: "Periodista",
    icon: "✎",
    skill1: "Informe",
    skill2: "Entrevista",
    icon1: "✎",
    icon2: "▤",
    cooldowns: [3, 9],
    description:
      "Recoge dos testimonios y lanza un informe. Entrevista convierte un testimonio del suelo en un área de efecto.",
  },
});
// Stable skill identities let UI, saves and future behavior modules refer to
// abilities without duplicating a job/slot lookup throughout the game loop.
export const ABILITIES = Object.freeze(
  Object.fromEntries(
    Object.entries(JOBS).flatMap(([job, definition]) =>
      [1, 2].map((slot) => {
        const id = `${job}.skill${slot}`;
        return [
          id,
          Object.freeze({
            id,
            job,
            slot,
            name: definition[`skill${slot}`],
            icon: definition[`icon${slot}`],
            cooldown: definition.cooldowns[slot - 1],
            behaviorKey: id,
            ...SKILL_DETAILS[id],
          }),
        ];
      }),
    ),
  ),
);
export const CARDS = Object.freeze([
  { name: "As de picas", icon: "♠", suit: "spade", kind: "damage", color: "#cf976b" },
  { name: "As de corazones", icon: "♥", suit: "heart", kind: "heal", color: "#e6ba9b" },
  { name: "As de diamantes", icon: "♦", suit: "diamond", kind: "stun", color: "#a9cbdc" },
  { name: "As de tréboles", icon: "♣", suit: "club", kind: "power", color: "#b4d583" },
]);
export function resolveJobSkill(profile, slot) {
  if (slot === 1 || slot === 2)
    return JOBS[profile.job]
      ? { job: profile.job, skill: slot, abilityId: `${profile.job}.skill${slot}` }
      : null;
  if (
    slot !== 3 ||
    profile.level < SECONDARY_JOB_LEVEL ||
    !JOBS[profile.secondaryJob] ||
    profile.secondaryJob === profile.job
  )
    return null;
  return {
    job: profile.secondaryJob,
    skill: profile.secondarySkill === 2 ? 2 : 1,
    abilityId: `${profile.secondaryJob}.skill${profile.secondarySkill === 2 ? 2 : 1}`,
  };
}
export function normalizedSecondary(profile) {
  return profile.level >= SECONDARY_JOB_LEVEL &&
    JOBS[profile.secondaryJob] &&
    profile.secondaryJob !== profile.job
    ? profile.secondaryJob
    : null;
}

