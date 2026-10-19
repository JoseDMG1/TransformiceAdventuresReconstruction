# Plan de dones originales de Elisah

Catálogo español: `original-translations/indices_es.json`,126 dones recuperados de endpoints originales. Procedencia, hashes y evidencia REA: TRANSLATION_RECOVERY.md; protocolo selector: REA_PET_REWARDS.md.

## Familias inferidas del contenido

El prefijo numerico y las descripciones permiten agrupar familias. Los valores de categoria del mensaje l32 del servidor NO estan recuperados: estas claves flavor son etiquetas locales, no IDs oficiales. No hay evidencia de que todos los dones fueran obtenibles en cada demo.

| IDs existentes | Familia | flavorKey local |
| --- | --- | --- |
| 1001-1008 | Espada | weapon:sword |
| 1101-1108 | Daga | weapon:dagger |
| 1201-1202 | Arma pesada: familia exacta pendiente | weapon:heavy? |
| 1301 | Arco (asignación local por descripción; familia original pendiente) | weapon:bow (local) |
| 1401-1409 | Arco | weapon:bow |
| 1501-1509 | Escudo | secondary:shield |
| 1701-1710 (sin1703) | Vendaje | secondary:bandage |
| 10000-10006 | Elixir botanico | job:botanist:elixir |
| 10101-10112 (sin10107) | Desaparicion estafador | job:rogue:vanish |
| 10201-10211 | Plantas botanico | job:botanist:plants |
| 11000-11011 (sin11010) | Caldero chef | job:cook:cauldron |
| 11200-11209 (sin11208) | Trampa chef | job:cook:trap |
| 12000 | Testimonios periodista | job:journalist:testimony |
| 13000-13012 | Cartas estafador | job:rogue:cards |
| 14000-14007 | Reportaje periodista | job:journalist:report |
| 14500-14508 | Entrevista periodista | job:journalist:interview |

## Primer lote:32 dones implementables

Los nombres y condiciones semanticas proceden del catalogo. TODAS las cantidades de la tabla son balance local provisional, excepto cuando el texto original declara explicitamente una cifra. Los effectKey son identificadores propuestos; no son campos del servidor. Revisar fr antes de convertir traducciones ambiguas en reglas.

| ID/nombre original ES | Requisito | effectKey | Cantidad provisional | Activacion | Encaje local |
| --- | --- | --- | --- | --- | --- |
| 1001 Ataque circular. | sword | `swordTargets` | +1 objetivo | ataque espada | Ya existe limite hits de espada. |
| 1002 Cortar. | sword | `swordSecondaryDamage` | x1.25 | segundo objetivo y siguientes | Multiplicar dano por indice del golpe. |
| 1003 Carta de triunfo. | sword | `swordDuelistDamage` | x1.5, maximo1 | todos ataques espada | Conflicto semantico con1001; decidir exclusion local. |
| 1004 Duelista. | sword | `swordPrimarySlow` | 35%,2s | primer objetivo | Anadir slow y reducir velocidad IA. |
| 1005 Huelga de cadena. | sword | `swordChain` | +8% por golpe,max5,ventana3s | ataques consecutivos | Estado jugador por secuencia. |
| 1101 Veneno virulento. | dagger | `daggerInstantPoison` | 100% dano restante | nuevo veneno daga | Convertir DOT en dano inmediato; no sumar ambos. |
| 1102 Veneno de la agonía. | dagger | `daggerPoisonTrade` | impactox0.8,venenox1.5 | cada ataque daga | Usa poisonDamage actual. |
| 1103 Cuchilla afilada. | dagger | `daggerCharges` | +1 carga | capacidad daga | Reusar chargeCapacity. |
| 1105 Punto débil. | dagger | `daggerFirstUse` | x1.35 | primer uso con cargas completas | Estado previo al consumo; regla local. |
| 1108 Veneno rastrero. | dagger | `daggerPoisonStacks` | max3 acumulaciones | reaplicacion veneno | Persistir stacks; no reiniciar ticks por impacto. |
| 1301 Tiro pesado. | bow | `bowExtraPierce` | +1 objetivo adicional | colisión de flecha | Texto ES; arco es una asignación local y la familia oficial no está recuperada. |
| 1401 Gran quiver. | bow | `bowCharges` | +1 carga | capacidad arco | Reusar chargeCapacity. |
| 1402 Quiver sin fondo. | bow | `bowRecovery` | +20% recuperacion | recarga arco | Reusar recuperacion de cargas. |
| 1403 Disparo penetrante. | bow | `bowPierce` | atraviesa3 objetivos | colision proyectil | Original sin cifra;3 es limite local. Registrar IDs golpeados. |
| 1404 Tiro critico. | bow | `bowStun` | 0.6s | flecha impacta | Reusar e.stun. |
| 1405 Lado ciego. | bow | `bowRicochet` | hasta2 rebotes, radio220px | impacto de flecha | ES dice enemigos cercanos; alcance/cantidad locales provisionales. Coexiste con 1403. |
| 1406 Puntería certera. | bow | `bowHeavy` | danox1.35,cadenciax0.75 | disparo arco | Aplicar tambien duration/windup; no velocidad de proyectil. |
| 1407 Bombardeo. | bow | `bowFireRate` | cadenciax1.2 | disparo arco | Reducir duration/windup. |
| 1408 Flecha envenenada. | bow | `bowDamageOverTime` | totalx1.25 durante4s | flecha impacta | No infligir ademas dano instantaneo completo. |
| 1409 Flecha llameante. | bow | `bowFlamingTargets` | hasta2 objetivos adicionales, dano x0.75 acumulativo despues del primer impacto | impacto de flecha | ES confirma multiobjetivo y menor dano, no sus cifras. Combinable localmente con 1403/1405. |
| 14004 Documental de la vida salvaje. | report | `reportIceDamage` | +6 daño de hielo por golpe | impactos de jugador y mascota | ES lo confirma; cantidad local y efecto original FX 29 `hit_test_glace`. |
| 14000 Escándalo de Estado. | report | `reportLightningAll` | golpea todos los enemigos a 145 px | reportaje de relámpago | ES confirma alcance múltiple; el radio es local. Sin el don, el testimonio afecta al enemigo más cercano. |
| 13010 La prenda. | cards | `cardsSpadeVolley` | carta adicional por enemigo, radio220px, max6 | usar as de picas | ES confirma una carta adicional por enemigo; radio y límite son locales. Proyectiles conservan objetivo al guardar. |
| 13011 El truco. | cards | `cardsSpadeReturn` | retorno guiado tras0.55s | proyectil de picas | ES confirma que vuelve al Estafador; retardo, guiado y vida restante son valores locales. |
| 13012 El prestigio. | cards | `cardsPrestige` | primer objetivo slow2s, segundo stun1.2s, tercero explota en radio90 con24 daño | orden de impactos del as de picas | ES confirma secuencia; estados/duración/radio/daño son valores locales. |
| 13007 Fanfarrón. | cards | `cardsClubRiskDamage` | daño x2; aturdimiento propio0.75s; vulnerabilidad +50% durante3s | usar as de tréboles | ES confirma daño aumentado y perjuicios; las magnitudes son locales. Con este don, tréboles se dispara como proyectil. |
| 13008 Tiro barato. | cards | `cardsClubConditionalDamage` | +50% vs slow, +100% vs stun | impacto del as de tréboles | ES confirma la condición; multiplicadores locales. |
| 13009 Lengua venenosa. | cards | `cardsClubPoison` | daño total +50% en veneno durante4s | impacto del as de tréboles | ES confirma sustitución del impacto por DOT aumentado; cantidad/duración locales. |
| 1501 Aspecto de la tortuga. | shield | `shieldCharges` | +1 carga | capacidad escudo | Reusar chargeCapacity. |
| 1502 Aspecto del escarabajo. | shield | `shieldRecovery` | +20% recuperacion | recarga escudo | Reusar recuperacion de cargas. |
| 1503 Aspecto del erizo. | shield | `shieldReflect` | 25% dano bloqueado | bloqueo valido | Usar atacante del golpe; no trigger en residual. |
| 1504 Aspecto del zorro. | shield | `shieldChargeReturn` | 25% por bloqueo valido | bloqueo valido con escudo | ES dice "a veces"; cantidad local. Devuelve una carga del escudo secundario sin superar capacidad. |
| 1505 Aspecto del tiburón. | shield | `shieldHeal` | 20% dano bloqueado | bloqueo valido | Curar maximoHP; no usar dano residual. |
| 1506 Aspecto del oso. | shield | `shieldBarrier` | 25% dano bloqueado,6s | bloqueo valido | Reusar barrier/barrierTime. |
| 1508 Aspecto del gato. | shield | `shieldStoredHit` | 30% dano bloqueado,1golpe | bloqueo luego proximo ataque | Consumir una vez; definir expiracion local6s. |
| 1509 Aspecto del cuervo. | shield | `shieldAllyRadius` | radio local160px | dano frontal a mascota/invocaciones cercanas mientras se guarda | ES confirma radio de proteccion; radio y condicion son decisiones locales. |
| 1701 Economía de escala. | bandage | `bandageCharges` | +1 carga | capacidad vendas | Reusar chargeCapacity. |
| 1702 Suministros. | bandage | `bandageRecovery` | +20% recuperacion | recarga vendas | No abreviar incantacion original1000ms. |
| 1705 Vacunación. | bandage | `bandageOverhealBarrier` | 100% exceso,6s | curacion supera maximo | Reusar barrier y limitar acumulacion local. |
| 1707 Esteriliza. | bandage | `bandageSelfHeal` | x1.25 | curacion sobre jugador | Texto frances confirmar relacion al soigneur. |
| 10101 Polvo cegador. | rogue:vanish | `vanishStun` | 1.2s,radio150 | activacion desaparecer | Pulso inicial;no cada frame. |
| 10111 Polvo perenne. | rogue:vanish | `vanishMoveSpeed` | +25% | mientras invisible | Multiplicador movimiento temporal. |
| 11205 Trampa para osos | cook:trap | `trapPowerRadius` | danox1.3,radiox1.2 | detonar trampa | Motor trap existente. |
| 14500 Encabezado cubre. | journalist:interview | `interviewRadius` | radiox1.25 | pulso entrevista | No ampliar todos efectos periodista. |
| 14502 Aprendiz | journalist:interview+pet | `petTriggersInterview` | radio80,respeta cooldown | mascota cerca testimonio | Nueva fuente activacion;no generar testimonios gratis. |

## Textos de condiciones para el lote

- **1001 - Ataque circular.** ES: Aumenta la cantidad de enemigos golpeados durante cada ataque. FR: Augmente le nombre d'ennemis touchés à chaque attaque.
- **1002 - Cortar.** ES: Aumenta el daño en objetivos adicionales. FR: Augmente les dégâts sur les cibles supplémentaires.
- **1003 - Carta de triunfo.** ES: Ya no golpeas enemigos adicionales, pero aumenta el daño causado. FR: Ne touche plus d'ennemis supplémentaires mais augmente les dégâts infligés.
- **1004 - Duelista.** ES: Ralentiza el objetivo principal. FR: Ralentit la cible principale.
- **1005 - Huelga de cadena.** ES: Los ataques consecutivos causan más y más daño. FR: Les attaques consécutives infligent de plus en plus de dégâts.
- **1101 - Veneno virulento.** ES: Todo daño de veneno se inflige instantáneamente. FR: Tous les dégâts de poison sont infligés instantanément.
- **1102 - Veneno de la agonía.** ES: El daño inicial se reduce, pero el daño de veneno aumenta. FR: Les dégâts initiaux sont réduits, mais les dégâts du poison sont augmentés.
- **1103 - Cuchilla afilada.** ES: Aumenta el número de usos máximos. FR: Augmente le nombre d'utilisations maximum.
- **1105 - Punto débil.** ES: Se incrementa el daño del primer uso. FR: Les dégâts de la première utilisation sont augmentés.
- **1108 - Veneno rastrero.** ES: El veneno de la daga puede apilarse varias veces. FR: Le poison de la dague peut se cumuler plusieurs fois.
- **1401 - Gran quiver.** ES: Aumenta el número de usos máximos. FR: Augmente le nombre d'utilisations maximum.
- **1402 - Quiver sin fondo.** ES: Aumenta la velocidad de recuperación. FR: Augmente la vitesse de récupération.
- **1403 - Disparo penetrante.** ES: Las flechas pasan por los enemigos. FR: Les flèches traversent les ennemis.
- **1404 - Tiro critico.** ES: Las flechas aturden a los enemigos. FR: Les flèches étourdissent les ennemis.
- **1406 - Puntería certera.** ES: El daño de la flecha aumenta, pero la velocidad de disparo se reduce. FR: Les dégâts des flèches sont augmentés mais la vitesse de tir est réduite.
- **1407 - Bombardeo.** ES: Aumenta la velocidad de disparo. FR: Augmente la vitesse de tir.
- **1408 - Flecha envenenada.** ES: El daño de la flecha aumenta pero se inflige con el tiempo. FR: Les dégâts des flèches sont augmentés mais sont infligés sur la durée.
- **1501 - Aspecto de la tortuga.** ES: Aumenta el número de usos. FR: Augmente le nombre d'utilisations.
- **1502 - Aspecto del escarabajo.** ES: Aumenta la velocidad de recuperación. FR: Augmente la vitesse de récupération.
- **1503 - Aspecto del erizo.** ES: Devuelve una parte del daño bloqueado. FR: Retourne une partie des dégâts bloqués.
- **1505 - Aspecto del tiburón.** ES: Una porción del daño bloqueado se convierte en salud. FR: Une partie des dégâts bloqués sont convertis en soin.
- **1506 - Aspecto del oso.** ES: Una porción del daño bloqueado se convierte en escudo. FR: Une partie des dégâts bloqués sont convertis en bouclier.
- **1508 - Aspecto del gato.** ES: Una porción de daño bloqueado se agrega a tu próximo ataque. FR: Une partie des dégâts bloqués sont ajoutés à votre prochaine attaque.
- **1701 - Economía de escala.** ES: Aumenta el número de usos máximos. FR: Augmente le nombre d'utilisations maximum.
- **1702 - Suministros.** ES: Aumenta la velocidad de recuperación. FR: Augmente la vitesse de récupération.
- **1705 - Vacunación.** ES: El exceso de curación se convierte en un escudo. FR: Les soins excédentaires sont convertis en bouclier.
- **1707 - Esteriliza.** ES: Incrementa la curación prevista al curandero. FR: Augmente les soins prodigués au soigneur.
- **10101 - Polvo cegador.** ES: Aturde a los enemigos cercanos. FR: Étourdit les ennemis proches.
- **10111 - Polvo perenne.** ES: Aumenta tu velocidad de movimiento durante la duración del efecto. FR: Augmente votre vitesse de déplacement pendant la durée de l'effet.
- **11205 - Trampa para osos** ES: Aumenta el daño y el radio de la trampa. FR: Le rayon d'effet et les dégâts du piège sont augmentés.
- **14500 - Encabezado cubre.** ES: Aumentar el radio de entrevistas. FR: Augmente le rayon des interviews.
- **14502 - Aprendiz** ES: Tu mascota puede desencadenar entrevistas. FR: Votre familier peut déclencher des interviews.

## Limites y decisiones de implementacion

La seleccion original envia cofreID y donID, y la oferta trae tambien categoria. Mantener el ID oficial como identidad (`originalGiftId`) y guardar offers/confirmacion como transaccion local; el protocolo original no prueba la deduplicacion del servidor. Los dones pertenecen a la expedicion segun el flujo local actual; su persistencia exacta original no queda establecida por traducciones.

Para identificar aplicabilidad usar arma/mano/trabajo principal o secundario efectivo. No ofrecer efectos que el motor aun no ejecuta. No inventar un don universal de mascota:14502 amplia entrevista y14004 anade dano de hielo al jugador y su mascota como efecto directo local. Las mejoras autonomas de mascota79-84 son talentos.

El motor actual ya tiene cargas, poison/poisonTick, stun, barreras, multihit limitado, trampa y pulsos de trabajos; por eso el lote evita nuevas simulaciones grandes. Rebote de flechas1405 implementado en v0.52 con busqueda local e historial de impactos; radio y maximo de rebotes son provisionales. Knockback de arco no se describe en los dones recuperados: no renombrar un efecto de knockback como don autentico.1404 describe aturdimiento, no empuje.

Las conversiones instantaneo/DOT1101 y1408 deben sustituir el canal original en lugar de duplicarlo. Acumular veneno1108 necesita stacks explicitos y normalizacion al cargar. Escudo1503/1505/1506/1508 deben trabajar sobre dano realmente bloqueado y no el residual; impedir bucles de reflejo. Prueba especial futura:1403 no debe golpear repetidamente al mismo enemigo mientras lo atraviesa.

Exclusiones/alternativas no recuperadas:1001 frente1003;1403 frente1408; 1409 comparte objetivo de multiimpacto y se combina aqui localmente con1403/1405; efectos elixir10001/10002. Definir una politica local visible cuando se implementen. No inferir exclusividad del simple hecho de describir efectos opuestos.

La unica cifra explicita de probabilidad vista en estos escudos es1507:30% para bloqueo sin carga incluso sin escudo levantado. Se excluye del primer lote para evitar duplicar el flujo de consumo de carga mientras se adapta el nuevo catalogo.10000 indica inmovilizacion5s;11202 y11203 indican ventanas2s; conservarlas si se implementan.

No se ejecutaron pruebas ni analisisREA duplicados: el plan reutiliza la evidencia de catalogos, protocolo y fuentes originales ya conservada.

## Adiciones implementadas despues del plan inicial

| ID | Evidencia | Implementacion local | Estado |
| --- | --- | --- | --- |
| 14001 | ES: las mejoras de armas afectan a aliados cercanos. | `reportWeaponAllyDamage`: el compañero recibe +25% de daño si está a160px y hay una mejora para el arma equipada; transferencia, alcance y cantidad son decisiones locales para el modo individual. | v0.68 |
| 10109 | ES: invoca un señuelo que no ataca y puede ser objetivo de enemigos. | `vanishDecoy`: entidad sin ataque, objetivo prioritario cercano, recibe impactos; 45 HP y3s locales. | v0.67 |
| 10103 | ES: sustituye el aumento de daño por un aumento fuerte de efectos curativos. | `vanishHealingTrade`: desactiva el multiplicador del golpe sorpresa y duplica la curación del talento de Desaparición; no crea curación base. | v0.66 |
| 10106 | ES: tornado que daña enemigos en el momento de Desaparición. | `vanishTornado`: daño en un pulso al activar Desaparición, radio150px y remolino de0.85s; magnitudes y forma visual locales. | v0.65 |
| 10102 | ES: compartir los efectos con aliados cercanos. | `vanishShareEffects`: comparte invisibilidad, curación y limpieza de ralentización con Picpic activo a 160 px; alcance y conjunto de efectos son aproximaciones locales. | v0.72 |
| 1006 | ES/FR: posibilidad de parar ataques recibidos; sin probabilidad publicada. | `swordParry`: 15% por copia, tope 60%; anulacion sin guardia. | v0.44 |
| 1007 | ES/FR: mas dano contra el ultimo enemigo que ataco al jugador; sin porcentaje. | `swordReprisal`: +25% por copia, tope +100%; UID de atacante persistido. | v0.45 |
| 1008 | ES/FR: no atacar durante un tiempo potencia el siguiente ataque; sin duracion/cantidad. | `swordBalestra`: espera 3 s, +50% por copia, tope +150%; familia espada inferida. | v0.46 |
| 1104 | ES/FR: aumento de dano al atacar por la espalda; sin cantidad ni geometria. | `daggerBackDamage`: +35% por copia, tope +100%; lado horizontal opuesto a `enemy.facing`. | v0.47 |
| 1106 | ES/FR: aumenta el dano del veneno y lo convierte en dano de relampago; sin cuantia. | `daggerLightningPoison`: +50% por copia hasta +100%, FX37, conserva ticks. | v0.48 |
| 1107 | ES/FR: aumenta mucho la ultima ocurrencia del veneno de daga; sin cuantia. | `daggerFinalPoison`: +100% por copia, tope +300%; ultimo pulso rastreado, estallido instantaneo 1101 amplificado. | v0.49 |
| 1202 | ES/FR: aturdir al objetivo cada 3 golpes; sin duracion ni familia confirmada. | `greatswordThirdHitStun`: cuenta por enemigo, aturdimiento local 1.5 s; se ofrece con espada grande local. | v0.50 |
| 1507 | ES/FR: 30% de probabilidad de bloquear sin gastar carga, incluso con escudo bajo. | `shieldFreeBlock`: bloqueo pasivo de 30%, reutiliza resolucion de bloqueo sin consumir carga. | v0.51 |
