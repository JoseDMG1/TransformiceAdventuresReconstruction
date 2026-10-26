# Estimación de fidelidad y trabajo pendiente

Actualizado: 2026-10-26  
Versión evaluada: v0.193.0  
Alcance: reconstrucción local jugable en navegador, sin funciones online.

La lista central y sus criterios de cierre están en [FIDELITY_BACKLOG.md](FIDELITY_BACKLOG.md). Este documento conserva el cálculo ponderado y los límites de la estimación.

## Estimación actual

**Fidelidad observable estimada: 47% (rango razonable: 40–58%; confianza baja-media).** La cifra aproxima semejanza con los 18:04 de gameplay y con datos/recursos originales recuperados mediante REA. No mide código terminado, jugabilidad ni porcentaje del juego completo. La versión v0.193 no se ha cotejado en una sesión de navegador grabada; por eso el rango es amplio y la estabilidad acreditada recibe una nota baja. v0.188 integra diez emotes originales en modo local; v0.189 retira del HUD el panel persistente no observado y centra la barra inferior; v0.190 separa los menús de emotes; v0.191 retira la etiqueta «PARTIDA LOCAL»; v0.192 integra música, ambiente y tres canales de volumen separados; v0.193 ajusta el cambio musical a la fase local del encuentro y a los intervalos documentados. Al faltar comparación equivalente en navegador, se conserva la puntuación anterior.

La reconstrucción contiene un recorrido local amplio —tutorial, aldea, expedición, encuentros, combate, progreso, recompensas y retorno—, pero la existencia de un sistema no prueba que se vea o responda igual que el original. El déficit más grande es el mundo: los mapas están trazados/localmente compuestos y no se recuperaron los sectores originales. El siguiente hito que más reduce incertidumbre es una comparación de navegador de la versión vigente, escena por escena.

| Área | Peso | Nota | Aporte | Pendiente principal |
| --- | ---: | ---: | ---: | --- |
| Flujo local | 15% | 75% | 11.25 | Acreditar el recorrido completo, incluyendo partida nueva y guardada. |
| Mapas, sectores, composición y cámara | 20% | 20% | 4.00 | Alinear cada escena; recuperar sectores o limitarse a lo visible en el video. |
| Combate, habilidades e IA | 20% | 58% | 11.60 | Comparar entradas, tiempos, impactos, reacciones y reglas que sí se observan. |
| Progresión, inventario y recompensas | 15% | 43% | 6.45 | Cotejar valores visibles y resolver asociaciones/tablas ausentes cuando haya evidencia. |
| Personajes, ropa, criaturas y objetos | 15% | 48% | 7.20 | Confirmar apariencias, ranuras, escala, pivotes y capas en poses equivalentes. |
| Interfaz, diálogos, audio y presentación | 10% | 52% | 5.20 | Cotejar capturas, estados, texto, sincronía y muestras. |
| Estabilidad acreditada en navegador | 5% | 30% | 1.50 | No consta recorrido completo documentado de v0.193.0. |
| **Total ponderado** | **100%** |  | **47.20 ≈ 47%** | Rango 40–58%. |

Los **53 puntos** restantes son una brecha de similitud ponderada, no 53% del trabajo ni una estimación de horas. Una parte puede cerrarse con el video y REA; otra requiere artefactos originales ausentes. No se debe prometer 100% para todo el juego: la meta verificable es fidelidad al material disponible.

## Qué falta, en orden de prioridad

1. **Validación de la versión actual (bloqueante para una estimación más precisa).** Ejecutar v0.193.0 en navegador, grabar una partida nueva y otra reanudada desde el tutorial hasta el retorno, anotar resolución, errores, bloqueos y capturas. Incluir el selector/animación local de emotes y el HUD despejado. Sin esto no se puede distinguir una diferencia de fidelidad de un fallo de ejecución.
2. **Comparación visual por escenas.** A la misma resolución y estado, cotejar tutorial, aldea, bosque/encuentros, Papaille, corredor y arena final. Corregir primero siluetas, suelo, rutas, cámara, posiciones y escala; luego capas, colisiones, vegetación y detalles. Las coordenadas deducidas de fotogramas son aproximaciones, no datos de sector.
3. **Comparación funcional de acciones visibles.** Para cada ataque, habilidad, curación, interacción y reacción observada, registrar entrada → anticipación → animación → impacto/efecto → reacción → recuperación. Ajustar tiempos, orientación, alcance, estados, IA, HUD y audio cuando la referencia lo determine.
4. **Cotejo de interfaz y progresión.** Capturar HUD, objetivos simultáneos, diálogos, talentos, trabajos, perfil/equipo, selección de expedición, regalo/cofre y victoria/derrota. Igualar solo los textos y valores confirmados por video o cliente; mantener etiquetados los valores extrapolados. Interfaz en español; no añadir francés.
5. **Asociación de contenido visual.** Vincular cada prenda/objeto observado con recurso, ID, ranura, pivote, orientación y orden de dibujo cuando la evidencia lo permita. La recuperación de PNG sin la relación inventario→ranura→apariencia no confirma qué pieza corresponde a cada objeto.
6. **Audio y pasada de regresión.** Asociar sonidos audibles con eventos y tiempos; marcar muestras ausentes. Repetir el flujo tras las correcciones, verificar guardado/carga y documentar fallos reproducibles.

### Criterio de cierre de la primera reconstrucción fiel

- Cada tramo y estado que aparece en los 18:04 tiene captura/acción local comparable o una diferencia explícitamente anotada.
- El recorrido nuevo y reanudado llega al retorno sin bloqueos reproducibles.
- Las discrepancias de mayor impacto visual y funcional están corregidas o clasificadas como limitadas por datos ausentes.
- Las reglas no verificables están identificadas como aproximaciones locales; no se presentan como comportamiento original confirmado.
- La matriz se recalcula con los mismos pesos usando evidencia de la versión probada.

## Límites que requieren evidencia adicional

| Ausencia | Qué impide afirmar | Qué lo resolvería |
| --- | --- | --- |
| Payloads originales de sectores de mapa (`0x8070` y relacionados) | Geometría, coordenadas, capas, colisiones y zonas fuera del encuadre. | Datos originales de sectores obtenidos legítimamente; en su defecto, solo se puede reproducir lo visible en el video. |
| Relación autoritativa inventario→ranura→apariencia | Atuendos exactos y asignación de todos los slots. | Exportación original de perfil/equipo con IDs y ranuras o evidencia visual inequívoca. |
| Tablas/reglas que decidía el servidor | Balance, costes, probabilidades, botín, desbloqueos y casos no visibles. | Tablas originales o varias observaciones repetibles que revelen cada valor. |
| Contenido fuera del video | Zonas, misiones, estados y objetos no observados. | Más referencias originales de esas partes. |
| Comparación local grabada de v0.193.0 | Fidelidad y estabilidad reales de la entrega vigente. | Grabación/capturas locales con recorrido y resolución registrados. |

Estos faltantes no impiden jugar localmente. Sí impiden afirmar equivalencia completa con el juego original. Autenticación, cuentas, servidores, chat, matchmaking, multijugador y sincronización están excluidos del alcance y del porcentaje.

## Documentos relacionados

- [FIDELITY_REMAINING_SCOPE.md](FIDELITY_REMAINING_SCOPE.md): lista operativa ampliada y dependencias.
- [FIDELITY_BACKLOG.md](FIDELITY_BACKLOG.md): backlog priorizado, estados, entregables y criterios de cierre por sistema.
- [FIDELITY_GAP_ANALYSIS.md](FIDELITY_GAP_ANALYSIS.md): matriz ponderada y brecha por área.
- [FIDELITY_COMPLETION_CHECKLIST.md](FIDELITY_COMPLETION_CHECKLIST.md): registro de cotejo por escena/sistema.
- [GAMEPLAY_VIDEO_NOTES.md](GAMEPLAY_VIDEO_NOTES.md): observaciones y marcas de tiempo del MP4.
- [REA_FINDINGS.md](REA_FINDINGS.md), [REA_PROGRESSION_FINDINGS.md](REA_PROGRESSION_FINDINGS.md): evidencia del cliente y límites.





