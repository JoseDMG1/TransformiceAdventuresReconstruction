// The video at 12:00 keeps health/status indicators above occluding trunks.
// Shapes and status symbols here are local, independent of character sprites.
import { drawOriginalHealthBar, HEALTH_COLOURS } from "./actor-overlay-art.js";
import { createHealthAnimation, advanceHealthAnimation } from "./health-animation.js";
const healthAnimations=new WeakMap();
export function playerIndicators(player) {
  return [
    player.invisible > 0 && { symbol: "✧", color: "#dec9ef" },
    player.damageBoost > 0 && { symbol: "+", color: "#ecc36d" },
    player.states?.barrier > 0 && { symbol: "◇", color: "#b9daed" },
    player.states?.bandageHot > 0 && { symbol: "✚", color: "#c4d991" },
    player.states?.cardPower > 0 && { symbol: "♣", color: "#b4d583" },
    player.states?.clubStun > 0 && { symbol: "!", color: "#ead47c" },
    player.states?.slow > 0 && { symbol: "↓", color: "#a1c7ed" },
  ].filter(Boolean);
}

export function drawActorOverlay(ctx, actor, { offset = 100, width = 64, indicators = [], injuredLabel = "", color=HEALTH_COLOURS.player,
  maxHp=actor.maxHp,time=performance.now(),hideWhenHealthy=false } = {}) {
  if (!Number.isFinite(actor.x) || !Number.isFinite(actor.y)) return;
  let animation;
  if(Number.isFinite(actor.hp)&&maxHp>0) {
    animation=healthAnimations.get(actor);
    if(!animation) {animation=createHealthAnimation(actor.hp,maxHp,time);healthAnimations.set(actor,animation);}
    advanceHealthAnimation(animation,actor.hp,maxHp,time);
  }
  if(hideWhenHealthy&&!injuredLabel&&actor.hp===maxHp&&animation?.displayed===1&&animation?.trail===1&&indicators.length===0) return;
  const y = actor.y - offset;
  ctx.save();
  if (injuredLabel) {
    ctx.font = "12px Georgia";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#28321e";
    ctx.strokeText(injuredLabel, actor.x, y);
    ctx.fillStyle = "#f0d594";
    ctx.fillText(injuredLabel, actor.x, y);
  } else if (Number.isFinite(actor.hp) && maxHp > 0) {
    const ratio = Math.max(0, Math.min(1, actor.hp / maxHp));
    if(!drawOriginalHealthBar(ctx,{x:actor.x,y,width,hp:actor.hp,maxHp,color,animation})) {
      ctx.fillStyle = "#20291f";
      ctx.fillRect(actor.x - width / 2 - 1, y - 1, width + 2, 6);
      ctx.fillStyle = color;
      ctx.fillRect(actor.x - width / 2, y, width * ratio, 4);
    }
  }
  indicators.forEach((indicator, index) => {
    const x = actor.x + (index - (indicators.length - 1) / 2) * 17;
    ctx.fillStyle = "#273124";
    ctx.beginPath(); ctx.arc(x, y - 12, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = indicator.color; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = indicator.color;
    ctx.font = "bold 11px Georgia"; ctx.textAlign = "center";
    ctx.fillText(indicator.symbol, x, y - 8);
  });
  ctx.restore();
}
