# Implementación v0.175 — escala y posición del diálogo

## Cambio

La caja de diálogo ahora es compacta y se sitúa cerca de la franja inferior, guiada por `frame-0600.jpg`. Ancho, posición vertical, retrato, tipografía, márgenes y botón escalan con el viewport. En ventanas estrechas el panel mantiene un ancho mínimo legible y ya no sube 180 px.

## Evidencia y límites

- El fotograma de 10:00 muestra una caja baja y compacta a 640×360, con retrato a la izquierda y texto corto a la derecha.
- Las medidas CSS son trazadas desde una captura, no dimensiones recuperadas del cliente original. La conversación larga puede aumentar la altura del panel por el contenido.

## Persistencia y verificación

- No cambia la simulación, la entrada ni los datos guardados.
- No se ejecutó el juego ni pruebas en esta actualización; queda pendiente comprobar escala y legibilidad en el navegador, tanto a 640×360 como en una ventana estrecha.
- La estimación global permanece en 47% hasta cotejar la versión actual.
