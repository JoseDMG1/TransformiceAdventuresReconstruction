# v0.217 — texturas originales de salud y nombres

Se siguió el import literal de `MobileADV-2021.js` hasta [ClipNomADV.js](https://transformice-adventures.com/dist/Transformice-adventure-client/src/_monde/_mobile/types/ClipNomADV.js). La copia recuperada declara barras de 100×10, fondo con alfa 0,8, marco en (-2,-2), relleno en mosaico y los tintes verde `#62ca57`, amarillo `#ffea00` y azul `#669bca` para jugador, enemigo y aliado.

Las seis rutas literales respondieron HTTP 200 y viven en `dist/assets/original/interface/actor-overlays/`:

| Archivo | Dimensiones | Uso actual |
| --- | --- | --- |
| `fv.png` | 100×10 | Fondo |
| `c.png` | 104×14 | Marco |
| `v6.png` | 50×12 | Relleno tintado y repetido |
| `tv.png` | 8×14 | Recuperado; halo pendiente |
| `vv.png` | 18×12 | Recuperado; estados de múltiples barras pendientes |
| `allie-mort.png` | 110×50 | Recuperado; aviso de jugador caído pendiente |

El manifiesto incluye URLs, dimensiones, bytes y SHA-256; la clase tiene registro independiente. `npm run recover:actor-overlays` repite la recuperación. No se ejecutó el cliente archivado ni se generó una nueva salida de herramientas REA.

## Presentación

Jugador y mascota utilizan ahora las tres texturas de salud. El relleno conserva el patrón y se tiñe con los colores originales. Los anchos locales de 64 unidades y las alturas respecto a los actores son adaptaciones para la proyección ortográfica y el fotograma inicial: no se recuperó `hauteurClipNom`, que el original recibía por protocolo. El jugador conserva la barra en la aldea, como se observa en 03:00; la mascota sana se oculta allí.

Los nombres de NPC usan el azul `#6c99d6`, fuente de respaldo Verdana y borde negro de `ClipNomADV.styleNomPNJ`. Se aplica una escala local de 0,8 al tamaño original de 24 y al borde de 5, conservando la colocación local. La fuente personalizada `police-nom` y la escala/altura exacta de cada actor siguen sin recuperarse.

`actor-overlay-art.js` separa estos recursos de la simulación y `actor-overlays.js` conserva la composición de datos/estados. La inicialización espera los recursos, y mantiene un dibujo básico de respaldo si no cargan. La caché de patrones está acotada. No cambian daño, curación, balance ni partidas.

## Validación y pendientes

- `npm run test:actor-overlays`: aprobado en Chrome a 640×360. Instrumenta llamadas reales de Canvas al marco original, sus dimensiones 104×14 y transformación; comprueba fuente, color y borde del nombre de Papaille. Incluye tutorial/reanudación, emotes y acceso a los tres NPC de aldea.
- [Inicio del tutorial](validation-v217/640/tutorial-start.png), [Papaille](validation-v217/640/papaille.png), [plaza](validation-v217/640/village-board-reference.png) y [traza Canvas](validation-v217/640/actor-overlays.json).

Faltan las animaciones de salud diferida y halo, la integración del mismo sistema para enemigos, los iconos de armas/cargas bajo la barra y la asociación de síntomas del servidor. Los recursos recuperados no prueban por sí solos la equivalencia de esos estados. La fidelidad global continúa pendiente de cotejo completo.

La misma prueba también aprobó a 1280×800. El cotejo admite 1e-6 de redondeo en la matriz Canvas (float32); no modifica la escala esperada. Capturas y trazas en validation-v217/1280. Sintaxis: 116 archivos correctos.
