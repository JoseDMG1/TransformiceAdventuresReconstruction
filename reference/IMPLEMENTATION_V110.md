# Implementacion v0.110

Fecha: 2026-10-17

## Interrupcion del arco al moverse

El cliente asigna al arco `interruptableEnDeplacement = true`. Al comenzar a moverse, el cliente activa la interrupcion del arma. En local, el movimiento ahora cancela la carga y tambien la espera de150 ms posterior a soltar, siempre que la flecha no se haya disparado. Al cancelar se detiene `arc1`, se limpia el clip y se libera el reloj de ataque; el bloqueo de activacion de350 ms permanece.

## Mira original ausente

`ArmeArc.js` carga `interface/zone/zl.png`, la coloca en el suelo, la orienta al cursor, usa mezcla aditiva y aumenta su opacidad durante la carga. El recurso no aparece en los archivos locales recuperados (`rg --files` no encontro `zl.png`), por lo que se deja pendiente su recuperacion en lugar de imitarlo con un dibujo inventado.

## Fuentes y archivos

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeArc.js`: flag de interrupcion y bucle de apuntado/mira.
- `dist/game.js`: interrupcion local y estado de ataque transitorio.
- `package.json`, `HANDOFF.md`: version y lista de pendientes.

## Validacion

`npm run check` correcto en69 archivos. No se ejecuto el juego ni un recorrido de navegador.
