# Implementación v0.169 — ratones ambientales locales en la plaza

## Cambio

La aldea ahora muestra tres ratones ambientales sin nombre en la plaza. Reutilizan el renderer de ratón y su pose original de reposo, con variaciones locales de color. No son seleccionables, no bloquean el paso, no tienen diálogo ni ruta de movimiento; su única función es aproximar la población visible en la grabación.

## Evidencia REA y de gameplay

- `reference/gameplay-frames/frame-0180.jpg` (03:00) muestra varios ratones adicionales a Papaille en la plaza.
- REA documenta el uso del clip `statique` para NPC del cliente recuperado; la reconstrucción reutiliza ese camino de render.
- El fotograma no conserva IDs, datos de apariencia ni coordenadas de sector de esos ratones. Los tres colores y posiciones son aproximaciones locales, no identidades originales.

## Alcance sin conexión

Los actores se construyen desde contenido estático local. No abren sockets, no envían mensajes, no tienen nombres de cuenta ni simulan acciones de otros jugadores. El juego sigue siendo un jugador local.

## Persistencia y verificación

- Sin cambios en formato, claves o contenido del guardado.
- No se ejecutó el juego ni pruebas durante esta actualización. Falta comparar el número, escala, posiciones y oclusión con la escena de aldea en navegador.
- La estimación de fidelidad no cambia hasta ese cotejo.
