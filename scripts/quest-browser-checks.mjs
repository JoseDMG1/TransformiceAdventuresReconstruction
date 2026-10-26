import assert from "node:assert/strict";

export async function checkQuestList({ evaluate, shot, waitFor }) {
  await waitFor("adventure.snapshot().objectives.length === 1 && adventure.snapshot().objectives[0].phase === 'active'",
    "Village must settle on one active instruction");
  const result = await evaluate(`(async () => {
    const { createQuestLog } = await import('./quest-log.js');
    const { createQuestView } = await import('./quest-view.js');
    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;left:10px;top:100px;width:220px;pointer-events:none';
    container.setAttribute('aria-hidden', 'true');
    document.body.append(container);
    const log = createQuestLog(), view = createQuestView(container);
    const render = now => { log.tick(now); view.render(log.snapshot(), now); };
    try {
      log.add({ id: 'fixture-a', text: 'Primer objetivo de prueba' });
      log.add({ id: 'fixture-b', text: 'Segundo objetivo de prueba' });
      render(0); render(501);
      const order = [...container.children].map(n => n.dataset.objectiveId);
      const first = container.lastChild;
      view.render(log.snapshot(), 501);
      const stableNode = first === container.lastChild;
      log.validate('fixture-a'); render(1002);
      const checked = [...container.children].map(n => n.classList.contains('is-validated'));
      const checkDrawn = getComputedStyle(first.querySelector('.quest-check'), '::after').content;
      render(2000);
      const staysChecked = first.classList.contains('is-validated') && !first.classList.contains('is-validating');
      log.remove('fixture-b'); render(2501);
      const removingOne = container.firstChild.dataset.phase === 'leaving' && first.dataset.phase === 'active';
      render(4001);
      const remaining = [...container.children].map(n => n.dataset.objectiveId);
      log.reset(); render(4500);
      return { order, stableNode, checked, checkDrawn, staysChecked, removingOne, remaining, empty: !container.children.length };
    } finally { container.remove(); }
  })()`);
  assert.deepEqual(result.order, ["fixture-b", "fixture-a"]);
  assert.equal(result.stableNode, true);
  assert.deepEqual(result.checked, [false, true]);
  assert.equal(result.checkDrawn, '"✓"');
  assert.equal(result.staysChecked, true);
  assert.equal(result.removingOne, true);
  assert.deepEqual(result.remaining, ["fixture-a"]);
  assert.equal(result.empty, true);
  await shot("quest-village");
  return result;
}
