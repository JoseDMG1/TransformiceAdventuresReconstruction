import { CARDS } from "../jobs.js";

export function createTricksterSkills(context) {
  function vanish() {
    const {
      player, enemies, pet, profile, effects, giftEffect, bonus, distance,
      healPlayer, healPet, hurtEnemy,
      spawnFX, burst, floating, tone,
    } = context;
    player.invisible = 3;
    player.vanishOrigin = { x: player.x, y: player.y };
    spawnFX(10, player.x, player.y, 1.5, 0.55);
    if (giftEffect("vanishDecoy"))
      effects.push({
        kind: "decoy",
        x: player.x,
        y: player.y,
        hp: 45,
        maxHp: 45,
        r: 16,
        life: player.invisible,
        maxLife: player.invisible,
        age: 0,
        color: "#dec9ef",
      });
    if (giftEffect("vanishStun"))
      for (const enemy of enemies)
        if (enemy.hp > 0 && distance(player, enemy) < 150)
          enemy.stun = Math.max(enemy.stun, giftEffect("vanishStun"));
    if (giftEffect("vanishTornado")) {
      const radius = 150;
      for (const enemy of enemies)
        if (enemy.hp > 0 && distance(player, enemy) <= radius)
          hurtEnemy(enemy, giftEffect("vanishTornado"));
      effects.push({
        kind: "tornado",
        x: player.x,
        y: player.y,
        r: radius,
        life: 0.85,
        maxLife: 0.85,
        age: 0,
        color: "#c9d9dc",
      });
    }
    if (bonus("vanishCleanse")) player.states.slow = 0;
    const vanishHealing =
      bonus("vanishHealing") * (1 + giftEffect("vanishHealingTrade"));
    if (vanishHealing) healPlayer(vanishHealing);
    if (
      giftEffect("vanishShareEffects") &&
      profile.petActive &&
      distance(player, pet) <= 160
    ) {
      pet.invisible = player.invisible;
      if (bonus("vanishCleanse")) pet.slow = 0;
      if (vanishHealing) healPet(vanishHealing, false);
      floating("Efectos compartidos", pet.x, pet.y - 55, "#dec9ef");
    }
    burst(player.x, player.y - 20, "#cab1d7", 25);
    floating("Desaparición", player.x, player.y - 60, "#dec9ef");
    tone(620, 0.2);
  }

  function cards(slot, aimedTarget) {
    const {
      player, profile, pet, effects, projectiles, enemies, giftEffect, bonus,
      countGift, distance, healPlayer, healPet, grantBarrier, skillTarget,
      spawnFX, floating, originalSound,
    } = context;
    const cardIndex = player.cardIndex % CARDS.length;
    const card = CARDS[cardIndex];
    if (player.lastCard >= 0 && player.lastCard !== cardIndex)
      player["skill" + slot] *= Math.max(
        0.2,
        1 - giftEffect("cardsAlternationRecovery"),
      );
    player.lastCard = cardIndex;
    spawnFX([77, 63, 76, 62][cardIndex], player.x, player.y - 20, 0.6, 0.8);
    if (bonus("cardPetPower")) player.states.cardPet = 1;
    player.cardIndex = (player.cardIndex + 1) % CARDS.length;
    floating(card.icon + " " + card.name, player.x, player.y - 65, card.color);
    effects.push({
      kind: "ring",
      x: player.x,
      y: player.y,
      r: 170,
      life: 0.6,
      maxLife: 0.6,
      color: card.color,
    });
    const target = aimedTarget || skillTarget(300);
    if (card.kind === "heal") {
      const radius = 160 * (1 + giftEffect("cardsHeartRadius"));
      if (distance(player, target) < radius) {
        healPlayer(26 + bonus("cardHealing"));
        grantBarrier(giftEffect("cardsHeartBarrier"));
        if (giftEffect("cardsHeartReflect")) {
          player.states.heartReflect = 1;
          floating("As de corazones", player.x, player.y - 55, "#f5b6c8");
        }
      }
      if (profile.petActive && distance(pet, target) < radius) {
        healPet(26 + bonus("cardHealing"), false, Infinity);
        if (!pet.injured) grantBarrier(giftEffect("cardsHeartBarrier"), pet);
        if (giftEffect("cardsHeartReflect")) {
          pet.heartReflect = true;
          floating("As de corazones", pet.x, pet.y - 55, "#f5b6c8");
        }
      }
      spawnFX(63, target.x, target.y, 0.7, 0.8);
    } else if (
      card.kind === "power" &&
      !(
        card.suit === "club" &&
        (giftEffect("cardsClubRiskDamage") ||
          giftEffect("cardsClubConditionalDamage") ||
          giftEffect("cardsClubPoison"))
      )
    ) {
      player.states.cardPower = 1;
      grantBarrier(bonus("cardShield"));
    } else {
      const angle = Math.atan2(target.y - player.y, target.x - player.x);
      const offensiveClub = card.suit === "club";
      let cardDamage =
        (card.kind === "stun" ? 12 : 30) +
        (card.suit === "spade" || offensiveClub ? bonus("tricksterPower") : 0) +
        countGift("cards") * 16;
      if (offensiveClub && giftEffect("cardsClubRiskDamage"))
        cardDamage *= 2;
      projectiles.push({
        kind: "card",
        cardKind: offensiveClub ? "damage" : card.kind,
        cardSuit: card.suit,
        x: player.x,
        y: player.y - 15,
        vx: Math.cos(angle) * 480,
        vy: Math.sin(angle) * 480,
        life: 1.4,
        damage: cardDamage,
        enemy: false,
        hitIDs: [],
        maxHits: card.kind === "stun" ? 1 + giftEffect("cardsDiamondTargets") : 6,
        returnToPlayer:
          card.suit === "spade" && !!giftEffect("cardsSpadeReturn"),
        returnAfter: 0.55,
        age: 0,
        returning: false,
        color: card.color,
      });
      if (offensiveClub && giftEffect("cardsClubRiskDamage")) {
        player.states.clubStun = Math.max(
          player.states.clubStun || 0,
          0.75,
        );
        player.states.clubVulnerability = Math.max(
          player.states.clubVulnerability || 0,
          3,
        );
        floating("Aturdido", player.x, player.y - 70, "#dce7ac");
      }
      if (card.suit === "spade" && giftEffect("cardsSpadeVolley")) {
        const targets = enemies
          .filter(
            (enemy) =>
              enemy.hp > 0 && distance(player, enemy) <= 220,
          )
          .sort((a, b) => distance(player, a) - distance(player, b))
          .slice(0, 6);
        for (const enemy of targets) {
          const targetAngle = Math.atan2(
            enemy.y - 10 - (player.y - 15),
            enemy.x - player.x,
          );
          projectiles.push({
            kind: "card",
            cardKind: "damage",
            cardSuit: "spade",
            x: player.x,
            y: player.y - 15,
            vx: Math.cos(targetAngle) * 480,
            vy: Math.sin(targetAngle) * 480,
            life: 1.4,
            damage: cardDamage,
            enemy: false,
            hitIDs: [],
            maxHits: 1,
            targetUid: enemy.uid,
            returnToPlayer: !!giftEffect("cardsSpadeReturn"),
            returnAfter: 0.55,
            age: 0,
            returning: false,
            color: card.color,
          });
        }
      }
    }
    originalSound("carte1", 440 + player.cardIndex * 100, 0.15);
  }

  return { vanish, cards };
}
