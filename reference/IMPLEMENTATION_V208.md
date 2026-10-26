# v0.208 — controles locales en el menú

Los tres botones grandes de mapa, sonido y ayuda de la esquina superior derecha se retiraron del HUD. Mapa y silencio están ahora en el menú abierto con Escape o la pastilla; Controles conserva la ayuda. El manual muestra F para emotes y 3 para la habilidad secundaria, coincidiendo con las entradas implementadas.

Evidencia: `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceMenuADV.js` concentra opciones y salida en un menú; `gameplay/InterfaceCompetenceADV.js` abre ese menú desde su pastilla. Los fotogramas 02:00 y 03:00 no muestran los tres botones grandes locales. El menú de esta reconstrucción conserva accesos adicionales para probarla y no se presenta como copia exacta del original. Inspección estática del cliente recuperado, sin salida nueva de herramientas REA.

El control de audio tolera que el botón solo exista mientras está abierto el menú. No cambian los guardados; las preferencias de sonido siguen separadas.

Validación realizada:

- `npm run test:emotes -- --reference-size` y `npm run test:emotes`: aprobados en Chrome, a 640×360 y 1280×800. Incluyen rescate, recarga del tutorial, retorno a aldea, emotes, clics reales en mapa y sonido, carga del mapa, volumen silenciado y texto de controles. Sin excepciones ni cambios del perfil por estas acciones.
- `npm run check`: sintaxis correcta en 88 archivos. `git diff --check`: aprobado.
- Capturas: [HUD 640](validation-v208/640/hud.png), [menú 640](validation-v208/640/menu.png), [HUD 1280](validation-v208/1280/hud.png), [menú 1280](validation-v208/1280/menu.png). En ventana pequeña el menú usa desplazamiento vertical.

Falta el cotejo completo de escala, tipografía y composición del HUD. Esta comprobación no equivale a repetir la expedición completa ni actualiza el porcentaje de fidelidad.
