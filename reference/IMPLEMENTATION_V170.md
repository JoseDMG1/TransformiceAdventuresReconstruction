# Implementación v0.170 — sendero curvo de la aldea

## Cambio

Se sustituyó el camino genérico en forma de cruz de la aldea por un sendero curvo que rodea la plaza y una ramificación corta hacia el tablón. La geometría es parte del lienzo de terreno; no cambia los puntos de interacción ni añade colisiones.

## Evidencia y límites

- `reference/gameplay-frames/frame-0180.jpg` (03:00) muestra un claro amplio con un recorrido irregular curvo alrededor de vegetación y edificios.
- El sendero local se trazó para reproducir esa lectura general en el mapa de 2200×1500. El fotograma no da coordenadas mundiales ni el payload de sector; el circuito completo es una composición local aproximada.
- El acceso al tablón es un ajuste de jugabilidad local para conectar el camino con el punto de interacción existente; su geometría no se atribuye al original.

## Persistencia y verificación

- Sin cambios en el esquema o contenido del guardado.
- Sin funciones online.
- No se ejecutó el juego ni pruebas en esta actualización. Falta cotejar encuadre, ancho, color y conexión del camino en el navegador, y comprobar el paso a pie por la plaza.
- La estimación de fidelidad permanece en 47% hasta realizar el cotejo.
