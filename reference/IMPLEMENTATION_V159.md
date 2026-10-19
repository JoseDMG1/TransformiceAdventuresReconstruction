# Implementación v0.159 — arbolito en primer plano de la arena

## Cambio

Se añadió una decoración `sapling` a `pond-arena`: tronco estrecho ramificado y hojas amarillo-verdes, dibujados con Canvas y colocados como objeto vertical para que se ordene por profundidad Y junto al cofre, el jugador y los demás objetos. No tiene colisión ni cambia encuentros, controles o guardado.

## Evidencia y límites

- `reference/gameplay-frames/frame-1020.jpg` (17:00) y `reference/video-v12/frame-1040.png` (17:20) muestran la misma silueta alta de hojas claras delante de la arena; en la captura de 17:20 queda a la izquierda del cofre.
- Se trazó la posición aproximada `(1375,960)` comparando la silueta con el cofre de `pond-arena` y la cama de flores local. No son coordenadas recuperadas del sector, y el MP4 de 640×360 no permite certificar la escala mundial.
- El trazo es un dibujo local: no se afirma que el objeto original fuese un `MobileADV` ni un `AplatADV`. El payload que indicaría su clase, capa, índice de orden y colisión no está recuperado.

## Persistencia y verificación

- Solo se modifica decoración de escenario; no hay cambios de formato o estado persistido.
- No se añade online ni traducciones al francés.
- No se ejecutó el juego ni pruebas automatizadas. Falta comparar la composición y oclusión en navegador contra ambos fotogramas.
