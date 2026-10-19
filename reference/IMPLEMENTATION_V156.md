# Implementación v0.156 — madera apilada en el corredor

## Cambio

Se añadió el objeto decorativo `woodPile` al tramo local `bramble-passage`, cerca del borde derecho del área. El dibujo reúne tablones oscuros cruzados con variaciones deterministas y una sombra base para aproximar la gran acumulación de madera visible en el fotograma 900 (15:00).

## Evidencia y límites

- `reference/video-v12/frame-900.png` muestra la masa de madera a la derecha de la zona de combate.
- La forma está dibujada localmente; no se recuperó un asset ni un registro de sector que establezca el objeto original.
- La posición `(1740, 850)` y escala `1.05` son un trazado aproximado del borde derecho del tramo, no coordenadas originales. Falta cotejar en navegador.

## Persistencia y alcance

- Decoración únicamente: no añade colisión, interacción, daño ni cambios de ruta.
- No cambia el guardado ni el estado de combate.
- Se conservó el tamaño interno de 280×220 del canvas de personaje para que el renderer actual no recorte el retrato en la nueva pestaña de perfil.
- No se ejecutó el juego ni pruebas automatizadas en esta entrega.
