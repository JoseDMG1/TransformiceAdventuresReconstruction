# Implementación v0.146

## Profundidad firmada en el catálogo de ropa

El cliente original `Look.ElementLook` (fuente conservada en `reference/map-followup/1-Look.js`) lee con `MSG.l8s()` la profundidad del conjunto y la profundidad de cada pieza. Son valores `int8` con signo. El decodificador local `scripts/recover-assets-data.mjs` leía ambos como `uint8`, dejando valores negativos serializados como 156 y 166.

Se añadió la lectura `i8()` y se corrigieron esos dos campos en el parser. También se normalizaron los ocho valores altos de la copia derivada `reference/original-data/animation-metadata.json`: cuatro piezas del código 33 pasan de 156 a -100 y cuatro del código 41 de 166 a -90.

`dist/original-animation.js` conserva la compatibilidad con las copias antiguas sin signo y con los metadatos nuevos firmados. La apariencia base del ratón no contenía valores altos, por lo que `dist/assets/original/creatures.json` y el dibujo de la partida no requieren cambio. Los datos se usan para la apariencia, no para el guardado de progreso.

## Alcance y comprobación

- No cambia el esquema ni la clave de las partidas; no se migran ni sobrescriben guardados.
- No se ejecutó el decodificador completo, porque además de leer los datos realiza descargas de recursos. La normalización de los metadatos existentes se hizo localmente sobre los campos de ropa identificados.
- No se ejecutaron pruebas ni el juego. El efecto visible se espera neutro para los presets actuales; mejora la fidelidad de metadatos y permite representar correctamente profundidades negativas en futuras apariencias originales.
- REA se reutiliza como respaldo de la evidencia estática previamente archivada. El método original `MSG.l8s()` y las llamadas del código recuperado son la evidencia primaria del tipo firmado.
