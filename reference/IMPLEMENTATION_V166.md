# Implementación v0.166 — mascota en el retrato de perfil

## Cambio

El retrato del perfil ahora dibuja a la mascota activa junto al ratón, usando `drawPet()` y el renderer original/local que ya se usa en el mundo. Se coloca a la izquierda del personaje y un poco más abajo, como en la vista original. El retrato fuerza una pose estática y oculta barras/etiquetas para que el resultado sea una composición de perfil, no una copia del estado de combate.

La mascota solo se añade al canvas del resumen de perfil cuando existe una especie activa; los canvases de apariencia, equipo y otros paneles conservan su composición. No cambia el estado ni los datos guardados.

## Evidencia REA y de gameplay

- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceJoueurADV.js`, función `initialisation()`, añade el clip estático del jugador y, si el mensaje incluye mascota, añade su clip estático al retrato. Posiciones originales: mascota `(1.75 * ancho / 5, alto - 40)` y ratón `(2.75 * ancho / 5, alto - 50)` con un retrato de 250×310.
- El fotograma `reference/video-v12/frame-1050.png` (17:30) muestra la mascota a la izquierda del ratón en el perfil.
- El runtime local usa `drawPet()` existente y mantiene la proporción relativa entre ambas posiciones en el canvas de 280×220. La escala final del retrato es una adaptación de la reconstrucción y queda pendiente de cotejo local.

## Persistencia y verificación

- Sin cambios al esquema, clave ni contenido del guardado.
- No añade funciones online.
- No se ejecutó el juego ni pruebas. Falta comparar escala, línea de suelo y solapamiento con la captura 640×360.
