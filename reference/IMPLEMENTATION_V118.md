# Implementacion v0.118

Fecha: 2026-10-17

## Pausa visual al acertar un golpe cuerpo a cuerpo

Cuando un ataque cuerpo a cuerpo encuentra al menos un enemigo valido, el clip de ataque del jugador se congela durante100 ms y luego continua. El cronometro de combate, el daño, el enfriamiento y el movimiento no se pausan. Los fallos y ataques a distancia no reciben esta pausa.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `finAnimationAttaque(..., TOUCHE)` llama `creature.pausePendant(100)` si el servidor marca que hubo impacto.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`: `finAttaqueCorpsACorps()` llama `finAnimationAttaque(..., true)` al encontrar enemigo; el fallo lo llama con `false`.
- El cliente limita la pausa a la animacion del movil. La reconstruccion local deja avanzar el reloj del ataque y solo congela `attackVisual`.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
