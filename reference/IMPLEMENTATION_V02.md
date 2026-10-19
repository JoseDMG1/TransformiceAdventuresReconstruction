# Versión local 0.2 — persistencia y continuidad

Fecha: 2026-10-16. Esta iteración mantiene el alcance individual para navegador y añade continuidad entre sesiones.

## Cambio

La v0.1 guardaba solo el perfil y volvía a la aldea al recargar. La v0.2 conserva una instantánea de la escena: posición y vida del jugador, compañero, enemigos, etapa/encuentro, regalos, enfriamientos, zonas de habilidad activas y proyectiles. El mapa se regenera con la misma semilla y luego se aplica el estado guardado.

Al reanudar una elección de regalo se vuelve a abrir la misma oferta determinista. La victoria se representa con una pantalla sin volver a otorgar monedas/experiencia. Las conversaciones y partículas no se conservan. Una partida guardada sin jugador vivo vuelve a un punto seguro.

El esquema es propio de esta reconstrucción local, no una recuperación del formato de cuenta del servidor original. Las partidas v1 migran el perfil; no se inventa la expedición que esas partidas nunca almacenaron.

## Copias y validación

Se puede exportar desde el menú e importar desde menú o portada. La importación limita el archivo a 200 KB, valida versión y estructura, normaliza números/coordenadas y acepta solo contenidos conocidos. Se presenta nombre, nivel y ubicación antes de confirmar. Los textos del archivo se escapan antes de mostrarlos; no se ejecuta código importado.

La simulación continúa usando los mismos recursos locales. La importación no envía archivos a servicios externos ni altera el cliente histórico de referencia.

## Validación

- `npm run check`: sintaxis de módulos y servidor.
- `npm test`: cinco casos que cubren migración, instantánea de combate, archivos inválidos, normalización y estados pendientes/muerte.
- `npm run test:browser`: recorrido completo aprobado, recarga durante una expedición, regalos/victoria sin repetición de botín, exportación de un JSON real, selección de archivo inválido y válido mediante el input, carga y conservación del progreso.
- `node scripts/smoke.mjs --title-only`: comprobación dirigida del importador desde la portada y su cierre con Escape.

## Investigación adicional

Se recuperaron cuatro módulos públicos adicionales que explican la recepción de sectores y elementos de escenario. Las rutas de mapas y sus recursos provienen de paquetes de servidor que no están en `data.bin`. No se recuperaron todavía los mapas originales. Ver `MAP_RECOVERY.md`; no confundir esta investigación estática con haber observado al servidor o reconstruido ya su geometría.
