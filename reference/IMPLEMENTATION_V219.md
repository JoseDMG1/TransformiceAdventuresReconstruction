# v0.219 — vida animada y barras de enemigos

Se trasladó `ClipNomADV.majSante/boucle` a un modelo de presentación independiente, `health-animation.js`. El daño mueve primero la barra principal y mantiene durante 300 ms el rastro rojo `#ff1111`. La curación adelanta un rastro cian y espera 150 ms antes de mover la barra principal. El avance usa el factor original `min(0,2 × tiempo/16, 1)`, umbral de 0,01, halo `tv.png` y destello de 1,5 que decae con factor 0,05. Se recuperó también la dependencia literal `Couleur.js`: multiplicación y recorte de canales para ese destello.

Una adaptación evita un halo permanente si un fotograma largo alcanza directamente el objetivo sin pasar por el umbral de redondeo. El modelo y sus relojes son efímeros, asociados por WeakMap a actores estables; no modifican HP ni se guardan. Al cargar una partida, la vida comienza en su valor real, sin reproducir daños históricos. Las cachés de tintes y patrones están acotadas a 64 entradas.

Los enemigos usan ahora las mismas texturas de fondo, relleno y marco, en amarillo `#ffea00`. El juego desactiva sus barras antiguas al dibujar los cuerpos y compone los indicadores después de los elementos del mundo, como la capa de interfaces del cliente original. Se conservan tamaños, alturas y condiciones locales de visibilidad (enemigo herido o jefe), sin afirmar que son los valores del servidor. La mascota sana en aldea espera a completar la transición antes de ocultar su barra.

La hoja archivada `I_Style.css` identifica `police-nom` como `ressources/polices/grobold.ttf`. Se verificó HTTP 200 y coincidencia SHA-256 exacta con los 54.328 bytes de `dist/assets/grobold.ttf`, ya disponible en el proyecto. Los nombres NPC usan ahora esa fuente, en lugar del respaldo Verdana de v217. La inicialización espera su carga y la prueba Canvas comprueba la familia efectiva y `document.fonts.check`. El registro está en `original-data/npc-font-verification.json`.

La portada deja de mostrar el número obsoleto v0.12; la versión vigente permanece en el diagnóstico y los documentos del proyecto.

## Validación

- `npm run test:health`: cuatro pruebas de daño/rastro, curación/halo, cambios consecutivos, reanudación y contraste por canales.
- `npm test`: 39 pruebas existentes aprobadas.
- `npm run test:health-browser`: comprueba la curación real de Picpic, anchos Canvas intermedios y uso efectivo del halo original; durante la expedición registra marcos originales de enemigos. La ejecución completa incluye persistencia, recompensas y exportación/importación.

Las capturas e informes aprobados se conservan en `validation-v219/`. La expedición completa aprobó a 1280×800: tres encuentros, jefe, retorno, recompensas sin duplicados, descarga JSON real, rechazo de archivo inválido y trabajos avanzados tras reanudar. Sin excepciones de ejecución. El guion de exportación espera ahora hasta 10 s al archivo final en lugar de asumir que termina en 700 ms; la primera pasada había alcanzado victoria/retorno y falló en esa espera.

La pasada adicional a 640×360 aprobó rescate/halo, barras/nombres Grobold, consumo/recarga de armas, emotes y recorrido por tablón/Papaille/Mura/Scarf. Sintaxis correcta: 122 archivos. Los nuevos fotogramas de arena y el siguiente cotejo se describen en [ARENA_OBSERVATIONS_V219.md](ARENA_OBSERVATIONS_V219.md).

Faltan múltiples barras de vida autoritativas, síntomas y muerte de jugadores del servidor, alturas/escala exactas y cotejo de las animaciones con el vídeo a idéntico instante. No se añadió online. Las herramientas REA siguen sin estar disponibles; las afirmaciones se apoyan en las copias archivadas, sus dependencias declaradas y pruebas del cliente local.
