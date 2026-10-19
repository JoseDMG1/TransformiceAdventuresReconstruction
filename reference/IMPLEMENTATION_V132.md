# Implementacion v0.132

El parametro `TOUCHE` de `MobileADV.finAnimationAttaque(MAIN, CODE, IMAGE, TOUCHE)` indica que el ataque enemigo hizo contacto; el cliente usa esa bandera para pausar el clip100 ms. La reconstruccion ya podia saberlo para los golpes de area y los proyectiles, pero no conectaba el contacto con el cierre visual.

Se usa la colision local de jugador, Picpic, invocaciones y proyectiles como aproximacion de `TOUCHE`. En cuanto hay contacto, si `attaque1` sigue en su fase de cierre, se congela en el fotograma actual durante100 ms y se extiende el final del clip en ese tiempo. La pausa no depende de perder vida: un contacto detenido por invulnerabilidad o escudo sigue contando, igual que una colision local confirmada. No se pausa si no hay metadatos de fotogramas o si el clip ya termino.

La bandera real venia del servidor, por lo que colision local no recupera interacciones de sectores originales, geometria no implementada o reglas server-side. No cambian colisiones, dano, protecciones ni momento de impacto.

Evidencia: `reference/original-data/MobileADV-2021.js`, `finAnimationAttaque()` llama `pausePendant(100)` solo si `TOUCHE`; `ProtoADV.js` lee esa bandera con `MSG.lBool()` dentro del paquete `C_FIN_ATTAQUE`.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
