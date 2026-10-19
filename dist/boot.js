// Keep recovery independent from game modules so it also works after import failures.
let shown = false;
function showFailure(error) {
  if (shown) return;
  shown = true;
  window.dispatchEvent(new Event("adventure-failure"));
  const panel = document.createElement("section");
  panel.id = "game-error";
  panel.setAttribute("role", "alertdialog");
  panel.setAttribute("aria-labelledby", "game-error-title");
  const title = document.createElement("h2");
  title.id = "game-error-title";
  title.textContent = "El juego se ha detenido";
  const description = document.createElement("p");
  description.textContent = "Puedes recargar la página o descargar una copia de la partida guardada en este navegador.";
  const detail = document.createElement("pre");
  detail.textContent = error?.message || String(error || "Error inesperado");
  const actions = document.createElement("div");
  actions.className = "button-row";
  const reload = document.createElement("button");
  reload.className = "primary";
  reload.textContent = "Recargar el juego";
  reload.onclick = () => location.reload();
  const backup = document.createElement("button");
  backup.id = "error-backup";
  backup.className = "secondary";
  backup.textContent = "Descargar copia de partida";
  let saved;
  try { saved = localStorage.getItem("tfma-local-v1"); } catch { /* Storage can be unavailable. */ }
  backup.disabled = !saved;
  backup.onclick = () => {
    const url = URL.createObjectURL(new Blob([saved], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "transformice-partida-recuperada.json";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  actions.append(reload, backup);
  panel.append(title, description, detail, actions);
  document.body.append(panel);
  reload.focus();
}
window.addEventListener("error", event => {
  if (event instanceof ErrorEvent) showFailure(event.error || event.message);
});
window.addEventListener("unhandledrejection", event => showFailure(event.reason));
try { await import("./game.js"); } catch (error) { showFailure(error); }
