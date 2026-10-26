# v0.201 — presentación y comprobación de emotes

El radial de F conserva los diez PNG originales y el radio de 50 unidades, pero retira los fondos verdes, contornos y sombras añadidos localmente. El cliente archivado crea sprites de las imágenes, sin esos marcos. Los botones transparentes mantienen un área de 33×30 y un contorno al recibir foco de teclado; el brillo de hover sigue siendo una aproximación CSS al filtro original.

El icono flotante ahora resta media altura de la imagen al dibujarse. `MobileADV.afficherEmoji` usa `anchor.set(0.5, 0.5)`, x=-40/+40 y un desplazamiento y=-30 a -60 durante 2000 ms. El dibujo local ya centraba X, pero usaba Y como borde superior. Este cambio corrige ese desfase.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceEmoteADV.js`: diez sprites, radio 50 y entrada escalonada de 10 ms.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/InterfaceCompetenceADV.js`, `ConteneurEmote`: lista separada `/hi`, `/sit`, `/dance`.
- `reference/original-data/MobileADV-2021.js`, `afficherEmoji`: anclaje y trayectoria del icono.
- Metadatos originales de los clips `emote_salut`, `emote_assis` y `emote_danse` conservados en el proyecto.

Se inspeccionaron los artefactos estáticos existentes conforme a la evidencia conservada; no se produjo una salida nueva de REA. Sigue vigente la limitación del CLI registrada en v0.199.

## Comprobación

`npm run test:emotes` ejecuta el tutorial y una comprobación específica con Chrome. `node scripts/smoke.mjs --emotes --reference-size` hace el recorrido a 640×360. El helper vive en `scripts/emote-browser-checks.mjs` y usa clics reales mediante CDP, precedidos de hit testing, para seleccionar los botones. El snapshot de diagnóstico añade copias de los dos estados transitorios de emote; no permite modificarlos.

La prueba verifica diez imágenes cargadas, separación entre ambos menús, cierre con Escape y selección, elección del icono 3 y su desaparición, reproducción y finalización de los tres clips, y conservación de los datos del perfil guardado. Se excluyen de la comparación el estado transitorio del recorrido y `exportedAt`, actualizado por el autoguardado. Además se comprueba que el recorrido serializado no contiene emotes. El primer intento falló únicamente por comparar ese timestamp; no se cambió el sistema de guardado para aprobarlo.

Capturas en `validation-v201/1280/` y `validation-v201/640/`: radial, menú de comandos, icono y las tres poses. Los avisos de XP/llegada se dejan terminar antes de capturar.

Ambas ejecuciones aprobaron sin excepciones de navegador. `npm run check` aprobó la sintaxis de 82 archivos; después de añadir la espera de avisos también se comprobó directamente la sintaxis del helper. Se inspeccionaron el radial, el menú, el icono y la pose de baile en las capturas conservadas.

## Límites

La entrada radial CSS aproxima la interpolación por fotograma original. La duración local de sentarse/bailar sigue sin acreditación del comportamiento que controlaba el servidor. Las capturas y los estados de reproducción no equivalen a cotejar cada fotograma con una ejecución original. No hay cambios de combate, progresión, formato de guardado ni funciones online. La estimación global de fidelidad continúa en 47%.
