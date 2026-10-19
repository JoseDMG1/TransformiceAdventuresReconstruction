import { ABILITIES, resolveJobSkill, SECONDARY_JOB_LEVEL } from "./jobs.js";
import { createBotanistSkills } from "./skills/botanist.js";
import { createChefSkills } from "./skills/chef.js";
import { createTricksterSkills } from "./skills/trickster.js";
import { createJournalistSkills } from "./skills/journalist.js";
import { availableTestimonies } from "./journalism.js";

export function createSkillSystem(context) {
  const skills = {
    botanist: createBotanistSkills(context),
    chef: createChefSkills(context),
    trickster: createTricksterSkills(context),
    journalist: createJournalistSkills(context),
  };
  const handlers = {
    "botanist.skill1": ({ target }) => skills.botanist.elixir(target),
    "botanist.skill2": ({}) => skills.botanist.grow(),
    "chef.skill1": ({ slot }) => skills.chef.cauldron(slot),
    "chef.skill2": () => skills.chef.trap(),
    "trickster.skill1": ({ slot, target }) => skills.trickster.cards(slot, target),
    "trickster.skill2": ({}) => skills.trickster.vanish(),
    "journalist.skill1": ({ slot, origin, target }) => skills.journalist.report(slot, origin, target),
    "journalist.skill2": ({ origin }) => skills.journalist.interview(origin),
  };

  function readyAbility(slot, origin = context.player) {
    const { player, profile } = context;
    if (player.states.downed > 0 || player.states.clubStun > 0) return false;
    const loadout = resolveJobSkill(profile, slot);
    if (!loadout) {
      context.toast(
        "Elige un trabajo secundario en la aldea a partir del nivel " +
          SECONDARY_JOB_LEVEL +
          ".",
      );
      return false;
    }
    if (
      context.mode !== "playing" ||
      context.modalKind ||
      !context.$("dialogue").hidden ||
      player.dead ||
      player["skill" + slot] > 0
    ) return false;
    const ability = ABILITIES[loadout.abilityId];
    if (!ability) return false;
    if (ability.job === "journalist") {
      const needsGround = ability.slot === 2 || player.notebook.length < 2;
      if (
        needsGround &&
        !availableTestimonies(context.effects, origin, context.distance, {
          allVisible: ability.slot === 2 && !!context.giftEffect("interviewAllVisible"),
          isVisible: context.isVisibleInWorld,
        }).length
      ) {
        context.toast("Acércate a un testimonio para recogerlo o entrevistarlo.");
        return false;
      }
    }
    return ability;
  }

  function use(slot, origin = context.player, target) {
    const ability = readyAbility(slot, origin);
    if (!ability) return false;
    const { player } = context;
    player.action = null;
    player.guarding = false;
    player.casting = null;
    player["skill" + slot] =
      ability.cooldown *
      Math.pow(0.8, context.countGift("refresh")) *
      (ability.job === "trickster" && ability.slot === 1
        ? 1 - context.bonus("cardRecovery")
        : 1) *
      (ability.job === "journalist"
        ? Math.max(
            0.2,
            1 -
              context.giftEffect(
                ability.slot === 1 ? "reportRecovery" : "interviewRecovery",
              ),
          )
        : 1) *
      (ability.job === "journalist" && ability.slot === 2
        ? 1 + context.giftEffect("interviewAllVisible")
        : 1);
    const handler = handlers[ability.behaviorKey];
    if (!handler) throw new Error(`No local handler for ${ability.behaviorKey}`);
    handler({ slot, origin, ability, target });
    return true;
  }

  return Object.freeze({ use, canUse: (slot) => !!readyAbility(slot), handlers: Object.freeze({ ...handlers }) });
}
