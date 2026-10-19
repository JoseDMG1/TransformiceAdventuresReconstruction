# Implementación v0.179 — objetivos sin títulos decorativos

## Cambio

El panel de objetivo ya no muestra la cabecera local ni los puntos de etapa; queda visible solo la instrucción, alineada a la derecha. Se conserva la ubicación compacta introducida en v0.178. Los textos, objetivos activos, marcadores y datos de progreso no cambian.

## Evidencia

- `InterfaceQueteADV.js` crea cada objetivo como texto alineado a la derecha y ancho máximo de `15em`; el registro original no añade un título de misión ni una fila de puntos de etapa.
- `ProtoADV.js` entrega el texto y, cuando existe, la posición o móvil objetivo en el mensaje del objetivo. Esto respalda separar la presentación del objetivo de los títulos locales de escena.
- `reference/gameplay-frames/frame-0060.jpg` muestra instrucciones pequeñas en la zona superior derecha.
- El contenido sigue siendo una reconstrucción local porque el payload original que decidía objetivos y destinos no se recuperó.

## Persistencia y verificación

- Sin cambios al guardado ni al progreso.
- No añade funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas; falta cotejo visual a 640×360 y ventana estrecha.
- La estimación permanece en 47% hasta comparar una pasada local sincronizada.
