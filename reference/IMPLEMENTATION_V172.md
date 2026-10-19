# Implementación v0.172 — macizos junto a las cabañas

## Cambio

Se añadieron cinco macizos pequeños de helechos y flores alrededor de las viviendas de la aldea. Reutilizan el objeto `flowerbed` que ya dibuja `dist/art.js` y son parte del contenido estático del mapa.

## Evidencia y límites

- `reference/gameplay-frames/frame-0180.jpg` (03:00) muestra vegetación agrupada alrededor de las cabañas y sus bordes.
- El fotograma no proporciona las coordenadas mundiales ni el tipo de objeto del sector. Las cinco posiciones, tamaños y variantes son aproximaciones locales.
- Los macizos no tienen colisionadores y no interfieren con el paso por la plaza.

## Persistencia y verificación

- Sin cambios en el esquema o contenido del guardado.
- Sin funciones online.
- No se ejecutó el juego ni pruebas en esta actualización. Falta comparar densidad, solapamiento y oclusión con las capturas de la aldea en navegador.
- La estimación de fidelidad no cambia hasta realizar el cotejo.
