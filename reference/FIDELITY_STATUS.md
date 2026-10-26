# Estado de fidelidad local

Actualizado: 2026-10-26  
Versión evaluada: v0.193.0  
Alcance: reconstrucción local jugable en navegador. Funciones online excluidas.

## Estimación

**Fidelidad observable estimada: 47% (intervalo razonable: 40–58%; confianza baja-media).** Es una valoración de semejanza con el gameplay disponible de 18:04 y con la evidencia del cliente/recursos originales recuperados mediante REA. No significa que esté implementado el 47% del código, que solo se pueda jugar el 47%, ni que falte exactamente el 53% de horas de trabajo.

La reconstrucción cubre un recorrido local amplio: tutorial, aldea, expedición, encuentros, combate, progreso, recompensas y retorno. v0.192 integra audio original de intro, exploración, combate y ambiente con controles de mezcla separados; v0.193 ajusta los cambios de música a la fase local del encuentro y a los intervalos del cliente original. Aún no se ha cotejado la sincronía en navegador. La brecha principal está en la geometría y composición de los mapas, seguida por las reglas y valores que el original recibía del servidor y todavía no se han podido verificar. No consta una grabación completa de v0.193.0 comparada escena por escena con el video; por eso el intervalo es amplio y la nota de estabilidad es baja. La cifra no se presenta como una medición del juego ejecutándose.

| Área | Peso | Estimación del área | Aporte ponderado | Trabajo de mayor impacto |
| --- | ---: | ---: | ---: | --- |
| Flujo local | 15% | 75% | 11.25 | Acreditar recorrido nuevo y reanudado hasta el retorno. |
| Mapas, sectores, composición y cámara | 20% | 20% | 4.00 | Cotejar escenarios visibles; la geometría exacta de sectores no está recuperada. |
| Combate, habilidades e IA | 20% | 58% | 11.60 | Ajustar secuencias observables y separar reglas confirmadas de valores locales. |
| Progresión, inventario y recompensas | 15% | 43% | 6.45 | Cotejar valores visibles y asociaciones de objetos con ranuras. |
| Personajes, ropa, criaturas y objetos | 15% | 48% | 7.20 | Confirmar apariencias, asociaciones, escala, pivotes y capas. |
| Interfaz, diálogos, audio y presentación | 10% | 52% | 5.20 | Comparar capturas, estados, textos y sincronía a resolución equivalente. |
| Estabilidad acreditada en navegador | 5% | 30% | 1.50 | Registrar una pasada completa de la versión vigente. |
| **Total ponderado** | **100%** |  | **47.20 ≈ 47%** | Intervalo total: 40–58%. |

La brecha aritmética es 52.8 puntos ponderados. Sirve para priorizar; no es porcentaje de código pendiente ni pronóstico de duración. El rango expresa incertidumbre de cobertura y cotejo, no una probabilidad estadística.

## Pendientes prioritarios

1. **Cotejar v0.193.0 en navegador:** grabar un recorrido nuevo y uno reanudado, desde el tutorial hasta el retorno; anotar resolución, errores, bloqueos y capturas sincronizables con el MP4.
2. **Ajustar escenas y cámara:** comparar tutorial, aldea, bosque/encuentros, Papaille, corredor y arena final. Priorizar silueta, terreno, posiciones, escala, capas, colisiones y encuadre.
3. **Cotejar acciones de combate:** registrar entrada, anticipación, animación, impacto, reacción y recuperación para las acciones visibles; conservar como aproximaciones las reglas que no determina la evidencia.
4. **Cotejar pantallas y progreso:** HUD, objetivos, diálogos, trabajos, talentos, perfil/equipo, expedición, recompensas, cofre y retorno. Confirmar valores solo con el video o evidencia original.
5. **Completar asociaciones de apariencia y audio:** relacionar IDs con ranuras/piezas cuando haya evidencia y alinear las muestras audibles con sus eventos.
6. **Verificar emotes y HUD:** **F** abre el selector radial de diez iconos. El botón de la pastilla es una función distinta en el cliente original: ofrece `/hi`, `/sit` y `/dance`. v0.190 separa los accesos y reproduce localmente los tres clips; falta cotejar su posición, escala y duración en navegador.

## Límites de la estimación

- El MP4 de 18:04 solo permite estimar lo que se ve y se oye en ese recorrido.
- No están disponibles los payloads originales de sectores de mapa, así que las coordenadas, geometría y zonas fuera de cámara no se pueden certificar.
- No se recuperaron todas las asociaciones autoritativas entre inventario, ranuras y apariencia ni todas las tablas/reglas que decidía el servidor.
- El cliente y muchos recursos originales ayudan a reconstruir presentación y mecánicas, pero por sí solos no demuestran reglas de servidor.
- Contenido fuera de la grabación no es estimable sin referencias adicionales. Por ello, “100% del juego original” no es una meta verificable con el material actual; el criterio alcanzable es fidelidad documentada al recorrido y a la evidencia disponible.

## Alcance excluido

Esta estimación cubre solo el juego local de navegador. Autenticación, cuentas, servidores, multijugador, matchmaking, chat y sincronización quedan fuera del alcance y del porcentaje.

## Documentación de trabajo

- [Backlog priorizado con criterios de cierre](FIDELITY_BACKLOG.md)
- [Estimación detallada y trabajo pendiente](FIDELITY_ESTIMATE_AND_REMAINING_WORK.md)
- [Matriz de brecha ponderada](FIDELITY_GAP_ANALYSIS.md)
- [Alcance restante y dependencias](FIDELITY_REMAINING_SCOPE.md)
- [Lista de cotejo de cierre](FIDELITY_COMPLETION_CHECKLIST.md)
- [Hoja de ruta local](LOCAL_FIDELITY_ROADMAP.md)
- [Notas del gameplay](GAMEPLAY_VIDEO_NOTES.md)
- [Hallazgos REA](REA_FINDINGS.md) y [hallazgos de progresión](REA_PROGRESSION_FINDINGS.md)




