# Implementacion v0.130

Durante los avisos de ataque, los enemigos que usan `attaque1` ahora repiten los fotogramas0-11 a velocidad3. El cliente inicia ese clip en `MobileADV.animationAttaque()` con `jouerAnimation(nomAnim, 3, true, 0, 11)`. La reconstruccion antes hacia avanzar `attaque1` a velocidad normal durante el telegraph local.

La rana conserva `saut-prep` y su reloj de preparacion propio. No cambia la duracion del aviso, el momento del impacto, el dano, el enfriamiento ni las reglas de IA. El cliente archivado recibe el codigo de animacion y el fin de ataque desde el servidor; esta reconstruccion usa `attaque1` como antes, y la lista/codigos de cada enemigo siguen pendientes.

Evidencia: `reference/original-data/MobileADV-2021.js`, `animationAttaque()` (alrededor de la linea827); en `ProtoADV.js` el cliente recibe esa llamada como evento del protocolo.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
