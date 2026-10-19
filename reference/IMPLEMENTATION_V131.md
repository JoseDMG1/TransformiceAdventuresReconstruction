# Implementacion v0.131

Al concluir el aviso local, los enemigos que usaron `attaque1` continuan el clip desde el fotograma actual del bucle hasta completar la animacion a velocidad normal; luego vuelven a su estado base. Esto reproduce el mecanismo de `MobileADV.finAnimationAttaque()`, que inicia el mismo clip a velocidad1 desde el fotograma `IMAGE` y programa `statique` como siguiente animacion.

El cliente archivado recibe `IMAGE` y `TOUCHE` del servidor. El juego local no conoce ese fotograma ni una confirmacion autoritativa de impacto; se toma como aproximacion el fotograma del ciclo local al vencer el aviso. No se aplica la pausa opcional de 100 ms porque el dato `TOUCHE` no esta disponible. Para enemigos cuya animacion `attaque1` no aparece en los metadatos, se vuelve al estado local sin inventar una duracion.

No cambian el telegraph, el momento de salida del proyectil o impacto, el dano ni las reglas de IA. Rana conserva su salto; la carga del jefe mantiene `course:charge`.

Evidencia: `reference/original-data/MobileADV-2021.js`, `animationAttaque()` y `finAnimationAttaque()`; la ruta de protocolo del cliente envia el fotograma y la marca de impacto desde el servidor.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
