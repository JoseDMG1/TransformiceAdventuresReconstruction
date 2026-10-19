# Material de Wayback

Los archivos de esta carpeta se descargaron de capturas del dominio original usando el índice [`../wayback-assets.json`](../wayback-assets.json). Son referencias históricas originales y no código de la reconstrucción. No asumir que el código/arte está autorizado para redistribución: comprobar licencias y obtener permiso antes de reutilizarlo en un producto público.

## Contenido recuperado

- `homepage.html`, `I_Style.css`, `configADV.json` (capturas históricas, alguna puede ser una página de bloqueo de Wayback; comprueba antes de confiar en esos tres archivos).
- `tfmadv.js`: bundle minificado del cliente, capturado en agosto de 2019. Para descargarlo fue necesario codificar `?` como `%3F` en la ruta de Wayback; el resultado corresponde a la captura `dist/tfmadv.js?v=0.68.2` y mide 454,899 bytes.
- `dist/Transformice-adventure-client/src/`: 62 archivos de módulos con nombres legibles (armas, pantallas, opciones, talentos, mascotas, mapa, diálogo y entradas).
- `ressources/`: 18 ficheros de soporte, incluidos PNG de efectos y marcos, fuente Grobold y shaders.

El archivo `tfmadv.js` se recuperó de la captura `?v=0.68.2`. Wayback devolvió 404 para el URL sin query, por eso el URL de descarga codifica `%3F`; consulta [`bundle-captures.json`](../bundle-captures.json) para las capturas con versiones disponibles. La lista `download-results.json` contiene las primeras tentativas y sus tamaños. Antes de usar archivos, valida el encabezado/formato: algunas capturas pueden ser páginas HTML de error, no el recurso solicitado.



