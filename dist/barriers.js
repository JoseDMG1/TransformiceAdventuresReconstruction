// Local shield tuning shared by player and pet; magnitudes are not server data.
export const BARRIER_RULES = Object.freeze({ capacity: 100, duration: 6 });

export function addBarrier(state, amount) {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const before = Math.max(0, state.barrier || 0);
  state.barrier = Math.min(BARRIER_RULES.capacity, before + amount);
  state.barrierTime = BARRIER_RULES.duration;
  return state.barrier - before;
}

export function absorbBarrier(state, amount) {
  const damage = Math.max(0, amount);
  const absorbed = Math.min(damage, Math.max(0, state.barrier || 0));
  state.barrier = Math.max(0, (state.barrier || 0) - absorbed);
  return damage - absorbed;
}

export function tickBarrier(state, dt) {
  state.barrierTime = Math.max(0, (state.barrierTime || 0) - Math.max(0, dt));
  if (!state.barrierTime) state.barrier = 0;
}
