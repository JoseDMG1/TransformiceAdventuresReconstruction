# REA — mapa del mundo

- Aplicación: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.
- Rastreo estático de `InterfaceCarteMondeADV.js`: `ev_b55fa8bcd0bd3388bbcebe478adb6d2e36acf1e501908cd8d740c8e1cc2e68b3`; 2 seeds, 198 nodos, 199 relaciones, 5 terminales; cobertura parcial, 3 hechos no disponibles.
- Fuente inspeccionada: `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceCarteMondeADV.js`.

La clase muestra `interface/MAP_pinned.jpg` centrada, limita su tamaño a `90vw` × `85vh` y hace que un clic sobre ella la retire. El proyecto recuperó el recurso en `dist/assets/original/interface/MAP_pinned.jpg`. REA solo observó estáticamente el cliente archivado; no establece una tecla para abrir el mapa.

La reconstrucción local lo expone con el botón «M» de la barra superior y cierra al pulsar la imagen. El acceso por botón es una adaptación local, pues el origen recibía la orden de apertura mediante su flujo de red.
