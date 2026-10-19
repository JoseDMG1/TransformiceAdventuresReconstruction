# Desarrollo local v0.81–v0.82

## Habilidades

Fuente: descripciones `comp.desc.1006`, `1007`, `1012` y `1013` de `original-translations/tfmadv_es.json`. Se conservan los parámetros locales de alcance, daño, recarga y duración.

- Pulgar Verde coloca la planta a los pies del personaje.
- Elixir produce su efecto de impacto al aterrizar, también en los rebotes; desapareció la explosión anticipada al lanzar.
- El as de diamantes normal se detiene tras alcanzar al primer enemigo. Ajetreo amplía esa cantidad.
- La descarga adicional de picas recibe correctamente la lista de enemigos mediante el contexto del trabajo; antes podía lanzar un ReferenceError.
- Desaparición ya no se cancela genéricamente por usar cualquier habilidad. El texto recuperado describe que el próximo ataque la rompe.

La comprobación v0.81 completó 33 pruebas unitarias, sintaxis de 47 archivos y el recorrido enfocado en Chrome. Este último cubrió plantas, selección y cancelación de objetivo, diamantes, picas adicionales, pasos entre zonas, testimonios, dones y recuperación ante una excepción inyectada. No acredita todos los dones.

## Investigación del bosque

El fotograma `gameplay-frames/frame-0600.jpg` muestra a Papaille diciendo «It looks like someone had a hard time here». El archivo español conserva el diálogo 47 del hacha con pluma amarilla y el 48 de las pertenencias del leñador.

`forest-story.js` registra ambas pistas y sus textos. Se examinan con E usando el diálogo inferior existente. Se marca el hallazgo al terminar de leer; cancelar la aplicación antes de terminar permite volver a leerlo. Se pueden releer, sin conceder premios. El estado forma parte de la expedición, se filtra por IDs conocidos y se conserva al recargar. El formato permanece en v13 porque es un campo opcional.

Las posiciones, dibujos y disponibilidad de ambas pistas en el recorrido son locales. No se recuperó la cadena completa de misiones, los disparadores del servidor ni sus recompensas. No se añade un bloqueo de progreso atribuyéndolo al original. Esta integración v0.82 sigue pendiente de comprobación de ejecución.

## Pendientes principales

- Recuperar o reconstruir con evidencia más sectores y sus decoraciones.
- Completar la secuencia narrativa y los objetivos confirmados por el vídeo y el cliente.
- Contrastar combinaciones de dones, duraciones, balance y economía con evidencia adicional.
- Aclarar la mitigación del don 1201 sin inventar un sistema de armadura original.
- Mantener todo el trabajo local; el online continúa excluido.
