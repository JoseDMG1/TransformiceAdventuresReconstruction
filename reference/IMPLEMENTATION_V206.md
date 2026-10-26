# v0.206 — tablón de la aldea

El cartel estrecho con tres hojas iguales fue sustituido por un tablón más ancho: marco de madera, tejadillo bajo de listones con borde azulado, apoyos y cinco papeles superpuestos. Se trazaron las características visibles del tablón en el [fotograma de 03:00](gameplay-frames/frame-0180.jpg), corroboradas por el de [02:00](gameplay-frames/frame-0120.jpg).

El dibujo vive ahora en `drawVillageBoard`, dentro de `dist/village-art.js`, junto al suelo de la aldea. Se retiró la implementación anterior de `art.js`; su registro usa un lienzo de 166×110 con ancla 83×102, en vez de 130×125 con ancla 62×110. La posición de los pies se conserva en la coordenada del objeto. No se modificaron `map-data.js`, el punto de interacción, colisiones ni datos de partida.

Este es arte Canvas local aproximado, no una imagen original recuperada. Las formas y marcas de los papeles son ilustrativas: no se atribuye significado a textos ilegibles del gameplay ni se añaden misiones. La evidencia procede del video conservado; no hubo una nueva operación REA y siguen vigentes las limitaciones documentadas de su CLI.

## Comprobación

- `npm run check`: sintaxis correcta en 87 archivos.
- `npm run test:objective-motion`: Chrome a 640×360; tutorial, recarga, llegada a la aldea, menús y cambio entre flecha y marcador próximo aprobados sin excepciones.
- [Captura inspeccionada](validation-v206/board-640.png), comparada con el [tablón anterior](validation-v205/objective-ground.png) y los dos fotogramas originales.

La nueva captura muestra la silueta más ancha y la estructura de anuncios. El encuadre local sigue siendo distinto del original y el encabezado se superpone parcialmente al tablón desde esta posición; falta cotejar cámara/HUD y distribución de edificios. Esta entrega no acredita equivalencia de escala absoluta ni cierra la fidelidad de la aldea. La estimación global permanece en 47%.
