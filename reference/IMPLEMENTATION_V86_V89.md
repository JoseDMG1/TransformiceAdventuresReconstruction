# Desarrollo local v0.86–v0.89

## v0.86: Desaparición y atribución

El catálogo original español conserva `original-10108`, Polvo vampírico: el daño infligido durante el efecto cura al jugador. Antes solo se aceptaba la fuente `player`, mientras que áreas, venenos y habilidades usan otras fuentes. Como el ataque físico termina la invisibilidad antes del daño, el don podía no activarse en las situaciones disponibles.

`damage-effects.js` identifica las fuentes producidas por ataques, áreas y habilidades propias. La curación solo ocurre mientras la invisibilidad sigue activa y sobre el daño efectivo, limitado a la vida restante del enemigo. La mascota y las fuentes desconocidas se excluyen. El reflejo de corazones del jugador se distingue del de la mascota. La atribución de daño de invocaciones como daño propio es una regla local; el texto no resuelve expresamente todos esos casos. El coeficiente de 20% sigue siendo balance local, no una cifra recuperada.

La sorpresa cuerpo a cuerpo ya no se almacena en un estado del jugador que podía quedar pendiente al fallar. Se resuelve dentro del golpe, como ya ocurría con la marca propia del proyectil de arco. Se elimina del validador el antiguo estado global, sin cambiar el formato de partida. El golpe adicional de la mascota se atribuye a `pet` en ambos casos.

## v0.87: asignaciones visuales

La inspección de los recursos `fx/cartes/carte1.png`, `carte3.png` y `carte4.png` muestra picas, tréboles y diamantes respectivamente. Los registros de `effects.json` los vinculan a 41,43,44. El diamante usaba erróneamente 43 y se veía como trébol. El trébol ofensivo usaba 41. Se añade el catálogo `effect-data.js` y se corrigen ambas asignaciones; los sprites originales siguen siendo los proyectiles, no los efectos de impacto.

La investigación REA de objetivos de v0.83 identifica FX72 como marcador de objetivo. Entrevista lo utilizaba como aura y como aparición, produciendo un marcador de misión dentro de una habilidad. Ahora su zona conserva el círculo local y al activar usa el recurso de desaparición de testimonio FX51. Esta selección visual es local, respaldada por el nombre y contenido del recurso; no se afirma que reproduzca el evento exacto de servidor.

## v0.88: entidades persistentes

El validador ya admitía señuelos y tornados, pero la captura de partida los excluía. `effect-state.js` comparte una sola lista entre captura y validación. Se conservan salud, posición y temporizadores mediante los campos ya existentes, además de los colores correspondientes. La versión de guardado permanece en 13 y no se altera la clave del navegador.

## v0.89: indicadores sobre vegetación

El fotograma `gameplay-frames/frame-0720.jpg`, documentado en `VIDEO_MECHANICS_V12.md`, muestra que el tronco puede ocultar al personaje mientras vida y estados siguen visibles. `actor-overlays.js` separa esas indicaciones de los sprites. Se pintan después de las entidades y la vegetación, con barras para jugador y mascota y símbolos para estados realmente activos. Se evitan las barras antiguas duplicadas de Picpic dentro del renderer del sprite. No cambia la colisión ni la transparencia de los troncos.

Las dimensiones, símbolos, posición y colores de esta capa son locales. La observación establece la separación visual, no todos sus parámetros ni el significado exacto de cada icono verde del vídeo.

## Comprobaciones y pendientes

`npm run check`: sintaxis correcta en 55 archivos. No se añadieron ni ejecutaron pruebas de comportamiento en este lote. El último recorrido enfocado de Chrome corresponde a v0.81; hace falta comprobar en ejecución las incorporaciones posteriores.

Siguen pendientes los sectores originales, la cadena completa de misiones, las tablas y reglas de servidor y el contraste de todas las combinaciones de dones. La semántica precisa de mitigación del don1201 continúa sin evidencia suficiente. Online excluido.
