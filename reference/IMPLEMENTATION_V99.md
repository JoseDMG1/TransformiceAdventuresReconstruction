# Desarrollo local v0.99: estados de espada

## Evidencia reutilizada

El catálogo español1005 describe ataques consecutivos de daño creciente;1008 mejora el siguiente ataque tras esperar sin atacar. El talento5 aumenta temporalmente el daño tras golpear al menos tres enemigos a la vez. Se reutilizan los artefactos y la evidencia REA de traducciones, progresión y armas conservados. El servidor no aportó sus ventanas ni sus límites exactos.

## Corrección

El reloj de cadena llegaba a cero, pero las acumulaciones continuaban en el estado. El cálculo de daño consultaba esas acumulaciones sin revisar el reloj. El primer golpe después de una pausa larga recibía el refuerzo antiguo antes de comenzar una nueva cadena.

`swordChainMultiplier` exige una ventana activa y `expireSwordChain` elimina las acumulaciones caducadas. El registro de golpes alimenta la cadena solo cuando está activo su don. Se conserva la regla local de aumentar tras un ataque que alcanza un objetivo; el texto no demuestra qué hace el original al fallar un ataque.

## Arquitectura

`swords.js` concentra la ventana3s, máximo5 acumulaciones, refuerzo6s por varios objetivos, espera3s de Balestra y bonus máximo1.5. Todas esas cifras son locales. La aplicación del daño usa esos parámetros; el refuerzo por tres enemigos afecta a ataques posteriores, conservando el orden anterior.

La validación del guardado utiliza los mismos límites para relojes, contadores y el bonus capturado por el ataque. La instantánea de diagnóstico expone la cadena, la preparación y el refuerzo sin permitir modificar el juego. No cambia la clave ni la versión del formato13.

## Estado

`npm run check`: sintaxis correcta en68 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. La reconstrucción sigue parcial; v0.99 no representa99% de fidelidad ni finalización. Online excluido.
