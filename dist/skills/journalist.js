import { collectTestimony, consumeReport, applyReportPoison, TESTIMONIES, REPORT_RULES, isElementalTestimony, availableTestimonies } from "../journalism.js";
import { resolveJobSkill } from "../jobs.js";
import { TESTIMONY_DISAPPEAR_EFFECT } from "../effect-data.js";

export function createJournalistSkills(context) {
  function reduceInterviewCooldown(amount) {
    const { player, profile } = context;
    for (let slot = 1; slot <= 3; slot++) {
      const loadout = resolveJobSkill(profile, slot);
      if (loadout?.job === "journalist" && loadout.skill === 2)
        player["skill" + slot] = Math.max(0, player["skill" + slot] - amount);
    }
  }

  function testimonyActivated(subtype) {
    const { healPlayer, bonus, grantBarrier } = context;
    const selfHealing = bonus("reportSelfHeal");
    if (selfHealing > 0) healPlayer(selfHealing);
    if (subtype === "heal") {
      grantBarrier(bonus("reportShield"));
      reduceInterviewCooldown(bonus("interviewHealRecovery"));
    } else if (isElementalTestimony(subtype)) {
      reduceInterviewCooldown(bonus("interviewDamageRecovery"));
    }
  }

  function activateTestimony(testimony) {
    const {
      player, pet, profile, effects, enemies, bonus, giftEffect, countGift, distance,
      healPlayer, healPet, grantBarrier, hurtEnemy, floating, burst, tone,
    } = context;
    if (!testimony || testimony.life <= 0) return;
    testimony.life = 0;
    const heal = testimony.subtype === "heal";
    const lightning = testimony.subtype === "lightning";
    const visual = TESTIMONIES[testimony.subtype] || TESTIMONIES.fire;
    testimonyActivated(testimony.subtype);
    if (heal) {
      const healing = REPORT_RULES.healing + bonus("reportHealing");
      if (distance(player, testimony) < REPORT_RULES.radius) {
        const result = healPlayer(healing);
        grantBarrier(giftEffect("reportHealingBarrier"));
        if (result?.actual > 0)
          floating(`+${Math.round(result.actual)} · Testimonio`, player.x, player.y - 60, "#d2e9ae");
      }
      if (profile.petActive && !pet.injured && distance(pet, testimony) < REPORT_RULES.radius) {
        healPet(healing, false, Infinity);
        grantBarrier(giftEffect("reportHealingBarrier"), pet);
      }
    } else {
      const targets = enemies
        .filter(
          (target) => target.hp > 0 && distance(target, testimony) < REPORT_RULES.radius,
        )
        .sort(
          (a, b) => distance(a, testimony) - distance(b, testimony),
        );
      const affected =
        lightning && !giftEffect("reportLightningAll")
          ? targets.slice(0, 1)
          : targets;
      for (const target of affected) {
        if (lightning) target.stun = 1.2;
        hurtEnemy(
          target,
          (lightning ? 22 : 30) +
            bonus("journalistPower") +
            countGift("scoop") * 10,
          "journalist-report",
        );
        const poisonDamage = giftEffect("reportPoison");
        if (poisonDamage > 0 && target.hp > 0) {
          const immediate = applyReportPoison(target, poisonDamage, !!giftEffect("reportInstantPoison"));
          if (immediate) hurtEnemy(target, immediate, "poison");
        }
      }
    }
    burst(
      testimony.x,
      testimony.y,
      visual.color,
      18,
    );
    effects.push({
      kind: "ring",
      x: testimony.x,
      y: testimony.y,
      r: REPORT_RULES.radius,
      life: 0.5,
      maxLife: 0.5,
      color: visual.color,
    });
    tone(650, 0.15);
  }

  function activateInterview(testimony) {
    const {
      effects, enemies, bonus, giftEffect, countGift, distance, spawnFX,
      hurtEnemy, originalSound,
    } = context;
    if (!testimony || testimony.life <= 0) return;
    testimony.life = 0;
    const subtype = testimony.subtype;
    testimonyActivated(subtype);
    const zone = {
      kind: "interview",
      job: "journalist",
      subtype,
      x: testimony.x,
      y: testimony.y,
      r: (145 + bonus("interviewRadius")) * (1 + giftEffect("interviewRadius")),
      life: 5 * (1 + giftEffect("interviewDuration")),
      maxLife: 5 * (1 + giftEffect("interviewDuration")),
      tick: 0,
      age: 0,
      damage: subtype === "heal" ? 0 : 5 + countGift("scoop") * 10,
      healing: subtype === "heal",
      color: (TESTIMONIES[subtype] || TESTIMONIES.fire).color,
    };
    effects.push(zone);
    spawnFX(TESTIMONY_DISAPPEAR_EFFECT, zone.x, zone.y, 1, 0.6);
    for (const enemy of enemies)
      if (enemy.hp > 0 && distance(enemy, zone) < zone.r) {
        if (giftEffect("interviewFreeze"))
          enemy.stun = Math.max(enemy.stun, giftEffect("interviewFreeze"));
        const damage =
          giftEffect("interviewFireExplosion") + giftEffect("interviewLightning");
        if (damage > 0) hurtEnemy(enemy, damage, "journalist-report");
      }
    originalSound("tampon");
  }

  function report(slot, origin, aimedTarget) {
    const { player, effects, skillTarget, spawnFX, originalSound, floating, save, distance } = context;
    if (player.notebook.length === 2) {
      const contents = consumeReport(player.notebook);
      const target = aimedTarget || skillTarget(240);
      for (const subtype of contents)
        activateTestimony({ subtype, x: target.x, y: target.y, life: 1 });
      spawnFX(17, player.x, player.y - 15, 1, 0.6);
      originalSound("ecriture");
    } else {
      const testimonies = availableTestimonies(effects, origin, distance);
      if (testimonies.length && collectTestimony(player.notebook, testimonies[0].subtype)) {
        testimonies[0].life = 0;
        player["skill" + slot] = 0.6;
        floating("Notas " + player.notebook.length + "/2", player.x, player.y - 65, "#e9dfb4");
        originalSound("ecriture");
      }
    }
    save();
  }

  function interview(origin) {
    const { effects, giftEffect, distance, save, isVisibleInWorld } = context;
    const testimonies = availableTestimonies(effects, origin, distance, {
      allVisible: !!giftEffect("interviewAllVisible"),
      isVisible: isVisibleInWorld,
    });
    const selected = giftEffect("interviewAllVisible") ? testimonies : testimonies.slice(0, 1);
    for (const testimony of selected) activateInterview(testimony);
    save();
  }

  return { report, interview };
}
