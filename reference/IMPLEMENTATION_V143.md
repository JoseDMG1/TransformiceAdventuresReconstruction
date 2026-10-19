# Implementación v0.143

## Oclusión de personajes por árboles

Los árboles ya no se reducen al 28% de opacidad cuando el jugador queda detrás. La profundidad del escenario dibuja el tronco y la copa por encima del personaje; las barras de vida y los estados del actor permanecen visibles porque se dibujan en una capa posterior. No cambia el terreno, las colisiones ni el guardado.

## Evidencia

El fotograma `reference/gameplay-frames/frame-0720.jpg` (12:00) muestra un tronco que oculta al personaje, mientras su barra y dos indicadores verdes permanecen por encima. `drawActorOverlay()` ya se ejecuta después de dibujar entidades y vegetación; se eliminó el ajuste local `globalAlpha = 0.28` aplicado a los árboles alrededor del jugador.

La regla se limita a la oclusión por orden de profundidad existente. No se implementa transparencia contextual para otros objetos ni se afirma que todos los árboles del original se comporten igual.

## Verificación

No se ejecutó el juego ni pruebas. Falta comparar en navegador el fotograma local equivalente y confirmar que el actor queda completamente cubierto sin perder la barra ni los estados.
