// NotificationADV's local presentation lifetime: 4 s, then 1 s fade.
// No acknowledgement messages or other server behavior are reconstructed here.
export function createQuestNotices() {
  let notices = [], current = null, serial = 0;
  function close(key, now) {
    const notice = notices.find(n => n.key === key);
    if (!notice || notice.closingAt !== null) return;
    notice.closingAt = now;
    if (current === notice) current = null;
  }
  return {
    show(text, now) {
      if (current) close(current.key, now);
      current = { key: ++serial, text, startedAt: now, expiresAt: now + 4000, closingAt: null };
      notices.push(current);
    },
    close,
    tick(now) {
      for (const notice of notices)
        if (notice.closingAt === null && now >= notice.expiresAt)
          close(notice.key, notice.expiresAt);
      notices = notices.filter(n => n.closingAt === null || now - n.closingAt < 1000);
    },
    reset() { notices = []; current = null; },
    snapshot: () => notices.map(n => ({ ...n })),
  };
}

export function createQuestNoticeView(container, onClose) {
  const elements = new Map();
  return {
    render(notices) {
      const alive = new Set(notices.map(n => n.key));
      for (const [key, node] of elements)
        if (!alive.has(key)) { node.remove(); elements.delete(key); }
      for (const notice of notices) {
        let node = elements.get(notice.key);
        if (!node) {
          node = document.createElement("button");
          node.type = "button";
          node.className = "quest-notice";
          node.textContent = notice.text;
          node.title = "Cerrar aviso";
          node.onclick = () => onClose(notice.key);
          container.append(node);
          elements.set(notice.key, node);
        }
        const closing = notice.closingAt !== null;
        node.classList.toggle("is-closing", closing);
        node.disabled = closing;
      }
    },
  };
}
