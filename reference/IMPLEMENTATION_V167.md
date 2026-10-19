# Implementación v0.167 — bancos de la aldea

## Cambio

Se añadieron dos bancos decorativos a la plaza de la aldea. El dibujo usa las formas, contornos y tonos de madera de los objetos existentes en `dist/art.js`; las instancias se declaran en `dist/map-data.js`.

## Evidencia y límites

- Las notas del gameplay identifican bancos entre los elementos visibles de la aldea (`reference/GAMEPLAY_VIDEO_NOTES.md`, tramo 01:30–04:00).
- La grabación no proporciona datos del sector ni coordenadas exactas para estos objetos. Las dos posiciones y escalas son una composición local provisional, no coordenadas recuperadas.
- Los bancos son visuales y no tienen colisionadores; no alteran el movimiento ni bloquean rutas. No se añadieron ratones ambientales, ya que sus identidades y comportamiento no están disponibles para el modo local.

## Persistencia y verificación

- Sin cambios en el formato, claves o contenido del guardado.
- Sin funciones online.
- No se ejecutó el juego ni pruebas en esta actualización. Queda pendiente comparar posiciones, escala, perspectiva y oclusión con una captura de la aldea en el navegador.
- La estimación de fidelidad no cambia hasta realizar ese cotejo.
