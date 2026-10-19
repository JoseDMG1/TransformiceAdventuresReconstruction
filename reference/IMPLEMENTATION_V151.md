# v0.151 — grupos de piedras en la orilla

## Cambio

Se añadieron dos formaciones decorativas de piedras a `pond-arena`, en la orilla de la laguna. Se componen de varias instancias del dibujo de roca existente, con dos disposiciones para reducir la repetición. No se agregan colisiones.

## Evidencia y límite

Los fotogramas `reference/gameplay-frames/frame-1020.jpg` (17:00) y `reference/video-v12/frame-1040.png` (17:20) muestran grupos de piedras en la ribera derecha, uno al norte y otro hacia el sureste. Las ubicaciones locales (`x:1510, y:720` y `x:1650, y:920`) y las escalas 0.68/0.74 se estimaron al trazarlas contra el mapa reconstruido; no son coordenadas de sector recuperadas. Falta cotejo en el navegador para ajustar posición y escala.

## Persistencia y alcance

- Solo cambia la decoración fija de la arena final.
- No cambia colisiones, recorrido, encuentros, combate ni datos persistidos.
- El arte usa las rocas existentes; no se afirma que el cliente original usara esta composición procedural.

## Verificación

Inspección de las capturas de referencia y revisión estática de la composición de `pond-arena`. No se ejecutó el juego ni una suite de pruebas.
