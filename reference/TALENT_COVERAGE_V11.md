# Revisión estática de talentos para v0.11

Revisión de `dist/game.js`, `dist/resources.js`, `dist/persistence.js`, `dist/combat.js`, `dist/talents.js` y catálogos originales ES/FR. No se ejecutaron pruebas, navegador ni cliente histórico. Las líneas corresponden al estado leído antes de cambios de integración v0.11 y pueden desplazarse.

Referencia REA reutilizada: `REA_FINDINGS.md`, Evidence ID `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`. El cliente original establece presentación/costes; textos originales describen condiciones. Las cantidades y duraciones actuales siguen siendo locales.

## Correcciones prioritarias

1. **P1: daño detenido se calcula al revés.** `game.js:1103` calcula `blocked = Math.max(0, amount - hit.amount)` después de sustituir amount por daño reducido. Habitualmente resulta cero; las ramas de regalos `shieldReflect`, `shieldHeal`, `shieldBarrier` y `shieldStoredHit` reciben cero. Conservar daño entrante antes de `incomingDamage` y calcular diferencia con daño tras bloqueo. El talento de riposta 14 usa cantidad fija y sí funciona contra cuerpo a cuerpo, pero los proyectiles no conservan atacante (punto siguiente).

2. **P1: proyectiles pierden el enemigo que los lanzó.** `game.js:2920` pasa `null` como source. `elixirWeaken` (44) comprueba `source.weaken` en `hurtPlayer` y no afecta disparos de enemigos debilitados. `shieldReflect` (14) tampoco devuelve daño a un tirador. Conservar un identificador estable del atacante en proyectil, resolverlo al impacto y persistirlo. Conservar también clase elemental explícita: el actual `!source` usado por `elixirElementGuard` (47) equipara todos los proyectiles a daño elemental y excluye otros ataques elementales. No basta reemplazar null sin añadir tipo de daño, porque anularía esa protección.

3. **P1: vida de mascota puede superar máximo tras redistribución.** `game.js:2192` vacía todos los talentos y limita únicamente vida del jugador. Al perder `petMaxHp` (84), la mascota conserva vida por encima de su nuevo máximo. `hurtPet:385` usa `1 - pet.hp / petMaxHP()` sin clamp; con vida excesiva la protección por heridas puede transformarse en aumento de daño. Limitar vida de mascota al cambiar talentos/equipo y clamp de proporción. El sanitizador sí limita pet.hp al recargar, por lo que existe además diferencia antes/después de recarga.

4. **P1/P2: bonus de curación recibida incompleto.** Texto 18: aumenta la curación recibida. `healingReceived` se aplica a venda inicial y pools, pero no a `bandagePeriodic`, cartas de corazones, `reportSelfHeal`, testimonio curativo, curación de Vanish, rescate de mascota o lirio. Centralizar curación del jugador y evitar multiplicar dos veces. `selfHealing` (25) requiere decidir y documentar si afecta todo autocuidado o solo vendas: hoy únicamente modifica venda inicial. Francés: “Augmente les soins personnels.”

5. **P2: potencias de habilidades afectan otra habilidad.** `journalistPower` corresponde al talento 57, daño elemental de informes, pero también se suma al daño periódico de Entrevista (`skill`, alrededor de 1611). `botanistPower` corresponde al talento 46, daño periódico del Elixir, pero se suma al daño de plantas (`skill`, alrededor de 1687). `tricksterPower` corresponde al as de espadas (68), pero se suma igualmente al as de diamantes (`skill`, alrededor de 1583). Restringir cada clave a su habilidad/cartas descrita. Equipo u otros bonus generales deberían tener claves distintas.

6. **P2: afinidad elemental del as de espadas no existe.** El talento 68 exige fuego. `hurtEnemy` recibe solo número; se aumenta daño, pero no existe distinción elemental visible en esa rama. El 69 prolonga stun, pero no modela congelación distinta. Si control idéntico es simplificación consciente, indicarlo en interfaz hasta disponer de estados/tipos originales.

7. **P2: Vanish automático no reutiliza efectos de Vanish manual.** `hurtPlayer:1163` activa invisibilidad/limpia slow/suma curación, mientras rama manual también aplica regalos de stun a enemigos cercanos. Desbloqueo 78 dice que la habilidad se activa automáticamente; centralizar activación para no divergir. El automático usa cooldown propio 15s provisional, no cooldown de habilidad. No constituye dato original.

## Cobertura de los 84 nodos

“Conectado” significa que hay consumidor estático de la clave; no demuestra equivalencia del balance ni ejecución correcta.

| Árbol y talentos originales | Cobertura observada | Divergencias o pendientes |
| --- | --- | --- |
| Espada 1–6 | Usos y recuperación en resources; alcance/objetivos/boost/reembolso en impactAttack. | Conectados los seis. La activación al golpear tres aplica bonus a golpes posteriores, coherente con “después”. Valores/6s locales. |
| Daga 7–12 | Usos, veneno, impacto, recuperación, primer golpe y ejecución conectados. | Estado de veneno y sus timers se conserva. No encontré nodo sin consumidor. |
| Escudo 13–18 | Usos/recuperación, riposta, guardia posterior, parada mascota y curación conectados. | Riposta falla en proyectiles por source perdido; curación incompleta. Guardia posterior se activa antes de aplicar daño del propio golpe parado, así también reduce ese golpe. |
| Arco 19–24 | Cadencia, distancia, empuje, objetivo aislado, devolución y daño/cadencia focal conectados. | El disparo enfocado reduce cadencia de ataque, pero no recuperación de cargas; decisión local. Flechas que atraviesan varios enemigos sortean devolución por cada impacto, potencialmente devuelven varias cargas por disparo. |
| Vendas 25–30 | Autocuración inicial, curación inicial/periódica, recuperación, aliado adicional y rescate conectados. | El aliado adicional se limita a mascota por alcance local; mascota herida recibe venda aun sin nodo29. HoT solo jugador, sin HoT de mascota al vendarla. Puede ser simplificación de objetivos. |
| Caldero 31–36 | Duración, señuelo atacable, mascota/enriquecimiento, armadura al cargar, cura y daño conectados. | 33 agrega ingredientes inexistentes: basta mascota cerca para aumentar vida/daño, no recoge entidades de ingrediente. Duración31 afecta existencia del caldero, texto habla duración de efectos de recetas. |
| Trampa 37–42 | Armado/stun/daño/paciencia/rearme/slow conectados. | Sin noops estáticos. Rearme limitado una vez, tiempos locales. |
| Elixir 43–48 | Radio, debilitar, slow, daño periódico, protección elemental e inmunidad slow conectados. | Debilitar/elemental: errores source y tipo ya descritos. Protecciones comprueban estar actualmente dentro de pool, texto habla aliados tocados/bajo efecto: no queda aura temporal al salir. Daño46 se filtra a plantas. |
| Plantas 49–54 | Crecimiento mascota, prioridad lirio/curación, maduración, vida, prioridad cardo/alcance y cura compartida conectados. | Solo existen subtipos lily/thorn; espinas y cardo originales quedan colapsados. Nodo53 `plantRange` aumenta radio de todas las plantas, también lirio; debería restringirse a cardo. Nodo51 adelanta thorn genérico; falta subtipo propio de espinas. Prioridad no se reinicia al aprender: depende de plantIndex guardado. Cura compartida54 solo se aplica cuando lirio selecciona mascota; razonable para único aliado local. |
| Informe 55–60 | Autocura, cura informe, daño elemental, testimonio mascota caída, testimonio aleatorio mascota viva y barrera conectados. | 57 se filtra a Entrevista. Testimonios generados por mascota solo en dungeon, no tutorial. 59 ocurre periódicamente garantizado, texto “a veces”: frecuencia local sin sorteo. |
| Entrevista 61–66 | Radio, reducción cooldown por ambos testimonios, curación caído, daño mascota en zona y protección conectados. | Daño mascota65 se calcula como `6 * bonus`, no multiplica daño total mascota; niveles y otras mejoras no participan. Protección66 solo jugador, no mascota (texto recibido ambiguo). Curación64 facilita levantar mascota, no otro jugador local. |
| Cartas 67–72 | Cooldown, daño espadas, control diamantes, cura corazones, siguiente golpe mascota y barrera/tréboles conectados. | Daño espadas68 se filtra a diamantes; falta tipo fuego. Bonus mascota71 suma `6 * bonus` en vez de multiplicar daño real. Nodo72 reduce 1.35 a1.2 y da barrera: contrapartida sí implementada. |
| Vanish 73–78 | Limpieza slow, cura, potencia golpe, stun primer objetivo, mascota invisible/asistencia y emergencia conectados. | 73 solo conoce slow porque no hay otros impedimentos persistentes. 77 pet golpea primer objetivo con cantidad local inmediata. Emergencia diverge de manual. |
| Mascota 79–84 | Protección por heridas, cura recibida, cadencia, levantar jugador, daño y vida conectados. | Protección necesita clamp; reset de máximo deja hp sobrante. Intento de levantar permitido una vez por creación de player/escena, decisión local sin evidencia de límite original. |

## Persistencia y reanudación

Los estados centrales de talentos sí se guardan: charges/timer, plantIndex, guard, swordBoost, bandageHot/hotTick, barrier/barrierTime, slow, cardPet, surprise, downed, petReviveUsed, emergencyCooldown; mascota rescueTimer/testimonyTimer/attack; enemigos poison/slow/weaken y parámetros; campos hp/age/carried/triggered/enriched/rearmCount/tick/damage; proyectiles surprise/origen/hitIDs. No hallé un estado de talento activo creado actualmente que falte enteramente del sanitizador.

La identidad/tipo elemental del proyectil es información ausente tanto de ejecución como de guardado. Debe añadirse a ambos al corregir source. Los efectos se recortan a30 y máximo15s al importar, por lo que futuras mejoras de duración/cantidad deben mantener coherencia con esos límites. Para talento73, stun/root u otros estados futuros también necesitarán entrada de persistencia y cleanse central.

Migración: versiones anteriores a10 devuelven árboles inventados y mantienen legacy; versiones10+ conservan builds auténticos. No cambiar nuevamente esa frontera sin justificar y evitar perder puntos originales.

## Resultado de esta revisión

Los 84 nodos tienen conexión estática, incluidos usos/recuperación mediante claves dinámicas en resources. No se deben presentar como 84 comportamientos fieles ya terminados: los defectos anteriores y los sistemas locales simplificados afectan condiciones y alcance. Prioridad recomendada: corregir daño bloqueado/source, curación/vida mascota y contaminación entre habilidades; después distinguir elementos/plantas y normalizar la activación Vanish.
