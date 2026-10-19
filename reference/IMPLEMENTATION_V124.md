# Implementacion v0.124

Fecha: 2026-10-17

## Retroceso de camara al disparar el arco

Cuando el arco lanza la flecha, la camara recibe un impulso de70 px en direccion contraria al disparo. El desplazamiento usa el mismo amortiguamiento que los impulsos de camara cuerpo a cuerpo; no mueve al jugador, la flecha ni el objetivo de apuntado, y no se guarda.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeArc.js`: al emitir el disparo, llama `decalageCamera(cos(angle + PI) * 70, sin(angle + PI) * 70)`.
- El codigo local ejecuta el impulso en la resolucion del tiro, que ya ocurre tras la demora de liberacion recuperada del arco.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
