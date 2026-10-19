# Alcance pendiente para una reconstrucción local fiel

Actualizado: 2026-10-18  
Versión evaluada: v0.192.0  
Referencia disponible: gameplay de 18:04, fotogramas extraídos, cliente y recursos archivados con REA.  
Alcance: juego local en navegador. Los sistemas online quedan excluidos.

## Estimación ejecutiva

**Fidelidad observable estimada: 47%, con un intervalo razonable de 40–58% y confianza baja-media.** Es una estimación de semejanza con el recorrido que aparece en el video y con evidencia original recuperada. No significa que falte 53% del código, ni que solo 47% del juego se pueda jugar. El backlog priorizado, con entregables y criterios de cierre, está en [FIDELITY_BACKLOG.md](FIDELITY_BACKLOG.md).

El ciclo principal local está implementado: tutorial, aldea, expedición, encuentros, combate, recompensas y retorno. La v0.184 ajusta el regreso desde el tutorial a la evidencia de Papaille; la v0.185 alinea el texto de objetivo inicial de aldea con `obj_continuez`; la v0.186 mejora el retrato local; la v0.187 alinea el objetivo transitorio del diálogo de Papaille con `obj_papaille`; la v0.188 integra diez emotes locales; la v0.189 oculta el panel persistente de HUD no observado y centra la barra inferior; la v0.190 separa los menús de emotes; la v0.191 elimina la etiqueta «PARTIDA LOCAL» no observada; la v0.192 integra música y ambiente originales con controles separados. Todavía no se ha cotejado la versión en una pasada completa de navegador contra el video. El 47% es una base de planificación, no una certificación de la versión.

| Dimensión | Peso | Estimación | Lectura práctica |
| --- | ---: | ---: | --- |
| Flujo local | 15% | 75% | El recorrido existe; falta comprobarlo de principio a fin en la versión vigente. |
| Mapas, sectores, composición y cámara | 20% | 20% | Se puede recorrer, pero la geometría y colocación original no están recuperadas. |
| Combate, habilidades e IA | 20% | 58% | Hay muchos sistemas y recursos reconstruidos; cifras y varias reglas siguen aproximadas. |
| Progresión, inventario y recompensas | 15% | 43% | Hay pantallas y sistemas locales; faltan asociaciones y tablas autoritativas. |
| Personajes, ropa, criaturas y objetos | 15% | 48% | Se usan recursos originales, con cobertura y asociaciones incompletas. |
| Interfaz, diálogos, audio y presentación | 10% | 52% | Existen componentes y recursos recuperados; falta cotejo de escala, estados y sincronía. |
| Estabilidad acreditada en navegador | 5% | 30% | No hay evidencia documentada de un recorrido integral de v0.192.0. |
| **Total ponderado** | **100%** | **47.2% ≈ 47%** | Intervalo razonable: 40–58%. |

Las notas son juicio experto a partir del material archivado y del estado documentado del código. El intervalo refleja cobertura y validación incompletas; no es una probabilidad estadística. No se ejecutó el juego como parte de esta evaluación.

### Cómo interpretar los 53 puntos de brecha

La diferencia aritmética entre 100% y la nota central es **52.8 puntos ponderados**. No equivale a 53% del trabajo ni a una promesa de llegar a 100: parte del contenido original no está en el MP4 y parte de los datos los decidía un servidor cuyos payloads no se recuperaron. La tabla muestra dónde está concentrada la brecha que sí se puede investigar en el alcance local.

| Área | Aporte actual | Brecha ponderada | Qué puede reducirla |
| --- | ---: | ---: | --- |
| Mapas, sectores, composición y cámara | 4.0 / 20 | **16.0 puntos** | Cotejar cada tramo del video en navegador y ajustar terreno, posiciones, escala, capas, colisiones y cámara. Los sectores no visibles y sus coordenadas exactas requieren payloads originales que no están disponibles. |
| Progresión, inventario y recompensas | 6.45 / 15 | **8.55 puntos** | Cotejar valores visibles de XP, nivel, monedas, premios, talentos y trabajos; completar relaciones de inventario si se recupera un perfil/equipamiento original. Tablas completas de servidor no se pueden deducir de una sola partida. |
| Combate, habilidades e IA | 11.6 / 20 | **8.4 puntos** | Comparar las acciones concretas del MP4 desde entrada hasta recuperación y ajustar tiempos, objetivos, efectos y respuestas observables. Valores enviados por servidor siguen siendo aproximados. |
| Personajes, ropa, criaturas y objetos | 7.2 / 15 | **7.8 puntos** | Cotejar composición visible y vincular apariencias con sus IDs y ranuras usando evidencia. Faltan asociaciones autoritativas de equipo y algunos archivos originales devuelven 404. |
| Interfaz, diálogos, audio y presentación | 5.2 / 10 | **4.8 puntos** | Comparar capturas equivalentes, textos, estados y sincronía de sonido; integrar muestras originales cuando estén disponibles. |
| Estabilidad acreditada en navegador | 1.5 / 5 | **3.5 puntos** | Hacer el recorrido completo de v0.188.0 con partida nueva y guardada, registrar fallos y verificar retorno/recarga. El código por sí solo no acredita esta dimensión. |
| Flujo local | 11.25 / 15 | **3.75 puntos** | Reproducir inicio, tutorial, aldea, expedición, recompensa y retorno sin bloqueos, con los mismos hitos observados. |

Los valores suman la brecha de **52.8 puntos**; sirven para priorizar, no para estimar horas. La mayor oportunidad inicial es comprobar el recorrido vigente junto con el cotejo de escenarios. La puntuación debe cambiar solo al registrar evidencia local comparable y recalcular la misma matriz.

**Meta verificable dentro de este proyecto:** cubrir fielmente las escenas, acciones, pantallas y sonidos que aparecen en los 18:04, con aproximaciones explícitas donde falten datos. **No es verificable con el material actual** afirmar que se reconstruyó todo Transformice Adventures, sus zonas no observadas o cada regla del servidor original. La nota máxima alcanzable no se puede fijar sin más referencias; no se debe etiquetar automáticamente 100% como objetivo realista.

## Qué significa terminar esta reconstrucción

La meta verificable es reproducir lo que se observa en los 18:04 disponibles y lo que el cliente original permite afirmar. Para cada escena, acción y pantalla se necesita una implementación local y una comparación equivalente; las reglas sin respaldo deben quedar señaladas como aproximaciones. No es posible certificar el juego completo ni contenido fuera de la grabación sin evidencia adicional.

Cada punto pendiente pertenece a una de estas clases:

1. **Cotejo pendiente:** la función está implementada, pero no se ha comparado en estado, resolución y momento equivalentes.
2. **Corrección con evidencia disponible:** el video, un recurso o el cliente recuperado permite definir cómo ajustar el comportamiento.
3. **Aproximación local:** el valor exacto lo decidía el servidor o no se deduce del material; se mantiene como parámetro provisional.
4. **Dato no recuperado:** falta el artefacto que permitiría establecer equivalencia; no se debe inventar ni afirmar fidelidad.
5. **Fuera de cobertura:** no aparece en el video ni está sustentado por otra evidencia disponible.

## Trabajo que falta, en orden de dependencia

### P0 — Crear evidencia de la versión actual

- Recorrer v0.192.0 con partida nueva y guardada, desde carga/tutorial hasta retorno a la aldea; cotejar también emotes y disposición del HUD.
- Registrar resolución, versión, pasos, errores visibles y estados bloqueados; conservar capturas o video local.
- Cubrir navegación, interacciones, objetivos, encuentros, habilidades, botín, cofre/jefe, victoria/derrota, guardado y recarga.
- Alinear las capturas locales con las marcas de tiempo del MP4 y anotar discrepancias por escena y sistema.

**Cierre:** ambos recorridos llegan al retorno y se reanudan sin bloqueo; cada diferencia observable queda corregida o identificada como aproximación/dato ausente. Sin este paso no se puede subir responsablemente el porcentaje ni conocer los fallos de la entrega vigente.

### P1 — Cotejar el mundo visible

- Comparar tutorial y bosque inicial, aldea, bosque y encuentros, tramo de Papaille, corredor y arena final.
- Ajustar primero siluetas y composición grandes; luego coordenadas, escala, cámara, capas, oclusión, límites, colisiones y transiciones.
- Revisar elementos añadidos por trazado del video (casas, senderos, bancos, población ambiental, follaje y decoración): sus posiciones son aproximadas hasta compararlas localmente.
- Comprobar que la decoración no altera rutas ni objetivos si en la referencia no lo hace.

**Cierre:** cada tramo visible tiene pareja de capturas a resolución y estado comparables; las diferencias principales quedan resueltas o ligadas a datos de sector ausentes. Las posiciones trazadas no se presentan como coordenadas originales.

### P1 — Cotejar acciones y reglas de combate

- Para cada acción observada registrar entrada, anticipación, clip, impacto/curación, reacción, estados, interrupción y recuperación.
- Comparar armas, habilidades, proyectiles, efectos, barras, tiempos, sonidos, enemigo, jefe y Picpic.
- Probar controles con foco y pérdida de foco, guardia, arco, selección/cancelación de objetivos y movimiento durante las acciones.
- Mantener como parámetros locales las magnitudes que la evidencia no determina.

**Cierre:** las secuencias visibles coinciden en comportamiento y presentación; cada regla no demostrable tiene procedencia y marca de aproximación.

### P1 — Cotejar pantallas, progresión y economía visible

- Comparar HUD, objetivos, diálogos, aldea, trabajos, talentos, perfil/equipo, selección de expedición, regalos y estados de fin de recorrido.
- El panel local conserva una sola instrucción derivada; el cliente original administra una lista de objetivos con altas, validaciones y bajas separadas. Reconstruir los objetivos simultáneos visibles en el video sin inventar los datos de servidor ausentes.
- Verificar textos en español, tamaños, jerarquía, márgenes, temporizadores, botones, navegación y estados bloqueados.
- Igualar solo los valores que se leen en el video o están confirmados por el cliente: XP, nivel, puntos, monedas, desbloqueos y recompensas.
- Revisar adquisición/reinicio de talentos y continuidad tras guardar/cargar.

**Cierre:** todo estado visible tiene equivalente local cotejado; las reglas extrapoladas quedan identificadas. No agregar traducción al francés.

### P1 — Completar las asociaciones de apariencia y contenido

- Relacionar ID de inventario con ranura, pieza visual, pivote, orientación y orden de capas cuando exista evidencia.
- Comparar jugador y Picpic en poses y equipo equivalentes; confirmar apariencias de los objetos visibles.
- Asociar criaturas, objetos y efectos recuperados con su identificador y aparición solo cuando el recurso o el video lo permita.

**Cierre:** cada apariencia afirmada como original está vinculada a un recurso y una asociación comprobables; lo desconocido permanece vacío/provisional.

### P2 — Audio y pasada de cierre

- Relacionar eventos audibles con muestras recuperadas, volumen y momento; documentar muestras que faltan.
- Repetir el recorrido después de las correcciones, revisar guardado/carga y regresiones, y actualizar la matriz con los mismos pesos.

**Cierre:** audio observable cotejado o anotado como ausente/aproximado; sin bloqueos reproducibles; nueva estimación respaldada por capturas y registro de recorrido.

## Datos que impiden una equivalencia completa

| Dato faltante | Qué impide determinar | Evidencia necesaria |
| --- | --- | --- |
| Payloads originales de sectores de mapa (`0x8070` y relacionados) | Geometría, coordenadas, capas, colisiones y contenido fuera del encuadre. | Datos de sector originales disponibles legítimamente; mientras tanto, solo puede trazarse lo visible en el video. |
| Relación autoritativa inventario → ranura → apariencia | Atuendos exactos y uso de todos los espacios cosméticos. | Exportación de perfil/equipo que conserve IDs y ranuras, o evidencia visual inequívoca. |
| Tablas y decisiones del servidor | Balance, probabilidades, botín, costes, desbloqueos y reglas no expuestas por el cliente. | Tablas originales o suficientes observaciones repetibles que revelen los valores. |
| Zonas, misiones y estados ausentes del MP4 | Contenido del juego original fuera de los 18:04 observados. | Más material de referencia de esas partes. |
| Cotejo de v0.192.0 | Diferencias y estabilidad de la versión que se está evaluando. | Grabación/capturas del juego local corriendo y registro de recorrido. |

REA documenta estructuras, recursos declarados y flujos del cliente; no recupera por sí solo decisiones del servidor ni demuestra ejecución histórica. Consultar [REA_FINDINGS.md](REA_FINDINGS.md), [REA_PROGRESSION_FINDINGS.md](REA_PROGRESSION_FINDINGS.md), [GAMEPLAY_VIDEO_NOTES.md](GAMEPLAY_VIDEO_NOTES.md) y [MAP_RECOVERY.md](MAP_RECOVERY.md).

## Regla para actualizar el porcentaje

No subir la nota por número de versión, cantidad de código o incorporación de recursos sin cotejo. Al cerrar P0, recopilar ejemplos comparables y recalcular cada dimensión con la tabla anterior. Registrar para cada cambio: referencia original, captura local, diferencia antes/después, evidencia usada y cualquier parámetro todavía provisional.

La fidelidad alcanzable bajo el alcance actual significa fidelidad al recorrido observado, no equivalencia con todo el juego. Cuentas, servidores, multijugador, chat, matchmaking y sincronización no forman parte de los pendientes ni del porcentaje.




