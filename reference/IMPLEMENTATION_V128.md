# Implementacion v0.128

El cliente original actualiza la orientacion durante el desplazamiento solo cuando la componente horizontal de la direccion supera `0.1` (`cos(angle) < -0.1` para mirar a la izquierda, `> 0.1` para la derecha). La reconstruccion usaba un signo simple, de modo que cualquier minima diferencia horizontal podia girar al raton, al enemigo o a Picpic durante un movimiento casi vertical.

Se centralizo el umbral normalizado en `faceFromVector()` para el raton, enemigos, aliados moviles y orientacion de ataques. Picpic aplica el mismo umbral al seguir al jugador. Si la direccion es casi vertical, conserva su orientacion previa. No se modifica la navegacion, las trayectorias, la seleccion de objetivo ni los datos guardados.

Evidencia: `reference/original-data/MobileADV-2021.js`, bucle de movimiento alrededor de las lineas 537-572, en particular las comparaciones de `puissanceX` con `-0.1` y `0.1`.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
