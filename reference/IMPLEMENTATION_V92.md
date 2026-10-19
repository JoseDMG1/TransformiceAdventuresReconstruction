# Desarrollo local v0.92: trampas del Chef

## Evidencia

Se reutilizan los textos originales españoles: habilidad1010, dones11201/11202/11203/11204 y talentos37–42. La evidencia REA retenida y sus límites están en `REA_COOK_CARDS.md`. El cliente original no proporciona las fórmulas completas de servidor; las cantidades de daño, radios y tiempos no explícitos siguen siendo locales.

## Correcciones

- Activación manual,11204, esperaba una orden manual pero todavía admitía el disparo por contacto normal. Ahora la trampa armada conserva su estado hasta recibir E cerca. La orden se vuelve a validar con el mismo criterio de armado usado por la simulación y la indicación de interacción.
- Gatillo oxidado,11203, describe dos segundos configurada sin activarse. El reloj local ahora parte de la colocación, evitando añadir el retraso de armado a esos dos segundos. El instante exacto de inicio del contador no se recuperó del servidor; esta es la interpretación local del texto.
- El talento de paciencia cuenta el tiempo sin dispararse desde la colocación. Trampa mortal conserva el requisito de otra trampa distinta en menos de dos segundos; rearmar la misma trampa no la convierte en una distinta.
- Trauma conserva el número completo de tramos de movimiento atravesados, en vez de infligir un solo pulso y descartar el resto de la distancia. El tramo30px, duración4s y daño8 son parámetros locales.

## Arquitectura y ayuda

`traps.js` reúne parámetros y funciones de armado, daño y movimiento. La creación de trampas y el ciclo del juego usan ese módulo. La petición manual sigue en el controlador de interacción; la simulación decide cuándo ejecutarla.

Las instrucciones de habilidad se adaptan a Activación manual y Portada. Se reutilizan en HUD, ranura secundaria y Trabajos. Las descripciones base continúan explicando la habilidad sin dones; el texto de control aclara las modificaciones activas.

Se mantiene la resolución local de aturdimiento de la trampa, respaldada por el talento38 que aumenta ese estado; la descripción base habla de inmovilización. No se afirma haber resuelto la diferencia de traducciones ni la semántica completa de servidor.

## Estado

`npm run check`: sintaxis correcta en61 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. No cambia el formato de partida13 ni se implementa online.
