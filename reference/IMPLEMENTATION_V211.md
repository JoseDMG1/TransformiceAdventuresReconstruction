# v0.211 — notificaciones y audio originales de objetivos

Al terminar el deslizamiento de entrada de un objetivo se reproduce `objectif` y aparece su texto en un aviso. Validar el objetivo reproduce `objectif2`. Los avisos duran 4 s, se cierran al pulsarlos y se desvanecen durante 1 s. Un nuevo aviso sustituye al anterior, que termina su salida. Se cancelan al cambiar de escena, reanudar o volver al título.

## Evidencia recuperada

`InterfaceQueteADV.js` llama a ambos sonidos y a `NotificationADV.afficher(objectif.texte, 4000)` al terminar la animación de entrada. `Objectif.valider()` llama a `objectif2`. `NotificationADV.js` declara fondo `#000000DD`, borde y resplandor `#ffd74f`, anchura de 8–15 em, entrada de 1 s desde 12% hasta 15% del borde inferior y salida de 1 s.

Se siguió el import literal del motor de audio hasta su [archivo público](https://transformice-adventures.com/dist/Souritheque-client/src/outils/son/MoteurSon.js). La copia `reference/original-data/MoteurSon-recovered.js` confirma la construcción `DOSSIER_MUSIQUE + NOM + ".mp3"`; `TFMAdventure.js` asigna el directorio `sons/` del CDN. Las dos rutas declaradas respondieron HTTP 200 con MP3 válidos:

- `objectif.mp3`: 35 141 bytes.
- `objectif2.mp3`: 26 331 bytes.

URLs, tamaños y SHA-256 están en `dist/assets/original/audio/quest-audio-manifest.json`; la fuente tiene su propio registro de descarga. `npm run recover:quest-audio` reproduce la recuperación. Fue inspección estática y descarga directa de recursos declarados; no se atribuye a una salida nueva de herramientas REA.

## Integración y límites

El modelo de objetivos emite eventos y `game.js` los conecta al servicio de audio y a `quest-notice.js`. El modelo de avisos usa un reloj inyectado; su presentación crea botones locales con texto seguro. El guardado y el protocolo no cambian. Se omiten expresamente los reconocimientos de notificación que el cliente original enviaba al servidor.

Las animaciones, medidas de texto y tipografía son adaptaciones CSS; las curvas exponenciales se aproximan. El volumen por evento usa el valor predeterminado 1 del motor original, multiplicado por las preferencias locales. Falta escucha comparativa del balance y cotejo de escala con el MP4. Conservar texto/sonido y la mecánica de aviso no prueba que las secuencias locales de misiones equivalgan a los mensajes originales del servidor.

## Validación

- `npm test`: 39 pruebas aprobadas.
- `npm run test:quests`: 10 pruebas aprobadas, incluidas emisión única de eventos, permanencia de la validación, reemplazo/caducidad/cierre de avisos y reinicio.
- `npm run test:emotes -- --reference-size --quest-list --objective-motion`: aprobado a 640×360, incluidos tutorial, recarga, avisos y cierre con clic real, emotes, menú y transformaciones reales del indicador en Canvas. La instrumentación de audio verifica promesas de reproducción resueltas y avance del reloj de las dos muestras; no sustituye la escucha humana.
- `npm run test:emotes -- --quest-list`: aprobado a 1280×800. La primera instrumentación registraba resolución de reproducción y duración; se reforzó después a 640×360 con avance de `currentTime`, evitando considerar una duración de streaming infinita como medida útil.
- `npm run check`: sintaxis correcta en 97 archivos.

Capturas de aviso: [640×360](validation-v211/640/quest-new-notice.png), [1280×800](validation-v211/1280/quest-new-notice.png). Trazas de reproducción: [640×360](validation-v211/640/quest-audio.json), [1280×800](validation-v211/1280/quest-audio.json). [Marcador cercano](validation-v211/640/objective-ground.png) y [traza de Canvas](validation-v211/640/objective-motion.json).

La expedición completa se acreditó en v0.209 y la regresión del arco en v0.210. Esta entrega prueba el flujo y la presentación afectados, no todas las combinaciones de contenido. La estimación de fidelidad permanece provisional en 47%.
