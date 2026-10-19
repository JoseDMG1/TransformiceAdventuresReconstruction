# REA: evidencia para la reconstrucción local

Análisis realizado el 16 de octubre de 2026 con `rea-agents@6.5.0`, operación real `analyze_javascript_application`, sobre `reference/wayback-client`. La evidencia completa está en `rea-client-evidence.json.gz`; el resumen de identidad y límites está en `rea-client-summary.json`.

**Evidence ID:** `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.

**SHA-256 del árbol según REA:** `b1de32ffbe96f5c7715fb6fde4a82c35513789e597ee244e6da71e5d5c5c6288`.

## Método y reparación local

El paquete publicado declara entradas ESM de `@modelcontextprotocol/client` que no existen en el caché instalado; sí incluye las correspondientes entradas CommonJS. `rea-loader.mjs` recupera exclusivamente esos imports ausentes de paquetes `@modelcontextprotocol/` usando sus `.cjs` disponibles. No modifica el paquete, el registro MCP ni la configuración de Codex. El analizador de REA ejecutó su implementación original.

Comando usado, desde la raíz del proyecto (la ubicación del caché puede variar):

```powershell
node --experimental-loader ./reference/rea-loader.mjs C:/Users/Jose/AppData/Local/npm-cache/_npx/ad9a3fdbcad992c6/node_modules/rea-agents/scripts/rea.mjs analyze-javascript-application ./reference/wayback-client --json
```

La salida original se convirtió de UTF-16 de PowerShell a UTF-8 sin alterar el objeto JSON. El JSON completo es grande (~100 MB) porque conserva los grafos semánticos.

REA leyó 66 archivos relevantes y 1,221,015 bytes de texto; analizó 63 archivos JavaScript, visitó 283,224 nodos AST y registró cero fallos de sintaxis. Reconoció 74 hallazgos de aplicación. Sus límites indican que las relaciones AMD no tienen la misma resolución que CommonJS/ESM: `modules: 0` no significa que el juego no tenga módulos.

## Hallazgos observados en el artefacto

Los detalles siguientes se verificaron leyendo el código archivado incluido en la evidencia REA. Son observaciones estáticas, no ejecución del juego original. Todos los archivos se encuentran bajo `dist/Transformice-adventure-client/src/`.

| Sistema | Evidencia local | Comportamiento observado | Aplicación a la primera versión |
| --- | --- | --- | --- |
| Movimiento | `_tfmAdventure/ClavierADV.js`, `ajouterContexteJeu`, `compilationDeplacementJoueurPrincipal` | WASD o flechas; ocho direcciones; al perder foco detiene desplazamiento y manos; muerte/parada/armas pueden bloquear movimiento. | Mantener controles y normalizar diagonales. |
| Manos | `_tfmAdventure/ClavierADV.js`, `cliqueMonde` | Clic izquierdo activa mano derecha; clic derecho activa mano izquierda; una mano interrumpe a la otra. | Espada con clic izquierdo y escudo con derecho. |
| Menú | `_tfmAdventure/ClavierADV.js` | Escape abre/cierra menú. Enter enfoca chat; P alterna interfaz. | Escape para pausa local. |
| Armas | `gameplay/armes/ArmeADV.js` | Estados PRET, INCANTATION y ACTIF; mantiene clic; activación tiene guardia de 350 ms; control de cargas y bloqueo de movimiento. | Implementar estados y tiempos locales ajustables. 350 ms no prueba el balance completo. |
| Espada | `gameplay/armes/ArmeEpee.js` | Activa animación y termina golpe al desactivarse. Desactivación inicial `imageAttaque * 16.6666`, base `imageAttaque = 10`. | Efecto breve de golpe y alcance limitado. |
| Escudo | `gameplay/armes/ArmeBouclier.js` | Activa/termina parada durante uso. | Bloqueo mantenido y dirección de personaje. |
| Trabajos | `interfaces/InterfaceMetierADV.js` | Servidor entrega trabajo principal, secundario desbloqueable, habilidad secundaria y dos IDs de habilidad por trabajo. | Selección local; valores y nombres deben documentarse como reconstruidos. |
| Regalos de Elisah | `interfaces/InterfaceRecompenseRencontre.js` | Oferta de cantidad variable de regalos, ID/categoría, nombre/descripción traducidos, selección única, botón de confirmar. | Mostrar opciones y confirmar una; tres opciones es una elección de diseño si no lo confirma el video. |
| Render | `_tfmAdventure/TFMAdventure.js` | PIXI.Application, capas separadas para mundo e interfaz, resize y texturas remotas versionadas. | Motor de navegador con capas y escalado. |
| Autoridad | `ArmeADV.js`, `InterfaceMetierADV.js`, `InterfaceRecompenseRencontre.js`, `_tfmAdventure/ProtoADV.js` | Solicitudes de armas, trabajos y regalos pasan por protocolo de servidor. | Sustituir por estado/simulación local; el cliente no recupera por sí solo las reglas del servidor. |

### Parámetro de carga del arco

El valor `tempsIncantation` no está codificado como una constante en `ArmeArc.js`. `gameplay/armes/OutilsArmeADV.js`, `recupArme(MSG, MOBILE)`, lee `MSG.l32s()` al deserializar cada arma; `ArmeADV.boucleInterne()` usa ese valor para establecer `tempsFinIncantation`. `ArmeArc.incantation()` adapta además la velocidad de `arc_charge` con `2000 / tempsIncantation`. El paquete de sectores y las tablas/valores enviados por el servidor no están recuperados, y el MP4 muestreado no permite medir una carga identificada cuadro a cuadro. Por tanto, el arco local conserva el valor ajustable provisional de `dist/combat.js`; no hay evidencia para reemplazarlo por una cifra supuestamente original.

## Inferencias y límites

- El árbol recuperado permite reconstruir el flujo de entradas y las pantallas, pero no establece daño exacto, experiencia, IA, inventario completo, mapas, rutas, tablas de botín ni probabilidades originales.
- La fuente declara interfaces y rutas de imágenes que faltan en el archivo recuperado. Declarar una ruta no demuestra que el recurso haya sido recuperado.
- REA no ejecutó bootstrap, HTML, código del juego ni conexiones remotas. Su evidencia no afirma que el cliente histórico funcione hoy.
- El grafo semántico de `tfmadv.js` y `EditeurADV.js` excedió el presupuesto acumulado: conserva hechos estáticos y módulos, pero cobertura semántica parcial. Un script inline de `homepage.html` no fue analizado.
- El video proporcionado debe corroborar apariencia, orden del recorrido y percepción de combate. Las cantidades, IA y geometría provisionales de una primera versión deben mantenerse ajustables.

## Estado de preguntas

Controles, manos, estructura de armas, selección de regalo y estructura de trabajos: respondidos estáticamente. Balance exacto, reglas del servidor, recursos artísticos completos y equivalencia visual: parcialmente respondidos o pendientes. Este análisis justifica un prototipo local de navegador; no una declaración de reconstrucción íntegra del juego.


La evidencia completa se comprimió sin pérdida para conservarla en el proyecto. SHA-256 del JSON sin comprimir: 04b770717f17dc621a4fa0cf842d095f72c958da9f576729fc6fed881f3be8ae. Se verificó que descomprimir produce exactamente los mismos bytes.

