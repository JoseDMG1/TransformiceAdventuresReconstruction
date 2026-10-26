// Local objective events, based on InterfaceQueteADV (add / validate / remove).
// One queued change per 500 ms; additions prepend and slide for 1500 ms.
// This state is reconstructed from the journey and never serialized in saves.
export const QUEST_TIMING = Object.freeze({ change: 500, slide: 1500, validation: 500 });

export function createQuestLog() {
  const index = new Map();
  let rows = [], changes = [], marker = null, nextChange = -Infinity, serial = 0;
  const copy = row => ({ ...row, target: row.target ? { ...row.target } : null });
  return {
    add(objective) {
      if (!objective?.id || typeof objective.text !== "string")
        throw new TypeError("An objective needs a stable ID and text");
      const existing = index.get(objective.id);
      if (existing) {
        existing.text = objective.text;
        existing.target = objective.target ? { ...objective.target } : null;
        return;
      }
      const row = { key: ++serial, id: objective.id, text: objective.text,
        target: objective.target ? { ...objective.target } : null,
        validated: false, validatedAt: null, phase: "queued", phaseStarted: null,
        addedAt: null, announced: false };
      index.set(row.id, row);
      changes.push({ type: "add", row });
    },
    validate(id) {
      const row = index.get(id);
      if (row) changes.push({ type: "validate", row });
    },
    remove(id) {
      const row = index.get(id);
      if (!row) return;
      index.delete(id);
      changes.push({ type: "remove", row });
    },
    updateTarget(id, target) {
      const row = index.get(id);
      if (row) row.target = target ? { ...target } : null;
    },
    tick(now) {
      const events = [];
      rows = rows.filter(row => row.phase !== "leaving" || now - row.phaseStarted < QUEST_TIMING.slide);
      for (const row of rows) {
        if (!row.announced && row.addedAt !== null && now - row.addedAt >= QUEST_TIMING.slide) {
          row.announced = true;
          events.push({ type: "announced", id: row.id, text: row.text });
        }
        if (row.phase === "entering" && now - row.phaseStarted >= QUEST_TIMING.slide)
          row.phase = "active";
      }
      if (now <= nextChange) return events;
      nextChange = now + QUEST_TIMING.change;
      const event = changes.shift();
      if (!event) return events;
      const { row } = event;
      if (event.type === "add") {
        row.phase = "entering";
        row.phaseStarted = now;
        row.addedAt = now;
        rows.unshift(row);
        if (!marker && row.target) marker = row;
      } else if (event.type === "validate") {
        row.validated = true;
        row.validatedAt = now;
        events.push({ type: "validated", id: row.id, text: row.text });
      } else {
        row.phase = "leaving";
        row.phaseStarted = now;
        if (marker === row) marker = null;
      }
      return events;
    },
    reset() {
      index.clear();
      rows = [];
      changes = [];
      marker = null;
      nextChange = -Infinity;
    },
    snapshot: () => rows.map(copy),
    target: () => marker?.target ? { ...marker.target } : null,
  };
}

// Reconcile the local journey with independent events. Validation is explicit:
// closing a temporary instruction or abandoning a scene is not completion.
export function createQuestTracker() {
  const log = createQuestLog();
  let previous = new Set();
  return {
    ...log,
    reconcile(objectives, { reset = false, completePrevious = false } = {}) {
      if (reset) { log.reset(); previous.clear(); }
      const next = new Set(objectives.map(o => o.id));
      for (const id of previous) {
        if (next.has(id)) continue;
        if (completePrevious) log.validate(id);
        log.remove(id);
      }
      for (const objective of objectives) log.add(objective);
      previous = next;
    },
  };
}
