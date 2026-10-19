# Implementación v0.155 — resumen de perfil

## Cambio

El acceso al perfil y la tecla I ahora abren una vista general con el retrato actual, nombre, nivel, cantidad de mascotas y título actual. Los datos salen del perfil local; el título se muestra como «Sin título», que es el estado visible en el fotograma de referencia. Las pestañas existentes siguen dando acceso a equipo, mochila, trabajos, talentos, apariencia, mascota y dones. El botón «Preparar mi equipo» continúa abriendo directamente Equipo.

## Evidencia

- `reference/video-v12/frame-1050.png` muestra el perfil abierto después del regreso a la aldea: retrato, nombre, nivel, una mascota y ausencia de título.
- `reference/REA_PROGRESSION_FINDINGS.md` confirma estáticamente que el perfil original recibe manos equipadas, mascota, trabajos, nivel, cantidad de mascotas y títulos.
- No se inventa fecha de registro ni identificador de cuenta: no forman parte del perfil local.

## Persistencia y alcance

- No cambia el esquema ni la clave de guardado. La vista usa campos ya presentes y no escribe un título nuevo.
- El diseño vertical exacto y los iconos de navegación de la captura todavía no se reproducen; se añadió la pantalla de resumen y se conserva la navegación local existente.
- Sin online; no intenta mostrar datos de cuenta o servidor.
- No se ejecutó el juego ni pruebas automatizadas en esta entrega.
