# Implementacion v0.111

Fecha: 2026-10-17

## Don original 1201: Trituradora de armadura

El don ausente del catalogo ejecutable queda integrado en `scripts/build-gifts.mjs` y `dist/gifts.js`. Se habilita al equipar la espada de dos manos y conserva el nombre, la descripcion y el icono original en espanol.

Cuando el jugador evita daño, el don almacena parte de ese valor como daño adicional para su siguiente golpe. Se consideran armadura, bloqueo, defensas de area y barreras. El acumulado comparte `player.states.storedHit`, ya persistido por el sistema local, con el don de escudo 1508 y se consume en el proximo ataque.

El catalogo original solo dice «El daño aumenta si se mitiga»; no especifica coeficiente, limite, duracion ni que cuenta como mitigacion. Para hacerlo jugable se reutiliza la regla local de 1508: 30%, maximo100, seis segundos. Esos numeros y el alcance de mitigacion no se presentan como datos recuperados del servidor.

## Archivos

- `scripts/build-gifts.mjs`: definicion local del efecto, requisito y parametros.
- `dist/gifts.js`: catalogo regenerado desde el indice autentico espanol.
- `dist/game.js`: acumulacion del daño evitado en el estado persistente que alimenta el siguiente ataque.
- `package.json`, `HANDOFF.md`: version y pendientes.

## Validacion

`npm run check` correcto en69 archivos. No se ejecutaron pruebas de comportamiento ni recorrido de navegador.
