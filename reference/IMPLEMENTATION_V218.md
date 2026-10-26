# v0.218 — armas y cargas sobre el personaje

`ArmeADV.recupClipIcone` declara el fondo y `interface/arme/a{type}.png`; `OutilsArmeADV.indexArme` asocia los tipos 1–6 con espada, espada de dos manos, daga, escudo, arco y venda. Se recuperaron esas siete imágenes de 36×36 desde sus rutas declaradas. El manifiesto conserva URL, dimensiones, bytes, SHA-256 y hashes de las dos fuentes archivadas. Recuperación reproducible: `npm run recover:weapon-overlays`.

`weapon-overlay-art.js` dibuja fondo, cargas e icono en ese orden. Los segmentos usan radios 18/13, espacio π/20, verde `#00e069` y borde negro al 70%, conforme a `ArmeADV.majClipCharge`. Al consumir una carga se desvanece y crece hasta 1,5; al recuperarla aparece desde escala 0,5. El suavizado adapta el factor original 0,2 a tiempo transcurrido. Las curvas se dibujan mediante arcos Canvas equivalentes a los pequeños segmentos del original.

Se mantienen los desplazamientos originales: primera arma en (-38,+15) respecto al centro superior de la barra; segunda a +40. Todo comparte la escala local de salud de 0,64, que sigue siendo una adaptación. El arma secundaria se oculta cuando la principal ocupa ambas manos. El estado de animación vive en un WeakMap asociado al actor; no se añade a las partidas.

Las cargas se leen de la simulación actual, incluyendo talentos y regalos. No se modifican capacidades, tiempos ni equipamiento inicial: esos valores del servidor siguen sin recuperarse. El tinte naranja está soportado por el dibujante, pero no se inventan bloqueos del servidor para activarlo. Tampoco se afirma que el equipo inicial del vídeo corresponda al equipo local.

## Comprobación

`npm run test:weapon-overlays` recorre el tutorial y comprueba trazas reales de Canvas de espada/venda, dimensiones, escala y cuatro cargas iniciales. Ataca con teclado, verifica consumo real, tres segmentos visibles y recuperación posterior a cuatro. Las capturas y el informe se conservan en `validation-v218/` después de aprobar la ejecución.

Pendientes: cotejo visual de cada equipamiento con el vídeo, bloqueos/sobrecarga del servidor, alturas exactas por actor e iconos de síntomas. La recuperación es inspección estática y descarga de rutas declaradas; no constituye una nueva salida de herramientas REA.

Resultado: aprobado en Chrome a 640×360 y 1280×800. La comprobación de barras/nombres de v217 también aprueba a 1280×800. Sin excepciones de ejecución. Sintaxis correcta de los 119 archivos de la entrega.
