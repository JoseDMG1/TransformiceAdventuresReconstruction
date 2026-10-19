# Implementación v0.176 — iconos originales de habilidades

## Cambio

El HUD carga los PNG originales para las habilidades cuyos recursos se recuperaron: Botánico/Elixir (1006), Estafador/Desaparición (1007) y Chef/Caldero (1009). Se aplica también a la tercera habilidad si usa uno de esos IDs. El icono dinámico de cartas se conserva para la primera habilidad del Estafador.

Las demás habilidades mantienen sus glifos locales: los archivos 1010–1014 no están presentes en `dist/assets/original/interface/icones/`, y no se sustituyen por iconos inferidos.

## Evidencia y límites

- `dist/skill-data.js` asocia cada habilidad con el `originalId` recuperado del cliente.
- `dist/assets/original/interface/icones/1006.png`, `1007.png` y `1009.png` existen en el proyecto.
- No se infieren efectos, costes ni reglas a partir de los iconos.

## Persistencia y verificación

- No cambia el guardado ni la lógica de habilidades.
- Sin funciones online y sin traducciones al francés.
- No se ejecutó el juego ni pruebas en esta actualización; queda pendiente revisar tamaño, recorte y cambio de iconos en navegador al cambiar de trabajo.
- La estimación global permanece en 47% hasta cotejar la versión actual.
