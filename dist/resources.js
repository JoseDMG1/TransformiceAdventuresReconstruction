import { talentBonus } from "./talents.js";
import { giftBonus } from "./gifts.js";
const weapons = ["sword", "dagger", "greatsword", "shield", "bow", "bandage"];
export function chargeCapacity(profile, weapon, gifts = []) {
  return (
    (weapon === "bandage"
      ? 1
      : weapon === "bow"
        ? 6
        : weapon === "greatsword"
          ? 2
          : 3) +
    talentBonus(profile, `${weapon}Charges`) +
    giftBonus(gifts, `${weapon}Charges`)
  );
}
export function chargeRecovery(profile, weapon, gifts = []) {
  return (
    (weapon === "bandage"
      ? 8
      : weapon === "bow"
        ? 0.55
        : weapon === "shield"
          ? 3.5
          : weapon === "dagger"
            ? 1
            : 1.5) *
    Math.max(
      0.15,
      1 -
        talentBonus(profile, `${weapon}Recovery`) -
        giftBonus(gifts, `${weapon}Recovery`),
    )
  );
}
export function normalizeCharges(raw, profile, gifts = []) {
  return Object.fromEntries(
    weapons.map((weapon) => [
      weapon,
      {
        count: Math.max(
          0,
          Math.min(
            chargeCapacity(profile, weapon, gifts),
            Math.floor(
              Number(raw?.[weapon]?.count) ||
                (raw?.[weapon]?.count === 0
                  ? 0
                  : chargeCapacity(profile, weapon, gifts)),
            ),
          ),
        ),
        timer: Math.max(
          0,
          Math.min(
            chargeRecovery(profile, weapon, gifts),
            Number(raw?.[weapon]?.timer) || 0,
          ),
        ),
      },
    ]),
  );
}
export function updateCharges(charges, profile, dt, gifts = []) {
  for (const weapon of weapons) {
    const state = charges[weapon],
      max = chargeCapacity(profile, weapon, gifts);
    state.count = Math.min(state.count, max);
    if (state.count >= max) {
      state.timer = 0;
      continue;
    }
    state.timer += dt;
    const recovery = chargeRecovery(profile, weapon, gifts);
    while (state.timer >= recovery && state.count < max) {
      state.count++;
      state.timer -= recovery;
    }
    if (state.count >= max) state.timer = 0;
  }
}
export function consumeCharge(charges, weapon) {
  if (!weapons.includes(weapon)) return true;
  if (charges[weapon].count <= 0) return false;
  charges[weapon].count--;
  return true;
}
