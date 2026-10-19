# Desarrollo local v0.94: efectos de flechas

## Evidencia reutilizada

Flecha envenenada, don1408 del catálogo español, aumenta el daño y lo inflige con el tiempo. El talento23 describe que la mascota puede devolver flechas. `REA_WEAPON_TRACE.md` conserva la evidencia del ciclo de armas y el umbral de activación. No se recuperaron del servidor las reglas exactas de acumulación ni las probabilidades; se mantienen explícitamente como reconstrucción local.

## Daño diferido

Antes cada flecha reemplazaba el daño pendiente y reiniciaba el reloj a1s. Una secuencia rápida podía impedir los pulsos y descartar casi todo el daño de los primeros impactos.

`archery.js` registra cada impacto como una dosis de cuatro pulsos con intervalo1s. Cada dosis conserva su propio reloj y el daño que le corresponde. No inflige además el impacto completo al aplicar el veneno. Los modificadores de daño recibido se resuelven cuando ocurre cada pulso; el presupuesto guardado es previo a esos modificadores.

La acumulación independiente es una regla local para conservar los impactos, no una tabla de servidor recuperada. Se mantiene el aumento local25% del don. Hay un límite de32 dosis por enemigo para acotar el estado; al alcanzarlo, un impacto adicional se incorpora a la última dosis conservando su daño pendiente, aunque puede cambiar su distribución temporal. La cadencia local normal queda por debajo de ese límite en4s.

## Guardado

El normalizador convierte `arrowPoison`, `arrowTick` y `arrowDamage` de una partida anterior a los pulsos que aún quedan. Las partidas nuevas guardan `arrowPoisons` con daño, cantidad de pulsos y reloj. No se procesa simultáneamente el estado antiguo, evitando duplicación. Formato13 y clave de partida conservados.

La instantánea de diagnóstico informa de dosis y daño base pendiente sin permitir modificar el juego.

## Recuperación de flechas

Una flecha perforante o con rebotes podía intentar recuperar una carga por cada enemigo alcanzado. `tryReturnArrow` toma una única decisión por proyectil. La probabilidad se mantiene como parámetro local del talento. Su marca se guarda; una flecha antigua que ya tiene impactos registrados se considera revisada para evitar una repetición al recargar.

## Estado

Revisión de integración y sintaxis;62 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. La reconstrucción continúa parcial y online excluido.
