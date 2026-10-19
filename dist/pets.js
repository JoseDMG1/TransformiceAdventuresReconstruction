import { PET_SPECIES } from "./characters.js";
import { absorbBarrier, tickBarrier } from "./barriers.js";
import { areaDefenseMultiplier, areaAttackMultiplier } from "./area-effects.js";

const HEDGEHOG = PET_SPECIES.hedgehog;

export function petMaxHPForLevel(level, talentBonus = 0, speciesId = HEDGEHOG.id) {
  const species = PET_SPECIES[speciesId] ?? HEDGEHOG;
  return species.baseHP + (level - 1) * species.hpPerLevel + talentBonus;
}

export function createPetSystem(context) {
  function maxHP() {
    return petMaxHPForLevel(
      context.profile.level,
      context.bonus("petMaxHp"),
      context.profile.petSpecies,
    );
  }

  function createState({ player, kind, oldPet }) {
    const maximum = maxHP();
    const state = {
      x: player.x - 55,
      y: player.y + 18,
      facing: 1,
      injured: kind === "tutorial",
      attack: 0,
      invisible: 0,
      barrier: 0,
      barrierTime: 0,
      bandageHot: 0,
      hotTick: 0,
      bandageGuard: 0,
      hp:
        kind === "tutorial"
          ? 0
          : kind === "dungeon" && oldPet
            ? (oldPet.hp ?? maximum)
            : maximum,
      invuln: 0,
    };
    if (kind === "dungeon" && oldPet) state.injured = !!oldPet.injured;
    return state;
  }

  function heal(amount, revive = false, range = 160) {
    const { profile, player, pet, distance, bonus, floating } = context;
    if (
      !profile.petActive ||
      distance(player, pet) > range ||
      (pet.injured && !revive)
    ) return;
    amount *= 1 + bonus("petHealing");
    const before = pet.hp || 0;
    const actual = Math.min(Math.max(0, maxHP() - before), amount);
    const excess = Math.max(0, amount - actual);
    pet.hp = Math.min(maxHP(), before + amount);
    if (pet.hp > 0) pet.injured = false;
    if (actual > 0) floating("+" + Math.round(actual), pet.x, pet.y - 35, "#cfe8a7");
    return { actual, excess, amount };
  }

  function hurt(amount, source = null) {
    const { profile, pet, scene, time, bonus, giftEffect, floating, toast, save, hurtEnemy, effects, distance } = context;
    const hitTime = Number.isFinite(time) ? time : 0;
    if (
      !profile.petActive ||
      pet.injured ||
      pet.invuln > 0 ||
      scene.kind !== "dungeon"
    ) return;
    if (Math.random() < bonus("petBlock")) {
      floating("Parada", pet.x, pet.y - 35, "#dbe8b0");
      return;
    }
    const receivedDamage = amount;
    if (pet.heartReflect) {
      pet.heartReflect = false;
      if (source?.hp > 0) hurtEnemy(source, receivedDamage, "heart-reflect");
      floating("Reflejo", pet.x, pet.y - 50, "#f5b6c8");
    }
    amount *= 1 - bonus("petWoundedGuard") * Math.max(0, Math.min(1, 1 - pet.hp / maxHP()));
    if (pet.bandageGuard > 0)
      amount *= 1 - giftEffect("bandageDamageReduction");
    amount *= areaDefenseMultiplier(pet, effects, bonus, giftEffect, distance);
    amount = absorbBarrier(pet, amount);
    pet.hp = Math.max(0, pet.hp - amount);
    if (!(pet.hitFlashUntil > hitTime)) pet.hitFlashUntil = hitTime + 0.05;
    pet.hitSquashStartedAt = hitTime;
    pet.invuln = 0.8;
    floating("-" + Math.round(amount), pet.x, pet.y - 35, "#efbd91");
    if (pet.hp <= 0) {
      pet.injured = true;
      pet.moving = false;
      toast(`${profile.petName} está herido. Acércate y pulsa E para ayudarle.`);
      save();
    }
  }

  function update(dt) {
    tickBarrier(context.pet, dt);
    const { profile, player, pet, scene, enemies, distance, moveEntity, bonus,
      healPlayer, countGift, inArea, hurtEnemy, effects, spawnTestimony, time,
      giftEffect, resolvePetSkill } = context;
    if (profile.petActive && !pet.injured) {
      const d = distance(pet, player);
      pet.moving = d > 52;
      if (d > 52) {
        const step = Math.min(d - 50, 220 * dt);
        moveEntity(pet, ((player.x - pet.x) / d) * step,
          ((player.y - pet.y) / d) * step, 10);
        const horizontal = (player.x - pet.x) / d;
        if (Math.abs(horizontal) > 0.1) {
          const facing = horizontal < 0 ? -1 : 1;
          if (facing !== pet.facing) {
            pet.facing = facing;
            pet.turnSquashStartedAt = time;
          }
        }
      }
      pet.attack = Math.max(0, pet.attack - dt);
      if (bonus("petRescue") && player.hp < context.maxHP() * 0.5 &&
        distance(player, pet) < 140 && (pet.rescueTimer || 0) <= 0) {
        healPlayer(bonus("petRescue"));
        pet.rescueTimer = 2;
      }
      pet.rescueTimer = Math.max(0, (pet.rescueTimer || 0) - dt);
      const target = enemies.filter((e) => e.hp > 0 && distance(e, player) < 230)
        .sort((a, b) => distance(a, pet) - distance(b, pet))[0];
      if (target && pet.attack <= 0 && distance(pet, target) < 125 && !player.states.downed) {
        pet.attack = 1.7 * (1 - bonus("petAttackSpeed"));
        const weaponShare =
          giftEffect("reportWeaponAllyDamage") &&
          context.hasActiveWeaponGift() &&
          distance(player, pet) <= 160
            ? giftEffect("reportWeaponAllyDamage")
            : 0;
        const damage =
          6 + profile.talents.pet * 4 + countGift("companion") * 6 +
          bonus("petDamage") + (inArea("interview", pet) ? 6 * bonus("interviewPetDamage") : 0) +
          (player.states.cardPet ? 6 * bonus("cardPetPower") : 0);
        hurtEnemy(target, damage * (1 + weaponShare) * areaAttackMultiplier(pet, effects, giftEffect, distance), "pet");
        player.states.cardPet = 0;
        effects.push({ kind: "ring", x: target.x, y: target.y, life: 0.2,
          maxLife: 0.2, r: 20, color: "#dfd6a0" });
      }
    }
    pet.testimonyTimer = Math.max(0, (pet.testimonyTimer || 0) - dt);
    if (profile.petActive && pet.testimonyTimer <= 0 && scene.kind === "dungeon" &&
      enemies.some((e) => e.hp > 0) && ((pet.injured && bonus("petDownTestimony")) ||
      (!pet.injured && bonus("petTestimony")))) {
      spawnTestimony(pet.x + 35, pet.y, pet.injured ? "heal" :
        ["heal", "fire", "lightning"][Math.floor(Math.random() * 3)]);
      pet.testimonyTimer = 8;
    }
    if (giftEffect("petTriggersInterview") && profile.petActive && !pet.injured &&
      effects.some((e) => e.kind === "testimony" && e.life > 0 && distance(pet, e) < 80)) {
      for (let slot = 1; slot <= 3; slot++) {
        const loadout = resolvePetSkill(slot);
        if (loadout?.job === "journalist" && loadout.skill === 2 && player["skill" + slot] <= 0) {
          context.useSkill(slot, pet);
          break;
        }
      }
    }
  }

  return Object.freeze({ maxHP, createState, heal, hurt, update });
}
