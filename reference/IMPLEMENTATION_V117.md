# Implementacion v0.117

Fecha: 2026-10-17

## Reanimacion de Picpic

Cuando una curacion revive a Picpic, ahora se reproduce el sonido original `soins2` a volumen local0.6, se muestra el efecto original FX48 y la mascota empieza en escala vertical0.6 para recuperarse gradualmente. El disparo ocurre solo en la transicion de herida a viva; las curaciones normales no repiten el efecto. No cambia la cantidad curada ni el guardado.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `MobileADV.reanimation()` elimina estado de muerte, inicia animacion estatica, pone `scale.y = 0.6`, reproduce `soins2` a0.6 y muestra FX48.
- `dist/assets/original/effects.json`: FX48 es `FXHEAL`, 58 fotogramas, correspondiente al recurso `fx/soin_rayon/`.
- `dist/assets/original/audio/manifest.json`: incluye `soins2`.
- La velocidad de recuperacion de escala usa el suavizado del render local; en el cliente original la escala vuelve hacia1 por fotograma con factor0.2.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
