# v0.204 — movimiento del indicador de objetivo

La flecha distante ya no aparece directamente en el borde. Al entrar en ese modo parte del centro y se acerca al destino con la interpolación del cliente archivado. La dirección se actualiza inmediatamente, como en el original.

## Evidencia e implementación

`TFMAdventure.bouclePrincipale` calcula `dureeImage = min(tempsEcoule / 16.66666, 5)`. `InterfaceQueteADV.boucle` incrementa cada coordenada por `(destino - posición) * 0.1 * DELTA` y coloca inicialmente la flecha en el centro cuando entra al modo distante.

`createObjectiveArrowMotion` en `objectives.js` reproduce esa fórmula. El renderer recibe los milisegundos entre fotogramas, antes del límite de 50 ms del simulador local, para aplicar el límite original de cinco fotogramas. No cambia el tiempo de combate. Al ocultarse el indicador o volver al modo de suelo se descarta la interpolación; al redimensionar se conserva la posición relativa dentro de la pantalla, adaptación local para evitar que quede fuera.

El estado vive en memoria y no se serializa. No cambia objetivos, recompensas ni posiciones de partida. La fuente es inspección estática de los dos archivos archivados bajo `reference/wayback-client/dist/Transformice-adventure-client/src/`; no es una salida nueva de REA.

## Validación

- `npm run test:objectives`: cinco pruebas aprobadas. Añade dos pasos consecutivos, pausa larga limitada, reinicio por ocultación/suelo y redimensionado. El primer intento usó igualdad exacta para 510.4 y falló por un residuo de coma flotante de aproximadamente 6e-14; se sustituyó por tolerancia de 1e-9.
- `npm run test:emotes -- --reference-size`: tutorial, rescate/reanudación, aldea y emotes aprobados sin excepciones.
- `npm run test:objective-motion` registra doce posiciones de la llamada real a `drawImage` de la flecha. La instrumentación es temporal, conserva la llamada original y se restaura al terminar. Comprueba que la primera posición no sea el destino y que las siguientes reduzcan su distancia al borde sin salir del Canvas.

La comprobación en Chrome a 640×360 aprobó; [traza conservada](validation-v204/objective-motion.json). `npm run check` aprobó los 84 archivos existentes antes de añadir el helper de navegador; después se comprobó explícitamente la sintaxis del helper nuevo y del guion modificado.

## Límites

El cambio reproduce la fórmula observada, no elimina las diferencias entre la cámara local y la proyección original. El FX72 de suelo, la equivalencia de distancias y el cotejo temporal del recorrido completo permanecen pendientes. El redimensionado es una adaptación local declarada. La estimación global se mantiene en 47%.
