# Implementación v0.185 — objetivo de progresión al volver a la aldea

## Cambio

Después de completar el tutorial y antes de iniciar la primera expedición, el objetivo de la aldea muestra “Continúa el sendero.”, traducción española archivada de `obj_continuez`. Tras la primera expedición, vuelve a mostrarse la instrucción local del tablón; el objetivo de Mura conserva su estado propio.

La condición usa `profile.tutorial` y `profile.expeditions`; no añade ni migra campos de guardado. Las partidas existentes conservan sus datos.

## Evidencia

- `GAMEPLAY_VIDEO_NOTES.md` sitúa la llegada a la aldea aproximadamente en 01:30–04:00.
- `gameplay-frames/frame-0120.jpg` (02:00) muestra el objetivo “Continue your progression.”
- `original-translations/tfmadv_es.json` conserva `obj_continuez`: “Continúa el sendero.”

## Límite

El cliente archivado recibe los objetivos desde el servidor y no se recuperó el payload que vincula este texto con un destino. Se conserva el marcador local existente del tablón como guía de progresión; su destino exacto requiere cotejo en navegador. No se cambió la estimación de fidelidad porque falta esa comparación.

Sin funciones online ni traducciones al francés.
