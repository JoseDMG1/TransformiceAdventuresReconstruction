// Original evidence: reference/REA_COOK_CARDS.md and CHEF_INGREDIENT_ASSETS.md.
// Three ingredient categories and three visual slots are observed in the client.
// Recipe arithmetic, duration and washing healing below are LOCAL reconstruction.
export const INGREDIENT_TYPES = Object.freeze([
  Object.freeze({
    id: 0,
    name: "Ataque",
    icon: "assets/original/cuisto/i/100.png",
  }),
  Object.freeze({
    id: 1,
    name: "Defensa",
    icon: "assets/original/cuisto/i/101.png",
  }),
  Object.freeze({
    id: 2,
    name: "Curaci\u00f3n",
    icon: "assets/original/cuisto/i/102.png",
  }),
]);

const finite = (value, fallback = 0) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;
const duration = (value, fallback = 0) =>
  Math.min(3600, Math.max(0, finite(value, fallback)));
const ingredientType = (value) =>
  Number.isInteger(value) && value >= 0 && value <= 2;

export function chooseIngredientType(weights = [1, 1, 1], random = Math.random) {
  const normalized = Array.from({ length: 3 }, (_, index) =>
    Math.max(0, finite(weights[index], 1)),
  );
  const total = normalized.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) return Math.min(2, Math.floor(Math.max(0, random()) * 3));
  let roll = Math.min(0.999999999999, Math.max(0, random())) * total;
  for (let index = 0; index < normalized.length; index++) {
    roll -= normalized[index];
    if (roll < 0) return index;
  }
  return 2;
}

export function createCauldronState() {
  return { phase: "collecting", ingredients: [], remaining: 0, wash: 0 };
}

export function normalizeCauldronState(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return createCauldronState();
  const ingredients = Array.isArray(raw.ingredients)
    ? raw.ingredients.filter(ingredientType).slice(0, 3)
    : [];
  let phase = ["collecting", "cooking", "dirty"].includes(raw.phase)
    ? raw.phase
    : "collecting";
  let remaining = phase === "cooking" ? duration(raw.remaining) : 0;
  if (ingredients.length < 3 && phase !== "collecting") {
    phase = "collecting";
    remaining = 0;
  }
  if (phase === "cooking" && remaining === 0) phase = "dirty";
  return { phase, ingredients, remaining, wash: duration(raw.wash) };
}

function normalizedInPlace(state) {
  Object.assign(state, normalizeCauldronState(state));
  return state;
}

export function addIngredient(state, type) {
  normalizedInPlace(state);
  if (
    state.phase !== "collecting" ||
    state.ingredients.length >= 3 ||
    !ingredientType(type)
  ) {
    return {
      added: false,
      ready: state.phase === "collecting" && state.ingredients.length === 3,
    };
  }
  state.ingredients.push(type);
  return { added: true, ready: state.ingredients.length === 3 };
}

export function removeIngredient(state) {
  normalizedInPlace(state);
  if (state.phase !== "collecting" || state.ingredients.length === 0)
    return { removed: false, type: null };
  return { removed: true, type: state.ingredients.pop() };
}

export function startRecipe(state, seconds = 8) {
  normalizedInPlace(state);
  if (state.phase !== "collecting" || state.ingredients.length !== 3)
    return { started: false };
  state.remaining = duration(seconds, 8);
  state.phase = state.remaining > 0 ? "cooking" : "dirty";
  state.wash = 0;
  return { started: true };
}

export function tickCauldron(state, dt) {
  normalizedInPlace(state);
  if (state.phase !== "cooking") return { finished: false };
  state.remaining = Math.max(0, state.remaining - duration(dt));
  const finished = state.remaining === 0;
  if (finished) state.phase = "dirty";
  return { finished };
}

export function washCauldron(state) {
  normalizedInPlace(state);
  if (state.phase !== "dirty") return { allowed: false, healing: 0 };
  const healing = 24 + 4 * state.ingredients.length;
  Object.assign(state, createCauldronState());
  return { allowed: true, healing };
}

export function recipeStats(state) {
  const normalized = normalizeCauldronState(state);
  const counts = [0, 0, 0];
  for (const type of normalized.ingredients) counts[type]++;
  const name = normalized.ingredients.length
    ? counts
        .map((count, id) =>
          count ? `${count} ${INGREDIENT_TYPES[id].name.toLowerCase()}` : null,
        )
        .filter(Boolean)
        .join(" + ")
    : "Caldero vac\u00edo";
  return {
    damage: 4 * counts[0],
    healing: 4 * counts[2],
    armor: 0.1 * counts[1],
    name,
  };
}

export function recipeEffects(state, bonus, giftEffect) {
  const stats = recipeStats(state);
  if (normalizeCauldronState(state).phase !== "cooking")
    return { damage: 0, healing: 0, armor: 0, name: stats.name };
  const healing = stats.healing > 0
    ? (stats.healing + bonus("chefHealing")) * (1 + giftEffect("cauldronHealing")) : 0;
  const attackDamage = stats.damage > 0
    ? stats.damage * (1 + giftEffect("recipeAttackPower")) + bonus("chefPower") : 0;
  return {
    damage: attackDamage + healing * giftEffect("cauldronHealingDamage"),
    healing,
    armor: Math.min(0.6, stats.armor * (1 + giftEffect("recipeDefensePower"))),
    name: stats.name,
  };
}
