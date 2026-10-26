# v0.199 — recursos originales del diálogo

El diálogo local integra `par9dialoguePNJ.png`, `noms_left.png`, `noms_mid.png` y `noms_right.png`, recuperados de las rutas explícitas del cliente archivado. La textura `bois2.png` procede de ese archivo local. `dist/assets/original/interface/dialogue/manifest.json` registra rutas, dimensiones y SHA-256 de imágenes y fuente; `npm run recover:dialogue` permite repetir la recuperación.

La fuente es `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceDialogueADV.js`: panel de 600 unidades, borde segmentado de 70, anchura de borde de 100, retrato de 200, nombre con remates de 40 y altura de 71. La presentación local conserva esas proporciones del marco y rótulo con escala adaptable. Retira la caja genérica del retrato y sitúa el nombre debajo, sobre el borde inferior. El retrato sigue usando el renderer local y su lienzo de 96×84, sin deformarlo a un cuadrado.

## Validación

- `npm run check`: sintaxis correcta en 79 archivos.
- `npm run test:tutorial:reference`: Chrome a 640×360, rescate de Picpic, recarga, conversación y regreso a la aldea sin excepciones; comprueba separación del panel y barra y acceso a botones después del diálogo.
- `npm run test:tutorial`: mismo recorrido a 1280×800 aprobado.
- Capturas inspeccionadas: [640×360](validation-v199/papaille-640.png) y [1280×800](validation-v199/papaille-1280.png). El guion espera ahora 2.5 segundos para capturar completa la primera frase de Papaille.

No cambia el esquema de guardado, combate ni progresión. Las pruebas de navegador usan un perfil aislado.

## Límites y siguiente trabajo

La escala global, fuente, altura adaptable al español y botón de continuación siguen siendo decisiones locales; no se ha reconstruido la paginación original por altura de 110 unidades. El marco original no prueba fidelidad del resto del tutorial: faltan criatura de carga, separación de personajes, encuadre y detalle del escenario. La estimación provisional continúa en 47%; el recorrido completo de expedición sigue sin acreditarse.

La evidencia nueva procede de inspección estática del JavaScript archivado y de descargas desde sus referencias exactas, no de una nueva salida REA. El diagnóstico `npx -y rea-agents@6.5.0 doctor --client codex --json` falló con `ERR_MODULE_NOT_FOUND` en `@modelcontextprotocol/client/dist/index.mjs` (Node 24.18.1). No se modificó la configuración de REA ni se instalaron motores externos. Los informes REA anteriores conservan su alcance.
