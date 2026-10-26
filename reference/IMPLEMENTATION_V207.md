# v0.207 — iconos originales de la esquina superior

Se identificaron las cuatro miniaturas que permanecían pendientes en el HANDOFF. `InterfaceLiensExternesADV.js` archivado declara, en este orden, `KS`, `forum`, `discord` y `twitter`; crea las imágenes `interface/bouton-*.png` y sus enlaces externos. `TFMAdventure.js` llama a `InterfaceLiensExternesADV.afficher()`. Sus siluetas corresponden a la fila visible en los fotogramas de gameplay, incluido [03:00](gameplay-frames/frame-0180.jpg).

Las cuatro imágenes originales de 40×40 se recuperaron desde sus rutas declaradas y viven en `dist/assets/original/interface/external-icons/`. El manifiesto de ese directorio registra URL, tamaños y SHA-256 de las imágenes y de la fuente. `npm run recover:header-icons` permite repetir la descarga. Fue inspección estática y recuperación directa; no se atribuye a una salida nueva de REA.

## Presentación local

La fila se dibuja como imágenes decorativas locales, sin anclas, botones, manejadores ni URLs externas en el HTML. No activa Kickstarter, foro, Discord o Twitter y no añade funciones online. No ocupa el foco de teclado ni se anuncia como controles disponibles.

Se retiró el bloque permanente «MOUSCARPONE / nombre de zona», añadido por la reconstrucción y no observado en esas capturas. El nombre de zona conserva su elemento para lectores de pantalla y los avisos de entrada siguen funcionando. La mención genérica de un nombre de zona en v0.191 no acreditaba este encabezado permanente; esta revisión lo corrige mediante comparación directa.

Los iconos miden 14 px en la captura de 640×360 y crecen hasta su tamaño natural de 40 px. Esta adaptación CSS se basa en su apariencia dentro del video y no se afirma idéntica al escalado DOM original. Los controles locales de mapa, sonido, ayuda y menú conservan sus accesos.

## Validación

El helper de navegador comprueba que las cuatro imágenes estén cargadas desde los archivos locales, tengan dimensiones naturales de 40×40, no haya enlaces/botones en la fila y el encabezado visual haya dejado de ocupar espacio.

- `npm run test:objective-motion`: aprobado a 640×360, incluidos tutorial/reanudación, emotes e indicador de objetivo, sin excepciones.
- [Captura de 640×360](validation-v207/header-640.png): el tablón queda libre del encabezado y la fila corresponde a las cuatro miniaturas originales.
- `npm run test:emotes`: aprobado también a 1280×800, sin excepciones; [captura inspeccionada](validation-v207/header-1280.png).
- `npm run check`: sintaxis correcta en 88 archivos.

No cambian formato ni contenido de partidas. La identificación de los iconos queda resuelta; los controles superiores derechos y el escalado general del HUD siguen pendientes de cotejo. La estimación global permanece en 47%.
