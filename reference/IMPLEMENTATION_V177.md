# Implementación v0.177 — iconos en pantallas de trabajos

## Cambio

Las secciones de habilidades de la ficha de trabajos y los botones para elegir una habilidad secundaria ahora muestran los mismos iconos originales recuperados que el HUD: Botánico/Elixir (1006), Estafador/Desaparición (1007) y Chef/Caldero (1009). Las demás habilidades conservan sus glifos locales.

## Evidencia y límites

- `dist/skill-data.js` asocia las habilidades con sus IDs originales; los tres PNG correspondientes existen en `dist/assets/original/interface/icones/`.
- Los IDs 1010–1014 siguen sin imágenes recuperadas. No se asignan recursos visuales por semejanza.
- No se modifican requisitos de trabajo, efectos ni balance.

## Persistencia y verificación

- Sin cambios al guardado.
- Sin funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas; falta cotejar el tamaño/alineación de iconos en la ficha de trabajo y botones secundarios en navegador.
- La estimación global permanece en 47% hasta el cotejo de v0.177.
