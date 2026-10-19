# REA focal: Chef, ingredientes y Truco de cartas

Investigación del cliente histórico y catálogos ES/FR recuperados. Evidencia real focalizada en `rea-cook-cards/`: cinco módulos, incluidos tres factories extraídos del bundle y dos fuentes AMD. Los factories se conservan byte a byte en `.original.txt`; el análisis añade solo paréntesis y punto y coma para parsear expresiones anónimas inertes. Rangos y hashes en `source-ranges.json`. REA no ejecutó el juego.

Evidencia comprimida: `rea-cook-cards/evidence.json.gz`; identidad, estadísticas y límites: `summary.json`. Se reutilizan ProtoADV y traducciones de análisis anteriores. No se repitió el árbol completo.

Evidence ID: `ev_861f1b9d4051117231e2e78d7073ef84fac0f44625f71b427a72cd8f1085f1b9`. Cinco JS,48618 bytes,13686 nodosAST,cero errores de sintaxis. Las conclusiones se basan en lectura de los originales inventariados por REA; la clasificación automática de hallazgos no reemplaza esa lectura.

## Chef: hechos del cliente

El módulo MobileMarmite recuperado del bundle mantiene tres indicadores y tres emplazamientos `i0`, `i1`, `i2`. Al recibir actualización elimina esos emplazamientos y el emplazamiento `e`, lee un código de imagen de efecto y lo renderiza con `cuisto/e/CODE.png`; después lee cantidad de ingredientes y, por ingrediente, tipo e ID de apariencia. Las apariencias usan `cuisto/IDm.png`.

Los tres indicadores cargan `cuisto/i/i100.png`, `i101.png`, `i102.png`. Los tipos 0, 1 y 2 usan respectivamente tints `#531a00`, `#002253`, `#005332`. Esto respalda tres familias visuales y hasta tres ingredientes mostrados. NO recupera una tabla que vincule tipo/color con ataque, curación o defensa, ni fórmulas de mezcla. El estado de resultado procede del servidor; el cliente no calcula recetas.

**Corroboración posterior de recursos:** CHEF_INGREDIENT_ASSETS.md documenta la visualización de los iconos originales descargados: móvil100=espada/ataque,101=escudo/defensa,102=cruz/curación. Su correspondencia con los indicadores0/1/2 sí queda establecida combinando código y recurso visual. La limitación anterior corresponde al código aislado; la tabla de mezclas/resultados continúa ausente.

La deserialización general registra móviles tipo 100–102 en un índice de ingredientes. El módulo de resaltado, al activar el efecto especial -2 para el jugador principal, busca el ingrediente cercano válido con distancia cuadrada no superior a 40000, ignorando eliminados, muertos u ocultos según flags del móvil. Le añade imágenes `cuisto/i/TYPE.png` y `cuisto/i/zTYPE.png`. Los nombres minificados de flags no bastan para atribuir funciones adicionales.

`ArmeCuistoAjout.js` define dos herramientas: añadir y quitar. Ambas activaciones comprimen verticalmente el personaje a escala0.9. `OutilsArmeADV.js` asigna tipos de arma100 y101 a añadir/quitar. No hay receta ni selección de ingredientes implementada dentro de estas clases.

Mensajes originales en ProtoADV:

- C_MAJ_MARMITE=0x8040: ID móvil l32s y actualización de contenido de marmita.
- C_MAJ_DUREE_CUISSON_MARMITE=0x8065: ID móvil l32s, dos l16 multiplicados por100 y booleano. El receptor dibuja progreso según tiempo restante, total y modo.
- C_SIGNAL_MARMITE=0x8080: ID móvil; señal visual mediante FX87.

El receptor distingue iconos `interface/jauge-cuisson.png` e `interface/jauge-lavage.png`; el booleano cambia entre cocción y lavado. La fórmula muestra progreso y color. No prueba cuánto dura cada receta: los tiempos los entrega el servidor. Sonidos declarados: gaz al pasar de cero a un ingrediente, cuisson1/cuisson2 al aumentar cantidad.

### Camino de entrada para añadir o limpiar

ClavierADV.js:132 deriva clic izquierdo a mano derecha y clic derecho a mano izquierda. Salvo un cursor de habilidad pendiente, la pulsación llama debutClique, y soltar llama finClique. ArmeADV mantiene clicEnCours y, en estado PRET, intenta incantación o activación si hay cargas y está permitido. ArmeCuistoAjout/ArmeCuistoSuppr heredan ese camino genérico. La activación notifica servidor con ID de herramienta mediante S_ACTIVATION_ARME=0x900C; el cliente no manda directamente ID de ingrediente en este camino.

El servidor asigna ambas herramientas a las manos mediante su serialización genérica; OutilsArmeADV identifica100=añadir y101=quitar, pero estos archivos no fijan qué mano recibe cada herramienta al activar Chaudron. Por tanto clic izquierdo para añadir es una inferencia si se asigna100 a mano derecha; no una correspondencia fija recuperada.

La habilidad1009 se activa mediante el mismo camino S_ACTIVATION_COMP que las demás habilidades. No hay función cliente específica que demuestre si la primera activación invoca, recoge del suelo o alterna llevar/dejar caldero; eso se decide en servidor. El highlight cercano ayuda a seleccionar visualmente ingrediente, y las herramientas explícitas añaden/quitan: respaldan una acción manual de mano, pero no prueban la ausencia de recogida automática adicional. La descripción sí prescribe pulsar para limpiar una vez terminada receta. Una simulación local puede asignar manos y tecla para caldero con esas acciones, documentando la asignación y los umbrales como locales.

## Chef: hechos de los textos originales

comp.desc.1009 indica recoger ingredientes soltados por enemigos; el resultado puede causar daño, curar o mejorar defensa según receta. Cuando termina la receta, pulsar limpia el caldero y cura al jugador y su mascota. comp.desc.1010 indica que enemigos atrapados tienen alta probabilidad de soltar ingredientes adicionales; no proporciona esa probabilidad.

Los talentos31–36 describen duración de recetas, caldero atacable, mascota capaz de añadir ingredientes, resistencia al llevarlo y aumentos de cura/daño. Los dones11000–11002 disminuyen frecuencia de una clase de ingredientes. El diálogo41 recomienda carne a ratones robustos y bebida como algo reconstituyente, pero NO es una tabla inequívoca de ingredientes→estadísticas. No inventar una combinatoria y llamarla recuperada.

## Cartas: habilidad original y tensiones entre textos

comp.desc.1012 francés establece extraer un as de una baraja con cuatro tipos:

- Tréboles: refuerza el próximo ataque físico.
- Diamantes: proyectil que inmoviliza y aturde a la primera víctima.
- Picas: proyectil penetrante que causa daño en línea.
- Corazones: cura a aliados en la zona elegida.

La descripción NO establece tres cartas ofrecidas, intercambio, descarte, orden cíclico, elección entre tres ni probabilidad de extracción. El HUD genérico muestra hasta tres habilidades y controles1/2/3; esos slots corresponden también a trabajos y secundaria. No equivalen a una mano de tres ases.

El servidor envía lista de habilidades y puede actualizar icono/tipo de zona/radio de una habilidad existente. Cada entrada lleva ID único l32s, código l16, código icono l16, tipo zona l8, radio l16 y recuperación l32s. Activar envía ID único, ID de objetivo y coordenadas mediante S_ACTIVATION_COMP=0x9005. Las zonas0/1 activan inmediatamente; zona2 permite elegir círculo; zona3 permite orientar línea. Estos datos soportan iconos y selección dinámica, pero no revelan algoritmo de extracción ni una secuencia fija.

Los dones13007/13008/13009 hablan de daño del as de tréboles, mientras comp.desc.1012 habla de potenciar el próximo ataque. Es posible que esos dones modifiquen el ataque potenciado o que existan textos de versiones distintas; el cliente recuperado no resuelve la tensión. El don13006 dice aturdir en vez de inmovilizar, mientras la descripción base dice inmovilizar Y aturdir. No borrar uno de esos efectos base ni reinterpretar todo el sistema basándose solo en un don.

## Base para la siguiente simulación

Se puede implementar un caldero con ingredientes soltados por enemigos, tres slots visuales, fases cocción/efecto/lavado, curación final jugador+mascota y efectos configurables. Las tablas de receta, ingredientes, probabilidades y tiempos deben señalarse como locales hasta recuperar datos de servidor. La selección de ingredientes debe corresponder a entidades cercanas, no a un menú inventado sin evidencia.

Para cartas, conservar las cuatro funciones descritas, representar picas como penetración lineal y corazones con zona aliada. La extracción aleatoria o cíclica es decisión local; ni oferta de tres ni swap están establecidos. Los dones de tréboles/diamantes conflictivos requieren política documentada o permanecer pendientes.

## Catálogo completo de habilidades

Textos ES/FR exactos de las ocho habilidades en `rea-cook-cards/skill-descriptions.json`.

| Trabajo/slot | Código | Nombre FR |
| --- | --- | --- |
| botanist1 |1006| Élixir |
| botanist2 |1013| Main Verte |
| chef1 |1009| Chaudron |
| chef2 |1010| Piège à pique-nique |
| trickster1 |1012| Tour de carte |
| trickster2 |1007| Disparition |
| journalist1 |1011| Reportage |
| journalist2 |1014| Interview |

## Límites

Análisis estático y textos descargados actualmente; no prueban que toda descripción coincida con la demo2019 ni observan ejecución. Las dependencias AMD y los imports minificados no se resuelven completamente. La tabla de recetas y la baraja del servidor siguen ausentes. No se modificó runtime ni se ejecutaron pruebas.
