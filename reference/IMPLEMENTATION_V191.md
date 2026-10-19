# Implementación v0.191 — retiro de la etiqueta local del HUD

## Cambio

Se quitó del HUD la pastilla «PARTIDA LOCAL» que aparecía en la parte superior derecha. Las capturas originales de gameplay muestran los controles pequeños de interfaz y el nombre de la zona, sin esa etiqueta. La reconstrucción sigue siendo exclusivamente local; solo desaparece el texto decorativo durante el juego.

Se conserva el espacio flexible de la barra superior para que los botones restantes mantengan su alineación. No cambian los accesos, escenas, controles, datos de perfil ni el guardado.

## Evidencia y límites

- `reference/gameplay-frames/frame-0010.jpg`, `frame-0480.jpg` y `frame-0600.jpg` muestran HUD de gameplay sin una etiqueta persistente que identifique la partida como local.
- La etiqueta era una adición de la reconstrucción, no un recurso recuperado del cliente.
- No se reasignaron los cuatro pequeños iconos que aparecen en la esquina superior izquierda del original: sus acciones no están determinadas con certeza por las capturas disponibles.

## Persistencia y verificación

- No cambia el modelo ni el formato de guardado.
- No se añade ninguna función online ni se cambia el alcance local.
- La retirada se basa en comparación estática de capturas. No se ejecutó una pasada de navegador ni pruebas automatizadas; la composición restante de la barra superior requiere cotejo local.
