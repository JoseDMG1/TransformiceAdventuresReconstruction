# Versión local 0.3 — armas, manos y preparación del golpe

Fecha: 2026-10-16. Desarrollo individual para navegador, manteniendo partidas anteriores.

## Evidencia y límites

El análisis REA previo conserva los módulos originales de armas. `ArmeDague.js` activa una animación de ataque y concluye el golpe cuerpo a cuerpo al desactivarse. `ArmeBouclier.js` activa la parada y la finaliza al soltar el clic. `ClavierADV.js` asigna clic izquierdo/derecho a manos distintas e interrumpe una mano al usar la otra. Las animaciones decodificadas contienen clips de combate de una y dos manos y arco.

Esta evidencia no recupera las estadísticas del servidor. Daño, alcance, tiempos, reducción de daño frontal del 85 % y disponibilidad libre de equipo son decisiones provisionales. Tampoco se afirma que todas las combinaciones de manos y cargas de la demo estén implementadas.

## Implementación

- `dist/combat.js` concentra las cuatro armas, prepara y aplica un impacto único, y calcula alcance/arco y bloqueo frontal.
- Daga: menor alcance, ataque rápido. Espada: alcance y daño intermedios. Arco: preparación y proyectil. Espada de dos manos: mayor alcance/daño, preparación más larga, bloqueo de movimiento y mano secundaria ocupada.
- Vendas o escudo seleccionables en la aldea. Mantener H o clic derecho sostiene el escudo; soltarlo, cambiar de foco, abrir un menú o usar otra acción finaliza la parada.
- La defensa distingue la dirección del golpe/proyectil. Los ataques desde atrás no se reducen. El HUD muestra la acción secundaria equipada y resalta preparación/parada.
- La animación de ataque usa su propio tiempo y clip, en lugar del reloj global del mundo. El arma visible y escudo siguen siendo ilustraciones locales sobre el cuerpo original.

## Persistencia

Formato v3, conservando la clave de navegador usada desde v1. Se admiten documentos v1 y v2. Una partida v2 conserva la expedición y recibe vendas como secundaria predeterminada. El nuevo formato conserva arma, secundaria y ataque en curso con su bandera de impacto; no restaura una tecla de escudo mantenida.

Las importaciones que dejarían un tutorial sin acceso a la venda se normalizan para mantenerlo completable. No se modifican los archivos del video, cliente histórico ni las partidas del navegador habitual durante QA.

## Verificación

`npm run check` revisa todos los módulos, incluido combate. `npm test` cubre tres casos de geometría/tiempo de combate y ocho de persistencia/migración/validación. La prueba de Chrome recorre el juego y comprueba equipo nuevo, bloqueo de movimiento, interrupción del escudo, restricción de dos manos y exportación/importación, además del recorrido completo existente. Capturas en `.local/equipment.png` y `.local/shield.png`.
