# Avance v0.17 · Cirugía

## Don original 1706

El texto recuperado dice que la curación aumenta en el último uso. La reconstrucción interpreta “último” como la última carga de venda disponible: después de consumirla, esa curación recibe un multiplicador local de 1.35. Se aplica al jugador, a la mascota que la venda pueda curar y al exceso de curación que puede generar barrera.

El cliente original delega los resultados y no proporciona una cantidad ni un disparador más preciso. La interpretación de última carga y el 35 % son aproximaciones que deben revisarse durante juego.

## Persistencia y alcance

La condición se calcula desde las cargas que ya guarda el perfil, así que no requiere campos nuevos. El don se ofrece desde la familia de vendas/mano secundaria. El catálogo ejecutable llega a 80 dones.

Se regeneró el catálogo y se comprobó sintaxis con `npm run check` y `node --check scripts/build-gifts.mjs`. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
