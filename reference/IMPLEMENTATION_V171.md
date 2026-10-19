# Implementación v0.171 — claro abierto de la aldea

## Cambio

La generación de terreno ahora reduce las manchas grandes y flores dentro de la plaza central. Conserva una cantidad menor de césped disperso y concentra más detalle en la periferia, junto a viviendas y vegetación. Se combina con el sendero curvo introducido en v0.170.

## Evidencia y límites

- `reference/gameplay-frames/frame-0180.jpg` (03:00) muestra un área central amplia y despejada, con vegetación agrupada principalmente alrededor de edificios y bordes.
- La máscara elíptica del claro es una aproximación local para el mapa de 2200×1500, no un límite o dato recuperado del sector original.
- No se modifica el sistema de decoración ni sus colisiones; solo se condicionan los detalles procedurales de suelo en la aldea.

## Persistencia y verificación

- Sin cambios en el esquema o contenido del guardado.
- Sin funciones online.
- No se ejecutó el juego ni pruebas en esta actualización. Falta comparar densidad de vegetación, el claro y la legibilidad de senderos en el navegador.
- La estimación de fidelidad permanece en 47% hasta el cotejo.
