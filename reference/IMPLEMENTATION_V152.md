# v0.152 — aparición escalonada de recompensas

## Cambio

En la pantalla local de victoria, las monedas y el equipo obtenido caen con animación de rebote de un segundo. Si hay objeto de equipo, su entrada empieza 250 ms después de la recompensa en monedas. La información de regalos y nivel permanece visible como resumen y no se anima como premio.

## Evidencia y límite

- REA Evidence `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`, `InterfaceRecompense.js`: el cliente crea una vista por cada recompensa, las anima con una separación de 250 ms y rebote de 1000 ms; solo después de la última habilita el cierre por clic.
- La reconstrucción muestra un resumen local de victoria con monedas y posible objeto de equipo, no la pantalla de recompensa de servidor recuperada. El ritmo y el rebote aplicados a esos elementos son una adaptación visual; no se afirma equivalencia de la lista original ni se bloquean los botones locales.

## Persistencia y alcance

- Solo cambia la presentación tras victoria.
- No cambia monedas, inventario, XP, recompensas, guardado ni decisiones de regreso/continuación.

## Verificación

Inspección estática contra el análisis REA y el markup local. No se ejecutó el juego ni una suite de pruebas; falta cotejar una victoria con y sin objeto de equipo en navegador.
