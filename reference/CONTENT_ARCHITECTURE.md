# Arquitectura de contenido - v0.107

`dist/forest-story.js` registra pistas con IDs estables, textos y referencias de diálogo original. `maps.js` calcula posiciones por segmento; `game.js` coordina interacción y dibujo; `persistence.js` valida los IDs descubiertos. No contiene premios ni dependencias de red. Para añadir pistas, ampliar el registro y aportar evidencia del texto; las posiciones actuales son reconstrucciones locales.

`dist/objectives.js` resuelve objetivos locales y proyecta el marcador visible o la flecha lejana. No modifica misiones, enemigos ni partidas. `dist/dialogue-text.js` mantiene el revelado del texto sin temporizadores ni DOM; la interfaz consulta su estado en cada fotograma y controla el avance.

Desde v0.212, `viewport.js` centraliza la resolución lógica y su escala; mundo e indicador consumen el mismo cálculo. La simulación conserva coordenadas independientes del tamaño de ventana. `scene.backgroundColor` permite continuidad de fondo al seguir al jugador cerca del límite de un mapa local. Esa continuidad visual no implica sectores originales recuperados.

Desde v0.213, `tutorial-layout.js` declara la composición visual del bosque inicial; `tutorial-flora.js` dibuja sus especies vegetales y `tutorial-art.js` conserva suelo, cercas, carro y criatura de tiro. `MAPS.tutorial.petSpawn` controla solo el inicio de una partida nueva: al reanudar se aplican las coordenadas guardadas. Las exclusiones procedurales se evalúan después de consumir el aleatorio, conservando la geometría exterior. Los dibujos de referencia no implican colisiones ni IDs originales de objetos.

Desde v0.214, `village-building-art.js` dibuja cabañas, cubierta con chimeneas y faroles; `village-art.js` conserva tablón y suelo. El catálogo `map-data.js` controla posición, escala y la geometría local correspondiente. `maps.js` excluye actores `ambient` de la lista de interacciones: son decoración, mientras los NPC de historia conservan su función. El guion `test:village` recorre las interacciones mediante movimiento normal, sin teletransportar actores.

Desde v0.215, `clothing-loader.js` gestiona cargas locales por código visual, con promesas deduplicadas y manifiesto de disponibilidad. `original-animation.js` combina las 198 definiciones de `clothing-looks.json` con el sistema de slots existente; el dibujo solicita sus piezas de forma diferida. `characters.js` puede declarar `clothing`, `facing` y `nameColor` para actores; la escena y el retrato consumen esas propiedades. `npm run build:clothing` exporta el catálogo desde metadatos recuperados, sin crear asociaciones de inventario ni cambiar guardados. Se distribuye ya generado y jugar no requiere compilar.

Desde v0.217, `actor-overlay-art.js` carga las texturas originales y dibuja marco/relleno de salud y estilos de nombre; `actor-overlays.js` decide qué datos mostrar. El servicio de arte inicializa los recursos junto con las animaciones y mantiene un dibujo básico de respaldo si faltan. El relleno utiliza un patrón tintado con caché acotada; no introduce lógica de daño, cambios de salud ni estado en el guardado.

Desde v0.209, `quest-data.js` describe las instrucciones y sus IDs locales; `quest-log.js` conserva una lista con eventos de añadir, validar y retirar, sin DOM ni guardados; `quest-view.js` dibuja las filas con identidad independiente. `game.js` comunica cambios reales del recorrido y actualiza el destino móvil. Para ampliar objetivos se añaden descriptores al catálogo y se comunica su validación explícitamente; cambiar texto o retirar una instrucción temporal no equivale a completarla. La lista se reconstruye desde la partida existente, sin otra versión del formato de guardado. La secuencia autoritativa de objetivos enviados por el servidor sigue ausente.

Desde v0.210, `combat.js` concentra también el reloj real de carga/liberación del arco. `persistence.js` utiliza `restoredBowRelease` para conservar un disparo liberado sin restaurar entradas físicas y para reconstruir de forma finita impactos de partidas antiguas. La simulación y las pruebas usan `advanceAttack`; no mantienen dos cálculos distintos del retardo.

Desde v0.211, `quest-log.js` emite eventos de presentación terminada y validación. `game.js` los conecta a las muestras recuperadas del servicio de audio y al modelo efímero de `quest-notice.js`. El modelo determina reemplazo, caducidad y cierre; su vista crea botones locales accesibles y `style.css` define presentación. Cambiar de escena o volver al título cancela los avisos. No se incluyen en el guardado ni envían reconocimientos al servidor.

`dist/skill-data.js` aporta descripciones por habilidad e IDs de texto originales. `jobs.js` los incorpora a `ABILITIES`; el HUD y la ficha de Trabajos consumen ese registro. Las instrucciones de entrada describen el control local y no se confunden con parámetros recuperados del servidor.

`dist/damage-effects.js` centraliza atribucion de dano para Polvo vampirico. Las fuentes desconocidas no heredan efectos y el dano de mascota es independiente. `dist/effect-data.js` concentra IDs visuales compartidos comprobados en los recursos. `dist/effect-state.js` define las entidades que captura y valida el guardado, evitando listas divergentes. `dist/actor-overlays.js` dibuja vida y estados en una capa independiente de los sprites y de la vegetacion.

`dist/barriers.js` define capacidad, duracion, absorcion y caducidad de escudos temporales para jugador y mascota. `dist/area-effects.js` calcula modificadores de ataque/defensa segun la posicion del actor dentro de los efectos activos. La seleccion de testimonios y su alcance estan en `journalism.js`; validacion de habilidades y ejecucion consumen la misma funcion, con visibilidad de camara inyectada desde el juego.

`dist/plant-data.js` conserva los IDs locales historicos (thorn=Cardo, bramble=Espinas, lily=Lirio), registra sus roles y resuelve salud, velocidad de crecimiento y objetivos curativos. `dist/enemy-targets.js` selecciona invocaciones que atraen enemigos; no convierte todas las plantas en senuelos. `dist/plant-effects.js` mantiene un canal de veneno propio, independiente de daga y reportaje. El guardado usa el registro de plantas para validar subtipos.

`dist/traps.js` concentra armado, ventanas de encadenamiento/espera, dano y distancia de Trauma. La habilidad de Chef, la simulacion y la interaccion manual usan esas reglas. `skillInstructions` en `skill-data.js` adapta las instrucciones de entrada a dones que cambian el manejo; HUD, ranura secundaria y ficha de trabajos consumen la misma funcion.

`recipeEffects` en `cooking.js` resuelve una receta activa usando los servicios de talentos y dones inyectados. La simulacion y las defensas de areas consumen ese resultado. La adicion manual y la realizada por mascota comparten el controlador `collectCauldronIngredient`, que coordina consumo del objeto, efecto de fuego y comienzo de receta.

`dist/archery.js` mantiene dosis de dano diferido de flechas, migra el estado antiguo y decide una sola recuperacion por proyectil. El simulador aplica el dano devuelto; la persistencia usa su normalizador. Las dosis son independientes de los venenos de daga, plantas y reportaje.

`dist/damage-over-time.js` normaliza, acumula y actualiza dosis acotadas; flechas y cartas lo reutilizan con listas separadas. `dist/poisons.js` resuelve el reloj de veneno de arma, la suma instantanea con mejora de ultimo pulso, el canal de cartas y la consulta de todos los venenos activos. El simulador conserva la aplicacion efectiva de dano y su atribucion.

`dist/bandages.js` calcula curacion inicial/personal y periodica de vendas, inicia tratamientos y actualiza sus relojes. El juego aplica los resultados a los receptores y sus dones. El tratamiento de mascota vive en su estado persistente; el del jugador conserva los campos historicos de `states`.

`dist/tutorial-data.js` define el encuentro inicial, comprueba la condicion de rescate y produce instrucciones a partir del equipo de habilidades. `completeTutorialRescue` coordina la transicion una sola vez; la curacion de mascota y la carga de partida pueden solicitarla. El metodo de curacion no contiene la secuencia de enemigos.

`dist/shields.js` resuelve disponibilidad del escudo, bloqueo normal/automatico y consumo de carga. `combat.js` conserva la geometria frontal y los parametros `BLOCK_RULES`. El coordinador `shieldBlockEffects` aplica dones, devuelve cargas y actualiza la guardia tanto al bloquear para el jugador como para aliados.

`dist/swords.js` mantiene ventanas y limites de cadena, Balestra y refuerzo por varios blancos. La caducidad y el multiplicador comprueban el reloj; la persistencia consume sus limites de estado y del bonus capturado en el ataque.

`enemy-targets.js` tambien identifica invocaciones que pueden recibir dano y crea la lista de victimas de un area. `enemyAreaHit` coordina impactos normales y de carga. Los efectos que aparecen al procesar el dano no se incorporan retroactivamente a la lista de ese impacto.

`enemy-data.js` comparte la reduccion por debilitamiento y la construccion de una referencia de origen segun la velocidad de proyectil. Los controladores conservan separados el enemigo fuente y el origen geometrico del impacto; reflejos y debilitamiento usan la fuente, mientras el escudo usa la trayectoria.

El contenido editable tiene IDs estables y vive separado de los sistemas que lo simulan. La evidencia recuperada y los valores provisionales siguen identificÃ¡ndose en `HANDOFF.md` y `reference/`; esta arquitectura no convierte aproximaciones en datos originales.

## Mapas

- `dist/map-data.js` define `MAPS`: dimensiones, entradas, objetos fijos, colisiones, NPCs, zonas e interacciones.
- `dist/maps.js` crea las escenas desde esos datos. `dist/game.js` conserva orquestaciÃ³n y rutas de viaje/encuentros.
- Para aÃ±adir un mapa: crear una entrada completa en `MAPS`, referenciar IDs existentes en `characters.js`, y aÃ±adir el mapa a las rutas/encuentros adecuados. El guardado valida el catÃ¡logo directamente.
- La vegetaciÃ³n y parte del terreno siguen siendo procedurales. La fidelidad geomÃ©trica requiere recuperar sectores y recursos originales; vÃ©ase `reference/MAP_RECOVERY.md`.
- Las escenas de expediciÃ³n declaran `gameMode: "dungeon"` y `expedition` en su entrada de `MAPS`; el selector se construye desde esas entradas. Para sumar una, declarar `name`, `description`, `difficultyLevels`, `encounterCounts` y `previewTheme`. Guardados conservan `mapId`, mientras las reglas de juego usan `gameMode`.
- El mapa mundial usa el recurso recuperado `dist/assets/original/interface/MAP_pinned.jpg`; la nota REA identifica el cierre por clic y distingue la adaptaciÃ³n local de apertura desde botÃ³n.

## Personajes, mascotas y ropa

- `dist/characters.js` concentra `CHARACTERS`, `PLAYABLE_CHARACTERS`, `PLAYER_CHARACTER` y `PET_SPECIES`. Los perfiles guardan `characterId` y `petSpecies`, no nombres de renderer.
- `dist/art.js` resuelve IDs mediante registros de renderizadores (`characterRenderers`, `petRenderers`). Para una variante visual, aÃ±adir renderer compatible y registrarlo; metadatos solos no generan arte ni animaciones.
- `dist/pets.js` contiene crecimiento de salud, creaciÃ³n de estado, curaciÃ³n, daÃ±o y actualizaciÃ³n de seguimiento, rescate, combate y testimonios. Depende de servicios inyectados por `game.js`; no accede al DOM.
- `dist/cosmetics.js` es el catÃ¡logo de piezas/cÃ³digos/ranuras; `dist/original-animation.js` conserva el renderer ClipAnim y la exportaciÃ³n histÃ³rica `COSMETIC_SETS`. Para prendas nuevas hacen falta datos de pieza y una ruta de dibujo compatible.

## Habilidades y sistemas de juego

- `dist/jobs.js` contiene trabajos y habilidades con IDs estables y cooldowns (`ABILITIES`).
- `dist/skill-system.js` valida el uso, aplica reglas comunes y enruta `behaviorKey` a handlers. `dist/skills/{botanist,chef,trickster,journalist}.js` implementa el comportamiento de cada trabajo.
- Para agregar habilidad: definir metadatos/ID en `jobs.js`, agregar el handler al mÃ³dulo de trabajo y registrarlo en `skill-system.js`. Mantener los efectos mediante el contexto inyectado; no acoplar los mÃ³dulos al DOM o al bucle principal.
- Talentos, combate, inventario, recursos, cocina, periodismo y dones permanecen en `talents.js`, `combat.js`, `inventory.js`, `resources.js`, `cooking.js`, `journalism.js` y `gifts.js`.
- `dist/combat.js` modela el estado de armas `ready`/`incantation`/`active` y el mÃ­nimo recuperado de 350 ms entre activaciones. La implementaciÃ³n conserva duraciones de impacto locales; vÃ©ase `reference/REA_WEAPON_TRACE.md` para autoridad y lÃ­mites de evidencia.

## Encuentros

- `dist/encounter-data.js` contiene la composiciÃ³n provisional de oleadas, apariciÃ³n de enemigos, jefe y textos de anuncio.
- `dist/encounters.js` transforma el catÃ¡logo en un plan determinista para una etapa/encuentro. `game.js` solo instancia esos enemigos mediante su sistema actual de combate.
- Para variar enemigos, conteo, posiciones o anuncios sin tocar combate, editar `ENCOUNTER_RULES`. Las reglas actuales replican la composiciÃ³n local previa y siguen siendo aproximaciones; la generaciÃ³n aleatoria estÃ¡ sembrada para que el mismo encuentro se reproduzca.

## Guardados y extensiones

- `dist/persistence.js` valida IDs contra catÃ¡logos y conserva la compatibilidad con versiones v1â€“v12. En v13 se aÃ±adieron `characterId` y `petSpecies`; partidas anteriores reciben los valores por defecto.
- Al agregar IDs seleccionables, actualizar normalizaciÃ³n y UI de selecciÃ³n ademÃ¡s del catÃ¡logo. Los perfiles invÃ¡lidos deben caer a IDs vÃ¡lidos.
- Los cÃ³digos de ropa, IDs actuales de mapas/NPC y clave local se conservan.

## Contrato y validaciÃ³n

- CatÃ¡logos: datos simples, con ID estable y sin lÃ³gica de simulaciÃ³n.
- Sistemas: funciones/mÃ³dulos que reciben dependencias explÃ­citas y devuelven comportamiento/state.
- Renderers: resuelven metadatos a presentaciÃ³n y deben tener fallback para IDs desconocidos.
- Escenas: consumen mapas declarativos; el motor mantiene rutas y ciclo de vida.
`npm run check` revisa todos los modulos. `npm test` cubre contratos de combate, talentos, trabajos, guardados, periodismo y objetivos; `npm run test:features` revisa las funciones nuevas en Chrome aislado.

La arquitectura permite aÃ±adir y modificar contenido con cambios localizados, pero un editor visual, balance editable desde archivos externos, nuevos modelos animados y mapas originales requieren trabajo adicional y evidencia/activos compatibles.


- MAPS.dungeon.expedition.areas declara las areas del Bosque Susurrante con IDs, suelos, spawns, objetos y colisiones. Ver reference/MAP_RECONSTRUCTION_V30.md; las coordenadas siguen siendo aproximaciones basadas en video.
- ENCOUNTER_RULES.boss define la especie original, el identificador de ClipAnim y la etiqueta local; el render de enemigos la consume sin fijar esos datos dentro del motor. Los patrones y estadisticas siguen siendo parametros locales.

- Interrupcion mutua de manos en dist/game.js cancela la accion saliente y su bloqueo de duracion, conservando la guarda comun de activacion. Evidencia y limites en reference/IMPLEMENTATION_V32_HANDS.md.
- El bosque continuo consume `MAPS.dungeon.expedition.routes`, compone las areas declaradas en `maps.js` y activa el siguiente encuentro segun el slot atravesado. `encounters.js` suma el desplazamiento del slot al plan de enemigos. El campo opcional `journey.encounterStarted` guarda si la zona actual ya se activo; los validadores amplian el ancho permitido segun la longitud elegida sin cambiar la version del formato. Partidas anteriores desplazan su instantanea al segmento de su encuentro guardado.
- `enemy-data.js` concentra la sintonizacion local de enemigos; `game.js` consume las reglas de aparicion, movimiento, ataques, telegrÃƒÂ¡ficos y recompensas. `original-animation.js` solo habilita IDs que aparecen en el catalogo descargado de 21 criaturas. El balance/orden de encuentros siguen sin confirmacion del servidor.
- `ENEMY_RULES.*.creatureStages` asigna modelos recuperados por familia. `art.js` selecciona el clip desde ese catalogo y el update de combate expone movimiento/ataque/stun para elegir animaciones. Los valores de dificultad no se derivan de los IDs visuales.

- `progression-data.js` ofrece `xpNeededForLevel` y `maxSavedXP` para mantener una sola curva local entre simulacion y validacion. Sus valores no equivalen a la curva remota original.

- Los dones `recipeAttackPower` y `recipeDefensePower` afectan solo las recetas correspondientes del caldero; su valor esta centralizado en `scripts/build-gifts.mjs` y es local.
- `cauldronIngredientFire` aplica un pulso una vez por ingrediente aceptado, con dano local y radio del caldero; no mantiene un efecto persistente.
- `cauldronFollow` activa el campo persistido `carried` de calderos existentes o nuevos y los desplaza suavemente hacia el jugador; no crea una entidad ni altera el estado de receta.
- `cauldronHitDuration` extiende `cooking.remaining` al recibir un ataque de un tipo de enemigo reconocido mientras se lleva el caldero y su receta esta activa; valor local por don.
- `chooseIngredientType` selecciona entre los tres tipos con pesos ajustables; la capa del juego deriva cada peso de los dones y mantiene al menos un peso reducido no nulo.


## Modulos incorporados en v0.77-v0.79

- `journalism.js`: catalogo TESTIMONIES y reglas REPORT_RULES; persistencia importa los mismos IDs. Veneno de reportaje tiene campos propios y no reemplaza el de daga.
- `targeting.js`: SKILL_TARGETS y controlador sin DOM; valida disponibilidad antes de seleccionar y difiere el lanzamiento hasta confirmar. Los handlers reciben el punto elegido como argumento opcional.
- `boot.js`: recuperacion independiente del modulo principal. Una excepcion pausa la simulacion y ofrece exportar la ultima copia local.
- `build-gifts.mjs`: iconAsset solo apunta a archivos locales existentes. La consulta de dones y el selector de recompensas comparten ese dato.

## Decoracion de terreno v0.102

`forest-art.js` contiene paleta y detalles de suelo que solo afectan el dibujo. `map-data.js` mantiene la composicion manual por area, con `dressing` separado de objetos con colision; `maps.js` los incorpora en el orden de profundidad. `art.js` resuelve las ilustraciones y su escala central. Las posiciones se basan en la referencia de gameplay y no son datos de sectores recuperados.

## Linea de tiempo de ataques v0.103

`original-animation.js` expone la duracion en fotogramas de clips recuperados, sin duplicar sus valores en el balance local. `game.js` conserva un estado visual efimero hasta que termina el clip, y `art.js` lo dibuja a60 fps con la direccion del ataque. Para arco, el disparo sigue a su estado de carga. `combat.js` sigue siendo la fuente de tiempos/impactos locales; las longitudes del clip no se interpretan como datos de combate del servidor.

## Anticipaciones enemigas v0.104

`art.js` calcula el reloj del estado de aviso a partir del contador local del enemigo y de `ENEMY_RULES`. No se guarda un temporizador adicional: el dato ya forma parte del estado de cada encuentro. La animacion no modifica la resolucion del ataque.

## Ciclo de muerte v0.105

`game.js` obtiene la duracion del estado `mort` desde el clip de la criatura y conserva `deathStartedAt` como dato efimero. El render usa ese reloj mientras la ventana de recompensa pausa la simulacion; la captura de partida ya omite enemigos derrotados, por lo que el nuevo campo no forma parte del guardado.

## Audio y arco v0.106

`audio.js` conserva las voces activas por ID para detener la muestra `arc1` al interrumpir una carga. `combat.js` resuelve el disparo150 ms despues de la fase `INCANTATION`, y `game.js` dispara `arc2` al pasar a `ACTIVE` y `arc0` al crear la flecha. La carga base sigue siendo un valor local.

## Audio y experiencia v0.107

`addXP` reproduce el sonido de ganancia para toda cantidad positiva y agenda el de ascenso segun el punto proporcional en que la barra de2 s cruza su umbral. Un reloj efimero lo avanza en `update`; no se persiste. La progresion permanece local y no cambia su calculo.

- `MAPS.dungeon.expedition.connection` reserva el corredor de conexion entre areas. El generador conserva el consumo de numeros aleatorios anterior para mantener las demas posiciones y evitar mover colisiones en guardados existentes.

## Indicadores de armas v0.218

`weapon-overlay-art.js` contiene recursos y composición del indicador, con estado efímero en WeakMap por actor/ranura. `game.js` proporciona tipos, cargas y máximos calculados mediante `resources.js`; el dibujante no altera la simulación. La inicialización de arte espera las siete imágenes y publica disponibilidad en `artStatus`. Los iconos y geometría proceden de `ArmeADV`; los valores de carga y el equipo siguen siendo del modelo local. El nuevo campo de diagnóstico `snapshot().charges` devuelve copias y no amplía el formato guardado.

## Presentación de salud v0.219

`health-animation.js` modela transiciones de vida y contraste sin DOM ni actores globales. `actor-overlays.js` conserva una instancia efímera por actor estable en WeakMap y proporciona ese estado a `actor-overlay-art.js`. La simulación pasa el máximo de vida como argumento; el dibujante no añade propiedades a los actores. Los enemigos también se componen en la capa final; su render de cuerpo admite `hideOverlay` para evitar duplicados. Incluso las barras sanas ocultas inicializan su estado antes del primer daño. El formato persistido no cambia.
