// DOM presentation only. No gameplay, timers, profile writes or network calls.
export function createQuestView(container) {
  const elements = new Map();
  return {
    render(rows, now) {
      const alive = new Set(rows.map(row => row.key));
      for (const [id, node] of elements) {
        if (!alive.has(id)) { node.remove(); elements.delete(id); }
      }
      for (const row of rows) {
        let node = elements.get(row.key);
        if (!node) {
          node = document.createElement("div");
          node.className = "quest-objective";
          node.setAttribute("role", "listitem");
          node.dataset.objectiveId = row.id;
          const text = document.createElement("p");
          text.className = "quest-description";
          const check = document.createElement("span");
          check.className = "quest-check";
          check.setAttribute("aria-hidden", "true");
          node.append(text, check);
          elements.set(row.key, node);
        }
        if (node.firstChild.textContent !== row.text) node.firstChild.textContent = row.text;
        node.classList.toggle("is-validated", row.validated);
        node.classList.toggle("is-validating", row.validatedAt !== null && now - row.validatedAt < 500);
        node.dataset.phase = row.phase;
      }
      // Keyed DOM preserves independent animation states; newest objective first.
      let cursor = container.firstChild;
      for (const row of rows) {
        const node = elements.get(row.key);
        if (node !== cursor) container.insertBefore(node, cursor);
        cursor = node.nextSibling;
      }
    },
  };
}
