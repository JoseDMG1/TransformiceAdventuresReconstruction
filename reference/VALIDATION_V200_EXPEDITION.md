# Validación de expedición en v0.200

Se revisó el guion `scripts/smoke.mjs` sin modificar daño, vida, patrones, recompensas ni guardados del juego. Las ejecuciones usan Chrome headless a 1280×800 y el perfil aislado `.local/smoke-browser`.

Cliente de la ejecución registrada: Chrome 155.0.8059.85, protocolo CDP 1.3, V8 15.5.35.25. Código de juego: commit `297ba16`; únicamente el guion de validación está modificado durante estas pruebas.

## Diagnóstico

El primer intento instrumentado completó los dos primeros encuentros y llegó al jefe con 108 de vida. El bot permaneció en x=4052.15, y=640 durante todo el combate; murió con el jefe a 71 de vida. El segundo intento añadió desplazamiento vertical y esquiva entre disparos; murió con el jefe a 48 de vida.

Se comprobó además que el guion pulsaba H e inmediatamente lanzaba habilidades/atacaba. `heal()` inicia una preparación de un segundo y `attack()` puede cancelarla. Esa secuencia no permite evaluar la supervivencia de un jugador que usa correctamente las vendas.

El tercer intento se atascó antes del segundo encuentro: el nuevo radio de llegada del bot era de 65 píxeles y el activador exige acercarse a menos de 55 por el eje X. Se corrigió a 25 para llegar a encuentros y se conservó 65 para interactuar con cofres. Fue un error del guion introducido durante esta revisión, no del activador del juego.

El cuarto intento completó jefe, tres dones, victoria, recarga de la victoria sin duplicar monedas, regreso, exportación e importación. Falló después, en la prueba adicional de Pícaro de nivel 10: esperaba invisibilidad cero inmediatamente al soltar el arco, antes del retardo de lanzamiento de 150 ms. El guion ahora espera el cambio de estado; esto no cambia la implementación del arco.

## Cambios del guion

- Registra vida, posición, enemigos y acción cada 25 iteraciones; en derrota guarda diagnóstico JSON y captura en `.local/expedition-failure.*`.
- Sigue el objetivo visible para llegar a los encuentros y cofres, liberando las teclas de movimiento antes de combatir.
- Espera a que salga la flecha antes de moverse y esquiva si el jefe está cerca. Usa teclado y ratón ordinarios; no modifica estado de combate.
- Usa vendas con vida inferior a 90 y espera a que desaparezca «Vendando» antes de ejecutar otra acción. El umbral es una decisión del bot, no una regla nueva del juego.

## Alcance

El combate contiene variación aleatoria. Una ejecución exitosa prueba ese recorrido concreto, no garantiza todos los trabajos, dones, semillas o estrategias. Las pruebas posteriores de trabajos avanzados utilizan una partida de nivel 10 preparada explícitamente por el guion; ese fixture no se usa para ganar la expedición inicial. La comparación visual y temporal con el MP4 es un trabajo distinto de esta validación funcional.

## Resultado final

El quinto intento aprobó `npm run test:browser` completo: tutorial nuevo y reanudado, equipamiento/guardia, expedición de tres encuentros, jefe, tres dones, recarga del primer regalo y de victoria sin duplicar monedas, regreso a la aldea, exportación JSON real, rechazo de archivo inválido e importación de la copia. Las comprobaciones posteriores de trabajo secundario, Pícaro y Periodista también terminaron sin excepciones de navegador. La validación de invisibilidad verifica el cambio de estado; no constituye una medición exacta del instante de impacto.

El registro terminó con `PASS: full playthrough, expedition resume, pending reward/victory without duplicate loot, real export/import, invalid-file rejection, no runtime exceptions.`

- [Registro de ejecución](validation-v200/expedition/run.txt).
- [Versión de Chrome](validation-v200/expedition/browser-v200.json).
- Capturas finales: [victoria](validation-v200/expedition/victory.png), [regalo](validation-v200/expedition/gift.png), [importación](validation-v200/expedition/import-save.png), [trabajos](validation-v200/expedition/jobs.png) y [Periodista](validation-v200/expedition/journalist.png).

Esto cierra el bloqueo de acreditación funcional del recorrido probado, pero no todo P0: siguen faltando grabación/cotejo temporal con el MP4, comprobación de ambos menús de emotes y cobertura adicional de recorridos/partidas. La estimación de fidelidad continúa en 47%; no se incrementa por aprobar un guion funcional.
