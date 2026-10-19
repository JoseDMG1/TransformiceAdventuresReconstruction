# Talentos: textos originales y reglas locales

La reconstrucci?n contiene 14 ?rboles y 84 talentos con nombres y descripciones espa?oles originales recuperados en reference/original-translations/indices_es.json. Cada nodo conserva originalTalentId, description literal y balanceDescription separado para marcar su valor provisional. El ?ndice franc?s corrobora las traducciones ambiguas; se conservan incluso nombres espa?oles imperfectos del cat?logo. No se sustituyen placeholders de las traducciones por cantidades inventadas.

## Evidencia observada

Se reutiliza REA_FINDINGS.md y su Evidence ID ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd. InterfaceTalents.js muestra categor?as armas/competencias/rat?n, seis posiciones en cuatro niveles 1/2/1/2, precios 1/2/2/3/4/4 y cambio gratuito entre posiciones 2/3 y 5/6 si se posee la alternativa. La columna final est? marcada como no disponible en la demo. Los ?rboles originales tienen IDs 1?5 y 21?29 en talentTrees. La cantidad de ?rboles y sus nombres ya no son inventados.

## Asociaci?n inferida y reglas provisionales

El cliente recibe del servidor el v?nculo entre ?rbol y talentos, desbloqueo, presupuesto y efectos num?ricos. La asociaci?n de bloques consecutivos de seis talentos con ?rboles se infiere de sus descripciones y del cat?logo franc?s/espa?ol. Cada bloque corresponde inequ?vocamente al arma o habilidad nombrada; esa concordancia no recupera una tabla original del servidor. En particular grupo 6 (IDs31?36) se asocia a Chef-Caldero por sus referencias a recetas, salsa, caldero e ingredientes; no al Elixir pese al orden visual elegido localmente.

Conservamos IDs locales sword,bow,bandage,shield,botanist,chef,trickster,journalist,pet para leer construcciones guardadas. Los cinco ?rboles a?adidos son dagger,chef-trap,botanist-plant,journalist-interview,trickster-vanish. Conservar ?ndices conserva puntos gastados, pero corrige los efectos anteriores, que eran invenciones de una versi?n preliminar. No representa conservaci?n de sus antiguos efectos de balance.

La cantidad de puntos por nivel y los prerrequisitos siguen siendo reglas locales porque el servidor original decide esos valores. La demo sí bloquea los dos talentos del cuarto nivel: `InterfaceTalents.js` pone el candado y muestra `palierNonDisponibleDemo` cuando el precio calculado es 4. La reconstrucción ahora impide comprarlos y muestra el candado original. Las partidas locales existentes que ya los tengan conservan sus datos y efectos; no se eliminan al cargar. El motor usa `profile.talentBuild = { sword: [0,2,3] }`, con índices cero: índice 0 abre 1/2; cualquiera de esos abre 3; 3 abre 4/5. Cambiar de rama conserva niveles superiores y no consume puntos nuevos. `normalizeTalentBuild` elimina desconocidos y respeta presupuesto y exclusividad. Los talentos legacy `profile.talents` se descuentan del nivel sin reescribirlos.

## Contrato de efectos

Todas las claves representan efectos aplicables por el juego; talentBonus solo suma valores. description conserva la regla textual original, que debe guiar condiciones y contrapartidas. Ejemplos: bowFocusedDamage tambi?n debe reducir cadencia; cardShield reduce la bonificaci?n de tr?boles; petWoundedGuard escala con heridas; swordCleavePower exige tres objetivos; swordChargeSave exige uno. Los radios/distancias son p?xeles locales, duraciones segundos, da?o/curaci?n/vida unidades locales y fracciones probabilidades o proporciones. Valores1 de entrenamiento/desbloqueo son indicadores. bowRecovery y recuperaciones de arma reducen tiempo de espera; swordCharges/daggerCharges/shieldCharges agregan usos; trapPatience incrementa potencia por segundo sin activar.

- sword (original 1, talentos 1?6): swordCharges=1, swordRange=18, swordTargets=1, swordRecovery=0.18, swordCleavePower=0.3, swordChargeSave=0.3
- dagger (original 2, talentos 7?12): daggerCharges=1, daggerPoison=3, daggerDamage=4, daggerRecovery=0.18, daggerFirstHit=0.35, daggerExecute=0.3
- shield (original 3, talentos 13?18): shieldCharges=1, shieldReflect=5, shieldAfterguard=0.2, shieldRecovery=0.18, petBlock=0.3, healingReceived=0.2
- bow (original 4, talentos 19?24): bowRecovery=0.15, bowDistanceDamage=0.3, bowKnockback=65, bowIsolatedDamage=0.3, petArrowReturn=0.3, bowFocusedDamage=0.4
- bandage (original 5, talentos 25?30): selfHealing=0.15, bandageInitial=6, bandagePeriodic=3, bandageRecovery=0.18, bandageTargets=1, petRescue=5
- chef (original 21, talentos 31?36): chefDuration=2, chefDecoy=1, petIngredients=1, chefCarryArmor=0.2, chefHealing=5, chefPower=6
- chef-trap (original 22, talentos 37?42): trapArming=0.3, trapStun=0.7, trapDamage=7, trapPatience=0.12, petRearm=1, trapSlow=0.35
- botanist (original 23, talentos 43?48): elixirRadius=25, elixirWeaken=0.2, elixirSlow=0.3, botanistPower=3, elixirElementGuard=0.25, elixirSlowImmunity=1
- botanist-plant (original 24, talentos 49?54): petGrowth=0.3, plantHealing=5, plantMaturation=0.3, plantHealth=20, plantRange=35, plantSharedHeal=0.5
- journalist (original 25, talentos 55?60): reportSelfHeal=4, reportHealing=5, journalistPower=6, petDownTestimony=1, petTestimony=1, reportShield=12
- journalist-interview (original 26, talentos 61?66): interviewRadius=25, interviewHealRecovery=1, interviewDamageRecovery=1, interviewRevive=8, interviewPetDamage=0.35, interviewArmor=0.2
- trickster (original 27, talentos 67?72): cardRecovery=0.15, tricksterPower=7, cardFreeze=0.8, cardHealing=7, cardPetPower=0.5, cardShield=15
- trickster-vanish (original 28, talentos 73?78): vanishCleanse=1, vanishHealing=10, vanishPower=0.35, vanishStun=1, vanishPet=1, vanishEmergency=1
- pet (original 29, talentos 79?84): petWoundedGuard=0.35, petHealing=0.25, petAttackSpeed=0.2, petRevive=1, petDamage=4, petMaxHp=25

Las cantidades no aparecen en los cat?logos recuperados. Toda cantidad de este m?dulo es provisional, aunque el texto describa una regla original. Las pruebas de la versi?n preliminar deben actualizar su expectativa de nueve ?rboles y sus efectos inventados. No se ejecutaron pruebas durante esta sustituci?n por instrucci?n del responsable de integraci?n.
