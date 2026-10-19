# Implementacion v0.127

El seguimiento de camara local usaba una interpolacion de 7/s hacia el jugador. El cliente archivado mueve la posicion de camara un 10% por `DELTA` en cada ciclo (`MondeADV.boucle`, `infoCamera.posX/posY`). A 60 ciclos/s esto equivale a 6/s. Se ajusto el factor local a 6/s; el desplazamiento del retroceso y la sacudida conservan su propio reloj y magnitud.

La atenuacion del efecto de desplazamiento ya coincide con `effetDecalage -= effetDecalage * 0.2 * DELTA` (12/s a 60 Hz), por lo que no se modifico. El cambio no altera movimiento, combate, guardado ni camara online.

Evidencia: `reference/original-data/MondeADV-2021.js`, bucle de camara alrededor de las lineas 445-452; `decalageCamera()` alrededor de 1764-1768.

Validacion: `npm run check` (sintaxis). Aun requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
