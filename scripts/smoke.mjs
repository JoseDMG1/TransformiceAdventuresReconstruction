// Runs a real local Chromium playthrough. Requires Chrome already installed, no packages.
import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { SAVE_VERSION, defaultProfile, encodeSave } from "../dist/persistence.js";
import { checkEmotes } from "./emote-browser-checks.mjs";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const gameURL = process.env.GAME_URL || "http://127.0.0.1:8010";
const chromePath =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
await mkdir(".local", { recursive: true });
const browser = spawn(
  chromePath,
  [
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--remote-debugging-port=9227",
    `--user-data-dir=${path.resolve(".local/smoke-browser")}`,
    "about:blank",
  ],
  { windowsHide: true, stdio: "ignore" },
);
let ws;
try {
  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch("http://127.0.0.1:9227/json")).json();
      break;
    } catch {
      await wait(200);
    }
  }
  if (!targets) throw Error("Chrome no abrió el puerto de diagnóstico.");
  ws = new WebSocket(
    targets.find((t) => t.type === "page").webSocketDebuggerUrl,
  );
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let nextId = 1;
  const requests = new Map(),
    errors = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id) {
      const pending = requests.get(m.id);
      if (pending) {
        requests.delete(m.id);
        m.error
          ? pending.reject(Error(m.error.message))
          : pending.resolve(m.result);
      }
    }
    if (m.method === "Runtime.exceptionThrown")
      errors.push(
        m.params.exceptionDetails.text +
          ": " +
          (m.params.exceptionDetails.exception?.description || ""),
      );
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      requests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails)
      throw Error(
        r.exceptionDetails.exception?.description || r.exceptionDetails.text,
      );
    return r.result.value;
  };
  const waitFor = async (expression, message, timeout = 5000) => {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await evaluate(expression)) return;
      await wait(50);
    }
    throw Error(message + " " + errors.join("\n"));
  };
  const key = async (code, type = "keyDown") =>
    send("Input.dispatchKeyEvent", {
      type,
      code,
      key: code === "Space" ? " " : code.replace(/^Key/, "").toLowerCase(),
    });
  const tap = async (code) => {
    await key(code);
    await key(code, "keyUp");
  };
  const shot = async (name) => {
    await evaluate("Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true});setTimeout(r,2000)})))");
    const r = await send("Page.captureScreenshot", { format: "png" });
    await writeFile(`.local/${name}.png`, Buffer.from(r.data, "base64"));
  };
  const reloadAndContinue = async () => {
    await send("Page.reload");
    await wait(750);
    await waitFor("!!window.adventure?.snapshot().renderReady", "Reload must initialize the renderer");
    await evaluate("document.getElementById('continue-button').click()");
  };
  const chooseFile = async (filename) => {
    const document = await send("DOM.getDocument");
    const { nodeId } = await send("DOM.querySelector", {
      nodeId: document.root.nodeId,
      selector: "#save-file",
    });
    await send("DOM.setFileInputFiles", {
      nodeId,
      files: [path.resolve(filename)],
    });
    await wait(150);
  };
  await send("Runtime.enable");
  await send("Page.enable");
  const referenceSize = process.argv.includes("--reference-size");
  if (referenceSize && !process.argv.includes("--tutorial-only") && !process.argv.includes("--emotes"))
    throw Error("--reference-size requiere --tutorial-only; el bot de expedición usa otro encuadre.");
  await send("Emulation.setDeviceMetricsOverride", {
    width: referenceSize ? 640 : 1280,
    height: referenceSize ? 360 : 800,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: gameURL });
  await wait(1600);
  assert.equal(
    await evaluate("window.adventure?.snapshot().renderReady"),
    true,
    JSON.stringify({
      errors,
      body: await evaluate("document.body.innerText.slice(0,500)"),
    }),
  );
  await evaluate("document.fonts.ready");
  for (let i = 0; i < 100; i++) {
    if (await evaluate("adventure.snapshot().art.ready")) break;
    await wait(150);
  }
  const originalArt = await evaluate("adventure.snapshot().art");
  assert.equal(
    originalArt.ready,
    true,
    "Original animation data must load locally",
  );
  assert.ok(
    originalArt.loaded >= 180,
    "Original sprite pieces must be available",
  );
  await shot("title");
  await evaluate("document.getElementById('title-import').click()");
  assert.equal(
    await evaluate(
      "(()=>{const b=document.getElementById('close-modal').getBoundingClientRect();return document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.id==='close-modal'})()",
    ),
    true,
    "Title import must be visibly above title screen",
  );
  await tap("Escape");
  assert.equal(await evaluate("adventure.snapshot().modal"), "");
  if (process.argv.includes("--title-only")) {
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log("PASS: title import dialog is visible and Escape closes it.");
  } else if (process.argv.includes("--features")) {
    const seed = async (profile, journey = null) => {
      const text = encodeSave(profile, journey);
      const script = await send("Page.addScriptToEvaluateOnNewDocument", {
        source: `localStorage.setItem('tfma-local-v1', ${JSON.stringify(text)})`,
      });
      await reloadAndContinue();
      await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: script.identifier });
      await wait(160);
    };
    const clickWorld = async (x, y, button = "left") => {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
      await send("Input.dispatchMouseEvent", { type: "mousePressed", button, clickCount: 1, x, y });
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", button, clickCount: 1, x, y });
    };
    const profile = { ...defaultProfile(), tutorial: true, level: 10, job: "botanist" };
    await seed(profile);
    await tap("KeyQ");
    assert.equal(await evaluate("adventure.snapshot().targeting.mode"), "circle");
    assert.equal(await evaluate("adventure.snapshot().cooldowns.skill1"), 0);
    await shot("features-targeting");
    await tap("Escape");
    assert.equal(await evaluate("adventure.snapshot().targeting"), null);
    assert.equal(await evaluate("adventure.snapshot().modal"), "");
    await tap("KeyQ");
    await clickWorld(700, 400, "right");
    assert.equal(await evaluate("adventure.snapshot().cooldowns.skill1"), 0);
    await tap("KeyQ");
    await clickWorld(700, 400);
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill1")) > 0);
    assert.equal(await evaluate("adventure.snapshot().targeting"), null);

    await tap("KeyR");
    const planted = await evaluate("(()=>{const s=adventure.snapshot();return {plant:s.fields.find(e=>e.kind==='plant'),player:s.position}})()");
    assert.equal(planted.plant.x, planted.player.x);
    assert.equal(planted.plant.y, planted.player.y);

    for (const room of [1, 2]) {
      await seed(profile, { scene: "dungeon", room, step: 1, seed: 0,
        encounterCount: 3, encounterStarted: false, encounterAwarded: false,
        player: { x: room * 1850 - 150, y: 640, hp: 100, notebook: [] },
        pet: { x: room * 1850 - 190, y: 650 }, enemies: [], effects: [], projectiles: [] });
      await key("KeyD");
      await waitFor("adventure.snapshot().encounterStarted", "A clear connector must lead into the next encounter", 8000);
      await key("KeyD", "keyUp");
      assert.ok((await evaluate("adventure.snapshot().enemies")) > 0);
    }

    const cardJourney = { scene: "dungeon", seed: 0, room: 0, step: 1, encounterCount: 3,
      encounterStarted: true, player: {x:650,y:700,hp:100,cardIndex:2}, pet: {x:600,y:700},
      enemies: [810,910].map(x=>({type:"beetle",x,y:700,hp:100,maxHp:100,speed:20})), effects: [], projectiles: [] };
    await seed({...profile,job:"trickster",petActive:false},cardJourney);
    await tap("KeyQ");
    await clickWorld(1000,400);
    await waitFor("adventure.snapshot().targets.some(t=>t.hp<100)", "Diamond card must hit a target");
    await waitFor("adventure.snapshot().projectiles.every(p=>p.kind!=='card')", "Base diamond must stop after its first hit");
    assert.equal((await evaluate("adventure.snapshot().targets.filter(t=>t.hp<100)")).length,1);
    await seed({...profile,job:"trickster",petActive:false},{...cardJourney,
      gifts:["original-13010"],player:{...cardJourney.player,cardIndex:0}});
    await tap("KeyQ");
    await clickWorld(1000,400);
    assert.ok((await evaluate("adventure.snapshot().projectiles.filter(p=>p.cardSuit==='spade').length"))>=2, JSON.stringify(await evaluate("adventure.snapshot()")));

    const journey = { scene: "dungeon", seed: 0, room: 0, step: 1,
      encounterCount: 3, encounterStarted: true, encounterXP: true,
      gifts: ["original-12000", "original-14003", "original-14006"],
      player: { x: 650, y: 700, hp: 100, notebook: ["heal"] }, pet: { x: 600, y: 700 },
      enemies: [{ type: "beetle", x: 1300, y: 700, hp: 200, maxHp: 200, speed: 20 }],
      effects: [{ kind: "testimony", subtype: "death", x: 675, y: 700, life: 15, maxLife: 15 }], projectiles: [] };
    await seed({ ...profile, job: "journalist" }, journey);
    assert.equal((await evaluate("adventure.snapshot().testimonies"))[0].subtype, "death");
    await tap("KeyQ");
    assert.deepEqual(await evaluate("adventure.snapshot().notebook"), ["heal", "death"]);
    await waitFor("document.querySelector('#notebook-slots img[alt=\"Muerte\"]')!==null", "Death note must appear in the notebook HUD");
    assert.equal(await evaluate("document.querySelector('#notebook-slots img[alt=\"Muerte\"]')!==null"), true);
    await tap("KeyI");
    await evaluate("document.querySelector('[data-tab=gifts]').click()");
    assert.equal(await evaluate("document.querySelectorAll('.owned-gift').length"), 3);
    await shot("features-gifts");
    await tap("Escape");
    await reloadAndContinue();
    assert.deepEqual(await evaluate("adventure.snapshot().notebook"), ["heal", "death"]);
    await waitFor("adventure.snapshot().cooldowns.skill1<=0", "Collection cooldown must finish");
    await tap("KeyQ");
    assert.equal(await evaluate("adventure.snapshot().targeting.mode"), "circle");
    assert.equal((await evaluate("adventure.snapshot().notebook")).length, 2);
    await clickWorld(700, 400);
    assert.deepEqual(await evaluate("adventure.snapshot().notebook"), []);
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill1")) > 0);
    assert.equal(errors.length, 0, errors.join("\n"));
    await tap("KeyI");
    const preserved = await evaluate("localStorage.getItem('tfma-local-v1')");
    await evaluate("setTimeout(()=>{throw new Error('Fallo controlado de prueba')},0)");
    await wait(100);
    assert.equal(await evaluate("document.getElementById('game-error')!==null"), true);
    assert.equal(await evaluate("adventure.snapshot().mode"), "error");
    assert.equal(await evaluate("document.getElementById('error-backup').disabled"), false);
    assert.equal(await evaluate("localStorage.getItem('tfma-local-v1')"), preserved);
    console.log("PASS: area selection, Escape/right-click cancellation, confirmed cast, death testimony reload/collection/report, gifts tab; no runtime exceptions.");
    console.log("PASS: injected failure displays recovery controls and preserves the saved game.");
  } else {
    const castSkill = async (code) => {
      await tap(code);
      const snap = await evaluate("adventure.snapshot()");
      if (!snap.targeting) return;
      const target = snap.targets.sort((a,b) => Math.hypot(a.x-snap.position.x,a.y-snap.position.y)-Math.hypot(b.x-snap.position.x,b.y-snap.position.y))[0] || snap.position;
      const x = Math.max(5, Math.min(1275,640+(target.x-snap.view.x)*snap.view.zoom));
      const y = Math.max(160, Math.min(640,400+(target.y-snap.view.y)*snap.view.zoom));
      await send("Input.dispatchMouseEvent", {type:"mouseMoved",x,y});
      await send("Input.dispatchMouseEvent", {type:"mousePressed",button:"left",clickCount:1,x,y});
      await send("Input.dispatchMouseEvent", {type:"mouseReleased",button:"left",clickCount:1,x,y});
    };
    await evaluate(
      "document.getElementById('play-button').click(); document.getElementById('name-input').value='Local'; document.getElementById('begin-tutorial').click()",
    );
    assert.equal(await evaluate("adventure.snapshot().scene"), "tutorial");
    const start = await evaluate("adventure.snapshot().position");
    await key("KeyD");
    await wait(560);
    await key("KeyD", "keyUp");
    const moved = await evaluate("adventure.snapshot().position");
    assert.ok(moved.x > start.x + 60, "WASD must move the player");
    await wait(100);
    await tap("KeyH");
    for (let i = 0; i < 30; i++) {
      if ((await evaluate("adventure.snapshot().tutorialPhase")) === 1) break;
      await wait(150);
    }
    assert.equal(
      await evaluate("adventure.snapshot().tutorialPhase"),
      1,
      "Bandage must heal Picpic and enable Papaille: " + JSON.stringify(await evaluate("adventure.snapshot()")),
    );
    await shot("tutorial");
    // v0.184 follows the recorded rescue -> Papaille route: no tutorial fight.
    assert.equal(await evaluate("adventure.snapshot().enemies"), 0);
    await reloadAndContinue();
    assert.equal(await evaluate("adventure.snapshot().tutorialPhase"), 1);
    assert.equal(await evaluate("adventure.snapshot().pet.injured"), false);
    // Walk normally toward Papaille, then use the actual interaction key.
    let pos = await evaluate("adventure.snapshot().position");
    await key("KeyD");
    await wait(Math.max(0, ((1360 - pos.x) / 185) * 1000));
    await key("KeyD", "keyUp");
    pos = await evaluate("adventure.snapshot().position");
    const yCode = pos.y < 710 ? "KeyS" : "KeyW";
    await key(yCode);
    await wait((Math.abs(710 - pos.y) / 185) * 1000);
    await key(yCode, "keyUp");
    await wait(120);
    await tap("KeyE");
    // Capture the complete first page, rather than its first animated letters.
    await wait(2500);
    await shot("papaille");
    const pagination = await evaluate(`(async () => {
      const { measureDialoguePage, renderDialoguePage } = await import('./dialogue-layout.js');
      const element = document.getElementById('dialogue-text');
      const source = 'Un mensaje largo con palabras y signos: ¡Hola, ratón! 🐭 '.repeat(8) + '_P_Final de la conversación.';
      let rest = source, recovered = '', pages = 0, fit = true, stable = true;
      const probe = document.createElement('p');
      probe.className = 'dialogue-page-measure';
      probe.style.width = element.getBoundingClientRect().width + 'px';
      element.parentElement.append(probe);
      try {
        while (rest && pages < 100) {
          const part = measureDialoguePage(element, rest);
          renderDialoguePage(probe, '', part.page);
          const hiddenHeight = probe.getBoundingClientRect().height;
          renderDialoguePage(probe, part.page, part.page);
          const fullHeight = probe.getBoundingClientRect().height;
          stable &&= Math.abs(hiddenHeight - fullHeight) < .5;
          fit &&= fullHeight <= parseFloat(getComputedStyle(element).minHeight) + .5;
          recovered += part.page;
          rest = part.rest;
          pages++;
        }
      } finally { probe.remove(); }
      return { fit, stable, complete: !rest && recovered === source.replaceAll('_P_', ''), pages };
    })()`);
    assert.ok(pagination.pages > 2 && pagination.fit && pagination.stable && pagination.complete,
      "Long dialogue must fit, preserve text and reserve layout: " + JSON.stringify(pagination));
    if (referenceSize) {
      assert.equal(await evaluate(`(() => {
        const dialogue = document.getElementById('dialogue').getBoundingClientRect();
        const bar = document.querySelector('.hotbar').getBoundingClientRect();
        return dialogue.bottom < bar.top;
      })()`), true, "Reference-size dialogue must stay above the action bar");
    }
    for (let page = 0; page < 8 && !(await evaluate("document.getElementById('dialogue').hidden")); page++)
      await tap("KeyE");
    await wait(200);
    if (referenceSize) {
      // Dialogue deliberately makes the HUD inert; check hit targets after it closes.
      for (const id of ["heal-button", "profile-button", "menu-button"]) {
        const hit = await evaluate(`(() => {
          const button = document.getElementById('${id}');
          const r = button.getBoundingClientRect();
          const hit = document.elementFromPoint(r.x+r.width/2, r.y+r.height/2);
          return { reachable: hit === button || button.contains(hit), target: hit?.outerHTML, rect: r.toJSON() };
        })()`);
        assert.equal(hit.reachable, true, `${id} must remain reachable at 640x360: ${JSON.stringify(hit)}`);
      }
    }
    assert.equal(
      await evaluate("adventure.snapshot().scene"),
      "village",
      "Papaille must lead to village",
    );
    await shot("village");
    if (process.argv.includes("--emotes")) {
      await checkEmotes({ evaluate, send, tap, shot, wait, waitFor });
      if (process.argv.includes("--objective-motion")) {
        const { checkObjectiveMotion } = await import("./objective-browser-checks.mjs");
        const trace = await checkObjectiveMotion({ evaluate, tap, wait, waitFor });
        await writeFile(".local/objective-motion.json", JSON.stringify(trace, null, 2));
        console.log("PASS: actual Canvas objective arrow approaches the screen edge over 12 frames.");
      }
      assert.equal(errors.length, 0, errors.join("\n"));
      console.log("PASS: emote menus, real pointer selection, transient animations and unchanged saved profile.");
    } else if (process.argv.includes("--tutorial-only")) {
      assert.equal(errors.length, 0, errors.join("\n"));
      console.log("PASS: Picpic rescue survives reload, Papaille returns to village, no runtime exceptions.");
    } else {
    await tap("KeyI");
    assert.equal(await evaluate("adventure.snapshot().modal"), "profile");
    await evaluate(
      "document.querySelector('[data-tab=equipment]').click();document.querySelector('[data-weapon=dagger]').click();document.getElementById('confirm-loadout').click();document.querySelector('[data-secondary=shield]').click();document.getElementById('confirm-loadout').click()",
    );
    assert.equal(await evaluate("adventure.snapshot().weapon"), "dagger");
    await shot("equipment");
    await tap("Escape");
    const guardPosition = await evaluate("adventure.snapshot().position");
    await key("KeyH");
    await key("KeyD");
    await wait(400);
    assert.equal(await evaluate("adventure.snapshot().guarding"), true);
    await shot("shield");
    assert.ok(
      Math.abs(
        (await evaluate("adventure.snapshot().position")).x - guardPosition.x,
      ) < 2,
      "Guard must prevent movement",
    );
    await key("KeyD", "keyUp");
    await key("KeyJ");
    await wait(60);
    assert.equal(
      await evaluate("adventure.snapshot().guarding"),
      false,
      "Attacking interrupts the other hand",
    );
    await key("KeyJ", "keyUp");
    await key("KeyH", "keyUp");
    await tap("KeyI");
    await evaluate(
      "document.querySelector('[data-tab=equipment]').click();document.querySelector('[data-weapon=greatsword]').click();document.getElementById('confirm-loadout').click()",
    );
    assert.equal(
      await evaluate(
        "[...document.querySelectorAll('[data-secondary]')].every(b=>b.disabled)",
      ),
      true,
    );
    await tap("Escape");
    await tap("KeyH");
    assert.equal(await evaluate("adventure.snapshot().guarding"), false);
    await key("KeyJ");
    for (let i = 0; i < 20; i++) {
      if (await evaluate("!!adventure.snapshot().action")) break;
      await wait(40);
    }
    assert.equal(await evaluate("adventure.snapshot().action?.weapon"), "greatsword");
    const heavyPosition = await evaluate("adventure.snapshot().position");
    await key("KeyD");
    await wait(150);
    await key("KeyD", "keyUp");
    await key("KeyJ", "keyUp");
    assert.ok(
      Math.abs(
        (await evaluate("adventure.snapshot().position")).x - heavyPosition.x,
      ) < 10,
      "Greatsword preparation must lock movement",
    );
    await tap("KeyI");
    await evaluate(
      "document.querySelector('[data-tab=equipment]').click();document.querySelector('[data-weapon=bow]').click();document.getElementById('confirm-loadout').click();document.querySelector('[data-secondary=bandage]').click();document.getElementById('confirm-loadout').click()",
    );
    assert.equal(await evaluate("adventure.snapshot().weapon"), "bow");
    await evaluate(
      "document.querySelector('[data-tab=jobs]').click(); document.querySelector('[data-job=chef]').click()",
    );
    assert.equal(await evaluate("adventure.snapshot().job"), "chef");
    await tap("Escape");
    await tap("KeyM");
    await evaluate("document.getElementById('begin-dungeon').click()");
    await wait(200);
    assert.equal(await evaluate("adventure.snapshot().scene"), "dungeon");
    assert.ok((await evaluate("adventure.snapshot().enemies")) > 0);
    const expedition = await evaluate("adventure.snapshot()");
    await reloadAndContinue();
    const resumed = await evaluate("adventure.snapshot()");
    assert.equal(resumed.scene, "dungeon");
    assert.equal(resumed.enemies, expedition.enemies);
    assert.ok(
      Math.abs(resumed.position.x - expedition.position.x) < 2,
      "Position must survive reloading",
    );
    await shot("dungeon");
    let rewards = 0,
      won = false;
    for (let i = 0; i < 650; i++) {
      const s = await evaluate("adventure.snapshot()");
      if (i % 25 === 0 || s.modal === "defeat") {
        console.log(JSON.stringify({ iteration: i, room: s.room, hp: s.health,
          enemies: s.enemies, position: s.position, modal: s.modal, action: s.action,
          targetHp: s.targets.map(t => t.hp) }));
      }
      if (s.modal === "defeat") {
        await writeFile('.local/expedition-failure.json', JSON.stringify(s, null, 2));
        await shot('expedition-failure');
      }
      assert.notEqual(
        s.modal,
        "defeat",
        "Automated bow/chef expedition should be survivable",
      );
      if (s.modal === "reward") {
        rewards++;
        if (rewards === 1) {
          const coins = await evaluate(
            "JSON.parse(localStorage.getItem('tfma-local-v1')).coins",
          );
          await reloadAndContinue();
          assert.equal(await evaluate("adventure.snapshot().modal"), "reward");
          assert.equal(
            await evaluate(
              "JSON.parse(localStorage.getItem('tfma-local-v1')).coins",
            ),
            coins,
            "Reloading a reward must not duplicate coins",
          );
          await shot("gift");
        }
        await evaluate("document.querySelector('[data-gift]').click();document.getElementById('confirm-gift').click()");
        continue;
      }
      if (s.modal === "victory") {
        const coins = await evaluate(
          "JSON.parse(localStorage.getItem('tfma-local-v1')).coins",
        );
        await reloadAndContinue();
        assert.equal(await evaluate("adventure.snapshot().modal"), "victory");
        assert.equal(
          await evaluate(
            "JSON.parse(localStorage.getItem('tfma-local-v1')).coins",
          ),
          coins,
          "Reloading victory must not award again",
        );
        await shot("victory");
        await evaluate("document.getElementById('go-village').click()");
        won = true;
        break;
      }
      if (!s.enemies) {
        const goal = s.objective;
        for (const code of ["KeyW", "KeyA", "KeyS", "KeyD"]) await key(code, "keyUp");
        const arrivalRadius = s.encounterStarted ? 65 : 25;
        if (goal && Math.hypot(goal.x - s.position.x, goal.y - s.position.y) > arrivalRadius) {
          if (Math.abs(goal.y - s.position.y) > 15) await key(goal.y > s.position.y ? "KeyS" : "KeyW");
          if (Math.abs(goal.x - s.position.x) > 15) await key(goal.x > s.position.x ? "KeyD" : "KeyA");
        } else await tap("KeyE");
        await wait(100);
        continue;
      }
      for (const code of ["KeyW", "KeyA", "KeyS", "KeyD"]) await key(code, "keyUp");
      const target = s.targets.sort(
        (a, b) =>
          Math.hypot(a.x - s.position.x, a.y - s.position.y) -
          Math.hypot(b.x - s.position.x, b.y - s.position.y),
      )[0];
      if (target) {
        await send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          x: 640 + (target.x - s.view.x) * s.view.zoom,
          y: 400 + (target.y - 12 - s.view.y) * s.view.zoom,
        });
      }
      if (s.health < 90 && i % 5 === 0) {
        await tap("KeyH");
        await wait(80);
        await waitFor("!document.getElementById('status-effects').textContent.includes('Vendando')",
          "Bandage preparation must finish before another action", 5000);
      }
      if (i % 10 === 0) {
        await castSkill("KeyQ");
        await castSkill("KeyR");
      }
      // Bow release is an input action: holding J indefinitely only charges it.
      await key("KeyJ");
      await wait(220);
      await key("KeyJ", "keyUp");
      await wait(180);
      const afterShot = await evaluate("adventure.snapshot()");
      const boss = afterShot.targets.find(t => t.type === 'boss');
      if (boss && Math.hypot(boss.x - afterShot.position.x, boss.y - afterShot.position.y) < 430) {
        // Move between shots; moving while charging cancels the original bow action.
        await waitFor("!adventure.snapshot().action || adventure.snapshot().action.hit",
          "Bow must release before evading", 2000);
        const direction = afterShot.position.y < 480 ? 'KeyS' : afterShot.position.y > 800 ? 'KeyW'
          : boss.y >= afterShot.position.y ? 'KeyW' : 'KeyS';
        await key(direction);
        await tap('Space');
        await wait(420);
        await key(direction, 'keyUp');
        await wait(80);
      }
    }
    await key("KeyJ", "keyUp");
    assert.equal(won, true, "Three encounters and boss must complete");
    assert.equal(rewards, 3);
    assert.equal(await evaluate("adventure.snapshot().scene"), "village");
    assert.equal(errors.length, 0, errors.join("\n"));
    assert.equal(
      await evaluate(
        "JSON.parse(localStorage.getItem('tfma-local-v1')).tutorial",
      ),
      true,
    );
    const before = await evaluate(
      "JSON.parse(localStorage.getItem('tfma-local-v1'))",
    );
    await send("Page.reload");
    await wait(700);
    await evaluate("document.getElementById('continue-button').click()");
    assert.equal(await evaluate("adventure.snapshot().level"), before.level);
    assert.equal(await evaluate("adventure.snapshot().job"), before.job);
    await tap("Escape");
    const downloadDir = path.resolve(".local/downloads", String(Date.now()));
    await mkdir(downloadDir, { recursive: true });
    await send("Browser.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadDir,
    });
    const priorDownloads = new Set(await readdir(downloadDir));
    await evaluate("document.getElementById('export-save').click()");
    await wait(700);
    const exported = (await readdir(downloadDir)).find(
      (f) => f.endsWith(".json") && !priorDownloads.has(f),
    );
    assert.ok(exported, "Export must download a real JSON file");
    const exportPath = path.join(downloadDir, exported),
      copy = JSON.parse(await readFile(exportPath, "utf8"));
    assert.equal(copy.version, SAVE_VERSION);
    assert.equal(copy.journey.scene, "village");
    await evaluate("document.getElementById('import-save').click()");
    await writeFile(
      ".local/invalid-save.json",
      '{"version":999,"name":"Bad","level":99}',
    );
    await chooseFile(".local/invalid-save.json");
    assert.equal(await evaluate("adventure.snapshot().level"), before.level);
    assert.equal(
      await evaluate("document.getElementById('confirm-import')===null"),
      true,
      "Invalid imports must not offer load action",
    );
    await chooseFile(exportPath);
    assert.ok(
      await evaluate("document.getElementById('confirm-import')!==null"),
    );
    await shot("import-save");
    await evaluate("document.getElementById('confirm-import').click()");
    assert.equal(await evaluate("adventure.snapshot().scene"), "village");
    assert.equal(await evaluate("adventure.snapshot().level"), copy.level);
    assert.equal(errors.length, 0, errors.join("\n"));
    const advanced = {
      ...copy,
      level: 10,
      job: "trickster",
      secondaryJob: null,
      secondarySkill: 1,
      journey: { ...copy.journey, effects: [...copy.journey.effects,
        { kind: "testimony", subtype: "heal", x: copy.journey.player.x + 30,
          y: copy.journey.player.y, life: 15, maxLife: 15, color: "#c4d991" }],
      },
    };
    await writeFile(".local/jobs-save.json", JSON.stringify(advanced));
    await tap("Escape");
    await evaluate("document.getElementById('import-save').click()");
    await chooseFile(".local/jobs-save.json");
    await evaluate("document.getElementById('confirm-import').click()");
    await tap("KeyI");
    await evaluate(
      "document.querySelector('[data-tab=jobs]').click();document.querySelector('[data-secondary-job=journalist][data-skill=\"2\"]').click()",
    );
    await shot("jobs");
    await tap("Escape");
    await castSkill("KeyQ");
    assert.equal(await evaluate("adventure.snapshot().cardIndex"), 1);
    await castSkill("KeyR");
    assert.ok((await evaluate("adventure.snapshot().invisible")) > 0);
    await key("KeyJ");
    await wait(250);
    await key("KeyJ", "keyUp");
    await waitFor("adventure.snapshot().invisible === 0",
      "Bow must break invisibility after release and its launch delay");
    assert.equal(await evaluate("adventure.snapshot().invisible"), 0);
    await castSkill("Digit3");
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill3")) > 0);
    await reloadAndContinue();
    assert.equal(
      await evaluate("adventure.snapshot().secondaryJob"),
      "journalist",
    );
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill3")) > 0);
    await tap("KeyI");
    await evaluate(
      "document.querySelector('[data-tab=jobs]').click();document.querySelector('[data-job=journalist]').click()",
    );
    await tap("Escape");
    assert.equal(await evaluate("adventure.snapshot().secondaryJob"), null);
    await tap("KeyM");
    await evaluate("document.getElementById('begin-dungeon').click()");
    await wait(180);
    assert.ok((await evaluate("adventure.snapshot().testimonies.length")) > 0);
    await castSkill("KeyQ");
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill1")) > 0);
    assert.equal(await evaluate("adventure.snapshot().testimonies.length"), 0);
    await waitFor("adventure.snapshot().testimonies.length>0", "Interview needs a new ground testimony", 8000);
    await castSkill("KeyR");
    await shot("journalist");
    await reloadAndContinue();
    assert.equal(await evaluate("adventure.snapshot().job"), "journalist");
    assert.ok((await evaluate("adventure.snapshot().cooldowns.skill2")) > 0);
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      "PASS: full playthrough, expedition resume, pending reward/victory without duplicate loot, real export/import, invalid-file rejection, no runtime exceptions.",
    );
    }
  }
} finally {
  if (ws && ws.readyState === 1) ws.close();
  browser.kill();
}
