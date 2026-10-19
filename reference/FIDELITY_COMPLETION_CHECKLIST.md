# Lista de cierre para la reconstrucción fiel local

Actualizado: 2026-10-18  
Versión de referencia: v0.192.0  
Estado: lista preparada; el cotejo completo de navegador está pendiente.

Estimación actual **47% (40–58%, confianza baja-media)**. Consulte [estimación y trabajo pendiente](FIDELITY_ESTIMATE_AND_REMAINING_WORK.md) para el método, alcance y límites. Esta lista mide fidelidad al gameplay de 18:04, no porcentaje de código. No agregar funciones online ni traducción al francés.

Para prioridades, entregables y criterios de cierre por sistema, usar [FIDELITY_BACKLOG.md](FIDELITY_BACKLOG.md).

## P0 — Acreditar la entrega vigente

- [ ] Ejecutar v0.192.0 con partida nueva; grabar desde carga/tutorial hasta el retorno a la aldea.
- [ ] Repetir con partida guardada/reanudada, sin sobrescribir el perfil habitual.
- [ ] Registrar resolución, versión, entradas principales, errores de consola, bloqueos y capturas.
- [ ] Cubrir tutorial, curación de Picpic, aldea, paneles, expedición, combates, dones/recompensas, cofre/jefe, fin de expedición, retorno, guardado y recarga.
- [ ] Con F, cotejar el selector radial de diez iconos y la animación local seleccionada; confirmar que no cambia el guardado.
- [ ] Con el botón, abrir el menú separado y cotejar `/hi`, `/sit` y `/dance` con clips `emote_salut`, `emote_assis` y `emote_danse`; confirmar que se reproducen localmente sin comandos de red ni cambios del guardado.
- [ ] Cotejar la barra centrada y verificar que el perfil conserva el acceso a estadísticas sin panel persistente en el HUD.
- [ ] Adjuntar los archivos/capturas y anotar diferencias respecto a las marcas del MP4.
- **Cierre:** ambos recorridos concluyen sin bloqueo reproducible; los errores restantes tienen reproducción documentada.

## P1 — Cotejar mundo y cámara

- [ ] Tutorial/bosque inicial (00:00–01:20): suelo, límites, obstáculos, vegetación, escala y cámara.
- [ ] Aldea (01:30–04:00 y ~18:00): plaza, casas, tablón, luces, bancos, sendero, follaje, NPC, ratones, distancias e interacciones.
- [ ] Bosque y encuentros (04:00–10:00): rutas, vegetación, troncos/hongos, capas, enemigos y regalos.
- [ ] Papaille y bosque intermedio (10:00–13:00): posición, diálogo, encuadre y primer plano.
- [ ] Corredor (14:00–15:00): terreno, tocón, rama, planta amarilla, colisiones y oclusión.
- [ ] Arena final (17:00–17:20): ribera, agua, piedras, jefe, cofre, escala y profundidad.
- [ ] En cada tramo, cotejar movimiento, seguimiento/límites de cámara, colisiones y transiciones.
- **Cierre:** capturas local/original comparables por tramo; diferencias grandes corregidas o ligadas a sectores ausentes. Las coordenadas trazadas permanecen etiquetadas como aproximaciones.

## P1 — Cotejar combate, controles y audio

- [ ] Para cada acción observada, registrar entrada → anticipación → clip → impacto/curación → respuesta → recuperación.
- [ ] Cotejar armas, habilidades, proyectiles, alcance, orientación, daño/curación visible, estados, interrupciones, enemigo, jefe y Picpic.
- [ ] Revisar arco, guardia, selección/cancelación de objetivos, movimiento durante acciones y pérdida/restauración de foco.
- [ ] Alinear sonidos audibles con evento y momento; marcar muestras/valores que falten.
- [ ] En v0.192, cotejar música de título/base/combate, ambiente, mezcla general/música/efectos y transiciones con la referencia.
- **Cierre:** las secuencias visibles coinciden o cada discrepancia no resoluble tiene evidencia y estado provisional documentados.

## P1 — Cotejar interfaz, objetivos y progresión

- [ ] Capturar HUD, objetivos, diálogo, talentos, trabajos, perfil/equipo, selección de expedición, regalo/cofre y estados de victoria/derrota.
- [ ] Verificar español, textos, escala, tipografía, márgenes, botones, temporizadores, navegación y estados bloqueados.
- [ ] Contrastar objetivos con `InterfaceQueteADV.js` y fotogramas: `obj_soins` (00:10), Papaille (01:00/10:00), `obj_continuez` (02:00), `obj_metier` (18:00).
- [ ] Cotejar valores visibles de XP, nivel, talentos, trabajo, monedas, premios y desbloqueos; no extrapolar curvas con pocos ejemplos.
- [ ] Revisar aprendizaje/reinicio de talentos, cancelación, confirmación y persistencia local.
- [ ] Revisar perfil/ropa y apertura del cofre ID14: posición, escala, pivote, animación y estado abierto.
- **Cierre:** cada pantalla/estado visible tiene equivalente comparado; toda extrapolación queda identificada.

## P1/P2 — Asociaciones visuales y regresión

- [ ] Identificar prendas/equipo visibles y registrar recurso, ID, ranura, pivote, orientación y capa solo con evidencia.
- [ ] Comparar jugador, Picpic, criaturas, objetos y efectos en poses/estados equivalentes.
- [ ] Repetir el recorrido tras los ajustes, verificar guardado/carga y documentar regresiones.
- [ ] Recalcular la matriz con los mismos pesos y adjuntar evidencia antes/después.
- **Cierre:** el contenido afirmado como original tiene asociación verificable; las ausencias quedan explícitas y la puntuación refleja lo observado en navegador.

## Material de referencia

- [Notas del video](GAMEPLAY_VIDEO_NOTES.md)
- [Hallazgos REA](REA_FINDINGS.md) y [progresión REA](REA_PROGRESSION_FINDINGS.md)
- [Recuperación de mapas](MAP_RECOVERY.md) y [ranuras de equipo](EQUIPMENT_SLOT_RECOVERY.md)
- [Estimación completa y límites](FIDELITY_REMAINING_SCOPE.md)





