// Initial/periodic healing are described by talents26/27 and gifts1708/1710.
// All amounts, duration and range are local reconstruction parameters.
export const BANDAGE_RULES = Object.freeze({ initial: 32, periodic: 2, duration: 6, interval: 1,
  range: 160, recoveryGift: 15, maximumDuration: 3600 });

export function bandageAmounts(bonus, giftEffect, recoveryGifts = 0, lastUse = false) {
  const self = (1 + bonus("selfHealing")) * (1 + giftEffect("bandageSelfHeal"));
  const initial = (BANDAGE_RULES.initial + recoveryGifts * BANDAGE_RULES.recoveryGift +
    bonus("healing") + bonus("bandageInitial")) * (1 + (lastUse ? giftEffect("bandageLastUse") : 0));
  const periodic = BANDAGE_RULES.periodic + bonus("bandagePeriodic");
  return { initial, selfInitial: initial * self, periodic, selfPeriodic: periodic * self };
}

export function startBandageTreatment(state, giftEffect) {
  state.bandageHot = Math.min(BANDAGE_RULES.maximumDuration, BANDAGE_RULES.duration + giftEffect("bandageHotDuration"));
  state.hotTick = BANDAGE_RULES.interval;
  if (giftEffect("bandageDamageReduction")) state.bandageGuard = state.bandageHot;
}

export function tickBandageTreatment(state, dt) {
  if (!(state.bandageHot > 0)) return 0;
  const elapsed = Math.min(state.bandageHot, Math.max(0, dt));
  state.hotTick = (state.hotTick ?? BANDAGE_RULES.interval) - elapsed;
  let ticks = 0;
  while (state.hotTick <= 1e-9) {
    ticks++;
    state.hotTick += BANDAGE_RULES.interval;
  }
  state.bandageHot = Math.max(0, state.bandageHot - Math.max(0, dt));
  return ticks;
}
