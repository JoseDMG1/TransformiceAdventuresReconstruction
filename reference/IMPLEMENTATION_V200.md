# v0.200 — paginación y espacio reservado del diálogo

`InterfaceDialogueADV.js` archivado corta primero por `_P_` y reduce la página por saltos de línea o espacios hasta que cabe en 110 unidades de altura. También añade las letras pendientes en un span transparente durante la escritura. Esta entrega integra ambos comportamientos mediante `dialogue-text.js` (corte puro) y `dialogue-layout.js` (medición DOM y presentación).

La medición usa el ancho y estilo reales del párrafo, con una altura mínima de 110 unidades a la escala local del panel. Se vuelve a medir al avanzar de página. El texto restante vuelve a la cola antes de continuar; la acción final solo se ejecuta después de agotar esa cola. La primera pulsación sigue revelando el texto; la siguiente avanza. El texto completo de la página se mantiene en la etiqueta accesible y la cola transparente se oculta a lectores de pantalla.

Se conserva exactamente el texto entre páginas, incluidos espacios y saltos, excepto el delimitador `_P_`. Esto evita concatenar palabras al reagrupar el resto. Como protección local, una palabra sin espacios puede cortarse por puntos de código Unicode y envolverse visualmente. El original no garantiza ese caso. Los límites entre frases ya declarados en los diálogos locales siguen siendo límites de página explícitos.

## Evidencia y pruebas

Fuente: `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceDialogueADV.js`, funciones `decouperDialogue`, `calculNombreLignes`, `majTexte` y constante `HAUTEUR_TEXTE`. Inspección estática; no es una salida nueva de REA. Continúa la limitación del CLI documentada en v0.199.

- `npm run test:dialogue`: tres pruebas aprobadas sobre conservación de texto, saltos explícitos después de desbordamiento y revelado sin consumir la siguiente página.
- `npm run check`: sintaxis correcta en 81 archivos.
- `npm run test:tutorial:reference` y `npm run test:tutorial`: Chrome a 640×360 y 1280×800; rescate, recarga y regreso a la aldea aprobados sin excepciones. Ambos guiones además paginan un texto largo con acentos, signos, emoji y delimitador, verifican recomposición íntegra, altura de cada página y altura idéntica entre texto transparente y revelado.
- Capturas inspeccionadas: [640×360](validation-v200/papaille-640.png), [1280×800](validation-v200/papaille-1280.png).

## Límites

No se altera el esquema de guardado. Las conversaciones abiertas siguen siendo estado transitorio. La escala y tipografía locales no prueban equivalencia geométrica con el original; falta comprobar redimensionado durante una página abierta y animaciones de entrada/salida. No se ha acreditado el recorrido completo de expedición. Se conserva la estimación provisional de fidelidad del 47%.
