# v0.194 — restaurar el ambiente y comprobar reproducción

La v0.193 omitió por error la llamada a `playOriginalSound` tras elegir una muestra ambiente. El estado y la documentación indicaban selección de pistas, pero no había reproducción. También actualizaba el plazo en cada fotograma mientras había una voz activa, en lugar de comprobarla una vez por segundo.

`dist/ambient-audio.js` concentra ahora ese ciclo e inyecta las operaciones de reproducción, consulta y parada de `audio.js`. `game.js` actualiza el controlador y lo reinicia al cambiar de escena. La siguiente muestra comienza en la primera comprobación posterior al final de la anterior; si el navegador rechaza una solicitud, vuelve a intentarlo al siguiente segundo. No se modifica el guardado.

La referencia estática es `reference/original-data/MondeADV-2021.js:60-64,319-325`: cuatro muestras con sus volúmenes, comprobación por segundo y reproducción cuando termina la voz activa. Se consultó el artefacto conservado; no se ejecutó una operación REA nueva. La procedencia de 2021 y los límites de equivalencia con el video siguen vigentes.

## Comprobaciones realizadas

- `node --test scripts/ambient-audio.test.mjs`: cuatro pruebas aprobadas. Cubren inicio real de la solicitud, ausencia de voces duplicadas, reemplazo al terminar, reintento tras rechazo y parada al cambiar de escena.
- `npm run check`: sintaxis válida en 76 archivos.
- Chrome en modo headless, perfil aislado y servidor local: inicio de partida nueva y entrada al tutorial mediante los botones. Tras 7,5 segundos, `ambiance/foret2.mp3` respondió HTTP 200; `soundStatus()` registró una voz activa y música en reproducción, `blocked: false`, `failed: []`. No hubo excepciones de ejecución.
- Informe de esa ejecución: `.local/audio-v194-result.json`; script reproducible de la sesión: `.local/check-audio-v194.mjs`. Ambos son artefactos locales ignorados por Git. Las pruebas automatizadas permanentes se ejecutan con `npm run test:audio`.

La comprobación de navegador acredita carga y estado de reproducción, no escucha humana, volumen percibido ni sincronía con el MP4. No cubre un recorrido completo ni partidas reanudadas. La estimación de 47% conserva su carácter provisional y no aumenta por esta reparación.
