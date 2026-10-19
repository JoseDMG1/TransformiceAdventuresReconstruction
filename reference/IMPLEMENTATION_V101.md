# Desarrollo local v0.101: origen y debilitamiento

## Evidencia

El talento44, Decocción anestésica, reduce temporalmente el daño de los enemigos afectados por Elixir. Se reutilizan el catálogo original español y la evidencia REA de progresión/traducciones. El cliente delega combate al servidor; la secuencia exacta de modificadores no está recuperada.

## Implementación

La reducción del enemigo solo se aplicaba en el controlador de daño del jugador. Picpic, plantas y señuelos recibían el daño completo del mismo enemigo. `weakenedEnemyDamage` comparte la reducción antes de bloqueo y defensas del receptor. Cada controlador la aplica una sola vez. El porcentaje del talento y el límite80% de estado siguen siendo locales.

El controlador de proyectiles ya comprobaba el bloqueo del jugador según la velocidad del proyectil. Al proteger a un aliado, utilizaba la posición actual del atacante, que podía haberse movido desde el disparo. `projectileAttackOrigin` calcula la referencia de origen respecto al portador del escudo usando la dirección de vuelo. Se mantiene por separado la fuente enemiga para debilitamiento, reflejos y otras reacciones.

Esto conserva la interpretación local de evaluar debilitamiento en el momento del impacto. No se afirma que el servidor original evalúe ese modificador al lanzar o al impactar.

## Estado

`npm run check`: sintaxis correcta en68 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. No cambia el formato de partida y online continúa excluido. La reconstrucción permanece parcial.
