// MondeADV-2021.js:60-64,319-325: one ambient voice, checked once a second.
const AMBIENCES = Object.freeze([
  ["ambiance/foret2", 0.5],
  ["ambiance/foret", 0.3],
  ["ambiance/prairie", 1],
  ["ambiance/vent", 1],
]);

export function createAmbientAudio({ play, isPlaying, stop, random = Math.random }) {
  let current = "";
  let nextCheckAt = 0;
  return {
    update(now) {
      if (now < nextCheckAt) return;
      nextCheckAt = now + 1;
      if (current && isPlaying(current)) return;
      const [name, volume] = AMBIENCES[Math.floor(random() * AMBIENCES.length)];
      // Playback can be rejected asynchronously by the browser. The next poll
      // consults the playback adapter rather than assuming acceptance is sound.
      current = play(name, { volume }) ? name : "";
    },
    reset(now) {
      if (current) stop(current);
      current = "";
      nextCheckAt = now;
    },
  };
}
