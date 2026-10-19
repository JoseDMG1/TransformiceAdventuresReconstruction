# Desarrollo local v0.104: sincronizacion de anticipaciones enemigas

## Evidencia

Los clips recuperados de las criaturas tienen estados de ataque no repetibles. Sus duraciones varian: avispa88 fotogramas; rana34; escarabajo/araña53. El juego local reinicia el temporizador `telegraph` cuando cada enemigo empieza a preparar el ataque, pero dibujaba `attaque1` con el reloj global de la partida. Eso podia mostrar el clip a mitad o al final desde el primer fotograma de anticipacion.

## Cambio

- La animacion de anticipacion ahora usa el tiempo transcurrido desde `rules.telegraph - e.telegraph`, de modo que empieza al iniciar el aviso.
- La preparacion y el salto de la rana usan tambien su tiempo local de carga.
- No se modifican tiempos, ataques, dano, movimiento ni persistencia. Las duraciones del cliente local siguen siendo provisionales.

## Comprobacion y limites

`npm run check` revisa sintaxis. No se ejecutaron pruebas de comportamiento ni un recorrido de navegador. Los clips originales respaldan estados y duraciones visuales; no revelan el balance ni el momento exacto de impacto del servidor. Online sigue excluido.
