import { takeDialoguePage } from "./dialogue-text.js";

export function measureDialoguePage(element, text) {
  const probe = document.createElement("p");
  probe.className = "dialogue-page-measure";
  probe.setAttribute("aria-hidden", "true");
  probe.style.width = `${element.getBoundingClientRect().width}px`;
  element.parentElement.append(probe);
  const height = parseFloat(getComputedStyle(element).minHeight);
  try {
    return takeDialoguePage(text, (candidate) => {
      probe.textContent = candidate;
      return probe.getBoundingClientRect().height <= height + .5;
    });
  } finally {
    probe.remove();
  }
}

// The original keeps unrevealed letters transparent to reserve the page layout.
export function renderDialoguePage(element, visible, full) {
  const tail = document.createElement("span");
  tail.style.opacity = "0";
  tail.setAttribute("aria-hidden", "true");
  tail.textContent = full.slice(visible.length);
  element.replaceChildren(document.createTextNode(visible), tail);
}
