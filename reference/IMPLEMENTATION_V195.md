# v0.195 — conservar el rescate del tutorial al reanudar

## Fallo reproducido y corrección

Una partida nueva permitía curar a Picpic, pero al recargar el navegador volvía a la fase inicial. `normalizeJourney` descartaba cualquier tutorial de fase 1 sin enemigos. Esa restricción pertenecía al combate local retirado en v0.184, por lo que rechazaba precisamente el estado actual del juego.

Se retiró esa restricción. Permanecen las validaciones de escena, salud, coordenadas y contenido. El formato de partida y la clave de almacenamiento no cambian; las fases antiguas 1 y 2, incluidas sus entidades, siguen siendo legibles. Una copia válida guardada después del rescate ahora conserva su fase, posición y mascota. Este cambio no recupera datos que ya se hubieran sobrescrito al reiniciar el tutorial.

El recorrido corresponde a la evidencia disponible: rescate, diálogo de Papaille y regreso a la aldea. Véanse `IMPLEMENTATION_V184.md`, `GAMEPLAY_VIDEO_NOTES.md`, `gameplay-frames/frame-0060.jpg` y el texto español archivado `dialogue.45`. No se ejecutó una nueva sesión REA; la evidencia original conservada respalda el recorrido, no la antigua restricción del validador local.

## Pruebas y límites

- Antes del arreglo, la prueba de navegador reprodujo `tutorialPhase: 1` antes de recargar y `0` después.
- `node --test scripts/persistence.test.mjs`: 12 pruebas aprobadas, incluidas la partida rescatada sin enemigos y las fases antiguas.
- `npm test`: 36 pruebas aprobadas. La prueba de arco ahora contempla los 150 ms tras la preparación que declara `ArmeArc.js`; no se cambió el comportamiento de combate para ajustarlo a la prueba.
- `node scripts/smoke.mjs --tutorial-only`: Chrome con perfil aislado, partida nueva, movimiento, cura de Picpic, recarga, continuación, camino a Papaille, diálogo y llegada a la aldea. Sin excepciones de ejecución. Capturas locales: `.local/tutorial.png` y `.local/village.png`.
- `npm run check`: sintaxis correcta en 76 archivos.
- `node scripts/smoke.mjs`: recorrido completo NO aprobado. Tras corregir las entradas obsoletas del guion, alcanzó la expedición y se observó `room: 2` con dos enemigos vivos, pero terminó en el panel de derrota y falló la aserción de supervivencia. No se comprobó el retorno final, el botín de victoria ni toda la exportación/importación en esta ejecución. El guion debe mejorar su estrategia antes de usarlo para acreditar el recorrido completo; este resultado por sí solo no determina si el balance coincide con el original.

El guion de navegador ahora abre la pestaña Equipo antes de elegir armas, usa `3` para la habilidad secundaria y suelta el arco después de cargarlo. La automatización anterior esperaba un combate de tutorial inexistente y mantenía el arco cargando indefinidamente. El modo acotado se puede repetir con `npm run test:tutorial`, con el servidor local activo.

La comparación visual mostró diferencias grandes de composición del tutorial: suelo, vegetación y objetos de la escena original. Esta corrección acredita continuidad del tutorial, no equivalencia visual ni un recorrido completo del video. El 47% provisional no cambia.
