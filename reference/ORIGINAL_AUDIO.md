# Audio original recuperado

Se descargaron 75 efectos originales de 77 rutas exactas, sin enumeración de directorios ni nombres inventados. El manifiesto `dist/assets/original/audio/manifest.json` conserva URL, tamaño, SHA-256 y fallos. `scripts/recover-audio.mjs` reproduce la recuperación y valida cabecera MP3 antes de guardar. `sloutch1` y `sloutch2` no estuvieron disponibles; no tienen sustituto local. La v0.192 recupera además 12 pistas declaradas para intro, música de escena y ambiente; constan en `dist/assets/original/audio/scene-audio-manifest.json` y se pueden recuperar con `npm run recover:scene-audio`.

## Evidencia y límites

La investigación reutiliza el análisis REA documentado en `REA_FINDINGS.md`, Evidence ID `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`. Se inspeccionó estáticamente el artefacto conservado `reference/wayback-client/tfmadv.js`. Su cargador crea `Howl({src:[a.$+t+".mp3"]})`; durante inicialización asigna `b.default.$=M.default.X+"sons/"`, donde la base recuperada es `https://data.atelier801.com/tfmadv/`. No se ejecutó el cliente histórico.

Los 72 nombres originales de metadata provienen de `reference/original-data/animation-metadata.json`, propiedad `sounds`, extraída del `ressources/data.bin` original. Cinco nombres adicionales distintos provienen de llamadas literales: `BarreXPADV.js` llama `xp` a volumen 0.5 y `niveausup` a volumen 1; `InterfaceRecompenseRencontre.js` llama `coffre2` a volumen 0.7 (ya presente en metadata); `ArmeArc.js` llama `arc1` a 0.5, `arc2` a 0.3 y `arc0` a volumen por defecto.

El cliente confirma el disparo de XP, nivel, recompensa y arco. Los alias locales `arme → epee`, `parade → metal1` y `soin → soins1` asocian muestras originales por significado de sus nombres: la colocación exacta de esas tres muestras en el juego histórico es una inferencia. No se define alias `mort` porque los datos examinados no contienen un nombre inequívoco de muerte. Las rutas de música/ambiente provienen de las listas literales de `MondeADV-2021.js`, el intro de `TFMAdventure.js` y `IntroADV.js`; el módulo público de 2021 es posterior al cliente archivado, así que su identidad exacta con la versión del video no está confirmada.

## API local

`dist/audio.js` exporta `initializeOriginalAudio()`, `playOriginalSound(name, { volume } = {})`, `playOriginalMusic(name, options)`, `stopOriginalMusic(fadeMs)`, las consultas de reproducción y controles de volumen maestro/música/efectos. La inicialización es sincrónica y devuelve estado; la reproducción devuelve booleano indicando si se aceptó la solicitud, no garantiza que el navegador la haya oído. Una política de reproducción automática puede rechazar después: el rechazo se captura y `blocked` queda visible. Los fallos de fichero se registran en `failed`. No se realizan conexiones remotas durante juego.

Volúmenes de 0 a 1; volumen maestro inicial 0.55, música y efectos en 1. Hay límite de 12 voces de efectos y separación mínima de 65 ms por muestra. La interfaz guarda preferencias en `tfma-audio-v1`, separadas del guardado de aventura. Funciona mediante HTMLAudio sin dependencias y devuelve `false` si el entorno carece de Audio. Las muestras se leen desde disco servido por el servidor local.

No se ejecutaron pruebas automatizadas en esta tarea de recuperación; reproducción y volumen deben revisarse en navegador dentro de una interacción real.
