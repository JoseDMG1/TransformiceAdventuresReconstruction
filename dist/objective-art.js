import { drawOriginalEffect } from "./original-animation.js";
import { OBJECTIVE_GROUND_EFFECT } from "./effect-data.js";

// ClipAnimProjection rotates the sprite into XZ; MondeADV's camera is at 3π/4.
// Orthographic adaptation only: the local world does not implement perspective.
export const OBJECTIVE_GROUND_Y_SCALE = Math.sin(3 * Math.PI / 4);

export function drawObjectiveGround(ctx, target, timeMS) {
  ctx.save();
  ctx.translate(target.x, target.y);
  ctx.scale(1, OBJECTIVE_GROUND_Y_SCALE);
  const drawn = drawOriginalEffect(ctx, OBJECTIVE_GROUND_EFFECT, 0, 0, timeMS, .65);
  if (!drawn) {
    ctx.strokeStyle = "#f4cf68";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}
