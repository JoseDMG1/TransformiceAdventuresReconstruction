# Implementación v0.141

## Objetivo de aldea tras la expedición

Al regresar de una expedición completada, el objetivo local ahora dirige al jugador a Mura para revisar los trabajos. La descripción usa la información respaldada por el gameplay del tramo 18:00 y el recurso de traducción original `obj_metier`: cambio de trabajo gratis y trabajo secundario disponible desde nivel 10. El título `Trabajos` también coincide con el recurso traducido `titre.14`.

La indicación aparece una sola vez. Al interactuar con Mura, el perfil guarda `muraAdviceSeen` y el marcador vuelve al tablón. El estado se añade como campo opcional del perfil; `SAVE_VERSION` y el formato de exportación no cambian. Los guardados anteriores se decodifican con el valor predeterminado `false`, así que un perfil que ya registra expediciones recibe la indicación al volver a la aldea.

La regla funcional preexistente de trabajo secundario sigue estando en `jobs.js` (`SECONDARY_JOB_LEVEL`); esta entrega no altera desbloqueos, trabajos, economía ni recompensas. No se añadió contenido online.

## Evidencia

- `reference/GAMEPLAY_VIDEO_NOTES.md`, tramo aproximado 18:00: regreso a la aldea y objetivo de hablar con Mura; trabajo secundario desde nivel 10 y cambio de trabajo gratuito.
- `reference/VIDEO_MECHANICS_V12.md`, fotograma `frame-1080.jpg`: mismo objetivo visible.
- `reference/original-translations/tfmadv_es.json`: claves `obj_metier` y `titre.14`.
- `dist/maps.js`: los NPC de escena se exponen también como interactuables; Mura ya abría el panel local de trabajos.

## Verificación

No se ejecutaron pruebas ni un recorrido de navegador. La persistencia mantiene `SAVE_VERSION = 13`; compatibilidad se revisó en el flujo explícito de `defaultProfile()` y `decodeSave()`, pero no se comprobó ejecutando una partida.
