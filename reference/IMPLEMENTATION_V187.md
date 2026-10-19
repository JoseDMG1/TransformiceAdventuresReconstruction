# Implementación v0.187 — objetivo durante la pista de Papaille

## Cambio

Al iniciar uno de los diálogos de pista de Papaille, el objetivo visible pasa temporalmente a “Habla con Papaille.”, el marcador local se oculta mientras el diálogo está abierto y la acción cercana usa ese mismo rótulo. Al completar la conversación, se restaura el objetivo de la escena. Se quitó el contador local de pistas que se agregaba a todos los objetivos del bosque.

El identificador del diálogo es estado temporal en memoria; no se agrega a la partida guardada. El registro existente de pistas examinadas y su compatibilidad se mantienen.

## Evidencia

- `gameplay-frames/frame-0600.jpg` muestra el objetivo “Talk with Papaille.” durante el diálogo cuya línea visible corresponde a la pista.
- `original-translations/tfmadv_es.json`: `obj_papaille` es “Habla con Papaille.” y `dialogue.47`/`dialogue.48` contienen los textos de las pistas.
- `InterfaceQueteADV.js` mantiene visibles los objetivos como filas independientes; el cliente no incluye el contador local añadido anteriormente.

## Límite

Las pistas se representan como objetos interactivos locales porque no se recuperó el payload del sector que colocaba al NPC y sus activadores. El rótulo coincide con la escena, pero su emplazamiento y marcador requieren cotejo local. Sin cambios de guardado, funciones online ni traducciones al francés.
