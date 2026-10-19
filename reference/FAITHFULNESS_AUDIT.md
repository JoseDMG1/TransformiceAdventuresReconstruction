# Auditoría de fidelidad de la reconstrucción

> **Registro histórico:** esta auditoría corresponde a v0.134.0 y fue reemplazada como estimación vigente por [FIDELITY_GAP_ANALYSIS.md](FIDELITY_GAP_ANALYSIS.md), actualizado para v0.144.0. Se conserva para no perder su rúbrica y evidencia de aquella versión.

**Fecha:** 2026-10-17  
**Versión auditada:** local v0.134.0  
**Alcance:** juego local para navegador. Online, cuentas, matchmaking y servidores multijugador quedan excluidos de la puntuación.

## Estimación ejecutiva

| Dimensión | Estimación central | Intervalo razonable | Confianza |
|---|---:|---:|---|
| Fidelidad funcional del recorrido local observable | **53 %** | 43–62 % | Media-baja |
| Fidelidad visual al material observable | **49 %** | 38–58 % | Baja |

Estos porcentajes son una **rúbrica de fidelidad**, no el porcentaje de código terminado, de sistemas catalogados ni del juego completo. Miden cuánto se acerca la reconstrucción a lo que puede observarse en el gameplay aportado y a las conductas respaldadas por el cliente archivado. No cuentan funciones online.

El intervalo es amplio porque faltan mapas/sectores originales, contenido entregado por el servidor y una comparación directa, escena por escena, entre el vídeo y una grabación actual del juego local. La confianza de la cifra visual es especialmente baja: el material disponible se muestreó en capturas cada 30 segundos y no se hizo una evaluación visual ciega con ambas versiones sincronizadas.

## Cómo interpretar la rúbrica

Cada área recibe una puntuación de 0 a 100 según cuatro aspectos: presencia de la función, similitud del flujo visible, respaldo en evidencia original y validación observable en el juego local. La puntuación baja si la característica existe solo como aproximación local, si faltan partes visibles del flujo o si no se verificó en navegador.

Los pesos priorizan el recorrido que aparece en el vídeo. No representan la importancia comercial de cada sistema. La estimación central es el promedio ponderado de las áreas; los intervalos reflejan incertidumbre de evidencia y cobertura, no un intervalo estadístico.

## Fidelidad funcional

| Área | Peso | Puntuación | Estado y motivo principal |
|---|---:|---:|---|
| Recorrido tutorial → aldea → expedición → regreso | 15 % | 65 % | El recorrido local existe y se recorrió en Chrome hasta v0.81. Los cambios v0.82–v0.134 tienen comprobación de sintaxis, pero el recorrido acumulado posterior no está validado. |
| Movimiento, cámara e interacción con el mundo | 10 % | 70 % | Controles, cámara, cruces y numerosas respuestas visuales se ajustaron a código recuperado. Geometría, velocidades y colocación del mundo siguen siendo locales. |
| Combate, armas y comportamiento enemigo | 20 % | 55 % | Hay combate en tiempo real, estados de armas, ataques, enemigos y telegráficos. Daño, IA, objetivos, duraciones del servidor y balance no están completamente recuperados. |
| Trabajos, habilidades, talentos y regalos | 15 % | 55 % | Hay sistemas y un catálogo amplio. Los flujos se apoyan parcialmente en el cliente; varias cifras, asignaciones y combinaciones de dones son aproximaciones. |
| Progresión, equipo, inventario y recompensas | 10 % | 40 % | Hay nivel, experiencia, equipo, mochila y recompensas locales. Las tablas originales de progresión, botín, economía y restricciones no se recuperaron del servidor. |
| Mapas, sectores y composición de encuentros | 15 % | 25 % | El Bosque Susurrante y la aldea son reconstrucciones. No están disponibles los mensajes originales de sectores ni las tablas que determinaban la composición. |
| Mascota y apoyo de aliados | 5 % | 60 % | Picpic sigue, combate, recibe estados y puede ser rescatado. Varios alcances, cifras y reglas de aliados son locales; el vídeo no cubre todas las situaciones. |
| Guardado, carga y recuperación local | 5 % | 70 % | Guardado reanudable, migraciones y exportación/importación existen. La prueba larga documentada corresponde a v0.81; cambios posteriores requieren recorrido actualizado. |
| HUD, menús, diálogos y tutorial | 5 % | 60 % | Se implementaron interfaces y varios recursos originales, pero hay diferencias de disposición y contenido frente al vídeo y la validación posterior a v0.81 es limitada. |
| **Promedio ponderado** | **100 %** | **53 %** | **Estimación de fidelidad funcional local observable.** |

## Fidelidad visual

| Área | Peso | Puntuación | Estado y motivo principal |
|---|---:|---:|---|
| Personaje, ropa y animación del jugador | 20 % | 70 % | Se reutilizan recursos y clips originales recuperados; se aproximaron poses, secuencias, direcciones y tiempos. No se ha comparado toda la ropa/look en una matriz visual. |
| Criaturas, mascota y animación de enemigos | 15 % | 65 % | Hay modelos/animaciones originales recuperados para parte del elenco y se incorporaron ciclos de ataque, movimiento y muerte. El catálogo visible y su configuración no están demostrados como completos. |
| Terreno, vegetación, edificios y composición de mapas | 30 % | 25 % | Es el mayor desajuste visual conocido. La ubicación y el arte de muchos elementos venían en datos de sectores ausentes; el terreno local es parcialmente procedural y basado en el vídeo. |
| HUD, ventanas, iconos y tipografía | 15 % | 45 % | Se recuperaron iconos y recursos de interfaz, pero la composición local no reproduce completamente la jerarquía, densidad y distribución observadas. |
| Efectos, animaciones de combate y respuesta visual | 15 % | 55 % | Se usan FX, clips y sonidos originales donde están disponibles; faltan combinaciones completas y parte del timing/comportamiento aún es aproximado. |
| Audio | 5 % | 55 % | Se recuperaron muestras y se asociaron a varias acciones. El mapeo completo de sonidos de enemigos y escenas no está recuperado. |
| **Promedio ponderado** | **100 %** | **49 %** | **Estimación de fidelidad audiovisual local observable.** |

## Qué está demostrado y qué no

### Demostrado por la evidencia disponible

- El vídeo muestra un recorrido que incluye tutorial, aldea, interfaces de talentos y expedición, combate, regalos de Elisah y regreso a la aldea. La descripción temporal y sus limitaciones están en [GAMEPLAY_VIDEO_NOTES.md](GAMEPLAY_VIDEO_NOTES.md).
- El cliente archivado contiene un render basado en `PIXI.Application`, entrada de teclado/ratón, estados de armas y solicitudes cuya resolución depende del servidor. El análisis REA y sus límites están descritos en [REA_FINDINGS.md](REA_FINDINGS.md).
- Los informes v0.77–v0.80 documentan una prueba larga del recorrido local, con Chrome, guardado y restauración. Esta es evidencia de esa versión y no valida automáticamente los cambios posteriores.
- La implementación v0.134 ajustó las poses estáticas de acuerdo con la llamada original `jouerAnimation("statique", 0, true)`. Su informe solo declara comprobación sintáctica y deja pendiente el recorrido manual.
- Se recuperaron 1,221 archivos bajo `dist/assets/original/`; contar archivos no demuestra que el conjunto de arte original esté completo ni que todos estén asignados correctamente.

### No demostrado o ausente

- Los mapas/sectores exactos, posiciones y decoraciones enviados al cliente durante una partida.
- Tablas y reglas autoritativas de servidor: balance, economía, botín, progresión y restricciones de muchas acciones.
- Equivalencia de todos los trabajos, armas, talentos, dones, ropa, variantes de criatura y combinaciones de efectos.
- La coincidencia de cada escena y transición del MP4 con la versión local actual.
- La ausencia de errores en un recorrido completo de v0.134; solo consta comprobación sintáctica para esa entrega.

## Trabajo pendiente para aumentar la fidelidad

### Prioridad 0 — medir el recorrido real

1. Grabar el juego local actual y comparar contra el MP4 en los mismos momentos: inicio/tutorial, aldea, ventanas, entrada al bosque, cada encuentro, recompensa, jefe y retorno.
2. Capturar movimiento y combate a velocidad normal; las capturas espaciadas cada 30 segundos no bastan para juzgar tiempos, respuesta o animación.
3. Ejecutar una pasada completa en navegador sobre v0.134 y registrar bloqueos, transiciones que faltan, divergencias de objetivos y estados de guardado. La ejecución debe usar un perfil aislado para proteger la partida habitual.
4. Convertir las diferencias observadas en una lista con referencia temporal, imagen local, comportamiento esperado, estado y severidad.

### Prioridad 1 — escenas y elenco

1. Ajustar la geometría y composición de aldea/bosque con referencias sincronizadas; distinguir qué puede medirse del vídeo y qué exige recuperar datos originales.
2. Comparar silueta, escala, orientación, profundidad y oclusión de vegetación, personajes, NPC, mascotas y enemigos.
3. Inventariar por pantalla qué texturas/animaciones originales existen, cuáles se usan y cuáles continúan con fallback o arte provisional.
4. Completar la composición de encuentros solo hasta el límite de evidencia observable; marcar como desconocido el contenido que dependía exclusivamente del servidor.

### Prioridad 2 — comportamiento de juego

1. Recorrer las armas y habilidades con una matriz reproducible: entrada, preparación, momento de efecto, cancelación, recarga y reacción del objetivo.
2. Comparar animación, sonido, efectos y daño visible para las acciones que aparecen en el vídeo.
3. Documentar cada cifra provisional de combate/progresión y no presentarla como valor original.
4. Revisar el guardado tras las secuencias reales que tengan efectos pendientes, victoria, derrota, transición y recompensa.

### Prioridad 3 — presentación

1. Medir resolución, escala de interfaz, márgenes y anclajes del HUD a partir de capturas disponibles.
2. Comparar las ventanas originales visibles en vídeo: talentos, selector de expedición, regalos, diálogo y objetivos.
3. Auditar los textos españoles y la codificación de todos los archivos antes de atribuir caracteres extraños a la interfaz en ejecución.
4. Revisar las asociaciones de audio por personaje/acción y conservar los casos sin evidencia como pendientes.

## Bloqueos de fidelidad que requieren evidencia externa

La inspección del cliente y paquete de inicialización no encontró datos de colocación de sectores. [MAP_RECOVERY.md](MAP_RECOVERY.md) registra que edificios, árboles y composición se suministraban durante el juego; también indica que no se hicieron solicitudes especulativas de rutas. Para obtener geometría exacta haría falta una captura histórica legítima de los mensajes de sectores o una exportación/editor original disponible. Sin ese material, el objetivo razonable es fidelidad visual al vídeo, no recuperar el mapa entero que el vídeo no muestra.

Las cifras del servidor tampoco pueden inferirse con certeza solo desde el cliente. Para esos sistemas se puede reproducir el resultado que se observa en el vídeo y mantener las reglas como aproximaciones ajustables, pero no certificar equivalencia global.

## Criterio para revisar las cifras

Actualizar esta auditoría después de completar una comparación del recorrido local grabado. Las puntuaciones deberían subir solo cuando exista evidencia directa de coincidencia o cuando una aproximación quede confirmada por datos originales. Una mejora de sintaxis, una función presente o más recursos contados no bastan por sí solos para elevar el porcentaje de fidelidad.

## Fuentes del proyecto

- [HANDOFF.md](../HANDOFF.md): estado v0.134, restricciones y pendientes acumulados.
- [REA_FINDINGS.md](REA_FINDINGS.md): evidencia REA del cliente archivado, alcance y límites.
- [GAMEPLAY_VIDEO_NOTES.md](GAMEPLAY_VIDEO_NOTES.md): recorrido observable y límites del MP4.
- [MAP_RECOVERY.md](MAP_RECOVERY.md): límites de recuperación de sectores y datos de mundo.
- [CONTENT_ARCHITECTURE.md](CONTENT_ARCHITECTURE.md): módulos, catálogos, render y persistencia.
- [IMPLEMENTATION_V134.md](IMPLEMENTATION_V134.md): último ajuste visual y validación reportada.
- [IMPLEMENTATION_V77_V80.md](IMPLEMENTATION_V77_V80.md): evidencia de la prueba de recorrido largo hasta v0.81.
