# v0.150 — cierre independiente de la ventana de regalos

## Cambio

La ventana local de regalos ahora tiene acciones separadas de confirmación y cierre, como `InterfaceRecompenseRencontre` del cliente recuperado. Cerrar descarta la selección actual, mantiene la oferta y el cofre sin reclamar, y permite continuar el recorrido; el jugador puede acercarse e interactuar con el cofre para volver a abrir la oferta. Confirmar conserva el flujo existente y aplica el regalo elegido.

## Evidencia

- REA Evidence `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`: el cliente original crea un botón de validación y otro de cierre; `fermer()` solo quita la interfaz, mientras que `clicBoutonValider()` envía el ID del cofre y del don antes de cerrar.
- El video a 05:50 muestra por separado los botones “Submit” y “Close” en la selección de dones. En esta reconstrucción el texto se mantiene en español.
- REA no establece si una oferta cerrada puede reabrirse desde la interacción del mundo; conservar el cofre interactuable es la decisión local para que cerrar no conceda ni destruya una recompensa.

## Guardado y alcance

- No cambia el esquema de guardado ni descarta la oferta pendiente.
- Al cerrar se limpia solo la selección temporal; los regalos ya adquiridos no cambian.
- No altera generación, contenido ni balance de las opciones.

## Verificación

Revisión estática de la ruta de selección, confirmación y persistencia de la oferta. No se ejecutó el juego ni una suite de pruebas; falta comprobar cerrar, reabrir y confirmar en navegador.
