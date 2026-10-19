# Implementacion v0.123

Fecha: 2026-10-17

## Fases de la animacion de espada y daga

Durante la ventana inicial de10 fotogramas, espada y daga reproducen su clip a velocidad3 dentro del tramo0-11, que vuelve a empezar mientras el ataque sigue activo. Al terminar esa ventana, el clip visual pasa a velocidad normal y continua desde el fotograma10 hasta finalizar; cuando hubo impacto conserva ademas la pausa de100 ms. El cronometro del ataque y el momento del daño no se aceleran.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `animationAttaque()` llama `jouerAnimation(nomAnim, 3, true, 0, 11)`.
- El mismo archivo: `finAnimationAttaque()` reinicia el clip desde `IMAGE` a velocidad1 y lo enlaza con `statique`; la ventana de espada/daga ya recuperada termina en10 fotogramas.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeEpee.js` y `ArmeDague.js`: ambos llaman a `animationAttaque()` al activar el arma.
- `ArmeADV.js`: el valor `imageAttaque` por defecto es10 y desactiva el arma tras esa ventana.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
