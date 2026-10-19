# Avance v0.14 · dones restantes de plantas

## Evidencia REA y catálogo

Se usó la extracción original de traducciones ES/FR retenida en `reference/original-translations/`, generada desde el cliente con REA (evidencia y procedencia en `TRANSLATION_RECOVERY.md`). Los IDs y textos de 10203–10208, 10210 y10211 son originales. El cliente delega al servidor la simulación, así que los textos prueban la intención general, no daño, radio, probabilidad o duración numéricos. No se presentan esos valores como recuperados.

## Implementación local

- **10203 Carduus ferox:** el Cardo golpea un50% más fuerte y puede herir al jugador que esté en su radio. La probabilidad de20% y los4 puntos de daño por pulso son locales.
- **10204 Carduus multa:** el Cardo selecciona hasta dos enemigos próximos por pulso. El texto confirma varios objetivos, pero no el límite local.
- **10205 Carduus venenum:** el Cardo aplica veneno y ralentización; duración4s, daño2 por pulso de veneno y ralentización25% durante2s son locales.
- **10206 Barbecho:** el Botánico solo coloca Cardos y estos tienen1.5× vida y daño en esta versión local.
- **10207 Maleza pantanosa:** el Cardo aplica veneno periódico a objetivos cercanos. Daño y duración usan los valores locales documentados para 10205.
- **10208 Malas hierbas:** al destruirse una planta brota un Cardo en ese punto. El brote no vuelve a generar otro brote al morir, lo que impide una cadena infinita; el máximo local es ocho plantas.
- **10210 Esquejes salvajes:** cuando un Lirio crece, tiene20% de probabilidad de crear otro Lirio maduro junto a él. El límite local es ocho plantas.
- **10211 Lirio rosa de los valles:** se completa el efecto descrito: el Lirio cura50% más y el exceso de curación del jugador o mascota concede barrera al jugador. Tope y duración son los generales locales del prototipo.

Todos estos dones requieren Botánico principal o la habilidad secundaria **Pulgar Verde** seleccionada. Se conservaron las restricciones/elegibilidad locales y los IDs originales, para que los dones existentes de partidas guardadas continúen aceptándose.

## Persistencia y revisión

El estado `weedSpawned` se serializa con los efectos de escena para preservar el límite de rebrote al cargar una partida. Las entidades de abeja y planta siguen en el mismo formato v12; no se elimina ni reinicia el progreso existente. Catálogo recreado con `node scripts/build-gifts.mjs`; el catálogo tiene ahora 78 dones.

Comprobación sintáctica aprobada con npm run check y node --check scripts/build-gifts.mjs. No se ejecutaron pruebas automatizadas ni recorrido de navegador, y no se modificó la partida del navegador habitual.


### Naturaleza furiosa (10005), añadida en este checkpoint

El catálogo ES recuperado describe una hoja viva invocada para atacar enemigos. La implementación local la convoca cuando aterriza el frasco de Elixir, usa la criatura original ID 17 (Mandragore) como representación y la hace perseguir/atacar enemigos durante la vida restante del charco. Vida, daño, velocidad, duración y límite son valores provisionales. El cliente delega esta conducta al servidor y el handler de estado de planta recuperado no revela su asociación con el ID 17; la elección de criatura es una inferencia visual, no un vínculo demostrado por REA.

Persistencia v12 conserva que el frasco ya convocó a la hoja y el estado vital de la hoja; no cambia el formato ni rompe partidas previas. Evidencia focal REA: `ev_deecf1d30a6c206794104f43128d350ebb600c936b012bdd5821ba02fc84c88d`; artefacto inspeccionado SHA-256 `2ce0cb10eac045235177c349d9b28ad731e7d5daf89e1e6308ec58595d8db1d3`. El análisis fue estático y acotado a tres fuentes; confirma el handler delegado al servidor, no la regla de invocación.

## Pendientes de fidelidad