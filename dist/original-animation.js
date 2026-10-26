// Canvas reproduction of the archived ClipAnim format. Original data is never executed.
import { COSMETIC_SETS } from "./cosmetics.js";
import { createClothingLoader } from "./clothing-loader.js";
export { COSMETIC_SETS };
const base = "./assets/original/";
let metadata, clothingLoader;
const images = new Map(),
  creatures = new Map(),
  mouseParts = new Map(),
  clothingSets = new Map(),
  outfitSlots = new Map(),
  effects = new Map(),
  summons = new Map(),
  animationFrameCounts = new Map();
// Labels describe recovered visual parts; they are local names, not original item names.
const supported = new Set([
  2, 3, 4, 5, 7, 10, 14, 15, 17, 19, 30, 32, 38, 40, 41, 43, 44, 45, 46, 47, 49, 50,
]);
const normalize = (value) => value.replaceAll("\\", "/").replace(/^\/+/, "");
function imagePath(name, source) {
  if (!name.startsWith("@")) return null;
  const value = name.slice(1);
  return normalize(
    value.startsWith("+") ? "anim/" + value.slice(1) : source + value,
  );
}
export async function loadOriginalAnimations() {
  metadata = await (await fetch(base + "creatures.json")).json();
  const clothingCatalogue = await (await fetch(base + "clothing-looks.json")).json();
  metadata.clothing = clothingCatalogue.looks;
  creatures.clear();
  animationFrameCounts.clear();
  mouseParts.clear();
  clothingSets.clear();
  outfitSlots.clear();
  for (const m of metadata.monsters) creatures.set(m.id, m.clip);
  for (const item of metadata.clothing) clothingSets.set(item.code, item);
  for (const item of metadata.clothing.filter((c) => c.code === 2)) {
    for (const part of item.parts)
      mouseParts.set(part.name, {
        ...part,
        path: `equipement/2/${part.name}.png`,
      });
  }
  const downloads = await (
    await fetch(base + "animation-image-downloads.json")
  ).json();
  effects.clear();
  summons.clear();
  // Effects have a separate identifier space and never replace creature entries.
  let extraImages = [];
  try {
    const response = await fetch(base + "effects.json");
    if (response.ok) {
      const extra = await response.json();
      for (const effect of extra.effects ?? [])
        effects.set(effect.id, effect.clip);
      for (const summon of extra.summons ?? [])
        summons.set(summon.id, summon.clip);
      extraImages = extra.images ?? [];
    }
  } catch {
    // The base reconstruction remains usable if optional FX metadata is absent.
  }
  const resources = new Set([
    ...downloads.filter((d) => d.bytes).map((d) => d.resource),
    ...extraImages,
  ]);
  await Promise.all(
    [...resources].map(
      (resource) =>
        new Promise((resolve) => {
          if (images.has(resource)) return resolve();
          const image = new Image();
          image.onload = () => {
            images.set(resource, image);
            resolve();
          };
          image.onerror = resolve;
          image.src = base + resource;
        }),
    ),
  );
  clothingLoader=createClothingLoader({images,clothingSets,
    loadManifest:async()=>{
      const response=await fetch(base+"clothing-downloads.json");
      if(!response.ok) throw Error("Local clothing manifest unavailable");
      return response.json();
    },
    loadImage:resource=>new Promise(resolve=>{
      const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);
      image.src=base+resource;
    }),
  });
  return {
    loaded: images.size,
    creatures: [2, 3, 4, 5, 7, 10, 15, 17, 19, 30, 32, 38, 40, 41, 43, 44, 45, 46, 47, 49, 50],
    effects: [...effects.keys()],
    summons: [...summons.keys()],
  };
}
export function loadOriginalClothing(codes) {
  if(!clothingLoader) return Promise.reject(Error("Load original animations before requesting clothing"));
  return clothingLoader.load(codes);
}
export function originalClothingStatus() {return clothingLoader?.snapshot() ?? [];}
function values(s) {
  const v = s.values;
  return {
    x: (v[10] ?? 0) / 1000,
    y: (v[11] ?? 0) / 1000,
    r: (v[20] ?? 0) / 50000,
    sx: (v[21] ?? 0) / 50000,
    sy: (v[22] ?? 0) / 50000,
    ex: (v[30] ?? 1000) / 1000,
    ey: (v[31] ?? 1000) / 1000,
    a: (v[40] ?? 1000) / 1000,
  };
}

/** Return the recovered primary animation length for an entity state. */
export function originalAnimationFrameCount(code, state) {
  const key = `${code}:${state}`;
  if (animationFrameCounts.has(key)) return animationFrameCounts.get(key);
  const root = creatures.get(code);
  const clip = root?.type === "C"
    ? root.children.find((child) => child.name === state)?.clip
    : root;
  const animation = clip?.animations?.find((entry) => entry.main) ?? clip?.animations?.[0];
  const frames = Number.isFinite(animation?.frames) ? animation.frames : null;
  animationFrameCounts.set(key, frames);
  return frames;
}

function ease(t, bezier) {
  if (!bezier) return t;
  const [x1, y1, x2, y2] = bezier;
  const curve = (v, a, b) =>
    3 * (1 - v) ** 2 * v * a + 3 * (1 - v) * v ** 2 * b + v ** 3;
  let lo = 0,
    hi = 1;
  for (let i = 0; i < 15; i++) {
    const mid = (lo + hi) / 2;
    if (curve(mid, x1, x2) < t) lo = mid;
    else hi = mid;
  }
  return curve((lo + hi) / 2, y1, y2);
}
function drawImage(ctx, path, anchor) {
  const image = images.get(path);
  if (!image) return false;
  let [x, y] = anchor ?? [0, 0];
  if (x <= 1 && y <= 1) {
    x *= image.width;
    y *= image.height;
  }
  ctx.drawImage(image, -x, -y);
  return true;
}
function slotsForClothing(codes = []) {
  const selected = [...new Set(Array.isArray(codes) ? codes : [])].filter(
    (code) => code !== 2 && clothingSets.has(code),
  );
  const key = selected.join(",");
  if (outfitSlots.has(key)) return outfitSlots.get(key);
  const slots = new Map();
  for (const item of [
    clothingSets.get(2),
    ...selected.map((code) => clothingSets.get(code)),
  ]) {
    if (!item) continue;
    for (const part of item.parts) {
      if (!slots.has(part.name)) slots.set(part.name, []);
      slots.get(part.name).push({
        ...part,
        layer:
          (item.depth > 127 ? item.depth - 256 : item.depth) +
          (part.depth > 127 ? part.depth - 256 : part.depth),
        path: `equipement/${item.code}/${part.name}.png`,
      });
    }
  }
  for (const parts of slots.values()) parts.sort((a, b) => a.layer - b.layer);
  // Keep the cache bounded if a caller supplies many outfit combinations.
  if (outfitSlots.size >= 128) outfitSlots.clear();
  outfitSlots.set(key, slots);
  return slots;
}
function renderAnimation(
  ctx,
  clip,
  anim,
  frame,
  stack = 0,
  slots = null,
  once = false,
) {
  if (stack > 20) return;
  frame =
    anim.loop && !once
      ? frame % anim.frames
      : Math.min(frame, anim.frames - 0.001);
  for (const child of anim.children) {
    const index = child.sequences.findIndex(
      (s) => frame >= s.start && frame < s.end,
    );
    if (index < 0) continue;
    const seq = child.sequences[index],
      a = values(seq),
      next = child.sequences[index + 1];
    if (seq.tween && next) {
      const b = values(next),
        t = ease((frame - seq.start) / (seq.end - seq.start), seq.bezier);
      for (const key of Object.keys(a)) {
        let delta = b[key] - a[key];
        if (["r", "sx", "sy"].includes(key))
          delta = Math.atan2(Math.sin(delta), Math.cos(delta));
        a[key] += delta * t;
      }
    }
    ctx.save();
    ctx.transform(
      Math.cos(a.r + a.sy) * a.ex,
      Math.sin(a.r + a.sy) * a.ex,
      -Math.sin(a.r - a.sx) * a.ey,
      Math.cos(a.r - a.sx) * a.ey,
      a.x,
      a.y,
    );
    ctx.globalAlpha *= a.a;
    const path = imagePath(child.name, clip.source);
    if (path) drawImage(ctx, path, child.anchor);
    else if (child.name.startsWith("#")) {
      const name = child.name.slice(1);
      const parts = slots?.get(name);
      if (parts) {
        for (const part of parts) drawImage(ctx, part.path, [part.x, part.y]);
      } else if (!slots) {
        const part = mouseParts.get(name);
        if (part) drawImage(ctx, part.path, [part.x, part.y]);
      }
    } else {
      const nested = clip.animations.find((a) => a.name === child.name);
      if (nested)
        renderAnimation(
          ctx,
          clip,
          nested,
          frame - child.sequences[0].start,
          stack + 1,
          slots,
        );
    }
    ctx.restore();
  }
}
/** time is elapsed animation time in milliseconds; facing < 0 mirrors horizontally. Returns false if data is unavailable. */
export function drawOriginalCreature(
  ctx,
  code,
  animation,
  x,
  y,
  time = 0,
  facing = 1,
  scale = 1,
  options = {},
) {
  let clip = creatures.get(code);
  if (!supported.has(code) || !clip || !images.size) return false;
  if(code===2) clothingLoader?.queue(options?.clothing);
  if (clip.type === "C")
    clip =
      clip.children.find((c) => c.name === animation)?.clip ??
      clip.children.find((c) => c.name === "statique")?.clip;
  if (!clip) return false;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale((facing < 0 ? -1 : 1) * scale, scale);
  if (clip.type === "I")
    drawImage(ctx, imagePath(clip.name, clip.source), clip.anchor);
  else if (clip.type === "A") {
    const anim = clip.animations.find((a) => a.main) ?? clip.animations[0];
    if (anim)
      renderAnimation(
        ctx,
        clip,
        anim,
        (Math.max(0, time) * 60) / 1000,
        0,
        code === 2 ? slotsForClothing(options?.clothing) : null,
      );
  }
  ctx.restore();
  return true;
}

function drawRecoveredClip(ctx, clip, animation, x, y, time, scale, options) {
  if (!clip || !images.size) return false;
  // Containers carry named states, while A carries a primary animation and I an image.
  if (clip.type === "C")
    clip =
      clip.children.find((child) => child.name === animation)?.clip ??
      clip.children.find((child) => child.name === "statique")?.clip ??
      clip.children[0]?.clip;
  if (!clip || !["I", "A"].includes(clip.type)) return false;
  const anim =
    clip.type === "A"
      ? (clip.animations.find((entry) => entry.main) ?? clip.animations[0])
      : null;
  if (clip.type === "A" && !anim) return false;
  const image = clip.type === "I" ? imagePath(clip.name, clip.source) : null;
  if (image && !images.has(image)) return false;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(options.rotation);
  ctx.scale((options.facing < 0 ? -1 : 1) * scale, scale);
  ctx.globalAlpha *= Math.max(0, Math.min(1, options.alpha));
  if (clip.type === "I") drawImage(ctx, image, clip.anchor);
  else
    renderAnimation(
      ctx,
      clip,
      anim,
      (Math.max(0, time) * 60) / 1000,
      0,
      null,
      options.once,
    );
  ctx.restore();
  return true;
}

/** Draw a recovered FX clip; once clamps the root timeline instead of looping. */
export function drawOriginalEffect(
  ctx,
  id,
  x,
  y,
  timeMS = 0,
  scale = 1,
  { once = false, rotation = 0, facing = 1, alpha = 1 } = {},
) {
  return drawRecoveredClip(
    ctx,
    effects.get(id),
    undefined,
    x,
    y,
    timeMS,
    scale,
    { once, rotation, facing, alpha },
  );
}

/** IDs 8/9 are cauldron/trap; 24–28 are the recovered botanist plants. */
export function drawOriginalSummon(
  ctx,
  id,
  animation,
  x,
  y,
  timeMS = 0,
  facing = 1,
  scale = 1,
) {
  return drawRecoveredClip(
    ctx,
    summons.get(id),
    animation,
    x,
    y,
    timeMS,
    scale,
    { once: false, rotation: 0, facing, alpha: 1 },
  );
}
