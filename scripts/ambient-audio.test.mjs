import test from "node:test";
import assert from "node:assert/strict";
import { createAmbientAudio } from "../dist/ambient-audio.js";

function fixture() {
  const calls = [];
  const playing = new Set();
  let accepted = true;
  const audio = createAmbientAudio({
    random: () => 0,
    play(name, options) {
      calls.push({ name, options });
      if (accepted) playing.add(name);
      return accepted;
    },
    isPlaying: name => playing.has(name),
    stop: name => playing.delete(name),
  });
  return { audio, calls, playing, reject: () => { accepted = false; }, accept: () => { accepted = true; } };
}

test("ambient playback starts and never overlaps a running sample", () => {
  const { audio, calls } = fixture();
  for (let frame = 0; frame <= 180; frame++) audio.update(frame / 60);
  assert.deepEqual(calls, [{ name: "ambiance/foret2", options: { volume: 0.5 } }]);
});

test("finished sample is replaced at the next one-second poll", () => {
  const { audio, calls, playing } = fixture();
  audio.update(0);
  audio.update(1);
  audio.update(1.5);
  playing.clear();
  audio.update(1.99);
  assert.equal(calls.length, 1);
  audio.update(2);
  assert.equal(calls.length, 2);
});

test("rejected playback retries without a per-frame request storm", () => {
  const { audio, calls, playing, reject, accept } = fixture();
  reject();
  audio.update(0);
  audio.update(0.5);
  assert.equal(calls.length, 1);
  accept();
  audio.update(1);
  assert.equal(playing.size, 1);
  // An asynchronous autoplay rejection removes the voice in the adapter.
  playing.clear();
  audio.update(2);
  assert.equal(calls.length, 3);
});

test("scene reset stops the old sample and permits immediate new ambience", () => {
  const { audio, calls, playing } = fixture();
  audio.update(0);
  audio.reset(0.5);
  assert.equal(playing.size, 0);
  audio.update(0.5);
  assert.equal(calls.length, 2);
});
