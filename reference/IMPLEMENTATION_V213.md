# v0.213 — composición del tutorial a partir del video

La captura inicial muestra un bosque enmarcado por troncos, masas de hojas redondeadas y flores, suelo irregular, un tronco horizontal y una mascota caída a la derecha del jugador. La reconstrucción mostraba árboles aleatorios de copa redonda en primer plano, manchas elípticas, vegetación escasa y una separación menor respecto a Picpic.

Se extrajeron seis fotogramas adicionales del MP4 sin modificarlo: 0, 5, 35, 60, 120 y 180 s. `npm run reference:frames -- 0 5 35 60 120 180` permite repetir la extracción mediante Chrome y las APIs de video del navegador. El registro está en `comparison-frames/last-extraction.json`. Son capturas del video aportado, no imágenes generadas.

## Cambios

- `tutorial-layout.js` concentra los hitos dibujados del comienzo: troncos superiores, tocón, tronco caído, roca, rama y macizos vegetales.
- `tutorial-flora.js` dibuja hojas redondeadas sobre tallos y grupos de flores blancas/moradas, con variación determinista independiente de la semilla del mundo.
- `tutorial-art.js` sustituye las manchas suaves por contornos irregulares de suelo/césped; añade una representación estática de la criatura azul de tiro visible junto al carro a 60 s. No se asocia esa figura con un ID de criatura original ni se afirma haber recuperado su arte o animación.
- La veta del tronco caído sigue su eje horizontal, como la referencia, y añade un nudo visible.
- Las exclusiones de decoración procedural despejan el área compuesta. Se conservan el consumo aleatorio y las colocaciones exteriores; los dibujos nuevos son decorativos y no introducen colisiones inferidas del video.
- `MAPS.tutorial.petSpawn` fija el inicio nuevo en (736,682). Con cámara (480,650) y escala 0,5 corresponde aproximadamente a (448,196), donde aparece la mascota en el fotograma 0. La colocación anterior (620,630) la mostraba cerca de (390,170). Al reanudar, las coordenadas de la mascota se recuperan del guardado existente.
- Se retiran el anillo FX72 y la etiqueta local «necesita ayuda» del rescate inicial: los primeros fotogramas muestran una barra vacía sobre la mascota. Las instrucciones y la curación siguen disponibles.

Estas son reconstrucciones dibujadas y posiciones inferidas de imágenes. La inspección del cliente original sigue sin aportar sectores de mapa ni una asociación de la criatura de tiro. No se presenta el trabajo como una salida nueva de herramientas REA.

## Comparación y límites

El [comparador de imágenes](TUTORIAL_COMPARISON_V213.html) permite ver original/local lado a lado y superpuestos. [Inicio original](comparison-frames/frame-0.png), [inicio local](validation-v213/640/tutorial-start.png), [Papaille original](comparison-frames/frame-60.png), [Papaille local](validation-v213/640/papaille.png).

Persisten diferencias de dibujo, paleta, densidad, proporción de tocones, apariencia de Papaille, equipo, cámara en perspectiva y distribución del tramo final. El comparador muestra estados parecidos; no prueba igualdad de poses, instante o coordenadas. Falta seguir referencias intermedias para asociar sin ambigüedad elementos repetidos del escenario. No se modificaron las coordenadas del jugador ni de Papaille.

## Validación

- `npm run test:maps`: aprobado para tres semillas. Filtra únicamente objetos generados y sus colisiones correspondientes; comprueba que el resto de la geometría se conserve, incluidas las colocaciones fijas.
- `npm run test:quests`: 10 pruebas aprobadas, incluida ausencia del marcador de navegación en el rescate inicial.
- Tutorial nuevo, curación con venda, recarga tras rescate, diálogo con Papaille y retorno a la aldea aprobados en Chrome a 640×360. La captura de inicio espera a que terminen los avisos.
- El mismo recorrido también pasó a 1280×800; [inicio](validation-v213/1280/tutorial-start.png) y [Papaille](validation-v213/1280/papaille.png). `npm test`: 39 pruebas aprobadas. `npm run check`: sintaxis correcta en 103 archivos.
- El guion de movimiento ahora espera acercarse realmente a Picpic mediante teclado, en vez de suponer una distancia tras 560 ms. Una primera ejecución avanzó 58,55 píxeles y falló un umbral de 60 durante la preparación de dibujos; se corrigió la espera del guion sin cambiar la velocidad del juego.

El formato de guardado se mantiene en v13; no se reinicia el progreso. La estimación de fidelidad se conserva provisional en 47% hasta el cotejo global.

## Corrección v0.213.1

La pasada de expedición encontró `drawClearingGrass is not defined` al construir el bosque. La importación se había retirado al sustituir el suelo del tutorial, aunque otra rama de `makeGround` seguía utilizándola. Se restauró la importación. Una prueba nueva crea ambas rutas completas (3 y 7 encuentros), comprueba sus dimensiones y todas las variantes de suelo: reprodujo el fallo antes de restaurar la importación. No se altera el guardado ni el balance. El recorrido de navegador se repite después de la corrección.
