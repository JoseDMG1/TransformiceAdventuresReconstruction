# Implementación v0.174 — retrato en diálogos

## Cambio

La caja de diálogo ahora presenta un retrato de ratón en canvas en lugar de un emoji. Se reutiliza el renderer de personaje existente y se toma el color del interlocutor (Papaille, Mura o Scarf); otros nombres usan un tono neutro.

## Evidencia y límites

- `reference/gameplay-frames/frame-0600.jpg` (10:00) muestra un retrato a la izquierda de la caja de diálogo.
- No se ha recuperado un retrato autónomo del cliente para esos interlocutores. El retrato dibujado localmente mejora la coherencia de estilo, pero no afirma reproducir el arte exacto del original.

## Persistencia y verificación

- No cambia el guardado ni las reglas del juego.
- No añade funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas en esta actualización; queda pendiente cotejar tamaño, encuadre y proporción del retrato en navegador.
- La estimación global permanece en 47% hasta realizar el cotejo de v0.174.
