// InterfaceDialogueADV.LETTRES_PAR_SECONDES in the archived client.
export const DIALOGUE_LETTERS_PER_SECOND = 70;

export function createDialogueText() {
  let letters = [], started = 0, revealed = false;
  return {
    start(text, now, immediate = false) {
      letters = Array.from(text);
      started = now;
      revealed = immediate;
    },
    complete(now) {
      return revealed || (now - started) * DIALOGUE_LETTERS_PER_SECOND / 1000 >= letters.length;
    },
    visible(now) {
      const length = revealed ? letters.length : Math.max(0, Math.floor((now - started) * DIALOGUE_LETTERS_PER_SECOND / 1000));
      return letters.slice(0, length).join("");
    },
    reveal() { revealed = true; return letters.join(""); },
  };
}
