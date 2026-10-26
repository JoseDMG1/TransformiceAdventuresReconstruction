# v0.220 — flora y suelo de la arena final

Los fotogramas de 16:30 y 17:00 muestran flores violetas altas con hojas alargadas y un macizo de margaritas blancas en el borde superior. `arena-flora-art.js` incorpora dos dibujos Canvas reproducibles: campanillas con tallos y flores alternadas, y margaritas agrupadas con seis pétalos y centro amarillo. Son trazos locales, no texturas recuperadas.

`arena-layout.js` separa nueve colocaciones decorativas de la lógica de escena. `map-data.js` las incorpora únicamente en `pond-arena`; los sprites usan la caché y ordenación por profundidad existentes. No se agregan colisiones ni se consume la secuencia aleatoria de posiciones.

`forest-art.drawArenaClearing` sustituye el sendero de contorno oscuro y forma continua por islas ocres irregulares sobre verde, usando un generador exclusivo del arte de suelo. La ribera conserva su geometría y el agua pasa a celeste `#61c4c7`, aproximado al fotograma. No cambian rutas transitables, daño, recompensas ni guardados.

## Validación

- `npm run test:arena-art`: aprobado en Chrome. Construye las rutas de tres y siete encuentros con y sin los nueve objetos; los arrays completos de colisiones son idénticos. El perfil guardado no cambia. Dibuja las nuevas especies y una vista de la arena con los módulos usados por el juego.
- `npm run test:maps`: tres pruebas aprobadas, incluida construcción de todas las variantes de terreno.
- Sintaxis correcta en 125 archivos.

Evidencias en `validation-v220/`: `arena-flora.png`, `arena-scenery.png` y `arena-art.json`. El encuadre de prueba usa cámara local x=1050, y=650 respecto al segmento final y escala 0,5. Es una vista de composición sin actores ni HUD, no un fotograma sincronizado de combate. La pasada completa funcional de la versión precedente se conserva en `validation-v219/1280/`.

Persisten diferencias grandes: árboles de copa redonda generados, posición del tocón, troncos, hierba, tela/hojas en primer plano, contorno completo del agua y perspectiva. El cotejo no acredita identidad de la arena ni aumenta la estimación global. Siguiente paso: registrar los hitos de ribera/tronco y resolver su composición junto con la proyección, evitando alterar colisiones guardadas sin migración explícita.
