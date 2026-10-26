# v0.197 — carro junto a Papaille

El fotograma `gameplay-frames/frame-0060.jpg` muestra un carro de madera a la derecha de Papaille, cargado de paja y bultos. Se incorpora un trazado Canvas provisional en `tutorial-art.js`, registrado como `tutorialCart` en el renderer y colocado mediante `MAPS.tutorial.fixedObjects`. Contiene ruedas, plataforma, carga y varales. Coordenadas y escala locales; no es un recurso original recuperado ni define colisiones nuevas.

## Investigación de recursos

Se inspeccionó el catálogo completo de `reference/original-data/animation-metadata.json`, conservado por la recuperación del binario original y descrito en `EXTRA_CREATURES.md`. La variante ID48, fuente `monstre/scarabee1/`, contiene en su clip estático una bola, polvo y `familier_course:charge`. Esto no identifica la criatura que arrastra el carro; no se habilitó ni se sustituyó por otro escarabajo por conjetura. La inspección de esta entrega fue lectura estática ordinaria del artefacto conservado, sin nueva operación REA.

## Comprobación

- `npm run check`: sintaxis correcta en 77 archivos.
- `npm run test:tutorial`: rescate, recarga y reanudación, interacción con Papaille y llegada a la aldea aprobados en Chrome sin excepciones.
- Captura inspeccionada: [carro local](validation-v197/papaille.png), 1280×800. El carro se sitúa al lado derecho del NPC y se ordena por profundidad con el resto del escenario.

## Límites y siguiente ajuste

La criatura de carga sigue ausente. El árbol aleatorio derecho oculta parte del carro; es una diferencia de composición respecto al fotograma. La carga, ruedas y dibujo requieren mayor detalle y comparación con encuadre equivalente. No se modificaron colisiones ni coordenadas de partidas existentes. La prueba cubre el tutorial, no la expedición completa ni la fidelidad visual total. La estimación de 47% sigue sin aumentar.
