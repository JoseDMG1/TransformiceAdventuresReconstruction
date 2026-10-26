// InterfaceDialogueADV.LETTRES_PAR_SECONDES in the archived client.
export const DIALOGUE_LETTERS_PER_SECOND = 70;

// Archived decouperDialogue: explicit page marker, then newline/word boundaries.
// Keep the remainder verbatim so pagination cannot concatenate words or lose text.
export function takeDialoguePage(text, fits) {
  const marker = text.indexOf("_P_");
  const segment = marker < 0 ? text : text.slice(0, marker);
  const following = marker < 0 ? "" : text.slice(marker + 3);
  let end = segment.length;
  while (end > 0 && !fits(segment.slice(0, end))) {
    const candidate = segment.slice(0, end).trimEnd();
    let cut = candidate.lastIndexOf("\n");
    if (cut <= 0) cut = candidate.lastIndexOf(" ");
    if (cut <= 0) {
      // Local safety fallback for a single unbroken word, preserving code points.
      const points = Array.from(candidate);
      if (points.length <= 1) break;
      cut = points.slice(0, -1).join("").length;
    }
    end = cut;
  }
  const overflow = segment.slice(end);
  return {
    page: segment.slice(0, end),
    rest: overflow ? overflow + (marker < 0 ? "" : "_P_" + following) : following,
  };
}

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
