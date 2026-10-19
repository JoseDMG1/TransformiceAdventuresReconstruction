// Local playback of recovered original effects, ambience and music.
const names =
  `elixir coup1 coup2 toile bibli/2/touche plante1 plante2 plante3 metal1 metal2 metal3 parade1 cuisson1 cuisson2 casse casse_2 piege1 piege2 plop1 plop2 plop3 plop4 plop5 plop6 ecriture tampon ting coffre1 coffre2 boucle-cuisson boucle-bulle disparition carte1 carte2 carte3 whoosh slash swoosh epee combo1 combo2 tranchant1 tranchant2 tranchant3 tranchant4 buff1 buff2 buff3 fleche-debut fleche1 fleche2 fleche3 fleche4 soins1 soins3 soins4 soins5 soins6 soins7 soins2 gaz flamme feu elec elec2 foudre1 foudre2 glace gel poison poison2 xp niveausup arc0 arc1 arc2 ambiance/foret2 ambiance/foret ambiance/prairie ambiance/vent`.split(
    " ",
  );
const available = new Set(names);
const musicNames = new Set(
  `musique/tfmadv_intro musique/tfmadv_intro2 musique/tfmadv_musique2 musique/tfmadv_musique3 musique/tfmadv_combat1 musique/tfmadv_combat2 musique/tfmadv_combat3 musique/tfmadv_combat4`.split(
    " ",
  ),
);
const aliases = Object.freeze({
  coffre: "coffre2",
  arme: "epee",
  parade: "metal1",
  soin: "soins1",
});
const samples = new Map();
const active = new Set();
const lastPlayed = new Map();
const failures = new Set();
let volume = 0.55;
let effectVolume = 1;
let musicVolume = 1;
let initialized = false;
let blocked = false;
let musicVoice = null;
let musicFadeTimer = 0;
let musicGeneration = 0;
const clamp = (value) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

export function initializeOriginalAudio() {
  initialized = typeof globalThis.Audio === "function";
  return soundStatus();
}
export function setOriginalVolume(value) {
  volume = clamp(value);
  updateEffectsVolume();
  updateMusicVoiceVolume();
  return volume;
}
export function setOriginalEffectVolume(value) {
  effectVolume = clamp(value);
  updateEffectsVolume();
  return effectVolume;
}
export function setOriginalMusicVolume(value) {
  musicVolume = clamp(value);
  updateMusicVoiceVolume();
  return musicVolume;
}
function updateEffectsVolume() {
  for (const voice of active)
    voice.audio.volume = volume * effectVolume * voice.volume;
}
function updateMusicVoiceVolume() {
  if (musicVoice)
    musicVoice.audio.volume = volume * musicVolume * musicVoice.volume * musicVoice.progress;
}
function clearMusicFade() {
  if (musicFadeTimer) clearInterval(musicFadeTimer);
  musicFadeTimer = 0;
}
export function stopOriginalMusic(fadeMs = 0) {
  clearMusicFade();
  const voice = musicVoice;
  if (!voice) return;
  const generation = ++musicGeneration;
  const finish = () => {
    if (generation !== musicGeneration) return;
    clearMusicFade();
    try {
      voice.audio.pause();
      voice.audio.currentTime = 0;
    } catch {
      // Music teardown must not block a local scene transition.
    }
    if (musicVoice === voice) musicVoice = null;
  };
  if (!(fadeMs > 0)) return finish();
  const start = Date.now();
  const initialProgress = voice.progress;
  musicFadeTimer = setInterval(() => {
    if (generation !== musicGeneration) return clearMusicFade();
    voice.progress = initialProgress * (1 - Math.min(1, (Date.now() - start) / fadeMs));
    updateMusicVoiceVolume();
    if (voice.progress <= 0) finish();
  }, 30);
}
export function playOriginalMusic(name, options = {}) {
  if (
    !musicNames.has(name) ||
    typeof globalThis.Audio !== "function" ||
    failures.has(name)
  ) return false;
  stopOriginalMusic(0);
  initializeOriginalAudio();
  const localVolume = clamp(options?.volume ?? 1);
  if (!localVolume) return false;
  let voice;
  try {
    const audio = new Audio(
      new URL(`./assets/original/audio/${name}.mp3`, import.meta.url).href,
    );
    voice = { audio, volume: localVolume, progress: 0 };
    musicVoice = voice;
    audio.preload = "auto";
    audio.loop = options?.loop === true;
    audio.volume = 0;
    audio.addEventListener("ended", () => {
      if (musicVoice === voice) musicVoice = null;
    }, { once: true });
    audio.addEventListener("error", () => {
      failures.add(name);
      if (musicVoice === voice) musicVoice = null;
    }, { once: true });
    const playback = audio.play();
    if (playback?.then) playback.then(() => { blocked = false; }).catch((error) => {
      if (error?.name === "NotAllowedError") blocked = true;
      else if (error?.name !== "AbortError") failures.add(name);
      if (musicVoice === voice) musicVoice = null;
    });
    const fadeMs = Math.max(0, Number(options?.fadeInMs) || 0);
    if (!fadeMs) {
      voice.progress = 1;
      updateMusicVoiceVolume();
    } else {
      const generation = ++musicGeneration;
      const start = Date.now();
      clearMusicFade();
      musicFadeTimer = setInterval(() => {
        if (generation !== musicGeneration || musicVoice !== voice) return clearMusicFade();
        voice.progress = Math.min(1, (Date.now() - start) / fadeMs);
        updateMusicVoiceVolume();
        if (voice.progress >= 1) clearMusicFade();
      }, 30);
    }
    return true;
  } catch (error) {
    if (error?.name === "NotAllowedError") blocked = true;
    if (voice && musicVoice === voice) musicVoice = null;
    return false;
  }
}
export function isOriginalMusicPlaying() {
  return !!musicVoice && musicVoice.audio.paused === false && !musicVoice.audio.ended;
}
export function isOriginalSoundPlaying(name) {
  const sound = aliases[name] || name;
  return [...active].some((voice) => voice.sound === sound);
}
export function stopOriginalSound(name) {
  const sound = aliases[name] || name;
  for (const voice of [...active]) {
    if (voice.sound !== sound) continue;
    try {
      voice.audio.pause();
      voice.audio.currentTime = 0;
    } catch {
      // Stopping a sample must not prevent the local action from resolving.
    }
    active.delete(voice);
  }
}
export function soundStatus() {
  return {
    supported: typeof globalThis.Audio === "function",
    initialized,
    volume,
    effectVolume,
    musicVolume,
    blocked,
    available: names.length + musicNames.size,
    active: active.size,
    musicPlaying: isOriginalMusicPlaying(),
    failed: [...failures],
  };
}
export function playOriginalSound(name, options = {}) {
  const sound = aliases[name] || name;
  if (
    !available.has(sound) ||
    volume === 0 ||
    typeof globalThis.Audio !== "function"
  )
    return false;
  const localVolume = clamp(options?.volume ?? 1);
  if (!localVolume || active.size >= 12 || failures.has(sound)) return false;
  const now = Date.now();
  // Avoid a frame-loop or multi-hit event spawning unbounded audio voices.
  if (now - (lastPlayed.get(sound) ?? -Infinity) < 65) return false;
  initializeOriginalAudio();
  let audio;
  let voice;
  try {
    let sample = samples.get(sound);
    if (!sample) {
      sample = new Audio(
        new URL(`./assets/original/audio/${sound}.mp3`, import.meta.url).href,
      );
      sample.preload = "none";
      samples.set(sound, sample);
    }
    audio = sample.cloneNode(true);
    audio.volume = volume * effectVolume * localVolume;
    voice = { audio, volume: localVolume, sound };
    active.add(voice);
    const clear = () => active.delete(voice);
    audio.addEventListener("ended", clear, { once: true });
    audio.addEventListener(
      "error",
      () => {
        failures.add(sound);
        clear();
      },
      { once: true },
    );
    lastPlayed.set(sound, now);
    const playback = audio.play();
    if (playback?.then)
      playback
        .then(() => {
          blocked = false;
        })
        .catch((error) => {
          if (error?.name === "NotAllowedError") blocked = true;
          else if (error?.name !== "AbortError") failures.add(sound);
          clear();
        });
    return true;
  } catch (error) {
    if (voice) active.delete(voice);
    if (error?.name === "NotAllowedError") blocked = true;
    return false;
  }
}
