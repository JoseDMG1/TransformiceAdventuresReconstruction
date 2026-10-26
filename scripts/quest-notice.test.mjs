import test from "node:test";
import assert from "node:assert/strict";
import { createQuestNotices } from "../dist/quest-notice.js";

test("notification lasts four seconds then fades for one without persisting", () => {
  const notices = createQuestNotices();
  notices.show("Habla con Papaille.", 100);
  notices.tick(4099);
  assert.equal(notices.snapshot()[0].closingAt, null);
  notices.tick(4100);
  assert.equal(notices.snapshot()[0].closingAt, 4100);
  notices.tick(5099);
  assert.equal(notices.snapshot().length, 1);
  notices.tick(5100);
  assert.equal(notices.snapshot().length, 0);
});

test("a new notification replaces the active one and manual dismissal fades only itself", () => {
  const notices = createQuestNotices();
  notices.show("A", 0);
  notices.show("B", 500);
  let rows = notices.snapshot();
  assert.equal(rows[0].closingAt, 500);
  assert.equal(rows[1].closingAt, null);
  notices.close(rows[1].key, 600);
  notices.close(rows[0].key, 700);
  rows = notices.snapshot();
  assert.equal(rows[0].closingAt, 500);
  assert.equal(rows[1].closingAt, 600);
  notices.tick(1500);
  assert.deepEqual(notices.snapshot().map(n => n.text), ["B"]);
  notices.tick(1600);
  assert.deepEqual(notices.snapshot(), []);
});

test("scene reset removes active and fading notices and old snapshots cannot mutate state", () => {
  const notices = createQuestNotices();
  notices.show("A", 0);
  const rows = notices.snapshot();
  rows[0].text = "Changed";
  assert.equal(notices.snapshot()[0].text, "A");
  notices.reset();
  notices.tick(10000);
  assert.deepEqual(notices.snapshot(), []);
  notices.show("B", 10000);
  assert.notEqual(notices.snapshot()[0].key, rows[0].key);
});
