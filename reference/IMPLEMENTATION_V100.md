# Desarrollo local v0.100: impactos de área

## Evidencia y alcance

El don10109 describe un señuelo sin ataques que puede ser objetivo de enemigos. El don10208 describe espinas que aparecen al destruir una planta. Se reutilizan el catálogo español y la evidencia REA retenida. El cliente original delega la resolución de daño al servidor: no se presenta esta corrección del simulador como recuperación de su geometría o secuencia exacta.

## Correcciones

- Los ataques normales dañaban directamente al señuelo y luego volvían a incluirlo en el daño a invocaciones. Ahora cada actor recibe una sola resolución de ese impacto.
- La presencia de un señuelo dentro del área suprimía el daño al jugador cercano, incluso en una carga. La selección de objetivo sigue favoreciendo al señuelo; el área liberada comprueba la posición de cada actor. Esta resolución espacial es local y no una regla de inmunidad recuperada.
- El bucle recorría la lista mutable de efectos. Al destruir una planta con Malas hierbas, las espinas recién añadidas podían entrar en el mismo bucle y recibir el golpe original. Se toma una lista fija de invocaciones antes de aplicar ese daño.
- `hurtSummon` rechaza objetivos sin vida o duración, evitando restaurar accidentalmente40 puntos mediante el antiguo valor de respaldo si llegaba otro impacto sobre un objetivo ya destruido.

## Arquitectura

`isDamageableSummon` y `summonsInArea` en `enemy-targets.js` separan la elegibilidad y la consulta espacial. `enemyAreaHit` coordina al jugador, la mascota y las invocaciones para ataques normales y cargas. Se mantienen radios y tolerancias anteriores como parámetros locales; los proyectiles continúan con su resolución de contacto independiente.

## Estado

`npm run check`: sintaxis correcta en68 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. Sin cambio de formato de partida y online excluido. La reconstrucción continúa parcial.
