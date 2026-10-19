# Ropa y armas originales en el renderer local

Se reutiliza la evidencia REA estática `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`, conservada en `rea-client-evidence.json.gz`. Se leyó el código archivado `interfaces/types/EquipementADV.js`, especialmente `deserialiser` (líneas 100–145): cada apariencia contiene piezas con nombre, ID de biblioteca y pivotes X/Y con signo. La textura se construye como biblioteca `equipement/` + ID + nombre + `.png`; los pivotes se aplican literalmente con `pivot.set`. Hay apariencia principal y secundaria. No se ejecutó código archivado.

El binario original decodificado en `original-data/animation-metadata.json` conserva profundidad de conjunto, profundidad de pieza, nombres y pivotes. Desde v0.146, el decodificador lee las profundidades de conjunto y pieza como `int8`, como exige el protocolo; los ocho valores históricos que antes se guardaban como 156/166 ahora están expresados como -100/-90. El renderer también normaliza los metadatos antiguos sin signo para que recursos ya generados sigan dibujándose igual. Las animaciones del ratón ID2 contienen slots `#nombre`; su orden determina qué parte del cuerpo pasa delante de otra. Esta actualización conserva ese orden y dibuja, dentro de cada slot, base y piezas equipadas ordenadas por suma de las profundidades. Así una manga se superpone al brazo sin eliminar su base. Las capas tienen pivotes independientes.

La aplicación de la suma de profundidades dentro de un slot es una reconstrucción local basada en los campos recuperados. La implementación original completa de `ClipAnim` no forma parte del árbol JavaScript archivado analizado; no se ha demostrado su fórmula exacta ni todos sus criterios de desempate. En empates se conserva el orden base y luego el orden solicitado de prendas. No se altera globalmente el orden de las extremidades.

## API

`drawOriginalCreature(ctx, 2, animation, x, y, milliseconds, facing, scale, { clothing: [11, 8, 15] })`

El argumento final es opcional. Las llamadas anteriores mantienen apariencia base y compatibilidad. Las criaturas distintas del ratón ignoran la ropa. Los códigos desconocidos y duplicados se descartan. El cache de combinaciones admite hasta 128 entradas; se limpia al cargar metadatos.

`COSMETIC_SETS` exporta códigos, etiquetas locales y slot recomendado:

- Cabeza: 8,17,18,26.
- Cuerpo: 11,27.
- Capa/capucha: 14.
- Adorno: 15.

Conviene que la interfaz seleccione un conjunto por categoría. Código14 ya contiene piezas de cabeza y puede superponerse con un sombrero independiente. Las etiquetas describen categorías visuales y no pretenden recuperar nombres comerciales originales.

Armas mediante la misma API: 5 (arma de una mano), 6 (escudo), 16 (arma a dos manos), 20 (arco), 22 (arma alternativa de una mano). Ejemplo espada y escudo: `{clothing:[11,8,5,6]}`; arma a dos manos: `{clothing:[11,16]}`. El llamador debe escoger animaciones compatibles, p. ej. `statique:epee2m`/`epee2m_attaque1` para código16 y `statique:arc`/`arc_tir` para código20. El renderer no adivina el arma a partir del nombre de animación.

Todas las imágenes de estos conjuntos están recuperadas y presentes en el manifiesto. No se implementaron tintes, apariencia secundaria de mano izquierda con códigos no descargados, estadísticas de equipo ni disponibilidad histórica de prendas. Tampoco se infiere que el ID de apariencia sea el mismo ID de objeto de inventario. No se ejecutaron tests en esta subtarea, conforme al alcance solicitado; la integración y revisión visual corresponden al juego local.

## Brecha verificada para equipo y apariencias

La lectura estática del cliente archivado confirma que el aspecto exacto de un objeto equipado lo envía el servidor dentro de cada registro `EquipementADV`. En `interfaces/types/EquipementADV.js`, `deserialiser(MSG)` lee el ID de equipo y luego dos apariencias (principal y secundaria); cada apariencia contiene su código, piezas, biblioteca/código de imagen, nombre de pieza y pivote firmado X/Y. También se leen por separado si el objeto es arma y su tipo. `ProtoADV.js` mantiene un índice de `ElementLook`, mientras `InterfaceJoueurADV.initialisation` recibe el `Look` del personaje, las dos armas y la lista de objetos por ranura.

El `data.bin` recuperado incluye 198 definiciones de `ElementLook` con partes y pivotes, pero no contiene la asociación entre los 111 objetos traducidos de inventario y la apariencia que el servidor les asignaba. La tabla de traducciones proporciona nombres y descripciones, no ese vínculo. Los códigos de ropa usados actualmente por el renderer son presets visuales recuperados; el botín local asigna algunos de ellos por una regla provisional en `dist/inventory.js`.

Por eso no se puede completar fielmente el catálogo de ropa equipable ni sus variantes de mano secundaria solo a partir del `data.bin` y los textos. Hace falta un paquete retenido de perfil/equipamiento (`InterfaceJoueurADV`) o una exportación original que contenga las apariencias por objeto. No se debe inferir que el ID de inventario coincida con el código del `ElementLook`, ni generar nombres oficiales a partir de la forma de una prenda. Hasta conseguir esos datos, las apariencias adicionales siguen siendo presets locales y deben etiquetarse como tales.

La evidencia REA reutilizada identifica el árbol archivado y sus límites en [`REA_FINDINGS.md`](REA_FINDINGS.md). Esta verificación es estática; no se conectó el cliente antiguo ni se generó tráfico de juego.

La granularidad de ranuras disponible en el cliente está conservada en [EQUIPMENT_SLOT_RECOVERY.md](EQUIPMENT_SLOT_RECOVERY.md): cabeza, cuello, cuerpo, gafas, boca, orejas, pelaje, cola, guantes, peinado y dos manos. El protocolo envía codeSlot separado del ID del objeto. El enum no proporciona el mapeo de IDs de inventario a ranura o apariencia.
