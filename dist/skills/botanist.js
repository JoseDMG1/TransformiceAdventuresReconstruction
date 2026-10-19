import { plantHealthLimit } from "../plant-data.js";

export function createBotanistSkills(context) {
  function nextPlant() {
    const { player, giftEffect, bonus } = context;
    if (giftEffect("plantFallow")) return "bramble";
    const first = bonus("plantRange")
      ? "thorn"
      : bonus("plantHealing")
        ? "lily"
        : "thorn";
    const order = [first, ...["thorn", "bramble", "lily"].filter((t) => t !== first)];
    const type = order[(player.plantIndex || 0) % 3];
    player.plantIndex = ((player.plantIndex || 0) + 1) % 3;
    return type;
  }

  function elixir(aimedTarget) {
    const {
      player, effects, pointer, bonus, giftEffect, countGift,
      screenToWorld, tone,
    } = context;
    const target = aimedTarget || (pointer.aimed
      ? screenToWorld(pointer.x, pointer.y)
      : {
          x: player.x + Math.cos(player.angle) * 110,
          y: player.y + Math.sin(player.angle) * 110,
        });
    const distance = Math.hypot(target.x - player.x, target.y - player.y);
    const multiplier = distance > 210 ? 210 / distance : 1;
    const x = player.x + (target.x - player.x) * multiplier;
    const y = player.y + (target.y - player.y) * multiplier;
    const duration = 3 * (1 + giftEffect("elixirDuration"));
    effects.push({
      kind: "flask",
      startX: player.x,
      startY: player.y,
      landingX: x,
      landingY: y,
      flightElapsed: 0,
      flightDuration: 0.45,
      poolLife: duration,
      job: "botanist",
      hp: 0,
      age: 0,
      x: player.x,
      y: player.y,
      r: 115 + bonus("elixirRadius"),
      life: duration,
      maxLife: duration,
      tick: 0,
      damage: 8 + bonus("botanistPower") + countGift("botany") * 6,
      color: "#ac84bf",
      healing: !giftEffect("elixirDamageOnly"),
    });
    tone(560, 0.2, "sine");
  }

  function grow() {
    const { player, effects, bonus, giftEffect, countGift, tone, nextFieldUid } = context;
    const subtype = nextPlant();
    effects.push({
      kind: "plant",
      uid: nextFieldUid(),
      subtype,
      hp: plantHealthLimit({ subtype }, bonus("plantHealth"), !!giftEffect("plantFallow")),
      age: 0,
      armed: false,
      rearmCount: 0,
      x: player.x,
      y: player.y,
      r: 115 + (subtype === "thorn" ? bonus("plantRange") : 0),
      life: 12,
      maxLife: 12,
      tick: 0,
      damage: 10 + countGift("botany") * 6,
      color: "#b5cf64",
    });
    tone(320, 0.12, "triangle");
  }

  return { elixir, grow };
}
