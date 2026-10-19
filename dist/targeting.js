import { CARDS, resolveJobSkill } from "./jobs.js";
import { REPORT_RULES } from "./journalism.js";

// The archived client confirms circle/line cursors and click confirmation.
// Skill assignments, ranges and radii below are local reconstruction values.
export const SKILL_TARGETS = Object.freeze({
  "botanist.skill1": Object.freeze({ mode: "circle", range: 210, radius: 115 }),
  "journalist.skill1": Object.freeze({ mode: "circle", range: 240, radius: REPORT_RULES.radius }),
  "trickster.skill1": Object.freeze({ mode: "line", range: 300, radius: 12 }),
});

export function skillTargeting(profile, player, slot, giftEffect = () => 0) {
  const loadout = resolveJobSkill(profile, slot);
  const rule = SKILL_TARGETS[loadout?.abilityId];
  if (!rule) return null;
  if (loadout.job === "journalist" && player.notebook.length < 2) return null;
  if (loadout.job === "trickster") {
    const card = CARDS[player.cardIndex % CARDS.length];
    if (card.kind === "heal") return { mode: "circle", range: 300, radius: 160 * (1 + giftEffect("cardsHeartRadius")) };
    if (card.kind === "power" && !["cardsClubRiskDamage", "cardsClubConditionalDamage", "cardsClubPoison"].some(key => giftEffect(key))) return null;
  }
  return { ...rule };
}

export function clampTarget(origin, point, range) {
  const dx = point.x - origin.x, dy = point.y - origin.y;
  const distance = Math.hypot(dx, dy);
  const ratio = distance > range ? range / distance : 1;
  return { x: origin.x + dx * ratio, y: origin.y + dy * ratio };
}

export function createTargetingSystem(context) {
  let pending = null;
  return Object.freeze({
    get pending() { return pending ? { ...pending } : null; },
    request(slot) {
      if (!context.canUse(slot)) return false;
      const rule = context.resolve(slot);
      if (!rule) { pending = null; return context.cast(slot); }
      pending = { slot, ...rule };
      context.onSelect?.();
      return true;
    },
    point(aim) { return pending ? clampTarget(context.origin(), aim, pending.range) : null; },
    confirm(aim) {
      if (!pending) return false;
      const selection = pending;
      const target = clampTarget(context.origin(), aim, selection.range);
      pending = null;
      return context.cast(selection.slot, target);
    },
    cancel() { const active = !!pending; pending = null; return active; },
  });
}
