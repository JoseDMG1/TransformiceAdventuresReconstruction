# v0.203 — colocación y escala del indicador de objetivo

Se corrigió la flecha que aparecía cerca del centro de la pantalla en ventanas pequeñas. La proyección anterior restaba 155 píxeles a la semialtura: a 640×360 solo dejaba 25 píxeles verticales a cada lado del centro, aunque el objetivo estuviera lejos. La flecha terminaba sobre el personaje o muy cerca de él.

## Evidencia original

`InterfaceQueteADV.js` archivado usa un umbral circular de proximidad y calcula la dirección desde el jugador al objetivo. Para un objetivo distante calcula un punto usando la semidiagonal de la pantalla y limita sus coordenadas a los bordes. `FlecheEcran` utiliza la imagen original sin dimensiones forzadas, con anclaje `(1, 0.5)`.

`TFMAdventure.js`, función `changerTailleFenetre`, fija el eje lógico mayor entre 1280 y 1920 y escala el Canvas al tamaño visible. Por tanto, a 640×360 la imagen se muestra a la mitad de su tamaño lógico. La reconstrucción antes la forzaba a 46×40 píxeles en todas las resoluciones.

Estas conclusiones proceden de inspección estática de los archivos archivados bajo `reference/wayback-client/dist/Transformice-adventure-client/src/`. No se presenta como una ejecución nueva de REA; continúa la limitación del CLI documentada en v0.199.

## Implementación

`objectives.js` calcula ahora la dirección desde el jugador, incluso cuando la cámara queda limitada por el mapa, y coloca el indicador distante sobre el borde real. La distancia circular se convierte mediante el zoom local para decidir cuándo mostrar el marcador de suelo. `originalInterfaceScale` reproduce la escala del eje lógico mayor únicamente para esta flecha; no modifica la cámara ni el resto del HUD.

El renderer utiliza las dimensiones naturales de `interface/fleche.png`, preserva su proporción y el anclaje original. Objetivos, interacciones, progreso y guardados no cambian.

## Validación

- `npm run test:objectives`: tres pruebas aprobadas; cuatro direcciones y diagonal a 640×360, 1280×800 y 360×640, objetivo próximo, cámara descentrada, objetivo ausente y escalas hasta 3840×2160.
- `npm run check`: sintaxis correcta en 84 archivos.
- `npm run test:emotes -- --reference-size`: tutorial, rescate/reanudación, aldea y menús locales aprobados en Chrome a 640×360, sin excepciones.
- [Captura nueva](validation-v203/village-objective-640.png), inspeccionada frente a la [captura anterior](validation-v202/village-640.png): la flecha apunta hacia el tablón desde el borde superior y deja libre al personaje.

## Pendientes

La interpolación original hacia el borde (`0.1 * DELTA`) no está reproducida; el indicador local alcanza directamente su posición. El umbral circular se adapta al zoom de la reconstrucción y no demuestra igualdad con la proyección 3D original. La proyección/escala del FX72 en el suelo tampoco cambia en esta entrega. El redondeo por eje del Canvas original puede producir diferencias menores en resoluciones no proporcionales. La puntuación de fidelidad sigue siendo provisional (47%).
