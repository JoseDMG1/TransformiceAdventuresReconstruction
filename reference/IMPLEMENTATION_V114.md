# Implementacion v0.114

Fecha: 2026-10-17

## Sonido al bloquear un impacto

Al confirmar un bloqueo de escudo, el cliente original reproduce `ting` a volumen0.4 desde `MobileADV.effetTouche()`, y omite el filtro blanco de impacto. El juego local ya omitia el destello en un bloqueo; ahora reproduce la muestra original `ting` a ese volumen en `shieldBlockEffects`, sustituyendo el tono sintetico anterior.

La activacion y desactivacion normal del escudo conserva el ciclo de arma existente. Solo cambia la respuesta sonora al impacto bloqueado.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `effetTouche()` elige el sonido `ting` con volumen0.4 cuando el efecto del escudo esta activo.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeBouclier.js`: activacion de la parada y muestra `parade1` son eventos distintos del impacto.
- Muestra local: `dist/assets/original/audio/ting.mp3` (registrada en el manifiesto de audio).
- Evidencia REA del cliente archivado: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.

## Validacion

`npm run check` correcto en69 archivos. No se hizo recorrido de navegador.
