# Implementación v0.168 — cabañas redondeadas en la aldea

## Cambio

Se sustituyeron las cinco siluetas rectangulares de la aldea por cabañas redondeadas de madera con techo cónico. Las variantes cambian el tono de la madera y el techo, e incluyen puerta arqueada y ventana pequeña para distinguirse a escala de juego. El dibujo vive en `dist/art.js`; la configuración reutiliza las instancias existentes de `dist/map-data.js`.

## Evidencia REA y de gameplay

- `reference/gameplay-frames/frame-0180.jpg` (03:00) muestra cabañas redondeadas con techos amplios de madera/teja y puertas arqueadas alrededor de la plaza.
- `reference/gameplay-frames/frame-0120.jpg` (02:00) muestra otra parte de la aldea y su tablón, vegetación y recorrido.
- La evidencia REA documenta el render por capas y orden Y de objetos/móviles. Las casas siguen como objetos estáticos de escena y no se inventa una geometría de sector recuperada.
- No se encontraron sprites de viviendas entre los recursos originales locales. Por ello, las cabañas son dibujo vectorial aproximado, no arte original.

## Límites

Se conservaron las posiciones, escalas y colisionadores previos; no están cotejados con datos de mapa originales. La forma, la orientación, el color y los detalles de techo son aproximaciones basadas en los fotogramas. La sustitución acerca la silueta al material disponible, pero no resuelve los mapas/sectores ausentes.

## Persistencia y verificación

- Sin cambios en el formato, claves o contenido del guardado.
- Sin funciones online.
- No se ejecutó el juego ni pruebas en esta actualización. Falta cotejar en navegador las cabañas y su oclusión con las capturas de 02:00 y 03:00.
- La estimación de fidelidad permanece sin cambios hasta ese cotejo.
