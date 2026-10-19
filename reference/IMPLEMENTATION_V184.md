# Implementación v0.184 — tutorial sin combate inventado

## Cambio

Tras curar a Picpic, el tutorial ahora pasa directamente a hablar con Papaille. Se quitó el grupo local de tres escarabajos y el diálogo que exigía despejar insectos, porque esa secuencia no está respaldada por la grabación. Papaille usa el texto español archivado para la invitación a volver a Mice Village; al completar el diálogo, el juego local entra en la aldea.

Las fases guardadas `tutorialPhase` 1 y 2 siguen permitiendo continuar con Papaille. No cambia el formato ni se reinician partidas existentes. Se mantiene el comportamiento local de curación y las recompensas actuales de transición.

## Evidencia

- `GAMEPLAY_VIDEO_NOTES.md` y `gameplay-frames/frame-0010.jpg`: Picpic está caído y el objetivo visible es `obj_soins`.
- `gameplay-frames/frame-0060.jpg`: Picpic está de pie y Papaille ofrece llevar al jugador de vuelta a Mice Village; no se ve una instrucción de derrotar tres escarabajos.
- `gameplay-frames/frame-0120.jpg`: el jugador ya está en la aldea y aparece la instrucción de continuar la progresión.
- `original-translations/tfmadv_es.json`: `dialogue.45` contiene “¡Hey amigo! ¿A dónde vas? ¡Puedo llevarte de vuelta a Mice Village si quieres!” y `obj_papaille` contiene “Habla con Papaille.”
- El cliente archivado `InterfaceQueteADV.js` recibe los objetivos como mensajes del servidor. No se recuperó el ciclo completo de objetivos del tutorial; por ello se ajusta solo la transición que muestra el video.

## Alcance y límites

La conversación y el regreso ahora corresponden mejor al tramo observado. No se afirma que el tutorial completo sea idéntico: no se recuperó el payload original del mapa, el árbol exacto de diálogo ni las recompensas autoritativas. La versión requiere cotejo en el navegador del usuario; no se ejecutaron pruebas en esta implementación.

No se añadieron funciones online ni traducciones al francés.
