# Implementacion v0.119

Fecha: 2026-10-17

## Ventana de golpe y pausa de movimiento cuerpo a cuerpo

Espada y daga ahora resuelven su golpe al terminar la ventana de ataque de10 fotogramas (10 × 16.6666 ms, unos167 ms). La compuerta de activacion de350 ms sigue controlando el ritmo del siguiente uso, por lo que se separan el impacto, el clip de ataque y la espera antes del siguiente ataque. Al cerrarse un ataque cuerpo a cuerpo, el movimiento queda pausado200 ms. La animacion continua despues del cierre y conserva la pausa visual de impacto de100 ms cuando acierta.

No cambia daño ni recarga de cargas. No se modifica la ventana de la espada de dos manos porque no se recupero su clase original.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeEpee.js`: espada usa `imageAttaque * 16.6666` como `desactivationAuto`.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeDague.js`: daga usa la misma expresion.
- `ArmeADV.js`: valor inicial de `imageAttaque` es10; `activationInterne()` limita otra activacion durante350 ms; `finAttaqueCorpsACaC()` asigna `pauseDeplacement = Date.now() + 200` tanto en acierto como en fallo.
- Los valores de dano, alcance, arco y la duracion para la espada de dos manos permanecen como balance local, no recuperado.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
