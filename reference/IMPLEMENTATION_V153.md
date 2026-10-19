# v0.153 — acciones tras la última recompensa

## Cambio

Los botones locales de regreso y continuación quedan deshabilitados mientras entran las recompensas. El evento `animationend` de la última entrada los habilita cuando termina el rebote: un segundo de animación más 250 ms por cada elemento anterior. El foco de teclado pasa entonces al botón de regreso.

## Evidencia y límite

- REA Evidence `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`, `InterfaceRecompense.js`: el área de recompensas solo se vuelve clicable al completar la animación del último contenedor.
- La pantalla de victoria local no es la pantalla de recompensas de servidor; bloquear sus dos acciones hasta ese punto adapta el requisito temporal de interacción, sin afirmar identidad de interfaz.

## Persistencia y alcance

- El listener de animación es transitorio y no se guarda.
- No cambia monedas, botín, XP, inventario ni el formato de las partidas.
- Abrir una victoria reanudada vuelve a ejecutar la presentación y su breve bloqueo de acciones.

## Verificación

Revisión estática del evento de fin de animación y los botones de victoria. No se ejecutó el juego ni una suite de pruebas; falta comprobar los casos con y sin objeto en navegador.
