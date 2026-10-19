# Implementacion v0.108

Fecha: 2026-10-17

## Arco: carga, cancelacion y disparo

Se implemento el ciclo de carga observable en el cliente archivado `ArmeArc.js`:

- Al mantener el ataque, se reproduce `arc1` y el raton usa `arc_charge`.
- La carga local completa su fase de preparacion (duracion provisional configurada en `combat.js`).
- Soltar antes de terminarla interrumpe el arco, detiene `arc1` y no crea un proyectil.
- Soltar despues de cargar reproduce `arc2`; tras la espera original de150 ms se resuelve el impacto, suena `arc0` y se reproduce `arc_tir` por41 fotogramas a60 fps.
- El control por teclado usa J y comparte la liberacion de carga con el raton.
- Se impide comenzar una segunda accion mientras exista una accion de arma activa.

La duracion exacta de carga sigue siendo provisional: el cliente la recibe mediante datos del servidor y no aparece como una constante en el artefacto estatico recuperado. El gasto/recuperacion de municion y el dano siguen las reglas locales actuales. No se modifica el guardado ni se agrega funcionalidad online.

## Fuentes

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeArc.js`: carga mientras el clic continua, interrupcion al soltar antes de estar listo, espera de150 ms antes del disparo, sonidos `arc1`, `arc2`, `arc0` y animacion de41 fotogramas.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`: ciclo generico de estados, rechazo de activacion dentro de350 ms y lectura de `tempsIncantation`.

## Archivos

- `dist/game.js`: ciclo local de entrada, estado transitorio del arco, sonidos, impacto y animacion.
- `package.json`: version del proyecto.
- `HANDOFF.md`: historial reciente y estado actual.

## Validacion

Se ejecuto `npm run check` para revisar sintaxis. No se inicio el juego ni se ejecuto un recorrido de navegador.
