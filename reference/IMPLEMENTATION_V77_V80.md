# Desarrollo local v0.77–v0.80

## v0.77: testimonios y guardados

`journalism.js` concentra nombres, símbolos, colores y recursos de los testimonios. El validador de partidas consume ese catálogo: muerte se conserva tanto en el suelo como en la libreta. Se corrigieron su símbolo equivocado en el HUD y su dibujo duplicado.

El icono `interface/temoignage/4.png` es un recurso original recuperado; su asociación con muerte es una asignación visual local. La evidencia disponible no establece el enum original. La resolución ofensiva de muerte y la aplicación de veneno mediante 14006 siguen siendo aproximaciones locales.

El veneno de reportaje dispone de campos propios: `reportPoisonDamage`, `reportPoisonTick`, `reportPoisonTicks` y `reportPoisoned`. Ya no reemplaza el veneno de la daga ni sus marcas de último pulso. La conversión instantánea elimina los pulsos pendientes para evitar daño duplicado. Los campos se validan y sobreviven a la recarga; el formato de partida permanece en v13.

## v0.78: selección y confirmación de habilidades

`targeting.js` mantiene la selección, alcance y confirmación. Seleccionar no consume recarga ni testimonios. Clic izquierdo o J confirman; Escape y clic derecho cancelan. Abrir menús, cambiar de escena o perder el foco cancela el cursor. La selección es temporal y no se restaura como un lanzamiento al cargar.

Elixir utiliza un círculo. Informe utiliza un círculo con dos testimonios. Corazones utiliza un área; las cartas ofensivas utilizan una línea. Las habilidades personales y la recogida siguen siendo inmediatas. Asignaciones por habilidad, radios y alcances son parámetros locales: el cliente recibe esos valores del servidor.

### Evidencia REA nueva

- Operación real: `analyze_javascript_application`, REA 6.5.0, con el loader local documentado.
- Evidence ID: `ev_afce03e82f51bc4cccb94404a332ebf89b46e28d2b7267dfcdd8583bf57566f2`.
- Artefacto: `reference/wayback-client`, SHA-256 `b1de32ffbe96f5c7715fb6fde4a82c35513789e597ee244e6da71e5d5c5c6288`.
- Fuente seleccionada: `dist/Transformice-adventure-client/src/gameplay/InterfaceCompetenceADV.js`.
- Evidencia comprimida: `rea-targeting-v78-evidence.json.gz`; identidad, hash y límites: `rea-targeting-v78-summary.json`.

Las líneas 250–257 leen del mensaje el código de icono, tipo de zona y radio. Las líneas 343–398 distinguen activación inmediata, círculo y línea, y envían el lanzamiento después del clic de confirmación. Esto respalda el flujo de entrada, pero no recupera las asignaciones ni el balance del servidor. Hay 65 archivos inventariados fuera del análisis focal; su contenido no se considera ausente.

## v0.79: consulta de la expedición

La libreta muestra dos espacios y el estado del informe en el HUD. La pestaña **Dones** del perfil muestra nombres, descripciones y repeticiones. Los iconos solo se enlazan cuando se encuentran recuperados localmente; el generador registra `iconAsset` y utiliza el símbolo de familia en los demás casos.

La barra de acciones reutiliza los iconos de arma y mano secundaria de la ventana de equipo. Hay una indicación visible mientras se elige el objetivo de una habilidad.

## v0.80: conexiones y recuperación

`MAPS.dungeon.expedition.connection` reserva una franja transitable en los extremos de cada zona. El generador omite obstáculos procedurales de esa franja después de consumir los mismos números aleatorios que antes; las demás posiciones no cambian al reconstruir un mapa de una partida anterior. La geometría sigue siendo local.

En v0.80 se añadió la cancelación de invisibilidad al usar otra habilidad. La revisión v0.81 retiró esa regla: la descripción española solo establece que el próximo ataque la rompe. La afirmación previa de que el texto respaldaba cancelar por cualquier habilidad era incorrecta.

`boot.js` carga el juego y muestra un panel ante una excepción inesperada o un fallo de importación. La simulación se pausa y el panel permite recargar o descargar la última copia guardada. Una prueba con una excepción controlada comprueba que el JSON guardado no se modifica.

## Comprobación y pendientes

Las pruebas cubren combate, trabajos, talentos, migración de partidas, muerte en libreta/suelo, venenos simultáneos y confirmación/cancelación. Las expectativas antiguas de trabajos y talentos se actualizaron para los IDs estables y los 14 árboles vigentes.

Chrome utiliza un perfil aislado para revisar portada, cursor de área, cancelación, lanzamiento confirmado, recogida de muerte, recarga de libreta, informe, pestaña Dones, cruces entre zonas y recuperación tras una excepción. Capturas: `.local/features-targeting.png` y `.local/features-gifts.png`.

La revisión larga también recorrió tutorial, cambio de equipo confirmado, combate, tres encuentros, cofres, confirmación de don, victoria, recarga sin recompensa duplicada y exportación/importación real. La prueba se actualizó para usar vendas canalizadas, los cursores de habilidades, cofres interactivos y desplazamiento entre zonas. Esto comprueba ese recorrido local; no todos los dones ni la fidelidad completa de cada sistema.

`npm run check` revisó 46 archivos y `npm test` aprobó 28 pruebas.

La revisión no demuestra equivalencia completa con el original. Siguen pendientes el don 1201 y su concepto de mitigación, los sectores originales, las tablas de progresión y botín del servidor y la comparación visual y temporal completa con el MP4.
