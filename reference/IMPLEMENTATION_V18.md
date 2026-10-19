# Avance v0.18 · Triaje

## Don original 1704

El texto recuperado indica que la curación afecta a dos aliados a la vez. La reconstrucción individual trata al jugador y a Picpic como los dos aliados: al usar la venda, también intenta curar a la mascota cuando el don está activo, aunque no esté herida. La rutina existente respeta distancia, mascota activa y vida máxima; no crea curaciones para aliados inexistentes.

La venda aplica la misma cantidad calculada para el jugador a Picpic. El texto original no fija proporciones ni el alcance exacto; se reutilizan las reglas locales de curación a mascota y sus talentos.

## Persistencia y alcance

El don es de la familia de venda/mano secundaria. No requiere estado persistente nuevo. La adaptación a jugador + mascota se limita al prototipo de un jugador; el texto no define cómo se repartiría entre varios jugadores online.

Se regeneró `dist/gifts.js` y se comprobó sintaxis con `npm run check` y `node --check scripts/build-gifts.mjs`. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
