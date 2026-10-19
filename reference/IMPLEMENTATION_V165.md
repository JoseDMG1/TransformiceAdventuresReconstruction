# Implementación v0.165 — estados visuales de talentos

## Cambio

Los iconos del árbol distinguen ahora tres estados, siguiendo el renderer del cliente original:

- talento aprendido: icono a color;
- talento que la lógica local permite aprender: tinte sepia;
- talento no disponible: escala de grises y menor brillo.

El candado del último nivel continúa visible por encima del icono y el borde de selección sigue resaltando el nodo activo. El filtro se aplica al arte del talento y no al botón/candado.

## Evidencia y límite

- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceTalents.js`, función `majApparenceTalent()`, deja a color los aprendidos, usa `sepia(0.9) brightness(0.8)` para nodos `debloquable` y `grayscale(1) brightness(0.3)` para los demás. `afficherArbre()` crea los iconos originales.
- REA documenta que `debloquable` llega del servidor. El juego local usa `canLearnTalent()` como aproximación para elegir la apariencia; sus requisitos y costes siguen sin equivalencia autoritativa.
- Las capturas `reference/video-v12/frame-380.png` y `frame-510.png` muestran talentos aprendidos con color y opciones bloqueadas atenuadas.

## Partidas y verificación

Sin cambios de guardado, progresión o efectos. No se ejecutó el juego ni pruebas. Falta cotejar los tres estados y la selección en el navegador.
