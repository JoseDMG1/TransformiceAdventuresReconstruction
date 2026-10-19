# Implementacion v0.120

Fecha: 2026-10-17

## Respuesta de camara en ataques cuerpo a cuerpo

Al cerrar un ataque cuerpo a cuerpo, la camara recibe un impulso de25 px en la direccion del golpe y lo amortigua durante los fotogramas siguientes. Si hubo acierto, la imagen suma una sacudida direccional de10 px, con jitter de potencia1 durante100 ms. En un fallo solo se aplica el impulso de camara. Estos efectos son visuales, no alteran coordenadas del jugador, controles ni guardado; se reinician al cambiar de escena.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`: `finAttaqueCorpsACaC()` llama a `tremblement(1, 100, 10, angleAttaque)` solo con acierto y llama a `decalageCamera(cos(angleAttaque) * 25, sin(angleAttaque) * 25)` para acierto y fallo.
- `reference/original-data/MondeADV-2021.js`: `decalageCamera()` amortigua el desplazamiento con la velocidad por defecto0.2; `tremblement()` aplica jitter aleatorio y desplazamiento direccional con `easeOutExpo` durante la duracion indicada.
- Cuando hay acierto, la reconstruccion elige el objetivo mas cercano ya seleccionado por el calculo local del ataque. Cuando falla, usa la direccion de movimiento o la orientacion del jugador, como el cliente.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. Se inicializan y reinician todos los campos transitorios de camara al arrancar y al cambiar de escena. No se ejecuto la suite ni un recorrido de navegador.
