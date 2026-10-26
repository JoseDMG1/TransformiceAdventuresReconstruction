# v0.214 — plaza de aldea comparada desde el tablón

Se eligió una posición local alcanzable con teclado para que el apoyo del tablón se proyecte cerca de (326,117), como en el fotograma de 03:00. Esto permite distinguir el dibujo y la colocación de los elementos de un mero cambio de cámara. La pose usada es aproximadamente (853,736); no son coordenadas recuperadas del servidor.

## Cambios de presentación y composición

- Cabañas con techo cónico de listones verticales, cuerpo bajo, apoyos de piedra, puerta doble azul y abertura en el tejado. La cubierta de primer plano incluye el capuchón verde azulado y dos conductos claros visibles en la referencia.
- Faroles altos con poste de madera y caja verde azulada, sustituyendo las luces cortas anteriores. La altura natural del dibujo pasa de 135 a 420 unidades; con escala local de 0,95 y ventana de 640×360 se aproxima a los 190 píxeles observados.
- Tamaño del tablón, casas, cerca, Papaille, piedras y masas de césped revisados en relación con ese apoyo. Sus colocaciones siguen siendo una reconstrucción local.
- Se retiran la fuente, bancos, una cabaña y faroles colocados en el claro cotejado, donde contradicen la imagen registrada. La fuente ocupaba el espacio que en el fotograma contiene la isla de césped. No se considera recuperado el resto del mapa por retirar esas colocaciones.
- Las copas de árboles generadas que tapaban la cubierta y el paso de la plaza se excluyen conservando el consumo aleatorio. Las colisiones de las casas locales se trasladan con sus colocaciones; no son datos de colisión originales.
- La interacción del tablón se alinea con su apoyo visual y los ratones ambientales se distribuyen fuera de la posición de comparación del jugador. Son figuras locales, sin identidad de jugadores originales.

Los dibujos de edificios/faroles viven en `village-building-art.js`; se retiraron las funciones antiguas sin uso de `art.js`. Son trazados Canvas y no texturas originales recuperadas. La inspección de fuentes se mantiene estática; no se atribuye a una nueva salida de herramientas REA.

## Corrección funcional

Aunque el catálogo marcaba los ratones ambientales como no interactivos, `maps.js` los incorporaba a las conversaciones y producía «Hablar con » sin nombre. Se filtran esas figuras de las interacciones. Papaille, Mura y Scarf conservan las suyas.

## Validación

- `npm run test:maps`: tres pruebas aprobadas, incluidas ambas rutas de expedición y ausencia de conversaciones vacías de actores ambientales.
- `npm run test:village`: aprobado a 640×360. Incluye tutorial/reanudación, emotes y controles; después camina hasta la pose de comparación, abre el tablón y visita por movimiento ordinario a Papaille, Mura y Scarf. Verifica conversaciones y selección de trabajos sin cambios forzados del estado.
- `npm run test:emotes -- --village-reference`: el mismo recorrido pasó a 1280×800. [Captura](validation-v214/1280/village-board-reference.png) y [comprobaciones](validation-v214/1280/village-reference.json). `npm run check`: sintaxis correcta en 109 archivos; `git diff --check`: aprobado.
- La expedición completa de v0.213.1 pasó antes de este bloque; aquí se comprueban las interacciones afectadas por la nueva geometría de aldea.

Capturas: [antes](validation-v214/before.png), [plaza actual](validation-v214/640/village-board-reference.png), [original](comparison-frames/frame-180.png). [Estado y comprobaciones](validation-v214/640/village-reference.json).

El [comparador de escenas](SCENE_COMPARISON.html) incluye la plaza anterior y actual contra la misma referencia, además del tutorial.

Persisten diferencias de detalle, follaje, ropa/colores de NPC, perspectiva y composición del resto de la aldea. El destino original de «Continúa el sendero» sigue sin recuperarse: la referencia muestra un indicador hacia la derecha y la reconstrucción aún apunta al tablón. Esa discrepancia se conserva explícita para el siguiente bloque. La estimación global no se recalcula con una sola escena.
