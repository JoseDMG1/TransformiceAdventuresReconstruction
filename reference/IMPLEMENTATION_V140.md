# Implementación v0.140

Se añadió el erizo original (criatura ID 5, `monstre/herisson1/`) a los encuentros locales. El video lo muestra como un enemigo pequeño gris y espinoso junto al escarabajo grande en `frame-0300.jpg` y `frame-1020.jpg`; el artefacto recuperado confirma para ID 5 clips `statique`, `course`, `attaque1`, `incantation` y `mort`. El renderer ya tenía el clip y sus 29 imágenes recuperadas.

El tipo aparece en una posición de cada cuatro enemigos de oleada y reemplaza a uno de los dos acompañantes araña del jefe. Usa el ataque cuerpo a cuerpo común del simulador. La selección del tipo y su presencia cerca del jefe se basan en la evidencia visual; salud, alcance, daño, frecuencia de ataque, moneda/XP y la composición exacta de las oleadas siguen siendo aproximaciones locales. No se presenta como una especie de jefe ni se le atribuye un patrón especial no confirmado.

Se añadió `hedgehog` al validador de enemigos guardados. El formato y la clave de guardado no cambian; las partidas existentes mantienen sus tipos y estado.

No se ejecutaron pruebas ni recorrido de navegador. La comparación visual del erizo en el juego local queda pendiente.
