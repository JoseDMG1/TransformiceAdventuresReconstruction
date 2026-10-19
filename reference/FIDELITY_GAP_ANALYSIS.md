# Matriz de brecha de fidelidad local

Actualizado: 2026-10-18  
Versión evaluada: v0.192.0  
Alcance: solo juego local en navegador; online excluido.

## Resultado

La estimación central es **47%**, con rango razonable de **40–58%** y confianza baja-media. El cálculo es una valoración experta de semejanza observable con el MP4 de 18:04 y evidencia/recursos originales. No es porcentaje de código o de jugabilidad. v0.188.0 añadió el selector radial, v0.189.0 retiró el panel persistente del HUD, v0.190.0 separó los menús de emotes, v0.191.0 retiró la etiqueta local y v0.192.0 integró música/ambiente originales; aún no hay comparación completa grabada de v0.192.0, así que se conserva la estimación.

| Área | Peso | Nota estimada | Aporte actual | Brecha ponderada |
| --- | ---: | ---: | ---: | ---: |
| Flujo local | 15% | 75% | 11.25 | 3.75 |
| Mapas, sectores, composición y cámara | 20% | 20% | 4.00 | **16.00** |
| Combate, habilidades e IA | 20% | 58% | 11.60 | 8.40 |
| Progresión, inventario y recompensas | 15% | 43% | 6.45 | 8.55 |
| Personajes, ropa, criaturas y objetos | 15% | 48% | 7.20 | 7.80 |
| Interfaz, diálogos, audio y presentación | 10% | 52% | 5.20 | 4.80 |
| Estabilidad acreditada en navegador | 5% | 30% | 1.50 | 3.50 |
| **Total** | **100%** | — | **47.20 ≈ 47%** | **52.80** |

La mayor brecha medible está en los escenarios. La primera tarea sigue siendo grabar y comparar la versión vigente: eso puede descubrir fallos y estrechar el rango, pero no garantiza que el porcentaje suba. La matriz detallada, tareas y datos ausentes están en [FIDELITY_ESTIMATE_AND_REMAINING_WORK.md](FIDELITY_ESTIMATE_AND_REMAINING_WORK.md) y [FIDELITY_REMAINING_SCOPE.md](FIDELITY_REMAINING_SCOPE.md).

## Cómo leer la brecha

- **Mapas (16 puntos):** comparar y corregir las escenas visibles; los sectores exactos no están recuperados.
- **Progresión (8.55):** cotejar valores que aparecen; completar asociaciones/tablas solo con datos autoritativos.
- **Combate (8.4):** cotejar las acciones grabadas; marcar como provisionales los valores decididos originalmente por el servidor.
- **Personajes/objetos (7.8):** confirmar las piezas visibles y sus ranuras; la mera presencia de un recurso no prueba su asignación.
- **Interfaz/audio (4.8):** comparación a resolución y estado equivalentes, incluidas sincronía y estados transitorios.
- **Estabilidad (3.5):** falta documentar en navegador el recorrido nuevo y reanudado de v0.192.0.
- **Flujo (3.75):** demostrar cada transición observada sin bloqueos.

No sumar versiones, código o imágenes recuperadas como avance porcentual hasta cotejarlos en el juego. Cuentas, servidores, multijugador, chat, matchmaking y sincronización no pertenecen a esta matriz.





