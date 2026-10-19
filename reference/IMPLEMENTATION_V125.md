# Implementacion v0.125

Fecha: 2026-10-17

## Sincronizacion visual del arco

La animacion `arc_charge` se mantiene mientras se carga y durante la espera posterior a soltar el boton. Solo al momento de lanzar el proyectil cambia a `arc_tir`; el clip avanza con el reloj desde ese evento hasta completar41 fotogramas. La carga usa el multiplicador de lectura del cliente (`2000 / tempsIncantation`), basado en la duracion local provisional. El disparo conserva su direccion, daño, demora y retroceso de camara.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeArc.js`: `arc_charge` permanece activo al llegar al fin de la carga; `arc_tir` comienza cuando `temps >= tempsTir`, despues de `TEMPS_MARGE_TIR`, y la desactivacion se fija a41 fotogramas.
- `ArmeArc.incantation()` escala la velocidad de `arc_charge` mediante `defVitesseLecture(2000 / tempsIncantation)`.
- `dist/assets/original/creatures.json`: `arc_charge` tiene205 fotogramas y `arc_tir`41.
- El servidor proporciona el tiempo de carga original; el cliente local sigue usando una duracion provisional.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
