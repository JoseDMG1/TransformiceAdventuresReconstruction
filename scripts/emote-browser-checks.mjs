import assert from "node:assert/strict";

export async function checkEmotes({ evaluate, send, tap, shot, wait, waitFor }) {
  await waitFor("document.getElementById('xp-notice').hidden && !document.getElementById('announcements').textContent",
    "Arrival notices must finish before emote reference captures", 8000);
  const savedProfile = () => evaluate(`(() => {
    const save = JSON.parse(localStorage.getItem('tfma-local-v1'));
    delete save.journey;
    delete save.exportedAt; // Periodic saves update metadata independently of emotes.
    return save;
  })()`);
  const before = await savedProfile();
  const click = async selector => {
    const p = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      const r = element.getBoundingClientRect();
      const x = r.x + r.width / 2, y = r.y + r.height / 2;
      const hit = document.elementFromPoint(x, y);
      return { x, y, reachable: hit === element || element.contains(hit) };
    })()`);
    assert.ok(p.reachable, `${selector} must receive a real pointer click`);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
    await send("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, x: p.x, y: p.y });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, x: p.x, y: p.y });
  };
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 230, y: 200 });
  await tap("KeyF");
  await wait(400);
  assert.equal(await evaluate("document.querySelectorAll('#emote-picker button').length"), 10);
  assert.equal(await evaluate("document.getElementById('emote-command-menu').hidden"), true);
  assert.equal(await evaluate("[...document.querySelectorAll('#emote-picker img')].every(i => i.complete && i.naturalWidth > 0)"), true);
  await shot("emote-radial");
  await click("#emote-picker button:nth-child(3)");
  assert.equal(await evaluate("adventure.snapshot().emotes.icon?.code"), 3);
  assert.equal(await evaluate("document.getElementById('emote-picker').hidden"), true);
  await shot("emote-icon");
  await waitFor("adventure.snapshot().emotes.icon === null", "Icon must expire", 4000);
  await click("#emote-button");
  assert.deepEqual(await evaluate("[...document.querySelectorAll('#emote-command-menu button')].map(b => b.textContent)"), ["/hi", "/sit", "/dance"]);
  await shot("emote-commands");
  await tap("KeyF");
  assert.equal(await evaluate("document.getElementById('emote-command-menu').hidden"), true);
  await tap("Escape");
  assert.equal(await evaluate("document.getElementById('emote-picker').hidden"), true);
  for (const [index, animation] of ["emote_salut", "emote_assis", "emote_danse"].entries()) {
    await click("#emote-button");
    await click(`#emote-command-menu button:nth-child(${index + 1})`);
    assert.equal(await evaluate("adventure.snapshot().emotes.mouse?.animation"), animation);
    assert.equal(await evaluate("document.getElementById('emote-command-menu').hidden"), true);
    await wait(300);
    await shot(animation);
    await waitFor("adventure.snapshot().emotes.mouse === null", `${animation} must finish`, 6000);
  }
  await click("#emote-button");
  await tap("Escape");
  assert.equal(await evaluate("document.getElementById('emote-command-menu').hidden"), true);
  assert.deepEqual(await savedProfile(), before, "Emotes must not change the saved profile");
  assert.equal(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('tfma-local-v1')).journey).includes('emote')"), false);
}
