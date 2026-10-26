# Backlog para alcanzar fidelidad local verificable

Actualizado: 2026-10-26  
Versión evaluada: v0.193.0  
Alcance: reconstrucción jugable sin conexión, en navegador. No incluye cuentas, servidores, multijugador, matchmaking, chat ni sincronización.

## Estimación útil

**Estimación de similitud observable: 47% (rango de trabajo: 40–58%; confianza baja-media).** La comparación cubre el gameplay disponible de 18:04 y el comportamiento que puede respaldarse con el cliente y recursos originales estudiados mediante REA. No es porcentaje de código, tiempo, cantidad de sistemas o contenido jugable.

El ciclo principal local está construido de extremo a extremo en código —tutorial, aldea, expedición, encuentros, combate, progreso/recompensas y retorno—, pero la versión v0.193.0 no tiene una grabación local completa cotejada contra el MP4. Por eso “construido” no significa “equivalente”. Los escenarios son la mayor brecha: la reconstrucción usa colocaciones trazadas y aproximadas porque no se recuperaron los payloads de sectores originales. Varias reglas de combate/progreso también son parámetros locales cuando la evidencia no contiene la decisión que tomaba el servidor.

| Área | Peso | Nota estimada | Aporte | Trabajo que determina el avance |
| --- | ---: | ---: | ---: | --- |
| Flujo local | 15% | 75% | 11.25 | Comparar recorrido nuevo y reanudado hasta el retorno. |
| Mapas, sectores, composición y cámara | 20% | 20% | 4.00 | Cotejar cada tramo y corregir su composición, movimiento y colisiones. |
| Combate, habilidades e IA | 20% | 58% | 11.60 | Comparar secuencias observables y ajustar tiempos/respuestas. |
| Progresión, inventario y recompensas | 15% | 43% | 6.45 | Cotejar valores y asociaciones visibles; marcar reglas aproximadas. |
| Personajes, ropa, criaturas y objetos | 15% | 48% | 7.20 | Emparejar equipo/IDs con recursos, ranuras y capas. |
| Interfaz, diálogos, audio y presentación | 10% | 52% | 5.20 | Cotejar presentación, estados y audio a resolución equivalente. |
| Estabilidad acreditada en navegador | 5% | 30% | 1.50 | Registrar una pasada completa reproducible de la versión vigente. |
| **Total** | **100%** |  | **47.20 ≈ 47%** | Incertidumbre del rango: 7 puntos por debajo y 11 por encima de la estimación central. |

Las notas son juicio experto, no una medición automática ni un intervalo estadístico. Los **52.8 puntos ponderados de brecha** priorizan trabajo; no representan la fracción de horas restante. No subir la estimación por añadir código o recursos sin comparación equivalente. El procedimiento para recalcularla está en [FIDELITY_ESTIMATE_AND_REMAINING_WORK.md](FIDELITY_ESTIMATE_AND_REMAINING_WORK.md).

## Qué significan los estados

- **Implementado, falta cotejo:** existe en el proyecto, pero todavía no hay captura comparable que confirme presentación y respuesta.
- **Parcial / aproximación local:** una parte está hecha; parámetros, contenido o asociaciones se eligieron localmente porque la evidencia no fija el valor original.
- **Pendiente con evidencia:** hay referencia suficiente para especificar el cambio, pero falta implementarlo o contrastarlo.
- **Limitado por datos:** no afirmar equivalencia hasta obtener el artefacto o referencia descritos.
- **Fuera de cobertura:** no aparece en los 18:04 ni queda determinado por los artefactos estudiados; no se puede evaluar como parte de este objetivo.

## Pendientes ordenados y criterios de cierre

### P0 — Medir la versión vigente en navegador

Actualización v0.200: recorrido funcional completo aprobado en Chrome, incluidos jefe, retorno, recargas sin duplicar monedas y exportación/importación. El guion necesitaba usar correctamente movimiento, esquiva, vendas y liberación del arco; no se modificó el balance. Registro, capturas y límites en [VALIDATION_V200_EXPEDITION.md](VALIDATION_V200_EXPEDITION.md). P0 sigue parcial: falta cotejo temporal/visual y los estados no cubiertos del inventario siguiente. La estimación permanece igual.

Actualización v0.195: se comprobó el tutorial nuevo, su reanudación después del rescate y la llegada a la aldea en Chrome; se corrigió un descarte de guardado. El recorrido completo automatizado terminó en derrota durante la expedición. El alcance P0 sigue abierto y la estimación no aumenta. Detalles en [IMPLEMENTATION_V195.md](IMPLEMENTATION_V195.md).

**Estado:** parcial. El ciclo funcional de v0.200 está acreditado por el guion; la grabación/cotejo y los estados adicionales siguientes permanecen abiertos.

1. Registrar navegador, tamaño de ventana, versión `v0.193.0`, partida nueva y guardada/reanudada. No sobrescribir el perfil habitual; usar una copia o perfil aislado.
2. Grabar desde la carga de la partida hasta el retorno a la aldea. Anotar capturas/tiempos que puedan alinearse con el MP4, errores de consola, pantallas atascadas y controles que no respondan.
3. Incluir ambos menús de emotes, barras y HUD; verificar guardado/carga, cierre de diálogos, selección de expedición, victoria/recompensa y regreso.

**Entregable:** grabación/capturas locales, hoja de observaciones por tiempo y errores reproducibles.  
**Cierre:** partida nueva y reanudada completan el recorrido sin bloqueo; cada diferencia importante tiene captura y queda corregida o clasificada como aproximación/dato ausente. La puntuación de estabilidad se actualiza solo con este registro.

### P1 — Igualar el mundo y la cámara en cada tramo

**Estado:** parcial/aproximación local; la forma general está implementada, las colocaciones no son datos originales de sector.

| Tramo de referencia | Qué comparar y ajustar |
| --- | --- |
| Tutorial y bosque inicial, 00:00–01:20 | Suelo, silueta del bosque, obstáculos, vegetación por capas, trayecto, escala, límites y seguimiento de cámara. |
| Aldea, ~01:30–04:00 y ~18:00 | Plaza, casas, tablón, bancos, faroles, senderos, luces, NPC, ratones ambientales, distancias e interacciones. |
| Bosque/encuentros, 04:00–10:00 | Ruta, árboles, troncos, hongos, follaje, profundidad, enemigos, regalos y espacio de combate. |
| Papaille/bosque intermedio, 10:00–13:00 | Posición, retrato, diálogo, objetivo, escala y encuadre. |
| Corredor, 14:00–15:00 | Suelo abierto, tocón, rama, vegetación amarilla, madera, oclusión y colisiones. |
| Arena final, ~17:00–17:20 | Ribera/agua, piedras, primer plano, jefe, cofre, espacio de combate y profundidad. |

**Entregable:** pares de capturas original/local con la misma resolución, estado y tiempo aproximado; lista de diferencias grandes a pequeñas.  
**Cierre:** terreno, composición, cámara, rutas y elementos destacados coinciden visualmente en los fotogramas cubiertos; el movimiento y las colisiones no contradicen lo visible. Las coordenadas aún aproximadas se etiquetan como tales.

### P1 — Igualar acciones de combate observadas

**Estado:** sistemas locales amplios implementados; varios valores y patrones son aproximados y falta comparación secuencial.

Para cada acción que aparece en el video, registrar: entrada → preparación → animación → impacto/curación → cifra/efecto → reacción → recuperación. Cotejar armas, habilidades, proyectiles, guardia/esquiva, selección de objetivo, interrupciones, enemigos, jefe y respuesta/seguimiento de Picpic. Comparar estado, alcance, dirección, temporizador, barra de vida, efectos visuales y sonido.

**Entregable:** matriz de acciones con marca temporal, controles, reacción original y reacción local.  
**Cierre:** todas las acciones visibles tienen secuencia cotejada; las diferencias con evidencia se corrigen; daño, probabilidad, alcance, temporización o IA que no se puedan derivar quedan marcados como reglas locales. No completar contenido de combate que no aparezca en la referencia por conjetura.

### P1 — Cotejar interfaz, diálogos y transiciones

**Estado:** muchos elementos ya usan recursos/textos originales; tamaños y composición de la v0.193 requieren cotejo de navegador.

- Comparar el HUD completo: iconos superiores, chat/estado, barra de habilidades, objetivos, barras sobre actores, cooldowns, retratos, nombres, diálogos y paneles.
- Comparar estados de tutorial y objetivos de Papaille/Mura, aldeas, perfil/equipo, mochila, talentos, trabajos, selector de expedición, regalos/dones, cofre y fin de recorrido.
- Registrar texto original en español, posición, escala, tipografía, márgenes, navegación, confirmación/cancelación y duración de estados transitorios.
- Mantener sin asignación los cuatro iconos pequeños superiores mientras su función no se determine con evidencia. No añadir traducción al francés.

**Entregable:** inventario de pantallas/estados visibles con captura local y referencia emparejadas.  
**Cierre:** cada pantalla/estado visible durante el recorrido tiene comparación; textos y transiciones observables coinciden o tienen diferencia documentada.

### P1 — Cotejar progresión y asociaciones de contenido

**Estado:** sistemas locales presentes; datos de balance, relaciones de objetos y resultados no visibles tienen aproximaciones.

- Contrastar únicamente los valores que se ven: XP, nivel, puntos, nivel de trabajo, monedas, talento, inventario, recompensa, desbloqueo y estado de mascota.
- Para cada prenda/equipo mostrado, trazar `ID de inventario → ranura → recurso/apariencia → pivote/orientación → orden de dibujo` y compararlo con la captura. No inferir esa relación solo por encontrar un PNG.
- Comprobar selección y cancelación de talentos/equipo, estado disponible/bloqueado, persistencia local y continuidad tras reanudar.
- Mantener como aproximadas las curvas, probabilidades, costes, botín y restricciones que dependen de tablas o mensajes del servidor no recuperados.

**Entregable:** tabla de valores observados y registro de asociaciones visuales con referencia/hash del recurso.  
**Cierre:** los datos que sí aparecen coinciden; toda cifra/regla extrapolada está identificada y es reemplazable por dato autoritativo.

### P2 — Igualar audio y acabado

**Estado:** efectos, pistas y ambientes recuperados e integrados en v0.192; v0.193 ajusta los intervalos y vincula el modo musical con la fase de encuentro local. Falta cotejar sincronía, transición y volumen en navegador. La lista proviene de un módulo público de 2021, y la fase local aproxima la bandera de combate que el cliente original recibía del servidor.

- Revisar, por evento, muestra usada, momento, volumen relativo, repetición, atenuación y corte en pausa/cambio de zona.
- Comparar sonidos de interfaz, combate, habilidades, recompensa, ambiente y música con el MP4 y las rutas declaradas por el cliente archivado.
- Revisar animaciones transitorias, orden de capas, oclusión, escalas y respuesta de controles en ventanas equivalentes.

**Entregable:** tabla evento→muestra→tiempo/volumen, con ausencias y aproximaciones anotadas.  
**Cierre:** cada audio claramente audible se reproduce en el evento apropiado o queda documentado como recurso no recuperado; no hay voces duplicadas ni pistas de una escena anterior, y la pausa respeta la referencia.

### P2 — Regresión y recalcular la estimación

Después de cada bloque, repetir partida nueva/reanudada, guardar/cargar y el tramo afectado; conservar evidencia antes/después. Actualizar las mismas siete notas y pesos usados arriba. No cambiar los pesos para aparentar avance.

**Cierre global de la reconstrucción observable:** el flujo de 18:04 puede reproducirse localmente sin bloqueo; cada escena/acción/pantalla/sonido observado fue comparado; las grandes diferencias se corrigieron o explicaron por falta de datos; la estimación usa evidencia de la versión evaluada. Esto no certifica partes del juego que el material no muestra.

## Límites que no se resuelven solo con más código local

| Dato no disponible o no observado | Qué impide afirmar | Qué evidencia permitiría avanzar |
| --- | --- | --- |
| Payloads originales de sectores (`0x8070` y mensajes relacionados) | Coordenadas, composición exacta, colisiones, capas y zonas fuera de cámara. | Payloads/captura original con cuerpos de mensajes, exportación de mapa o referencia visual adicional. |
| Perfil original con vínculo inventario→ranura→apariencia | Correspondencia autoritativa de toda la ropa/equipo. | Exportación original de perfil/equipo o fotogramas inequívocos de cada pieza equipada. |
| Tablas/decisiones del servidor | Balance, costes, probabilidades, botín, desbloqueos y reglas no incluidas en el cliente estático. | Datos originales o observaciones repetibles suficientes para determinar cada regla. |
| Contenido ausente de los 18:04 | Otras zonas, misiones, pantallas, acciones y estados. | Más grabaciones/referencias de esas partes. |
| Ejecución de v0.193.0 en navegador | Estabilidad y semejanza reales de la versión vigente. | Registro local P0 con captura o grabación. |

REA aporta evidencia estática sobre el cliente archivado; no demuestra su ejecución ni recupera decisiones del servidor. Referencias: [hallazgos REA](REA_FINDINGS.md), [progresión](REA_PROGRESSION_FINDINGS.md), [mapas](MAP_RECOVERY.md), [video](GAMEPLAY_VIDEO_NOTES.md) y [lista de cotejo](FIDELITY_COMPLETION_CHECKLIST.md).

## Fuera del alcance y del porcentaje

Autenticación, cuentas, servidores, multijugador, matchmaking, chat, persistencia sincronizada y backend. No son tareas pendientes para alcanzar esta estimación local.
