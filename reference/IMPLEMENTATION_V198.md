# v0.198 — carro visible y HUD en la resolución de referencia

## Cambios

La captura de v0.197 mostraba un árbol procedural cubriendo el carro de Papaille. `MAPS.tutorial.decorationExclusions` ahora declara un rectángulo y el tipo `tree`. `maps.js` aplica ese filtro a objetos generados después de consumir sus valores aleatorios y antes de añadir objeto o colisión. Los demás objetos conservan sus coordenadas y escalas; los elementos fijos del catálogo no son filtrados. La declaración se aplica a escenas individuales; el generador de rutas de expedición conserva su comportamiento.

Esto retira árboles y sus colisiones dentro del área indicada. Las posiciones guardadas siguen siendo válidas y no cambia el esquema de partida. Las colisiones de las cercas y el carro continúan sin datos originales recuperados.

La prueba de tutorial puede ejecutarse a 640×360 con `npm run test:tutorial:reference`. En esa resolución se detectó una superposición entre el diálogo y el HUD. Una regla CSS para ventanas horizontales de hasta 900×500 reduce la barra de acciones y sus cuatro accesos laterales, mantiene accesos a talentos/monedas y oculta la leyenda redundante de teclado. Los nombres de acciones y atajos siguen disponibles en los botones y en la ayuda.

## Evidencia y comprobación

La referencia es `gameplay-frames/frame-0060.jpg`: carro despejado y barra pequeña bajo el diálogo. La colocación y la escala siguen siendo aproximaciones locales. Se usó el fotograma conservado del MP4; no se ejecutó una operación REA nueva ni se recuperaron datos del sector original.

- `node --test scripts/maps.test.mjs`: comprobación de geometría con semillas 0, 1 y 10; cada escena elimina únicamente los árboles seleccionados y sus colisiones, conserva el resto de objetos/colisiones y mantiene el carro fijo. El contexto Canvas simulado solo permite comprobar geometría, no renderizado.
- Chrome, `node scripts/smoke.mjs --tutorial-only --reference-size`: rescate, reanudación y regreso a la aldea, con captura del diálogo a 640×360. El guion comprueba que el diálogo queda por encima de la barra y que los centros de venda, perfil y menú son accesibles mediante hit testing.
- Captura inspeccionada: [Papaille a 640×360](validation-v198/papaille.png).
- `npm run check`: sintaxis válida en 78 archivos. Después del ajuste final del guion también se comprobó su sintaxis con `node --check scripts/smoke.mjs`.

La primera comprobación de botones se ejecutó durante el diálogo y falló porque `hud.inert` bloquea deliberadamente esos controles. Se corrigió el momento del cotejo: separación visual durante diálogo y acceso a botones después de cerrarlo. La ejecución final aprobó ambas condiciones. No se alteró la regla que bloquea acciones durante conversaciones.

## Pendientes visibles

El carro ya se ve completo, pero falta la criatura de carga. Los dos personajes locales quedan superpuestos durante este acercamiento; la referencia los muestra separados. Suelo, cercas, vegetación, escala de objetos, encuadre, encabezado y composición interna del diálogo aún difieren del original. Igualar resolución facilita el cotejo, pero no demuestra igualdad de cámara o posición. El recorrido completo de expedición sigue sin acreditarse; se conserva la estimación provisional de 47%.
