# Desarrollo local v0.95: venenos y combinaciones

## Evidencia reutilizada

El catálogo español describe:1101, daño de veneno instantáneo;1106, conversión a relámpago;1107, aumento del último pulso;13009, daño del trébol diferido como veneno; talento11, aumento del impacto contra enemigos no envenenados. Se reutiliza la evidencia de artefactos de `REA_WEAPON_TRACE.md` y `TRANSLATION_RECOVERY.md`, sin atribuir a esos análisis una tabla de daño del servidor.

## Último pulso e instantáneo

La combinación instantánea multiplicaba los cinco pulsos por la mejora del último. Ahora suma cuatro pulsos normales y uno mejorado: con daño base2 y mejora100%, el total local pasa de20 incorrectos a12, equivalente al total de la versión periódica sin otros modificadores. El daño inicial del golpe se mantiene separado y la porción convertida conserva su fuente de relámpago cuando corresponde.

`tickWeaponPoison` conserva el sobrante de tiempo entre fotogramas, en lugar de reiniciar el reloj a1s después de cada pulso. Procesa los pulsos debidos hasta el límite del estado y aplica la mejora solo al último. Un veneno nuevo no hereda el reloj residual de otro ya expirado.

Cinco segundos, intervalo1s, máximos de acumulación y porcentajes siguen siendo balance local. El orden de resolución de dones combinados no fue recuperado del servidor.

## Canales independientes

El veneno del trébol usaba los campos de la daga y borraba sus acumulaciones o la conversión a relámpago; un golpe posterior de daga también borraba el daño de la carta. Ahora las cartas mantienen una lista propia de dosis. `damage-over-time.js` comparte la implementación de esas listas con flechas, conservando sus estados independientes y el formato introducido en v0.94.

Al aplicar una daga sobre un estado antiguo de veneno sin marca de daga ni relámpago, sus pulsos pendientes pasan al canal separado antes de escribir el veneno nuevo. Se conserva el daño residual sin afirmar que se ha identificado su origen original: versiones anteriores compartían esos campos entre varias habilidades.

Colmillo feroz consulta todos los canales activos: arma, plantas, reportaje, flechas y cartas. Antes solo consultaba el campo genérico de arma y podía tratar como no envenenado a un enemigo con otro veneno activo.

La acumulación independiente por dosis es una regla local de conservación de impactos, no una recuperación de las reglas exactas de acumulación originales. Se mantienen los límites de32 dosis y4 pulsos descritos en v0.94. Las listas se validan y guardan en el formato13.

## Estado

Sintaxis revisada en64 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. Online excluido y fidelidad completa aún no alcanzada.
