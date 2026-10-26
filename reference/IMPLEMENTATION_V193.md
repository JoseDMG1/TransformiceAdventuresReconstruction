# Implementación v0.193 — fases musicales del encuentro

## Cambio

La selección entre música de exploración y combate ahora consulta el estado del encuentro local: solo se considera combate dentro de una mazmorra cuando el encuentro comenzó y aún no se concedió su recompensa. Antes bastaba con que quedara algún enemigo vivo, lo que podía mantener música de combate durante enemigos residuales o activar música al cargar estados fuera de un encuentro.

La primera pista al entrar al mundo espera cinco segundos. Cuando cambia la fase local de combate a exploración o viceversa, la nueva pista espera un segundo y la anterior se desvanece. Las pistas que terminan naturalmente conservan los intervalos originales: un segundo para reintentar en combate y diez en exploración. El sonido ambiente vuelve a comprobarse cada segundo y se elige otra muestra cuando termina la actual.

El booleano local aproxima `musiqueCombatRequise`, que el cliente recibía del servidor original. No se implementa protocolo ni conexión online. No se cambia el formato ni el contenido de las partidas; los ajustes de audio permanecen en `tfma-audio-v1`.

## Evidencia REA conservada

- `reference/original-data/MondeADV-2021.js:57-75`: estado musical, pools de pistas y volúmenes.
- `reference/original-data/MondeADV-2021.js:283-297`: carga del mundo, selección de listas y demora inicial de cinco segundos.
- `reference/original-data/MondeADV-2021.js:319-337`: comprobación del ambiente cada segundo y espera de uno/diez segundos tras finalizar una pista.
- `reference/original-data/MondeADV-2021.js:622-631`: al cambiar la bandera, desvanece la pista anterior y selecciona la lista del modo actual.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ProtoADV.js:494-497`: el paquete `C_MUSIQUE_COMBAT` establece la bandera y reinicia la música tras un segundo.

Estos son artefactos estáticos ya recuperados y estudiados mediante REA; no se abrió una sesión REA nueva en este cambio. El módulo de mundo tiene fecha posterior al cliente archivado, y la bandera original depende del servidor. La fase de encuentro local sigue siendo una aproximación informada, no una equivalencia demostrada.

## Guardados y verificación

- No se añaden campos al guardado ni se migra la partida.
- No se añaden funciones online ni contenido en francés.
- No se ejecutaron pruebas ni cotejo de navegador. Falta escuchar los inicios y cambios de pista, el corte de ambiente, autoplay y pausa en la versión v0.193.0.
