# Implementacion v0.113

Fecha: 2026-10-17

## Reaccion visual al recibir un golpe

`MobileADV.effetTouche()` del cliente original activa `FILTRE_TOUCHE` por50 ms. Si el objetivo no es un jugador, comprime su escala vertical a0.5; el bucle de `MobileADV` la devuelve hacia1 multiplicando el error restante por0.2 en cada fotograma. Si el escudo visual esta activo, el cliente usa el sonido `ting` en vez del filtro.

El juego local ahora aplica un destello blanco de50 ms al jugador, Picpic y enemigos al recibir un impacto. Los enemigos usan la misma compresion vertical y recuperacion exponencial. Se omite el destello cuando el golpe fue bloqueado o el dano procede de pulsos periodicos: el cliente separa esas respuestas del evento de impacto.

Los campos `hitFlashUntil` y `hitSquashStartedAt` son temporales. La normalizacion del guardado recoge solo campos de enemigo y jugador admitidos, asi que no se cambia el esquema ni se persiste la animacion.

La conversion de `ColorMatrixFilter.brightness(100, true)` a Canvas usa `brightness(4) grayscale(1)` como aproximacion visual; el temporizador y la compresion proceden directamente del codigo retenido.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: throttling y fin del filtro a50 ms; escala vertical de enemigos.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/TFMAdventure.js`: configuracion del filtro de impacto.
- `reference/original-data/MondeADV-2021.js`: distingue impactos directos/periodicos y golpe bloqueado.
- Evidencia REA de cliente archivado: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.

## Archivos

- `dist/game.js`: registro de impactos directos en jugador y enemigos.
- `dist/pets.js`: impacto temporal de Picpic.
- `dist/art.js`: filtro y recuperacion visual de enemigos.
- `package.json`, `HANDOFF.md`: version y pendientes.

## Validacion

`npm run check` correcto en69 archivos. No se ejecutaron pruebas de comportamiento ni recorrido de navegador.
