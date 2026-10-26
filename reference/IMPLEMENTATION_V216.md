# v0.216 — dirección del objetivo inicial de aldea

El fotograma 03:00 muestra el indicador hacia la derecha durante «Continúa el sendero». La reconstrucción lo asociaba al tablón y dibujaba un anillo allí, discrepancia visible al registrar el encuadre de la plaza.

La instrucción inicial usa ahora la salida local `gate` y su ID de objetivo es `village:path`. Después de una expedición continúa guiando hacia Mura; tras hablar con ella vuelve al tablón para otra expedición. `objectiveTarget` resuelve los tres estados desde el mismo perfil consumido por `quest-data.js`, por lo que dibujo e inspección comparten destino.

La salida ya era una interacción local que abre la selección de expedición; el tablón sigue pudiéndose utilizar. No se añaden zonas ni funciones de red. La coordenada exacta del mensaje de misión original no se recuperó: el punto de salida aproxima la dirección observada, y la componente vertical del indicador aún difiere. No se presenta como recuperación del destino original.

Validación:

- `npm run test:quests`: 11 pruebas aprobadas, incluida consistencia entre texto/ID/destino para recorrido inicial, consejo de Mura y expedición repetida.
- `npm run test:emotes -- --reference-size --village-reference --objective-motion`: aprobado a 640×360. Tutorial/reanudación, controles, registro de plaza, interacciones de tres NPC y proyección real de flecha/marcador. El guion se acerca al destino actual con teclado en lugar de asumir que siempre es el tablón.
- Se corrigió la tolerancia del recorrido de comparación: con una ventana de 5 unidades el bot podía oscilar alrededor del punto en pasos de fotograma. La tolerancia de 15 unidades equivale como máximo a 7,5 píxeles y queda registrada en la captura; no se cambió la velocidad del juego. El acercamiento a NPC conserva margen suficiente para interactuar.

[Plaza e indicador](validation-v216/village-board-reference.png), [destino y pose](validation-v216/village-reference.json), [marcador cercano a la salida](validation-v216/objective-ground.png), [matrices Canvas](validation-v216/objective-motion.json).

No cambia el formato de guardado. Las instrucciones se reconstruyen desde el progreso existente. Siguen pendientes la secuencia de mensajes del servidor y el cotejo completo de misiones del video.
