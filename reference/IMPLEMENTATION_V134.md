# Implementacion v0.134

El cliente inicia las poses de reposo con `jouerAnimation("statique", 0, true)` al cargar el look y al detenerse tras `course`. La velocidad cero deja la pose en su fotograma inicial; no reproduce el clip continuamente. Los metadatos recuperados muestran que estos clips pueden tener90-120 fotogramas, asi que avanzar con el reloj global producia un ciclo de reposo que el cliente no pide.

Las criaturas locales ahora mantienen `animationTime=0` para `statique` y poses `statique:*` de reposo, incluidas las poses de equipo del raton y NPC. `statique:combat` y `statique:stun` conservan su reloj; movimiento, ataque, arco, salto, telegraph, muerte, golpe y reanimacion tambien mantienen sus tiempos separados.

No cambia combate, movimiento ni guardado. El motor de animacion original no esta completo como fuente legible; la conclusion se basa en el argumento explicito de velocidad0 del cliente y el reloj local de frames recuperado.

Evidencia: `reference/original-data/MobileADV-2021.js`, llamadas `jouerAnimation("statique", 0, true)` en `defLook()`, `arreterDeplacement()` y `projection()`; `reference/original-data/animation-metadata.json` y `dist/assets/original/creatures.json` contienen las longitudes de clips.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
