# Desarrollo local v0.105: clips de muerte completos

## Evidencia

En `dist/assets/original/creatures.json`, los estados `mort` principales son clips no repetibles. Las criaturas usadas por los encuentros locales duran entre86 y113 fotogramas; el jefe de bosque dura285. La simulacion anterior retiraba todas tras1.2 segundos, antes del fin del clip, particularmente en el jefe.

## Cambio

- La duracion de muerte se obtiene del clip de la criatura activa a60 fps, con1.2 s de respaldo si no hay metadata.
- El enemigo permanece visible hasta terminar su animacion. El reloj de muerte usa el reloj monotono del juego, que sigue avanzando al mostrar ventanas; por eso no queda congelado a mitad del clip al abrir cofre/recompensa.
- Los enemigos derrotados ya se excluian del guardado. `deathStartedAt` es efimero; no cambia el formato ni las recompensas.

## Comprobacion y limites

`npm run check` revisa sintaxis. No se ejecutaron pruebas de comportamiento ni un recorrido de navegador. Los recursos recuperados respaldan longitudes visuales, no la espera exacta del servidor antes del cofre o la recompensa. IA, dano y duraciones de combate siguen siendo aproximaciones locales; online queda fuera.
