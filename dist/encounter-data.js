// Local encounter composition. Values are reconstruction parameters, not confirmed server balance.
export const ENCOUNTER_RULES = Object.freeze({
  wave: Object.freeze({ baseCount: 4, roomGrowth: 1, maxGrowth: 3 }),
  enemySelection: Object.freeze({
    frog: Object.freeze({ minRoom: 2, indexEvery: 4, offset: 0 }),
    wasp: Object.freeze({ minRoom: 1, indexEvery: 3, offset: 0 }),
    spider: Object.freeze({ indexEvery: 3, offset: 0 }),
    hedgehog: Object.freeze({ indexEvery: 4, offset: 2 }),
    fallback: "beetle",
  }),
  boss: Object.freeze({
    creatureId: 45,
    name: "Escarabajo acorazado",
    // Local pattern inference from the scarab's recovered attack/charge animations.
    attackPatterns: Object.freeze(["stomp", "charge", "heavy-stomp"]),
    chargeDuration: 0.4,
    chargeDistance: 260,
    chargeOvershoot: 90,
    chargeImpactRadius: 145,
    stompRadius: 145,
    heavyStompRadius: 190,
    adds: Object.freeze([
      Object.freeze({ type: "hedgehog", x: 930, y: 420 }),
      Object.freeze({ type: "spider", x: 1320, y: 830 }),
    ]),
    x: 1150,
    y: 610,
  }),
  waveAnnouncements: Object.freeze({
    first: "Un susurro entre las hojas",
    later: "En lo profundo del bosque",
    category: "ETAPA {step} · ENCUENTRO {room} DE {count}",
  }),
});
