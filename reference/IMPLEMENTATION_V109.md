# Implementacion v0.109

Fecha: 2026-10-17

## Apuntado continuo del arco

Durante la carga y el margen de150 ms entre soltar y lanzar, el angulo del arco sigue la posicion actual del cursor. El impacto toma el angulo vigente al crear la flecha y deja de actualizarlo durante la animacion de disparo.

Esto replica el bucle de `ArmeArc.js`, que vuelve a convertir la posicion del cursor a coordenadas del mundo y actualiza el angulo de la mira en cada iteracion antes de lanzar.

No modifica el guardado, municion, dano ni reglas online. La duracion de carga local sigue siendo provisional.

## Archivos

- `dist/game.js`: actualizacion del angulo de la accion del arco mientras no se ha lanzado.
- `package.json`: version del proyecto.
- `HANDOFF.md`: version y pendientes.

## Validacion

`npm run check` correcto en69 archivos. No se ejecuto el juego ni un recorrido de navegador.
