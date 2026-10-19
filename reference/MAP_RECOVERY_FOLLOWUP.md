# Seguimiento de recuperación de mapas

Se siguió el flujo de REA desde la evidencia estática conservada `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`: imports concretos → índice local Wayback → recuperación de URLs explícitas → lectura inerte del formato. No se ejecutó el cliente original ni se contactó el socket de gameplay. Los archivos nuevos aquí se leyeron como texto; no se atribuye un nuevo Evidence ID de REA a esa lectura.

## Resultado concreto

Se recuperaron módulos originales adicionales desde URLs literales del índice `wayback-assets.json`. `map-followup/downloads.json` conserva las URLs, estado HTTP, tamaño y SHA-256.

- `map-followup/0-ClipAnim.js`: 83,896 bytes, SHA-256 `879c5637bb57c9fd6c3c04cbc1930a2698d09f820f77c880ff98060ecd947ddc`, captura exacta `20210321081600`.
- `map-followup/1-Look.js`: 1,984 bytes, SHA-256 `06da70c1db067a41d947bf8a127b25421f7c40dd00f948c3857480e80650ba2f`, captura exacta `20210321081602`.
- `map-followup/2-MondeADV.js`: 104,104 bytes, SHA-256 `c4d04c42fcd5b90b9392bf34d2971d1619095602a5d1495f0abdf4f9021c3ce7`, idéntico al módulo de 2021 recuperado previamente. La cifra menor del índice es tamaño archivado, no prueba de una versión de código diferente.
- `map-followup/3-ClipAnim.js`: descarga de la ruta pública actual explícita del import; idéntica en bytes a la captura archivada anterior.

Las fuentes nuevas no contienen nombres concretos adicionales de árboles, edificios o superficies de las escenas. El bloqueo sigue siendo la ausencia de payloads de servidor, no la ausencia del deserializador.

## Formato corroborado por fuente original

`0-ClipAnim.js:1014–1081`: el registro comienza por uint16 descartado y un byte de tipo. `I` (73) lleva string de imagen y ancla opcional con dos int32/1000. `A` (65) lleva fuente local opcional, bool de bucle y uint16 de animaciones. `C` (67) lleva fuente opcional, uint8 de hijos y pares nombre/clip. `#` (35) lleva nombre de cache y clona `indexCacheClipAnim[nombre]`; no construye ni descarga automáticamente un archivo HTTP a partir de ese nombre.

`ProtoADV.js:835–844` muestra que `C_CACHE_PICTO` descomprime bytes suministrados por protocolo y registra clips por nombre. `C_DONNEE_SECTEUR` entrega a `donneeSecteur` los registros aplat/mobile directamente. En `2-MondeADV.js:243–254`, `C_MONDE` lleva color de fondo y segmentos de colisión: uint16 de segmentos, cada uno con int32 de ID y cuatro int16 de coordenadas. Ninguno contiene una URL de paquete de mapa.

`2-MondeADV.js:256–298` añade opciones por protocolo: spawn float32×2, color de fondo, iluminación, rectángulos de luz, color de dosel, color y velocidades de agua, lista de música. `donneeSecteur:299–313` vuelve a confirmar uint16 de aplats y uint16 de mobiles seguidos de sus registros. Los IDs espaciales calculados localmente no son IDs de archivos descargables.

## Implicación para el orden de dibujo local

La fuente original permite distinguir dos rutas de render relevantes:

- `MondeADV-2021.js:1002` agrega los móviles a una cola de clasificación; `trierMobile` compara su posición Y y la inserta ordenadamente (`recupIndexTriage`, cerca de la línea 660). El `entities.sort((a, b) => a.y - b.y)` de `dist/game.js` sigue esa regla para actores y decoraciones verticales locales. No se encontró razón para reemplazar esa clasificación.
- Los `AplatADV` se separan de los móviles. `MondeADV-2021.js:241` crea las capas de agua y suelo y las añade a la cámara; `afficherAplat`, líneas 1323–1350, envía capa 1 al agua y las demás al suelo. En ambas capas ordena mediante el `indexTriage` entregado en el payload, no por Y. `AplatADV-2021.js:49–58` lee ese índice y la capa.

La reconstrucción rasteriza el terreno y el agua en el canvas de suelo y dibuja sus objetos verticales en la lista con orden Y. Sin el payload de sector no puede identificarse de forma fiable cuáles de las plantas/rocas reconstruidas corresponderían a `AplatADV`, cuál sería su capa 0/1, ni su `indexTriage`. Por eso, no se reclasifican ahora los dibujos locales como objetos planos: la regla estática está recuperada, pero faltan los datos que determinan su aplicación a cada objeto. Es una limitación visual pendiente, no una discrepancia demostrada del actual orden Y de personajes.

## Hallazgo adicional para ropa

`0-ClipAnim.js:473–485` confirma composición por slot: primera pieza como sprite con su pivote; las siguientes como hijos con pivote relativo `pieza - primeraPieza`. En coordenadas de dibujo esto equivale a dibujar cada imagen con su propio pivote original, como hace la reconstrucción Canvas.

`1-Look.js:11–28` muestra que el servidor entrega directamente slots y listas ordenadas de piezas, cada una con código y pivotes int16 con signo. `ElementLook:40–52` usa int8 **con signo** tanto para orden del conjunto como de cada pieza. Hasta v0.145, `recover-assets-data.mjs` guardaba esos dos campos como uint8 en `animation-metadata.json`; v0.146 cambia esas lecturas a int8 y normaliza los ocho bytes históricos altos de los códigos 33 y 41 a -100 y -90. `original-animation.js` mantiene normalización compatible con los metadatos previos sin signo. La suma de profundidades implementada localmente sigue siendo una elección de reconstrucción; el orden final del Look original llega ya resuelto desde el servidor.

## Estado y siguiente evidencia necesaria

Preguntas de formato, fuente de rutas y distinción cache/archivo: respondidas estáticamente. Recuperación de árboles/edificios, posiciones y colisiones originales: bloqueada para las fuentes inspeccionadas. Serían útiles cuerpos retenidos de `0x8070`, `0x8078` o `0x8802`, exports del editor o archivos del servidor original. No se encontraron esas fuentes en el índice y módulos leídos; eso no demuestra que no existan en otros archivos públicos.

El vídeo permite reconstruir visualmente el recorrido y geometría observados. Esta investigación no justifica presentar mapas trazados desde el vídeo como recuperación de paquetes originales. No se efectuaron barridos de IDs, nombres adivinados ni tests.
