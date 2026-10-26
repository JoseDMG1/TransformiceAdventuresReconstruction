# v0.215 — catálogo completo de apariencias y carga diferida

La inspección encontró dos límites de integración: `creatures.json` exponía solo 14 apariencias y el renderer precargaba únicamente sus imágenes conocidas. Las 198 definiciones y las demás imágenes recuperadas existían fuera de ese recorrido, por lo que añadir un código visual adicional no bastaba para verlo.

## Catálogo y arquitectura

`npm run build:clothing` exporta las 198 definiciones y 1670 piezas desde `reference/original-data/animation-metadata.json` a `dist/assets/original/clothing-looks.json`. Conserva códigos visuales, profundidades firmadas, nombres y pivotes; registra el SHA-256 de la fuente. No añade nombres oficiales, ranuras ni IDs de inventario.

`original-animation.js` utiliza ese catálogo y `clothing-loader.js` carga las piezas locales solicitadas por cada composición. Las llamadas repetidas del bucle de dibujo comparten promesas y no duplican solicitudes. Los conjuntos ya precargados no requieren abrir el manifiesto. Recursos no declarados como disponibles se omiten, y una carga fallida no provoca reintentos por fotograma ni bloquea el juego. Diagnósticos y resultados devueltos son copias aisladas.

La distribución incluye el JSON generado; jugar sigue sin requerir compilación ni paquetes. `recover:clothing` regenera el catálogo antes de recuperar imágenes ausentes. No cambia el formato v13 de partidas.

## Resultado visual y ausencias

El [atlas de navegador](validation-v215/clothing-atlas.json) contiene las 198 definiciones: [2–67](validation-v215/clothing-atlas-1.png), [68–131](validation-v215/clothing-atlas-2.png), [132–195](validation-v215/clothing-atlas-3.png) y [196–201](validation-v215/clothing-atlas-4.png). Los códigos no son consecutivos ni IDs de objetos. Cada celda muestra una definición sobre el ratón base, no una combinación de equipo completa.

189 definiciones tienen todas sus imágenes locales; nueve son parciales por 25 piezas ausentes. Se revalidaron esas rutas exactas: 25 HTTP 404, ninguna pieza recuperada en esta consulta. Algunas faltas corresponden a efectos/poses que no aparecen en el estado estático. Detalle en [ASSET_AVAILABILITY.md](ASSET_AVAILABILITY.md).

La piel gris del código visual 83 y la orientación izquierda aproximan la figura de Papaille de 60 s; se declaran en `characters.js` y se usan también en el retrato. [Captura](validation-v215/papaille.png). Es una composición visual local, sin paquete original que confirme su Look ni el resto de su ropa. Se conserva explícita esa limitación; no se asigna un ID de inventario a ese NPC.

## Validación

- `npm run test:clothing`: tres pruebas aprobadas de deduplicación, ausencia de solicitudes innecesarias, fallos sin reintento y aislamiento de diagnósticos.
- `npm run test:clothing-browser`: aprobado. La primera ejecución detectó las 14 entradas del catálogo anterior; tras integrar el catálogo completo inspeccionó las 198 y comprobó que el código 33, antes fuera de la precarga, cambia píxeles reales del Canvas. El perfil almacenado permaneció idéntico.
- `npm run test:emotes -- --reference-size --scene-reference --village-reference`: aprobado a 640×360. Incluye tutorial, curación/reanudación, diálogo/retrato, aldea, menús y acceso a los tres NPC.
- `npm test`: 39 pruebas aprobadas; `npm run check`: sintaxis correcta en 113 archivos.

Sigue pendiente relacionar objetos y ranuras del inventario con sus apariencias originales y contrastar ropa, capas y poses en el recorrido completo. El atlas facilita esa revisión y no certifica por sí mismo fidelidad de cada combinación.
