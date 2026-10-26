# HANDOFF - Transformice Adventures Reconstruction

Actualizado: 2026-10-26. Reconstruccion local de la demo observable. Siguen pendientes mapas exactos y datos que entregaba el servidor original.

Version actual: v0.213.1. Ultima entrega: reference/IMPLEMENTATION_V213.md. El numero de version no equivale a porcentaje de fidelidad.

Estimacion de fidelidad local: 47% (rango 40-58%, confianza baja-media), excluyendo online. Es similitud con el recorrido observado, no porcentaje de codigo terminado ni equivalencia con todo el juego. No consta una comparacion completa de navegador para v0.193.0; la cifra es una estimacion documental, no una prueba de la version actual. El documento operativo principal es `reference/FIDELITY_BACKLOG.md`: prioridades, evidencia necesaria, entregables y criterios de cierre. El cálculo está en `reference/FIDELITY_ESTIMATE_AND_REMAINING_WORK.md`; `reference/FIDELITY_REMAINING_SCOPE.md` amplía dependencias y límites. Los 52.8 puntos ponderados de brecha no equivalen a horas ni a porcentaje del codigo pendiente. `reference/FIDELITY_COMPLETION_CHECKLIST.md` permite registrar el cotejo.

La ruta priorizada esta en reference/LOCAL_FIDELITY_ROADMAP.md. La recuperacion de apariencias amplia los recursos originales disponibles, pero no cambia la puntuacion hasta que los datos puedan asociarse correctamente y mostrarse en el juego.

## Cambios recientes y siguiente trabajo
- v0.213: composición del tutorial con suelo irregular, masas de tréboles/flores, troncos y tocones; coordenadas iniciales de Picpic ajustadas al fotograma 0. Criatura de tiro junto al carro como trazado estático local, sin asignar ID original. Retirados anillo y etiqueta locales sobre la mascota caída, no observados en el arranque; conserva barra vacía. Ver `reference/IMPLEMENTATION_V213.md` y comparador HTML. Quedan arte, perspectiva, posiciones y animación de la criatura aproximados.
- v0.212: escala del mundo ligada al lienzo lógico original de 1280–1920; a 640×360 usa 0,5 en lugar del mínimo local 0,65. Cámara de seguimiento sin desplazar al personaje por límites del rectángulo de mapa; fondo de continuidad al mirar fuera. Ver `reference/IMPLEMENTATION_V212.md`; sigue siendo proyección ortográfica y el terreno periférico no recuperado necesita composición.
- v0.211: recuperados `objectif.mp3` y `objectif2.mp3` a partir del motor de audio original y sus llamadas. Aviso al terminar la entrada del objetivo, duración de 4 s, cierre con clic y salida de 1 s según `NotificationADV`; sin mensajes de red. Ver `reference/IMPLEMENTATION_V211.md`, manifiesto y capturas; faltan cotejo de escala/volumen y secuencia original de objetivos.
- v0.210: corregida acción de arco atascada al reanudar. Guardado conserva liberación/reloj, no restaura botones mantenidos y recupera impactos antiguos sin duplicarlos. El reloj usado por el juego se comparte con las pruebas. Ver `reference/IMPLEMENTATION_V210.md`; validación de navegador enfocada y 39 pruebas aprobadas.
- v0.209: modelo de objetivos independientes, catálogo de instrucciones y presentación DOM separados. Cola de 500 ms, entrada/salida de 1500 ms y validación de 500 ms según el cliente archivado; la marca persiste hasta retirar el objetivo. El rescate, Mura y encuentros validan explícitamente; cambiar de escena reinicia la lista sin afirmar que se completó. Ver `reference/IMPLEMENTATION_V209.md`; falta la secuencia autoritativa de objetivos simultáneos, notificaciones y sonidos originales.
- v0.208: retirados los tres botones grandes superiores derechos añadidos localmente. Mapa y silencio pasan al menú (Esc/pastilla); Controles conserva ayuda y corrige F=emotes, 3=habilidad secundaria. Inicialización de audio tolera que el botón solo exista con el menú. Ver `reference/IMPLEMENTATION_V208.md`; el menú local conserva opciones adicionales de prueba.
- v0.207: identificados y recuperados los cuatro iconos superiores (Kickstarter, foro, Discord y Twitter) mediante `InterfaceLiensExternesADV`. Se muestran como imágenes locales decorativas, sin enlaces. Retirado el encabezado permanente añadido «Mouscarpone / zona»; el nombre sigue accesible. Ver `reference/IMPLEMENTATION_V207.md`.
- v0.206: tablón de aldea más ancho, con tejadillo de listones, borde azulado y papeles superpuestos, trazado del fotograma 03:00. Dibujo trasladado a `village-art.js`; posición e interacción conservadas. No es recurso original recuperado y los anuncios son marcas ilustrativas, no texto inferido. Ver `reference/IMPLEMENTATION_V206.md`.
- v0.205: recuperada la clase pública `ClipAnimProjection` referenciada por el cliente; FX72 ahora se achata según el ángulo de cámara recuperado (adaptación ortográfica, no perspectiva completa). Dibujo aislado en `objective-art.js`, descarga con hash y prueba de transformación real en Canvas. Ver `reference/IMPLEMENTATION_V205.md`; escala absoluta y perspectiva siguen pendientes.
- v0.204: interpolación de flecha distante según `0.1 * min(ms / 16.66666, 5)` del cliente archivado. Estado transitorio fuera del guardado; vuelve al centro al reaparecer y conserva posición relativa al redimensionar (adaptación local). Ver `reference/IMPLEMENTATION_V204.md`; la proyección del FX72 continúa pendiente.
- v0.203: flecha de objetivo distante en el borde real, con dirección desde el jugador y escala del lienzo lógico original 1280–1920. Sustituye márgenes fijos que la dejaban junto al personaje a 640×360. Umbral circular adaptado al zoom local; sigue pendiente interpolación original y proyección exacta del marcador de suelo. Ver `reference/IMPLEMENTATION_V203.md`.
- v0.202: suelo de aldea con explanada amarillenta, islas de césped irregulares y piedras de paso, trazado de fotogramas 02:00/03:00. Módulo `village-art.js` independiente; no cambia objetos, colisiones, posiciones ni guardados. Coordenadas y colores aproximados, no sector original recuperado. Ver `reference/IMPLEMENTATION_V202.md`.
- v0.201: radial de emotes sin marcos verdes inventados, conservando imágenes originales y radio de 50; anclaje vertical centrado del icono flotante corregido según `MobileADV`. Comprobaciones de menús, selección con ratón, clips y perfil guardado en `npm run test:emotes`. Ver `reference/IMPLEMENTATION_V201.md`; duración de sentarse/bailar y equivalencia visual completa siguen aproximadas.
- Validación v0.200: `npm run test:browser` completo aprobado tras corregir el uso de controles del bot. Incluye jefe, victoria, retorno, guardados/recompensas, exportación/importación y pruebas adicionales de trabajos. Registro y capturas en `reference/VALIDATION_V200_EXPEDITION.md`. No se cambió el balance ni se cierra el cotejo de fidelidad.
- v0.200: diálogo paginado por altura medida en el navegador, con delimitador original `_P_` y cortes por línea/palabra; las letras pendientes reservan espacio transparente durante la escritura. Pruebas de conservación de texto y medidas reales en Chrome. No cambia guardados. Ver `reference/IMPLEMENTATION_V200.md`.
- v0.199: marco, madera y rótulo originales de diálogo recuperados e integrados; retrato sin caja y nombre debajo. Manifiesto con rutas y hashes, recuperación reproducible y captura con texto completo. Escala, tipografía y paginación siguen siendo aproximaciones locales. Ver `reference/IMPLEMENTATION_V199.md`.
- v0.198: exclusión por tipo/rectángulo de decoración generada del tutorial despeja el carro y retira las colisiones correspondientes, sin cambiar la secuencia aleatoria restante. Barra y controles compactos en ventanas horizontales de hasta 900×500; captura a 640×360 y prueba de acceso a botones/diálogo. Prueba de geometría con tres semillas aprobada. Ver `reference/IMPLEMENTATION_V198.md`; siguen pendientes criatura de carga, encuadre, HUD y detalle visual.
- v0.197: carro de Papaille trazado del fotograma 0060, con ruedas, paja, bultos y varales; declarado en el catálogo y dibujado en `tutorial-art.js`. ID48 inspeccionado pero no asociado a la criatura de carga: contiene bola/polvo y no acredita esa identidad. Prueba de tutorial en Chrome y sintaxis aprobadas; falta criatura, detalle del carro y corregir la oclusión del árbol aleatorio derecho. Ver `reference/IMPLEMENTATION_V197.md`.
- v0.196: el catálogo del tutorial declara su propio suelo y cercas/tocones alrededor de Papaille a partir de los fotogramas 0010/0060. `tutorial-art.js` concentra los trazados; no cambian colisiones ni coordenadas guardadas. Prueba de navegador de rescate/reanudación/regreso y sintaxis aprobadas. Falta el carro, la criatura de carga y una composición equivalente al fotograma original; ver `reference/IMPLEMENTATION_V196.md` y su captura local.
- v0.195: corregido el descarte de partidas del tutorial después de rescatar a Picpic. El validador todavía exigía enemigos en fase 1, regla incompatible con el recorrido sin combate de v0.184. Se conservan fases antiguas 1/2 y formato de guardado. Pruebas de lógica y recorrido de tutorial nuevo/reanudado en Chrome aprobados; ver `reference/IMPLEMENTATION_V195.md` para alcance de la comprobación.
- v0.194: corrige una regresión de v0.193 que seleccionaba ambiente sin reproducirlo. `ambient-audio.js` controla una voz con comprobaciones de un segundo, reintentos y limpieza al cambiar de escena. Cuatro pruebas aprobadas; revisión de sintaxis de 76 archivos y comprobación de carga/reproducción real en Chrome, sin errores. No equivale a escucha comparativa ni recorrido completo; se conserva la estimación de fidelidad. Ver `reference/IMPLEMENTATION_V194.md`.
- v0.193: la música de combate sigue la fase activa del encuentro local, no solo la presencia de enemigos vivos; la primera pista del mundo espera 5 s y los cambios de fase 1 s, según `MondeADV-2021.js` y `ProtoADV.js`. El ambiente se vuelve a comprobar cada segundo como en el bucle original. Sin cambios al guardado; falta escucha y cotejo en navegador. Ver `reference/IMPLEMENTATION_V193.md`.
- v0.192: recupera e integra 12 pistas exactas de intro, música de exploración/combate y ambiente. El menú separa volumen general, música y efectos/ambiente; las preferencias usan `tfma-audio-v1`, sin cambiar partidas. La elección de música de combate se aproxima a partir de enemigos vivos. No se ejecutaron pruebas ni cotejo de navegador. Ver `reference/IMPLEMENTATION_V192.md` y `dist/assets/original/audio/scene-audio-manifest.json`.
- v0.191: quita del HUD la etiqueta «PARTIDA LOCAL», que no aparece en las capturas originales. No afecta al guardado ni al modo local; falta cotejar la composición de la barra superior en navegador. Ver `reference/IMPLEMENTATION_V191.md`.
- v0.190: separa el menú de la pastilla del radial de F y reproduce `/hi`, `/sit` y `/dance` con los clips originales del ratón en modo local, efímeros y sin alterar acciones o guardado. Falta cotejar menú, escala y duración en navegador. Ver `reference/IMPLEMENTATION_V190.md`.
- v0.189: retira del HUD el panel permanente de retrato/vida/XP sin respaldo en el gameplay; centra la barra de acciones y conserva la consulta de datos en Perfil y las barras sobre actores. Solo cambia CSS; requiere cotejo local. Ver `reference/IMPLEMENTATION_V189.md`.
- v0.188: añade selector radial con los diez emotes originales y animación local de dos segundos, sin paquetes ni estado en el guardado. F queda como emote y la habilidad secundaria usa 3. Falta cotejo en navegador. Ver `reference/IMPLEMENTATION_V188.md` y los hashes de `dist/assets/original/interface/emote/manifest.json`.
- v0.187: durante las pistas de Papaille, el objetivo temporal y el rótulo de interacción pasan a “Habla con Papaille.”, según `frame-0600.jpg` y `obj_papaille`; se quita el contador local de pistas no observado. Sin nuevo campo de guardado ni funciones online. Ver `reference/IMPLEMENTATION_V187.md`.
- v0.186: sustituye el emoji genérico del panel de jugador por un retrato Canvas con el renderer de ratón, pelaje, ropa y arma equipados. No cambia el guardado ni el combate. Falta cotejarlo en navegador. Ver `reference/IMPLEMENTATION_V186.md`.
- v0.185: tras regresar del tutorial, el objetivo de aldea muestra `obj_continuez` (“Continúa el sendero.”) antes de la primera expedición, según `frame-0120.jpg` y el catálogo español. Sin cambio de guardado ni funciones online. El marcador sigue siendo local y requiere cotejo. Ver `reference/IMPLEMENTATION_V185.md`.
- v0.184: elimina del tutorial el combate local de tres escarabajos que no aparece en la evidencia; tras curar a Picpic, Papaille ofrece el regreso a Mice Village con el texto archivado en español. Las fases 1 y 2 guardadas siguen pudiendo continuar. Sin cambio del formato de guardado ni funciones online. Ver `reference/IMPLEMENTATION_V184.md`.
- v0.183: completa el objetivo de Mura con la invitación a probar combinaciones, según el fotograma de regreso y `obj_metier` del catálogo español. Sin cambios de guardado ni funciones online. Ver `reference/IMPLEMENTATION_V183.md`.
- v0.182: el objetivo final del tutorial usa el texto original español `obj_papaille`; el marcador y la ayuda local siguen guiando la interacción. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V182.md`.
- v0.181: fase inicial del tutorial usa el texto exacto en español de `obj_soins` del catálogo original. No cambia controles, curación ni guardado. Ver `reference/IMPLEMENTATION_V181.md`.
- v0.180: al cambiar la fase local, el objetivo muestra la validación marcada durante 500 ms, según `InterfaceQueteADV.js`. La animación es transitoria y no cambia el guardado. Ver `reference/IMPLEMENTATION_V180.md`.
- v0.179: oculta títulos locales y puntos de etapa del panel de objetivo; el cliente REA muestra objetivos como texto alineado a la derecha. Conserva instrucciones y progreso. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V179.md`.
- v0.178: compacta y sube el panel de objetivo para aproximar las instrucciones pequeñas de la esquina superior derecha de `frame-0060.jpg`; conserva su contenido y progreso. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V178.md`.
- v0.177: las fichas de trabajos y la selección de habilidad secundaria también muestran los iconos de habilidad originales recuperados (1006, 1007, 1009), con glifos locales para los iconos ausentes. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V177.md`.
- v0.176: el HUD usa los iconos originales recuperados para habilidades con IDs 1006, 1007 y 1009; conserva glifos locales para habilidades cuyos iconos no están disponibles. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V176.md`.
- v0.175: reduce y reubica la caja de diálogo para aproximar la franja compacta del fotograma de 10:00; escala panel, retrato, texto y controles con el viewport y elimina el desplazamiento excesivo en móviles. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V175.md`.
- v0.174: reemplaza el emoji de la caja de diálogo por un retrato en canvas dibujado con el renderer local de ratón, con color por interlocutor. La evidencia de 10:00 muestra un retrato; la apariencia local es una aproximación porque no se recuperó un retrato autónomo del cliente. Sin cambios de guardado. Ver `reference/IMPLEMENTATION_V174.md`.
- v0.173: corrige la instrucción del objetivo de Mura: presenta con claridad el cambio de trabajo gratuito y el requisito de nivel 10 para elegir un trabajo secundario, observados en el retorno a la aldea. Solo cambia texto; no altera reglas ni guardado. Ver `reference/IMPLEMENTATION_V173.md`.
- v0.172: añade macizos bajos de helechos y flores junto a las cabañas, a partir del follaje agrupado visible en `frame-0180.jpg`. Son decoración sin colisión y con coordenadas aproximadas. Sin cambios de guardado; falta cotejo local. Ver `reference/IMPLEMENTATION_V172.md`.
- v0.171: reduce manchas y flores dentro del claro central de la aldea y concentra esos detalles fuera de la plaza abierta, manteniendo textura de césped dispersa. Ajuste guiado por `frame-0180.jpg`; distribución aún aproximada. Sin cambios de colisión o guardado. Falta cotejo local. Ver `reference/IMPLEMENTATION_V171.md`.
- v0.170: el terreno de la aldea cambia del cruce genérico a un sendero curvo alrededor de la plaza y una ramificación hacia el tablón. Trazado aproximado de `frame-0180.jpg`; sin datos de sector ni colisión nueva. Falta cotejo local. Ver `reference/IMPLEMENTATION_V170.md`.
- v0.169: añade tres ratones ambientales estáticos y sin nombre a la plaza, basados en `frame-0180.jpg`. Son actores locales sin interacción, ruta ni comunicaciones; no representan jugadores conectados. Sus posiciones y colores son aproximados. Ver `reference/IMPLEMENTATION_V169.md`.
- v0.168: reemplaza las cinco casas rectangulares de la aldea por cabañas redondeadas de madera y techo cónico, guiadas por el fotograma 03:00. El arte es una aproximación local; se conservan posiciones y colisiones actuales. Falta cotejo en navegador. Ver `reference/IMPLEMENTATION_V168.md`.
- v0.167: añade dos bancos dibujados al estilo de la aldea, porque la grabación muestra bancos en la plaza. Son decoración provisional sin colisión; sus coordenadas y escala requieren cotejo local. No cambia el guardado. Ver `reference/IMPLEMENTATION_V167.md`.
- v0.166: el retrato del perfil vuelve a mostrar la mascota activa junto al ratón con el renderer local, como el clip de acompañante en `InterfaceJoueurADV.js` y el fotograma 17:30. Sin cambios de guardado. Falta cotejar escala/alineación en navegador. Ver `reference/IMPLEMENTATION_V166.md`.
- v0.165: el árbol diferencia talentos aprendidos, disponibles y bloqueados con los filtros del cliente original. La disponibilidad usa reglas locales aproximadas; no altera guardado ni efectos. Falta cotejar en navegador. Ver `reference/IMPLEMENTATION_V165.md`.
- v0.164: la ventana de talentos apila ramas en una columna y utiliza la cenefa original `titre-talent.png`, como en `InterfaceTalents.js` y el fotograma 06:20. Ajuste de anchura basado en la captura 640×360; pendiente cotejo en navegador. Sin cambio de guardado ni de reglas. Ver `reference/IMPLEMENTATION_V164.md`.
- v0.163: cuarto nivel de talentos bloqueado según el candado y aviso de demo recuperados por REA. Las partidas locales existentes conservan esos talentos. No cambia el formato de guardado; falta cotejo visual y redistribución en navegador. Ver `reference/IMPLEMENTATION_V163.md`.
- v0.162: perder foco o cambiar de pestaña libera movimiento, guardia y carga de arco según el `defPerteFocus` del cliente original. Sin cambios de guardado; falta comprobar carga temprana/completa en navegador. Ver `reference/IMPLEMENTATION_V162.md`.
- v0.161: añade al corredor el arbolito de hojas amarillas visible en los fotogramas 14:00/15:00. Trazado aproximado, sin colisión ni cambio de guardado; falta cotejar en navegador. Ver `reference/IMPLEMENTATION_V161.md`.
- v0.160: trazada una rama fina en el suelo despejado del corredor según `frame-840.png` (14:00). Posición y forma son aproximadas; sin colisión ni cambio de guardado. Falta cotejar en navegador. Ver `reference/IMPLEMENTATION_V160.md`.
- v0.159: añadido el arbolito de hojas claras que aparece delante de la arena en 17:00/17:20. Dibujo y posición local aproximados; ordenado por Y, sin colisión ni cambio de guardado. Falta cotejar escala/oclusión en navegador. Ver `reference/IMPLEMENTATION_V159.md`.
- v0.158: cofre original ID14 recuperado (seis PNG con hashes); renderer usa `statique`, reproduce `ouverture` durante 70 fotogramas y conserva `ouvert` al cerrar la oferta. No cambia el guardado ni el catálogo/probabilidades de dones. Falta cotejo local del tamaño. Ver `reference/IMPLEMENTATION_V158.md`.
- v0.157: perfil con las doce ranuras ordenadas como en `InterfaceJoueurADV.js`, 12 iconos originales recuperados y enlaces a paneles locales; las asociaciones de inventario siguen incompletas. Sin cambio del guardado. Ver `reference/IMPLEMENTATION_V157.md`.
- v0.156: añadido un montón de madera aproximado en el borde derecho de bramble-passage, trazado del fotograma 900 (15:00). Decorativo, sin colisión ni cambio de guardado. Ver reference/IMPLEMENTATION_V156.md.
- v0.155: agregado el resumen de perfil con nombre, nivel, mascota y titulo, respaldado por frame-1050 y REA. No cambia el guardado ni inventa fecha/ID de cuenta. Ver reference/IMPLEMENTATION_V155.md.
- v0.154: recuperadas 1.645 de 1.670 imagenes de las 198 apariencias del data.bin; 25 rutas siguen en HTTP 404. Se agrego manifiesto con hashes y comando reproducible. Sin cambios en juego ni guardados. Ver reference/IMPLEMENTATION_V154.md y reference/CLOTHING_ASSET_COVERAGE.md.


- v0.153: regreso y continuación se habilitan en el evento `animationend` de la última recompensa, como la activación del clic al final documentada en `InterfaceRecompense.js`. Listener transitorio; no cambia el guardado ni las recompensas. Ver `reference/IMPLEMENTATION_V153.md`.
- v0.152: monedas y posible equipo obtenido aparecen en la pantalla de victoria con rebote de 1 s y 250 ms de separación, adaptando el efecto descrito en `InterfaceRecompense.js`. No bloquea botones ni altera recompensas. Ver `reference/IMPLEMENTATION_V152.md`.
- v0.151: añadidos dos grupos de piedras visibles en la ribera de la arena final, trazados de los fotogramas de 17:00/17:20. Composición local sin colisión ni cambio de guardado; coordenadas aproximadas. Ver `reference/IMPLEMENTATION_V151.md`.
- v0.150: la selección de dones de Elisah tiene botones independientes de confirmar y cerrar, como la interfaz original. Cerrar limpia la selección temporal, conserva oferta/cofre y permite reabrirlo; no concede el don ni cambia el esquema de guardado. El comportamiento de reapertura es una decisión local porque el servidor original conserva ese estado. Ver `reference/IMPLEMENTATION_V150.md`.
- v0.149: el aviso de XP anima por dos segundos cada tramo de experiencia, llena y reinicia la barra en cada nivel cruzado, y reproduce `niveausup` al cruzar. Respeta el cierre a cinco segundos documentado por REA; no cambia XP guardado ni la curva local. Ver `reference/IMPLEMENTATION_V149.md`.
- v0.148: el corredor `bramble-passage` suma el tocón menor que aparece a la izquierda del tocón grande en la captura de 14:00. Trazado local sin colisión; coordenada y escala aproximadas, no recuperadas del sector. Ver `reference/IMPLEMENTATION_V148.md`.
- v0.147: el jefe ID45 usa `statique:combat` en reposo, animación original en bucle de 181 fotogramas. La selección del estado es una aproximación local porque no se recuperó la transición del servidor; no cambia combate ni guardado. Ver `reference/IMPLEMENTATION_V147.md`.
- v0.146: el decodificador de recursos lee como `int8` el orden de cada conjunto/pieza de ropa, según `Look.ElementLook` original. Se corrigieron los ocho valores >127 de los metadatos retenidos (códigos 33 y 41); el renderer sigue aceptando metadatos antiguos sin signo y produce el mismo orden visual. No cambia partidas ni el catálogo de objetos del juego.
- v0.145: el corredor del bosque incorpora un tocón grande en el fondo, trazado de la captura del MP4 a 14:00. Es decoración aproximada, no tiene colisión ni cambia el formato de guardado; geometría y sector originales siguen ausentes.
- v0.144: rediseñada la ventana local de talentos con las pestañas Armas/Habilidades/Ratón, ramas asociadas al equipo/trabajo actual, nodos seleccionables y ficha con descripción y botón de compra; reutiliza iconos y marcos originales. El coste, disponibilidad de puntos, desbloqueos y efectos siguen usando el modelo local.
- v0.143: los árboles conservan opacidad completa y ocultan personajes cuando su profundidad los coloca delante; barras y estados se dibujan encima. Replica el caso visible a 12:00 en el fotograma 0720; no cambia colisiones.
- v0.142: talentos aprendibles desde el panel durante una expedición, según las capturas del bosque a 06:20 y 08:30; la redistribución se mantiene en la aldea. Al aprender en el bosque, los aumentos de vida máxima se aplican a jugador y mascota; progreso guardado con el esquema existente.
- v0.141: al volver de una expedición, el objetivo de aldea guía una vez a Mura y muestra la instrucción original en español sobre cambiar de trabajo y desbloquear el trabajo secundario en nivel 10. El encuentro se guarda en el perfil; partidas existentes siguen siendo compatibles.
- v0.139: la laguna del bosque final ahora tiene una costa asimétrica y reflejos breves, según su forma visible en el fotograma 17:00 del MP4. Geometría aproximada porque no se recuperó el sector original.
- v0.140: agregado el erizo original ID 5 a las oleadas y como acompañante de la arena final, inferido de los enemigos grises espinosos del video en 05:00 y 17:00. Arte original recuperado; frecuencia y balance locales.
- v0.138: al soltar la guardia, el ratón vuelve a la pose original `statique` en su fotograma inicial. La marca es transitoria y no cambia el guardado; movimiento y nuevas acciones sustituyen la pose.
- v0.137: recuperada del CDN original la muestra `parade1.mp3` (3,342 bytes, SHA-256 documentado en `IMPLEMENTATION_V137.md`). La activación del escudo usa ahora la muestra exacta y se retiró el alias local provisional a `metal1`.
- v0.136: al levantar el escudo se reproduce el evento original `parade1` a volumen0.5. La muestra exacta no está recuperada; se enlaza al recurso local `metal1`, aproximación que queda identificada como tal. No cambia el sonido de bloqueo ni las reglas de guardia.
- v0.135: al levantar el escudo, el raton reproduce la preparacion original de la mano izquierda (`paradeG-prep`) y la encadena con `paradeG` mientras mantiene la guardia. Usa el reloj de frames recuperado a 60 fps; la velocidad original 10 no se puede convertir con certeza con la evidencia local. Sin cambios de combate ni guardado.
- v0.81: planta a los pies, impacto del elixir al aterrizar, diamante normal limitado al primer enemigo y contexto de enemigos corregido para la descarga de picas. Se retiro la cancelacion generica de invisibilidad al usar habilidades: la descripcion original solo establece que el ataque la rompe.
- v0.82: pistas opcionales del bosque en `forest-story.js`, dialogos originales 47/48 de Papaille, dibujo independiente y estado validado en el guardado v13. No conceden premios inventados ni bloquean la ruta. Posiciones y dibujos locales.
- v0.83: guia de objetivos en `objectives.js`, usando flecha original y FX72. Cofre dibujado en su posicion real, ordenado por profundidad, con posicion guardada. Apariencia roja/dorada basada en video y sonido recuperado `coffre2`.
- v0.84: texto de dialogo progresivo a 70 letras/s, primera pulsacion revela y siguiente avanza; preferencia de movimiento reducido respetada. Implementacion independiente en `dialogue-text.js`.
- v0.85: `skill-data.js` aporta IDs originales, descripcion y uso individual de las ocho habilidades. Metadatos integrados en `ABILITIES`, ayudas del HUD, ranura secundaria y seccion desplegable en Trabajos.
- v0.86: dano propio durante invisibilidad activa Polvo vampirico mediante `damage-effects.js`; dano de mascota excluido. Sorpresa del golpe cuerpo a cuerpo pasa a ser local al ataque: un fallo no la deja activa para otro golpe. Ataque de mascota asociado atribuido correctamente.
- v0.87: cartas con los sprites de su palo real (41 picas, 42 corazones, 43 treboles, 44 diamantes). Entrevista deja de usar el marcador de objetivo como efecto; los IDs compartidos viven en `effect-data.js`.
- v0.88: catalogo compartido de entidades persistentes en `effect-state.js`; los senuelos y tornados ya no desaparecen del guardado por una lista de captura desactualizada. Formato v13 compatible.
- v0.89: barras de vida y estados del jugador/mascota en una capa sobre los arboles, usando `actor-overlays.js`. No se transparentan los grandes troncos ni se duplican las barras de la mascota.
- v0.90: Informe curativo comprueba objetivos dentro del area; talentos de activacion tambien funcionan en Entrevista; Portada usa testimonios visibles en camara. Escudos temporales compartidos con Picpic, reglas de areas comunes para ambos actores y guardado de escudos de mascota. Icono de muerte corregido al pergamino con calavera 9.png/FX107.
- v0.91: Barbecho/Maleza pantanosa/Malas hierbas aplicados a Espinas (bramble), no a Cardo (thorn). Atraccion de enemigos separada en `enemy-targets.js`; lirios eligen aliados validos dentro del radio. Crecimiento posterior aprovecha talentos y mascota; veneno de plantas independiente del de daga/reportaje y persistido.
- v0.92: trampa manual ya no dispara por contacto. Reglas de armado/dano/Trauma en `traps.js`; Gatillo oxidado cuenta2s desde colocacion y no2s adicionales tras armado. Ayudas de habilidades reflejan dones que cambian controles.
- v0.93: calculo compartido `recipeEffects` para dano/curacion/defensa de recetas. Conversion curativa usa su valor real y no crea dano en recetas sin curacion. Ingredientes de Picpic ejecutan el mismo fuego por don que los manuales; normalizacion recupera recetas incompletas. Corregido doble descuento de duracion en livingLeaf.
- v0.94: veneno de flechas por impacto en `archery.js`, sin sustituir dano pendiente ni reiniciar otros pulsos. Migracion del veneno antiguo y conservacion de dosis en guardado. Recuperacion de flecha por mascota limitada a una decision por proyectil, persistida.
- v0.95: combinacion Veneno virulento/Dulces suenos suma una sola mejora final; reloj de veneno conserva el sobrante del fotograma. `poisons.js` separa cartas de daga y consulta todos los canales para Colmillo feroz. `damage-over-time.js` comparte dosis de flechas/cartas sin duplicar logica ni estados.
- v0.96: curacion inicial y periodica de vendas en `bandages.js`. Modificadores personales separados de la curacion de Picpic; tratamiento, exceso convertido en escudo y proteccion durante el tratamiento funcionan en ambos receptores y se guardan.
- v0.97: elixir curativo levanta a Picpic; rescate del tutorial separado de completar una venda y protegido por fase. `tutorial-data.js` contiene colocaciones y condicion; instrucciones resuelven la ranura real del elixir. Carga recupera fase0 con mascota ya sana sin duplicar enemigos.
- v0.98: `shields.js` comparte bloqueo, restricciones de manos y cargas. Proteccion aliada base80px ampliable por don, con consumo y efectos del bloqueo; se baja guardia al agotar cargas. Picpic invulnerable no consume proteccion. Geometria/coste por aliado locales.
- v0.99: cadena de espada caduca junto a su reloj; el golpe posterior a una pausa no hereda acumulaciones. `swords.js` comparte ventanas, limites y registro de objetivos con el calculo de dano y la persistencia. Sin cambio de reglas originales recuperadas: magnitudes locales.
- v0.100: impactos de area resueltos una vez por actor; senuelos sin doble dano ni inmunidad automatica para el jugador cercano. Lista fija de invocaciones al impactar evita que Malas hierbas reciba el mismo golpe que la creo. Objetivos ya destruidos no vuelven a recibir dano.
- v0.101: debilitamiento enemigo aplicado a jugador, mascota e invocaciones con la misma funcion. Escudo que protege de proyectiles usa la direccion de vuelo respecto al portador, conservando el enemigo como fuente de dano/reflejo.
- v0.102: escala de helechos grandes ajustada de forma central, tras revisar una vista aislada del escenario. La decoracion no altera colisiones ni consumo aleatorio. La geometria y las posiciones aun son locales.
- v0.103: clips originales de ataque del raton siguen a60 fps hasta terminar, aunque el impacto ya se haya resuelto. Tiempos de combate y guardado no cambian; la preparacion del arco conserva su reloj. Longitudes leidas del metadata original: espada42, dos manos47 y arco41 fotogramas.
- v0.104: las anticipaciones de enemigos y rana comienzan su clip al iniciar `telegraph`, no segun el reloj global. No cambia el combate ni el guardado.
- v0.105: las criaturas permanecen hasta terminar su clip original de muerte (86-285 fotogramas segun tipo). El reloj sigue avanzando con ventanas abiertas; la muerte no se guarda ni afecta recompensas.
- v0.106: arco usa arc1/arc2/arc0 en las fases archivadas, detiene arc1 al cancelar y espera150 ms entre carga y disparo, como `ArmeArc.js`. Carga base local aun provisional.
- v0.107: muestra original `xp` suena en toda ganancia positiva; `niveausup` se sincroniza con el punto de cruce de la barra animada de2 s, incluso al subir varios niveles (un aviso por concesion). No cambia progresion.
- v0.108: el arco mantiene la carga mientras se sostiene el ataque, cancela si se suelta antes de completarla, y espera los150 ms originales tras soltar para lanzar la flecha. El clip `arc_tir` dura41 fotogramas a60 fps. Carga y enfriamiento local siguen siendo aproximaciones; sin cambios de guardado.
- v0.109: el arco actualiza su direccion con el cursor durante la carga y la espera de lanzamiento; el angulo se fija cuando se crea la flecha.
- v0.110: moverse interrumpe la carga y el margen previo al disparo, segun `interruptableEnDeplacement` del arco original. La textura `interface/zone/zl.png` aun falta en los recursos recuperados y queda anotada como pendiente.
- v0.111: don original1201 agregado para espada de dos manos. El daño evitado se convierte en daño almacenado para el siguiente ataque. Coeficiente30%, limite100 y ventana6s son aproximaciones locales reutilizadas del don de escudo 1508.
- v0.112: recuperada e integrada la mira original `interface/zone/zl.png`, con mezcla aditiva, anclaje y opacidad progresiva segun `ArmeArc.js`.
- v0.113: al recibir un golpe, jugador, mascota y enemigos reproducen un destello blanco de50 ms. Los enemigos tambien inician la compresion vertical de `MobileADV.effetTouche()`. El destello se omite en golpes bloqueados y pulsos de dano periodico.
- v0.114: el bloqueo con escudo reproduce la muestra original `ting` a volumen0.4, que sustituye al tono sintetico local y al destello, como en `MobileADV.effetTouche()`.
- v0.115: los impactos directos reproducen la muestra archivada `bibli/2/touche` para jugador, Picpic y enemigos. Respeta mute, golpes bloqueados y el silencio de dano periodico; el limitador compartido del audio reduce repeticiones rapidas.
- v0.116: Picpic tambien se comprime al recibir dano, como las otras criaturas no principales en `MobileADV.effetTouche()`. La animacion es transitoria y no se guarda.
- v0.117: al reanimar a Picpic se reproduce `soins2`, FX48 y el rebote inicial de escala0.6, como en `MobileADV.reanimation()`. No modifica curacion ni guardado.
- v0.118: al acertar un golpe cuerpo a cuerpo, el clip visual del jugador se pausa100 ms, igual que `pausePendant(100)` en `finAnimationAttaque()`. El reloj de combate sigue normal.
- v0.119: espada y daga resuelven el ataque al desactivarse a los10 fotogramas (167 ms); la compuerta de350 ms limita el siguiente uso. Se anade la pausa de movimiento de200 ms tras cada cierre cuerpo a cuerpo, como `ArmeADV.finAttaqueCorpsACaC()`.
- v0.120: los ataques cuerpo a cuerpo desplazan la camara25 px; los aciertos suman sacudida direccional de10 px y100 ms, como `decalageCamera()`/`tremblement()` del original.
- v0.121: tras un impacto cuerpo a cuerpo, el jugador y su clip quedan orientados hacia el objetivo mas cercano alcanzado, como `versLaDroite()` en `ArmeADV.finAttaqueCorpsACaC()`. No altera el arco ni la lista de objetivos.
- v0.122: cada ataque cuerpo a cuerpo elige un clip entre las variantes originales1-3 y evita repetir el anterior cuando puede, como `recupCodeAnimAttaque()`. La lista exacta enviada por el servidor no esta recuperada.
- v0.123: espada y daga recorren en bucle los fotogramas0-11 a velocidad3 durante el ataque; al liberarse, el clip continua desde el fotograma10 a velocidad normal. Replica `animationAttaque()`/`finAnimationAttaque()` sin acelerar el reloj de daño.
- v0.124: disparar con arco retrocede la camara70 px en direccion opuesta a la flecha y amortigua el efecto, como `ArmeArc`.
- v0.125: arco mantiene `arc_charge` durante carga y espera de150 ms, luego anima `arc_tir` durante los41 fotogramas del disparo. Se aplica el multiplicador de lectura original en carga; no se congela el tiro ni se cambia el momento del proyectil.
- v0.126: la sacudida direccional de camara ahora ocurre al recibir dano directo, como `MondeADV.afficherEffetChiffre()`; deja de activarse al acertar un ataque cuerpo a cuerpo. Conserva los100 ms, el desplazamiento direccional de10 px y la vibracion de potencia1; el dano periodico de espinas no la activa. El retroceso de camara del ataque se mantiene independiente.
- v0.127: seguimiento de camara ajustado a `0.1 * DELTA` del cliente original (6/s a60 fps), antes7/s. La atenuacion del desplazamiento ya equivalia al `0.2 * DELTA` original. Cambia solo el seguimiento visual, no el movimiento ni el guardado.
- v0.128: orientacion de raton, enemigos, Picpic y aliados moviles conserva la direccion previa si el movimiento es casi vertical; solo gira cuando el componente horizontal normalizado supera0.1, como `MobileADV.boucle()`. Incluye orientacion de Picpic al seguir y de ataques hacia objetivos; no cambia IA, trayectorias ni combate.
- v0.129: los clips `course` del raton, enemigos y Picpic avanzan con un reloj de movimiento propio. Los modificadores locales de lentitud reducen el ritmo visual hasta el minimo original0.5; al dejar de moverse o iniciar una accion del raton, el ciclo se reinicia. No cambia desplazamiento ni guardado.
- v0.130: durante el aviso de ataque, los enemigos que usan `attaque1` recorren en bucle los fotogramas0-11 a velocidad3, como `MobileADV.animationAttaque()`. La rana mantiene el clip y el reloj de preparacion de salto. No cambia el instante ni el resultado del ataque.
- v0.131: al concluir el aviso, el clip enemigo `attaque1` continua desde el fotograma del ciclo hasta terminar a velocidad normal, como `finAnimationAttaque()`. El fotograma recibido del servidor se aproxima con el fotograma del ciclo local; no cambia impacto ni reglas.
- v0.132: `TOUCHE` se aproxima con el contacto de area o colision local confirmada. Si el clip de recuperacion enemigo sigue activo, se congela en su fotograma durante100 ms como `pausePendant(100)`; no depende de que el dano atraviese invulnerabilidad o escudo.
- v0.133: cambiar la orientacion comprime verticalmente la criatura al90% y la recupera a0.2 por fotograma, como `MobileADV.versLaDroite()` y `boucle()`. Unifica giro, golpe y reanimacion como el ultimo evento de escala. La asignacion de bibliotecas de sonido enemigas sigue pendiente del campo `codeBibliothequeSon` enviado por el servidor.
- v0.134: las poses `statique` y `statique:*` se quedan en su fotograma inicial, como `jouerAnimation("statique", 0, true)` en el cliente. Ataque, movimiento, golpe, aturdimiento y salto conservan sus relojes. No altera combate ni guardado.
- Comprobaciones terminadas en v0.81: 33 pruebas unitarias y recorrido enfocado en Chrome. Sintaxis revisada en 69 archivos hasta v0.134. v0.82-v0.134 pendientes de recorrido de juego; v0.102 solo tuvo inspeccion tecnica del terreno.
- No afirmar reconstruccion completa: siguen faltando sectores originales, tablas del servidor, equivalencia de todas las combinaciones de dones y cifras de balance. El texto del don1201 ya esta implementado; sus cifras y el alcance de «mitigar» siguen siendo locales por ausencia de reglas del servidor.
- Continuar con fidelidad de escenarios, eventos de animacion y patrones observables; mantener la separacion entre evidencia y aproximaciones.

### Pendientes vigentes (actualización v0.211)

- Validación: tutorial, expedición de tres encuentros con jefe, victoria, retorno, recarga sin duplicar monedas y exportación/importación aprobados en Chrome para v0.200. Se corrigieron navegación, esquiva y espera del vendaje del bot, sin cambiar el balance. Ver `reference/VALIDATION_V200_EXPEDITION.md` para ejecuciones, límites y pruebas adicionales. Siguen pendientes la grabación/cotejo con el MP4, ambos menús de emotes y una matriz más amplia de partidas/trabajos; no cerrar P0 completo por este recorrido.
- Audio: v0.193 ajusta el indicador local a la fase de encuentro y replica los intervalos observados al iniciar/cambiar música y al comprobar ambiente. Falta comparar en navegador sincronía, balance, pausas, comportamiento al pausar/cambiar escena y política de autoplay. La fase local aproxima el booleano que el cliente recibía del servidor.

- Perfil: distribución y 12 iconos ya corresponden a REA; falta cotejo visual en navegador y el mapeo del inventario original para llenar ocho ranuras cosméticas y confirmar las asociaciones locales de cabeza, cuerpo y manos.
- HUD: v0.189 oculta el panel persistente y centra la barra de acción; comprobar su ubicación, lectura y acceso al perfil en navegador.
- Barra superior: v0.207 identifica las cuatro miniaturas externas originales y v0.208 mueve los controles locales de mapa/sonido/ayuda al menú. Falta cotejo global de escala y composición del HUD. Ver `reference/IMPLEMENTATION_V207.md` y `reference/IMPLEMENTATION_V208.md`.
- Emotes: en v0.201 se comprobaron radial de F, menú de la pastilla, selección con clic real, clips y conservación del perfil a 640×360 y 1280×800. Corregidos marcos inventados y anclaje del icono. Falta cotejo de animaciones/tiempos contra ejecución original, especialmente duración de sentarse/bailar. Ver `reference/IMPLEMENTATION_V201.md`.
- Perfil (retrato): v0.166 dibuja la mascota activa junto al ratón; falta cotejar escala y suelo contra `frame-1050.png`.
- Cofre: ya usa el clip y arte original de ID14, incluida su apertura de 70 fotogramas; cotejar tamaño y alineación en navegador contra `frame-1040.png`. No están recuperadas las asignaciones/posibilidades autoritativas de dones.
- Arena: el arbolito de primer plano ya está trazado desde `frame-1020.jpg` y `frame-1040.png`; cotejar posición, escala y oclusión localmente. La clase de objeto/capa original no se puede saber sin el payload del sector.
- Corredor: la rama del suelo y el arbolito amarillo del borde derecho se trazaron de `frame-840.png`/`frame-900.png`; cotejar forma, escala y oclusión en navegador. Las posiciones no provienen de datos originales de sector.
- Escenarios y datos de sectores originales; los mapas actuales son reconstrucciones locales. El render Y de personajes/objetos verticales concuerda con la clasificación `trierMobile` del cliente; sigue sin saberse qué decoraciones del mapa original son objetos planos en capas suelo/agua con `indexTriage`. Evidencia y límite: `reference/MAP_RECOVERY_FOLLOWUP.md`.
- Tablas y reglas exclusivas del servidor: progresion, botin, economia, balance y restricciones; el modo online sigue expresamente excluido.
- Comparar por tramos el gameplay local contra el MP4 y completar los patrones, animaciones y sonidos de enemigos, armas, trabajos, mascota y encuentros que la evidencia permita.
- Integrar recursos originales recuperados que sigan faltando en las pantallas y revisar la composicion de personajes, ropa y equipo. Las 8 imágenes y 2 muestras de sonido que figuran en los manifiestos como 404 se revalidaron sin éxito; detalle y efecto en el jefe ID45: `reference/ASSET_AVAILABILITY.md`.
- Datos exactos de equipo/ropa por objeto: los paquetes de perfil que relacionaban IDs de inventario y apariencias no están recuperados. `data.bin` contiene 198 definiciones visuales, no el mapeo para los 111 equipos traducidos. Detalle y formatos: `reference/CLOTHING_RENDERER.md`; no inferir equivalencias.
- Ranuras de equipo: el enum original declara 10 slots visuales y dos manos; el protocolo envía el código de ranura aparte del ID del objeto. Referencia preservada en `reference/EQUIPMENT_SLOT_RECOVERY.md`; no se infiere el mapeo por prefijos.
- Talentos: el reinicio local completo ya esta implementado en la aldea, conserva nivel/experiencia y reintegra los puntos de los tres talentos heredados y del arbol actual. Las alternativas hermanas pueden sustituirse por 0 PT segun el precio mostrado por el cliente. Falta cotejar la interfaz en navegador; REA no prueba la politica de reembolso original ni los requisitos/efectos que enviaba el servidor. Evidencia: `reference/REA_PROGRESSION_FINDINGS.md`; logica: `dist/talents.js` y `dist/game.js`.
- Talentos (presentación): ramas apiladas y cenefa auténtica integradas en v0.164; falta comparar escala y encuadre con el fotograma de 06:20 en navegador. Ver `reference/IMPLEMENTATION_V164.md`.
- Talentos (estados visuales): v0.165 usa los filtros originales para aprendidos/disponibles/bloqueados; el estado disponible depende del modelo local y requiere cotejo visual. Ver `reference/IMPLEMENTATION_V165.md`.
- Perfil (mascota): v0.166 reutiliza el renderer original disponible; falta comparación local de la composición. Ver `reference/IMPLEMENTATION_V166.md`.
- Aldea: v0.167 añade dos bancos decorativos confirmados como tipo de elemento por el gameplay; falta cotejar composición, posición, escala y oclusión localmente. Ver `reference/IMPLEMENTATION_V167.md`.
- Aldea (cabañas): v0.168 reemplaza las casas rectangulares por siluetas redondeadas vistas en el fotograma 03:00; falta cotejar formas, color, escala, posición y oclusión. Ver `reference/IMPLEMENTATION_V168.md`.
- Aldea (población): v0.169 añade tres ratones ambientales locales estáticos; número, colores, escala y ubicaciones no están recuperados. Cotejar con `frame-0180.jpg`. Ver `reference/IMPLEMENTATION_V169.md`.
- Aldea (sendero): v0.170 añade un trazado curvo aproximado a partir del fotograma 03:00; falta comparar ancho/color y validar el paso jugable. Ver `reference/IMPLEMENTATION_V170.md`.
- Aldea (plaza): v0.171 reduce la densidad procedimental dentro del claro central; falta cotejar la transición entre plaza y periferia en navegador. Ver `reference/IMPLEMENTATION_V171.md`.
- Aldea (jardines): v0.172 añade macizos bajos junto a las cabañas; confirmar su densidad y oclusión contra `frame-0180.jpg`. Ver `reference/IMPLEMENTATION_V172.md`.
- Arco: la carga local sigue en 140 ms provisionales (`dist/combat.js`). `OutilsArmeADV.recupArme()` recibe `tempsIncantation` como `MSG.l32s()` del servidor; el cliente estático no contiene el valor por arma. No sustituirlo por una cifra inventada. Evidencia y límite: `reference/REA_FINDINGS.md` y `reference/IMPLEMENTATION_V108.md`.
- Objetivos: v0.180–v0.185 alinean animación de validación y textos con evidencia del cliente, del video y del catálogo español; el destino del objetivo de aldea sigue dependiendo de payload ausente. Falta cotejar el ciclo, marcador, textos, escala y encuadre en navegador. Ver `reference/IMPLEMENTATION_V180.md`–`V185.md`.
- Modelo de objetivos: v0.209 admite listas y eventos independientes; v0.211 integra avisos y sonidos de alta/validación originales. Falta recuperar/contrastar la secuencia, IDs, destinos y objetivos simultáneos que enviaba el servidor; cotejar escalado y volúmenes contra el MP4. La flecha sobre controles (`cibleInterface`/FX87) sigue pendiente de una asignación acreditada en el recorrido. Ver `reference/IMPLEMENTATION_V209.md` y `reference/IMPLEMENTATION_V211.md`.
- El usuario debe probar la entrega acumulada en su navegador. Las versiones posteriores a v0.81 solo tienen comprobacion sintactica salvo que aqui se indique otra cosa.

## Restricciones y decisiones vigentes

- Interfaz y textos nuevos en espanol. El usuario no quiere traducciones al frances.

- Juego de navegador de escritorio, teclado y ratÃƒÂ³n, ejecutado en la mÃƒÂ¡quina del usuario.
- **El online, las cuentas y los servidores multijugador estÃƒÂ¡n fuera del alcance actual.** No desarrollarlos hasta que el usuario lo solicite.
- Mantener inicio con `Jugar.cmd` y `npm start`, sin dependencias de ejecuciÃƒÂ³n ni compilaciÃƒÂ³n.
- La ingenierÃƒÂ­a inversa se realiza con REA y lecturas de artefactos originales. Distinguir evidencia estÃƒÂ¡tica, observaciones de gameplay y decisiones provisionales; no presentar balance inventado como recuperado.
- No ejecutar el bootstrap del cliente antiguo ni sus conexiones como parte del juego local. Los archivos de `reference/` son evidencia, no mÃƒÂ³dulos de la aplicaciÃƒÂ³n.
- No usar fotogramas del video como falso escenario interactivo. Mantener personajes, colisiones y simulaciÃƒÂ³n reales.
- No reemplazar ni borrar el MP4 aportado ni partidas del navegador habitual durante pruebas.

## Arranque y comprobaciÃƒÂ³n

1. En Windows: doble clic en `Jugar.cmd`, o `npm start` desde la raÃƒÂ­z.
2. Abrir `http://localhost:8010`. Node sirve solo `dist/` y escucha en `127.0.0.1`.
3. `npm run check`: sintaxis del cÃƒÂ³digo de ejecuciÃƒÂ³n.
4. Con el servidor activo, `npm run test:browser`: recorrido real automatizado en Chrome; usa `.local/smoke-browser`, separado del navegador habitual. Requiere Node con WebSocket global (esta mÃƒÂ¡quina tiene Node 24) y Chrome en su ruta estÃƒÂ¡ndar; `CHROME_PATH` permite otra ruta.
5. Las capturas de QA estÃƒÂ¡n en `.local/` y se ignoran en Git. Detener ÃƒÂºnicamente servidores/procesos que se hayan iniciado para la comprobaciÃƒÂ³n.

El progreso de `localhost` y el de `127.0.0.1` son distintos porque son orÃƒÂ­genes de navegador distintos. Mantener `localhost:8010` para las partidas del usuario.

## Base histÃƒÂ³rica v0.1

- Tutorial: Picpic herido, venda, tres enemigos y Papaille para viajar a la aldea.
- Aldea explorable, edificios provisionales, fuente, tablÃƒÂ³n y NPCs.
- Espada/arco, venda, BotÃƒÂ¡nico/Cocinero con dos habilidades, mascota que sigue y ataca.
- Bosque de tres encuentros; jefe representado con una araÃƒÂ±a original ampliada.
- Tres opciones de regalo de Elisah por encuentro, etapas sucesivas, muerte y regreso.
- Nivel, experiencia, monedas, tres talentos y cambio de pelaje.
- ImÃƒÂ¡genes originales de portada/HUD y piezas/animaciones originales del ratÃƒÂ³n, erizo y varios insectos.
- EscenografÃƒÂ­a dibujada para el prototipo; mapa, IA y balance provisionales.
- Guardado v1: perfil persistente; originalmente no reanï¿½ expediciÃƒÂ³n, posiciÃƒÂ³n ni vida.
- Prueba completa de navegador aprobada: tutorial Ã¢â€ â€™ aldea Ã¢â€ â€™ equipo/trabajo Ã¢â€ â€™ tres encuentros Ã¢â€ â€™ regalos Ã¢â€ â€™ jefe Ã¢â€ â€™ regreso Ã¢â€ â€™ recarga.

## Archivos y responsabilidades

| Ruta | Contenido |
| --- | --- |
| `dist/index.html`, `style.css` | Portada, HUD y ventanas |
| `dist/game.js` | SimulaciÃƒÂ³n, escenas, entradas, interfaces y ciclo del juego |
| `dist/art.js` | Escenario Canvas y combinaciÃƒÂ³n de personajes originales con dibujos de respaldo |
| `dist/original-animation.js` | Renderer propio del formato ClipAnim: jerarquÃƒÂ­a, pivotes, keyframes e interpolaciÃƒÂ³n |
| `dist/assets/original/` | Recursos locales y manifiestos de procedencia; no requiere CDN al jugar |
| `scripts/server.mjs` | Servidor estÃƒÂ¡tico local |
| `scripts/smoke.mjs` | Prueba real de navegador por CDP, sin instalar otro navegador |
| `scripts/recover-assets*.mjs` | RecuperaciÃƒÂ³n reproducible de recursos pÃƒÂºblicos y decodificador binario |
| `reference/` | Evidencia, archivos originales, capturas y documentaciÃƒÂ³n |

## Evidencia recuperada y cÃƒÂ³mo reutilizarla

- Video del usuario: `transformice-adventure-gameplay.mp4`, 18:04.7, 640Ãƒâ€”360/30 fps. Notas iniciales en `reference/GAMEPLAY_VIDEO_NOTES.md`, hoja de contacto y capturas individuales. El muestreo de 30 s no sustituye una inspecciÃƒÂ³n detallada de cada transiciÃƒÂ³n/animaciÃƒÂ³n.
- Cliente archivado: `reference/wayback-client/`, bundle 0.68.2 y 62 mÃƒÂ³dulos. Algunas rutas del ÃƒÂ­ndice Wayback carecen de query/version exacta o pueden devolver HTML de error: contrastar formatos y `reference/bundle-captures.json`.
- **REA ya ejecutado**: Evidence ID `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`. Resumen y lÃƒÂ­mites en `reference/REA_FINDINGS.md` y `rea-client-summary.json`. Evidencia completa comprimida sin pÃƒÂ©rdida en `rea-client-evidence.json.gz`; no repetir el anÃƒÂ¡lisis completo sin una pregunta nueva.
- REA MCP no estaba conectado. El CLI publicado fallÃƒÂ³ por un import ESM ausente; `reference/rea-loader.mjs` realiza una reparaciÃƒÂ³n limitada de resoluciÃƒÂ³n hacia los `.cjs` presentes. La configuraciÃƒÂ³n MCP del usuario no se modificÃƒÂ³. El informe conserva el comando exacto.
- `data.bin` pÃƒÂºblico original recuperado: mensaje 0x8000, zlib desde byte 6. El parser consume exactamente 1,289,829 bytes inflados. Incluye 113 efectos, 48 monstruos, sonidos y piezas de ropa; **no incluye mapas**. Fuentes/metadatos completos en `reference/original-data/`; el runtime usa `creatures.json` compacto.
- 44 imÃƒÂ¡genes de interfaz y 191 imÃƒÂ¡genes de piezas/animaciones recuperadas por rutas concretas. Manifiestos en `dist/assets/original/`; informe `reference/ASSET_RECOVERY.md`.
- InvestigaciÃƒÂ³n de mapas en `reference/MAP_RECOVERY.md`: sectores `0x8070`, cache pictos `0x8078`, catÃƒÂ¡logo editor `0x8802`. Clips y posiciones son recibidos del servidor. Se recuperaron mÃƒÂ³dulos pÃƒÂºblicos de mundo/elementos, pero no los paquetes de sectores ni sus catÃƒÂ¡logos. No afirmar que no existen: falta el dato de entrada.

## Pendientes para la reconstrucciÃƒÂ³n fiel

### P0 Ã¢â‚¬â€ mapas, composiciÃƒÂ³n y movimiento

- [ ] Obtener/exportar datos de mapas/sectores originales y sus imÃƒÂ¡genes: aldea, tutorial, Rustling Glade y Brookleaf Town segÃƒÂºn evidencia disponible.
- [ ] Interpretar sectores, capas de suelo, objetos estÃƒÂ¡ticos, pivotes, colisiones y lÃƒÂ­mites de trÃƒÂ¡nsito; usar `MAP_RECOVERY.md` como punto de partida.
- [ ] Reemplazar generaciÃƒÂ³n decorativa del prototipo por posiciones y geometrÃƒÂ­a originales documentadas.
- [x] Recorrido local continuo del Bosque Susurrante: ruta de 3/7 tramos con activaciÃ³n de encuentros al avanzar a pie (v0.33). GeometrÃ­a original, secuencia exacta y ubicaciones siguen pendientes de los paquetes de sectores.
- [ ] Ajustar zoom, tamaÃƒÂ±o de personajes, profundidad y ocultaciÃƒÂ³n/transparencia del primer plano con comparaciones al video.

### P1 Ã¢â‚¬â€ acciones, enemigos y combate

- [ ] Recuperar balance de daÃƒÂ±o, vida, alcances, cargas, movimiento y enfriamientos; los nÃƒÂºmeros actuales son provisionales.
- [x] Interrupcion mutua entre espada/arma y mano secundaria, respetando la guarda compartida de 350 ms (v0.32).
- [ ] Ajustar eventos de impacto, ventanas de animacion, cargas y bloqueos restantes con secuencias continuas del gameplay.
- [ ] Completar daga, escudo, espada de dos manos y combinaciones de equipo disponibles en la demo.
- [x] AÃƒÂ±adir variantes locales jugables de daga, escudo y espada de dos manos, selecciÃƒÂ³n de mano secundaria y restricciones bÃƒÂ¡sicas (v0.3). Restan cargas, combinaciones y balance originales del punto anterior.
- [ ] Completar familias/variantes de monstruos, IA, proyectiles y patrones de jefes originales.
- [x] Conectar variantes visuales normal/nivel 2 de escarabajo, araÃƒÂ±a, avispa y rana desde sus clips originales; usar animaciones originales de salto de rana, idle, movimiento, ataque, stun y muerte (v0.35). Es la asociaciÃƒÂ³n local de una progresiÃƒÂ³n visual, no una tabla de apariciÃƒÂ³n recuperada.
- [x] Habilitar los 21 IDs de criatura presentes en el catÃ¡logo original recuperado, incluidos jefe escarabajo 45/47 y acompaÃ±antes 49/50 (v0.34). El orden y uso de estos tipos en encuentros sigue sujeto a evidencia de gameplay.
- [x] El jefe del Bosque Susurrante usa el escarabajo jefe original ID 45 y datos declarativos (v0.31); tamaÃ±o, nombre y patrones siguen sin evidencia suficiente.
- [ ] Mejorar animaciÃƒÂ³n de ataque: tiempo reiniciado por acciÃƒÂ³n, selecciÃƒÂ³n por arma/mano, eventos e impacto sincronizados.
- [ ] Completar feedback de daÃƒÂ±o, estados alterados, derribo/reanimaciÃƒÂ³n y muerte segÃƒÂºn lo observado en modo individual.

### P1 Ã¢â‚¬â€ progresiÃƒÂ³n y contenido de sistemas

- [ ] Inventario completo, equipo recibido, cofres, botÃƒÂ­n y reglas de recompensas originales.
- [ ] Desbloqueos por nivel y curvas reales de experiencia; distinguir contradicciones de fuentes (p. ej., nivel de trabajo secundario).
- [ ] Trabajos Tramposo y Periodista, habilidades originales y trabajo secundario.
- [x] Prototipos de Tramposo/Periodista y elecciÃƒÂ³n de una habilidad secundaria de otro trabajo (v0.4). Las reglas, catÃƒÂ¡logos y estadÃƒÂ­sticas originales completos del punto anterior siguen pendientes.
- [ ] CatÃƒÂ¡logo de regalos de Elisah, filtros por arma/trabajo, acumulaciones y modificaciones de habilidades.
- [x] Dones 11003 y 11004 mejoran ataque y defensa de recetas del Chef (v0.37); cantidades locales provisionales.
- [x] Don 11008 activa dano de fuego local una vez por ingrediente insertado correctamente (v0.38).
- [x] Don 11007 hace que el caldero siga automaticamente al Chef (v0.39).
- [x] Don 11011 extiende la receta cuando un enemigo ataca al Chef mientras lleva el caldero (v0.40); incremento local provisional.
- [x] Dones 11000-11002 ajustan la frecuencia relativa de los tres tipos de ingredientes (v0.41); pesos locales provisionales.
- [x] Don 11204 permite detonar manualmente una trampa armada y aumenta su dano un 50% por acumulacion (v0.42); valor local provisional.
- [x] Don 11209 hace caer el efecto original de yunque FX 35 sobre objetivos que sobrevivan a la trampa (v0.43); retardo, radio y dano local provisionales.
- [x] Don 1006 permite una parada pasiva con espada equipada; 15% por copia, hasta 60%, es balance local provisional (v0.44).
- [x] Don 1007 aumenta en un 25% local el dano de espada contra el ultimo enemigo que golpeo al jugador; +25% por copia, hasta +100% (v0.45).
- [x] Don 1008 carga el siguiente ataque de espada tras 3 s sin ataques basicos; +50% por copia hasta +150% (v0.46), valores locales provisionales.
- [x] Don 1104 aumenta el dano de daga al golpear desde atras segun la orientacion horizontal del enemigo; +35% por copia, hasta +100% (v0.47), valor provisional.
- [x] Don 1106 aumenta el dano del veneno y lo representa como relampago con FX original 37; +50% por copia hasta +100%, provisional (v0.48).
- [x] Don 1107 multiplica el ultimo pulso del veneno de daga; +100% por copia hasta +300%, provisional (v0.49).
- [x] Don 1202 aturde al enemigo cada tres impactos de espada grande; duración local de 1.5 s (v0.50).
- [x] Don 1507 otorga 30% de probabilidad de bloqueo gratuito con escudo equipado, incluso sin guardia; no consume carga (v0.51).
- [ ] ÃƒÂrboles de talentos completos y sus exclusiones/condiciones, sustituyendo los tres talentos simplificados.
- [ ] Mascotas restantes, elecciÃƒÂ³n en establo y funciones realmente presentes en demo; no implementar como hechos las promesas de la campaÃƒÂ±a.
- [ ] Misiones, diÃƒÂ¡logos, NPCs, hitos del tutorial y desbloqueos documentados.

### P2 Ã¢â‚¬â€ arte, audio e interfaz

- [ ] Recuperar equipo/cosmÃƒÂ©ticos y reproducir capas de ropa y tintes originales. El renderer actual usa cuerpo base y algunas armas dibujadas encima.
- [ ] Corregir tinte multiplicativo, skew y casos del formato de animaciÃƒÂ³n que difieran del cliente.
- [ ] Integrar efectos de combate y sonidos originales identificados por el paquete, con procedencia documentada.
- [ ] Sustituir nÃƒÂºmeros/iconos/paneles provisionales del HUD por la composiciÃƒÂ³n y recursos originales donde corresponda.
- [ ] Completar pantallas de opciones, perfil, trabajos, talentos, regalos y mapa de acuerdo con capturas detalladas.
- [ ] Revisar textos/localizaciÃƒÂ³n y referencias visuales de mejor resoluciÃƒÂ³n si se consiguen.

### P2 Ã¢â‚¬â€ calidad del juego local

- [x] Reanudar expediciÃƒÂ³n, posiciÃƒÂ³n, vida, enemigos y selecciÃƒÂ³n de recompensa sin duplicar botÃƒÂ­n (v0.2).
- [x] Exportar/importar guardados, validar archivos y migrar partidas v1 (v0.2).
- [x] Compartir la curva local de XP entre juego y validador de guardados; formato de partida sin cambios (v0.36).
- [ ] Separar configuracion de contenido/balance de simulacion. Armas, enemigos y curva local de XP ya estan centralizados; falta extraer trabajos.
- [ ] Mejorar manejo de errores de carga, opciones de volumen y persistencia de preferencias.
- [ ] Comprobar Chrome/Edge/Firefox, otras resoluciones, teclado/foco y rendimiento en mapas completos.
- [ ] Ampliar QA con derrota, continuidad de etapa, talentos, cambios de trabajo/equipo, carga de partidas y estados incompletos.

### Pospuesto expresamente

- [ ] Multijugador, chat remoto, cuentas, autenticaciÃƒÂ³n, sincronizaciÃƒÂ³n y backend.
- [ ] Contenido del juego final que solo fue anunciado y no existe como demo observable.
- [ ] PublicaciÃƒÂ³n/distribuciÃƒÂ³n; revisar procedencia y permisos de recursos antes de esa fase.

## Trabajo seleccionado para esta continuaciÃƒÂ³n

1. Crear este HANDOFF y mantenerlo actualizado.
2. Investigar la entrega de sectores/mapas originales; resultado documentado en `MAP_RECOVERY.md`: faltan paquetes de sectores/catÃƒÂ¡logos, no se recuperaron ÃƒÂ¡rboles/casas.
3. Implementar guardado reanudable, exportaciÃƒÂ³n/importaciÃƒÂ³n y migraciÃƒÂ³n v1 para facilitar las pruebas locales: completado en v0.2.

## Resultado de esta continuaciÃƒÂ³n Ã¢â‚¬â€ v0.2

- `dist/persistence.js`: formato de partida v2, migraciÃƒÂ³n v1, listas de contenido permitido, lÃƒÂ­mites de tamaÃƒÂ±o y validaciÃƒÂ³n de estado numÃƒÂ©rico. La clave local `tfma-local-v1` se conserva para migrar las partidas existentes; el campo `version` del documento es ahora 2.
- `dist/game.js`: captura/restauraciÃƒÂ³n de escena, posiciÃƒÂ³n, vida, enemigos, estado de ataque, regalos, efectos activos y proyectiles. El temporizador de guardado es de cinco segundos; tambiÃƒÂ©n se guarda al salir, cambiar de pestaÃƒÂ±a/zona, subir de nivel y mostrar regalos.
- Las recompensas pendientes vuelven a abrirse. Reabrir una victoria usa `victory(false)`, para no volver a conceder monedas/experiencia. Las partÃƒÂ­culas y diÃƒÂ¡logos son efÃƒÂ­meros y no se restauran. Una muerte guardada vuelve al punto seguro al continuar.
- Portada y menÃƒÂº: importaciÃƒÂ³n de JSON con resumen y confirmaciÃƒÂ³n; menÃƒÂº: exportaciÃƒÂ³n real descargable. El archivo invÃƒÂ¡lido no cambia la partida actual.
- Pruebas: sintaxis correcta; cinco pruebas unitarias de persistencia aprobadas; recorrido completo en Chrome aprobado, incluyendo recarga en expediciÃƒÂ³n, regalos y victoria, exportaciÃƒÂ³n real, rechazo de archivo invÃƒÂ¡lido e importaciÃƒÂ³n vÃƒÂ¡lida. RevisiÃƒÂ³n adicional aprobada: el importador se ve sobre la portada y Escape lo cierra.
- El servidor local del usuario ya estaba activo durante esta continuaciÃƒÂ³n; se reutilizÃƒÂ³ para QA y se dejÃƒÂ³ en ejecuciÃƒÂ³n. El perfil de QA sigue siendo independiente.
- La investigaciÃƒÂ³n adicional de mapas no recuperÃƒÂ³ imÃƒÂ¡genes nuevas de ÃƒÂ¡rboles/casas; el bloqueo concreto y formatos estÃƒÂ¡n documentados en `reference/MAP_RECOVERY.md`. El escenario y balance siguen siendo provisionales.

Al ampliar armas, trabajos, regalos o formato de escenas, actualizar tambiÃƒÂ©n las listas/validadores de `dist/persistence.js`, la migraciÃƒÂ³n si corresponde y sus pruebas. No descartar guardados existentes al cambiar contenido.

## ÃƒÅ¡ltima continuaciÃƒÂ³n Ã¢â‚¬â€ v0.3

- `dist/combat.js`: definiciones de espada/arco/daga/espada de dos manos, fases preparaciÃƒÂ³n/impacto/recuperaciÃƒÂ³n, alcance/arco y cÃƒÂ¡lculo de bloqueo frontal. Valores locales ajustables; no son estadÃƒÂ­sticas recuperadas del servidor.
- La mano secundaria se elige entre vendas y escudo en la aldea. H o clic derecho mantienen la parada con escudo. Bloquear impide moverse y se interrumpe al atacar o usar otra acciÃƒÂ³n. La espada de dos manos bloquea el movimiento al atacar y ocupa ambas manos.
- Las animaciones originales ahora avanzan con el reloj de cada ataque y usan clips por tipo de arma. Un golpe se procesa una sola vez al finalizar su preparaciÃƒÂ³n. La representaciÃƒÂ³n del arma y escudo continÃƒÂºa dibujada sobre el cuerpo original.
- Guardado v3: aÃƒÂ±ade mano secundaria y fase del ataque, incluido el indicador de impacto ya aplicado. Las partidas v1/v2 siguen admitidas; v2 conserva la expediciÃƒÂ³n. Una parada mantenida no se restaura tras cargar, evitando quedar bloqueado sin tecla pulsada.
- El tutorial conserva una carga de equipo que permite usar la venda incluso al importar estados contradictorios. Los desbloqueos reales por nivel todavÃƒÂ­a no se implementaron: las armas estÃƒÂ¡n disponibles libremente para probarlas.
- Verificado: sintaxis; once pruebas unitarias de combate/persistencia; recorrido completo en Chrome, incluyendo selecciÃƒÂ³n de daga/escudo, inmovilidad al bloquear, interrupciÃƒÂ³n entre manos, arma de dos manos, migraciÃƒÂ³n, expediciÃƒÂ³n y exportaciÃƒÂ³n/importaciÃƒÂ³n. Se revisÃƒÂ³ visualmente la captura del escudo y del equipo.
- El QA de exportaciÃƒÂ³n ahora usa una carpeta nueva por ejecuciÃƒÂ³n: Chrome puede sobrescribir un archivo del mismo nombre; la prueba anterior que esperaba un nombre nuevo daba un falso fallo.
- PrÃƒÂ³ximos focos: desbloqueos/inventario y trabajos restantes; contrastar patrones de monstruos/jefes con el video; recuperar los paquetes de sector para sustituir mapas aproximados. No reintentar un barrido de nombres de escenario sin evidencia nueva.

## CÃƒÂ³mo continuar despuÃƒÂ©s

Leer este archivo, `README.md`, `reference/IMPLEMENTATION_V01.md` y los informes especÃƒÂ­ficos de la pregunta. Priorizar un avance verificable de la lista. Mantener el comportamiento que ya funciona y la compatibilidad de partidas. Al terminar cada cambio, anotar aquÃƒÂ­ quÃƒÂ© se completÃƒÂ³, quÃƒÂ© evidencia lo respalda, quÃƒÂ© sigue siendo aproximado y quÃƒÂ© comprobaciones se realizaron.

## ÃƒÅ¡ltima continuaciÃƒÂ³n Ã¢â‚¬â€ v0.4

- `dist/jobs.js` centraliza cuatro trabajos, dos habilidades por trabajo, cartas y resoluciÃƒÂ³n de la tercera ranura. Los principales estÃƒÂ¡n disponibles libremente para probar; el secundario exige nivel 10 y un trabajo diferente al principal.
- Tramposo: cartas de daÃƒÂ±o/curaciÃƒÂ³n/aturdimiento/potencia y ocultaciÃƒÂ³n con bonificaciÃƒÂ³n al siguiente impacto. Las cartas alternan en una secuencia fija local, no una probabilidad recuperada. La ocultaciÃƒÂ³n detiene ataques nuevos de enemigos; recibir un impacto existente revela al jugador.
- Periodista: testimonios durante combate, activaciÃƒÂ³n por proximidad o Reportaje, y zona de Entrevista. Son aproximaciones de las mecÃƒÂ¡nicas descritas, no la recuperaciÃƒÂ³n completa de las reglas originales.
- Tercera habilidad (3): se elige en `I Ã¢â€ â€™ Trabajos` o con Mura, entre una de las dos habilidades del secundario. Mantiene ambas habilidades principales y su propio enfriamiento. Solo cambia en la aldea. La tecla F abre emotes locales.
- Formato v4: conserva trabajo/habilidad secundarios, cartas, invisibilidad, potencia, testimonios, entrevistas y enfriamiento de la tercera habilidad. Acepta v1Ã¢â‚¬â€œv3; no aÃƒÂ±ade un secundario a una partida antigua por defecto.
- Se consultaron referencias comunitarias y se contrastÃƒÂ³ la estructura con el cliente recuperado. El nivel secundario tiene evidencia contradictoria 9/10: se eligiÃƒÂ³ 10 por el video y se dejÃƒÂ³ centralizado/configurable. Detalles y enlaces en `reference/IMPLEMENTATION_V04.md`.
- Verificado: sintaxis, 15 pruebas unitarias y prueba completa en Chrome, incluyendo los trabajos nuevos, cartas, desapariciÃƒÂ³n/fin al atacar, selecciÃƒÂ³n/uso del secundario, recarga con enfriamiento, apariciÃƒÂ³n/consumo de testimonio y entrevista persistente. La partida nivel 10 se creÃƒÂ³ mediante importaciÃƒÂ³n en el perfil de QA; no se cambiÃƒÂ³ la partida habitual del usuario.
- Capturas: `.local/jobs.png` y `.local/journalist.png`. El servidor local que ya estaba en ejecuciÃƒÂ³n se reutilizÃƒÂ³ y se dejÃƒÂ³ intacto.
- Siguen pendientes: desbloqueos originales por nivel (a diferencia del modo de pruebas libre), ÃƒÂ¡rboles completos de talentos, regalos especÃƒÂ­ficos por trabajo, estadÃƒÂ­sticas exactas, equipo/cosmÃƒÂ©ticos originales y mapas/sectores. PrÃƒÂ³xima iteraciÃƒÂ³n sugerida: progresiÃƒÂ³n e inventario documentados, usando los nuevos catÃƒÂ¡logos de contenido centralizados.


## ContinuaciÃƒÂ³n acumulada Ã¢â‚¬â€ v0.5, v0.6 y v0.7

### v0.5: talentos

- Motor aislado en dist/talents.js. Nueve ÃƒÂ¡rboles, seis nodos y cuatro niveles por ÃƒÂ¡rbol; categorÃƒÂ­as armas, trabajos y ratÃƒÂ³n. Costes 1/2/2/3/4/4 y alternativas gratuitas basados en el cliente.
- Todos los efectos del catÃƒÂ¡logo se conectan al combate: daÃƒÂ±o cuerpo a cuerpo/arco, vida, curaciÃƒÂ³n, velocidad, armadura, bloqueo, potencia de cada trabajo y daÃƒÂ±o de Picpic.
- Se conserva el gasto de los tres talentos antiguos. RedistribuciÃƒÂ³n gratuita con confirmaciÃƒÂ³n en aldea; libera tambiÃƒÂ©n los puntos antiguos si el usuario lo elige.
- Prerrequisitos, exclusiones, valores y ÃƒÂºltimo nivel son decisiones locales, no balance recuperado del servidor.

### v0.6: mochila y regalos

- dist/inventory.js: seis bases de accesorios, tres ranuras, dos calidades, 80 objetos, estadÃƒÂ­sticas, venta, equipo con vista previa y confirmaciÃƒÂ³n. BotÃƒÂ­n determinista por victoria, conservado al volver o morir. No hay equipo cosmÃƒÂ©tico representado todavÃƒÂ­a.
- 15 dones locales, incluidos siete condicionados al equipo/trabajo principal o secundario; aplica daÃƒÂ±o/potencia/defensa. No se recuperÃƒÂ³ el catÃƒÂ¡logo exacto de dones original.
- Pantalla de victoria muestra el objeto recibido. No vuelve a concederse al reanudar.

### v0.7: recorridos y criaturas

- Selector de recorrido corto (3) y completo (6 normales + jefe); duraciÃƒÂ³n persistente por expediciÃƒÂ³n. El recorrido corto se mantiene para partidas antiguas.
- Rana con salto anticipado, variantes visuales en etapas avanzadas, avispa con proyectiles y tres jefes sucesivos (araÃƒÂ±a, avispa, rana). Jefes alternan patrones y aceleran por debajo de media vida. Estas IA son aproximaciones locales.
- 386 PNG adicionales recuperados por rutas exactas del metadato. Renderer habilita monstruos nuevos; no usa escarabajos jefe con cuernos ausentes.
- Se conservan recargas entre encuentros. Flag encounterAwarded evita volver a otorgar la bonificaciÃƒÂ³n de limpieza tras recarga. Guardado valida ramas, mochila, ranuras, duraciÃƒÂ³n y estados de enemigos.

### Evidencia nueva

- REA real focalizado: reference/REA_PROGRESSION_FINDINGS.md. ID ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf; siete archivos, 20671 nodos AST, cero fallos de parseo. Evidencia completa comprimida y resumen conservados.
- RecuperaciÃƒÂ³n reproducible: scripts/recover-extra-creatures.mjs y reference/EXTRA_CREATURES.md. Ocho recursos fallaron; estÃƒÂ¡n documentados.
- VerificaciÃƒÂ³n de esta entrega: comprobaciÃƒÂ³n sintÃƒÂ¡ctica de los mÃƒÂ³dulos. No se ejecutÃƒÂ³ un recorrido de navegador nuevo de v0.7. Los resultados de navegador de v0.4 anteriores no certifican estas funcionalidades nuevas. El usuario probarÃƒÂ¡ la entrega acumulada.

### Pendientes del checkpoint v0.7 (historicos)

Este bloque conserva el estado de una entrega antigua. No es la lista vigente: consulta **Pendientes vigentes en v0.180** al comienzo del HANDOFF. Desde este checkpoint se integraron el catalogo espanol de talentos y dones, el cofre y la seleccion confirmable de recompensas, ropa por capas y mas comportamientos de combate; las brechas de mapas y datos autoritativos del servidor siguen abiertas.

1. Probar desde el navegador habitual: continuar partida antigua, aprender/redistribuir, completar ambos recorridos, recibir/equipar/vender objetos, continuar hasta jefes 2 y 3, recargar con recompensa pendiente.
2. Mapas originales: faltan paquetes de sectores y catÃƒÂ¡logos de terreno. No realizar barridos especulativos de nombres; obtener evidencia nueva del protocolo/cachÃƒÂ©. Escenarios actuales aproximados.
3. Curva XP, desbloqueos por nivel, stats, loot, economÃƒÂ­a y habilidades exactas de servidor. Se mantiene acceso libre a armas/trabajos para probar. No afirmar fidelidad de balance.
4. Nombres/efectos originales de los talentos y dones; existen claves de traducciÃƒÂ³n pero los catÃƒÂ¡logos locales actuales son reconstruidos. La exclusividad de ramas se eligiÃƒÂ³ localmente; REA prueba precio de alternativa cero, no la lÃƒÂ³gica del servidor.
5. En ese checkpoint, la recompensa se concedia al clicar. **Resuelto despues:** el cofre abre una oferta; la seleccion puede cambiarse o quitarse, se conserva al guardar y solo se concede al confirmar. El catalogo y las cantidades/restricciones del servidor continuan siendo parciales o locales.
6. Vestimenta original recuperada: componer capas por slot/profundidad; no reemplazar la base del ratÃƒÂ³n completa. Conectar apariencia y objetos a catÃƒÂ¡logos autÃƒÂ©nticos. No mostrar accesorios actuales como cosmÃƒÂ©ticos reales.
7. Resto de enemigos y sonidos situacionales, transiciones de muerte no cubiertas por los clips actuales, mascota vulnerable/curable, comportamiento completo de los trabajos y comparaciÃƒÂ³n temporal con el MP4.
8. Actualizar/ampliar la cobertura automatizada cuando el usuario pida verificar la implementaciÃƒÂ³n. Hay pruebas de talentos aportadas durante la investigaciÃƒÂ³n, sin nueva prueba integral ejecutada en esta entrega.
9. Mantener online fuera del alcance hasta nueva instrucciÃƒÂ³n del usuario.


## Cierre de la continuaciÃƒÂ³n Ã¢â‚¬â€ v0.10 (pausado)

El usuario probÃƒÂ³ v0.7 y pidiÃƒÂ³ continuaciÃƒÂ³n sostenida. Posteriormente pidiÃƒÂ³ terminar el bloque en curso y detener el desarrollo para revisarlo. Esta ÃƒÂºltima peticiÃƒÂ³n prevalece: no iniciar otros bloques hasta que lo indique.

### Completado en esta entrega

- REA real focalizado en mascotas/recompensas: reference/REA_PET_REWARDS.md, ID ev_a3138d73947b6f9ea98c6d58534cc96475c5af79ec790105947a5dd09792d891.
- Trad801 recuperado del bundle: URL original trad/tfmadv_es y tfmadv_fr. CatÃƒÂ¡logos completos:84 talentos,126 dones,111 equipos,4 trabajos y15 tÃƒÂ­tulos. EvidenciaREA ev_b384c8ddf9355e911dc8c0fc7d857fb955734407b00671135b0c27d9786b491c. Ver TRANSLATION_RECOVERY.md. Los endpoints actuales no fijan una versiÃƒÂ³n histÃƒÂ³rica exacta.
- Cofre central abre con E despuÃƒÂ©s de limpiar; selecciÃƒÂ³n/deselecciÃƒÂ³n + confirmar. Oferta y selecciÃƒÂ³n sobreviven recarga. XP agregada al completar el encuentro, con animaciÃƒÂ³n2s/aviso5s. Cantidades siguen siendo locales. Partidas antiguas dentro de un encuentro conservan el reparto antiguo para evitar duplicar XP.
-14 ÃƒÂ¡rboles/84 textos espaÃƒÂ±oles originales; asociaciÃƒÂ³n de grupos de seis a ÃƒÂ¡rboles inferida semÃƒÂ¡nticamente, no recuperada como tabla del servidor. Cargas, alcance/multihit, veneno, bloqueos/escudos, curas y efectos de trabajos/mascota conectados al motor. Balances locales en balanceDescription. Los puntos de los ÃƒÂ¡rboles inventados v0.5Ã¢â‚¬â€œv0.7 se devuelven al cargar; tres talentos legacy se conservan hasta redistribuciÃƒÂ³n voluntaria.
-32 dones originales con IDs y textos autÃƒÂ©nticos, elegibilidad por equipo/trabajo, iconos y efectos locales. Conserva15 dones anteriores para reanudar guardados; oferta nueva prioriza los originales. Si se agotan opciones nuevas, puede repetir dones compatibles; esta regla es local, no servidor recuperado.
- ComposiciÃƒÂ³n de ropa y armas originales por slots y pivotes, profundidad con signo. Apariencia con vista previa, prendas por equipo o selecciÃƒÂ³n manual. Los seis accesorios siguen siendo un catÃƒÂ¡logo local, sus prendas asignadas son equivalencias locales.
- Mascota: nombre, invocar/retirar en aldea; HP, daÃƒÂ±o, caÃƒÂ­da, H para ayudar cuando estÃƒÂ¡ caÃƒÂ­da o E3s; talentos de curaciÃƒÂ³n/bloqueo/velocidad/reanimaciÃƒÂ³n del jugador. Reglas y tiempos locales; el protocolo sÃƒÂ³lo confirma salud/muerte/reanimaciÃƒÂ³n genÃƒÂ©rica y establo.
- Vendaje: incantaciÃƒÂ³n1s interrumpida por movimiento y otras acciones. Este tiempo y cancelaciÃƒÂ³n por movimiento sÃƒÂ­ se observan en el original. Cargas y tiempos de recuperaciÃƒÂ³n se mantienen entre salas/recargas.
- Plantas maduran, alternan cardo/lirio; trampas se arman, disparan y pueden rearmarse con mascota; caldero se carga/deja con E, actÃƒÂºa como seÃƒÂ±uelo con talento; entrevistas/testimonios/cartas/desapariciÃƒÂ³n reciben sus efectos descritos.
-75 MP3 originales y326 iconos recuperados desde rutas referenciadas. Talentos/dones usan iconos; otros iconos quedan disponibles para prÃƒÂ³ximas interfaces. Efectos de XP,nivel,arma,arco,venda,cofre y bloqueo usan muestras locales. Audio con control de volumen y manejo de autoplay.
- Guardado v10: recursos, incantaciÃƒÂ³n, buffs, venenos, proyectiles penetrantes con historial, estados de mascota/plantas/trampas, apariencia y selecciÃƒÂ³n de don. Se conserva clave tfma-local-v1 y migraciÃƒÂ³n.

### Comprobaciones y lÃƒÂ­mites

- Cierre con comprobaciÃƒÂ³n sintÃƒÂ¡ctica de mÃƒÂ³dulos; no se ejecutÃƒÂ³ una prueba integral de navegador en esta continuaciÃƒÂ³n, siguiendo la peticiÃƒÂ³n de dejar la revisiÃƒÂ³n jugable al usuario.
- Las suites histÃƒÂ³ricas esperan la interfaz de dones de un clic y9ÃƒÂ¡rboles: requieren actualizaciÃƒÂ³n ANTES de ejecutarse para certificar v0.10. No atribuir sus resultados previos a esta entrega.
- Nuevos mÃƒÂ³dulos: dist/resources.js, dist/gifts.js, dist/audio.js; scripts de recuperaciÃƒÂ³n/generaciÃƒÂ³n y manifiestos preservados.

### Pendientes para cuando se reanude

1. Revisar partida antigua, puntos devueltos, cargas, curaciÃƒÂ³n interrumpible, cofres, guardar selecciÃƒÂ³n sin confirmar y recargar; revisar piercing/DOT/escudos con los dones correspondientes.
2. Mantener las pruebas de regresion alineadas con los catalogos vigentes; comparar visualmente el juego con el MP4 y conservar las incertidumbres del servidor.
3. Completar el don original aun ausente del catalogo ejecutable: 1201. Su descripcion depende de definir mitigacion en el sistema local.
4. CurvaXP, desbloqueos, estadÃƒÂ­sticas, permisos de equipo, contenidos/categorÃƒÂ­as/cofres reales: servidor ausente. El catÃƒÂ¡logo de traducciÃƒÂ³n describe mecÃƒÂ¡nicas pero no aporta nÃƒÂºmeros ni todas las reglas. Persisten valores locales y armas/trabajos libres.
5. Escenarios originales bloqueados por paquetes del socket: MAP_RECOVERY_FOLLOWUP.md + fuentes ClipAnim/Look recuperadas. Cache# es memoria suministrada por servidor; no una ruta descargable. No repetir bÃƒÂºsquedas especulativas de nombres.
6. Continuar comparaciÃƒÂ³n del MP4 y recuperar/usar mÃƒÂ¡s FX/estados originales; falta fidelidad completa de eventos, IA, UI, animaciones y sonidos situacionales.
7. Iconos originales de arma/trabajo/dones, selector de trabajo secundario, miniaturas de prendas en mochila y vista de Picpic integrados. Faltan iconos de algunas ventanas; los nombres y estadísticas de prendas y botín siguen siendo locales. Falta catálogo auténtico y relación apariencia/equipo del servidor.
8. Mantener online fuera de alcance. No desplegar ni publicar.


## ReanudaciÃƒÂ³n y checkpoint v0.11

El usuario revisÃƒÂ³ v0.10, pidiÃƒÂ³ continuar y revocÃƒÂ³ la pausa anterior. Se reutilizÃƒÂ³ la skill REA y la evidencia retenida para analizar catÃƒÂ¡logos y recursos adicionales; ver IMPLEMENTATION_V11.md.

- CatÃƒÂ¡logo ejecutable65dones (33adicionales), con parÃƒÂ¡metros y efectos de trabajos/trampas/cartas descritos por los textos originales. Los nÃƒÂºmeros son provisionales.
- Corregidos conversiones de bloqueo, fuente de proyectiles, curaciÃƒÂ³n recibida, alcance de talentos, HP de mascota al redistribuir e invisibilidad del escenario.
- Integrados184PNG originales,60FX y7invocaciones. Cardo25/zarza26/lirio27 corroborados por piezas originales.
- Equipo principal/secundario con preview y confirmar/cancelar; iconos autÃƒÂ©nticos en equipo/trabajos.
- Formato11 incorpora estados nuevos y mantiene v1Ã¢â‚¬â€œv10. No reinicia los ÃƒÂ¡rboles autÃƒÂ©nticos de v0.10. Los efectos visuales transitorios no se guardan.
- ComprobaciÃƒÂ³n de sintaxis; sin pruebas automatizadas nuevas ni ejecutadas. Las suites antiguas siguen pendientes de adaptar cuando se pida verificaciÃƒÂ³n.

Estado pendiente al cierre de v0.11 (historico): faltaba el don 1201. **Resuelto en v0.111** con implementacion local documentada en reference/IMPLEMENTATION_V111.md; el porcentaje y la definicion de mitigacion siguen siendo provisionales porque el servidor no entrego sus cifras. Mapas y reglas del servidor siguen pendientes; online fuera de alcance.


## Checkpoint v0.12 Ã¢â‚¬â€ desarrollo activo

- REA focalizado Chef/cartas: REA_COOK_CARDS.md y evidencia ev_861f1b9d4051117231e2e78d7073ef84fac0f44625f71b427a72cd8f1085f1b9. No repetir el anÃƒÂ¡lisis del bundle completo.
- Chef implementado con ingredientes reales en el suelo, tres espacios, cocciÃƒÂ³n, limpieza, daÃƒÂ±o/cura/defensa por composiciÃƒÂ³n y ayuda de mascota. MÃƒÂ³dulo puro dist/cooking.js. Reglas originales confirmadas vs fÃƒÂ³rmulas locales en COOKING_LOCAL.md.
- Chef controles locales: habilidad1 invoca/carga/deja; clic/E aÃƒÂ±ade o limpia; X retira ÃƒÂºltimo ingrediente antes de cocinar. Las manos originales se configuraban desde el servidor, por lo que no se afirma equivalencia exacta de controles.
- Periodista: recoge y almacena dos testimonios, luego lanza Informe; Entrevista activa uno del suelo. dist/journalism.js normaliza libreta; tres tipos locales actuales, faltan combinaciones originales completas.
- Cartas pica/diamante con proyectiles y corazones apuntados. TrÃƒÂ©bol aplica siguiente ataque fÃƒÂ­sico. La base de diamante inmoviliza y aturde primer blanco segÃƒÂºn comp.desc1012; algunos dones contradicen esa descripciÃƒÂ³n, conservar la ambigÃƒÂ¼edad en documentaciÃƒÂ³n.
- Plantas crecen dos veces cerca del jugador; zarzas reflejan daÃƒÂ±o al crecer. Valores y tiempos locales.
- Elixir viaja como frasco hasta el punto apuntado y crea la zona al aterrizar. Se conserva el vuelo al recargar;0.45s es provisional, no tiempo recuperado. La curaciÃƒÂ³n instantÃƒÂ¡nea al lanzador se eliminÃƒÂ³ segÃƒÂºn descripciÃƒÂ³n de cura sobre el tiempo.
- Guardado12 conserva libreta, caldero/ingredientes, proyectiles de cartas y crecimiento. Compatible con versiones anteriores; tres talentos legacy y ÃƒÂ¡rboles autÃƒÂ©nticos se mantienen.
- Trece capturas de video nuevas en reference/video-v12 y VIDEO_MECHANICS_V12.md. Se observan nivel2 XP5/120 y nivel3 XP10/160. Eso contradice la curva provisional actual pero no determina toda la fÃƒÂ³rmula; pendiente resolver con mÃƒÂ¡s evidencia.
- ComprobaciÃƒÂ³n sintÃƒÂ¡ctica. No se aÃƒÂ±adieron/ejecutaron pruebas automatizadas ni se tocÃƒÂ³ la partida habitual.

PrÃƒÂ³xima prioridad: completar recetas/testimonios/dones a partir de datos originales disponibles, revisar crecimiento/ritmo del MP4 y corregir curvaXP con evidencia suficiente. No presentar la simulaciÃƒÂ³n local de recetas como tabla recuperada. Seguir activo hasta indicaciÃƒÂ³n del usuario; mapas/servidor siguen ausentes y online fuera del alcance.

## Checkpoint v0.13 Ã¢â‚¬â€ desarrollo activo

- Se reutiliza la evidencia REA de traducciones originales y la captura del MP4 en 05:50; no se repite el anÃƒÂ¡lisis general del bundle.
- Se aÃ±aden cuatro dones botÃ¡nicos originales: 10201 Permacultura, 10202 Equipo de abeja, 10209 Polinizando y 10211 Lirio rosa de los valles. El catÃ¡logo ejecutable queda en 69 dones. Las cuatro ofertas estÃ¡n limitadas a BotÃ¡nico principal o BotÃ¡nico secundario con Pulgar Verde equipado; ver reference/IMPLEMENTATION_V13.md para valores locales.
- Permacultura permite crecimiento pasivo cerca de otras plantas maduras; Equipo de abeja crea una defensora temporal cuando hieren una planta; Polinizando hace que el lirio cure plantas cercanas; Lirio rosa convierte el exceso de curaciÃƒÂ³n del jugador en barrera.
- Se corrige el alcance de Cardo: el talento se aplica una sola vez al radio de ataque, y no altera el radio de Lirio ni Zarza.
- `package.json` y el perfil marcan v0.13. El esquema de guardado no cambiÃƒÂ³ y conserva compatibilidad con v1Ã¢â‚¬â€œv12.
- Se regenerÃƒÂ³ `dist/gifts.js` desde `scripts/build-gifts.mjs`. ComprobaciÃƒÂ³n sintÃƒÂ¡ctica aprobada con npm run check y node --check scripts/build-gifts.mjs; no se ejecutaron pruebas automatizadas ni un recorrido de navegador.
- Siguiente foco: dones restantes con mecÃƒÂ¡nicas implementables, comparaciÃƒÂ³n de progresiÃƒÂ³n con el MP4 y mejora visual de las plantas. La geometrÃƒÂ­a del mapa original requiere los paquetes de sectores no recuperados; no dar por finalizada la reconstrucciÃƒÂ³n.



## Checkpoint v0.14 â€” dones de plantas

- Se amplÃ­a el catÃ¡logo original de 69 a 77 dones con los IDs 10203â€“10208 y 10210; se completa el efecto 10211. Los textos, ID y restricciones BotÃ¡nico/Pulgar Verde se basan en traducciones recuperadas con REA.
- Cardo: daÃ±o propio con riesgo para BotÃ¡nico, mÃºltiples objetivos, veneno y ralentizaciÃ³n, selecciÃ³n exclusiva y mejoras de fuerza/vida. Cardos aplican el veneno de Maleza pantanosa.
- Lirio: genera esquejes cuando crece; Lirio rosa aumenta su curaciÃ³n y convierte excesos en barrera.
- Malas hierbas genera un Cardo al destruirse una planta, con un lÃ­mite que evita brotes recursivos infinitos. weedSpawned se conserva al guardar.
- Balance local: daÃ±o, radios, frecuencias, lÃ­mite de objetivos/plantas y probabilidades no estÃ¡n descritos por el cliente. Detalle: reference/IMPLEMENTATION_V14.md.
- RegeneraciÃ³n del catÃ¡logo y comprobaciÃ³n sintÃ¡ctica aprobadas con node scripts/build-gifts.mjs, npm run check y node --check scripts/build-gifts.mjs. No se ejecutaron pruebas ni recorrido de navegador.
- Esencia elÃ¡stica (10006) aÃ±ade un segundo rebote guardable del frasco de Elixir; el esquema no cambia y las partidas v1â€“v12 continÃºan compatibles.

## ContinuaciÃ³n v0.14 â€” Naturaleza furiosa

- El catÃ¡logo local pasa de 77 a 78 dones: `scripts/build-gifts.mjs` incorpora el ID original 10005, Naturaleza furiosa.
- Al aterrizar el Elixir, BotÃ¡nico con ese don invoca una hoja aliada temporal. Persigue enemigos, ataca, recibe daÃ±o de proyectiles y se dibuja mediante la criatura original ID 17 (Mandragore). La asociaciÃ³n visual con esa criatura es una inferencia; el texto de traducciÃ³n solo especifica una hoja viva y el cliente deja su conducta en manos del servidor.
- Se conserva la bandera de invocaciÃ³n y el estado de la entidad en el guardado v12; se corrigiÃ³ el ciclo de vida para que envejezca y desaparezca despuÃ©s de reanudar.
- Evidencia REA focal: `ev_deecf1d30a6c206794104f43128d350ebb600c936b012bdd5821ba02fc84c88d`; hallazgos y lÃ­mite documentados en `reference/IMPLEMENTATION_V14.md`.
- Comprobado: regeneraciÃ³n del catÃ¡logo, `npm run check` (sintaxis de mÃ³dulos) y `node --check scripts/build-gifts.mjs`. No se ejecutaron pruebas automatizadas ni prueba de navegador; el usuario revisarÃ¡ la versiÃ³n acumulada.
- Sigue pendiente revisar visualmente esta habilidad, afinar su comportamiento con evidencia continua y continuar los dones no implementados y el resto del HANDOFF.

## Checkpoint v0.15 â€” progresiÃ³n XP

- La curva requiere 120 XP en nivel 2 y 160 XP en nivel 3, coincidiendo con las dos barras observadas en el gameplay a 06:20 y 08:30. Se cambiÃ³ la pendiente local de 45 a 40 XP por nivel; se conserva el umbral de 80 XP para nivel 1.
- Los umbrales 120/160 son observaciones directas del video. La pendiente lineal para niveles posteriores y los 80 XP de nivel 1 siguen siendo una extrapolaciÃ³n local; no hay datos suficientes para asegurar toda la curva original.
- No cambia el formato de guardado. `npm run check` paso; QA de navegador pendiente.
- Evidencia y detalle: `reference/IMPLEMENTATION_V15.md` y `reference/VIDEO_MECHANICS_V12.md`.
- `npm run check` comprobÃ³ sintaxis. No se ejecutaron pruebas automatizadas ni recorrido de navegador; queda pendiente que el usuario revise en juego los saltos de nivel y la barra XP.

## Checkpoint v0.16 â€” Desinfectante

- Se aÃ±ade el don original 1708 al catÃ¡logo: 79 dones implementados. Durante cada pulso de curaciÃ³n periÃ³dica, aplica daÃ±o al enemigo vivo mÃ¡s cercano dentro de 320 unidades.
- El efecto coincide con la traducciÃ³n recuperada; el valor de 8 puntos y el alcance mÃ¡ximo son parÃ¡metros locales porque el texto original no especifica cantidades ni distancia.
- Disponible con venda como mano secundaria, siguiendo la familia original de dones 1700. No cambia guardado ni datos de jugadores.
- REA confirma los textos y estructura del catÃ¡logo; no revela el comportamiento delegado ni el balance. Detalle: `reference/IMPLEMENTATION_V16.md`.
- RegeneraciÃ³n de `dist/gifts.js`, `npm run check` y `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.17 â€” CirugÃ­a

- Se incorpora el don original 1706: la Ãºltima venda disponible cura un 35 % mÃ¡s; el catÃ¡logo llega a 80 dones.
- El texto confirma que la Ãºltima curaciÃ³n aumenta, pero no especifica cuÃ¡nto ni si se refiere a la Ãºltima carga. Se reconstruye como la Ãºltima carga disponible y el 35 % es local/provisional.
- El aumento tambiÃ©n afecta la curaciÃ³n de mascota asociada a esa venda y el cÃ¡lculo del exceso que se convierte en barrera.
- No se agregan campos de guardado. RegeneraciÃ³n del catÃ¡logo y comprobaciÃ³n sintÃ¡ctica aprobadas; no se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.18 â€” Triaje

- Se incorpora el don original 1704; el catÃ¡logo llega a 81 dones.
- Con Triaje, una venda tambiÃ©n cura a Picpic ademÃ¡s del jugador aunque la mascota no estÃ© herida. Sin mascota activa no se aÃ±ade una curaciÃ³n fuera de alcance.
- El texto original especifica curar dos aliados, pero el modo individual solo tiene al jugador y su mascota. La adaptaciÃ³n y sus reglas locales quedan documentadas en `reference/IMPLEMENTATION_V18.md`.
- La cura usa la misma cantidad normal de la venda; no cambia el esquema de guardado.
- Se regenerÃ³ el catÃ¡logo y `npm run check` + `node --check scripts/build-gifts.mjs` aprobaron. No se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.19 â€” Efecto placebo

- Se incorpora el don original 1710; el catÃ¡logo llega a 82 dones.
- Si estÃ¡ activa la curaciÃ³n periÃ³dica de venda, el don prolonga su duraciÃ³n local de 6 a 8 segundos. El intervalo de pulsos no cambia.
- La descripciÃ³n original confirma que aumenta duraciÃ³n, pero no indica cuÃ¡nto. El incremento de 2 segundos y el requisito local de talento que activa la curaciÃ³n periÃ³dica se documentan como aproximaciones.
- El estado `bandageHot` ya se guarda; no cambia el esquema. Detalle: `reference/IMPLEMENTATION_V19.md`.
- RegeneraciÃ³n del catÃ¡logo y `npm run check` + `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.20 â€” Vitamina

- Se aÃ±ade el don original 1709; el catÃ¡logo llega a 83 dones.
- Al completar una venda, el jugador recibe 2 segundos de reducciÃ³n local de daÃ±o del 20 %. Picpic tambiÃ©n la recibe si fue curado por esa venda.
- Los valores y el momento de activaciÃ³n son provisionales; la descripciÃ³n solo indica que reduce el daÃ±o recibido por el objetivo durante la curaciÃ³n.
- `bandageGuard` se valida y conserva en jugador y mascota; no se cambia el esquema y el guardado se escribe al terminar la venda.
- CatÃ¡logo regenerado; `npm run check` y `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.21 â€” Polvo fertilizante

- Se aÃ±ade el don original 10112; el catÃ¡logo llega a 84 dones.
- Al concluir DesapariciÃ³n, crea una hoja aliada en el origen de la habilidad. Reutiliza entidad/IA/visual de Naturaleza furiosa y el lÃ­mite de tres hojas vivas.
- La descripciÃ³n solo confirma invocar una hoja que ataca. El disparador al fin de la habilidad y los parÃ¡metros se documentan como provisionales en `reference/IMPLEMENTATION_V21.md`.
- Guardado v12 conserva la entidad y el punto de origen; el cierre de habilidad guarda despuÃ©s de invocarla para no repetirla tras recargar.
- CatÃ¡logo regenerado; `npm run check` y `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.22 â€” Portada

- Se aÃ±ade el don original 14506; el catÃ¡logo llega a 85 dones.
- Entrevista consume todos los testimonios vivos a 220 unidades y activa una zona para cada uno. Su enfriamiento aumenta 50 %. Alcance, porcentaje y creaciÃ³n de zonas separadas son aproximaciones locales.
- Evidencia y lÃ­mites del rastro REA, incluido Testimonio de muerte 12000, estÃ¡n en `reference/REA_TRACE_JOURNALISM.md`; no se interpretÃ³ un resultado sin coincidencias en grafo parcial como ausencia.
- No cambia el esquema de guardado: entidades y enfriamiento ya se conservan.
- CatÃ¡logo regenerado; `npm run check` y `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.


## Checkpoint v0.23 â€” Manga larga

- Se aÃ±ade el don original 13001; el catÃ¡logo llega a 86 dones.
- El As de corazones otorga a cada aliado dentro del alcance una carga que refleja el siguiente golpe aceptado. La carga del jugador y la de Picpic se consumen por separado.
- Se refleja el daÃ±o base recibido antes de mitigaciÃ³n defensiva; ese cÃ¡lculo y el consumo solo ante fuentes enemigas vÃ¡lidas son aproximaciones locales. El texto traducido confirma un reflejo del siguiente ataque, pero el rastro REA disponible no expone la implementaciÃ³n de servidor ni sus magnitudes.
- Guardado admite el estado de reflejo para jugador y mascota; no cambia la versiÃ³n del esquema.
- `npm run check` y `node --check scripts/build-gifts.mjs` aprobados. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
- El usuario indicÃ³ pausar el proyecto al terminar esta implementaciÃ³n.


## Checkpoint v0.24 â€” CatÃ¡logos de contenido

- Se extrae la construcciÃ³n de escenas a `dist/maps.js` y el catÃ¡logo editable a `dist/map-data.js`: dimensiones, puntos de entrada, decoraciÃ³n procedural, objetos, colisiones, NPCs e interacciones.
- `dist/persistence.js` valida IDs y lÃ­mites de mapa desde el catÃ¡logo; los identificadores existentes y el esquema de guardado v12 se mantienen.
- Se separan metadatos de personajes/NPCs en `dist/characters.js` y cÃ³digos/etiquetas/ranuras cosmÃ©ticas en `dist/cosmetics.js`. El renderer mantiene una exportaciÃ³n de compatibilidad.
- No cambia el comportamiento esperado ni la generaciÃ³n actual de escenas. Las definiciones siguen siendo aproximaciones porque faltan sectores originales.
- Los ocho trabajos/habilidades ya cuentan con IDs estables en `dist/jobs.js`; cooldowns activos se leen del catÃ¡logo. El comportamiento de cada habilidad y las conductas de mascota aÃºn dependen del motor central; la siguiente fase debe extraer handlers sin alterar el flujo de combate. La evidencia original de balance y mapas sigue pendiente segÃºn la lista P0/P1.
- Partidas previas: se conservan la clave local y SAVE_VERSION 12; no se requiere migraciÃ³n.
- No se ejecutÃ³ suite automatizada ni prueba manual de navegador en este checkpoint.



## Checkpoint v0.25 â€” Sistemas de contenido ampliables

- `dist/skills/` y `dist/skill-system.js` contienen handlers por trabajo y enrutamiento por `behaviorKey`; el motor principal delega la activaciÃ³n.
- `dist/pets.js` contiene el ciclo de vida y la IA de la mascota con servicios inyectados desde `game.js`.
- `characters.js` define IDs de personaje/especie; el perfil selecciona los renderers mediante `art.js`.
- El guardado sube a v13 para persistir `characterId` y `petSpecies`; v1â€“v12 siguen aceptÃ¡ndose y reciben valores predeterminados.
- `reference/CONTENT_ARCHITECTURE.md` describe el contrato de extensiÃ³n. `npm run check` aprobÃ³ sintaxis; no se ejecutaron pruebas automatizadas ni recorrido de navegador.

## Checkpoint v0.26 â€” Encuentros configurables

- Se extrajo la composiciÃ³n de encuentros de `dist/game.js` a `dist/encounter-data.js` (reglas editables) y `dist/encounters.js` (planificador determinista).
- `spawnRoom` delega en el planificador y conserva creaciÃ³n de enemigos, combate y recompensas del motor. Se pueden editar conteo, tipos, posiciones del jefe y anuncios en un catÃ¡logo.
- La composiciÃ³n mantiene las reglas y semilla del prototipo; no se afirma que sea balance original.
- `package.json` y la versiÃ³n expuesta por el juego estÃ¡n en v0.26.0. `npm run check` incluye los mÃ³dulos nuevos; no se ejecutaron pruebas automatizadas ni prueba en navegador.
## Checkpoint v0.27 â€” Ciclo de armas guiado por REA

- `dist/combat.js` incorpora estados explÃ­citos `ready`, `incantation` y `active` para los ataques y el umbral de reactivaciÃ³n `WEAPON_ACTIVATION_GATE_MS` (350 ms).
- `game.js` actualiza el temporizador de bloqueo y `art.js` presenta la preparaciÃ³n del arco desde el estado de ataque. El bloqueo se serializa como temporizador restante, por lo que se conserva al guardar/cargar sin cambiar la versiÃ³n de esquema.
- REA rastreÃ³ el mÃ³dulo original `ArmeEpee.js`: Evidence `ev_b5706481ee322c5908effe6faa0d46b10814fd37a54196af24c85d66c9c05dc6`, cobertura parcial. Notas estÃ¡ticas y lÃ­mites en `reference/REA_WEAPON_TRACE.md`.
- Las duraciones de impacto/animaciÃ³n del simulador siguen siendo aproximadas; no se sustituyeron por valores incompletos del servidor. VersiÃ³n actualizada a v0.27.0.
## Checkpoint v0.28 â€” Selector de expediciones

- REA trace estatico de `InterfaceSelectionDonjonADV.js`: Evidence `ev_1616813129e63830f36bde7c3dec62905f4ae63745cb0976893f8d731173cafa`, cobertura parcial. Observa lista, seleccion, vista previa 400x300 y dificultad; el lanzamiento online depende del servidor. Detalles y limites: `reference/REA_DUNGEON_SELECTION.md`.
- El selector local ahora se genera mediante `selectableExpeditions()` a partir de `MAPS` y muestra descripcion, dificultad, longitud y vista esquematica provisional; no se presentan como original las miniaturas que faltan.
- Las escenas separan el ID de mapa de `gameMode`. Guardados conservan `mapId`, reanudacion usa dimensiones/catalogo, y todas las entradas seleccionables con modo dungeon pueden compartir el flujo local de expedicion.
- La longitud permitida viene de `expedition.encounterCounts`; la dificultad se propaga a la etapa inicial. Los valores actuales preservan 3/7 encuentros y una sola dificultad.
- Version v0.28.0. `npm run check` valida sintaxis; no se ejecutaron pruebas automatizadas ni prueba en navegador.
## Checkpoint v0.29 â€” Mapa mundial

- Se aÃ±adiÃ³ un acceso a `MAP_pinned.jpg`, recurso original ya recuperado. La ventana se puede cerrar haciendo clic sobre la imagen y adapta su tamaÃ±o al viewport.
- REA trace estÃ¡tico de `InterfaceCarteMondeADV.js`: Evidence `ev_b55fa8bcd0bd3388bbcebe478adb6d2e36acf1e501908cd8d740c8e1cc2e68b3`, cobertura parcial. La fuente muestra la imagen centrada, lÃ­mites de tamaÃ±o y cierre al hacer clic; no establece una tecla de apertura. Ver `reference/REA_WORLD_MAP.md`.
- La apertura desde el botÃ³n local es adaptaciÃ³n del servidor original; no se aÃ±adiÃ³ una tecla inventada.
- VersiÃ³n v0.29.0. `npm run check` valida sintaxis; no se ejecutaron pruebas automatizadas ni prueba en navegador.
## Checkpoint v0.30 - reconstruccion del Bosque Susurrante

- El catalogo de mapas declara tres composiciones jugables guiadas por el video: claro, pasaje estrecho de zarzas y arena con laguna. Cada una tiene suelo, spawn, objetos y colisiones propias; la seleccion sigue el indice del encuentro.
- `dist/art.js` agrega suelo y vegetacion dibujados para estas composiciones. `dist/encounters.js` mantiene las oleadas dentro del corredor cuando corresponde.
- Observacion directa del MP4: claro con arboles grandes (05:00), corredor entre arboles/zarzas (14:00) y laguna a la derecha de la arena (16:00). Coordenadas, dimensiones y radios de colision son aproximaciones locales.
- REA reutiliza el analisis archivado y las notas de `reference/MAP_RECOVERY.md` / `reference/MAP_RECOVERY_FOLLOWUP.md`; no se atribuye evidencia nueva ni se ejecuta el cliente antiguo.
- El payload original de sectores sigue sin recuperarse. Faltan los segmentos de colision, placements, ClipAnim cacheados y conectividad exactos; el avance resuelve la repeticion de un claro procedural con una reconstruccion trazada, no una recuperacion binaria del servidor.
- Version 0.30.0. Pendiente validar visualmente en navegador con el usuario; no se modifica el modo online.
## Checkpoint v0.31 - especie original del jefe

- La escena final del Bosque Susurrante usa el ClipAnim original de escarabajo jefe, ID 45. El renderer recibe especie y nombre desde el catalogo de encuentros; el fallback local tambien representa caparazon y cuerno.
- Evidencia visual: reference/gameplay-frames/frame-0960.jpg y frame-1020.jpg. Evidencia de assets y limites: reference/EXTRA_CREATURES.md y reference/IMPLEMENTATION_V31_BOSS.md.
- El cliente recuperado contiene IDs 45 y 47 bajo monstre/scarabee1boss/. El video no distingue cual ID exacto ni fija escala, nombre traducido, HP o patrones; se eligio 45 por su set ClipAnim y el combate permanece provisional.
- No se cambia el esquema de guardado ni su clave. Version de aplicacion 0.31.0.
## Checkpoint v0.32 - interrupcion mutua de manos

- REA y el cliente archivado documentan que cada boton controla una mano y que la activacion de una mano interrumpe la otra. Se conecto este comportamiento para ataque, venda y escudo.
- Cancelar la accion libera el temporizador de duracion del ataque, pero conserva weaponGate (350 ms); sostener el boton primario no reinicia el ataque mientras comienza una accion secundaria.
- Evidencia y alcance: reference/REA_FINDINGS.md, Evidence ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd; detalle en reference/IMPLEMENTATION_V32_HANDS.md.
- No cambia formato, version ni clave de guardado. Version de aplicacion 0.32.0.

## Checkpoint v0.33 - recorrido continuo del bosque

- Las rutas de 3 y 7 encuentros ahora se componen como una escena continua: cada tramo selecciona una plantilla de area editable y la transicion conserva jugador, mascota, camara, bendiciones y estado de expedicion.
- Tras reclamar un regalo, el combate siguiente se activa cuando el jugador cruza a pie el acceso de la zona correspondiente. Se puede guardar y reanudar mientras se avanza entre encuentros; partidas anteriores conservan su comportamiento de encuentro activo.
- Al reanudar una expedicion guardada por una version anterior, la instantanea local de jugador, mascota, enemigos y efectos se desplaza al slot continuo del encuentro guardado. Las partidas nuevas guardan `encounterStarted` opcionalmente sin cambiar el formato principal.
- Los planes de oleada y jefe reciben el desplazamiento de su tramo. El cofre aparece junto al jugador al cerrar cada combate, y la ruta de siete termina en la arena de la laguna.
- Video: `reference/VIDEO_MECHANICS_V12.md` observa corredor y claros; conexiones, distancias, trigger y la secuencia de siete zonas son implementacion local. Los sectores originales siguen ausentes. Sin pruebas automatizadas ni recorrido de navegador en esta version.
- Version de aplicacion 0.33.0. Pendiente comprobar el recorrido a pie y la reanudacion en el navegador del usuario.

## Checkpoint v0.34 - reglas locales de enemigos editables

- Se habilitaron los 21 IDs de criatura ya presentes en `creatures.json`, incluidos 45/47 (escarabajo jefe) y 49/50 (criaturas acompaÃ±antes). El ID 45 usado por el encuentro final ya no queda rechazado por la lista del renderer.

- `dist/enemy-data.js` centraliza HP, velocidad, alcance, cadencia, telegrÃƒÂ¡ficos, daÃƒÂ±o, proyectiles, recompensas y crecimiento por etapa para escarabajo, araÃƒÂ±a, avispa, rana y jefe. `game.js` consume estos datos para apariciÃƒÂ³n, IA, ataques, avisos visuales y recompensas.
- Se conservaron los valores anteriores del prototipo. REA confirma que las reglas de combate son autoritativas del servidor y no se recuperaron: el catÃƒÂ¡logo es un punto ÃƒÂºnico de ajuste local, no una afirmaciÃƒÂ³n de balance original.
- Se agregÃƒÂ³ el nuevo mÃƒÂ³dulo al chequeo de sintaxis. No se ejecutaron pruebas automatizadas ni una sesiÃƒÂ³n de navegador; requiere QA manual.
- VersiÃƒÂ³n de aplicaciÃƒÂ³n 0.34.0.

## Checkpoint v0.35 - variantes y estados originales de enemigos

- `enemy-data.js` declara los IDs de criatura original para los modelos base y nivel 2. El renderer elige el clip desde ese catÃƒÂ¡logo en lugar de duplicar una cadena de condiciones por enemigo.
- Los enemigos reproducen `statique`, `course`, `attaque1`, `statique:stun` y `mort` segÃƒÂºn su estado simulado. Las ranas usan los clips recuperados `saut-prep` y `saut` durante telegrÃƒÂ¡fico y embestida; el escarabajo jefe mantiene `course:charge`.
- Evidencia: nombres de clip en `dist/assets/original/creatures.json`; IDs e imÃƒÂ¡genes documentados en `reference/EXTRA_CREATURES.md`. La asociaciÃƒÂ³n nivel 2 al progreso local y el instante de uso de clips son decisiones de presentaciÃƒÂ³n; faltan secuencia de spawn e IA autoritativas.
- No cambia el esquema principal de guardado: `moving` se deriva durante el update. `npm run check` paso; QA de navegador pendiente.
- VersiÃƒÂ³n de aplicaciÃƒÂ³n 0.35.0.


## Checkpoint v0.36 - curva de experiencia centralizada

- `dist/progression-data.js` define la curva local que ya aplicaba el juego: 80 XP al nivel 1 y 40 XP adicionales por nivel.
- La interfaz de progreso y el sanitizador de partidas importadas usan la misma funcion. Se elimino la discrepancia que admitia hasta 45 XP por nivel en partidas aunque el juego exige 40.
- No cambia el formato ni la version de guardado. La curva original del servidor sigue pendiente; sintaxis comprobada, QA de navegador pendiente.
- Version de aplicacion 0.36.0.


## Checkpoint v0.37 - mejoras de recetas del chef

- Se implementaron los dones originales 11003 Barbacoa y 11004 Doble fritura. El primero amplifica el dano de recetas con ingredientes de ataque; el segundo amplifica la mitigacion de recetas con ingredientes de defensa.
- Se ofrecen solo al Chef con habilidad de caldero mediante el catalogo generador. Los efectos no modifican las habilidades de trampa, curacion u otros ataques.
- La traduccion ES/FR respalda a que tipo de receta se aplica; el 25% de potencia es balance local provisional. `scripts/build-gifts.mjs` reproduce los registros desde la traduccion original retenida.
- No cambia el formato de guardado. `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.37.0.


## Checkpoint v0.38 - Queso frito

- Implementado el don original 11008: al agregar un ingrediente a un caldero activo, inflige dano de fuego provisional a cada enemigo cercano dentro del radio del caldero y muestra un pulso visual.
- Solo se activa si `addIngredient` acepto el ingrediente. Anadir ingredientes a un caldero lleno, cocinando o sucio no aplica dano; no hay activaciones repetidas por frame.
- La traduccion ES/FR respalda el disparador y la categoria de Chef/caldero. El dano base de 8 y el uso del radio del caldero son balance/alcance local provisional.
- No cambia el formato de guardado. `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.38.0.


## Checkpoint v0.39 - Caldero fiel

- Implementado el don original 11007: el caldero activo empieza a seguir al jugador y sigue haciendolo aunque se interactue con la habilidad o con el caldero.
- El seguimiento se actualiza suavemente en el mismo estado del caldero. Ingredientes, fase de receta, vida, radio y posicion siguen guardandose con los campos ya existentes; no se cambia el esquema.
- La descripcion ES/FR establece que el caldero sigue al Chef; la velocidad de seguimiento y el tratamiento automatico como cargado son implementacion local.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.39.0.


## Checkpoint v0.40 - Guante de cocina

- Implementado el don original 11011: al recibir un ataque valido de un enemigo mientras el Chef lleva un caldero con receta activa, se extiende su tiempo restante.
- La extension usa segundos locales por don acumulado y persiste en `cooking.remaining`; un golpe absorbido por escudo/barrera cuenta como ataque, pero los golpes ignorados por invulnerabilidad no.
- ES/FR describen el disparador y el aumento de duracion, pero no cuantifican la extension. Se usa +1 segundo por don como ajuste local; el guardado no cambia.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.40.0.


## Checkpoint v0.41 - frecuencia local de ingredientes

- Implementados los dones 11000, 11001 y 11002: reducen respectivamente el peso aleatorio de los ingredientes de ataque, curacion y defensa generados al derrotar enemigos.
- La seleccion ponderada se concentra en `cooking.js`; ingredientes devueltos manualmente desde el caldero conservan su tipo y no vuelven a pasar por el sorteo.
- Cada don reduce a la mitad el peso base del tipo correspondiente. El texto original solo afirma que aparecen menos; la proporcion es ajuste local. No cambia el formato de partida.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.41.0.


## Checkpoint v0.42 - activacion manual de trampas

- Implementado el don original 11204: al acercarse a una trampa armada aparece la interaccion E; su activacion manual la detona incluso si no hay enemigos en el radio.
- La detonacion comparte los efectos de trampa ya implementados; solo aplica dano a objetivos dentro del radio.
- Valor provisional local: +50% de dano por acumulacion. La descripcion original confirma el aumento, pero no su magnitud.
- El estado de activacion pendiente se conserva al guardar la expedicion; no cambia el formato.
- `npm run check` paso; QA manual de navegador pendiente.
- Version de aplicacion 0.42.0.


## Checkpoint v0.43 - trampa totemica

- Implementado el don original 11209: al activarse la trampa, el cliente agenda un yunque para cada objetivo que sobreviva al impacto inicial.
- Se reutiliza el clip original `fx/hit/enclume` (FX 35), identificado en `reference/original-data/animation-metadata.json`; la descripcion del catalogo confirma el yunque, pero no sus valores de juego.
- Ajustes provisionales locales: 0.55 s de caida, radio de impacto de 46 px y dano igual al dano base de la trampa.
- El campo `anvil` y su punto de impacto se conservan en expediciones guardadas; sin migracion del formato.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.43.0.

## Checkpoint v0.44 - parada pasiva con espada

- Implementado el don original 1006 en `hurtPlayer`: con espada equipada, un ataque de una criatura puede anularse aleatoriamente sin requerir guardia y sin consumir cargas del escudo.
- Las traducciones ES/FR confirman la parada probabilistica, no su porcentaje. Ajuste local: 15% por copia, acumulable hasta 60%.
- El feedback usa el anillo y el sonido de bloqueo ya existentes; no cambia el guardado.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.44.0.

## Checkpoint v0.45 - represalia de espada y persistencia de objetivo

- Implementado el don original 1007: al recibir un golpe de una criatura, el jugador recuerda su UID; los ataques con espada hacen dano aumentado contra ese mismo enemigo.
- El texto ES/FR confirma el objetivo pero no el porcentaje. Balance local: +25% por copia hasta un maximo de +100%.
- Los enemigos nuevos reciben UID monotono basado en el serial de campos; los UIDs y el atacante se serializan. Las partidas antiguas reciben IDs negativos unicos por indice y el estado de jugador faltante usa 0.
- Corregido el guardado de anviles: el filtro de captura ahora incluye `anvil`, ademas de su validacion previa; no hay cambio de version del esquema ni perdida de campos existentes.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.45.0.

## Checkpoint v0.46 - balestra

- Implementado el don original 1008: tras 3 segundos locales sin ataques basicos, el siguiente ataque con espada recibe una bonificacion de dano y consume la carga.
- El texto ES/FR confirma esperar sin atacar para potenciar el siguiente ataque, pero no define duracion ni cantidad. Ajustes locales: espera 3 s, +50% por copia y tope +150%.
- Se muestra el aviso “Balestra preparada” al completar la espera. El temporizador, carga y bonificacion del ataque activo se conservan con los campos de estado/accion del guardado; sin cambio de esquema.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.46.0.

## Checkpoint v0.47 - contrato de daga

- Implementado el don original 1104: el impacto de daga inflige dano adicional si el jugador esta en el semiplano posterior al enemigo segun su orientacion horizontal.
- ES/FR confirman el ataque por la espalda, sin especificar porcentaje ni geometria. Ajuste local: +35% por copia, hasta +100%; se usa el lado horizontal contrario a `enemy.facing`.
- No cambia el formato de guardado.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.47.0.

## Checkpoint v0.48 - veneno electrico

- Implementado el don original 1106: los pulsos de veneno de daga aumentan y se identifican como dano de relampago; el veneno periodico mantiene su duracion y frecuencia.
- Las traducciones ES/FR confirman aumento y conversion elemental, pero no cuantifican el aumento. Ajuste local: +50% por copia hasta +100%.
- Reutiliza el FX original 37 `hit_test_electrique`/`FX_hit_electrique` de `reference/original-data/animation-metadata.json`. Si se combina con el don de veneno instantaneo 1101, el pulso convertido se muestra por separado como relampago.
- El tipo elemental del estado de veneno se guarda con el enemigo; sanitizer antiguo lo inicializa a falso. Sin cambio de version del esquema.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.48.0.

## Checkpoint v0.49 - ultimo pulso de veneno

- Implementado el don original 1107: el ultimo pulso de veneno aplicado por la daga recibe dano aumentado. Se identifican ticks pendientes al aplicar el estado, incluso cuando la reaplicacion conserva el temporizador parcial.
- ES/FR confirman que la ultima ocurrencia de veneno de daga aumenta considerablemente, pero no cuantifican la mejora. Ajuste local: +100% por copia hasta +300%.
- Con el don 1101 de veneno instantaneo, se potencia el estallido completo como la unica ocurrencia de veneno; esta interaccion es una interpretacion local.
- Los campos `poisonDagger` y `poisonTicksRemaining` se guardan con el enemigo; partidas antiguas reciben valores predeterminados. Sin cambio de version del esquema.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.49.0.

## Checkpoint v0.50 - aturdimiento por impactos de espada grande

- Implementado el don original 1202: cada objetivo mantiene un contador de impactos de espada grande; cada tercer impacto lo aturde.
- ES/FR confirman el intervalo de tres golpes, pero no la duracion del aturdimiento. Ajuste local: 1.5 s. El grupo de regalo se mapea a espada grande porque es el arma pesada disponible localmente; la familia oficial sigue sin verificarse.
- El contador por objetivo se conserva en la expedicion; partidas anteriores reciben cero. Sin cambio de formato de guardado.
- El don 1201 permanece pendiente: “si se mitiga” no identifica aqui quien mitiga ni en que fase; no hay mitigacion de enemigos en el sistema actual.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.50.0.

## Checkpoint v0.51 - bloqueo gratuito de escudo

- Implementado el don original 1507: con escudo secundario equipado, cada ataque entrante tiene un 30% de probabilidad de bloquearse aunque el jugador no este defendiendo.
- La probabilidad del 30% es explicita en ES/FR. El bloqueo reutiliza la reduccion y los efectos de bloqueo existentes, pero no consume carga.
- No cambia el formato de guardado.
- `npm run check` paso; QA de navegador pendiente.
- Version de aplicacion 0.51.0.


## Checkpoint v0.52 - rebote de flechas

- Implementado el don original 1405: tras impactar, la flecha busca al enemigo vivo no alcanzado mas cercano en un radio local de 220 px y redirige el proyectil; permite hasta dos rebotes locales.
- ES/FR confirman el rebote hacia enemigos cercanos, pero el cliente recuperado no fija radio ni cantidad. Esos valores son provisionales y ajustables.
- El rebote se combina con 1403: historial por objetivos impide impactos repetidos; el limite total de blancos suma penetraciones y rebotes (maximo local 8).
- El campo ricochetsRemaining se valida y persiste en proyectiles guardados; partidas previas reciben cero. Sin cambio de esquema.
- QA de navegador pendiente; no se ejecutaron pruebas.
- Version de aplicacion 0.52.0.


## Checkpoint v0.53 - flecha llameante

- Implementado el don original 1409: la flecha puede alcanzar hasta dos objetivos adicionales; cada impacto posterior al primero reduce el dano un 25% compuesto.
- ES/FR confirman varios objetivos con dano reducido, pero no las cifras. Cantidad de objetivos y multiplicador son provisionales.
- Se reutiliza hitIDs persistido y el limite de objetivos suma los dones 1403, 1405 y 1409; pueden combinarse en esta reconstruccion local.
- Sin cambio del formato de guardado. Version de aplicacion 0.53.0.
- QA de navegador pendiente; no se ejecutaron pruebas.


## Checkpoint v0.54 - tiro pesado

- Implementado el don original 1301: añade un objetivo atravesado por flecha (cantidad local).
- El texto español confirma un objetivo adicional. El mapeo de la familia 1301 al arco local se hace por la descripción; la categoría de arma original sigue sin recuperarse.
- Se combina con penetración 1403, rebote 1405 y flecha llameante 1409; el límite local total es ocho objetivos por proyectil.
- El nuevo campo de efecto se guarda en el ID oficial del don; no cambia el esquema de guardado.
- QA de navegador pendiente; no se ejecutaron pruebas. Version de aplicacion 0.54.0.


## Checkpoint v0.55 - aspecto del zorro

- Implementado el don original 1504: cada bloqueo valido con escudo equipado tiene una probabilidad local del 25% de devolver una carga del arma secundaria.
- La carga no supera la capacidad actual. ES solo indica que ocurre a veces; la probabilidad es provisional.
- Se aplica a bloqueos pagados y al bloqueo gratuito de 1507 si falta una carga; el don no cambia otras reglas de bloqueo.
- Sin cambio del formato de guardado. Version de aplicacion 0.55.0; QA de navegador pendiente, sin pruebas ejecutadas.


## Checkpoint v0.56 - aspecto del cuervo

- Implementado el don original 1509: al mantener la guardia frontal con escudo, la mascota y las invocaciones cercanas reciben la mitigacion de bloqueo.
- Alcance local: 160 px; guardia, orientacion frontal y mitigacion usan las reglas locales del escudo. El texto español solo indica aumentar el radio de proteccion de aliados.
- La proteccion atraviesa los puntos centrales de dano a mascota e invocaciones; no altera dano al jugador ni a aliados fuera del radio.
- Sin cambio del formato de guardado. Version de aplicacion 0.56.0; QA de navegador pendiente, sin pruebas ejecutadas.



## Checkpoint v0.57 - alcance de veneno del periodista pendiente

- Se retiro una implementacion que convertia venenos de daga y flecha, porque el plan de evidencia especifica que 14003 solo debe afectar veneno generado por reportajes.
- Resuelto en v0.75: los reportajes aplican veneno y los dones 14003/14006 modifican su dano.
- No cambia el formato de guardado. Version de aplicacion 0.57.0; QA de navegador pendiente, sin pruebas ejecutadas.

## Checkpoint v0.58 - documental de la vida salvaje

- Implementado el don original 14004: impactos del jugador y la mascota agregan 6 de dano de hielo, representado por el efecto original 29 hit_test_glace.
- ES confirma dano adicional de hielo, no cantidad ni condicion temporal; el valor +6 es provisional y se activa en cada impacto de jugador/mascota.
- La mascota ahora atribuye su impacto como pet; el talento de hielo no altera dano de plantas, trampas ni armas de enemigos.
- Sin cambio del formato de guardado. Version de aplicacion 0.58.0; QA de navegador pendiente, sin pruebas ejecutadas.


## Checkpoint v0.59 - Escandalo de Estado

- Implementado el don original 14000: al activar un testimonio de relampago, el reportaje golpea a todos los enemigos dentro del radio local de 145 px.
- Sin el don, el testimonio de relampago afecta al enemigo elegible mas cercano; el texto español atribuye el impacto a todos los cercanos al don.
- El texto no fija el radio; 145 px es local y reutiliza el alcance del testimonio existente. No cambia el formato de guardado.
- Version de aplicacion 0.59.0. QA de navegador pendiente; no se ejecutaron pruebas.


## Checkpoint v0.60 - la prenda

- Implementado el don original 13010: al usar el as de picas, se lanza una carta adicional a cada enemigo cercano.
- Radio local220px, hasta6 objetivos por uso; cada carta adicional apunta al UID estable de un enemigo y solo puede alcanzarlo.
- El UID del objetivo se valida y guarda en el estado de proyectil; partidas anteriores usan -1 y mantienen su trayectoria libre. Sin cambio de esquema.
- Texto del juego permanece en español. Version de aplicacion 0.60.0; QA de navegador pendiente, sin pruebas ejecutadas.


## Checkpoint v0.61 - El truco

- Implementado el don original 13011: los proyectiles del as de picas regresan hacia el jugador despues de 0.55 s; pueden alcanzar enemigos nuevos al volver, sin repetir impactos.
- El retardo y el guiado son reglas locales. Los proyectiles dirigidos del don 13010 tambien regresan si ambos dones estan activos.
- Los campos age, returning, returnAfter y returnToPlayer se guardan y validan; las partidas anteriores usan valores por defecto. Sin cambio de esquema.
- Version de aplicacion 0.61.0. QA de navegador pendiente; no se ejecutaron pruebas.


## Checkpoint v0.62 - El prestigio

- Implementado el don original 13012: los tres primeros objetivos alcanzados por un as de picas se ralentizan, aturden y explotan en ese orden.
- Reglas locales: ralentizacion2s, aturdimiento1.2s, explosion de radio90px y24 de dano. El texto español confirma la secuencia, no las magnitudes.
- El historial hitIDs existente determina el orden y se conserva en proyectiles guardados; la explosion no vuelve a golpear al tercer objetivo.
- Version de aplicacion 0.62.0. QA de navegador pendiente; no se ejecutaron pruebas.


## Estado del bloque de dones

- Los dones del as de tr?boles 13007-13009 quedaron implementados en v0.63.
- Los dones de reportaje con veneno 14003 y 14006 se implementan en v0.75; su duracion y dano son parametros locales porque el catalogo espanol no los cuantifica.

## Checkpoint v0.63 - as de tréboles

- Implementados los dones 13007-13009: si cualquiera está activo, la carta de tréboles dispara un proyectil; sin esos dones conserva el efecto local de potencia para el siguiente ataque.
- 13007: daño x2, aturdimiento propio0.75s y daño recibido +50% durante3s. 13008: daño +50% contra slow y +100% contra stun. 13009: sustituye impacto por veneno con +50% de daño total durante4s.
- Las cifras son balance local. Estados de aturdimiento/vulnerabilidad y atributos de palo se guardan con compatibilidad para partidas anteriores; sin cambio de esquema.
- Version de aplicacion 0.63.0; QA de navegador pendiente, sin pruebas ejecutadas.

## Checkpoint v0.64 - Polvo cromático

- Implementado el don 10102 en `dist/skills/trickster.js`: al activar Desaparición, comparte con la mascota cercana la curación y la limpieza de ralentización que el personaje ya tenga disponibles.
- La descripción original en español solo indica compartir efectos con aliados cercanos; el compañero activo representa el único aliado con salud/estados en esta versión local. El radio de160px es provisional.
- El catálogo vuelve a generarse desde `scripts/build-gifts.mjs`; las partidas existentes mantienen el formato y guardado actual.
- Version de aplicacion 0.64.0. No se ejecutaron pruebas ni QA de navegador en este checkpoint.

## Checkpoint v0.65 - Tornado de Desaparición

- Implementado el don 10106 en `dist/skills/trickster.js`: Desaparición daña una vez a los enemigos vivos a menos de150px y muestra un remolino local durante0.85s.
- La descripción española confirma el daño en el momento de Desaparición; radio, daño y animación dibujada son aproximaciones porque no se recuperó una animación original identificable.
- `dist/persistence.js` admite el efecto visual si se guarda durante su vida breve; el estado se normaliza con límites existentes y no cambia el esquema.
- Versión de aplicación 0.65.0. `node --check` aprobó `dist/skills/trickster.js`, `dist/game.js`, `dist/persistence.js`, `dist/gifts.js` y `scripts/build-gifts.mjs`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.66 - Polvo milagroso

- Implementado el don 10103: cancela el multiplicador de daño del golpe sorpresa durante Desaparición y duplica la curación del talento de Desaparición, tanto para el personaje como para la mascota cercana si 10102 está activo.
- El cambio sigue la sustitución entre daño y curación descrita en español. La curación continúa dependiendo del talento local existente; el texto original no declara una curación base.
- No se añadieron campos de guardado; el bonus solo se consulta mientras se activa Desaparición o se consume el golpe sorpresa.
- Versión de aplicación 0.66.0. `node --check` aprobó `dist/skills/trickster.js`, `dist/game.js`, `dist/persistence.js`, `dist/gifts.js`, `dist/skill-system.js` y `scripts/build-gifts.mjs`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.67 - Señuelo

- Implementado el don 10109: Desaparición crea un señuelo sin ataque con 45 HP locales y 3 s de duración. Los enemigos cercanos pueden priorizarlo; recibe impactos de proyectiles, ataques de área y embestidas.
- El señuelo se incorpora al guardado reanudable como entidad temporal, sin cambiar el número de versión del formato. Su apariencia dibujada y los valores de salud/duración son provisionales.
- Versión de aplicación 0.67.0. `node --check` aprobó `dist/skills/trickster.js`, `dist/game.js`, `dist/persistence.js`, `dist/gifts.js`, `dist/skill-system.js` y `scripts/build-gifts.mjs`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.68 - Fotógrafo de guerra

- Implementado el don 14001: el compañero activo recibe +25 % de daño al atacar si está a 160 px del jugador y este tiene una mejora para su arma equipada.
- El original solo confirma que las mejoras de armas afectan a aliados cercanos. Transferir el efecto como daño del compañero y usar este radio/porcentaje son aproximaciones del modo local en solitario.
- Sin cambios de guardado. Versión de aplicación 0.68.0. `node --check` aprobó `dist/pets.js`, `dist/game.js`, `dist/gifts.js`, `scripts/build-gifts.mjs` y `dist/persistence.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.69 - miniaturas de prendas

- La mochila ahora dibuja en cada tarjeta la prenda original que corresponde al código visual ya usado por ese objeto local. Reutiliza `drawPlayerCharacter` y los recursos recuperados; no muestra las miniaturas sintéticas de emoji.
- El nombre, la ranura y las estadísticas de cada objeto siguen siendo datos locales provisionales; la imagen no implica que se haya recuperado el catálogo original de botín.
- Sin cambios de guardado. Versión de aplicación 0.69.0. `node --check` aprobó `dist/game.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.70 - iconos de trabajos secundarios

- El selector de la tercera habilidad ahora muestra el icono original del trabajo elegido, igual que la selección de trabajo principal. Los cuatro iconos proceden de los recursos recuperados en `assets/original/interface/metiers`.
- Sin cambios de guardado. Versión de aplicación 0.70.0. `node --check` aprobó `dist/game.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.71 - vista de Picpic

- La pestaña de mascota muestra un retrato animado de Picpic con la especie y el renderizador original recuperado. Usa el mismo recurso de criatura del juego, con nombre y estado actuales.
- No cambia equipo, salud, partida ni guardado. Versión de aplicación 0.71.0. `node --check` aprobó `dist/game.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.72 - invisibilidad compartida

- Corregido el don 10102 para compartir también el efecto base de Desaparición con Picpic cercano: el compañero queda oculto visualmente y los enemigos no lo eligen como objetivo mientras dure el estado.
- El temporizador `pet.invisible` se guarda y valida con límite de3s; partidas anteriores reciben0 y conservan su compatibilidad.
- Versión de aplicación 0.72.0. No se ejecutaron pruebas ni QA de navegador en este checkpoint.

## Checkpoint v0.73 - vista de expedición desde el mapa local

- El selector ahora dibuja una miniatura usando el terreno y las decoraciones de `makeScene`, en lugar de un paisaje CSS genérico. El marco superpuesto es un recurso original recuperado.
- La vista refleja la reconstrucción local actual y sus posiciones aproximadas; no representa sectores recuperados del servidor. La etiqueta y el texto alternativo lo indican.
- Sin cambios de guardado. Versión de aplicación 0.73.0. `node --check` aprobó `dist/game.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.74 - icono original de mazmorra

- El selector de expediciones reemplazó el símbolo provisional por `assets/original/interface/jeu/pastille_donjon.png`, el icono original de mazmorra inspeccionado visualmente.
- Sin cambios de guardado. Versión de aplicación 0.74.0. `node --check` aprobó `dist/game.js`; no se ejecutaron pruebas ni QA de navegador.

## Checkpoint v0.75 - veneno de reportaje

- El catálogo español confirma que los efectos de veneno pueden infligir daño al instante (14003) y que los reportajes pueden envenenar a enemigos, que reciben más daño mientras dura el efecto (14006).
- 14006 aplica veneno durante 4 segundos, con 6 de daño local por pulso y +25% de daño recibido durante el estado. 14003 convierte ese daño periódico en daño instantáneo. Duración, pulso y porcentaje son aproximaciones locales; el texto recuperado no especifica magnitudes.
- El tiempo de vulnerabilidad se conserva en la instantánea del enemigo y las partidas anteriores reciben 0 al cargarse. No cambia la clave ni la versión del formato de guardado.
- Version de aplicacion 0.75.0. `npm run check` validó la sintaxis; no se ejecutaron pruebas automatizadas ni QA de navegador.


## Checkpoint v0.76 - testimonio de muerte

- El don 12000 permite que cada enemigo derrotado deje un testimonio de muerte recogible. Usa el icono original local `assets/original/interface/temoignage/4.png`; la libreta valida y conserva el nuevo subtipo `death`.
- Al presentar ese testimonio, se usa el dano local ya existente para testimonios ofensivos; el catalogo confirma que puede recogerse, pero no describe su resolucion.
- Las partidas anteriores siguen siendo compatibles: el don no cambia la clave de guardado y los tipos de testimonio nuevos solo aparecen cuando el don esta activo.
- Version de aplicacion 0.76.0. `npm run check` valido la sintaxis; no se ejecutaron pruebas automatizadas ni QA de navegador.


## Checkpoint v0.77 - periodismo y partidas

- Catalogo unico de testimonios para simulacion, HUD, dibujo y validacion. Muerte ahora persiste en el suelo y la libreta; corregido el simbolo incorrecto y el dibujo duplicado.
- Veneno de reportaje independiente del de daga, con temporizadores y pulsos persistidos. Se evita el dano diferido duplicado al convertirlo en instantaneo.
- Correccion de evidencia: el recurso 4.png es original, pero su asignacion a muerte es local y no demuestra el enum del cliente.

## Checkpoint v0.78 - seleccion de objetivo

- Nuevo targeting.js: circulo/linea, alcance, confirmacion con clic o J y cancelacion por Escape/clic derecho/foco/menus. Seleccionar no consume recarga ni testimonios.
- Nueva operacion REA focal sobre InterfaceCompetenceADV.js: evidencia ev_afce03e82f51bc4cccb94404a332ebf89b46e28d2b7267dfcdd8583bf57566f2, conservada comprimida junto con resumen de identidad y limites.
- El cliente confirma los modos y el clic de confirmacion; asignaciones por habilidad, rangos y radios son locales.

## Checkpoint v0.79 - interfaz, consulta y recuperacion

- Libreta de dos espacios en el HUD, con nombres/iconos y control correcto para habilidad principal o secundaria. Pestana Dones: descripcion y cantidades de bendiciones activas.
- Iconos originales de armas en la barra. El catalogo solo enlaza iconos de dones realmente disponibles; los demas usan un simbolo de familia.
- boot.js muestra los errores inesperados, pausa la simulacion y permite recargar o descargar la copia guardada sin sobrescribirla.
- README actualizado. Sintaxis revisada automaticamente para todos los modulos; pruebas nuevas para guardados, venenos y seleccion de objetivos. Ver informe de implementacion para alcance y evidencia.

## Checkpoint v0.80 - conexiones y comprobacion del recorrido

- La franja de conexion entre zonas se declara en el catalogo del mapa. Se evitan obstaculos procedurales en ella sin cambiar la secuencia aleatoria de las demas posiciones, para conservar la geometria fuera de la franja al cargar partidas anteriores.
- En v0.80 se anadio cancelacion de Desaparicion por otra habilidad; v0.81 retiro esa regla porque el texto original solo confirma cancelacion por ataque. La atribucion previa al texto espanol era incorrecta.
- Comprobaciones: 46 archivos con sintaxis correcta, 28 pruebas aprobadas, recorrido largo en Chrome con tutorial, equipo confirmado, combate, cofres/dones, victoria, guardados y exportacion/importacion real sin excepciones.
- Se conserva el formato de partida v13. El catalogo ejecutable contiene 125 de los 126 dones del indice recuperado; 1201 sigue pendiente por su concepto de mitigacion. Los valores y varias resoluciones de dones son locales y no quedan probados integralmente por estas pruebas.
- Los sectores originales y reglas/tablas de servidor siguen ausentes. Mantener interfaz en espanol y online fuera de alcance. Informe y limites: `reference/IMPLEMENTATION_V77_V80.md`.











