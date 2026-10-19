// Local level curve retained from the playable reconstruction.
// REA/video evidence does not establish the original server XP thresholds.
export const MAX_PROFILE_LEVEL = 100;

export function xpNeededForLevel(level) {
  const safeLevel = Math.max(1, Math.floor(Number.isFinite(level) ? level : 1));
  return 80 + (safeLevel - 1) * 40;
}

export function maxSavedXP(level) {
  return xpNeededForLevel(level) - 1;
}
