# v0.196 — composición del claro del tutorial

Los fotogramas `gameplay-frames/frame-0010.jpg` y `frame-0060.jpg` muestran suelo ocre abierto entre manchas irregulares de hierba, tocones grandes y cercas de madera alrededor de Papaille. El tutorial local usaba el suelo genérico de pradera, sin ninguna colocación fija.

Ahora `MAPS.tutorial` declara `groundLayout: tutorial-clearing` y ocho decoraciones: cuatro tramos de cerca, dos tocones y dos macizos de flores. Las posiciones y escalas son trazadas localmente. `tutorial-art.js` dibuja el contorno del claro y la cerca, mientras `art.js` compone estos recursos con los tocones y vegetación existentes. Se reducen manchas ovaladas, hierba y flores dispersas dentro del espacio abierto. La laguna genérica de pradera deja de aparecer en este trazado del tutorial.

`maps.js` ya consume el `groundLayout` del catálogo también para escenas sin expedición. Esta conexión permite editar el terreno del tutorial mediante sus datos. El generador de objetos aleatorios y sus colisiones mantienen la secuencia anterior; los nuevos objetos son decorativos, ordenados por profundidad. No se cambian posiciones de jugador, mascota o Papaille ni el formato de guardado.

## Evidencia y comprobación

- Referencia visual primaria: los dos fotogramas citados del MP4 aportado. No se obtuvieron sectores originales ni se ejecutó una nueva operación REA. Los límites de recuperación siguen documentados en `MAP_RECOVERY.md`.
- `npm run check`: 77 archivos con sintaxis válida.
- `npm run test:tutorial`: recorrido en Chrome con rescate de Picpic, recarga, continuidad de fase, interacción con Papaille y regreso a la aldea, sin excepciones. Se repitió al añadir la captura del diálogo al guion.
- Captura local inspeccionada: [Papaille en v0.196](validation-v196/papaille.png), 1280×800. El original mide 640×360, así que el par no certifica encuadre ni escala equivalentes.

## Pendientes visuales concretos

Faltan el carro cargado y la criatura que lo arrastra, plantas de hojas anchas, detalles del tocón y otros objetos pequeños visibles en `frame-0060.jpg`. La vegetación aleatoria derecha todavía introduce árboles que no corresponden a ese encuadre. El arte de cercas, tocones y suelo sigue siendo aproximado. Tampoco se recuperaron las colisiones originales de la cerca; por ahora no bloquea el paso.

Esta entrega añade elementos observables y acredita que el tutorial sigue siendo transitable. No cierra el cotejo del mapa, no demuestra el recorrido completo de expedición y no modifica la estimación provisional de 47%.
