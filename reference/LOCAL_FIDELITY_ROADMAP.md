# Hoja de ruta para fidelidad local

Actualizado: 2026-10-26  
Versión implementada más reciente: v0.193.0; aún sin cotejo completo de navegador.  
Alcance: experiencia local jugable en navegador; sin cuentas, servidores ni funciones multijugador.

## Estimación ejecutiva

La reconstrucción está en torno a **47% de fidelidad observable** (rango razonable **40–58%**) respecto al recorrido disponible de 18:04 y a los artefactos del cliente recuperados. Esto evalúa similitud, no cantidad de código ni posibilidad de jugar: el ciclo principal se puede jugar localmente, pero muchos detalles visibles, mapas y datos siguen aproximados. La confianza es baja-media porque no hay una grabación de v0.193 comparada en sincronía con la referencia. La versión actual integra música y ambiente originales con tres controles de volumen; v0.193 alinea los cambios de música a la fase local del encuentro e imita los intervalos encontrados en el cliente, pero falta cotejar en navegador selección, mezcla y transiciones. También incluye el perfil con distribución de ranuras observada en REA, el cofre original ID14 con su clip de apertura, la composición vertical del árbol de talentos, dos bancos, cabañas redondeadas, tres ratones ambientales locales y macizos decorativos en la aldea; posiciones y escalas siguen pendientes de cotejo. También incluye diez emotes originales con animación local y el HUD sin tarjeta persistente, con la barra de acciones centrada; ambos cambios requieren cotejo de navegador. La caja de diálogo tiene un retrato y un encuadre compacto aún sin cotejo. El panel de objetivo reproduce texto derecho y validación breve de 500 ms; el tutorial muestra `obj_soins`, la transición del diálogo de Papaille y el regreso de aldea, y el objetivo inicial de la aldea usa `obj_continuez`; el objetivo posterior a la expedición sigue `obj_metier`. En el diálogo de pista de Papaille, el texto y la interacción siguen `obj_papaille`. El HUD y las pantallas de trabajos integran tres iconos recuperados de habilidades; falta comprobar visualmente sus tamaños, alineación y cambios por trabajo. Los cambios anteriores de combate, escenario, experiencia y recompensas también necesitan comparación. No hay evidencia nueva para subir la estimación.

Estimación por dimensión:

| Dimensión | Estado estimado | Qué significa |
| --- | --- | --- |
| Ciclo jugable local | Avanzado, falta cotejo de la versión vigente | Hay tutorial, aldea, expedición, encuentros, recompensas y retorno; falta demostrar el recorrido entero y ajustar sus discrepancias. |
| Fidelidad funcional observable | Parcial | Las acciones principales existen; balance, secuencias y resultados que dependían del servidor se han aproximado localmente. |
| Fidelidad visual | Parcial y desigual | Se usan muchos recursos originales, pero faltan datos de composición de mapas y asociaciones exactas de ropa/equipo; no hay cotejo sincronizado de todas las escenas. |
| Cobertura de datos originales | Incompleta | El cliente y parte de sus recursos se recuperaron; los paquetes de sectores y varias relaciones/tablas que entregaba el servidor no están disponibles. |
| Fidelidad de contenido no mostrado | No estimable | El video y los artefactos recuperados no permiten afirmar equivalencia de escenas, reglas o contenido ausentes. |

El cálculo ponderado detallado y su justificación están en [FIDELITY_GAP_ANALYSIS.md](FIDELITY_GAP_ANALYSIS.md). No se presenta el 47% como una medición automática ni como una promesa de que el proyecto requiere exactamente otro 53% de trabajo.

## Qué falta, en orden de impacto

La v0.154 recuperó 1.645 de las 1.670 imágenes de pieza referidas por el catálogo original de 198 apariencias. Los recursos están archivados y verificables, pero la interfaz aún no los integra porque falta la relación original entre objeto de inventario, ranura y apariencia. Esto amplía el material de trabajo, no cambia el porcentaje de fidelidad. Ver [IMPLEMENTATION_V154.md](IMPLEMENTATION_V154.md) y [CLOTHING_ASSET_COVERAGE.md](CLOTHING_ASSET_COVERAGE.md).

La v0.155 añade el resumen del perfil observado al final del video con los campos que existen en la partida local. La fecha de registro y el identificador de cuenta no se recrean porque no hay datos locales ni evidencia suficiente para ellos.

La v0.156 añadió la acumulación de madera que aparece a la derecha del encuadre en 15:00. El dibujo y su posición local son aproximados y no alteran colisiones; queda pendiente el cotejo del tramo en navegador.

La v0.157 reconstruye la distribución REA del perfil e integra los 12 iconos originales; solo puede poblar cabeza, cuerpo y manos con datos locales. Los slots restantes esperan la relación original entre inventario, ranura y apariencia. La presentación necesita cotejo en navegador y no cambia todavía la estimación global.

La v0.158 recuperó las seis imágenes originales del cofre ID14 y conectó su clip cerrado, abierto y de apertura. La secuencia de 70 fotogramas se eligió del metadata retenido; posición y tamaño necesitan cotejo local. No cambia todavía el 47% porque no hay captura de la reconstrucción comparable.

La v0.159 añade al claro de la laguna el arbolito de hojas claras visible delante del combate y del cofre. Es un dibujo de escenario vertical ordenado por Y, sin colisión; ubicación y escala esperan cotejo en navegador.

La v0.160 añade la rama fina visible en el suelo del corredor en el fotograma 840 (14:00). Su forma y coordenadas son aproximadas; no se modifica la estimación hasta compararla en navegador.

La v0.161 añade un arbolito de hojas amarillas en el borde derecho del corredor que aparece a 14:00 y 15:00. Es un trazado aproximado pendiente de comparación en navegador.

La v0.162 libera las entradas de arma al perder foco de ventana o cambiar de pestaña, como el cliente histórico. No se altera la puntuación hasta comprobar los estados de carga y liberación en navegador.

La v0.163 bloquea el cuarto nivel de cada rama de talentos con el candado original y el aviso de demo observado en `InterfaceTalents.js`. Builds preexistentes se preservan; falta cotejar su presentación en la UI.

La v0.164 apila las ramas del árbol de talentos y utiliza la cenefa original que se ve en el fotograma de 06:20; falta cotejar el tamaño final en navegador.

La v0.165 aplica al arte de cada talento los filtros originales de aprendido/disponible/bloqueado. El estado disponible se decide con reglas locales y aún necesita cotejo.

La v0.166 muestra la mascota al lado del ratón en el retrato del perfil, como en `InterfaceJoueurADV.js` y el fotograma de 17:30; falta ajustar escala y alineación tras comparación local.

| Prioridad | Paquete pendiente | Trabajo concreto | Criterio para darlo por cerrado | Dependencia/límite |
| --- | --- | --- | --- | --- |
| P0 | Cotejo de la versión vigente | Recorrer partida nueva y guardada desde el tutorial hasta el retorno; registrar fallos y diferencias con marca de tiempo y capturas comparables. | Recorrido sin bloqueos; cada diferencia importante queda corregida o marcada como aproximación. | Hace falta probar v0.193 en el navegador de uso y conservar una grabación/capturas locales. |
| P0 | Escenas y mapas visibles | Ajustar terreno, decoración, coordenadas, capas, oclusión, límites, colisiones y transiciones de tutorial, aldea y bosque según el video. | Comparación por tramos a la misma resolución; recorrido y elementos principales coinciden en lo observable. | No se recuperaron los paquetes originales de sectores. Lo no visible solo puede reconstruirse si aparece evidencia adicional. |
| P1 | Equipo, ropa y personaje | Asociar IDs de equipo con ranura, pieza, pivote, orientación y profundidad; terminar los objetos que aparecen en la referencia. | Cada pieza visible tiene asociación trazable y su composición coincide en capturas equivalentes. | Falta el perfil/exportación original que preserva las asociaciones ID→ranura/apariencia. |
| P1 | Combate, enemigos, jefe y Picpic | Cotejar acciones visibles de entrada a recuperación, objetivos, secuencias, reacciones, estados, acompañamiento y efectos. Ajustar únicamente lo respaldado por evidencia. | Matriz de acciones del video resuelta; todo dato inferido queda señalado como local. | Las reglas autoritativas y algunas asignaciones de patrón venían del servidor, que no está recuperado. |
| P1 | Progresión y recompensas | Verificar nivel, XP, talentos, trabajos, regalos, inventario, botín, economía y restricciones visibles. | Cada valor observado coincide; curvas/tablas sin evidencia no se presentan como originales. | Hay pocos puntos para deducir tablas completas; parte de esos datos no forma parte del cliente estático. |
| P1 | Interfaz y textos | Comparar HUD, perfiles, diálogos, objetivos, talentos, selección y recompensas por estado, escala, alineación y tiempos. | Capturas a igual resolución y todos los estados/textos del recorrido con correspondencia. | Textos nuevos en español; no añadir traducciones al francés. |
| P2 | Audio y acabado | Asociar eventos audibles a muestras, volúmenes y tiempos; cubrir efectos ausentes con una decisión explícita y documentada. | Cada evento audible está identificado y cotejado o consta como no recuperado. | Hay 8 imágenes y 2 muestras de audio listadas como 404; ver [ASSET_AVAILABILITY.md](ASSET_AVAILABILITY.md). |
| P0 continuo | Regresión de guardado y estabilidad | Tras los ajustes, comprobar carga, interacción, combate, victoria/derrota, recompensas, retorno y recarga, sin reemplazar el perfil habitual del usuario. | Ningún error bloqueante y guardado previo preservado. | La documentación actual no demuestra una pasada integral de navegador en v0.193. |

## Plan de cierre por etapas

1. **Establecer una línea base:** capturar el recorrido local completo y apuntar errores/diferencias con tiempos que correspondan al MP4. Esto convierte el porcentaje global en una lista observable y evita valorar solo por inspección de código.
2. **Cerrar el P0 visual y de recorrido:** corregir las discrepancias más visibles de mapas, escala, cámara, movimiento, colisiones y transiciones en el contenido mostrado.
3. **Cerrar la composición del personaje y el combate observable:** completar correspondencias de equipo y cotejar las secuencias que aparecen en el video; no inventar comportamiento del servidor.
4. **Cerrar progresión e interfaz:** cotejar cada pantalla, texto y valor que se vea durante el recorrido.
5. **Terminar audio y repetir la pasada:** verificar sonidos y regresión de principio a fin, preservando el guardado.

Las etapas no tienen un porcentaje de trabajo fijo: el material de mapas y las tablas ausentes pueden limitar la fidelidad máxima aun después de implementar lo que sí se observa. La estimación debe revisarse después de una comparación de navegador, no subirse por el mero número de versiones o cambios.

## Fuera de alcance

No faltan tareas online dentro de esta hoja de ruta. Se excluyen autenticación, cuentas, servidores, multijugador, matchmaking, chat, sincronización y backend. La meta es reproducir localmente el comportamiento visible del juego en el navegador.

## Evidencia y límites

- [FIDELITY_GAP_ANALYSIS.md](FIDELITY_GAP_ANALYSIS.md): cálculo ponderado por subsistema y brechas detalladas.
- [GAMEPLAY_VIDEO_NOTES.md](GAMEPLAY_VIDEO_NOTES.md): recorrido y límites de la grabación de 18:04.
- [MAP_RECOVERY.md](MAP_RECOVERY.md) y [MAP_RECOVERY_FOLLOWUP.md](MAP_RECOVERY_FOLLOWUP.md): sectores y contenido de mapa que no se recuperó.
- [EQUIPMENT_SLOT_RECOVERY.md](EQUIPMENT_SLOT_RECOVERY.md) y [CLOTHING_RENDERER.md](CLOTHING_RENDERER.md): datos de ranuras y ropa faltantes.
- [ASSET_AVAILABILITY.md](ASSET_AVAILABILITY.md): recursos inaccesibles y el caso del jefe ID45.
- [IMPLEMENTATION_V147.md](IMPLEMENTATION_V147.md) y [IMPLEMENTATION_V148.md](IMPLEMENTATION_V148.md): últimos cambios de animación del jefe y decoración trazada del corredor.
- [IMPLEMENTATION_V149.md](IMPLEMENTATION_V149.md), [IMPLEMENTATION_V150.md](IMPLEMENTATION_V150.md), [IMPLEMENTATION_V151.md](IMPLEMENTATION_V151.md), [IMPLEMENTATION_V152.md](IMPLEMENTATION_V152.md) y [IMPLEMENTATION_V153.md](IMPLEMENTATION_V153.md): animación de XP, cierre de dones, formaciones rocosas y secuencia de recompensas.
- [IMPLEMENTATION_V158.md](IMPLEMENTATION_V158.md) y [ASSET_RECOVERY.md](ASSET_RECOVERY.md): cofre original ID14 recuperado y animación de apertura de 70 fotogramas.
- [IMPLEMENTATION_V159.md](IMPLEMENTATION_V159.md): arbolito de primer plano trazado de la arena final.
- [IMPLEMENTATION_V160.md](IMPLEMENTATION_V160.md): rama fina trazada del corredor a 14:00.
- [IMPLEMENTATION_V161.md](IMPLEMENTATION_V161.md): arbolito del borde derecho del corredor trazado de 14:00/15:00.
- [IMPLEMENTATION_V162.md](IMPLEMENTATION_V162.md): libera entradas de ambas manos al perder el foco, según REA.
- [IMPLEMENTATION_V163.md](IMPLEMENTATION_V163.md): bloquea con el candado original el último nivel de talentos de la demo.
- [IMPLEMENTATION_V164.md](IMPLEMENTATION_V164.md): apila las ramas del árbol de talentos y reutiliza la cenefa original.
- [IMPLEMENTATION_V165.md](IMPLEMENTATION_V165.md): reproduce con filtros originales los estados visuales de talentos.
- [IMPLEMENTATION_V166.md](IMPLEMENTATION_V166.md): dibuja la mascota junto al ratón en el retrato del perfil.
- [IMPLEMENTATION_V154.md](IMPLEMENTATION_V154.md) y [CLOTHING_ASSET_COVERAGE.md](CLOTHING_ASSET_COVERAGE.md): recuperación de las imágenes originales de apariencias.
- [IMPLEMENTATION_V155.md](IMPLEMENTATION_V155.md): resumen de perfil observado en el fotograma 1050.
- [IMPLEMENTATION_V156.md](IMPLEMENTATION_V156.md): decoración de madera trazada del fotograma 900, pendiente de comparación local.
- [REA_FINDINGS.md](REA_FINDINGS.md) y [REA_PROGRESSION_FINDINGS.md](REA_PROGRESSION_FINDINGS.md): comportamiento del cliente recuperado y límites de lo que permite concluir sobre reglas del servidor.

Estado de verificación de esta estimación: revisión documental; no se ejecutó el juego ni una suite de pruebas para producirla.





