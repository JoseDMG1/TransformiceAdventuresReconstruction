# v0.205 — orientación del marcador de suelo FX72

El marcador próximo deja de dibujarse como un círculo frontal. `objective-art.js` coloca el recurso original sobre un plano local y comprime su eje vertical por `sin(3π/4)`, aproximadamente 0.7071. Es la componente ortográfica del ángulo de cámara recuperado, no una implementación completa de la perspectiva original.

## Recuperación y evidencia

`InterfaceQueteADV.js` archivado importa `../_animation/ClipAnimProjection` y construye `FlecheAplat` con el clip FX72 en `coucheOmbre`. Se recuperó el módulo desde esa ruta pública explícita:

- Archivo: `original-data/ClipAnimProjection-recovered.js`, 3,794 bytes.
- SHA-256: `327349f34bcd9297e0ef9f6d792b764ca803f8bdbd8335e101c6d69e5845171b`.
- [Manifiesto de recuperación](original-data/ground-projection-download.json): URL, fecha, tamaño y hash del módulo y de la fuente que lo referencia.
- `npm run recover:ground-projection` reproduce la recuperación sin ejecutar el cliente descargado.

La clase extiende `PIXI.projection.Sprite3d`, asigna `euler.x = Math.PI / 2`, lleva la posición del mapa a X/Z y reproduce el clip a intervalos de 16.66666 ms. `MondeADV-2021.js` fija `ANGLE_CAMERA = Math.PI - Math.PI / 4`, con foco de 1600 y distancia variable. Los metadatos locales de FX72 conservan `fx/objectif/objectif1.png`, ancla 75×75 y un bucle de 121 fotogramas.

El módulo descargado es la respuesta pública actual a una ruta declarada por el cliente archivado. No se ha demostrado que sus bytes sean idénticos a los servidos en la fecha del gameplay. La inspección es estática, no una salida nueva de REA; la limitación del CLI sigue documentada en v0.199.

## Integración y prueba

Se conserva el recurso original, su animación, la escala local previa de 0.65 y su posición en la capa anterior a personajes/objetos. La transformación adicional se aplica alrededor de la posición del objetivo y se restaura después de dibujar; no afecta a otros FX. El dibujo de respaldo usa el mismo plano cuando los recursos todavía no están listos. No cambian objetivos, colisiones, combate ni partidas.

- `npm run test:objective-motion`: aprobado en Chrome a 640×360. Tras comprobar la flecha distante, el bot se acerca caminando al tablón. Se registran las matrices de las llamadas reales a `drawImage` del FX72 y se verifica el cociente vertical/horizontal de 0.7071, con tolerancia de 1e-5.
- El mismo recorrido incluye tutorial, rescate/reanudación, aldea y emotes sin excepciones.
- `npm run check`: sintaxis válida en 87 archivos.
- [Traza Canvas](validation-v205/objective-motion.json) y [captura inspeccionada del marcador](validation-v205/objective-ground.png).

## Pendientes

La cámara 2D local no reproduce el cambio de tamaño por profundidad del original ni sus matrices de perspectiva. La escala absoluta de 0.65 permanece aproximada. Este cambio corrige la orientación del plano, pero no cierra la fidelidad completa del marcador o la cámara. La estimación global permanece en 47%.
