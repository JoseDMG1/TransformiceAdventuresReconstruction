# v0.209 — lista y ciclo independiente de objetivos

La instrucción única con temporizador se sustituyó por una lista de objetivos. Cada entrada tiene identidad propia y eventos separados de alta, validación y retirada. Validar marca solo esa fila y conserva la marca hasta retirarla. El alta coloca la fila nueva encima de las anteriores; las filas pueden coexistir durante sus transiciones.

## Evidencia y límites

Inspección estática de `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceQueteADV.js`:

- `ajouterObjectif`, líneas 142–165: indexa por identificador, inserta al principio, selecciona el primer objetivo posicionado si no existe marcador y anima la entrada durante 1500 ms.
- `boucle`, líneas 61–70: procesa un cambio pendiente cada 500 ms, con comparación estricta `TEMPS > prochaineBoucle`.
- `supprimerObjectif`, líneas 166–193: retira el marcador si le pertenece y anima la salida durante 1500 ms. No selecciona automáticamente otro marcador ya existente.
- `validerObjectif` y `Objectif.valider`, líneas 194–201 y 230–239: validación independiente, marca persistente y animación de texto de 500 ms.
- `ProtoADV.js`, líneas 777–794: los tres tipos de mensaje se procesan por separado.

No se ejecutaron herramientas REA nuevas. La secuencia e IDs autoritativos enviados por el servidor siguen ausentes. El catálogo conserva las instrucciones conocidas del recorrido local; admitir listas no prueba que varios objetivos concretos fueran simultáneos en la demo. Los deslizamientos y el rebote usan aproximaciones CSS de las curvas originales; faltan notificaciones y sonidos de objetivo, y el cotejo temporal completo contra el MP4.

## Arquitectura e integración

`dist/quest-data.js` describe instrucciones y destinos. `quest-log.js` mantiene eventos/filas sin DOM ni persistencia. `quest-view.js` representa nodos independientes; `game.js` comunica avances confirmados y actualiza destinos móviles. El marcador toma el objetivo posicionado seleccionado por la lista. Se conserva la proyección de `objectives.js`.

Rescatar a Picpic, hablar con Mura, completar una pista y avanzar entre camino, combate y cofre validan explícitamente la instrucción anterior. Mostrar temporalmente otra instrucción no equivale a completarla. Entrar en una escena o reanudar reinicia la lista desde el estado del recorrido y cancela su cola previa; no se guarda estado efímero ni se cambia el formato de partidas. Identidades internas distintas evitan confundir una fila en salida con otra nueva que reutilice el mismo ID.

## Validación

- `npm run test:quests`: seis pruebas aprobadas de orden, cola, validación persistente, marcadores, reutilización de IDs, instantáneas aisladas, reinicio y catálogo.
- `npm run test:objectives`: cinco pruebas aprobadas de proyección e interpolación.
- `npm test`: 36 pruebas existentes aprobadas, incluidas migraciones, guardados y habilidades.
- `npm run test:quest-browser`: aprobado en Chrome a 640×360. Incluye rescate real, marca de validación, coexistencia de filas y reanudación sin la instrucción completada; añade una prueba DOM aislada de dos objetivos independientes, que es un fixture técnico y no una escena original reconstruida. También pasa las comprobaciones de emotes y menú sin alterar el perfil.
- Capturas reales: [rescate validado](validation-v209/640/quest-validated.png), [transición en curso](validation-v209/640/quest-transition.png) y [objetivo de aldea](validation-v209/640/quest-village.png). [Resultado del fixture DOM](validation-v209/640/quest-list.json).

La primera ejecución de expedición alcanzó jefe, victoria, retorno y exportación/importación. Falló después en el fixture adicional de Periodista, que esperaba un testimonio después de una pausa fija de 180 ms. El guion ahora espera el estado real hasta 5 s y conserva un diagnóstico ante fallos. Una segunda ejecución reveló otra espera fija de 700 ms después de recargar: el diagnóstico encontró el HTML de inicio y ninguna instancia de `adventure` aún disponible. Se reutiliza `reloadAndContinue`, que espera al renderer. No se modificaron daño, vida, frecuencia de testimonios ni balance para aprobar el guion.

La tercera ejecución aprobó `npm run test:browser` completo: tres encuentros y jefe, recompensas, reanudación, victoria sin duplicar botín, retorno, exportación/importación JSON real, rechazo de archivo inválido y pruebas adicionales de Pícaro/Periodista. Sin excepciones de ejecución. Capturas: [victoria](validation-v209/expedition/victory.png), [regalo](validation-v209/expedition/gift.png), [importación](validation-v209/expedition/import-save.png), [trabajos](validation-v209/expedition/jobs.png), [Periodista](validation-v209/expedition/journalist.png). La sintaxis se comprobó en 93 archivos antes de preparar el bloque siguiente; también se comprobó el guion final con `node --check scripts/smoke.mjs`.

El registro detectó además una acción de arco restaurada con reloj visual no finito, aunque el recorrido pudo terminar al iniciar un nuevo ataque. Se conserva como fallo pendiente de persistencia para el siguiente bloque; esta entrega no afirma que todos los estados de ataque estén validados.

La estimación de fidelidad se mantiene en 47%; esta implementación no sustituye la comparación completa con el video.
