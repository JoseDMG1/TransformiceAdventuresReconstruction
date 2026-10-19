# Implementación v0.182 — objetivo original para Papaille

## Cambio

La última fase del tutorial muestra únicamente «Habla con Papaille.», el texto español del objetivo original. Se quitan del texto la ubicación cardinal y la tecla local; el marcador de objetivo y la ayuda contextual de interacción siguen guiando al jugador.

## Evidencia y límites

- `reference/original-translations/tfmadv_es.json`, clave `obj_papaille`: «Habla con Papaille.»
- `InterfaceQueteADV.js` permite recibir posición/móvil objetivo por separado del texto, de modo que la navegación no necesita añadirse a la frase.
- La posición de Papaille en el mapa local y la secuencia exacta de objetivos siguen siendo aproximaciones porque faltan los payloads de sector/servidor.

## Persistencia y verificación

- Sin cambios a la fase, interacción ni guardado.
- Interfaz en español; no se agrega traducción al francés.
- No se ejecutó el juego ni pruebas; falta cotejar el texto y el marcador en navegador.
- La estimación global permanece en 47% hasta el cotejo sincronizado.
