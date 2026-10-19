// Gift/talent descriptions establish these effects; windows and caps are local.
export const SWORD_RULES = Object.freeze({ chainWindow: 3, maximumChain: 5, cleaveDuration: 6,
  balestraWait: 3, maximumBalestraBonus: 1.5 });
export const SWORD_STATE_LIMITS = Object.freeze({ chainTime: SWORD_RULES.chainWindow,
  chainStacks: SWORD_RULES.maximumChain, swordBoost: SWORD_RULES.cleaveDuration,
  swordIdleTime: SWORD_RULES.balestraWait, swordBalestraReady: 1 });

export function swordChainMultiplier(state, amount) {
  return 1 + (state.chainTime > 0 ? Math.min(SWORD_RULES.maximumChain, state.chainStacks || 0) * amount : 0);
}

export function recordSwordTargets(state, targetCount, chainEnabled) {
  if (targetCount >= 3) state.swordBoost = SWORD_RULES.cleaveDuration;
  if (targetCount > 0 && chainEnabled) {
    state.chainStacks = state.chainTime > 0 ? Math.min(SWORD_RULES.maximumChain, (state.chainStacks || 0) + 1) : 1;
    state.chainTime = SWORD_RULES.chainWindow;
  }
}

export function expireSwordChain(state) {
  if (!(state.chainTime > 0)) state.chainStacks = 0;
}
