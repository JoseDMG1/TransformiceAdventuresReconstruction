# Implementación v0.178 — objetivo de aventura compacto

## Cambio

El panel de objetivo se coloca más arriba y reduce tipografía, ancho y espacio entre título e instrucción. Se oculta la etiqueta decorativa “TU AVENTURA”. Los valores usan `clamp()` y límites por viewport para conservar la adaptación a ventanas pequeñas.

## Evidencia y límites

- `reference/gameplay-frames/frame-0060.jpg` muestra las instrucciones de tutorial en texto pequeño, en la esquina superior derecha, sin una cabecera decorativa visible.
- Los tamaños y coordenadas CSS son una aproximación medida visualmente a 640×360; no se recuperaron coordenadas de interfaz del servidor ni se ha cotejado la captura local.
- Se conserva el título, descripción y progreso actuales; no cambian objetivos, navegación ni simulación.

## Persistencia y verificación

- Sin cambios al guardado.
- No añade funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas; queda pendiente comparar a 640×360 y comprobar legibilidad en ventana estrecha.
- La estimación global permanece en 47% hasta completar el cotejo sincronizado.
