# Implementacion v0.121

Fecha: 2026-10-17

## Orientacion al confirmar un impacto cuerpo a cuerpo

Cuando un golpe cuerpo a cuerpo alcanza uno o mas enemigos, el jugador y el clip de ataque se orientan hacia el objetivo mas cercano alcanzado. La seleccion de objetivos, el angulo de dano, el movimiento y el guardado no cambian. Un fallo mantiene la orientacion previa del ataque.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`: `finAttaqueCorpsACaC()` busca el enemigo mas proximo; con acierto calcula el angulo hacia ese objetivo y llama a `versLaDroite()` antes de cerrar la animacion.
- La reconstruccion reutiliza el objetivo mas cercano de su lista ya calculada para el golpe, evitando cambiar el alcance o la seleccion del cliente local.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
