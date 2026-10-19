# Implementación v0.162 — liberar entradas al perder el foco

## Cambio

La pérdida de foco de la ventana y el cambio de pestaña ahora comparten una limpieza de entradas: cancelan el apuntado pendiente, detienen la carga sonora, vacían teclas y botón izquierdo, liberan el arco y bajan la guardia. La pestaña oculta continúa guardando la partida en curso.

Al liberar el arco se conserva la lógica ya implementada: si aún no completó la preparación, se interrumpe; si ya estaba listo, pasa al estado de liberación y espera su margen normal. No se cambia el daño, el balance ni el formato de guardado.

## Evidencia REA

- En el `ClavierADV.js` archivado, `ClavierADV` registra `defPerteFocus`: pone en falso las cuatro direcciones, recompila el desplazamiento y llama `finClique()` para ambas manos.
- La reconstrucción ya detenía movimiento/guardia, pero no liberaba el arco cuando se perdía un evento `keyup` o `pointerup`. Ahora `releaseBow()` reproduce la transición de liberación/interrupción correspondiente a la mano.
- La evidencia es estática del cliente histórico; los detalles de tiro continúan usando las reglas locales ya documentadas.

## Persistencia y verificación

- No modifica el estado persistido; el guardado al ocultar la pestaña se mantiene.
- No añade funciones online ni traducciones al francés.
- No se ejecutaron pruebas ni navegador. Queda pendiente comprobar pérdida de foco durante carga temprana, carga completa y guardia, y confirmar que el juego reanuda la simulación sin saltos.

