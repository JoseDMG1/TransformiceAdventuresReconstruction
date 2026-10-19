# Desarrollo local v0.83–v0.85

## Evidencia original

REA analizó estáticamente `InterfaceQueteADV.js` e `InterfaceDialogueADV.js`, sin ejecutar el cliente ni conectarse al servidor. Evidence ID: `ev_d7a4c14bf156e0db47b289e5e74e1a4da6fb4b6a823295a9b46ae1b88acd12c8`. SHA del artefacto: `b1de32ffbe96f5c7715fb6fde4a82c35513789e597ee244e6da71e5d5c5c6288`.

Evidencia completa: `rea-objectives-v83-evidence.json.gz`. Identidad y límites: `rea-objectives-v83-summary.json`. Se analizaron solo esos dos archivos: las relaciones con los restantes no quedan establecidas por este análisis enfocado.

La interfaz original distingue marcador de suelo FX72 y flecha lejana `interface/fleche.png`; los objetivos y sus coordenadas llegan del servidor. El diálogo revela texto a 70 letras por segundo. El primer clic completa el texto y el siguiente avanza de página.

## Implementación

- `objectives.js` identifica el objetivo del tutorial, el tablón, el siguiente tramo o el cofre. Proyecta una flecha en una franja interior de la pantalla para dejar espacio al HUD. Las asignaciones de objetivo y los márgenes de pantalla son locales.
- El marcador cercano usa FX72 y el distante la imagen original recuperada. Se ocultan con el HUD, los menús y los diálogos.
- El cofre se dibujaba antes siempre en 1100,650 aunque su interacción apareciera junto al personaje. Ahora dibujo e interacción usan el mismo objeto y se ordenan por profundidad. La posición se conserva en el campo opcional `chest` del guardado v13. Las partidas antiguas siguen pudiendo regenerarlo al completar el encuentro.
- El cofre utiliza rojo, dorado y remaches azules observados en `video-v12/frame-1040.png`. Sigue siendo un dibujo local de Canvas; no se recuperó su sprite original. Se corrige el identificador de sonido a `coffre2`, que sí existe entre los recursos recuperados y en la interfaz original de recompensas.
- `dialogue-text.js` controla el revelado con reloj monotónico. E, el botón o un clic en la caja completan el texto antes de avanzar. La preferencia `prefers-reduced-motion` muestra el texto inmediatamente. Los textos se insertan como texto, sin interpretar HTML.

## v0.85: ayuda de habilidades

`skill-data.js` registra el ID original y una descripción española de cada habilidad, junto a sus controles locales. `ABILITIES` reúne esos metadatos sin cambiar los IDs estables usados en partidas y módulos. La barra de acciones muestra ayudas independientes para cada habilidad y para la ranura secundaria. Trabajos permite desplegar las descripciones del trabajo actual.

Las descripciones resumen `comp.desc.1006`, `1007`, `1009`, `1010`, `1011`, `1012`, `1013` y `1014`. Se usa «daño en la zona» para el elixir porque el comportamiento local sigue aplicando pulsos del campo; no se promete un estado de veneno original independiente que aún no tiene.

## Estado

Integración revisada en código. `npm run check` aprueba la sintaxis de 51 archivos en v0.85. Estas versiones aún no tienen un recorrido de navegador posterior a sus cambios. La última comprobación completa de funcionalidades enfocadas corresponde a v0.81. No se afirma equivalencia completa del original ni se implementa online.
