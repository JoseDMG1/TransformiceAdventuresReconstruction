# v0.212 — encuadre y escala del mundo

La cámara local imponía un zoom mínimo de 0,65 y calculaba escala con un rectángulo de 1200×720. A 640×360 acercaba el mundo más que el escalado del cliente original. Además, limitaba el centro de cámara al rectángulo local del mapa; al ampliar el campo visible desplazaba al personaje hacia los bordes de la pantalla.

`TFMAdventure.js:319–376` conserva el algoritmo original: eje lógico mayor entre 1280 y 1920, redondeo del menor y escalado al tamaño visible. `MondeADV-2021.js:430–465` sigue la posición del jugador y ajusta la cámara 3D; los sectores se cargan alrededor. No se observa ahí un límite equivalente al rectángulo local impuesto por la reconstrucción.

`dist/viewport.js` centraliza el cálculo lógico, también consumido por la flecha de objetivo. El mundo local usa su escala uniforme: 0,5 a 640×360, 1 a 1280×720 y 2 a 3840×2160. La cámara mantiene el seguimiento sin el límite visual del mapa; los límites de movimiento siguen en la simulación. Se rellena el área exterior con el color base de la escena para evitar huecos transparentes.

Es una adaptación ortográfica. La cámara original tenía perspectiva, foco de 1600, ángulo inclinado y un zoom independiente; esta revisión no afirma recuperar toda esa proyección. El exterior del mapa local tampoco son sectores originales: su composición continúa pendiente. No cambian coordenadas de personajes, objetos, colisiones, semillas ni guardados.

Validación:

- `npm run test:viewport`: dos pruebas de resoluciones, orientación y redondeo.
- `npm run test:objectives`: cinco pruebas aprobadas; `npm run test:maps`: prueba de geometría aprobada.
- `npm run test:camera`: aprobado en Chrome. Comprueba matrices reales de dibujo del suelo a 640×360 y 1280×720, el mismo campo visible, seguimiento centrado y posición de actor idéntica al redimensionar. Incluye tutorial, recarga, retorno, emotes, controles y marcador cercano/distante.
- Prueba adicional de tutorial/objetivos/avisos a 640×360 aprobada; `npm run check`: 100 archivos correctos.

Capturas: [Papaille](validation-v212/papaille.png), [tutorial](validation-v212/quest-new-notice.png), [aldea 640](validation-v212/viewport-640.png), [aldea 1280](validation-v212/viewport-1280.png). [Matrices y coordenadas de navegador](validation-v212/viewport.json).

Falta reconstruir la composición de suelo/vegetación, cotejar los encuadres equivalentes con el video y resolver la perspectiva y datos de sectores. La estimación global permanece provisional en 47%.
