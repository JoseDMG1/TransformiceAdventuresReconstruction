# Implementación v0.192 — mezcla original de ambiente y música

## Cambio

Se recuperaron 12 pistas exactas declaradas por el cliente original: cuatro ambientes, dos pistas de exploración, cuatro de combate y dos usadas en la introducción. Se guardan en `dist/assets/original/audio/ambiance/` y `.../musique/`; `scene-audio-manifest.json` contiene URLs, tamaños y SHA-256. `npm run recover:scene-audio` repite la recuperación leyendo las rutas literales de los archivos de referencia.

El juego local reproduce una pista de título, alterna entre música de exploración y combate en expediciones, y escoge ambiente cuando termina la pista actual. Los volúmenes por pista y las pausas de 1 segundo para combate/10 segundos para exploración proceden de `reference/original-data/MondeADV-2021.js`. La detección de combate local usa la presencia de enemigos vivos; es una aproximación, porque la fuente usa una bandera de combate cuya asignación no se recuperó.

El menú incluye tres controles —general, música y efectos/ambiente— como en `InterfaceOptionsADV.js`. Se guardan bajo `tfma-audio-v1` en `localStorage`, separados de la partida y de su formato. El campo legado `profile.volume` solo sirve para inicializar la preferencia general cuando todavía no existe la nueva configuración. La reproducción carga archivos locales, sin llamadas de red durante la partida.

## Evidencia

- `MondeADV-2021.js:60–75`: pools y multiplicadores de ambiente, música base y música de combate.
- `MondeADV-2021.js:321–336, 622–630`: selección al terminar y pausas según el modo.
- `TFMAdventure.js:178`: intro `musique/tfmadv_intro`, volumen 0.7 y bucle.
- `InterfaceOptionsADV.js`: tres controles de volumen global, música y efectos.
- Manifiesto y hashes: `dist/assets/original/audio/scene-audio-manifest.json`.

El comportamiento del módulo 2021 es evidencia estática de una fuente pública posterior al cliente archivado; su identidad exacta con cada versión del video no está probada. La selección aleatoria por escena y el vínculo entre enemigos locales y modo combate son decisiones de reconstrucción.

## Persistencia y verificación

- No cambia ni sobrescribe el guardado de aventura; las preferencias usan otra clave.
- El audio se reproduce desde recursos locales recuperados. No se incorpora conexión online.
- No se ejecutaron pruebas ni una comparación de navegador en este cambio. Requiere escuchar transiciones, volúmenes, bloqueo de autoplay y limpieza al cambiar de escena en v0.192.0.
