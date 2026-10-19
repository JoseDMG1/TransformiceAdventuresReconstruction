# REA — selector de expediciones

- Evidence de la aplicación: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.
- Rastreo estático REA de `InterfaceSelectionDonjonADV.js`: `ev_1616813129e63830f36bde7c3dec62905f4ae63745cb0976893f8d731173cafa`; 2 seeds, 198 nodos, 199 relaciones, 5 caminos terminales; cobertura parcial y 3 hechos no disponibles.
- Fuente inspeccionada: `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceSelectionDonjonADV.js` y `InterfaceLancementDonjonADV.js`.

## Observaciones estáticas

- La ventana lista los dungeons recibidos, permite elegir uno y muestra su miniatura, título y selección de dificultad.
- La constante `NOMBRE_NIVEAUX_DIFFICULTE` es 1 en el artefacto archivado.
- Confirmar elección envía nombre del dungeon y dificultad por `ProtoADV`; las ventanas de búsqueda de grupo/lanzamiento también envían solicitudes al servidor.
- El selector declara una vista previa de 400 × 300. El paquete archivado local no contiene miniaturas de dungeons, solo el marco del selector.

## Adaptación local

El selector offline enumera las entradas de `MAPS` que declaran `expedition`, actualiza título/descripción/tema de vista previa, dificultad y longitud local, y comienza el mapa seleccionado. La vista forestal actual es un esquema CSS marcado como provisional, no una miniatura original. La búsqueda de grupo y el lanzamiento online permanecen fuera del alcance sin servidor. Los hallazgos son estáticos; no prueban que el cliente original ejecutara ese flujo en runtime.
