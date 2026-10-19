# Avance v0.19 · Efecto placebo

## Don original 1710

El catálogo español recuperado describe un aumento en la duración de la curación periódica. Cuando una venda inicia el efecto periódico existente (habilitado por su talento), Efecto placebo suma dos segundos a la duración local de seis segundos.

El cliente histórico delega la aplicación al servidor y el texto no especifica cuántos segundos. El valor de dos segundos es provisional. El don no crea curación periódica por sí solo ni modifica su intervalo de un segundo.

## Persistencia y alcance

La duración activa `bandageHot` ya está incluida en los estados del jugador guardados. No hace falta modificar el esquema ni migrar partidas. El don se ofrece con venda como mano secundaria.

El ID y descripción proceden del catálogo recuperado con REA; se reutiliza la evidencia documentada en `TRANSLATION_RECOVERY.md` y `REA_FINDINGS.md`, sin duplicar el análisis del bundle.

Se regeneró `dist/gifts.js` y se comprobó sintaxis con `npm run check` y `node --check scripts/build-gifts.mjs`. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
