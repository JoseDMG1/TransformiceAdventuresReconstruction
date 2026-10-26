import test from "node:test";
import assert from "node:assert/strict";
import { takeDialoguePage, createDialogueText } from "../dist/dialogue-text.js";

test("pagination preserves text across words, newlines and explicit pages", () => {
  for (const text of ["Una frase larga con muchas palabras", "Primera línea\nSegunda línea\nFinal", "Hola_P_Adiós", "Texto largo antes_P_Texto después", "🐭🐭🐭🐭🐭", "   texto con espacios  "]) {
    let rest = text, result = "", count = 0;
    while (rest) {
      const next = takeDialoguePage(rest, s => Array.from(s).length <= 12);
      assert.ok(++count < 40, "must make progress");
      assert.ok(Array.from(next.page).length <= 12);
      result += next.page;
      rest = next.rest;
    }
    assert.equal(result, text.replaceAll("_P_", ""));
  }
});

test("explicit page break remains after overflowing first page", () => {
  const first = takeDialoguePage("one two three_P_four", s => s.length <= 7);
  assert.deepEqual(first, { page: "one two", rest: " three_P_four" });
  assert.deepEqual(takeDialoguePage(first.rest, () => true), { page: " three", rest: "four" });
});

test("reveal completes the current page without consuming the next", () => {
  const text = createDialogueText();
  text.start("Hola 🐭", 100);
  assert.equal(text.visible(100), "");
  assert.equal(text.complete(100), false);
  assert.equal(text.reveal(), "Hola 🐭");
  assert.equal(text.complete(100), true);
  text.start("Otra página", 200);
  assert.equal(text.complete(200), false);
});
